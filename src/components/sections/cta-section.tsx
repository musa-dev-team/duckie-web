"use client"

import { content } from "@/config/content"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

export function CtaContent() {
  return (
    <div className="relative pt-24 pb-16 lg:pt-12 lg:pb-48">
      <div className="container mx-auto px-6 pt-0 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] mb-5"
          >
            Ready to transform your support?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="text-lg text-[#666] mb-10 leading-relaxed max-w-xl mx-auto"
          >
            Join teams resolving 80%+ of tickets automatically. See results in your first week.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center h-12 px-6 rounded-full text-sm font-semibold text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors shadow-lg"
            >
              {content.finalCta.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
