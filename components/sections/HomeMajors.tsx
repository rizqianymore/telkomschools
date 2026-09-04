import Link from "next/link"
import { Code2, Network, Palette, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const majors = [
  {
    icon: Code2,
    code: "RPL",
    title: "Rekayasa Perangkat Lunak",
    desc: "Mempelajari rekayasa software modern, fullstack web development, mobile apps (Flutter/React Native), hingga AI API integration.",
    skills: ["Web & Mobile App Development", "Database & Cloud DevOps", "REST API & Modern JavaScript"],
    career: "Software Engineer, Web Developer, Mobile Developer",
  },
  {
    icon: Network,
    code: "TKJ",
    title: "Teknik Komputer & Jaringan",
    desc: "Spesialisasi infrastruktur jaringan komputer bersertifikasi industri, cyber security dasar, fiber optic, dan administrasi cloud server.",
    skills: ["Cisco & Mikrotik Routing", "Cyber Security & Server Hardening", "Fiber Optic & Cloud Architecture"],
    career: "Network Engineer, Cloud Administrator, IT Support Specialist",
  },
  {
    icon: Palette,
    code: "DKV",
    title: "Desain Komunikasi Visual",
    desc: "Eksplorasi kreativitas visual digital, UI/UX design, motion graphics, 3D modelling, dan produksi media kreatif komersial.",
    skills: ["UI/UX & Product Design", "Motion Graphic & Video Editing", "Branding & Visual Identity"],
    career: "UI/UX Designer, Motion Graphic Designer, Creative Specialist",
  },
]

export function HomeMajors() {
  return (
    <section className="bg-white py-20 border-b border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge
              variant="outline"
              className="mb-3 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3 py-1 text-xs font-medium text-primary shadow-none"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Kompetensi Kejuruan</span>
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              3 Jurusan Unggulan Berstandar Industri
            </h2>
            <p className="mt-3 text-base text-neutral-600 max-w-2xl leading-relaxed">
              Dirancang dengan kurikulum berbasis proyek nyata dan sertifikasi internasional untuk melahirkan talenta digital siap bersaing.
            </p>
          </div>
          <Button
            variant="outline"
            render={<Link href="/program" />}
            className="w-full md:w-auto"
          >
            <span>Lihat Detail Kurikulum</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {majors.map((major) => {
            const Icon = major.icon
            return (
              <div
                key={major.code}
                className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-red-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-neutral-400 border border-neutral-200 rounded-md px-2 py-0.5">
                      {major.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{major.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">{major.desc}</p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-semibold text-neutral-900 uppercase tracking-wide">Keahlian Inti:</p>
                    {major.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500">
                    <strong className="text-neutral-700">Prospek:</strong> {major.career}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
