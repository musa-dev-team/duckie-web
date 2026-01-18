"use client"

import { content } from "@/config/content"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { Brain, FileText, Pause, Play, Search, Shield, Sparkles, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  { id: 0, label: "Understand", icon: Brain, color: "sky" },
  { id: 1, label: "Verify", icon: Shield, color: "emerald" },
  { id: 2, label: "Research", icon: Search, color: "purple" },
  { id: 3, label: "Resolve", icon: Zap, color: "amber" },
  { id: 4, label: "Learn", icon: Sparkles, color: "pink" },
]

const colorMap = {
  // Muted, zinc-influenced colors for the step icons
  sky: { bg: '#1a2228', bgSolid: '#1e272e', border: 'rgba(120, 160, 190, 0.25)', text: 'rgb(155, 190, 215)', dot: 'rgb(120, 160, 190)' },
  emerald: { bg: '#1a2320', bgSolid: '#1e2824', border: 'rgba(110, 160, 140, 0.25)', text: 'rgb(145, 195, 175)', dot: 'rgb(110, 160, 140)' },
  purple: { bg: '#1f1c24', bgSolid: '#24212b', border: 'rgba(150, 130, 180, 0.25)', text: 'rgb(185, 170, 210)', dot: 'rgb(150, 130, 180)' },
  amber: { bg: '#232018', bgSolid: '#28251c', border: 'rgba(190, 165, 110, 0.25)', text: 'rgb(215, 195, 145)', dot: 'rgb(190, 165, 110)' },
  pink: { bg: '#231a1e', bgSolid: '#281f23', border: 'rgba(180, 130, 155, 0.25)', text: 'rgb(210, 165, 185)', dot: 'rgb(180, 130, 155)' },
}

// Revealing text component - text is always present but characters reveal from transparent to visible
function RevealingText({ text, isActive, delay = 0 }: { text: string; isActive: boolean; delay?: number }) {
  const [revealedCount, setRevealedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isActive) {
      if (!isComplete && intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    if (isComplete && hasStarted) return

    setHasStarted(true)
    const startTimeout = setTimeout(() => {
      let currentIndex = 0
      setRevealedCount(0)
      setIsComplete(false)

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          const chunkSize = Math.random() > 0.8 ? 2 : 1
          currentIndex = Math.min(currentIndex + chunkSize, text.length)
          setRevealedCount(currentIndex)
        } else {
          setIsComplete(true)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, 18)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, text, delay, isComplete, hasStarted])

  return (
    <span className="relative">
      {/* Full text always rendered for layout */}
      <span className="relative">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="transition-colors duration-150"
            style={{ 
              color: i < revealedCount ? 'rgb(212, 212, 216)' : 'transparent' 
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  )
}

// Streaming text component - keeps text visible after streaming completes
function StreamingText({ text, isActive, delay = 0 }: { text: string; isActive: boolean; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only reset and restart if isActive becomes true AND we haven't started yet
    // OR if we need to restart (component remounted via key change)
    if (!isActive) {
      // Don't clear text if streaming is complete - keep it visible
      if (!isComplete) {
        // Only clear if we haven't finished streaming yet
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
      return
    }

    // If already complete, don't re-stream
    if (isComplete && hasStarted) {
      return
    }

    // Start streaming
    setHasStarted(true)
    const startTimeout = setTimeout(() => {
      let currentIndex = 0
      setDisplayedText('')
      setIsComplete(false)

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          // Add characters in chunks for natural streaming feel
          const chunkSize = Math.random() > 0.8 ? 2 : 1
          const nextChunk = text.slice(currentIndex, currentIndex + chunkSize)
          setDisplayedText(prev => prev + nextChunk)
          currentIndex += chunkSize
        } else {
          setIsComplete(true)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, 18) // Smooth streaming speed
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, text, delay, isComplete, hasStarted])

  // Show full text if complete, otherwise show streaming text
  const textToShow = isComplete ? text : displayedText

  return (
    <span>
      {textToShow}
      {!isComplete && isActive && displayedText.length > 0 && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-emerald-400 ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

// Inline loading indicator that transitions to content
function LoadingLine({ 
  label, 
  value, 
  showAt, 
  currentTime,
  loadDuration = 400,
  color = "zinc"
}: { 
  label: string
  value: string
  showAt: number
  currentTime: number
  loadDuration?: number
  color?: string
}) {
  const isLoading = currentTime >= showAt && currentTime < showAt + loadDuration
  const isComplete = currentTime >= showAt + loadDuration
  
  if (currentTime < showAt) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-baseline gap-2"
    >
      <span className="text-[11px] text-zinc-500 w-20 shrink-0">{label}</span>
      {isLoading && (
        <span className="text-sm text-zinc-600 flex items-center gap-1">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ...
          </motion.span>
        </span>
      )}
      {isComplete && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`text-sm ${color === 'amber' ? 'text-amber-400' : color === 'emerald' ? 'text-emerald-400' : 'text-white'}`}
        >
          {value}
        </motion.span>
      )}
    </motion.div>
  )
}

export function HowItWorksContent() {
  const [activeStep, setActiveStep] = useState(-1)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [understandKey, setUnderstandKey] = useState(0)
  const documentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  
  // Step durations based on content length (in ms)
  // Step 0 (Classify): needs time for message + classification
  // Step 1 (Verify): policy checks  
  // Step 2 (Research): fetching context
  // Step 3 (Resolve): actions + long streaming response
  // Step 4 (Learn): outcome recording
  const STEP_DURATIONS = [4000, 2500, 3500, 7000, 4000] // Total: 21000ms
  const STEP_BOUNDARIES = STEP_DURATIONS.reduce((acc, dur, i) => {
    acc.push(i === 0 ? dur : acc[i - 1] + dur)
    return acc
  }, [] as number[]) // [4000, 6500, 10000, 17000, 21000]
  const TOTAL_DURATION = STEP_BOUNDARIES[4] // 21000ms
  const MESSAGE_STREAM_DONE = 2500

  // Get step from elapsed time
  const getStepFromElapsed = (elapsed: number) => {
    if (elapsed < STEP_BOUNDARIES[0]) return 0
    if (elapsed < STEP_BOUNDARIES[1]) return 1
    if (elapsed < STEP_BOUNDARIES[2]) return 2
    if (elapsed < STEP_BOUNDARIES[3]) return 3
    return 4
  }

  // Get start time for a step
  const getStepStartTime = (step: number) => {
    if (step === 0) return 0
    return STEP_BOUNDARIES[step - 1]
  }

  // Simple continuous timer
  useEffect(() => {
    if (activeStep === -1) {
      // Initial delay before starting (only if in view)
      if (!isInView) return
      const timeout = setTimeout(() => {
        setActiveStep(0)
        startTimeRef.current = Date.now()
      }, 600)
      return () => clearTimeout(timeout)
    }

    if (isPaused || !isInView) return

    const tick = () => {
      const now = Date.now()
      const elapsed = now - startTimeRef.current
      
      if (elapsed >= TOTAL_DURATION) {
        // Loop back
        startTimeRef.current = now
        setElapsedTime(0)
        setActiveStep(0)
        setUnderstandKey(prev => prev + 1)
      } else {
        setElapsedTime(elapsed)
        
        // Calculate step based on boundaries
        const newStep = getStepFromElapsed(elapsed)
        if (newStep !== activeStep) {
          setActiveStep(newStep)
        }
      }
      
      rafRef.current = requestAnimationFrame(tick)
    }

    // Adjust start time to account for pause duration
    startTimeRef.current = Date.now() - elapsedTime
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [activeStep, isPaused, isInView, elapsedTime])

  // Always scroll to bottom when playing (not paused)
  useEffect(() => {
    if (!isPaused && documentRef.current && activeStep >= 0) {
      // Continuously scroll to bottom while playing
      documentRef.current.scrollTop = documentRef.current.scrollHeight
    }
  }, [elapsedTime, isPaused, activeStep])

  const handleStepClick = (index: number) => {
    // Jump to start of clicked step
    const newElapsed = getStepStartTime(index)
    startTimeRef.current = Date.now() - newElapsed
    setActiveStep(index)
    setElapsedTime(newElapsed)
    // Reset the reveal animation when clicking Understand
    if (index === 0) {
      setUnderstandKey(prev => prev + 1)
    }
  }

  return (
    <div className="relative py-28 lg:py-40">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mb-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]">
                How It Works
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                className="h-px w-16 bg-gradient-to-r from-zinc-500/60 to-transparent origin-left"
              />
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.1]"
            >
              {content.howItWorks.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-lg text-zinc-400 max-w-md lg:text-right"
            >
              {content.howItWorks.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Main visualization */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Pause/Play button - appears on hover */}
          <AnimatePresence>
            {isHovering && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsPaused(!isPaused)}
                className="absolute bottom-3 right-3 z-50 w-7 h-7 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <Pause className="w-3.5 h-3.5 text-zinc-500" />
                )}
              </motion.button>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* LEFT: Activity Feed (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Customer Message - appears when Understand step starts */}
              <AnimatePresence mode="wait">
                {activeStep >= 0 && (
                  <motion.div 
                    key={`message-${understandKey}`}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.6, ease }}
                    className="rounded-2xl p-5 overflow-hidden relative"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04)',
                    }}
                  >
                    {/* Incoming message indicator */}
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="h-full w-1/2 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent"
                      />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                        style={{ background: 'linear-gradient(135deg, rgb(180, 160, 175) 0%, rgb(160, 150, 170) 100%)' }}
                      >
                        JD
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <div className="text-sm font-medium text-white">Jane Doe</div>
                        <div className="text-xs text-zinc-500">Order #12345</div>
                      </motion.div>
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                        className="ml-auto px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-700/50 text-zinc-400"
                      >
                        Urgent
                      </motion.span>
                    </motion.div>
                    <p className="text-sm leading-relaxed">
                      <RevealingText 
                        key={`reveal-${understandKey}`}
                        text={`"I need a refund for my order. The package never arrived and it's been 2 weeks. This is really frustrating!"`}
                        isActive={activeStep === 0}
                        delay={700}
                      />
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Placeholder for message before it appears */}
              {activeStep < 0 && (
                <motion.div 
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0.3 }}
                  className="rounded-2xl p-5 border border-dashed border-white/10"
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-2 w-16 bg-zinc-800/50 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-zinc-800/50 rounded animate-pulse" />
                    <div className="h-3 w-3/4 bg-zinc-800/50 rounded animate-pulse" />
                  </div>
                </motion.div>
              )}

              {/* Activity Timeline */}
              <div className="relative">
                {/* Steps that build up */}
                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const colors = colorMap[step.color as keyof typeof colorMap]
                    const isActive = index === activeStep
                    const isPast = index < activeStep && activeStep >= 0
                    const isFuture = index > activeStep || activeStep < 0
                    const Icon = step.icon

                    return (
                      <motion.button
                        key={step.id}
                        onClick={() => handleStepClick(index)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        className="relative flex items-start gap-3 w-full text-left group cursor-pointer"
                      >
                        {/* Icon as timeline marker - ALWAYS solid background */}
                        <div 
                          className="relative z-10 w-[30px] h-[30px] rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                          style={{
                            background: isPast || isActive ? colors.bgSolid : '#18181b',
                            boxShadow: isActive 
                              ? `0 0 0 2px ${colors.border}, 0 0 12px ${colors.border}`
                              : isPast 
                                ? `0 0 0 1px ${colors.border}`
                                : '0 0 0 1px rgba(255,255,255,0.15)',
                          }}
                        >
                          <Icon 
                            className="w-4 h-4 transition-colors" 
                            style={{ 
                              color: isPast || isActive ? colors.text : '#71717a',
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className={`flex-1 min-w-0 pt-1 transition-opacity ${isFuture ? 'opacity-50' : 'opacity-100'}`}>
                          <div className="flex items-center gap-2">
                            <span 
                              className="text-sm font-medium transition-colors"
                              style={{ color: isPast || isActive ? 'white' : '#a1a1aa' }}
                            >
                              {step.label}
                            </span>
                            {isActive && (
                              <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                                style={{ background: colors.bgSolid, color: colors.text }}
                              >
                                Now
                              </motion.span>
                            )}
                          </div>
                          
                          {/* Step subtitle - always visible, muted when not yet run */}
                          <p
                            className={`text-xs mt-0.5 leading-relaxed transition-colors duration-300 ${
                              isFuture ? 'text-zinc-700' : 'text-zinc-500'
                            }`}
                          >
                            {index === 0 && "Identified refund request"}
                            {index === 1 && "Confirmed auto-refund eligible"}
                            {index === 2 && "Retrieved order & customer data"}
                            {index === 3 && "Refund processed, response sent"}
                            {index === 4 && "Resolution logged"}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                  <span>Progress</span>
                  <span className="tabular-nums">
                    {activeStep >= 0 ? Math.round((elapsedTime / 21000) * 100) : 0}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full min-w-[2px]"
                    style={{ 
                      width: `${activeStep >= 0 ? Math.max(1, (elapsedTime / 21000) * 100) : 0}%`,
                      background: 'linear-gradient(90deg, #3f3f46, #71717a)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Live Document (8 cols) */}
            <div className="lg:col-span-8 flex">
              {/* Container with tree background image */}
              <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[500px]">
                {/* Background tree images - crossfade on step change */}
                {[1, 3, 2, 4, 5].map((num, index) => (
                  <motion.div
                    key={`tree-bg-${num}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === index ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(/images/trees-${num}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                ))}
                
                {/* Subtle vignette overlay for depth */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
                  }}
                />
                
                {/* Runbook card floating on top of background */}
                <div className="absolute inset-10 lg:inset-x-36 lg:inset-y-14">
                  <div 
                    className="h-full flex flex-col rounded-xl overflow-hidden"
                    style={{
                      background: '#141417',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.4), 0 12px 48px rgba(0,0,0,0.3), 0 24px 80px rgba(0,0,0,0.25)',
                    }}
                  >
                {/* Document header */}
                <div className="px-5 py-3 flex items-center justify-between border-b border-white/5 shrink-0 bg-black/30">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium text-zinc-300">Runbook: Refund Request</span>
                    <span className="text-[10px] text-zinc-600">•</span>
                    <span className="text-[10px] text-zinc-500">TKT-12345</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-emerald-400" 
                    />
                    <span className="text-xs text-zinc-500">Processing</span>
                  </div>
                </div>

                {/* Scrolling document content - continuous timeline */}
                <div 
                  ref={documentRef}
                  className={`flex-1 p-6 ${isPaused ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
                >
                  {/* Timeline starts after message streams in (step 0 starts at 0ms) */}
                  {activeStep >= 0 && elapsedTime > MESSAGE_STREAM_DONE && (
                    <div key={understandKey} className="space-y-4">
                      
                      {/* Classification Section - Step 0 (0-4000ms) */}
                      <div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 mb-2"
                        >
                          <div className="w-1 h-3 rounded-full bg-sky-400" />
                          <span className="text-[10px] font-medium text-sky-400 uppercase tracking-wider">Classifying</span>
                          {activeStep === 0 && (
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-[10px] text-zinc-500"
                            >...</motion.span>
                          )}
                        </motion.div>
                        
                        <div className="pl-3 border-l border-white/10 space-y-1">
                          <LoadingLine label="Intent" value="Refund Request" showAt={MESSAGE_STREAM_DONE + 100} currentTime={elapsedTime} loadDuration={300} />
                          <LoadingLine label="Category" value="Order Issue → Lost Package" showAt={MESSAGE_STREAM_DONE + 400} currentTime={elapsedTime} loadDuration={300} />
                          <LoadingLine label="Priority" value="High" showAt={MESSAGE_STREAM_DONE + 700} currentTime={elapsedTime} loadDuration={300} color="amber" />
                          <LoadingLine label="Sentiment" value="Frustrated" showAt={MESSAGE_STREAM_DONE + 1000} currentTime={elapsedTime} loadDuration={300} />
                          <LoadingLine label="Confidence" value="98%" showAt={MESSAGE_STREAM_DONE + 1300} currentTime={elapsedTime} loadDuration={300} color="emerald" />
                        </div>
                      </div>

                      {/* Policy Check Section - Step 1 (4000-6500ms) */}
                      {activeStep >= 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-3 rounded-full bg-emerald-400" />
                            <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Checking Policies</span>
                            {activeStep === 1 && (
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-[10px] text-zinc-500"
                              >...</motion.span>
                            )}
                          </div>
                          
                          <div className="pl-3 border-l border-white/10 space-y-1">
                            <LoadingLine label="Refund window" value="✓ 14 days — eligible" showAt={4100} currentTime={elapsedTime} loadDuration={250} color="emerald" />
                            <LoadingLine label="Amount" value="✓ $49.99 — auto-approve" showAt={4400} currentTime={elapsedTime} loadDuration={250} color="emerald" />
                            <LoadingLine label="Customer" value="✓ VIP, good standing" showAt={4700} currentTime={elapsedTime} loadDuration={250} color="emerald" />
                            <LoadingLine label="Fraud check" value="✓ Clear (0.02)" showAt={5000} currentTime={elapsedTime} loadDuration={250} color="emerald" />
                            
                            {elapsedTime > 5400 && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="pt-1"
                              >
                                <span className="text-xs text-emerald-400 font-medium">→ Decision: Auto-approve refund</span>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Context Retrieval Section - Step 2 (6500-10000ms) */}
                      {activeStep >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-3 rounded-full bg-purple-400" />
                            <span className="text-[10px] font-medium text-purple-400 uppercase tracking-wider">Fetching Context</span>
                            {activeStep === 2 && (
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-[10px] text-zinc-500"
                              >...</motion.span>
                            )}
                          </div>
                          
                          <div className="pl-3 border-l border-white/10 space-y-2">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="text-xs space-y-0.5">
                              <div className="text-purple-400/60 text-[10px] uppercase tracking-wider">Order #12345</div>
                              <LoadingLine label="Amount" value="$49.99" showAt={6600} currentTime={elapsedTime} loadDuration={200} />
                              <LoadingLine label="Shipped" value="Jan 3 · USPS" showAt={6900} currentTime={elapsedTime} loadDuration={200} />
                              <LoadingLine label="Status" value="In Transit (10 days)" showAt={7200} currentTime={elapsedTime} loadDuration={200} color="amber" />
                            </motion.div>
                            
                            {elapsedTime > 7600 && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="text-xs space-y-0.5 pt-1">
                                <div className="text-purple-400/60 text-[10px] uppercase tracking-wider">Customer</div>
                                <LoadingLine label="Name" value="Jane Doe" showAt={7800} currentTime={elapsedTime} loadDuration={200} />
                                <LoadingLine label="Tier" value="VIP" showAt={8100} currentTime={elapsedTime} loadDuration={200} color="amber" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Actions Section - Step 3 (10000-17000ms) */}
                      {activeStep >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-3 rounded-full bg-amber-400" />
                            <span className="text-[10px] font-medium text-amber-400 uppercase tracking-wider">Executing Actions</span>
                            {activeStep === 3 && (
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-[10px] text-zinc-500"
                              >...</motion.span>
                            )}
                          </div>
                          
                          <div className="pl-3 border-l border-white/10 space-y-1.5">
                            <LoadingLine label="Refund" value="✓ $49.99 → •••• 4242" showAt={10200} currentTime={elapsedTime} loadDuration={400} color="emerald" />
                            
                            {elapsedTime > 10800 && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="pt-2">
                                <div className="text-amber-400/60 text-[10px] uppercase tracking-wider mb-1.5">Response</div>
                                <div className="rounded-lg p-2.5 bg-white/[0.02] border border-white/5">
                                  <p className="text-xs text-zinc-300 leading-relaxed">
                                    "<StreamingText 
                                      text="Hi Jane! I'm so sorry your package never arrived — that's really frustrating, especially after waiting two weeks. I've gone ahead and processed a full refund of $49.99 to your card ending in 4242. You should see it within 3-5 business days. Is there anything else I can help you with today?"
                                      isActive={activeStep >= 3 && elapsedTime > 10800}
                                      delay={0}
                                    />"
                                  </p>
                                </div>
                              </motion.div>
                            )}
                            
                            {/* Email sent after message streams (message is ~280 chars × 15ms = 4200ms, starts at 10800) */}
                            <LoadingLine label="Email" value="✓ Confirmation sent" showAt={15200} currentTime={elapsedTime} loadDuration={400} color="emerald" />
                          </div>
                        </motion.div>
                      )}

                      {/* Outcome Section - Step 4 (17000-21000ms) */}
                      {activeStep >= 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-3 rounded-full bg-pink-400" />
                            <span className="text-[10px] font-medium text-pink-400 uppercase tracking-wider">Recording Outcome</span>
                            {activeStep === 4 && (
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-[10px] text-zinc-500"
                              >...</motion.span>
                            )}
                          </div>
                          
                          <div className="pl-3 border-l border-white/10 space-y-2">
                            <div className="space-y-1">
                              <LoadingLine label="Status" value="Resolved" showAt={17200} currentTime={elapsedTime} loadDuration={300} color="emerald" />
                              <LoadingLine label="Resolution time" value="32 seconds" showAt={17500} currentTime={elapsedTime} loadDuration={300} />
                              <LoadingLine label="Escalated" value="No" showAt={17800} currentTime={elapsedTime} loadDuration={300} />
                              <LoadingLine label="Customer satisfaction" value="Pending survey" showAt={18100} currentTime={elapsedTime} loadDuration={300} />
                            </div>
                            
                            {elapsedTime > 18500 && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="text-xs space-y-0.5 pt-1">
                                <div className="text-pink-400/60 text-[10px] uppercase tracking-wider">Tags Added</div>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px]">refund</span>
                                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px]">lost-package</span>
                                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px]">shipping-delay</span>
                                </div>
                              </motion.div>
                            )}
                            
                            {elapsedTime > 19200 && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-lg p-2.5 bg-pink-500/5 border border-pink-500/20 mt-2"
                              >
                                <div className="flex items-start gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                                  <div className="text-xs">
                                    <span className="text-pink-400">Pattern detected:</span>
                                    <span className="text-zinc-400"> 23 similar lost package tickets this week</span>
                                  </div>
                                </div>
                                <div className="text-xs text-zinc-500 mt-1.5 pl-5">
                                  → Flagged for FAQ update: "USPS shipping delays"
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function HowItWorksCanvas() {
  return <HowItWorksContent />
}

export default HowItWorksCanvas
