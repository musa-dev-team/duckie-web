"use client"

import { Button } from "@/components/ui/button"
import { content } from "@/config/content"

// Variation 1: Minimal Centered (as per wireframes)
export function FinalCtaMinimal() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
          {content.finalCta.headline}
        </h2>
        {content.finalCta.subheadline && (
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {content.finalCta.subheadline}
          </p>
        )}
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg"
        >
          {content.finalCta.cta}
        </Button>
      </div>
    </section>
  )
}

// Variation 2: Large & Bold
export function FinalCtaBold() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-5xl md:text-7xl font-normal text-gray-900 mb-8 leading-tight">
          {content.finalCta.headline}
        </h2>
        <Button 
          size="lg" 
          className="text-xl px-12 py-8 transition-all hover:scale-105 hover:shadow-2xl"
        >
          {content.finalCta.cta}
        </Button>
      </div>
    </section>
  )
}

// Variation 3: Split with Visual
export function FinalCtaSplit() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: CTA */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
              {content.finalCta.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              See how Duckie can transform your support operations in a personalized demo.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg"
            >
              {content.finalCta.cta}
            </Button>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">82% Resolution Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Variation 4: Boxed Card Style
export function FinalCtaBoxed() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-6">
            {content.finalCta.headline}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 100+ companies already using Duckie to handle thousands of customer conversations.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg"
          >
            {content.finalCta.cta}
          </Button>
          
          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Setup in &lt;2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span>82% resolution rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Variation 5: Gradient Background
export function FinalCtaGradient() {
  return (
    <section className="py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="font-serif text-5xl md:text-6xl font-normal text-gray-900 mb-8">
          {content.finalCta.headline}
        </h2>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          See how leading support teams are achieving 82% automation without sacrificing quality.
        </p>
        <Button 
          size="lg" 
          className="text-lg px-10 py-7 transition-all hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {content.finalCta.cta}
        </Button>
      </div>
    </section>
  )
}
