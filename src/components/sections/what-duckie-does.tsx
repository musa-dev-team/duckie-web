"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  Check,
  CreditCard,
  FileText,
  Key,
  MessageSquare,
  Package,
  RefreshCcw,
  ShieldCheck,
  UserCog,
} from "lucide-react"
import { useEffect, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Action categories with their icons, counts, and example conversations
const actions = [
  { 
    id: "refunds",
    label: "Refunds processed", 
    icon: CreditCard, 
    baseCount: 847,
    increment: { min: 1, max: 3 },
    intervalMs: 4200,
    color: "emerald",
    detail: "$42.3K returned today",
    example: {
      ticketId: "#48291",
      customer: { name: "Sarah", initial: "S" },
      message: "Hi, I received a damaged item in my order #48291. Can I get a refund?",
      response: "I've processed your refund of <highlight>$49.99</highlight>. You'll see it back on your Visa ending in 4242 within 3-5 business days.",
      steps: [
        { label: "Verified order", detail: "#48291" },
        { label: "Processed refund", detail: "$49.99 → Visa ****4242" },
        { label: "Sent confirmation", detail: "sarah@email.com" },
      ],
    }
  },
  { 
    id: "orders",
    label: "Orders tracked", 
    icon: Package, 
    baseCount: 2341,
    increment: { min: 2, max: 5 },
    intervalMs: 2800,
    color: "sky",
    detail: "Real-time shipping updates",
    example: {
      ticketId: "#48294",
      customer: { name: "Alex", initial: "A" },
      message: "Where is my order? It was supposed to arrive yesterday.",
      response: "Your order shipped and is scheduled for delivery <highlight>tomorrow by 8pm</highlight>. I've sent you a live tracking link.",
      steps: [
        { label: "Located order", detail: "#58192" },
        { label: "Retrieved tracking", detail: "FedEx • In transit" },
        { label: "Sent tracking link", detail: "Live updates enabled" },
      ],
    }
  },
  { 
    id: "passwords",
    label: "Passwords reset", 
    icon: Key, 
    baseCount: 412,
    increment: { min: 1, max: 2 },
    intervalMs: 6500,
    color: "amber",
    detail: "Secure verification flow",
    example: {
      ticketId: "#48293",
      customer: { name: "Jamie", initial: "J" },
      message: "I can't log into my account. Can you help me reset my password?",
      response: "I've sent a password reset link to <highlight>j***@gmail.com</highlight>. It expires in 24 hours.",
      steps: [
        { label: "Verified identity", detail: "Security questions" },
        { label: "Generated reset link", detail: "24h expiry" },
        { label: "Sent email", detail: "Check inbox & spam" },
      ],
    }
  },
  { 
    id: "subscriptions",
    label: "Subscriptions changed", 
    icon: RefreshCcw, 
    baseCount: 156,
    increment: { min: 1, max: 2 },
    intervalMs: 8000,
    color: "purple",
    detail: "Upgrades, downgrades & cancels",
    example: {
      ticketId: "#48292",
      customer: { name: "Mike", initial: "M" },
      message: "I need to cancel my Pro subscription, please.",
      response: "Done! Your subscription is cancelled. You'll keep Pro access until <highlight>Jan 31st</highlight>.",
      steps: [
        { label: "Found account", detail: "Pro Plan • $29/mo" },
        { label: "Cancelled subscription", detail: "Effective Jan 31" },
        { label: "Sent confirmation", detail: "mike@email.com" },
      ],
    }
  },
  { 
    id: "invoices",
    label: "Invoices sent", 
    icon: FileText, 
    baseCount: 623,
    increment: { min: 1, max: 3 },
    intervalMs: 5100,
    color: "pink",
    detail: "Auto-generated & delivered",
    example: {
      ticketId: "#48296",
      customer: { name: "Lisa", initial: "L" },
      message: "Can I get a copy of my invoice from last month?",
      response: "I've sent the invoice for <highlight>December 2024</highlight> to your email. You can also download it from your account.",
      steps: [
        { label: "Found invoice", detail: "INV-2024-1847" },
        { label: "Generated PDF", detail: "Dec 2024 • $149.00" },
        { label: "Sent to email", detail: "lisa@company.com" },
      ],
    }
  },
  { 
    id: "accounts",
    label: "Accounts updated", 
    icon: UserCog, 
    baseCount: 289,
    increment: { min: 1, max: 2 },
    intervalMs: 7200,
    color: "orange",
    detail: "Billing, profile & preferences",
    example: {
      ticketId: "#48295",
      customer: { name: "Taylor", initial: "T" },
      message: "Can you update my billing email to my work address?",
      response: "Done! All future invoices will be sent to your <highlight>new billing address</highlight>.",
      steps: [
        { label: "Updated account", detail: "Billing email changed" },
        { label: "Confirmed change", detail: "To both addresses" },
      ],
    }
  },
  { 
    id: "tickets",
    label: "Tickets resolved", 
    icon: MessageSquare, 
    baseCount: 1893,
    increment: { min: 2, max: 4 },
    intervalMs: 3500,
    color: "teal",
    detail: "Without human intervention",
    example: {
      ticketId: "#48297",
      customer: { name: "Chris", initial: "C" },
      message: "How do I export my data? I can't find the option anywhere.",
      response: "Go to Settings → Privacy → <highlight>Export Data</highlight>. I've also sent you a direct link.",
      steps: [
        { label: "Identified question", detail: "Data export help" },
        { label: "Found documentation", detail: "KB article #234" },
        { label: "Sent instructions", detail: "With direct link" },
      ],
    }
  },
  { 
    id: "verifications",
    label: "Fraud checks passed", 
    icon: ShieldCheck, 
    baseCount: 3247,
    increment: { min: 3, max: 6 },
    intervalMs: 2200,
    color: "rose",
    detail: "Real-time risk assessment",
    example: {
      ticketId: "#48298",
      customer: { name: "Jordan", initial: "J" },
      message: "I'm trying to make a purchase but it keeps declining. Can you help?",
      response: "I've verified your identity and <highlight>unblocked your account</highlight>. Your next purchase should go through!",
      steps: [
        { label: "Ran fraud check", detail: "Score: 0.02 (safe)" },
        { label: "Verified identity", detail: "Phone confirmed" },
        { label: "Unblocked account", detail: "Ready to purchase" },
      ],
    }
  },
]

// Get milliseconds since start of today (UTC to avoid timezone jumps)
const getElapsedToday = () => {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return Date.now() - startOfDay
}

// Calculate deterministic count based on elapsed time today
const getTimeBasedCount = (
  baseCount: number, 
  increment: { min: number; max: number }, 
  intervalMs: number
) => {
  const elapsed = getElapsedToday()
  const intervalsPassed = Math.floor(elapsed / intervalMs)
  // Use average increment for deterministic calculation
  const avgIncrement = (increment.min + increment.max) / 2
  return baseCount + Math.floor(intervalsPassed * avgIncrement)
}

// Calculate total based on all actions' time-based counts
const getTimeBasedTotal = () => {
  return actions.reduce((sum, action) => {
    return sum + getTimeBasedCount(action.baseCount, action.increment, action.intervalMs)
  }, 0)
}

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  emerald: { 
    bg: 'rgba(110, 160, 140, 0.08)', 
    border: 'rgba(110, 160, 140, 0.18)', 
    text: 'rgb(145, 195, 175)',
    glow: 'rgba(110, 160, 140, 0.3)'
  },
  sky: { 
    bg: 'rgba(120, 160, 190, 0.08)', 
    border: 'rgba(120, 160, 190, 0.18)', 
    text: 'rgb(155, 190, 215)',
    glow: 'rgba(120, 160, 190, 0.3)'
  },
  amber: { 
    bg: 'rgba(190, 165, 110, 0.08)', 
    border: 'rgba(190, 165, 110, 0.18)', 
    text: 'rgb(215, 195, 145)',
    glow: 'rgba(190, 165, 110, 0.3)'
  },
  purple: { 
    bg: 'rgba(150, 130, 180, 0.08)', 
    border: 'rgba(150, 130, 180, 0.18)', 
    text: 'rgb(185, 170, 210)',
    glow: 'rgba(150, 130, 180, 0.3)'
  },
  pink: { 
    bg: 'rgba(180, 130, 155, 0.08)', 
    border: 'rgba(180, 130, 155, 0.18)', 
    text: 'rgb(210, 165, 185)',
    glow: 'rgba(180, 130, 155, 0.3)'
  },
  orange: { 
    bg: 'rgba(190, 150, 115, 0.08)', 
    border: 'rgba(190, 150, 115, 0.18)', 
    text: 'rgb(215, 180, 150)',
    glow: 'rgba(190, 150, 115, 0.3)'
  },
  teal: { 
    bg: 'rgba(100, 155, 150, 0.08)', 
    border: 'rgba(100, 155, 150, 0.18)', 
    text: 'rgb(140, 190, 185)',
    glow: 'rgba(100, 155, 150, 0.3)'
  },
  rose: { 
    bg: 'rgba(180, 120, 135, 0.08)', 
    border: 'rgba(180, 120, 135, 0.18)', 
    text: 'rgb(210, 155, 170)',
    glow: 'rgba(180, 120, 135, 0.3)'
  },
}

// Animated counter component
function AnimatedCounter({ 
  baseCount, 
  increment, 
  intervalMs, 
  color,
}: { 
  baseCount: number
  increment: { min: number; max: number }
  intervalMs: number
  color: string
}) {
  // Initialize with baseCount for SSR, then update to time-based count on client
  const [count, setCount] = useState(baseCount)
  const [isIncrementing, setIsIncrementing] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const colors = colorMap[color]
  
  // Set time-based count after hydration
  useEffect(() => {
    setCount(getTimeBasedCount(baseCount, increment, intervalMs))
    setHasMounted(true)
  }, [baseCount, increment, intervalMs])
  
  useEffect(() => {
    if (!hasMounted) return
    
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * (increment.max - increment.min + 1)) + increment.min
      setCount(prev => prev + inc)
      setIsIncrementing(true)
      setTimeout(() => setIsIncrementing(false), 300)
    }, intervalMs)
    
    return () => clearInterval(interval)
  }, [increment, intervalMs, hasMounted])
  
  return (
    <span 
      suppressHydrationWarning
      className="tabular-nums font-semibold text-2xl transition-all duration-300"
      style={{ 
        color: colors.text,
      }}
    >
      {count.toLocaleString()}
    </span>
  )
}

// Parse response to handle <highlight> tags
const renderResponse = (text: string, color: string) => {
  const colors = colorMap[color]
  const parts = text.split(/<highlight>|<\/highlight>/)
  return parts.map((part, i) => 
    i % 2 === 1 ? (
      <span key={i} style={{ color: colors.text }} className="font-medium">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

// Single expandable action card
function ActionCard({ 
  action, 
  index,
  isExpanded,
  onHover,
  onLeave,
}: { 
  action: typeof actions[0]
  index: number
  isExpanded: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const colors = colorMap[action.color]
  const Icon = action.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative"
    >
      <motion.div 
        animate={{ height: 'auto' }}
        transition={{ duration: 0.5, ease }}
        className="relative rounded-2xl overflow-hidden transition-shadow duration-500"
        style={{
          background: isExpanded ? colors.bg : 'rgba(255,255,255,0.02)',
          boxShadow: isExpanded 
            ? `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${colors.border}`
            : `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04)`,
        }}
      >
        {/* Compact header - always visible */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ 
                background: colors.bg,
              }}
            >
              <Icon 
                className="w-4 h-4"
                style={{ color: colors.text }} 
              />
            </div>
            <div 
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: colors.text, opacity: 0.6 }}
            />
          </div>
          
          <div className="mb-1">
            <AnimatedCounter 
              baseCount={action.baseCount}
              increment={action.increment}
              intervalMs={action.intervalMs}
              color={action.color}
            />
          </div>
          
          <div className="text-sm text-zinc-400">
            {action.label}
          </div>
          
          <div className="text-xs text-zinc-600 mt-1">
            {action.detail}
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden"
            >
              <div 
                className="px-5 pb-5 pt-2 space-y-2"
                style={{ borderTop: `1px solid ${colors.border}` }}
              >
                {/* Customer message - aligned left */}
                <div className="flex justify-start">
                  <div 
                    className="rounded-xl rounded-tl-sm px-3 py-2 text-xs text-zinc-300 max-w-[90%]"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    {action.example.message}
                  </div>
                </div>

                {/* Duckie response - aligned right */}
                <div className="flex justify-end">
                  <div 
                    className="rounded-xl rounded-tr-sm px-3 py-2 text-xs text-zinc-300 max-w-[90%]"
                    style={{ background: colors.bg }}
                  >
                    {renderResponse(action.example.response, action.color)}
                  </div>
                </div>

                {/* Actions taken */}
                <div 
                  className="rounded-lg p-3"
                  style={{ 
                    background: 'rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-2">
                    Actions completed
                  </div>
                  <div className="space-y-1.5">
                    {action.example.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3 h-3" style={{ color: colors.text }} />
                          <span className="text-zinc-300">{step.label}</span>
                        </div>
                        <span className="text-zinc-500 text-[10px]">{step.detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// Total counter at the top
function TotalCounter() {
  // Initialize with static value to avoid hydration mismatch
  const [total, setTotal] = useState(67000)
  
  useEffect(() => {
    // Set time-based total on client only
    setTotal(getTimeBasedTotal())
    
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 8) + 5
      setTotal(prev => prev + inc)
    }, 1500)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tabular-nums">
        {total.toLocaleString()}
      </span>
      <span className="text-lg text-zinc-500">actions today</span>
    </div>
  )
}

export function WhatDuckiesDoesContent() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  return (
    <div className="relative py-28 lg:py-40">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mb-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]">
                Capabilities
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                className="h-px w-16 bg-gradient-to-r from-zinc-500/60 to-transparent origin-left"
              />
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8 mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.1]"
            >
              Not just answers.
              <br />
              <span className="text-zinc-500">Real actions.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-lg text-zinc-400 max-w-md lg:text-right"
            >
              Duckie doesn't explain how to fix problems — it actually fixes them. 
              Here's what's happening right now.
            </motion.p>
          </div>
          
          {/* Total counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <TotalCounter />
          </motion.div>
        </div>

        {/* Desktop: 4 columns */}
        <div className="hidden lg:flex gap-4">
          {[0, 1, 2, 3].map((colIndex) => (
            <div key={colIndex} className="flex-1 space-y-4">
              {actions
                .filter((_, i) => i % 4 === colIndex)
                .map((action, idx) => (
                  <ActionCard 
                    key={action.id} 
                    action={action} 
                    index={colIndex + idx * 4}
                    isExpanded={hoveredId === action.id}
                    onHover={() => setHoveredId(action.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}
            </div>
          ))}
        </div>
        
        {/* Mobile: 2 columns */}
        <div className="flex lg:hidden gap-4">
          {[0, 1].map((colIndex) => (
            <div key={colIndex} className="flex-1 space-y-4">
              {actions
                .filter((_, i) => i % 2 === colIndex)
                .map((action, idx) => (
                  <ActionCard 
                    key={action.id} 
                    action={action} 
                    index={colIndex + idx * 2}
                    isExpanded={hoveredId === action.id}
                    onHover={() => setHoveredId(action.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}
            </div>
          ))}
        </div>
        
        {/* Subtle footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <span className="text-xs text-zinc-600">
            Hover any card to see a real example
          </span>
        </motion.div>
      </div>
    </div>
  )
}

// Keep backward compatibility alias
export const WhatDuckiesDoes = WhatDuckiesDoesContent
