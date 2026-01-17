"use client"

import { content } from "@/config/content"
import { motion } from "framer-motion"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-ocean.webp"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: 'center calc(100%)' }}
        unoptimized
      />
      
      {/* Subtle overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(0,0,0,0.5) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(0,0,0,0.5) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Fade to next section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-40" 
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg-deep-blue))',
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[8%] w-2 h-2 rounded-full bg-white/40 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] right-[12%] w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[45%] left-[15%] w-1 h-1 rounded-full bg-white/35 blur-[1px]"
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="max-w-7xl text-center">
          {/* Headline */}
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] tracking-[-0.03em] text-white pb-4"
          >
            AI agents that close tickets
          </motion.h1>
          
          {/* Subheadline with dash animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease }}
              className="h-px w-8 bg-white/40 origin-right"
            />
            <p 
              className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              Not just answers — <span className="font-medium">real actions</span>
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease }}
              className="h-px w-8 bg-white/40 origin-left"
            />
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ 
                y: -2,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.4), 0 4px 20px rgba(0,0,0,0.15), 0 0 60px rgba(255,255,255,0.15)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center rounded-full h-12 px-8 text-base font-medium text-zinc-900"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.3), 0 2px 16px rgba(0,0,0,0.1), 0 0 40px rgba(255,255,255,0.08)',
              }}
            >
              {content.ctas.primary}
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Bottom section - logos + scroll hint */}
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          {/* Company Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-10 md:gap-14">
              {['Acme', 'Globex', 'Initech', 'Hooli', 'Umbrella'].map((company, i) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                  className="text-sm font-medium text-white/35 transition-colors duration-300 hover:text-white/60"
                >
                  {company}
                </motion.div>
              ))}
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}
