"use client"

import { content } from "@/config/content"
import Link from "next/link"

export function Footer() {
  const { brand, footer, navigation } = content

  return (
    <footer className="relative px-3 md:px-4 pt-38 md:pt-24 pb-3 md:pb-36">
      {/* Footer card with rounded corners sitting on blue background */}
      <div className="max-w-6xl mx-auto bg-[#faf9f7] backdrop-blur-sm rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.15),0_-8px_25px_rgba(0,0,0,0.1),0_10px_40px_rgba(0,0,0,0.12)] ring-1 ring-white/50 ring-inset transform -translate-y-4">
        <div className="px-5 md:px-8 lg:px-16">
          {/* Top Section - Logo, Tagline & Stats */}
          <div className="pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-10 lg:pb-12 border-b border-[#e5e5e5]">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 md:gap-10 lg:gap-16">
              {/* Left: Logo, Tagline & CTA */}
              <div className="flex-1">
                <Link href="/" className="inline-block mb-5 md:mb-8">
                  <span 
                    className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1a1a1a]"
                    style={{ fontFamily: "var(--font-helvetica)" }}
                  >
                    {brand.name}<span className="text-[#FF6B35]">.</span>
                  </span>
                </Link>

                <div className="max-w-md">
                  <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#1a1a1a] leading-tight mb-0 md:mb-6">
                    AI-powered support that actually resolves tickets.
                  </p>
                  <a
                    href={content.links.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center justify-center h-10 md:h-11 px-5 md:px-6 rounded-full text-xs md:text-sm font-medium text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors"
                  >
                    Book a demo
                    <svg className="ml-1.5 md:ml-2 w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right: Stats - hidden on mobile */}
              <div className="hidden md:block lg:max-w-sm">
                <p className="text-[10px] md:text-xs font-semibold tracking-wider text-[#666] uppercase mb-4 md:mb-6">
                  Average Customer Results
                </p>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-baseline gap-3 md:gap-4">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a]">87%</span>
                    <span className="text-xs md:text-sm text-[#666]">Tickets resolved automatically</span>
                  </div>
                  <div className="flex items-baseline gap-3 md:gap-4">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a]">3.2x</span>
                    <span className="text-xs md:text-sm text-[#666]">Faster response times</span>
                  </div>
                  <div className="flex items-baseline gap-3 md:gap-4">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a]">47%</span>
                    <span className="text-xs md:text-sm text-[#666]">Reduction in support costs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-6 md:py-10 lg:py-12 grid grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8 lg:gap-12">
            {/* Product Links */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-[#1a1a1a] mb-3 md:mb-4">Product</h3>
              <ul className="space-y-2 md:space-y-3">
                {navigation.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-[#1a1a1a] mb-3 md:mb-4">
                {footer.company.title}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {footer.company.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-[#1a1a1a] mb-3 md:mb-4">
                {footer.legal.title}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {footer.legal.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="py-4 md:py-6 border-t border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-[#999]">{brand.copyright}</p>
            <div className="flex items-center gap-2">
              {footer.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-[#e5e5e5] text-[#666] hover:text-[#1a1a1a] hover:border-[#ccc] transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Social Icons Component
function SocialIcon({ name }: { name: string }) {
  const iconClass = "h-4 w-4 md:h-5 md:w-5"

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
