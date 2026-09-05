import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AboutHero } from "@/components/sections/about/AboutHero"
import { AboutVisiMisi } from "@/components/sections/about/AboutVisiMisi"
import { AboutValues } from "@/components/sections/about/AboutValues"
import { AboutTimeline } from "@/components/sections/about/AboutTimeline"
import { AboutLeadership } from "@/components/sections/about/AboutLeadership"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Tentang Kami - SMK Telkom Jakarta",
  description: "Sejarah, visi, misi, nilai-nilai budaya, dan kepemimpinan SMK Telkom Jakarta di bawah naungan Yayasan Pendidikan Telkom.",
}

export default function TentangPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <AboutVisiMisi />
        <ScrollReveal>
          <AboutValues />
        </ScrollReveal>
        <ScrollReveal>
          <AboutTimeline />
        </ScrollReveal>
        <ScrollReveal>
          <AboutLeadership />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
