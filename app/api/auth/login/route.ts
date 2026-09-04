import { NextResponse } from "next/server"
import { findUserByAnyIdentifier } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { identifier, password } = body as {
      identifier?: string
      password?: string
    }

    // Validasi otomatis input kosong
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

    // Query MySQL: SELECT * FROM users WHERE (email = ? OR nis = ? OR nip = ?) LIMIT 1
    const user = await findUserByAnyIdentifier(identifier)

    // Error otomatis jika akun tidak ditemukan
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          field: "identifier",
          message: "Akun dengan NIS / NIP / Email tersebut tidak terdaftar.",
        },
        { status: 401 }
      )
    }

    // Error otomatis jika kata sandi salah
    const isPasswordValid = user.password_hash === password

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          field: "password",
          message: "Kata sandi yang Anda masukkan tidak sesuai.",
        },
        { status: 401 }
      )
    }

    // Login sukses: role otomatis dikenali (Siswa, Orang Tua, Guru, atau Admin)
    return NextResponse.json({
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
  } catch (error) {
    console.error("Login API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan sistem saat memproses basis data." },
      { status: 500 }
    )
  }
}
