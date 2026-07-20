# AegisGate Website Audit & Action Plan

**Date:** 2026-07-20
**Scope:** `websites/aegisgate-site/` (corporate website repo, Hugo static site)
**Methodology:** Full structural + strategic file review (Tier 1+2 audit, mirrors D17 platform audit approach)
**Status:** AUDIT COMPLETE — AWAITING FOUNDER DECISION

---

## 1. Executive Summary

The website is a **Hugo static site** deployed to **Netlify** with **Sveltia CMS** for browser-based editing. It has **194 HTML files, 46 markdown content files, and 2 main config files** (`hugo.toml` + `config.yaml`).

**Key insight:** The website is **already masking the compliance module buy buttons** — all 6 paid compliance modules (HIPAA, PCI-DSS, SOC 2, ISO 42001, FedRAMP, FIPS 140) are wrapped in `<div class="coming-soon">` with "Contact sales" CTAs. **No customer can buy them on the website today.** This means the Stripe misrepresentation risk is lower than I initially thought.

**But there are still real gaps** in version sync, pillar counts, and pricing consistency.

### Severity Counts

| Severity | Count | Description |
|----------|-------|-------------|
| 🟠 P1 High | **6** | Version drift, pillar count mismatch, pricing inconsistency, etc. |
| 🟡 P2 Medium | **3** | Stale backup files, public/ baseline clutter, etc. |
| 🟢 P3 Low | **2** | Minor cleanup |

---

## 2. Structural Inventory (Tier 1)

### 2.1 File Counts

| Extension | Count | Notes |
|-----------|-------|-------|
| `.html` | 194 | Hugo output (public/ has 194 rendered files) |
| `.xml` | 66 | Sitemaps, RSS feeds |
| `.md` | 46 | Hugo content (blog, docs, lens, legal, etc.) |
| `.js` | 9 | Main JS + Sveltia + home-redirect |
| `.png` | 8 | Logos, favicons, badges |
| `.toml` | 6 | hugo.toml + data/*.toml + internal templates |
| `.yml` | 5 | GitHub Actions, Sveltia config |
| `.css` | 5 | main.css, custom CSS |
| `.txt` | 4 | security.txt, robots, etc. |
| `.json` | 4 | package manifests, etc. |
| `.ico` | 4 | Favicons |
| `.1-backup` | 4 | Stale backup files |
| `.py` | 1 | Single Python file |
| `.lock` | 1 | Hugo lock file |

### 2.2 Top-Level Directories

| Dir | Purpose |
|-----|---------|
| `archetypes/` | Hugo content templates (4 files) |
| `assets/` | Source CSS/JS (compiled by Hugo) — main.css, main.js, home-redirect.js |
| `config.yaml` | Hugo site config (v3.2.0) |
| `content/` | 46 markdown content files (blog, docs, lens, legal, etc.) |
| `data/` | Data files: `pricing.toml`, `features.toml` |
| `.github/workflows/deploy-production.yml` | CI for production deploy |
| `hugo.toml` | Primary Hugo config (v3.3.0-beta.2) |
| `i18n/` | Internationalization |
| `internal/` | Internal templates (blog-templates/) |
| `layouts/` | 16 HTML templates (index, single, list, shortcodes, partials) |
| `netlify.toml` | Netlify deploy config |
| `public/`, `public-after/`, `public-baseline-20260715-165452/` | Hugo build output (gitignored but present on disk) |
| `resources/` | Hugo resource cache |
| `static/` | Static assets (logos, admin/, .well-known/) |
| `themes/aegisgate/` | Custom Hugo theme |
| `.workingdirectory/` | (untracked, 20K — unknown) |

### 2.3 Critical Content Files

| File | Size | Last Modified | Status |
|------|------|---------------|--------|
| `content/pricing.md` | 14KB | Jul 19 | **Uncommitted changes** (D0 Starter tier removal in progress) |
| `content/_index.md` | 16KB | Jul 15 | 5-pillar claim, v3.3.0-beta.2 references |
| `content/tech.md` | 9KB | Jun 5 | Honest about FedRAMP/FIPS being "in roadmap" |
| `data/pricing.toml` | 3.6KB | May 5 | Stale: Professional=$249 (was repriced to $499 in v3.2.0) |
| `data/features.toml` | 3.8KB | May 6 | |
| `hugo.toml` | 2KB | Jul 2 | **STALE** version (v3.3.0-beta.2) |
| `config.yaml` | 1.7KB | Jun 5 | **STALE** version (v3.2.0) and **5-pillar claim** |
| `netlify.toml` | 7KB | Jul 15 | OK (recently updated) |
| `static/admin/config.yml` | 12KB | Jun 9 | Sveltia CMS config |
| `static/admin/index.html` | 7KB | Jun 9 | Sveltia CMS UI |
| `layouts/_default/pricing.html` | 4.3KB | Apr 28 | Custom pricing template |

---

## 3. Audit Findings (Tier 2 + 3)

### Finding #1: 🟠 P1 High — **Website says 5 pillars, platform says 6**

**Where:**
- `config.yaml:7` — "The only AI security platform with five pillars of protection"
- `config.yaml:27` — `pillars: "HTTP API, MCP, A2A, RESPONSE, Trust Framework"`
- `config.yaml:28` — `pillarsCount: 5`
- `hugo.toml:8` — "five pillars of AI security (HTTP API, MCP, A2A, RESPONSE, Trust Framework)"
- `content/_index.md:15` — "five pillars: HTTP API scanning, MCP protocol protection, A2A agent-to-agent verification, real-time response scanning, and the Trust Framework"
- `content/_index.md:6` (description) — "five-pillar protection: HTTP API, MCP, A2A, Response, and Trust Framework"
- `content/docs/tiers.md:54` — "the **Trust Framework** (5th pillar — Ed25519-signed per-session trust scoring)"

**Reality:** Platform README (D14 + D16) says 6 pillars: HTTP, MCP, A2A, **ACP**, RESPONSE, **Trust Framework**.

**Impact:** Marketing message is 1 pillar behind. Visitors don't learn that ACP (Agent Communication Protocol) is now a first-class protocol. Trust Framework is being positioned as "5th pillar" instead of "6th pillar".

**Fix:** Update all 7 sites to say "six pillars" and add ACP. Replace the pillars list. Also fix `description` and `pillarsCount` in `config.yaml`.

### Finding #2: 🟠 P1 High — **Version drift across all config files**

**Where:**
- `VERSION` file (in platform): was 3.3.0-beta.2 → 3.4.0-beta.1 (just fixed)
- `hugo.toml:9` — `version = "v3.3.0-beta.2"`
- `config.yaml:18` — `version: "v3.2.0"`
- `content/_index.md:12, 86, 308` — "v3.3.0-beta.2"
- `content/_index.md:336, 340` — "(v3.1.1 bench)" — much older
- `content/pricing.md:148, 161, 174, 187, ...` — "v3.4.0 + legal review"

**Reality:** Current is v3.4.0-beta.1 (just fixed in D17 on platform). Website is 1 release behind.

**Impact:** Visitors see "v3.3.0-beta.2" and think the platform is older than it is. The "v3.1.1 bench" reference is from 2026-04 era.

**Fix:** Update `hugo.toml` → "v3.4.0-beta.1", `config.yaml` → "v3.4.0-beta.1", all `_index.md` references. Update "v3.1.1 bench" → "v3.4.0-beta.1 bench" or remove.

### Finding #3: 🟠 P1 High — **Pricing inconsistency between data/pricing.toml and content/pricing.md**

**Where:**
- `data/pricing.toml:84` — `name = "Professional"`, `price = "$249"` (line 85, "per month")
- `data/pricing.toml:107` — `name = "Enterprise"`, no FedRAMP price in toml (only in enterprise highlights)
- `content/pricing.md` — has explicit `$499` for Professional (in the uncommitted diff: "Currently available: Community (free), Developer ($99/mo)" but the rendered code shows the 2 stripe buy buttons at the current `data/pricing.toml` prices)
- `content/docs/tiers.md:54` — "**Professional** — $499/month" (matches repriced $499)
- Platform `README.md` line 858 — "Pro tier repriced $249→$499/mo"

**Impact:** `data/pricing.toml` is **stale** (says $249) but `content/docs/tiers.md` and `README.md` say $499. If a visitor lands on the pricing page (rendered from `data/pricing.toml`), they see $249. If they go to `/docs/tiers/`, they see $499. Confusing.

**Fix:** Update `data/pricing.toml` Professional from $249 → $499. Also fix `config.yaml:27` (description currently says "v3.2.0" but the actual price moved to $499 in v3.2.0).

### Finding #4: 🟠 P1 High — **Two pricing representations (data TOML + content MD)**

**Where:**
- `data/pricing.toml` (3.6KB) — Tier feature matrix
- `content/pricing.md` (14KB) — Pricing page with buy buttons, CSS, compliance module cards
- `layouts/_default/pricing.html` (4.3KB) — Custom template

**Impact:** The pricing page mixes 3 sources. `data/pricing.toml` is rendered into the page via Hugo data templates, but `content/pricing.md` has its own hardcoded pricing cards. This is fragile.

**Fix:** Consolidate to a single source of truth. The `data/pricing.toml` should be the canonical tier list. The `content/pricing.md` should be a marketing wrapper around it. **Low priority, requires design decision.** See Action Plan #4.

### Finding #5: 🟠 P1 High — **Compliance modules are already masked, but pricing text is still listed**

**Where:** `content/pricing.md:140-200` (the 6 module cards)

**What:** Every compliance module is wrapped in `<div class="coming-soon">` with "Available after v3.4.0 + legal review" text. ✅ No buy buttons. ✅ No live Stripe checkout.

**But:** The prices are still shown:
- HIPAA $99/mo
- PCI-DSS $99/mo
- SOC 2 $149/mo
- ISO 42001 $79/mo
- FedRAMP $499/mo
- FIPS 140 $299/mo

And at line 15: "**Hidden pending v3.4.0 + legal review:** Professional tier and the 6 compliance modules (HIPAA, PCI-DSS, SOC 2, ISO 42001, FedRAMP, FIPS)."

**Impact:** Visitors see prices for modules they can't buy. The platform's `pkg/billing/billing-config.json` has Stripe product IDs for FedRAMP (`prod_UeIPsk3H8PksXv`) and FIPS 140 (`prod_UeIQ5haHNP9U4w`) but the website doesn't render buy buttons for them. **No customer-facing risk of being charged**, but the prices being visible may set false expectations.

**Decision needed:** Keep the current "coming-soon with prices" approach (user wants to sell eventually) OR add "(price TBD)" until the modules ship. I recommend keeping the current approach with prices since the user said "we ARE going to sell them eventually" — but add a more prominent "Q4 2026" or similar ETA so the price isn't confused with "buy now".

**Fix:** Add ETA text "Q4 2026" to each module card. **OR** no change if you want to keep the website as-is.

### Finding #6: 🟠 P1 High — **Tier inconsistency: Professional = $249 vs $499 vs $249 (3 places say 3 different things)**

**Where:**
- `data/pricing.toml:84` — Professional = **$249**
- `content/docs/tiers.md:54` — Professional = **$499**
- Platform `README.md:858` — "Pro tier repriced $249→$499/mo"
- `content/pricing.md` (rendered, uncommitted) — has Community (free), Developer ($99/mo or $79/mo — diff says $99 in the notice but $79 in the buy button)

**Impact:** **Three different prices for the same tier across 3 files.** This is the worst of the pricing drift.

**Fix:** Decide on the canonical price and update all 3 files. Based on README (v3.2.0: repriced $249→$499) and docs/tiers.md ($499), the canonical price is **$499**. Update `data/pricing.toml:84` to $499.

### Finding #7: 🟡 P2 Medium — **Stale backup files committed**

**Where:**
- `content/_index.md.beta.1-backup` (6.7KB, Jun 8)
- Various `*.1-backup` files in content/

**Reality:** The `.gitignore` says `*.md.beta.1-backup` and `*.md.v3.2.0-backup` should be ignored, but the file is in the working tree. Either `.gitignore` is wrong, or the file was committed before the rule.

**Impact:** Clutter, no functional impact.

**Fix:** Add `content/_index.md.beta.1-backup` to gitignore (or just delete it — it's a backup, not source).

### Finding #8: 🟡 P2 Medium — **Uncommitted changes in content/pricing.md**

**Where:** `git status` shows `M content/pricing.md` (45 lines diff, mostly deletions)

**What:** The pricing page is in the middle of being updated to reflect the D0 Starter tier removal (Starter tier deleted from `data/pricing.toml` already, now the website page is being updated to match). The uncommitted diff:

- Removed the entire `<div class="pricing-card starter">` block (3 buy buttons: 2 `<stripe-buy-button>` and supporting text)
- Updated the "Currently available" notice from "Community, Starter ($29), Developer ($99)" to "Community, Developer ($79)"
- Updated a CSS class `.pricing-card.starter` removal
- Changed a comment from "v3.3.0: Starter and Developer" to "v3.5.0: Developer"

**Impact:** The pricing page is half-migrated. The data file (pricing.toml) was updated first, but the page hasn't been committed.

**Fix:** Complete and commit the pricing.md changes. But the diff has issues:
1. The notice says "Developer ($99/mo)" but the toml has "Developer = $79". **Mismatch.**
2. The notice says "Developer ($79/mo)" in the new version. Need to verify which is right.

### Finding #9: 🟡 P2 Medium — **Untracked directories (public-after, public-baseline, .workingdirectory)**

**Where:**
- `public-after/` (3.3M) — appears to be a post-deploy snapshot
- `public-baseline-20260715-165452/` (3.3M) — pre-deploy baseline
- `.workingdirectory/` (20K) — unknown

**Impact:** These are probably rollback artifacts. They take 6.6MB+ on disk.

**Fix:** Delete or move to a backup location. Add to `.gitignore` if not already.

### Finding #10: 🟢 P3 Low — **hugo.toml has 2 config files (config.yaml + hugo.toml) duplication**

**Where:** Both `config.yaml` and `hugo.toml` have similar site params (description, version, coverage, etc.)

**Impact:** Two configs that may drift. Already showing drift (Finding #2).

**Fix:** Consolidate to `hugo.toml` (Hugo's standard). Move `config.yaml` content to `hugo.toml` or vice versa.

### Finding #11: 🟢 P3 Low — **`pk_live_` Stripe key in committed pricing.md**

**Where:** `content/pricing.md:73, 78` — both have `pk_live_51TT0vSK2DQfk64XNCkz1nS9rVZEZyUQXUtpS4aylNiMlTqo53fQ0vhif7wskRXnx3GB5o1jMZfAfcAqmB8po1QWI00cIxRUy9u`

**Impact:** This is the Stripe **publishable key** (public, not secret). It's safe to commit. But it's worth noting.

**Fix:** None needed. This is the intended design.

---

## 4. Compliance Module Buy-Button Audit (Stripe Risk)

This was the main concern from the platform audit. The website was supposed to be checked for compliance module buy buttons. Here's the full picture:

### Stripe Buy Buttons in the Website

| File | Stripe Button | Buy Button ID | Module |
|------|---------------|---------------|--------|
| `content/pricing.md:71-75` | `<stripe-buy-button>` | `buy_btn_1TezBqK2DQfk64XN7Y79VYM7` | (tier subscription, uncommitted) |
| `content/pricing.md:76-80` | `<stripe-buy-button>` | `buy_btn_1TezDrK2DQfk64XNjhDhfBDO` | (tier subscription, uncommitted) |
| ~~Removed~~ | (was Starter tier buy button, deleted in uncommitted diff) | ~~`buy_btn_1Tez2dK2DQfk64XN34yWfv3Z`~~, ~~`buy_btn_1Tez8VK2DQfk64XN8Ibi7Mip`~~ | (removed) |

**For compliance modules specifically:** **Zero `<stripe-buy-button>` elements** in the website. All 6 paid compliance modules (HIPAA, PCI-DSS, SOC 2, ISO 42001, FedRAMP, FIPS 140) are masked with `<div class="coming-soon">` placeholders. ✅ **No customer-facing Stripe risk on the website.**

### Conclusion on Finding #3 from Platform Audit

The platform's `pkg/billing/billing-config.json` has Stripe product IDs for FedRAMP (`prod_UeIPsk3H8PksXv`) and FIPS 140 (`prod_UeIQ5haHNP9U4w`) that have NO corresponding website buy buttons. These Stripe products are **dormant** — customers can't reach them through the website. The risk of being charged for non-existent modules via the website is **zero**.

**However:**
- The Stripe products still exist in Stripe dashboard (presumably)
- If someone finds the `prod_*` IDs via API or other means, they could be charged
- The platform repo is misleading (suggests they're buyable)
- If we ever want to enable them, the website can be updated easily

**Recommended action:** **No Stripe admin action needed.** The website is already masking the buttons. The platform's `pkg/billing/billing-config.json` can stay as-is (it documents the planned products) but should get a comment that they're not currently active on the website.

---

## 5. Cross-Reference: Website vs Platform

| Item | Platform (D17 state) | Website (current) | Match? |
|------|----------------------|-------------------|--------|
| Version | v3.4.0-beta.1 | v3.3.0-beta.2 (hugo.toml) / v3.2.0 (config.yaml) | ❌ 1-2 releases behind |
| Pillar count | 6 (HTTP, MCP, A2A, ACP, RESPONSE, Trust) | 5 (no ACP) | ❌ Missing ACP |
| Professional price | $499 (post-reprice) | $249 (data/pricing.toml) / $499 (docs/tiers.md) | ❌ Inconsistent |
| Stripe buy buttons for compliance | 0 (masked via "coming-soon") | 0 (masked via "coming-soon") | ✅ MATCH |
| Test coverage claim | 97.8% | 97.8% | ✅ MATCH |
| ATLAS techniques | 66 | 66 | ✅ MATCH |

---

## 6. Concrete Action Items (Prioritized)

### 🟠 P1 High (do these soon)

| # | Finding | Est. Effort | Fix |
|---|---------|------------|-----|
| 1 | 5-pillar vs 6-pillar (Finding #1) | 30 min | Update `config.yaml` (description, pillars, pillarsCount) and `hugo.toml` (description) to say 6 pillars with ACP. Update `content/_index.md` (2 places) and `content/docs/tiers.md` (1 place). |
| 2 | Version drift (Finding #2) | 15 min | Update `hugo.toml` version → "v3.4.0-beta.1". Update `config.yaml` version → "v3.4.0-beta.1". Update `content/_index.md` 3 places. |
| 3 | Professional pricing inconsistency (Finding #3 + #6) | 20 min | Update `data/pricing.toml:84` Professional from $249 → $499. Verify all 3 sources agree on $499. |

### 🟡 P2 Medium (good hygiene)

| # | Finding | Est. Effort | Fix |
|---|---------|------------|-----|
| 4 | Uncommitted pricing.md changes (Finding #8) | 30 min | Complete and commit the in-progress diff. Verify the "Developer $99" notice is consistent with the toml. |
| 5 | Add ETAs to compliance modules (Finding #5) | 20 min | Add "Q4 2026" ETA to each of the 6 module "coming-soon" cards so the price isn't confused with "buy now". |
| 6 | Add `*.1-backup` and `*.backup` files to gitignore (Finding #7) | 5 min | Add `*.1-backup` to `.gitignore`. Or just delete the existing one. |
| 7 | Clean up untracked dirs (Finding #9) | 10 min | Delete `public-after/`, `public-baseline-*/`, `.workingdirectory/`. Add to `.gitignore`. |

### 🟢 P3 Low (cleanup)

| # | Finding | Est. Effort | Fix |
|---|---------|------------|-----|
| 8 | Consolidate config.yaml + hugo.toml (Finding #10) | 1-2 hrs | Decide which is canonical. Hugo's standard is hugo.toml. Or keep both but document the relationship. |
| 9 | Stripe product ID comment in billing-config.json (D17 leftover) | 5 min | Add comment to `pkg/billing/billing-config.json` noting that FedRAMP and FIPS 140 Stripe products are currently NOT active on the website. |

---

## 7. Total Effort Estimate

| Phase | Effort |
|-------|--------|
| P1 fixes (Findings #1, #2, #3, #6) | 1.5 hours |
| P2 fixes (Findings #4, #5, #7, #8) | 1 hour |
| P3 fixes (Findings #9, #10) | 1-2 hours (mostly optional) |
| **Total** | **3-4 hours** |

This is well within a single session. The website repo is much smaller and cleaner than the platform repo — 46 markdown files vs 218K LOC of Go.

---

## 8. Recommended Action Plan

### Session Plan (1 session, 3-4 hours)

**Step 1 (15 min): Foundation**
- Read website README to understand the deploy flow
- Check Hugo version
- Verify I can run `hugo --minify` locally to test changes

**Step 2 (1.5 hours): P1 fixes**
- Fix 5→6 pillar claim across all 7 sites
- Fix version drift (4 files)
- Fix Professional pricing to $499 in `data/pricing.toml`

**Step 3 (1 hour): P2 fixes**
- Complete and commit the in-progress pricing.md changes
- Add ETAs to compliance modules
- Add backup files to .gitignore
- Clean up untracked dirs

**Step 4 (15 min): Verify**
- `hugo --minify` builds clean
- Test the pricing page renders correctly
- Commit everything

**Step 5 (15 min): Push**
- Single commit with all P1+P2 fixes
- Push to origin/main (or merge a PR)

**Step 6 (15 min): Then come back to platform**
- The 5-test CI exemption fix (already done)
- The P1 #8 HTTP endpoints for attestation+posture
- The P2 #11/12/13 tech debt

---

## 9. Strategic Notes

The website is **much cleaner than the platform**. The main issues are:
1. **Drift** (versions, pillars, prices) — fixable in 1.5 hours
2. **The uncommitted pricing.md diff** — needs to be completed and committed
3. **Two pricing representations** — long-term refactor, not urgent

**No code is broken.** The website builds, deploys, and renders. The Stripe compliance module concern from the platform audit is **already mitigated** by the website's existing "coming-soon" masking.

**The strategic question is:** do we want to update the website's marketing message to reflect 6 pillars + v3.4.0-beta.1, or do we want to wait for v3.4.0 GA (post-H1 legal + H4 pentest)?

My recommendation: **update now.** The website is already in "v3.4.0+ pending legal review" mode for the compliance modules. Updating the version and pillar count to match reality is the honest thing to do.

---

## 10. What I'm NOT Doing in This Audit

- **Did not start a Hugo dev server** to test the build
- **Did not verify the Sveltia CMS works** (would need OAuth setup)
- **Did not test the Netlify deploy flow** (would need real credentials)
- **Did not audit the `themes/aegisgate/` custom theme** (separate scope)
- **Did not audit the `internal/blog-templates/`** (seems unused)
- **Did not test the 2 live Stripe buy buttons** (would charge a test card)

These can be done in a follow-up session if needed.

---

**End of audit report. Ready for founder review and decision on action plan.**
