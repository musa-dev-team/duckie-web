"use client"

import { content } from "@/config/content"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

export function CtaContent() {
  return (
    <div className="relative pt-48 lg:pt-48 pb-28 lg:pb-36">
      {/* Main content */}
      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">No credit card required</span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-medium text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] mb-5"
              >
                Ready to transform your support?
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-lg text-[#666] mb-8 leading-relaxed"
              >
                Join teams resolving 80%+ of tickets automatically. See results in your first week.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-lg text-sm font-semibold text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors"
                >
                  {content.finalCta.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
                
                <motion.a
                  href="/demo"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-lg text-sm font-semibold text-[#1a1a1a] bg-white border border-[#ddd] hover:border-[#bbb] hover:bg-[#fafafa] transition-colors"
                >
                  <Calendar className="mr-2 w-4 h-4 text-[#666]" />
                  Schedule a demo
                </motion.a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                className="mt-8 pt-8 border-t border-[#e0e0e0]"
              >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#888]">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#aaa]" />
                    14-day free trial
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#aaa]" />
                    Setup in minutes
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#aaa]" />
                    Cancel anytime
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right: Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="relative"
            >
              <div 
                className="rounded-2xl p-8 lg:p-10 bg-white"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                <p className="text-xs font-medium text-[#999] uppercase tracking-[0.1em] mb-6">
                  Average customer results
                </p>
                
                <div className="space-y-6">
                  {[
                    { metric: '82%', label: 'Tickets resolved automatically' },
                    { metric: '3.2x', label: 'Faster response times' },
                    { metric: '47%', label: 'Reduction in support costs' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease }}
                      className="flex items-baseline gap-4"
                    >
                      <span className="text-4xl lg:text-5xl font-semibold text-[#1a1a1a] tracking-tight tabular-nums">
                        {item.metric}
                      </span>
                      <span className="text-sm text-[#666]">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#f0f0f0]">
                  <p className="text-xs text-[#999]">
                    Based on data from 200+ support teams using Duckie
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
