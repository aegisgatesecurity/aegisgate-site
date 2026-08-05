---
title: PCI-DSS SAQ A Self-Assessment
description: AegisGate PCI-DSS SAQ A self-assessment — payment card data protection controls and compliance evidence for AegisGate deployments processing cardholder data.
weight: 100
---

## PCI-DSS SAQ A Self-Assessment

AegisGate has completed a PCI-DSS Self-Assessment Questionnaire A (SAQ A), applicable to merchants who outsource all cardholder data functions to third-party service providers and do not store, process, or transmit cardholder data electronically.

### AegisGate PCI Controls

| PCI-DSS Requirement | AegisGate Control | Status |
|---------------------|-------------------|--------|
| Req 1: Network security | TLS enforcement, rate limiting | ✅ Automated |
| Req 2: Default passwords | No default credentials | ✅ Automated |
| Req 3: Cardholder data protection | PII redaction, tokenization | ✅ Automated |
| Req 4: Encryption in transit | TLS 1.2+ enforcement | ✅ Automated |
| Req 6: Secure development | Code scanning, dependency review | ✅ Automated |
| Req 7: Access control | RBAC, API key management | ✅ Automated |
| Req 8: Authentication | MFA support, credential policies | ✅ Automated |
| Req 10: Audit logging | ATLAS-mapped audit trail | ✅ Automated |
| Req 11: Security testing | Automated scanning, pentest support | ✅ Automated |
| Req 12: Security policy | Policy enforcement engine | ✅ Automated |

### Evidence Generation

AegisGate automatically generates PCI-DSS compliance evidence for 42 unique controls:

- **Requirement 3**: Card data detection and redaction patterns (SSN, PAN, CVV, expiry)
- **Requirement 6**: Secure development evidence (gosec, govulncheck, Trivy, CodeQL scanning)
- **Requirement 10**: Audit log entries with ATLAS mapping
- **Requirement 11**: Security scanning results from CI/CD pipeline

### Disclaimer

This self-assessment applies to AegisGate's role as a security gateway. Organizations using AegisGate should conduct their own SAQ based on their specific cardholder data environment scope.

_See also: [Terms of Service](/legal/terms/) and [Privacy Policy](/legal/privacy/)._
