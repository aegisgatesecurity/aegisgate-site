---
title: "Detection Coverage Matrix"
description: "AegisGate detection coverage across MITRE ATLAS technique categories with measured performance metrics"
type: docs
---

## Overall Score

AegisGate achieves **88.5/100** overall evasion resistance, validated against the MITRE ATLAS framework with the following baseline metrics:

| Metric | Value |
|--------|-------|
| **Overall Evasion Resistance** | 88.5 / 100 |
| **False Positive Rate** | 0.0% on benign corpus (10,538 examples) |
| **True Positive Rate** | 78.8% on adversarial ATLAS payloads (41/52 patterns) |

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

## Evasion Resistance Methodology

The evasion resistance scores are derived from a rigorous adversarial testing methodology:

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

## Feature Flag Architecture

AegisGate's ML threat detection is designed for safe, gradual deployment:

| Setting | Default | Description |
|---------|---------|-------------|
| `MLThreatDetectionEnabled` | `false` | ML-based threat detection is off by default |
| `MLShadowMode` | `true` | ML runs in shadow mode, logging without blocking |
| Validation Window | 7 days | Grace period before enabling blocking mode |

### Gradual Rollout Process

1. **Shadow Mode** — ML models observe traffic and log predictions without taking action. This allows operators to validate detection accuracy against production traffic.
2. **Validation Window** — After 7 days of shadow operation, review detection logs and tune thresholds before transitioning to blocking mode.
3. **Blocking Mode** — Enable `MLThreatDetectionEnabled: true` to enforce ML-backed blocking decisions.

### Graceful Degradation

If ML services become unavailable, AegisGate automatically falls back to **rules-only mode**, which maintains an **88.5/100** evasion resistance score. The rule engine provides complete coverage for all 17 ATLAS technique categories without dependency on ML inference.

---

## API Access

Query detection coverage programmatically via the AegisGate compliance API:

```bash
curl -H "X-API-Key: your-key" \
     "http://localhost:8443/api/v1/compliance?framework=MITRE%20ATLAS"
```

The response includes per-technique coverage, TPR, FPR, and evasion resistance scores in JSON format, suitable for integration with compliance dashboards and reporting pipelines.