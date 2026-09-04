import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Baby, BookOpenCheck, School, GraduationCap, Code2, Palette } from "lucide-react"

const programs = [
  {
    icon: Baby,
    title: "Taman Kanak-Kanak (TK)",
    tag: "Usia Dini",
    desc: "Pendidikan pondasi karakter berbasis eksplorasi sensorik motorik, sosialisasi sehat, dan pengenalan literasi dasar.",
    highlights: ["Play-based Learning", "Karakter Islami / Budi Pekerti", "Bilingual Introduction"],
  },
  {
    icon: BookOpenCheck,
    title: "Sekolah Dasar (SD)",
    tag: "Pondasi Dasar",
    desc: "Menumbuhkan daya nalar kritis, kecintaan belajar, penguasaan literasi numerasi, dan dasar logika komputasi.",
    highlights: ["Kelas Sains Terapan", "Coding for Kids", "Ekstrakurikuler Aktif"],
  },
  {
    icon: School,
    title: "Sekolah Menengah Pertama (SMP)",
    tag: "Menengah",
    desc: "Penguatan kemampuan analitis, eksplorasi teknologi, dan pembentukan kepemimpinan remaja berkarakter mandiri.",
    highlights: ["Informatika Terpadu", "Robotic Club", "Leadership Training"],
  },
  {
    icon: GraduationCap,
    title: "Sekolah Menengah Kejuruan / SMA",
    tag: "Unggulan",
    desc: "Fokus pada penguasaan kejuruan digital terkini (RPL, TKJ, DKV) serta persiapan tembus perguruan tinggi favorit.",
    highlights: ["Sertifikasi Industri", "Magang Perusahaan", "Kelas Akselerasi PTN"],
  },
  {
    icon: Code2,
    title: "Kursus & Bootcamp Teknologi",
    tag: "Upskilling",
    desc: "Program singkat bersertifikat untuk pelajar maupun umum dalam bidang Web Development, Cloud, dan Data.",
    highlights: ["Portfolio Project", "Praktisi Industri", "Jadwal Fleksibel"],
  },
  {
    icon: Palette,
    title: "Ekstrakurikuler & Minat Bakat",
    tag: "Pengembangan Diri",
    desc: "Wadah penyaluran minat di bidang sains, olahraga atletik, karya seni kreatif, dan kompetisi keterampilan.",
    highlights: ["25+ Pilihan Klub", "Kompetisi Rutin", "Pelatih Berlisensi"],
  },
]

export function Programs() {
  return (
    <section id="program" className="relative bg-white py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/60 text-primary font-semibold"
          >
            Konsentrasi & Program
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Program Keahlian & Ekstrakurikuler
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Kurikulum kejuruan unggulan di SMK Telkom Jakarta dirancang terintegrasi dengan kebutuhan industri teknologi digital modern.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((item, idx) => {
            const Icon = item.icon
            return (
              <Card
                key={idx}
                className="flex h-full flex-col justify-between border-neutral-200/90 bg-white shadow-sm hover:border-red-200 hover:shadow"
              >
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium text-neutral-700 bg-neutral-100">
                      {item.tag}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-lg font-bold text-neutral-900">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0 pb-4">
                  <div className="border-t border-neutral-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5">
                      Fokus Utama:
                    </p>
                    <ul className="space-y-1.5 text-xs text-neutral-600">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 border-t-0 bg-transparent">
                  <Button
                    variant="outline"
                    size="default"
                    render={<Link href="/program" />}
                    className="w-full justify-between rounded-xl border-neutral-200 text-sm font-medium text-neutral-800 hover:border-primary hover:bg-red-50 hover:text-primary"
                  >
                    <span>Detail Program</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
