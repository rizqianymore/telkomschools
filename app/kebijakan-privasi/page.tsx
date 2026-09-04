import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Kebijakan Privasi - SMK Telkom Jakarta",
  description: "Kebijakan perlindungan data pribadi siswa, orang tua, dan pengguna portal resmi SMK Telkom Jakarta.",
}

export default function KebijakanPrivasiPage() {
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
              Legal & Privasi
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Kebijakan <span className="text-primary">Privasi</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Komitmen SMK Telkom Jakarta dalam melindungi privasi, data pribadi pendaftar PPDB, dan seluruh civitas akademika.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 text-neutral-700 leading-relaxed text-sm sm:text-base">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <h2>1. Informasi yang Kami Kumpulkan</h2>
              </div>
              <p>
                SMK Telkom Jakarta mengumpulkan informasi identitas pendaftar berupa Nama Lengkap, Nomor Induk Siswa Nasional (NISN), nomor telepon/WhatsApp, alamat email, asal sekolah, dan rekap nilai rapor untuk keperluan proses seleksi Penerimaan Peserta Didik Baru (PPDB).
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <Eye className="h-6 w-6 text-primary" />
                <h2>2. Penggunaan Informasi</h2>
              </div>
              <p>
                Informasi yang dikumpulkan digunakan semata-mata untuk:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-neutral-600">
                <li>Memvalidasi keabsahan data registrasi siswa baru dan penempatan jurusan (RPL, TKJ, DKV, TJA).</li>
                <li>Menghubungi calon siswa dan orang tua terkait status penerimaan, tes wawancara, dan jadwal akademik.</li>
                <li>Menyediakan layanan autentikasi aman pada portal terpadu sekolah.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <Lock className="h-6 w-6 text-primary" />
                <h2>3. Keamanan Data & Standar ISO</h2>
              </div>
              <p>
                Kami menerapkan standar keamanan enkripsi data tingkat tinggi (HMAC-SHA256, Scrypt password hashing, dan HttpOnly Secure Cookie) untuk mencegah akses tidak sah, kebocoran data, maupun penyalahgunaan pihak ketiga.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-neutral-900 font-bold text-lg">
                <FileText className="h-6 w-6 text-primary" />
                <h2>4. Hak Pengguna</h2>
              </div>
              <p>
                Setiap pendaftar dan wali murid berhak mengajukan perbaikan data atau pencabutan informasi melalui kantor sekretariat PPDB SMK Telkom Jakarta atau melalui layanan resmi helpdesk kami.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
