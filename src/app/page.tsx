import { Hero } from "@/components/sections/hero"
import HowItWorksCanvas from "@/components/sections/how-it-works-canvas"
import ImplementationCanvas from "@/components/sections/implementation-canvas"
import { Integrations } from "@/components/sections/integrations"
import { Stats } from "@/components/sections/stats"
import { WhatDuckiesDoes } from "@/components/sections/what-duckie-does"
import { Testimonials } from "@/components/sections/testimonials"
import { CtaFooterWrapper } from "@/components/sections/cta-footer-wrapper"

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <WhatDuckiesDoes />
      {/* <ValueCallout /> */}
      <HowItWorksCanvas />
      <ImplementationCanvas />
      <Integrations />
      <Testimonials />
      <CtaFooterWrapper />
    </main>
  )
}
