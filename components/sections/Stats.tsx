"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, BookOpen, GraduationCap } from "lucide-react"

interface CountUpProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
  formatIndonesian?: boolean
}

function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  formatIndonesian = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)

  // Format angka ke format ribuan titik (.) misal: 1000 -> 1.000
  const rounded = useTransform(count, (latest) => {
    const val = Math.round(latest)
    if (formatIndonesian) {
      return val.toLocaleString("id-ID")
    }
    return val.toString()
  })

  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out curve
      })
      return () => controls.stop()
    }
  }, [isInView, count, target, duration, delay])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest}${suffix}`
      }
    })
    return () => unsubscribe()
  }, [rounded, prefix, suffix])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

const stats = [
  {
    icon: Users,
    target: 1000,
    suffix: "+",
    label: "Siswa Aktif",
    desc: "Belajar & berkarya setiap hari",
  },
  {
    icon: Award,
    target: 50,
    suffix: "+",
    label: "Guru Profesional",
    desc: "Tersertifikasi & berpengalaman",
  },
  {
    icon: BookOpen,
    target: 20,
    suffix: "+",
    label: "Program Unggulan",
    desc: "Akademik & vokasi terpadu",
  },
  {
    icon: GraduationCap,
    target: 95,
    suffix: "%",
    label: "Tingkat Kelulusan",
    desc: "Diterima di PTN & industri top",
  },
]

export function Stats() {
  return (
    <section className="relative border-y border-neutral-200/80 bg-neutral-50/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <Card
                key={idx}
                className="group border-neutral-200/90 bg-white shadow-sm hover:border-red-200 hover:shadow"
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                      <CountUp
                        target={item.target}
                        suffix={item.suffix}
                        delay={idx * 0.15}
                        duration={1.8}
                      />
                    </div>
                    <div className="text-sm font-semibold text-neutral-800">
                      {item.label}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
