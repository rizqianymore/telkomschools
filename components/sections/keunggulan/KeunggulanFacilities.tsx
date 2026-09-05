import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Building2, Code2, CheckCircle2, Award, Globe2, Sparkles } from "lucide-react"

const facilityDetails = [
  {
    icon: Cpu,
    title: "Laboratorium AI & Data Science",
    specs: ["PC Workstation High-End (RTX GPU)", "Akses Cloud Server Terpadu", "Modul Praktikum Berbasis Kasus"],
    desc: "Fasilitas riset mendalam untuk pelatihan model machine learning dan analisis data.",
  },
  {
    icon: Building2,
    title: "Smart Multimedia Studio",
    desc: "Studio green screen, kamera 4K cinema, dan sound-proof recording untuk animasi dan audio visual.",
    specs: ["Studio Kedap Suara", "Lighting Broadcast Studio", "Audio Mixer & Recording"],
  },
  {
    icon: Code2,
    title: "Network & Hardware Lab",
    desc: "Rak server modular, router switch Cisco enterprise, dan splicing tools untuk simulasi industri nyata.",
    specs: ["Perangkat Cisco Enterprise", "Alat Fiber Optic Splicing", "Simulasi Data Center"],
  },
]

export function KeunggulanFacilities() {
  return (
    <>
      <section className="bg-neutral-50/60 py-20 border-y border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
            >
              Infrastruktur
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Fasilitas Laboratorium & Studio
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              Peralatan standar industri modern agar siswa terbiasa bekerja dengan teknologi sesungguhnya.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {facilityDetails.map((f, i) => {
              const Icon = f.icon
              return (
                <Card key={i} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
                  <CardContent className="p-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">{f.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
                    <div className="mt-5 border-t border-neutral-100 pt-4 space-y-2 text-xs font-medium text-neutral-700">
                      {f.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Akreditasi & Sertifikasi */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50/50 p-8 sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-3 text-xs border-red-200 bg-red-50 text-primary font-medium">
                Akreditasi & Jaminan Mutu
              </Badge>
              <h3 className="text-2xl font-bold text-neutral-900">Sertifikasi & Lisensi Resmi</h3>
              <p className="mt-3 text-sm text-neutral-600">
                Didukung akreditasi unggul dan sertifikasi prinsipal teknologi skala global.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
                <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-bold text-neutral-900">Akreditasi A Unggul</div>
                <div className="text-xs text-neutral-500 mt-1">BAN-SM Nasional</div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
                <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-bold text-neutral-900">ISO 9001:2015</div>
                <div className="text-xs text-neutral-500 mt-1">Sistem Manajemen Mutu</div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
                <Globe2 className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-bold text-neutral-900">Cisco Networking Academy</div>
                <div className="text-xs text-neutral-500 mt-1">Jaringan Global</div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
                <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-bold text-neutral-900">Microsoft Showcase</div>
                <div className="text-xs text-neutral-500 mt-1">Pendidikan Digital</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
