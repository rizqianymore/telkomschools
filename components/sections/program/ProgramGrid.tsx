import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
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

export const smkMajors = [
  {
    code: "RPL",
    icon: Code2,
    title: "Rekayasa Perangkat Lunak (RPL)",
    badge: "Software & AI",
    desc: "Pengembangan software modern, web & mobile application, cloud computing, serta kecerdasan buatan.",
    curriculum: [
      "Full-Stack Web & Mobile App Development",
      "Object-Oriented Programming (OOP)",
      "Database Architecture & Cloud API",
      "Git Workflow & Dasar AI"
    ],
    careers: [
      "Software Engineer",
      "Full-Stack Developer",
      "Mobile App Developer",
      "Cloud Administrator"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
  {
    code: "TKJ",
    icon: Network,
    title: "Teknik Komputer dan Jaringan (TKJ)",
    badge: "Network & Cyber Security",
    desc: "Infrastruktur jaringan enterprise, sistem operasi server Linux & Windows, Cisco routing, dan pertahanan siber.",
    curriculum: [
      "Cisco Enterprise Routing & Switching",
      "Cybersecurity Defense Dasar",
      "Administrasi Server Linux & Cloud VPS",
      "Perancangan Local & Wide Area Network"
    ],
    careers: [
      "Network Administrator",
      "Cyber Security Specialist",
      "Cloud Infrastructure Engineer",
      "IT Technical Support"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
  {
    code: "DKV",
    icon: Palette,
    title: "Desain Komunikasi Visual (DKV)",
    badge: "Creative Multimedia & UI/UX",
    desc: "Komunikasi visual digital: antarmuka aplikasi (UI/UX), animasi 2D/3D, motion graphic, dan video editing profesional.",
    curriculum: [
      "UI/UX Design & Prototyping (Figma)",
      "Motion Graphics & Video Editing",
      "Ilustrasi Digital & Branding",
      "3D Modeling & Multimedia"
    ],
    careers: [
      "UI/UX Product Designer",
      "Motion Graphic Designer",
      "Digital Graphic Designer",
      "3D Modeler & Content Creator"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
  {
    code: "TJA",
    icon: Radio,
    title: "Teknik Jaringan Akses Telekomunikasi (TJA)",
    badge: "Broadband & Fiber Optic",
    desc: "Spesialisasi Telkom Schools: instalasi fiber optic (FTTH/FTTX), jaringan nirkabel (4G/5G), dan transmisi data telekomunikasi.",
    curriculum: [
      "Teknologi Fiber Optic & Splicing",
      "Sistem Komunikasi Seluler 4G/5G",
      "Instalasi Jaringan Fiber to the Home",
      "Pengukuran Redaman (OTDR & OPM)"
    ],
    careers: [
      "Fiber Optic Specialist",
      "Transmission Engineer",
      "RF Cellular Engineer",
      "Broadband Network Admin"
    ],
    duration: "3 Tahun (Terakreditasi A)",
  },
]

export function ProgramGrid() {
  return (
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
            Didukung laboratorium praktikum berstandar industri dengan sertifikasi kompetensi resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {smkMajors.map((prog, idx) => {
            const Icon = prog.icon
            return (
              <ScrollReveal key={prog.code} delay={(idx % 2) * 0.1}>
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
  )
}
