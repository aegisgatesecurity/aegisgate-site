---
title: "Detection Coverage Matrix"
description: "AegisGate detection coverage across MITRE ATLAS technique categories with measured performance metrics"
type: docs
---


<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>

## Overall Score

**All ML-derived figures formerly shown here are void as of 2026-11-23** (training-corpus label audit failure). Deterministic regex-only detection was last measured at 88.5/100 evasion resistance with 0.0% FPR on 10,538 benign samples; that figure has not been re-baselined since the withdrawal. Treat all numbers on this page as historical and unverified.

| Metric | Regex-only (last measured) | Regex + ML (VOID 2026-11-23) |
|--------|---------------------|---------------------|
| **Overall Evasion Resistance** | 88.5 / 100 | ~~100 / 100~~ (void) |
| **False Positive Rate** | 0.0% (10,538 benign) | ~~0.0%~~ (void) |
| **True Positive Rate** | 78.8% (41/52 patterns) | ~~100%~~ (void) |
| **ML Inference Latency** | N/A | ~~4.78ms avg~~ (void) |

---

## Per-Category Coverage

| Category | Techniques | TPR | Evasion Resistance | Key Defenses |
|----------|-----------|------|-------------------|-------------|
| Prompt Injection (T1535) | 5 patterns | 100% | 98/100 | Regex pattern matching, heuristic fallback |
| LLM Jailbreak (T1484) | 5 patterns | 80% | 92/100 | Role-play detection, boundary enforcement |
| Prompt Extraction (T1632) | 5 patterns | 80% | 90/100 | System prompt leak detection |
| Data Extraction (T1589) | 5 patterns | 80% | 88/100 | PII/PHI pattern detection |
| Indirect Injection (T1584) | 5 patterns | 80% | 85/100 | Context-aware pattern matching |
| Vector DB Poisoning (T1600) | 3 patterns | 100% | 95/100 | Content injection detection |
| Content Injection (T1613) | 3 patterns | 100% | 93/100 | Payload pattern matching |
| Plugin Exploitation (T1563) | 3 patterns | 67% | 80/100 | Tool authorization enforcement |
| Defense Evasion (T1622) | 3 patterns | 67% | 82/100 | Obfuscation detection, normalization |
| Credential Forgery (T1606) | 2 patterns | 100% | 96/100 | API key pattern detection |
| MFA Bypass (T1621) | 2 patterns | 100% | 95/100 | Authentication manipulation detection |
| Elevation Abuse (T1548) | 2 patterns | 100% | 94/100 | Privilege escalation detection |
| Inhibit Recovery (T1490) | 2 patterns | 100% | 92/100 | Safety bypass detection |
| Denial of Service (T1498) | 2 patterns | 100% | 90/100 | Rate limiting, resource boundaries |
| Endpoint Denial (T1499) | 2 patterns | 100% | 91/100 | Rate limiting, request validation |
| Config Exfiltration (T1602) | 2 patterns | 100% | 93/100 | Configuration leak detection |
| Resource Exhaustion (T1648) | 1 pattern | 100% | 88/100 | Per-session resource limits |

---

## Evasion Resistance Methodology (historical — ML-derived figures void 2026-11-23)

The evasion resistance scores below were produced against the ML detector and are **void as of 2026-11-23**. The methodology is retained for reference; deterministic re-baselining has not yet been performed.

- **2,214 adversarial test cases** generated from 52 ATLAS payload seeds × 50 augmentation transforms (including 10 near-duplicate seeds removed for uniqueness)
- **10,538 benign examples** (including 1,869 near-miss samples) for false positive rate measurement
- **5 evasion categories** tested against every payload:
  1. **Character substitution** — leet-speak, homoglyphs, and Unicode lookalikes
  2. **Encoding** — base64, URL encoding, HTML entities, and mixed encoding
  3. **Linguistic** — paraphrasing, synonym substitution, and translation round-trips
  4. **Whitespace** — zero-width characters, unusual line breaks, and padding
  5. **Fragmentation** — payload splitting across multiple messages or turns
- **10 variants per payload** for each evasion category
- **Weighted scoring**: TPR (40%), FPR (30%), evasion resistance (30%)

This methodology ensures AegisGate's detection is measured not only against canonical attack payloads but also against the adversarial transformations most likely to be used in real-world evasion attempts.

---

## Detection Mode (2026-11-23)

ML detection is **withdrawn**. `MLThreatDetectionEnabled` / `MLShadowMode` are inert. AegisGate runs deterministic regex + ATLAS detection only, covering all 17 ATLAS technique categories without ML inference. The 88.5/100 evasion-resistance figure for regex-only detection is historical and has not been re-baselined. See [/changelog/](/changelog/).

---

## API Access

Query detection coverage programmatically via the AegisGate compliance API:

```bash
curl -H "X-API-Key: your-key" \
     "http://localhost:8443/api/v1/compliance?framework=MITRE%20ATLAS"
```

The response includes per-technique coverage, TPR, FPR, and evasion resistance scores in JSON format, suitable for integration with compliance dashboards and reporting pipelines.