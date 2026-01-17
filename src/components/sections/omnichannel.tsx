"use client"

import {
  ConfluenceIcon,
  DiscordIcon,
  FreshdeskIcon,
  GitHubIcon,
  GoogleDriveIcon,
  JiraIcon,
  LinearIcon,
  NotionIcon,
  SlackIcon,
} from "@/components/icons"
import { AnimatePresence, motion } from "framer-motion"
import { Globe, MessageSquare, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import {
  SiHubspot,
  SiIntercom,
  SiZendesk,
} from "react-icons/si"

const ease = [0.22, 1, 0.36, 1] as const

const integrations = [
  { name: "Zendesk", icon: SiZendesk, color: "#03363D", glow: "#8FCFD6", category: "support" },
  { name: "Intercom", icon: SiIntercom, color: "#016FFF", glow: "#5CE1E6", category: "support" },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59", glow: "#FFAB8F", category: "crm" },
  { name: "Freshdesk", icon: FreshdeskIcon, glow: "#6FFFB8", category: "support" },
  { name: "Slack", icon: SlackIcon, glow: "#FF8FAA", category: "chat" },
  { name: "Discord", icon: DiscordIcon, glow: "#A8AEFF", category: "chat" },
  { name: "Jira", icon: JiraIcon, glow: "#6AAFFF", category: "dev" },
  { name: "Linear", icon: LinearIcon, glow: "#9BA3FF", category: "dev" },
  { name: "Confluence", icon: ConfluenceIcon, glow: "#6AAFFF", category: "docs" },
  { name: "Notion", icon: NotionIcon, color: "#ffffff", glow: "#E8E8E8", category: "docs" },
  { name: "Google Drive", icon: GoogleDriveIcon, glow: "#FFD966", category: "docs" },
  { name: "GitHub", icon: GitHubIcon, color: "#ffffff", glow: "#E8E8E8", category: "dev" },
]

const languages = [
  { code: "EN", name: "English", flag: "🇺🇸" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "PT", name: "Português", flag: "🇧🇷" },
  { code: "JA", name: "日本語", flag: "🇯🇵" },
  { code: "KO", name: "한국어", flag: "🇰🇷" },
  { code: "ZH", name: "中文", flag: "🇨🇳" },
]

const features = [
  { 
    icon: MessageSquare, 
    title: "Unified inbox", 
    desc: "All channels flow into one intelligent queue",
    color: "sky"
  },
  { 
    icon: Zap, 
    title: "Context preserved", 
    desc: "Full history travels with every conversation",
    color: "amber"
  },
  { 
    icon: Globe, 
    title: "Real-time translation", 
    desc: "Auto-detect and respond in 40+ languages",
    color: "emerald"
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  sky: { bg: 'rgba(56, 189, 248, 0.08)', border: 'rgba(56, 189, 248, 0.2)', text: 'rgb(125, 211, 252)' },
  amber: { bg: 'rgba(251, 191, 36, 0.08)', border: 'rgba(251, 191, 36, 0.2)', text: 'rgb(252, 211, 77)' },
  emerald: { bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.2)', text: 'rgb(110, 231, 183)' },
}

// Simulated conversation flow - one for each of the 8 displayed integrations
const conversationFlow = [
  { channel: "Zendesk", message: "サブスクリプションについて質問があります", lang: "JA" },
  { channel: "Intercom", message: "¿Cómo puedo actualizar mi plan?", lang: "ES" },
  { channel: "HubSpot", message: "Novo lead do formulário de contato", lang: "PT" },
  { channel: "Freshdesk", message: "Wie kann ich mein Passwort ändern?", lang: "DE" },
  { channel: "Slack", message: "我想了解定价方案", lang: "ZH" },
  { channel: "Discord", message: "Comment annuler mon compte?", lang: "FR" },
  { channel: "Jira", message: "결제 오류가 발생했습니다", lang: "KO" },
  { channel: "Linear", message: "Ho bisogno di aiuto con l'integrazione", lang: "IT" },
]

// Predetermined "random" order that jumps around visually (not adjacent, visits all before repeating)
const cycleOrder = [0, 4, 1, 5, 2, 6, 3, 7]

function IntegrationOrbit() {
  const [cyclePosition, setCyclePosition] = useState(0)
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null)
  const [cycleKey, setCycleKey] = useState(0) // Used to restart the timer

  const activeIndex = cycleOrder[cyclePosition]

  useEffect(() => {
    const interval = setInterval(() => {
      setCyclePosition((prev) => (prev + 1) % cycleOrder.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [cycleKey]) // Restart interval when cycleKey changes

  // Handle clicking an integration - switch to it and restart timer
  const handleIntegrationClick = (integrationName: string) => {
    const conversationIndex = conversationFlow.findIndex(c => c.channel === integrationName)
    if (conversationIndex !== -1) {
      // Find where this index is in our cycle order and jump to it
      const positionInCycle = cycleOrder.indexOf(conversationIndex)
      if (positionInCycle !== -1) {
        setCyclePosition(positionInCycle)
      }
      setCycleKey(prev => prev + 1) // Restart the timer
    }
  }

  const currentConversation = conversationFlow[activeIndex]
  const activeIntegration = integrations.find(i => i.name === currentConversation.channel)

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Outer ring - subtle */}
      <div className="absolute inset-0 rounded-full border border-white/5" />
      
      {/* Middle ring with gradient */}
      <div className="absolute inset-[15%] rounded-full border border-white/10">
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* Inner ring - glow ring */}
      <div className="absolute inset-[30%] rounded-full">
        <motion.div
          animate={{
            boxShadow: activeIntegration 
              ? `0 0 60px ${activeIntegration.glow}20, inset 0 0 40px ${activeIntegration.glow}10`
              : '0 0 60px rgba(56, 189, 248, 0.1)',
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full border border-white/10"
        />
      </div>

      {/* Orbiting integrations */}
      {integrations.slice(0, 8).map((integration, index) => {
        const Icon = integration.icon
        const angle = (index / 8) * 360
        const radius = 42 // percentage from center
        const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180)
        const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180)
        const isActive = integration.name === currentConversation.channel
        const isHovered = hoveredIntegration === integration.name

        return (
          <motion.div
            key={integration.name}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredIntegration(integration.name)}
            onMouseLeave={() => setHoveredIntegration(null)}
            onClick={() => handleIntegrationClick(integration.name)}
          >
            {/* Connection line when active */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <svg className="w-32 h-32 -translate-x-1/2 -translate-y-1/2" style={{ position: 'absolute', left: '50%', top: '50%' }}>
                    <motion.line
                      x1="64"
                      y1="64"
                      x2="64"
                      y2="64"
                      stroke={integration.glow}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                scale: isActive ? 1.15 : isHovered ? 1.1 : 1,
                boxShadow: isActive 
                  ? `0 0 30px ${integration.glow}40, 0 0 0 2px ${integration.glow}60`
                  : isHovered
                    ? `0 0 20px ${integration.glow}30`
                    : '0 0 0 1px rgba(255,255,255,0.1)',
              }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center cursor-pointer"
              style={{
                background: isActive 
                  ? `linear-gradient(135deg, ${integration.glow}20 0%, ${integration.glow}10 100%)`
                  : 'rgba(15, 15, 20, 0.9)',
              }}
            >
              <Icon
                className="w-6 h-6 sm:w-7 sm:h-7"
                style={{ color: integration.color || integration.glow }}
              />
            </motion.div>

            {/* Label on hover */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap"
                >
                  <span className="text-[10px] font-medium text-zinc-400 px-2 py-1 rounded-full bg-zinc-900/80 backdrop-blur-sm">
                    {integration.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Active conversation bubble - centered in the orbit with scroll animation */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[240px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${activeIndex}-${cycleKey}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-xl"
            style={{
              boxShadow: `0 0 30px ${activeIntegration?.glow}30, 0 0 60px ${activeIntegration?.glow}15`,
            }}
          >
            <div 
              className="rounded-xl p-3 backdrop-blur-sm overflow-hidden"
              style={{
                background: 'rgba(15, 15, 20, 0.95)',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px ${activeIntegration?.glow}40, 0 8px 24px rgba(0,0,0,0.4)`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${activeIntegration?.glow}20` }}
                >
                  {activeIntegration && <activeIntegration.icon className="w-3.5 h-3.5" style={{ color: activeIntegration.color || activeIntegration.glow }} />}
                </div>
                <span className="text-xs font-medium text-white">{currentConversation.channel}</span>
                <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/10 text-zinc-400 flex-shrink-0">
                  {currentConversation.lang}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">"{currentConversation.message}"</p>
              <motion.div
                key={`progress-${activeIndex}-${cycleKey}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-0.5 rounded-full mt-2"
                style={{ background: `linear-gradient(90deg, ${activeIntegration?.glow}60, ${activeIntegration?.glow}20)` }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function LanguageWave() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {languages.map((lang, index) => (
        <motion.div
          key={lang.code}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="px-3 py-1.5 rounded-full flex items-center gap-2 cursor-default bg-white/[0.03] ring-1 ring-white/5 hover:ring-white/10 hover:bg-white/[0.05] transition-colors"
        >
          <span className="text-sm">{lang.flag}</span>
          <span className="text-xs font-medium text-zinc-400">
            {lang.name}
          </span>
        </motion.div>
      ))}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: languages.length * 0.05 }}
        className="px-3 py-1.5 rounded-full bg-white/[0.03] ring-1 ring-white/5"
      >
        <span className="text-xs text-zinc-500">+32 more</span>
      </motion.div>
    </div>
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const colors = colorMap[feature.color]
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl p-4 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Hover glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${colors.bg} 0%, transparent 70%)`,
        }}
      />
      
      <div className="relative">
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: colors.bg }}
          >
            <Icon className="w-5 h-5" style={{ color: colors.text }} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-1">{feature.title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{feature.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function OmnichannelContent() {
  return (
    <div className="relative py-28 lg:py-40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="h-px w-12 bg-gradient-to-r from-transparent to-sky-400/60 origin-right"
            />
            <span className="text-xs font-medium text-sky-400 uppercase tracking-[0.2em]">
              Omnichannel
            </span>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="h-px w-12 bg-gradient-to-r from-sky-400/60 to-transparent origin-left"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-[-0.03em] leading-[1.1] mb-6"
          >
            One agent.
            <br />
            <span className="text-zinc-500">Every channel. Every language.</span>
          </motion.h2>
        </div>

        {/* Main content - Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: Integration Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <IntegrationOrbit />
          </motion.div>

          {/* Right: Features & Languages */}
          <div className="space-y-8">
            {/* Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>

            {/* Languages section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="pt-6 border-t border-white/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-zinc-400">Supported languages</span>
              </div>
              <LanguageWave />
            </motion.div>
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/5"
        >
          {[
            { value: "35+", label: "Channel integrations" },
            { value: "40+", label: "Languages supported" },
            { value: "100%", label: "Context preserved" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1, ease }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-semibold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Backward compatibility alias
export const Omnichannel = OmnichannelContent
