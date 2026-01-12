"use client"

import { useState, useEffect, useCallback } from "react"
import { content } from "@/config/content"
import { cn } from "@/lib/utils"

// ============================================
// VARIATION 1: Split View with Timeline
// ============================================
// Classic left-right split with a vertical timeline
// connecting the steps. Clean and professional.

export function HowItWorksTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = content.howItWorks.steps

  // Auto-rotate through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, 4000) // 4 seconds per step

    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
          <p className="text-lg text-gray-600">
            From understanding customer needs to taking action and learning from every interaction.
          </p>
        </div>

        {/* Split View */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Steps with Timeline */}
          <div className="relative">
            <div className="space-y-8">
              {steps.map((step, index) => {
                const isActive = activeStep === index
                const isPast = activeStep > index

                return (
                  <div
                    key={step.number}
                    className={cn(
                      "relative pl-12 cursor-pointer transition-all duration-300",
                      "hover:scale-[1.02] origin-left"
                    )}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Timeline Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "absolute left-[19px] top-12 w-[2px] h-16 transition-all duration-500",
                          isPast || isActive ? "bg-blue-500" : "bg-gray-200"
                        )}
                      />
                    )}

                    {/* Number Indicator */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center",
                        "font-bold text-sm transition-all duration-300 border-2",
                        isActive
                          ? "bg-blue-500 text-white border-blue-500 scale-110"
                          : isPast
                          ? "bg-blue-100 text-blue-600 border-blue-500"
                          : "bg-white text-gray-400 border-gray-200"
                      )}
                    >
                      {step.number}
                    </div>

                    {/* Content */}
                    <div>
                      <h3
                        className={cn(
                          "text-xl font-bold mb-2 transition-colors duration-300",
                          isActive ? "text-gray-900" : "text-gray-600"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "text-base transition-colors duration-300",
                          isActive ? "text-gray-700" : "text-gray-500"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Image Area */}
          <div className="relative lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
              {/* Placeholder for product images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">{steps[activeStep].number}</div>
                  <div className="text-xl font-bold text-gray-700 mb-2">
                    {steps[activeStep].title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Product screenshot: Step {activeStep + 1}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeStep === index
                      ? "w-8 bg-blue-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Link */}
        <div className="mt-12 text-center">
          <a
            href="/how-it-works"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Learn more about how Duckie works
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 2: Horizontal Stepper with Cards
// ============================================
// Steps displayed horizontally at top, with content
// cards below. More modern and compact.

export function HowItWorksHorizontal() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = content.howItWorks.steps

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <section className="relative py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
          <p className="text-lg text-gray-600">
            Five steps. Countless tickets resolved.
          </p>
        </div>

        {/* Horizontal Step Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Bar Background */}
            <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-300" />
            {/* Progress Bar Fill */}
            <div
              className="absolute top-5 left-0 h-[2px] bg-blue-500 transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step, index) => {
              const isActive = activeStep === index
              const isPast = activeStep > index

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className="relative flex flex-col items-center gap-3 group z-10"
                >
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      "font-bold text-sm transition-all duration-300 border-2",
                      "group-hover:scale-110",
                      isActive
                        ? "bg-blue-500 text-white border-blue-500 scale-125"
                        : isPast
                        ? "bg-blue-100 text-blue-600 border-blue-500"
                        : "bg-white text-gray-400 border-gray-300"
                    )}
                  >
                    {step.number}
                  </div>
                  {/* Label */}
                  <div
                    className={cn(
                      "text-sm font-medium transition-colors whitespace-nowrap",
                      isActive ? "text-gray-900" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Description Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-sm font-medium text-blue-600 mb-2">
                Step {steps[activeStep].number}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {steps[activeStep].title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Right: Visual */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4 text-blue-500 font-bold">
                  {steps[activeStep].number}
                </div>
                <div className="text-gray-400 text-sm">
                  Product screenshot: {steps[activeStep].title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Link */}
        <div className="mt-12 text-center">
          <a
            href="/how-it-works"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Dive deeper into the process
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 3: Accordion Style with Slide-in
// ============================================
// Each step expands to show details and image.
// More interactive and space-efficient.

export function HowItWorksAccordion() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = content.howItWorks.steps

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map((step, index) => {
            const isActive = activeStep === index

            return (
              <div
                key={step.number}
                className={cn(
                  "border-2 rounded-2xl overflow-hidden transition-all duration-300",
                  isActive
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                {/* Header - Always Visible */}
                <button
                  onClick={() => setActiveStep(index)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                      "font-bold transition-all duration-300",
                      isActive
                        ? "bg-blue-500 text-white scale-110"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "text-xl font-bold transition-colors",
                        isActive ? "text-gray-900" : "text-gray-700"
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <svg
                    className={cn(
                      "flex-shrink-0 w-6 h-6 text-gray-400 transition-transform duration-300",
                      isActive ? "rotate-180" : ""
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Expanded Content */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="flex flex-col md:flex-row gap-6 pl-16">
                      {/* Description */}
                      <div className="flex-1">
                        <p className="text-gray-600 text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      {/* Image */}
                      <div className="flex-1">
                        <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="text-4xl mb-2">{step.number}</div>
                            <div className="text-sm text-gray-500">
                              {step.title} screenshot
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Link */}
        <div className="mt-12 text-center">
          <a
            href="/how-it-works"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            See the full process in action
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 4: Full-Width Tabs
// ============================================
// Tabs at the top, large image below.
// Maximum visual emphasis on the product.

export function HowItWorksTabs() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = content.howItWorks.steps

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
          <p className="text-lg text-gray-600">
            Click through each step to see how it works.
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {steps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300",
                    "flex items-center gap-3",
                    isActive
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold",
                      isActive ? "bg-white/20" : "bg-gray-200"
                    )}
                  >
                    {step.number}
                  </span>
                  <span>{step.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {steps[activeStep].description}
            </p>
          </div>

          {/* Large Image Area */}
          <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden border-2 border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-12">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-500 text-white text-4xl font-bold mb-6">
                  {steps[activeStep].number}
                </div>
                <div className="text-2xl font-bold text-gray-700 mb-3">
                  {steps[activeStep].title}
                </div>
                <div className="text-gray-500">
                  Product screenshot will appear here
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Step {activeStep + 1} of {steps.length}</span>
              <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Link */}
        <div className="mt-12 text-center">
          <a
            href="/how-it-works"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Explore the complete workflow
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// Default export - you can change which one to use
export default HowItWorksTimeline
