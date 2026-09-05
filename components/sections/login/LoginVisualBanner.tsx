import { CheckCircle2 } from "lucide-react"

export function LoginVisualBanner() {
  return (
    <div className="relative hidden bg-neutral-900 lg:block overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
        alt="SMK Telkom Jakarta Campus"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/50" />

      <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
        <div className="max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-800/80 px-3 py-1 text-xs font-medium text-neutral-200">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Portal Akademik & Layanan</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white">
            Pusat Pembelajaran & Aktivitas Digital
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Satu portal terpadu untuk monitoring kemajuan studi, akses kurikulum industri, dan administrasi sekolah.
          </p>

          <div className="pt-2 space-y-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>Presensi, nilai, dan penugasan digital</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>Akses materi praktikum kurikulum industri</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <span>Komunikasi langsung guru dan siswa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
