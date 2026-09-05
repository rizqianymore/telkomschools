import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ProgramHero } from "@/components/sections/program/ProgramHero"
import { ProgramGrid } from "@/components/sections/program/ProgramGrid"
import { HomeAdmissionFlow } from "@/components/sections/HomeAdmissionFlow"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Program Keahlian & Jurusan - SMK Telkom Jakarta",
  description: "Daftar konsentrasi keahlian unggulan SMK Telkom Jakarta: Rekayasa Perangkat Lunak (RPL), Teknik Komputer dan Jaringan (TKJ), Desain Komunikasi Visual (DKV), dan Teknik Jaringan Akses (TJA).",
}

export default function ProgramPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <ProgramHero />
        <ProgramGrid />
        <ScrollReveal>
          <HomeAdmissionFlow />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
