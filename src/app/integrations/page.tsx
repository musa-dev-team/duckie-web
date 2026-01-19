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
  PylonIcon,
  SlackIcon,
} from "@/components/icons"
import { CtaContent } from "@/components/sections/cta-section"
import { Footer } from "@/components/sections/footer"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Bot, Database, MessageSquare, Search, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaFire } from "react-icons/fa"
import {
  SiGmail,
  SiHubspot,
  SiIntercom,
  SiSentry,
  SiZendesk,
} from "react-icons/si"

const ease = [0.22, 1, 0.36, 1] as const

// Integration data with capabilities
const integrations = [
  // Messaging / Deployment Channels
  {
    id: "slack",
    name: "Slack",
    icon: SlackIcon,
    category: "messaging",
    description: "Connect Slack to enable real-time messaging and notifications.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#FF8FAA",
  },
  {
    id: "discord",
    name: "Discord",
    icon: DiscordIcon,
    category: "messaging",
    description: "Add Duckie bot to your Discord server.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#A8AEFF",
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: SiGmail,
    category: "messaging",
    description: "Connect Gmail to send and receive emails.",
    capabilities: ["agent-actions"],
    glow: "#FF7070",
    color: "#EA4335",
  },
  {
    id: "widget",
    name: "Website Widget",
    icon: MessageSquare,
    category: "messaging",
    description: "Embed an AI chat widget directly on your website.",
    capabilities: ["agent-actions"],
    glow: "#70FFB8",
    color: "#10B981",
  },
  
  // Documentation / Knowledge Sources
  {
    id: "confluence",
    name: "Confluence",
    icon: ConfluenceIcon,
    category: "documentation",
    description: "Connect Confluence to sync documentation and knowledge base.",
    capabilities: ["knowledge-source"],
    glow: "#6AAFFF",
  },
  {
    id: "notion",
    name: "Notion",
    icon: NotionIcon,
    category: "documentation",
    description: "Connect Notion to sync pages and databases.",
    capabilities: ["knowledge-source"],
    glow: "#E8E8E8",
    color: "#ffffff",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    icon: GoogleDriveIcon,
    category: "documentation",
    description: "Connect Google Drive to access documents and files.",
    capabilities: ["knowledge-source"],
    glow: "#FFD966",
  },
  {
    id: "sentry",
    name: "Sentry",
    icon: SiSentry,
    category: "documentation",
    description: "Connect Sentry to monitor errors and exceptions.",
    capabilities: ["knowledge-source"],
    glow: "#FF6B6B",
    color: "#FB4226",
  },
  {
    id: "fireflies",
    name: "Fireflies",
    icon: FaFire,
    category: "documentation",
    description: "Connect Fireflies to capture meeting transcripts.",
    capabilities: ["knowledge-source"],
    glow: "#FF9A6B",
    color: "#FF6B00",
  },
  {
    id: "guru",
    name: "Guru",
    icon: BookOpen,
    category: "documentation",
    description: "Connect Guru to sync knowledge cards and documentation.",
    capabilities: ["knowledge-source"],
    glow: "#6BFF6B",
    color: "#10B981",
  },
  {
    id: "skilljar",
    name: "Skilljar",
    icon: Database,
    category: "documentation",
    description: "Connect Skilljar to sync courses and training content.",
    capabilities: ["knowledge-source"],
    glow: "#6B9AFF",
    color: "#3B82F6",
  },
  
  // Issue Tracking
  {
    id: "jira",
    name: "Jira",
    icon: JiraIcon,
    category: "issues",
    description: "Connect Jira to manage issues and track work.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#6AAFFF",
  },
  {
    id: "linear",
    name: "Linear",
    icon: LinearIcon,
    category: "issues",
    description: "Connect Linear to manage issues and projects.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#9BA3FF",
  },
  {
    id: "github",
    name: "GitHub",
    icon: GitHubIcon,
    category: "issues",
    description: "Connect GitHub to access repositories and issues.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#E8E8E8",
    color: "#ffffff",
  },
  
  // Ticketing / Support Platforms
  {
    id: "zendesk",
    name: "Zendesk",
    icon: SiZendesk,
    category: "ticketing",
    description: "Connect Zendesk to manage support tickets.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#8FCFD6",
    color: "#03363D",
  },
  {
    id: "intercom",
    name: "Intercom",
    icon: SiIntercom,
    category: "ticketing",
    description: "Connect Intercom to manage customer conversations.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#5CE1E6",
    color: "#016FFF",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    icon: SiHubspot,
    category: "ticketing",
    description: "Connect HubSpot to manage CRM and support tickets.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#FFAB8F",
    color: "#FF7A59",
  },
  {
    id: "freshdesk",
    name: "Freshdesk",
    icon: FreshdeskIcon,
    category: "ticketing",
    description: "Connect Freshdesk to manage support tickets.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#6FFFB8",
  },
  {
    id: "plain",
    name: "Plain",
    icon: MessageSquare,
    category: "ticketing",
    description: "Connect Plain to manage customer support threads.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#A8AEFF",
    color: "#6366F1",
  },
  {
    id: "pylon",
    name: "Pylon",
    icon: PylonIcon,
    category: "ticketing",
    description: "Connect Pylon to manage customer issues.",
    capabilities: ["agent-actions", "knowledge-source"],
    glow: "#A8AEFF",
  },
]

const capabilityInfo = {
  "knowledge-source": {
    label: "Knowledge Source",
    description: "Duckie can read and learn from this integration",
    icon: Search,
    color: "#3B82F6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  "agent-actions": {
    label: "Agent Actions",
    description: "Duckie can take actions and respond through this integration",
    icon: Zap,
    color: "#FF6B35",
    bgColor: "rgba(255, 107, 53, 0.1)",
    borderColor: "rgba(255, 107, 53, 0.2)",
  },
}

function IntegrationCard({ integration, index }: { integration: typeof integrations[0]; index: number }) {
  const Icon = integration.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div 
        className="relative rounded-2xl p-6 h-full transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.02)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${integration.glow}15 0%, transparent 60%)`,
          }}
        />
        
        <div className="relative">
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            style={{ 
              background: `${integration.glow}15`,
              boxShadow: `0 0 0 1px ${integration.glow}20`,
            }}
          >
            <Icon 
              className="w-6 h-6" 
              style={{ color: integration.color || integration.glow }} 
            />
          </div>
          
          {/* Name & Description */}
          <h3 className="text-lg font-semibold text-white mb-2">{integration.name}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">{integration.description}</p>
          
          {/* Capability badges */}
          <div className="flex flex-wrap gap-2">
            {integration.capabilities.map((cap) => {
              const info = capabilityInfo[cap as keyof typeof capabilityInfo]
              const CapIcon = info.icon
              return (
                <div
                  key={cap}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: info.bgColor,
                    border: `1px solid ${info.borderColor}`,
                    color: info.color,
                  }}
                >
                  <CapIcon className="w-3 h-3" />
                  {info.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CapabilityExplainer() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-16">
      {Object.entries(capabilityInfo).map(([key, info], index) => {
        const Icon = info.icon
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease }}
            className="relative rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.02)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ 
                  background: info.bgColor,
                  boxShadow: `0 0 0 1px ${info.borderColor}`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: info.color }} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">{info.label}</h4>
                <p className="text-sm text-zinc-400">{info.description}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function IntegrationsPage() {
  return (
    <main>
      {/* Hero section */}
      <div className="relative w-full bg-[#090B0F] px-3 pt-3 pb-3 md:px-4 md:pt-4 md:pb-4">
        <div
          className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          <Image
            src="/images/Abstract Blue Composition.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at top left, rgba(0,0,0,0.5) 0%, transparent 50%),
                radial-gradient(ellipse at top right, rgba(0,0,0,0.5) 0%, transparent 50%)
              `,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-sm md:text-base text-white/60 mb-4 md:mb-6 tracking-[0.2em] uppercase font-medium"
            >
              Integrations
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg max-w-4xl tracking-[-0.03em] leading-[1.05]"
            >
              Connect your {" "}
              <span className="text-[#FF6B35]">entire stack</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-lg md:text-xl text-white/70 max-w-2xl"
            >
              Duckie integrates with the tools your team already uses, enabling seamless knowledge sharing and automated actions.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="relative bg-[#090B0F] py-16 md:py-24 overflow-hidden">
        {/* Background texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-500/60" />
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]">
                  How Integrations Work
                </span>
                <div className="h-px w-12 bg-gradient-to-r from-zinc-500/60 to-transparent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em] mb-4">
                Two ways Duckie connects
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Each integration can serve as a knowledge source for Duckie to learn from, 
                a channel for agent actions, or both.
              </p>
            </motion.div>
            
            <CapabilityExplainer />
          </div>
        </div>
      </div>

      {/* All Integrations Grid */}
      <div className="relative bg-[#090B0F] py-16 md:py-24 overflow-hidden">
        {/* Subtle gradient orbs */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)' }}
        />
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
                  {integrations.length}+ Integrations
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-600 to-transparent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
                All Integrations
              </h2>
            </motion.div>

            {/* Messaging Section */}
            <div id="messaging" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3 mb-6"
              >
                <MessageSquare className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="text-xl font-semibold text-white">Messaging Channels</h3>
                <span className="text-xs text-zinc-500 ml-2">
                  {integrations.filter(i => i.category === "messaging").length} integrations
                </span>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {integrations
                  .filter(i => i.category === "messaging")
                  .map((integration, index) => (
                    <IntegrationCard key={integration.id} integration={integration} index={index} />
                  ))}
              </div>
            </div>

            {/* Documentation Section */}
            <div id="documentation" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3 mb-6"
              >
                <Search className="w-5 h-5 text-[#3B82F6]" />
                <h3 className="text-xl font-semibold text-white">Knowledge Sources</h3>
                <span className="text-xs text-zinc-500 ml-2">
                  {integrations.filter(i => i.category === "documentation").length} integrations
                </span>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {integrations
                  .filter(i => i.category === "documentation")
                  .map((integration, index) => (
                    <IntegrationCard key={integration.id} integration={integration} index={index} />
                  ))}
              </div>
            </div>

            {/* Issue Tracking Section */}
            <div id="issues" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3 mb-6"
              >
                <Bot className="w-5 h-5 text-[#10B981]" />
                <h3 className="text-xl font-semibold text-white">Issue Tracking</h3>
                <span className="text-xs text-zinc-500 ml-2">
                  {integrations.filter(i => i.category === "issues").length} integrations
                </span>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations
                  .filter(i => i.category === "issues")
                  .map((integration, index) => (
                    <IntegrationCard key={integration.id} integration={integration} index={index} />
                  ))}
              </div>
            </div>

            {/* Support Platforms Section */}
            <div id="ticketing" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3 mb-6"
              >
                <Zap className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-xl font-semibold text-white">Support Platforms</h3>
                <span className="text-xs text-zinc-500 ml-2">
                  {integrations.filter(i => i.category === "ticketing").length} integrations
                </span>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations
                  .filter(i => i.category === "ticketing")
                  .map((integration, index) => (
                    <IntegrationCard key={integration.id} integration={integration} index={index} />
                  ))}
              </div>
            </div>

            {/* Request Integration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,53,0.08) 0%, rgba(59,130,246,0.08) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              {/* Subtle gradient accent */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%)' }}
              />
              
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.1) 100%)',
                      boxShadow: '0 0 0 1px rgba(255,107,53,0.2)',
                    }}
                  >
                    <MessageSquare className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Missing an integration?</h3>
                    <p className="text-zinc-400 max-w-md">
                      We&apos;re always adding new integrations. Tell us what tools you use and we&apos;ll prioritize building them.
                    </p>
                  </div>
                </div>
                <Link
                  href="mailto:hello@duckie.ai?subject=Integration%20Request"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/10 text-white hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all shrink-0"
                >
                  Request integration
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Spacer before CTA */}
      <div className="h-16 md:h-48 bg-[#FFFFFF]" aria-hidden="true" />

      {/* CTA + Footer section with pond background */}
      <div className="relative overflow-hidden bg-[#FFFFFF] pt-0 md:pt-16">
        {/* Background image */}
        <img 
          src="/images/pond-3.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
        />
        {/* Vignette overlay for bottom corners */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 0% 100%, rgba(0,0,0,0.35) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 70%)
            `,
          }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative">
          <div data-theme="light">
            <CtaContent />
          </div>
          <div className="h-32 md:h-0" aria-hidden="true" />
          <Footer />
        </div>
      </div>
    </main>
  )
}
