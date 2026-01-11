export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f12]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white tracking-tight">
            Duckie<span className="text-amber-400">.</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" className="text-sm text-white/60 hover:text-white transition-colors">Platform</a>
            <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How it Works</a>
            <a href="#channels" className="text-sm text-white/60 hover:text-white transition-colors">Channels</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Blog</a>
          </div>
          <button className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2 text-sm font-semibold text-zinc-900 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40">
            Book Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
