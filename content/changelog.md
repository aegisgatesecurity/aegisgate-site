---
title: "Changelog"
description: "Release history and version notes for AegisGate Security Platform"
type: "changelog"
---

## Changelog

All notable changes to AegisGate Security Platform are documented here.

### v3.3.0-beta.2 - 2026-06-08 - EU AI Act Beta (Integrity Hotfix) 🩹

_Released 2026-06-08. This is a code-content fix, not a security fix. v3.3.0-beta.1 was tagged on the same day, but a release-integrity review discovered that 5 commits implementing the EU AI Act work (Phases 1.1, 1.2, 1.3) and the gitignore enforcement work had never been merged to `main`. v3.3.0-beta.2 fixes this integrity gap. **No CVE, no vulnerability, no leaked data.** The missing work was always present on a feature branch; it was never in any public release._

**What changed vs. v3.3.0-beta.1:**
- ✅ **EU AI Act sub-package** (`pkg/compliance/eu-ai-act/`, 82 controls) — **NOW ACTUALLY INCLUDED** (was missing from beta.1)
- ✅ **EU AI Act customer 1-pager** (`docs/compliance/eu-ai-act.md`, 104 lines) — **NOW INCLUDED**
- ✅ **EU AI Act full control mapping** (`docs/compliance/eu-ai-act-mapping.md`, 438 lines) — **NOW INCLUDED**
- ✅ **Marketing content files** (`content/pricing.md`, `content/tech.md`, `content/changelog.md`) — **NOW INCLUDED**
- ✅ **Website update** (`docs/website/index.html`, EU AI Act section) — **NOW INCLUDED**
- ✅ **Pre-commit guard rail** (`.githooks/pre-commit` blocks `plans/` + `legal-docs/` staging) — **NOW ACTIVE**
- ✅ **`.gitignore` policy header** (12-line "no force-add" directive) — **NOW IN EFFECT**
- ✅ **gofmt** — 4 files cleaned up (CI caught 4 files needing formatting in the merge)
- ✅ **Action versions** — all 8 actions in `.github/workflows/security.yml` bumped to latest (Node 20 → Node 24, fixes GitHub deprecation warnings)
- ✅ **gitleaks CI re-enabled** — free OSS license configured as `GITLEAKS_LICENSE` GitHub secret (was disabled in beta.1 due to paid license requirement)
- ✅ **15 P3/P4 golangci-lint issues fixed** (in commit `8b69aa2`, pre-beta.2)

**Tiers, modules, and pricing** — unchanged from beta.1.

**For full release notes see [CHANGELOG.md in the GitHub repo](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/CHANGELOG.md) and the [v3.3.0-beta.2 release page](https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.3.0-beta.2).**

### v3.3.0-beta.1 - 2026-06-08 - EU AI Act Beta (Superseded)

> **Note:** This release was superseded by [v3.3.0-beta.2](#v330-beta2---2026-06-08---eu-ai-act-beta-integrity-hotfix-) on the same day (2026-06-08) due to a release-integrity gap: the EU AI Act sub-package and related work were advertised in the CHANGELOG but had not been merged to `main` at the time of the v3.3.0-beta.1 tag. The v3.3.0-beta.1 tag is preserved at SHA `64d0ab5` for historical record; do not use it. Use [v3.3.0-beta.2](https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.3.0-beta.2) instead.

_Released 2026-06-08. This is a BETA release, not a commercial launch. Professional+ tier and module buy buttons are intentionally hidden pending counsel review and the v3.4.0 paid pentest. Starter and Developer tiers remain live and sellable._

**Highlights:**
- **EU AI Act Compliance Module (NEW)** — 82 controls across 8 categories of the EU AI Act, gated by the existing license + module framework. Available to Professional+ tier via the (hidden) module buy button.
- **7-tool security self-attestation** — gosec, govulncheck, golangci-lint, gitleaks (837→0 findings via allowlist), trivy, syft, nmap. Self-attested as production-ready for beta; full pentest planned for v3.4.0+.
- **v3.3.1 hardening pass** — Dockerfile base images pinned to SHA256 digests, K8s seccompProfile.RuntimeDefault added, all 16 P1+P2 golangci-lint findings fixed.
- **Minimum-viable legal kit** — 6 v2.0 customer-facing docs + 1 Beta User Agreement, all published at `/legal/`. Self-drafted, not legal advice; counsel review deferred to v3.4.0+.
- **Buy-Button Visibility** — Professional tier (2 buttons) and all 6 module buy buttons are hidden in the v3.3.0-beta.2 web UI with a "coming-soon" placeholder. The 4 Starter + Developer buttons remain live.

**Available tiers in this beta:**
- Community (free) — unchanged
- Starter ($29/mo or $290/yr) — Buy Button live
- Developer ($79/mo or $790/yr) — Buy Button live
- Professional ($499/mo or $4990/yr) — hidden pending v3.3.0-GA
- Enterprise (custom) — contact sales

**Module availability:**
- All 6 modules (HIPAA, PCI-DSS, SOC 2, ISO 42001, FedRAMP, FIPS 140-2/140-3) are hidden in this beta. EU AI Act is the only new module addition; the other 6 were already available in v3.2.0 but are now gated behind the same hidden placeholder.

**Verified:**
- `go build ./...` exit 0
- `go test ./...` 49 packages PASS, 0 FAIL
- gitleaks 0 findings (allowlist in `.gitleaks.toml`)
- golangci-lint 15 P3/P4 issues (deferred)
- Security CI: 8 jobs all green
- Release workflow: binary + container + SBOM attestation all successful

**For full release notes see [CHANGELOG.md in the GitHub repo](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/CHANGELOG.md) and the [v3.3.0-beta.1 release page](https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.3.0-beta.1) (superseded — see v3.3.0-beta.2 above).**

### v3.2.0 - In Progress (Phases 1–5 complete; release prep next)

_Released 2026-06-05 (Phase 1, module extraction) — final release after Phase 6._

#### Trust Framework — 5th Pillar (Phase 4) — _Completed 2026-06-05_

The newest architectural pillar: continuous, per-agent cryptographic trust scoring with Ed25519-signed attestations. The Trust Framework ties the four protocol pillars (HTTP API, MCP, A2A, RESPONSE) into a single, auditable trust story.

- **Per-session trust score** — `GET /api/v1/trust/score?session=ID` returns a 0–100 score with a component breakdown (threat blocks, tool risk average, A2A capabilities used, response findings).
- **Signed attestations** — every event emits an Ed25519-signed attestation. Verify offline with the public key.
- **Attestations feed** — `GET /api/v1/trust/attestations?since=TIMESTAMP&limit=100` returns the rolling event log.
- **Professional+ gate** — the `TRUST_PILLAR_ENABLED` feature flag activates the API for Professional and Enterprise tiers. Lower tiers receive HTTP 402.
- **Powers the Compliance Scan Engine** — the trust layer is the substrate that the `/api/v1/compliance/scan` and `/api/v1/compliance/report` endpoints query.

#### Compliance Modules (Phase 1, Module Extraction) — _Completed 2026-06-05_

Six billable compliance modules are now available as add-ons to any paid tier. Prices are locked from the pricing-table decision (2026-06-04) and will not change for existing customers (Q2: lock-in at purchase price forever).

| Module | Price | Required Tier | Description |
|---|---|---|---|
| HIPAA | $99/mo | Developer+ | HIPAA-compliant logging, PHI detection, BAA support |
| PCI-DSS | $99/mo | Developer+ | Payment card data detection, PCI-scoped audit logs |
| SOC 2 | $149/mo | Developer+ | SOC 2 Type II control mapping, evidence collection |
| ISO 42001 | $79/mo | Professional+ | ISO/IEC 42001 AI management system controls |
| FedRAMP | $499/mo | Professional+ | FedRAMP Moderate/High control mapping, continuous monitoring |
| FIPS 140-2/140-3 | $299/mo | Professional+ | FIPS-validated cryptography enforcement, HSM integration |

Modules are purchased via Stripe checkout and activated instantly on the customer's license via the existing webhook (Q1: instant via Stripe webhook). All 6 module products are live in the Stripe dashboard and rendered on the [Pricing page](/pricing/).

#### Pro Tier Price Change (Phase 2) — _Completed 2026-06-05_

Pro tier is now **$499/mo** (was $249/mo) and **$4,990/yr** (was $2,490/yr). The change is in the Stripe dashboard, billing-config.json, the pricing page, and the tier-comparison docs. Existing Pro customers would be grandfathered at $249/mo per the locked decision Q2 (lock-in at purchase price forever); however, no Pro customers exist at the time of this release, so the grandfathering code path is unexercised.

The Pro tier also picked up the **Trust Framework** and the **Compliance Scan API** as Professional+ features in v3.2.0 — see the [Tier Comparison](/docs/tiers/) page for the updated matrix.

#### Compliance Scan Engine (Phase 3) — _Completed 2026-06-05_

Two new public endpoints, available on Developer+ tiers (with a valid license key):

- `GET /api/v1/compliance/scan` — returns a snapshot of every enforced framework: total controls, enforced controls, compliance percentage, and any missing modules that would close gaps. Response shape:

  ```json
  { "frameworks": [
      { "name": "hipaa", "controls_total": 54, "controls_enforced": 48, "compliance_pct": 88.9, "missing_modules": [] },
      { "name": "pci",   "controls_total": 64, "controls_enforced": 64, "compliance_pct": 100.0, "missing_modules": [] }
  ] }
  ```

- `GET /api/v1/compliance/report?framework=hipaa` — returns the full control list for a single framework, with `enforced`, `description`, and the source `module`. Suitable for auditor export.

The scan engine is backed by the trust layer's attestation feed (Phase 4), so control coverage reflects the actual enforced behavior, not a static catalog.

#### Website Refresh for the 5-Pillar Story (Phase 5) — _Completed 2026-06-05_

The marketing site has been updated to reflect the v3.2.0 5-pillar architecture:

- [Homepage](/) — the hero card grid now lists the four protocol pillars plus a highlighted **Trust Framework** card (new in v3.2.0).
- [Tech page](/tech/) — the "Five Pillars" section is reordered (HTTP API, MCP, A2A, RESPONSE, Trust) and the Trust Framework gets its own detail table (8 components, 2 API endpoints, attestation format, tier gating).
- [Pricing page](/pricing/) — Pro tier is now $499/mo and the 6 compliance modules are listed with tier requirements and Stripe buy buttons.
- [Tier Comparison](/docs/tiers/) — Pro price updated, new "Trust Framework" and "Compliance Scan API" rows added.

#### Upcoming in v3.2.0
- **Release engineering** — `VERSION` bump, GPG-signed annotated tag `v3.2.0`, GitHub Release with notes, SBOM re-generation, cosign signing, container image push to GHCR. (Phase 6.)

---

### v3.1.1 - Tier Rate Limit Drift Fix

_Released 2026-06-05_

This release fixes a critical drift between the website-promised tier limits and the code-enforced tier limits. Customers who paid for Starter, Developer, or Professional were silently receiving 40–70% underdelivery on rate limits and concurrent users/agents.

#### Tier Rate Limit Corrections
- **Starter tier** — modeled as a first-class tier for the first time (was faked via a `starter_mode` feature flag with 50% underdelivery)
- **Developer tier** — proxy 600 → 1000 RPM, MCP 300 → 500 RPM, users 10 → 25, agents 5 → 25
- **Professional tier** — proxy 3000 → 10000 RPM, MCP 1500 → 5000 RPM, users 50 → 100, agents 25 → 100
- **Enterprise tier** — unchanged (-1/-1, unlimited)

#### Webhook Hardening
- Tier validation in the Stripe checkout webhook: unknown values are now rejected with a structured `invalid_tier` error instead of silently generating a license for an arbitrary string
- Tier alias normalization (e.g., `"pro"` → `"professional"`, `"free"` → `"community"`) for consistent downstream behavior

#### Tooling
- Go 1.26.3 → 1.26.4 (security fix for `crypto/x509` and `net/textproto` stdlib vulnerabilities)
- Binary `aegisgate-platform` is no longer tracked in git; use `go build` to compile from source (see README "Build from Source")

#### v2.x Status
**v2.x is end-of-life as of 2026-12-31.** No security updates will be issued after that date. v3.x is the only actively supported line. See the [v2.x EOL notice](#) for migration guidance.

---

### v3.1.0 - Current

_Released 2026-05-27_

#### New Security Packages
- **atlas** — MITRE ATLAS adversarial AI threat detection (66 techniques, 100% coverage)
- **computeruse** — Claude Computer Use security guard (URL denylist, screenshots, keystrokes)
- **correlation** — Cross-protocol threat correlation engine (94.4% coverage)
- **trust/identity** — Agent cryptographic identity (ECDSA P-256, 90.9% coverage)

#### Threat Modeling
- Comprehensive STRIDE analysis for all packages
- CVSS scoring for 25+ threats (7 Critical, 11 High, 7 Medium)
- MITRE ATLAS full coverage (ATLAS-MCP, ATLAS-A2A, ATLAS-LLM)
- Full documentation at /plans/THREAT-MODEL-STRIDE.md

#### Security Improvements
- **Fail-Secure Bridge Design** — Insecure fallback replaced with fail-closed behavior
- **Prompt Injection Detection** — 8 new patterns added (45+ total)
- **OWASP LLM Top 10** — Full implementation complete
- **MITRE ATLAS** — 66 adversarial AI techniques (up from 52)

#### CI/CD Improvements
- DCO bot detection: EMAIL field check for [bot] patterns
- Build error fix: webhook server return statements
- GOFLAGS=-mod=mod: security workflow dependency listing

#### Key Metrics
- Test Coverage: **97.8%** (up from 97.7%)
- Total Tests: **5,484** (up from 2,548)
- Security Coverage: **92.4%**
- Compliance Coverage: **98.7%**

---

### v3.0.0

_Released 2026-05-20_

- ACP Protocol security layer with HMAC verification
- Agent Response Security (RESPONSE package) — PII/secret scanning
- Five-pillar architecture: HTTP API, MCP, A2A, ACP, RESPONSE (the Trust Framework was added as the cross-cutting 5th pillar in v3.2.0)
- 97.7% test coverage, 2,548 tests
- OWASP LLM Top 10 patterns (49 patterns)

---

### v2.0.1

_Released 2026-05-06_

- FAIL-CLOSED AUDIT: 9 critical + 5 high vulnerabilities fixed
- A2A capability persistence — capabilities survive pod restarts
- Comprehensive health checks — /health verifies all subsystems
- SLA/SLO definitions — new /api/v1/sla endpoint
- gosec alerts resolved — directory/file permissions, error handling

---

### v2.0.0

_Released 2026-05-05_

#### A2A Agent Security (Major Release)
- mTLS authentication — X.509 certificate validation for agent identity
- HMAC-SHA256 integrity — Full request body signature verification
- Capability enforcement — Least-privilege per agent from YAML config
- Token-bucket rate limiting — Per-agent request quotas (default 100 req/min)
- License-aware A2A enforcement — ECDSA P-256 cryptographic validation

#### Observability
- A2A Prometheus metrics (a2a_license_failures_total, a2a_capability_denials_total, etc.)
- A2A startup status logging in server logs

---

_For older releases, see [GitHub Releases](https://github.com/aegisgatesecurity/aegisgate-platform/releases)._
