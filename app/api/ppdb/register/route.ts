import { NextResponse } from "next/server"
import { createPendaftaran, findPendaftarByNoOrNisn, JalurPendaftaran, PilihanJurusan } from "@/lib/ppdb-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      nisn,
      nama_lengkap,
      jenis_kelamin,
      asal_sekolah,
      email,
      no_whatsapp,
      jalur,
      jurusan_pilihan_1,
      jurusan_pilihan_2,
      nilai_rata_rapor,
    } = body

    // 1. Validasi Input Wajib
    if (!nisn?.trim() || !nama_lengkap?.trim() || !asal_sekolah?.trim() || !email?.trim() || !no_whatsapp?.trim()) {
      return NextResponse.json(
        { success: false, message: "Semua kolom bertanda bintang (*) wajib diisi." },
        { status: 400 }
      )
    }

    // 2. Validasi Format NISN (10 digit numerik standar Kemdikbud)
    const cleanNisn = nisn.trim()
    if (!/^\d{10}$/.test(cleanNisn)) {
      return NextResponse.json(
        { success: false, message: "Nomor Induk Siswa Nasional (NISN) harus berupa 10 digit angka." },
        { status: 400 }
      )
    }

    // 3. Validasi Duplikasi NISN
    const existing = findPendaftarByNoOrNisn(cleanNisn)
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: `NISN ${cleanNisn} sudah pernah didaftarkan sebelumnya dengan No. Pendaftaran: ${existing.no_pendaftaran}.`,
        },
        { status: 409 }
      )
    }

    // 4. Validasi Format Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Alamat email yang dimasukkan tidak valid." },
        { status: 400 }
      )
    }

    // 5. Validasi Jurusan
    const validMajors: PilihanJurusan[] = ["RPL", "TKJ", "DKV", "TJA"]
    if (!validMajors.includes(jurusan_pilihan_1)) {
      return NextResponse.json(
        { success: false, message: "Pilihan jurusan kejuruan utama tidak valid." },
        { status: 400 }
      )
    }

    // 6. Buat Record Pendaftaran Baru
    const newApplicant = createPendaftaran({
      nisn: cleanNisn,
      nama_lengkap: nama_lengkap.trim(),
      jenis_kelamin: jenis_kelamin === "P" ? "P" : "L",
      asal_sekolah: asal_sekolah.trim(),
      email: email.trim().toLowerCase(),
      no_whatsapp: no_whatsapp.trim(),
      jalur: (jalur as JalurPendaftaran) || "reguler_1",
      jurusan_pilihan_1,
      jurusan_pilihan_2: validMajors.includes(jurusan_pilihan_2) ? jurusan_pilihan_2 : undefined,
      nilai_rata_rapor: Number(nilai_rata_rapor) || 80,
    })

    return NextResponse.json({
      success: true,
      message: "Pendaftaran PPDB online Anda berhasil disimpan ke sistem terpadu!",
      pendaftaran: newApplicant,
    })
  } catch (error) {
    console.error("PPDB Register Error:", error)
    return NextResponse.json(
      { success: false, message: "Gagal memproses pendaftaran. Silakan coba beberapa saat lagi." },
      { status: 500 }
    )
  }
}
