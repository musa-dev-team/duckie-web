"use client"

import { AnimatePresence, motion, useInView, useSpring, useTransform } from "framer-motion"
import { Check, Eye, Pause, Play, RotateCcw, Shield, Sparkles, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Mobile detection hook
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

// Animated cursor component
function AnimatedCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        animate={{ scale: clicking ? 0.85 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <path 
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" 
          fill="#fff"
          stroke="#000"
          strokeWidth="1.5"
        />
      </motion.svg>
    </motion.div>
  )
}

// Interactive Dashboard with approval animation
function ApprovalDashboard({ isPaused }: { isPaused: boolean }) {
  const [phase, setPhase] = useState<'idle' | 'audit-hover' | 'audit-expanded' | 'hovering' | 'clicked' | 'reviewing' | 'approving' | 'approved'>('idle')
  const [cursorPos, setCursorPos] = useState({ x: 400, y: 300 })
  const [clicking, setClicking] = useState(false)
  const [expandedAuditId, setExpandedAuditId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pendingCardRef = useRef<HTMLDivElement>(null)
  const approveButtonRef = useRef<HTMLButtonElement>(null)
  const auditItemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const isPausedRef = useRef(isPaused)
  const isMobile = useIsMobile()
  
  // Keep ref in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  // Get element center position relative to container
  // Account for CSS scale transform by comparing visual size to actual size
  const getElementCenter = (ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current || !containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    
    // Detect scale by comparing actual size to visual size
    const scale = containerRect.width / containerRef.current.offsetWidth
    
    return {
      x: (elementRect.left - containerRect.left + elementRect.width / 2) / scale,
      y: (elementRect.top - containerRect.top + elementRect.height / 2) / scale,
    }
  }

  // Animation sequence
  useEffect(() => {
    if (!isInView) {
      setPhase('idle')
      setExpandedAuditId(null)
      return
    }

    // Abort controller to cancel animation when effect cleans up
    let cancelled = false

    // Sleep function that respects pause state AND cancellation
    const sleep = (ms: number) => new Promise<void>((resolve, reject) => {
      const checkInterval = 100 // Check every 100ms
      let elapsed = 0
      
      const check = () => {
        // Check if animation was cancelled
        if (cancelled) {
          reject(new Error('cancelled'))
          return
        }
        
        if (isPausedRef.current) {
          // While paused, keep checking
          setTimeout(check, checkInterval)
        } else {
          elapsed += checkInterval
          if (elapsed >= ms) {
            resolve()
          } else {
            setTimeout(check, checkInterval)
          }
        }
      }
      
      // Start after initial delay or immediately if paused
      setTimeout(check, Math.min(ms, checkInterval))
    })

    const sequence = async () => {
      try {
        // Reset - start cursor at bottom right area, collapse audit
        setPhase('idle')
        setExpandedAuditId(null)
        setCursorPos({ x: 400, y: 350 })
        await sleep(2000) // Brief pause to see dashboard

        // === PART 1: Click on audit log item ===
        // Move to audit item
        const auditPos = getElementCenter(auditItemRef)
        if (auditPos) {
          setCursorPos(auditPos)
        }
        await sleep(700)
        
        // Hover on audit item
        setPhase('audit-hover')
        await sleep(400)
        
        // Click to expand
        setClicking(true)
        await sleep(100)
        setClicking(false)
        setExpandedAuditId('TKT-4829')
        setPhase('audit-expanded')
        await sleep(2500) // View the expanded details

        // === PART 2: Approval flow (audit stays expanded) ===
        // Move to pending item
        const pendingPos = getElementCenter(pendingCardRef)
        if (pendingPos) {
          setCursorPos(pendingPos)
        }
        await sleep(800)
        
        // Hover
        setPhase('hovering')
        await sleep(500)
        
        // Click
        setClicking(true)
        await sleep(100)
        setClicking(false)
        setPhase('clicked')
        await sleep(300)
        
        // Modal opens, reviewing
        setPhase('reviewing')
        await sleep(2500)
        
        // Move to approve button
        await sleep(200)
        const approvePos = getElementCenter(approveButtonRef)
        if (approvePos) {
          setCursorPos(approvePos)
        }
        await sleep(700)
        
        // Click approve
        setClicking(true)
        await sleep(100)
        setClicking(false)
        setPhase('approving')
        await sleep(300)
        
        // Show approved state
        setPhase('approved')
        await sleep(2000)
        
        // Loop - only if not cancelled
        if (!cancelled) {
          sequence()
        }
      } catch (e) {
        // Animation was cancelled, just return silently
        return
      }
    }

    sequence()

    // Cleanup: cancel the animation when effect re-runs or component unmounts
    return () => {
      cancelled = true
    }
  }, [isInView])

  const pendingItems = [
    { id: "TKT-4828", customer: "Sarah M.", action: "Cancel subscription", risk: "low", isPending: true },
  ]

  const recentActions = [
    { id: "TKT-4829", action: "Refund processed", amount: "$49.99", time: "2m ago", status: "auto" },
    { id: "TKT-4827", action: "Password reset", amount: null, time: "5m ago", status: "auto" },
    { id: "TKT-4826", action: "Order tracked", amount: null, time: "8m ago", status: "auto" },
    { id: "TKT-4825", action: "Invoice sent", amount: "$149.00", time: "12m ago", status: "auto" },
    { id: "TKT-4824", action: "Account updated", amount: null, time: "15m ago", status: "auto" },
    { id: "TKT-4823", action: "Shipping inquiry", amount: null, time: "18m ago", status: "auto" },
    { id: "TKT-4822", action: "Discount applied", amount: "$25.00", time: "22m ago", status: "auto" },
  ]

  const guardrails = [
    { name: "PII Detection", status: "active", color: "emerald" },
    { name: "Refund Limit ($100)", status: "active", color: "emerald" },
    { name: "Cancellation Review", status: "triggered", color: "amber" },
  ]

  return (
    <div 
      ref={containerRef}
      className="rounded-xl md:rounded-2xl overflow-hidden border border-white/10 w-full h-full relative"
      style={{
        background: '#141417',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.4), 0 12px 48px rgba(0,0,0,0.3), 0 24px 80px rgba(0,0,0,0.25)',
      }}
    >
      {/* Cursor - hidden on mobile */}
      <div className="hidden md:block">
      <AnimatedCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
      </div>

      {/* Browser chrome */}
      <div className="px-3 md:px-4 py-2 md:py-3 border-b border-white/5 flex items-center gap-2 bg-black/30">
        <div className="flex items-center gap-1 md:gap-1.5">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-2 md:px-3 py-1 rounded-lg bg-white/5 text-[9px] md:text-[10px] text-zinc-500 flex items-center gap-1.5 md:gap-2">
            <Shield className="w-2.5 h-2.5 md:w-3 md:h-3" />
            <span className="hidden xs:inline">Control Center</span>
            <span className="xs:hidden">Control</span>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] md:text-[9px] font-medium text-zinc-500 hidden sm:inline">All systems nominal</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 md:p-4 space-y-2 md:space-y-4">
        {/* Top stats row */}
        <div className="grid grid-cols-4 gap-1.5 md:gap-2">
          {[
            { label: "Today", value: "847", sub: "actions", color: "white" },
            { label: "Auto", value: "94%", sub: null, color: "emerald" },
            { label: "Reviewed", value: phase === 'approved' ? "24" : "23", sub: "humans", color: "sky" },
            { label: "Quality", value: "96", sub: "score", color: "purple" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg md:rounded-xl p-2 md:p-3"
              style={{
                background: 'rgba(255,255,255,0.02)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
              }}
            >
              <div className="text-[8px] md:text-[9px] font-medium text-zinc-500 mb-0.5 md:mb-1">{stat.label}</div>
              <div className={`text-base md:text-xl font-bold ${
                stat.color === 'emerald' ? 'text-emerald-400' : 
                stat.color === 'sky' ? 'text-sky-400' :
                stat.color === 'purple' ? 'text-purple-400' : 'text-zinc-100'
              }`}>
                {stat.value}
              </div>
              {stat.sub && <div className="text-[7px] md:text-[8px] text-zinc-600">{stat.sub}</div>}
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {/* Left: Pending Review */}
          <div 
            className="rounded-lg md:rounded-xl p-2 md:p-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className="text-[8px] md:text-[9px] font-medium text-zinc-500 uppercase tracking-wider">Pending</div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[8px] md:text-[9px] text-amber-400">{phase === 'approved' ? '0' : '1'}</span>
              </div>
            </div>
            
            {phase !== 'approved' ? (
              <motion.div
                ref={pendingCardRef}
                className={`rounded-md md:rounded-lg p-2 md:p-2.5 transition-all duration-200 cursor-pointer ${
                  phase === 'hovering' || phase === 'clicked' ? 'ring-1 ring-amber-500/40' : ''
                }`}
                style={{ background: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.15)' }}
              >
                <div className="flex items-center justify-between mb-1 md:mb-1.5">
                  <span className="text-[9px] md:text-[10px] font-mono text-zinc-400">TKT-4828</span>
                  <span className="text-[7px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Review</span>
                </div>
                <div className="text-[10px] md:text-[11px] text-zinc-300 mb-0.5 md:mb-1">Cancel subscription</div>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] md:text-[9px] text-zinc-500">Sarah M.</span>
                  <span className="text-[7px] md:text-[8px] text-emerald-400">Low risk</span>
                </div>
              </motion.div>
            ) : (
              <div className="h-[60px] md:h-[72px] flex items-center justify-center text-[9px] md:text-[10px] text-zinc-600">
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500 mr-1.5 md:mr-2" />
                All caught up!
              </div>
            )}
          </div>

          {/* Right: Active Guardrails */}
          <div 
            className="rounded-lg md:rounded-xl p-2 md:p-3"
            style={{
              background: 'rgba(255,255,255,0.02)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
            }}
          >
            <div className="text-[8px] md:text-[9px] font-medium text-zinc-500 uppercase tracking-wider mb-2 md:mb-3">Guardrails</div>
            <div className="space-y-1.5 md:space-y-2">
              {guardrails.map((guard) => (
                <div key={guard.name} className="flex items-center justify-between">
                  <span className="text-[9px] md:text-[10px] text-zinc-400 truncate mr-2">{guard.name}</span>
                  <span className={`text-[7px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded flex-shrink-0 ${
                    guard.color === 'emerald' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {guard.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Log */}
        <div 
          className="rounded-lg md:rounded-xl p-2 md:p-3"
          style={{
            background: 'rgba(255,255,255,0.02)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <div className="text-[8px] md:text-[9px] font-medium text-zinc-500 uppercase tracking-wider">Audit Log</div>
            <span className="text-[7px] md:text-[8px] text-zinc-600">Live</span>
          </div>
          <div className="space-y-1 md:space-y-1.5 h-[140px] md:h-[220px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {phase === 'approved' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between py-1 md:py-1.5 px-2 md:px-2.5 rounded-md md:rounded-lg bg-emerald-500/5"
              >
                <div className="flex items-center gap-1.5 md:gap-2 flex-1 min-w-0">
                  <span className="text-[8px] md:text-[9px] font-mono text-zinc-500">TKT-4828</span>
                  <span className="text-[9px] md:text-[10px] text-zinc-300 truncate">Subscription cancelled</span>
                  <span className="text-[7px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 flex-shrink-0">human</span>
                </div>
                <span className="text-[8px] md:text-[9px] text-zinc-600 flex-shrink-0 ml-2">now</span>
              </motion.div>
            )}
            {recentActions.slice(0, isMobile ? 5 : 5).map((action, idx) => (
              <div key={action.id}>
                <div
                  ref={idx === 0 ? auditItemRef : null}
                  className={`flex items-center justify-between py-1 md:py-1.5 px-2 md:px-2.5 rounded-md md:rounded-lg cursor-pointer transition-all ${
                    idx === 0 && phase === 'audit-hover' ? 'ring-1 ring-white/10' : ''
                  }`}
                  style={{ 
                    background: expandedAuditId === action.id ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)' 
                  }}
                >
                  <div className="flex items-center gap-1.5 md:gap-2 flex-1 min-w-0">
                    <span className="text-[8px] md:text-[9px] font-mono text-zinc-600">{action.id}</span>
                    <span className="text-[9px] md:text-[10px] text-zinc-400 truncate">{action.action}</span>
                    {action.amount && <span className="text-[8px] md:text-[9px] text-zinc-500 hidden sm:inline">{action.amount}</span>}
                    <span className="text-[7px] md:text-[8px] px-1 md:px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 flex-shrink-0">{action.status}</span>
                  </div>
                  <span className="text-[8px] md:text-[9px] text-zinc-600 flex-shrink-0 ml-2">{action.time}</span>
                </div>
                
                {/* Expanded details */}
                <AnimatePresence>
                  {expandedAuditId === action.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 md:mt-1.5 ml-1.5 md:ml-2 p-2 md:p-2.5 rounded-md md:rounded-lg bg-black/20 border-l-2 border-emerald-500/30">
                        <div className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-wider mb-1.5 md:mb-2">Run Details</div>
                        <div className="space-y-1 md:space-y-1.5">
                          <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                            <span className="text-zinc-500">Customer</span>
                            <span className="text-zinc-300 truncate ml-2">james@company.co</span>
                          </div>
                          <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                            <span className="text-zinc-500">Duration</span>
                            <span className="text-zinc-300">1.2s</span>
                          </div>
                          <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                            <span className="text-zinc-500">Quality</span>
                            <span className="text-emerald-400">98</span>
                          </div>
                          <div className="pt-1 md:pt-1.5 border-t border-white/5">
                            <div className="text-[8px] md:text-[9px] text-zinc-500 mb-1">Actions</div>
                            <div className="space-y-0.5 md:space-y-1">
                              {['Verified order', 'Processed refund', 'Sent email'].map((step, i) => (
                                <div key={i} className="flex items-center gap-1 md:gap-1.5 text-[8px] md:text-[9px] text-zinc-400">
                                  <Check className="w-2 h-2 md:w-2.5 md:h-2.5 text-emerald-400" />
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      <AnimatePresence>
        {(phase === 'reviewing' || phase === 'approving' || phase === 'approved') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 rounded-xl md:rounded-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[320px] md:max-w-md rounded-lg md:rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1a1a1f 0%, #0f0f12 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              {/* Modal header */}
              <div className="px-3 md:px-4 py-2 md:py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] md:text-xs font-medium text-zinc-300">Review Required</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="text-[8px] md:text-[9px] px-1.5 md:px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Low risk</span>
                  <span className="text-[9px] md:text-[10px] text-zinc-500">TKT-4828</span>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                {/* Why review is needed */}
                <div className="rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 bg-amber-500/5 border border-amber-500/10">
                  <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] text-amber-400">
                    <Shield className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    <span className="font-medium">Guardrail triggered:</span>
                    <span className="text-amber-300">Cancellation Review</span>
                  </div>
                </div>

                {/* Customer message */}
                <div>
                  <div className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-wider mb-1 md:mb-1.5">Customer Message</div>
                  <div className="rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-[10px] md:text-[11px] text-zinc-300 bg-white/5">
                    I'd like to cancel my subscription please.
                  </div>
                </div>

                {/* Duckie's draft */}
                <div>
                  <div className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-wider mb-1 md:mb-1.5">Proposed Response</div>
                  <div className="rounded-md md:rounded-lg px-2 md:px-3 py-2 md:py-2.5 text-[10px] md:text-[11px] text-zinc-300 bg-white/5 border border-white/5">
                    I've cancelled your subscription effective immediately. You'll retain access until <span className="text-emerald-400">Jan 31st</span>. A confirmation email has been sent to <span className="text-emerald-400">sarah@email.com</span>.
                  </div>
                </div>

                {/* Actions to be taken */}
                <div className="rounded-md md:rounded-lg p-2 md:p-3 bg-black/30">
                  <div className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-wider mb-1.5 md:mb-2">Actions to execute</div>
                  <div className="space-y-1 md:space-y-1.5">
                    {[
                      { action: "Cancel subscription", target: "Stripe", icon: "💳" },
                      { action: "Send confirmation", target: "Email", icon: "✉️" },
                      { action: "Log cancellation", target: "CRM", icon: "📋" },
                    ].slice(0, isMobile ? 1 : 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px]">
                        <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border border-zinc-700 flex items-center justify-center text-[7px] md:text-[8px]">
                          {phase === 'approved' ? <Check className="w-2 h-2 md:w-2.5 md:h-2.5 text-emerald-400" /> : item.icon}
                        </div>
                        <span className="text-zinc-300">{item.action}</span>
                        <span className="text-zinc-600">→</span>
                        <span className="text-zinc-500">{item.target}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="px-3 md:px-4 py-2 md:py-3 border-t border-white/5 flex items-center gap-1.5 md:gap-2">
                <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-[10px] md:text-[11px] font-medium text-zinc-400 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-1 md:gap-1.5">
                  <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  Reject
                </button>
                <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-[10px] md:text-[11px] font-medium text-zinc-400 bg-white/5 hover:bg-white/10 transition-colors">
                  Edit
                </button>
                <motion.button 
                  ref={approveButtonRef}
                  className={`flex-1 px-3 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-[10px] md:text-[11px] font-medium transition-all flex items-center justify-center gap-1 md:gap-1.5 ${
                    phase === 'approved' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-amber-500 text-black hover:bg-amber-400'
                  }`}
                  animate={{ scale: phase === 'approving' ? 0.95 : 1 }}
                >
                  <Check className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  {phase === 'approved' ? 'Approved!' : 'Approve'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { 
    bg: 'rgba(110, 160, 140, 0.08)', 
    border: 'rgba(110, 160, 140, 0.18)', 
    text: 'rgb(145, 195, 175)',
  },
  amber: { 
    bg: 'rgba(190, 165, 110, 0.08)', 
    border: 'rgba(190, 165, 110, 0.18)', 
    text: 'rgb(215, 195, 145)',
  },
  sky: { 
    bg: 'rgba(120, 160, 190, 0.08)', 
    border: 'rgba(120, 160, 190, 0.18)', 
    text: 'rgb(155, 190, 215)',
  },
  purple: { 
    bg: 'rgba(150, 130, 180, 0.08)', 
    border: 'rgba(150, 130, 180, 0.18)', 
    text: 'rgb(185, 170, 210)',
  },
}

// Stat card component
function StatCard({ 
  value, 
  suffix, 
  label, 
  description,
  color = "emerald"
}: { 
  value: number
  suffix: string
  label: string
  description: string
  color?: keyof typeof colorMap
}) {
  const colors = colorMap[color]
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      whileHover={{ y: -2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-xl md:rounded-2xl p-3 md:p-5 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Cursor-following glow */}
      <div 
        className="absolute inset-0 rounded-xl md:rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${colors.bg} 0%, transparent 60%)`,
        }}
      />
      
      <div className="relative">
        <div 
          className="text-2xl md:text-3xl font-bold mb-0.5 md:mb-1"
          style={{ color: colors.text }}
        >
          <AnimatedStat value={value} suffix={suffix} />
        </div>
        <div className="text-xs md:text-sm font-medium text-zinc-300 mb-0.5 md:mb-1">{label}</div>
        <div className="text-[10px] md:text-xs text-zinc-500 hidden sm:block">{description}</div>
      </div>
    </motion.div>
  )
}

// Feature card component
function FeatureCard({ 
  icon: Icon, 
  title, 
  description,
  color = "emerald"
}: { 
  icon: typeof Eye
  title: string
  description: string
  color?: keyof typeof colorMap
}) {
  const colors = colorMap[color]
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      whileHover={{ y: -2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-xl md:rounded-2xl p-3 md:p-5 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Cursor-following glow */}
      <div 
        className="absolute inset-0 rounded-xl md:rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${colors.bg} 0%, transparent 60%)`,
        }}
      />
      
      <div className="relative flex md:block items-start gap-3">
        <div 
          className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl flex items-center justify-center md:mb-4 flex-shrink-0"
          style={{ background: colors.bg }}
        >
          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: colors.text }} />
        </div>
        <div>
          <div className="text-xs md:text-sm font-semibold text-zinc-100 mb-0.5 md:mb-1">{title}</div>
          <div className="text-[10px] md:text-xs text-zinc-500 leading-relaxed">{description}</div>
        </div>
      </div>
    </motion.div>
  )
}

export function QualityContent() {
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div id="quality-control" className="relative py-12 sm:py-16 lg:py-24 scroll-mt-24">
      <div className="container mx-auto px-5 md:px-6">
        {/* Header with eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 md:mb-10 lg:mb-12"
        >
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 sm:mb-6">
            <span className="text-[10px] md:text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]">
              Quality & Control
            </span>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="h-px w-12 md:w-16 bg-gradient-to-r from-zinc-500/60 to-transparent origin-left"
            />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.1]">
              Automation you can trust.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-md lg:text-right">
              Full visibility into every decision. Human oversight built in from day one.
            </p>
          </div>
        </motion.div>

        {/* Two column layout - right side determines height */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 md:gap-6 lg:gap-8">
          {/* Left: Container that stretches to match right side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="relative rounded-xl md:rounded-2xl overflow-hidden min-h-[380px] md:min-h-[500px] lg:min-h-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* ALL content is absolute - doesn't affect height on desktop */}
            <div className="absolute inset-0">
              {/* Ocean background image */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/ocean-bg-4.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Subtle vignette overlay for depth */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
                }}
              />
              
              {/* Pause/Play button */}
              <AnimatePresence>
                {isHovering && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setIsPaused(!isPaused)}
                    className="absolute bottom-2 md:bottom-3 right-2 md:right-3 z-50 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
                  >
                    {isPaused ? (
                      <Play className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-400" />
                    ) : (
                      <Pause className="w-3 h-3 md:w-3.5 md:h-3.5 text-zinc-500" />
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
              
              {/* Dashboard centered in the space */}
              <div className="absolute inset-0 md:inset-10 lg:inset-x-36 lg:inset-y-14 flex items-center justify-center">
                <div className="w-full h-full scale-[0.85] md:scale-100 origin-center">
                <ApprovalDashboard isPaused={isPaused} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats and features - THIS determines the row height */}
          <div className="space-y-3 md:space-y-4">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <StatCard
                value={99}
                suffix=".9%"
                label="Audit Coverage"
                description="Every action logged and traceable."
                color="emerald"
              />
              
              <StatCard
                value={2}
                suffix=" min"
                label="Escalation Time"
                description="Instant human handoff when needed."
                color="amber"
              />
            </div>

            {/* Feature cards */}
            <FeatureCard
              icon={Shield}
              title="Human-in-the-loop"
              description="Approval workflows ensure humans stay in control of high-stakes decisions."
              color="purple"
            />

            <FeatureCard
              icon={RotateCcw}
              title="Instant Rollback"
              description="One-click undo for any automated action. Safety nets built in."
              color="sky"
            />

            <FeatureCard
              icon={Sparkles}
              title="Continuous Learning"
              description="Quality improves over time as the system learns from every interaction."
              color="emerald"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Backward compatibility alias
export const QualitySection = QualityContent
