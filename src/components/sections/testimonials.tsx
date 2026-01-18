"use client"

import { content } from "@/config/content"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Animated counting stat component
function AnimatedStat({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const spring = useSpring(0, { 
    stiffness: 50, 
    damping: 20, 
    mass: 1 
  })
  
  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])
  
  const display = useTransform(spring, (v) => Math.round(v).toString())
  
  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      <motion.span>{display}</motion.span>
      <span>{suffix}</span>
    </span>
  )
}

export function TestimonialsContent() {
  const { featuredTestimonial } = content.socialProof

  return (
    <div className="relative py-16 md:py-28 lg:py-36">
      <div className="container relative mx-auto px-5 md:px-6 max-w-7xl">
        {/* Large stat callout - top left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 md:mb-16 lg:mb-20"
        >
          {featuredTestimonial.stat && (
            <div className="flex items-baseline gap-2 md:gap-4">
              <span 
                className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[12rem] font-bold leading-none tracking-[-0.04em]"
                style={{
                  background: 'linear-gradient(180deg, #1a1a1a 0%, #4a4a4a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <AnimatedStat value={parseInt(featuredTestimonial.stat.value)} suffix="%" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] md:text-sm font-medium text-[#666] uppercase tracking-[0.2em]">
                  {featuredTestimonial.stat.label}
                </span>
                <div className="h-px w-10 md:w-16 bg-[#1a1a1a]" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 items-end">
          {/* Left column - Quote and attribution */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="lg:col-span-6 xl:col-span-5"
          >
            {/* Company logo */}
            {featuredTestimonial.logo && (
              <motion.img 
                src={featuredTestimonial.logo}
                alt={featuredTestimonial.company}
                className="h-5 md:h-6 w-auto mb-6 md:mb-8 opacity-60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
              />
            )}

            {/* Title/Quote */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] tracking-[-0.025em] text-[#1a1a1a] mb-5 md:mb-8">
              {featuredTestimonial.title}
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-[#555] leading-relaxed mb-6 md:mb-10 max-w-xl">
              {featuredTestimonial.description}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 md:gap-5 pb-6 md:pb-8 border-b border-[#e5e5e5]">
              <div 
                className="flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-full text-base md:text-lg font-medium text-white"
                style={{
                  background: '#1a1a1a',
                }}
              >
                {featuredTestimonial.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm md:text-base font-semibold text-[#1a1a1a]">
                  {featuredTestimonial.author}
                </div>
                <div className="text-xs md:text-sm text-[#777]">
                  {featuredTestimonial.role}
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="/case-studies/grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5, ease }}
              className="inline-flex items-center gap-2 md:gap-3 mt-6 md:mt-8 text-xs md:text-sm font-semibold text-[#1a1a1a] group"
            >
              <span>Read the case study</span>
              <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1a1a1a] group-hover:bg-[#333] transition-colors">
                <svg 
                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.a>
          </motion.div>

          {/* Right column - Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="lg:col-span-6 xl:col-span-7 relative"
          >
            {/* Accent shape behind image */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="absolute -right-2 md:-right-4 lg:-right-8 top-4 md:top-8 lg:top-16 bottom-4 md:bottom-8 lg:bottom-16 w-[60%] md:w-[70%] rounded-xl md:rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931A 100%)',
              }}
            />
            
            <div 
              className="relative aspect-[4/5] lg:aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0,0,0,0.25),
                  0 0 0 1px rgba(0,0,0,0.05)
                `.trim().replace(/\s+/g, ' '),
              }}
            >
              {/* Gradient background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, #C5CCD6 0%, #9AA5B4 100%)',
                }}
              />
              
              {/* Image */}
              <img 
                src="/images/Woman with Beverages.webp" 
                alt="Customer testimonial"
                className="absolute inset-0 w-full h-full object-contain object-bottom scale-105"
              />
              
              {/* Gradient overlay for depth */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.08) 100%),
                    radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
                  `.trim().replace(/\s+/g, ' '),
                }}
              />
              
              {/* Vignette effect */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
