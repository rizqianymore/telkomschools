import { NextResponse } from "next/server"
import { findPendaftarByNoOrNisn } from "@/lib/ppdb-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || !query.trim()) {
      return NextResponse.json(
        { success: false, message: "Masukkan Nomor Pendaftaran atau NISN untuk melacak status seleksi." },
        { status: 400 }
      )
    }

    const applicant = findPendaftarByNoOrNisn(query.trim())

    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          message: "Data pendaftaran tidak ditemukan. Pastikan No. Pendaftaran atau NISN sudah benar.",
        },
        { status: 404 }
      )
    }

    // Kembalikan data pendaftar tanpa mengekspos data privat sensitif
    return NextResponse.json({
      success: true,
      pendaftaran: {
        no_pendaftaran: applicant.no_pendaftaran,
        nama_lengkap: applicant.nama_lengkap,
        asal_sekolah: applicant.asal_sekolah,
        jalur: applicant.jalur,
        jurusan_pilihan_1: applicant.jurusan_pilihan_1,
        jurusan_pilihan_2: applicant.jurusan_pilihan_2,
        status: applicant.status,
        catatan_petugas: applicant.catatan_petugas,
        tanggal_daftar: applicant.created_at,
      },
    })
  } catch (error) {
    console.error("PPDB Status Check Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan sistem saat memeriksa status." },
      { status: 500 }
    )
  }
}
