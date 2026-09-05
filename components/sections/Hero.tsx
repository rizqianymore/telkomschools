import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section id="beranda" className="relative bg-white pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <Badge
              variant="outline"
              className="mb-6 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              <span>Penerimaan Siswa Baru TA 2026/2027</span>
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl md:leading-[1.12]">
              Membangun Generasi <br className="hidden sm:inline" />
              <span className="text-primary">Unggul & Berkarakter</span> Digital
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
              Sekolah vokasi teknologi terdepan di bawah naungan Yayasan Pendidikan Telkom. 
              Mempersiapkan talenta digital siap kerja dengan kurikulum industri dan pembinaan intensif tembus perguruan tinggi negeri.
            </p>

            {/* CTA Buttons: Clean, basic, and balanced */}
            <div className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-3">
              <Button
                render={<Link href="/daftar" />}
                className="w-full sm:w-auto"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/tentang" />}
                className="w-full sm:w-auto border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            {/* Trust Badges - Data & Unique Value Points */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>50+ Mitra Industri & BUMN</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Sertifikasi BNSP & Internasional</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>3 Jurusan: RPL, TKJ, DKV</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Visual Image Card */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-2">
                <div className="relative overflow-hidden rounded-lg bg-neutral-900 aspect-[4/3] sm:aspect-[16/11]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                    alt="Siswa SMK Telkom Jakarta"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute top-3 left-3 right-3 rounded-md bg-neutral-950/80 backdrop-blur-sm px-3 py-2 text-white shadow-md">
                    <p className="text-xs text-white font-medium">SMK Telkom Jakarta, Jakarta Barat</p>
                  </div>
                </div>
              </div>

              {/* Minimal Stat Card */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 rounded-lg border border-neutral-200 bg-white p-3.5 sm:max-w-[210px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-red-50 text-primary font-bold text-base">
                    ✓
                  </div>
                  <div>
                    <div className="text-base font-bold text-neutral-900 leading-tight">94%</div>
                    <div className="text-xs text-neutral-500">Lulusan Bekerja & Lanjut PTN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
