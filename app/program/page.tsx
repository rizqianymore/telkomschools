import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Code2, 
  Network, 
  Radio, 
  Palette, 
  CheckCircle2, 
  ArrowRight,
  Briefcase,
  Layers,
  Award
} from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Program Keahlian & Jurusan - SMK Telkom Jakarta",
  description: "Daftar konsentrasi keahlian unggulan SMK Telkom Jakarta: Rekayasa Perangkat Lunak (RPL), Teknik Komputer dan Jaringan (TKJ), Desain Komunikasi Visual (DKV), dan Teknik Jaringan Akses (TJA).",
}

const smkMajors = [
  {
    code: "RPL",
    icon: Code2,
    title: "Rekayasa Perangkat Lunak (RPL)",
    badge: "Software Engineering & AI",
    desc: "Mempelajari pengembangan perangkat lunak modern, pembuatan aplikasi web dan mobile (iOS & Android), komputasi awan (cloud computing), serta penerapan kecerdasan buatan.",
    curriculum: [
      "Full-Stack Web & Mobile App Development",
      "Object-Oriented Programming (OOP) & Clean Code",
      "Database Architecture & Cloud API Integration",
      "DevOps, Git Workflow & UI/UX Dasar"
    ],
    careers: [
      "Software Engineer / Developer",
      "Full-Stack Web Developer",
      "Mobile App Developer (iOS/Android)",
      "Database & Cloud Administrator"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
  {
    code: "TKJ",
    icon: Network,
    title: "Teknik Komputer dan Jaringan (TKJ)",
    badge: "Network & Cyber Security",
    desc: "Mendalami infrastruktur jaringan komputer berskala korporat, administrasi sistem operasi server Linux & Windows, teknologi switching & routing Cisco, serta keamanan siber.",
    curriculum: [
      "Cisco Enterprise Routing & Switching",
      "Cybersecurity Defense & Ethical Hacking Dasar",
      "Administrasi Server Linux/Debian & Cloud VPS",
      "Perancangan Local & Wide Area Network (LAN/WAN)"
    ],
    careers: [
      "Network Administrator",
      "Cyber Security Specialist",
      "Cloud Infrastructure Engineer",
      "IT Technical Support Specialist"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
  {
    code: "DKV",
    icon: Palette,
    title: "Desain Komunikasi Visual (DKV)",
    badge: "Creative Multimedia & UI/UX",
    desc: "Mengasah kreativitas komunikasi visual digital: desain antarmuka aplikasi (UI/UX), animasi 2D & 3D, grafis promosi, video editing, motion graphic, dan multimedia interaktif.",
    curriculum: [
      "UI/UX Design & Digital Prototyping (Figma)",
      "Motion Graphics & Video Editing Profesional",
      "Ilustrasi Digital, Branding & Tipografi Kreatif",
      "3D Modeling & Animasi Multimedia"
    ],
    careers: [
      "UI/UX Product Designer",
      "Motion Graphic Designer & Video Editor",
      "Digital Graphic Designer & Illustrator",
      "3D Modeler & Content Creator"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
  {
    code: "TJA",
    icon: Radio,
    title: "Teknik Jaringan Akses Telekomunikasi (TJA)",
    badge: "Broadband & Fiber Optic",
    desc: "Program keahlian spesialisasi Telkom Schools yang mendalami instalasi transmisi kabel serat optik (FTTH/FTTX), jaringan nirkabel seluler (4G/5G), dan infrastruktur pita lebar telekomunikasi.",
    curriculum: [
      "Teknologi Kabel Serat Optik & Sambungan Splicing",
      "Sistem Komunikasi Radio Frekuensi & Seluler 4G/5G",
      "Instalasi Jaringan Fiber to the Home (FTTH)",
      "Pengujian Redaman Optik (OTDR & Power Meter)"
    ],
    careers: [
      "Fiber Optic Specialist (FTTH)",
      "Telecommunication Transmission Engineer",
      "Radio Frequency (RF) Cellular Engineer",
      "Broadband Access Network Administrator"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
]

const admissionSteps = [
  {
    num: "01",
    title: "Registrasi Akun Online",
    desc: "Mengisi biodata awal calon siswa melalui formulir pendaftaran daring dan memilih jurusan keahlian prioritas di SMK Telkom Jakarta.",
  },
  {
    num: "02",
    title: "Unggah Dokumen Rapor",
    desc: "Melampirkan scan nilai rapor semester 1-5 SMP/MTs, kartu keluarga, akta kelahiran, serta sertifikat prestasi akademik/non-akademik.",
  },
  {
    num: "03",
    title: "Tes Potensi & Minat Bakat",
    desc: "Mengikuti tes potensi skolastik digital, psikotes minat kejuruan, dan sesi wawancara langsung bersama guru pembimbing.",
  },
  {
    num: "04",
    title: "Pengumuman & Daftar Ulang",
    desc: "Melihat hasil seleksi resmi melalui portal PPDB terpadu dan melakukan verifikasi berkas administrasi daftar ulang.",
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
              className="mb-4 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Program Kejuruan & Vokasi</span>
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Program Keahlian & <span className="text-primary">Jurusan</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
              Program kejuruan teknologi berstandar industri nasional dan global, dirancang untuk mencetak lulusan siap kerja, berwirausaha, dan berdaya saing di era digital.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button
                render={<Link href="/quiz" />}
                className="h-10 px-5 text-sm font-medium rounded-md"
              >
                <span>Ikuti Quiz Minat Jurusan</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/kontak" />}
                className="h-10 px-5 text-sm font-medium rounded-md border-neutral-200 bg-white"
              >
                Daftar PPDB Sekarang
              </Button>
            </div>
          </div>
        </section>

        {/* 4 Konsentrasi Jurusan SMK Telkom Jakarta */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-14">
              <Badge
                variant="outline"
                className="mb-3 text-xs border-neutral-200 bg-neutral-100 text-neutral-800 font-medium"
              >
                Kurikulum Industri
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                4 Program Keahlian Unggulan
              </h2>
              <p className="mt-3 text-base text-neutral-600 leading-relaxed">
                Setiap jurusan didukung laboratorium praktikum standar Cisco, Mikrotik, dan Telkom Group dengan sertifikasi kompetensi resmi.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {smkMajors.map((prog, idx) => {
                const Icon = prog.icon
                return (
                  <ScrollReveal key={idx} delay={(idx % 2) * 0.1}>
                    <Card className="flex h-full flex-col justify-between border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm hover:border-red-200 hover:shadow-md transition-all rounded-xl">
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-primary shrink-0">
                            <Icon className="h-6 w-6" />
                          </div>
                          <Badge variant="secondary" className="text-xs font-semibold text-primary bg-red-50/80 border border-red-100">
                            {prog.badge}
                          </Badge>
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-neutral-900 leading-snug">{prog.title}</h3>
                        <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">{prog.desc}</p>

                        <div className="mt-6 border-t border-neutral-100 pt-5">
                          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                            <Layers className="h-3.5 w-3.5 text-primary" />
                            <span>Materi Pembelajaran Unggulan:</span>
                          </div>
                          <ul className="space-y-2 text-xs text-neutral-700">
                            {prog.curriculum.map((c, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5 border-t border-neutral-100 pt-4">
                          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5 flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5 text-neutral-700" />
                            <span>Prospek Karir Lulusan:</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {prog.careers.map((career, crIdx) => (
                              <span
                                key={crIdx}
                                className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-700"
                              >
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 border-t border-neutral-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <Award className="h-3.5 w-3.5 text-primary" />
                          <span>{prog.duration}</span>
                        </span>
                        <Button
                          render={<Link href="/kontak" />}
                          className="w-full sm:w-auto h-9 px-4 text-xs font-medium rounded-md"
                        >
                          <span>Pilih Jurusan Ini</span>
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
                  className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
                >
                  Proses Admisi PPDB
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                  Alur Pendaftaran Masuk SMK Telkom Jakarta
                </h2>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  Empat tahapan terstruktur dari registrasi akun online hingga pengumuman penerimaan resmi.
                </p>
              </div>

              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {admissionSteps.map((step, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <Card className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow rounded-xl">
                      <CardContent className="p-0">
                        <span className="text-3xl font-extrabold text-primary">{step.num}</span>
                        <h3 className="mt-3 text-base font-bold text-neutral-900">{step.title}</h3>
                        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  render={<Link href="/kontak" />}
                  className="h-10 px-6 text-sm font-medium rounded-md"
                >
                  <span>Buka Formulir Pendaftaran PPDB</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  render={<Link href="/quiz" />}
                  className="h-10 px-6 text-sm font-medium rounded-md border-neutral-200 bg-white"
                >
                  Konsultasi / Quiz Jurusan
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
