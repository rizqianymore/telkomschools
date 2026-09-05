import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ProgramHero() {
  return (
    <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Program Kejuruan & Vokasi</span>
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          Program Keahlian & <span className="text-primary">Jurusan</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
          Kurikulum berbasis standar industri global untuk mencetak lulusan kompeten, siap kerja, dan berdaya saing tinggi.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button
            render={<Link href="/quiz" />}
            className="h-10 px-5 text-sm font-medium rounded-md"
          >
            <span>Ikuti Quiz Minat Jurusan</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            render={<Link href="/kontak" />}
            className="h-10 px-5 text-sm font-medium rounded-md border-neutral-200 bg-white"
          >
            Daftar PPDB Sekarang
          </Button>
        </div>
      </div>
    </section>
  )
}
