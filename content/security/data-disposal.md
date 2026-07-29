---
title: "Data Disposal Policy"
description: "AegisGate Security, LLC data classification and disposal procedures. Covers all data types across the Platform lifecycle."
type: "security"
date: 2026-07-29
layout: single
---

# Data Disposal Policy

**Version:** 1.0
**Owner:** AegisGate Security, LLC
**Review Cycle:** Annual (next review: Q3 2027)
**Contact:** security@aegisgatesecurity.io

---

## 1. Purpose

This policy defines how AegisGate Security, LLC classifies, retains, and disposes of data across all lifecycle phases. It supports compliance with SOC 2 Confidentiality criteria (C3.1), HIPAA (45 C.F.R. § 164.530(j)), GDPR Article 17 (Right to Erasure), and CCPA/CPRA deletion requirements.

---

## 2. Data Classification

| Classification | Description | Examples | Retention |
|---------------|-------------|----------|-----------|
| **Critical** | Data whose loss or unauthorized access would cause severe harm | Encryption keys, license signing keys, audit log chains | Indefinite (until customer deletion request) |
| **Confidential** | Data protected by regulation or contract | PHI, PII, payment data, authentication credentials | Duration of contract + regulatory minimum |
| **Internal** | Data for internal operations, not public | Configuration files, session state, performance metrics | 90 days (default) to 1 year (configurable) |
| **Public** | Data intended for public access | Documentation, website content, open-source code | Indefinite (version-controlled) |

---

## 3. Data by Source

### 3.1 AegisGate Platform (Self-Hosted)

| Data Type | Classification | Storage Location | Disposal Method |
|-----------|---------------|-----------------|-----------------|
| Audit logs | Critical | Customer-managed volume | Customer-controlled deletion |
| Configuration | Internal | Customer-managed volume | Customer-controlled deletion |
| Session state | Internal | Ephemeral (Redis) | Automatic on restart |
| Compliance reports | Confidential | Customer-managed volume | Customer-controlled deletion |
| Detection patterns | Internal | Embedded in binary | Container replacement |

**AegisGate never sees customer data after deployment.** All data disposal on the Platform is the customer's responsibility. AegisGate provides the tools; the customer controls the data.

### 3.2 AegisGate Corporate Website

| Data Type | Classification | Storage Location | Disposal Method | Retention |
|-----------|---------------|-----------------|-----------------|-----------|
| Web server logs | Internal | Cloudflare | Automatic purge | 30 days |
| Contact form submissions | Confidential | Netlify Forms | Manual deletion on request | Duration of inquiry + 90 days |
| Analytics (aggregated) | Internal | Cloudflare Analytics | Automatic purge | 30 days |
| Cookie consent preferences | Internal | Browser localStorage | User-controlled | Until cleared |

### 3.3 Source Code and Development

| Data Type | Classification | Storage Location | Disposal Method | Retention |
|-----------|---------------|-----------------|-----------------|-----------|
| Source code | Public (Apache 2.0) | GitHub | Repository deletion | Indefinite |
| CI/CD artifacts | Internal | GitHub Actions | Automatic purge | 90 days |
| Issue tracking | Internal | GitHub Issues | Issue closure | Indefinite (public) |
| Release signing keys | Critical | Local HSM | Key ceremony destruction | Indefinite |

### 3.4 Payment Processing

| Data Type | Classification | Storage Location | Disposal Method | Retention |
|-----------|---------------|-----------------|-----------------|-----------|
| Payment card data | Confidential | Stripe (tokenized) | Stripe-managed per PCI-DSS | Per Stripe policy |
| Transaction records | Confidential | Stripe | Stripe-managed | 7 years (tax requirement) |
| Customer billing records | Confidential | Stripe Dashboard | Manual deletion on request | Duration of account + 7 years |

**AegisGate never stores full payment card numbers.** All payment processing is handled by Stripe, a PCI-DSS Level 1 service provider. AegisGate receives only tokenized references.

---

## 4. Disposal Methods

| Method | Classification | Description | Verification |
|--------|---------------|-------------|--------------|
| **Cryptographic erasure** | Critical | Destroy encryption keys, rendering encrypted data unrecoverable | Key destruction audit log |
| **Secure delete** | Confidential | Overwrite with zeros (1-pass minimum) before deletion | File system verification |
| **Automatic purge** | Internal | TTL-based automatic deletion (logs, analytics, session data) | Retention policy audit |
| **Container replacement** | Internal | Replace Docker container; ephemeral state is lost | Health check verification |
| **Manual deletion** | Confidential | Customer-initiated deletion via API or support request | Deletion confirmation email |
| **Physical destruction** | Critical | Physical media destruction (for decommissioned hardware) | Destruction certificate |

---

## 5. Customer Data Deletion

### 5.1 Right to Erasure (GDPR Article 17)

Upon verified request, AegisGate will:

1. Delete all personal data from corporate systems within 30 days
2. Confirm deletion in writing to the requesting individual
3. Notify subprocessors to delete corresponding data
4. Retain only data required by law (tax records, audit logs per regulatory retention)

### 5.2 CCPA/CPRA Deletion Rights

Upon verified request, AegisGate will:

1. Delete personal information from records within 45 days
2. Direct service providers to delete corresponding records
3. Confirm deletion in writing
4. Retain only data exempt under CCPA § 1798.105(e)

### 5.3 HIPAA Data Destruction

For PHI handled under a BAA:

1. Customer initiates data destruction through Platform administrative interface
2. AegisGate confirms no PHI exists in corporate systems (self-hosted architecture)
3. Destruction methods comply with NIST SP 800-88 (Guidelines for Media Sanitization)
4. Certificate of destruction provided upon request

---

## 6. Media Disposal

| Media Type | Classification | Disposal Method | Verification |
|-----------|---------------|----------------|--------------|
| Hard drives (corporate) | Confidential | NIST SP 800-88 Clear/Purge | Destruction log |
| SSDs (corporate) | Confidential | Cryptographic erase | ATA Secure Erase log |
| Cloud storage volumes | Internal | Provider deletion API | Provider confirmation |
| Backup media | Confidential | Physical destruction | Destruction certificate |
| Docker container layers | Internal | Container removal + image prune | Docker system prune |

---

## 7. Verification and Audit

| Activity | Frequency | Responsible | Evidence |
|----------|-----------|-------------|----------|
| Data retention policy review | Annual | Security Lead | Policy document |
| Deletion request log review | Quarterly | Security Lead | Deletion audit trail |
| Media disposal verification | Per disposal event | Security Lead | Destruction certificates |
| Compliance engine data classification audit | Quarterly | Automated | Compliance report output |
| Subprocessor data handling review | Annual | VP Engineering | Vendor risk assessment |

---

## 8. Exceptions

No exceptions to this policy are permitted without written approval from the Security Lead. All exceptions must be documented with:

1. Business justification
2. Risk assessment
3. Compensating controls
4. Expiration date
5. Approver signature

---

## Attestation

This policy was reviewed and approved by:

| Role | Name | Date |
|------|------|------|
| VP Engineering | AegisGate Security, LLC | 2026-07-29 |
| Security Lead | AegisGate Security, LLC | 2026-07-29 |