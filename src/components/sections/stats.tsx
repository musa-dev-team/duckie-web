"use client"

import { content } from "@/config/content"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

const ease = [0.22, 1, 0.36, 1] as const

function AnimatedNumber({ 
  value, 
  suffix = "",
}: { 
  value: string
  suffix?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const isLessThan = value.startsWith("<")
  const numericValue = isLessThan 
    ? parseFloat(value.slice(1)) 
    : parseFloat(value)
  const hasDecimal = value.includes(".")
  
  // Critically damped spring - no overshoot or bounce
  const spring = useSpring(0, { stiffness: 80, damping: 25, mass: 1 })
  
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
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      {isLessThan && <span className="mr-1">&lt;</span>}
      <motion.span>{display}</motion.span>
      <span className="text-[0.35em] font-medium text-zinc-500 ml-1">
        {suffix}
      </span>
    </span>
  )
}

export function StatsContent() {
  const stats = content.socialProof.stats
  
  return (
    <div className="relative py-16 lg:py-24">
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent origin-top"
        />
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="absolute right-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent origin-top"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main stats grid - horizontal layout */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Featured stat - hero */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="col-span-12 sm:col-span-6 lg:col-span-4 relative"
            >
              {/* Large number with gradient treatment */}
              <div className="relative">
                <div 
                  className="text-[5rem] sm:text-[6rem] lg:text-[7rem] font-bold leading-[0.85] tracking-[-0.04em]"
                  style={{
                    background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  <AnimatedNumber 
                    value={stats[0].value} 
                    suffix={stats[0].suffix}
                  />
                </div>
                {/* Accent underline */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5, ease }}
                  className="absolute -bottom-1 left-0 h-0.5 w-16 bg-[#FF6B35] origin-left overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ x: ['-100%', '200%', '200%', '-100%'] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      times: [0, 0.45, 0.55, 1],
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              <p className="mt-4 text-sm text-zinc-400 max-w-[200px] leading-relaxed">
                {stats[0].label}
              </p>
            </motion.div>

            {/* Secondary stats - horizontal row */}
            {stats.slice(1).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1,
                  ease,
                }}
                className="col-span-6 sm:col-span-3 lg:col-span-2 relative group origin-left border-l border-white/10 pl-4"
              >
                {/* Number */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white">
                  <AnimatedNumber 
                    value={stat.value} 
                    suffix={stat.suffix}
                  />
                </div>
                {/* Label */}
                <p className="mt-2 text-xs text-zinc-500 uppercase tracking-[0.08em] leading-tight">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Keep backward compatibility alias
export const Stats = StatsContent
