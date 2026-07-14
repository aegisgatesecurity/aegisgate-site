---
title: "AegisGate Lens — Free Privacy-First Browser Protection for AI Tools"
description: "Free, privacy-first Chrome extension that protects users across 8 AI providers (ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok) with 4-facet regex detection. 500/500 Node tests, 3/3 Go tests, 16/16 headless smoke + 128/128 mini-smoke in real Chrome. Zero external dependencies. No account required."
type: "landing"
---
> **🆕 AegisGate Lens v0.1.4 is LIVE** — CWS approved 2026-07-13. [Install on the Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) (free, forever, 8 AI providers).
>
> AegisGate Lens v0.1.4 will add the following to the **live** v0.1.0-beta below:
>
> - **Clickable "🛡️ Lens active" indicator** — opens the extension popup with
>   3 new controls: hide indicator, pause Lens for 1h/1d, and "Not PII — dismiss for 24h"
> - **8 AI providers** (still — we consolidated from the 10 in v0.1.0-beta)
> - **132 regex patterns** across 4 detection facets (PII, secrets, XSS, compliance)
> - **500/500 unit tests** + 3/3 Go tests + 16/16 headless smoke (5/5 stable runs)
> - **2.31% false positive rate** on 6,500 WildChat prompts (5.1× better than v0.1.0-beta)
> - **100% on-device**, zero network egress by default, 12 privacy non-negotiables
>
> Check back after the CWS review completes to download v0.1.4.


<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/docs/FACTS.md -->
<!-- If you change any number below, update FACTS.md FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.1.4</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/docs/FACTS.md">docs/FACTS.md</a>)</em>

<ul>
<li><strong>8 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok</li>
<li><strong>132 regex patterns</strong> across <strong>4 detection facets</strong>: PII, secrets, XSS, compliance</li>
<li><strong>647 automated tests</strong>: 500/500 Node + 3/3 Go + 16/16 headless smoke + 128/128 mini-smoke (5/5 stable runs)</li>
<li><strong>2.31% FPR</strong> on 6,500 WildChat prompts (5.1x better than v0.1.0-beta baseline)</li>
<li><strong>Sub-millisecond detection</strong> (p50 0.076ms, p95 0.085ms, p99 0.14ms for 500-char prompts)</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


<div class="alert alert-success alert-center">
<strong>🛡️ AegisGate Lens</strong> is <strong>free and stays free</strong> for individual use. No account required. No prompt text ever sent to any server. <a href="https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip" class="btn btn-primary" style="margin-left:12px">Install from Chrome Web Store →</a>
</div>

## 🛡️ AegisGate Lens — Privacy-First Browser Protection for AI Tools

AegisGate Lens is a free Chrome extension that detects PII (SSN, email, phone, credit card), secrets (API keys, tokens, private keys), XSS payloads, and compliance violations (OWASP LLM Top 10, MITRE ATLAS, EU AI Act) in real time as you type into ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, and Grok. All processing happens **locally in your browser** — no account, no telemetry, no data exfiltration.

The same security team behind [AegisGate Platform™](https://aegisgatesecurity.io/?utm_source=lens-homepage) (the enterprise gateway) builds Lens as the consumer-facing layer. The two products share the same detection corpus, the same MITRE ATLAS mapping, and the same privacy commitments. See [Lens vs Platform](/lens/compare/) for the side-by-side comparison.

---

## Why Lens?

- **🔒 Privacy by design**: 12 non-negotiables. No prompt text, no URLs, no page content, no account, no personal identifiers, no fingerprinting. All detection happens in your browser.
- **🎯 4-facet detection**: PII (55 patterns), secrets (41 patterns), XSS (12 patterns), compliance (24 patterns) — 132 total regex patterns for fast, on-device detection.
- **⚡ Real-time**: 500/500 Node tests + 3/3 Go tests + 16/16 headless smoke + 128/128 mini-smoke in real Chrome. Detection latency sub-millisecond (p99 0.14ms for 500-char prompts). No network round-trips — 100% on-device detection.
- **🌐 8 AI providers**: ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, Grok. No special setup per provider.
- **🔍 Regex-based detection**: Fast, predictable, deterministic patterns. No ML model loading, no inference latency, no false positives from subjective interpretation.
- **🔓 Free, forever**: No "Pro" tier, no feature gate, no credit card. Lens is the consumer-facing product; Platform is the optional enterprise gateway.

---

## How it works

Lens injects a content script into the 8 supported AI providers. As you type a prompt, the content script:

1. **Detects** with 4 regex facets:
   - **PII**: SSN, email, phone, credit card (Luhn-validated), DOB, address, driver's license, passport, tax ID, bank account, IP address (55 patterns)
   - **Secrets**: API keys (AWS, GitHub, OpenAI, Stripe, Slack), RSA private keys, OAuth tokens, database credentials (41 patterns)
   - **XSS**: `&lt;script&gt;` tags, event handlers, `javascript:` URLs, SVG-based XSS, DOM clobbering, polyglot payloads (12 patterns)
   - **Compliance**: 24 patterns including OWASP LLM Top 10 (5/10 implemented with footnote), MITRE ATLAS techniques, EU AI Act patterns
2. **Warns** via a non-blocking banner at the top of the page that explains what was detected, why it matters, and what to do about it (3 options: Cancel, Edit & Redact, Send Anyway).
3. **Never sends** your prompt to any server — not even opt-in. The only data Lens may send is anonymous, hashed metadata (detection category, no text) when you explicitly opt in to help improve detection.
4. **Stores nothing** by default. No keystroke logging, no prompt caching, no history.

See the [architecture overview](/lens/architecture/) for details on the 4-facet detection system.

---

## The 12 Privacy Non-Negotiables

Lens **never** sends or stores:

1. ❌ Prompt text (input or output)
2. ❌ URLs
3. ❌ Page content
4. ❌ Personal identifiers (PII detected in your prompts is rewritten in your browser, never sent)
5. ❌ Account credentials
6. ❌ Browser fingerprinting
7. ❌ Cross-site tracking
8. ❌ AI provider metadata
9. ❌ Keystroke timing
10. ❌ Mouse movement
11. ❌ Session identifiers
12. ❌ IP addresses (when self-hosted) — only the Gateway server IP if you use the optional opt-in telemetry

If we ever change any of these, the change will be:
- Documented in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/docs/SECURITY.md)
- Disclosed in the release notes
- Announced via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/discussions)

---

## Try it

- 🛡️ **[Install from Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip)** — one click, no account
- 🐙 **[Lens on GitHub](https://github.com/aegisgatesecurity/aegisgate-lens)** — Apache 2.0, 500/500 tests, zero external dependencies
- 📜 **[Privacy Policy](/lens/privacy/)** — the full text of what Lens does and doesn't collect
- 🏗️ **[Architecture](/lens/architecture/)** — how the 4-facet detection system works
- 🔒 **[Security Model](/lens/security/)** — content security policy, vulnerability disclosure
- 📋 **[Changelog](/lens/changelog/)** — what changed in each version
- ⚖️ **[Lens vs Platform](/lens/compare/)** — when to use Lens alone, when to add Platform

---

## For enterprise teams

AegisGate Lens is the consumer-facing layer. The same team builds [AegisGate Platform™](https://aegisgatesecurity.io/?utm_source=lens-enterprise-cta) — the server-side gateway that adds central policy management, team-wide analytics, MCP/A2A/ACP/RESPONSE protection, the Trust Framework, MITRE ATLAS enforcement, OWASP LLM Top-10, the EU AI Act Compliance Module, and SIEM export. The two products share the detection corpus.

| Use case | Recommendation |
|----------|----------------|
| Individual developers, security researchers, journalists, privacy-conscious users | **Lens alone** (free) |
| Teams of 2-10 who need a shared detection policy | **Lens + Platform Starter** ($29/mo) |
| Enterprises needing SIEM, compliance modules, central policy | **Platform Professional or Enterprise** (custom) |

See [pricing](https://aegisgatesecurity.io/pricing/?utm_source=lens-enterprise-cta) for details.

---

**Built with privacy by the [AegisGate Security](https://aegisgatesecurity.io) team.** Report vulnerabilities to `security@aegisgatesecurity.io` (see [`.well-known/security.txt`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/.well-known/security.txt) for the disclosure policy per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)).
