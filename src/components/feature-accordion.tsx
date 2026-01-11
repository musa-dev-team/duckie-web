"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const DURATION = 5000; // 5 seconds per step

const steps = [
  { 
    title: "Create the agent", 
    description: "Choose an agent type and upload documents so your agent understands your brand, policies, and workflows.",
    icon: "plus"
  },
  { 
    title: "Define policies", 
    description: "Ground agents in your brand standards, compliance rules, and workflows so every interaction is consistent.",
    icon: "shield"
  },
  { 
    title: "Design the logic", 
    description: "Build decision trees, set up fallbacks, and configure handoff rules for complex scenarios.",
    icon: "squares"
  },
  { 
    title: "Test and launch", 
    description: "Run simulations, validate responses, and deploy with confidence using our testing suite.",
    icon: "play"
  },
  { 
    title: "Monitor and improve", 
    description: "Replay conversations, review transcripts, and convert real cases into test suites. Use experiments to confirm improvements before release.",
    icon: "chart"
  },
];

const iconMap: Record<string, React.ReactNode> = {
  plus: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  shield: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  squares: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  ),
  play: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    </svg>
  ),
  chart: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export function FeatureAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const animationRef = useRef<number | null>(null);

  const goToStep = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  // Animation loop for progress
  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        // Move to next step
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
  }, [activeIndex, goToStep]);

  const handleClick = (index: number) => {
    goToStep(index);
  };

  return (
    <div className="mt-12 space-y-0">
      {steps.map((step, index) => (
        <button
          key={step.title}
          onClick={() => handleClick(index)}
          className="group w-full py-4 text-left transition-all duration-300"
        >
          {/* Progress line separator */}
          <div className="relative h-[1px] w-full mb-4">
            {/* Base line */}
            <div className="absolute inset-0 bg-white/[0.08]" />
            {/* Animated progress line for active item only */}
            {activeIndex === index && (
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-orange-500"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className={`relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-gradient-to-br from-amber-400/30 to-orange-500/20 ring-1 ring-amber-400/40 shadow-lg shadow-amber-400/20' 
                : 'bg-white/[0.05] ring-1 ring-white/10'
            }`}>
              {activeIndex === index ? (
                <div className="text-amber-400 scale-100 animate-in fade-in">
                  {iconMap[step.icon]}
                </div>
              ) : (
                <span className="text-xs font-semibold text-white/50">
                  {index + 1}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className={`font-semibold text-sm transition-colors duration-300 ${
                activeIndex === index ? 'text-white' : 'text-white/60'
              }`}>
                {step.title}
              </h4>
            </div>
          </div>
          <div 
            className={`grid transition-all duration-300 ease-out ${
              activeIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-xs leading-relaxed text-white/50 ml-13 animate-in fade-in slide-in-from-top-2 duration-500">
                {step.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
