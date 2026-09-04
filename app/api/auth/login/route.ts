import { NextResponse } from "next/server"
import { findUserByEmailAndRole, type UserRole } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, role } = body as {
      email?: string
      password?: string
      role?: UserRole
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Alamat email dan kata sandi wajib diisi." },
        { status: 400 }
      )
    }

    // Query ke MySQL terfilter berdasarkan email & role yang dipilih
    const user = await findUserByEmailAndRole(email, role)

    if (!user) {
      const roleText = role ? ` untuk portal ${role}` : ""
      return NextResponse.json(
        {
          success: false,
          message: `Akun dengan email tersebut tidak terdaftar${roleText}.`,
        },
        { status: 401 }
      )
    }

    // Verifikasi kecocokan password
    const isPasswordValid = user.password_hash === password

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Kata sandi yang Anda masukkan salah." },
        { status: 401 }
      )
    }

    // Berhasil Login
    return NextResponse.json({
      success: true,
      message: `Login berhasil sebagai ${user.role_label}! Selamat datang di Portal SMK Telkom Jakarta.`,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        role_label: user.role_label,
      },
    })
  } catch (error) {
    console.error("Login API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan saat memproses database." },
      { status: 500 }
    )
  }
}
