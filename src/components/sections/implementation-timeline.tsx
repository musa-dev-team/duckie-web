"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Implementation Timeline - Section 5 Replacement
// Shows the process of getting Duckie up and running

const timelineSteps = [
  {
    number: 1,
    title: "Connect",
    subtitle: "Link your tools",
    description: "Connect your support channels (Zendesk, Intercom, Slack) and knowledge sources (Notion, Confluence, Drive) in minutes.",
    duration: "5 minutes",
    icon: "🔗",
  },
  {
    number: 2,
    title: "Configure",
    subtitle: "Set the rules",
    description: "Define your guidelines, guardrails, and escalation rules. Control what the AI can and can't do.",
    duration: "15 minutes",
    icon: "⚙️",
  },
  {
    number: 3,
    title: "Test",
    subtitle: "Validate everything",
    description: "Use the playground to test conversations. Run batch tests. Refine until you're confident.",
    duration: "1 hour",
    icon: "🧪",
  },
  {
    number: 4,
    title: "Deploy",
    subtitle: "Go live or shadow",
    description: "Choose Live mode for full automation, or Shadow mode to review responses before they're sent.",
    duration: "1 click",
    icon: "🚀",
  },
]

// ============================================
// VARIATION 1: Horizontal Timeline
// ============================================
// Classic horizontal timeline with connecting line

export function TimelineHorizontal() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            From setup to resolution in under 2 hours
          </h2>
          <p className="text-lg text-gray-600">
            Get your AI support agent live and handling real tickets faster than you'd onboard a human.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Desktop: Horizontal */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-gray-200" />
              <div
                className="absolute top-16 left-0 h-1 bg-blue-500 transition-all duration-500"
                style={{ width: `${(activeStep / (timelineSteps.length - 1)) * 100}%` }}
              />

              {/* Steps */}
              <div className="relative grid grid-cols-4 gap-4">
                {timelineSteps.map((step, index) => {
                  const isActive = activeStep === index
                  const isPast = activeStep > index

                  return (
                    <button
                      key={step.number}
                      onClick={() => setActiveStep(index)}
                      className="group flex flex-col items-center text-center"
                    >
                      {/* Icon Circle */}
                      <div
                        className={cn(
                          "w-32 h-32 rounded-full flex items-center justify-center text-5xl mb-4 transition-all duration-300 border-4",
                          "group-hover:scale-105",
                          isActive
                            ? "bg-blue-500 border-blue-500 scale-110 shadow-xl shadow-blue-500/25"
                            : isPast
                            ? "bg-blue-100 border-blue-500"
                            : "bg-white border-gray-300"
                        )}
                      >
                        {step.icon}
                      </div>

                      {/* Number */}
                      <div
                        className={cn(
                          "text-sm font-bold mb-2 transition-colors",
                          isActive ? "text-blue-600" : "text-gray-400"
                        )}
                      >
                        Step {step.number}
                      </div>

                      {/* Title */}
                      <h3
                        className={cn(
                          "text-xl font-bold mb-1 transition-colors",
                          isActive ? "text-gray-900" : "text-gray-600"
                        )}
                      >
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm text-gray-500 mb-2">{step.subtitle}</p>

                      {/* Duration Badge */}
                      <div
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {step.duration}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical */}
          <div className="md:hidden space-y-6">
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "w-full p-6 rounded-2xl border-2 text-left transition-all",
                    isActive
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white border-gray-200"
                  )}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl">{step.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-gray-500 mb-1">
                        Step {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Expanded Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-gray-200">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-3xl">
                {timelineSteps[activeStep].icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-blue-600 mb-2">
                  Step {timelineSteps[activeStep].number} • {timelineSteps[activeStep].duration}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {timelineSteps[activeStep].title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  {timelineSteps[activeStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Book a demo to see it in action
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 2: Vertical Flow with Checkmarks
// ============================================
// Progress-oriented vertical timeline

export function TimelineVertical() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            Launch in hours, not weeks
          </h2>
          <p className="text-lg text-gray-600">
            Most teams are handling real tickets with Duckie within a day of signing up.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Timeline */}
            <div className="relative">
              <div className="space-y-6">
                {timelineSteps.map((step, index) => {
                  const isActive = activeStep === index
                  const isPast = activeStep > index

                  return (
                    <div key={step.number} className="relative">
                      {/* Connecting Line */}
                      {index < timelineSteps.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-8 top-20 w-1 h-16 transition-all duration-500",
                            isPast || isActive ? "bg-blue-500" : "bg-gray-300"
                          )}
                        />
                      )}

                      <button
                        onClick={() => setActiveStep(index)}
                        className={cn(
                          "w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left",
                          isActive
                            ? "bg-white shadow-lg scale-105"
                            : "hover:bg-white/50"
                        )}
                      >
                        {/* Icon/Checkmark */}
                        <div
                          className={cn(
                            "flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all",
                            isActive
                              ? "bg-blue-500 text-white"
                              : isPast
                              ? "bg-green-500 text-white"
                              : "bg-gray-100"
                          )}
                        >
                          {isPast ? "✓" : step.icon}
                        </div>

                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={cn(
                                "text-xs font-bold",
                                isActive ? "text-blue-600" : "text-gray-400"
                              )}
                            >
                              STEP {step.number}
                            </span>
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                isActive
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-600"
                              )}
                            >
                              {step.duration}
                            </span>
                          </div>
                          <h3
                            className={cn(
                              "text-xl font-bold mb-1 transition-colors",
                              isActive ? "text-gray-900" : "text-gray-600"
                            )}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={cn(
                              "text-sm transition-colors",
                              isActive ? "text-gray-600" : "text-gray-500"
                            )}
                          >
                            {step.subtitle}
                          </p>
                        </div>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl">
                <div className="text-6xl mb-6">{timelineSteps[activeStep].icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {timelineSteps[activeStep].title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {timelineSteps[activeStep].description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Typical time: {timelineSteps[activeStep].duration}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start your setup today
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 3: Card Progression
// ============================================
// Cards that stack and expand

export function TimelineCards() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            Four steps to live AI support
          </h2>
          <p className="text-lg text-gray-600">
            No complex setup. No long training period. Just connect, configure, test, and go.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === index
              const isPast = activeStep > index

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "relative p-6 rounded-2xl border-2 transition-all text-left group",
                    isActive
                      ? "bg-blue-500 border-blue-500 shadow-xl shadow-blue-500/25 scale-105 z-10"
                      : isPast
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-lg"
                  )}
                >
                  {/* Number Badge */}
                  <div
                    className={cn(
                      "absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                      isActive
                        ? "bg-white text-blue-500"
                        : isPast
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    )}
                  >
                    {isPast ? "✓" : step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4">{step.icon}</div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "text-xl font-bold mb-2 transition-colors",
                      isActive ? "text-white" : "text-gray-900"
                    )}
                  >
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className={cn(
                      "text-sm mb-3 transition-colors",
                      isActive ? "text-white/80" : "text-gray-600"
                    )}
                  >
                    {step.subtitle}
                  </p>

                  {/* Duration */}
                  <div
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    )}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.duration}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Expanded Description */}
          <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200">
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              {timelineSteps[activeStep].description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            See how fast you can deploy
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 4: Animated Progress Bar
// ============================================
// Large progress bar with step indicators

export function TimelineProgressBar() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const progress = ((activeStep + 1) / timelineSteps.length) * 100

  return (
    <section className="relative py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            Ship AI support in 2 hours
          </h2>
          <p className="text-lg text-gray-600">
            From zero to live faster than your morning standup
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Large Progress Bar */}
          <div className="mb-12">
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Getting started</span>
              <span className="font-bold text-blue-600">
                {Math.round(progress)}% Complete
              </span>
              <span>Live in production</span>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === index
              const isPast = activeStep > index

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "relative p-4 rounded-xl transition-all border-2",
                    isActive
                      ? "bg-blue-500 border-blue-500 shadow-lg scale-105"
                      : isPast
                      ? "bg-green-50 border-green-500"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <div
                    className={cn(
                      "text-sm font-bold mb-1",
                      isActive ? "text-white" : "text-gray-900"
                    )}
                  >
                    {step.title}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      isActive ? "text-white/80" : "text-gray-500"
                    )}
                  >
                    {step.duration}
                  </div>
                  {isPast && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Large Content Card */}
          <div className="bg-white rounded-3xl p-12 border-2 border-gray-200 shadow-xl">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg">
                {timelineSteps[activeStep].icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-blue-600 uppercase">
                    Step {timelineSteps[activeStep].number} of {timelineSteps.length}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {timelineSteps[activeStep].duration}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {timelineSteps[activeStep].title}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {timelineSteps[activeStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Get started today
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 5: Number-Focused Minimal
// ============================================
// Large numbers with minimal design

export function TimelineMinimal() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            Four steps. Two hours. Live AI.
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Large Display */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-6xl font-bold mb-8 shadow-2xl">
              {timelineSteps[activeStep].number}
            </div>
            <h3 className="text-5xl font-bold text-gray-900 mb-4">
              {timelineSteps[activeStep].title}
            </h3>
            <p className="text-2xl text-gray-600 mb-6 max-w-2xl mx-auto">
              {timelineSteps[activeStep].description}
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg font-medium text-gray-700">
                {timelineSteps[activeStep].duration}
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mb-8">
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "group flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                    isActive ? "bg-gray-100" : "hover:bg-gray-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      isActive ? "bg-blue-500 scale-150" : "bg-gray-300"
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors whitespace-nowrap",
                      isActive ? "text-gray-900" : "text-gray-400"
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            See the setup process
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 6: Split Screen with Animation
// ============================================
// Content on left, large animated visual on right

export function TimelineSplitScreen() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            Ready to deploy in record time
          </h2>
          <p className="text-lg text-gray-600">
            Most teams go from signup to first resolved ticket in under 2 hours
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Step List */}
            <div className="space-y-4">
              {timelineSteps.map((step, index) => {
                const isActive = activeStep === index
                const isPast = activeStep > index

                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "w-full p-6 rounded-2xl transition-all text-left group border-2",
                      isActive
                        ? "bg-blue-500 border-blue-500 shadow-xl scale-105"
                        : isPast
                        ? "bg-white border-green-500"
                        : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Number/Icon */}
                      <div
                        className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all",
                          isActive
                            ? "bg-white/20 text-white"
                            : isPast
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 group-hover:bg-blue-50"
                        )}
                      >
                        {isPast ? "✓" : step.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={cn(
                              "text-xs font-bold uppercase tracking-wider",
                              isActive ? "text-white/80" : "text-gray-500"
                            )}
                          >
                            Step {step.number}
                          </span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-600"
                            )}
                          >
                            {step.duration}
                          </span>
                        </div>
                        <h3
                          className={cn(
                            "text-2xl font-bold mb-2 transition-colors",
                            isActive ? "text-white" : "text-gray-900"
                          )}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={cn(
                            "text-sm transition-colors",
                            isActive ? "text-white/90" : "text-gray-600"
                          )}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right: Large Visual */}
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
                  <div className="text-9xl mb-6 animate-pulse">
                    {timelineSteps[activeStep].icon}
                  </div>
                  <div className="text-6xl font-bold mb-4">
                    {timelineSteps[activeStep].duration}
                  </div>
                  <div className="text-2xl font-medium opacity-90">
                    {timelineSteps[activeStep].subtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Let's get you set up
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 7: Bento Grid Style
// ============================================
// Modern bento box layout with varied sizes

export function TimelineBento() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            From idea to production
          </h2>
          <p className="text-lg text-gray-600">
            The fastest way to ship AI support
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Bento Grid */}
          <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8" style={{ height: '600px' }}>
            {/* Large Feature - Spans 2x2 */}
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 flex flex-col justify-between text-white shadow-xl">
              <div>
                <div className="text-7xl mb-6">{timelineSteps[activeStep].icon}</div>
                <h3 className="text-4xl font-bold mb-4">
                  {timelineSteps[activeStep].title}
                </h3>
                <p className="text-lg opacity-90 leading-relaxed">
                  {timelineSteps[activeStep].description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-2xl font-bold">{timelineSteps[activeStep].duration}</span>
              </div>
            </div>

            {/* Small Cards - 1x1 each */}
            {timelineSteps.map((step, index) => {
              if (index === activeStep) return null
              const isPast = activeStep > index

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "rounded-2xl p-6 flex flex-col justify-between transition-all border-2",
                    isPast
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-lg"
                  )}
                >
                  <div>
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {step.title}
                    </h4>
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    {step.duration}
                  </div>
                  {isPast && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center gap-2">
            {timelineSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  activeStep === index ? "w-12 bg-blue-500" : "w-2 bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start your setup
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 8: Swipeable Mobile-First
// ============================================
// Optimized for mobile with swipe gestures

export function TimelineSwipeable() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % timelineSteps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            Setup in 4 simple steps
          </h2>
          <p className="text-lg text-gray-600">
            Swipe or click to explore each step
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Large Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-7xl">{timelineSteps[activeStep].icon}</div>
                  <div className="text-right">
                    <div className="text-sm opacity-80 mb-1">
                      Step {timelineSteps[activeStep].number} of {timelineSteps.length}
                    </div>
                    <div className="text-3xl font-bold">
                      {timelineSteps[activeStep].duration}
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  {timelineSteps[activeStep].title}
                </h3>
                <p className="text-lg opacity-90">
                  {timelineSteps[activeStep].subtitle}
                </p>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {timelineSteps[activeStep].description}
                </p>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep((current) => (current - 1 + timelineSteps.length) % timelineSteps.length)}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {timelineSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStep(index)}
                        className={cn(
                          "h-2 rounded-full transition-all",
                          activeStep === index ? "w-8 bg-blue-500" : "w-2 bg-gray-300"
                        )}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveStep((current) => (current + 1) % timelineSteps.length)}
                    className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step Overview */}
          <div className="mt-8 grid grid-cols-4 gap-3">
            {timelineSteps.map((step, index) => {
              const isActive = activeStep === index
              const isPast = activeStep > index

              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "p-3 rounded-xl transition-all border-2 text-center",
                    isActive
                      ? "bg-blue-500 border-blue-500"
                      : isPast
                      ? "bg-green-50 border-green-500"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  )}
                >
                  <div className="text-2xl mb-1">{step.icon}</div>
                  <div
                    className={cn(
                      "text-xs font-medium",
                      isActive ? "text-white" : "text-gray-600"
                    )}
                  >
                    {step.title}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Book a walkthrough
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default TimelineHorizontal
