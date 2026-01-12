"use client"

import { content } from "@/config/content"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"
import Link from "next/link"
import { useRef, useState } from "react"

// Organize integrations by category with proper grouping
const integrations = [
  { name: "Zendesk", category: "Support" },
  { name: "Intercom", category: "Support" },
  { name: "HubSpot", category: "Support" },
  { name: "Plain", category: "Support" },
  { name: "Slack", category: "Chat" },
  { name: "Discord", category: "Chat" },
  { name: "Jira", category: "Tools" },
  { name: "Linear", category: "Tools" },
  { name: "Notion", category: "Knowledge" },
  { name: "Confluence", category: "Knowledge" },
  { name: "Google Drive", category: "Knowledge" },
]

// Split for marquee rows
const row1 = integrations.slice(0, 6)
const row2 = integrations.slice(6)

function MarqueeRow({ 
  items, 
  direction = "left",
  duration = 140 
}: { 
  items: typeof integrations
  direction?: "left" | "right"
  duration?: number 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const speedRef = useRef(direction === "left" ? -1000 / duration : 1000 / duration)
  const pausedSpeedRef = useRef(speedRef.current / 10)

  useAnimationFrame((t, delta) => {
    const speed = isHovered ? pausedSpeedRef.current : speedRef.current
    const newX = x.get() + speed * (delta / 1000)
    
    // Reset when reaching boundaries
    if (direction === "left" && newX <= -1000) {
      x.set(newX + 1000)
    } else if (direction === "right" && newX >= 0) {
      x.set(newX - 1000)
    } else {
      x.set(newX)
    }
  })

  const repeatedItems = direction === "left" 
    ? [...items, ...items, ...items]
    : [...items, ...items, ...items, ...items]

  return (
    <div 
      className="relative overflow-x-hidden py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-4"
        style={{ x }}
      >
        {repeatedItems.map((integration, i) => (
          <IntegrationCard
            key={`${integration.name}-${i}`}
            name={integration.name}
            category={integration.category}
          />
        ))}
      </motion.div>
      
      {/* Fade overlays */}
      <div 
        className="pointer-events-none absolute inset-y-0 left-0 w-32"
        style={{
          background: 'linear-gradient(to right, var(--bg-deep-blue), transparent)',
        }}
      />
      <div 
        className="pointer-events-none absolute inset-y-0 right-0 w-32"
        style={{
          background: 'linear-gradient(to left, var(--bg-deep-blue), transparent)',
        }}
      />
    </div>
  )
}

export function Integrations() {
  return (
    <section className="overflow-hidden pt-32 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl font-normal tracking-tight text-zinc-50">
            {content.channels.title}
          </h2>
        </div>

        {/* Marquee rows */}
        <div className="space-y-4">
          <MarqueeRow items={row1} direction="left" duration={140} />
          <MarqueeRow items={row2} direction="right" duration={140} />
        </div>

        {/* Footer link */}
        <div className="mt-4 text-center">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-50"
          >
            See all integrations
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function IntegrationCard({ name, category }: { name: string; category: string }) {
  return (
    <div className="group relative flex h-20 w-44 flex-shrink-0 flex-col items-start justify-between overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-850">
      {/* Category label */}
      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        {category}
      </div>
      
      {/* Integration name */}
      <div className="text-base font-semibold text-zinc-50">
        {name}
      </div>
    </div>
  )
}
