"use client"

import { InteractiveShowcase } from "@/components/ui/interactive-showcase"
import { content } from "@/config/content"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

// Simplified conversation data
const examples = {
  "Process refund": {
    customer: "I'd like a refund for order #48291. The item arrived damaged.",
    duckie: "I've processed a full refund of $49.99 to your Visa ending in 4242. You'll see it within 3-5 business days.",
    action: "Refund processed",
    details: "$49.99 → Visa ****4242",
  },
  "Cancel subscription": {
    customer: "I need to cancel my Pro subscription.",
    duckie: "Your Pro subscription is cancelled. You'll retain access until Jan 31st. Confirmation email sent.",
    action: "Subscription cancelled",
    details: "Pro plan → Cancelled",
  },
  "Reset password": {
    customer: "I forgot my password and can't log in.",
    duckie: "Password reset link sent to j***@gmail.com. The link expires in 24 hours.",
    action: "Reset email sent",
    details: "Link expires in 24h",
  },
  "Update account": {
    customer: "Can you update my billing email to finance@acme.co?",
    duckie: "Done! Your billing email is now finance@acme.co. All future invoices will go there.",
    action: "Email updated",
    details: "admin@ → finance@",
  },
  "Check order status": {
    customer: "Where's my order? I placed it 3 days ago.",
    duckie: "Your order #58192 shipped yesterday via FedEx. Scheduled for delivery tomorrow by 8pm.",
    action: "Order located",
    details: "FedEx tracking shared",
  },
} as const

type ExampleKey = keyof typeof examples

export function WhatDuckiesDoes() {
  const exampleKeys = Object.keys(examples) as ExampleKey[]
  
  // Map examples to accordion items
  const items = exampleKeys.map((key) => ({
    id: key,
    title: key,
  }))

  // Single background image for all items
  const backgroundImages = Array(exampleKeys.length).fill("/images/ocean-bg-2.jpg")

  // Render content function - returns the chat mockup UI
  const renderContent = (activeIndex: number) => {
    const key = exampleKeys[activeIndex]
    const example = examples[key]

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease }}
          className="bg-white rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] overflow-hidden border border-zinc-200/60"
        >
          {/* Header */}
          <div className="bg-white border-b border-zinc-100 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(to bottom right, #000000, #3f3f46)' }}>
                  D
                </div>
                <div>
                  <div className="font-semibold text-zinc-900 text-sm">Duckie Support Agent</div>
                  <div className="text-xs text-zinc-500 font-mono">Ticket #48291</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-zinc-600">Live</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-5 min-h-[320px] space-y-5">
            {/* Customer message */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-xl bg-zinc-100 px-4 py-2.5">
                <p className="text-sm text-zinc-900">{example.customer}</p>
              </div>
            </div>
            
            {/* Duckie response */}
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: 'linear-gradient(to bottom right, #000000, #3f3f46)' }}>
                <Image src="/logo.svg" alt="" width={16} height={16} className="h-4 w-4" />
              </div>
              <div className="max-w-[80%] space-y-3">
                <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3">
                  <p className="text-sm text-zinc-900 leading-relaxed">{example.duckie}</p>
                </div>
                {/* Action indicator */}
                <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3 py-2 border border-emerald-100">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <div>
                    <div className="text-xs font-semibold text-emerald-700">{example.action}</div>
                    <div className="text-xs text-emerald-600">{example.details}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <InteractiveShowcase
      sectionTitle={content.actions.title}
      sectionSubtitle={content.actions.description}
      panelIcon={
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      }
      panelTitle="Actions"
      panelDescription="See how Duckie handles real customer requests with actual resolutions."
      items={items}
      backgroundImages={backgroundImages}
      renderContent={renderContent}
      imagePosition="right"
      autoRotate={true}
      rotationDuration={undefined}
    />
  )
}
