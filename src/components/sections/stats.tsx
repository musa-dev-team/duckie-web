"use client"

import { content } from "@/config/content"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

type MotionStyle = "overshoot" | "smooth" | "snappy" | "bounce"

function AnimatedNumber({ 
  value, 
  suffix = "",
  motionStyle = "smooth"
}: { 
  value: string
  suffix?: string
  motionStyle?: MotionStyle
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  // Parse the numeric value
  const isLessThan = value.startsWith("<")
  const numericValue = isLessThan 
    ? parseFloat(value.slice(1)) 
    : parseFloat(value)
  const hasDecimal = value.includes(".")
  
  // Different spring configs for different motion styles
  const springConfigs: Record<MotionStyle, { stiffness: number; damping: number; mass: number }> = {
    overshoot: { stiffness: 150, damping: 12, mass: 1 },    // Overshoots then settles
    smooth: { stiffness: 50, damping: 20, mass: 1 },        // Smooth ease
    snappy: { stiffness: 300, damping: 30, mass: 0.8 },     // Quick and precise
    bounce: { stiffness: 200, damping: 10, mass: 1 },       // Bouncy settle
  }
  
  const spring = useSpring(0, springConfigs[motionStyle])
  
  useEffect(() => {
    if (isInView) {
      spring.set(numericValue)
    }
  }, [isInView, numericValue, spring])
  
  const display = useTransform(spring, (v) => {
    if (hasDecimal) return v.toFixed(1)
    return Math.round(v).toString()
  })
  
  return (
    <span ref={ref} className="inline-flex items-baseline">
      {isLessThan && <span className="mr-0.5">&lt;</span>}
      <motion.span className="tabular-nums">{display}</motion.span>
      <span className="ml-1 text-2xl font-medium text-zinc-500 md:text-3xl">
        {suffix}
      </span>
    </span>
  )
}

export function Stats() {
  const stats = content.socialProof.stats
  
  // Different motion style for each stat to create variety
  const motionStyles: MotionStyle[] = ["overshoot", "smooth", "snappy", "bounce"]
  
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-baseline justify-center gap-x-16 gap-y-10 md:gap-x-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="text-center"
            >
              <div className="font-mono text-5xl font-light tracking-tighter text-zinc-50 md:text-6xl">
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix}
                  motionStyle={motionStyles[index]}
                />
              </div>
              <div className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
