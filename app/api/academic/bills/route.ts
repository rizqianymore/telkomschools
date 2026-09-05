import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { getStudentBills, getAllBills, updateBillPaymentStatus } from "@/lib/academic-data"
import { findUserById } from "@/lib/db"
import { sendEmailNotification } from "@/lib/mail"

// GET: Tagihan SPP & Keuangan Siswa
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session) {
      return NextResponse.json({ success: false, message: "Sesi tidak valid." }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const studentIdParam = searchParams.get("studentId")

    let targetStudentId = session.userId
    if (session.role === "staff" || session.role === "guru") {
      if (studentIdParam) {
        targetStudentId = parseInt(studentIdParam, 10)
      } else {
        const all = getAllBills()
        return NextResponse.json({
          success: true,
          total: all.length,
          totalNominal: all.reduce((sum, b) => sum + b.amount, 0),
          bills: all,
        })
      }
    }

    const bills = getStudentBills(targetStudentId)
    const unpaid = bills.filter((b) => b.status === "belum_bayar")
    const totalUnpaid = unpaid.reduce((sum, b) => sum + b.amount, 0)

    return NextResponse.json({
      success: true,
      studentId: targetStudentId,
      totalTagihanAktif: unpaid.length,
      totalNominalTunggakan: totalUnpaid,
      bills,
    })
  } catch (error) {
    console.error("Bills GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal." }, { status: 500 })
  }
}

// PATCH: Konfirmasi pembayaran / update status tagihan
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session) {
      return NextResponse.json({ success: false, message: "Sesi tidak valid." }, { status: 401 })
    }

    const body = await request.json()
    const { billId, status, paymentMethod } = body

    if (!billId || !status) {
      return NextResponse.json({ success: false, message: "ID tagihan dan status baru wajib dikirim." }, { status: 400 })
    }

    // 1. Verifikasi Kepemilikan Tagihan (Proteksi IDOR)
    const allBills = getAllBills()
    const targetBill = allBills.find((b) => b.id === billId)
    if (!targetBill) {
      return NextResponse.json({ success: false, message: "Invoice tagihan tidak ditemukan." }, { status: 404 })
    }

    if (session.role === "siswa" && targetBill.studentId !== session.userId) {
      return NextResponse.json({ success: false, message: "Akses ditolak. Anda tidak memiliki izin untuk tagihan ini." }, { status: 403 })
    }

    // Siswa hanya bisa mengajukan "menunggu_konfirmasi", Staff/Admin bisa set "lunas"
    let targetStatus = status
    if (session.role === "siswa") {
      targetStatus = "menunggu_konfirmasi"
    }

    const updated = updateBillPaymentStatus(billId, targetStatus, paymentMethod)
    if (!updated) {
      return NextResponse.json({ success: false, message: "Gagal memperbarui status tagihan." }, { status: 500 })
    }

    // Kirim notifikasi email kwitansi pelunasan resmi saat tagihan disahkan "lunas" oleh Staff
    if (targetStatus === "lunas") {
      const studentUser = await findUserById(updated.studentId)
      if (studentUser?.email) {
        sendEmailNotification({
          to: studentUser.email,
          subject: `Kwitansi Resmi Pelunasan [${updated.title}] - SMK Telkom Jakarta`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <div style="background-color: #16a34a; padding: 18px; border-radius: 8px; text-align: center; color: #ffffff; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 20px;">BUKTI PEMBAYARAN SAH</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">SMK Telkom Jakarta</p>
              </div>
              <p style="color: #1f2937; font-size: 15px;">Halo <strong>${studentUser.name}</strong>,</p>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                Pembayaran Anda telah diverifikasi dan dinyatakan <strong>LUNAS</strong> oleh Bagian Keuangan Sekolah dengan rincian:
              </p>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0;">
                <p style="margin: 0 0 6px 0; font-size: 13px; color: #4b5563;"><strong>No. Invoice:</strong> ${updated.id}</p>
                <p style="margin: 0 0 6px 0; font-size: 13px; color: #4b5563;"><strong>Deskripsi:</strong> ${updated.title}</p>
                <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Jumlah Dibayar:</strong> <span style="color: #16a34a; font-weight: bold;">Rp ${updated.amount.toLocaleString("id-ID")}</span></p>
                <p style="margin: 0 0 6px 0; font-size: 13px; color: #4b5563;"><strong>Metode:</strong> ${updated.paymentMethod || "Kasir Sekolah / Transfer Bank"}</p>
                <p style="margin: 0; font-size: 13px; color: #4b5563;"><strong>Waktu Verifikasi:</strong> ${new Date().toLocaleString("id-ID")}</p>
              </div>
              <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
                Simpan email ini sebagai bukti pembayaran yang sah. Terima kasih atas ketepatan waktu Anda.
              </p>
            </div>
          `,
        }).catch((err: unknown) => console.error("Payment Receipt Email Error:", err))
      }
    }

    return NextResponse.json({
      success: true,
      message: `Status tagihan [${updated.title}] berhasil diperbarui menjadi "${updated.status}".`,
      data: updated,
    })
  } catch (error) {
    console.error("Bills PATCH Error:", error)
    return NextResponse.json({ success: false, message: "Gagal memproses pembayaran tagihan." }, { status: 500 })
  }
}
