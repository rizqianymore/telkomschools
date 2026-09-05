import { NextResponse } from "next/server"
import { runRateLimit } from "@/lib/rateLimit"
import { findUserByAnyIdentifier } from "@/lib/db"
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

      // Di lingkungan demo / dev, sertakan preview OTP untuk memudahkan pengetesan
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
