import { IntegrationGrid } from "@/components/integration-grid";

const languages = ["English", "Español", "Français", "Deutsch", "Português", "日本語", "한국어", "+40 more"];

const features = [
  "Unified inbox across all channels",
  "Context preserved across conversations",
  "Real-time language detection & translation",
];

export function OmnichannelSection() {
  return (
    <section id="channels" className="relative bg-[#0f0f12] px-6 py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Background ambient effects */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-orange-500/[0.04] rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Omnichannel
              </span>
            </div>
            <h2 className="text-3xl font-semibold text-white lg:text-5xl mb-6 leading-tight">
              One agent.
              <br />
              <span className="text-amber-400">Every channel. Every language.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed mb-8">
              Design your AI agent once and deploy it consistently across email, chat, and in-app widgets—in any language your customers speak.
            </p>
            
            {/* Language Support */}
            <div className="flex flex-wrap gap-2 mb-8">
              {languages.map((lang) => (
                <span key={lang} className="px-3 py-1.5 rounded-full bg-white/[0.06] text-xs font-medium text-white/60 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.1] hover:ring-white/20">
                  {lang}
                </span>
              ))}
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-white/50">
                  <svg className="h-4 w-4 text-amber-400/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Channel Grid */}
          <div className="lg:pl-4">
            <IntegrationGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
