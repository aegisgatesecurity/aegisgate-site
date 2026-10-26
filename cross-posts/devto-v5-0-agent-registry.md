---
title: "The 76% Problem: Why Your AI Agents Are Dormant with Live Credentials (and How to Fix It)"
published: false
description: "76% of AI agents in enterprise environments are dormant with live credentials. Nobody tracks AI agent identity, activity, or lifecycle. Here's how AegisGate v5.0 solves this with a unified Agent Registry — and how it pairs with a Trust Framework to close the governance loop."
tags: aisecurity, agents, devops, governance
cover_image: https://aegisgatesecurity.io/img/blog/v5-0-agent-registry.png
---

Arrakis Security published research earlier this year that should have reshaped how every security team thinks about AI infrastructure. They found that **76% of AI agents in enterprise environments are dormant — provisioned, given credentials, and then never used again.**

Nobody revokes them. Nobody even knows they're there.

This isn't a hypothetical. If you're running AI agents in production — MCP servers, A2A workflows, coding assistants, automated tools — you almost certainly have agents that were provisioned for a task, completed (or abandoned) it, and now sit with live credentials and permissions that nobody remembers granting.

An attacker who finds a dormant agent with `admin` scope to your production database doesn't need to exploit anything. They just log in.

I just shipped AegisGate v5.0 to address this. Here's what it does and why it matters.

---

## The Problem: Nobody Tracks AI Agents

We have ITAM for laptops. SIEM for events. IAM for users. CSPM for cloud resources. Each is a solved problem.

**Nobody tracks AI agents.**

An AI agent is a semi-autonomous software entity that:
- Has its own identity and credentials
- Communicates over multiple protocols (HTTP, MCP, A2A, ACP, ANP)
- Can be provisioned and forgotten in minutes
- May have permissions exceeding any human user
- Goes dormant without any decommissioning process

The result: 76% dormant with live credentials. And nobody knows which 76%.

---

## The Solution: Agent Registry

I built a unified, live inventory of every AI agent across all protocol layers. It auto-discovers agents from six sources — no manual registration required:

1. **RBAC** — agents registered with access control
2. **MCP Session Manager** — agents with active MCP tool sessions
3. **A2A** — agents in agent-to-agent communication
4. **AIBOM** — agents in your AI Bill of Materials
5. **Correlation Engine** — agents observed in threat events
6. **Intent Signing** — agents with signed intent attestations

The Registry reconciles all six sources into a single unified record per agent.

### The Lifecycle State Machine

Every agent is in one of five states:

```
provisioned → active → dormant → quarantined → revoked
```

Quarantine and revoked are **sticky** — an agent can't transition out without explicit admin action. No silent reactivation.

### Automatic Dormancy Detection

A DormancyEngine evaluates every agent against configurable thresholds:

- **24h no activity** → dormant
- **7d no activity** → quarantined (credentials disabled, sessions invalidated)
- **30d no activity** → revoked (permanently decommissioned)

When an agent is quarantined, the PolicyEngine can automatically notify security teams via SOAR integrations, trigger incident playbooks, disable the agent in RBAC, and invalidate all sessions.

No human in the loop. But every action is logged with cryptographic evidence.

### The API

Thirteen REST endpoints, all RBAC-gated:

```bash
# List all agents with lifecycle state
curl -H "Authorization: Bearer $TOKEN" \
  https://api.aegisgate.local/api/v1/agents

# Get dormancy report
curl -H "Authorization: Bearer $TOKEN" \
  https://api.aegisgate.local/api/v1/agents/dormancy

# Quarantine a dormant agent
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -d '{"state":"quarantined","reason":"dormant_7d"}' \
  https://api.aegisgate.local/api/v1/agents/agent-123/lifecycle

# Subscribe to real-time lifecycle events via SSE
curl -H "Authorization: Bearer $TOKEN" \
  https://api.aegisgate.local/api/v1/agents/stream
```

The SSE stream pushes lifecycle transitions in real time — you see the moment an agent goes dormant or gets quarantined.

### AIBOM Drift Detection

Your AI Bill of Materials says you have 10 agents. Your runtime has 14. Four agents are running that nobody documented.

```bash
# Check for drift between AIBOM and live agents
curl -H "Authorization: Bearer $TOKEN" \
  https://api.aegisgate.local/api/v1/agents/drift
```

Returns agents that exist in the runtime but not in the AIBOM (undocumented) and agents in the AIBOM with no live runtime presence (ghost entries).

### Cross-Deployment Federation

Running multiple AegisGate deployments? The Federation layer enables cross-deployment agent inventory sharing via cryptographically signed attestation bundles.

```bash
# Export your agent inventory as a signed bundle
curl -H "Authorization: Bearer $TOKEN" \
  https://api.aegisgate.local/api/v1/agents/federation/bundle

# Import a peer's signed bundle
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -d @peer-bundle.json \
  https://api.aegisgate.local/api/v1/agents/federation/bundle

# Check for cross-deployment drift
curl -H "Authorization: Bearer $TOKEN" \
  https://api.aegisgate.local/api/v1/agents/federation/drift
```

This enables a key use case: **identifying agents dormant in one deployment but active in another.** An agent dormant in production but active in staging might be a test agent — or it might be an attacker using stale staging credentials.

Federation is air-gap by default. Opt-in. No central server. Peer-to-peer attestation exchange only.

### The Dashboard

Five tabs — agent list with lifecycle actions, dormancy report, AIBOM drift, policy CRUD editor, and federation status — plus a live SSE event log that streams transitions in real time.

---

## The Closed Loop: Why This Matters With a Trust Framework

Here's the part I'm most excited about.

The Agent Registry is a **control plane** — it sees every agent, tracks lifecycle, and can automatically contain threats. The Trust Framework (shipped earlier this year) is an **assurance plane** — it evaluates compliance policies, collects cryptographic evidence, and produces audit-ready attestation packages.

Separately, they're powerful. Together, they form a closed loop:

```
DISCOVER → CLASSIFY → DETECT → RESPOND → EVIDENCE → AUDIT
```

1. **Discover**: Registry auto-discovers every agent across 6 sources
2. **Classify**: Each agent placed in the lifecycle and evaluated against compliance frameworks
3. **Detect**: Trust Framework flags compliance violations; DormancyEngine flags dormant agents
4. **Respond**: PolicyEngine auto-quarantines, revokes credentials, triggers playbooks
5. **Evidence**: Trust Framework captures cryptographic evidence of every action
6. **Audit**: Everything flows into an immutable audit trail mapped to NIST AI RMF, SOC 2, EU AI Act

### The Use Case That Only Works With Both

NIST AI RMF MEASURE-2.7 requires tracking AI system lifecycle states and ensuring credentials are revoked when systems are decommissioned.

Without the Agent Registry, you can't see which agents are decommissioned. Without the Trust Framework, you can't prove to an auditor that you revoked their credentials.

With both: the Registry discovers the dormant agent → the Trust Framework flags the violation → the PolicyEngine auto-revokes credentials → the Trust Framework captures the evidence → the auditor gets a verifiable chain of custody.

One closed loop. Zero manual steps. Auditor-ready evidence.

**The Agent Registry without the Trust Framework is just a dashboard. The Trust Framework without the Agent Registry is just paperwork. Together, they're the only complete AI agent governance solution I'm aware of.**

---

## What's in the Release

- ~7,200 LOC new package, 22 files
- 13 HTTP endpoints
- 5-tab dashboard with live SSE
- In-memory store (air-gap) + PostgreSQL store with row-level security
- Federation with signed attestation bundles
- Built-in incident playbook mapped to NIST AI RMF MEASURE-2.7 and SOC 2 CC6.2
- Professional tier gated
- Apache 2.0 licensed

All CI passing: unit tests, integration tests with testcontainers, 85%+ total coverage, 90%+ per-package floor, golangci-lint clean, race detector clean, security scans clean.

---

## Why This Matters Now

In October 2026, the AI security landscape shifted. Hard.

14 critical vulnerabilities and attack vectors dropped in a single month. AI agent instruction file poisoning. Markdown-as-executable attacks. MCP RCE. Supply chain compromises. Autonomous agents rewriting their own models. Chinese APTs using open-source AI pentesting frameworks against Microsoft 365 tenants at 2,900 authentication attempts per minute.

We documented all of it in our [Black October Blue Team Field Guide](https://aegisgatesecurity.io/blog/black-october-blue-team-guide/) — [PDF available here](https://aegisgatesecurity.io/downloads/black-october-blue-team-guide.pdf), no registration required.

This wasn't a warning shot. It was a barrage. And the industry's own leaders made it clear they don't see an end in sight.

> *"It's going to feel like the sky is falling,"* Cloudflare CEO Matthew Prince wrote on X. *"The next two years are going to be incredibly, incredibly, incredibly fraught with new tools that have infinite patience to go look for vulnerabilities across the Internet."*
>
> Anthropic's Deputy CISO Jason Clinton called it a **"vulnerability tsunami"**: *"There won't be enough time to patch critical infrastructure."* Sam Altman: *"I no longer think we're going to be able to patch all bugs."* Marc Benioff called it a **"code red."**
>
> — *The Guardian, October 23, 2026* ([source](https://www.theguardian.com/technology/2026/oct/23/cybersecurity-ai-hacking-php-vulnerability))

The underlying issue: **organizations have filled their environments with AI agents that nobody is tracking.** Every team that spun up an MCP server, connected a coding assistant, deployed an automated workflow, or integrated a third-party LLM API added another autonomous entity with credentials, permissions, and access to sensitive systems. Nobody ran a background check. Nobody followed up when the agent stopped being used. Nobody revoked the credentials.

It's like every org hired a fleet of developers without background checks, gave them all production access, and then stopped paying attention. 76% of those "developers" are still showing up with their badges active. They're just not doing anything — until someone else uses their badge.

The model misalignment will continue. The apologies will continue. The bots will keep committing felonies. The vendors who built these systems aren't going to solve this from the inside — they're still figuring out how to make their models not leak secrets, let alone govern the agents that use them.

**We can be the fix.**

Not because we're smarter than everyone else. Because we built the thing that was missing. The Agent Registry sees every agent. The Trust Framework proves every action. The DormancyEngine kills zombie credentials before an attacker finds them. The PolicyEngine automates the response so you don't need a 24/7 SOC watching your agent inventory.

This isn't a future vision. It's shipping today. If you're running AI agents in production — and in 2026, who isn't — you need to know what's in your environment before someone else does.

---

## What's Next

The Agent Registry is the foundation. Next phases:

1. **Customer validation** — if you have AI agent sprawl, I want to hear from you
2. **Federation partners** — early partners running multiple deployments
3. **Expanding discovery sources** — the six-source architecture is extensible
4. **Patent conversion** — IP is patent-pending, non-provisional filings in 2027

If you're dealing with dormant agents, undocumented credentials, or no visibility into what AI is running in your environment — the Agent Registry is available now on Platform Professional.

**Repo:** [github.com/aegisgatesecurity/aegisgate-platform](https://github.com/aegisgatesecurity/aegisgate-platform)
**Live demo:** [demo.aegisgatesecurity.io](https://demo.aegisgatesecurity.io/)
**Changelog:** [CHANGELOG.md](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/CHANGELOG.md)

---

Secure Every AI Interaction.

---

*Josh Colvin is the founder and sole developer of AegisGate Security, LLC. 8 provisional patents filed. Over 1.1M LOC across 5 products. Apache 2.0. No telemetry. No data egress. [GitHub](https://github.com/aegisgatesecurity/aegisgate-platform).*