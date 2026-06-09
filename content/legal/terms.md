---
title: "Terms of Service"
description: "The agreement governing your use of AegisGate Security Platform. Effective 2026-06-07. 2.0 DRAFT for v3.3.0 beta."
type: "legal-doc"
---

<div class="alert alert-warning" style="border-left: 4px solid #f0ad4e; padding: 16px; margin-bottom: 24px; background: #fff8e1;">
<strong>📋 DRAFT — Not Legal Advice</strong><br>
This document is self-drafted by AegisGate Security, LLC for the v3.3.0 beta release. AegisGate Security, LLC is not a law firm, and this document does not constitute legal advice. Production-grade review by qualified legal counsel is deferred to v3.4.0+ when budget is available. Until then, customers and counterparties should rely on this document at their own risk and consult their own legal counsel.
</div>

# Terms of Service

**AegisGate Security Platform**

**Effective Date:** 2026-06-07
**Version:** 2.0 DRAFT (v3.3.0 beta)
**Last Updated:** 2026-06-07

---

## 1. ACCEPTANCE OF TERMS

### 1.1 Acceptance
By creating an account, clicking "I agree," or otherwise using the AegisGate Security Platform ("Platform," "Service," or "AegisGate"), you ("Customer," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Platform.

### 1.2 Changes to These Terms
We may modify these Terms from time to time. Material changes will be communicated via:
- A banner on aegisgatesecurity.io for at least **30 calendar days**
- An email to active subscribers at least **60 calendar days** before the change takes effect

Continued use of the Platform after the effective date of a change constitutes acceptance of the modified Terms. If you do not agree to a material change, your sole remedy is to terminate your subscription and receive a pro-rated refund of prepaid fees.

### 1.3 Customer Identification
To accept these Terms, you must be at least 18 years old and have the legal capacity to enter into a binding contract. If you accept on behalf of an organization, you represent that you have authority to bind that organization to these Terms.

### 1.4 Acceptance Method
These Terms are accepted by:
- **Buy Button checkout:** Clicking "Buy" on aegisgatesecurity.io/pricing constitutes acceptance. The ToS version hash is recorded at purchase for audit purposes.
- **Self-service signup:** Checking the "I agree to the Terms of Service" checkbox on the signup form constitutes acceptance. The form's submission timestamp and the checked-state are recorded in the audit log.
- **Enterprise agreements:** Acceptance is recorded in the executed Order Form.

The current ToS version hash, your acceptance record, and the acceptance timestamp are available in your account dashboard.

## 2. DESCRIPTION OF SERVICE

### 2.1 Service Overview
The AegisGate Security Platform provides AI-aware API security, including:

**Five Platform Pillars:**
- **HTTP Security:** Bidirectional HTTP/HTTPS traffic inspection, threat detection, and policy enforcement
- **MCP (Model Context Protocol) Security:** Session protection for MCP traffic with security guardrails
- **A2A (Agent-to-Agent) Security:** Trust scoring and policy enforcement for inter-agent communication
- **Response Security:** PII detection, secret detection, and hallucination detection in AI model responses
- **Trust Framework:** Identity, authentication, and authorization for AI services

**Seven Compliance Modules (purchased as add-ons, Professional+ tier required for most):**
- HIPAA — HIPAA-compliant logging, PHI detection, BAA support
- PCI-DSS — Payment card data detection, PCI-scoped audit logs
- SOC 2 — SOC 2 Type II control mapping and evidence collection
- ISO 42001 — ISO/IEC 42001 AI management system controls
- FedRAMP — FedRAMP Moderate/High control mapping and continuous monitoring
- FIPS 140-2/140-3 — FIPS-validated cryptography enforcement and HSM integration
- EU AI Act — 82 controls across 8 categories of the EU AI Act (v3.3.0+)

**Core Capabilities:**
- Role-based access control (RBAC)
- Single sign-on (SSO) integration
- Audit logging and compliance reporting
- API gateway and policy enforcement point

### 2.2 Subscription Tiers

Services are provided according to the subscription tier you select:

| Tier | Monthly Rate | RPM Limit | Key Features |
|---|---|---|---|
| **Community** | Free | 120 RPM | Best-effort protection, 7-day audit log retention, community support |
| **Starter** | $29/mo | 600 RPM | Email support, 30-day audit log retention, basic compliance reporting |
| **Developer** | $99/mo | 1,000 RPM | SSO, RBAC, compliance modules add-on, 30-day audit log retention |
| **Professional** | $299/mo | 10,000 RPM | HIPAA / PCI-DSS / SOC 2 modules, 90-day audit log retention, 99.95% SLA, priority support |
| **Enterprise** | Contact sales | Custom | Custom SLA (up to 99.99%), custom compliance modules, dedicated CSM, custom audit log retention |

Compliance module add-on prices (per the v3.2.0 pricing decision, locked at purchase):
- HIPAA: $99/mo
- PCI-DSS: $99/mo
- SOC 2: $149/mo
- ISO 42001: $79/mo
- FedRAMP: $499/mo
- FIPS 140-2/140-3: $299/mo
- EU AI Act: $149/mo (v3.3.0+)

### 2.3 Service Availability
We strive to maintain high availability but do not guarantee uninterrupted access. See Section 7 for service level commitments by tier.

## 3. ACCOUNT REGISTRATION AND ACCESS

### 3.1 Account Creation
To use the Platform, you must create an account by providing accurate, current, and complete information. You agree to update your information to keep it accurate and current.

### 3.2 Account Security
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
- Use a strong, unique password
- Enable multi-factor authentication (MFA) when available
- Notify us immediately of any unauthorized use of your account

### 3.3 Account Suspension
We may suspend or terminate your account if:
- You violate these Terms
- Your payment method fails
- You pose a security risk to the Platform or other customers
- Required by law

## 4. PAYMENT TERMS

### 4.1 Fees
You agree to pay all fees associated with your subscription tier and any add-on modules you select. Fees are stated in US Dollars and are exclusive of taxes.

### 4.2 Payment Processing
Payments are processed by **Stripe, Inc.** We do not store your full payment card number, CVV, or expiration date on our servers. Stripe's privacy policy and security practices govern the processing of your payment data.

### 4.3 Billing Cycle
Subscriptions are billed in advance on a monthly or annual basis. Annual subscriptions receive a 15% discount.

### 4.4 Auto-Renewal
Subscriptions automatically renew for successive periods equal to the original subscription term unless you cancel before the renewal date.

### 4.5 Price Changes
We may change subscription prices with at least **30 calendar days' notice** before the change takes effect. The new price applies to the next renewal period. If you do not agree to a price change, your sole remedy is to cancel your subscription before the renewal date.

### 4.6 Late Payment
If your payment method fails, we may suspend or terminate your account after a **7-day grace period**. We will make reasonable efforts to notify you before suspension.

### 4.7 Refunds
Subscription fees are generally non-refundable, except:
- As required by law
- For documented billing errors
- For pro-rated refunds upon termination due to a material breach by us
- As expressly stated in a specific offer or promotion

## 5. ACCEPTABLE USE

### 5.1 Prohibited Uses
You agree not to:
- Use the Platform to scan, attack, or interfere with systems you do not own or have explicit authorization to test
- Reverse engineer, decompile, or attempt to extract the source code of the Platform
- Resell, sublicense, or redistribute the Platform or any portion thereof
- Use the Platform to process content that is illegal, infringing, or violates third-party rights
- Use the Platform in a manner that would cause us to lose any right or immunity from legal process
- Attempt to bypass rate limits, security measures, or usage quotas
- Use the Platform to build a competing product or service

### 5.2 Content Responsibility
You are solely responsible for the data, content, and instructions you provide to the Platform, and for the consequences of processing such data through the Platform.

### 5.3 AI-Generated Content
If you use the Platform's Response Security features to inspect AI-generated content, you are responsible for the underlying AI services you use and for any AI-generated content you publish or distribute. AegisGate Security, LLC is not a content moderation service and does not make representations about the suitability of AI-generated content for any particular use.

## 6. INTELLECTUAL PROPERTY

### 6.1 Our IP
The Platform, including all underlying technology, documentation, and trademarks, is and remains the exclusive property of AegisGate Security, LLC. These Terms do not grant you any ownership interest in the Platform.

### 6.2 Your Data
You retain all rights, title, and interest in your data that you process through the Platform. You grant us a limited, non-exclusive, royalty-free license to process your data solely as necessary to provide the Platform and as described in our Privacy Policy.

### 6.3 Feedback
If you provide feedback, suggestions, or ideas about the Platform, you grant us a perpetual, irrevocable, worldwide, royalty-free license to use such feedback for any purpose, including incorporating it into the Platform.

## 7. SERVICE LEVELS

### 7.1 Uptime Commitments

| Tier | Monthly Uptime |
|------|----------------|
| Community | 99.0% (best effort) |
| Starter | 99.5% |
| Developer | 99.9% |
| Professional | 99.95% |
| Enterprise | 99.99% (custom SLA) |

### 7.2 Service Credits
If we fail to meet the service level commitment for your tier in a given calendar month, you may be eligible for service credits, calculated as follows:

| Uptime Achieved | Service Credit |
|---|---|
| 99.0% – 99.5% | 10% of monthly fee |
| 95.0% – 99.0% | 25% of monthly fee |
| Below 95.0% | 50% of monthly fee |

Service credits are applied to your next billing cycle. To request a credit, contact **support@aegisgatesecurity.io** within 30 days of the incident with your account details and the date(s) of the incident.

### 7.3 Exclusions
Service level commitments do not apply during:
- Scheduled maintenance (with at least 7 days' notice)
- Circumstances beyond our reasonable control (e.g., natural disasters, ISP outages, government actions)
- Failures caused by your systems, networks, or third-party services
- Failures caused by your violation of these Terms
- Beta features (designated as "beta" in the documentation)

## 8. CONFIDENTIALITY

Each Party agrees to protect the other Party's confidential information using the same degree of care it uses to protect its own confidential information of like kind (and in any event, no less than reasonable care). Confidential information does not include information that:
- Is or becomes publicly known through no fault of the receiving Party
- Was known to the receiving Party before disclosure
- Is rightfully received from a third party without restriction
- Is independently developed by the receiving Party without use of the disclosing Party's confidential information

## 9. WARRANTIES AND DISCLAIMERS

### 9.1 Mutual Warranties
Each Party represents and warrants that it has the right and authority to enter into these Terms.

### 9.2 Our Warranties
We warrant that the Platform will perform materially in accordance with its documentation. Your exclusive remedy for breach of this warranty is the service credits described in Section 7.2.

### 9.3 Disclaimer
EXCEPT AS EXPRESSLY STATED IN THESE TERMS, THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE." AEGISGATE SECURITY, LLC DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT IT WILL MEET YOUR REQUIREMENTS.

## 10. INDEMNIFICATION

### 10.1 Our Indemnification of You
We will defend, indemnify, and hold you harmless from any third-party claim alleging that the Platform, as provided by us and used in accordance with these Terms, infringes any third-party intellectual property right. Our obligations do not apply to claims arising from:
- Modification of the Platform by anyone other than us
- Combination of the Platform with your data or third-party services
- Use of the Platform in violation of these Terms

### 10.2 Your Indemnification of Us
You will defend, indemnify, and hold us harmless from any third-party claim arising from:
- Your data processed through the Platform
- Your violation of these Terms
- Your violation of any applicable law

### 10.3 Indemnification Procedure
The indemnified Party shall:
- Promptly notify the indemnifying Party of the claim
- Grant the indemnifying Party sole control of the defense
- Provide reasonable cooperation

The indemnifying Party shall not settle any claim that imposes liability or admission on the indemnified Party without the indemnified Party's prior written consent (not to be unreasonably withheld).

## 11. LIMITATION OF LIABILITY

### 11.1 Cap on Liability
EACH PARTY'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS PAID OR PAYABLE BY YOU TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) $100 USD.

### 11.2 Exclusion of Damages
IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, BUSINESS INTERRUPTION, OR LOSS OF BUSINESS OPPORTUNITY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

### 11.3 Carve-Outs
The limitations in Sections 11.1 and 11.2 do not apply to:
- Your payment obligations
- A Party's indemnification obligations under Section 10
- A Party's breach of confidentiality obligations under Section 8
- A Party's gross negligence, willful misconduct, or fraud
- Liability that cannot be limited by applicable law

## 12. TERMINATION

### 12.1 Termination by You
You may terminate your subscription at any time through your account dashboard or by contacting **support@aegisgatesecurity.io**. Termination takes effect at the end of the current billing period.

### 12.2 Termination by Us
We may terminate your subscription:
- For convenience, with at least **30 calendar days' notice**
- Immediately, if you breach any provision of these Terms and fail to cure within **15 calendar days** of written notice (where the breach is curable)
- Immediately, if you engage in conduct that we reasonably believe to be fraudulent, illegal, or harmful to other customers or the Platform

### 12.3 Effect of Termination
Upon termination:
- Your right to use the Platform ceases immediately
- You may export your data for **30 calendar days** after termination
- After 30 days, we may delete your data from production systems
- Data in backups may persist for up to **90 calendar days**, after which such backups are overwritten in the normal course of business
- Provisions that by their nature should survive termination (including Sections 6, 8, 9.3, 10, 11, 13, 14) shall survive

## 13. DISPUTE RESOLUTION

### 13.1 Informal Resolution
Before filing any formal dispute, you agree to contact us at **legal@aegisgatesecurity.io** and attempt to resolve the dispute informally. We will attempt to resolve the dispute informally by contacting you via email.

### 13.2 Arbitration
If a dispute cannot be resolved informally within **30 calendar days**, the dispute shall be resolved through binding arbitration in **Brooklyn, Wisconsin** under the **American Arbitration Association (AAA) Commercial Arbitration Rules**. Judgment on the award may be entered in any court of competent jurisdiction.

Notwithstanding the foregoing, either Party may seek injunctive or other equitable relief in court to prevent or stop any breach of confidentiality or intellectual property rights.

### 13.3 Class Action Waiver
YOU AGREE THAT ANY DISPUTE RESOLUTION WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. IF FOR ANY REASON A CLAIM PROCEEDS IN COURT, YOU WAIVE ANY RIGHT TO A JURY TRIAL.

### 13.4 Exceptions
The following disputes are not subject to the arbitration provisions in Section 13.2:
- Disputes within the jurisdiction of small claims court
- Disputes related to intellectual property infringement
- Disputes related to unpaid fees

## 14. GENERAL PROVISIONS

### 14.1 Entire Agreement
These Terms, together with referenced policies (Privacy Policy, Cookie Policy, Data Processing Agreement, Subprocessor List) and any executed Order Form, constitute the entire agreement between you and AegisGate Security, LLC.

### 14.2 Amendment
These Terms may be amended as described in Section 1.2. No other amendments are effective without written agreement signed by an authorized representative of each Party.

### 14.3 Assignment
You may not assign these Terms without our prior written consent (not to be unreasonably withheld). We may assign these Terms to an affiliate or in connection with a merger, acquisition, or sale of substantially all of our assets.

### 14.4 Severability
If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall continue in full force and effect, and the invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.

### 14.5 No Waiver
Failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision.

### 14.6 Notices
Notices shall be sent to the email address associated with your account or to **legal@aegisgatesecurity.io**. Notices to AegisGate Security, LLC shall be sent to:

**AegisGate Security, LLC**
Wisconsin, USA
**Email:** legal@aegisgatesecurity.io

### 14.7 Force Majeure
Neither Party shall be liable for any failure or delay in performance caused by circumstances beyond its reasonable control, including natural disasters, war, terrorism, civil unrest, government actions, pandemics, internet or telecommunications failures, or labor disputes.

### 14.8 Independent Contractors
The Parties are independent contractors. These Terms do not create a partnership, joint venture, agency, or employment relationship.

### 14.9 No Third-Party Beneficiaries
These Terms do not create any third-party beneficiary rights.

### 14.10 Counterparts and Electronic Acceptance
These Terms may be accepted electronically. Electronic acceptance (via Buy Button click, signup-form checkbox, or e-signature) has the same legal effect as a handwritten signature.

## 15. CONTACT INFORMATION

For questions about these Terms, contact us at:

**AegisGate Security, LLC**
Wisconsin, USA
**Email:** legal@aegisgatesecurity.io
**Support:** support@aegisgatesecurity.io
**Website:** https://aegisgatesecurity.io/contact

---

## EXHIBITS

The following exhibits are incorporated by reference and form part of these Terms. Exhibits A–C are conditional on your purchase of the relevant add-on module or your request for the relevant agreement.

- **Exhibit A — Business Associate Agreement (BAA):** Required if you purchase the HIPAA compliance module. Available at https://aegisgatesecurity.io/legal/baa (deferred to v3.4.0+ for production-grade review).
- **Exhibit B — PCI-DSS Vendor Agreement:** Required if you purchase the PCI-DSS compliance module. Available on request.
- **Exhibit C — Master Services Agreement (MSA):** Required for Enterprise customers. Available on request.

---

*— Counsel Sign-Off Required —*

*This document is a 2.0 DRAFT for the v3.3.0 beta release. The 17-clause vendor-favorability framework applied to these Terms is documented in the internal legal review framework (a confidential document not published on this site). When budget is available, AegisGate Security, LLC will engage qualified counsel to review these Terms and convert them from a self-drafted DRAFT to a production-grade legal agreement. Until then, customers and counterparties should rely on these Terms at their own risk and consult their own legal counsel.*

*Tier names, RPMs, SLA commitments, and pricing reflect the platform's documented behavior as of v3.3.0 (2026-06-07). Consult the most recent version of these Terms and the live pricing page at https://aegisgatesecurity.io/pricing for current values.*

**Version:** 2.0 DRAFT (v3.3.0 beta)
**Last Updated:** 2026-06-07
**Next Review Date:** 2026-09-07 (quarterly review, or sooner if materially changed)
**Counsel Review Required:** Yes (deferred to v3.4.0+ budget cycle)
