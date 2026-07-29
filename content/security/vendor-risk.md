---
title: "Vendor Risk Assessment"
description: "AegisGate Security, LLC third-party vendor risk assessments. Security posture evaluation of subprocessors and service providers."
type: "security"
date: 2026-07-29
layout: single
---

# Vendor Risk Assessment

| Field | Value |
|-------|-------|
| **Document Version** | 1.0 |
| **Owner** | Security Operations, AegisGate Security, LLC |
| **Review Cycle** | Annual |
| **Last Reviewed** | July 29, 2026 |
| **Next Review** | Q3 2027 |
| **Classification** | Internal & Customer-Facing |

---

## 1. Purpose

This document provides a comprehensive risk assessment of all third-party vendors and subprocessors engaged by AegisGate Security, LLC. It evaluates each vendor's security posture, data handling practices, and associated risks in accordance with AegisGate's vendor risk management framework and applicable data protection regulations.

## 2. Assessment Methodology

Each vendor is evaluated using the following methodology:

1. **Data Classification**: Identify the types and sensitivity of data processed by the vendor
2. **Security Posture Review**: Evaluate certifications, audit reports, and compliance attestations
3. **Data Exposure Analysis**: Assess the volume and nature of data accessible to the vendor
4. **Risk Rating**: Assign a risk rating (Critical, High, Medium, Low) based on the composite assessment
5. **Mitigation Review**: Verify that adequate controls exist to reduce residual risk to acceptable levels

### 2.1 Risk Rating Criteria

| Rating | Criteria |
|--------|----------|
| **Critical** | Vendor processes sensitive personal data at scale; lacks key certifications; significant residual risk |
| **High** | Vendor processes personal data; limited certification coverage; moderate residual risk |
| **Medium** | Vendor processes limited personal data; certified but with some gaps; low-to-moderate residual risk |
| **Low** | Vendor processes minimal or no personal data; fully certified; minimal residual risk |

## 3. Vendor Assessments

### 3.1 Cloudflare, Inc.

| Field | Detail |
|-------|--------|
| **Service Provided** | Content Delivery Network (CDN), Distributed Denial of Service (DDoS) protection, DNS resolution, Web Application Firewall (WAF), SSL/TLS termination |
| **SOC 2 Type II** | ✅ Certified |
| **ISO 27001** | ✅ Certified |
| **FedRAMP** | ✅ Authorized |
| **Data Processed** | DNS queries, edge traffic metadata (IP addresses, request timestamps, HTTP headers, TLS handshake data) |
| **Data at Rest** | No customer data stored at rest. Edge traffic metadata is ephemeral and purged per Cloudflare's data retention policies |
| **Risk Rating** | **Low** |
| **Annual Review** | Q3 each year |

**Security Certifications & Attestations:**

- SOC 2 Type II audit report (available upon request under NDA)
- ISO/IEC 27001:2022 certification
- FedRAMP Moderate authorization
- CSA Security, Trust & Assurance Registry (STAR) Level 2
- Bug bounty program with responsible disclosure

**Risk Assessment:**

Cloudflare operates as a reverse proxy at the network edge, routing and filtering traffic before it reaches AegisGate infrastructure. The data processed is limited to network-layer metadata and DNS resolution queries. No AegisGate customer data (account information, project data, credentials) is processed or stored by Cloudflare. The risk of data exposure through Cloudflare is minimal, limited to traffic metadata that could reveal access patterns.

**Mitigation Measures:**

- Cloudflare is configured in "terminate at edge" mode, minimizing data inspection
- TLS passthrough is enforced for authenticated endpoints, preventing payload access
- DNS query logging is disabled where technically feasible
- Annual review of Cloudflare's SOC 2 Type II report and security posture

---

### 3.2 Netlify, Inc.

| Field | Detail |
|-------|--------|
| **Service Provided** | Website hosting, continuous deployment (CI/CD), serverless functions, form handling, identity management for the AegisGate marketing site |
| **SOC 2 Type II** | ✅ Certified |
| **ISO 27001** | Not certified |
| **Data Processed** | Static website assets (HTML, CSS, JavaScript, images), form submission data (contact inquiries, newsletter sign-ups) |
| **Data at Rest** | Static website assets in CDN cache; form submissions stored per Netlify retention policy until exported |
| **Risk Rating** | **Low** |
| **Annual Review** | Q3 each year |

**Security Certifications & Attestations:**

- SOC 2 Type II audit report (available upon request under NDA)
- GDPR-compliant Data Processing Agreement (DPA)
- SOC 2 compliance covers security, availability, and confidentiality trust service criteria

**Risk Assessment:**

Netlify hosts the AegisGate marketing website and documentation site. No AegisGate platform customer data (account data, project data, security configurations) passes through or is stored in Netlify. The only data processed consists of publicly available static assets and form submissions from the marketing site (contact inquiries). These submissions may contain personal data (name, email, message) but are limited in volume and sensitivity.

**Mitigation Measures:**

- Form submissions containing personal data are exported and purged from Netlify within 7 days
- Netlify Functions handling form data do not log personal data to console or external services
- DNS and hosting are decoupled (DNS via Cloudflare), limiting blast radius of any Netlify compromise
- Annual review of Netlify's SOC 2 Type II report
- Form submission endpoints are monitored for anomalous traffic patterns

---

### 3.3 GitHub, Inc. (Microsoft Corporation)

| Field | Detail |
|-------|--------|
| **Service Provided** | Source code hosting, version control, continuous integration and continuous deployment (CI/CD), issue tracking, code review, security advisory management |
| **SOC 2 Type II** | ✅ Certified |
| **ISO 27001** | ✅ Certified |
| **Data Processed** | Source code, CI/CD pipeline artifacts (build logs, deployment configs), issue tracking data (bug reports, feature requests), contributor metadata (usernames, email addresses, commit history) |
| **Data at Rest** | Source code repositories, issue tracking data, CI artifacts stored in GitHub infrastructure |
| **Risk Rating** | **Medium** |
| **Annual Review** | Q3 each year |

**Security Certifications & Attestations:**

- SOC 2 Type II audit report (available upon request under NDA)
- ISO/IEC 27001:2022 certification
- SOC 1 Type II audit report
- FedRAMP Moderate authorization (via Microsoft Azure)
- CSA STAR certification
- GitHub Bug Bounty program

**Risk Assessment:**

GitHub serves as AegisGate's primary source code management and CI/CD platform. While the data processed includes AegisGate's proprietary source code and development artifacts, **no AegisGate customer data is ever stored in GitHub**. The Medium risk rating reflects the value of intellectual property (source code) stored in GitHub, rather than customer data exposure. A compromise of GitHub repositories could potentially expose proprietary code, API keys (if improperly committed), or development infrastructure configurations.

**Mitigation Measures:**

- All repositories require branch protection rules and signed commits
- Secret scanning and push protection are enabled across all repositories
- Dependabot and GitHub Advanced Security are enabled for vulnerability detection
- No secrets, API keys, or customer data are committed to repositories
- Pre-commit hooks enforce secret detection before push
- GitHub Actions workflows use OIDC-based authentication (no long-lived tokens)
- Two-factor authentication (2FA) is required for all organization members
- SAML-based SSO is enforced for organization access
- Annual review of GitHub's SOC 2 Type II report
- Source code is treated as sensitive but non-critical since no customer data resides in repositories

---

### 3.4 Stripe, Inc.

| Field | Detail |
|-------|--------|
| **Service Provided** | Payment processing, subscription billing, invoicing, fraud detection, payment method tokenization |
| **SOC 2 Type II** | ✅ Certified |
| **ISO 27001** | ✅ Certified |
| **PCI-DSS** | ✅ Level 1 Service Provider |
| **Data Processed** | Payment card data (card numbers, expiration dates, CVC codes via Stripe.js tokenization), billing information, transaction records, customer name and email for receipts |
| **Data at Rest** | Tokenized card data, transaction history, and billing records stored in Stripe's PCI-compliant infrastructure |
| **Risk Rating** | **Medium** |
| **Annual Review** | Q3 each year |

**Security Certifications & Attestations:**

- SOC 2 Type II audit report (available upon request under NDA)
- ISO/IEC 27001:2022 certification
- PCI-DSS Level 1 Service Provider certification
- CSA STAR Level 1 certification
- SOC 1 Type II audit report
- Stripe Bug Bounty program

**Risk Assessment:**

Stripe processes payment card data on behalf of AegisGate customers. However, through Stripe.js tokenization, **AegisGate never receives, stores, or has access to full card numbers**. Card data is collected directly by Stripe's client-side JavaScript and tokenized before reaching AegisGate servers. AegisGate stores only Stripe's payment method tokens and transaction identifiers. The Medium risk rating reflects the inherent sensitivity of payment processing, even though AegisGate's direct exposure to cardholder data is effectively nil.

**Mitigation Measures:**

- Stripe.js is used for all payment card collection, ensuring card data never touches AegisGate servers
- AegisGate is PCI-DSS SAQ A-compliant (outsourced payment processing with no cardholder data storage)
- Payment method tokens (not card numbers) are the only payment identifiers stored in AegisGate systems
- All API communication with Stripe occurs over TLS 1.2+
- Stripe webhook signatures are verified before processing any event
- Billing portal redirects customers to Stripe-hosted payment pages for card updates
- Annual review of Stripe's SOC 2 Type II and PCI-DSS Level 1 attestation
- Stripe's Radar fraud detection is enabled with AegisGate-specific risk rules

---

## 4. Risk Summary

| Vendor | Service | Data Sensitivity | SOC 2 Type II | Risk Rating | Residual Risk |
|--------|---------|-----------------|---------------|-------------|---------------|
| Cloudflare | CDN, DDoS, DNS | Low (metadata only) | ✅ | **Low** | Minimal |
| Netlify | Website hosting, CI/CD | Low (no platform data) | ✅ | **Low** | Minimal |
| GitHub | Source code, CI/CD | Moderate (IP, no customer data) | ✅ | **Medium** | Low |
| Stripe | Payment processing | Moderate (tokenized card data) | ✅ | **Medium** | Low |

### 4.1 Aggregate Risk Assessment

AegisGate's overall third-party risk posture is **Low**. This assessment is based on:

- **No vendor has direct access to AegisGate platform customer data** (source code, project configurations, security policies, or account credentials)
- **All four subprocessors hold SOC 2 Type II certification**, providing independent assurance of their security controls
- **Three of four vendors hold ISO 27001 certification**, with Netlify's absence offset by the minimal data exposure
- **Payment card data is fully tokenized** via Stripe.js, eliminating AegisGate's PCI-DSS scope for cardholder data storage
- **All vendors maintain responsible disclosure programs** and demonstrate ongoing security investment

## 5. Ongoing Monitoring and Review

### 5.1 Annual Review Process

Each vendor undergoes a full risk reassessment annually (Q3), which includes:

- Review of updated SOC 2 Type II reports and compliance attestations
- Re-evaluation of data processing scope and data exposure
- Assessment of any security incidents or breaches reported by the vendor
- Verification that mitigation measures remain effective
- Evaluation of the vendor's continued alignment with AegisGate's security requirements

### 5.2 Continuous Monitoring

Between annual reviews, AegisGate monitors vendor risk through:

- **Security advisory monitoring**: Subscribing to vendor security advisories and CVE notifications
- **Incident tracking**: Tracking any publicly reported security incidents affecting subprocessors
- **Compliance tracking**: Monitoring for changes in vendor certification status
- **Contract review**: Ensuring DPAs and security addenda remain current and enforceable

### 5.3 Vendor Addition and Removal

New subprocessors are added only after completing the full risk assessment methodology outlined in Section 2. Customers will be notified of new subprocessors at least 30 days before data processing begins, with the opportunity to object per applicable data protection agreements.

Removal of a subprocessor follows a decommissioning process that includes data deletion confirmation and access revocation verification.

## 6. Data Processing Agreements

AegisGate maintains executed Data Processing Agreements (DPAs) with all four subprocessors in compliance with GDPR Article 28 and applicable data protection laws. DPAs are reviewed and updated as part of the annual vendor review cycle.

---

*This document is maintained by AegisGate Security, LLC. For questions about vendor risk or subprocessor arrangements, contact [security@aegisgatesecurity.io](mailto:security@aegisgatesecurity.io).*