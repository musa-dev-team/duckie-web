"use client"

import { content } from "@/config/content"
import { motion } from "framer-motion"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

export function ValueCallout() {
  return (
    <section>
      <div className="relative overflow-hidden rounded-3xl py-32 md:py-40" style={{ backgroundColor: '#000000' }}>
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/sand-black.jpg"
              alt=""
              fill
              className="object-cover blur-[1px]"
              priority
            />
          </div>
          
          {/* Overlay for text legibility */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />

          <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="font-serif bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-4xl font-normal leading-[1.1] tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {content.valueProps.scale.headline}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white sm:text-xl"
        >
          {content.valueProps.scale.subheadline}
        </motion.p>
          </div>
        </div>
    </section>
  )
}
