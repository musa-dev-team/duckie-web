"use client"

import { InteractiveShowcase } from "@/components/ui/interactive-showcase"
import { content } from "@/config/content"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function HowItWorksCanvas() {
  const steps = content.howItWorks.steps

  // Background images - one per step
  const backgrounds = [
    "/images/ocean-bg-1.jpg",
    "/images/ocean-bg-2.jpg",
    "/images/ocean-bg-3.jpg",
    "/images/ocean-bg-4.jpg",
    "/images/ocean-bg-5.jpg",
  ]

  // Map steps to accordion items
  const items = steps.map((step) => ({
    id: step.number,
    title: step.title,
    description: step.description,
  }))

  // Render content function - returns dashboard UI for each step
  const renderContent = (activeIndex: number) => {
    return (
      <div className="bg-white rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] overflow-hidden border border-zinc-200/60">
        {/* Dashboard Header */}
        <div className="bg-white border-b border-zinc-100 px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(to bottom right, #000000, #3f3f46)' }}>
                D
              </div>
              <div>
                <div className="font-semibold text-zinc-900 text-sm">Duckie Support Agent</div>
                <div className="text-xs text-zinc-500 font-mono">Ticket #12345-REF</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-600">Live</span>
            </div>
          </div>
        </div>

        {/* Content Area - Changes per step */}
        <div className="p-5 min-h-[320px] relative">
          {/* Step 1: Understand */}
          {activeIndex === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-4"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Analysis</div>
              <div className="bg-zinc-50 rounded-lg p-4 border-l-2" style={{ borderLeftColor: '#000000' }}>
                <div className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">CUSTOMER REQUEST</div>
                <div className="text-sm text-zinc-900 leading-relaxed">"I need a refund for order #12345. It never arrived."</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-100">
                  <div className="text-[10px] text-zinc-500 mb-1.5 font-semibold uppercase tracking-wider">Intent</div>
                  <div className="font-semibold text-zinc-900 text-sm">Refund</div>
                </div>
                <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-100">
                  <div className="text-[10px] text-zinc-500 mb-1.5 font-semibold uppercase tracking-wider">Order</div>
                  <div className="font-semibold text-zinc-900 text-sm">#12345</div>
                </div>
                <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-100">
                  <div className="text-[10px] text-zinc-500 mb-1.5 font-semibold uppercase tracking-wider">Issue</div>
                  <div className="font-semibold text-zinc-900 text-sm">Non-delivery</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Guardrails */}
          {activeIndex === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Guardrail Checks</div>
              {[
                { check: "Refund amount under $100", status: "Passed" },
                { check: "Order age within 30 days", status: "Passed" },
                { check: "Customer verification", status: "Passed" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  className="flex items-center justify-between bg-emerald-50/50 rounded-lg p-3.5 border border-emerald-100"
                >
                  <span className="text-sm text-zinc-700 font-medium">{item.check}</span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</div>
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Step 3: Context */}
          {activeIndex === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Information Gathered</div>
              {[
                { source: "Order System", info: "Order #12345 • $49.99 • Shipped 3 days ago" },
                { source: "Knowledge Base", info: "Full refund policy applies for non-delivery" },
                { source: "Customer Profile", info: "Active 2 years • 12 previous orders" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  className="bg-zinc-50 rounded-lg p-3.5 border border-zinc-100"
                >
                  <div className="text-[10px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">{item.source}</div>
                  <div className="text-sm text-zinc-900 leading-relaxed">{item.info}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Step 4: Action */}
          {activeIndex === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-4"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Actions Completed</div>
              <div className="bg-zinc-50 rounded-lg p-4 border-l-2" style={{ borderLeftColor: '#000000' }}>
                <div className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">RESPONSE SENT</div>
                <div className="text-sm text-zinc-900 leading-relaxed">"I've processed your refund of $49.99 for order #12345. You'll see it in 3-5 business days."</div>
              </div>
              <div className="space-y-2.5">
                {[
                  "Refund of $49.99 processed",
                  "Confirmation email sent",
                  "Order status updated to 'Refunded'",
                ].map((action, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="flex items-center gap-2.5 text-sm text-emerald-700 font-semibold"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</div>
                    {action}
                  </motion.div>
                ))}
              </div>
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
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Ticket Summary</div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Category", value: "Billing - Refund" },
                  { label: "Sentiment", value: "Neutral" },
                  { label: "Status", value: "Resolved" },
                  { label: "Duration", value: "32 seconds" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                    className="bg-zinc-50 rounded-lg p-3.5 border border-zinc-100"
                  >
                    <div className="text-[10px] text-zinc-500 mb-1.5 font-semibold uppercase tracking-wider">{item.label}</div>
                    <div className="font-semibold text-zinc-900 text-sm">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  return (
    <InteractiveShowcase
      sectionTitle={content.howItWorks.title}
      panelIcon={
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
    />
  )
}

export default HowItWorksCanvas
