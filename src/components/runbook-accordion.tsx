"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const DURATION = 6000; // 6 seconds per step

const steps = [
  { 
    title: "Define runbooks", 
    description: "Capture your SOPs, policies, and workflows in natural-language runbooks that guide how agents operate. No code required.",
    icon: "document"
  },
  { 
    title: "Train on your knowledge", 
    description: "Connect your knowledge bases, documentation, and historical tickets so agents deliver accurate, consistent responses.",
    icon: "brain"
  },
  { 
    title: "Configure actions", 
    description: "Control what agents can do across your systems using APIs—from lookups and updates to refunds and escalations.",
    icon: "cog"
  },
  { 
    title: "Set guardrails & brand voice", 
    description: "Define approved tone, boundaries, and safety rules so agents stay on-brand and act responsibly.",
    icon: "shield"
  },
  { 
    title: "Test and launch", 
    description: "Simulate real tickets, review outcomes, and deploy safely with guardrails and rollback protection.",
    icon: "rocket"
  },
];

const iconMap: Record<string, React.ReactNode> = {
  document: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  brain: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  cog: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  shield: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  rocket: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

interface RunbookAccordionProps {
  onActiveChange?: (index: number) => void;
  isPaused?: boolean;
}

export function RunbookAccordion({ onActiveChange, isPaused = false }: RunbookAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const pausedAtRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  const goToStep = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
    pausedAtRef.current = 0;
    onActiveChange?.(index);
  }, [onActiveChange]);

  useEffect(() => {
    if (isPaused) {
      // Store the current progress when pausing
      pausedAtRef.current = progress;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // When resuming, adjust start time to account for already elapsed progress
    if (pausedAtRef.current > 0) {
      const elapsedTime = (pausedAtRef.current / 100) * DURATION;
      startTimeRef.current = Date.now() - elapsedTime;
      pausedAtRef.current = 0;
    }

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        const nextIndex = (activeIndex + 1) % steps.length;
        goToStep(nextIndex);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeIndex, goToStep, isPaused, progress]);

  const handleClick = (index: number) => {
    goToStep(index);
  };

  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <button
          key={step.title}
          onClick={() => handleClick(index)}
          className="group w-full py-2.5 text-left transition-all duration-300"
        >
          {/* Progress line separator */}
          <div className="relative h-[1px] w-full mb-2.5">
            <div className="absolute inset-0 bg-white/[0.08]" />
            {activeIndex === index && (
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-orange-500"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>

          <div className="flex items-start gap-3">
            <div className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-gradient-to-br from-amber-400/30 to-orange-500/20 ring-1 ring-amber-400/50 shadow-lg shadow-amber-400/20' 
                : 'bg-white/[0.05] ring-1 ring-white/10'
            }`}>
              {activeIndex === index ? (
                <div className="text-amber-400 animate-in fade-in">
                  {iconMap[step.icon]}
                </div>
              ) : (
                <span className="text-xs font-semibold text-white/40">
                  {index + 1}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                activeIndex === index ? 'text-white' : 'text-white/50'
              }`}>
                {step.title}
              </h4>
              <div 
                className={`grid transition-all duration-300 ease-out ${
                  activeIndex === index ? 'grid-rows-[1fr] opacity-100 mt-1.5' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-xs leading-relaxed text-white/60 animate-in fade-in slide-in-from-top-2 duration-500">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
