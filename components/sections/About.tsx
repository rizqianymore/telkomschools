import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Compass, Target, CheckCircle2 } from "lucide-react"

const missionItems = [
  "Menyelenggarakan proses pembelajaran yang inovatif berbasis teknologi informasi modern.",
  "Membangun ekosistem belajar yang berkarakter, berakhlak mulia, dan berjiwa kepemimpinan.",
  "Mengembangkan kemitraan strategis dengan dunia usaha dan dunia industri (DUDI) skala global.",
  "Mempersiapkan lulusan yang kompetitif, adaptif, serta siap bersaing di era digital.",
]

export function About() {
  return (
    <section id="tentang" className="relative bg-white py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/60 text-primary font-semibold"
          >
            Tentang Kami
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Mewujudkan Pendidikan Vokasi Kelas Dunia
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            SMK Telkom Jakarta berdedikasi menciptakan generasi muda yang memiliki kecakapan kejuruan,
            keahlian praktis dalam ranah teknologi informasi, serta integritas moral yang kokoh.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Visi Card */}
          <Card className="h-full border-neutral-200/90 bg-neutral-50/40 p-6 sm:p-8 hover:border-red-200 hover:shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Visi Kami</h3>
              </div>
              <p className="mt-5 text-base text-neutral-600 leading-relaxed">
                Menjadi lembaga pendidikan terkemuka bertaraf internasional yang mencetak insan berdaya saing global, 
                unggul dalam teknologi digital, dan berlandaskan budi pekerti luhur.
              </p>
              <div className="mt-6 border-t border-neutral-200/80 pt-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary">
                  <span>Pendidikan Inovatif</span>
                  <span className="text-neutral-300">•</span>
                  <span>Karakter Kuat</span>
                  <span className="text-neutral-300">•</span>
                  <span>Daya Saing Global</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Misi Card */}
          <Card className="h-full border-neutral-200/90 bg-neutral-50/40 p-6 sm:p-8 hover:border-red-200 hover:shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Misi Kami</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {missionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-neutral-600 leading-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
