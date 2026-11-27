---
title: "Executive Brief"
description: "One-page executive overview of AegisGate — what it does, why it matters, and how it compares. For CISOs, CIOs, and procurement teams evaluating AI security."
weight: 10
---


<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>

## AegisGate Executive Brief

### The Problem

AI tools (ChatGPT, Claude, Copilot, Gemini, etc.) are now used by 80%+ of knowledge workers. Every interaction creates risk:

- **Data leakage:** Employees paste PII, secrets, and confidential data into AI tools
- **Prompt injection:** Adversarial inputs trick AI into bypassing safety controls
- **No visibility:** Security teams have no insight into how AI is being used
- **No compliance:** AI usage is ungoverned — failing EU AI Act, SOX, HIPAA, and CMMC requirements

### The Solution

AegisGate is the only full-suite, open-source AI security platform that protects every AI interaction surface:

| Product | What It Does | Where It Runs | License |
|---------|-------------|---------------|---------|
| **Platform** | Enterprise AI gateway — inspects all AI API traffic, 40 guardrails across 6 attack surfaces, 31 compliance frameworks | Server / cloud / on-prem / air-gapped | Apache 2.0 |
| **Lens** | Browser extension — real-time PII/secrets/XSS/prompt injection detection in AI chat inputs | Chrome / Edge | Apache 2.0 |
| **Rampart** | Local proxy — MITM interception of AI API calls, block mode, encrypted audit log | Desktop (macOS, Windows, Linux) | Apache 2.0 |

### Why AegisGate

| Differentiator | AegisGate | Closest Competitor |
|---------------|-----------|-------------------|
| **Evasion resistance** | Void (ML withdrawn 2026-11-23) | Not published |
| **False positive rate** | WITHDRAWN 2026-11-23 (ML model withdrawn) | 1-7% (estimated) |
| **Detection latency** | <1ms per scan (regex) | Not published |
| **Scale (verified)** | 5,000 concurrent users, 28,000 RPS, 0% errors | Not published |
| **Compliance frameworks** | 31 | 1-5 |
| **AI protocols secured** | 5 (HTTP, MCP, A2A, ACP, ANP) | 1 (HTTP only) |
| **Deployment** | Single 19.1MB binary, zero-config, air-gapped | SaaS-only or appliance |
| **Open source** | Apache 2.0, full code audit | Proprietary |
| **IDE integration** | VS Code, Cursor, JetBrains, Neovim, Emacs, Helix | None |
| **Browser extension** | Lens (free, CWS, 10 AI providers) | None |
| **SIEM integration** | 12 platforms (Splunk, QRadar, Datadog, Sentinel, etc.) | 0-1 |
| **SOAR integration** | PagerDuty, Jira, ServiceNow | None |
| **3-Year TCO (10K req/day)** | Self-hosted (open-source) | SaaS-only (vendor lock-in) |

### Deployment in 5 Minutes

```bash
# Download and run
docker run -d -p 8080:8080 -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v5.2.1

# Verify
curl http://localhost:8443/health

# Open dashboard
open http://localhost:8443/ui/
```

Zero-config. All defaults embedded. No database required (default config). No external API calls. No phone-home.

### Air-Gapped / ITAR / Classified

AegisGate runs fully air-gapped with no outbound connectivity:

- Single binary, no internet needed
- Web UI served from the binary (no CDN)
- SIEM/SOAR integration via local network (no cloud)
- Signed evidence packages generated locally
- Apache 2.0 = full source code audit

### Compliance Coverage (31 Frameworks)

SOC 2 · ISO 27001 · ISO 42001 · NIST CSF · NIST AI RMF · NIST 800-171 · NIST AI 600-1 · FedRAMP · HIPAA · PCI-DSS · EU AI Act (120 controls) · CMMC L2 · CIS Controls · HITRUST · FIPS 140-2/3 · CCPA/CPRA · GDPR · SOX · GLBA · FERPA · CJIS · NERC CIP · TISAX · CSA STAR · OWASP Web · MITRE ATLAS · HITECH · FFIEC · TSA SD · ISO 21434

### Availability

Free and open-source (Apache 2.0). Community support via [GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-platform/discussions).

**No per-request fees. No data egress. No vendor lock-in.**

### Verified Performance

| Metric | Result |
|--------|--------|
| Concurrent users (zero errors) | 5,000 |
| Sustained throughput | 28,000 RPS |
| Error rate at max load | 0.00% |
| Recovery after crush | Full |
| Detection latency | <1ms (regex) |
| False positive rate | WITHDRAWN 2026-11-23 |
| Evasion resistance | Void (ML withdrawn 2026-11-23) |
| Binary size | 19.1 MB |
| Test count | ~11,000 (Platform) + 538 (Lens) + 1,412 (Rampart) |

### What's Needed Before Enterprise Procurement

1. **SOC 2 Type II** — Independent audit (self-attestation Type I + controls exist)
> **Patent Pending** (8 U.S. provisional applications) and [published research on SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7652138).

2. **Third-party pentest** — Independent lab (self-pentest v3.3.0 exists)
3. **Legal review** — DPA, MSA, BAA, SLA (drafts available)
4. **Scale test** — Already done (5K VUs, 23.5K RPS, 0% errors, published)

### Contact

- **Website:** [aegisgatesecurity.io](https://aegisgatesecurity.io)

- **GitHub:** [github.com/aegisgatesecurity](https://github.com/aegisgatesecurity)
- **Docs:** [aegisgatesecurity.io/docs](https://aegisgatesecurity.io/docs/)