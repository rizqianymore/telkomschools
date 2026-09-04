import { NextResponse } from "next/server"
import { findUserByEmail } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi." },
        { status: 400 }
      )
    }

    // 1. Query ke MySQL: SELECT * FROM users WHERE email = ? LIMIT 1
    const user = await findUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Akun dengan email tersebut tidak ditemukan." },
        { status: 401 }
      )
    }

    // 2. Verifikasi kecocokan password (bisa menggunakan bcrypt.compare jika ter-hash)
    const isPasswordValid = user.password_hash === password

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Password yang Anda masukkan salah." },
        { status: 401 }
      )
    }

    // 3. Login sukses (kembalikan token / session)
    return NextResponse.json({
      success: true,
      message: "Login berhasil! Selamat datang di Portal SMK Telkom Jakarta.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal pada server database." },
      { status: 500 }
    )
  }
}
