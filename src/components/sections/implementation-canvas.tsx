"use client"

import {
  JiraIcon,
  NotionIcon,
  SlackIcon
} from "@/components/icons"
import { content } from "@/config/content"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { Check, ChevronRight, Clock, FileText, FlaskConical, GitBranch, Link2, Mail, MessageSquare, Pause, Play, Plus, Rocket, Search, Workflow, Zap } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { SiHubspot, SiIntercom, SiZendesk } from "react-icons/si"

const ease = [0.22, 1, 0.36, 1] as const

// Custom scrollbar styles
const scrollbarStyles = {
  scrollbarWidth: 'thin' as const,
  scrollbarColor: 'rgba(255,255,255,0.1) transparent',
}

const scrollbarCSS = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.2);
  }
`

const steps = [
  { id: 0, label: "Connect", icon: Link2, duration: "1 day", color: "emerald" },
  { id: 1, label: "Build", icon: Workflow, duration: "3-5 days", color: "rose" },
  { id: 2, label: "Train", icon: FileText, duration: "3-4 days", color: "purple" },
  { id: 3, label: "Test", icon: FlaskConical, duration: "4-6 days", color: "sky" },
  { id: 4, label: "Deploy", icon: Rocket, duration: "1 day", color: "amber" },
]

const colorMap = {
  emerald: { bg: 'rgba(110, 160, 140, 0.08)', border: 'rgba(110, 160, 140, 0.18)', text: 'rgb(145, 195, 175)', glow: 'rgba(110, 160, 140, 0.12)' },
  purple: { bg: 'rgba(150, 130, 180, 0.08)', border: 'rgba(150, 130, 180, 0.18)', text: 'rgb(185, 170, 210)', glow: 'rgba(150, 130, 180, 0.12)' },
  rose: { bg: 'rgba(180, 120, 135, 0.08)', border: 'rgba(180, 120, 135, 0.18)', text: 'rgb(210, 155, 170)', glow: 'rgba(180, 120, 135, 0.12)' },
  sky: { bg: 'rgba(120, 160, 190, 0.08)', border: 'rgba(120, 160, 190, 0.18)', text: 'rgb(155, 190, 215)', glow: 'rgba(120, 160, 190, 0.12)' },
  amber: { bg: 'rgba(190, 165, 110, 0.08)', border: 'rgba(190, 165, 110, 0.18)', text: 'rgb(215, 195, 145)', glow: 'rgba(190, 165, 110, 0.12)' },
}

// Animated cursor component for ConnectionsUI
function ConnectionCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg 
        width="20" 
        height="20" 
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

// Animation timeline for ConnectionsUI (in ms, cumulative)
const CONNECTION_TIMELINE = {
  idle: 0,
  moveToCard: 2500,      // 0-2500: idle (viewing dashboard - 2.5s)
  hover: 3200,           // 2500-3200: cursor moves to card (0.7s)
  click: 3600,           // 3200-3600: hover state (0.4s)
  oauthOpen: 3800,       // 3600-3800: click animation (0.2s)
  moveToAuth: 5200,      // 3800-5200: viewing oauth modal (1.4s)
  clickAuth: 5900,       // 5200-5900: cursor moves to auth button (0.7s)
  connecting: 6100,      // 5900-6100: click animation (0.2s)
  connected: 6800,       // 6100-6800: connecting spinner (0.7s)
  end: 9000,             // 6800-9000: connected success (2.2s pause)
}

// Product mockup components
function ConnectionsUI({ progress }: { progress: number }) {
  const [phase, setPhase] = useState<'idle' | 'hovering' | 'clicked' | 'oauth' | 'connecting' | 'connected'>('idle')
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 280 })
  const [clicking, setClicking] = useState(false)
  const [hubspotConnected, setHubspotConnected] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hubspotCardRef = useRef<HTMLDivElement>(null)
  const authorizeButtonRef = useRef<HTMLButtonElement>(null)
  const lastProgressRef = useRef(0)

  const getElementCenter = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current || !containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2,
    }
  }, [])

  // Update animation state based on progress (0-100)
  useEffect(() => {
    const elapsed = (progress / 100) * CONNECTION_TIMELINE.end
    const prevElapsed = (lastProgressRef.current / 100) * CONNECTION_TIMELINE.end
    lastProgressRef.current = progress

    // Determine current phase based on elapsed time
    if (elapsed < CONNECTION_TIMELINE.moveToCard) {
      // Idle - viewing dashboard
      setPhase('idle')
      setHubspotConnected(false)
      setCursorPos({ x: 300, y: 280 })
      setClicking(false)
    } else if (elapsed < CONNECTION_TIMELINE.hover) {
      // Moving to card - trigger cursor move once
      if (prevElapsed < CONNECTION_TIMELINE.moveToCard) {
        const hubspotPos = getElementCenter(hubspotCardRef)
        if (hubspotPos) setCursorPos(hubspotPos)
      }
      setPhase('idle')
    } else if (elapsed < CONNECTION_TIMELINE.click) {
      // Hover state
      setPhase('hovering')
      setClicking(false)
    } else if (elapsed < CONNECTION_TIMELINE.oauthOpen) {
      // Click animation - trigger once
      if (prevElapsed < CONNECTION_TIMELINE.click) {
        setClicking(true)
        setTimeout(() => setClicking(false), 100)
      }
      setPhase('clicked')
    } else if (elapsed < CONNECTION_TIMELINE.clickAuth) {
      // OAuth modal open - move cursor to auth button midway
      if (prevElapsed < CONNECTION_TIMELINE.moveToAuth) {
        const authPos = getElementCenter(authorizeButtonRef)
        if (authPos) setCursorPos(authPos)
      }
      setPhase('oauth')
    } else if (elapsed < CONNECTION_TIMELINE.connecting) {
      // Click authorize - trigger once
      if (prevElapsed < CONNECTION_TIMELINE.clickAuth) {
        setClicking(true)
        setTimeout(() => setClicking(false), 100)
      }
      setPhase('connecting')
    } else if (elapsed < CONNECTION_TIMELINE.connected) {
      // Connecting spinner
      setPhase('connecting')
    } else {
      // Connected! (holds for 1.2s before loop)
      setHubspotConnected(true)
      setPhase('connected')
    }
  }, [progress, getElementCenter])

  const integrations = [
    { name: "Zendesk", Icon: SiZendesk, connected: true, color: "#03363D", synced: "2m ago" },
    { name: "Intercom", Icon: SiIntercom, connected: true, color: "#016FFF", synced: "5m ago" },
    { name: "Slack", Icon: SlackIcon, connected: true, color: undefined, synced: "1m ago" },
    { name: "Notion", Icon: NotionIcon, connected: true, color: "#ffffff", synced: "3m ago" },
    { name: "HubSpot", Icon: SiHubspot, connected: hubspotConnected, color: "#FF7A59", synced: "just now", isTarget: true },
    { name: "Jira", Icon: JiraIcon, connected: true, color: undefined, synced: "4m ago" },
  ]

  const connectedCount = integrations.filter(i => i.connected).length

  return (
    <div ref={containerRef} className="h-full flex flex-col relative">
      {/* Cursor */}
      <ConnectionCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />

      {/* App header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
            <Link2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-white">Connections</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-zinc-500">{connectedCount} connected</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Connected", value: connectedCount.toString(), color: "emerald" },
            { label: "Syncing", value: connectedCount.toString(), color: "sky" },
            { label: "Data Sources", value: "12", color: "white" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-lg font-bold ${
                stat.color === 'emerald' ? 'text-emerald-400' : 
                stat.color === 'sky' ? 'text-sky-400' : 'text-white'
              }`}>{stat.value}</div>
              <div className="text-[9px] text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 overflow-auto custom-scrollbar" style={scrollbarStyles}>
        <div className="grid grid-cols-2 gap-2">
          {integrations.map((int, idx) => (
            <motion.div
              key={int.name}
              ref={int.isTarget ? hubspotCardRef : null}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + idx * 0.05 }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                int.isTarget && phase === 'hovering' ? 'ring-1 ring-[#FF7A59]/40' : ''
              } ${
                int.connected 
                  ? 'border-white/5 bg-white/[0.02]' 
                  : 'border-dashed border-white/10 bg-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: int.connected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <int.Icon className="w-4 h-4" style={int.color ? { color: int.color } : undefined} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{int.name}</div>
                  <div className="text-[9px] text-zinc-500">
                    {int.connected ? `Synced ${int.synced}` : "Not connected"}
                  </div>
                </div>
                {int.connected ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom status */}
      <div className="px-4 py-2.5 border-t border-white/5 bg-emerald-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-emerald-400">All systems syncing</span>
          </div>
          <span className="text-[9px] text-zinc-500">Last sync: 1m ago</span>
        </div>
      </div>

      {/* OAuth Modal */}
      <AnimatePresence>
        {(phase === 'oauth' || phase === 'connecting' || phase === 'connected') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-40 rounded-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-[280px] rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1a1a1f 0%, #0f0f12 100%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Modal header */}
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/20 flex items-center justify-center">
                  <SiHubspot className="w-4 h-4 text-[#FF7A59]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Connect HubSpot</div>
                  <div className="text-[10px] text-zinc-500">OAuth 2.0</div>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-4">
                {phase === 'connected' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-sm font-medium text-white mb-1">Connected!</div>
                    <div className="text-[10px] text-zinc-500">Syncing your data...</div>
                  </motion.div>
                ) : phase === 'connecting' ? (
                  <div className="text-center py-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 rounded-full border-2 border-[#FF7A59]/20 border-t-[#FF7A59] mx-auto mb-3"
                    />
                    <div className="text-[11px] text-zinc-400">Connecting...</div>
                  </div>
                ) : (
                  <>
                    <div className="text-[11px] text-zinc-400 mb-3">
                      Duckie will access:
                    </div>
                    <div className="space-y-2 mb-4">
                      {["Contact records", "Ticket data", "Company info"].map((perm, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px]">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-zinc-300">{perm}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      ref={authorizeButtonRef}
                      className="w-full py-2.5 rounded-lg bg-[#FF7A59] text-white text-xs font-medium hover:bg-[#ff6a45] transition-colors"
                    >
                      Authorize Connection
                    </button>
                    <div className="text-[9px] text-zinc-600 text-center mt-2">
                      You can revoke access anytime
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Animation timeline for TrainUI (in ms, cumulative)
const TRAIN_TIMELINE = {
  idle: 0,
  moveToNotion: 2000,     // 0-2000: idle (viewing dashboard - 2s)
  hoverNotion: 2500,      // 2000-2500: cursor moves to Notion
  clickNotion: 2800,      // 2500-2800: hover state
  syncing: 3000,          // 2800-3000: click animation
  syncComplete: 4500,     // 3000-4500: syncing animation
  moveToGuideline: 5200,  // 4500-5200: sync complete, pause
  hoverGuideline: 5700,   // 5200-5700: cursor moves to guideline
  clickGuideline: 6000,   // 5700-6000: hover state
  editingGuideline: 6200, // 6000-6200: click animation
  typingGuideline: 7500,  // 6200-7500: editing/typing
  saveGuideline: 7800,    // 7500-7800: save animation
  end: 9000,              // 7800-9000: success state (1.2s pause)
}

// Cursor component for TrainUI
function TrainCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg 
        width="20" 
        height="20" 
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

function TrainUI({ progress }: { progress: number }) {
  const [phase, setPhase] = useState<'idle' | 'hoverNotion' | 'syncing' | 'syncComplete' | 'hoverGuideline' | 'editingGuideline' | 'saved'>('idle')
  const [cursorPos, setCursorPos] = useState({ x: 350, y: 300 })
  const [clicking, setClicking] = useState(false)
  const [notionSynced, setNotionSynced] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [guidelineText, setGuidelineText] = useState("Be friendly and helpful")
  const [articleCount, setArticleCount] = useState(142)
  const containerRef = useRef<HTMLDivElement>(null)
  const notionCardRef = useRef<HTMLDivElement>(null)
  const guidelineCardRef = useRef<HTMLDivElement>(null)
  const lastProgressRef = useRef(0)

  const getElementCenter = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current || !containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2,
    }
  }, [])

  // Update animation state based on progress (0-100)
  useEffect(() => {
    const elapsed = (progress / 100) * TRAIN_TIMELINE.end
    const prevElapsed = (lastProgressRef.current / 100) * TRAIN_TIMELINE.end
    lastProgressRef.current = progress

    if (elapsed < TRAIN_TIMELINE.moveToNotion) {
      setPhase('idle')
      setNotionSynced(false)
      setSyncProgress(0)
      setGuidelineText("Be friendly and helpful")
      setArticleCount(142)
      setCursorPos({ x: 350, y: 300 })
      setClicking(false)
    } else if (elapsed < TRAIN_TIMELINE.hoverNotion) {
      if (prevElapsed < TRAIN_TIMELINE.moveToNotion) {
        const notionPos = getElementCenter(notionCardRef)
        if (notionPos) setCursorPos(notionPos)
      }
      setPhase('idle')
    } else if (elapsed < TRAIN_TIMELINE.clickNotion) {
      setPhase('hoverNotion')
      setClicking(false)
    } else if (elapsed < TRAIN_TIMELINE.syncing) {
      if (prevElapsed < TRAIN_TIMELINE.clickNotion) {
        setClicking(true)
        setTimeout(() => setClicking(false), 100)
      }
      setPhase('syncing')
    } else if (elapsed < TRAIN_TIMELINE.syncComplete) {
      setPhase('syncing')
      // Animate sync progress
      const syncElapsed = elapsed - TRAIN_TIMELINE.syncing
      const syncDuration = TRAIN_TIMELINE.syncComplete - TRAIN_TIMELINE.syncing
      setSyncProgress(Math.min(100, (syncElapsed / syncDuration) * 100))
    } else if (elapsed < TRAIN_TIMELINE.moveToGuideline) {
      setPhase('syncComplete')
      setNotionSynced(true)
      setSyncProgress(100)
      setArticleCount(156)
    } else if (elapsed < TRAIN_TIMELINE.hoverGuideline) {
      if (prevElapsed < TRAIN_TIMELINE.moveToGuideline) {
        const guidelinePos = getElementCenter(guidelineCardRef)
        if (guidelinePos) setCursorPos(guidelinePos)
      }
      setPhase('syncComplete')
    } else if (elapsed < TRAIN_TIMELINE.clickGuideline) {
      setPhase('hoverGuideline')
      setClicking(false)
    } else if (elapsed < TRAIN_TIMELINE.editingGuideline) {
      if (prevElapsed < TRAIN_TIMELINE.clickGuideline) {
        setClicking(true)
        setTimeout(() => setClicking(false), 100)
      }
      setPhase('editingGuideline')
    } else if (elapsed < TRAIN_TIMELINE.typingGuideline) {
      setPhase('editingGuideline')
      // Animate typing
      const fullText = "Be friendly, helpful, and always offer next steps"
      const typeElapsed = elapsed - TRAIN_TIMELINE.editingGuideline
      const typeDuration = TRAIN_TIMELINE.typingGuideline - TRAIN_TIMELINE.editingGuideline
      const charCount = Math.floor((typeElapsed / typeDuration) * fullText.length)
      setGuidelineText(fullText.substring(0, charCount))
    } else if (elapsed < TRAIN_TIMELINE.saveGuideline) {
      setGuidelineText("Be friendly, helpful, and always offer next steps")
      if (prevElapsed < TRAIN_TIMELINE.typingGuideline) {
        setClicking(true)
        setTimeout(() => setClicking(false), 100)
      }
      setPhase('saved')
    } else {
      setPhase('saved')
    }
  }, [progress, getElementCenter])

  const knowledgeSources = [
    { name: "Help Center", icon: "🌐", articles: 89, synced: true },
    { name: "Notion", icon: NotionIcon, articles: notionSynced ? 14 : 0, synced: notionSynced, isTarget: true },
    { name: "Confluence", icon: "📚", articles: 53, synced: true },
  ]

  const guidelines = [
    { id: 1, title: "Tone & Voice", description: guidelineText, isTarget: true },
    { id: 2, title: "Escalation Rules", description: "Escalate billing issues over $500" },
    { id: 3, title: "Response Format", description: "Keep responses under 3 paragraphs" },
  ]

  return (
    <div ref={containerRef} className="h-full flex flex-col relative">
      <TrainCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />

      {/* App header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="text-sm font-medium text-white">Training</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500">{articleCount} articles indexed</span>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Knowledge Articles", value: articleCount.toString(), color: "purple" },
            { label: "Guidelines", value: "12", color: "emerald" },
            { label: "Runbooks", value: "8", color: "white" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-lg font-bold ${
                stat.color === 'purple' ? 'text-purple-400' : 
                stat.color === 'emerald' ? 'text-emerald-400' : 'text-white'
              }`}>{stat.value}</div>
              <div className="text-[9px] text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content - Two columns */}
      <div className="flex-1 p-3 overflow-auto custom-scrollbar grid grid-cols-2 gap-3" style={scrollbarStyles}>
        {/* Left: Knowledge Sources */}
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Knowledge Sources</div>
          <div className="space-y-2">
            {knowledgeSources.map((source, idx) => {
              const isNotion = source.isTarget
              const isStringIcon = typeof source.icon === 'string'
              
              return (
                <motion.div
                  key={source.name}
                  ref={isNotion ? notionCardRef : null}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isNotion && phase === 'hoverNotion' ? 'ring-1 ring-purple-500/40' : ''
                  } ${
                    isNotion && (phase === 'syncing') ? 'border-purple-500/30 bg-purple-500/5' : 
                    'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      {isStringIcon ? (
                        <span className="text-sm">{source.icon as string}</span>
                      ) : (
                        <source.icon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white">{source.name}</div>
                      <div className="text-[9px] text-zinc-500">
                        {isNotion && phase === 'syncing' ? (
                          <span className="text-purple-400">Syncing... {Math.round(syncProgress)}%</span>
                        ) : (
                          `${source.articles} articles`
                        )}
                      </div>
                    </div>
                    {source.synced ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : isNotion && phase === 'syncing' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3.5 h-3.5 border border-purple-400/30 border-t-purple-400 rounded-full"
                      />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                    )}
                  </div>
                  {/* Sync progress bar */}
                  {isNotion && phase === 'syncing' && (
                    <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${syncProgress}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Guidelines */}
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Guidelines</div>
          <div className="space-y-2">
            {guidelines.map((guideline, idx) => (
              <motion.div
                key={guideline.id}
                ref={guideline.isTarget ? guidelineCardRef : null}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className={`p-2.5 rounded-xl border transition-all ${
                  guideline.isTarget && phase === 'hoverGuideline' ? 'ring-1 ring-purple-500/40' : ''
                } ${
                  guideline.isTarget && (phase === 'editingGuideline' || phase === 'saved') 
                    ? 'border-purple-500/30 bg-purple-500/5' 
                    : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-medium text-white">{guideline.title}</div>
                  {guideline.isTarget && phase === 'saved' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-[9px] text-emerald-400">Saved</span>
                    </motion.div>
                  )}
                </div>
                <div className={`text-[10px] ${
                  guideline.isTarget && phase === 'editingGuideline' ? 'text-white' : 'text-zinc-500'
                }`}>
                  {guideline.description}
                  {guideline.isTarget && phase === 'editingGuideline' && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-purple-400"
                    >|</motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom status */}
      <div className="px-4 py-2.5 border-t border-white/5 bg-purple-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {phase === 'saved' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400">All changes saved</span>
              </>
            ) : phase === 'syncing' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3.5 h-3.5 border border-purple-400/30 border-t-purple-400 rounded-full"
                />
                <span className="text-[10px] text-purple-400">Syncing knowledge...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] text-purple-400">Training data ready</span>
              </>
            )}
          </div>
          <span className="text-[9px] text-zinc-500">Last updated: 2m ago</span>
        </div>
      </div>
    </div>
  )
}

// Animation timeline for BuildUI (in ms, cumulative)
const BUILD_TIMELINE = {
  idle: 0,
  scrolling: 1800,        // 0-1800: viewing runbook
  scrollDone: 3000,       // 1800-3000: scrolling through runbook
  moveToWorkflow: 3500,   // 3000-3500: pause at workflow ref
  hoverWorkflow: 4000,    // 3500-4000: cursor moves to workflow
  clickWorkflow: 4300,    // 4000-4300: hover
  transitionToWf: 4500,   // 4300-4500: click
  viewingWorkflow: 6500,  // 4500-6500: viewing workflow (2s)
  moveToRunbook: 7000,    // 6500-7000: pause
  hoverRunbook: 7500,     // 7000-7500: cursor moves to runbook node
  clickRunbook: 7800,     // 7500-7800: hover
  transitionToRb: 8000,   // 7800-8000: click
  viewingRunbook2: 9000,  // 8000-9000: viewing second runbook
  end: 9000,
}

// Cursor component for BuildUI
function BuildCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg 
        width="20" 
        height="20" 
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

// Tool badge component
function ToolBadge({ children, color = "zinc" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    zinc: "bg-zinc-800 text-zinc-300 border-zinc-700",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    sky: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  }
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium border ${colors[color]}`}>
      <MessageSquare className="w-2.5 h-2.5" />
      {children}
    </span>
  )
}

function BuildUI({ progress }: { progress: number }) {
  const [view, setView] = useState<'runbook' | 'workflow' | 'runbook2'>('runbook')
  const [cursorPos, setCursorPos] = useState({ x: 350, y: 280 })
  const [clicking, setClicking] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const workflowRefRef = useRef<HTMLDivElement>(null)
  const runbookNodeRef = useRef<HTMLDivElement>(null)
  const lastProgressRef = useRef(0)

  const getElementCenter = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current || !containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,
      y: elementRect.top - containerRect.top + elementRect.height / 2,
    }
  }, [])

  useEffect(() => {
    const elapsed = (progress / 100) * BUILD_TIMELINE.end
    const prevElapsed = (lastProgressRef.current / 100) * BUILD_TIMELINE.end
    
    lastProgressRef.current = progress

    if (elapsed < BUILD_TIMELINE.scrolling) {
      setView('runbook')
      setScrollY(0)
      setCursorPos({ x: 350, y: 280 })
    } else if (elapsed < BUILD_TIMELINE.scrollDone) {
      // Scroll animation
      const scrollProgress = (elapsed - BUILD_TIMELINE.scrolling) / (BUILD_TIMELINE.scrollDone - BUILD_TIMELINE.scrolling)
      setScrollY(scrollProgress * 120)
    } else if (elapsed < BUILD_TIMELINE.moveToWorkflow) {
      setScrollY(120)
    } else if (elapsed < BUILD_TIMELINE.hoverWorkflow) {
      if (prevElapsed < BUILD_TIMELINE.moveToWorkflow) {
        const pos = getElementCenter(workflowRefRef)
        if (pos) setCursorPos(pos)
      }
    } else if (elapsed < BUILD_TIMELINE.clickWorkflow) {
      setHoveredElement('workflow')
    } else if (elapsed < BUILD_TIMELINE.transitionToWf) {
      if (prevElapsed < BUILD_TIMELINE.clickWorkflow) {
        setClicking(true)
        setTimeout(() => setClicking(false), 100)
      }
    } else if (elapsed < BUILD_TIMELINE.viewingWorkflow) {
      setView('workflow')
      setHoveredElement(null)
      setCursorPos({ x: 350, y: 200 })
    } else if (elapsed < BUILD_TIMELINE.moveToRunbook) {
      // Pause viewing workflow
    } else if (elapsed < BUILD_TIMELINE.hoverRunbook) {
      if (prevElapsed < BUILD_TIMELINE.moveToRunbook) {
        const pos = getElementCenter(runbookNodeRef)
        if (pos) setCursorPos(pos)
      }
    } else if (elapsed < BUILD_TIMELINE.clickRunbook) {
      setHoveredElement('runbookNode')
    } else if (elapsed < BUILD_TIMELINE.transitionToRb) {
      if (prevElapsed < BUILD_TIMELINE.clickRunbook) {
        setClicking(true)
        setTimeout(() => setClicking(false), 100)
      }
    } else {
      setView('runbook2')
      setHoveredElement(null)
      setScrollY(0)
      setCursorPos({ x: 350, y: 200 })
    }
  }, [progress, getElementCenter])

  // Runbook content renderer
  const renderRunbookContent = (title: string, isSecond: boolean, currentScrollY: number) => (
    <div className="h-full flex flex-col">
      {/* Header with back button and tools */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        {/* Tools row */}
        <div className="flex flex-wrap gap-1.5">
          <ToolBadge>Responder</ToolBadge>
          <ToolBadge color="sky">Verify account</ToolBadge>
          <ToolBadge color="emerald">Check status</ToolBadge>
          <ToolBadge color="amber">Escalator</ToolBadge>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-hidden relative">
        <div 
          className="p-4 space-y-4 absolute inset-x-0"
          style={{ 
            transform: `translateY(${-currentScrollY}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Use when */}
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Use when</div>
            <div className="text-xs text-zinc-300">
              {isSecond 
                ? "A user needs help understanding their billing or charges."
                : "A user cannot log in or requests help resetting their password."
              }
            </div>
          </div>

          {/* Goal */}
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Goal</div>
            <div className="text-xs text-zinc-300">
              {isSecond
                ? "Help the user understand their charges and resolve billing concerns."
                : "Help the user securely reset their password with minimal friction."
              }
            </div>
          </div>

          {/* Section 1 */}
          <div className="pt-2 border-t border-white/5">
            <div className="text-sm font-medium text-white mb-2">1. Collect required info</div>
            <div className="text-xs text-zinc-400 mb-2">
              Use <ToolBadge>Responder</ToolBadge> to gather the following:
            </div>
            <ul className="text-xs text-zinc-400 space-y-1 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">•</span>
                <span>Account email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">•</span>
                <span>Product or app name</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-600">•</span>
                <span>Error message shown (if any)</span>
              </li>
            </ul>
          </div>

          {/* Section 2 with workflow reference */}
          <div className="pt-2 border-t border-white/5">
            <div className="text-sm font-medium text-white mb-2">2. Verify and process</div>
            <div className="text-xs text-zinc-400 mb-3">
              Follow the verification flow to confirm identity:
            </div>
            
            {/* Workflow reference */}
            {!isSecond && (
              <div
                ref={workflowRefRef}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  hoveredElement === 'workflow' 
                    ? 'border-rose-500/40 bg-rose-500/10 ring-1 ring-rose-500/30' 
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-rose-500/20 flex items-center justify-center">
                    <GitBranch className="w-3 h-3 text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-medium text-white">Identity Verification</div>
                    <div className="text-[9px] text-zinc-500">Workflow • 4 nodes</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </div>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="pt-2 border-t border-white/5">
            <div className="text-sm font-medium text-white mb-2">3. Complete or escalate</div>
            <div className="text-xs text-zinc-400">
              If verified, use <ToolBadge color="emerald">Check status</ToolBadge> then proceed. 
              Otherwise, use <ToolBadge color="amber">Escalator</ToolBadge> to hand off.
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Workflow view with visual graph
  const renderWorkflowContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-rose-500/20 flex items-center justify-center">
          <GitBranch className="w-3.5 h-3.5 text-rose-400" />
        </div>
        <span className="text-sm font-medium text-white">Identity Verification</span>
        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Workflow</span>
      </div>

      {/* Canvas with dot grid */}
      <div 
        className="flex-1 relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Centered workflow container */}
        <div className="relative" style={{ width: 520, height: 200 }}>
          {/* SVG layer for edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {/* Draw lines first */}
            {/* Start to Verify Email - horizontal line */}
            <line x1="72" y1="100" x2="150" y2="100" stroke="#f59e0b" strokeWidth="2" />
            
            {/* Verify Email to Responder (top branch) - curved path */}
            <path 
              d="M 265 100 C 305 100, 325 40, 380 40" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Verify Email to Billing Help (bottom branch) - curved path */}
            <path 
              d="M 265 100 C 305 100, 325 160, 380 160" 
              stroke="#10b981" 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Draw circles on top of lines */}
            <circle cx="72" cy="100" r="4" fill="#f59e0b" />
            <circle cx="150" cy="100" r="4" fill="#f59e0b" />
            <circle cx="265" cy="100" r="5" fill="#f59e0b" />
            <circle cx="380" cy="40" r="4" fill="rgba(255,255,255,0.5)" />
            <circle cx="380" cy="160" r="4" fill="#10b981" />
          </svg>

          {/* Nodes layer */}
          {/* Start node */}
          <div 
            className="absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1f] border border-white/10"
            style={{ left: 0, top: 85 }}
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white">Start</span>
          </div>

          {/* Verify Email node */}
          <div 
            className="absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1f] border border-amber-500/30"
            style={{ left: 150, top: 85 }}
          >
            <div className="w-4 h-4 rounded bg-amber-500/20 flex items-center justify-center">
              <span className="text-[10px]">⚙️</span>
            </div>
            <span className="text-xs text-white">Verify Email</span>
          </div>

          {/* Responder node (top) */}
          <div 
            className="absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1f] border border-white/10"
            style={{ left: 380, top: 25 }}
          >
            <MessageSquare className="w-4 h-4 text-zinc-400" />
            <span className="text-xs text-white">Responder</span>
          </div>

          {/* Billing Help node (bottom, clickable) */}
          <div
            ref={runbookNodeRef}
            className={`absolute flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1a1f] border transition-all cursor-pointer ${
              hoveredElement === 'runbookNode'
                ? 'border-emerald-500/40 ring-1 ring-emerald-500/30'
                : 'border-emerald-500/30'
            }`}
            style={{ left: 380, top: 145 }}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white">Billing Help</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="h-full flex flex-col relative">
      <BuildCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
      
      <AnimatePresence mode="wait">
        {view === 'runbook' && (
          <motion.div
            key="runbook"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            {renderRunbookContent("Password Reset", false, scrollY)}
          </motion.div>
        )}
        {view === 'workflow' && (
          <motion.div
            key="workflow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderWorkflowContent()}
          </motion.div>
        )}
        {view === 'runbook2' && (
          <motion.div
            key="runbook2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderRunbookContent("Billing Help", true, 0)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Animation timeline for TestUI (in ms, cumulative)
const TEST_TIMELINE = {
  idle: 0,
  moveToRunButton: 800,
  clickRunButton: 1000,
  testsRunning: 1200,
  testsComplete: 4500,
  moveToResult: 5000,
  clickResult: 5200,
  viewResult: 5500,
  moveToScore: 7000,
  clickScore: 7200,
  scoreSubmitted: 7500,
  end: 9000,
}

// Cursor component for TestUI
function TestCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg 
        width="20" 
        height="20" 
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

function TestUI({ progress }: { progress: number }) {
  const [testsRunning, setTestsRunning] = useState(false)
  const [testsComplete, setTestsComplete] = useState(false)
  const [completedTests, setCompletedTests] = useState(0)
  const [selectedResult, setSelectedResult] = useState<number | null>(null)
  const [scoreSubmitted, setScoreSubmitted] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 400, y: 200 })
  const [clicking, setClicking] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const runButtonRef = useRef<HTMLButtonElement>(null)
  const resultRowRef = useRef<HTMLDivElement>(null)
  const scoreButtonRef = useRef<HTMLButtonElement>(null)
  const lastProgressRef = useRef(0)
  const totalTests = 127

  const testResults = [
    { id: 'TKT-8921', query: 'Password reset not working', expected: 'Reset link sent', actual: 'Reset link sent', score: 98, status: 'pass' },
    { id: 'TKT-8922', query: 'Billing inquiry - wrong charge', expected: 'Refund processed', actual: 'Refund processed', score: 95, status: 'pass' },
    { id: 'TKT-8923', query: 'Cancel subscription request', expected: 'Cancellation confirmed', actual: 'Retention offer made', score: 72, status: 'review' },
    { id: 'TKT-8924', query: 'Product not delivered', expected: 'Tracking provided', actual: 'Tracking provided', score: 96, status: 'pass' },
    { id: 'TKT-8925', query: 'Feature request - dark mode', expected: 'Logged for product', actual: 'Logged for product', score: 94, status: 'pass' },
  ]

  const getElementCenter = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current || !containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2 - 10,
      y: elementRect.top - containerRect.top + elementRect.height / 2 - 10,
    }
  }, [])

  // Animate tests completing
  useEffect(() => {
    if (!testsRunning || testsComplete) return
    
    const interval = setInterval(() => {
      setCompletedTests(prev => {
        if (prev >= totalTests) {
          clearInterval(interval)
          return totalTests
        }
        return prev + Math.floor(Math.random() * 8) + 3
      })
    }, 80)

    return () => clearInterval(interval)
  }, [testsRunning, testsComplete])

  // Main animation timeline
  useEffect(() => {
    const elapsed = (progress / 100) * TEST_TIMELINE.end
    const prevElapsed = (lastProgressRef.current / 100) * TEST_TIMELINE.end
    lastProgressRef.current = progress

    // Move to run button
    if (elapsed >= TEST_TIMELINE.moveToRunButton && prevElapsed < TEST_TIMELINE.moveToRunButton) {
      const pos = getElementCenter(runButtonRef)
      if (pos) setCursorPos(pos)
    }

    // Click run button
    if (elapsed >= TEST_TIMELINE.clickRunButton && prevElapsed < TEST_TIMELINE.clickRunButton) {
      setClicking(true)
      setTimeout(() => setClicking(false), 100)
    }

    // Start tests
    if (elapsed >= TEST_TIMELINE.testsRunning && prevElapsed < TEST_TIMELINE.testsRunning) {
      setTestsRunning(true)
    }

    // Tests complete
    if (elapsed >= TEST_TIMELINE.testsComplete && prevElapsed < TEST_TIMELINE.testsComplete) {
      setTestsComplete(true)
      setCompletedTests(totalTests)
    }

    // Move to result row
    if (elapsed >= TEST_TIMELINE.moveToResult && prevElapsed < TEST_TIMELINE.moveToResult) {
      const pos = getElementCenter(resultRowRef)
      if (pos) setCursorPos(pos)
    }

    // Click result
    if (elapsed >= TEST_TIMELINE.clickResult && prevElapsed < TEST_TIMELINE.clickResult) {
      setClicking(true)
      setTimeout(() => setClicking(false), 100)
    }

    // View result detail
    if (elapsed >= TEST_TIMELINE.viewResult && prevElapsed < TEST_TIMELINE.viewResult) {
      setSelectedResult(2) // The "review" item
    }

    // Move to score button
    if (elapsed >= TEST_TIMELINE.moveToScore && prevElapsed < TEST_TIMELINE.moveToScore) {
      const pos = getElementCenter(scoreButtonRef)
      if (pos) setCursorPos(pos)
    }

    // Click score
    if (elapsed >= TEST_TIMELINE.clickScore && prevElapsed < TEST_TIMELINE.clickScore) {
      setClicking(true)
      setTimeout(() => setClicking(false), 100)
    }

    // Score submitted
    if (elapsed >= TEST_TIMELINE.scoreSubmitted && prevElapsed < TEST_TIMELINE.scoreSubmitted) {
      setScoreSubmitted(true)
    }
  }, [progress, getElementCenter])

  return (
    <div ref={containerRef} className="h-full flex relative">
      <TestCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />

      {/* Left sidebar - Test config */}
      <div className="w-48 border-r border-white/5 p-3 flex flex-col">
        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Test Suite</div>
        <div className="space-y-1.5 mb-4">
          {[
            { name: 'Historic Tickets', count: 127, selected: true },
            { name: 'Edge Cases', count: 34 },
            { name: 'Regression', count: 56 },
          ].map((suite, idx) => (
            <div 
              key={idx}
              className={`px-2.5 py-2 rounded-lg text-xs cursor-pointer transition-colors ${
                suite.selected 
                  ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20' 
                  : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{suite.name}</span>
                <span className={suite.selected ? 'text-sky-400' : 'text-zinc-600'}>{suite.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Agent</div>
        <div className="px-2.5 py-2 rounded-lg bg-white/5 text-xs text-zinc-300 mb-4">
          Support Agent v2.1
        </div>

        <div className="mt-auto">
          <button 
            ref={runButtonRef}
            className={`w-full py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
              testsRunning && !testsComplete
                ? 'bg-sky-500/20 text-sky-300'
                : 'bg-sky-500 text-white hover:bg-sky-600'
            }`}
          >
            {testsRunning && !testsComplete ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-3 h-3 border-2 border-sky-300 border-t-transparent rounded-full"
                />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Run Batch Test
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header with stats */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-sky-500/20 flex items-center justify-center">
              <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <span className="text-sm font-medium text-white">Batch Testing</span>
          </div>
          
          {testsRunning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4"
            >
              <div className="text-xs text-zinc-400">
                <span className="text-white font-medium">{Math.min(completedTests, totalTests)}</span> / {totalTests} tests
              </div>
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${(Math.min(completedTests, totalTests) / totalTests) * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Content area with optional right panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Results area */}
          <div className="flex-1 overflow-auto custom-scrollbar" style={scrollbarStyles}>
            {!testsComplete ? (
              <div className="h-full flex items-center justify-center">
                {testsRunning ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <FlaskConical className="w-8 h-8 text-sky-400" />
                    </motion.div>
                    <div className="text-sm text-white mb-2">Running tests on historic tickets...</div>
                    <div className="text-xs text-zinc-500">Evaluating agent responses against expected outcomes</div>
                  </div>
                ) : (
                  <div className="text-center text-zinc-500">
                    <FlaskConical className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <div className="text-sm">Select a test suite and click Run</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3">
                {/* Summary cards */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { label: 'Total', value: '127', color: 'zinc' },
                    { label: 'Passed', value: '119', color: 'emerald' },
                    { label: 'Failed', value: '3', color: 'red' },
                    { label: 'Review', value: '5', color: 'amber' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-2 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                      <div className={`text-base font-semibold ${
                        stat.color === 'emerald' ? 'text-emerald-400' :
                        stat.color === 'red' ? 'text-red-400' :
                        stat.color === 'amber' ? 'text-amber-400' :
                        'text-white'
                      }`}>{stat.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Results table */}
                <div className="rounded-lg border border-white/5 overflow-hidden">
                  <div className="grid grid-cols-12 gap-2 px-3 py-1.5 bg-white/[0.02] text-[9px] text-zinc-500 uppercase tracking-wider">
                    <div className="col-span-2">Ticket</div>
                    <div className="col-span-5">Query</div>
                    <div className="col-span-3">Score</div>
                    <div className="col-span-2">Status</div>
                  </div>
                  {testResults.map((result, idx) => (
                    <motion.div
                      key={idx}
                      ref={idx === 2 ? resultRowRef : null}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className={`grid grid-cols-12 gap-2 px-3 py-2 border-t border-white/5 text-xs cursor-pointer transition-colors ${
                        selectedResult === idx 
                          ? 'bg-sky-500/10 border-l-2 border-l-sky-500' 
                          : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="col-span-2 text-zinc-400 font-mono text-[10px]">{result.id}</div>
                      <div className="col-span-5 text-zinc-300 truncate text-[11px]">{result.query}</div>
                      <div className="col-span-3">
                        <span className={`font-medium ${
                          result.score >= 90 ? 'text-emerald-400' :
                          result.score >= 70 ? 'text-amber-400' :
                          'text-red-400'
                        }`}>{result.score}%</span>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          result.status === 'pass' ? 'bg-emerald-500/20 text-emerald-400' :
                          result.status === 'review' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {result.status === 'pass' ? '✓ Pass' : result.status === 'review' ? '? Review' : '✗ Fail'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right detail panel - slides in when result selected */}
          <AnimatePresence>
            {selectedResult !== null && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="border-l border-white/5 overflow-hidden flex-shrink-0"
              >
                <div className="w-[220px] h-full flex flex-col p-3">
                  {/* Header */}
                  <div className="mb-3">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Review Result</div>
                    <div className="text-sm font-medium text-white leading-tight">
                      {testResults[selectedResult].query}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">{testResults[selectedResult].id}</div>
                  </div>

                  {/* Score */}
                  <div className="mb-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-amber-400 uppercase tracking-wider">Confidence</span>
                      <span className="text-lg font-bold text-amber-400">{testResults[selectedResult].score}%</span>
                    </div>
                    <div className="h-1.5 bg-amber-500/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${testResults[selectedResult].score}%` }}
                      />
                    </div>
                  </div>

                  {/* Expected vs Actual */}
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="p-2 rounded-lg bg-white/[0.02]">
                      <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Expected</div>
                      <div className="text-[11px] text-zinc-300">{testResults[selectedResult].expected}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-sky-500/5 border border-sky-500/20">
                      <div className="text-[9px] text-sky-400 uppercase tracking-wider mb-1">Agent Response</div>
                      <div className="text-[11px] text-zinc-300">{testResults[selectedResult].actual}</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-2 mt-auto">
                    {!scoreSubmitted ? (
                      <>
                        <button 
                          ref={scoreButtonRef}
                          className="w-full py-2 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve Response
                        </button>
                        <button className="w-full py-2 rounded-lg text-xs bg-white/5 text-zinc-400 hover:bg-white/10 transition-colors">
                          Mark as Fail
                        </button>
                      </>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full py-2.5 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Response Approved
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Animation timeline for DeployUI (in ms, cumulative)
const DEPLOY_TIMELINE = {
  idle: 0,
  moveToDeployButton: 2000,
  clickDeployButton: 2300,
  deploying: 2500,
  deployed: 3500,
  showLiveFeed: 3800,
  ticket1: 4200,
  ticket1Resolved: 4900,
  ticket2: 5400,
  ticket2Resolved: 6100,
  ticket3: 6600,
  ticket3Resolved: 7300,
  ticket4: 7800,
  ticket4Resolved: 8500,
  end: 9000,
}

// Cursor component for DeployUI
function DeployCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      animate={{ x, y }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg 
        width="20" 
        height="20" 
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

function DeployUI({ progress }: { progress: number }) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [isDeployed, setIsDeployed] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 200 })
  const [clicking, setClicking] = useState(false)
  const [resolvedTickets, setResolvedTickets] = useState<number[]>([])
  const [activeTicket, setActiveTicket] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const deployButtonRef = useRef<HTMLButtonElement>(null)
  const ticketFeedRef = useRef<HTMLDivElement>(null)
  const lastProgressRef = useRef(0)

  const liveTickets = [
    { id: 'TKT-9012', customer: 'Alex M.', query: 'How do I reset my password?', response: 'Reset link sent to email', time: '2s' },
    { id: 'TKT-9013', customer: 'Sarah K.', query: 'Refund for order #45231', response: 'Refund of $34.99 processed', time: '3s' },
    { id: 'TKT-9014', customer: 'Mike R.', query: 'Shipping status question', response: 'Tracking info provided', time: '2s' },
    { id: 'TKT-9015', customer: 'Emma L.', query: 'Cancel subscription', response: 'Subscription cancelled', time: '4s' },
  ]

  const getElementCenter = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current || !containerRef.current) return null
    const containerRect = containerRef.current.getBoundingClientRect()
    const elementRect = ref.current.getBoundingClientRect()
    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2 - 10,
      y: elementRect.top - containerRect.top + elementRect.height / 2 - 10,
    }
  }, [])

  // Main animation timeline
  useEffect(() => {
    const elapsed = (progress / 100) * DEPLOY_TIMELINE.end
    const prevElapsed = (lastProgressRef.current / 100) * DEPLOY_TIMELINE.end
    lastProgressRef.current = progress

    // Move to deploy button
    if (elapsed >= DEPLOY_TIMELINE.moveToDeployButton && prevElapsed < DEPLOY_TIMELINE.moveToDeployButton) {
      const pos = getElementCenter(deployButtonRef)
      if (pos) setCursorPos(pos)
    }

    // Click deploy button
    if (elapsed >= DEPLOY_TIMELINE.clickDeployButton && prevElapsed < DEPLOY_TIMELINE.clickDeployButton) {
      setClicking(true)
      setTimeout(() => setClicking(false), 100)
    }

    // Start deploying
    if (elapsed >= DEPLOY_TIMELINE.deploying && prevElapsed < DEPLOY_TIMELINE.deploying) {
      setIsDeploying(true)
    }

    // Deployed
    if (elapsed >= DEPLOY_TIMELINE.deployed && prevElapsed < DEPLOY_TIMELINE.deployed) {
      setIsDeploying(false)
      setIsDeployed(true)
      setCursorPos({ x: 500, y: 150 }) // Move cursor out of the way
    }

    // Tickets appearing and resolving
    if (elapsed >= DEPLOY_TIMELINE.ticket1 && prevElapsed < DEPLOY_TIMELINE.ticket1) setActiveTicket(0)
    if (elapsed >= DEPLOY_TIMELINE.ticket1Resolved && prevElapsed < DEPLOY_TIMELINE.ticket1Resolved) {
      setResolvedTickets(prev => [...prev, 0])
      setActiveTicket(null)
    }
    if (elapsed >= DEPLOY_TIMELINE.ticket2 && prevElapsed < DEPLOY_TIMELINE.ticket2) setActiveTicket(1)
    if (elapsed >= DEPLOY_TIMELINE.ticket2Resolved && prevElapsed < DEPLOY_TIMELINE.ticket2Resolved) {
      setResolvedTickets(prev => [...prev, 1])
      setActiveTicket(null)
    }
    if (elapsed >= DEPLOY_TIMELINE.ticket3 && prevElapsed < DEPLOY_TIMELINE.ticket3) setActiveTicket(2)
    if (elapsed >= DEPLOY_TIMELINE.ticket3Resolved && prevElapsed < DEPLOY_TIMELINE.ticket3Resolved) {
      setResolvedTickets(prev => [...prev, 2])
      setActiveTicket(null)
    }
    if (elapsed >= DEPLOY_TIMELINE.ticket4 && prevElapsed < DEPLOY_TIMELINE.ticket4) setActiveTicket(3)
    if (elapsed >= DEPLOY_TIMELINE.ticket4Resolved && prevElapsed < DEPLOY_TIMELINE.ticket4Resolved) {
      setResolvedTickets(prev => [...prev, 3])
      setActiveTicket(null)
    }
  }, [progress, getElementCenter])

  // Auto-scroll ticket feed as new tickets appear
  useEffect(() => {
    if (ticketFeedRef.current && (activeTicket !== null || resolvedTickets.length > 0)) {
      setTimeout(() => {
        ticketFeedRef.current?.scrollTo({
          top: ticketFeedRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
  }, [activeTicket, resolvedTickets])

  return (
    <div ref={containerRef} className="h-full flex relative">
      <DeployCursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />

      {/* Sidebar */}
      <div className="w-44 border-r border-white/5 flex flex-col bg-black/20">
        <div className="p-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Rocket className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-semibold text-white">Deployments</span>
          </div>
        </div>
        <div className="flex-1 p-2 space-y-1">
          <div className="px-2.5 py-2 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-[#03363D] flex items-center justify-center">
                <SiZendesk className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-white truncate">Zendesk</div>
                <div className="text-[8px] text-zinc-500">Support</div>
              </div>
              {isDeployed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
              )}
            </div>
          </div>
          <div className="px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors opacity-40">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-zinc-700 flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-zinc-400 truncate">Intercom</div>
                <div className="text-[8px] text-zinc-600">Not configured</div>
              </div>
            </div>
          </div>
          <div className="px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors opacity-40">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-zinc-700 flex items-center justify-center">
                <Mail className="w-3 h-3 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-zinc-400 truncate">Email</div>
                <div className="text-[8px] text-zinc-600">Not configured</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {!isDeployed ? (
          // Pre-deployment view
          <>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <SiZendesk className="w-4 h-4 text-[#03363D]" />
                <span className="text-xs font-medium text-white">Zendesk Deployment</span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">Ready</span>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              {isDeploying ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-3"
                  >
                    <Rocket className="w-6 h-6 text-amber-400" />
                  </motion.div>
                  <div className="text-sm text-white mb-1">Deploying...</div>
                  <div className="text-[10px] text-zinc-500">Connecting to Zendesk API</div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {/* Configuration summary */}
                  <div className="rounded-lg border border-white/5 overflow-hidden">
                    <div className="px-3 py-2 bg-white/[0.02] border-b border-white/5">
                      <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Configuration</span>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500">Agent</span>
                        <span className="text-[10px] text-white">Support Agent v1.2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500">Mode</span>
                        <span className="text-[10px] text-amber-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Auto-respond
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500">Guardrails</span>
                        <span className="text-[10px] text-emerald-400">3 active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500">Escalation</span>
                        <span className="text-[10px] text-white">Enabled</span>
                      </div>
                    </div>
                  </div>

                  {/* Pre-flight checks */}
                  <div className="rounded-lg border border-white/5 overflow-hidden">
                    <div className="px-3 py-2 bg-white/[0.02] border-b border-white/5">
                      <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Pre-flight Checks</span>
                    </div>
                    <div className="p-3 space-y-1.5">
                      {[
                        { label: 'API Connection', status: 'passed' },
                        { label: 'Authentication', status: 'passed' },
                        { label: 'Webhook Setup', status: 'passed' },
                        { label: 'Test Message', status: 'passed' },
                      ].map((check) => (
                        <div key={check.label} className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] text-zinc-400">{check.label}</span>
                          <span className="text-[9px] text-emerald-400 ml-auto">Passed</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deploy button */}
                  <button 
                    ref={deployButtonRef}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    Deploy to Production
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Post-deployment live view
          <>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
                <span className="text-xs font-medium text-white">Live</span>
                <span className="text-[9px] text-zinc-500">Zendesk</span>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-zinc-500">Resolved: <span className="text-emerald-400 font-medium">{resolvedTickets.length}</span></span>
                <span className="text-zinc-500">Avg: <span className="text-white">2.5s</span></span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 p-3 border-b border-white/5">
              {[
                { label: 'Today', value: resolvedTickets.length.toString(), color: 'white' },
                { label: 'Success', value: '100%', color: 'emerald' },
                { label: 'Avg Time', value: '2.5s', color: 'white' },
                { label: 'Escalated', value: '0', color: 'white' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-sm font-bold ${stat.color === 'emerald' ? 'text-emerald-400' : 'text-white'}`}>
                    {stat.value}
                  </div>
                  <div className="text-[8px] text-zinc-500 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Live ticket feed */}
            <div ref={ticketFeedRef} className="flex-1 p-3 overflow-auto" style={scrollbarStyles}>
              <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>Live Activity</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-emerald-400"
                />
              </div>
              <div className="space-y-2">
                {liveTickets.map((ticket, idx) => {
                  const isResolved = resolvedTickets.includes(idx)
                  const isActive = activeTicket === idx
                  const isVisible = isResolved || isActive

                  return (
                    <AnimatePresence key={ticket.id}>
                      {isVisible && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className={`p-2.5 rounded-lg border transition-colors ${
                            isResolved 
                              ? 'border-emerald-500/20 bg-emerald-500/5' 
                              : 'border-amber-500/30 bg-amber-500/5'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[9px] font-mono text-zinc-600">{ticket.id}</span>
                            <span className="text-[10px] text-white font-medium">{ticket.customer}</span>
                            {isResolved && (
                              <span className="text-[9px] text-zinc-500 ml-auto">{ticket.time}</span>
                            )}
                            {isActive && !isResolved && (
                              <motion.span
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="text-[9px] text-amber-400 ml-auto"
                              >
                                Processing...
                              </motion.span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-400 mb-1">{ticket.query}</div>
                          {isResolved && (
                            <motion.div
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[10px] text-emerald-400 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              {ticket.response}
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function ImplementationContent() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const STEP_DURATION = 9000

  const advanceStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = prev + 1
      if (next >= steps.length) return 0
      return next
    })
    setProgress(0)
  }, [])


  // Track progress for resuming
  const progressRef = useRef(0)
  progressRef.current = progress

  // Main animation loop
  useEffect(() => {
    if (isPaused || !isInView) return
    if (timerRef.current) clearTimeout(timerRef.current)

    const startTime = Date.now() - (progressRef.current / 100) * STEP_DURATION // Resume from current progress
    let rafId: number

    const tick = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / STEP_DURATION) * 100, 100)

      if (newProgress >= 100) {
        advanceStep()
      } else {
        setProgress(newProgress)
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeStep, advanceStep, isPaused, isInView])

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    setProgress(0)
  }

  const currentStep = steps[Math.max(0, activeStep)]
  const colors = colorMap[currentStep.color as keyof typeof colorMap]

  // Calculate total days progress
  // Connect: 1 day, Build: 4 days, Train: 3 days, Test: 5 days, Deploy: 1 day = 14 total
  const getTotalDays = () => {
    const daysByStep = [1, 5, 8, 13, 14] // Cumulative days
    const currentDays = daysByStep[activeStep] || 0
    const prevDays = activeStep > 0 ? daysByStep[activeStep - 1] : 0
    const stepDays = currentDays - prevDays
    return Math.round(prevDays + (stepDays * progress / 100))
  }

  return (
    <div className="relative py-28 lg:py-40">
      {/* Inject scrollbar styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarCSS }} />
      
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
                Implementation
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
              Enterprise-ready
              <br />
              <span className="text-zinc-500">in under 2 weeks</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-lg text-zinc-400 max-w-md lg:text-right"
            >
              {content.implementation.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Main content */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          {/* Step timeline */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((step, index) => {
              const stepColors = colorMap[step.color as keyof typeof colorMap]
              const isActive = index === activeStep
              const isPast = index < activeStep
              const Icon = step.icon

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className="flex-1 group cursor-pointer"
                >
                  <div className="relative">
                    {/* Progress bar background */}
                    <div 
                      className="h-1.5 rounded-full transition-colors"
                      style={{ 
                        background: isPast ? stepColors.border : isActive ? stepColors.bg : 'rgba(255,255,255,0.05)'
                      }}
                    >
                      {/* Active progress fill */}
                      {isActive && (
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            width: `${progress}%`,
                            background: stepColors.text,
                          }}
                        />
                      )}
                      {isPast && (
                        <div className="h-full rounded-full w-full" style={{ background: stepColors.text }} />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                      style={{
                        background: isPast || isActive ? stepColors.bg : 'transparent',
                        boxShadow: isActive ? `0 0 12px ${stepColors.glow}` : 'none',
                      }}
                    >
                      {isPast ? (
                        <Check className="w-4 h-4" style={{ color: stepColors.text }} />
                      ) : (
                        <Icon 
                          className="w-4 h-4 transition-colors" 
                          style={{ color: isActive ? stepColors.text : 'rgb(113, 113, 122)' }} 
                        />
                      )}
                    </div>
                    <div className="text-left">
                      <div 
                        className="text-sm font-medium transition-colors"
                        style={{ color: isPast || isActive ? 'white' : 'rgb(113, 113, 122)' }}
                      >
                        {step.label}
                      </div>
                      <div className="text-[10px] text-zinc-500">{step.duration}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Sky background section - full width with padding */}
      <div 
        className="relative px-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Rounded container for sky background */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background sky images - crossfade on step change */}
          {[1, 2, 3, 4, 5].map((num, index) => (
            <motion.div
              key={`sky-bg-${num}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === index ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(/images/sky-${num}.jpg)`,
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
          
          {/* Product mockup card floating on top */}
          <div className="relative py-10 lg:py-16 flex justify-center">
            <div 
              className="rounded-2xl border border-white/10 overflow-hidden w-full max-w-4xl"
              style={{ 
                background: '#141417',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.4), 0 12px 48px rgba(0,0,0,0.3), 0 24px 80px rgba(0,0,0,0.25)',
              }}
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
            {/* Browser chrome */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2 bg-black/30">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-white/5 text-xs text-zinc-500 flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  app.useduckie.ai
                </div>
              </div>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>

            {/* App content */}
            <div className="h-[420px]">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="connect"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <ConnectionsUI progress={progress} />
                  </motion.div>
                )}
                {activeStep === 1 && (
                  <motion.div
                    key="build"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <BuildUI progress={progress} />
                  </motion.div>
                )}
                {activeStep === 2 && (
                  <motion.div
                    key="train"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <TrainUI progress={progress} />
                  </motion.div>
                )}
                {activeStep === 3 && (
                  <motion.div
                    key="test"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <TestUI progress={progress} />
                  </motion.div>
                )}
                {activeStep === 4 && (
                  <motion.div
                    key="deploy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <DeployUI progress={progress} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Time indicator */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-6 text-sm max-w-5xl mx-auto"
        >
          <Clock className="w-4 h-4 text-zinc-500" />
          <span className="text-zinc-500">Time to go live:</span>
          <span className="text-white font-medium tabular-nums">{getTotalDays()} days</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">~14 days total</span>
        </motion.div>
      </div>
    </div>
  )
}

export function ImplementationCanvas() {
  return <ImplementationContent />
}

export default ImplementationCanvas
