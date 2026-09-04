import { NextResponse } from "next/server"
import { findUserByAnyIdentifier } from "@/lib/db"
import {
  checkLoginRateLimit,
  resetLoginRateLimit,
  verifyPassword,
  createSessionToken,
} from "@/lib/security"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { identifier, password } = body as {
      identifier?: string
      password?: string
    }

    // 1. Validasi Input Sanitasi
    if (!identifier?.trim()) {
      return NextResponse.json(
        { success: false, field: "identifier", message: "NIS / NIP / Email wajib diisi." },
        { status: 400 }
      )
    }

    if (!password?.trim()) {
      return NextResponse.json(
        { success: false, field: "password", message: "Kata sandi wajib diisi." },
        { status: 400 }
      )
    }

    const cleanIdentifier = identifier.trim().toLowerCase()

    // 2. Proteksi Brute-Force Rate Limiting (Standar Google / OWASP)
    const rateLimit = checkLoginRateLimit(cleanIdentifier, 5, 5 * 60 * 1000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          field: "identifier",
          message: `Terlalu banyak percobaan login gagal. Demi keamanan akun, silakan coba lagi dalam ${rateLimit.retryAfterSeconds} detik.`,
        },
        { status: 429 }
      )
    }

    // 3. Pencarian Akun (Logic OR: email = ? OR nis = ? OR nip = ?)
    const user = await findUserByAnyIdentifier(cleanIdentifier)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          field: "identifier",
          message: "Akun dengan NIS / NIP / Email tersebut tidak terdaftar.",
          remainingAttempts: rateLimit.remainingAttempts,
        },
        { status: 401 }
      )
    }

    // 4. Verifikasi Kata Sandi Timing-Safe
    const isPasswordValid = await verifyPassword(password.trim(), user.password_hash)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          field: "password",
          message: `Kata sandi yang Anda masukkan tidak sesuai. (Sisa percobaan: ${rateLimit.remainingAttempts})`,
          remainingAttempts: rateLimit.remainingAttempts,
        },
        { status: 401 }
      )
    }

    // Login sukses: Reset counter percobaan login
    resetLoginRateLimit(cleanIdentifier)

    // 5. Generate HMAC-Signed Session Token
    const sessionToken = createSessionToken({
      userId: user.id,
      identifier: user.identifier,
      email: user.email,
      name: user.name,
      role: user.role,
      role_label: user.role_label,
    })

    // 6. Respon dengan HttpOnly Cookie (Aman dari pembacaan script XSS di browser)
    const response = NextResponse.json({
      success: true,
      message: `Login berhasil sebagai ${user.role_label}! Selamat datang, ${user.name}.`,
      user: {
        id: user.id,
        identifier: user.identifier,
        email: user.email,
        nis: user.nis,
        nip: user.nip,
        name: user.name,
        role: user.role,
        role_label: user.role_label,
      },
    })

    response.cookies.set({
      name: "telkom_auth_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    })

    return response
  } catch (error) {
    console.error("Login API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan sistem saat memproses autentikasi." },
      { status: 500 }
    )
  }
}
