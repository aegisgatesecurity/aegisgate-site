---
title: "AegisGate Lens — Changelog"
description: "Version history for AegisGate Lens. Each version documented with what changed, what was fixed, and what was added."
type: "docs"
weight: 4
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-lens -->
<!-- If you change any number below, update the repo FIRST, then propagate to all surfaces. -->

<div class="alert alert-info">
<strong>🛡️ AegisGate Lens v0.3.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-lens">aegisgate-lens repo</a>)</em>

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


# AegisGate Lens — Changelog

The full source-of-truth changelog is at [github.com/aegisgatesecurity/aegisgate-lens/blob/release/v0.3.0/CHANGELOG.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/release/v0.3.0/CHANGELOG.md). This page mirrors the recent versions.

---

## [v0.3.0] - 2026-08-05

### Added
- **ML threat detector** — Char CNN-BiLSTM with Attention (1.58M parameters) detects adversarial prompt injections including instruction override, roleplay injection, and obfuscated commands. Pure JavaScript inference, no WASM, no onnxruntime, no external dependencies. Runs asynchronously after regex detection for defense-in-depth.
- **DeepSeek provider** — `chat.deepseek.com` with verified selectors for textarea input and send button.
- **Meta AI provider** — `meta.ai` / `www.meta.ai` with verified selectors for text input.
- **Lazy model loading** — 3.7MB model weights (float16, gzip-compressed) load on first `classify()` call, not on page load.
- **504 total tests** — 492 unit + 12 ML performance/stress tests.
- **ML performance benchmark** — latency, accuracy, and stress test metrics in `test/benchmarks/results/v0.3.0-ml-perf.json`.

### Changed
- **CSP tightened** — `script-src 'self'; object-src 'self'` only. Removed `wasm-unsafe-eval`. No `eval()`, no `Function()`, no WASM.
- **Extension size reduced from 25MB to 4.2MB** — removed ONNX Runtime Web (18.4MB WASM) and float32 ONNX model (6.1MB). Replaced with pure JS inference (488 lines) and float16 JSON weights (3.7MB).
- **Detection pipeline** — `onInput()` now runs sync regex immediately (~0.3ms), then fires async ML enrichment that updates the banner when ready (~5ms in Chrome).
- **Welcome page** — refreshed for v0.3.0 with 5-facet feature grid, ML badge, updated privacy promise.
- **Legal docs** — TERMS-OF-SERVICE, SECURITY, PRODUCT-SUMMARY, PRIVACY-POLICY updated for v0.3.0 with ML disclosure, DeepSeek/Meta AI, and lazy loading details.
- **MODEL-CARD** — full ML model card with architecture, evaluation metrics, performance benchmarks, limitations, and ethical considerations.
- **NO-EXTERNAL-DEPS** — updated to reflect pure JS inference (WASM exception removed).

### Fixed
- **ML pipeline activation** — `classify()` was never called at runtime. Wired through `detectPromptAsync()` → `onInput()` → banner enrichment.
- **Manifest** — removed invalid `privacy_policy` and `privacy_policy_url` keys (CWS handles these in the developer dashboard).

---

## [v0.2.0] - 2026-07-27

### Added
- **19 new compliance patterns**: MITRE ATLAS techniques, OWASP LLM Top 10, EU AI Act articles
- **4 new healthcare PII patterns**: MRN, ICD-10-CM, NPI, SSN last-4
- **4 new API key patterns**: Cursor, Vercel, Groq, Replicate
- **146 direct secrets unit tests** (was 0 for v0.1.4 patterns)
- **734 total automated tests** (up from 647 in v0.1.4)
- **Bearer token support** for self-hosted AegisGate Platform backends
- **OPSEC hardening**: Pre-commit hook, CI scan job, unified OPSEC scanner

### Changed
- **Pattern count**: 132 → 151 regex patterns across 4 detection facets
- **Test count**: 647 → 734 automated tests
- **All version strings** bumped to v0.2.0

### Fixed
- **Schema validation bugs**: 4 schema bugs fixed
- **Production bug**: SW's inline M.isValidFPReports was stale
- **Production bug**: enqueueFP did not dedup by client_id
- **8 failing tests** fixed

---

## [v0.1.4] - 2026-07-10

### Added
- Initial public release on CWS.
- 120 regex patterns across 4 facets.
- 8 AI provider integrations.
- In-page banner with PII/secrets/XSS/compliance detection.
- Chrome Manifest V3 extension.

---

## Versioning

AegisGate Lens follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: breaking changes (e.g., removed detection category, manifest changes)
- **MINOR**: backward-compatible features (e.g., new detection category, new option)
- **PATCH**: backward-compatible bug fixes (e.g., regex fix, perf improvement)

Pre-1.0 versions (0.x.y) may include breaking changes in MINOR versions (per the SemVer convention for pre-1.0).

## See Also

- [GitHub Releases](https://github.com/aegisgatesecurity/aegisgate-lens/releases) — full version history with signed artifacts
- [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/release/v0.3.0/docs/SECURITY.md) — vulnerability disclosure policy
- [Architecture](/lens/architecture/) — how the 5-facet detection system works
- [ML Model Card](https://github.com/aegisgatesecurity/aegisgate-lens/blob/release/v0.3.0/docs/MODEL-CARD.md) — ML architecture, evaluation, limitations

Report issues at the [Lens GitHub Issues](https://github.com/aegisgatesecurity/aegisgate-lens/issues).