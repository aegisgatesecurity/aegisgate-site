> **🆕 AegisGate Lens v0.2.0 is LIVE** — CWS approved 2026-07-27.
> This page documents the **v0.2.0** architecture.

---

---
title: "AegisGate Lens — Architecture"
description: "How AegisGate Lens works: 4-facet regex detection, Ed25519-signed bundle, Apache 2.0. The full technical architecture of v0.2.0."
type: "docs"
weight: 2
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


# AegisGate Lens — Architecture

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the architecture of v0.2.0.

## 4-Facet Detection System

Lens runs **4 active detection facets** in parallel on every prompt you type. v0.2.0 expanded the **compliance** facet (more frameworks: MITRE ATLAS, EU AI Act, NIST CSF, ISO 27001, CCPA, LGPD, PIPEDA, POPIA) and added 4 healthcare PII patterns and 4 modern API key patterns. The ML-based facets (Toxicity, Prompt-Injection) were evaluated and deferred — see [Lesson #99](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.2.0/docs/LESSONS.md).

| Facet | What it catches | Example |
|-------|----------------|---------|
| **PII** | Email, phone, SSN, credit card, bank account, DOB, address, driver's license, passport, tax ID, IP address, MRN, ICD-10, NPI, SSN last-4 (55 patterns) | `john.doe@example.com`, `4111-1111-1111-1111` |
| **Secrets** | API keys (AWS, GitHub, OpenAI, Stripe, Slack, Anthropic, Cursor, Vercel, Groq, Replicate), OAuth tokens, database credentials, RSA private keys (45 patterns) | `ghp_abc123...`, `AKIA...`, `-----BEGIN RSA PRIVATE KEY-----` |
| **XSS** | Cross-site scripting payloads (12 patterns) | ``&lt;script&gt;alert(1)&lt;/script&gt;`` |
| **Compliance** | OWASP LLM Top 10, MITRE ATLAS, EU AI Act, NIST CSF, ISO 27001, CCPA, LGPD, PIPEDA, POPIA (43 patterns) | "patient SSN:", "credit card:" |

All 4 facets use **regex patterns** (fast, synchronous, on-device). No ML model. No heuristics. No inference latency. The detection is deterministic and auditable.

## Why Regex (not ML)?

v0.2.0 is intentionally regex-only. The rationale:

- **Privacy**: regex is auditable. A model is a black box.
- **Size**: a TinyML model would add 1-2MB to the extension. Regex is 132 patterns = ~50KB.
- **Latency**: regex detects in <1ms. A model would need 50-100ms.
- **Determinism**: regex produces the same result every time. A model can drift.
- **No training data**: regex patterns are hand-curated. No need for training corpus.
- **FPR**: with the v0.2.0 postProcess tightening, FPR on 6,500 WildChat prompts is 2.31% — comparable to or better than ML approaches.

A TinyML model (1-2MB transformer) was evaluated for v0.2.0 to add the 2 missing facets (Toxicity, Prompt-Injection) and improve FPR on edge cases. After the evaluation, the ML approach was deferred — 6 model families failed to meet the ship gate (see [Lesson #99](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.2.0/docs/LESSONS.md)). v0.2.0 instead expanded the compliance facet with 19 new patterns and added 4 healthcare PII patterns + 4 modern API key patterns.

## Architecture Stack

```
┌─────────────────────────────────────────────────────┐
│  AI Provider (ChatGPT, Claude, Gemini, ...)          │
│  (DOM content, user input, AI output)                │
└─────────────────────────────────────────────────────┘
                          ↑↓
┌─────────────────────────────────────────────────────┐
│  Lens Content Script (MV3, injected into page)       │
│  ┌──────────────────────────────────────────────┐   │
│  │  Event Listener (input, keyup, paste)        │   │
│  │  ↓                                            │   │
│  │  Debounced Detection (250ms throttle)         │   │
│  │  ↓                                            │   │
│  │  ┌──────────────────────────────────────┐    │   │
│  │  │  4-Facet Detection (parallel)        │    │   │
│  │  │  All regex patterns                   │    │   │
│  │  │  - PII (55)                           │    │   │
│  │  │  - Secrets (45)                       │    │   │
│  │  │  - XSS (12)                            │    │   │
│  │  │  - Compliance (43)                     │    │   │
│  │  └──────────────────────────────────────┘    │   │
│  │  ↓                                            │   │
│  │  PostProcess (FP rejection):                  │   │
│  │  - Luhn validation for credit cards          │   │
│  │  - 4-4-4 CC pattern rejection                 │   │
│  │  - ID-label context for ID-shaped patterns    │   │
│  │  ↓                                            │   │
│  │  UI Update (non-blocking banner)             │   │
│  │  - Show severity color                        │   │
│  │  - Show rewritten text                        │   │
│  │  - Show "Send anyway / Edit / Cancel"        │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                          ↑↓
                  (optional Tier 1 opt-in)
                  Hashed metadata only
                  NEVER prompt text
                          ↑↓
┌─────────────────────────────────────────────────────┐
│  (Optional) AegisGate Platform Backend             │
│  - Hashed FP report aggregation                     │
│  - Team-wide policy (Enterprise)                    │
└─────────────────────────────────────────────────────┘
```

## Detection Latency

| Prompt length | Detection time |
|---------------|-----------------|
| Any length (regex only) | <1ms (typical: 0.3-0.5ms) |
| Worst case (10K+ chars) | ~2ms |

All detection is **synchronous** — the user gets the result before they can send. There is no async ML inference.

## Ed25519 Commit Signing

All commits to the AegisGate Lens repository are signed with Ed25519 SSH keys (per [GitHub's signing docs](https://docs.github.com/en/authentication/managing-commit-signature-verification)). The Chrome extension `.zip` is built by GitHub Actions and distributed via the Chrome Web Store, which verifies the package on install.

To verify commits locally:

```bash
git log --show-signature
```

## No Model Bundles (v0.2.0)

v0.2.0 is **regex-only**. There are no model bundles, no ML inference, no inference timeouts.

This means:
- No bundle signing is needed (no bundles to sign)
- No SLSA L2 provenance is needed (no bundles to attest)
- No Sigstore/Rekor integration is needed (no artifacts to log)
- No key ring is needed (no keys to manage)

If a future version adds a TinyML model, the bundle signing and provenance flow will be added at that time and documented here.

## Release Process

1. Commits are signed with Ed25519 SSH keys
2. The build runs in GitHub Actions on every push to the `v0.1.x` branches
3. The build produces the `.zip` file and uploads it as a CI artifact
4. The `.zip` is submitted to the Chrome Web Store dashboard
5. Chrome Web Store verifies the package and distributes it to users

## Zero External Dependencies

Lens has **zero external dependencies**. All code is in plain JavaScript. No npm, no node_modules, no bundled libraries.

This is a privacy feature, not just a code-quality feature: there are no third-party libraries that could be compromised and exfiltrate data.

## File Structure

```
aegisgate-lens/
├── src/                        # Canonical source
│   ├── api/                    # Optional backend client
│   ├── content.js              # Content script (entry point)
│   ├── background.js           # MV3 service worker
│   ├── popup/                  # Browser action popup
│   │   ├── popup.html
│   │   └── popup.js
│   ├── welcome/                # First-install welcome page
│   │   ├── welcome.html
│   │   ├── welcome.js
│   │   └── fonts/              # Bundled Inter font (OFL)
│   ├── detectors/              # 4-facet detection
│   │   ├── regex/              # Regex pattern files
│   │   │   ├── pii.js          # Aggregator (loads 4 sub-files)
│   │   │   ├── pii-us-core.js
│   │   │   ├── pii-us-extended.js
│   │   │   ├── pii-international-id.js
│   │   │   ├── pii-financial.js
│   │   │   ├── secrets.js
│   │   │   ├── source_xss.js
│   │   │   └── compliance.js
│   │   ├── luhn.js             # Credit card Luhn validation
│   │   └── index.js            # Detector orchestrator
│   ├── privacy/                # Privacy + schema
│   │   ├── schema.js           # Event schema validator
│   │   └── domain_hash.js      # SHA-256 domain hashing
│   ├── util/                   # Banner UI, dismiss logic, etc.
│   │   ├── banner-ui.js        # Aggregator
│   │   ├── banner-ui-html.js
│   │   ├── banner-ui-lifecycle.js
│   │   ├── banner-ui-formatters.js
│   │   ├── banner.css
│   │   ├── banner-icons.js
│   │   ├── dismiss.js
│   │   ├── prompt-detect.js    # Orchestrator
│   │   ├── prompt-detect-dom.js
│   │   ├── prompt-detect-lifecycle.js
│   │   ├── selectors.js        # Provider host detection
│   │   ├── constants.js        # Storage keys, TTLs, etc.
│   │   ├── typedefs.js
│   │   └── logger.js
│   └── manifest.json           # MV3 manifest
├── test/                       # 734 automated tests (431 Node + 146 secrets + 3 Go + 16 smoke + 128 mini-smoke)
│   ├── unit/                   # 18 test files
│   ├── helpers/                # Mock chrome, load-module
│   ├── headless-smoke/         # 16/16 real-browser integration
│   └── e2e/                    # empty (v0.2.0 scope)
├── docs/                       # Public documentation
│   ├── ARCHITECTURE-v0.1.0-BETA.md
│   ├── METRICS-v0.1.2.md
│   ├── MODEL-CARD.md
│   ├── API.md
│   ├── SECURITY.md
│   ├── THREAT-MODEL.md
│   ├── A11Y-AUDIT-v0.2.0.md
│   ├── PRODUCT-SUMMARY.md
│   └── CHANGELOG.md
├── .plans/                     # Internal planning (gitignored)
│   ├── AEGISGATE-LENS-STANDING-RULES-2026-06-29.md
│   ├── AEGISGATE-LENS-CHROME-STORE-LISTING.md
│   ├── todo-v0.2.0.md
│   └── v0.2-burndown/          # v0.2.0 research artifacts (gitignored)
└── README.md
```

## Test Coverage

- **431/431 Node tests** pass (using `node:test` from Node 20+ stdlib)
- **146 secrets tests** (direct unit tests for all 45 secret patterns)
- **3/3 Go tests** pass (in `tools/headless-smoke/flow/`)
- **16/16 headless smoke** in real Chrome (the 4 facet detectors + 16 flow cases)
- **128/128 mini-smoke** (extended flows: per-host routing, dismiss flow, e2e)
- **734 total automated tests** (5/5 stable runs per Lesson #113)
- **Zero external dependencies** for tests (no Jest, no Mocha)
- Real-browser E2E tests against 8 AI provider mocks

## See Also

- [Security Model](/lens/security/) — content security policy, vulnerability disclosure
- [Privacy Policy](/lens/privacy/) — what we collect, what we don't
- [Changelog](/lens/changelog/) — version history

The full source code is at [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens). PRs welcome.
