"use client"

import { Button } from "@/components/ui/button"
import { content } from "@/config/content"
import Link from "next/link"

export function CtaFooterWrapper() {
  const { brand, footer, navigation } = content
  
  const benefits = [
    "Live in under 2 hours",
    "SOC 2 Type II certified",
    "82% average resolution rate",
    "Dedicated implementation support",
  ]

  return (
    <div className="relative">
      {/* ===== CTA SECTION ===== */}
      <section className="relative bg-white overflow-hidden" data-theme="light">
        {/* Main CTA content */}
        <div className="container mx-auto px-6 pt-24 pb-48 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Left: CTA */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
                {content.finalCta.headline}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join leading support teams who've transformed their operations with Duckie.
              </p>
              <Button 
                size="default" 
                className="text-base px-6 py-4 transition-all hover:scale-105 hover:shadow-lg w-full md:w-auto"
              >
                {content.finalCta.cta}
              </Button>
            </div>

            {/* Right: Benefits */}
            <div className="md:ml-auto">
              {benefits.map((benefit, idx) => (
                <div key={idx}>
                  <div className="py-4">
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                  {idx !== benefits.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-gray-300 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big Cutoff Duckie Text */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none pr-12 z-30">
          <div className="relative flex justify-end pr-8">
            {/* Main text - white to create negative space against the glow */}
            <span 
              className="relative text-[24vw] font-black leading-[0.75] tracking-tight text-white"
              style={{ transform: 'translateY(35%)' }}
            >
              Duckie
            </span>
          </div>
        </div>
      </section>

      {/* ===== SHARED GLOW (spans CTA and Footer boundary) ===== */}
      <div 
        className="absolute w-[80vw] h-[500px] pointer-events-none z-20 animate-shared-glow"
        style={{
          top: 'calc(100% - 28rem - 16rem)', // Position at the boundary
          right: '10vw', // Shifted left so the D is visible
        }}
        aria-hidden="true"
      >
        {/* Multiple color layers that fade in/out for smooth color transitions */}
        <div className="absolute inset-0 glow-layer-purple" style={{ filter: 'blur(60px)' }} />
        <div className="absolute inset-0 glow-layer-blue" style={{ filter: 'blur(60px)' }} />
        <div className="absolute inset-0 glow-layer-mint" style={{ filter: 'blur(60px)' }} />
      </div>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="relative bg-white">
        {/* Fading divider */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(229, 231, 235, 1) 20%, rgba(229, 231, 235, 1) 80%, transparent 100%)',
          }}
        />
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block">
                <span 
                  className="text-xl font-semibold tracking-tight text-gray-900"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {brand.name}<span className="text-amber-500">.</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-gray-600 max-w-xs">
                {brand.description}
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Product</h3>
              <ul className="mt-4 space-y-3">
                {navigation.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {footer.company.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {footer.company.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {footer.legal.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {footer.legal.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">{brand.copyright}</p>

            {/* Social Links */}
            <div className="flex gap-6">
              {footer.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Social Icons Component
function SocialIcon({ name }: { name: string }) {
  const iconClass = "h-5 w-5"

  switch (name) {
    case "Twitter":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case "LinkedIn":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case "GitHub":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    default:
      return null
  }
}
