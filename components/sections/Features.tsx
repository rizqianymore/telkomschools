import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Laptop, 
  ShieldCheck, 
  Trophy, 
  Globe2, 
  Lightbulb, 
  Briefcase 
} from "lucide-react"

const features = [
  {
    icon: Laptop,
    title: "Kurikulum Berbasis IT & Industri",
    desc: "Materi pembelajaran diselaraskan dengan kebutuhan teknologi terkini seperti software development, data, dan cloud computing.",
  },
  {
    icon: ShieldCheck,
    title: "Penguatan Karakter & Disiplin",
    desc: "Membangun integritas moral, etika kerja, kemandirian, dan kepemimpinan berwawasan kebangsaan yang tangguh.",
  },
  {
    icon: Trophy,
    title: "Prestasi Nasional & Global",
    desc: "Didukung pembinaan intensif untuk olimpiade sains, kompetisi robotik, dan kejuaraan inovasi teknologi digital.",
  },
  {
    icon: Globe2,
    title: "Wawasan Internasional",
    desc: "Program bilingual, sertifikasi industri berstandar global (Cisco, Microsoft), serta kemitraan institusi luar negeri.",
  },
  {
    icon: Lightbulb,
    title: "Laboratorium & Fasilitas Canggih",
    desc: "Ruang multimedia interaktif, studio konten digital, dan laboratorium komputer terkini dengan koneksi internet fiber optic.",
  },
  {
    icon: Briefcase,
    title: "Penyaluran Kerja & Mitra Industri",
    desc: "Kemitraan strategis dengan ratusan perusahaan teknologi untuk praktik kerja lapangan (PKL) dan rekrutmen kerja.",
  },
]

export function Features() {
  return (
    <section id="keunggulan" className="relative bg-neutral-50/60 py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/60 text-primary font-semibold"
          >
            Keunggulan Kami
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Mengapa Memilih Telkom Schools?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Kombinasi sarana lengkap, kurikulum mutakhir, dan tenaga pengajar profesional 
            untuk mengoptimalkan potensi setiap siswa.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, idx) => {
            const Icon = item.icon
            return (
              <Card
                key={idx}
                className="group h-full border-neutral-200/90 bg-white p-2 shadow-sm hover:border-red-200 hover:shadow"
              >
                <CardHeader className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-bold text-neutral-900 group-hover:text-primary">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
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
