---
title: "AegisGate Lens — Security Model"
description: "Content Security Policy, Ed25519-signed commits, Apache 2.0, vulnerability disclosure policy per RFC 9116. The v0.1.4 security model."
type: "docs"
weight: 3
---

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


# AegisGate Lens — Security Model

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the security model of v0.1.4.

## Threat Model

Lens protects against:

1. **User accidentally exposing PII** in an AI prompt
2. **User accidentally exposing secrets** (API keys, tokens) in an AI prompt
3. **User being targeted by prompt-injection attacks** (XSS payloads embedded in pasted content, instructions to ignore prior context)
4. **User sharing compliance-relevant data** (GDPR keywords, HIPAA keywords, PCI keywords)

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

## Chrome Web Store Distribution

The Chrome extension `.zip` is distributed via the Chrome Web Store. Chrome verifies the package on install and provides automatic updates. The `.zip` is built by GitHub Actions on every push to the `v0.1.x` branches.

## Content Security Policy (CSP)

Lens implements a strict CSP via the MV3 manifest:

- No inline scripts
- No remote code loading
- No `eval()` or `new Function()`
- No third-party CDNs at runtime
- All JavaScript is bundled in the extension package
- All CSS is bundled in the extension package (no external stylesheets)

The CSP is enforced by Chrome at the extension level. The extension cannot load external resources even if the page tries to make it do so.

## Storage Hygiene

- All Lens storage is local (chrome.storage.local + chrome.storage.session)
- No cookies set by Lens
- No IndexedDB entries for tracking
- The 12 non-negotiables (see [Privacy Policy](/lens/privacy/)) are enforced in code
- The opt-in storage key (`STORAGE_KEYS.OPT_IN`) is the same canonical key used by welcome.js, popup.js, and background.js (per the F-2 fix)

## Schema Validation

All detection events are validated against a schema before any processing:

- Required fields: `lens_event_version`, `timestamp`, `domain_hash`, `category`, `severity`, `confidence`, `value`, etc.
- Prohibited fields: `text`, `url`, `prompt`, `page_content` (per the privacy policy)
- The schema is in `src/privacy/schema.js` and is the single source of truth

If an event fails validation, it is dropped. No data is leaked.

## Input Validation

- All inputs (prompts, bundle sizes, header lengths) are bounded
- Detection has a 100ms timeout (no infinite loops)
- The dispatcher enforces a maximum of 20 matches per event
- The popup is rate-limited (no rapid-fire opt-in toggles)

## No Model Bundles (v0.1.4)

v0.1.4 is **regex-only**. There are no model bundles, no ML inference, no inference timeouts.

This means:
- No bundle signing is needed (no bundles to sign)
- No SLSA L2 provenance is needed (no bundles to attest)
- No Sigstore/Rekor integration is needed (no artifacts to log)
- No key ring is needed (no keys to manage)

If v0.2.0 adds a TinyML model (planned), the bundle signing and provenance flow will be added at that time and documented here.

## Vulnerability Disclosure (RFC 9116)

We follow [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) for vulnerability disclosure. The policy is published at:

- `https://aegisgatesecurity.io/.well-known/security.txt`
- `https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/.well-known/security.txt`

**Contact**: `security@aegisgatesecurity.io`

**Response SLA**:

- Acknowledge: within 48 hours
- Triage: within 7 days
- Fix critical (CVSS ≥ 9.0): within 7 days
- Fix high (CVSS 7.0-8.9): within 30 days
- Fix medium (CVSS 4.0-6.9): within 90 days
- Fix low (CVSS < 4.0): in the next regular release

We will coordinate disclosure with the reporter. We do not pursue legal action against security researchers acting in good faith.

## Hardening

Lens implements several defense-in-depth measures:

1. **Content Security Policy (CSP)**: the MV3 manifest declares a strict CSP that prevents inline scripts and remote code loading
2. **No `eval()` or `new Function()`**: Lens never evaluates dynamic code
3. **No remote code loading**: Lens never fetches executable code from the network
4. **Strict input validation**: all bundle headers are validated against a schema before parsing
5. **Schema validation**: all detection events are validated before processing
6. **Length limits**: all inputs (prompts, bundle sizes) are bounded
7. **Timeout protection**: detection has a 100ms timeout (no infinite loops)
8. **Sender validation**: the SW rejects messages from any extension other than itself (per F-01 in the threat model)

## Supply Chain

- All dependencies are pinned to specific versions
- The build process is reproducible (same input → same output)
- Releases are signed (Ed25519 commit signing) and verifiable on GitHub
- The source is auditable (Apache 2.0, on GitHub)
- No npm dependencies (the extension has zero third-party JS)

## Threat Model Limitations

Lens is **not** a silver bullet. It cannot protect against:

- A compromised browser (malicious extensions, browser exploits)
- A compromised AI provider (server-side attacks)
- A compromised local network (MITM attacks against the AI provider)
- Phishing or social engineering
- A user who intentionally disables Lens

For these threats, use a defense-in-depth approach:

- Use a reputable browser with auto-updates
- Use a reputable AI provider with SOC 2 / ISO 27001 certification
- Use HTTPS everywhere
- Use a password manager + 2FA
- Use a hardware security key (YubiKey) for AI provider accounts

## See Also

- [Privacy Policy](/lens/privacy/) — what we collect, what we don't
- [Architecture](/lens/architecture/) — how the 4-facet detection works
- [Lens SECURITY.md on GitHub](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/docs/SECURITY.md)

Report vulnerabilities to `security@aegisgatesecurity.io` (see [`.well-known/security.txt`](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/.well-known/security.txt)).
