import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Laptop, ShieldCheck, Trophy, Globe2, Lightbulb, Briefcase } from "lucide-react"

const mainPillars = [
  {
    icon: Laptop,
    title: "Kurikulum IT Berbasis Industri",
    desc: "Materi diselaraskan dengan tren industri global: Software Engineering, Cloud, Cybersecurity, dan AI.",
  },
  {
    icon: ShieldCheck,
    title: "Karakter & Etika Profesional",
    desc: "Membentuk pribadi berdisiplin tinggi, integritas moral, dan etika kerja yang kuat.",
  },
  {
    icon: Trophy,
    title: "Prestasi Berkelanjutan",
    desc: "Raihan medali kompetisi bergengsi seperti LKS Nasional, OSN, dan kejuaraan robotik.",
  },
  {
    icon: Globe2,
    title: "Sertifikasi Internasional",
    desc: "Dibekali sertifikasi resmi yang diakui dunia industri (Cisco, Microsoft, Oracle).",
  },
  {
    icon: Lightbulb,
    title: "Project-Based Learning",
    desc: "Siswa belajar memecahkan masalah riil melalui portofolio proyek langsung dari industri.",
  },
  {
    icon: Briefcase,
    title: "Bursa Kerja Khusus (BKK)",
    desc: "Kemitraan dengan 200+ perusahaan teknologi untuk magang industri dan penyerapan kerja.",
  },
]

export function KeunggulanPillars() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 text-xs border-neutral-200 bg-neutral-100 text-neutral-800 font-medium"
          >
            Pilar Utama
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            6 Pilar Keunggulan Pendidikan
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Mempersiapkan siswa menjadi talenta digital yang kompeten, kreatif, dan adaptif.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainPillars.map((item, idx) => {
            const Icon = item.icon
            return (
              <Card key={idx} className="border-neutral-200/90 bg-white p-2 shadow-sm hover:border-red-200 hover:shadow">
                <CardHeader className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-bold text-neutral-900">{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
