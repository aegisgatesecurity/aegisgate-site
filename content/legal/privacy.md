---
title: "Privacy Policy"
description: "How AegisGate Security, LLC collects, uses, discloses, and protects personal data. Effective 2026-06-07. 2.0 DRAFT for v3.3.0 beta."
type: "legal-doc"
---

<div class="alert alert-warning" style="border-left: 4px solid #f0ad4e; padding: 16px; margin-bottom: 24px; background: #fff8e1;">
<strong>📋 DRAFT — Not Legal Advice</strong><br>
This document is self-drafted by AegisGate Security, LLC for the v3.3.0 beta release. AegisGate Security, LLC is not a law firm, and this document does not constitute legal advice. Production-grade review by qualified legal counsel is deferred to v3.4.0+ when budget is available. Until then, customers and end users should rely on this document at their own risk and consult their own legal counsel.
</div>

# Privacy Policy

**AegisGate Security Platform**

**Effective Date:** 2026-06-07
**Version:** 2.0 DRAFT (v3.3.0 beta)
**Last Updated:** 2026-06-07

---

## Introduction

AegisGate Security, LLC ("Company," "we," "us," or "our") provides the AegisGate Security Platform, a security gateway for AI-augmented web services. This Privacy Policy explains how we collect, use, disclose, and protect personal data in connection with:

1. Our marketing website at **aegisgatesecurity.io** ("Marketing Site")
2. The AegisGate Security Platform ("Platform") and its management interface
3. Our billing, support, and customer success operations

We take privacy seriously. This Policy describes our practices in plain language and explains the rights you have under applicable data protection laws.

---

## 1. Personal Data We Collect

### 1.1 Information You Provide Directly
- **Account Information:** Name, email address, password (hashed), company name, role
- **Payment Information:** Credit card details, billing address (processed by Stripe; we do not store cardholder data on our servers)
- **Support Communications:** Emails, chat messages, and tickets you send to our support team
- **Beta Program Applications:** Information you provide when applying to our beta program

### 1.2 Information We Collect Automatically
- **Log Data:** IP address, browser type, operating system, referring URL, pages visited, timestamps
- **Session Data:** Authentication session identifiers, CSRF tokens
- **Telemetry:** Optional anonymous usage data (e.g., feature usage patterns, error reports) — opt-out available
- **Cookies:** See our [Cookie Policy](/legal/cookies/)

### 1.3 Information from Third Parties
- **Stripe:** Payment confirmation, subscription status, invoice data
- **Cloudflare:** Network-level request metadata (for the Marketing Site only)
- **OAuth/SSO providers (if you sign in with Google, GitHub, etc.):** Your name, email, and profile picture from the provider

### 1.4 Categories of Recipients of Personal Data

We share personal data with the following categories of recipients:

| Recipient Category | When | Data Shared | Lawful Basis |
|---|---|---|---|
| **Stripe, Inc.** | When you make a payment | Cardholder data, billing address, email | Performance of contract |
| **Cloudflare, Inc.** | When you visit aegisgatesecurity.io | IP address, user-agent, request metadata | Legitimate interest (site security and performance) |
| **Netlify, Inc.** | When you visit aegisgatesecurity.io | None (cookieless hosting) | Legitimate interest (site hosting) |
| **GitHub, Inc.** | When you visit our public repositories or sponsor us on GitHub | Public profile data (if you star, watch, or sponsor) | Legitimate interest (open-source community) |
| **Cloud hosting provider** | When customer uses AegisGate Managed Cloud (v3.4.0+; not currently offered) | All platform data | Performance of contract |
| **Courts, regulators, law enforcement** | When legally required | As compelled by legal process | Legal obligation |
| **Prospective acquirers** | In connection with a merger, acquisition, or sale of assets | All personal data | Legitimate interest (corporate transactions) |

**A complete and current list of our Subprocessors** is published at [/legal/subprocessors/](/legal/subprocessors/).

## 2. How We Use Personal Data

We use personal data for the following purposes:

| Purpose | Categories of Data | Lawful Basis (GDPR) |
|---|---|---|
| Provide and operate the Platform | Account, Log, Session | Performance of contract |
| Process payments | Payment | Performance of contract |
| Authenticate users | Account, Session | Performance of contract |
| Detect and prevent fraud and abuse | Log, Session | Legitimate interest |
| Provide customer support | Account, Support Communications | Performance of contract |
| Send transactional emails (receipts, license keys, security alerts) | Account | Performance of contract |
| Send marketing emails (newsletters, product updates) | Account | Consent (opt-in; opt-out in every email) |
| Comply with legal obligations | Any | Legal obligation |
| Improve the Platform (aggregated, anonymized) | Telemetry, Log | Legitimate interest (opt-out available) |

We do **not** sell personal data. We do **not** use personal data for automated decision-making that produces legal effects on individuals.

## 3. Data Retention

We retain personal data for the following periods:

| Category | Retention Period | Reason |
|---|---|---|
| Account data | While account is active + 30 days after deletion | Account recovery, dispute resolution |
| Payment data | 7 years (US IRS requirements) | Tax compliance |
| Audit logs | 7 days (Community), 30 days (Starter), 30 days (Developer), 90 days (Professional), as agreed (Enterprise) | Service improvement, security |
| Support tickets | 3 years after closure | Dispute resolution, training |
| Marketing email engagement | Until you unsubscribe + 30 days | Deliverability |
| Backup snapshots | 90 days (overwritten in normal rotation) | Disaster recovery |
| Telemetry (if enabled) | 13 months | Trend analysis |

When personal data is no longer needed, we delete it from production systems within 30 days and from backups within 90 days.

## 4. Security

We implement appropriate technical and organizational measures to protect personal data, including:

- **Encryption in transit:** TLS 1.2+ for all network communication
- **Encryption at rest:** AES-256 for sensitive data stores
- **Access controls:** Role-based access with least-privilege; multi-factor authentication for all production access
- **Network controls:** VPC isolation, security groups, no public database access
- **Vulnerability management:** Continuous dependency scanning, container image scanning, periodic penetration tests
- **Incident response:** Documented IR plan with a 72-hour breach notification commitment to customers
- **Personnel security:** Background checks, security training, confidentiality agreements for all employees and contractors

A current security posture summary is available at https://aegisgatesecurity.io/security (a self-attested posture document; full third-party SOC 2 Type II is planned for v3.5.0+).

## 5. Your Rights

### 5.1 Rights Under GDPR (EEA / UK / Swiss Data Subjects)
If you are located in the European Economic Area, the United Kingdom, or Switzerland, you have the right to:
- **Access** the personal data we hold about you
- **Rectification** of inaccurate or incomplete data
- **Erasure** ("right to be forgotten")
- **Restriction** of processing in certain circumstances
- **Data portability** in a machine-readable format
- **Object** to processing based on legitimate interest
- **Withdraw consent** where processing is based on consent
- **Lodge a complaint** with your local data protection authority

To exercise these rights, contact us at **privacy@aegisgatesecurity.io**. We will respond within 30 days.

### 5.2 Rights Under CCPA/CPRA (California Residents)
If you are a California resident, you have the right to:
- **Know** what personal data we collect, the categories, the sources, the business purpose, and the categories of recipients
- **Delete** personal data we have collected from you (subject to certain exceptions)
- **Correct** inaccurate personal data
- **Opt out of sale or sharing** — we do not sell or share personal data, so this is not applicable
- **Limit the use of sensitive personal information** — we do not use sensitive personal information for purposes requiring this right
- **Non-discrimination** for exercising your CCPA rights

To exercise these rights, contact us at **privacy@aegisgatesecurity.io** or call our toll-free number at +1-888-AEGIS-WI. We will respond within 45 days.

### 5.3 Rights Under Other Jurisdictions
We extend the rights described in Section 5.1 to all data subjects, regardless of jurisdiction, to the extent permitted by applicable law.

## 6. International Data Transfers

### 6.1 Data Location
The Platform is designed to be self-hosted by customers on their own infrastructure. Customers may choose any data location they prefer. For our own systems (Marketing Site, billing, support), we use infrastructure located in the United States.

For the future AegisGate Managed Cloud offering (planned v3.4.0+), data will be hosted in US-based data centers, with EU and APAC regional hosting available as add-on options.

### 6.2 Transfer Mechanisms
When we transfer personal data from the EEA, UK, or Switzerland to the United States, we rely on:
- The **EU-U.S. Data Privacy Framework** (where the recipient is certified)
- **Standard Contractual Clauses** approved by the European Commission (where the recipient is not certified)
- The recipient's **binding corporate rules** (for intra-group transfers)

For Swiss transfers, we rely on the SCCs as adapted for Switzerland.

## 7. Children's Privacy

The Platform is not directed to children under the age of 16, and we do not knowingly collect personal data from children. If we learn that we have collected personal data from a child under 16, we will delete it promptly. If you believe we have collected data from a child, contact us at **privacy@aegisgatesecurity.io**.

## 8. Changes to This Policy

We may update this Privacy Policy from time to time. The most current version is always available at https://aegisgatesecurity.io/legal/privacy.

Material changes will be communicated via:
- A banner on aegisgatesecurity.io for at least 30 days
- An email to active subscribers at least 30 days before the change takes effect

The "Last Updated" date at the top of this Policy indicates when the most recent change was made.

## 9. Contact

For questions about this Privacy Policy or to exercise your rights, contact us at:

**AegisGate Security, LLC**
**Data Protection Officer:** privacy@aegisgatesecurity.io
**Email:** privacy@aegisgatesecurity.io
**Website:** https://aegisgatesecurity.io/contact
**Toll-free (US/Canada):** +1-888-AEGIS-WI

**AegisGate Security, LLC** is the legal entity responsible for the processing of personal data described in this Policy. The Company is organized under the laws of the State of Wisconsin, USA.

## Appendix A: Subprocessors

The current and complete list of Subprocessors is maintained at [/legal/subprocessors/](/legal/subprocessors/). As of the Last Updated date above, our Subprocessors are:

| Subprocessor | Purpose | Data Processed | Safeguards |
|---|---|---|---|
| Stripe, Inc. | Payment processing | Cardholder data, billing address, email | PCI-DSS Level 1; DPA; SOC 2 Type II |
| Cloudflare, Inc. | CDN and DDoS protection (Marketing Site) | IP address, request metadata | DPA; SOC 2 Type II; ISO 27001 |
| Netlify, Inc. | Static site hosting (Marketing Site) | None (cookieless analytics) | DPA; SOC 2 Type II |
| GitHub, Inc. | Source code hosting and CI/CD | Public source code only | DPA; SOC 2 Type II |

*This list will be updated as Subprocessors change. Last updated: 2026-06-07. For the current list, see [/legal/subprocessors/](/legal/subprocessors/).*

---

*— Counsel Sign-Off Required —*

*This document is a 2.0 DRAFT for the v3.3.0 beta release. When budget is available, AegisGate Security, LLC will engage qualified counsel to review this Privacy Policy and convert it from a self-drafted DRAFT to a production-grade legal document. Until then, customers and end users should rely on this document at their own risk and consult their own legal counsel.*

*Retention periods, data location, and lawful bases reflect the platform's documented behavior as of v3.3.0 (2026-06-07). Consult the most recent version of this Policy and the most recent Subprocessor List at [/legal/subprocessors/](/legal/subprocessors/).*

**Version:** 2.0 DRAFT (v3.3.0 beta)
**Last Updated:** 2026-06-07
**Next Review Date:** 2026-09-07 (quarterly review, or sooner if materially changed)
**Counsel Review Required:** Yes (deferred to v3.4.0+ budget cycle)
