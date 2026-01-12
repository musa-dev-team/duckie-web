"use client"

import { InteractiveShowcase } from "@/components/ui/interactive-showcase"
import { content } from "@/config/content"
import { motion } from "framer-motion"
import { Check, Search, Database, BarChart3 } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

// Shared card style
const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.03)',
}

export function HowItWorksCanvas() {
  const steps = content.howItWorks.steps

  // Background images - one per step
  const backgrounds = [
    "/images/sky-1.jpg",
    "/images/sky-2.jpg",
    "/images/sky-3.jpg",
    "/images/sky-4.jpg",
    "/images/sky-5.jpg",
  ]

  // Map steps to accordion items
  const items = steps.map((step) => ({
    id: step.number,
    title: step.title,
    description: step.description,
  }))

  // Step indicators for the header
  const stepLabels = ["Analyze", "Validate", "Research", "Execute", "Learn"]

  // Render content function - returns dashboard UI for each step
  const renderContent = (activeIndex: number) => {
    return (
      <div 
        className="rounded-xl overflow-hidden"
        style={{
          background: '#111113',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            0 0 0 1px rgba(255,255,255,0.1),
            0 4px 8px rgba(0,0,0,0.4),
            0 12px 24px rgba(0,0,0,0.4),
            0 32px 64px rgba(0,0,0,0.5)
          `.trim().replace(/\s+/g, ' '),
        }}
      >
        {/* Header */}
        <div 
          className="px-5 py-3"
          style={{
            background: 'rgba(17,17,19,0.95)',
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
              <span className="text-sm font-medium text-zinc-400">Ticket #12345</span>
            </div>
            <div 
              className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                color: 'rgb(125, 211, 252)',
              }}
            >
              Step {activeIndex + 1}: {stepLabels[activeIndex]}
            </div>
          </div>
        </div>

        {/* Content Area - Changes per step */}
        <div className="p-5 min-h-[320px] relative">
          {/* Step 1: Analyze */}
          {activeIndex === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-4"
            >
              <div className="rounded-lg px-4 py-3" style={cardStyle}>
                <div className="text-xs text-zinc-500 mb-1">Customer Message</div>
                <div className="text-sm text-zinc-200">"I need a refund for order #12345. It never arrived."</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Intent", value: "Refund", color: "sky" },
                  { label: "Order", value: "#12345", color: "sky" },
                  { label: "Issue", value: "Non-delivery", color: "sky" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="rounded-lg px-3 py-2.5"
                    style={{
                      background: 'rgba(56, 189, 248, 0.06)',
                      boxShadow: 'inset 0 1px 0 rgba(56, 189, 248, 0.08), 0 0 0 1px rgba(56, 189, 248, 0.1)',
                    }}
                  >
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-sky-300">{item.value}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Analysis metrics */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="px-2 py-1 rounded-full font-medium"
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: 'rgb(125, 211, 252)',
                    }}
                  >
                    98% confidence
                  </div>
                </div>
                <span className="text-zinc-500">Analyzed in 0.3s</span>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Validate */}
          {activeIndex === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              {[
                { check: "Refund amount under $100", value: "$49.99" },
                { check: "Order within refund window", value: "3 days old" },
                { check: "Customer verified", value: "Email match" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                  style={{
                    background: 'rgba(16, 185, 129, 0.06)',
                    boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                  }}
                >
                  <div 
                    className="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
                    style={{ background: 'rgba(16, 185, 129, 0.2)' }}
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-zinc-200">{item.check}</div>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium shrink-0">{item.value}</div>
                </motion.div>
              ))}
              
              {/* Guardrail summary */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center justify-between pt-2"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-emerald-400" />
                    ))}
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">3/3 checks passed</span>
                </div>
                <span className="text-xs text-zinc-500">Auto-approve eligible</span>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Research */}
          {activeIndex === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              {[
                { source: "Order System", info: "Order #12345 • $49.99 • Shipped 3 days ago", icon: Database, relevance: 98 },
                { source: "Knowledge Base", info: "Full refund policy applies for non-delivery", icon: Search, relevance: 94 },
                { source: "Customer Profile", info: "Active 2 years • 12 previous orders • VIP", icon: BarChart3, relevance: 87 },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5"
                    style={cardStyle}
                  >
                    <div 
                      className="flex items-center justify-center w-6 h-6 rounded-md shrink-0 mt-0.5"
                      style={{ background: 'rgba(168, 85, 247, 0.15)' }}
                    >
                      <Icon className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-500 mb-0.5">{item.source}</div>
                      <div className="text-sm text-zinc-200">{item.info}</div>
                    </div>
                    <div className="text-[10px] text-purple-400 font-medium shrink-0">{item.relevance}%</div>
                  </motion.div>
                )
              })}
              
              {/* Research summary */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center justify-between pt-2 text-xs"
              >
                <span className="text-zinc-500">Searched 3 sources in 0.8s</span>
                <span className="text-purple-400 font-medium">12 relevant results</span>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Execute */}
          {activeIndex === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-4"
            >
              <div className="rounded-lg px-4 py-3" style={cardStyle}>
                <div className="text-xs text-zinc-500 mb-1">Response Sent</div>
                <div className="text-sm text-zinc-200">"I've processed your refund of $49.99 for order #12345. You'll see it in 3-5 business days."</div>
              </div>
              
              <div className="space-y-2">
                {[
                  { action: "Refund issued", detail: "$49.99 → Visa ****4242", time: "12:34:01" },
                  { action: "Email sent", detail: "Confirmation to customer", time: "12:34:02" },
                  { action: "Order updated", detail: "Status → Refunded", time: "12:34:02" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                    style={{
                      background: 'rgba(251, 191, 36, 0.06)',
                      boxShadow: 'inset 0 1px 0 rgba(251, 191, 36, 0.08), 0 0 0 1px rgba(251, 191, 36, 0.1)',
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-6 h-6 rounded-md shrink-0"
                      style={{ background: 'rgba(251, 191, 36, 0.2)' }}
                    >
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-zinc-200">{item.action}</div>
                      <div className="text-xs text-zinc-500">{item.detail}</div>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono shrink-0">{item.time}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Execution summary */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-zinc-500">3 actions completed</span>
                <span className="text-amber-400 font-medium">Total: 1.2s</span>
              </motion.div>
            </motion.div>
          )}

          {/* Step 5: Learn */}
          {activeIndex === 4 && (
            <motion.div 
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Category", value: "Billing • Refund" },
                  { label: "Sentiment", value: "Neutral → Positive" },
                  { label: "Resolution", value: "Auto-resolved" },
                  { label: "Duration", value: "32 seconds" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                    className="rounded-lg px-3 py-2.5"
                    style={cardStyle}
                  >
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-zinc-200">{item.value}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Improvement suggestion */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="rounded-lg px-3 py-2.5 flex items-start gap-2"
                style={{
                  background: 'rgba(56, 189, 248, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(56, 189, 248, 0.08), 0 0 0 1px rgba(56, 189, 248, 0.1)',
                }}
              >
                <svg className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-sky-300 font-medium">Suggestion</div>
                  <div className="text-xs text-zinc-400">Add FAQ about refund timelines — 23 similar tickets this week</div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="rounded-lg px-3 py-2.5 flex items-center justify-between"
                style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">Ticket Resolved</span>
                </div>
                <span className="text-xs text-zinc-500">No human intervention</span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  return (
    <InteractiveShowcase
      sectionTitle={content.howItWorks.title}
      sectionSubtitle={content.howItWorks.subtitle}
      eyebrowLabel="How It Works"
      panelIcon={
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      }
      panelTitle="Resolution Process"
      panelDescription="The fastest way to resolve customer issues with AI-powered understanding and action."
      ctaText="Learn more"
      ctaHref="/how-it-works"
      items={items}
      backgroundImages={backgrounds}
      renderContent={renderContent}
      imagePosition="left"
      autoRotate={true}
      rotationDuration={undefined}
      accentGradient="linear-gradient(135deg, #d8b4fe 0%, #ffffff 40%)"
    />
  )
}

export default HowItWorksCanvas
