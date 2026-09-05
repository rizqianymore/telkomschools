import { NextResponse } from "next/server"
import { runRateLimit } from "@/lib/rateLimit"
import { findUserByAnyIdentifier, registerUser } from "@/lib/db"
import {
  hashPassword,
  createSessionToken,
  checkLoginRateLimit,
} from "@/lib/security"
import { sendEmailNotification } from "@/lib/mail"
import { createPendaftaran, PilihanJurusan, JalurPendaftaran } from "@/lib/ppdb-data"
import { initializeStudentAcademicDossier } from "@/lib/academic-data"

export async function POST(request: Request) {
  await runRateLimit(request)

  try {
    const body = await request.json()
    const {
      name,
      email,
      password,
      nisn,
      phone,
      schoolOrigin,
      major1,
      major2,
      track,
    } = body as {
      name?: string
      email?: string
      password?: string
      nisn?: string
      phone?: string
      schoolOrigin?: string
      major1?: PilihanJurusan
      major2?: PilihanJurusan
      track?: JalurPendaftaran
    }

    // 1. Validasi Input Calon Siswa
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, field: "name", message: "Nama lengkap calon siswa wajib diisi." },
        { status: 400 }
      )
    }

    if (!email?.trim() || !email.includes("@")) {
      return NextResponse.json(
        { success: false, field: "email", message: "Alamat email calon siswa tidak valid." },
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

    // 2. Rate Limiting Registrasi
    const rateLimit = checkLoginRateLimit(`reg:${cleanEmail}`, 5, 10 * 60 * 1000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Terlalu banyak percobaan registrasi. Coba lagi dalam ${rateLimit.retryAfterSeconds} detik.`,
        },
        { status: 429 }
      )
    }

    // 3. Cek apakah email sudah terdaftar
    const existing = await findUserByAnyIdentifier(cleanEmail)
    if (existing) {
      return NextResponse.json(
        { success: false, field: "email", message: "Alamat email ini sudah terdaftar. Silakan login." },
        { status: 409 }
      )
    }

    // 4. Hash password dengan Scrypt + Salt
    const passwordHash = await hashPassword(password.trim())

    // 5. Parameter Jurusan & Akun Siswa Baru
    const selectedMajor1: PilihanJurusan = major1 || "RPL"
    const selectedTrack: JalurPendaftaran = track || "reguler_1"
    const cleanNisn = nisn?.trim() || "00" + Math.floor(10000000 + Math.random() * 90000000)

    const newUser = await registerUser({
      name: name.trim(),
      email: cleanEmail,
      password_hash: passwordHash,
      role: "siswa",
      nis: cleanNisn,
      major: selectedMajor1,
    })

    // 6. Alur Terpadu: Buat berkas pendaftaran PPDB awal otomatis yang terhubung 1:1
    const ppdbEntry = createPendaftaran({
      userId: newUser.id,
      nisn: cleanNisn,
      nama_lengkap: newUser.name,
      jenis_kelamin: "L",
      asal_sekolah: schoolOrigin?.trim() || "SMP / MTs Pendaftar",
      email: cleanEmail,
      no_whatsapp: phone?.trim() || "-",
      jalur: selectedTrack,
      jurusan_pilihan_1: selectedMajor1,
      jurusan_pilihan_2: major2 || undefined,
      nilai_rata_rapor: 85.0,
    })

    newUser.ppdbNo = ppdbEntry.no_pendaftaran

    // Inisialisasi 1:1 berkas akademik (Tagihan awal PPDB, SPP, Mapel Jurusan, Presensi)
    initializeStudentAcademicDossier({
      studentId: newUser.id,
      nis: cleanNisn,
      name: newUser.name,
      major: selectedMajor1,
    })

    // 7. Kirim Email Konfirmasi Registrasi & Nomor Pendaftaran PPDB Resmi
    sendEmailNotification({
      to: cleanEmail,
      subject: `Bukti Pendaftaran Akun & PPDB: ${ppdbEntry.no_pendaftaran} - SMK Telkom Jakarta`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background: #f9fafb;">
          <div style="max-width: 520px; margin: auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">
            <div style="background-color: #dc2626; padding: 20px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px;">SMK Telkom Jakarta</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Penerimaan Peserta Didik Baru (PPDB)</p>
            </div>
            <div style="padding: 24px; color: #1f2937;">
              <p style="margin-top: 0;">Halo <strong>${newUser.name}</strong>,</p>
              <p style="font-size: 14px; color: #4b5563;">
                Selamat! Akun Calon Siswa Baru Anda telah aktif. Nomor pendaftaran seleksi PPDB Anda telah diterbitkan:
              </p>
              
              <div style="background: #fef2f2; border: 1px dashed #ef4444; border-radius: 8px; padding: 16px; text-align: center; margin: 18px 0;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7f1d1d; font-weight: bold;">Nomor Pendaftaran PPDB</div>
                <div style="font-size: 24px; font-weight: bold; color: #dc2626; margin-top: 4px;">${ppdbEntry.no_pendaftaran}</div>
              </div>

              <table style="width: 100%; font-size: 13px; color: #374151; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;">Nama Siswa:</td>
                  <td style="padding: 6px 0; font-weight: bold;">${newUser.name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;">Pilihan Jurusan 1:</td>
                  <td style="padding: 6px 0; font-weight: bold;">${selectedMajor1}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;">Jalur Admisi:</td>
                  <td style="padding: 6px 0; font-weight: bold; text-transform: uppercase;">${selectedTrack}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b7280;">Status Awal:</td>
                  <td style="padding: 6px 0; color: #b45309; font-weight: bold;">Menunggu Verifikasi Berkas</td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #4b5563;">
                Gunakan email dan kata sandi Anda untuk memantau pengumuman seleksi di portal kapan saja.
              </p>
              <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
              <p style="font-size: 11px; color: #9ca3af; margin: 0;">Sekretariat PPDB SMK Telkom Jakarta • Jl. Daan Mogot KM. 11, Jakarta Barat</p>
            </div>
          </div>
        </div>
      `,
    }).catch((err) => console.error("Gagal kirim email pendaftaran PPDB:", err))

    // 8. Buat Session Token Login Otomatis
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
      message: `Pendaftaran berhasil! Nomor registrasi Anda: ${ppdbEntry.no_pendaftaran}`,
      noPendaftaran: ppdbEntry.no_pendaftaran,
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
      { success: false, message: "Terjadi gangguan sistem saat pendaftaran." },
      { status: 500 }
    )
  }
}
