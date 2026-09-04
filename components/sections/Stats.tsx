"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, BookOpen, GraduationCap } from "lucide-react"

interface CountUpProps {
  target: number
  prefix?: string
  suffix?: string
  delay?: number
  formatIndonesian?: boolean
  decimals?: number
}

function CountUp({
  target,
  prefix = "",
  suffix = "",
  delay = 0,
  formatIndonesian = true,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // motion value mentah, dianimasikan lewat spring biar terasa "hidup"
  const motionValue = useMotionValue(0)

  // spring lebih smooth daripada tween biasa: stiffness rendah = gerakan lembut,
  // damping tinggi = tidak overshoot/bouncy, mass memberi efek "berat" yang natural
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  })

  const rounded = useTransform(springValue, (v) => {
    const factor = Math.pow(10, decimals)
    const num = Math.round(v * factor) / factor
    const formatted = formatIndonesian
      ? num.toLocaleString("id-ID", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : num.toFixed(decimals)
    return `${prefix}${formatted}${suffix}`
  })

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      motionValue.set(target)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, target, delay, motionValue])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest
      }
    })
    return unsubscribe
  }, [rounded])

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