---
title: "AegisGate Lens — Privacy Policy"
description: "Full privacy policy for AegisGate Lens. What we collect, what we don't collect, and how to verify it. Includes ML detection disclosure for v0.3.0."
type: "docs"
weight: 1
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.3.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI</li>
<li><strong>5 detection facets</strong>: PII (55), secrets (41), XSS (12), compliance (43), ML adversarial (1 model)</li>
<li><strong>504 automated tests</strong>: 492/492 Node + 12/12 ML perf/stress</li>
<li><strong>100% adversarial detection</strong> (10/10 prompt injection patterns caught by ML model)</li>
<li><strong>100% on-device</strong>, zero network egress by default, ML inference included</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Privacy Policy

**Last updated**: 2026-08-05
**Applies to**: AegisGate Lens v0.3.0 and later
**Source of truth**: [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens)

---

## TL;DR

AegisGate Lens is a privacy-first browser extension. By default, it sends **nothing** to any server. All detection — including ML inference — happens locally in your browser. The only data Lens may ever send is anonymous, hashed metadata (detection category, no text) when you explicitly opt in to help improve detection by reporting false positives.

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
- Documented in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.0/docs/SECURITY.md)
- Disclosed in the release notes
- Announced via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- Reversible (the change is in the source code, which you can fork)

---

## ML Detection Disclosure (v0.3.0)

Starting in v0.3.0, the Lens includes an on-device ML threat detector (Char CNN-BiLSTM with Attention, 1.58M parameters). This section discloses how the ML model handles user data:

- **The ML model runs entirely on-device.** No prompt content, no ML inference scores, and no model outputs are sent to any server.
- **The model weights are bundled in the extension package** (3.7MB float16 JSON). They are not downloaded at runtime and cannot be updated remotely.
- **The model processes at most 128 characters** of the prompt (lowercase ASCII, truncated). Non-ASCII characters are mapped to an UNK token. The processing is a fixed forward pass — no learning, no fine-tuning, no gradient computation.
- **The model outputs a single score between 0 and 1** (threat probability). This score is used locally to determine whether to show the detection banner. The score is never sent to any server unless the user explicitly opts in to threat-intel reporting, in which case only the detection category (not the score, not the prompt text) is included.
- **The model is lazy-loaded.** The 3.7MB weight file is not fetched until the first `classify()` call. If the user never types a prompt, the model is never loaded.
- **The model is not a content moderator.** It detects adversarial prompt injection patterns (instruction override, roleplay injection, obfuscated commands). It does not detect political content, controversial topics, or the substance of what the user is asking the AI to do.
- **The model does not learn from user input.** It is a fixed, pre-trained model. There is no feedback loop, no reinforcement learning, no online training, no data collection for training purposes.

---

## What Lens does by default

By default (Tier 0: Detect-only), Lens:

1. **Detects** PII, secrets, XSS payloads, compliance keywords, and adversarial prompt injections in real time as you type into 10 AI providers (ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI).
2. **Warns** via a non-blocking banner that appears at the top of the page when a detection fires.
3. **Stores nothing** — no detection history, no keystroke log, no prompt cache.

All of this happens in your browser. No network request is made. ML inference runs in JavaScript — no WASM, no onnxruntime, no remote inference.

---

## What Lens does when you opt in to false-positive reporting

The only opt-in path in v0.3.0 is **false-positive reporting**: when you click "Submit & Dismiss" on a detection banner. If you opt in (a single click, per-banner), Lens may send:

- ✅ Detection category (e.g., "pii_email", "secret_api_key", "ml_adversarial_prompt")
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
4. **ML model**: the model weights are in `models/threat_cnn_bilstm_weights.bin.json` (3.7MB, float16 JSON). You can inspect the forward-pass code in `src/detectors/ml/threat-detector-js.js` (488 lines, pure JavaScript, no obfuscation).
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
- ❌ Model weight downloads (weights are bundled, not fetched at runtime)

---

## Children's privacy

AegisGate Lens is not intended for children under 13 (or the applicable age of digital consent in your country). We do not knowingly collect any data from children. If you believe a child has used Lens and we have inadvertently collected data, please contact `privacy@aegisgatesecurity.io` and we will delete the data immediately.

---

## Changes to this policy

This policy may be updated as Lens evolves. The current version is always at this URL. We will:
- Update the "Last updated" date
- Add an entry to the [Lens CHANGELOG](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.0/CHANGELOG.md) for material changes
- Announce material changes via the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)

---

## Contact

- **Privacy questions**: `privacy@aegisgatesecurity.io`
- **Security disclosures**: `security@aegisgatesecurity.io` (see [`SECURITY.md`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md) per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116))
- **General questions**: the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- **PGP key**: see [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.0/docs/SECURITY.md)

---

**License**: This privacy policy is released under [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/). You may share and adapt it for your own privacy-respecting products. AegisGate Security requests but does not require attribution.