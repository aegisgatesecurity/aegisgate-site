---
title: "AegisGate Lens — Architecture"
description: "How AegisGate Lens works: 6-facet detection, ModernBERT ML model, Ed25519-signed bundles, SLSA L2 provenance. The full technical architecture."
type: "docs"
weight: 2
---

# AegisGate Lens — Architecture

The full source code is on [GitHub](https://github.com/aegisgatesecurity/aegisgate-lens) (Apache 2.0). This page summarizes the architecture.

## 6-Facet Detection System

Lens runs **6 detection facets** in parallel on every prompt you type:

| Facet | What it catches | Example |
|-------|----------------|---------|
| **PII** | Email, phone, SSN, credit card, bank account | `john.doe@example.com`, `4111-1111-1111-1111` |
| **Secrets** | API keys, tokens, private keys (RSA, EC, OpenSSH) | `ghp_abc123...`, `AKIA...`, `-----BEGIN RSA PRIVATE KEY-----` |
| **XSS** | Cross-site scripting payloads in user input | `<script>alert(1)</script>` |
| **Prompt-injection** | LLM prompt-injection attacks | `ignore all previous instructions and...` |
| **Toxicity** | Hate speech, harassment, explicit content (ML-classified) | Slurs, threats |
| **Compliance** | GDPR, HIPAA, PCI keywords in prompts | "patient SSN:", "credit card:" |

The first 5 (PII through Compliance) use a layered approach: **regex** (fast, synchronous) + **heuristics** (medium-speed) + **ModernBERT ML model** (slow, async, only for ambiguous cases).

The 6th (Toxicity) uses a **separate multi-label classifier** with 6 toxicity categories.

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
│  │  Debounced Detection (50ms throttle)          │   │
│  │  ↓                                            │   │
│  │  ┌──────────────────────────────────────┐    │   │
│  │  │  6-Facet Detection (parallel)        │    │   │
│  │  │  - Regex (synchronous, fast)         │    │   │
│  │  │  - Heuristics (medium)              │    │   │
│  │  │  - ModernBERT (async, ambiguous)    │    │   │
│  │  │  - Toxicity classifier (async)       │    │   │
│  │  └──────────────────────────────────────┘    │   │
│  │  ↓                                            │   │
│  │  UI Update (non-blocking banner)             │   │
│  │  - Show severity color                        │   │
│  │  - Show rewritten text                        │   │
│  │  - Show "Send anyway / Edit / Cancel"        │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                          ↑↓
                  (optional Tier 1 / Tier 2)
                  Anonymous metadata only
                  NEVER prompt text
                          ↑↓
┌─────────────────────────────────────────────────────┐
│  (Optional) Backend (self-hosted Platform)          │
│  - Tier 1 metadata logging                          │
│  - Team-wide policy                                 │
│  - Detection aggregation                            │
└─────────────────────────────────────────────────────┘
```

## ModernBERT-base ML Model

Lens uses a 149M-parameter ModernBERT-base model fine-tuned for AI prompt safety classification. Key specs:

- **Architecture**: ModernBERT (12 layers, 768 hidden, 12 heads)
- **Context**: 8K tokens (longer than BERT's 512, shorter than most modern LLMs)
- **Sliding window**: For prompts >2K tokens, Lens uses sliding window inference (window 2048, stride 1024, overlap 4)
- **Threshold**: 0.05 (tuned to maximize recall on the hard test set)
- **Quantization**: INT8 (154 MB on disk, was 602 MB FP32)
- **Signing**: Ed25519, key in bundle header
- **Provenance**: SLSA L2 + Sigstore + Rekor

The model is loaded lazily (only when the user types a sufficiently long prompt). Default detection (short prompts) uses regex + heuristics only.

## Detection Latency

| Prompt length | Detection time |
|---------------|-----------------|
| 1-512 chars (typical) | <10ms (regex only) |
| 512-2048 chars | <50ms (regex + heuristics) |
| 2048-8192 chars | <100ms (regex + heuristics + ModernBERT async) |
| 8192+ chars | Sliding window inference, ~500ms total |

The detection is **synchronous for regex/heuristics** (must complete before the user can send). The **ModernBERT inference is async** (runs in the background) — the user gets a preliminary result immediately, then an updated result when the ML model finishes.

## Ed25519 Bundle Signing

Every model bundle (int8 and FP32) is signed with an Ed25519 key. The signature is at the end of the bundle. On load:

1. Read the bundle (header + payload + signature)
2. Parse the header (JSON)
3. Look up the public key in the key ring based on the header's `signing_public_key` field
4. Verify the signature over (header + payload)
5. If verification fails, the bundle is rejected — no ML inference
6. If verification passes, the payload is verified against the header's `payload_sha256`

The key ring contains 2 keys: the PI bundle key (v0.2.0-rc1) and the toxicity bundle key (v0.2.0).

## SLSA L2 Provenance

Every release artifact (the .bundle files) has:

- **SLSA Level 2** provenance generated by GitHub Actions
- **Sigstore** signature for the release commit
- **Rekor** transparency log entry for the build

This means you can verify the bundle was built by AegisGate from the official source, not by an attacker. The provenance is generated by `github.com/slsa-framework/slsa-github-generator`.

## Zero External Dependencies

Lens has **zero external dependencies**. All code is in plain JavaScript. No npm, no node_modules, no bundled libraries. The ML model runs in the browser using ONNX Runtime Web (bundled, ~12MB).

This is a privacy feature, not just a code-quality feature: there are no third-party libraries that could be compromised and exfiltrate data.

## File Structure

```
aegisgate-lens/
├── src/                        # Canonical source
│   ├── api/client.js           # Backend client (optional)
│   ├── detectors/              # 6-facet detection
│   │   ├── regex.js            # Regex patterns
│   │   ├── regex_v2.js         # ML-generated patterns
│   │   ├── luhn.js             # Credit card validation
│   │   ├── from_platform.js    # Platform-ported patterns
│   │   └── index.js            # Detector orchestrator
│   ├── privacy/                # Privacy + schema
│   ├── transform/              # Toxicity + ModernBERT
│   ├── util/                   # Bundle loader, logger, etc.
│   ├── welcome.html / welcome.js  # First-install welcome page
│   ├── content.js              # Content script (entry point)
│   ├── service-worker.js       # Service worker
│   └── manifest.json           # MV3 manifest
├── lens-final-dist/            # Build output (the .zip loaded by Chrome)
│   ├── manifest.json
│   ├── content.js              # Built from src/content.js
│   ├── service-worker.js       # Built from src/service-worker.js
│   ├── *.bundle                # Signed ML model bundles
│   └── ...
├── test/                       # 233/233 tests
└── docs/                       # Architecture, threat model, etc.
```

## Test Coverage

- **233/233 tests** pass
- **Zero external dependencies** (per `docs/NO-EXTERNAL-DEPS.md`)
- All tests in `node:test` (Node 20+ stdlib) — no Jest, no Mocha, no npm
- Real-browser E2E tests against 6 AI provider mocks
- Bundle parser tests (signed bundle, tampered bundle, missing files, wrong sizes)
- ModernBERT inference tests (sliding window, quantization, threshold)
- Privacy tests (no network calls in default mode)

## See Also

- [Security Model](/lens/security/) — bundle signing, SLSA L2, vulnerability disclosure
- [Privacy Policy](/lens/privacy/) — what we collect, what we don't
- [Changelog](/lens/changelog/) — version history

The full source code is at [github.com/aegisgatesecurity/aegisgate-lens](https://github.com/aegisgatesecurity/aegisgate-lens). PRs welcome.
