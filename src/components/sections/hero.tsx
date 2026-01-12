"use client"

import { Button } from "@/components/ui/button"
import { content } from "@/config/content"
import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/ocean-2.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        unoptimized
      />
      
      {/* Subtle overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      
      {/* Fade to next section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-32" 
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg-deep-blue))',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              textShadow: '0 1px 20px rgba(0,0,0,0.15)',
            }}
          >
            {content.valueProps.hero.headline}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
            style={{
              textShadow: '0 1px 12px rgba(0,0,0,0.1)',
            }}
          >
            {content.valueProps.hero.subheadline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <motion.button
              whileHover={{ 
                y: -1,
                boxShadow: '0 0 0 1px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.12), 0 0 60px rgba(255,255,255,0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center rounded-full h-12 px-8 text-base font-medium text-zinc-900"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1), 0 0 40px rgba(255,255,255,0.15)',
              }}
            >
              {content.ctas.primary}
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-8 left-0 right-0"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-8 md:gap-12">
              {/* Placeholder logos - simple text for now */}
              {['Acme', 'Globex', 'Initech', 'Hooli', 'Umbrella'].map((company, i) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="text-sm font-medium text-white/30 transition-colors hover:text-white/50"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
