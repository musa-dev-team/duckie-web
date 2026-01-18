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
        className="relative bg-[#FFFFFF] pb-48 md:pb-86"
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
      </div>
      
      {/* CTA + Footer section with pond background */}
      <div className="relative overflow-hidden -mt-4 md:-mt-12 bg-[#FFFFFF]">
        {/* Background image - using img tag so drop-shadow respects transparency */}
        <img 
          src="/images/pond-3.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pond-bg-image"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
        />
        {/* Vignette overlay for bottom corners */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 0% 100%, rgba(0,0,0,0.35) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 70%)
            `,
          }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative">
          <div data-theme="light">
            <CtaContent />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  )
}
