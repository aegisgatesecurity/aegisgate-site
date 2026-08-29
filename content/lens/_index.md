---
title: "AegisGate Lens — Free Privacy-First Browser Protection for AI Tools"
description: "Free browser extension (Chrome and Firefox) that detects PII, secrets, XSS, compliance risks, and adversarial prompt injections before you send to 10 AI chat tools. 100% on-device, zero data collection."
type: "landing"
---

<!-- ============================================================
     TOP SECTION: FOR EVERYONE
     Plain language. No jargon. Install buttons.
     ============================================================ -->

> **🆕 AegisGate Lens v0.3.2 is LIVE** — Now with AI-powered injection detection. [Install on the Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) (free, forever) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/aegisgate-lens/).

<div class="alert alert-success alert-center">
<strong>🛡️ AegisGate Lens</strong> is <strong>free and stays free</strong> for individual use. No account required. No prompt text ever sent to any server.
<br><br>
<a href="https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip" class="btn btn-primary" style="margin-right:12px">Install for Chrome →</a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/aegisgate-lens/" class="btn btn-primary">Install for Firefox →</a>
</div>

---

## What is Lens?

AegisGate Lens is a **free browser extension** that watches what you type into AI chat websites — ChatGPT, Claude, Gemini, Copilot, and 6 others. If you're about to accidentally send something sensitive, it warns you **before** you click send.

Think of it like a spellchecker for privacy — but instead of catching typos, it catches your Social Security number, credit card number, passwords, API keys, and other things you really don't want going to an AI company.

---

## Why do I need it?

Every time you paste something into ChatGPT or Claude, that text goes to a server you don't control. Once it's there, you can't unsend it.

**You might be leaking data without realizing it.** People accidentally paste:
- Their credit card number when asking an AI to "format this text"
- An email containing patient data when asking an AI to "summarize this"
- A database password when asking an AI to "debug this query"
- A contract with confidential terms when asking an AI to "review this"

Lens catches these **before they leave your browser** and gives you a chance to remove the sensitive data.

---

## What does it catch?

| Risk | Examples |
|------|----------|
| **Personal info (PII)** | Social Security numbers, credit card numbers, email addresses, phone numbers, passport numbers, bank routing numbers |
| **Passwords & secrets** | API keys (AWS, GitHub, OpenAI, Stripe), passwords, SSH private keys, OAuth tokens, database credentials |
| **Attack attempts** | Prompt injection — someone trying to trick the AI into ignoring its safety rules, leaking system instructions, or executing unauthorized actions |
| **Compliance violations** | Text that violates HIPAA, GDPR, PCI-DSS, EU AI Act, or other regulatory frameworks |
| **Malicious code** | XSS payloads — hidden `<script>` tags, event handlers, encoded attack vectors |

---

## How does it work?

1. **You type a prompt** into ChatGPT, Claude, or any of the 10 supported AI chat tools
2. **Lens checks it locally** in your browser — nothing is sent anywhere, ever
3. **If it finds something sensitive**, a banner appears at the top of the page telling you what was found and why it matters
4. **You choose**: Cancel (don't send), Edit & Resend (you remove the sensitive parts yourself), or Send Anyway (it's your data)
5. **That's it.** No account, no signup, no settings to configure. It just works.

---

## Is it really private?

**Yes. Completely.** Here's what Lens does and doesn't do:

| ✅ Lens DOES | ❌ Lens does NOT |
|---|---|
| Check your text **in your browser** | Send your prompt text to any server |
| Warn you before you send sensitive data | Store your prompts or keystrokes |
| Work without an account | Track you across websites |
| Run 100% on your device | Collect analytics or telemetry |
| Respect your choice (send anyway is always an option) | Phone home with your data |
| Stay free, forever | Have a "Pro" tier or upsell |

Lens is 100% open source (Apache 2.0). You can read every line of code at [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens).

---

## Install Lens

**It takes 10 seconds. No account needed.**

| Browser | Link |
|---------|------|
| **Google Chrome** | [Install from Chrome Web Store →](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) |
| **Mozilla Firefox** | [Install from Firefox Add-ons →](https://addons.mozilla.org/en-US/firefox/addon/aegisgate-lens/) |

**Supported AI tools (10):** ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI

---

## What happens when Lens detects something?

When you're about to send sensitive data, Lens shows a warning banner at the top of the page. It looks like this:

> ⚠️ **AegisGate Lens detected potential risks in your prompt:**
>
> - 🔐 **Credit Card Number** — A 16-digit card number was detected. Sending this to an AI service may expose your financial data.
>
> **What would you like to do?**
> - **Cancel** — Don't send this prompt
> - **Edit & Resend** — Go back and remove the sensitive data yourself
> - **Send Anyway** — I understand the risks, send it

The banner is **non-blocking** — it doesn't prevent you from sending. It just makes sure you know what you're about to share. You're always in control.

---

<!-- ============================================================
     BOTTOM SECTION: FOR THE CURIOUS / TECHNICAL DETAILS
     Everything a developer or security engineer wants.
     ============================================================
-->

---

## For the Curious: Technical Details

The content below is for developers, security engineers, and anyone who wants to understand how Lens works under the hood.

<details>
<summary><strong>📖 Canonical facts (v0.3.2)</strong></summary>

Source: [aegisgate-lens repo](https://github.com/aegisgatesecurity/aegisgate-lens)

- **10 AI providers**: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI
- **5 detection facets**: PII (55 patterns), secrets (41), XSS (12), compliance (43), ML adversarial (1 model) — 151 regex patterns + Char CNN-BiLSTM
- **504 automated tests**: 492/492 Node + 12/12 ML perf/stress
- **100% adversarial detection** (10/10 prompt injection patterns caught by ML model)
- **2.31% regex FPR** on 6,500 WildChat prompts; **81.8% ML benign pass-through**
- **~5ms ML detection** in Chrome (pure JavaScript, no WASM, no onnxruntime)
- **100% on-device**, zero network egress by default
- **12 privacy non-negotiables**, Apache 2.0, zero external dependencies
- **Free, forever**

</details>

<details>
<summary><strong>🧠 How the 5-facet detection engine works</strong></summary>

Lens injects a content script into the 10 supported AI providers. As you type a prompt, the content script:

1. **Detects** with 4 regex facets (synchronous, ~0.3ms):
   - **PII**: SSN, email, phone, credit card (Luhn-validated), DOB, address, driver's license, passport, tax ID, bank account, IP address (55 patterns)
   - **Secrets**: API keys (AWS, GitHub, OpenAI, Stripe, Slack), RSA private keys, OAuth tokens, database credentials (41 patterns)
   - **XSS**: `<script>` tags, event handlers, `javascript:` URLs, SVG-based XSS, DOM clobbering, polyglot payloads (12 patterns)
   - **Compliance**: 43 patterns including OWASP LLM Top 10, MITRE ATLAS, EU AI Act, NIST CSF, ISO 27001, CCPA, LGPD, PIPEDA, POPIA
2. **Enriches** with on-device ML (asynchronous, ~5ms):
   - **ML adversarial**: Char CNN-BiLSTM with Attention detects prompt injection attacks — instruction override ("ignore all previous instructions"), roleplay injection, obfuscated commands, and other adversarial patterns that structured regex can't catch. Pure JavaScript, no WASM, no remote inference.
3. **Warns** via a non-blocking banner at the top of the page that explains what was detected, why it matters, and what to do about it (3 options: Cancel, Edit & Resend, Send Anyway).
4. **Never sends** your prompt to any server — not even opt-in. The only data Lens may send is anonymous, hashed metadata (detection category, no text) when you explicitly opt in to help improve detection.
5. **Stores nothing** by default. No keystroke logging, no prompt caching, no history.

See the [architecture overview](/lens/architecture/) for details on the 5-facet detection system.

</details>

<details>
<summary><strong>🔒 The 12 Privacy Non-Negotiables</strong></summary>

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
- Documented in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.2/docs/SECURITY.md)
- Disclosed in the release notes
- Announced via the [Lens GitHub Issues](https://github.com/aegisgatesecurity/aegisgate-lens/issues)

</details>

<details>
<summary><strong>🧪 What's new in v0.3.2</strong></summary>

- **🧠 ML threat detector** — Char CNN-BiLSTM with Attention catches adversarial prompt injections that regex can't. Pure JavaScript inference (~5ms in Chrome). No WASM, no onnxruntime, no remote server. Lazy-loaded on first detection.
- **🔍 DeepSeek + Meta AI** — two new AI provider integrations (10 total).
- **📦 6× smaller** — extension reduced from 25MB (WASM) to 4.2MB (pure JS). Stricter CSP: `script-src 'self'` only.
- **🧪 504 tests** — 492 unit + 12 ML performance/stress tests.

</details>

---

## Resources

- 📜 **[Privacy Policy](/lens/privacy/)** — the full text of what Lens does and doesn't collect
- 🏗️ **[Architecture](/lens/architecture/)** — how the 5-facet detection system works
- 🔒 **[Security Model](/lens/security/)** — content security policy, ML security, vulnerability disclosure
- 📋 **[Changelog](/lens/changelog/)** — what changed in each version
- ⚖️ **[Lens vs Platform](/lens/compare/)** — when to use Lens alone, when to add Platform

---

## For enterprise teams

AegisGate Lens is the consumer-facing layer. The same team builds [AegisGate Platform](/platform/) — the server-side gateway that adds central policy management, team-wide analytics, MCP/A2A/ACP/RESPONSE protection, the Trust Framework, MITRE ATLAS enforcement, OWASP LLM Top-10, the EU AI Act Compliance Module, and SIEM export. The two products share the detection corpus.

| Use case | Recommendation |
|----------|----------------|
| Individual developers, security researchers, journalists, privacy-conscious users | **Lens alone** (free) |
| Teams of 2-10 who need a shared detection policy | **Lens + Platform Developer** ($79/mo) |
| Enterprises needing SIEM, compliance modules, central policy | **Platform Professional or Enterprise** (custom) |

See [pricing](/pricing/) for details.

---

**Built with privacy by the [AegisGate Security](/) team.** Report vulnerabilities to `security@aegisgatesecurity.io` (see [`SECURITY.md`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md) for the disclosure policy per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)).