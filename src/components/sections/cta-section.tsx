import Image from "next/image";

export function CTASection() {
  return (
    <section id="cta" className="relative bg-[#0f0f12] px-6 py-20 lg:py-28 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/pond-bg-7.jpg"
        alt=""
        fill
        priority
        className="object-cover brightness-[0.9] scale-105"
      />
      
      {/* Gradient overlays for smooth transitions */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f12] via-transparent to-[#0a0a0d]" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0f0f12_90%)]" />
      
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      
      <div className="relative mx-auto max-w-3xl text-center">
        {/* Frosted glass backdrop */}
        <div className="absolute inset-0 -inset-x-6 -inset-y-8 lg:-inset-x-12 lg:-inset-y-10 rounded-2xl bg-black/40 backdrop-blur-md ring-1 ring-white/[0.08]" />
        
        <div className="relative py-2 lg:py-4">
          {/* Trust badge - smaller */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 ring-1 ring-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-300">Join 500+ companies automating support</span>
          </div>
          
          <h2 className="text-3xl font-semibold text-white lg:text-5xl leading-tight">
            Ready to automate support
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">the right way?</span>
          </h2>
          <p className="mt-5 text-base text-white/60 lg:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Join teams using Duckie to resolve more tickets with full transparency, visibility, and control.
          </p>
          
          {/* CTA Buttons Container */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Primary CTA Button */}
            <button className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3 text-sm font-semibold text-zinc-900 shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40 active:scale-95 hover:-translate-y-0.5">
              <span className="relative flex items-center gap-2">
                Book a Demo
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            {/* Secondary CTA Button */}
            <button className="group rounded-full bg-white/[0.08] backdrop-blur-sm px-7 py-3 text-sm font-medium text-white/90 ring-1 ring-white/20 transition-all duration-300 hover:bg-white/[0.12] hover:ring-white/30 hover:text-white hover:-translate-y-0.5 active:scale-95">
              <span className="flex items-center gap-2">
                Explore Documentation
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
