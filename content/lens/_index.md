---
title: "AegisGate Lens — Free Privacy-First Browser Protection for AI Tools"
description: "Free, privacy-first Chrome extension that protects users across 10 AI providers with 5-facet detection (PII, secrets, XSS, compliance, adversarial ML). 504 automated tests. 151 regex patterns + 1 ML model. Zero external dependencies. No account required."
type: "landing"
---
> **🆕 AegisGate Lens v0.3.0 is LIVE** — ML threat detection, DeepSeek & Meta AI support, 6× smaller extension, stricter CSP. [Install on the Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) (free, forever, 10 AI providers).

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.0/ -->
<!-- If you change any number below, update FACTS.md FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.3.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, <strong>DeepSeek</strong>, <strong>Meta AI</strong></li>
<li><strong>5 detection facets</strong>: PII (55), secrets (41), XSS (12), compliance (43), <strong>ML adversarial (1 model)</strong> — 151 regex patterns + Char CNN-BiLSTM</li>
<li><strong>504 automated tests</strong>: 492/492 Node + 12/12 ML perf/stress</li>
<li><strong>100% adversarial detection</strong> (10/10 prompt injection patterns caught by ML model)</li>
<li><strong>2.31% regex FPR</strong> on 6,500 WildChat prompts; <strong>81.8% ML benign pass-through</strong></li>
<li><strong>~5ms ML detection</strong> in Chrome (pure JavaScript, no WASM, no onnxruntime)</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


<div class="alert alert-success alert-center">
<strong>🛡️ AegisGate Lens</strong> is <strong>free and stays free</strong> for individual use. No account required. No prompt text ever sent to any server. <a href="https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip" class="btn btn-primary" style="margin-left:12px">Install from Chrome Web Store →</a>
</div>

## 🛡️ AegisGate Lens — Privacy-First Browser Protection for AI Tools

AegisGate Lens is a free Chrome extension that detects PII (SSN, email, phone, credit card), secrets (API keys, tokens, private keys), XSS payloads, compliance violations (OWASP LLM Top 10, MITRE ATLAS, EU AI Act), and **adversarial prompt injections** (instruction override, roleplay injection, obfuscated commands) in real time as you type into ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, and Meta AI. All processing happens **locally in your browser** — no account, no telemetry, no data exfiltration.

The same security team behind [AegisGate Platform™](https://aegisgatesecurity.io/?utm_source=lens-homepage) (the enterprise gateway) builds Lens as the consumer-facing layer. The two products share the same detection corpus, the same MITRE ATLAS mapping, and the same privacy commitments. See [Lens vs Platform](/lens/compare/) for the side-by-side comparison.

---

## What's new in v0.3.0

- **🧠 ML threat detector** — Char CNN-BiLSTM with Attention catches adversarial prompt injections that regex can't. Pure JavaScript inference (~5ms in Chrome). No WASM, no onnxruntime, no remote server. Lazy-loaded on first detection.
- **🔍 DeepSeek + Meta AI** — two new AI provider integrations (10 total).
- **📦 6× smaller** — extension reduced from 25MB (WASM) to 4.2MB (pure JS). Stricter CSP: `script-src 'self'` only.
- **🧪 504 tests** — 492 unit + 12 ML performance/stress tests.

---

## Why Lens?

- **🔒 Privacy by design**: 12 non-negotiables. No prompt text, no URLs, no page content, no account, no personal identifiers, no fingerprinting. All detection happens in your browser.
- **🎯 5-facet detection**: PII (55 patterns), secrets (41), XSS (12), compliance (43), ML adversarial (1 Char CNN-BiLSTM model) — 151 regex patterns + on-device ML.
- **⚡ Real-time**: Regex detection in ~0.3ms, ML enrichment in ~5ms. No network round-trips — 100% on-device.
- **🌐 10 AI providers**: ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI. No special setup per provider.
- **🧠 ML defense-in-depth**: Regex catches structured patterns (SSN, API keys). ML catches semantic attacks (instruction override, roleplay injection, obfuscated commands). Two layers, zero shared false positives.
- **🔓 Free, forever**: No "Pro" tier, no feature gate, no credit card. Lens is the consumer-facing product; Platform is the optional enterprise gateway.

---

## How it works

Lens injects a content script into the 10 supported AI providers. As you type a prompt, the content script:

1. **Detects** with 4 regex facets (synchronous, ~0.3ms):
   - **PII**: SSN, email, phone, credit card (Luhn-validated), DOB, address, driver's license, passport, tax ID, bank account, IP address (55 patterns)
   - **Secrets**: API keys (AWS, GitHub, OpenAI, Stripe, Slack), RSA private keys, OAuth tokens, database credentials (41 patterns)
   - **XSS**: `&lt;script&gt;` tags, event handlers, `javascript:` URLs, SVG-based XSS, DOM clobbering, polyglot payloads (12 patterns)
   - **Compliance**: 43 patterns including OWASP LLM Top 10, MITRE ATLAS, EU AI Act, NIST CSF, ISO 27001, CCPA, LGPD, PIPEDA, POPIA
2. **Enriches** with on-device ML (asynchronous, ~5ms):
   - **ML adversarial**: Char CNN-BiLSTM with Attention detects prompt injection attacks — instruction override ("ignore all previous instructions"), roleplay injection, obfuscated commands, and other adversarial patterns that structured regex can't catch. Pure JavaScript, no WASM, no remote inference.
3. **Warns** via a non-blocking banner at the top of the page that explains what was detected, why it matters, and what to do about it (3 options: Cancel, Edit & Redact, Send Anyway).
4. **Never sends** your prompt to any server — not even opt-in. The only data Lens may send is anonymous, hashed metadata (detection category, no text) when you explicitly opt in to help improve detection.
5. **Stores nothing** by default. No keystroke logging, no prompt caching, no history.

See the [architecture overview](/lens/architecture/) for details on the 5-facet detection system.

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
- Documented in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.0/docs/SECURITY.md)
- Disclosed in the release notes
- Announced via the [Lens GitHub Issues](https://github.com/aegisgatesecurity/aegisgate-lens/issues)

---

## Try it

- 🛡️ **[Install from Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip)** — one click, no account
- 🐙 **[Lens on GitHub](https://github.com/aegisgatesecurity/aegisgate-lens)** — Apache 2.0, 504 tests, zero external dependencies
- 📜 **[Privacy Policy](/lens/privacy/)** — the full text of what Lens does and doesn't collect
- 🏗️ **[Architecture](/lens/architecture/)** — how the 5-facet detection system works
- 🔒 **[Security Model](/lens/security/)** — content security policy, ML security, vulnerability disclosure
- 📋 **[Changelog](/lens/changelog/)** — what changed in each version
- ⚖️ **[Lens vs Platform](/lens/compare/)** — when to use Lens alone, when to add Platform

---

## For enterprise teams

AegisGate Lens is the consumer-facing layer. The same team builds [AegisGate Platform™](https://aegisgatesecurity.io/?utm_source=lens-enterprise-cta) — the server-side gateway that adds central policy management, team-wide analytics, MCP/A2A/ACP/RESPONSE protection, the Trust Framework, MITRE ATLAS enforcement, OWASP LLM Top-10, the EU AI Act Compliance Module, and SIEM export. The two products share the detection corpus.

| Use case | Recommendation |
|----------|----------------|
| Individual developers, security researchers, journalists, privacy-conscious users | **Lens alone** (free) |
| Teams of 2-10 who need a shared detection policy | **Lens + Platform Developer** ($79/mo) |
| Enterprises needing SIEM, compliance modules, central policy | **Platform Professional or Enterprise** (custom) |

See [pricing](https://aegisgatesecurity.io/pricing/?utm_source=lens-enterprise-cta) for details.

---

**Built with privacy by the [AegisGate Security](https://aegisgatesecurity.io) team.** Report vulnerabilities to `security@aegisgatesecurity.io` (see [`SECURITY.md`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md) for the disclosure policy per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)).