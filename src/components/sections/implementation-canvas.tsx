"use client"

import { InteractiveShowcase } from "@/components/ui/interactive-showcase"
import { content } from "@/config/content"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { SlackIcon, NotionIcon, ConfluenceIcon, GoogleDriveIcon } from "@/components/icons"

const ease = [0.22, 1, 0.36, 1] as const

// Shared card style
const cardStyle = {
  background: 'rgba(255,255,255,0.03)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.03)',
}

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

  // Step labels (matches content.ts step titles)
  const stepLabels = ["Connect", "Configure", "Test", "Deploy"]

  // Render content function - returns setup UI for each step
  const renderContent = (activeIndex: number, activeItem: { duration?: string }) => {
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
              <span className="text-sm font-medium text-zinc-400">Setup Wizard</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500">{activeItem.duration}</span>
              <div 
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(192, 132, 252, 0.1)',
                  color: 'rgb(216, 180, 254)',
                }}
              >
                Step {activeIndex + 1}: {stepLabels[activeIndex]}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area - Changes per step */}
        <div className="p-5 min-h-[320px] relative">
          {/* Step 1: Connect - Show different integration categories */}
          {activeIndex === 0 && (
            <motion.div 
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              {/* Two categories of integrations */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Support Channels</div>
                  <div className="text-[10px] text-emerald-400">Synced 2m ago</div>
                </div>
                <div className="flex gap-2">
                  {[
                    { name: "Zendesk", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#03363D"><path d="M24 4.5v15h-9V9L24 4.5zM0 19.5v-15l9 4.5v10.5H0zM0 2.25L12 13.5 24 2.25H0z"/></svg> },
                    { name: "Intercom", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1F8DED"><path d="M20.802 18.267C21.574 16.572 22 14.692 22 12.761c0-5.512-4.486-10-10-10S2 7.25 2 12.76c0 5.513 4.486 10.001 10 10.001 1.932 0 3.812-.426 5.507-1.198l4.244 1.439-1.949-4.735zM8 14a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z"/></svg> },
                    { name: "Slack", icon: <SlackIcon className="w-4 h-4" /> },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className="flex-1 rounded-lg px-3 py-2.5 flex flex-col items-center gap-1.5"
                      style={{
                        background: 'rgba(16, 185, 129, 0.06)',
                        boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                      }}
                    >
                      {item.icon}
                      <div className="text-[10px] font-medium text-zinc-300">{item.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Knowledge Sources</div>
                  <div className="text-[10px] text-purple-400">1,247 articles</div>
                </div>
                <div className="flex gap-2">
                  {[
                    { name: "Notion", icon: <NotionIcon className="w-4 h-4 text-zinc-200" /> },
                    { name: "Confluence", icon: <ConfluenceIcon className="w-4 h-4" /> },
                    { name: "Google Drive", icon: <GoogleDriveIcon className="w-4 h-4" /> },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + idx * 0.05, duration: 0.2 }}
                      className="flex-1 rounded-lg px-3 py-2.5 flex flex-col items-center gap-1.5"
                      style={{
                        background: 'rgba(168, 85, 247, 0.06)',
                        boxShadow: 'inset 0 1px 0 rgba(168, 85, 247, 0.08), 0 0 0 1px rgba(168, 85, 247, 0.1)',
                      }}
                    >
                      {item.icon}
                      <div className="text-[10px] font-medium text-zinc-300">{item.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="rounded-lg px-3 py-2.5 flex items-center gap-2"
                style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                }}
              >
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm font-medium text-emerald-300">6 integrations connected</span>
                <span className="text-xs text-zinc-500 ml-auto">OAuth secured</span>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Build Runbook - Show runbook editor with embedded tools */}
          {activeIndex === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              {/* Runbook editor mockup */}
              <div className="rounded-lg overflow-hidden" style={cardStyle}>
                {/* Runbook header */}
                <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-xs font-medium text-zinc-200">Subscription Cancellation</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 px-1.5 py-0.5 rounded" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>Runbook</span>
                </div>
                
                {/* Runbook steps */}
                <div className="p-3 space-y-2.5">
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="flex gap-2"
                  >
                    <span className="text-[10px] text-zinc-500 w-3 shrink-0">1.</span>
                    <div className="space-y-1.5">
                      <p className="text-xs text-zinc-300 leading-relaxed">Greet the customer and ask why they want to cancel.</p>
                      <div className="inline-flex items-center gap-1.5 rounded px-2 py-1" style={{ background: 'rgba(56, 189, 248, 0.1)', boxShadow: '0 0 0 1px rgba(56, 189, 248, 0.2)' }}>
                        <svg className="w-2.5 h-2.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                        <span className="text-[10px] font-medium text-sky-300">Ask and Wait</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                    className="flex gap-2"
                  >
                    <span className="text-[10px] text-zinc-500 w-3 shrink-0">2.</span>
                    <div className="space-y-1.5">
                      <p className="text-xs text-zinc-300 leading-relaxed">Look up their subscription details and billing history.</p>
                      <div className="inline-flex items-center gap-1.5 rounded px-2 py-1" style={{ background: 'rgba(168, 85, 247, 0.1)', boxShadow: '0 0 0 1px rgba(168, 85, 247, 0.2)' }}>
                        <svg className="w-2.5 h-2.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span className="text-[10px] font-medium text-purple-300">Lookup Subscription</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    className="flex gap-2"
                  >
                    <span className="text-[10px] text-zinc-500 w-3 shrink-0">3.</span>
                    <div className="space-y-1.5">
                      <p className="text-xs text-zinc-300 leading-relaxed">If they confirm, process the cancellation.</p>
                      <div className="inline-flex items-center gap-1.5 rounded px-2 py-1" style={{ background: 'rgba(16, 185, 129, 0.1)', boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.2)' }}>
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                        <span className="text-[10px] font-medium text-emerald-300">Cancel Subscription</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Snippet and validation indicators */}
              <div className="flex items-center justify-between">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.2 }}
                  className="flex items-center gap-2 text-[10px] text-zinc-500"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  <span>Using snippet: <span className="text-purple-400">Verify Customer Identity</span></span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.2 }}
                  className="text-[10px] text-zinc-500"
                >
                  ~2 min avg resolution
                </motion.div>
              </div>
              
              {/* Validation status */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="rounded-lg px-3 py-2 flex items-center gap-2"
                style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                }}
              >
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-emerald-300">Runbook validated</span>
                <span className="text-[10px] text-zinc-500 ml-auto">No errors</span>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Test - Show interactive playground style */}
          {activeIndex === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              {/* Simulated chat test */}
              <div className="rounded-lg p-3 space-y-2" style={cardStyle}>
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="flex justify-end"
                >
                  <div className="rounded-lg px-3 py-1.5 text-xs text-zinc-300 max-w-[80%]" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    I want to cancel my subscription
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  className="flex"
                >
                  <div className="rounded-lg px-3 py-1.5 text-xs text-sky-200 max-w-[80%]" style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                    I can help you with that. Before I proceed, may I ask why you're cancelling? We'd love to improve.
                  </div>
                </motion.div>
              </div>
              
              {/* Test results summary */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Tests Run", value: "24", color: "sky" },
                  { label: "Passed", value: "24", color: "emerald" },
                  { label: "Coverage", value: "94%", color: "emerald" },
                  { label: "Avg Time", value: "1.2s", color: "sky" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.05, duration: 0.2 }}
                    className="rounded-lg px-2 py-2 text-center"
                    style={item.color === "emerald" ? {
                      background: 'rgba(16, 185, 129, 0.06)',
                      boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                    } : {
                      background: 'rgba(56, 189, 248, 0.06)',
                      boxShadow: 'inset 0 1px 0 rgba(56, 189, 248, 0.08), 0 0 0 1px rgba(56, 189, 248, 0.1)',
                    }}
                  >
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.label}</div>
                    <div className={`text-sm font-medium ${item.color === "emerald" ? "text-emerald-300" : "text-sky-300"}`}>{item.value}</div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="rounded-lg px-3 py-2 flex items-center justify-between"
                style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                  <span className="text-xs font-medium text-emerald-300">All scenarios passed</span>
                </div>
                <span className="text-[10px] text-zinc-500">Ready to deploy</span>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Deploy - Show deployment modes */}
          {activeIndex === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-3"
            >
              {/* Deployment modes */}
              <div className="space-y-2">
                {[
                  { mode: "Shadow", desc: "AI drafts, humans review", selected: true },
                  { mode: "Live", desc: "AI responds directly", selected: false },
                  { mode: "Testing", desc: "Internal only", selected: false },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.2 }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                    style={item.selected ? {
                      background: 'rgba(251, 191, 36, 0.08)',
                      boxShadow: 'inset 0 1px 0 rgba(251, 191, 36, 0.1), 0 0 0 1px rgba(251, 191, 36, 0.2)',
                    } : cardStyle}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.selected ? 'border-amber-400' : 'border-zinc-600'}`}
                    >
                      {item.selected && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${item.selected ? 'text-amber-200' : 'text-zinc-400'}`}>{item.mode}</div>
                      <div className="text-xs text-zinc-500">{item.desc}</div>
                    </div>
                    {item.selected && (
                      <span className="text-[10px] text-amber-400 font-medium uppercase">Selected</span>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="rounded-lg px-3 py-2.5 flex items-center gap-2"
                style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                }}
              >
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#03363D"><path d="M24 4.5v15h-9V9L24 4.5zM0 19.5v-15l9 4.5v10.5H0zM0 2.25L12 13.5 24 2.25H0z"/></svg>
                  <span className="text-sm font-medium text-emerald-300">Agent deployed to Zendesk</span>
                </div>
                <span className="text-[10px] text-zinc-500 ml-auto">Jan 11, 2:34 PM</span>
              </motion.div>
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
      eyebrowLabel="Implementation"
      panelIcon={
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      }
      panelTitle="Setup Process"
      panelDescription="Most teams go from zero to live in under 2 weeks"
      ctaText="Start Setup"
      ctaHref="/contact"
      items={items}
      backgroundImages={backgrounds}
      renderContent={renderContent}
      imagePosition="right"
      autoRotate={true}
      rotationDuration={undefined}
      accentGradient="linear-gradient(135deg, #7dd3fc 0%, #ffffff 40%)"
    />
  )
}

export default ImplementationCanvas
