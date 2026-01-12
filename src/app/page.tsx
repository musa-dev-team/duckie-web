import { CtaFooterWrapper } from "@/components/sections/cta-footer-wrapper"
import { Hero } from "@/components/sections/hero"
import HowItWorksCanvas from "@/components/sections/how-it-works-canvas"
import ImplementationCanvas from "@/components/sections/implementation-canvas"
import { Omnichannel } from "@/components/sections/omnichannel"
import { QualitySection } from "@/components/sections/quality-section"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"
import { WhatDuckiesDoes } from "@/components/sections/what-duckie-does"

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <WhatDuckiesDoes />
      {/* <ValueCallout /> */}
      <HowItWorksCanvas />
      <ImplementationCanvas />
      <QualitySection />
      <Omnichannel />
      <Testimonials />
      <CtaFooterWrapper />
    </main>
  )
}
