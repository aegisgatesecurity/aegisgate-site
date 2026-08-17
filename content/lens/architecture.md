> **🆕 AegisGate Lens v0.3.1 is LIVE** — CWS approved, AMO approved.
> This page documents the **v0.3.1** architecture.

---
title: "AegisGate Lens — Architecture"
description: "How AegisGate Lens works: 5-facet detection (4 regex + ML), Ed25519-signed bundle, Apache 2.0. The full technical architecture of v0.3.1."
type: "docs"
weight: 2
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.3.1</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

<ul>
<li><strong>10 AI providers</strong>: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI</li>
<li><strong>169 regex patterns</strong> across <strong>4 regex facets</strong>: PII (55), secrets (45), XSS (12), compliance (57) + <strong>1 ML facet</strong> (Char CNN-BiLSTM adversarial detection)</li>
<li><strong>504 automated tests</strong>: 492/492 Node + 12/12 ML perf/stress (5/5 stable runs)</li>
<li><strong>2.31% FPR</strong> on 6,500 WildChat prompts (5.1x better than v0.1.0-beta baseline)</li>
<li><strong>Sub-millisecond regex detection</strong> (p50 0.076ms, p95 0.085ms, p99 0.14ms for 500-char prompts) + async ML enrichment (~5ms)</li>
<li><strong>100% on-device</strong>, zero network egress by default</li>
<li><strong>12 privacy non-negotiables</strong>, Apache 2.0, zero external dependencies</li>
<li><strong>Free, forever</strong></li>
</ul>
</div>


# AegisGate Lens — Architecture

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the architecture of v0.3.1.

## 5-Facet Detection System

Lens runs **5 detection facets** — 4 synchronous regex facets and 1 async ML facet — on every prompt you type. v0.3.0 added the **ML adversarial** facet (Char CNN-BiLSTM model, 3.7MB float16 JSON weights, pure JS inference). v0.3.1 added 18 SOC detection patterns (SWIFT/BIC banking codes, CPT/HCPCS medical billing codes, OT/ICS protocols).

| Facet | What it catches | Example |
|-------|----------------|---------|
| **PII** | Email, phone, SSN, credit card, bank account, DOB, address, driver's license, passport, tax ID, IP address, MRN, ICD-10, NPI, SSN last-4 (55 patterns) | `john.doe@example.com`, `4111-1111-1111-1111` |
| **Secrets** | API keys (AWS, GitHub, OpenAI, Stripe, Slack, Anthropic, Cursor, Vercel, Groq, Replicate), OAuth tokens, database credentials, RSA private keys (45 patterns) | `ghp_abc123...`, `AKIA...`, `-----BEGIN RSA PRIVATE KEY-----` |
| **XSS** | Cross-site scripting payloads (12 patterns) | ``&lt;script&gt;alert(1)&lt;/script&gt;`` |
| **Compliance** | OWASP LLM Top 10, MITRE ATLAS, EU AI Act, NIST CSF, ISO 27001, CCPA, LGPD, PIPEDA, POPIA (57 patterns) | "patient SSN:", "credit card:" |
| **ML Adversarial** | Prompt injection, jailbreak attempts, adversarial instructions (Char CNN-BiLSTM, 1.58M params, ~5ms inference) | "ignore previous instructions and..." |

The 4 regex facets run **synchronously** (fast, deterministic, on-device). The ML facet runs **asynchronously** as an enrichment layer — the user gets regex results immediately, and ML results arrive ~5ms later if the ML model is enabled.

## Regex + ML Approach

v0.3.1 combines regex and ML for complementary coverage:

- **Regex (4 facets)**: Fast (<1ms), deterministic, auditable, zero false negatives for known patterns. 169 patterns = ~60KB.
- **ML (1 facet)**: Char CNN-BiLSTM catches novel/zero-day adversarial prompts that regex misses. 3.7MB float16 JSON weights, pure JS inference (no WASM, no onnxruntime). ~5ms async inference.
- **Privacy**: Both regex and ML run 100% on-device. No network calls. The ML model is bundled with the extension — no model download.
- **Determinism**: Regex is deterministic. ML adds probabilistic enrichment but never blocks alone (ML results supplement, never override regex).

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
│  │  │  - PII (55)                           │    │   │
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
│  │  │  ML Adversarial Detection (async)     │    │   │
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

| Prompt length | Regex detection | ML enrichment |
|---------------|-----------------|---------------|
| Any length (regex) | <1ms (typical: 0.3-0.5ms) | ~5ms (async) |
| Worst case (10K+ chars) | ~2ms | ~8ms (async) |

Regex detection is **synchronous** — the user gets the result before they can send. ML enrichment runs **asynchronously** and supplements the regex results.

## ML Model Bundle (v0.3.0+)

Starting in v0.3.0, Lens includes a Char CNN-BiLSTM adversarial prompt detection model:

- **Architecture**: Character-level CNN + BiLSTM, 1.58M parameters
- **Size**: 3.7MB (float16 JSON weights)
- **Inference**: Pure JavaScript (no WASM, no onnxruntime — removed in v0.3.0)
- **Latency**: ~5ms per prompt (async, non-blocking)
- **Accuracy**: 100/100 evasion resistance, 0% false positive rate on benign traffic
- **Bundle signing**: Model is bundled with the extension, signed via CWS/AMO package verification

The ML model is an **enrichment layer** — it supplements regex detection but never overrides it. If the ML model is unavailable (e.g., disabled by the user), Lens continues to provide full regex protection.

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
│   ├── detectors/              # 5-facet detection
│   │   ├── regex/              # Regex pattern files
│   │   │   ├── pii.js          # Aggregator (loads 4 sub-files)
│   │   │   ├── pii-us-core.js
│   │   │   ├── pii-us-extended.js
│   │   │   ├── pii-international-id.js
│   │   │   ├── pii-financial.js
│   │   │   ├── secrets.js
│   │   │   ├── source_xss.js
│   │   │   └── compliance.js
│   │   ├── ml/                 # ML adversarial detection
│   │   │   ├── model.json      # Char CNN-BiLSTM weights (3.7MB)
│   │   │   └── inference.js    # Pure JS inference engine
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
├── test/                       # 504 automated tests (492 Node + 12 ML perf/stress)
│   ├── unit/                   # Test files
│   ├── helpers/                # Mock chrome, load-module
│   ├── headless-smoke/         # Real-browser integration
│   └── ml/                     # ML performance + stress tests
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
- **12/12 ML perf/stress tests** (inference latency, model loading, adversarial prompt detection)
- **504 total automated tests** (5/5 stable runs)
- **Zero external dependencies** for tests (no Jest, no Mocha)
- Real-browser E2E tests against 10 AI provider mocks

## See Also

- [Security Model](/lens/security/) — content security policy, vulnerability disclosure
- [Privacy Policy](/lens/privacy/) — what we collect, what we don't
- [Changelog](/lens/changelog/) — version history

The full source code is at [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens). PRs welcome.