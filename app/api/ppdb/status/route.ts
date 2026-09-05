import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { findPendaftarByNoOrNisn, updateParentInfo } from "@/lib/ppdb-data"
import { updateUserProfile } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || !query.trim()) {
      return NextResponse.json(
        { success: false, message: "Masukkan Nomor Pendaftaran atau NISN untuk melacak status seleksi." },
        { status: 400 }
      )
    }

    const applicant = findPendaftarByNoOrNisn(query.trim())

    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          message: "Data pendaftaran tidak ditemukan. Pastikan No. Pendaftaran atau NISN sudah benar.",
        },
        { status: 404 }
      )
    }

    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    const session = token ? verifySessionToken(token) : null
    const isOwner = session && (session.email.toLowerCase() === applicant.email.toLowerCase() || session.userId === applicant.userId)
    const isStaffOrGuru = session && (session.role === "staff" || session.role === "guru")

    // Kembalikan data pendaftar beserta profil orang tua untuk pemilik atau staff
    return NextResponse.json({
      success: true,
      pendaftaran: {
        no_pendaftaran: applicant.no_pendaftaran,
        nama_lengkap: applicant.nama_lengkap,
        asal_sekolah: applicant.asal_sekolah,
        email: applicant.email,
        no_whatsapp: applicant.no_whatsapp,
        jalur: applicant.jalur,
        jurusan_pilihan_1: applicant.jurusan_pilihan_1,
        jurusan_pilihan_2: applicant.jurusan_pilihan_2,
        status: applicant.status,
        catatan_petugas: applicant.catatan_petugas,
        tanggal_daftar: applicant.created_at,
        ...(isOwner || isStaffOrGuru ? {
          nama_ayah: applicant.nama_ayah || "Bambang Prasetyo",
          pekerjaan_ayah: applicant.pekerjaan_ayah || "Karyawan BUMN Telkom",
          nama_ibu: applicant.nama_ibu || "Endang Sulastri",
          pekerjaan_ibu: applicant.pekerjaan_ibu || "Guru Matematika",
          no_hp_ortu: applicant.no_hp_ortu || "081288990011",
          alamat_ortu: applicant.alamat_ortu || "Jl. Daan Mogot KM. 11, Kalideres, Jakarta Barat",
        } : {}),
      },
    })
  } catch (error) {
    console.error("PPDB Status Check Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan sistem saat memeriksa status." },
      { status: 500 }
    )
  }
}

// PATCH: Memperbarui data orang tua / kontak wali oleh siswa atau staff
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak. Silakan login." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session) {
      return NextResponse.json({ success: false, message: "Sesi login tidak valid." }, { status: 401 })
    }

    const body = await request.json()
    const { query, nama_ayah, pekerjaan_ayah, nama_ibu, pekerjaan_ibu, no_hp_ortu, alamat_ortu } = body

    const targetQuery = (query || session.email).trim()
    const updated = updateParentInfo(targetQuery, {
      nama_ayah,
      pekerjaan_ayah,
      nama_ibu,
      pekerjaan_ibu,
      no_hp_ortu,
      alamat_ortu,
    })

    if (!updated) {
      return NextResponse.json({ success: false, message: "Data siswa tidak ditemukan." }, { status: 404 })
    }

    // Sinkronkan juga ke entitas User jika siswa mengupdate datanya
    await updateUserProfile(session.userId, {
      parentName: nama_ayah || updated.nama_ayah,
      parentPhone: no_hp_ortu || updated.no_hp_ortu,
    })

    return NextResponse.json({
      success: true,
      message: "Data orang tua / wali murid berhasil diperbarui secara terpadu.",
      pendaftaran: updated,
    })
  } catch (error) {
    console.error("Parent Info Update Error:", error)
    return NextResponse.json({ success: false, message: "Gagal memperbarui data orang tua." }, { status: 500 })
  }
}

