---
title: "AegisGate Lens — Changelog"
description: "Version history for AegisGate Lens. Each version documented with what changed, what was fixed, and what was added."
type: "docs"
weight: 4
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


# AegisGate Lens — Changelog

The full source-of-truth changelog is at [github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/CHANGELOG.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/CHANGELOG.md). This page mirrors the recent versions.

---

## [v0.1.3] - 2026-07-10

### Added
- **B-tier work (12 commits)**: B1 (smoke 6→16 cases), B1-D1 (click helper + dismiss flow), B2 (load-module.js improvements), B3 (a11y audit + prefers-reduced-motion), B4 (inline style cleanup), B5 (responsive icons + root manifest fix), B6 (CI integration with 5 follow-up fixes)
- **F-1 through F-11 isolation tests** (7 test cases in test/unit/f1-isolation.test.mjs)
- **v0.1.4 patch**: 4-4-4 CC pattern rejection in pii_phone_intl_loose, 3 ID-shape patterns tightened with postProcess check (pii_letter_only_id, pii_id_generic_alphanumeric, pii_passport_generic)
- **M1-M4 docs**: API.md, CONTRIBUTING.md refresh, Mermaid arch diagram, SECURITY.md
- **M5**: B1-D2 dead code cleanup

### Fixed
- **3 escape bugs** in regex patterns: literal `\\b` → `\b` (word boundary metachar), literal `\\d` → `\d` (digit metachar). These were from Python scripts writing the wrong escape level to the file.
- **pii_phone_intl_loose false positives**: reduced from 86 to 9 FPs on 6,500 WildChat corpus (via 4-4-4 CC pattern rejection)
- **3 new schema categories over-firing**: pii_letter_only_id, pii_id_generic_alphanumeric, pii_passport_generic (fixed via postProcess check requiring ID-label context)

### Changed
- Test count: 412/412 → 431/431 (v0.1.3), then 431/431 → 500/500 (v0.1.4, +69 new tests including the F-7 e2e category)
- Pattern count: 120 → 132 (+12 new patterns, mostly in compliance)
- FPR on 6,500 WildChat: 4.14% → 2.31% (44% reduction)

### Test coverage
- Node unit: 500/500 PASS (carried from v0.1.4)
- Go unit: 3/3 PASS
- Headless smoke: 16/16 PASS (real Chrome 150)
- Platform FPR test: 2.31% on 6,500 WildChat (better than the 2.43% v0.1.2 baseline)

---

## [v0.1.2] - 2026-07-09

### Added
- **F-2 fix**: Unified opt-in storage key + nested-object shape (commit 6f1bcfd). welcome.js, popup.js, background.js all use the canonical `STORAGE_KEYS.OPT_IN` key.
- **F-10 fix**: popup.js uses `chrome.runtime.sendMessage` with `GET_OPT_IN_STATE` to the SW (commit 1b17d22). Falls back to direct storage on timeout.
- **F-12 fix**: CWS Yellow Argon — rewrote "what it catches" section as functional-category prose; removed named competitors (Lakera, Microsoft Prompt Shields, Cisco AI Defense).
- **F-13 fix**: removed unused `alarms` permission (commit ecaf6cb).
- **F-14 fix**: re-added `scripting` permission needed for dynamic content script injection (commit c5df939).
- **F-1 fix**: synced manifest.json, selectors.js, and SW providerDomains to 13 canonical hosts (commit 7f377c5). Removed stale duckduckgo.com, x.com, twitter.com.
- **Manifest fix**: root manifest.json icon paths corrected (no `src/` prefix).
- **8 F-* doc fixes**: CHANGELOG, ARCHITECTURE, README, PHASE-* docs moved to .plans/v0.2-burndown/.

### Fixed
- The v0.1.1 source manifest had stale hosts that didn't match selectors.js. The CWS-shipped build/manifest.json was manually patched. v0.1.2 unifies them.
- 405/405 Node tests pass.

---

## [v0.1.1] - 2026-07-08

### Added
- **F-3, F-4, F-5, F-8 fixes**: doc accuracy
  - F-3: CHANGELOG "6 detection facets" → "4 regex detection facets, no ML" (commit f83ddd1)
  - F-4: ARCHITECTURE "Data retention: 90 days" → "Local-only by default" (commit 099aa51)
  - F-5: 27 v0.2 research docs moved to .plans/v0.2-burndown/ (gitignored)
  - F-8: README "6/10" OWASP → "5/10" with footnote (commit b51bd11)
- **v0.1.1 code-quality plan** (Bucket A-D): split large files (banner-ui.js into 3, pii.js into 4 sub-files), added constants.js, bootstrap.js, typedefs.js

### Fixed
- 9 F-* doc bugs and repo hygiene issues

---

## [v0.1.0-beta] - 2026-07-04

### Added
- Initial public-beta release
- 4-facet regex detection: PII (43 patterns), Secrets (42 patterns), XSS (12 patterns), Compliance (5 patterns) — 114 total
- 8 supported AI providers: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok
- 12 privacy non-negotiables
- Banner UI with severity colors, dismiss form, FP report opt-in
- Popup with opt-in state and Platform upgrade CTA
- Welcome page with opt-in/dismiss choice
- 369/369 Node tests pass
- 7/7 ship-readiness gates pass
- Apache 2.0 license
- Zero external dependencies
- Chrome Web Store submission

### Known limitations (addressed in v0.1.1+)
- Manifest host staleness (F-1)
- Storage key inconsistency (F-2)
- Doc inaccuracies (F-3, F-4, F-5, F-8)
- Schema validation gaps (v0.1.2)
- No F-1 isolation test (added in v0.1.3; carried forward to v0.1.4)

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

## Roadmap (v0.2.0)

Planned for v0.2.0 (timeline TBD, after CWS approval of v0.1.2):
- **2 missing facets**: Toxicity + Prompt-Injection
- **TinyML model** (1-2MB transformer) for ambiguous cases
- **Firefox/Edge support**
- **Public benchmark dataset release**
- **Third-party security audit** (Cure53 / Trail of Bits / NCC Group)
- **Marketing site refresh** (aegisgatesecurity.io/lens/)
- **Lighthouse CI integration**

## See Also

- [GitHub Releases](https://github.com/aegisgatesecurity/aegisgate-lens/releases) — full version history with signed artifacts
- [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.1.4/docs/SECURITY.md) — vulnerability disclosure policy
- [Architecture](/lens/architecture/) — what changed in each version's architecture

Report issues at the [Lens GitHub Issues](https://github.com/aegisgatesecurity/aegisgate-lens/issues).
