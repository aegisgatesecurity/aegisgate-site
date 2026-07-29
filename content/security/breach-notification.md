---
title: "Breach Notification"
description: "How to report security breaches and how AegisGate Security, LLC notifies affected parties. Compliant with HIPAA, GDPR, and CCPA requirements."
type: "security"
date: 2026-07-29
layout: single
---

# Breach Notification Policy

**Last updated:** 2026-07-29
**Policy owner:** AegisGate Security, LLC
**Contact:** security@aegisgatesecurity.io

---

## Our Commitment

AegisGate Security, LLC is committed to transparency and timely notification in the event of a data breach. This policy describes:

1. How to report a suspected breach to AegisGate
2. How AegisGate notifies affected parties
3. Our compliance with HIPAA, GDPR, and CCPA breach notification requirements

---

## Reporting a Breach to AegisGate

### Security Vulnerabilities

If you believe you have discovered a security vulnerability in any AegisGate product, please see our [Vulnerability Disclosure Policy](/security/) for reporting instructions.

### Data Breaches

If you believe your personal data has been compromised through an AegisGate product or service, please contact us immediately:

| Channel | Details |
|---------|---------|
| **Email** | security@aegisgatesecurity.io |
| **PGP** | Fingerprint: `97C0 418A DBE0 5396` (available in [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/SECURITY.md)) |
| **Response time** | 24-hour acknowledgment, 72-hour initial triage |

---

## AegisGate's Breach Notification Commitments

### HIPAA Breach Notification (45 C.F.R. § 164.400-414)

For Professional and Enterprise tier customers who have executed a Business Associate Agreement (BAA):

| Requirement | Commitment |
|-------------|-----------|
| **Individual notification** | Without unreasonable delay, but no later than 60 days from discovery |
| **HHS notification** | Annual log of breaches affecting fewer than 500 individuals; notification within 60 days for breaches affecting 500+ individuals |
| **Media notification** | If a breach affects 500+ individuals in a single state or jurisdiction, notification to prominent media outlets in that state |
| **Content** | Description of breach, types of information involved, steps individuals should take, contact information |

### GDPR Breach Notification (Article 33/34)

| Requirement | Commitment |
|-------------|-----------|
| **Supervisory authority** | Notification within 72 hours of becoming aware of a breach likely to result in a risk to data subjects' rights |
| **Data subjects** | Notification without undue delay when breach is likely to result in a high risk to rights and freedoms |
| **Content** | Nature of breach, categories and approximate number of data subjects, likely consequences, measures taken or proposed |

### CCPA/CPRA Breach Notification

| Requirement | Commitment |
|-------------|-----------|
| **Notification** | Expedited notification to affected California residents |
| **Content** | Types of personal information compromised, general description of breach, steps taken |
| **Format** | Written notification delivered to last known address or email |

---

## Breach Severity Classification

| Level | Definition | Internal Response | External Notification |
|-------|------------|-------------------|----------------------|
| **Critical (P1)** | Confirmed data exfiltration, PHI exposure, credential theft | 1 hour | Within 72 hours (GDPR) or 60 days (HIPAA) |
| **High (P2)** | Confirmed unauthorized access, limited scope | 4 hours | Within 72 hours (GDPR) or 60 days (HIPAA) |
| **Medium (P3)** | Suspected compromise, investigation needed | 24 hours | If confirmed, within required timelines |
| **Low (P4)** | No data exposure, policy violation | 7 days | Not required unless confirmed |

---

## Notification Channels

### To Customers

| Method | When Used |
|--------|-----------|
| **Email** | Primary notification channel for all breaches |
| **In-product banner** | For active breaches affecting platform users |
| **Security advisory** | Published at [/cve/](/cve/) for AI-specific vulnerabilities |
| **This website** | Prominent notice on the homepage |

### To Regulators

| Regulator | When | How |
|-----------|------|-----|
| **HHS OCR** | Breach affecting 500+ individuals | HHS Breach Portal |
| **State attorneys general** | As required by state breach notification laws | Written notification |
| **Supervisory authority (GDPR)** | Breach likely to result in risk to data subjects | Via lead supervisory authority |
| **California AG** | Breach affecting California residents | Written notification per CCPA |

### To the Public

| Channel | When Used |
|---------|-----------|
| **This page** | All confirmed breaches |
| **CVE-for-AI feed** | AI-specific vulnerabilities ([/cve/](/cve/)) |
| **X/Twitter** | [@aegisgate](https://x.com/aegisgate) |
| **Mastodon** | [@aegisgate@mastodon.social](https://mastodon.social/@aegisgate) |

---

## Self-Hosted Deployments

**Important:** AegisGate Security Platform is self-hosted and on-premises by design. AegisGate does not host, process, or store customer data outside the customer's own infrastructure.

For self-hosted deployments:
- **AegisGate is not a data processor** for customer data — the customer controls their own infrastructure
- AegisGate will notify customers of vulnerabilities in the AegisGate software that could lead to a breach
- Customers are responsible for their own breach notification to their end users and regulators
- AegisGate will provide assistance and guidance to customers experiencing a breach

---

## Past Incidents

AegisGate publishes all security advisories at [/cve/](/cve/). Current advisories:

| ID | Date | Severity | Description |
|----|------|----------|-------------|
| [AEGIS-2026-0001](/cve/aegis-2026-0001/) | 2026-07-28 | HIGH (7.5) | Prompt injection via Markdown image alt-text |

---

## Contact

For breach-related inquiries:

- **Security:** security@aegisgatesecurity.io
- **Privacy:** privacy@aegisgatesecurity.io
- **Legal:** legal@aegisgatesecurity.io
- **HIPAA Compliance:** hipaa@aegisgatesecurity.io
- **X/Twitter:** [@aegisgate](https://x.com/aegisgate)
- **Mastodon:** [@aegisgate@mastodon.social](https://mastodon.social/@aegisgate)

---

*AegisGate Security, LLC maintains this breach notification policy in compliance with HIPAA (45 C.F.R. § 164.400-414), GDPR (Articles 33-34), and CCPA/CPRA (Civil Code § 1798.82).*