"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const navigation = {
  platform: {
    label: "Platform",
    href: "/platform",
    items: [
      { label: "Agents", href: "/platform#agents" },
      { label: "Guardrails", href: "/platform#guardrails" },
      { label: "Knowledge", href: "/platform#knowledge" },
      { label: "Runbooks", href: "/platform#runbooks" },
      { label: "Analytics", href: "/platform#analytics" },
    ],
  },
  howItWorks: {
    label: "How It Works",
    href: "/how-it-works",
    items: [
      { label: "Understand", href: "/how-it-works#understand" },
      { label: "Check Guardrails", href: "/how-it-works#check-guardrails" },
      { label: "Gather Context", href: "/how-it-works#gather-context" },
      { label: "Take Action", href: "/how-it-works#take-action" },
      { label: "Log & Learn", href: "/how-it-works#log-learn" },
    ],
  },
}

function NavLink({ 
  label, 
  href, 
  isLight = false,
  isDark = false,
  isActive = false,
  onHover,
}: { 
  label: string
  href: string
  isLight?: boolean
  isDark?: boolean
  isActive?: boolean
  onHover: () => void
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      className={cn(
        "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
        isDark
          ? "text-zinc-900 hover:text-zinc-700"
          : isLight 
            ? "text-zinc-50 hover:text-zinc-300" 
            : "text-white/90 hover:text-white"
      )}
    >
      {label}
      <ChevronDown className={cn(
        "h-4 w-4 transition-transform",
        isActive && "rotate-180"
      )} />
    </Link>
  )
}

export function Navigation({ variant = "transparent" }: { variant?: "transparent" | "solid" }) {
  const [scrolled, setScrolled] = useState(false)
  const [isOverLightSection, setIsOverLightSection] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Detect scroll position and check if over light sections
  useEffect(() => {
    const handleScroll = () => {
      // Hero section is typically viewport height, so switch after that
      const heroHeight = window.innerHeight * 0.8 // 80% of viewport height
      setScrolled(window.scrollY > heroHeight)
      
      // Check if navigation is over any light section
      const lightSections = document.querySelectorAll('[data-theme="light"]')
      const navHeight = 80 // Height of navigation
      
      let isOverLight = false
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // Check if this section is covering the navigation area
        if (rect.top <= navHeight && rect.bottom > navHeight) {
          isOverLight = true
        }
      })
      
      setIsOverLightSection(isOverLight)
    }
    
    // Run on mount and scroll
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const isLight = variant === "solid" || scrolled
  const isDark = isOverLightSection // Dark mode when over light sections
  
  // Get active dropdown items
  const activeItems = activeDropdown 
    ? navigation[activeDropdown as keyof typeof navigation]?.items 
    : null
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 gap-4">
        {/* Logo + Nav Links Container */}
        <div 
          className="relative"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {/* Logo + Nav Links */}
          <div className={cn(
            "flex items-center gap-6 rounded-lg px-4 py-2 transition-all duration-300",
            scrolled && !isDark && "backdrop-blur-sm",
            isDark && "backdrop-blur-sm"
          )}>
            {/* Logo */}
            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2">
              <span 
                className={cn(
                  "text-xl font-semibold tracking-tight transition-colors duration-300",
                  isDark ? "text-zinc-900" : scrolled ? "text-zinc-50" : "text-white"
                )}
                style={{ fontFamily: "var(--font-geist)" }}
              >
                Duckie<span className={cn(
                  "transition-colors duration-300",
                  isDark ? "text-amber-600" : "text-amber-500"
                )}>.</span>
              </span>
            </Link>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink 
                {...navigation.platform} 
                isLight={scrolled} 
                isDark={isDark}
                isActive={activeDropdown === 'platform'}
                onHover={() => setActiveDropdown('platform')}
              />
              <NavLink 
                {...navigation.howItWorks} 
                isLight={scrolled} 
                isDark={isDark}
                isActive={activeDropdown === 'howItWorks'}
                onHover={() => setActiveDropdown('howItWorks')}
              />
            </div>
          </div>
          
          {/* Dropdown Menu - Below entire container */}
          <AnimatePresence>
            {activeDropdown && activeItems && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full pt-2"
              >
                <div className={cn(
                  "w-[280px] px-4 py-2 transition-all duration-300",
                  (scrolled || isDark) && "rounded-lg shadow-lg",
                  scrolled && !isDark && "backdrop-blur-sm",
                  isDark && "backdrop-blur-sm"
                )}>
                  {activeItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-normal transition-all hover:font-medium",
                        isDark
                          ? "text-zinc-900 hover:text-zinc-700"
                          : scrolled
                            ? "text-zinc-50 hover:text-zinc-300"
                            : "text-white/90 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* CTA - only show after scrolling past hero */}
        <AnimatePresence>
          {scrolled && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4"
            >
              <Button 
                size="sm"
                className={cn(
                  "transition-colors duration-300",
                  isDark
                    ? "bg-zinc-900 text-white hover:bg-zinc-800"
                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                )}
              >
                Book a Demo
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
