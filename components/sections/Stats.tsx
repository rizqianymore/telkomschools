import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, BookOpen, GraduationCap } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "1.000+",
    label: "Siswa Aktif",
    desc: "Belajar & berkarya setiap hari",
  },
  {
    icon: Award,
    value: "50+",
    label: "Guru Profesional",
    desc: "Tersertifikasi & berpengalaman",
  },
  {
    icon: BookOpen,
    value: "20+",
    label: "Program Unggulan",
    desc: "Akademik & vokasi terpadu",
  },
  {
    icon: GraduationCap,
    value: "95%",
    label: "Tingkat Kelulusan",
    desc: "Diterima di PTN & industri top",
  },
]

export function Stats() {
  return (
    <section className="relative border-y border-neutral-200/80 bg-neutral-50/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <Card
                key={idx}
                className="group border-neutral-200/90 bg-white shadow-sm hover:border-red-200 hover:shadow"
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                      {item.value}
                    </div>
                    <div className="text-sm font-semibold text-neutral-800">
                      {item.label}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
