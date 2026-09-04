import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, FileCheck, Scale, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - SMK Telkom Jakarta",
  description: "Syarat dan ketentuan umum pendaftaran dan penggunaan portal resmi SMK Telkom Jakarta.",
}

export default function SyaratKetentuanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold"
            >
              Ketentuan Resmi
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Syarat & <span className="text-primary">Ketentuan</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Panduan regulasi dan persyaratan pendaftaran bagi calon peserta didik baru SMK Telkom Jakarta.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8 text-neutral-700 leading-relaxed text-sm sm:text-base">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <FileCheck className="h-6 w-6 text-primary" />
                <h2>1. Persyaratan Pendaftar Calon Siswa</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Telah lulus atau sedang menempuh semester akhir di jenjang SMP/MTs sederajat.</li>
                <li>Memiliki Nomor Induk Siswa Nasional (NISN) yang valid dan terdaftar di Dapodik / Kemdikbud.</li>
                <li>Memiliki integritas yang baik serta bebas dari penyalahgunaan narkotika dan zat adiktif lainnya.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <h2>2. Ketentuan Seleksi & Penjurusan</h2>
              </div>
              <p>
                Penetapan kelulusan calon siswa pada salah satu dari 4 program keahlian (RPL, TKJ, DKV, atau TJA) didasarkan pada hasil seleksi nilai rapor, tes kompetensi minat bakat, dan kuota daya tampung masing-masing jurusan.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <Scale className="h-6 w-6 text-primary" />
                <h2>3. Keabsahan Dokumen</h2>
              </div>
              <p>
                Calon peserta didik bertanggung jawab penuh atas keaslian seluruh berkas yang diunggah. Apabila ditemukan pemalsuan data dokumen, pihak sekolah berhak membatalkan status pendaftaran.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h2>4. Keputusan Panitia PPDB</h2>
              </div>
              <p>
                Keputusan panitia penerimaan siswa baru SMK Telkom Jakarta bersifat final dan mengikat sesuai pedoman Yayasan Pendidikan Telkom.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
