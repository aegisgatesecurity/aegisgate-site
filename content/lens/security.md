---
title: "AegisGate Lens — Security Model"
description: "Content Security Policy, Ed25519-signed commits, Apache 2.0, vulnerability disclosure policy per RFC 9116. ML detection withdrawn 2026-11-23."
type: "docs"
weight: 3
---

<div style="border:2px solid #b45309;background:#fffbeb;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>


<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.6.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI</li>
<li><strong>4 detection facets</strong>: PII (55), secrets (41), XSS (12), compliance (43) — the ML adversarial facet was withdrawn 2026-11-23</li>
<li><strong>Automated tests</strong>: Node test suite; ML perf/stress tests removed with the model 2026-11-23</li>
<li><strong>Deterministic detection only</strong> — ML adversarial detection withdrawn 2026-11-23</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies, zero WASM binaries</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Security Model

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the security model of v0.6.0.

## Threat Model

Lens protects against:

1. **User accidentally exposing PII** in an AI prompt
2. **User accidentally exposing secrets** (API keys, tokens) in an AI prompt
3. **User being targeted by prompt-injection attacks** (XSS payloads embedded in pasted content, instructions to ignore prior context)
4. **User sharing compliance-relevant data** (GDPR keywords, HIPAA keywords, PCI keywords)
5. **Adversarial prompt injections** — instruction override, roleplay injection, obfuscated commands (deterministic regex/ATLAS detection; ML withdrawn 2026-11-23)

Lens does **not** protect against:

- Compromise of the user's browser itself
- Compromise of the AI provider's servers
- Compromise of the user's local network
- Phishing or social engineering

For these threats, see [OWASP Top 10](https://owasp.org/www-project-top-10/) and [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework).

## Ed25519 Commit Signing

All commits to the AegisGate Lens repository are signed with Ed25519 SSH keys (per [GitHub's signing docs](https://docs.github.com/en/authentication/managing-commit-signature-verification)). This means:

- Every commit has a verified signature
- The signature is tied to a specific AegisGate maintainer
- You can verify who made every change
- An attacker who compromises a contributor's account cannot impersonate them (they don't have the Ed25519 private key)

To verify a commit locally:

```bash
git log --show-signature
```

## Browser Store Distribution

The extension `.zip` is distributed via the Chrome Web Store and Firefox Add-ons (AMO). Both browsers verify the package on install and provide automatic updates. The `.zip` is built from the `main` branch.

## Content Security Policy (CSP)

Lens implements a strict CSP via the MV3 manifest:

- No inline scripts
- No remote code loading
- No `eval()` or `new Function()`
- No `wasm-unsafe-eval` (removed in v0.3.0)
- No third-party CDNs at runtime
- All JavaScript is bundled in the extension package
- All CSS is bundled in the extension package (no external stylesheets)

The CSP is enforced by Chrome at the extension level. The extension cannot load external resources even if the page tries to make it do so.

## ML Security — WITHDRAWN 2026-11-23

The on-device ML threat detector (v0.3.0+) was **withdrawn on 2026-11-23** after its training corpus failed an independent label audit (~71% of attack-labeled items flipped to benign). The model weights are no longer shipped, the ML code path is hard-disabled, and all ML performance figures are void. Lens runs deterministic regex/ATLAS detection only. See the [changelog](/changelog/) and `docs/ML-WITHDRAWN.md` in the lens repo.

Retained for historical context: the model was a Char CNN-BiLSTM with Attention (1.6M parameters, float16 JSON, pure-JS inference, lazy-loaded). It never sent data to any server, did not learn from user input, and was bundled at build time. None of these properties are currently operative because the model no longer exists in the product.

## Storage Hygiene

- All Lens storage is local (`chrome.storage.local` + `chrome.storage.session`)
- No cookies set by Lens
- No IndexedDB entries for tracking
- The 12 non-negotiables (see [Privacy Policy](/lens/privacy/)) are enforced in code
- The opt-in storage key (`STORAGE_KEYS.OPT_IN`) is the same canonical key used by welcome.js, popup.js, and background.js

## Schema Validation

All detection events are validated against a schema before any processing:

- Required fields: `lens_event_version`, `timestamp`, `domain_hash`, `category`, `severity`, `confidence`, `value`, etc.
- Prohibited fields: `text`, `url`, `prompt`, `page_content` (per the privacy policy)
- The schema is in `src/privacy/schema.js` and is the single source of truth

If an event fails validation, it is dropped. No data is leaked.

## Input Validation

- All inputs (prompts, bundle sizes, header lengths) are bounded
- Detection has a 100ms timeout for regex (the former 500ms ML inference timeout was removed with the model 2026-11-23)
- The dispatcher enforces a maximum of 20 matches per event
- The popup is rate-limited (no rapid-fire opt-in toggles)

## Supply Chain

- All dependencies are pinned to specific versions
- The build process is reproducible (same input → same output)
- Releases are signed (Ed25519 commit signing) and verifiable on GitHub
- The source is auditable (Apache 2.0, on GitHub)
- **No npm dependencies** (the extension has zero third-party JS)
- **No WASM binaries** and **no onnxruntime** (ML withdrawn 2026-11-23)

## Vulnerability Disclosure (RFC 9116)

We follow [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) for vulnerability disclosure. The policy is published at:

- `https://aegisgatesecurity.io/.well-known/security.txt`
- `https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md`

**Contact**: `security@aegisgatesecurity.io`

**Response SLA**:

- Acknowledge: within 48 hours
- Triage: within 7 days
- Fix critical (CVSS ≥ 9.0): within 7 days
- Fix high (CVSS 7.0-8.9): within 30 days
- Fix medium (CVSS 4.0-6.9): within 90 days
- Fix low (CVSS < 4.0): in the next regular release

We will coordinate disclosure with the reporter. We do not pursue legal action against security researchers acting in good faith.

## See Also

- [Privacy Policy](/lens/privacy/) — what we collect, what we don't
- [Architecture](/lens/architecture/) — how the 5-facet detection system works
- [ML Model Card](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.6.0/docs/MODEL-CARD.md) — **withdrawn 2026-11-23**; historical record only, all metrics void
- [Lens SECURITY.md on GitHub](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.6.0/docs/SECURITY.md)

Report vulnerabilities to `security@aegisgatesecurity.io` (see [`SECURITY.md`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md)).