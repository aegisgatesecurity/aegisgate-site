---
title: Compliance Frameworks
description: AegisGate compliance coverage across 31 frameworks — SOC 2, ISO 27001, NIST AI RMF, EU AI Act, FedRAMP, HIPAA, PCI-DSS, and more.
weight: 320
---

## Compliance Frameworks

AegisGate provides automated compliance mapping across **31 security and AI governance frameworks** — 4 at the free Community tier, 6 at Developer, 16 at Professional, and 5 at Enterprise. Every framework has a full Go implementation with automated control checking, evidence generation, and ATLAS cross-referencing. No competitor covers more than 5.

### Community (Free, Apache 2.0) — 4 frameworks

| Framework | Scope |
|-----------|-------|
| MITRE ATLAS | Adversarial AI threat matrix (66 technique patterns) |
| OWASP LLM Top 10 | LLM application vulnerabilities (10 risk categories) |
| OWASP Web Top 10 | Web application security risks (10 categories) |
| NIST AI RMF 1.0 | AI system governance and risk management (50 controls) |

### Developer — 6 frameworks ($149/mo each, add-on)

| Framework | Scope |
|-----------|-------|
| HIPAA | Health information protection (54 controls) |
| PCI-DSS v4.0 | Payment card data security (152 controls) |
| SOC 2 Type II | Security, availability, confidentiality (64 controls) |
| ISO/IEC 27001:2022 | Information security management (116 controls) |
| CCPA/CPRA | California consumer privacy (26 controls) |
| GDPR | EU data protection regulation (99 controls) |

### Professional — 4 Security Foundation ($79/mo each) + 12 Industry-Specific ($199/mo each)

**Security Foundation:**

| Framework | Scope |
|-----------|-------|
| CIS Controls v8 | Critical security controls baseline (50 controls) |
| NIST CSF 2.0 | Cybersecurity framework (131 controls) |
| CSA STAR Level 1 | Cloud security assurance (16 controls) |
| NIST AI 600-1 | GenAI risk profile (12 controls) |

**Industry-Specific:**

| Framework | Scope |
|-----------|-------|
| ISO/IEC 42001:2023 | AI management system (38 controls) |
| EU AI Act | European AI regulation (120 controls) |
| FIPS 140-2/140-3 | Cryptographic module validation (40 controls) |
| SOX | Financial reporting and controls (80 controls) |
| GLBA | Financial data privacy (14 controls) |
| CJIS Security Policy v5.9.1 | Criminal justice information systems (64 controls) |
| NERC CIP | Critical infrastructure protection (55 controls) |
| FERPA | Student education records privacy (45 controls) |
| HITECH | Health information technology (35 controls) |
| FFIEC | Financial institution security (40 controls) |
| TSA SD | Transportation security (35 controls) |
| ISO 21434 | Automotive cybersecurity (42 controls) |

### Enterprise — 5 frameworks ($499/mo each)

| Framework | Scope |
|-----------|-------|
| FedRAMP Moderate | US federal cloud authorization (170 controls) |
| CMMC Level 2 | DoD contractor cybersecurity (150 controls) |
| NIST SP 800-171 | Controlled unclassified information (110 controls) |
| HITRUST CSF v11.2 | Health information trust alliance (200 controls) |
| TISAX AL2 | Automotive information security (65 controls) |

### Automated Controls

AegisGate automates **1,457 controls** across these frameworks, out of **2,043 total controls** — a **71.3% automation rate**. The remaining **586 manual controls** (28.7%) are genuinely human-process controls: organizational policies, legal agreements, physical security, HR training, governance, supply chain management, and external audit procedures.

**4 automation methods:**

| Method | How it works | Example |
|--------|-------------|---------|
| **Config State Verification** | Reads running configuration and validates it against framework requirements | TLS enabled, audit logging on, rate limits configured |
| **Audit Trail Evidence** | Examines audit logs for required evidence artifacts | Access logged, data retention enforced, incident response tracked |
| **Detection Engine State** | Checks that detection rules and scanners are active and covering required patterns | PII detection running, prompt injection blocking, secret scanning enabled |
| **Cross-Framework Mapping** | Maps evidence from one framework to satisfy another's requirements | HIPAA access logging → SOC 2 CC6.1, GDPR PII protection → ISO 27001 A.8.12 |

**Automation coverage by detection capability:**

- **Prompt screening**: Maps to 47 access control and input validation controls
- **Response filtering**: Maps to 82 output control and data protection controls
- **Audit logging**: Maps to 94 monitoring and evidence controls
- **PII redaction**: Maps to 39 privacy and data protection controls
- **Rate limiting**: Maps to 50 availability and resource protection controls

### Evidence Generation

All detections produce ATLAS-mapped audit evidence with:

- Timestamp, source IP, user identity
- Detection rule ID and confidence score
- ML classification (if applicable)
- ATLAS tactic and technique mapping
- Compliance framework cross-reference

### Guided Setup: Quick Compliance Setup

Getting compliance-ready is faster with AegisGate's Guided Setup features:

```bash
# Auto-detect your environment and generate a compliance-ready config
./aegisgate-platform setup --non-interactive

# Use a profile tailored to your compliance needs
./aegisgate-platform --profile high-security --embedded-mcp

# Validate your config before deploying
./aegisgate-platform config validate aegisgate-platform.yaml
```

The **high-security** profile enables TLS 1.3, strict rate limits, and full audit logging — suitable for HIPAA, SOC 2, and EU AI Act environments. The **air-gapped** profile is designed for FedRAMP, CMMC L2, and HITRUST deployments in isolated networks.

_See also: [Deploy Profiles](/docs/deploy-profiles/), [MITRE ATLAS Coverage](/docs/atlas/), and [Security Overview](/docs/security/)._
