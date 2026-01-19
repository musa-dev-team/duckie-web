"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash
    if (hash) {
      // Small delay to allow content to render (especially with animations)
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [pathname])

  return null
}
