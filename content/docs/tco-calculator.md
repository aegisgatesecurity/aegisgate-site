---
title: "TCO Calculator"
description: "Compare total cost of ownership for AI security platforms — self-hosted vs. SaaS vs. building in-house"
type: docs
---

## AI Security TCO Calculator

AegisGate's self-hosted architecture dramatically reduces total cost of ownership compared to SaaS-only solutions or building an AI security platform in-house. By eliminating per-request fees, providing built-in compliance mappings, and leveraging open-source community contributions, AegisGate delivers enterprise-grade AI security at a fraction of the cost.

## Cost Comparison Table

| Cost Factor | AegisGate (Self-Hosted) | SaaS AI Security | Build In-House |
|-------------|----------------------|------------------|----------------|
| **License** | Free (Community) / tiered paid | $0.50-2.00/request | N/A |
| **Infrastructure** | Your infra (~$50-200/mo) | Included (markup 3-5x) | Your infra + development |
| **Development** | 0 (open source) | 0 | $200K-500K (6-12 months) |
| **Maintenance** | Community + vendor patches | Included | $50-100K/year (1-2 engineers) |
| **Compliance Mapping** | Built-in (FedRAMP, SOC2, NIST, ATLAS) | Manual or partial | Manual ($50-100K) |
| **Incident Response** | Built-in playbooks + attestation | Manual | Build from scratch ($100K+) |
| **SIEM Integration** | Built-in (10+ platforms) | API only | Build from scratch ($50K+) |
| **ATLAS Coverage** | 52 patterns, 17 categories | 8-20 patterns | Start from scratch |
| **FPR Cost (false positives)** | ~0% (measured) | 1-5% (staff time) | Unknown until deployed |
| **3-Year TCO (10K req/day)** | **$10K-50K** | **$180K-540K** | **$500K-1.2M** |

## Scenario Calculations

### Startup (1K requests/day)

- **AegisGate Community:** $0 + infra (~$50/mo) = **$1,800/3 years**
- **SaaS competitor:** $0.50/req × 1K/day × 365 = **$182,500/3 years**
- **Build in-house:** $200K initial + $50K/yr maintenance = **$350,000/3 years**

### Mid-market (10K requests/day)

- **AegisGate Pro:** ~$50-200/mo infra + license = **$10K-50K/3 years**
- **SaaS competitor:** $0.50/req × 10K/day × 365 = **$1.8M/3 years**
- **Build in-house:** $300K initial + $75K/yr = **$525K/3 years**

### Enterprise (100K requests/day)

- **AegisGate Enterprise:** custom pricing + infra ($500-2K/mo) = **$50K-150K/3 years**
- **SaaS competitor:** $0.50/req × 100K/day × 365 = **$18M/3 years** (volume discounts may apply)
- **Build in-house:** $500K initial + $100K/yr = **$800K/3 years**

## Hidden Costs of SaaS

- **Data egress fees and privacy implications** — Every request sends sensitive data to a third party, creating compliance risk and egress charges
- **Latency overhead:** 50-200ms per request for round-trip to SaaS — adds up at scale and impacts user experience
- **Vendor lock-in:** Proprietary formats, no self-hosting option — migrating away means starting over
- **Compliance gaps:** SaaS doesn't map to your specific framework — you still do manual compliance work
- **False positive costs:** 1-5% FPR × request volume = significant staff time investigating false alerts

## Why Self-Hosted Wins

- **Data sovereignty:** Your data never leaves your infrastructure
- **Zero latency overhead:** <2ms total scan time
- **Compliance-native:** Built-in mappings for 20+ frameworks
- **Open source:** Apache 2.0 license, no vendor lock-in
- **Predictable costs:** Infrastructure costs only