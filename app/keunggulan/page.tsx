import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { KeunggulanHero } from "@/components/sections/keunggulan/KeunggulanHero"
import { KeunggulanPillars } from "@/components/sections/keunggulan/KeunggulanPillars"
import { KeunggulanFacilities } from "@/components/sections/keunggulan/KeunggulanFacilities"
import { CTA } from "@/components/sections/CTA"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Keunggulan Kami - SMK Telkom Jakarta",
  description: "Fasilitas, kurikulum teknologi, sertifikasi industri, dan keunggulan kompetitif SMK Telkom Jakarta.",
}

export default function KeunggulanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <KeunggulanHero />
        <KeunggulanPillars />
        <ScrollReveal>
          <KeunggulanFacilities />
        </ScrollReveal>
        <ScrollReveal>
          <CTA />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
