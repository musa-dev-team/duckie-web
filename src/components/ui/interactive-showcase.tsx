"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

// ============================================
// TYPES
// ============================================

export interface AccordionItem {
  id: string | number
  title: string
  description?: string
  duration?: string
}

export interface InteractiveShowcaseProps {
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
  
  // Background images (one per item)
  backgroundImages: string[]
  
  // Content render function - receives active index
  renderContent: (activeIndex: number, activeItem: AccordionItem) => React.ReactNode
  
  // Layout positioning
  imagePosition: 'left' | 'right'
  
  // Auto-rotation settings
  autoRotate?: boolean
  rotationDuration?: number
  
  // Accent gradient for icon and title styling
  accentGradient?: string
  
  // Content-only mode (no section wrapper)
  contentOnly?: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

// ============================================
// INTERACTIVE SHOWCASE COMPONENT (DESKTOP)
// ============================================

export function InteractiveShowcase({
  sectionTitle,
  sectionSubtitle,
  eyebrowLabel,
  panelIcon,
  panelTitle,
  panelDescription,
  ctaText,
  ctaHref,
  items,
  backgroundImages,
  renderContent,
  imagePosition,
  autoRotate = true,
  rotationDuration = 10000,
  accentGradient = "linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)",
  contentOnly = false,
}: InteractiveShowcaseProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Auto-rotation logic
  useEffect(() => {
    if (!autoRotate) return

    let startTime = Date.now()
    let animationFrame: number

    const updateProgress = () => {
      if (!isHovered) {
        const elapsed = Date.now() - startTime
        const newProgress = (elapsed / rotationDuration) * 100
        setProgress(newProgress)
        
        if (newProgress >= 100) {
          setActiveStep((current) => (current + 1) % items.length)
          startTime = Date.now()
          setProgress(0)
        }
      }
      animationFrame = requestAnimationFrame(updateProgress)
    }

    animationFrame = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [items.length, isHovered, activeStep, autoRotate, rotationDuration])

  const activeItem = items[activeStep]

  // Accordion Panel (Dark Side - 1/3 width)
  const AccordionPanel = (
    <div className="p-6 lg:p-8 lg:col-span-1 flex flex-col">
      {/* Panel Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-7 h-7 flex items-center justify-center [&_svg]:w-7 [&_svg]:h-7"
            style={{ 
              color: accentGradient.match(/#[a-fA-F0-9]{6}/g)?.[0] || '#ffffff',
            }}
          >
            {panelIcon}
          </div>
          <span 
            className="text-2xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: accentGradient }}
          >
            {panelTitle}
          </span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {panelDescription}
        </p>
      </div>

      {/* CTA Button */}
      {ctaText && ctaHref && (
        <motion.a
          href={ctaHref}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mb-8 self-start")}
        >
          {ctaText}
        </motion.a>
      )}

      {/* Accordion Steps */}
      <div 
        className="space-y-0 mt-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {items.map((item, index) => {
          const isActive = activeStep === index

          return (
            <div key={item.id}>
              <motion.button
                onClick={() => {
                  setActiveStep(index)
                  setProgress(0)
                }}
                className={cn(
                  "w-full text-left py-4 transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                )}
                whileHover={{ x: isActive ? 0 : 4 }}
                transition={{ duration: 0.2, ease }}
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
                      "text-xs font-mono transition-colors duration-300 shrink-0",
                      isActive ? "text-zinc-400" : "text-zinc-600"
                    )}>
                      {item.duration}
                    </div>
                  )}
                </div>
                
                {/* Step Description - only show when active */}
                <AnimatePresence initial={false}>
                  {isActive && item.description && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ 
                        height: { duration: 0.3, ease },
                        opacity: { duration: 0.2, ease }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="text-zinc-400 text-sm leading-relaxed mt-2">
                        {item.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Divider with Progress */}
              <div className="relative h-px">
                {/* Base divider */}
                <div className={cn(
                  "absolute inset-0 transition-all duration-300",
                  isActive ? "bg-white/15" : "bg-white/5"
                )} />
                {/* Progress indicator */}
                {isActive && autoRotate && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white/60"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // Image Panel (Light Side - 2/3 width)
  const ImagePanel = (
    <div className="relative p-6 lg:p-8 flex items-center justify-center lg:col-span-2">
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-6 lg:inset-8 rounded-xl overflow-hidden"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease }}
            className="absolute inset-0"
          >
            <Image 
              src={backgroundImages[activeStep] || backgroundImages[0]} 
              alt="" 
              fill 
              className="object-cover"
              unoptimized
            />
            {/* Multi-layer overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-black/50" />
            {/* Radial vignette */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />
            {/* Top highlight for depth */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>
        {/* Inner border highlight overlay */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.03)',
          }}
        />
      </div>
      
      {/* Floating Content Card */}
      <div className="relative w-full max-w-2xl">
        {renderContent(activeStep, activeItem)}
      </div>
    </div>
  )

  const content = (
    <div className="container mx-auto px-6">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease }}
        className="mb-12"
      >
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
        <h2 className="text-5xl lg:text-5xl font-normal text-zinc-50 leading-[1.1] tracking-tight max-w-3xl">
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
            {sectionSubtitle}
          </p>
        )}
      </motion.div>

      {/* Contained Canvas Component */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="rounded-2xl overflow-hidden grid lg:grid-cols-3 min-h-[650px]"
        style={{ 
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%), #18181b',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {imagePosition === 'left' ? (
          <>
            {ImagePanel}
            {AccordionPanel}
          </>
        ) : (
          <>
            {AccordionPanel}
            {ImagePanel}
          </>
        )}
      </motion.div>
    </div>
  )

  if (contentOnly) {
    return (
      <div className="relative py-20 hidden lg:block">
        {content}
      </div>
    )
  }

  return (
    <section className="relative py-20 hidden lg:block">
      {content}
    </section>
  )
}

export default InteractiveShowcase
