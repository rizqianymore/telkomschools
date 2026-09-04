import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PhoneCall, Mail } from "lucide-react"

export function CTA() {
  return (
    <section id="kontak" className="relative bg-neutral-50/60 py-20 md:py-28 border-t border-neutral-200/80 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white px-6 py-16 sm:px-12 sm:py-20 md:p-20 shadow-sm">
          <div className="relative mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold"
            >
              Pendaftaran Siswa Baru
            </Badge>

            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl md:leading-tight">
              Siap Memulai Perjalanan Prestasi Bersama Telkom Schools?
            </h2>

            <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Bergabunglah dengan ribuan siswa berprestasi lainnya. Dapatkan pendidikan berkualitas dengan fasilitas terbaik dan kurikulum berstandar internasional.
            </p>

            {/* CTA Buttons with normalized sizes */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                render={<Link href="/kontak" />}
                className="w-full sm:w-auto text-sm font-semibold shadow-sm"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<a href="tel:+622112345678" />}
                className="w-full sm:w-auto border-neutral-300 bg-white text-sm font-medium text-neutral-800 hover:bg-neutral-50 hover:text-neutral-900"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Hubungi Konsultan Kami</span>
              </Button>
            </div>

            {/* Quick Contact Info */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@telkomschools.sch.id</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-primary" />
                <span>(021) 1234-5678 / +62 812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
