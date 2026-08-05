---
title: "AegisGate Lens — Privacy Policy"
description: "Full privacy policy for AegisGate Lens. What we collect, what we don't collect, and how to verify it."
type: "docs"
weight: 1
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.2.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>8 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok</li>
<li><strong>151 regex patterns</strong> across <strong>4 detection facets</strong>: PII (55), secrets (41), XSS (12), compliance (43)</li>
<li><strong>734 automated tests</strong>: 431/431 Node + 146 secrets + 3/3 Go + 16/16 headless smoke + 128/128 mini-smoke (5/5 stable runs)</li>
<li><strong>2.31% FPR</strong> on 6,500 WildChat prompts (5.1x better than v0.1.0-beta baseline)</li>
<li><strong>Sub-millisecond detection</strong> (p50 0.076ms, p95 0.085ms, p99 0.14ms for 500-char prompts)</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Privacy Policy

**Last updated**: 2026-07-29
**Applies to**: AegisGate Lens v0.2.0 and later
**Source of truth**: [github.com/aegisgatesecurity/aegisgate-lens/tree/v0.2.0/src/privacy/](https://github.com/aegisgatesecurity/aegisgate-lens/tree/v0.2.0/src/privacy)

---

## TL;DR

AegisGate Lens is a privacy-first browser extension. By default, it sends **nothing** to any server. All detection happens locally in your browser. The only data Lens may ever send is anonymous, hashed metadata (detection category, pattern ID, no text) when you explicitly opt in to help improve detection by reporting false positives.

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). You can audit every line of code that handles your data.

---

## The 12 Privacy Non-Negotiables

AegisGate Lens **never** sends or stores:

1. ❌ **Prompt text** (input or output to/from any AI provider)
2. ❌ **URLs** (the pages you're visiting, the API endpoints the extension talks to)
3. ❌ **Page content** (the HTML or text on the AI provider's page)
4. ❌ **Personal identifiers** (PII detected in your prompts is rewritten in your browser; the original text never leaves your machine)
5. ❌ **Account credentials** (no account is required; the extension never asks for one)
6. ❌ **Browser fingerprinting** (no canvas fingerprinting, no font enumeration, no hardware profiling)
7. ❌ **Cross-site tracking** (no third-party analytics, no advertising SDKs)
8. ❌ **AI provider metadata** (no information about which AI tools you use is sent to us)
9. ❌ **Keystroke timing** (no key-down/up events captured beyond what the AI provider's own page captures)
10. ❌ **Mouse movement** (no pointer tracking, no scroll depth measurement)
11. ❌ **Session identifiers** (no cookies set by Lens, no localStorage entries for tracking)
12. ❌ **IP addresses** (when self-hosted — only the Gateway server IP if you use the optional opt-in telemetry with Platform)

If we ever change any of these, the change will be:
- Documented in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.2.0/docs/SECURITY.md)
- Disclosed in the release notes
- Announced via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- Reversible (the change is in the source code, which you can fork)

---

## What Lens does by default

By default (Tier 0: Detect-only), Lens:

1. **Detects** PII, secrets, XSS payloads, and compliance keywords in real time as you type into 8 AI providers (ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, Grok).
2. **Warns** via a non-blocking banner that appears below the input field when a detection fires.
3. **Stores nothing** — no detection history, no keystroke log, no prompt cache.

All of this happens in your browser. No network request is made.

---

## What Lens does when you opt in to false-positive reporting

The only opt-in path in v0.2.0 is **false-positive reporting**: when you click "Submit & Dismiss" on a detection banner. If you opt in (a single click, per-banner), Lens may send:

- ✅ Detection category (e.g., "pii_email", "secret_api_key")
- ✅ Pattern ID (e.g., "credit_card_visa_v1")
- ✅ Domain hash (SHA-256 prefix of the AI provider hostname, 16 hex chars, k-anonymous)
- ❌ No prompt text
- ❌ No URLs
- ❌ No page content
- ❌ No personal identifiers

This is **opt-in per-detection**, not a global opt-in. You can report one false positive while declining the next. The default is to dismiss without reporting (no data sent).

### What never gets sent, at any opt-in level

- ❌ Prompt text (input or output)
- ❌ URLs
- ❌ Page content
- ❌ Personal identifiers (after detection redaction)
- ❌ Account credentials
- ❌ Browser fingerprinting
- ❌ AI provider responses

---

## How to verify the privacy policy

You can audit every line of code that handles your data:

1. **Source code**: [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0)
2. **Network requests**: open Chrome DevTools → Network tab → look for any outbound request from the Lens extension. By default, there are none.
3. **Storage**: open Chrome DevTools → Application tab → Storage → Local Storage → look for any Lens entries. By default, there are none.
4. **Test the policy**: install Lens, type a fake prompt with a fake credit card number, and verify:
   - The banner appears in your browser (not on a server)
   - No network request is made
   - The fake credit card is rewritten in the banner (not sent in the clear)

---

## Data we don't collect

This list is exhaustive. If we ever add a new data point, we will:
- Document it here
- Add it to the [Lens source code](https://github.com/aegisgatesecurity/aegisgate-lens) (auditable)
- Add a code comment explaining why
- Add a CHANGELOG entry
- Add a GitHub Discussion announcement

We do not collect:
- ❌ Prompt text
- ❌ AI provider responses
- ❌ URLs
- ❌ Page content
- ❌ Personal identifiers (after detection redaction)
- ❌ Account credentials
- ❌ Browser fingerprinting
- ❌ Cross-site tracking
- ❌ AI provider metadata
- ❌ Keystroke timing
- ❌ Mouse movement
- ❌ Session identifiers
- ❌ IP addresses (when self-hosted)
- ❌ Third-party analytics
- ❌ Cookies
- ❌ LocalStorage entries for tracking
- ❌ IndexedDB entries for tracking
- ❌ Cache entries for tracking

---

## Children's privacy

AegisGate Lens is not intended for children under 13 (or the applicable age of digital consent in your country). We do not knowingly collect any data from children. If you believe a child has used Lens and we have inadvertently collected data, please contact `privacy@aegisgatesecurity.io` and we will delete the data immediately.

---

## Changes to this policy

This policy may be updated as Lens evolves. The current version is always at this URL. We will:
- Update the "Last updated" date
- Add an entry to the [Lens CHANGELOG](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.2.0/CHANGELOG.md) for material changes
- Announce material changes via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)

---

## Contact

- **Privacy questions**: `privacy@aegisgatesecurity.io`
- **Security disclosures**: `security@aegisgatesecurity.io` (see [`.well-known/security.txt`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.2.0/.well-known/security.txt) per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116))
- **General questions**: the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- **PGP key**: see [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.2.0/docs/SECURITY.md)

---

**License**: This privacy policy is released under [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/). You may share and adapt it for your own privacy-respecting products. AegisGate Security requests but does not require attribution.
