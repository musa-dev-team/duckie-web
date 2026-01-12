"use client"

import { content } from "@/config/content"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

// Filter out empty testimonials
const validTestimonials = content.socialProof.testimonials.filter(t => t.quote && t.author)

export function Testimonials() {
  return (
    <section className="py-32 bg-white" data-theme="light">
      <div className="container mx-auto px-6">
        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-20"
        >
          <div 
            className="overflow-hidden rounded-2xl grid lg:grid-cols-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] min-h-[500px] bg-gray-50"
          >
            {/* Left: Image - 2/3 width */}
            <div className="relative p-6 lg:p-8 flex items-center justify-center lg:col-span-2">
              {/* Background Image with overlay */}
              <div className="absolute inset-6 lg:inset-8 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                {/* Decorative elements */}
                <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-blue-100/40 blur-3xl" />
                <div className="absolute bottom-8 left-8 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl" />
              </div>

              {/* Avatar placeholder centered */}
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-white text-8xl font-bold text-gray-400 backdrop-blur-sm border border-gray-200">
                {content.socialProof.featuredTestimonial.author.charAt(0)}
              </div>
            </div>

            {/* Right: Content - 1/3 width */}
            <div className="relative flex flex-col justify-center p-8 lg:p-10 lg:col-span-1 bg-white">
              {/* Company name */}
              <div className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {content.socialProof.featuredTestimonial.company}
              </div>

              {/* Author profile */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-gray-600">
                  {content.socialProof.featuredTestimonial.author.charAt(0)}
                </div>
                
                <div>
                  <div className="text-base font-semibold text-gray-900">
                    {content.socialProof.featuredTestimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {content.socialProof.featuredTestimonial.role}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mb-8">
                <p className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
                  "{content.socialProof.featuredTestimonial.quote}"
                </p>
              </blockquote>

              {/* Stat badge */}
              {content.socialProof.featuredTestimonial.stat && (
                <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3">
                  <div className="text-3xl font-bold text-gray-900">
                    {content.socialProof.featuredTestimonial.stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    {content.socialProof.featuredTestimonial.stat.label}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Supporting Testimonials */}
        {validTestimonials.length > 0 && (
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {validTestimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-lg"
              >
                {/* Quote */}
                <blockquote className="mb-6">
                  <p className="text-base leading-relaxed text-gray-700">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 border-t border-gray-200 pt-12"
        >
          {/* SOC 2 Badge */}
          {content.trust.badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                <svg
                  className="h-4 w-4 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">{badge}</span>
            </div>
          ))}

          {/* Deployment Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Deployment:</span>
            {content.trust.deploymentOptions.map((option, index) => (
              <span key={index} className="flex items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  {option}
                </span>
                {index < content.trust.deploymentOptions.length - 1 && (
                  <span className="text-gray-300">•</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
