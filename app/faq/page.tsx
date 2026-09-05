import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FAQHero } from "@/components/sections/faq/FAQHero"
import { FAQAccordionSection } from "@/components/sections/faq/FAQAccordionSection"
import { FAQHelpCards } from "@/components/sections/faq/FAQHelpCards"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Pusat Bantuan & FAQ - SMK Telkom Jakarta",
  description: "Daftar lengkap jawaban pertanyaan seputar PPDB, kurikulum kejuruan, fasilitas lab, biaya, dan beasiswa di SMK Telkom Jakarta.",
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <FAQHero />
        <FAQAccordionSection />
        <ScrollReveal>
          <FAQHelpCards />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
