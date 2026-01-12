"use client"

import { Button } from "@/components/ui/button"
import { content } from "@/config/content"

// Variation 6: With Social Proof Stats
export function FinalCtaWithStats() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {content.socialProof.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                  <span className="text-blue-600">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
            {content.finalCta.headline}
          </h2>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg"
          >
            {content.finalCta.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

// Variation 7: With Testimonial Quote
export function FinalCtaWithTestimonial() {
  const testimonial = content.socialProof.featuredTestimonial

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 relative">
            <div className="absolute -top-4 left-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-900 mb-6 italic">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
              {content.finalCta.headline}
            </h2>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg"
            >
              {content.finalCta.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Variation 8: Full-Width Banner
export function FinalCtaBanner() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6">
          {content.finalCta.headline}
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Transform your support team today. No credit card required.
        </p>
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-xl"
        >
          {content.finalCta.cta}
        </Button>

        {/* Quick trust indicators */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
          <span>✓ 2-hour setup</span>
          <span>•</span>
          <span>✓ SOC 2 compliant</span>
          <span>•</span>
          <span>✓ No credit card</span>
        </div>
      </div>
    </section>
  )
}

// Variation 9: Two-Column with Benefits
export function FinalCtaTwoColumn() {
  const benefits = [
    { icon: "⚡", text: "Live in under 2 hours" },
    { icon: "🔒", text: "SOC 2 Type II certified" },
    { icon: "📈", text: "82% average resolution rate" },
    { icon: "🤝", text: "Dedicated implementation support" },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: CTA */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
                {content.finalCta.headline}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join leading support teams who've transformed their operations with Duckie.
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg w-full md:w-auto"
              >
                {content.finalCta.cta}
              </Button>
            </div>

            {/* Right: Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What you'll get:
              </h3>
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-gray-700 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Variation 9 Alt: Two-Column Outer Sides (No Background)
export function FinalCtaTwoColumnOuter() {
  const benefits = [
    { icon: "⚡", text: "Live in under 2 hours" },
    { icon: "🔒", text: "SOC 2 Type II certified" },
    { icon: "📈", text: "82% average resolution rate" },
    { icon: "🤝", text: "Dedicated implementation support" },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Left: CTA */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
                {content.finalCta.headline}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join leading support teams who've transformed their operations with Duckie.
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg w-full md:w-auto"
              >
                {content.finalCta.cta}
              </Button>
            </div>

            {/* Right: Benefits - aligned to the right */}
            <div className="md:ml-auto">
              {benefits.map((benefit, idx) => (
                <div key={idx}>
                  <div className="py-4">
                    <span className="text-gray-700 font-medium">{benefit.text}</span>
                  </div>
                  {idx !== benefits.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-gray-300 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Light Theme Version for Homepage
export function FinalCta() {
  const benefits = [
    "Live in under 2 hours",
    "SOC 2 Type II certified",
    "82% average resolution rate",
    "Dedicated implementation support",
  ]

  return (
    <section className="relative bg-white overflow-y-visible overflow-x-clip" data-theme="light">
      {/* Main content */}
      <div className="container mx-auto px-6 pt-24 pb-48 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left: CTA */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
              {content.finalCta.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join leading support teams who've transformed their operations with Duckie.
            </p>
            <Button 
              size="default" 
              className="text-base px-6 py-4 transition-all hover:scale-105 hover:shadow-lg w-full md:w-auto"
            >
              {content.finalCta.cta}
            </Button>
          </div>

          {/* Right: Benefits - aligned to the right */}
          <div className="md:ml-auto">
            {benefits.map((benefit, idx) => (
              <div key={idx}>
                <div className="py-4">
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
                {idx !== benefits.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-gray-300 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shared colorful glow that washes into footer */}
      <div 
        className="absolute -bottom-24 right-0 w-[70vw] h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(242, 234, 248, 0.8) 0%, rgba(234, 240, 250, 0.6) 25%, rgba(236, 250, 244, 0.5) 50%, transparent 75%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      {/* Big Cutoff Duckie Text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none pr-12">
        <div className="relative flex justify-end pr-8">
          {/* Glow layer - blurred duplicate behind */}
          <span 
            className="absolute text-[28vw] font-black leading-[0.75] tracking-tight animate-glow-colorful"
            style={{ transform: 'translateY(45%) scale(1.3)', filter: 'blur(100px)' }}
            aria-hidden="true"
          >
            Duckie
          </span>
          
          {/* Main text with animated gradient */}
          <span 
            className="relative text-[24vw] font-black leading-[0.75] tracking-tight animate-gradient-text"
            style={{ transform: 'translateY(35%)' }}
          >
            Duckie
          </span>
        </div>
      </div>
    </section>
  )
}
