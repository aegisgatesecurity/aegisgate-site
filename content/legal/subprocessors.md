---
title: "Subprocessor List"
description: "Third-party subprocessors that process personal data on behalf of AegisGate Security, LLC. Effective 2026-06-07. 2.0 DRAFT for v3.5.0."
type: "legal-doc"
---

<div class="alert alert-warning" style="border-left: 4px solid #f0ad4e; padding: 16px; margin-bottom: 24px; background: #fff8e1;">
<strong>📋 DRAFT — Not Legal Advice</strong><br>
This document is self-drafted by AegisGate Security, LLC for the v3.5.0 release. AegisGate Security, LLC is not a law firm, and this document does not constitute legal advice. Production-grade review by qualified legal counsel is deferred to v3.5.0+ when budget is available. Until then, customers and counterparties should rely on this document at their own risk and consult their own legal counsel.
</div>

# Subprocessor List

**Effective Date:** 2026-06-07
**Version:** 2.0 DRAFT (v3.5.0)
**Last Updated:** 2026-06-07

---

## Introduction

This Subprocessor List identifies third-party service providers ("Subprocessors") that AegisGate Security, LLC ("Company," "we," or "us") uses to process personal data on behalf of our customers, in connection with the AegisGate Security Platform ("Platform") and our marketing site at aegisgatesecurity.io.

Under GDPR Article 28 and equivalent provisions of other data protection laws, we are required to provide transparency about the subprocessors we use and the safeguards we have in place.

---

## 1. Current Subprocessors

As of the Effective Date, the following Subprocessors process personal data on our behalf or on behalf of our customers. We have entered into data processing agreements with each Subprocessor that processes personal data subject to GDPR.

### 1.1 Payment Processing

| Subprocessor | Purpose | Data Processed | Safeguards |
|---|---|---|---|
| **Stripe, Inc.** | Payment processing and subscription billing | Cardholder data, billing address, email | PCI-DSS Level 1 certified; DPA executed; SOC 2 Type II; data is tokenized — cardholder data does not touch AegisGate servers |

**Privacy Policy:** https://stripe.com/privacy

### 1.2 Marketing Site Hosting and CDN

| Subprocessor | Purpose | Data Processed | Safeguards |
|---|---|---|---|
| **Cloudflare, Inc.** | CDN, DDoS protection, and bot detection for aegisgatesecurity.io | IP addresses, request metadata, user-agent strings | DPA executed; SOC 2 Type II; ISO 27001 certified |
| **Netlify, Inc.** | Static site hosting for aegisgatesecurity.io | None (cookieless analytics, no customer data on marketing site) | DPA executed; SOC 2 Type II |

**Privacy Policies:**
- Cloudflare: https://www.cloudflare.com/privacypolicy/
- Netlify: https://www.netlify.com/privacy/

### 1.3 Source Code Hosting and CI/CD

| Subprocessor | Purpose | Data Processed | Safeguards |
|---|---|---|---|
| **GitHub, Inc.** | Open-source repository hosting for the AegisGate platform (github.com/aegisgatesecurity) and CI/CD pipelines (GitHub Actions) | None (public source code only; GitHub Actions CI does not have access to customer data) | DPA executed; SOC 2 Type II |

**Privacy Policy:** https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement

### 1.4 Platform Hosting (Self-Hosted by Default)

**Important:** The AegisGate Security Platform is a **single Go binary** that customers run on their own infrastructure by default. AegisGate Security, LLC does not process customer traffic on its own infrastructure in the standard self-hosted deployment model.

In the standard self-hosted deployment, the customer is the data controller and processes personal data on their own infrastructure. AegisGate Security, LLC is not a processor in this model (no personal data flows to us).

For customers who opt into the **AegisGate Managed Cloud** offering (currently in private beta, planned for v3.5.0+ general availability), AegisGate Security, LLC will become a processor and will publish an updated subprocessor list covering the cloud infrastructure provider at that time.

### 1.5 Email Delivery

| Subprocessor | Purpose | Data Processed | Safeguards |
|---|---|---|---|
| **None** | — | — | — |

**Explanation:** We do not currently use a third-party email service for transactional email. Receipts and payment confirmations are delivered by **Stripe** (via Stripe's built-in receipt system). License key delivery, support communications, and account notifications are delivered via direct SMTP from our internal systems; we will update this list before engaging any third-party email subprocessor.

## 2. Future Subprocessors

### 2.1 Notification Process
Before engaging a new Subprocessor, we will:
1. Evaluate the Subprocessor's security and privacy practices (SOC 2, ISO 27001, DPA availability)
2. Enter into a data processing agreement with the Subprocessor
3. Notify customers via email at least **30 calendar days** before the new Subprocessor begins processing personal data

### 2.2 Objection Right
Customers may object to the use of a new Subprocessor by contacting us within **30 calendar days** of notification. We will work with the customer in good faith to address concerns, which may include:
- Providing additional information about the Subprocessor's safeguards
- Offering an alternative processing arrangement
- Terminating the affected portion of the service at our cost

If a customer's objection cannot be resolved, the customer may terminate their subscription and receive a pro-rated refund of prepaid fees.

## 3. Subprocessor Safeguards

### 3.1 Contractual Requirements
All Subprocessors are required by contract to:
- Process personal data only on documented instructions from us
- Maintain appropriate technical and organizational security measures
- Comply with applicable data protection laws
- Allow audits and inspections
- Notify us promptly of any Security Incident affecting personal data
- Delete or return personal data at the end of the engagement

### 3.2 Liability
We remain liable to our customers for the performance of our Subprocessors' obligations to the extent required by GDPR Article 28(4) and equivalent provisions of other data protection laws.

### 3.3 Diligence
We perform initial and ongoing diligence on each Subprocessor covering:
- Security posture (SOC 2, ISO 27001, penetration tests)
- Privacy practices (public privacy policy, DPA availability, data residency)
- Financial stability (to assess long-term viability)
- Subcontracting (whether the Subprocessor uses its own subprocessors)

## 4. Approved Subcategories (For Future Use)

The following categories of Subprocessors are pre-approved for future use, subject to the notification and objection process in Section 2:

| Category | Examples | Purpose |
|---|---|---|
| Cloud Infrastructure (Managed Cloud only) | AWS, GCP, Azure | Hosting for the future AegisGate Managed Cloud offering (v3.5.0+). NOT used in the self-hosted default deployment. |
| Application Performance Monitoring (opt-in) | Datadog, Honeycomb, Grafana Cloud | Optional APM for the platform. Self-hosters may enable any of these in their own configuration; AegisGate Security, LLC does not enable them in the default distribution. |
| Error Tracking (opt-in) | Sentry, Bugsnag, Rollbar | Optional error tracking for the platform. Self-hosters may enable any of these in their own configuration. |
| Customer Support (when budget allows) | Intercom, Zendesk, Help Scout | Customer support ticketing. NOT currently used. |

**Important:** None of the pre-approved Subprocessors in this Section 4 are currently processing personal data on behalf of AegisGate Security, LLC or our customers. The list is provided for transparency about categories of services we may engage in the future, subject to the notification and objection process.

## 5. Contact

For questions about our Subprocessors or to object to a new Subprocessor, contact:

**AegisGate Security, LLC**
**Email:** privacy@aegisgatesecurity.io
**Website:** https://aegisgatesecurity.io/contact

## 6. Changes to This List

This Subprocessor List is updated as Subprocessors change. The most current version is available at:
**https://aegisgatesecurity.io/legal/subprocessors**

Material changes are subject to the 30-day notification and objection process in Section 2. Non-material changes (e.g., updating a Subprocessor's privacy policy URL, fixing a typo) may be made without notification.

**Last Updated:** 2026-06-07

---

*— Counsel Sign-Off Required —*

*This document is a 2.0 DRAFT for the v3.5.0 release. When budget is available, AegisGate Security, LLC will engage qualified counsel to review this Subprocessor List and convert it from a self-drafted DRAFT to a production-grade legal document. Until then, customers and counterparties should rely on this document at their own risk and consult their own legal counsel.*

*This Subprocessor List reflects the actual third-party integrations in the AegisGate platform codebase as of v3.3.0 (2026-06-07), verified by direct audit of the platform source tree. The list is intentionally shorter than typical SaaS subprocessor lists because the platform is self-hosted by default — AegisGate Security, LLC does not process customer traffic in the standard deployment model.*
