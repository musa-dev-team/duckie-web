"use client";

import { RunbookAccordion } from "@/components/runbook-accordion";
import Image from "next/image";
import { useState } from "react";
import { stepCards } from "./runbook-cards";

export function PlatformSection() {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section id="how-it-works" className="relative bg-[#131318] px-6 py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f12] via-transparent to-[#0f0f12] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              The Platform
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-white lg:text-5xl mb-4">
            Enterprise-grade AI for
            <br />
            <span className="text-amber-400">complex support operations</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/50 leading-relaxed">
            Design agents that understand your business, follow your rules, and take real actions—all with complete visibility and control.
          </p>
        </div>

        {/* Main Content Card */}
        <div 
          className="overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 via-zinc-900 to-zinc-800/50 ring-1 ring-white/[0.1] shadow-2xl relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: Runbook Info */}
            <div className="border-b lg:border-b-0 lg:border-r border-white/[0.08] p-8 lg:p-12">
              {/* Product Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="rounded-xl bg-gradient-to-br from-amber-400/25 to-orange-500/15 p-4 ring-1 ring-amber-400/40">
                  <svg className="h-7 w-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Duckie Runbooks</h3>
                  <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mt-1">The control plane for AI support</p>
                </div>
              </div>
              
              <p className="text-white/60 leading-relaxed mb-10">
                Define how your AI agents operate with natural-language runbooks. Capture your SOPs, configure actions, set guardrails, and deploy with confidence.
              </p>

              {/* Feature Accordion */}
              <RunbookAccordion onActiveChange={setActiveAccordionIndex} isPaused={isPaused} />

              <a
                href="#"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40"
              >
                Explore Duckie Runbooks
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Right: Visual Demo */}
            <div className="relative min-h-[500px] lg:min-h-[700px] overflow-hidden">
              {/* Preload all ocean background images with smooth crossfade */}
              {[1, 2, 3, 4, 5].map((n) => (
                <Image
                  key={n}
                  src={`/images/ocean-bg-${n}.jpg`}
                  alt=""
                  fill
                  priority
                  className={`object-cover transition-all duration-700 ease-in-out ${activeAccordionIndex === n - 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-zinc-900/30" />
              
              {/* Card content - render all cards and crossfade between them */}
              <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-10">
                {stepCards.map((CardComponent, index) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-700 ease-in-out ${
                      activeAccordionIndex === index 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <CardComponent />
                  </div>
                ))}
              </div>

              {/* Pause/Play Button */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`absolute bottom-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-sm ring-1 ring-white/20 text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 ${
                  isHovering || isPaused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
                aria-label={isPaused ? 'Play' : 'Pause'}
              >
                {isPaused ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
