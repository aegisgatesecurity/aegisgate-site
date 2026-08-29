---
title: "AegisGate Lens — Security Model"
description: "Content Security Policy, on-device ML inference, Ed25519-signed commits, Apache 2.0, vulnerability disclosure policy per RFC 9116. The v0.3.2 security model."
type: "docs"
weight: 3
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.3.2</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI</li>
<li><strong>5 detection facets</strong>: PII (55), secrets (41), XSS (12), compliance (43), ML adversarial (1 model)</li>
<li><strong>504 automated tests</strong>: 492/492 Node + 12/12 ML perf/stress</li>
<li><strong>100% adversarial detection</strong> (10/10 prompt injection patterns caught by ML model)</li>
<li><strong>100% on-device</strong>, zero network egress by default, ML inference included</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies, zero WASM binaries</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Security Model

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the security model of v0.3.2.

## Threat Model

Lens protects against:

1. **User accidentally exposing PII** in an AI prompt
2. **User accidentally exposing secrets** (API keys, tokens) in an AI prompt
3. **User being targeted by prompt-injection attacks** (XSS payloads embedded in pasted content, instructions to ignore prior context)
4. **User sharing compliance-relevant data** (GDPR keywords, HIPAA keywords, PCI keywords)
5. **Adversarial prompt injections** — instruction override, roleplay injection, obfuscated commands (detected by the ML model)

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

## ML Security (v0.3.0)

Starting in v0.3.0, Lens includes an on-device ML threat detector. This introduces new security considerations:

### Model architecture and inference

- **Architecture**: Char CNN-BiLSTM with Attention (1.58M parameters)
- **Weight format**: float16 JSON (3.7MB, gzip-compressed)
- **Inference**: Pure JavaScript — no WASM, no onnxruntime, no external runtime
- **Loading**: Lazy-loaded on first `classify()` call. Not fetched on page load.
- **Input**: At most 128 lowercase ASCII characters. Non-ASCII mapped to UNK token.
- **Output**: Single float between 0 and 1 (threat probability). Used locally only.

### Attack surfaces and mitigations

1. **Model extraction**: The model weights are bundled in the extension package. A sophisticated attacker could extract them from the ZIP. This is acceptable because (a) the model is a binary classifier with limited adversarial value, and (b) the model does not learn from user input — it is a fixed, pre-trained model.

2. **Adversarial evasion**: An attacker who knows the model architecture could craft inputs that evade ML detection. This is mitigated by the dual detection system (regex + ML) — evading both requires different techniques. The regex layer catches structured patterns; the ML layer catches semantic attacks.

3. **Model poisoning**: Not applicable — the model is bundled at build time and cannot be updated remotely. There is no model update mechanism, no over-the-air update, and no remote model download.

4. **Side-channel timing**: ML inference takes a measurable amount of time (~5ms in Chrome). A malicious page script could potentially infer whether ML detection triggered by measuring timing. This is acceptable because the banner is already visible to the user — there is no secret to protect from timing.

### What the ML model does NOT do

- Does not send prompts or inference data to any server
- Does not learn from user input (no feedback loop, no online training)
- Does not improve over time (fixed pre-trained model)
- Does not download updates at runtime (bundled at build time)
- Does not detect political content, controversial topics, or the substance of what the user is asking

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
- Detection has a 100ms timeout for regex and a 500ms timeout for ML inference
- The dispatcher enforces a maximum of 20 matches per event
- The popup is rate-limited (no rapid-fire opt-in toggles)

## Supply Chain

- All dependencies are pinned to specific versions
- The build process is reproducible (same input → same output)
- Releases are signed (Ed25519 commit signing) and verifiable on GitHub
- The source is auditable (Apache 2.0, on GitHub)
- **No npm dependencies** (the extension has zero third-party JS)
- **No WASM binaries** (removed in v0.3.0; pure JS inference)
- **No onnxruntime** (removed in v0.3.0; pure JS inference)

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

- [Privacy Policy](/lens/privacy/) — what we collect, what we don't (including ML disclosure)
- [Architecture](/lens/architecture/) — how the 5-facet detection system works
- [ML Model Card](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.2/docs/MODEL-CARD.md) — architecture, evaluation, limitations, ethical considerations
- [Lens SECURITY.md on GitHub](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.3.2/docs/SECURITY.md)

Report vulnerabilities to `security@aegisgatesecurity.io` (see [`SECURITY.md`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md)).