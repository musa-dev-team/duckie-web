"use client"

import { CtaContent } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"

interface CtaFooterSectionProps {
  /**
   * Whether to include the CTA section above the footer.
   * Default: true
   */
  includeCta?: boolean
  /**
   * Custom class name for the wrapper div.
   * Used to control top margin for different page layouts.
   */
  className?: string
}

export function CtaFooterSection({ includeCta = true, className = "" }: CtaFooterSectionProps) {
  return (
    <div className={`relative overflow-hidden bg-[#FFFFFF] ${className}`}>
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
        {includeCta && (
          <div data-theme="light">
            <CtaContent />
          </div>
        )}
        {!includeCta && (
          <div className="pt-24 md:pt-32" aria-hidden="true" />
        )}
        <Footer />
      </div>
    </div>
  )
}
