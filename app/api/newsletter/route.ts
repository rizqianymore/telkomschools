import { NextResponse } from "next/server"
import { runRateLimit } from "@/lib/rateLimit"
import { addSubscriber, getAllSubscribers } from "@/lib/newsletter-data"
import { sendEmailNotification } from "@/lib/mail"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"

// POST: Pengunjung subscribe newsletter info sekolah / PPDB
export async function POST(request: Request) {
  try {
    await runRateLimit(request)
  } catch {
    return NextResponse.json(
      { success: false, message: "Terlalu banyak permintaan. Silakan tunggu sebentar." },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const { email } = body as { email?: string }

    if (!email?.trim()) {
      return NextResponse.json(
        { success: false, message: "Alamat email wajib diisi." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Alamat email tidak valid." },
        { status: 400 }
      )
    }

    const result = addSubscriber(email.trim())

    // Kirim konfirmasi sambutan jika pendaftar baru
    if (result.isNew) {
      sendEmailNotification({
        to: email.trim().toLowerCase(),
        subject: "Selamat Bergabung di Buletin Resmi SMK Telkom Jakarta",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="color: #dc2626; margin-bottom: 8px;">SMK TELKOM JAKARTA</h2>
            <p style="color: #374151; font-size: 15px;">Halo,</p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
              Terima kasih telah berlangganan warta dan informasi berkala SMK Telkom Jakarta.
              Mulai sekarang Anda akan menjadi yang pertama mendapatkan kabar terbaru mengenai:
            </p>
            <ul style="color: #4b5563; font-size: 13px; line-height: 1.8;">
              <li>Pembukaan Gelombang PPDB & Beasiswa Prestasi</li>
              <li>Agenda Workshop Teknologi & Pameran Karya Siswa</li>
              <li>Program Magang & Penyaluran Kerja Mitra Industri</li>
            </ul>
            <p style="color: #6b7280; font-size: 13px;">
              Jika ada pertanyaan seputar pendaftaran, Anda dapat membalas email ini atau menghubungi hotline kami.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">Email resmi SMK Telkom Jakarta (Yayasan Pendidikan Telkom).</p>
          </div>
        `,
      }).catch((err) => console.error("Newsletter Confirmation Email Error:", err))
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    })
  } catch (error) {
    console.error("Newsletter POST Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan sistem." },
      { status: 500 }
    )
  }
}

// GET: Akses daftar subscriber untuk Staff / Guru
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || (session.role !== "staff" && session.role !== "guru")) {
      return NextResponse.json({ success: false, message: "Akses ditolak. Khusus Staff." }, { status: 403 })
    }

    const subscribers = getAllSubscribers()
    return NextResponse.json({
      success: true,
      total: subscribers.length,
      subscribers,
    })
  } catch (error) {
    console.error("Newsletter GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan sistem." }, { status: 500 })
  }
}
