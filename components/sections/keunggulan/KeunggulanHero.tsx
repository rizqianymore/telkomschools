import { Badge } from "@/components/ui/badge"

export function KeunggulanHero() {
  return (
    <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Standar Kualitas Unggul</span>
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          Keunggulan <span className="text-primary">SMK Telkom Jakarta</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
          Kurikulum selaras industri, sarana laboratorium modern, dan sertifikasi global terintegrasi.
        </p>
      </div>
    </section>
  )
}
