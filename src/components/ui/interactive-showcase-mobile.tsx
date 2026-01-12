"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

// ============================================
// TYPES (same as desktop)
// ============================================

export interface AccordionItem {
  id: string | number
  title: string
  description?: string
  duration?: string
}

export interface InteractiveShowcaseMobileProps {
  // Section header
  sectionTitle: string
  sectionSubtitle?: string
  eyebrowLabel?: string
  
  // Panel configuration
  panelIcon: React.ReactNode
  panelTitle: string
  panelDescription: string
  ctaText?: string
  ctaHref?: string
  
  // Accordion items
  items: AccordionItem[]
  
  // Content render function - receives active index
  renderContent: (activeIndex: number, activeItem: AccordionItem) => React.ReactNode
  
  // Accent gradient for icon and title styling
  accentGradient?: string
}

const ease = [0.22, 1, 0.36, 1] as const

// ============================================
// INTERACTIVE SHOWCASE COMPONENT (MOBILE)
// ============================================

export function InteractiveShowcaseMobile({
  sectionTitle,
  sectionSubtitle,
  eyebrowLabel,
  panelIcon,
  panelTitle,
  panelDescription,
  ctaText,
  ctaHref,
  items,
  renderContent,
  accentGradient = "linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)",
}: InteractiveShowcaseMobileProps) {
  const [activeStep, setActiveStep] = useState(0)
  const activeItem = items[activeStep]

  return (
    <section className="relative py-12 lg:hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          {eyebrowLabel && (
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase mb-4"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.06)',
                color: accentGradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || '#a1a1aa',
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: accentGradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || '#a1a1aa' }}
              />
              {eyebrowLabel}
            </div>
          )}
          <h2 className="font-serif text-3xl font-normal text-zinc-50 leading-[1.1] tracking-tight">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="mt-3 text-base text-zinc-400">
              {sectionSubtitle}
            </p>
          )}
        </div>

        {/* Main Card */}
        <div 
          className="rounded-2xl overflow-hidden"
          style={{ 
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%), #18181b',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Panel Header */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-6 h-6 flex items-center justify-center [&_svg]:w-6 [&_svg]:h-6"
                style={{ 
                  color: accentGradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || '#ffffff',
                }}
              >
                {panelIcon}
              </div>
              <span 
                className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{ backgroundImage: accentGradient }}
              >
                {panelTitle}
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {panelDescription}
            </p>
            
            {/* CTA Button */}
            {ctaText && ctaHref && (
              <motion.a
                href={ctaHref}
                whileTap={{ scale: 0.98 }}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}
              >
                {ctaText}
              </motion.a>
            )}
          </div>

          {/* Content Card */}
          <div className="p-5">
            <div className="w-full">
              {renderContent(activeStep, activeItem)}
            </div>
          </div>

          {/* Accordion Items */}
          <div className="px-5 pb-5 pt-3">
            <div className="space-y-0">
              {items.map((item, index) => {
                const isActive = activeStep === index

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setActiveStep(index)}
                      className={cn(
                        "w-full text-left py-3 transition-all duration-300",
                        isActive ? "opacity-100" : "opacity-50"
                      )}
                    >
                      {/* Step Title with optional duration */}
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <div className={cn(
                          "text-base font-semibold transition-colors duration-300 tracking-tight",
                          isActive ? "text-white" : "text-zinc-500"
                        )}>
                          {item.title}
                        </div>
                        {item.duration && (
                          <div className={cn(
                            "text-sm font-mono transition-colors duration-300 shrink-0",
                            isActive ? "text-zinc-400" : "text-zinc-600"
                          )}>
                            {item.duration}
                          </div>
                        )}
                      </div>
                      
                      {/* Step Description - always visible, dimmed when not active */}
                      {item.description && (
                        <div className={cn(
                          "text-sm leading-relaxed transition-colors duration-200",
                          isActive ? "text-zinc-400" : "text-zinc-600"
                        )}>
                          {item.description}
                        </div>
                      )}
                    </button>

                    {/* Divider */}
                    <div className={cn(
                      "h-px transition-all duration-300",
                      isActive ? "bg-white/15" : "bg-white/5"
                    )} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveShowcaseMobile
