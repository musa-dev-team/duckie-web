"use client";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
  metricLabel?: string;
}

export function TestimonialCard({ quote, author, role, company, metric, metricLabel }: TestimonialCardProps) {
  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] p-8 ring-1 ring-white/10 transition-all duration-500 hover:ring-amber-400/30 hover:shadow-xl hover:shadow-amber-400/5 hover:-translate-y-1 lg:p-10">
      {/* Decorative quote mark */}
      <div className="absolute -top-4 left-6 text-7xl font-serif text-amber-400/20 select-none leading-none">"</div>
      
      {metric && metricLabel && (
        <div className="mb-6 pb-6 border-b border-white/10">
          <p className="text-4xl font-light text-amber-400 lg:text-5xl">
            {metric}
          </p>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-wider font-medium">
            {metricLabel}
          </p>
        </div>
      )}
      
      <blockquote className="relative text-lg leading-relaxed text-white/90 lg:text-xl font-light">
        "{quote}"
      </blockquote>
      
      <div className="mt-8 flex items-center gap-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400/80 to-orange-500/80 flex items-center justify-center text-zinc-900 font-bold text-lg">
            {author.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-sm text-white/50">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
}
