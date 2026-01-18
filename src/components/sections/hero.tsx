"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Message types for the animated feed
type MessageType = 'customer' | 'action' | 'response' | 'resolved'

interface Message {
  id: number
  type: MessageType
  content: string
  detail?: string
}

const messageSequences: Message[][] = [
  [
    { id: 1, type: 'customer', content: "I can't log in anymore, it keeps saying my password is wrong but I'm sure it's correct", detail: 'Sarah M. · Just now' },
    { id: 2, type: 'action', content: 'Checking account status...', detail: '3 failed login attempts detected' },
    { id: 3, type: 'action', content: 'Account temporarily locked', detail: 'Security policy triggered 10 min ago' },
    { id: 4, type: 'response', content: "I've unlocked your account and sent a password reset link to your email. You should receive it within a minute.", detail: '' },
    { id: 5, type: 'resolved', content: 'Ticket resolved', detail: '32 seconds' },
  ],
  [
    { id: 1, type: 'customer', content: 'Can I get a refund? The product arrived damaged and the box was crushed', detail: 'Mike R. · 2 min ago' },
    { id: 2, type: 'action', content: 'Pulling order #8847...', detail: 'Delivered yesterday via FedEx' },
    { id: 3, type: 'action', content: 'Processing full refund to card ending 4242', detail: '$89.00 + shipping' },
    { id: 4, type: 'response', content: "Done! Full refund of $94.99 issued. You'll see it in 3-5 business days. No need to return the damaged item.", detail: '' },
    { id: 5, type: 'resolved', content: 'Ticket resolved', detail: '41 seconds' },
  ],
  [
    { id: 1, type: 'customer', content: "How do I add another user to my team? I can't find the option anywhere", detail: 'Alex K. · Just now' },
    { id: 2, type: 'action', content: 'Checking plan and permissions...', detail: 'Pro plan · 4 of 5 seats used' },
    { id: 3, type: 'response', content: "Go to Settings → Team → Invite Member. You have 1 seat available. I can send them an invite link right now if you give me their email!", detail: '' },
    { id: 4, type: 'resolved', content: 'Ticket resolved', detail: '18 seconds' },
  ],
  [
    { id: 1, type: 'customer', content: "The checkout page keeps spinning forever and won't let me complete my purchase", detail: 'Emma T. · 1 min ago' },
    { id: 2, type: 'action', content: 'Checking session data...', detail: 'Cart: 3 items · $247.00' },
    { id: 3, type: 'action', content: 'Found expired payment session', detail: 'Refreshing checkout state...' },
    { id: 4, type: 'response', content: "All fixed! Please refresh the page and try again. I've also applied a 10% discount code for the inconvenience.", detail: '' },
    { id: 5, type: 'resolved', content: 'Ticket resolved', detail: '28 seconds' },
  ],
]

// Streaming text component for Duckie's responses
function StreamingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    let index = 0
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 20) // 20ms per character for smooth streaming
    
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="inline-block w-0.5 h-3.5 bg-white/60 ml-0.5 animate-pulse" />}
    </span>
  )
}

function MessageFeed() {
  const [currentSequence, setCurrentSequence] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [messageIndex, setMessageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const leftAtRef = useRef<number | null>(null)

  // Track visibility with IntersectionObserver
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Coming back into view
          if (leftAtRef.current && Date.now() - leftAtRef.current > 2000) {
            // Been away for more than 2 seconds - reset to start
            setVisibleMessages([])
            setMessageIndex(0)
            setCurrentSequence(0)
          }
          leftAtRef.current = null
          setIsVisible(true)
        } else {
          // Leaving view
          leftAtRef.current = Date.now()
          setIsVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Don't run animations when not visible
    if (!isVisible) return

    const sequence = messageSequences[currentSequence]
    
    if (messageIndex < sequence.length) {
      // Calculate delay based on previous message
      let delay = 1200
      if (messageIndex === 0) {
        delay = 500
      } else {
        const prevMessage = sequence[messageIndex - 1]
        const currentMessage = sequence[messageIndex]
        if (prevMessage.type === 'response') {
          // Wait for streaming to complete: 20ms per char + 500ms buffer
          delay = prevMessage.content.length * 20 + 500
        } else if (prevMessage.type === 'customer' && currentMessage.type === 'action') {
          // Pause after customer message before showing first action
          delay = 1800
        }
      }
      
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, sequence[messageIndex]])
        setMessageIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      // Wait for last message streaming if it's a response, then move to next sequence
      const lastMessage = sequence[sequence.length - 1]
      let delay = 1500
      if (lastMessage.type === 'response') {
        delay = lastMessage.content.length * 20 + 1500
      }
      
      const timer = setTimeout(() => {
        setVisibleMessages([])
        setMessageIndex(0)
        setCurrentSequence(prev => (prev + 1) % messageSequences.length)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [messageIndex, currentSequence, isVisible])

  const isMessage = (type: MessageType) => type === 'customer' || type === 'response'

  return (
    <div 
      ref={containerRef}
      className="relative w-[440px] h-[400px] overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 100%)',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div 
          key={currentSequence}
          initial={{ y: 300 }}
          animate={{ y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 } }}
          exit={{ y: -500, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }}
          className="flex flex-col gap-2 py-8"
        >
          {visibleMessages.map((message, index) => {
            // Action is complete if there's another message after it
            const isActionComplete = message.type === 'action' && index < visibleMessages.length - 1
            
            return (
            <motion.div
              key={`${currentSequence}-${message.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
              className={isMessage(message.type) ? 'w-full' : 'px-2'}
            >
              {isMessage(message.type) ? (
                // Message bubble style for customer and response
                <div 
                  className={`
                    relative px-4 py-3 rounded-2xl backdrop-blur-md border
                    ${message.type === 'customer' 
                      ? 'bg-white/10 border-white/20 rounded-tl-sm' 
                      : 'bg-white/15 border-white/25 rounded-tr-sm ml-4'
                    }
                  `}
                >
                  {/* Sender label */}
                  <p className={`text-[10px] uppercase tracking-wider mb-1.5 font-medium ${
                    message.type === 'customer' ? 'text-white/40' : 'text-amber-300/70'
                  }`}>
                    {message.type === 'customer' ? message.detail?.split(' · ')[0] || 'Customer' : 'Duckie'}
                  </p>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {message.type === 'response' ? (
                      <StreamingText text={message.content} />
                    ) : (
                      message.content
                    )}
                  </p>
                  {message.type === 'customer' && message.detail && (
                    <p className="text-[10px] text-white/30 mt-2">
                      {message.detail.split(' · ')[1]}
                    </p>
                  )}
                </div>
              ) : message.type === 'action' ? (
                // Plain text style for actions
                <div className="flex items-center gap-2 py-1.5">
                  {isActionComplete ? (
                    <svg className="w-3 h-3 text-emerald-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white/30 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  <span className={`text-xs ${isActionComplete ? 'text-white/40' : 'text-white/50'}`}>{message.content}</span>
                  {message.detail && (
                    <span className="text-xs text-white/30">· {message.detail}</span>
                  )}
                </div>
              ) : (
                // Resolved style
                <div className="flex items-center gap-2 py-2 mt-1">
                  <svg className="w-4 h-4 text-emerald-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-emerald-400/80 font-medium">{message.content}</span>
                  {message.detail && (
                    <span className="text-xs text-white/40">· {message.detail}</span>
                  )}
                </div>
              )}
            </motion.div>
          )})}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function Hero() {

  return (
    <section className="relative w-full">
      {/* Hero image area */}
      <div className="relative h-[75vh] w-full overflow-hidden px-4 pt-4">
      {/* Background Container with rounded corners */}
      <div 
        className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 16px 64px rgba(0,0,0,0.3), 0 32px 128px rgba(0,0,0,0.2)',
        }}
      >
        {/* Background Image */}
        <Image
          src="/images/hero-ocean.webp"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center calc(100% + 38px)' }}
          unoptimized
        />
        
        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        
        {/* Vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(0,0,0,0.5) 0%, transparent 50%),
              radial-gradient(ellipse at top right, rgba(0,0,0,0.5) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[10%] w-2 h-2 rounded-full bg-white/40 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[35%] right-[14%] w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[55%] left-[17%] w-1 h-1 rounded-full bg-white/35 blur-[1px]"
      />
      
      {/* Content */}
      <div className="absolute inset-0 z-10 grid grid-cols-2 px-6">
        {/* Left column - content */}
        <div className="relative flex flex-col items-start justify-center pl-12">
          <div className="max-w-3xl text-left">
          {/* Headline */}
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] tracking-[-0.03em] pb-4 text-white"
            style={{
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))',
            }}
          >
            AI agents<br />that close tickets
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            Not just answers · <span className="font-medium">real actions</span>
          </motion.p>
          </div>
          
          {/* CTA - positioned at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="absolute bottom-8 left-12"
          >
            <div 
              className="flex items-center gap-2 rounded-full p-1.5 pl-5"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.1)',
              }}
            >
              <input
                type="email"
                placeholder="Enter your work email"
                className="hero-email-input bg-transparent border-none outline-none text-white text-sm w-56 focus:ring-0"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5 justify-center rounded-full h-9 px-5 text-sm font-medium text-zinc-900"
                style={{
                  background: 'linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                Let's chat
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Right column - animated message feed */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            <MessageFeed />
          </motion.div>
        </div>
        
      </div>
      </div>
    </section>
  )
}
