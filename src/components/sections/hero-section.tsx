import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0f0f12]">
      {/* Background Image */}
      <Image
        src="/images/duckie-landscape.png"
        alt="Duckie landscape"
        fill
        priority
        quality={100}
        unoptimized
        className="object-cover object-bottom scale-105 animate-fade-in opacity-80"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f12]/90 via-[#0f0f12]/40 to-[#0f0f12]" />
      
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.08] rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/[0.06] rounded-full blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 text-xs font-medium text-white/70 ring-1 ring-white/10 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Enterprise-ready • SOC 2 Type II Compliant
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 leading-[1.1]">
          AI support agents that
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">resolve tickets end to end</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 max-w-2xl text-lg text-white/60 drop-shadow-lg sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 font-light leading-relaxed">
          The AI support automation platform built for accuracy, transparency, and control. Deploy agents that follow your SOPs, take actions across your systems, and scale with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <button className="group relative rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-base font-semibold text-zinc-900 shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/50 active:scale-100 hover:-translate-y-0.5">
            Book a Demo
          </button>
          <button className="group rounded-full px-8 py-4 text-base font-medium text-white/80 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/[0.08] hover:ring-white/30 hover:text-white">
            See How It Works
            <svg className="inline-block ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Logo Bar */}
        <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Trusted by support teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 px-6">
            {["Stripe", "Notion", "Linear", "Vercel", "Figma"].map(
              (partner) => (
                <span
                  key={partner}
                  className="text-sm font-semibold text-white/40 transition-all duration-300 hover:text-white/60 cursor-default"
                >
                  {partner}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
