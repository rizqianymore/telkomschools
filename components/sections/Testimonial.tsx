"use client"

import * as React from "react"
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface TestimonialItem {
  name: string
  role: string
  avatar: string
  fallback: string
  content: string
}

const testimonials: TestimonialItem[] = [
  {
    name: "Rizky Ramadhan",
    role: "Alumni SMK Telkom Jakarta (Software Engineer)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    fallback: "RR",
    content:
      "SMK Telkom Jakarta memberikan pondasi kejuruan IT dan kedisiplinan yang sangat kuat. Kurikulum berbasis industri membuat saya langsung siap bersaing di dunia kerja setelah lulus.",
  },
  {
    name: "Dr. Hendra Wijaya",
    role: "Orang Tua Siswa (Kelas XI RPL)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    fallback: "HW",
    content:
      "Perkembangan anak saya sangat terasa, tidak hanya dari sisi akademik tetapi juga karakter moral, kepemimpinan, dan kemandirian dalam lingkungan belajar yang kondusif.",
  },
  {
    name: "Amanda Putri",
    role: "Siswa Berprestasi (Juara LKS Web Technologies)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    fallback: "AP",
    content:
      "Guru-guru sangat membimbing dan memfasilitasi setiap potensi minat siswa. Laboratorium komputer dan pembinaan intensif kompetisinya benar-benar berstandar unggul.",
  },
]

// Speed configuration (seconds per loop sequence)
const TOP_SPEED = 35
const BOTTOM_SPEED = 35

// Reusable Testimonial Card preserving exact visual design
function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <Card className="flex h-full flex-col justify-between border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm hover:border-red-200 hover:shadow transition-shadow">
      <CardContent className="p-0">
        <span className="text-3xl font-serif text-primary/40 select-none">&ldquo;</span>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed -mt-2">
          {item.content}
        </p>
      </CardContent>

      {/* Author Info */}
      <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
        <Avatar size="lg" className="h-10 w-10 border border-neutral-200">
          <AvatarImage src={item.avatar} alt={item.name} />
          <AvatarFallback className="bg-red-50 text-primary font-bold text-xs">
            {item.fallback}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-bold text-neutral-900 leading-tight">
            {item.name}
          </div>
          <div className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {item.role}
          </div>
        </div>
      </div>
    </Card>
  )
}

// Single Infinite Carousel Row with Direction and Hover Control
function InfiniteRow({
  items,
  direction,
  speed,
}: {
  items: TestimonialItem[]
  direction: "left" | "right"
  speed: number
}) {
  const [isHovered, setIsHovered] = React.useState(false)
  const xTranslation = useMotionValue(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // 4 sets repetition guarantees seamless infinite loop across all resolutions
  const duplicatedItems = React.useMemo(
    () => [...items, ...items, ...items, ...items],
    [items]
  )

  React.useEffect(() => {
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    // Since items are duplicated 4 times, one exact seamless loop distance is half of scrollWidth
    const loopDistance = container.scrollWidth / 2
    let controls: ReturnType<typeof animate> | null = null

    if (direction === "left") {
      // Moves Right to Left: 0 -> -loopDistance
      if (!isHovered) {
        const currentX = xTranslation.get()
        const normalizedStart =
          currentX <= -loopDistance ? currentX % loopDistance : currentX
        xTranslation.set(normalizedStart)

        const remainingDistance = loopDistance + normalizedStart
        const segmentDuration = (remainingDistance / loopDistance) * speed

        controls = animate(xTranslation, -loopDistance, {
          ease: "linear",
          duration: segmentDuration,
          onComplete: () => {
            xTranslation.set(0)
            controls = animate(xTranslation, -loopDistance, {
              ease: "linear",
              duration: speed,
              repeat: Infinity,
              repeatType: "loop",
            })
          },
        })
      }
    } else {
      // Moves Left to Right: -loopDistance -> 0
      if (!isHovered) {
        const currentX = xTranslation.get()
        // If initial 0, start at -loopDistance so it moves smoothly to the right
        const normalizedStart =
          currentX >= 0 ? -loopDistance + (currentX % loopDistance) : currentX
        xTranslation.set(normalizedStart)

        const remainingDistance = Math.abs(normalizedStart)
        const segmentDuration = (remainingDistance / loopDistance) * speed

        controls = animate(xTranslation, 0, {
          ease: "linear",
          duration: segmentDuration,
          onComplete: () => {
            xTranslation.set(-loopDistance)
            controls = animate(xTranslation, 0, {
              ease: "linear",
              duration: speed,
              repeat: Infinity,
              repeatType: "loop",
            })
          },
        })
      }
    }

    return () => {
      controls?.stop()
    }
  }, [isHovered, prefersReducedMotion, xTranslation, direction, speed])

  return (
    <div
      className="w-full overflow-hidden py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        style={{ x: prefersReducedMotion ? 0 : xTranslation }}
        className="flex gap-6 w-max px-4 sm:px-6 lg:px-8"
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="w-[300px] sm:w-[350px] md:w-[380px] lg:w-[400px] shrink-0"
          >
            <TestimonialCard item={item} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimoni" className="relative bg-neutral-50/60 py-20 md:py-28 scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14">
          <Badge
            variant="outline"
            className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/60 text-primary font-semibold"
          >
            Testimoni
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Apa Kata Mereka Tentang Kami?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Kisah nyata dari para siswa, orang tua, dan alumni yang telah menjadi bagian dari keluarga besar SMK Telkom Jakarta.
          </p>
        </div>
      </div>

      {/* Two Horizontal Infinite Carousels Moving in Opposite Directions */}
      <div className="flex flex-col gap-4 sm:gap-5 w-full">
        {/* Baris Atas: Kanan ke Kiri */}
        <InfiniteRow items={testimonials} direction="left" speed={TOP_SPEED} />

        {/* Baris Bawah: Kiri ke Kanan */}
        <InfiniteRow items={testimonials} direction="right" speed={BOTTOM_SPEED} />
      </div>
    </section>
  )
}
