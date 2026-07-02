---
title: "AegisGate Lens — Free Privacy-First Browser Protection for AI Tools"
description: "Free, privacy-first Chrome extension that protects users across 6 AI providers (ChatGPT, Claude, Gemini, Copilot, duck.ai, Perplexity) with 6-facet detection. 233/233 tests, zero external dependencies. No account required."
type: "landing"
---

<div class="alert alert-success alert-center">
<strong>🛡️ AegisGate Lens</strong> is <strong>free and stays free</strong> for individual use. No account required. No prompt text ever sent to any server. <a href="https://chromewebstore.google.com/category/extensions/ai" class="btn btn-primary" style="margin-left:12px">Install from Chrome Web Store →</a>
</div>

## 🛡️ AegisGate Lens — Privacy-First Browser Protection for AI Tools

AegisGate Lens is a free Chrome extension that detects PII, secrets, prompt-injection, XSS, toxicity, and compliance violations in real time as you type into ChatGPT, Claude, Gemini, Microsoft Copilot, duck.ai, and Perplexity. All processing happens **locally in your browser** by default — no account, no telemetry, no data exfiltration.

The same security team behind [AegisGate Platform™](https://aegisgatesecurity.io/?utm_source=lens-homepage) (the enterprise gateway) builds Lens as the consumer-facing layer. The two products share the same detection corpus, the same MITRE ATLAS mapping, and the same privacy commitments. See [Lens vs Platform](/lens/compare/) for the side-by-side comparison.

---

## Why Lens?

- **🔒 Privacy by design**: 12 non-negotiables. No prompt text, no URLs, no page content, no account, no personal identifiers, no fingerprinting. All detection happens in your browser.
- **🎯 6-facet detection**: PII (email, phone, SSN, credit card), secrets (API keys, tokens, private keys), XSS payloads, prompt-injection attacks, toxicity, and compliance keywords — all in one extension.
- **⚡ Real-time**: 233/233 tests. Detection latency under 100ms. No network round-trips for the default detection path.
- **🌐 6 AI providers**: ChatGPT, Claude, Gemini, Microsoft Copilot, duck.ai, Perplexity. No special setup per provider.
- **🧠 ModernBERT-base ML**: 149M parameters, 8K context window with sliding window inference. Ed25519-signed bundles, SLSA L2 provenance.
- **🔓 Free, forever**: No "Pro" tier, no feature gate, no credit card. Lens is the consumer-facing product; Platform is the optional enterprise gateway.

---

## How it works

Lens injects a content script into the 6 supported AI providers. As you type a prompt, the content script:

1. **Detects** with 6 facets: regex patterns (fast, synchronous), heuristic checks (URLs, emails, credit cards), and the optional ModernBERT ML model (async, more accurate).
2. **Warns** via a non-blocking banner that explains what was detected, why it matters, and what to do about it.
3. **Never sends** your prompt to any server — not even opt-in. The only data Lens may send is anonymous Tier-1 metadata (detection category, pattern ID, no text) when you explicitly opt in to help improve detection.
4. **Stores nothing** by default. No keystroke logging, no prompt caching, no history.

See the [architecture overview](/lens/architecture/) for details on the 6-facet detection system and the ModernBERT model.

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
- Documented in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md)
- Disclosed in the release notes
- Announced via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/discussions)

---

## Try it

- 🛡️ **[Install from Chrome Web Store](https://chromewebstore.google.com/category/extensions/ai)** — one click, no account
- 🐙 **[Lens on GitHub](https://github.com/aegisgatesecurity/aegisgate-lens)** — Apache 2.0, 233/233 tests, zero external dependencies
- 📜 **[Privacy Policy](/lens/privacy/)** — the full text of what Lens does and doesn't collect
- 🏗️ **[Architecture](/lens/architecture/)** — how the 6-facet detection system works
- 🔒 **[Security Model](/lens/security/)** — bundle signing, SLSA L2 provenance, vulnerability disclosure
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

**Built with privacy by the [AegisGate Security](https://aegisgatesecurity.io) team.** Report vulnerabilities to `security@aegisgatesecurity.io` (see [`.well-known/security.txt`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/.well-known/security.txt) for the disclosure policy per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)).
