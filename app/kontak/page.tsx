import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ContactHero } from "@/components/sections/contact/ContactHero"
import { ContactSection } from "@/components/sections/contact/ContactSection"
import { ContactBranches } from "@/components/sections/contact/ContactBranches"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Kontak & Layanan Pendaftaran - SMK Telkom Jakarta",
  description: "Informasi kontak sekretariat, alamat kampus, jam operasional, dan jaringan kampus Telkom Schools di seluruh Indonesia.",
}

export default function KontakPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <ContactHero />
        <ContactSection />
        <ScrollReveal>
          <ContactBranches />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
