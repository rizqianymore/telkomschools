import { NextResponse } from "next/server"
import { runRateLimit } from "@/lib/rateLimit"
import { findUserByAnyIdentifier, registerUser, UserRole } from "@/lib/db"
import {
  hashPassword,
  createSessionToken,
  checkLoginRateLimit,
} from "@/lib/security"
import { sendEmailNotification } from "@/lib/mail"

export async function POST(request: Request) {
  await runRateLimit(request)

  try {
    const body = await request.json()
    const { name, email, password, role } = body as {
      name?: string
      email?: string
      password?: string
      role?: UserRole
    }

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, field: "name", message: "Nama lengkap wajib diisi." },
        { status: 400 }
      )
    }

    if (!email?.trim() || !email.includes("@")) {
      return NextResponse.json(
        { success: false, field: "email", message: "Alamat email tidak valid." },
        { status: 400 }
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, field: "password", message: "Kata sandi minimal 6 karakter." },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()

    // Rate limiting pendaftaran per IP/email
    const rateLimit = checkLoginRateLimit(`reg:${cleanEmail}`, 5, 10 * 60 * 1000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Terlalu banyak permintaan registrasi. Silakan coba lagi dalam ${rateLimit.retryAfterSeconds} detik.`,
        },
        { status: 429 }
      )
    }

    // Periksa apakah email sudah terdaftar
    const existing = await findUserByAnyIdentifier(cleanEmail)
    if (existing) {
      return NextResponse.json(
        { success: false, field: "email", message: "Alamat email ini sudah terdaftar di sistem. Silakan login." },
        { status: 409 }
      )
    }

    // Hash kata sandi dengan Scrypt + Salt OWASP
    const passwordHash = await hashPassword(password.trim())
    const assignedRole: UserRole = role === "ortu" ? "ortu" : "siswa"

    const newUser = await registerUser({
      name: name.trim(),
      email: cleanEmail,
      password_hash: passwordHash,
      role: assignedRole,
    })

    // Kirim email selamat datang (Welcome Email) secara asynchronous
    sendEmailNotification({
      to: cleanEmail,
      subject: "Selamat Datang di Portal SMK Telkom Jakarta!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background: #f9fafb;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; padding: 24px;">
            <h2 style="color: #dc2626; margin-top: 0;">SMK Telkom Jakarta</h2>
            <p>Halo <strong>${newUser.name}</strong>,</p>
            <p>Selamat! Akun Anda telah berhasil dibuat di Portal Terpadu SMK Telkom Jakarta sebagai <strong>${newUser.role_label}</strong>.</p>
            <div style="background: #f3f4f6; border-left: 4px solid #dc2626; padding: 12px; margin: 18px 0; border-radius: 4px; font-size: 13px;">
              <strong>Email Akun:</strong> ${cleanEmail}<br/>
              <strong>Status:</strong> Aktif & Terverifikasi
            </div>
            <p style="font-size: 13px; color: #4b5563;">Anda sekarang dapat memantau status PPDB, profil akademik, dan materi kejuruan.</p>
            <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
            <p style="font-size: 11px; color: #9ca3af; margin: 0;">Portal Resmi SMK Telkom Jakarta • Jl. Daan Mogot KM. 11, Jakarta Barat</p>
          </div>
        </div>
      `,
    }).catch((err) => console.error("Gagal kirim welcome email:", err))

    // Buat session token
    const sessionToken = createSessionToken({
      userId: newUser.id,
      identifier: newUser.identifier,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      role_label: newUser.role_label,
    })

    const response = NextResponse.json({
      success: true,
      message: `Registrasi berhasil! Selamat datang, ${newUser.name}.`,
      user: {
        id: newUser.id,
        identifier: newUser.identifier,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        role_label: newUser.role_label,
      },
    })

    response.cookies.set({
      name: "telkom_auth_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error("Registration API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan sistem saat pendaftaran akun." },
      { status: 500 }
    )
  }
}
