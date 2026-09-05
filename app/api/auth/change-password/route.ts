import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { runRateLimit } from "@/lib/rateLimit"
import { findUserByAnyIdentifier, updateUserPassword } from "@/lib/db"
import {
  verifySessionToken,
  verifyPassword,
  hashPassword,
} from "@/lib/security"
import { sendEmailNotification } from "@/lib/mail"

export async function POST(request: Request) {
  await runRateLimit(request)

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak ditemukan. Silakan login terlebih dahulu." },
        { status: 401 }
      )
    }

    const session = verifySessionToken(token)
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Sesi telah kedaluwarsa. Silakan login kembali." },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { oldPassword, newPassword } = body as {
      oldPassword?: string
      newPassword?: string
    }

    if (!oldPassword?.trim()) {
      return NextResponse.json(
        { success: false, message: "Kata sandi lama wajib diisi." },
        { status: 400 }
      )
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Kata sandi baru minimal 6 karakter." },
        { status: 400 }
      )
    }

    // Ambil data user saat ini
    const user = await findUserByAnyIdentifier(session.email)
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Data pengguna tidak ditemukan." },
        { status: 404 }
      )
    }

    // Validasi kata sandi lama
    const isOldValid = await verifyPassword(oldPassword.trim(), user.password_hash)
    if (!isOldValid) {
      return NextResponse.json(
        { success: false, message: "Kata sandi lama tidak sesuai." },
        { status: 400 }
      )
    }

    // Hash dan simpan kata sandi baru
    const newHash = await hashPassword(newPassword.trim())
    await updateUserPassword(user.email, newHash)

    // Kirim email notifikasi keamanan ke pengguna
    sendEmailNotification({
      to: user.email,
      subject: "Pemberitahuan Keamanan: Kata Sandi Diperbarui",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background: #f9fafb;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; padding: 24px;">
            <h2 style="color: #dc2626; margin-top: 0;">SMK Telkom Jakarta</h2>
            <p>Halo <strong>${user.name}</strong>,</p>
            <p>Kata sandi akun Portal Terpadu Anda baru saja diperbarui.</p>
            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 12px; margin: 18px 0; border-radius: 4px; font-size: 13px; color: #065f46;">
              <strong>Waktu:</strong> ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB<br/>
              <strong>Status:</strong> Kata sandi berhasil diubah
            </div>
            <p style="font-size: 12px; color: #6b7280;">Jika Anda merasa tidak melakukan perubahan ini, segera hubungi staf IT kami atau lakukan reset kata sandi.</p>
          </div>
        </div>
      `,
    }).catch((err) => console.error("Gagal kirim notifikasi ubah password:", err))

    return NextResponse.json({
      success: true,
      message: "Kata sandi berhasil diperbarui.",
    })
  } catch (error) {
    console.error("Change Password API Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan saat mengubah kata sandi." },
      { status: 500 }
    )
  }
}
