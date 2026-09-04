import { NextResponse } from "next/server"
import { findUserByIdentifier, type UserRole } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { identifier, password, role } = body as {
      identifier?: string
      password?: string
      role?: UserRole
    }

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Identitas akun (NIS / NIP / Email) dan kata sandi wajib diisi." },
        { status: 400 }
      )
    }

    // Cari user di database MySQL berdasarkan identifier yang fleksibel (NIS/NIP/Email)
    const user = await findUserByIdentifier(identifier, role)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Akun tidak ditemukan. Periksa kembali NIS/NIP/Email atau pilihan peran Anda.",
        },
        { status: 401 }
      )
    }

    // Verifikasi kata sandi
    const isPasswordValid = user.password_hash === password

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Kata sandi yang Anda masukkan tidak sesuai." },
        { status: 401 }
      )
    }

    // Kembalikan data profil dan role
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
      { success: false, message: "Terjadi gangguan saat memproses data akun." },
      { status: 500 }
    )
  }
}
