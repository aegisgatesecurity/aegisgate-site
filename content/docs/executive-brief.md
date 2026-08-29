---
title: "Executive Brief"
description: "One-page executive overview of AegisGate — what it does, why it matters, and how it compares. For CISOs, CIOs, and procurement teams evaluating AI security."
weight: 10
---

## AegisGate Executive Brief

### The Problem

AI tools (ChatGPT, Claude, Copilot, Gemini, etc.) are now used by 80%+ of knowledge workers. Every interaction creates risk:

- **Data leakage:** Employees paste PII, secrets, and confidential data into AI tools
- **Prompt injection:** Adversarial inputs trick AI into bypassing safety controls
- **No visibility:** Security teams have no insight into how AI is being used
- **No compliance:** AI usage is ungoverned — failing EU AI Act, SOX, HIPAA, and CMMC requirements

### The Solution

AegisGate is the only full-suite, open-core AI security platform that protects every AI interaction surface:

| Product | What It Does | Where It Runs | Price |
|---------|-------------|---------------|-------|
| **Platform** | Enterprise AI gateway — inspects all AI API traffic, 40 guardrails across 6 attack surfaces, 31 compliance frameworks | Server / cloud / on-prem / air-gapped | Free → $499/mo → Custom |
| **Lens** | Browser extension — real-time PII/secrets/XSS/prompt injection detection in AI chat inputs | Chrome / Edge | Free |
| **Rampart** | Local proxy — MITM interception of AI API calls, block mode, encrypted audit log | Desktop (macOS, Windows, Linux) | Free → $79/mo |

### Why AegisGate

| Differentiator | AegisGate | Closest Competitor |
|---------------|-----------|-------------------|
| **Evasion resistance** | 100/100 verified | Not published |
| **False positive rate** | 0.0% verified (10K+ test cases) | 1-7% (estimated) |
| **Detection latency** | ~4.6ms per scan | Not published |
| **Scale (verified)** | 5,000 concurrent users, 23,578 RPS, 0% errors | Not published |
| **Compliance frameworks** | 31 | 1-5 |
| **AI protocols secured** | 5 (HTTP, MCP, A2A, ACP, ANP) | 1 (HTTP only) |
| **Deployment** | Single 19.1MB binary, zero-config, air-gapped | SaaS-only or appliance |
| **Open source** | Apache 2.0, full code audit | Proprietary |
| **IDE integration** | VS Code, Cursor, JetBrains, Neovim, Emacs, Helix | None |
| **Browser extension** | Lens (free, CWS, 10 AI providers) | None |
| **SIEM integration** | 12 platforms (Splunk, QRadar, Datadog, Sentinel, etc.) | 0-1 |
| **SOAR integration** | PagerDuty, Jira, ServiceNow | None |
| **3-Year TCO (10K req/day)** | $10K-50K | $108K-540K |

### Deployment in 5 Minutes

```bash
# Download and run
docker run -d -p 8080:8080 -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.3.3

# Verify
curl http://localhost:8443/health

# Open dashboard
open http://localhost:8443/ui/
```

Zero-config. All defaults embedded. No database required (Community tier). No external API calls. No phone-home.

### Air-Gapped / ITAR / Classified

AegisGate runs fully air-gapped with no outbound connectivity:

- Single binary, no internet needed
- Web UI served from the binary (no CDN)
- SIEM/SOAR integration via local network (no cloud)
- Signed evidence packages generated locally
- Apache 2.0 = full source code audit

### Compliance Coverage (31 Frameworks)

SOC 2 · ISO 27001 · ISO 42001 · NIST CSF · NIST AI RMF · NIST 800-171 · NIST AI 600-1 · FedRAMP · HIPAA · PCI-DSS · EU AI Act (120 controls) · CMMC L2 · CIS Controls · HITRUST · FIPS 140-2/3 · CCPA/CPRA · GDPR · SOX · GLBA · FERPA · CJIS · NERC CIP · TISAX · CSA STAR · OWASP Web · MITRE ATLAS · HITECH · FFIEC · TSA SD · ISO 21434

### Pricing

| Tier | Price | Key Features |
|------|-------|-------------|
| **Community** | Free | 4 compliance frameworks, Lens, Rampart, all detection |
| **Developer** | $79/mo | 10 frameworks (4 community + 6 add-ons), SIEM, API access |
| **Professional** | $499/mo | 26 frameworks (4 community + 6 + 16 add-ons), SOAR, evidence packages, attestation |
| **Enterprise** | Custom | 31 frameworks, all features, priority support |

**No per-request fees. No data egress. No vendor lock-in.**

### Verified Performance

| Metric | Result |
|--------|--------|
| Concurrent users (zero errors) | 5,000 |
| Sustained throughput | 23,578 RPS |
| Error rate at max load | 0.00% |
| Recovery after crush | Full |
| Detection latency | ~4.6ms |
| False positive rate | 0.0% |
| Evasion resistance | 100/100 |
| Binary size | 19.1 MB |
| Test count | ~11,000 (Platform) + 538 (Lens) + 1,318 (Rampart) |

### What's Needed Before Enterprise Procurement

1. **SOC 2 Type II** — Independent audit (self-attestation Type I + controls exist)
2. **Third-party pentest** — Independent lab (self-pentest v3.3.0 exists)
3. **Legal review** — DPA, MSA, BAA, SLA (all drafts exist, ~$5-15K legal review)
4. **Scale test** — Already done (5K VUs, 23.5K RPS, 0% errors, published)

### Contact

- **Website:** [aegisgatesecurity.io](https://aegisgatesecurity.io)
- **Sales:** sales@aegisgatesecurity.io
- **GitHub:** [github.com/aegisgatesecurity](https://github.com/aegisgatesecurity)
- **Docs:** [aegisgatesecurity.io/docs](https://aegisgatesecurity.io/docs/)