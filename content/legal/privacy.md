---
title: "Privacy Policy"
description: "How AegisGate Security, LLC collects, uses, discloses, and protects personal data. Effective 2026-06-07. 2.0 DRAFT for v3.5.0."
type: "legal-doc"
---

<div class="alert alert-warning" style="border-left: 4px solid #f0ad4e; padding: 16px; margin-bottom: 24px; background: #fff8e1;">
<strong>📋 DRAFT — Not Legal Advice</strong><br>
This document is self-drafted by AegisGate Security, LLC for the v3.5.0 release. AegisGate Security, LLC is not a law firm, and this document does not constitute legal advice. Production-grade review by qualified legal counsel is deferred to v3.5.0+ when budget is available. Until then, customers and end users should rely on this document at their own risk and consult their own legal counsel.
</div>

# Privacy Policy

**AegisGate Security Platform**

**Effective Date:** 2026-06-07
**Version:** 2.0 DRAFT (v3.5.0)
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
| **Cloud hosting provider** | When customer uses AegisGate Managed Cloud (v3.5.0+; not currently offered) | All platform data | Performance of contract |
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
| Audit logs | 7 days (Community), 30 days (Developer), 90 days (Professional), as agreed (Enterprise) | Service improvement, security |
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

A current security posture summary is available at https://aegisgatesecurity.io/security (a self-attested posture document; SOC 2 Type 1 preparation is underway; targeting completion in Q4 2026).

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

For the future AegisGate Managed Cloud offering (planned v3.5.0+), data will be hosted in US-based data centers, with EU and APAC regional hosting available as add-on options.

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

## 10. California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)

This Section 10 applies exclusively to California residents, as required by the California Consumer Privacy Act of 2018 (Cal. Civ. Code § 1798.100 et seq.) and the California Privacy Rights Act of 2020 (collectively, "CCPA/CPRA"). Where this section conflicts with any other section of this Privacy Policy, this section controls with respect to California residents.

### 10.1 Notice at Collection (CCPA § 1798.100(b))

At or before the point of collection, we notify California residents of the categories of personal information we collect and the business or commercial purposes for which we collect that information. This Notice at Collection is provided:

- **On our Marketing Site** via this Privacy Policy and our [Cookie Policy](/legal/cookies/), accessible from the site footer and cookie consent banner
- **On our Platform** via this Privacy Policy, accessible from the account registration flow and the Platform settings interface
- **At account creation** through the sign-up form, which links directly to this Policy

The categories of personal information we collect, the sources, and the purposes are described in Section 1 (Personal Data We Collect) and Section 2 (How We Use Personal Data) above. For a detailed category-by-category breakdown, see Section 10.2 (Right to Know) below.

### 10.2 Right to Know (CCPA § 1798.100, § 1798.110, § 1798.115, § 1798.130)

California residents have the right to request, up to twice per 12-month period, the following information about the personal information we have collected about them during the preceding 12 months:

- The categories of personal information collected
- The specific pieces of personal information collected
- The categories of sources from which personal information was collected
- The business or commercial purposes for collecting or selling personal information
- The categories of third parties with whom personal information is shared
- The categories of personal information sold or disclosed for a business purpose

#### Category-by-Category Table (12-Month Lookback)

| Category (per CCPA § 1798.140(v)) | Examples | Collected | Purpose | Sold / Shared | Retention |
|---|---|---|---|---|---|
| **A. Identifiers** | Name, email address, IP address, account ID, session token | Yes | Account creation, authentication, service delivery, communication | Not sold; shared with service providers for the purposes listed | Active account + 30 days; log data: 13 months |
| **B. Customer Records Information** (Cal. Civ. Code § 1798.80(e)) | Billing address, payment confirmation, subscription status, support ticket history | Yes | Billing, account management, customer support | Not sold; shared with Stripe for payment processing | Payment data: 7 years; support data: 3 years |
| **C. Commercial Information** | Product version, license type, purchase history, feature usage tier | Yes | Service delivery, billing, product improvement | Not sold; shared with service providers as needed | Active account + 30 days |
| **D. Internet or Other Electronic Network Activity Information** | Browsing history on aegisgatesecurity.io, pages visited, interaction timestamps, search queries | Yes | Site improvement, security, analytics | Not sold; shared with Cloudflare for site performance and security | 13 months |
| **E. Geolocation Data** | Country/region inferred from IP address (not precise GPS) | Yes | Fraud prevention, service localization | Not sold; not shared | 13 months (IP-based, not stored separately) |
| **F. Professional or Employment Information** | Company name, job title, role | Yes | Account provisioning, service customization | Not sold; not shared | Active account + 30 days |
| **G. Inferences Drawn** | Usage patterns, feature preferences, risk scores (for fraud prevention) | Yes | Product improvement, security, personalization | Not sold; not shared | 13 months (aggregated); active account + 30 days (individual) |
| **H. Sensitive Personal Information** (CPRA § 1798.140(ae)) | Precise geolocation (not collected), account login credentials (hashed password), government-issued ID numbers (not collected), racial/ethnic origin (not collected), health data (not collected), union membership (not collected) | Partial — we collect only hashed passwords; we do not collect precise geolocation, SSN, government IDs, racial/ethnic origin, health data, or union membership | Authentication (hashed password only) | Not sold; not shared beyond what is necessary for authentication | Active account + 30 days |

**Sources of personal information:** We collect personal information directly from you (when you create an account, make a purchase, or contact us), automatically from your use of our services (log data, telemetry), and from third parties (Stripe, Cloudflare, OAuth/SSO providers) as described in Section 1.

**Business or commercial purposes:** See Section 2 (How We Use Personal Data) for a complete description.

### 10.3 Right to Delete (CCPA § 1798.105)

California residents have the right to request that we delete personal information we have collected from them, subject to certain exceptions.

**How to Submit a Deletion Request:** Contact us at privacy@aegisgatesecurity.io or call +1-888-AEGIS-WI. You may also submit a request through your account settings on the Platform.

**Exceptions — We may retain personal information even after a deletion request when necessary to:**

1. Complete the transaction for which the personal information was collected, or provide a good or service reasonably anticipated by the consumer, or otherwise reasonably anticipated within the context of our ongoing business relationship with the consumer
2. Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, and prosecute those responsible for such activity
3. Identify and repair bugs that impair existing intended functionality
4. Exercise free speech or other legally protected rights, or exercise the right of another consumer or natural person under the law
5. Comply with a legal obligation under federal, state, or local law
6. Make internal use of the personal information that is reasonably necessary for our internal business purposes, provided the information was collected in the course of the consumer's interaction with us and is not sold or shared
7. Comply with an obligation under federal, state, or local law to retain the personal information
8. Use the personal information for internal use that is reasonably necessary for us to verify the identity of the consumer or another natural person

**Response Timeline:** We will acknowledge receipt of your deletion request within 10 business days and complete our response within 45 days (with a single 45-day extension when reasonably necessary, provided we notify you of the reason for the extension).

**What Happens After Deletion:** When we delete personal information, we remove it from production systems within 30 days and from backups within 90 days. We will also direct our service providers to delete the information from their systems, unless an exception above applies.

### 10.4 Right to Opt-Out of Sale or Sharing (CPRA)

California residents have the right to opt out of the "sale" or "sharing" of their personal information as those terms are defined under the CCPA/CPRA.

**We do NOT sell personal information.** We have never sold personal information and we do not share personal information for cross-context behavioral advertising purposes. Therefore, there is no need for a "Do Not Sell or Share My Personal Information" opt-out mechanism.

However, we are required to provide a clear and conspicuous link to our "Do Not Sell or Share My Personal Information" page. Because we do not sell or share personal information as defined by the CCPA/CPRA, this link serves as a confirmation of our policy:

> **[Do Not Sell or Share My Personal Information](https://aegisgatesecurity.io/legal/privacy#ccpa-opt-out)** — We do not sell or share your personal information.

We do share personal information with **service providers** (as defined by the CCPA/CPRA) for limited business purposes, as described in Section 1.4 and the category-by-category table in Section 10.2. Our service providers are contractually bound to use personal information only for the specific business purposes for which we share it and to maintain appropriate safeguards.

### 10.5 Right to Limit Use of Sensitive Personal Information (CPRA § 1798.121)

California residents have the right to direct a business to limit the use of sensitive personal information to what is reasonably necessary to perform the services or provide the goods reasonably expected by the consumer, and to not use sensitive personal information for any other purpose unless an exception applies.

**Sensitive personal information we collect:** We collect only hashed passwords as sensitive personal information, which falls under the "account log-in information" category. We use hashed passwords solely for authentication purposes — which is the business purpose for which they are reasonably expected.

**We do NOT use sensitive personal information for:**

- Targeted advertising
- Profiling in furtherance of decisions that produce legal or similarly significant effects
- Any purpose other than the disclosed business purposes described in this Policy

Because we do not use sensitive personal information beyond what is reasonably necessary to perform the services expected by the consumer, the right to limit use does not require any additional action from you. If this changes, we will update this section and provide the required notice.

### 10.6 Right to Non-Discrimination (CCPA § 1798.125)

We will **not** discriminate against any California resident for exercising any of their CCPA/CPRA rights. This means we will not:

1. Deny you goods or services
2. Charge different prices or rates for goods or services, including through the use of discounts or other benefits or imposing penalties
3. Provide a different level or quality of goods or services
4. Suggest that you will receive a different level or quality of goods or services

We may, however, offer **financial incentives** permitted by the CCPA/CPRA (Cal. Civ. Code § 1798.125(a)(3)), provided the incentive is reasonably related to the value of the consumer's data and we obtain your voluntary opt-in consent. We currently do not offer any such financial incentive programs.

Nothing in this section prohibits us from charging a different price or rate or providing a different level or quality of goods or services to a consumer if that difference is reasonably related to the value provided to the business by the consumer's data.

### 10.7 Authorized Agents

California residents may designate an **authorized agent** to submit CCPA/CPRA rights requests on their behalf. To designate an authorized agent:

1. **Written Authorization:** The consumer must provide a signed, written authorization to the agent that clearly describes the scope of the agent's authority
2. **Identity Verification:** Both the consumer and the authorized agent may be required to verify their identities as described in Section 10.8
3. **Submission:** The authorized agent may submit requests on behalf of the consumer to privacy@aegisgatesecurity.io or by calling +1-888-AEGIS-WI

**For requests to delete or opt out:** We may require the authorized agent to provide proof of authorization, including a signed power of attorney or other legal document establishing the agent's authority to act on the consumer's behalf.

**For requests to know:** We may require the consumer to verify their identity directly with us in addition to the authorized agent's verification.

We reserve the right to deny a request from an authorized agent if we cannot verify the consumer's identity or the agent's authority, or if the agent's request is not covered by the scope of the consumer's authorization.

### 10.8 Verification Process

To protect the privacy and security of California residents, we verify the identity of any consumer submitting a CCPA/CPRA rights request before processing the request.

**How We Verify Identity:**

| Request Type | Verification Method |
|---|---|
| **Right to Know (categories)** | Account email verification + matching account details (name, email, associated company) |
| **Right to Know (specific pieces)** | Two-factor verification: (1) account email verification, AND (2) identity document review or knowledge-based authentication (e.g., last 4 digits of payment method on file, account creation date) |
| **Right to Delete** | Account email verification + confirmation from the registered email address |
| **Right to Correct** | Account email verification + matching account details |
| **Right to Limit Use of Sensitive PI** | Account email verification + matching account details |
| **Opt-Out of Sale/Sharing** | Not applicable (we do not sell or share personal information) |

**Steps:**

1. **Submit your request** via email to privacy@aegisgatesecurity.io, by phone at +1-888-AEGIS-WI, or through your account settings on the Platform
2. **Receive acknowledgment** within 10 business days
3. **Verify your identity** using the method specified above. We will send a verification link to the email address on file
4. **Request processed** within 45 days (with a single 45-day extension if reasonably necessary, and we will notify you of the reason)

**If we cannot verify your identity:** We will notify you and may request additional information. If we cannot verify your identity after reasonable attempts, we may deny the request. We will not collect more personal information than is necessary to verify your identity for purposes of processing your request.

### 10.9 CCPA/CPRA Contact Information

For all CCPA/CPRA-related inquiries, requests, and complaints, contact:

**AegisGate Security, LLC**
Attn: Privacy — CCPA/CPRA Requests
Email: privacy@aegisgatesecurity.io
Phone: +1-888-AEGIS-WI
Website: https://aegisgatesecurity.io/legal/privacy

Mail:
AegisGate Security, LLC
Attn: Privacy — CCPA/CPRA Requests
Wisconsin, USA

We will respond to all verifiable CCPA/CPRA requests within 45 days of receipt. If more time is needed, we will notify you of the reason and extend the response period by an additional 45 days, as permitted by law. We will provide our response in writing and in a readily portable format.

---

*— Counsel Sign-Off Required —*

*This document is a 2.0 DRAFT for the v3.5.0 release. When budget is available, AegisGate Security, LLC will engage qualified counsel to review this Privacy Policy and convert it from a self-drafted DRAFT to a production-grade legal document. Until then, customers and end users should rely on this document at their own risk and consult their own legal counsel.*

*Retention periods, data location, and lawful bases reflect the platform's documented behavior as of v3.3.0 (2026-06-07). Consult the most recent version of this Policy and the most recent Subprocessor List at [/legal/subprocessors/](/legal/subprocessors/).*

**Version:** 2.0 DRAFT (v3.5.0)
**Last Updated:** 2026-06-07
**Next Review Date:** 2026-09-07 (quarterly review, or sooner if materially changed)
**Counsel Review Required:** Yes (deferred to v3.5.0+ budget cycle)
