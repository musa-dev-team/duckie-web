"use client";

import {
  SiHubspot,
  SiIntercom,
  SiZendesk,
} from "react-icons/si";
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
} from "./icons";

const integrations = [
  { name: "Zendesk", icon: SiZendesk, color: "#03363D" },
  { name: "Intercom", icon: SiIntercom, color: "#016FFF" },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
  { name: "Freshdesk", icon: FreshdeskIcon },
  { name: "Slack", icon: SlackIcon },
  { name: "Discord", icon: DiscordIcon },
  { name: "Jira", icon: JiraIcon },
  { name: "Linear", icon: LinearIcon },
  { name: "Confluence", icon: ConfluenceIcon },
  { name: "Notion", icon: NotionIcon, color: "#ffffff" },
  { name: "Google Drive", icon: GoogleDriveIcon },
  { name: "GitHub", icon: GitHubIcon, color: "#ffffff" },
];

// All icons on each row, offset by 4
function getRowIcons(offset: number) {
  const result = [];
  for (let i = 0; i < integrations.length; i++) {
    result.push(integrations[(i + offset) % integrations.length]);
  }
  return result;
}

const rows = [
  getRowIcons(0),  // Starts at Zendesk
  getRowIcons(4),  // Starts at Slack
  getRowIcons(8),  // Starts at Confluence
];

function IntegrationCard({ integration }: { integration: typeof integrations[0] }) {
  const Icon = integration.icon;
  return (
    <div className="group relative flex-shrink-0">
      <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center justify-center w-20 h-20 rounded-xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300">
        <Icon
          className="h-10 w-10"
          style={integration.color ? { color: integration.color } : undefined}
        />
      </div>
    </div>
  );
}

export function IntegrationGrid() {
  return (
    <div className="relative">
      {/* Masked scrolling area */}
      <div 
        className="overflow-hidden" 
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent), radial-gradient(ellipse 90% 70% at center, black 30%, transparent 85%)', 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent), radial-gradient(ellipse 90% 70% at center, black 30%, transparent 85%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in' 
        }}
      >
        <div className="space-y-4 py-4">
          {rows.map((row, rowIndex) => {
            const direction = rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right";
            const items = [...row, ...row, ...row];
            
            return (
              <div key={rowIndex} className="overflow-x-clip overflow-y-visible py-4 -my-4">
                <div className={`flex gap-4 ${direction}`}>
                  {items.map((integration, i) => (
                    <IntegrationCard key={`${integration.name}-${i}`} integration={integration} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "More" indicator - outside the mask */}
      <div className="mt-4 text-center">
        <span className="text-sm text-white/40">+ 40 more integrations</span>
      </div>
    </div>
  );
}
