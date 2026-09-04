"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 }
      case "down":
        return { y: -30, x: 0 }
      case "left":
        return { x: 30, y: 0 }
      case "right":
        return { x: -30, y: 0 }
      default:
        return { x: 0, y: 0 }
    }
  }

  const offset = getOffset()

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
