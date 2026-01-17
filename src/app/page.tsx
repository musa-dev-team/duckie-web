"use client"

import { CtaContent } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { HowItWorksContent } from "@/components/sections/how-it-works-canvas"
import { ImplementationContent } from "@/components/sections/implementation-canvas"
import { OmnichannelContent } from "@/components/sections/omnichannel"
import { QualityContent } from "@/components/sections/quality-section"
import { StatsContent } from "@/components/sections/stats"
import { TestimonialsContent } from "@/components/sections/testimonials"
import { WhatDuckiesDoesContent } from "@/components/sections/what-duckie-does"

export default function Home() {
  return (
    <main>
      {/* Hero - keeps its own background (ocean image) */}
      <Hero />
      
      {/* Dark sections container with unified background */}
      <div className="relative bg-[#090B0F]">
        {/* Content sections */}
        <StatsContent />
        <WhatDuckiesDoesContent />
        <HowItWorksContent />
        <ImplementationContent />
        <QualityContent />
        <OmnichannelContent />
      </div>
      
      {/* Light sections container with unified background */}
      <div 
        className="relative bg-[#F5F5F5]"
        data-theme="light"
      >
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />
        
        {/* Content sections */}
        <TestimonialsContent />
        <CtaContent />
      </div>
      
      <Footer />
    </main>
  )
}
