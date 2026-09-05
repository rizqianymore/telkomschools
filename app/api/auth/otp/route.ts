import { NextResponse } from "next/server"
import { runRateLimit } from "@/lib/rateLimit"
import { findUserByAnyIdentifier } from "@/lib/db"
import { sendEmailNotification } from "@/lib/mail"
import {
  checkLoginRateLimit,
  createAndStoreOtp,
  verifyStoredOtp,
  createPasswordResetToken,
} from "@/lib/security"

// POST: Kirim OTP ke email atau verifikasi kode OTP
export async function POST(request: Request) {
  await runRateLimit(request)

  try {
    const body = await request.json()
    const { action, email, otp } = body as {
      action?: "request" | "verify"
      email?: string
      otp?: string
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { success: false, message: "Email atau akun wajib diisi." },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()

    // 1. ACTION: REQUEST OTP
    if (action === "request") {
      // Proteksi anti-spam OTP (maksimal 3 per 5 menit per email)
      const rateLimit = checkLoginRateLimit(`otp-req:${cleanEmail}`, 3, 5 * 60 * 1000)
      if (!rateLimit.allowed) {
        return NextResponse.json(
          {
            success: false,
            message: `Terlalu banyak permintaan OTP. Silakan tunggu ${rateLimit.retryAfterSeconds} detik sebelum mencoba lagi.`,
          },
          { status: 429 }
        )
      }

      // Pastikan email terdaftar
      const user = await findUserByAnyIdentifier(cleanEmail)
      if (!user) {
        // Demi mencegah email enumeration attack, tampilkan pesan aman
        return NextResponse.json({
          success: true,
          message: "Jika akun Anda terdaftar, kode OTP 6 digit telah dikirimkan ke email Anda.",
        })
      }

      const generatedOtp = createAndStoreOtp(user.email, 10)

      // Kirim email OTP secara asynchronous via SMTP
      sendEmailNotification({
        to: user.email,
        subject: `Kode Verifikasi OTP: ${generatedOtp} - SMK Telkom Jakarta`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; background: #f9fafb;">
            <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; padding: 24px;">
              <h2 style="color: #dc2626; margin-top: 0;">SMK Telkom Jakarta</h2>
              <p>Halo <strong>${user.name}</strong>,</p>
              <p>Kami menerima permintaan verifikasi atau reset kata sandi untuk akun Anda. Gunakan kode OTP di bawah ini:</p>
              <div style="background: #fef2f2; border: 1px dashed #ef4444; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #dc2626;">${generatedOtp}</span>
              </div>
              <p style="font-size: 13px; color: #4b5563;">Kode ini berlaku selama <strong>10 menit</strong>. Jangan bagikan kode ini kepada siapapun termasuk pihak sekolah.</p>
              <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
              <p style="font-size: 11px; color: #9ca3af; margin: 0;">Jika Anda tidak merasa meminta kode ini, abaikan pesan ini.</p>
            </div>
          </div>
        `,
      }).catch((err) => console.error("Gagal kirim email OTP:", err))

      // Sertakan demoOtp hanya jika di lingkungan development
      return NextResponse.json({
        success: true,
        message: `Kode OTP verifikasi telah dikirimkan ke email ${user.email}. Berlaku 10 menit.`,
        demoOtp: process.env.NODE_ENV !== "production" ? generatedOtp : undefined,
      })
    }

    // 2. ACTION: VERIFY OTP
    if (action === "verify") {
      if (!otp?.trim()) {
        return NextResponse.json(
          { success: false, message: "Kode OTP 6 digit wajib diisi." },
          { status: 400 }
        )
      }

      // Proteksi brute force verifikasi OTP
      const rateLimit = checkLoginRateLimit(`otp-verify:${cleanEmail}`, 5, 5 * 60 * 1000)
      if (!rateLimit.allowed) {
        return NextResponse.json(
          {
            success: false,
            message: `Terlalu banyak percobaan OTP gagal. Silakan tunggu ${rateLimit.retryAfterSeconds} detik.`,
          },
          { status: 429 }
        )
      }

      const result = verifyStoredOtp(cleanEmail, otp.trim())
      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.message },
          { status: 400 }
        )
      }

      // Hasilkan token reset password terenkripsi HMAC yang berlaku 15 menit
      const resetToken = createPasswordResetToken(cleanEmail)

      return NextResponse.json({
        success: true,
        message: "Kode OTP berhasil diverifikasi.",
        resetToken,
      })
    }

    return NextResponse.json(
      { success: false, message: "Aksi tidak dikenal (request / verify)." },
      { status: 400 }
    )
  } catch (error) {
    console.error("OTP API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada layanan OTP." },
      { status: 500 }
    )
  }
}
