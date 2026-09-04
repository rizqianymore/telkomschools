import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Baby, 
  BookOpenCheck, 
  School, 
  GraduationCap, 
  Code2, 
  Palette,
  CheckCircle2, 
  ArrowRight,
  Clock
} from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Program Keahlian & Jurusan - SMK Telkom Jakarta",
  description: "Daftar lengkap jurusan kejuruan teknologi, kurikulum industri, dan alur pendaftaran siswa baru SMK Telkom Jakarta.",
}

const detailedPrograms = [
  {
    icon: Baby,
    title: "Taman Kanak-Kanak & PAUD Telkom",
    badge: "Usia Dini (3 - 6 Tahun)",
    desc: "Menstimulasi kecerdasan majemuk dan kreativitas anak melalui metode bermain yang interaktif, menanamkan akhlak mulia, serta pengenalan literasi dan numerasi dasar.",
    curriculum: [
      "Metode Belajar Sentra & Montessori Edukasi",
      "Pendidikan Nilai Karakter Islami / Budi Pekerti",
      "Pengenalan Bahasa Inggris Interaktif (Bilingual)",
      "Aktivitas Motorik & Eksplorasi Seni Kreatif"
    ],
    duration: "1 - 2 Tahun",
  },
  {
    icon: BookOpenCheck,
    title: "Sekolah Dasar (SD) Telkom",
    badge: "Pondasi Dasar (Kelas 1 - 6)",
    desc: "Membangun fondasi logika berpikir kritis, kecakapan numerasi, literasi sains mendalam, serta pengenalan dasar-dasar coding dan komputer ramah anak.",
    curriculum: [
      "Kurikulum Nasional Unggulan Berbasis Proyek",
      "Coding & Computational Thinking for Kids",
      "Program Pembinaan Olimpiade Matematika & IPA",
      "Pembiasaan Disiplin, Religi & Kepemimpinan"
    ],
    duration: "6 Tahun",
  },
  {
    icon: School,
    title: "SMP Telkom",
    badge: "Menengah Pertama (Kelas 7 - 9)",
    desc: "Mempersiapkan remaja yang mandiri, adaptif terhadap perkembangan teknologi, berprestasi secara akademis, dan memiliki jiwa sosial kepemimpinan tinggi.",
    curriculum: [
      "Informatika & Robotika Pemula Berkelanjutan",
      "Praktek Sains & Laboratorium Eksperimental",
      "Bilingual Class & Sertifikasi Bahasa Asing",
      "Leadership Camp & Program Karakter Tangguh"
    ],
    duration: "3 Tahun",
  },
  {
    icon: GraduationCap,
    title: "SMK Telkom (Kejuruan Unggulan)",
    badge: "Menengah Kejuruan (Kelas 10 - 12)",
    desc: "Fokus kejuruan digital berstandar industri dengan 3 konsentrasi: Rekayasa Perangkat Lunak (RPL), Teknik Komputer & Jaringan (TKJ), dan Desain Komunikasi Visual (DKV).",
    curriculum: [
      "RPL: Full-Stack Web, Mobile Apps & Cloud API",
      "TKJ: Cisco Networking, Cyber Security & Fiber Optic",
      "DKV: UI/UX Design, Motion Graphic & 3D Animation",
      "Magang Industri 6 Bulan & Uji Kompetensi BNSP"
    ],
    duration: "3 Tahun",
  },
  {
    icon: Code2,
    title: "Bootcamp & Kursus Sertifikasi IT",
    badge: "Pelatihan Profesional & Siswa",
    desc: "Program akselerasi singkat intensif bagi pelajar dan umum untuk menguasai keterampilan teknis yang paling dicari oleh startup dan perusahaan teknologi.",
    curriculum: [
      "Frontend Development (React, Next.js, Tailwind)",
      "Backend & Cloud Database (Node.js, PostgreSQL)",
      "Python for Data Science & Machine Learning",
      "Sertifikasi Industri Cisco & Microsoft"
    ],
    duration: "3 - 6 Bulan",
  },
  {
    icon: Palette,
    title: "Ekstrakurikuler & Minat Bakat",
    badge: "Pengembangan Holistik",
    desc: "Lebih dari 25 klub minat bakat di bidang sains, olahraga, seni budaya, dan teknologi untuk mengasah potensi non-akademik secara maksimal.",
    curriculum: [
      "Klub Robotik, Drone & Internet of Things (IoT)",
      "E-Sports Edukatif & Desain Game Terarah",
      "Basket, Futsal, Badminton, & Bela Diri",
      "Seni Teater, Paduan Suara, Musik & Fotografi"
    ],
    duration: "Reguler Sepanjang Semester",
  },
]

const admissionSteps = [
  {
    num: "01",
    title: "Buat Akun & Registrasi",
    desc: "Mengisi data awal calon siswa secara online melalui formulir pendaftaran serta memilih cabang kampus dan jenjang sekolah.",
  },
  {
    num: "02",
    title: "Unggah Kelengkapan Berkas",
    desc: "Melampirkan scan rapor semester terakhir, kartu keluarga, akta kelahiran, dan sertifikat piagam prestasi (bila ada).",
  },
  {
    num: "03",
    title: "Ujian Potensi & Wawancara",
    desc: "Menjalani tes kemampuan dasar akademik, observasi minat bakat digital, dan sesi wawancara daring bersama orang tua.",
  },
  {
    num: "04",
    title: "Pengumuman & Daftar Ulang",
    desc: "Melihat hasil seleksi secara transparan di dashboard portal dan melakukan penyelesaian administrasi daftar ulang.",
  },
]

export default function ProgramPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold"
            >
              Jalur Pendidikan Lengkap
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Program <span className="text-primary">Pendidikan</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
              Jalur studi terpadu yang dirancang sistematis untuk membimbing siswa dari usia dini hingga kesiapan kerja profesional dan perguruan tinggi favorit.
            </p>
          </div>
        </section>

        {/* Detailed Program Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {detailedPrograms.map((prog, idx) => {
                const Icon = prog.icon
                return (
                  <ScrollReveal key={idx} delay={(idx % 3) * 0.1}>
                    <Card className="flex h-full flex-col justify-between border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <Badge variant="secondary" className="text-xs font-medium text-neutral-700 bg-neutral-100">
                            {prog.badge}
                          </Badge>
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-neutral-900 leading-snug">{prog.title}</h3>
                        <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">{prog.desc}</p>

                        <div className="mt-5 border-t border-neutral-100 pt-4">
                          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5">
                            Materi & Fokus Unggulan:
                          </div>
                          <ul className="space-y-1.5 text-xs text-neutral-700">
                            {prog.curriculum.map((c, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-neutral-100 pt-4">
                        <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>Masa Studi: {prog.duration}</span>
                          </span>
                        </div>
                        <Button
                          size="default"
                          render={<Link href="/kontak" />}
                          className="w-full text-xs font-semibold"
                        >
                          <span>Daftar Jenjang Ini</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </Card>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Admission Steps */}
        <ScrollReveal>
          <section className="bg-neutral-50/60 py-20 border-y border-neutral-200/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <Badge
                  variant="outline"
                  className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold"
                >
                  Proses Admisi
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                  Alur Pendaftaran Peserta Didik Baru (PPDB)
                </h2>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  Empat tahap pendaftaran praktis dan transparan dari pendaftaran online hingga penetapan kelulusan.
                </p>
              </div>

              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {admissionSteps.map((step, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <Card className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
                      <CardContent className="p-0">
                        <span className="text-3xl font-extrabold text-primary">{step.num}</span>
                        <h3 className="mt-3 text-base font-bold text-neutral-900">{step.title}</h3>
                        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" render={<Link href="/kontak" />} className="text-sm font-semibold">
                  <span>Buka Formulir Pendaftaran</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
