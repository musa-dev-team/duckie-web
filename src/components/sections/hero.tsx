"use client"

import { content } from "@/config/content"
import { mobileHeroContent, mobileMessageSequences, type Message, type MessageType } from "@/config/hero-mobile-content"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Desktop message sequences - longer, more detailed
const desktopMessageSequences: Message[][] = [
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

// Hook to detect mobile screens
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

// Streaming text component for Duckie's responses
function StreamingText({ text, speed = 20 }: { text: string; speed?: number }) {
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
    }, speed)
    
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="inline-block w-0.5 h-3.5 bg-white/60 ml-0.5 animate-pulse" />}
    </span>
  )
}

function MessageFeed({ isMobile = false }: { isMobile?: boolean }) {
  const messageSequences = isMobile ? mobileMessageSequences : desktopMessageSequences
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
      className={`relative overflow-hidden ${isMobile ? 'w-full h-[280px]' : 'w-[440px] h-[400px]'}`}
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
                    relative rounded-2xl backdrop-blur-md border
                    ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'}
                    ${message.type === 'customer' 
                      ? 'bg-white/10 border-white/20 rounded-tl-sm' 
                      : `bg-white/15 border-white/25 rounded-tr-sm ${isMobile ? 'ml-2' : 'ml-4'}`
                    }
                  `}
                >
                  {/* Sender label */}
                  <p className={`uppercase tracking-wider mb-1 font-medium ${
                    isMobile ? 'text-[9px]' : 'text-[10px] mb-1.5'
                  } ${
                    message.type === 'customer' ? 'text-white/40' : 'text-amber-300/70'
                  }`}>
                    {message.type === 'customer' ? message.detail?.split(' · ')[0] || 'Customer' : 'Duckie'}
                  </p>
                  <p className={`text-white/90 leading-relaxed ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {message.type === 'response' ? (
                      <StreamingText text={message.content} speed={isMobile ? 15 : 20} />
                    ) : (
                      message.content
                    )}
                  </p>
                  {message.type === 'customer' && message.detail && (
                    <p className={`text-white/30 mt-1.5 ${isMobile ? 'text-[9px]' : 'text-[10px] mt-2'}`}>
                      {message.detail.split(' · ')[1]}
                    </p>
                  )}
                </div>
              ) : message.type === 'action' ? (
                // Plain text style for actions
                <div className={`flex items-center gap-2 ${isMobile ? 'py-1' : 'py-1.5'}`}>
                  {isActionComplete ? (
                    <svg className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-emerald-400/70`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-white/30 animate-spin`} fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} ${isActionComplete ? 'text-white/40' : 'text-white/50'}`}>{message.content}</span>
                  {message.detail && (
                    <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/30`}>· {message.detail}</span>
                  )}
                </div>
              ) : (
                // Resolved style
                <div className={`flex items-center gap-2 ${isMobile ? 'py-1.5 mt-0.5' : 'py-2 mt-1'}`}>
                  <svg className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-emerald-400/80`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-emerald-400/80 font-medium`}>{message.content}</span>
                  {message.detail && (
                    <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/40`}>· {message.detail}</span>
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
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full">
      {/* Hero image area - CSS-first responsive with Tailwind */}
      <div className="relative w-full overflow-hidden h-[calc(100svh-12px)] px-3 pt-3 pb-3 md:pb-0 md:h-[75vh] md:px-4 md:pt-4">
      {/* Background Container with rounded corners */}
      <div 
        className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl"
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
          className="object-cover object-center md:object-[center_calc(100%+38px)]"
          unoptimized
        />
        
        {/* Subtle overlay for text legibility - stronger on mobile for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 md:from-black/30 md:via-black/10 md:to-black/40" />
        
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

      {/* Floating decorative elements - hidden on mobile via CSS */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-[25%] left-[10%] w-2 h-2 rounded-full bg-white/40 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:block absolute top-[35%] right-[14%] w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden md:block absolute top-[55%] left-[17%] w-1 h-1 rounded-full bg-white/35 blur-[1px]"
      />
      
      {/* Mobile Layout */}
      <div className="absolute inset-0 z-10 flex flex-col px-[3rem] pt-20 pb-6 md:hidden">
        {/* Top section - Headline */}
        <div className="flex-shrink-0">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease }}
            className="text-[2.5rem] leading-[1.1] font-medium tracking-[-0.02em] text-white"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            {mobileHeroContent.headline.line1}<br />
            <span className="text-[#FF8558]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {mobileHeroContent.headline.highlight}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="mt-4 text-base text-white/90 font-light"
          >
            <span className="text-white font-medium">Not just answers</span>
            <span className="mx-1.5 text-white/50">·</span>
            <span className="text-[#FF8558] font-medium">real actions</span>
          </motion.p>
        </div>
        
        {/* Middle section - Message Feed */}
        <div className="flex-1 flex items-center justify-center py-4 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="w-full max-w-sm"
          >
            <MessageFeed isMobile={true} />
          </motion.div>
        </div>
        
        {/* Bottom section - CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex-shrink-0"
        >
          <div 
            className="flex items-center gap-2 rounded-full p-1.5 pl-4"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.2), 0 4px 24px rgba(0,0,0,0.15)',
            }}
          >
            <input
              type="email"
              placeholder={mobileHeroContent.cta.placeholder}
              className="hero-email-input bg-transparent border-none outline-none text-white text-sm flex-1 min-w-0 focus:ring-0 placeholder:text-white/50"
            />
            <motion.a
              href={content.links.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1 justify-center rounded-full h-9 px-4 text-sm font-medium text-zinc-900 flex-shrink-0"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {mobileHeroContent.cta.buttonText}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid absolute inset-0 z-10 grid-cols-2 px-6">
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
            AI agents that<br /><span className="text-[#FF8558]" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>close tickets</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide"
          >
            <span className="text-white font-semibold">Not just answers</span> · <span className="text-[#FF8558] font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>real actions</span>
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
              <motion.a
                href={content.links.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
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
              </motion.a>
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
            <MessageFeed isMobile={false} />
          </motion.div>
        </div>
        
      </div>
      </div>
    </section>
  )
}
