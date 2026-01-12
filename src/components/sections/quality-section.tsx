"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Shared card styles for premium depth
const cardBaseStyle = {
  background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%), #18181b',
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.06),
    inset 0 -1px 0 rgba(0,0,0,0.1),
    0 0 0 1px rgba(255,255,255,0.04)
  `.trim().replace(/\s+/g, ' '),
}

const cardHoverStyle = {
  y: -2,
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -1px 0 rgba(0,0,0,0.1),
    0 0 0 1px rgba(255,255,255,0.08),
    0 8px 30px rgba(0,0,0,0.3)
  `.trim().replace(/\s+/g, ' '),
}

// Animated stat number component
function AnimatedStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const spring = useSpring(0, { stiffness: 100, damping: 20, mass: 1 })
  
  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])
  
  const display = useTransform(spring, (v) => Math.round(v).toString())
  
  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span className="tabular-nums">{display}</motion.span>
      <span className="text-current opacity-60">{suffix}</span>
    </span>
  )
}

// Mini bar chart component for the dashboard (dark themed)
function MiniChart() {
  const bars = [65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 88, 72]
  
  return (
    <div className="flex items-end gap-1 h-12">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.03, ease }}
          className="flex-1 rounded-sm min-w-[4px]"
          style={{
            background: `linear-gradient(to top, rgb(20 184 166 / 0.9), rgb(52 211 153 / 0.9))`,
          }}
        />
      ))}
    </div>
  )
}

// Dashboard mockup component - dark themed
function DashboardMockup() {
  const conversations = [
    { id: "TKT-4829", status: "resolved", score: 98, time: "2m ago" },
    { id: "TKT-4828", status: "resolved", score: 95, time: "5m ago" },
    { id: "TKT-4827", status: "escalated", score: null, time: "8m ago" },
  ]

  return (
    <div 
      className="rounded-xl overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 50%), #0f0f11',
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.05),
          0 0 0 1px rgba(255,255,255,0.03),
          0 20px 50px rgba(0,0,0,0.4)
        `.trim().replace(/\s+/g, ' '),
      }}
    >
      {/* Header */}
      <div 
        className="px-5 py-3"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
            </div>
            <span className="text-sm font-medium text-zinc-400">Analytics Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-500">Live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Top stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div 
            className="rounded-lg p-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
            }}
          >
            <div className="text-xs font-medium text-zinc-500 mb-1">Resolution Rate</div>
            <div className="text-2xl font-bold text-zinc-100">94.2%</div>
          </div>
          <div 
            className="rounded-lg p-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
            }}
          >
            <div className="text-xs font-medium text-zinc-500 mb-1">Avg. Quality</div>
            <div className="text-2xl font-bold text-emerald-400">96</div>
          </div>
          <div 
            className="rounded-lg p-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
            }}
          >
            <div className="text-xs font-medium text-zinc-500 mb-1">Active Now</div>
            <div className="text-2xl font-bold text-zinc-100">127</div>
          </div>
        </div>

        {/* Chart section */}
        <div 
          className="rounded-lg p-3"
          style={{
            background: 'rgba(255,255,255,0.02)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500">Conversation Volume (24h)</span>
            <span className="text-xs text-emerald-400 font-medium">+12.3%</span>
          </div>
          <MiniChart />
        </div>

        {/* Recent activity */}
        <div>
          <div className="text-xs font-medium text-zinc-500 mb-2">Recent Conversations</div>
          <div className="space-y-1.5">
            {conversations.map((conv, i) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05, ease }}
                className="flex items-center justify-between py-2 px-3 rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.02)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-400">{conv.id}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    conv.status === "resolved" 
                      ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                  }`}>
                    {conv.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {conv.score && (
                    <span className="text-xs font-semibold text-zinc-300">
                      {conv.score}
                      <span className="text-zinc-500 ml-0.5">QS</span>
                    </span>
                  )}
                  <span className="text-xs text-zinc-600">{conv.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat card component with accent glow
function StatCard({ 
  value, 
  suffix, 
  label, 
  description,
  accentColor = "emerald"
}: { 
  value: number
  suffix: string
  label: string
  description: string
  accentColor?: "emerald" | "amber"
}) {
  const numberColors = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
  }

  // Accent-colored background glows
  const accentGlows = {
    emerald: 'radial-gradient(ellipse at 30% 20%, rgba(16,185,129,0.08) 0%, transparent 50%)',
    amber: 'radial-gradient(ellipse at 30% 20%, rgba(245,158,11,0.08) 0%, transparent 50%)',
  }

  const cardStyle = {
    background: `
      ${accentGlows[accentColor]},
      radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%),
      #18181b
    `.trim().replace(/\s+/g, ' '),
    boxShadow: cardBaseStyle.boxShadow,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      whileHover={cardHoverStyle}
      className="group relative rounded-xl p-6"
      style={cardStyle}
    >
      <div className="relative">
        <div className={`text-4xl font-bold mb-1 ${numberColors[accentColor]}`}>
          <AnimatedStat value={value} suffix={suffix} />
        </div>
        <div className="text-sm font-medium text-zinc-300 mb-2">{label}</div>
        <div className="text-xs text-zinc-500 leading-relaxed">{description}</div>
      </div>
    </motion.div>
  )
}

// Feature card component with refined styling
function FeatureCard({ 
  icon, 
  title, 
  description,
}: { 
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      whileHover={cardHoverStyle}
      className="group relative rounded-xl p-6 overflow-hidden"
      style={cardBaseStyle}
    >
      <div className="relative">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-zinc-400 group-hover:text-zinc-300 transition-colors"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {icon}
        </div>
        <div className="text-base font-semibold text-zinc-50 mb-2">{title}</div>
        <div className="text-sm text-zinc-400 leading-relaxed">{description}</div>
      </div>
    </motion.div>
  )
}

export function QualitySection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl font-normal tracking-tight text-zinc-50 lg:text-5xl">
            Quality, visibility, and control
          </h2>
          <p className="mt-4 max-w-xl text-lg text-zinc-400 leading-relaxed">
            AI automation that&apos;s not just powerful—it&apos;s visible, traceable, and fully auditable.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large dashboard mockup - spans 2 cols and 2 rows on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-2 lg:row-span-2 rounded-xl p-4 lg:p-6"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 50%), #18181b',
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.05),
                inset 0 -1px 0 rgba(0,0,0,0.1),
                0 0 0 1px rgba(255,255,255,0.04)
              `.trim().replace(/\s+/g, ' '),
            }}
          >
            <DashboardMockup />
          </motion.div>

          {/* Stat cards - right column */}
          <StatCard
            value={99}
            suffix=".9%"
            label="Audit Coverage"
            description="Every action logged and traceable for complete accountability."
            accentColor="emerald"
          />
          
          <StatCard
            value={2}
            suffix=" min"
            label="Escalation Time"
            description="Instant human handoff when automation reaches its limits."
            accentColor="amber"
          />

          {/* Feature cards - bottom row */}
          <FeatureCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Human-in-the-loop"
            description="Approval workflows ensure humans stay in control of high-stakes decisions."
          />

          <FeatureCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            title="Instant Rollback"
            description="One-click undo for any automated action. Safety nets built in."
          />

          <FeatureCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Continuous Learning"
            description="Quality improves over time as the system learns from every interaction."
          />
        </div>
      </div>
    </section>
  )
}
