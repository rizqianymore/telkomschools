import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Compass, 
  Target, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles,
  Users2,
  CheckCircle2,
  ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Tentang Kami - SMK Telkom Jakarta",
  description: "Sejarah, visi, misi, nilai-nilai budaya, dan kepemimpinan SMK Telkom Jakarta di bawah naungan Yayasan Pendidikan Telkom.",
}

const timelines = [
  {
    year: "1992",
    title: "Pendirian Sekolah Kejuruan Pertama",
    desc: "Diawali dengan berdirinya sekolah telekomunikasi pertama untuk memenuhi kebutuhan talenta teknis telekomunikasi nasional.",
  },
  {
    year: "2005",
    title: "Ekspansi Kampus SMK Telkom Jakarta",
    desc: "Mendirikan kampus terpadu di Daan Mogot Jakarta Barat dengan fokus kejuruan informatika dan jaringan komputer modern.",
  },
  {
    year: "2015",
    title: "Integrasi Standar Mutu Telkom Schools",
    desc: "Seluruh unit kejuruan terakreditasi A Unggul di bawah naungan Yayasan Pendidikan Telkom (YPT) berstandar industri internasional.",
  },
  {
    year: "2026",
    title: "Pionir Pendidikan Digital AI & Cloud",
    desc: "Meluncurkan kurikulum mutakhir integrasi AI, cybersecurity, dan cloud computing yang terhubung langsung dengan ekosistem industri global.",
  },
]

const values = [
  {
    icon: Award,
    title: "Excellence (Keunggulan)",
    desc: "Berkomitmen menghasilkan standar mutu akademis dan kompetensi vokasi tertinggi di setiap tingkatan.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity (Integritas)",
    desc: "Menanamkan kejujuran, etika profesi, kedisiplinan, dan tanggung jawab moral sebagai pondasi karakter siswa.",
  },
  {
    icon: HeartHandshake,
    title: "Harmony (Kebersamaan)",
    desc: "Membangun atmosfer belajar yang inklusif, kolaboratif, peduli sesama, dan berjiwa kekeluargaan erat.",
  },
  {
    icon: Sparkles,
    title: "Innovation (Inovasi)",
    desc: "Terus adaptif dengan kemajuan teknologi mutakhir guna menjawab tantangan revolusi digital masa depan.",
  },
]

const leadership = [
  {
    name: "Dr. Ir. Dwi S. Purnomo, M.M.",
    role: "Ketua Yayasan Pendidikan Telkom",
    desc: "Berpengalaman lebih dari 25 tahun memimpin transformasi pendidikan teknologi dan manajemen korporasi.",
  },
  {
    name: "Prof. Dr. Hendra Suhartono, M.T.",
    role: "Direktur Pendidikan Dasar & Menengah",
    desc: "Pakar kurikulum vokasi teknologi dan pembina olimpiade sains nasional dan internasional.",
  },
  {
    name: "Dra. Ratna Kusumawati, M.Pd.",
    role: "Kepala Penjaminan Mutu & Karakter",
    desc: "Mendedikasikan karir pada pengembangan karakter pelajar Pancasila dan budaya mutu berstandar ISO.",
  },
]

export default function TentangPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Header */}
        <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Profil & Sejarah Institusi</span>
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Tentang <span className="text-primary">Telkom Schools</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
              Mengenal lebih dekat dedikasi lebih dari 30 tahun Yayasan Pendidikan Telkom dalam mencetak generasi cerdas, berkarakter, dan berdaya saing global.
            </p>
          </div>
        </section>

        {/* Visi & Misi Detail */}
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
                    Menjadi jaringan lembaga pendidikan terkemuka bertaraf internasional yang mencetak insan berdaya saing global, 
                    unggul dalam penguasaan teknologi digital mutakhir, dan berlandaskan budi pekerti luhur.
                  </p>
                  <div className="mt-6 border-t border-neutral-100 pt-5 space-y-2 text-sm text-neutral-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>Standar Akreditasi Unggul & Sertifikasi ISO</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>Kerjasama Global dengan Industri Teknologi Dunia</span>
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
                      <span>Menyelenggarakan proses pembelajaran yang inovatif berbasis teknologi informasi dan komunikasi terkini.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Membangun ekosistem belajar yang berkarakter kuat, berakhlak mulia, disiplin, dan berjiwa kepemimpinan.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Mengembangkan kemitraan strategis dengan dunia usaha dan industri skala nasional dan internasional.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>Mempersiapkan lulusan yang kompetitif dan siap diserap oleh industri teknologi serta kampus unggulan.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nilai Budaya Utama */}
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
                Empat pilar nilai yang diinternalisasikan kepada seluruh civitas akademika Telkom Schools.
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

        {/* Sejarah & Milestone */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
              >
                Jejak Langkah
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Sejarah Perjalanan SMK Telkom Jakarta
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Transformasi panjang dari sekolah kejuruan telekomunikasi perintis hingga menjadi institusi pendidikan vokasi digital terdepan di Jakarta.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {timelines.map((item, idx) => (
                <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
                  <CardContent className="p-0">
                    <span className="text-2xl font-extrabold text-primary">{item.year}</span>
                    <h3 className="mt-3 text-base font-bold text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pimpinan Yayasan */}
        <section className="bg-neutral-50/60 py-20 border-t border-neutral-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
              >
                Kepemimpinan
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Dewan Pembina & Pengelola
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Dipimpin oleh para profesional dan akademisi berpengalaman yang mengawal visi mutu pendidikan nasional.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {leadership.map((leader, idx) => (
                <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
                  <CardContent className="p-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary mb-4">
                      <Users2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-900">{leader.name}</h3>
                    <div className="text-xs font-semibold text-primary mt-0.5">{leader.role}</div>
                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{leader.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white border-t border-neutral-200/80 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Siap Bergabung dengan Keluarga Besar Kami?
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              Daftarkan putra-putri Anda sekarang untuk mendapatkan pendidikan berkualitas dengan fasilitas terbaik.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button size="lg" render={<Link href="/kontak" />} className="text-sm font-semibold">
                <span>Daftar Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/program" />} className="border-neutral-300">
                Lihat Program Studi
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
