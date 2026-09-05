import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import {
  getAllPendaftar,
  updateStatusPendaftar,
  StatusPendaftaran,
} from "@/lib/ppdb-data"
import { sendEmailNotification } from "@/lib/mail"
import { assignStudentToClass, issueMatriculationBill } from "@/lib/academic-data"
import { findUserByAnyIdentifier } from "@/lib/db"

async function verifyStaffOrGuruAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get("telkom_auth_session")?.value
  if (!token) return null
  const session = verifySessionToken(token)
  if (!session || (session.role !== "staff" && session.role !== "guru")) {
    return null
  }
  return session
}

// GET: Ambil seluruh data pendaftar PPDB untuk dashboard Staff / Guru
export async function GET() {
  const session = await verifyStaffOrGuruAuth()
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak. Silakan login sebagai Staff/Guru." },
      { status: 401 }
    )
  }

  try {
    const list = getAllPendaftar()
    const stats = {
      total: list.length,
      menunggu: list.filter((p) => p.status === "menunggu_verifikasi").length,
      terverifikasi: list.filter((p) => p.status === "terverifikasi").length,
      lulus: list.filter((p) => p.status === "lulus_seleksi").length,
      tidak_lulus: list.filter((p) => p.status === "tidak_lulus").length,
    }

    return NextResponse.json({
      success: true,
      stats,
      pendaftar: list,
    })
  } catch (error) {
    console.error("PPDB Manage GET Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan sistem." },
      { status: 500 }
    )
  }
}

// PATCH: Perbarui status seleksi & verifikasi berkas calon siswa oleh Petugas PPDB
export async function PATCH(request: Request) {
  const session = await verifyStaffOrGuruAuth()
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Akses ditolak. Silakan login sebagai Staff/Guru." },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { no_pendaftaran, status, catatan } = body as {
      no_pendaftaran?: string
      status?: StatusPendaftaran
      catatan?: string
    }

    if (!no_pendaftaran?.trim() || !status) {
      return NextResponse.json(
        { success: false, message: "Nomor pendaftaran dan status baru wajib dikirim." },
        { status: 400 }
      )
    }

    const validStatuses: StatusPendaftaran[] = [
      "menunggu_verifikasi",
      "terverifikasi",
      "lulus_seleksi",
      "tidak_lulus",
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Nilai status tidak valid." },
        { status: 400 }
      )
    }

    const updated = updateStatusPendaftar(no_pendaftaran.trim(), status, catatan)
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Data pendaftar dengan nomor tersebut tidak ditemukan." },
        { status: 404 }
      )
    }

    // 1:1 Sinkronisasi Otomatis saat Calon Siswa Lulus Seleksi PPDB
    let assignedClassInfo = null
    if (status === "lulus_seleksi") {
      const user = await findUserByAnyIdentifier(updated.email)
      const targetStudentId = updated.userId || user?.id || 1

      // 1. Tempatkan ke Kelas Kejuruan Aktif
      const assignedClass = assignStudentToClass(updated.jurusan_pilihan_1)
      assignedClassInfo = assignedClass

      if (user) {
        user.classCode = assignedClass.code
        user.major = updated.jurusan_pilihan_1
      }

      // 2. Terbitkan Tagihan Resmi Daftar Ulang & Seragam
      issueMatriculationBill(targetStudentId, updated.nisn)
    }

    // Berikan notifikasi email resmi perubahan status ke siswa jika email tersedia
    if (updated.email) {
      const statusLabelMap: Record<StatusPendaftaran, { label: string; color: string }> = {
        menunggu_verifikasi: { label: "Menunggu Verifikasi", color: "#eab308" },
        terverifikasi: { label: "Berkas Terverifikasi", color: "#3b82f6" },
        lulus_seleksi: { label: "Selamat! Dinyatakan Lulus Seleksi", color: "#16a34a" },
        tidak_lulus: { label: "Belum Memenuhi Syarat", color: "#dc2626" },
      }

      const st = statusLabelMap[status]

      sendEmailNotification({
        to: updated.email,
        subject: `Pembaruan Status PPDB [${updated.no_pendaftaran}] - SMK Telkom Jakarta`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <div style="background-color: #dc2626; padding: 18px; border-radius: 8px; text-align: center; color: #ffffff; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 20px;">SMK TELKOM JAKARTA</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Penerimaan Peserta Didik Baru (PPDB) 2026/2027</p>
            </div>
            <p style="color: #1f2937; font-size: 15px;">Halo <strong>${updated.nama_lengkap}</strong>,</p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Terdapat pembaruan status pada berkas pendaftaran PPDB Anda dengan rincian berikut:
            </p>
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #4b5563;"><strong>No. Pendaftaran:</strong> ${updated.no_pendaftaran}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #4b5563;"><strong>Jurusan Pilihan:</strong> ${updated.jurusan_pilihan_1}</p>
              <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Status Sekarang:</strong> <span style="color: ${st.color}; font-weight: bold;">${st.label}</span></p>
              ${assignedClassInfo ? `<p style="margin: 0 0 6px 0; font-size: 13px; color: #16a34a;"><strong>Penempatan Kelas:</strong> ${assignedClassInfo.name} (${assignedClassInfo.code}) - ${assignedClassInfo.room}</p>` : ""}
              ${catatan ? `<p style="margin: 8px 0 0 0; font-size: 13px; color: #374151; background: #fff; padding: 10px; border-radius: 6px; border: 1px dashed #d1d5db;"><strong>Catatan Panitia:</strong> ${catatan}</p>` : ""}
            </div>
            ${status === "lulus_seleksi" ? `
              <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
                <p style="margin: 0; font-size: 13px; color: #166534; font-weight: bold;">Langkah Selanjutnya:</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #15803d;">Invoice Biaya Daftar Ulang & Seragam telah diterbitkan di akun Portal Siswa Anda. Silakan login ke Dashboard Siswa untuk menyelesaikan pembayaran dan administrasi.</p>
              </div>
            ` : ""}
            <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
              Anda dapat terus memeriksa perkembangan verifikasi dan pengumuman resmi melalui laman status PPDB di situs kami.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">Email resmi Panitia PPDB SMK Telkom Jakarta.</p>
          </div>
        `,
      }).catch((err) => console.error("PPDB Status Update Notification Error:", err))
    }

    return NextResponse.json({
      success: true,
      message: `Status pendaftar ${updated.no_pendaftaran} berhasil diubah menjadi "${status}".`,
      pendaftar: updated,
    })
  } catch (error) {
    console.error("PPDB Manage PATCH Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan sistem saat memperbarui status pendaftar." },
      { status: 500 }
    )
  }
}
