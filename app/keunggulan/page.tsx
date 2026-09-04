import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Laptop, 
  ShieldCheck, 
  Trophy, 
  Globe2, 
  Lightbulb, 
  Briefcase,
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  Building2,
  ArrowRight,
  Code2,
  Award
} from "lucide-react"

export const metadata: Metadata = {
  title: "Keunggulan Kami - SMK Telkom Jakarta",
  description: "Fasilitas, kurikulum teknologi, sertifikasi industri, dan keunggulan kompetitif SMK Telkom Jakarta.",
}

const mainPillars = [
  {
    icon: Laptop,
    title: "Kurikulum IT Berbasis Industri",
    desc: "Materi pembelajaran diselaraskan dengan kebutuhan industri software global: Web Development, Cloud Computing, Cybersecurity, dan Artificial Intelligence.",
  },
  {
    icon: ShieldCheck,
    title: "Penguatan Karakter & Etika Digital",
    desc: "Membentuk pribadi yang berdisiplin tinggi, berintegritas moral, dan memiliki etika profesional kuat di dunia kerja maupun sosial.",
  },
  {
    icon: Trophy,
    title: "Prestasi Nasional & Internasional",
    desc: "Siswa secara konsisten meraih medali emas dalam Olimpiade Sains Nasional (OSN), Lomba Kompetensi Siswa (LKS), dan kejuaraan robotik internasional.",
  },
  {
    icon: Globe2,
    title: "Sertifikasi Global Terintegrasi",
    desc: "Lulusan dibekali sertifikasi resmi yang diakui dunia kerja seperti Cisco Certified Support Technician (CCST), Microsoft Certified, dan Oracle Academy.",
  },
  {
    icon: Lightbulb,
    title: "Metode Pembelajaran Project-Based",
    desc: "Siswa belajar memecahkan masalah nyata melalui pengerjaan proyek riil dari industri, bukan sekadar hafalan teori.",
  },
  {
    icon: Briefcase,
    title: "Bursa Kerja Khusus & Magang",
    desc: "Kerjasama kemitraan strategis dengan lebih dari 200 perusahaan terkemuka di Indonesia untuk program magang (PKL) dan rekrutmen kerja lulusan.",
  },
]

const facilityDetails = [
  {
    icon: Cpu,
    title: "Laboratorium AI & Data Science",
    specs: ["PC Workstation Intel Core i7 / RTX 4070", "Akses Cloud Server AWS & Google Cloud", "Dataset Riset Terpadu"],
    desc: "Fasilitas riset mendalam untuk pelatihan model machine learning dan analisis data berskala besar.",
  },
  {
    icon: Building2,
    title: "Smart Multimedia Studio",
    desc: "Studio green screen, kamera 4K cinema, audio recording sound-proof untuk produksi konten multimedia dan animasi 3D.",
    specs: ["Studio Kedap Suara", "Lighting Broadcast Studio", "Audio Mixer & Recording"],
  },
  {
    icon: Code2,
    title: "Network & Hardware Lab",
    desc: "Rak server modular, router dan switch Cisco enterprise, serta perangkat fiber optic splicer untuk praktik jaringan nyata.",
    specs: ["Perangkat Cisco Enterprise", "Alat Fiber Optic Splicing", "Simulasi Data Center"],
  },
]

export default function KeunggulanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Standar Kualitas Unggul</span>
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Keunggulan <span className="text-primary">SMK Telkom Jakarta</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
              Mengenal lebih dalam keunggulan kurikulum kejuruan, sarana laboratorium modern, dan jaminan mutu yang menjadikan kami sekolah vokasi terbaik di Jakarta.
            </p>
          </div>
        </section>

        {/* 6 Main Pillars */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
              >
                Pilar Utama
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                6 Pilar Keunggulan Pendidikan
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Dirancang secara terintegrasi untuk mempersiapkan siswa menjadi tenaga profesional yang kompeten dan adaptif.
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

        {/* Detailed Facilities */}
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
                Fasilitas Laboratorium & Studio Modern
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Sarana berstandar industri nyata agar siswa terbiasa bekerja dengan teknologi dan standar industri sesungguhnya.
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

        {/* Certifications & Quality Assurance */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50/50 p-8 sm:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="outline" className="mb-3 text-xs border-red-200 bg-red-50 text-primary font-medium">
                  Akreditasi & Jaminan
                </Badge>
                <h3 className="text-2xl font-bold text-neutral-900">Sertifikasi & Mitra Global Resmi</h3>
                <p className="mt-3 text-sm text-neutral-600">
                  Telkom Schools menerapkan Sistem Manajemen Mutu berstandar ISO serta didukung lisensi resmi dari prinsipal teknologi global.
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
                  <div className="text-xs text-neutral-500 mt-1">Sistem Mutu Pendidikan</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
                  <Globe2 className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-bold text-neutral-900">Cisco Networking Academy</div>
                  <div className="text-xs text-neutral-500 mt-1">Sertifikasi Jaringan Global</div>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
                  <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-bold text-neutral-900">Microsoft Showcase School</div>
                  <div className="text-xs text-neutral-500 mt-1">Pendidikan Digital Modern</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-50/60 border-t border-neutral-200/80 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Raih Masa Depan Gemilang Bersama Kami
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              Jadilah bagian dari generasi digital berdaya saing global yang siap menghadapi tantangan dunia industri.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button size="lg" render={<Link href="/kontak" />} className="text-sm font-semibold">
                <span>Daftar Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/program" />} className="border-neutral-300">
                Eksplorasi Program Studi
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
