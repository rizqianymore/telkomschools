import { NextResponse } from "next/server"
import { runRateLimit } from "@/lib/rateLimit"
import { updateUserPassword } from "@/lib/db"
import {
  verifyPasswordResetToken,
  hashPassword,
  checkLoginRateLimit,
} from "@/lib/security"

export async function POST(request: Request) {
  await runRateLimit(request)

  try {
    const body = await request.json()
    const { resetToken, newPassword } = body as {
      resetToken?: string
      newPassword?: string
    }

    if (!resetToken?.trim()) {
      return NextResponse.json(
        { success: false, message: "Token reset tidak ditemukan atau tidak sah." },
        { status: 400 }
      )
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Kata sandi baru minimal 6 karakter." },
        { status: 400 }
      )
    }

    // Verifikasi kriptografis token reset
    const email = verifyPasswordResetToken(resetToken)
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Sesi token reset telah kedaluwarsa atau tidak valid. Silakan ulangi verifikasi OTP." },
        { status: 401 }
      )
    }

    // Rate limiting reset password
    const rateLimit = checkLoginRateLimit(`pw-reset:${email}`, 5, 10 * 60 * 1000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: "Terlalu banyak permintaan reset kata sandi. Coba lagi nanti." },
        { status: 429 }
      )
    }

    // Hash password baru dengan scrypt + salt OWASP
    const passwordHash = await hashPassword(newPassword.trim())
    const updated = await updateUserPassword(email, passwordHash)

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Pengguna tidak ditemukan." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Kata sandi Anda berhasil diperbarui! Silakan masuk dengan kata sandi baru.",
    })
  } catch (error) {
    console.error("Reset Password API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal saat memperbarui kata sandi." },
      { status: 500 }
    )
  }
}
