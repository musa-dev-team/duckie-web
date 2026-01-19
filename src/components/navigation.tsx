"use client"

import { Button } from "@/components/ui/button"
import { content } from "@/config/content"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navigation = {
  product: {
    label: "Product",
    href: "/",
    items: [
      { label: "What Duckie Does", href: "/#what-duckie-does" },
      { label: "How Duckie Works", href: "/#how-it-works" },
      { label: "Quality & Control", href: "/#quality-control" },
      { label: "Go Live", href: "/#go-live" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  company: {
    label: "Company",
    href: "/about",
    items: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "https://www.workatastartup.com/companies/duckie" },
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
  const pathname = usePathname()
  
  // Detect scroll position and check if over light sections
  useEffect(() => {
    const handleScroll = () => {
      // Hero section is typically viewport height, so switch after that
      const heroHeight = window.innerHeight * 0.8 // 80% of viewport height
      setScrolled(window.scrollY > heroHeight)
      
      // Check if navigation is over any light section
      // We check at a point further down (150px) to account for pages with
      // white padding around dark hero images (like the blog page)
      const lightSections = document.querySelectorAll('[data-theme="light"]')
      const checkPoint = 150 // Check at this Y position to determine theme
      
      let isOverLight = false
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // Check if this section is covering the check point
        if (rect.top <= checkPoint && rect.bottom > checkPoint) {
          isOverLight = true
        }
      })
      
      setIsOverLightSection(isOverLight)
    }
    
    // Run on mount, route change, and scroll
    // Small delay to ensure DOM has updated after route change
    const timeoutId = setTimeout(handleScroll, 50)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])
  
  const isLight = variant === "solid" || scrolled
  const isDark = isOverLightSection // Dark mode when over light sections
  
  // Get active dropdown items
  const activeItems = activeDropdown 
    ? navigation[activeDropdown as keyof typeof navigation]?.items 
    : null
  
  return (
    <header 
      className="fixed left-0 right-0 z-50"
      style={{
        top: scrolled ? '0.5rem' : '1rem',
        transition: 'top 1s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div 
        className="w-full"
        style={{
          paddingLeft: scrolled ? 'max(1.5rem, calc((100vw - 1536px) / 2 + 1.5rem))' : '2.5rem',
          paddingRight: scrolled ? 'max(1.5rem, calc((100vw - 1536px) / 2 + 1.5rem))' : '1.5rem',
          transition: 'padding 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <nav className="flex h-16 items-center justify-between gap-4">
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
            <Link href="/" className="flex items-center gap-2">
              <span 
                className={cn(
                  "text-xl font-semibold tracking-tight transition-colors duration-300",
                  isDark ? "text-zinc-900" : scrolled ? "text-zinc-50" : "text-white"
                )}
                style={{ fontFamily: "var(--font-helvetica)" }}
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
                {...navigation.product} 
                isLight={scrolled} 
                isDark={isDark}
                isActive={activeDropdown === 'product'}
                onHover={() => setActiveDropdown('product')}
              />
              <NavLink 
                {...navigation.company} 
                isLight={scrolled} 
                isDark={isDark}
                isActive={activeDropdown === 'company'}
                onHover={() => setActiveDropdown('company')}
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
                asChild
                className={cn(
                  "transition-colors duration-300",
                  isDark
                    ? "bg-zinc-900 text-white hover:bg-zinc-800"
                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                )}
              >
                <a href={content.links.demoUrl} target="_blank" rel="noopener noreferrer">
                  Book a demo
                </a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        </nav>
      </div>
    </header>
  )
}
