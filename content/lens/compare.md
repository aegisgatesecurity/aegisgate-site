---
title: "AegisGate Lens vs AegisGate Platform — What's the Difference?"
description: "Side-by-side comparison of AegisGate Lens (free browser extension) and AegisGate Platform (enterprise gateway). When to use which, and when to use both together."
type: "docs"
weight: 10
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.3.1</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI</li>
<li><strong>5 detection facets</strong>: PII (55), secrets (41), XSS (12), compliance (61), ML adversarial (1 Char CNN-BiLSTM model) — 169 regex patterns + on-device ML</li>
<li><strong>504 automated tests</strong>: 492/492 Node + 12/12 ML perf/stress</li>
<li><strong>100% adversarial detection</strong> (10/10 prompt injections caught by ML model); <strong>2.31% regex FPR</strong> on 6,500 WildChat prompts</li>
<li><strong>~0.3ms regex + ~5ms ML</strong> (regex p50 0.076ms; ML ~5ms in Chrome, pure JS, no WASM)</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies, zero WASM binaries</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens vs AegisGate Platform

Two products from the same security team, designed for different deployment points. This page explains what each does, when to use which, and when to use them together.

## TL;DR

- **[AegisGate Lens](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip)** is a **free browser extension** ([also on Firefox](https://addons.mozilla.org/en-US/firefox/addon/aegisgate-lens/)) that protects **end users** browsing AI tools. Browser-level. No account. Privacy-first.
- **[AegisGate Platform](/platform/)** is an **enterprise gateway** that protects **servers and teams** running AI tools. Server-level. Per-team pricing. Central policy + analytics.

Use **Lens alone** if you're an individual developer, security researcher, journalist, or privacy-conscious user. Use **Platform alone** if you're running AI in production at a company and need central policy + audit + compliance. Use **both** if you want every layer protected (Lens for users, Platform for servers).

---

## Feature-by-Feature Comparison

| Feature | **Lens** (free browser ext) | **Platform** (enterprise gateway) |
|---------|:---------------------------:|:----------------------------------:|
| **Price** | Free, forever | Free (Community) / $79/mo (Developer) / custom (Enterprise) |
| **Account required** | ❌ No | ✅ Yes |
| **Browser-side AI provider protection** (PII, secrets, XSS, compliance, adversarial ML in ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI) | ✅ All 5 facets | ✅ All 5 facets (same corpus) |
| **5-facet detection** (PII / Secrets / XSS / Compliance / ML Adversarial). v0.3.1 adds on-device ML. | ✅ | ✅ |
| **Privacy: no prompt text, no URLs, no page content sent** | ✅ | ✅ |
| **Local processing** (no server round-trip for default detection) | ✅ | ✅ |
| **Ed25519-signed extension bundle + GitHub Actions provenance** | ✅ | ✅ |
| **Real-time detection** (<1ms latency) | ✅ | ✅ |
| **MITRE ATLAS** (66 techniques) | ✅ | ✅ |
| **OWASP LLM Top-10** (5/10 implemented, 24 patterns total) | ✅ | ✅ |
| **Custom rules per user** | ❌ | ✅ |
| **Team-wide policy** (one rule applies to all users) | ❌ | ✅ |
| **Team-wide analytics dashboard** | ❌ | ✅ |
| **Central audit log** (who saw what, when) | ❌ | ✅ |
| **Server-side AI protection** (HTTP API scanning for AI services) | ❌ | ✅ (176 patterns) |
| **MCP protocol protection** (Model Context Protocol) | ❌ | ✅ (8 guardrails) |
| **A2A agent-to-agent security** (mTLS, capabilities, rate limiting) | ❌ | ✅ |
| **ACP (Agent Communication Protocol) security** | ❌ | ✅ |
| **Response scanning** (catches bad AI outputs before they reach the user) | ❌ | ✅ |
| **Trust Framework** (continuous cryptographically-signed trust scoring) | ❌ | ✅ |
| **EU AI Act Compliance Module** (120 controls, Professional+ tier) | ❌ | ✅ |
| **OWASP compliance module** | ❌ | ✅ (Developer+) |
| **GDPR / HIPAA / PCI / SOC 2 compliance modules** | ❌ | ✅ (Professional+) |
| **SIEM export** (Splunk, Datadog, Elastic, etc.) | ❌ | ✅ (Professional+) |
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
- **Platform**: Self-hosted Docker container (19.1MB). Sits between your AI services and clients. Detection runs in the gateway. Bundle signed with Ed25519, distributed via GitHub Releases.

### Detection corpus
Both products share the same detection corpus (the 5-facet taxonomy: PII, secrets, XSS, compliance, adversarial ML). When a new threat is added to one, it's added to the other.

### Privacy model
- **Lens**: Privacy-by-default. No telemetry unless explicitly opted in. 12 non-negotiables (see [Lens homepage](/lens/)).
- **Platform**: Privacy-by-default for detection. Logging is opt-in (Enterprise tier).

### Test coverage
- **Lens**: 504 automated tests (492/492 Node + 12/12 ML perf/stress). Zero external dependencies, zero WASM binaries.
- **Platform**: 8,000+ tests, 83.1% coverage. Zero external dependencies. All tests in `go test` (Go 1.26+ stdlib).

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
| Developer | $79/mo | Small teams, custom rules |
| Professional | $499/mo | Compliance (HIPAA, PCI, SOC 2, EU AI Act) |
| Enterprise | Custom | Self-hosted, SLA, 24/7 support |

See [full pricing](/pricing/) for details.

---

## Get started

- 🛡️ **[Install Lens from Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip)** — one click, no account
- 🐙 **[Deploy Platform](/docs/getting-started/)** — `docker run` in 60 seconds
- ⚖️ **[Compare side-by-side](/pricing/)** — pricing details
- 📧 **[Contact sales](mailto:sales@aegisgatesecurity.io)** for Enterprise questions

---

**Questions?** Email `security@aegisgatesecurity.io` (see [`SECURITY.md`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md) for the disclosure policy).
