import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Excellence (Keunggulan)",
    desc: "Menghasilkan standar mutu akademis dan kompetensi vokasi tertinggi.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity (Integritas)",
    desc: "Menanamkan etika profesi, kejujuran, dan disiplin tinggi.",
  },
  {
    icon: HeartHandshake,
    title: "Harmony (Kebersamaan)",
    desc: "Atmosfer belajar kolaboratif, inklusif, dan peduli sesama.",
  },
  {
    icon: Sparkles,
    title: "Innovation (Inovasi)",
    desc: "Adaptif terhadap perkembangan teknologi masa depan.",
  },
]

export function AboutValues() {
  return (
    <section className="bg-neutral-50/60 py-20 border-y border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
          >
            Nilai Budaya
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Nilai Utama Pembinaan Karakter
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Empat pilar nilai yang diinternalisasikan ke seluruh civitas akademika.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <Card key={i} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
                <CardContent className="p-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
