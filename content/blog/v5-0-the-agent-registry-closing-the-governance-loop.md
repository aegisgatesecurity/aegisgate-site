---
title: "v5.0: The Agent Registry — Seeing Every AI Agent, Killing the Dormant Ones, and Closing the Governance Loop"
slug: v5-0-the-agent-registry-closing-the-governance-loop
description: "Arrakis Security found that 76% of AI agents are dormant with live credentials. Nobody tracks AI agent identity, activity, or lifecycle state. AegisGate v5.0 introduces the Agent Registry — unified discovery across 6 protocol sources, a 5-state lifecycle machine, automatic dormancy detection and credential revocation, AIBOM drift detection, cross-deployment federation, and a dashboard that ties it all together. Combined with the Trust Framework, it closes the loop between visibility and verifiability."
date: 2026-10-26
author: Josh Colvin
tags:
  - ai-security
  - agent-registry
  - lifecycle-management
  - credential-revocation
  - dormancy-detection
  - aibom
  - federation
  - trust-framework
  - release
  - governance
  - compliance
  - nist-ai-rmf
---

Arrakis Security published research earlier this year that should have reshaped how every security team thinks about AI infrastructure. They found that **76% of AI agents in enterprise environments are dormant — provisioned, given credentials, and then never used again. Those credentials stay active forever.**

Nobody revokes them. Nobody even knows they're there.

This isn't a hypothetical. It's the current state of AI agent deployment in 2026. Organizations are provisioning agents for MCP servers, A2A communication, automated workflows, coding assistants, and internal tools — and when those agents stop being used, their credentials, permissions, and access paths remain live. An attacker who finds a dormant agent with `admin` scope to your production database doesn't need to exploit anything. They just log in.

Today we're shipping AegisGate v5.0 — the Agent Registry. It's the biggest feature we've shipped since the Trust Framework, and combined with it, it forms something we believe no other product on the market offers: **closed-loop, verifiable AI agent governance.**

---

## The Gap: Nobody Tracks AI Agents

ITAM tracks laptops. SIEM tracks events. IAM tracks users. CSPM tracks cloud resources. Each of these is a solved problem with mature tooling.

**Nobody tracks AI agents.**

An AI agent is not a laptop. It's not a user. It's not a cloud resource. It's a semi-autonomous software entity that:
- Has its own identity and credentials
- Communicates over multiple protocols (HTTP, MCP, A2A, ACP, ANP)
- Can be provisioned and forgotten in minutes
- May have permissions that exceed what any human user would be granted
- Can go dormant without any decommissioning process

The tools that exist for tracking software assets weren't designed for entities that act autonomously, communicate over AI-specific protocols, and exist in a lifecycle that spans active use, dormancy, and decommissioning.

The result: 76% of AI agents are dormant with live credentials. And nobody knows which 76%.

---

## What We Built: The Agent Registry

The Agent Registry is a unified, live inventory of every AI agent across all AegisGate protocol layers. It's gated behind the enterprise deployments and available as both an in-memory store (for air-gap deployments) and a PostgreSQL store with row-level security for tenant isolation.

### Six-Source Discovery

The Registry doesn't require manual registration. It auto-discovers agents from six sources:

1. **RBAC** — agents registered with AegisGate's role-based access control system
2. **MCP Session Manager** — agents with active MCP tool sessions
3. **A2A** — agents participating in agent-to-agent communication
4. **AIBOM** — agents listed in your AI Bill of Materials
5. **Correlation Engine** — agents observed in threat correlation events
6. **Intent Signing** — agents with signed intent attestations

No manual registration. No CSV imports. The Registry discovers what's already there and reconciles it into a single unified record per agent.

### The Five-State Lifecycle

Every agent in the Registry is in one of five states:

```
provisioned → active → dormant → quarantined → revoked
```

- **Provisioned**: Agent exists but hasn't been active yet
- **Active**: Agent has recent activity within configurable thresholds
- **Dormant**: Agent has been inactive beyond the dormancy threshold
- **Quarantined**: Agent has been isolated — credentials disabled, sessions invalidated
- **Revoked**: Agent has been permanently decommissioned

Quarantine and revoked states are **sticky** — an agent can't transition out of them without explicit administrator action. This prevents a dormant agent from "waking up" and silently reactivating after it's been contained.

### DormancyEngine: Automatic Detection and Response

The DormancyEngine runs on a configurable interval and evaluates every agent against a waterfall of thresholds:

- **Dormant threshold** (default: 24h no activity) → agent marked dormant
- **Quarantine threshold** (default: 7d no activity) → agent isolated, credentials disabled, sessions invalidated
- **Revoke threshold** (default: 30d no activity) → agent permanently decommissioned

These thresholds are fully configurable per deployment. An organization with stricter security requirements might set dormant at 4h, quarantine at 24h, and revoke at 7d.

When an agent transitions to quarantine, the PolicyEngine can automatically:
- Notify security teams via SOAR integrations (PagerDuty, Jira, ServiceNow)
- Trigger incident playbooks (e.g., the built-in `DormantAgentDetected` playbook — 4 steps: notify, evidence collection, quarantine, attestation)
- Disable the agent in RBAC and invalidate all active sessions
- Tag the agent for review

No human in the loop required. But every action is logged with cryptographic evidence for your audit trail.

### PolicyEngine: Declarative Lifecycle Policies

The PolicyEngine lets you define declarative rules that match agents by protocol, role, tags, or tenant — and execute actions when conditions are met:

- **Notify**: Send alerts through SOAR integrations
- **Playbook**: Trigger incident response playbooks
- **Quarantine**: Isolate the agent and revoke credentials
- **Revoke**: Permanently decommission the agent
- **Tag**: Apply metadata tags for downstream workflows

Policies are managed via the HTTP API or the dashboard's built-in policy editor. Default policies can be seeded at boot time.

### AIBOM Drift Detection

Your AI Bill of Materials says you have 10 agents. Your runtime has 14. Four agents are running in production that nobody documented. Two agents in the AIBOM haven't been seen in weeks.

The Registry reconciles your static AIBOM against live runtime agents and reports drift. This is the AI equivalent of finding undocumented servers in your data center — except the "servers" have credentials and can act autonomously.

### Federation: Cross-Deployment Visibility

For organizations running multiple AegisGate deployments (e.g., dev, staging, production, or multi-region), the Federation layer enables cross-deployment agent inventory sharing.

Federation uses cryptographically signed attestation bundles. Each deployment exports its agent inventory as a signed bundle; peer deployments import and verify the bundles. This enables a critical use case: **identifying agents that are dormant in one deployment but active in another.** An agent that's dormant in production but active in staging might be a legitimate test agent — or it might be an attacker using stale staging credentials to move laterally.

Federation is **air-gap by default**. It's opt-in, uses no central server, and works entirely through peer-to-peer attestation exchange. No phone-home. No cloud dependency.

### The Dashboard

The Agent Registry ships with a full dashboard UI — five tabs:

1. **Agent List**: Filterable table of every agent with lifecycle state, last activity, protocols, and quick actions (quarantine, revoke, refresh)
2. **Dormancy Report**: Agents approaching or past dormancy thresholds, sorted by risk
3. **AIBOM Drift**: Side-by-side comparison of documented vs. live agents
4. **Lifecycle Policies**: CRUD editor for declarative policies
5. **Federation**: Bundle export/import status and cross-deployment drift report

A live SSE event log streams lifecycle transitions in real time — you see the moment an agent goes dormant, gets quarantined, or is revoked.

### The HTTP API

Thirteen endpoints at `/api/v1/agents`, all RBAC permission-gated:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/agents` | GET | List all agents (with filters) |
| `/api/v1/agents/{id}` | GET | Get single agent details |
| `/api/v1/agents/{id}` | POST | Update agent metadata |
| `/api/v1/agents/{id}/lifecycle` | POST | Transition lifecycle state |
| `/api/v1/agents/dormancy` | GET | Dormancy report |
| `/api/v1/agents/drift` | GET | AIBOM drift report |
| `/api/v1/agents/policies` | GET/POST | List/create lifecycle policies |
| `/api/v1/agents/policies/{id}` | PUT/DELETE | Update/delete policies |
| `/api/v1/agents/refresh` | POST | Trigger manual discovery refresh |
| `/api/v1/agents/stream` | GET | SSE lifecycle event stream |
| `/api/v1/agents/federation/bundle` | GET/POST | Export/import federation bundle |
| `/api/v1/agents/federation/drift` | GET | Cross-deployment drift report |

---

## The Closed Loop: Agent Registry + Trust Framework

Here's why this matters more than either feature alone.

The **Agent Registry** is a control plane — it sees every agent, tracks its lifecycle, and can automatically contain threats. The **Trust Framework** is an assurance plane — it evaluates compliance policies, collects cryptographic evidence, and produces audit-ready attestation packages.

Separately, they're powerful. Together, they form a closed loop:

```
DISCOVER → CLASSIFY → DETECT → RESPOND → EVIDENCE → AUDIT
```

1. **Discover**: The Registry auto-discovers every agent across 6 protocol sources
2. **Classify**: Each agent is placed in the 5-state lifecycle and evaluated against compliance frameworks
3. **Detect**: The Trust Framework's Rego policy engine flags compliance violations; the DormancyEngine flags dormant agents
4. **Respond**: The PolicyEngine auto-quarantines the agent, revokes credentials, and triggers incident playbooks
5. **Evidence**: The Trust Framework captures cryptographic evidence of every action — the discovery, the violation, the quarantine, the revocation
6. **Audit**: Everything flows into an immutable audit trail mapped to NIST AI RMF, SOC 2, and EU AI Act controls

### The Use Case That Only Works With Both

NIST AI RMF MEASURE-2.7 requires tracking AI system lifecycle states and ensuring credentials are revoked when systems are decommissioned. Without the Agent Registry, you can't see which agents are decommissioned (dormant). Without the Trust Framework, you can't prove to an auditor that you revoked their credentials.

With both: the Registry discovers the dormant agent → the Trust Framework flags the MEASURE-2.7 violation → the PolicyEngine auto-revokes credentials → the Trust Framework captures the evidence → the auditor gets a verifiable chain of custody for every agent, every transition, every revocation.

One closed loop. Zero manual steps. Auditor-ready evidence.

**The Agent Registry without the Trust Framework is just a dashboard. The Trust Framework without the Agent Registry is just paperwork. Together, they're the only complete, verifiable AI agent governance solution on the market.**

---

## What's In the Release

v5.0.0 ships across the AegisGate Platform. The new package is ~7,200 LOC across 22 files, with 13 HTTP endpoints, a 5-tab dashboard, in-memory and PostgreSQL stores, federation support, and a built-in incident playbook mapped to NIST AI RMF MEASURE-2.7 and SOC 2 CC6.2.

All CI workflows pass — unit tests, integration tests with testcontainers, coverage gates (85% total, 90% per-package), golangci-lint, race detector, security scans, and the detection gate. The platform is at version 5.0.0.

---

## Why This Matters Now

In October 2026, the AI security landscape shifted. Hard.

14 critical vulnerabilities and attack vectors dropped in a single month — the event we've been calling [Black October](/blog/black-october-blue-team-guide/) ([PDF download](/downloads/black-october-blue-team-guide.pdf), no registration required). AI agent instruction file poisoning. Markdown-as-executable attacks. MCP RCE. Supply chain compromises. Autonomous agents rewriting their own models. Chinese APTs using open-source AI pentesting frameworks against Microsoft 365 tenants at 2,900 authentication attempts per minute.

This wasn't a warning shot. It was a barrage. And the industry's own leaders made it clear they don't see an end in sight.

> *"It's going to feel like the sky is falling,"* Cloudflare CEO Matthew Prince wrote on X. *"The next two years are going to be incredibly, incredibly, incredibly fraught with new tools that have infinite patience to go look for vulnerabilities across the Internet."*
>
> Anthropic's Deputy CISO Jason Clinton called it a **"vulnerability tsunami"**: *"There won't be enough time to patch critical infrastructure."* Sam Altman was more blunt: *"I no longer think we're going to be able to patch all bugs."* Salesforce CEO Marc Benioff called it a **"code red."**
>
> — *The Guardian, October 23, 2026* ([source](https://www.theguardian.com/technology/2026/oct/23/cybersecurity-ai-hacking-php-vulnerability))

The underlying issue is this: **organizations have filled their environments with AI agents that nobody is tracking.** Every team that spun up an MCP server, connected a coding assistant, deployed an automated workflow, or integrated a third-party LLM API added another autonomous entity with credentials, permissions, and access to sensitive systems. Nobody ran a background check. Nobody followed up when the agent stopped being used. Nobody revoked the credentials.

It's like every organization hired a fleet of developers without background checks, gave them all production access, and then stopped paying attention. 76% of those "developers" are still showing up to work every day with their badges active. They're just not doing anything — until someone else uses their badge.

The model misalignment will continue. The apologies will continue. The bots will keep committing felonies. The vendors who built these systems are not going to solve this from the inside — they're still figuring out how to make their models not leak secrets, let alone govern the agents that use them.

**We can be the fix.**

Not because we're smarter than everyone else. Because we built the thing that was missing. The Agent Registry sees every agent. The Trust Framework proves every action. The DormancyEngine kills the zombie credentials before an attacker finds them. The PolicyEngine automates the response so you don't need a 24/7 SOC watching your agent inventory.

This isn't a future vision. It's shipping today. v5.0.0 is live, the CI is green, and the dashboard works. If you're running AI agents in production — and in 2026, who isn't — you need to know what's in your environment before someone else does.

---

## What's Next

The Agent Registry is the foundation, not the finish line. The next phases are:

1. **Customer validation**: We're talking to organizations about their real-world agent sprawl. If you have AI agents across multiple protocols and don't have a unified inventory, we'd like to hear from you.
2. **Federation partners**: The cross-deployment attestation protocol is designed for multi-team and multi-org visibility. We're looking for early partners running multiple AegisGate deployments.
3. **Expanding discovery sources**: The six-source discovery architecture is extensible. Additional protocol adapters and third-party integrations are on the roadmap.
4. **Non-provisional filings**: The intellectual property underlying the Agent Registry and Trust Framework is patent-pending. We'll be converting to non-provisional filings in 2027.

If you're dealing with agent sprawl — dormant agents, undocumented credentials, no visibility into what's running where — [get in touch](https://aegisgatesecurity.io). The Agent Registry is available now on Platform Professional.

---

**v5.0.0 is live.** [CHANGELOG](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/CHANGELOG.md) · [Docker image](https://github.com/aegisgatesecurity/aegisgate-platform/pkgs/container/aegisgate-platform) · [Live demo](https://demo.aegisgatesecurity.io/)

**Secure Every AI Interaction.**

---

*Josh Colvin is the founder and sole developer of AegisGate Security, LLC. 8 provisional patents filed. Over 1.1M LOC across 5 products. Apache 2.0 licensed. No telemetry. No data egress. [GitHub](https://github.com/aegisgatesecurity/aegisgate-platform).*