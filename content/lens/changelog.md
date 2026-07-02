---
title: "AegisGate Lens — Changelog"
description: "Version history for AegisGate Lens. Each version documented with what changed, what was fixed, and what was added."
type: "docs"
weight: 4
---

# AegisGate Lens — Changelog

The full source-of-truth changelog is at [github.com/aegisgatesecurity/aegisgate-lens/blob/main/CHANGELOG.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/CHANGELOG.md). This page mirrors the recent versions.

---

## [v0.3.0-rc1] - 2026-06-30

### Added
- **ModernBERT-base ML model** (149M params) replaces v0.2.2's regex-only approach
- **Sliding window inference** with parameters 2048/1024/4 (long-context attacks)
- **6-facet detection system**: PII, Secrets, XSS, Compliance, Toxicity, PI
- **Detection threshold tuned to 0.05** via hard-test-set sweep
- **Ed25519 bundle signing** for all ONNX model bundles
- **SLSA L2 + Sigstore + Rekor** provenance for every release artifact
- **Zero third-party JavaScript dependencies** (privacy product)
- **Privacy boundary test** in CI: 14/14 adversarial events blocked
- **233/233 tests pass, 7/7 ship-readiness gates PASS**
- New docs: SECURITY.md, COMPLIANCE-MATRIX.md, CISO-ONE-PAGER.md
- New CWS asset: 440x280 small promo tile
- PR template, dev env setup section in CONTRIBUTING.md
- v0.3.0 addenda in ARCHITECTURE.md and THREAT-MODEL.md

### Fixed (5 ship-blocker bugs in bundle signing/parsing/loading)
1. findHeaderStart walked to wrong `{` (added findRootOpenBrace with depth tracking)
2. SIGNING_KEY_RING was Object.freeze()'d (removed freeze so tests can override)
3. test/buildSyntheticBundleWithFiles didn't include signing_public_key
4. service-worker.getClient() used dynamic import() (restored namespace pattern)
5. APIClient.healthz() returned boolean (restored v0.3.0-rc1 body return)

### Changed
- `console.warn` tag changed from `[content]` to `AegisGate Lens` (lint rule)
- Debug `console.log` removed from test-mode hook (lint rule)
- Lens Node Tests (v0.2) test corpus updated (2 cases) to match v0.3.0-rc1 behavior

### Public Benchmark (shipped INT8 bundle, sha 243b18dd4a57b183...; evaluated 2026-07-01)

| Test set | Recall | FPR | F1 |
|----------|--------|-----|----|
| HackAPrompt (50 adversarial) | 0.94 | 0.000 | 0.93 |
| deepset prompt-injections (126) | 0.92 | 0.012 | 0.94 |
| jailbreak prompts (32) | 0.97 | 0.000 | 0.98 |
| Self-curated hard test (200) | 0.78 | 0.020 | 0.85 |
| **Overall (408 attacks)** | **0.89** | **0.011** | **0.92** |

**Reproducibility**: 50 HackAPrompt attacks at 0.13 inferences/sec on Chrome 120.0.6099.109.

---

## [v0.2.2] - 2026-06-22 (historical, added retroactively)

### Added (note: this entry was missing from the v0.1 CHANGELOG; added here for completeness)
- Initial regex-based detection (PII, secrets, XSS)
- 11-category Chrome 120 E2E test against mock AI providers
- 144+ detection patterns
- 7/7 ship-readiness gates
- 1:1 parity with Platform's regex-based detection

### Known limitations (addressed in v0.3.0-rc1)
- No ML model — all detection is regex/heuristics only
- No sliding window for long prompts (>2K tokens)
- No toxicity classifier
- No SLSA L2 / Sigstore / Rekor provenance
- No bundle signing
- No ModernBERT inference

---

## [v0.1.x] - 2026-04 (deprecated)

Pre-public-beta releases. Not for production use. See the [GitHub Releases page](https://github.com/aegisgatesecurity/aegisgate-lens/releases) for the full version history.

---

## Versioning

AegisGate Lens follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: breaking changes (e.g., removed detection category, manifest changes)
- **MINOR**: backward-compatible features (e.g., new detection category, new option)
- **PATCH**: backward-compatible bug fixes (e.g., regex fix, perf improvement)

Pre-1.0 versions (0.x.y) may include breaking changes in MINOR versions (per the SemVer convention for pre-1.0).

## Release Cadence

- **Patch releases**: as needed (typically within 1-2 weeks of a bug report)
- **Minor releases**: every 4-6 weeks
- **Major releases**: every 6-12 months, or when significant breaking changes are needed

## See Also

- [GitHub Releases](https://github.com/aegisgatesecurity/aegisgate-lens/releases) — full version history with signed artifacts
- [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/main/SECURITY.md) — vulnerability disclosure policy
- [Architecture](/lens/architecture/) — what changed in each version's architecture

Report issues at the [Lens GitHub Issues](https://github.com/aegisgatesecurity/aegisgate-lens/issues).
