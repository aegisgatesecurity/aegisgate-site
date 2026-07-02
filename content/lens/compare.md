---
title: "AegisGate Lens vs AegisGate Platform — What's the Difference?"
description: "Side-by-side comparison of AegisGate Lens (free browser extension) and AegisGate Platform (enterprise gateway). When to use which, and when to use both together."
type: "docs"
weight: 10
---

# AegisGate Lens vs AegisGate Platform

Two products from the same security team, designed for different deployment points. This page explains what each does, when to use which, and when to use them together.

## TL;DR

- **[AegisGate Lens](https://chromewebstore.google.com/category/extensions/ai)** is a **free Chrome extension** that protects **end users** browsing AI tools. Browser-level. No account. Privacy-first.
- **[AegisGate Platform](https://aegisgatesecurity.io/?utm_source=lens-compare)** is an **enterprise gateway** that protects **servers and teams** running AI tools. Server-level. Per-team pricing. Central policy + analytics.

Use **Lens alone** if you're an individual developer, security researcher, journalist, or privacy-conscious user. Use **Platform alone** if you're running AI in production at a company and need central policy + audit + compliance. Use **both** if you want every layer protected (Lens for users, Platform for servers).

---

## Feature-by-Feature Comparison

| Feature | **Lens** (free browser ext) | **Platform** (enterprise gateway) |
|---------|:---------------------------:|:----------------------------------:|
| **Price** | Free, forever | Free (Community) / $29/mo (Starter) / $99/mo (Developer) / custom (Enterprise) |
| **Account required** | ❌ No | ✅ Yes |
| **Browser-side AI provider protection** (PII, secrets, XSS, prompt-injection, toxicity in ChatGPT, Claude, Gemini, Copilot, duck.ai, Perplexity) | ✅ All 6 facets | ✅ All 6 facets (same corpus) |
| **6-facet detection** (PII / Secrets / XSS / Prompt-Injection / Toxicity / Compliance) | ✅ | ✅ |
| **Privacy: no prompt text, no URLs, no page content sent** | ✅ | ✅ |
| **Local processing** (no server round-trip for default detection) | ✅ | ✅ |
| **ModernBERT-base ML model** (149M params, 8K context, sliding window) | ✅ | ✅ |
| **Ed25519-signed bundles + SLSA L2 provenance** | ✅ | ✅ |
| **Real-time detection** (<100ms latency) | ✅ | ✅ |
| **MITRE ATLAS** (66 techniques) | ✅ | ✅ |
| **OWASP LLM Top-10** (49 patterns) | ✅ | ✅ |
| **Custom rules per user** | ❌ | ✅ |
| **Team-wide policy** (one rule applies to all users) | ❌ | ✅ |
| **Team-wide analytics dashboard** | ❌ | ✅ |
| **Central audit log** (who saw what, when) | ❌ | ✅ |
| **Server-side AI protection** (HTTP API scanning for AI services) | ❌ | ✅ (144+ patterns) |
| **MCP protocol protection** (Model Context Protocol) | ❌ | ✅ (8 guardrails) |
| **A2A agent-to-agent security** (mTLS, capabilities, rate limiting) | ❌ | ✅ |
| **ACP (Agent Communication Protocol) security** | ❌ | ✅ |
| **Response scanning** (catches bad AI outputs before they reach the user) | ❌ | ✅ |
| **Trust Framework** (continuous cryptographically-signed trust scoring) | ❌ | ✅ |
| **EU AI Act Compliance Module** (82 controls, Professional+ tier) | ❌ | ✅ |
| **OWASP compliance module** | ❌ | ✅ (Starter+) |
| **GDPR / HIPAA / PCI / SOC 2 compliance modules** | ❌ | ✅ (Professional+) |
| **SIEM export** (Splunk, Datadog, Elastic, etc.) | ❌ | ✅ (Enterprise) |
| **Custom detection rules per team** | ❌ | ✅ |
| **Slack / Teams / Jira integration** | ❌ | ✅ (Enterprise) |
| **Self-hosted option** | N/A (already client-side) | ✅ (Enterprise) |
| **Multi-region deployment** | N/A | ✅ (Enterprise) |
| **SLA / 24/7 support** | ❌ | ✅ (Professional+) |

---

## When to use which

### Use **Lens alone** if:
- You're an individual developer using AI assistants
- You're a security researcher analyzing AI behavior
- You're a journalist or writer concerned about prompt privacy
- You want a privacy-first safety net while you work
- You're evaluating AegisGate for your team (start with Lens)

### Use **Platform alone** if:
- You're running AI in production at a company
- You need to enforce AI safety policy across a team
- You need to log AI interactions for compliance
- You need server-side AI protection (your own AI services, not just end-user AI tools)
- You have an SIEM and need alerts

### Use **both** if:
- You want defense in depth: Lens at the user browser + Platform at the server
- You need end-user AI protection AND server-side AI protection
- You're a security team that needs both behavioral analytics (Platform) and end-user training tools (Lens)
- You want a Lens-detected threat to be promoted to a Platform-wide policy rule (roadmap item T2.2.2)

---

## Technical comparison

### Architecture
- **Lens**: Browser extension (MV3). Content script injected into AI provider pages. Detection runs locally in the browser. Bundle signed with Ed25519, distributed via Chrome Web Store.
- **Platform**: Self-hosted Docker container (13.3MB). Sits between your AI services and clients. Detection runs in the gateway. Bundle signed with Ed25519, distributed via GitHub Releases.

### Detection corpus
Both products share the same detection corpus (the 6-facet taxonomy: PII, secrets, XSS, prompt-injection, toxicity, compliance keywords). When a new threat is added to one, it's added to the other.

### Privacy model
- **Lens**: Privacy-by-default. No telemetry unless explicitly opted in. 12 non-negotiables (see [Lens homepage](/lens/)).
- **Platform**: Privacy-by-default for detection. Logging is opt-in (Enterprise tier).

### Test coverage
- **Lens**: 233/233 tests. Zero external dependencies. All tests in `node:test` (Node 20+ stdlib).
- **Platform**: 5,484 tests, 97.8% coverage. Zero external dependencies. All tests in `go test` (Go 1.26+ stdlib).

### Source code
- **Lens**: [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens) — Apache 2.0
- **Platform**: [github.com/aegisgatesecurity/aegisgate-platform](https://github.com/aegisgatesecurity/aegisgate-platform) — Apache 2.0

---

## Pricing

### AegisGate Lens
- **Free**, forever. No "Pro" tier. No credit card. No account.

### AegisGate Platform
| Tier | Price | Best for |
|------|-------|----------|
| Community | Free | Solo developers, getting started |
| Starter | $29/mo | SMB, SLED, SOHO teams |
| Developer | $99/mo | Mid-size teams, custom rules |
| Professional | Custom | Compliance (HIPAA, PCI, SOC 2, EU AI Act) |
| Enterprise | Custom | Self-hosted, SLA, 24/7 support |

See [full pricing](https://aegisgatesecurity.io/pricing/?utm_source=lens-compare) for details.

---

## Get started

- 🛡️ **[Install Lens from Chrome Web Store](https://chromewebstore.google.com/category/extensions/ai)** — one click, no account
- 🐙 **[Deploy Platform](https://aegisgatesecurity.io/docs/getting-started/?utm_source=lens-compare)** — `docker run` in 60 seconds
- ⚖️ **[Compare side-by-side](https://aegisgatesecurity.io/pricing/?utm_source=lens-compare)** — pricing details
- 📧 **[Contact sales](mailto:sales@aegisgatesecurity.io)** for Enterprise questions

---

**Questions?** Email `security@aegisgatesecurity.io` (see [`.well-known/security.txt`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/.well-known/security.txt) for the disclosure policy).
