"use client"

import { content } from "@/config/content"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

// Premium card style for light theme
const cardStyle = {
  background: 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)',
  boxShadow: `
    0 1px 0 rgba(255,255,255,0.8),
    0 0 0 1px rgba(0,0,0,0.03),
    0 1px 2px rgba(0,0,0,0.04),
    0 4px 8px rgba(0,0,0,0.04),
    0 12px 24px rgba(0,0,0,0.06),
    0 24px 48px rgba(0,0,0,0.08)
  `.trim().replace(/\s+/g, ' '),
}

const cardHoverStyle = {
  y: -3,
  boxShadow: `
    0 1px 0 rgba(255,255,255,0.8),
    0 0 0 1px rgba(0,0,0,0.03),
    0 2px 4px rgba(0,0,0,0.04),
    0 8px 16px rgba(0,0,0,0.06),
    0 16px 32px rgba(0,0,0,0.08),
    0 32px 64px rgba(0,0,0,0.1)
  `.trim().replace(/\s+/g, ' '),
}

export function Testimonials() {
  return (
    <section className="pt-38 pb-32 bg-gray-50" data-theme="light">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-normal text-gray-900 leading-[1.1] tracking-tight">
            {content.socialProof.title}
          </h2>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="overflow-hidden rounded-2xl grid lg:grid-cols-2"
          style={cardStyle}
        >
          {/* Left: Image with padding */}
          <div className="relative p-4 lg:p-6 min-h-[400px] lg:min-h-[600px]">
            {/* Image container with refined styling */}
            <div 
              className="absolute inset-4 lg:inset-6 rounded-xl overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)',
              }}
            >
              <motion.img 
                src="/images/test-1.jpg" 
                alt="Customer testimonial"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease }}
              />
              {/* Multi-layer overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-gray-900/5" />
              {/* Radial vignette */}
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.35) 100%)' }} />
              {/* Top highlight for depth */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
              {/* Inner border highlight */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.08)',
                }}
              />
              
              {/* Stat badge - refined styling */}
              {content.socialProof.featuredTestimonial.stat && (
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, ease }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      {content.socialProof.featuredTestimonial.stat.value}
                    </span>
                    <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
                      {content.socialProof.featuredTestimonial.stat.label}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: Content */}
          <div className="relative flex flex-col justify-center p-10 lg:p-16 xl:p-20">
            {/* 1. Logo / Company */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15, ease }}
              className="mb-8"
            >
              {content.socialProof.featuredTestimonial.logo ? (
                <img 
                  src={content.socialProof.featuredTestimonial.logo} 
                  alt={content.socialProof.featuredTestimonial.company}
                  className="h-7 w-auto opacity-80"
                />
              ) : (
                <span className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400">
                  {content.socialProof.featuredTestimonial.company}
                </span>
              )}
            </motion.div>

            {/* 2. Title */}
            <motion.h3 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
              className="text-[1.75rem] sm:text-3xl lg:text-[2.125rem] font-semibold leading-[1.15] tracking-[-0.025em] text-gray-900"
            >
              {content.socialProof.featuredTestimonial.title}
            </motion.h3>

            {/* Divider line - refined */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="w-16 h-px mt-8 mb-6 origin-left"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)',
              }}
            />

            {/* 3. Profile */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.45, ease }}
              className="flex items-center gap-4 mb-5"
            >
              {/* Refined avatar */}
              <div 
                className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
                }}
              >
                {content.socialProof.featuredTestimonial.author.charAt(0)}
              </div>
              
              <div>
                <div className="text-[15px] font-semibold text-gray-900">
                  {content.socialProof.featuredTestimonial.author}
                </div>
                <div className="text-sm text-gray-500">
                  {content.socialProof.featuredTestimonial.role}
                </div>
              </div>
            </motion.div>

            {/* 4. Content */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
              className="text-[15px] lg:text-base text-gray-500 leading-relaxed mb-6"
            >
              {content.socialProof.featuredTestimonial.description}
            </motion.p>

            {/* 5. Learn more link - refined */}
            <motion.a
              href="/case-studies/grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.65, ease }}
              whileHover={{ x: 4 }}
              className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
            >
              Read the full story
              <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
