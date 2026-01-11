const stats = [
  { value: "82", suffix: "%", label: "Avg. resolution rate" },
  { value: "76", suffix: "%", label: "Faster handle time" },
  { value: "<2", suffix: "min", label: "First response" },
  { value: "4.8", suffix: "/5", label: "CSAT maintained" },
];

const caseStudies = [
  {
    company: "TechScale",
    industry: "SaaS",
    metrics: [
      { value: "82%", label: "Resolution rate" },
      { value: "2.3x", label: "Support capacity" },
    ],
    quote: "We went from 40% automation to 82% in weeks—not months.",
    author: "Sarah Chen",
    role: "VP of Customer Experience",
  },
  {
    company: "FinServe Global",
    industry: "Financial Services",
    metrics: [
      { value: "76%", label: "Faster resolution" },
      { value: "99.2%", label: "Compliance rate" },
    ],
    quote: "The audit trail is essential for our compliance requirements.",
    author: "Marcus Johnson",
    role: "Head of Support Operations",
  },
  {
    company: "CloudCart",
    industry: "E-commerce",
    metrics: [
      { value: "45K", label: "Tickets/month" },
      { value: "4.9/5", label: "CSAT score" },
    ],
    quote: "Our CSAT actually improved after scaling to 45K tickets.",
    author: "Elena Rodriguez",
    role: "Director of CX",
  },
];

export function SocialProofSection() {
  return (
    <section id="platform" className="relative bg-[#0f0f12] px-6 py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Proven Results
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-white lg:text-4xl">
            Real impact for real support teams
          </h2>
        </div>

        {/* Overall Metrics - Compact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-5xl font-light tracking-tight text-white lg:text-6xl">
                {stat.value}
                <span className="text-amber-400 text-3xl lg:text-4xl">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <div
              key={study.company}
              className="group relative rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 ring-1 ring-white/[0.08] transition-all duration-500 hover:ring-amber-400/20 hover:-translate-y-1 lg:p-8"
            >
              {/* Company Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{study.company}</h3>
                  <p className="text-xs text-white/40">{study.industry}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08] flex items-center justify-center">
                  <span className="text-sm font-bold text-white/30">{study.company[0]}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-4xl font-light text-amber-400 lg:text-5xl">{metric.value}</p>
                    <p className="text-[11px] text-white/40 uppercase tracking-wider mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-white/70 leading-relaxed mb-6">
                &ldquo;{study.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400/80 to-orange-500/80 flex items-center justify-center text-zinc-900 font-semibold text-xs">
                  {study.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">{study.author}</p>
                  <p className="text-xs text-white/40">{study.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
