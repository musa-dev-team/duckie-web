"use client"

import { Fraunces, Playfair_Display, Cormorant, Lora, Crimson_Text, Source_Serif_4, Libre_Baskerville } from "next/font/google"

// Load all the fonts with their supported weights
const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "400"] })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400"] })
const cormorant = Cormorant({ subsets: ["latin"], weight: ["300", "400"] })
const lora = Lora({ subsets: ["latin"], weight: ["400"] })
const crimson = Crimson_Text({ subsets: ["latin"], weight: ["400"] })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["300", "400"] })
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400"] })

const fonts = [
  { name: "Fraunces", font: fraunces, description: "Modern serif with optical sizes, elegant and thin" },
  { name: "Playfair Display", font: playfair, description: "High-contrast display serif, very elegant" },
  { name: "Cormorant", font: cormorant, description: "Ultra-light display serif, very refined" },
  { name: "Lora", font: lora, description: "Brushed curves, contemporary serif" },
  { name: "Crimson Text", font: crimson, description: "Classic book typeface, readable and elegant" },
  { name: "Source Serif Pro", font: sourceSerif, description: "Clean, modern serif from Adobe" },
  { name: "Libre Baskerville", font: libreBaskerville, description: "Classic Baskerville revival" },
]

export default function FontDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Serif Font Preview</h1>
          <p className="text-gray-600">Compare different thin serif fonts for your section headers</p>
        </div>

        <div className="space-y-16">
          {fonts.map(({ name, font, description }) => (
            <div key={name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Font Info Header */}
              <div className="bg-gray-900 text-white px-8 py-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>

              {/* Light Background Sample */}
              <div className="p-8 md:p-12 bg-white">
                <div className={font.className}>
                  <h2 className="text-5xl md:text-6xl font-light leading-[1.1] tracking-tight text-gray-900 mb-6">
                    AI support agents that actually resolve tickets
                  </h2>
                  <p className="text-xl text-gray-600 font-normal">
                    Not just answers — real actions.
                  </p>
                </div>
              </div>

              {/* Dark Background Sample */}
              <div className="p-8 md:p-12 bg-zinc-900">
                <div className={font.className}>
                  <h2 className="text-5xl md:text-6xl font-light leading-[1.1] tracking-tight text-zinc-50 mb-6">
                    Works across all your channels
                  </h2>
                  <p className="text-xl text-zinc-400 font-normal">
                    Zendesk, Intercom, Slack, and more.
                  </p>
                </div>
              </div>

              {/* Gradient Background Sample */}
              <div className="relative p-8 md:p-12 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className={font.className}>
                  <h2 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight text-gray-900 mb-4">
                    Setup in hours, not weeks
                  </h2>
                  <p className="text-lg text-gray-600 font-normal">
                    Most teams are live within 2 hours
                  </p>
                </div>
              </div>

              {/* Smaller Heading Sample */}
              <div className="p-8 md:p-12 bg-gray-50 border-t border-gray-200">
                <div className={font.className}>
                  <h3 className="text-4xl font-light text-gray-900 mb-4">
                    What Duckie does
                  </h3>
                  <p className="text-base text-gray-600 font-normal">
                    See how it handles real customer requests
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to homepage
          </a>
        </div>
      </div>
    </div>
  )
}
