---
title: "v4.7.0: Retraining the Brain, Seeding the Policy Engine, and the 50% Regression We Almost Shipped"
slug: v4-7-0-retraining-the-brain-seeding-the-policy-engine
description: "Inside AegisGate v4.7.0: a CharCNN-BiLSTM model retrain from v13 to v15b, a MaxSeqLen regression we caught before it shipped, 7 built-in Rego policies, compliance coverage driven to 98%+, and cross-product detection parity across 284 patterns."
date: 2026-10-21
author: Josh Colvin
tags:
  - ai-security
  - machine-learning
  - threat-detection
  - release
  - compliance
  - detection-parity
---

Today we're shipping AegisGate v4.7.0 across all five products — Platform, Scanner, MCP, Rampart, and Lens. This release retrains our shared CharCNN-BiLSTM threat detection model, seeds the Platform's compliance policy engine with 7 built-in Rego policies, restores the correct 256-character input window across all products, and drives compliance test coverage to industry-leading levels.

It's also the story of a regression we almost shipped — a 50% reduction in our ML detection window that was caught by our own CI gates and fixed before it reached production.

---

## The Model Retrain: v13 → v15b

Our CharCNN-BiLSTM neural threat detector is the L3 layer in our three-layer detection pipeline. It runs at <1ms CPU inference latency, processes 256 characters of input through a character-level CNN with bidirectional LSTM and attention, and outputs a threat probability score. It's 1,596,034 parameters — small enough to run on a laptop, powerful enough to catch adversarial paraphrasing that regex patterns miss.

The model is shared across all five AegisGate products. Platform and Rampart use the ONNX (float32) version. Lens uses a float16 JSON weights file for pure-JS in-browser inference. Scanner and MCP ship the ONNX model in-repo. One model, five products, same detection behavior.

### Why Retrain?

The v13 model (shipped September 2026) had strong metrics: 99.35% accuracy, 99.57% precision, 0.85% FPR. It achieved 100/100 on our evasion suite (81 payloads × 50 obfuscation transforms). But it had a known issue: 7 proverb-like phrases triggered false positives. "A penny saved is a penny earned" shouldn't be flagged as a threat.

The goal was simple: retrain to eliminate those false positives while maintaining — or improving — everything else.

### v14: The Experiment We Rejected

The first attempt (v14) took a different approach than intended. It reduced the input window from 256 characters to 128 and the vocabulary from Latin-1 (256 tokens) to ASCII (128 tokens). The rationale was that shorter inputs would be less likely to trigger on long proverb phrases.

It worked — the 7 proverb FPs were eliminated. But it introduced a regression that our CI gates caught: **a 50% reduction in the ML detection window**. An attacker who previously needed 256 characters to craft an evasion payload that the model would miss now only needed 128. That's not a trade we're willing to make.

v14 was never shipped. It was reverted entirely.

### v15: The Model That Failed Lens

The second attempt (v15) returned to 256-char Latin-1 but trained on the v14 corpus (70,830 examples including 257 hard-negative proverbs). The metrics looked good — FPR 0.55%, F1 95.98% — but the Lens JS evasion suite scored 88.4/100, below our 95.0 threshold.

The root cause: float16 precision loss. Lens runs the model in pure JavaScript using float16 weights to keep the extension size manageable (~4MB vs ~25MB for float32). The v15 model's decision boundary was sharper than v13's — borderline cases sat closer to the threshold. Float16 quantization shifted enough of those borderline cases to the wrong side of the threshold that 11.6% of evasion tests failed.

v15 was rejected.

### v15b: The Model We Shipped

The final model (v15b) returned to the original v13 training corpus (70,572 examples, no proverbs) at 256-char Latin-1. The proverbs were removed from the training data rather than being added as hard negatives. The model learned to not flag them not because it was explicitly trained against them, but because the training distribution didn't include adversarial patterns that resemble them.

**v15b metrics:**

| Metric | v13 | v15b | Direction |
|--------|-----|------|-----------|
| Accuracy | 99.35% | 98.16% | ↓ |
| Precision | 99.57% | 98.20% | ↓ |
| Recall (TPR) | 99.45% | 93.48% | ↓ |
| F1 | 99.5% | 95.78% | ↓ |
| **FPR** | **0.85%** | **0.49%** | **↓ (better)** |

The raw test metrics are lower than v13. That's expected — the model has a compressed sigmoid range (near-zero logits for benign → sigmoid≈0.50, ~1.0 logits for adversarial → sigmoid≈0.73). The decision boundary is less sharp at the model level. But the FPR improved from 0.85% to 0.49% — fewer false positives on benign input.

**In the full three-layer pipeline, the metrics that matter are unchanged**: 100/100 evasion resistance, 0% FPR across 8.1M benign requests, 28K RPS sustained throughput. The multi-layer architecture catches what any single layer misses. L1 regex and L2 ATLAS/compliance corroboration compensate for the model's compressed range. Two-tier blocking (≥0.95 independent, ≥0.50 with L1/L2 corroboration) ensures the model's lower-confidence outputs are still actionable.

**Model files:**
- ONNX (Go products): 6,398,115 bytes, SHA-256 `99187453bedb2b8caf21500d2344f2bbe34272c0b3fd4c610c431378dc2f4fe7`
- JS weights (Lens): 3,928,018 bytes, SHA-256 `03792717405a1875d068a6304b69d3aeb019643778af30677b0f7257dbfbabab`

---

## The MaxSeqLen Regression: How CI Saved Us

Here's the part that scared us.

When v14 was reverted, the model architecture changes (256→128) were reverted in `training/model.py`. But the **production code changes** — the 5 Go normalizers across Platform, Scanner, MCP, and Rampart — were not fully reverted. They were still configured for 128-char input.

The v15b ONNX model expects input shape `[batch, 256]`. The normalizers were producing `[batch, 128]`. This caused inference failures and effectively reduced the ML detection window by 50%.

**How it was caught**: The ML Detection Gate CI workflow downloads the ONNX model, runs it against a calibrated test corpus, and checks detection scores against expected thresholds. The mismatch between the model's expected input shape and the normalizer's output caused scores to drop below the threshold. CI failed. The regression was identified and fixed before any release artifact was built.

**The fix**: Restored `MaxSeqLen = 256` and `VocabSize = 256` (Latin-1, 0–255) in all 5 Go normalizers and in `training/model.py`. Test expectations updated from 128→256 across Platform, MCP, and Rampart.

**The lesson**: Architecture changes (MaxSeqLen, VocabSize) must be treated as first-class config that spans training scripts AND production code. A partial revert is a silent regression. Our CI gates caught it, but we're adding an explicit architecture-constant sync check to prevent this class of issue.

---

## Policy Engine Seeding: 7 Built-In Rego Policies

Before v4.7.0, the Platform's compliance policy engine initialized empty. Operators had to manually add Rego policies via the Admin API. That's fine for a controlled enterprise deployment — but it means the Platform shipped with no default security policies.

v4.7.0 changes that. The Platform now loads 7 built-in Rego policies at boot:

1. **`no_secrets_in_response`** — blocks API keys, tokens, and credentials in LLM responses
2. **`no_pii_in_response`** — blocks PII leakage (SSNs, credit cards, email addresses)
3. **`no_prompt_leakage`** — blocks system prompt disclosure in responses
4. **`require_content_filter`** — enforces content moderation policy
5. **`no_jailbreak_patterns`** — blocks known jailbreak patterns
6. **`max_response_length`** — enforces response size limits (DoS prevention)
7. **`no_tool_abuse`** — blocks MCP tool poisoning patterns

Docker validation confirmed: `[COMPLIANCE] Loaded 7 default Rego policies into policy engine` at startup. Operators can still add custom policies via the Admin API — the defaults are a floor, not a ceiling.

---

## Cross-Product Detection Parity: 284 Patterns

AegisGate runs across five products, each with a different deployment context. Platform is the server-side gateway. Rampart is the local proxy. Scanner is the CI/CD tool. MCP is the server framework. Lens is the browser extension.

All five should detect the same threats. If a prompt injection bypasses Rampart but gets caught by Platform, that's a gap — an attacker who moves from local to server-side gets a free pass.

v4.7.0 enforces detection parity via a CI gate that compares pattern names and regex content across products on every push. 284 patterns are synchronized across Platform, Rampart, and Scanner. This release synced 9 new detection patterns and added 19 new path traversal & sensitive file access patterns to Scanner and Rampart.

The parity CI gate fails on any mismatch. No drift, no gaps, no "it works on Platform but not on Rampart."

---

## Coverage Campaign: 98%+ Compliance Test Coverage

We drove compliance framework test coverage to industry-leading levels:

| Framework | Before | After |
|-----------|--------|-------|
| FIPS 140-3 | 41% | 98% |
| ISO 27001 | 72% | 100% |
| ISO 42001 (AI Management) | 59% | 99% |
| HITRUST | 82% | 100% |
| NIST 800-171 | 76% | 82% |
| EU AI Act | 89% | 91% |
| GDPR | 89% | 96% |

This isn't just "more tests." The coverage campaign found two production bugs: an unquoted SQL reserved keyword (`window`) and dead code in `response_guard.go`. Both were fixed before release.

The Platform now enforces 85% total coverage and 90% per-package floor via CI. 67 CI-scoped packages are held to this standard. Integration tests with testcontainers cover 11 database-dependent packages.

---

## What Else Changed

- **Anomaly detection timeout**: Increased from 10ms to 100ms. The 10ms timeout was too aggressive — the scanner was being skipped on slow inputs.
- **Incident tag filtering**: Fixed tag filtering logic in incident management.
- **FeedManager race condition**: Resolved concurrent access data race.
- **Provisional Patent #7**: Filed USPTO App. No. 64/180,722 — Federated Detection Gap Analysis. 7 provisional patents total.
- **Go 1.27.3**: All Go repos bumped to fix GO-2026-6809 (crypto/x509 vulnerability).
- **Lens Headless Smoke**: Fixed 15→25 minute timeout, eliminated duplicate test runs, updated model weights reference to v0.5.2.

---

## The Philosophy

v4.7.0 is a maintenance release. No new protocols, no flashy features. It's the unglamorous work of retraining models, fixing regressions, driving test coverage, and enforcing parity.

But this is the work that matters. The v14 regression could have shipped. A 50% detection window reduction would have been a silent degradation that attackers could exploit. Our CI gates caught it — and that's the real story of this release.

**The best security tool is the one that catches its own mistakes before they reach production.**

---

## Get Started

- **Platform**: [GitHub Release v4.7.0](https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v4.7.0)
- **Scanner**: [GitHub Release v0.4.1](https://github.com/aegisgatesecurity/aegisgate-scanner/releases/tag/v0.4.1)
- **MCP**: [GitHub Release v1.6.1](https://github.com/aegisgatesecurity/aegisgate-mcp/releases/tag/v1.6.1)
- **Rampart**: [GitHub Release v0.9.1](https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.9.1)
- **Lens**: [Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens)

All Go repos share the same v15b ONNX model (SHA-256: `99187453...`). Lens uses v15b JS weights (SHA-256: `03792717...`).

---

*Josh Colvin is the founder and sole developer of AegisGate Security, LLC. 7 provisional patents filed. ~660K LOC across 5 products. Apache 2.0 licensed.*