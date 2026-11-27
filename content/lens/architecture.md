---
title: "AegisGate Lens — Architecture"
description: "How AegisGate Lens works: regex detection (ML withdrawn 2026-11-23), Ed25519-signed bundle, Apache 2.0. The technical architecture of v0.7.1."
type: "docs"
weight: 2
---


<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>

> **🆕 AegisGate Lens v0.6.0 is LIVE** — CWS approved, AMO approved.
> This page documents the **v0.6.0** architecture.


<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.6.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI</li>
<li><strong>223 detection patterns</strong> across <strong>4 regex facets</strong>: PII (65), secrets (41), XSS (12), compliance (24) + OT/ICS (9). <strong>ML facet WITHDRAWN 2026-11-23</strong> (Char CNN-BiLSTM removed)</li>
<li><strong>492 Node tests</strong> pass; ML perf/stress tests skip (weights withdrawn)</li>
<li><strong>2.31% regex FPR</strong> on 6,500 WildChat prompts (regex, unaffected). All ML-derived metrics are void.</li>
<li><strong>Sub-millisecond regex detection</strong> (p50 0.076ms, p95 0.085ms, p99 0.14ms for 500-char prompts). ~~async ML enrichment~~ — withdrawn</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Architecture

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the architecture of v0.6.0.

## Detection System (ML withdrawn 2026-11-23)

**UPDATE 2026-11-23: the ML adversarial facet is withdrawn.** Lens now runs **4 regex facets** only; the Char CNN-BiLSTM model and its weights were removed after a training-corpus label audit failure. v0.3.2 added 18 SOC detection patterns (SWIFT/BIC banking codes, CPT/HCPCS medical billing codes, OT/ICS protocols).

| Facet | What it catches | Example |
|-------|----------------|---------|
| **PII** | Email, phone, SSN, credit card, bank account, DOB, address, driver's license, passport, tax ID, IP address, MRN, ICD-10, NPI, SSN last-4, SWIFT/BIC, CPT/HCPCS (65 patterns) | `john.doe@example.com`, `4111-1111-1111-1111` |
| **Secrets** | API keys (AWS, GitHub, OpenAI, Stripe, Slack, Anthropic, Cursor, Vercel, Groq, Replicate), OAuth tokens, database credentials, RSA private keys (41 patterns) | `ghp_abc123...`, `AKIA...`, `-----BEGIN RSA PRIVATE KEY-----` |
| **XSS** | Cross-site scripting payloads (12 patterns) | ``&lt;script&gt;alert(1)&lt;/script&gt;`` |
| **Compliance** | OWASP LLM Top 10, MITRE ATLAS, EU AI Act, NIST CSF, ISO 27001, CCPA, LGPD, PIPEDA, POPIA (24 patterns) | "patient SSN:", "credit card:" |
| **~~ML Adversarial~~** | **WITHDRAWN 2026-11-23.** Prompt-injection/jailbreak coverage is currently regex-only; ML pending corpus remediation and retrain. | — |

The regex facets run **synchronously** (fast, deterministic, on-device). The ML enrichment layer no longer exists (withdrawn 2026-11-23).

## Regex Detection Approach

v0.6.0 documented regex + ML coverage (ML since withdrawn 2026-11-23):

- **Regex (4 facets)**: Fast (<1ms), deterministic, auditable. 223 patterns.
- **ML (1 facet)**: ~~Char CNN-BiLSTM~~ — WITHDRAWN 2026-11-23 (corpus label audit failure). No model is bundled. Code path removed.
- **Privacy**: Regex runs 100% on-device. No network calls. No model is bundled with the extension.
- **Determinism**: Regex is deterministic. There is no probabilistic layer.

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
│  │  │  4-Facet Regex Detection (parallel)  │    │   │
│  │  │  All regex patterns                   │    │   │
│  │  │  - PII (65)                           │    │   │
│  │  │  - Secrets (45)                       │    │   │
│  │  │  - XSS (12)                            │    │   │
│  │  │  - Compliance (57)                    │    │   │
│  │  └──────────────────────────────────────┘    │   │
│  │  ↓                                            │   │
│  │  PostProcess (FP rejection):                  │   │
│  │  - Luhn validation for credit cards          │   │
│  │  - 4-4-4 CC pattern rejection                 │   │
│  │  - ID-label context for ID-shaped patterns    │   │
│  │  ↓                                            │   │
│  │  ┌──────────────────────────────────────┐    │   │
│  │  │  ML Adversarial Detection — WITHDRAWN │    │   │
│  │  │  Char CNN-BiLSTM (~5ms)               │    │   │
│  │  │  Enrichment only (never blocks alone) │    │   │
│  │  └──────────────────────────────────────┘    │   │
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

| Prompt length | Regex detection |
|---------------|-----------------|
| Any length (regex) | <1ms (typical: 0.3-0.5ms) |
| Worst case (10K+ chars) | ~2ms |

Regex detection is **synchronous** — the user gets the result before they can send. The ML enrichment layer was withdrawn on 2026-11-23 and no longer exists.

## ML Model Bundle — WITHDRAWN 2026-11-23

~~Lens includes a Char CNN-BiLSTM adversarial prompt detection model.~~

The ML model was **withdrawn on 2026-11-23** (training-corpus label audit failure) and removed from the extension. The claimed figures (3.7MB weights, ~5ms latency, "100/100 evasion resistance, 0% false positive rate") are void. Lens provides deterministic regex protection only; there is no ML enrichment layer until a retrained model passes audit. See `docs/ML-WITHDRAWN.md` in the lens repo.

## Ed25519 Commit Signing

All commits to the AegisGate Lens repository are signed with Ed25519 SSH keys (per [GitHub's signing docs](https://docs.github.com/en/authentication/managing-commit-signature-verification)). The browser extension `.zip` is built by GitHub Actions and distributed via the Chrome Web Store and Firefox Add-ons (AMO), both of which verify the package on install.

To verify commits locally:

```bash
git log --show-signature
```

## Release Process

1. Commits are signed with Ed25519 SSH keys
2. The build runs in GitHub Actions on every push to `main`
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
│   ├── detectors/              # 4 regex facets (+ withdrawn ML stub)
│   │   ├── regex/              # Regex pattern files
│   │   │   ├── pii.js          # Aggregator (loads 4 sub-files)
│   │   │   ├── pii-us-core.js
│   │   │   ├── pii-us-extended.js
│   │   │   ├── pii-international-id.js
│   │   │   ├── pii-financial.js
│   │   │   ├── secrets.js
│   │   │   ├── source_xss.js
│   │   │   └── compliance.js
│   │   ├── ml/                 # ML stub (withdrawn 2026-11-23; no weights, no-op module)
│   │   │   └── threat-detector-js.js  # Returns score 0, isAdversarial false
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
├── test/                       # 492 Node tests (ML perf/stress skip; weights withdrawn)
│   ├── unit/                   # Test files
│   ├── helpers/                # Mock chrome, load-module
│   ├── headless-smoke/         # Real-browser integration
│   └── ml/                     # ML perf/stress tests (skip; ML withdrawn 2026-11-23)
├── docs/                       # Public documentation
│   ├── MODEL-CARD.md
│   ├── API.md
│   ├── SECURITY.md
│   ├── THREAT-MODEL.md
│   ├── PRODUCT-SUMMARY.md
│   └── CHANGELOG.md
├── .plans/                     # Internal planning (gitignored)
└── README.md
```

## Test Coverage

- **492/492 Node tests** pass (using `node:test` from Node 20+ stdlib)
- ~~**12/12 ML perf/stress tests**~~ — ML withdrawn 2026-11-23; these tests skip (weights removed)
- **Zero external dependencies** for tests (no Jest, no Mocha)
- Real-browser E2E tests against 10 AI provider mocks

## See Also

- [Security Model](/lens/security/) — content security policy, vulnerability disclosure
- [Privacy Policy](/lens/privacy/) — what we collect, what we don't
- [Changelog](/lens/changelog/) — version history

The full source code is at [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens). PRs welcome.