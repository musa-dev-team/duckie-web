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
          >
            {content.valueProps.hero.headline}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
          >
            {content.valueProps.hero.subheadline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Button
              size="lg"
              className="bg-white text-zinc-900 hover:bg-white/90 shadow-lg hover:shadow-xl"
            >
              {content.ctas.primary}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
