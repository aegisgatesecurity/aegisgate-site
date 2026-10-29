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
| **License** | Free (Apache 2.0) | Vendor pricing varies | N/A |
| **Infrastructure** | Your infra | Included (vendor markup) | Your infra + development |
| **Development** | 0 (open source) | 0 | Significant (6-12 months) |
| **Maintenance** | Community + vendor patches | Included | Significant (1-2 engineers) |
| **Compliance Mapping** | Built-in (FedRAMP, SOC2, NIST, ATLAS) | Manual or partial | Manual (significant effort) |
| **Incident Response** | Built-in playbooks + attestation | Manual | Build from scratch |
| **SIEM Integration** | Built-in (10+ platforms) | API only | Build from scratch |
| **ATLAS Coverage** | 52 patterns, 17 categories | 8-20 patterns | Start from scratch |
| **FPR Cost (false positives)** | ~0% (measured) | 1-5% (staff time) | Unknown until deployed |
| **3-Year TCO (10K req/day)** | **Low (infra only)** | **High (vendor markup)** | **Highest (build + maintain)** |

## Scenario Calculations

### Startup (1K requests/day)

- **AegisGate Community:** Free + your infra = **minimal cost**
- **SaaS competitor:** Per-request pricing = **significant cost**
- **Build in-house:** Initial development + ongoing maintenance = **highest cost**

### Mid-market (10K requests/day)

- **AegisGate (self-hosted):** Your infra = **minimal cost**
- **SaaS competitor:** Per-request pricing = **significant cost**
- **Build in-house:** Initial dev + ongoing maintenance = **high cost**

### Enterprise (100K requests/day)

- **AegisGate (enterprise support):** contact for details + your infra = **low cost**
- **SaaS competitor:** Per-request pricing = **very high cost** (volume discounts may apply)
- **Build in-house:** Initial dev + ongoing maintenance = **highest cost**

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