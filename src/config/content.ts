/**
 * Duckie Website Content
 * 
 * Organized by topic, not layout.
 * Based on WHAT_IS_DUCKIE.md product documentation.
 */

export const content = {
  // ============================================
  // BRAND
  // ============================================
  brand: {
    name: "Duckie",
    tagline: "AI support agents that actually resolve tickets",
    description: "Duckie handles customer conversations, takes real actions to fix issues, and frees up your team to focus on what matters. It works with your existing tools and follows your rules.",
    copyright: "© 2026 Duckie AI. All rights reserved.",
  },

  // ============================================
  // VALUE PROPOSITIONS
  // Different angles on the core message
  // ============================================
  valueProps: {
    hero: {
      headline: "AI support agents that actually resolve tickets",
      subheadline: "Not just answers — real actions.",
    },
    actions: {
      headline: "AI that does, not just says",
      subheadline: "Duckie takes real actions to resolve issues — process refunds, update accounts, reset passwords — not just explain how.",
    },
    control: {
      headline: "Full control over every action",
      subheadline: "Guardrails, approval workflows, and complete audit logs. You decide what the AI can and can't do.",
    },
    transparency: {
      headline: "See exactly what happened",
      subheadline: "Every step is logged. Every action is traceable. No black boxes.",
    },
    scale: {
      headline: "Scale support without scaling headcount",
      subheadline: "Handle 10x the tickets with the same team. Your AI works 24/7.",
    },
  },

  // ============================================
  // WHAT DUCKIE DOES
  // Core capabilities
  // ============================================
  coreCaps: [
    {
      title: "Take real actions",
      description: "Process refunds, update accounts, cancel subscriptions, reset passwords — not just canned responses",
    },
    {
      title: "Know your customers",
      description: "Pull order history, subscription status, past conversations — full context before responding",
    },
    {
      title: "Search your knowledge",
      description: "Find answers from docs, wikis, past tickets, and connected systems",
    },
    {
      title: "Follow your rules",
      description: "Guardrails ensure the AI only does what you've approved, with escalation when needed",
    },
    {
      title: "Learn and improve",
      description: "Knowledge gaps get logged. The AI gets better over time.",
    },
  ],

  // ============================================
  // HOW IT WORKS
  // The 5-step flow
  // ============================================
  howItWorks: {
    title: "How Duckie resolves tickets",
    steps: [
      {
        number: 1,
        title: "Understand",
        description: "Analyze the conversation and identify what the customer needs",
      },
      {
        number: 2,
        title: "Check guardrails",
        description: "Verify the action is allowed before proceeding",
      },
      {
        number: 3,
        title: "Gather context",
        description: "Search your knowledge base, check order history, pull customer details",
      },
      {
        number: 4,
        title: "Take action",
        description: "Process the refund, update the account, fix the issue — actually resolve it",
      },
      {
        number: 5,
        title: "Log & learn",
        description: "Record what happened, tag the conversation, improve for next time",
      },
    ],
  },

  // ============================================
  // ACTIONS
  // What Duckie can actually DO
  // ============================================
  actions: {
    title: "Real actions, not just answers",
    description: "Duckie doesn't just tell customers what to do — it actually does it for them.",
    examples: [
      "Process a refund",
      "Cancel a subscription",
      "Look up order status",
      "Check payment history",
      "Update account details",
      "Reset a password",
      "Apply a discount code",
      "Extend a trial",
      "Resend a confirmation email",
      "Escalate to a human",
    ],
    note: "You decide what actions are available and when they require human approval.",
  },

  // ============================================
  // PLATFORM
  // Section header for platform preview
  // ============================================
  platform: {
    title: "Built for control",
    subtitle: "Everything you need to deploy, manage, and improve AI support agents.",
  },

  // ============================================
  // KEY FEATURES
  // The main product capabilities
  // ============================================
  features: {
    agents: {
      title: "AI Agents",
      description: "Configurable assistants that handle customer conversations. Each agent has its own knowledge, tone of voice, rules, and capabilities.",
    },
    guardrails: {
      title: "Guardrails & Control",
      description: "Safety constraints that protect customers and your brand. Define escalation rules and hard restrictions on what agents can do.",
      examples: [
        { rule: "Refunds over $100", action: "Require human approval" },
        { rule: "Account deletion", action: "Always escalate" },
        { rule: "Angry customer", action: "Escalate to human" },
        { rule: "VIP account", action: "Escalate enterprise customers" },
      ],
    },
    knowledge: {
      title: "Knowledge Base",
      description: "Connect your docs, sync automatically, and let agents find the right information. When they can't answer something, it's logged as a knowledge gap.",
      sources: ["Notion", "Confluence", "Google Drive", "Slack history", "Help center"],
    },
    runbooks: {
      title: "Runbooks & Workflows",
      description: "Define how agents should handle specific scenarios. Runbooks give flexible, natural-language guidance. Workflows provide structured, step-by-step processes when you need them.",
    },
    analytics: {
      title: "Analytics & Insights",
      description: "Track resolution rate, response times, and CSAT. See what topics are trending. Spot issues before they become problems.",
    },
  },

  // ============================================
  // DEPLOYMENT MODES
  // How agents can be deployed
  // ============================================
  deploymentModes: [
    {
      mode: "Live",
      description: "Agent responds directly to customers",
    },
    {
      mode: "Shadow",
      description: "Agent drafts responses, humans review before sending",
    },
    {
      mode: "Testing",
      description: "Try it out safely before going live",
    },
  ],

  // ============================================
  // CHANNELS
  // Where Duckie works
  // ============================================
  channels: {
    title: "Works where your customers are",
    list: [
      { name: "Zendesk", type: "ticketing" },
      { name: "Intercom", type: "chat" },
      { name: "Slack", type: "messaging" },
      { name: "HubSpot", type: "ticketing" },
      { name: "Discord", type: "community" },
      { name: "Linear", type: "issues" },
      { name: "Plain", type: "support" },
    ],
  },

  // ============================================
  // INTEGRATIONS
  // All connected platforms
  // ============================================
  integrations: {
    ticketing: ["Zendesk", "Intercom", "HubSpot", "Plain"],
    messaging: ["Slack", "Discord"],
    projectManagement: ["Jira", "Linear", "Notion"],
    knowledgeSources: ["Notion", "Confluence", "Google Drive"],
  },

  // ============================================
  // BENEFITS
  // Why use Duckie
  // ============================================
  benefits: [
    {
      title: "Actually resolve issues",
      description: "Not just answers — real actions that fix the problem",
    },
    {
      title: "24/7 availability",
      description: "Resolve tickets around the clock, not just queue them",
    },
    {
      title: "Full transparency",
      description: "See exactly what the AI did — every action, every decision, every response",
    },
    {
      title: "Safe by design",
      description: "Guardrails control what actions are allowed. Humans approve when needed.",
    },
    {
      title: "Works with your tools",
      description: "Integrates with Zendesk, Intercom, Slack, and the systems you already use",
    },
    {
      title: "Free up your team",
      description: "Handle routine issues automatically so humans focus on what matters",
    },
  ],

  // ============================================
  // SOCIAL PROOF
  // ============================================
  socialProof: {
    stats: [
      { value: "82", suffix: "%", label: "Resolution rate" },
      { value: "76", suffix: "%", label: "Faster handle time" },
      { value: "<2", suffix: "min", label: "First response" },
      { value: "4.8", suffix: "/5", label: "CSAT maintained" },
    ],
    featuredTestimonial: {
      quote: "We went from 40% automation to 82% in weeks—not months.",
      author: "Sarah Chen",
      role: "VP of Customer Experience",
      company: "TechScale",
      logo: "", // Company logo URL
      avatar: "", // Author photo URL
      stat: { value: "82%", label: "Resolution rate" }, // Optional highlight stat
    },
    testimonials: [
      {
        quote: "The audit trail is essential for our compliance requirements.",
        author: "Marcus Johnson",
        role: "Head of Support Operations",
        company: "FinServe Global",
        logo: "",
        avatar: "",
      },
      {
        quote: "Our CSAT actually improved after scaling to 45K tickets.",
        author: "Elena Rodriguez",
        role: "Director of CX",
        company: "CloudCart",
        logo: "",
        avatar: "",
      },
      {
        quote: "Setup took less than an hour. We were resolving tickets same day.",
        author: "David Kim",
        role: "Support Team Lead",
        company: "GrowthLabs",
        logo: "",
        avatar: "",
      },
      {
        quote: "", // TBD
        author: "",
        role: "",
        company: "",
        logo: "",
        avatar: "",
      },
      {
        quote: "", // TBD
        author: "",
        role: "",
        company: "",
        logo: "",
        avatar: "",
      },
    ],
    companiesCount: "100+ companies",
  },

  // ============================================
  // TRUST
  // ============================================
  trust: {
    badges: ["SOC 2 Type II"],
    deploymentOptions: ["Cloud (SaaS)", "Self-hosted"],
  },

  // ============================================
  // IMPLEMENTATION TIMELINE
  // Getting Duckie up and running
  // ============================================
  implementation: {
    title: "From setup to resolution in under 2 hours",
    subtitle: "Get your AI support agent live and handling real tickets faster than you'd onboard a human.",
    steps: [
      {
        number: 1,
        title: "Connect",
        subtitle: "Link your tools",
        description: "Connect your support channels (Zendesk, Intercom, Slack) and knowledge sources (Notion, Confluence, Drive) in minutes.",
        duration: "5 minutes",
        icon: "🔗",
      },
      {
        number: 2,
        title: "Configure",
        subtitle: "Set the rules",
        description: "Define your guidelines, guardrails, and escalation rules. Control what the AI can and can't do.",
        duration: "15 minutes",
        icon: "⚙️",
      },
      {
        number: 3,
        title: "Test",
        subtitle: "Validate everything",
        description: "Use the playground to test conversations. Run batch tests. Refine until you're confident.",
        duration: "1 hour",
        icon: "🧪",
      },
      {
        number: 4,
        title: "Deploy",
        subtitle: "Go live or shadow",
        description: "Choose Live mode for full automation, or Shadow mode to review responses before they're sent.",
        duration: "1 click",
        icon: "🚀",
      },
    ],
  },

  // ============================================
  // CTAs
  // ============================================
  ctas: {
    primary: "Book a Demo",
    secondary: "See How It Works",
    tertiary: "Read the Docs",
  },

  // ============================================
  // FINAL CTA SECTION
  // The closing section on pages
  // ============================================
  finalCta: {
    headline: "Ready to see Duckie in action?",
    subheadline: "", // Optional - leave empty for minimal look
    cta: "Book a Demo",
  },

  // ============================================
  // NAVIGATION
  // ============================================
  navigation: {
    links: [
      { label: "Platform", href: "/platform" },
      { label: "How it Works", href: "/how-it-works" },
      { label: "Integrations", href: "/integrations" },
      { label: "Blog", href: "/blog" },
    ],
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    company: {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/security" },
      ],
    },
    social: [
      { name: "Twitter", href: "https://twitter.com/duckieai" },
      { name: "LinkedIn", href: "https://linkedin.com/company/duckieai" },
      { name: "GitHub", href: "https://github.com/duckieai" },
    ],
  },

  // ============================================
  // PRODUCT IMAGES
  // Descriptions for what each image should show
  // ============================================
  productImages: {
    hero: {
      id: "hero",
      description: "The main Duckie interface showing a conversation being handled. Should show: customer message, AI response, and the action being taken (e.g., 'Processing refund...'). Clean, modern UI. Light theme.",
    },
    conversationWithAction: {
      id: "conversation-action",
      description: "A support conversation where Duckie is taking an action. Show: chat thread with customer asking for a refund, Duckie's response confirming it's done, and a subtle indicator that the refund was actually processed (e.g., a checkmark or 'Refund processed' tag).",
    },
    agentConfig: {
      id: "agent-config",
      description: "The agent configuration screen. Show: agent name, assigned knowledge sources, selected runbook, guardrails list, and maybe a 'Live/Shadow/Testing' toggle. Should look like a clean settings panel.",
    },
    runbookEditor: {
      id: "runbook-editor",
      description: "The runbook editor showing a sample runbook like 'Refund Request'. Show natural-language steps: 1. Verify the order exists, 2. Check refund eligibility, 3. Process refund or explain why not, 4. Escalate if customer insists. Should feel like writing instructions, not coding.",
    },
    guardrails: {
      id: "guardrails",
      description: "The guardrails configuration. Show a list of rules like: 'Refunds over $100 → Require approval', 'Account deletion → Always escalate', 'VIP customer → Route to senior agent'. Should convey safety and control.",
    },
    knowledgeBase: {
      id: "knowledge-base",
      description: "The knowledge base view. Show: connected sources (Notion, Help Center icons), a list of synced articles, maybe a search bar. Could also show a 'Knowledge gaps' section with questions that couldn't be answered.",
    },
    analytics: {
      id: "analytics",
      description: "The analytics dashboard. Show: resolution rate (82%), average response time (<2 min), CSAT score (4.8), maybe a chart of tickets over time, and a breakdown by category (Billing, Technical, Account). Should feel insightful, not overwhelming.",
    },
    channels: {
      id: "channels",
      description: "Multi-channel view or inbox. Show: conversations from different sources (Zendesk ticket, Slack message, Intercom chat) in a unified list. Or: logos of supported channels with connection status.",
    },
    deploymentModes: {
      id: "deployment-modes",
      description: "The three deployment modes. Could be: a toggle showing Live/Shadow/Testing, or three cards explaining each mode. Shadow mode could show a 'draft' response waiting for human approval.",
    },
    auditLog: {
      id: "audit-log",
      description: "The transparency/audit view. Show: a step-by-step breakdown of how Duckie handled a ticket. Steps like 'Understood request: refund', 'Checked guardrails: approved', 'Retrieved order: #12345', 'Processed refund: $49.99'. Should convey full visibility.",
    },
    howItWorks: {
      id: "how-it-works",
      description: "A visual flow of the 5 steps: Understand → Check guardrails → Gather context → Take action → Log & learn. Could be a horizontal flow diagram or animated sequence.",
    },
    escalation: {
      id: "escalation",
      description: "Human + AI handoff. Show: a conversation where Duckie recognizes it needs help, smoothly hands off to a human agent with full context. The human sees the summary, history, and can jump in seamlessly.",
    },
    actionsList: {
      id: "actions-list",
      description: "Visual grid or list of actions Duckie can take: refund icon, cancel icon, password reset icon, etc. Could be illustrated icons with labels. Conveys the breadth of what's possible.",
    },
    integrationLogos: {
      id: "integration-logos",
      description: "Clean grid of integration logos: Zendesk, Intercom, Slack, HubSpot, Jira, Linear, Notion, Confluence, etc. Grayscale or subtle color. Shows ecosystem compatibility.",
    },
    beforeAfter: {
      id: "before-after",
      description: "Split view comparing manual support vs Duckie. Before: long queue, slow response, repetitive work. After: instant resolution, happy customer, agent focused on complex issues.",
    },
    knowledgeGap: {
      id: "knowledge-gap",
      description: "The knowledge gap feature. Show: a list of questions Duckie couldn't answer confidently, with frequency counts, and a 'Create article' button. Conveys continuous improvement.",
    },
  },
}

// Type exports
export type Content = typeof content
export type ProductImage = typeof content.productImages[keyof typeof content.productImages]
