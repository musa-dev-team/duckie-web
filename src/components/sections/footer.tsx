const productLinks = ["Duckie Runbooks", "Integrations", "Insights", "Security"];
const companyLinks = ["About", "Blog", "Careers", "Contact"];
const legalLinks = ["Privacy", "Terms", "Cookies", "Trust Center"];
const badges = ["SOC 2 Type II", "GDPR", "HIPAA"];

const socialLinks = [
  { name: "Twitter", path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
  { name: "GitHub", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { name: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
];

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0d] px-6 py-20 border-t border-white/[0.08] overflow-hidden">
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-5 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold text-white tracking-tight">
              Duckie<span className="text-amber-400">.</span>
            </div>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              The AI support automation platform built for accuracy, transparency, and control across real production operations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {badges.map((badge) => (
                <div key={badge} className="rounded-lg bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/60 ring-1 ring-white/[0.1] hover:ring-white/20 transition-all duration-300">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Product</h4>
            <ul className="mt-6 space-y-3">
              {productLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 transition-all duration-300 hover:text-amber-400 hover:translate-x-0.5 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Company</h4>
            <ul className="mt-6 space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 transition-all duration-300 hover:text-amber-400 hover:translate-x-0.5 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Legal</h4>
            <ul className="mt-6 space-y-3">
              {legalLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 transition-all duration-300 hover:text-amber-400 hover:translate-x-0.5 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-10 sm:flex-row">
          <p className="text-xs text-white/30">
            © 2026 Duckie AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a key={social.name} href="#" className="group rounded-full bg-white/[0.06] p-3 text-white/40 ring-1 ring-white/[0.08] transition-all duration-300 hover:bg-white/[0.12] hover:text-amber-400 hover:ring-white/20 hover:-translate-y-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
