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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Features />
        <Programs />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
