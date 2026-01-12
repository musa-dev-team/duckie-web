"use client"

import { useState, useEffect } from "react"
import { content } from "@/config/content"
import { cn } from "@/lib/utils"

// ============================================
// VARIATION 5: Carousel/Slider Style
// ============================================
// Full-width immersive slides that transition
// between steps. More dramatic and engaging.

export function HowItWorksCarousel() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = content.howItWorks.steps

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [steps.length])

  const goToNext = () => setActiveStep((current) => (current + 1) % steps.length)
  const goToPrev = () => setActiveStep((current) => (current - 1 + steps.length) % steps.length)

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Content Area */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50 border-2 border-gray-200">
            {/* Slides */}
            <div className="relative w-full h-full">
              {steps.map((step, index) => {
                const isActive = activeStep === index
                const isPrev = activeStep === (index + 1) % steps.length
                const isNext = activeStep === (index - 1 + steps.length) % steps.length

                return (
                  <div
                    key={step.number}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-in-out",
                      isActive
                        ? "opacity-100 translate-x-0 scale-100"
                        : isPrev
                        ? "opacity-0 -translate-x-full scale-95"
                        : "opacity-0 translate-x-full scale-95"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                      {/* Step Number Badge */}
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white text-3xl font-bold mb-8 shadow-lg">
                        {step.number}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-4xl font-bold text-gray-900 mb-6">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
                        {step.description}
                      </p>

                      {/* Product Screenshot Placeholder */}
                      <div className="w-full max-w-md aspect-video bg-white/50 rounded-xl border border-gray-300 flex items-center justify-center">
                        <div className="text-gray-400">
                          Product screenshot: {step.title}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
              aria-label="Previous step"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
              aria-label="Next step"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  activeStep === index
                    ? "w-12 h-3 bg-blue-500"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Step Counter */}
          <div className="text-center mt-4 text-gray-600 font-medium">
            Step {activeStep + 1} of {steps.length}
          </div>
        </div>

        {/* Link */}
        <div className="mt-12 text-center">
          <a
            href="/how-it-works"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Explore in detail
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 6: Interactive Cards Grid
// ============================================
// All steps visible as cards, click to expand.
// More visual, less linear.

export function HowItWorksCards() {
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
            Click any step to see it in action
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "relative p-6 rounded-2xl transition-all duration-300",
                    "border-2 text-left group",
                    isActive
                      ? "bg-blue-500 border-blue-500 shadow-xl shadow-blue-500/25 scale-105"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                  )}
                >
                  {/* Number */}
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 font-bold transition-colors",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                    )}
                  >
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "font-bold mb-2 transition-colors",
                      isActive ? "text-white" : "text-gray-900"
                    )}
                  >
                    {step.title}
                  </h3>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Expanded Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                    {steps[activeStep].number}
                  </div>
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                    Step {activeStep + 1} of {steps.length}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                  {steps[activeStep].title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Right: Visual */}
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-7xl font-bold text-blue-500 mb-4">
                    {steps[activeStep].number}
                  </div>
                  <div className="text-gray-500">
                    Product screenshot: {steps[activeStep].title}
                  </div>
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
            See the complete workflow
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 7: Diagonal/Zigzag Layout
// ============================================
// Steps alternate left-right in a zigzag pattern.
// More dynamic and visual interest.

export function HowItWorksZigzag() {
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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
        </div>

        {/* Zigzag Layout */}
        <div className="max-w-6xl mx-auto space-y-16">
          {steps.map((step, index) => {
            const isActive = activeStep === index
            const isLeft = index % 2 === 0

            return (
              <div
                key={step.number}
                className={cn(
                  "relative",
                  isActive && "z-10"
                )}
              >
                <div
                  className={cn(
                    "grid md:grid-cols-2 gap-8 items-center",
                    !isLeft && "md:grid-flow-dense"
                  )}
                >
                  {/* Content */}
                  <button
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "p-8 rounded-2xl transition-all duration-300 text-left group",
                      isLeft ? "md:col-start-1" : "md:col-start-2",
                      isActive
                        ? "bg-blue-500 shadow-2xl shadow-blue-500/25 scale-105"
                        : "bg-gray-50 hover:bg-gray-100 hover:shadow-lg"
                    )}
                  >
                    {/* Number Badge */}
                    <div
                      className={cn(
                        "inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 font-bold text-xl transition-all",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-white text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                      )}
                    >
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-2xl font-bold mb-3 transition-colors",
                        isActive ? "text-white" : "text-gray-900"
                      )}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-base leading-relaxed transition-colors",
                        isActive ? "text-white/90" : "text-gray-600"
                      )}
                    >
                      {step.description}
                    </p>

                    {/* Click hint */}
                    {!isActive && (
                      <div className="mt-4 text-sm text-gray-400 group-hover:text-blue-600 transition-colors">
                        Click to view →
                      </div>
                    )}
                  </button>

                  {/* Visual */}
                  <div
                    className={cn(
                      "aspect-[4/3] rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                      isLeft ? "md:col-start-2" : "md:col-start-1",
                      isActive
                        ? "border-blue-500 shadow-xl"
                        : "border-gray-200 opacity-60"
                    )}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-6xl font-bold text-gray-300 mb-2">
                          {step.number}
                        </div>
                        <div className="text-sm text-gray-400">
                          {step.title} screenshot
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Line (except last) */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <svg
                      className={cn(
                        "w-8 h-8 transition-colors",
                        activeStep > index ? "text-blue-500" : "text-gray-300"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Link */}
        <div className="mt-16 text-center">
          <a
            href="/how-it-works"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Deep dive into the process
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// VARIATION 8: Minimal Dots Navigation
// ============================================
// Super clean, minimal approach with large dots
// as the main navigation. Very Apple-esque.

export function HowItWorksMinimal() {
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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl font-normal mb-4 text-gray-900">
            {content.howItWorks.title}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Large Visual Area */}
          <div className="relative aspect-[16/10] mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 border border-gray-200">
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center max-w-2xl">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white text-3xl font-bold mb-8 shadow-lg">
                  {steps[activeStep].number}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  {steps[activeStep].title}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-6 mb-8">
            {steps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="group flex flex-col items-center gap-3"
                >
                  {/* Large Dot */}
                  <div
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      isActive
                        ? "w-5 h-5 bg-blue-500 scale-125"
                        : "w-4 h-4 bg-gray-300 group-hover:bg-gray-400"
                    )}
                  />
                  {/* Label appears on hover or when active */}
                  <span
                    className={cn(
                      "text-xs font-medium transition-all duration-300 whitespace-nowrap",
                      isActive
                        ? "opacity-100 text-gray-900"
                        : "opacity-0 group-hover:opacity-100 text-gray-500"
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Step Counter */}
          <div className="text-center text-gray-500 text-sm">
            {activeStep + 1} / {steps.length}
          </div>
        </div>

        {/* Link */}
        <div className="mt-16 text-center">
          <a
            href="/how-it-works"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Learn more
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksCarousel
