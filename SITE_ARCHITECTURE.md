# Site Architecture & Information Architecture

## 1. Sitemap

### Primary Pages (Main Nav)
- **Home** — Landing page
- **Platform** — Deep dive into the product (agents, guardrails, knowledge, runbooks, analytics)
- **How It Works** — The 5-step process with detail
- **Integrations** — Overview of all channels and tools

### Secondary Pages
- None for now

### Company Pages
- **About**
- **Contact**
- **Careers** → External link

### Utility Pages
- **Docs** → External link

### Legal Pages
- **Privacy**
- **Terms**
- **Security**

### Not Building (for now)
- Blog
- Pricing page
- Use cases / solutions pages
- Case studies (later)

---

## 2. Navigation Structure

### Primary Navigation (Left)
- **Home** (logo)
- **Platform** (dropdown → anchor links to sections on /platform)
  - Agents → #agents
  - Guardrails → #guardrails
  - Knowledge → #knowledge
  - Runbooks → #runbooks
  - Analytics → #analytics
- **How It Works** (dropdown → anchor links to sections on /how-it-works)
  - Understand → #understand
  - Check Guardrails → #check-guardrails
  - Gather Context → #gather-context
  - Take Action → #take-action
  - Log & Learn → #log-learn
- **Integrations** (dropdown → anchor links to sections on /integrations)
  - Ticketing → #ticketing
  - Messaging → #messaging
  - Project Management → #project-management
  - Knowledge Sources → #knowledge-sources

### Primary Navigation (Right)
- **Book a Demo** (CTA button)

### Footer Navigation
**Product**
- Platform
- How It Works
- Integrations

**Company**
- About
- Careers
- Contact

**Legal**
- Privacy
- Terms
- Security

**Social**
- Twitter
- LinkedIn
- GitHub

### Mobile Navigation
<!-- TBD - hamburger menu behavior? -->

---

## 3. User Flows

### Flow 1: Support Leader (VP of CX, Head of Support)
- *Pain*: Overwhelmed team, growing ticket volume, can't hire fast enough
- *Looking for*: Does this actually work? Is it safe? What's the ROI?
- **Home** → Platform → How It Works → **Book a Demo**

### Flow 2: Technical Evaluator (Support Ops, IT, Solutions Architect)
- *Pain*: Need to vet integrations and security
- *Looking for*: Works with our stack? Secure?
- **Home** → Integrations → Security → **Book a Demo**

### Flow 3: Quick Researcher (comparison shopping)
- *Pain*: Evaluating options, limited time
- *Looking for*: Quick understanding
- **Home** → skim Platform → **Book a Demo** or bounce

### Flow 4: Returning Prospect (already talked to sales)
- *Looking for*: Info to share internally
- Direct link to **Platform**, **Security**, or **How It Works**

---

## 4. Page Types / Templates

| Template | Used By |
|----------|---------|
| **Home** | Homepage (unique layout) |
| **Long-form Feature Page** | Platform, How It Works |
| **Grid/List Page** | Integrations |
| **Simple Content Page** | About, Contact, Privacy, Terms, Security |

---

## 5. Global Components

- **Header/Nav** — Logo, nav with dropdowns, "Book a Demo" CTA
- **Footer** — Product links, Company links, Legal links, Social links, Copyright
- **CTA Section** — "Book a Demo" call-to-action (appears at bottom of most pages)
- **Mobile Nav** — Hamburger menu overlay

---

## Notes & Open Questions

- "Book a Demo" links to Calendly?
- Docs link goes to external documentation site
