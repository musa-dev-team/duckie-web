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
import {
  SiHubspot,
  SiIntercom,
  SiZendesk,
} from "react-icons/si"

const integrations = [
  { name: "Zendesk", icon: SiZendesk, color: "#03363D", glow: "#8FCFD6", glowOpacity: 10 },
  { name: "Intercom", icon: SiIntercom, color: "#016FFF", glow: "#5CE1E6", glowOpacity: 10 },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59", glow: "#FFAB8F", glowOpacity: 10 },
  { name: "Freshdesk", icon: FreshdeskIcon, glow: "#6FFFB8", glowOpacity: 10 },
  { name: "Slack", icon: SlackIcon, glow: "#FF8FAA", glowOpacity: 10 },
  { name: "Discord", icon: DiscordIcon, glow: "#A8AEFF", glowOpacity: 10 },
  { name: "Jira", icon: JiraIcon, glow: "#6AAFFF", glowOpacity: 10 },
  { name: "Linear", icon: LinearIcon, glow: "#9BA3FF", glowOpacity: 10 },
  { name: "Confluence", icon: ConfluenceIcon, glow: "#6AAFFF", glowOpacity: 10 },
  { name: "Notion", icon: NotionIcon, color: "#ffffff", glow: "#E8E8E8", glowOpacity: 10 },
  { name: "Google Drive", icon: GoogleDriveIcon, glow: "#FFD966", glowOpacity: 10 },
  { name: "GitHub", icon: GitHubIcon, color: "#ffffff", glow: "#E8E8E8", glowOpacity: 10 },
]

const languages = [
  "English",
  "Español",
  "Français",
  "Deutsch",
  "Português",
  "日本語",
  "한국어",
  "+40 more",
]

const features = [
  "Unified inbox across all channels",
  "Context preserved across conversations",
  "Real-time language detection & translation",
]

// Generate offset rows for visual variety
function getRowIcons(offset: number) {
  const result = []
  for (let i = 0; i < integrations.length; i++) {
    result.push(integrations[(i + offset) % integrations.length])
  }
  return result
}

const rows = [
  getRowIcons(0),
  getRowIcons(4),
  getRowIcons(8),
]

function IntegrationCard({ integration }: { integration: (typeof integrations)[0] }) {
  const Icon = integration.icon
  
  return (
    <div className="group relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
      {/* Base glow - only render if opacity > 0 */}
      {integration.glowOpacity > 0 && (
        <div 
          className="absolute w-10 h-10 rounded-full blur-lg"
          style={{ 
            backgroundColor: integration.glow,
            opacity: integration.glowOpacity / 100,
          }}
        />
      )}
      {/* Additional glow on hover (+15%) */}
      <div 
        className="absolute w-10 h-10 rounded-full blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-15"
        style={{ 
          backgroundColor: integration.glow,
        }}
      />
      {/* Icon */}
      <Icon
        className="h-10 w-10 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
        style={integration.color ? { color: integration.color } : undefined}
      />
    </div>
  )
}

function IntegrationGrid() {
  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="space-y-6 py-8">
          {rows.map((row, rowIndex) => {
            const direction =
              rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right"
            const items = [...row, ...row, ...row]

            return (
              <div key={rowIndex} className="overflow-x-clip overflow-y-visible py-4 -my-4">
                <div className={`flex gap-6 ${direction}`}>
                  {items.map((integration, i) => (
                    <IntegrationCard
                      key={`${integration.name}-${i}`}
                      integration={integration}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 text-center">
        <span className="text-sm text-zinc-500">+ 40 more integrations</span>
      </div>
    </div>
  )
}

export function Omnichannel() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="font-serif text-4xl font-normal tracking-tight text-zinc-50 lg:text-5xl mb-6">
              One agent.
              <br />
              <span className="text-zinc-400">Every channel. Every language.</span>
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              Design your AI agent once and deploy it consistently across email,
              chat, and in-app widgets—in any language your customers speak.
            </p>

            {/* Language tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1.5 rounded-full bg-zinc-900 text-xs font-medium text-zinc-400 ring-1 ring-zinc-800 transition-all duration-300 hover:bg-zinc-800 hover:ring-zinc-700"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-zinc-400"
                >
                  <svg
                    className="h-4 w-4 text-zinc-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Integration Grid */}
          <div>
            <IntegrationGrid />
          </div>
        </div>
      </div>
    </section>
  )
}
