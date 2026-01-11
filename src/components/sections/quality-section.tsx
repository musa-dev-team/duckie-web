const pillars = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Visibility & Insights",
    description: "Track performance, identify patterns, and detect anomalies across all conversations using AI-powered analytics. Understand what's working and what needs attention.",
    features: ["Real-time dashboards", "Conversation analytics", "Anomaly detection", "Custom reports"]
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Control & Safety",
    description: "Run automation within clear guardrails, with human approval and escalation when needed. Every action is logged and reversible.",
    features: ["Human-in-the-loop", "Approval workflows", "Action audit logs", "Instant rollback"]
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Scalable Quality",
    description: "Deliver consistent support quality at scale, even as automation expands. Maintain brand voice and accuracy across millions of interactions.",
    features: ["Quality scoring", "Brand consistency", "Continuous learning", "A/B testing"]
  },
];

export function QualitySection() {
  return (
    <section className="relative bg-[#131318] px-6 py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f12] via-transparent to-[#0f0f12] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.05] rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Built for Production
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-white lg:text-5xl mb-4">
            Quality, visibility, and control
            <br />
            <span className="text-amber-400">at every step</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/50 leading-relaxed">
            AI automation that&apos;s not just powerful—it&apos;s visible, traceable, and fully auditable.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] p-8 ring-1 ring-white/10 transition-all duration-500 hover:ring-amber-400/30 hover:shadow-xl hover:shadow-amber-400/5 hover:-translate-y-1 lg:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/10 p-4 text-amber-400 ring-1 ring-amber-400/30 transition-all duration-300 group-hover:ring-amber-400/50 group-hover:shadow-lg group-hover:shadow-amber-400/10">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-100 transition-colors duration-300">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-white/50 mb-6">{pillar.description}</p>
                
                <ul className="space-y-2">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/40">
                      <svg className="h-3.5 w-3.5 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
