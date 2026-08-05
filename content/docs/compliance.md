---
title: Compliance Frameworks
description: AegisGate compliance coverage across 27 frameworks — SOC 2, ISO 27001, NIST AI RMF, EU AI Act, FedRAMP, HIPAA, PCI-DSS, and more.
weight: 320
---

## Compliance Frameworks

AegisGate provides automated compliance mapping across **27 security and AI governance frameworks** — 10 at the free Community tier, 3 at Developer, 11 at Professional, and 3 at Enterprise. Every framework has a full Go implementation with automated control checking, evidence generation, and ATLAS cross-referencing. No competitor covers more than 2.

### Community (Free, Apache 2.0) — 10 frameworks

| Framework | Scope |
|-----------|-------|
| MITRE ATLAS | Adversarial AI threat matrix (66 technique patterns) |
| OWASP LLM Top 10 | LLM application vulnerabilities (10 risk categories) |
| NIST AI RMF 1.0 | AI system governance and risk management |
| GDPR | EU data protection regulation |
| CIS Controls v8 | Critical security controls baseline |
| NIST CSF 2.0 | Cybersecurity framework |
| OWASP Web Top 10 | Web application security risks |
| CSA STAR Level 1 | Cloud security assurance |
| NIST AI 600-1 | GenAI risk profile |
| CCPA/CPRA | California consumer privacy |

### Developer — 3 frameworks

| Framework | Scope |
|-----------|-------|
| HIPAA | Health information protection |
| PCI-DSS v4.0 | Payment card data security |
| SOC 2 Type II | Security, availability, confidentiality |

### Professional — 11 frameworks

| Framework | Scope |
|-----------|-------|
| ISO/IEC 42001:2023 | AI management system |
| ISO/IEC 27001:2022 | Information security management |
| FedRAMP Moderate | US federal cloud authorization |
| FIPS 140-2/140-3 | Cryptographic module validation |
| EU AI Act | European AI regulation |
| CMMC Level 2 | DoD contractor cybersecurity |
| NIST SP 800-171 | Controlled unclassified information |
| FERPA | Student education records privacy |
| SOX | Financial reporting and controls |
| GLBA | Financial data privacy |
| NERC CIP | Critical infrastructure protection |

### Enterprise — 3 frameworks

| Framework | Scope |
|-----------|-------|
| HITRUST CSF v11.2 | Health information trust alliance |
| TISAX AL2 | Automotive information security |
| CJIS Security Policy v5.9.1 | Criminal justice information systems |

### Automated Controls

AegisGate automates **312 unique security controls** across these frameworks:

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

_See also: [MITRE ATLAS Coverage](/docs/atlas/) and [Security Overview](/docs/security/)._
