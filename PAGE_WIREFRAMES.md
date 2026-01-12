# Page Wireframes

Detailed section-by-section breakdown for each page.

**Color approach:** All sections are light backgrounds. Dark is reserved for accents and individual components (buttons, cards, UI elements) — not entire sections.

**Motion & craft principle:** Snappy, precise interactions on everything. "Notice something new every visit" — micro-details, easter eggs, and polish that reward attention. This is key to making the site feel unique.

---

# Homepage

## Section 1: Hero
**Purpose:** Hook with value prop  
**Theme:** Full-bleed image (like Giga.ai)

### Content
- **Headline:** "AI support agents that actually resolve tickets"
- **Subheadline:** "Not just answers — real actions. Process refunds, update accounts, check order status, and resolve issues end-to-end."
- **CTA:** Book a Demo

### Layout
- Full-screen background image
- Centered text overlay (headline, subheadline, CTA button)
- Nav floats on top

### Visual
- **Background:** `/public/images/ocean-bg-4.jpg` (aerial ocean, wave breaking)
- Text: White or light color for contrast against water
- Possible subtle overlay/gradient to ensure text legibility

### Motion/Interaction
<!-- TBD - any animations on load? Parallax on scroll? -->

---

## Section 2: Stats Bar
**Purpose:** Quick credibility  
**Theme:** Light

### Content
- 82% Resolution rate
- 76% Faster handle time
- <2 min First response
- 4.8/5 CSAT maintained

### Layout
- Light background (white or very light gray)
- 4 stats in horizontal row, centered
- Subtle dividers between stats
- Each stat: Large number + small label below

### Motion/Interaction
- Count-up animation when scrolled into view

---

## Section 3: What Duckie Does
**Purpose:** Quick-scan "aha" moment — the differentiator clicks  
**Theme:** Light

### Content
- **Headline:** "Real actions, not just answers"
- **One-liner:** "Duckie doesn't just tell customers what to do — it does it for them."
- **Action examples:** Process refund • Cancel subscription • Reset password • Update account • Check order status

### Visual
- Product image showing a conversation with an action being taken (e.g., "Refund processed" confirmation)

### Notes
- Should be scannable in 2-3 seconds
- Image does the heavy lifting
- Layout TBD (centered, split, etc.)

---

## Section 4: How It Works
**Purpose:** Explain the 5-step process in detail  
**Theme:** Light  
**Style:** Giga.ai-inspired canvas layout

### Content
→ See `content.howItWorks` in content.ts
- Badge: "How It Works"
- Section headline: "How Duckie resolves tickets"
- 5 steps with descriptions

### Layout
**Contained Component (rounded-3xl, shadow-2xl):**
- Grid: 1/3 left, 2/3 right
- **Left Panel (dark bg-gray-900):**
  - Icon + "Resolution Process" title
  - Subtitle text
  - "Learn more" button
  - Accordion steps (simple text with dividers)
- **Right Panel (ocean background image):**
  - Product screenshot mockup floating on background
  - Dashboard-style UI showing step-specific content

### Interaction
- Auto-rotates through steps every 4 seconds
- Clickable steps in accordion
- Active step shows description below title
- Product UI updates to show step-specific content

### Visual
- Left: Dark contained panel with white text
- Right: Scenic ocean background with white product card overlay
- Step-specific dashboards show:
  - Step 1: Analysis (intent, order, issue)
  - Step 2: Guardrail checks with status
  - Step 3: Information sources (order system, KB, profile)
  - Step 4: Actions completed with checkmarks
  - Step 5: Ticket summary metadata

### Link
- "Learn more" → /how-it-works

### Implementation
- Component: `src/components/sections/how-it-works-canvas.tsx`
- Inspired by Giga.ai's Agent Canvas section

---

## Section 5: Implementation Timeline
**Purpose:** Show how fast/easy it is to get Duckie live  
**Theme:** Light

### Content
→ See `content.implementation` in content.ts
- Title: "From setup to resolution in under 2 hours"
- Subtitle: "Get your AI support agent live and handling real tickets faster than you'd onboard a human."
- 4 steps: Connect (5 min) → Configure (15 min) → Test (1 hr) → Deploy (1 click)

### Layout Options
**Option A: Horizontal Timeline**
- All 4 steps shown horizontally with progress line
- Icons, titles, subtitles, time badges
- Expanded content below

**Option B: Vertical Timeline**
- Split view: timeline on left, detail card on right
- Checkmarks for completed steps
- Progress line connecting steps

**Option C: Card Grid**
- 4 cards in a row (responsive)
- Active card scales up
- Description below

### Interaction
- Auto-rotates through steps
- Clickable to jump to any step
- Active step is highlighted

### Visual
- Each step has an emoji icon (🔗 ⚙️ 🧪 🚀)
- Time duration badges show speed
- Checkmarks appear for "completed" steps in the demo

### CTA
- "Book a demo to see it in action" → /contact

### Why This Replaces "Platform Preview"
- Platform Preview was redundant with Section 4 (same layout, 5 items, auto-rotate)
- This is more action-oriented and practical
- Shows speed/ease of implementation (removes friction)
- Different from Section 4: runtime process vs. setup process
- Features can still be covered on /platform page

---

## Section 6: Integrations
**Purpose:** Show it works with their tools  
**Theme:** Light

### Content
→ See `content.channels` and `content.integrations` in content.ts
- Headline: "Works where your customers are"
- All integration logos: Zendesk, Intercom, Slack, HubSpot, Discord, Jira, Linear, Notion, Confluence, Google Drive, Plain

### Layout
- Slow dual-row marquee
- Two rows of logos drifting in opposite directions
- Very subtle speed — ambient, not frenetic

### Interaction
- Pauses on hover
- Subtle hover state on individual logos (lift, slight scale)

### Link
- "See all integrations" → /integrations

---

## Section 7: Testimonials
**Purpose:** Social proof + trust  
**Theme:** Light

### Content
→ See `content.socialProof.featuredTestimonial` and `content.socialProof.testimonials` in content.ts

### Layout
**Featured testimonial (large, static)**
- Full quote
- Author photo, name, role, company
- Company logo
- Optional: key stat (e.g., "82% resolution rate")

**Supporting testimonials (row below)**
- Smaller cards, static row
- Quote + name + company
- 3-5 visible depending on count

**Trust badges (below testimonials)**
- SOC 2 Type II
- Deployment options: Cloud (SaaS), Self-hosted

### Interaction
- Static (no rotation)
- Subtle hover states on cards

---

## Section 8: Final CTA
**Purpose:** Close — Book a Demo  
**Theme:** Light

### Content
→ See `content.finalCta` in content.ts (headline TBD)

### Layout
- Centered text + button
- Minimal — headline, optional subheadline, CTA button

### Interaction
- Snappy button hover state

---

# Platform

<!-- TBD -->

---

# How It Works

<!-- TBD -->

---

# Integrations

<!-- TBD -->

---

# About

<!-- TBD -->

---

# Contact

<!-- TBD -->

---

# Legal Pages (Privacy, Terms, Security)

<!-- TBD -->
