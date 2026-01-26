"use client"

import { CtaFooterSection } from "@/components/sections/cta-footer-section"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Animated counting number
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const spring = useSpring(0, { stiffness: 50, damping: 20, mass: 1 })
  
  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])
  
  const display = useTransform(spring, (v) => Math.round(v).toString())
  
  return (
    <span ref={ref} className="inline-flex tabular-nums">
      <motion.span>{display}</motion.span>
    </span>
  )
}

export default function AboutContent() {
  return (
    <main>
      {/* Hero section */}
      <div className="relative w-full bg-[#090B0F] px-3 pt-3 pb-3 md:px-4 md:pt-4 md:pb-4">
        <div
          className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          <Image
            src="/images/sky-3.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at top left, rgba(0,0,0,0.5) 0%, transparent 50%),
                radial-gradient(ellipse at top right, rgba(0,0,0,0.5) 0%, transparent 50%)
              `,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-sm md:text-base text-white/60 mb-4 md:mb-6 tracking-[0.2em] uppercase font-medium"
            >
              Our Story
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg max-w-4xl tracking-[-0.03em] leading-[1.05]"
            >
              Support that {" "}
              <span className="text-[#FF6B35]">resolves</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-lg md:text-xl text-white/70 max-w-2xl"
            >
              We&apos;re building AI that doesn&apos;t just answer questions—it fixes problems.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Big Statement Section */}
      <div className="relative bg-[#090B0F] py-20 md:py-32 overflow-hidden">
        {/* Subtle gradient orbs */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }}
        />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="mb-16 md:mb-24"
            >
              <p className="text-lg md:text-xl text-zinc-500 mb-6 md:mb-8 max-w-xl">The problem</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-[-0.03em]">
                Every support team knows the feeling: tickets piling up, customers waiting, your best people stuck handling the{" "}
                <span className="text-zinc-500">same requests over and over.</span>
              </h2>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24">
              {[
                { value: 70, suffix: "%", label: "of tickets are repetitive" },
                { value: 4, suffix: "hr", label: "avg. first response time" },
                { value: 23, suffix: "%", label: "agent time on actual issues" },
                { value: 65, suffix: "%", label: "of customers expect instant help" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="border-l border-white/10 pl-4 md:pl-6"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                    <AnimatedNumber value={stat.value} />
                    <span className="text-zinc-500">{stat.suffix}</span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Origin Story Section */}
      <div className="relative bg-[#FFFFFF] py-20 md:py-32" data-theme="light">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="text-sm md:text-base text-[#FF6B35] font-medium mb-4 md:mb-6 tracking-wide uppercase">The origin</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 md:mb-8 leading-[1.1] tracking-[-0.02em]">
                  From on-call frustration to breakthrough
                </h2>
                <div className="space-y-4 md:space-y-6 text-base md:text-lg text-[#555] leading-relaxed">
                  <p>
                    It started with a simple problem: Valerie was tired of answering the same 
                    questions during on-call rotations. So she built a bot—something that could 
                    search through documentation, understand context, and actually help.
                  </p>
                  <p>
                    That internal tool worked so well that teammates started asking for access. 
                    Then other teams. Then other companies.
                  </p>
                  <p className="font-medium text-[#1a1a1a]">
                    The pattern was clear: everyone was drowning in repetitive support work, 
                    and AI had finally gotten good enough to help.
                  </p>
                </div>
              </motion.div>

              {/* Right - Visual accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="relative"
              >
                {/* Orange accent shape */}
                <div 
                  className="absolute -right-4 md:-right-8 top-8 bottom-8 w-[70%] rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F7931A 100%)' }}
                />
                <div 
                  className="relative bg-[#090B0F] rounded-2xl p-8 md:p-12"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                  }}
                >
                  <div className="text-6xl md:text-8xl font-bold text-white/10 absolute top-4 right-6">&ldquo;</div>
                  <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6 relative z-10">
                    We didn&apos;t want to build another chatbot that just answers questions. 
                    We wanted to build AI that actually <em className="text-[#FF6B35] not-italic">resolves</em> issues.
                  </p>
                  <div className="flex items-center gap-3 text-zinc-400 text-sm">
                    <div className="w-8 h-px bg-zinc-700" />
                    <span>Our founding principle</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="relative bg-[#090B0F] py-20 md:py-32 overflow-hidden">
        {/* Background texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className="text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-[0.2em]">
                  The Team
                </span>
                <div className="h-px w-12 md:w-16 bg-gradient-to-r from-zinc-600 to-transparent" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em]">
                Built by engineers who lived the problem
              </h2>
            </motion.div>

            {/* Founder cards */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Valerie */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="group relative"
              >
                <div 
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Image section */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    {/* Background with gradient and glow */}
                    <div 
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, #1a1035 0%, #0d0a15 50%, #150d20 100%)' }}
                    />
                    {/* Accent glow */}
                    <div 
                      className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30 blur-3xl"
                      style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)' }}
                    />
                    <div 
                      className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-20 blur-2xl"
                      style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)' }}
                    />
                    {/* Subtle grid pattern */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <Image
                      src="/images/founder-valerie.png"
                      alt="Valerie"
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090B0F] via-transparent to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6 md:p-8 -mt-16">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">Valerie</h3>
                      <span className="text-sm text-[#FF6B35] font-medium">Co-founder & CEO</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      Former senior engineer at <span className="text-white">LinkedIn</span>. 
                      Built the first version of Duckie to solve her own on-call pain.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-zinc-800" />
                      <span className="text-xs text-zinc-600">Previously at</span>
                      <span className="text-sm font-semibold text-zinc-400">LinkedIn</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Joel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
                className="group relative"
              >
                <div 
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Image section */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    {/* Background with gradient and glow */}
                    <div 
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d0a15 50%, #0f1a2a 100%)' }}
                    />
                    {/* Accent glow */}
                    <div 
                      className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30 blur-3xl"
                      style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)' }}
                    />
                    <div 
                      className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-20 blur-2xl"
                      style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' }}
                    />
                    {/* Subtle grid pattern */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <Image
                      src="/images/founder-joel.avif"
                      alt="Joel"
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090B0F] via-transparent to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6 md:p-8 -mt-16">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">Joel</h3>
                      <span className="text-sm text-[#FF6B35] font-medium">Co-founder & CTO</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      Former senior engineer at <span className="text-white">Netflix</span> and <span className="text-white">C3 AI</span>. 
                      Obsessed with building AI that&apos;s actually reliable.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-zinc-800" />
                      <span className="text-xs text-zinc-600">Previously at</span>
                      <span className="text-sm font-semibold text-zinc-400">Netflix, C3 AI</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative bg-[#FFFFFF] pt-20 md:pt-32 pb-32 md:pb-72 overflow-hidden" data-theme="light">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-12 md:mb-20"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs md:text-sm font-medium text-[#999] uppercase tracking-[0.2em]">
                  Our Principles
                </span>
                <div className="h-px w-12 md:w-20 bg-gradient-to-r from-[#ccc] to-transparent" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] tracking-[-0.02em]">
                How we build
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "Actions over answers",
                  description: "We don't build chatbots that explain how to do things. We build AI that actually does them.",
                  color: "#FF6B35",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                },
                {
                  title: "Control by default",
                  description: "AI should do what you tell it, not what it thinks is best. Guardrails aren't optional.",
                  color: "#3B82F6",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                },
                {
                  title: "Transparency always",
                  description: "Every action logged. Every decision traceable. No black boxes.",
                  color: "#10B981",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
              ].map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                  className="group relative"
                >
                  <div 
                    className="relative h-full rounded-2xl md:rounded-3xl p-6 md:p-8 bg-white border border-[#E5E5E5] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:border-[#D5D5D5]"
                  >
                    {/* Hover gradient background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        background: `linear-gradient(135deg, ${value.color}08 0%, transparent 50%)` 
                      }}
                    />
                    
                    {/* Icon with colored background */}
                    <div 
                      className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${value.color}12`,
                        color: value.color,
                      }}
                    >
                      {value.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2 md:mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#666] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: value.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA + Footer section with pond background */}
      <CtaFooterSection />
    </main>
  )
}
