> **📣 AegisGate Lens v0.1.4 is in CWS review** (expected approval 2026-07-13).
> This page documents the **v0.1.0-beta** architecture. v0.1.4 will add:
> 8 providers, 132 patterns, 500/500 tests, mini-smoke binary, lightweight
> shell linter, performance baseline benchmark.

---

---
title: "AegisGate Lens — Architecture"
description: "How AegisGate Lens works: 4-facet regex detection, Ed25519-signed bundle, Apache 2.0. The full technical architecture of v0.1.3."
type: "docs"
weight: 2
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.3/docs/FACTS.md -->
<!-- If you change any number below, update FACTS.md FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.1.3</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.3/docs/FACTS.md">docs/FACTS.md</a>)</em>

<ul>
<li><strong>8 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok</li>
<li><strong>132 regex patterns</strong> across <strong>4 detection facets</strong>: PII, secrets, XSS, compliance</li>
<li><strong>450 automated tests</strong>: 431/431 Node + 3/3 Go + 16/16 headless smoke in real Chrome</li>
<li><strong>2.31% FPR</strong> on 6,500 WildChat prompts (5.1x better than v0.1.0-beta baseline)</li>
<li><strong>Sub-millisecond detection</strong> (avg 0.34ms)</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Architecture

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the architecture of v0.1.3.

## 4-Facet Detection System

Lens runs **4 active detection facets** in parallel on every prompt you type. 2 more facets (Toxicity, Prompt-Injection) are planned for v0.2.0.

| Facet | What it catches | Example |
|-------|----------------|---------|
| **PII** | Email, phone, SSN, credit card, bank account, DOB, address, driver's license, passport, tax ID, IP address (55 patterns) | `john.doe@example.com`, `4111-1111-1111-1111` |
| **Secrets** | API keys (AWS, GitHub, OpenAI, Stripe, Slack), OAuth tokens, database credentials, RSA private keys (41 patterns) | `ghp_abc123...`, `AKIA...`, `-----BEGIN RSA PRIVATE KEY-----` |
| **XSS** | Cross-site scripting payloads (12 patterns) | ``&lt;script&gt;alert(1)&lt;/script&gt;`` |
| **Compliance** | OWASP LLM Top 10 (5/10 implemented), MITRE ATLAS, EU AI Act, NIST CSF, ISO 27001, CCPA, LGPD, PIPEDA, POPIA (24 patterns) | "patient SSN:", "credit card:" |

All 4 facets use **regex patterns** (fast, synchronous, on-device). No ML model. No heuristics. No inference latency. The detection is deterministic and auditable.

## Why Regex (not ML)?

v0.1.3 is intentionally regex-only. The rationale:

- **Privacy**: regex is auditable. A model is a black box.
- **Size**: a TinyML model would add 1-2MB to the extension. Regex is 132 patterns = ~50KB.
- **Latency**: regex detects in <1ms. A model would need 50-100ms.
- **Determinism**: regex produces the same result every time. A model can drift.
- **No training data**: regex patterns are hand-curated. No need for training corpus.
- **FPR**: with the v0.1.4 postProcess tightening, FPR on 6,500 WildChat prompts is 2.31% — comparable to or better than ML approaches.

A TinyML model (1-2MB transformer) is planned for v0.2.0 to add the 2 missing facets (Toxicity, Prompt-Injection) and improve FPR on edge cases. See the [FPR analysis](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.3/docs/METRICS-v0.1.2.md) for the current metrics.

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
│  │  │  - Secrets (41)                       │    │   │
│  │  │  - XSS (12)                            │    │   │
│  │  │  - Compliance (24)                     │    │   │
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

## No Model Bundles (v0.1.3)

v0.1.3 is **regex-only**. There are no model bundles, no ML inference, no inference timeouts.

This means:
- No bundle signing is needed (no bundles to sign)
- No SLSA L2 provenance is needed (no bundles to attest)
- No Sigstore/Rekor integration is needed (no artifacts to log)
- No key ring is needed (no keys to manage)

If v0.2.0 adds a TinyML model (planned), the bundle signing and provenance flow will be added at that time and documented here.

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
├── test/                       # 431/431 Node tests + 3/3 Go tests
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
│   ├── A11Y-AUDIT-v0.1.3.md
│   ├── PRODUCT-SUMMARY.md
│   └── CHANGELOG.md
├── .plans/                     # Internal planning (gitignored)
│   ├── AEGISGATE-LENS-STANDING-RULES-2026-06-29.md
│   ├── AEGISGATE-LENS-CHROME-STORE-LISTING.md
│   ├── todo-v0.1.3.md
│   └── v0.2-burndown/          # v0.2.0 research artifacts (gitignored)
└── README.md
```

## Test Coverage

- **431/431 Node tests** pass (using `node:test` from Node 20+ stdlib)
- **3/3 Go tests** pass (in `tools/headless-smoke/flow/`)
- **16/16 headless smoke** in real Chrome (the 4 facet detectors + 16 flow cases)
- **Zero external dependencies** for tests (no Jest, no Mocha)
- Real-browser E2E tests against 8 AI provider mocks

## See Also

- [Security Model](/lens/security/) — content security policy, vulnerability disclosure
- [Privacy Policy](/lens/privacy/) — what we collect, what we don't
- [Changelog](/lens/changelog/) — version history

The full source code is at [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens). PRs welcome.
