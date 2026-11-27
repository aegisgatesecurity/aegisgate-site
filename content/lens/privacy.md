---
title: "AegisGate Lens — Privacy Policy"
description: "Full privacy policy for AegisGate Lens. What we collect, what we don't collect, and how to verify it. ML detection was withdrawn 2026-11-23."
type: "docs"
weight: 1
---

<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>


<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.6.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI</li>
<li><strong>4 detection facets</strong>: PII (55), secrets (41), XSS (12), compliance (43) — ML adversarial facet withdrawn 2026-11-23</li>
<li><strong>Automated tests</strong>: Node test suite (ML perf/stress tests removed with the model 2026-11-23)</li>
<li><strong>ML detection withdrawn 2026-11-23</strong> — deterministic regex/ATLAS detection only</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Privacy Policy

**Last updated**: 2026-08-16
**Applies to**: AegisGate Lens v0.6.0 and later
**Source of truth**: [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens)

---

## TL;DR

AegisGate Lens is a privacy-first browser extension. By default, it sends **nothing** to any server. All detection happens locally in your browser. The only data Lens may ever send is anonymous, hashed metadata (detection category, no text) when you explicitly opt in to help improve detection by reporting false positives.

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
- Documented in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.6.0/docs/SECURITY.md)
- Disclosed in the release notes
- Announced via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- Reversible (the change is in the source code, which you can fork)

---

## ML Detection Disclosure — WITHDRAWN 2026-11-23

The on-device ML threat detector (v0.3.0+) was **withdrawn on 2026-11-23** after its training corpus failed an independent label audit (~71% of attack-labeled items flipped to benign). The model weights are no longer shipped, the ML code path is hard-disabled, and all ML metrics are void. No ML inference occurs. Lens runs deterministic regex/ATLAS detection only.

Historically (v0.3.0–withdrawal), the ML model ran entirely on-device: no prompt content, inference scores, or outputs were ever sent to any server; weights were bundled, not downloaded; and the model did not learn from user input. **No ML data practices remain in effect because the model no longer exists in the product.** See the [changelog](/changelog/).

---

## What Lens does by default

By default (Tier 0: Detect-only), Lens:

1. **Detects** PII, secrets, XSS payloads, compliance keywords, and adversarial prompt injections in real time as you type into 10 AI providers (ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI).
2. **Warns** via a non-blocking banner that appears at the top of the page when a detection fires.
3. **Stores nothing** — no detection history, no keystroke log, no prompt cache.

All of this happens in your browser. No network request is made. Detection runs locally — no WASM, no onnxruntime, no remote inference.

---

## What Lens does when you opt in to false-positive reporting

The only opt-in path in v0.3.0 is **false-positive reporting**: when you click "Submit & Dismiss" on a detection banner. If you opt in (a single click, per-banner), Lens may send:

- ✅ Detection category (e.g., "pii_email", "secret_api_key", "xss_script")
- ✅ Pattern ID (e.g., "credit_card_visa_v1")
- ✅ Domain hash (SHA-256 prefix of the AI provider hostname, 16 hex chars, k-anonymous)
- ❌ No prompt text
- ❌ No URLs
- ❌ No page content
- ❌ No personal identifiers
- ❌ No ML inference scores

This is **opt-in per-detection**, not a global opt-in. You can report one false positive while declining the next. The default is to dismiss without reporting (no data sent).

---

## How to verify the privacy policy

You can audit every line of code that handles your data:

1. **Source code**: [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0)
2. **Network requests**: open Chrome DevTools → Network tab → look for any outbound request from the Lens extension. By default, there are none.
3. **Storage**: open Chrome DevTools → Application tab → Storage → Local Storage → look for any Lens entries. By default, there are none (except the opt-in preference).
4. **ML model**: neural ML detection was withdrawn on 2026-11-23. The weights file (`models/threat_cnn_bilstm_weights.bin.json`) is no longer shipped. Lens runs deterministic detection only; the ML code path is hard-disabled. See the [changelog](/changelog) for details.
5. **Test the policy**: install Lens, type a fake prompt with a fake credit card number, and verify:
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
- ❌ ML inference scores
- ❌ Model weight downloads (no model is bundled or fetched — ML withdrawn 2026-11-23)

---

## Children's privacy

AegisGate Lens is not intended for children under 13 (or the applicable age of digital consent in your country). We do not knowingly collect any data from children. If you believe a child has used Lens and we have inadvertently collected data, please contact `privacy@aegisgatesecurity.io` and we will delete the data immediately.

---

## Changes to this policy

This policy may be updated as Lens evolves. The current version is always at this URL. We will:
- Update the "Last updated" date
- Add an entry to the [Lens CHANGELOG](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.6.0/CHANGELOG.md) for material changes
- Announce material changes via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)

---

## Contact

- **Privacy questions**: `privacy@aegisgatesecurity.io`
- **Security disclosures**: `security@aegisgatesecurity.io` (see [`SECURITY.md`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md) per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116))
- **General questions**: the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- **PGP key**: see [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.6.0/docs/SECURITY.md)

---

**License**: This privacy policy is released under [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/). You may share and adapt it for your own privacy-respecting products. AegisGate Security requests but does not require attribution.