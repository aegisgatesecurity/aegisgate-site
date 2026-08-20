---
title: "Security Awareness Training Program"
description: "AegisGate Security, LLC security awareness training program. Tracks completion, certifications, and compliance with HIPAA, SOC 2, and ISO 27001 requirements."
type: "security"
date: 2026-07-29
layout: single
---

# Security Awareness Training Program

**Version:** 1.0
**Owner:** AegisGate Security, LLC
**Review Cycle:** Annual (next review: Q3 2027)
**Contact:** security@aegisgatesecurity.io

---

## 1. Purpose

This program defines AegisGate Security, LLC's security awareness training requirements. It satisfies:

- **HIPAA Security Rule** § 164.308(a)(5) — Security Awareness Training
- **SOC 2 Common Criteria** CC1.3 — Training and Awareness
- **ISO 27001** A.6.3 — Awareness, Education, and Training

---

## 2. Training Requirements

### 2.1 Required Training Modules

| Module | Frequency | Target Audience | Duration | Delivery |
|--------|-----------|----------------|----------|----------|
| **Security Awareness Foundations** | Annual | All personnel | 60 min | Self-paced |
| **Secure Development Practices** | Annual | Engineering | 90 min | Self-paced |
| **Incident Response Procedures** | Annual | All personnel | 45 min | Self-paced |
| **HIPAA Privacy and Security** | Annual | All personnel with PHI access | 60 min | Self-paced |
| **SOC 2 Compliance Overview** | Annual | All personnel | 30 min | Self-paced |
| **Phishing and Social Engineering** | Quarterly | All personnel | 15 min | Simulated exercise |
| **Secure Configuration Management** | Annual | Engineering | 45 min | Self-paced |
| **Vendor Security Awareness** | Annual | Procurement, management | 30 min | Self-paced |

### 2.2 Role-Based Requirements

| Role | Required Modules | Additional |
|------|-----------------|------------|
| **Engineering** | Foundations, Secure Dev, IR, SOC 2, Phishing, Config | Code review security |
| **Management** | Foundations, IR, SOC 2, Phishing, Vendor | Risk management |
| **Compliance/Security** | All modules | Framework-specific deep dives |
| **Contractors** | Foundations, IR, Phishing | Role-specific modules |

---

## 3. Training Content

### 3.1 Security Awareness Foundations

Topics covered:
- Information security principles (confidentiality, integrity, availability)
- AegisGate security policies and procedures overview
- Password management and authentication (MFA, SSO)
- Data classification and handling (Critical, Confidential, Internal, Public)
- Physical security awareness
- Reporting security incidents and concerns
- Regulatory requirements (HIPAA, GDPR, CCPA, SOC 2)
- Self-hosted architecture security model
- Fail-closed security philosophy

### 3.2 Secure Development Practices

Topics covered:
- Secure coding principles (OWASP Top 10)
- AegisGate fail-closed architecture
- Input validation and output encoding
- Cryptographic practices (TLS 1.3, AES-256, ECDSA P-256)
- Secret management (no hardcoding, environment variables)
- Dependency management and supply chain security
- Container security (19.1MB minimal image, non-root, no shell)
- OPSEC practices (no local paths, no private keys, no internal refs)
- Code review security checklist

### 3.3 Incident Response Procedures

Topics covered:
- Incident classification (Critical/High/Medium/Low)
- Response SLAs (Critical: 1h, High: 4h, Medium: 24h, Low: 72h)
- Escalation procedures and chain of command
- Communication protocols (internal and external)
- Breach notification requirements (HIPAA 72h, GDPR 72h, CCPA 45d)
- Evidence preservation and chain of custody
- Post-incident review process

### 3.4 HIPAA Privacy and Security

Topics covered:
- PHI identification and handling
- Minimum Necessary Standard
- Business Associate obligations
- Patient rights (access, amendment, accounting of disclosures)
- Breach notification requirements
- Sanctions for non-compliance
- Workforce security (§ 164.308(a)(3))

### 3.5 SOC 2 Compliance Overview

Topics covered:
- Trust Services Criteria overview
- Control objectives and AegisGate's control framework
- 1,076+ automated CheckFuncs
- Hash-chained audit logs and evidence collection
- Change management and release process
- Monitoring and reporting obligations

### 3.6 Phishing and Social Engineering

Topics covered:
- Phishing recognition (email, SMS, voice)
- Social engineering tactics (pretexting, baiting, tailgating)
- URL and sender verification
- Reporting suspicious communications
- Quarterly simulated phishing exercises

---

## 4. Training Records

### 4.1 Completion Tracking

| Name | Module | Completion Date | Score | Certification Expiry | Verified By |
|------|--------|----------------|-------|---------------------|-------------|
| *Training records are maintained in the AegisGate Security training tracker. Individual completion records are available upon request under NDA.* |

### 4.2 Record Retention

- Training completion records: **6 years** (HIPAA § 164.530(j))
- Assessment scores: **6 years**
- Training materials (version history): **6 years**
- Attendance logs: **6 years**

### 4.3 Verification

Training completion is verified through:
1. **Automated tracking** — Learning management system records completion timestamps
2. **Assessment scores** — Minimum passing score: 80%
3. **Manager attestation** — Direct manager confirms participation
4. **Annual audit** — Internal audit reviews completion rates

---

## 5. New Hire and Role Change Training

| Trigger | Training Required | Completion Deadline |
|---------|-------------------|---------------------|
| **New hire** | Foundations + role-specific modules | Within 30 days of start date |
| **Role change** | New role-specific modules | Within 30 days of role change |
| **PHI access granted** | HIPAA Privacy and Security | Before PHI access is provisioned |
| **Policy update** | Affected module(s) | Within 30 days of policy update |
| **Incident-related** | Relevant remediation training | Within 14 days of incident closure |

---

## 6. Quarterly Phishing Simulation

AegisGate conducts quarterly phishing simulation exercises:

| Quarter | Simulation Type | Target | Results | Remediation |
|---------|----------------|--------|---------|-------------|
| Q3 2026 | Baseline | All personnel | *Pending* | — |
| Q4 2026 | Follow-up | All personnel | *Pending* | Based on Q3 results |
| Q1 2027 | Advanced | All personnel | *Pending* | Based on Q4 results |
| Q2 2027 | Targeted | All personnel | *Pending* | Based on Q1 results |

**Targets:** < 5% click rate, < 15 minutes average report time, > 90% report rate.

---

## 7. Training Effectiveness Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Completion rate | 100% within 30 days | LMS tracking |
| Assessment pass rate | ≥ 80% | Assessment scores |
| Phishing click rate | < 5% | Quarterly simulation |
| Phishing report rate | > 90% | Quarterly simulation |
| Average report time | < 15 minutes | Quarterly simulation |
| Incident reduction | Year-over-year decrease | Incident tracking |

---

## 8. Continuous Improvement

Training content is updated:

- **Annually** — Full review of all modules against current threat landscape
- **Quarterly** — Phishing simulation results inform awareness content
- **Ad hoc** — After significant security incidents or policy changes
- **Regulatory** — Within 30 days of new regulatory requirements

---

## Attestation

This program was reviewed and approved by:

| Role | Name | Date |
|------|------|------|
| VP Engineering | AegisGate Security, LLC | 2026-07-29 |
| Security Lead | AegisGate Security, LLC | 2026-07-29 |