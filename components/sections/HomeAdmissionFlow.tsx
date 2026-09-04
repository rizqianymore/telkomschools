import Link from "next/link"
import { UserPlus, FileCheck2, Cpu, CheckCircle2, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Pendaftaran Akun",
    desc: "Buat akun calon siswa di portal PPDB online dan pilih jurusan yang diminati (RPL, TKJ, atau DKV).",
  },
  {
    step: "02",
    icon: FileCheck2,
    title: "Verifikasi Berkas",
    desc: "Unggah dokumen rapor, KK, akta kelahiran, dan sertifikat prestasi (khusus pendaftar jalur prestasi).",
  },
  {
    step: "03",
    icon: Cpu,
    title: "Tes Minat & Skolastik",
    desc: "Ikuti tes potensi skolastik dasar dan wawancara peminatan secara daring atau langsung di kampus.",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Pengumuman & Daftar Ulang",
    desc: "Lihat hasil seleksi secara transparan di portal dan selesaikan administrasi daftar ulang.",
  },
]

export function HomeAdmissionFlow() {
  return (
    <section className="bg-neutral-50/70 py-20 border-b border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge
            variant="outline"
            className="mb-3 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3 py-1 text-xs font-medium text-primary shadow-none"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Alur PPDB 2026/2027</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            4 Langkah Mudah Mendaftar
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Proses penerimaan siswa baru dirancang terpadu, cepat, dan dapat dipantau langsung statusnya secara daring.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-100 text-neutral-800">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-extrabold text-neutral-300">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            render={<Link href="/kontak" />}
            className="w-full sm:w-auto"
          >
            <span>Konsultasi & Pendaftaran Sekarang</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
