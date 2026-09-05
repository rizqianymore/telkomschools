import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { TestimoniHero } from "@/components/sections/testimoni/TestimoniHero"
import { TestimoniList } from "@/components/sections/testimoni/TestimoniList"
import { TestimoniPartners } from "@/components/sections/testimoni/TestimoniPartners"
import { CTA } from "@/components/sections/CTA"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Testimoni & Cerita Sukses - SMK Telkom Jakarta",
  description: "Ulasan jujur siswa, apresiasi orang tua, dan jejak karier alumni SMK Telkom Jakarta di perusahaan teknologi dunia.",
}

export default function TestimoniPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <TestimoniHero />
        <TestimoniList />
        <ScrollReveal>
          <TestimoniPartners />
        </ScrollReveal>
        <ScrollReveal>
          <CTA />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
