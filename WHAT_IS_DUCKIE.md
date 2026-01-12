# What is Duckie?

Duckie is an AI-powered customer support platform that automates conversations, resolves tickets, and helps your team work smarter. It integrates with your existing tools and learns from your knowledge base to provide accurate, on-brand responses.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Features](#core-features)
3. [How Duckie Works](#how-duckie-works)
4. [Tools](#tools)
5. [Guidelines & Guardrails](#guidelines--guardrails)
6. [Knowledge Base](#knowledge-base)
7. [Workflows & Runbooks](#workflows--runbooks)
8. [Tagging & Classification](#tagging--classification)
9. [Testing](#testing)
10. [Analytics & Insights](#analytics--insights)
11. [Integrations](#integrations)
12. [Deployment Options](#deployment-options)

---

## Overview

Duckie acts as an intelligent layer between your customers and your support team. It can:

- **Automatically respond** to customer inquiries across multiple channels
- **Search your knowledge base** to find relevant information
- **Execute actions** like creating tickets, updating records, or escalating to humans
- **Classify conversations** by topic, priority, and resolution status
- **Learn and improve** based on your team's feedback and historical data

Whether you're handling support tickets, Slack messages, or help desk inquiries, Duckie works alongside your team to reduce response times and improve customer satisfaction.

---

## Core Features

### AI Agents

At the heart of Duckie are **AI Agents**—configurable assistants that handle customer conversations. Each agent can be customized with:

| Setting | Description |
|---------|-------------|
| **Starting Workflow/Runbook** | Define the agent's execution path |
| **Knowledge Sources & Tags** | Choose which knowledge the agent can access |
| **Guidelines** | Instructional rules for how the agent should behave |
| **Guardrails** | Safety constraints including escalation rules and restrictions |
| **Categories & Attributes** | Define how conversations are classified |

### Multi-Channel Support

Deploy agents across all your customer touchpoints:

- **Slack** — Respond to messages in shared channels or DMs
- **Zendesk** — Handle tickets automatically
- **Intercom** — Engage with chat conversations
- **Plain** — Manage support threads
- **Linear** — Respond to customer-reported issues
- **HubSpot** — Respond to customer tickets
- **Discord** — Handle community support

### Deployment Modes

Control how agents interact with customers:

| Mode | Behavior |
|------|----------|
| **Live** | Agent responds directly to customers |
| **Shadow** | Agent drafts responses for human review |
| **Testing** | Agent runs in isolation for validation |

---

## How Duckie Works

When a customer message arrives, Duckie follows an intelligent workflow:

```
Customer Message
       │
       ▼
┌─────────────────────────────────┐
│  1. Understand the Request      │
│     • Analyze the conversation  │
│     • Identify customer intent  │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  2. Check Guardrails            │
│     • Evaluate escalation rules │
│     • Check restrictions        │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  3. Gather Information          │
│     • Search knowledge base     │
│     • Query connected systems   │
│     • Retrieve customer context │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  4. Take Action                 │
│     • Respond to customer       │
│     • Create/update tickets     │
│     • Escalate if needed        │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  5. Classify & Learn            │
│     • Assign category           │
│     • Extract attributes        │
│     • Evaluate resolution       │
└─────────────────────────────────┘
```

Each step is logged and visible in the Duckie dashboard, giving you full transparency into how the agent handled each conversation.

---

## Tools

Duckie agents use tools to take actions. There are three types of tools:

### Duckie Tools (Built-in)

Core capabilities that come with every Duckie agent:

| Tool | Description |
|------|-------------|
| **Responder** | Generates and sends responses to customers using guidelines and knowledge |
| **Ask and Wait** | Asks clarifying questions and waits for customer reply before continuing |
| **Knowledge Search** | Searches the knowledge base using semantic search (basic or advanced mode) |
| **Escalator** | Hands off conversations to human agents with context and summary |
| **LLM Call** | Makes custom LLM calls for data transformation, summarization, or analysis |
| **Save Value** | Stores values during execution for use in later steps |
| **End Run** | Explicitly ends the agent run |

### App Tools (Integrations)

Tools from connected platforms that let agents interact with external systems:

| Platform | Example Actions |
|----------|-----------------|
| **Slack** | Send messages, react to messages, create channels |
| **Zendesk** | Update ticket fields, add internal notes, change status |
| **Jira** | Create issues, add comments, transition status |
| **Linear** | Create/update issues, add comments |
| **Intercom** | Send messages, update conversation state |
| **HubSpot** | Create tickets, update contacts |

### Custom Tools

Define your own HTTP-based tools for org-specific integrations:

- **Any REST API** — Connect to internal services or third-party APIs
- **Authentication** — Supports Bearer tokens, Basic auth, and API keys
- **Parameter Mapping** — Use `{{param}}` placeholders in URLs
- **Full Control** — Define method, headers, and request body

Custom tools appear alongside built-in tools and can be assigned to any agent.

---

## Guidelines & Guardrails

### Guidelines

Guidelines are instructional rules that shape how your agent communicates. They're organized into sections (e.g., "Customer Tone", "Technical Writing") and provide specific guidance on:

- **Voice and Tone** — How the agent should sound
- **Response Format** — Structure, length, and style preferences
- **Brand Standards** — Terminology, phrases to use or avoid
- **Domain Knowledge** — Product-specific instructions

Guidelines support rich-text editing and can be tested in a playground before applying to agents.

### Guardrails

Guardrails are safety constraints that protect customers and your brand. There are two types:

#### Escalation Rules

Define when the agent should hand off to a human:

| Example Rule | Description |
|--------------|-------------|
| "Angry customer" | Escalate when sentiment is negative and customer mentions cancellation |
| "Legal question" | Escalate any questions about contracts, liability, or legal terms |
| "VIP customer" | Escalate conversations from enterprise accounts |

#### Restrictions

Hard limits on what the agent cannot do (highest priority):

| Example Restriction | Description |
|---------------------|-------------|
| "No refund promises" | Agent cannot commit to refunds without approval |
| "No competitor mentions" | Agent cannot discuss or compare competitors |
| "No pricing changes" | Agent cannot offer discounts or modify pricing |

Guardrails can use:
- **AI-based detection** — LLM evaluates conversation context
- **Keyword matching** — Trigger on specific words or phrases
- **Regex patterns** — Match complex patterns

Each guardrail includes a built-in playground for testing detection before going live.

---

## Knowledge Base

Duckie's knowledge base is a searchable repository of information your agents can reference when responding to customers.

### Knowledge Sources

Connect external platforms to automatically sync content:

| Source | Content Type |
|--------|--------------|
| **Notion** | Documentation, wikis, runbooks |
| **Confluence** | Help articles, internal guides |
| **Google Drive** | Documents, spreadsheets |
| **Slack** | Historical conversations, channel archives |
| **Web** | Public URLs, help center pages |

### Custom Knowledge

Create knowledge articles directly in Duckie:

- **Rich Text Editor** — Format articles with headings, lists, and code blocks
- **Tags** — Organize articles by topic for filtered search
- **Version History** — Track changes over time

### Knowledge Gaps

When the agent can't confidently answer a question, it's logged as a **knowledge gap**. The Gaps tab shows:

- Questions the agent couldn't answer
- Frequency of each unanswered question
- One-click option to create a knowledge article that fills the gap

This creates a feedback loop where customer questions drive knowledge base improvements.

### Knowledge Tags

Assign tags to knowledge articles and agents to control which knowledge each agent can access:

- **Agent A** (Billing team) → Only sees articles tagged "billing", "payments"
- **Agent B** (Technical support) → Only sees articles tagged "technical", "troubleshooting"

---

## Workflows & Runbooks

Beyond simple question-answering, Duckie can execute complex multi-step processes.

### Workflows

Workflows are visual, graph-based automations that define exactly how Duckie should handle specific scenarios.

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Check Order      │────▶│ Validate         │────▶│ Process Refund   │
│ Status           │     │ Eligibility      │     │ or Explain Why   │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                               │
                               ▼
                         ┌──────────────────┐
                         │ Not Eligible?    │
                         │ Escalate to      │
                         │ Human            │
                         └──────────────────┘
```

Workflows support:
- **Decision nodes** — Branch based on conditions
- **Action nodes** — Execute tools and integrations
- **AI nodes** — Use LLM for dynamic decisions

### Runbooks

Runbooks are flexible, AI-driven procedures that give agents guidance while allowing them to adapt to unique situations.

**Example: Account Recovery Runbook**

> 1. Verify the customer's identity using email or phone
> 2. Check for any security flags on the account
> 3. If verified, reset credentials and send recovery email
> 4. If unable to verify, escalate to security team

Runbooks support:
- **Rich text instructions** — Natural language steps
- **Embedded tool references** — Link to specific tools within instructions
- **Snippet inclusions** — Reuse common procedures

### Snippets

Snippets are reusable instruction fragments that can be embedded in multiple runbooks:

| Snippet | Used In |
|---------|---------|
| "Verify Customer Identity" | Password Reset, Account Recovery, Billing Dispute |
| "Check Subscription Status" | Billing Questions, Feature Access, Upgrade Requests |

Create once, use everywhere—changes to a snippet automatically update all runbooks that reference it.

---

## Tagging & Classification

Duckie automatically classifies conversations using categories, attributes, and resolution rules.

### Categories

Categories provide high-level organization for conversation types:

| Category | Description |
|----------|-------------|
| Billing | Payment issues, invoices, refunds |
| Technical Support | Bugs, errors, how-to questions |
| Account Issues | Login problems, password resets |
| Feature Requests | Product suggestions, feedback |

Categories appear in breakdown charts and can be used to filter runs and reports.

### Attributes

Attributes are custom fields with predefined options for more granular tagging:

| Attribute | Options |
|-----------|---------|
| Priority | High, Medium, Low |
| Product Area | Dashboard, API, Mobile App |
| Customer Tier | Enterprise, Pro, Free |
| Sentiment | Positive, Neutral, Negative |

Attributes support single-select or multi-select options.

### Resolution Rules

Define what constitutes a "resolved" conversation:

| Rule | Condition |
|------|-----------|
| "Customer confirmed" | Customer says "thanks" or "that worked" |
| "Issue fixed" | Agent successfully executed a fix |
| "No response needed" | Informational message, no action required |

Resolution rules can combine multiple conditions:
- **Time-based** — X hours since last customer message
- **Attribute-based** — Specific attributes detected
- **AI-based** — LLM evaluates custom criteria

---

## Testing

### Playground

Interactive chat interface for testing agents in real-time:

- **Agent Selection** — Choose any configured agent
- **Live Conversation** — Send messages and see responses
- **Step Visibility** — View execution details for any response
- **Save as Test** — Convert conversations into reusable test cases
- **Rate Responses** — Provide feedback on agent quality

### Batch Testing

Run automated test suites for regression testing:

- **Test Cases** — Define input messages and expected outcomes
- **Batch Execution** — Run all tests against an agent
- **Results Dashboard** — See pass/fail status and compare responses
- **Pre-Deployment Validation** — Catch regressions before going live

---

## Analytics & Insights

### Performance Metrics

| Metric | Description |
|--------|-------------|
| **Deflection Rate** | Percentage of conversations handled without human help |
| **Resolution Rate** | Percentage resolved according to resolution rules |
| **Escalation Rate** | How often conversations are handed to humans |
| **Response Time** | Time from customer message to agent response |
| **Time to Resolution** | Total time from first message to resolution |

### Breakdown Analysis

Visualize ticket distribution across:
- **Categories** — Pie charts and bar charts
- **Attributes** — Per-attribute value distributions
- **Drill-down** — Click any segment to see matching conversations

### AI-Generated Suggestions

Duckie analyzes patterns to recommend improvements:

- **Knowledge Articles** — Suggest new articles based on common questions
- **Workflow Updates** — Identify steps that frequently fail or escalate
- **Guideline Additions** — Recommend rules based on agent behavior

Suggestions can be accepted, dismissed, or saved for later.

### Insights

High-level analytical insights including:

- **Trending Topics** — Emerging issues or frequently asked questions
- **Anomalies** — Unusual spikes in volume or conversation patterns
- **Optimization Opportunities** — Areas where performance could improve

### Alerts

Configure notifications when metrics cross thresholds:

| Alert | Example Threshold |
|-------|-------------------|
| Escalation spike | Rate exceeds 20% for 5 minutes |
| Response time degradation | P95 exceeds 30 seconds |
| Error rate | More than 10% failures |

Alerts can be sent to Slack, email, or webhook endpoints.

### Run History

Complete history of agent execution runs:

- **Time-series chart** — Volume over time
- **Searchable list** — Filter by status, category, date
- **Run details** — Step-by-step execution including tool calls, reasoning, and responses

---

## Integrations

### Communication Platforms

| Platform | Capabilities |
|----------|--------------|
| **Slack** | Read messages, send replies, react, manage threads |
| **Zendesk** | Read tickets, send responses, update fields, internal notes |
| **Intercom** | Read conversations, send messages, manage state |
| **Plain** | Read threads, send responses, customer timelines |
| **Discord** | Read messages, send replies, manage channels |
| **HubSpot** | Read tickets, send responses, update contacts |

### Project Management

| Platform | Capabilities |
|----------|--------------|
| **Jira** | Create issues, update fields, add comments, transitions |
| **Linear** | Create/update issues, add comments |
| **Notion** | Search pages, read content, create entries |

### Knowledge Sources

| Platform | Capabilities |
|----------|--------------|
| **Notion** | Sync documentation and wikis |
| **Confluence** | Import help articles and runbooks |
| **Google Drive** | Sync documents and folders |
| **Slack** | Index historical conversations |

### Connection Management

- **Browse by category** — CRM, Ticketing, Knowledge Base, etc.
- **OAuth setup** — Secure authentication with each platform
- **Status monitoring** — See connection health and reconnect if needed

---

## Deployment Options

### Cloud (SaaS)

The fastest way to get started. Duckie hosts everything—you connect integrations and configure agents.

| Benefit | Description |
|---------|-------------|
| **Zero Infrastructure** | No servers to manage |
| **Automatic Updates** | Always on the latest version |
| **Managed Security** | SOC 2 compliant infrastructure |

### Self-Hosted

For organizations that require data to remain in their own environment.

| Option | What's Hosted By You |
|--------|---------------------|
| **Partial** | Duckie services in your infrastructure; database hosted by Duckie |
| **Full** | Everything runs in your infrastructure (Docker, Kubernetes, or VMs) |

Self-hosted deployments use the same code and features as the cloud version.

---

## Getting Started

1. **Sign Up** — Create your Duckie account at [duckie.ai](https://duckie.ai)
2. **Connect Integrations** — Link your Slack, Zendesk, or other platforms
3. **Add Knowledge** — Connect documentation sources or upload files
4. **Configure Guidelines & Guardrails** — Set behavior rules and safety constraints
5. **Build an Agent** — Assign a runbook/workflow, tools, and knowledge
6. **Test** — Use the playground to validate behavior
7. **Deploy** — Choose a channel and deployment mode to go live

---

## Key Benefits

| Benefit | Impact |
|---------|--------|
| **Faster Response Times** | Customers get answers in seconds, not hours |
| **24/7 Availability** | Support customers around the clock |
| **Consistent Quality** | Every response follows your guidelines |
| **Safety Controls** | Guardrails ensure compliance and escalation |
| **Reduced Workload** | Free your team for complex issues |
| **Actionable Insights** | Understand what customers need and where to improve |
| **Full Transparency** | See exactly how every conversation was handled |

---

## Summary

Duckie is your AI-powered support teammate. It handles routine inquiries, searches your knowledge base, executes workflows, and surfaces insights—all while keeping humans in control through guardrails and escalation rules.

Whether you're a startup handling your first support tickets or an enterprise managing millions of conversations, Duckie scales to meet your needs.

**Ready to get started?** [Contact us](https://duckie.ai/contact) or [sign up for free](https://duckie.ai/signup).
