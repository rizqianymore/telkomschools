import { NextResponse } from "next/server"
import { runRateLimit } from "@/lib/rateLimit"
import { addContactMessage, getAllContactMessages, updateContactMessageStatus } from "@/lib/contact-data"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { sendEmailNotification } from "@/lib/mail"

// POST: Pengunjung mengirimkan pertanyaan / kontak
export async function POST(request: Request) {
  try {
    await runRateLimit(request)
  } catch {
    return NextResponse.json(
      { success: false, message: "Terlalu banyak permintaan. Mohon tunggu sebentar." },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const { name, phone, email, majorInterest, message } = body as {
      name?: string
      phone?: string
      email?: string
      majorInterest?: string
      message?: string
    }

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama, nomor HP, email, dan pesan wajib diisi." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid." },
        { status: 400 }
      )
    }

    const newContact = addContactMessage({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      majorInterest: majorInterest?.trim() || "Umum / Belum Menentukan",
      message: message.trim(),
    })

    // Kirim notifikasi email konfirmasi tanda terima ke pengirim (asinkron tanpa menghambat respon)
    sendEmailNotification({
      to: email.trim().toLowerCase(),
      subject: "Pesan Anda telah Diterima - Layanan Informasi SMK Telkom Jakarta",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #dc2626; margin-bottom: 8px;">SMK TELKOM JAKARTA</h2>
          <p style="color: #374151; font-size: 15px;">Halo <strong>${name.trim()}</strong>,</p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
            Terima kasih telah menghubungi layanan informasi dan konsultasi SMK Telkom Jakarta.
            Pesan/pertanyaan Anda telah berhasil kami terima dan akan segera ditindaklanjuti oleh konsultan admisi kami.
          </p>
          <div style="background-color: #f9fafb; border-left: 4px solid #dc2626; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #6b7280;"><strong>Peminatan:</strong> ${newContact.majorInterest}</p>
            <p style="margin: 0; font-size: 13px; color: #374151;"><strong>Pesan:</strong> "${newContact.message}"</p>
          </div>
          <p style="color: #6b7280; font-size: 13px;">
            Jam kerja layanan kami: Senin - Jumat (08.00 - 16.00 WIB), Sabtu (08.00 - 13.00 WIB).<br>
            Hotline WhatsApp: +62 812-3456-7890
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 11px; margin: 0;">Email ini dikirim secara otomatis oleh Sistem Layanan Terpadu SMK Telkom Jakarta.</p>
        </div>
      `,
    }).catch((err) => console.error("Contact Autoresponder Email Error:", err))

    return NextResponse.json({
      success: true,
      message: "Terima kasih! Pesan dan pertanyaan Anda berhasil dikirim ke tim admisi.",
      data: newContact,
    })
  } catch (error) {
    console.error("Contact API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan sistem saat mengirim pesan." },
      { status: 500 }
    )
  }
}

// GET: Staff / Guru membaca seluruh pesan yang masuk
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak. Belum login." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || (session.role !== "staff" && session.role !== "guru")) {
      return NextResponse.json({ success: false, message: "Akses ditolak. Khusus Staff / Guru." }, { status: 403 })
    }

    const messages = getAllContactMessages()
    return NextResponse.json({
      success: true,
      messages,
      total: messages.length,
    })
  } catch (error) {
    console.error("Contact GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal." }, { status: 500 })
  }
}

// PATCH: Perbarui status pesan (read / replied)
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || (session.role !== "staff" && session.role !== "guru")) {
      return NextResponse.json({ success: false, message: "Akses ditolak. Khusus Staff / Guru." }, { status: 403 })
    }

    const body = await request.json()
    const { id, status } = body as { id?: string; status?: "unread" | "read" | "replied" }

    if (!id || !status || !["unread", "read", "replied"].includes(status)) {
      return NextResponse.json({ success: false, message: "Parameter id dan status tidak valid." }, { status: 400 })
    }

    const updated = updateContactMessageStatus(id, status)
    if (!updated) {
      return NextResponse.json({ success: false, message: "Pesan tidak ditemukan." }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: `Status pesan berhasil diubah menjadi ${status}.` })
  } catch (error) {
    console.error("Contact PATCH Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal." }, { status: 500 })
  }
}
