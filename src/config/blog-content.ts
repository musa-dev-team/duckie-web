// Blog post metadata and content
// Full articles from duckie.ai/blog

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: "Insights" | "Case Studies" | "Guides" | "Comparisons"
  date: string
  readTime: string
  image: string
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-support-is-shifting-from-chatbots-to-ai-help-desks",
    title: "AI Support Is Shifting From Chatbots to AI Help Desks",
    excerpt: "For the last decade, support automation focused on how to talk to customers — not how to actually help them. Teams bought chatbots hoping they'd reduce workload. Instead, they created more of it. Now, the smartest support teams are making a hard pivot.",
    category: "Insights",
    date: "Jan 2026",
    readTime: "6 min read",
    image: "/images/ocean-bg-3.webp",
    featured: true,
    content: `For the last decade, support automation focused on how to talk to customers — not how to actually help them. Teams bought chatbots hoping they'd reduce workload. Instead, they created more of it.

Now, the smartest support teams are making a hard pivot — away from superficial conversation and toward actionable AI systems that can truly resolve issues.

Customers don't care whether your AI sounds human. They care if it fixes their problem — fast, correctly, and without bouncing them around.

## Why Chatbots Fell Short

Chatbots were built for conversation, not clarity. They worked best for basic FAQ patterns but couldn't keep up with deeper product questions or edge cases that matter to real customers.

**Key reasons teams are moving on:**

- Chatbots talk; AI Help Desks resolve
- Chatbots break easily — every product update required manually updating flows
- They hallucinate or overpromise
- They create invisible work for agents

Support teams wanted AI customer support tools that reduce work, not create a new pile of it.

## What Modern Support Automation Actually Requires

An AI Help Desk is not a widget or a scripted flow. It is a full AI customer service platform that behaves like a support agent — not a responder.

### 1. Accuracy Over Chattiness
- Verified sources
- Real-time system lookups
- Hallucination-safe, accuracy-first AI

### 2. End-to-End Workflows
- Automate tasks like refunds, account lookups, and cancellations
- Pull live data from internal tools
- Follow runbook logic and apply decision trees

### 3. Full Control and Transparency
- Tone safety
- Brand-voice accuracy
- Configurable logic
- Clear audit trails
- Consistent fallback paths

## Your Support Team Is Becoming a Systems Team

Support today looks a lot like DevOps did ten years ago: what started as a human-intensive discipline is turning into an automation-first function.

The new job of support ops isn't to write macros or scripts. It's to design inputs, outputs, fallbacks, and controls — just like an engineer would.

**That means:**
- Mapping data sources
- Defining workflows
- Building runbooks
- Setting escalation logic
- Monitoring automation health

The best support organizations are shifting from reactive ticket handling to proactive system design.

## How Duckie Fits Into the Shift

Duckie was designed as an AI Help Desk from day one: not as a chatbot, and not as a generic "LLM wrapper." Duckie is built for clarity, consistency, and brand trust.

**Support teams use Duckie to:**
- Deflect 85%+ of tickets with fully automated workflows
- Deploy AI agents that can fetch data, take actions, and escalate when needed
- Deliver accurate, verified answers grounded in truth
- Write in brand voice with tone safety and consistency
- Maintain full transparency and control over every interaction
- Ensure high-quality support — no guesswork, no hallucinations

Whether it's refunding a customer, fixing a failed KYC flow, or troubleshooting a webhook error, Duckie agents resolve issues like a calm, capable teammate.

Warm. Consistent. Steady. And always on-brand.

## What 2026 Will Look Like for Support Teams

**Teams adopting AI Help Desks will:**
- Retire their chatbots
- Centralize automation into one AI help desk
- Increase first-interaction resolution
- Make AI customer support safe for enterprise risk tolerances
- Deliver more accurate, more consistent answers
- Shift agents into higher-value roles

**Teams that delay this shift will experience:**
- Higher workload
- More escalations
- More customer frustration
- Rising operational costs

If your team is ready to move from talking to resolving — that's where Duckie lives. Duckie is where customer support becomes calm, clear, and predictable again.`,
  },
  {
    slug: "case-study---how-grid-resolves-79-of-tickets-with-duckie",
    title: "Case Study - How Grid Resolves 79% of Tickets With Duckie",
    excerpt: "Grid needed a platform that could go beyond canned responses — something that could handle real resolution logic, without custom dev work. See how they achieved 79% autonomous ticket resolution.",
    category: "Case Studies",
    date: "Jan 2026",
    readTime: "5 min read",
    image: "/images/sky-2.webp",
    featured: true,
    content: `## How Duckie Transformed Customer Support at Grid

Grid needed a platform that could go beyond canned responses — something that could handle real resolution logic, without custom dev work.

## The Duckie Difference

Grid needed a platform that could go beyond canned responses — something that could handle real resolution logic, without custom dev work.

### Step-by-step approach:
- Started with FAQ-type tickets to validate Duckie's performance
- Connected backend systems for live product-state data
- Went live within weeks

## Duckie's Impact

Duckie powered a wide range of automated use cases — not just surface-level chat replies, but end-to-end workflows built around compliance, security, and business logic.

### Key use cases include:

- **Subscription & Membership**: Manages the full lifecycle of subscription support — from fee explanations to cancellations and edge-case disputes
- **Payments & Refunds**: Retrieves account balance info, handles "why was I charged" issues, failed payments and refunds automatically
- **Account Management**: Automatically verifies and routes sensitive account update requests

## Results:

- **79%** of incoming tickets fully resolved by Duckie — no agent involvement
- **75%** of those tickets completed in under 5 minutes
- **15,000+** tickets per month handled autonomously
- Agents shifted to complex, high-impact tickets — improving both morale and service quality

## What Grid Says

"Duckie has fundamentally changed how we think about support. We're not just deflecting tickets — we're actually resolving them."

## Looking Ahead

Grid continues to expand Duckie's capabilities, adding new workflows and integrations to handle even more complex customer scenarios.`,
  },
  {
    slug: "build-your-own-ai-support-agent-without-code",
    title: "Build Your Own AI Support Agent Without Code",
    excerpt: "A step-by-step guide to creating a powerful AI support agent without writing a single line of code. Learn how to set up, configure, and deploy your own AI assistant.",
    category: "Guides",
    date: "Jan 2026",
    readTime: "5 min read",
    image: "/images/trees-3.webp",
    featured: true,
    content: `## What is Duckie's no-code workflow builder?

A lot of support processes already follow a runbook or SOP: checking internal systems, searching knowledge, performing actions, escalating if needed. Duckie's workflow builder lets you design your AI agent to follow these exact steps.

## What does it consist of?

- **Action nodes**: Send messages, search knowledge, call APIs
- **Conditional nodes**: Define different paths for different conditions or scenarios (using AI or rule-based logic)
- **Workflow nodes**: Organize complex processes into smaller, reusable flows
- **Agent Tools**: API connectors so your agent can pull or update data in systems like Stripe, your database, or CRM
- **Escalation and approval steps**: Require human review for sensitive actions or loop in your team when automation can't resolve the issue

## How is it different from other AI agents?

Duckie doesn't just provide an out-of-the-box AI agent — it gives you a no-code workflow builder so you can design exactly how your agent works. It's not a black-box system.

You configure exactly how your agent behaves: the logic, conditions, and API calls. This means you can create agents that do more than answer questions - they take real actions to resolve tickets.

**The result:** higher deflection rates, real time savings, and true automation.

## What can you use it for?

The builder can handle:
- Refunds (e.g. Stripe or other payment systems)
- Bug reporting flows
- How-to guides for product features
- Internal tool lookups
- Any other process that follows a decision tree or runbook

## Let's see it in action: Stripe refund workflow

Here's a short demo where we walk through building a Stripe refund workflow using Duckie's builder. In under 10 minutes, we:

- Detect refund intent
- Gather customer info if needed
- Call Stripe APIs to fetch invoices and process the refund
- Handle success or escalate if needed

## How we work with customers

We don't just hand over a tool - we act as a partner to help your team succeed. When you start with Duckie:

- **Define the use case**: You identify the workflow you want to automate (e.g. refunds, bug reports, internal tool lookup)
- **We help build your first workflow**: Our team provides dedicated engineers who work with you to build your initial workflows
- **You take full control**: Once you're onboarded and comfortable with the builder, you have full control and flexibility to create, modify, and expand workflows on your own, without needing engineers

Book a demo today with the founding team to get started!`,
  },
  {
    slug: "increasing-predictability-and-trust-of-ai-agents-in-customer-support",
    title: "Increasing Predictability and Trust of AI Agents in Customer Support",
    excerpt: "How to build AI agents that your team and customers can actually trust and rely on. Explore guardrails, transparency, and control mechanisms.",
    category: "Insights",
    date: "Dec 2025",
    readTime: "5 min read",
    image: "/images/sky-4.webp",
    featured: false,
    content: `Customer support is evolving. The growing use of AI agents has shifted how businesses operate, promising efficiency, cost savings, and round-the-clock availability. But there's one significant roadblock: unpredictability.

AI agents have a reputation for being unpredictable. They lack the consistency, judgment, and context-driven decision-making that humans instinctively bring to the table. Especially in customer support, where trust is everything, this poses a real challenge.

This post explores why predictability is critical in AI-powered customer support, common challenges businesses face, and how solutions like Duckie are paving the way to reliable, trustworthy AI operations.

## The Problem With Unpredictability in AI Agents

When AI agents behave unpredictably, they can:
- Provide inconsistent answers to similar questions
- Make decisions that don't align with company policy
- Escalate (or fail to escalate) at inappropriate times
- Damage customer trust and satisfaction

## How Duckie Solves Unpredictability Through Smart Design

At Duckie, we spent 12 months working with our customers to understand the problem and develop a unique set of frameworks to address the issue of unpredictability in AI support agents.

### Agentic Workflow

At the core of Duckie is an agentic workflow designed to let customer support teams ensure predictable patterns of behavior. Rather than letting the AI operate freely and potentially surprising users, Duckie follows structured paths.

**This includes:**
- **Multi-Step Flows**: Strategically guiding the AI through clear, step-by-step workflows that reduce variability in outcomes
- **Action Control**: Defining boundaries within which the AI operates, ensuring that actions are taken only when specific conditions are met

### Low-Level Customization

Coupled with Duckie's agentic workflow is prompt customization, which gives customers full control to fine-tune the agent's reasoning for both guiding decisions and taking actions.

**Here's how customizable prompting works:**
- Customers can create prompts with specific context, embedding the unique nuances of their use case into the AI
- Prompts can be adjusted and refined over time, improving both response accuracy and decision-making reliability
- Users can implement safeguards against ambiguity, ensuring outputs consistently align with their brand guidelines and desired outcomes

## Why Predictability Matters More Than Ever

The growing reliance on AI in customer support makes predictability a non-negotiable. Customers expect fast resolutions, clear communication, and data protection. An AI agent that provides consistent, reliable responses builds trust.

**Increasing predictability also unlocks the full potential of AI:**
- Automating repetitive tasks without hesitation
- Scaling operations confidently
- Building lasting trust with customers

AI that is both predictable and efficient is the ultimate competitive advantage.

## Unlocking Consistency and Confidence With Duckie

Duckie is designed from the ground up to give support teams the predictability they need while maintaining the flexibility to handle complex scenarios. With structured workflows, customizable prompts, and clear audit trails, you can deploy AI with confidence.`,
  },
  {
    slug: "build-vs-buy-should-you-build-your-own-ai-support-agent",
    title: "Build vs Buy: Should You Build Your Own AI Support Agent?",
    excerpt: "A comprehensive analysis of when to build your own AI support solution versus buying an existing one. Consider costs, time, and capabilities.",
    category: "Guides",
    date: "Dec 2025",
    readTime: "5 min read",
    image: "/images/ocean-bg-5.webp",
    featured: false,
    content: `I get the temptation. You're smart. You've got great engineers. You read a few LangChain tutorials and now you're 3 prompts away from "revolutionizing customer support."

For many teams, the next question becomes: should we just build our own?

And to be fair — there are real reasons to build. More control, more flexibility, full ownership of the stack. But before you dive in, it's worth going in with eyes open. Because while the demo might take a weekend, production-grade AI support is a different beast entirely.

If you're weighing up whether to build or buy, here's how to think about it.

## Build

### Pros
- Full control over the system
- Can customize to exact specifications
- Own the IP and data

### Cons

#### The Cost Is Way Higher Than You Think

It all comes down to cost, so let's do the math:
- An AI engineer = ~$200K/year
- You'll need at least 2 of them
- Oh, and LLM cost, compute cost, eval tooling, observability, etc.

That's easily $500K+ annually. Even if the software is "free," the team maintaining it definitely isn't.

## Buy

### Pros
- Fast to deploy
- Proven, battle-tested solutions
- Ongoing maintenance and updates included
- Can focus on core business

### Cons
- Less customization (though this varies by vendor)
- Vendor dependency

## When to Build vs Buy

### Build if:
- You have 1M+ monthly support tickets
- You already employ a full-stack AI team
- You're allergic to vendors

### Buy if:
- You want something that works
- You want to move fast
- You want your team focused on what actually matters

## Why We Built Duckie

That's why we built Duckie — so you don't have to. At Duckie, we take a hybrid approach. You get a strong foundation out of the box — a support agent that can answer and resolve tickets with solid reliability.

We give you the building blocks: agent tools and workflows builders. You can define triggers, conditions, and actions to tailor how Duckie handles different ticket types or scenarios. You can plug it into your existing systems.

We obsess over AI support, so you can focus on building the thing you actually want to be known for.

Want to see Duckie in action? Book a demo.

P.S. If you're still considering building your own AI agent, I'd genuinely love to chat. Either to help you avoid the pain... or to hear your war stories later. Both are fun.`,
  },
  {
    slug: "ai-agents-a-guide-to-demystify-and-get-started",
    title: "AI Agents: A Guide to Demystify and Get Started",
    excerpt: "Everything you need to know about AI agents and how to start implementing them in your organization. From basics to advanced concepts.",
    category: "Guides",
    date: "Dec 2025",
    readTime: "5 min read",
    image: "/images/trees-2.webp",
    featured: false,
    content: `Let's be honest—"AI agent" is such an overloaded buzzword. When you hear it, you're probably thinking, ugh, not another one.

So in this guide, we're breaking it down—what an AI agent actually is, how it's different from a chatbot, how it works under the hood, and what it takes to put one into real-world use (without losing your mind).

Let's demystify the hype and get practical.

## What Is an AI Agent?

An AI agent is software that can perceive its environment, make decisions, and take actions to achieve specific goals. Unlike traditional chatbots that follow scripts, AI agents can:

- Understand context and intent
- Make decisions based on available information
- Take actions across multiple systems
- Learn and adapt over time

## How AI Agents Differ from Chatbots

| Chatbots | AI Agents |
|----------|-----------|
| Follow scripted flows | Make dynamic decisions |
| Answer questions | Take actions |
| Limited to pre-defined paths | Can handle novel situations |
| Surface-level interactions | Deep system integrations |

## Thinking about AI customer support agent?

Duckie doesn't just answer questions—it gets things done. It can take real actions like processing refunds, updating account settings, or checking logs to troubleshoot technical issues. It plugs into your existing tools and follows your workflows.

We work with 60+ support teams across fintech, dev tools, SaaS, and e-commerce to help them automate the repetitive stuff and speed up resolution.

Setup takes less than 5 minutes. We'll work closely with your team to tailor the agent to your workflows and make sure it fits your needs—simple as that.

Book a demo and meet your next support teammate.`,
  },
  {
    slug: "duckie-vs-intercom-fin-which-ai-support-tool-is-right-for-you",
    title: "Duckie vs. Intercom Fin: Which AI Support Tool is Right for You?",
    excerpt: "A detailed comparison of Duckie and Intercom Fin to help you choose the right AI support solution for your team's needs.",
    category: "Comparisons",
    date: "Nov 2025",
    readTime: "4-5 min read",
    image: "/images/sky-3.webp",
    featured: false,
    content: `Choosing the right AI support tool can make or break your customer experience. In this comparison, we break down Duckie and Intercom Fin to help you make an informed decision.

## Overview

Both Duckie and Intercom Fin are AI-powered support tools, but they take fundamentally different approaches.

### Intercom Fin
- Built as an add-on to Intercom's existing platform
- Focuses on chat-based interactions
- Best for teams already using Intercom

### Duckie
- Purpose-built AI support agent
- Works across multiple channels
- Designed for action and resolution, not just conversation

## Key Differences

### 1. Resolution vs. Deflection

**Intercom Fin** focuses on deflecting tickets by answering questions.

**Duckie** focuses on actually resolving issues by taking actions—processing refunds, updating accounts, troubleshooting technical issues.

### 2. Customization

**Intercom Fin** offers limited customization within the Intercom ecosystem.

**Duckie** provides a no-code workflow builder where you can design exactly how your AI agent behaves, what actions it can take, and when to escalate.

### 3. Integrations

**Intercom Fin** works best within the Intercom ecosystem.

**Duckie** integrates with your existing tools—Zendesk, Freshdesk, Slack, Stripe, and more—regardless of your help desk platform.

### 4. Transparency

**Duckie** provides full audit trails and transparency into every decision the AI makes, giving you confidence and control.

## Which Should You Choose?

**Choose Intercom Fin if:**
- You're already deeply invested in Intercom
- You primarily need chat-based FAQ deflection
- Your support is relatively straightforward

**Choose Duckie if:**
- You need AI that takes real actions, not just answers questions
- You want control over how the AI behaves
- You use multiple tools and need flexibility
- You want to actually resolve tickets, not just deflect them

Book a demo to see Duckie in action.`,
  },
  {
    slug: "top-customer-experience-trends-in-2025",
    title: "Top Customer Experience Trends in 2025",
    excerpt: "The key trends shaping customer experience and support in 2025 and beyond. Stay ahead of the curve with these insights.",
    category: "Insights",
    date: "Nov 2025",
    readTime: "5 min read",
    image: "/images/ocean-bg-4.webp",
    featured: false,
    content: `Customer experience is evolving faster than ever. Here are the key trends shaping support in 2025.

## 1. AI-First Support Becomes the Norm

Companies are moving from "AI-assisted" to "AI-first" support. The best teams are designing their support operations around AI capabilities, not treating AI as an add-on.

## 2. Resolution Over Deflection

The metric that matters is shifting from "tickets deflected" to "tickets resolved." Customers don't care if AI answered them—they care if their problem got fixed.

## 3. Proactive Support

Instead of waiting for customers to reach out, companies are using AI to identify and resolve issues before they become tickets.

## 4. Hyper-Personalization

Generic responses are out. AI enables support that understands each customer's history, preferences, and context.

## 5. Seamless Omnichannel Experience

Customers expect consistent support whether they reach out via chat, email, Slack, or social media. AI makes true omnichannel possible.

## 6. Transparency and Trust

Customers want to know when they're talking to AI and what it's doing with their data. Transparency builds trust.

## 7. Human + AI Collaboration

The future isn't AI replacing humans—it's AI handling the repetitive stuff so humans can focus on complex, high-value interactions.

## What This Means for Your Team

Teams that embrace these trends will see:
- Higher customer satisfaction
- Lower support costs
- Faster resolution times
- More engaged support agents

The question isn't whether to adopt AI—it's how fast you can get there.`,
  },
  {
    slug: "the-ultimate-guide-to-founder-led-customer-support",
    title: "The Ultimate Guide to Founder-Led Customer Support",
    excerpt: "How founders can build a customer support culture that scales with their company while maintaining quality and personal touch.",
    category: "Guides",
    date: "Oct 2025",
    readTime: "5 min read",
    image: "/images/trees-4.webp",
    featured: false,
    content: `In the early days, founders doing support isn't just necessary—it's a superpower. Here's how to make the most of it.

## Why Founder-Led Support Matters

When founders do support, they:
- Get direct, unfiltered customer feedback
- Understand pain points firsthand
- Build customer relationships that last
- Identify product improvements faster

## The Founder Support Playbook

### Phase 1: Do It Yourself (0-10 customers)

Every founder should personally handle support in the beginning. It's the best way to understand your customers and your product.

**Tips:**
- Respond to every message personally
- Ask follow-up questions to understand root causes
- Document every issue and piece of feedback

### Phase 2: Build the Foundation (10-100 customers)

Start documenting and systematizing.

**Create:**
- A knowledge base with common answers
- Standard operating procedures
- Templates for common scenarios

### Phase 3: Scale Thoughtfully (100+ customers)

Now you can think about hiring and tools.

**Consider:**
- Your first support hire should be exceptional
- Use AI to handle the repetitive stuff
- Keep founders connected to support through regular reviews

## Common Mistakes to Avoid

1. **Hiring too early**: Don't hire until you've documented your processes
2. **Losing touch**: Even with a team, founders should do support regularly
3. **Over-automating too soon**: Automation should enhance, not replace, personal touch

## The AI Opportunity

Modern AI tools like Duckie let small teams punch above their weight. You can:
- Automate repetitive tickets while keeping the personal touch
- Scale support without scaling headcount
- Focus founder time on the most impactful interactions

Founder-led support isn't a phase to get through—it's a competitive advantage to preserve.`,
  },
  {
    slug: "the-real-talk-on-ai-in-b2b-customer-support-its-not-what-you-think",
    title: "The Real Talk on AI in B2B Customer Support: It's Not What You Think",
    excerpt: "Cutting through the hype to understand what AI can actually do for B2B support teams. Honest insights and practical advice.",
    category: "Insights",
    date: "Oct 2025",
    readTime: "3 min read",
    image: "/images/sky-5.webp",
    featured: false,
    content: `Let's cut through the hype. AI in B2B support isn't magic—but it's also not useless. Here's the honest truth.

## What AI Can Actually Do Well

- **Handle repetitive, well-defined tasks**: Password resets, status checks, basic how-tos
- **Provide consistent answers**: No more variation based on which agent you get
- **Work 24/7**: Time zones become irrelevant
- **Scale instantly**: Handle spikes without hiring

## What AI Still Struggles With

- **Complex, multi-system issues**: When problems span multiple tools and require investigation
- **Emotional situations**: Angry customers often need a human touch
- **Novel problems**: First-time issues that aren't in the training data
- **Strategic decisions**: Knowing when to bend the rules for a VIP customer

## The Real Opportunity

The best B2B support teams aren't replacing humans with AI. They're using AI to:

1. **Free up agents for complex work**: Let AI handle the routine so humans can focus on what matters
2. **Provide better first responses**: AI can gather info and context before handing off
3. **Ensure consistency**: Same answer, every time, for common questions
4. **Scale without proportional headcount**: Handle 2x tickets without 2x people

## The Honest Bottom Line

AI in B2B support is not:
- A magic solution that eliminates the need for humans
- Going to work perfectly out of the box
- A way to cut your support team in half

AI in B2B support IS:
- A powerful tool that makes your team more effective
- Worth the investment if you do it right
- The future of how support teams operate

The companies winning with AI support are the ones who understand its limits AND its potential.`,
  },
  {
    slug: "how-b2b-companies-can-succeed-with-ai-in-customer-support",
    title: "How B2B Companies Can Succeed With AI In Customer Support",
    excerpt: "Practical strategies for B2B companies looking to implement AI in their customer support operations. From planning to execution.",
    category: "Guides",
    date: "Sep 2025",
    readTime: "10 min read",
    image: "/images/ocean-bg-6.webp",
    featured: false,
    content: `Implementing AI in B2B support is a journey. Here's your roadmap to success.

## Phase 1: Assess Your Readiness

Before diving into AI, ask yourself:

- Do you have documented processes and knowledge bases?
- What percentage of your tickets are repetitive vs. complex?
- What systems does your support team use daily?
- What does success look like for your team?

## Phase 2: Start Small

Don't try to automate everything at once.

**Pick your first use case wisely:**
- High volume, low complexity
- Well-documented process
- Clear success metrics
- Low risk if something goes wrong

**Good first use cases:**
- Password resets
- Status checks
- Basic how-to questions
- Routing and triage

## Phase 3: Build Your Foundation

**Knowledge is everything.** AI is only as good as the information it has access to.

- Audit and update your knowledge base
- Document your processes and runbooks
- Clean up your data
- Define your brand voice and tone

## Phase 4: Choose the Right Tool

Not all AI support tools are created equal. Look for:

- **Integration depth**: Does it connect to your existing tools?
- **Customization**: Can you control how it behaves?
- **Transparency**: Can you see what it's doing and why?
- **Action capability**: Can it DO things, not just answer questions?

## Phase 5: Implement Thoughtfully

**Rollout strategy matters:**
- Start with internal testing
- Expand to a subset of customers
- Monitor closely and iterate
- Scale when confident

## Phase 6: Measure and Optimize

**Track the metrics that matter:**
- Resolution rate (not just deflection)
- Customer satisfaction
- Time to resolution
- Agent efficiency

## Common Pitfalls to Avoid

1. **Expecting perfection on day one**: AI improves over time
2. **Not involving your team**: Support agents know what works
3. **Ignoring the edge cases**: Plan for when AI can't help
4. **Set it and forget it**: AI needs ongoing attention

## The Payoff

Companies that get AI support right see:
- 50-80% of tickets handled automatically
- Faster resolution times
- Happier customers AND agents
- Ability to scale without proportional hiring

The key is to approach AI as a tool to make your team better, not a replacement for human judgment.`,
  },
  {
    slug: "is-ai-going-to-replace-customer-support",
    title: "Is AI Going to Replace Customer Support?",
    excerpt: "Examining the future of human support agents in an increasingly AI-powered world. The answer might surprise you.",
    category: "Insights",
    date: "Sep 2025",
    readTime: "6 min read",
    image: "/images/trees-5.webp",
    featured: false,
    content: `Garry, the CEO of YC, put it in a very precise way - "The artistry of creating software or technology products is actually in that interface between the human and technology itself."

AI has the power to make the work much easier, but there's still artistry in what it should do and how it should do it. Support is a combination of science and art. There are quite lots of artistry in support work that AI can't replace.

**For example:**
- Customers still want that human touch and emotional intelligence which AI can't fully provide
- Support is a very collaborative process involving efforts from different teams— like engineering and product, and these interactions are very dynamic and require artistry

The future will be **people + AI = happy customers + exponential growth**.

However, AI will transform how customer support teams work in every single way, enabling them to reach new levels of efficiency and customer satisfaction.

## Step 1: Figure out what the support team actually cares about

We've spent the past few weeks talking to over 20+ leaders in customer support and success, asking them: What are the metrics you care most about?

**Here's what we found. These are the metrics that heads of support care about the most:**
- Time to Resolution
- Customer Satisfaction
- Number of Tickets Handled per Headcount
- Know what the customers want
- Fewer Escalations to Engineers

When we asked how they are currently addressing these pain points to improve these metrics, many mentioned hiring and training. But does this solve all their problems? All of them said no.

## Step 2: Figure out what the support team needs

That's why they are looking for toolings, to solve the problems in smarter, more efficient ways.

**Their tooling needs boil down to:**
- **Enablement of Support Agents**
  - Efficient Knowledge Sharing: Ensure support agents have quick access to consolidated and up-to-date product knowledge
  - Empowering Technical Support: Equip tech support engineers with the expertise needed to handle complex issues independently
- **Self-Served Customer Support**
- **A System for Easy Tracking of Tickets and Insights on Customer Needs**

## Step 3: Figure out how AI can help

AI won't replace support—it will transform it. The teams that thrive will be those that figure out how to use AI to amplify their human capabilities, not replace them.

## Conclusion

AI isn't going to replace customer support. It's going to make support teams more powerful, more efficient, and more able to deliver the kind of experience customers actually want.

The question isn't "Will AI replace us?" It's "How do we use AI to become the best support team we can be?"`,
  },
]

export const blogCategories = ["All", "Insights", "Guides", "Case Studies", "Comparisons"] as const
export type BlogCategory = typeof blogCategories[number]
