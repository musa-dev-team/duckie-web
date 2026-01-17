"use client"

import { content } from "@/config/content"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function CtaContent() {
  return (
    <div className="relative overflow-hidden bg-[#F5F5F5]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient circle - positioned to be fully visible */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="absolute top-32 -right-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0) 70%)',
          }}
        />
        
        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-56 right-[15%] w-16 h-16 rounded-2xl bg-[#FF6B35]/10 backdrop-blur-sm"
          style={{ transform: 'rotate(12deg)' }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-32 left-[10%] w-12 h-12 rounded-xl bg-[#FF6B35]/10 backdrop-blur-sm"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-[20%] w-8 h-8 rounded-lg bg-[#10B981]/10 backdrop-blur-sm"
        />
        
        {/* Dotted pattern */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #1a1a1a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 pt-28 lg:pt-36 pb-28 lg:pb-36 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Stacked headline with accent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mb-12"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-[#1a1a1a] leading-[1.05] tracking-[-0.03em]">
              Ready to see
              <br />
              <span className="relative inline-block">
                Duckie
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, ease }}
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-[#FF6B35]/20 origin-left -z-10"
                />
              </span>
              {" "}in action?
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-lg lg:text-xl text-[#666] mb-10 max-w-xl"
          >
            Join the teams resolving 80%+ of tickets automatically.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(255,107,53,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center h-14 px-8 rounded-full text-base font-semibold text-white transition-shadow"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #E85D2B 100%)',
                boxShadow: '0 10px 30px -5px rgba(255,107,53,0.25)',
              }}
            >
              {content.finalCta.cta}
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
            
            <span className="text-sm text-[#999]">or</span>
            
            <motion.a
              href="/how-it-works"
              whileHover={{ x: 4 }}
              className="inline-flex items-center text-base font-medium text-[#1a1a1a] group"
            >
              Watch a 2-min demo
              <svg 
                className="ml-2 w-5 h-5 text-[#999] group-hover:text-[#1a1a1a] transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Company logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-16 pt-12 border-t border-[#e0e0e0]"
          >
            <p className="text-xs font-medium text-[#999] uppercase tracking-[0.15em] mb-6">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {['Acme Corp', 'TechScale', 'CloudCart', 'GrowthLabs', 'FinServe'].map((company, i) => (
                <motion.span
                  key={company}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.05, ease }}
                  className="text-lg font-semibold text-[#ccc] hover:text-[#999] transition-colors cursor-default"
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
