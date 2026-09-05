import { Card, CardContent } from "@/components/ui/card"
import { Compass, Target, CheckCircle2 } from "lucide-react"

export function AboutVisiMisi() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Compass className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">Visi Institusi</h2>
              </div>
              <p className="mt-5 text-base text-neutral-600 leading-relaxed">
                Menjadi jaringan lembaga pendidikan vokasi teknologi terkemuka yang mencetak insan berdaya saing global dan berakhlak mulia.
              </p>
              <div className="mt-6 border-t border-neutral-100 pt-5 space-y-2 text-sm text-neutral-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Akreditasi A Unggul & Budaya Mutu Standar ISO</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Kemitraan Industri Global & Nasional</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Target className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">Misi Institusi</h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-neutral-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Menyelenggarakan pembelajaran inovatif berbasis teknologi digital terkini.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Membangun karakter disiplin, integritas tinggi, dan jiwa kepemimpinan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Menjalin kerjasama strategis dengan dunia usaha dan industri (DUDI).</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
