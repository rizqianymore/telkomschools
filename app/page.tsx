import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Stats } from "@/components/sections/Stats"
import { About } from "@/components/sections/About"
import { Features } from "@/components/sections/Features"
import { Programs } from "@/components/sections/Programs"
import { Testimonials } from "@/components/sections/Testimonial"
import { FAQ } from "@/components/sections/FAQ"
import { CTA } from "@/components/sections/CTA"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ScrollReveal>
          <Stats />
        </ScrollReveal>
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal>
          <Features />
        </ScrollReveal>
        <ScrollReveal>
          <Programs />
        </ScrollReveal>
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
        <ScrollReveal>
          <CTA />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
