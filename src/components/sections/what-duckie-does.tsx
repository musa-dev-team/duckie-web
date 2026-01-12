"use client"

import { InteractiveShowcase } from "@/components/ui/interactive-showcase"
import { InteractiveShowcaseMobile } from "@/components/ui/interactive-showcase-mobile"
import { content } from "@/config/content"
import { AnimatePresence, motion } from "framer-motion"
import { Check, CreditCard, Database, Mail, Shield, Truck } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

// Richer example data with multiple actions
const examples = {
  "Process refund": {
    request: "Refund for damaged item",
    ticketId: "#48291",
    response: "I've processed your refund. You'll see $49.99 back on your card within 3-5 business days.",
    actions: [
      { icon: Database, label: "Order verified", detail: "Order #48291" },
      { icon: CreditCard, label: "Refund issued", detail: "$49.99 → Visa ****4242" },
      { icon: Mail, label: "Confirmation sent", detail: "sarah@email.com" },
    ],
  },
  "Cancel subscription": {
    request: "Cancel Pro subscription",
    ticketId: "#48292",
    response: "Your subscription is cancelled. You'll keep Pro access until your billing cycle ends on Jan 31st.",
    actions: [
      { icon: Database, label: "Account located", detail: "Pro Plan • $29/mo" },
      { icon: Shield, label: "Subscription cancelled", detail: "Effective Jan 31" },
      { icon: Mail, label: "Confirmation sent", detail: "Includes reactivation link" },
    ],
  },
  "Reset password": {
    request: "Can't log into account",
    ticketId: "#48293",
    response: "I've sent a password reset link to your email. It expires in 24 hours.",
    actions: [
      { icon: Database, label: "Account verified", detail: "j***@gmail.com" },
      { icon: Shield, label: "Reset link generated", detail: "Expires in 24h" },
      { icon: Mail, label: "Email delivered", detail: "Check inbox & spam" },
    ],
  },
  "Update billing": {
    request: "Change billing email",
    ticketId: "#48294",
    response: "Done! All future invoices will be sent to your new billing address.",
    actions: [
      { icon: Database, label: "Account updated", detail: "Billing email changed" },
      { icon: Mail, label: "Confirmation sent", detail: "To both addresses" },
    ],
  },
  "Track order": {
    request: "Where is my order?",
    ticketId: "#48295",
    response: "Your order shipped yesterday and is scheduled for delivery tomorrow by 8pm.",
    actions: [
      { icon: Database, label: "Order located", detail: "Order #58192" },
      { icon: Truck, label: "Tracking retrieved", detail: "FedEx • In transit" },
      { icon: Mail, label: "Tracking link sent", detail: "With live updates" },
    ],
  },
} as const

type ExampleKey = keyof typeof examples

export function WhatDuckiesDoes() {
  const exampleKeys = Object.keys(examples) as ExampleKey[]
  
  // Map examples to accordion items with cleaner titles
  const itemTitles: Record<ExampleKey, string> = {
    "Process refund": "Process refund",
    "Cancel subscription": "Cancel subscription",
    "Reset password": "Reset password",
    "Update billing": "Update billing",
    "Track order": "Track order",
  }
  
  const items = exampleKeys.map((key) => ({
    id: key,
    title: itemTitles[key],
  }))

  // Background images - one per item
  const backgroundImages = [
    "/images/trees-1.jpg",
    "/images/trees-2.jpg",
    "/images/trees-3.jpg",
    "/images/trees-4.jpg",
    "/images/trees-5.jpg",
  ]

  // Render content function - returns the support ticket mockup UI
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
          {/* Header - solid background, no blur */}
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
                <span className="text-sm font-medium text-zinc-400">Ticket {example.ticketId}</span>
              </div>
              <div 
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: 'rgb(110, 231, 183)',
                }}
              >
                <Check className="w-3 h-3" />
                Resolved
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Customer Request */}
            <div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Request</div>
              <div 
                className="rounded-lg px-4 py-3"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.03)',
                }}
              >
                <p className="text-sm text-zinc-200">{example.request}</p>
              </div>
            </div>

            {/* Duckie Response */}
            <div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Response</div>
              <div 
                className="rounded-lg px-4 py-3"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.03)',
                }}
              >
                <p className="text-sm text-zinc-300 leading-relaxed">{example.response}</p>
              </div>
            </div>

            {/* Actions Taken */}
            <div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Actions Completed</div>
              <div className="space-y-2">
                {example.actions.map((action, i) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1, ease }}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                      style={{
                        background: 'rgba(16, 185, 129, 0.06)',
                        boxShadow: 'inset 0 1px 0 rgba(16, 185, 129, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                      }}
                    >
                      <div 
                        className="flex items-center justify-center w-7 h-7 rounded-md"
                        style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-200">{action.label}</div>
                        <div className="text-xs text-zinc-500">{action.detail}</div>
                      </div>
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  const panelIcon = (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )

  return (
    <>
      {/* Desktop */}
      <InteractiveShowcase
        sectionTitle={content.actions.title}
        sectionSubtitle={content.actions.description}
        eyebrowLabel="Capabilities"
        panelIcon={panelIcon}
        panelTitle="Actions"
        panelDescription="See how Duckie handles real customer requests with actual resolutions."
        items={items}
        backgroundImages={backgroundImages}
        renderContent={renderContent}
        imagePosition="right"
        autoRotate={true}
        rotationDuration={undefined}
        accentGradient="linear-gradient(135deg, #6ee7b7 0%, #ffffff 40%)"
      />
      {/* Mobile */}
      <InteractiveShowcaseMobile
        sectionTitle={content.actions.title}
        sectionSubtitle={content.actions.description}
        eyebrowLabel="Capabilities"
        panelIcon={panelIcon}
        panelTitle="Actions"
        panelDescription="See how Duckie handles real customer requests with actual resolutions."
        items={items}
        renderContent={renderContent}
        accentGradient="linear-gradient(135deg, #6ee7b7 0%, #ffffff 40%)"
      />
    </>
  )
}
