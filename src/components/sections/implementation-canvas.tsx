"use client"

import { InteractiveShowcase } from "@/components/ui/interactive-showcase"
import { content } from "@/config/content"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function ImplementationCanvas() {
  const steps = content.implementation.steps

  // Background images - one per step
  const backgrounds = [
    "/images/ocean-bg-5.jpg",
    "/images/ocean-bg-6.jpg",
    "/images/ocean-bg-1.jpg",
    "/images/ocean-bg-2.jpg",
  ]

  // Map steps to accordion items with duration metadata
  const items = steps.map((step) => ({
    id: step.number,
    title: step.title,
    description: step.description,
    duration: step.duration,
  }))

  // Render content function - returns setup UI for each step
  const renderContent = (activeIndex: number, activeItem: any) => {
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
                <div className="font-semibold text-zinc-900 text-sm">Duckie Setup</div>
                <div className="text-xs text-zinc-500 font-mono">Step {steps[activeIndex].number} of {steps.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-semibold text-zinc-600">{activeItem.duration}</div>
            </div>
          </div>
        </div>

        {/* Content Area - Changes per step */}
        <div className="p-5 min-h-[320px] relative">
          {/* Step 1: Connect */}
          {activeIndex === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-4"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Integrations</div>
              <div className="space-y-2.5">
                {[
                  { name: "Zendesk", status: "Connected", icon: "✓" },
                  { name: "Notion", status: "Connected", icon: "✓" },
                  { name: "Intercom", status: "Connected", icon: "✓" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between bg-emerald-50/50 rounded-lg p-3.5 border border-emerald-100"
                  >
                    <span className="text-sm text-zinc-700 font-medium">{item.name}</span>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">{item.icon}</div>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Configure */}
          {activeIndex === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Guardrails Configured</div>
              {[
                { rule: "Refunds over $100", action: "Require approval" },
                { rule: "Account deletion", action: "Always escalate" },
                { rule: "VIP customers", action: "Priority routing" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  className="bg-zinc-50 rounded-lg p-3.5 border border-zinc-100"
                >
                  <div className="text-[10px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">{item.rule}</div>
                  <div className="text-sm text-zinc-900 leading-relaxed">{item.action}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Step 3: Test */}
          {activeIndex === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-4"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Test Results</div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Scenarios Tested", value: "24" },
                  { label: "Success Rate", value: "100%" },
                  { label: "Avg Response", value: "1.2s" },
                  { label: "Confidence", value: "High" },
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

          {/* Step 4: Deploy */}
          {activeIndex === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-4"
            >
              <div className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">Deployment</div>
              <div className="bg-zinc-50 rounded-lg p-4 border-l-2" style={{ borderLeftColor: '#000000' }}>
                <div className="text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">MODE SELECTED</div>
                <div className="text-sm text-zinc-900 leading-relaxed font-semibold">Shadow Mode</div>
                <div className="text-xs text-zinc-600 mt-1">Review responses before sending</div>
              </div>
              <div className="space-y-2.5">
                {[
                  "Agent deployed to Zendesk",
                  "Webhooks configured",
                  "Team notifications enabled",
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
        </div>
      </div>
    )
  }

  return (
    <InteractiveShowcase
      sectionTitle={content.implementation.title}
      sectionSubtitle={content.implementation.subtitle}
      panelIcon={
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
      panelTitle="Setup Process"
      panelDescription="Most teams go from zero to live in under 2 hours"
      ctaText="Start Setup"
      ctaHref="/contact"
      items={items}
      backgroundImages={backgrounds}
      renderContent={renderContent}
      imagePosition="right"
      autoRotate={true}
      rotationDuration={undefined}
    />
  )
}

export default ImplementationCanvas
