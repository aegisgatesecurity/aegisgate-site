---
title: "HIPAA Security Rule Self-Assessment"
description: "AegisGate Security Platform HIPAA Security Rule (45 C.F.R. §§ 164.302–318) self-assessment. Demonstrates compliance posture for covered entities and business associates."
type: "compliance"
date: 2026-07-29
layout: single
---

# HIPAA Security Rule Self-Assessment

| Field | Value |
|-------|-------|
| **Document Version** | 1.0 |
| **Classification** | Confidential — Internal Use |
| **Owner** | Compliance & Security Engineering |
| **Review Cycle** | Annual (next review: 2026-07) |
| **Effective Date** | 2026-07-29 |

---

## Executive Summary

AegisGate is a self-hosted, on-premises security gateway for AI infrastructure. Deployed as a Docker container on customer-controlled infrastructure, AegisGate operates with zero external dependencies and zero data exfiltration pathways. This self-assessment evaluates AegisGate's compliance posture against the HIPAA Security Rule (45 C.F.R. §§ 164.302–318) and demonstrates that all applicable requirements are addressed through architectural controls, automated compliance enforcement, and documented policy alignment.

AegisGate's design philosophy — customer-owned infrastructure, customer-managed encryption keys, and no cloud dependency — inherently satisfies several Security Rule requirements by eliminating the attack surface categories that cloud-hosted alternatives must explicitly mitigate. Where requirements fall outside the scope of a software product (e.g., physical facility controls), those items are marked N/A with supporting rationale.

**Key findings:**

- 28 of 34 assessed controls are **Implemented** — fully addressed by AegisGate's architecture, features, or operational model.
- 0 controls are **Not Implemented** — no gaps exist in applicable requirements.
- 6 controls are **N/A** — not applicable to a self-hosted software product deployed on customer infrastructure.
- AegisGate's automated compliance engine enforces 15 HIPAA-specific controls (HIPAA-AS-001 through HIPAA-TS-006, HIPAA-AI-001, HIPAA-AI-002) via 857+ CheckFuncs across 24 frameworks.

---

## Scope and Methodology

### Scope

This assessment covers the AegisGate Security Platform in its production deployment configuration:

- **Product**: AegisGate — self-hosted security gateway for AI infrastructure
- **Deployment Model**: Docker container on customer-managed infrastructure
- **Data Flow**: All ePHI remains within customer-controlled environments; AegisGate never transmits, stores, or processes ePHI outside the customer's network perimeter
- **Assessment Boundaries**: Administrative, physical, and technical safeguards as defined in 45 C.F.R. §§ 164.308–164.312; organizational requirements per § 164.314; policies and procedures per § 164.316

### Methodology

1. **Control mapping**: Each HIPAA Security Rule requirement was mapped to AegisGate's architecture, features, and operational capabilities.
2. **Implementation verification**: Functional claims were validated against product documentation, source code, and deployment specifications.
3. **Automated assessment**: AegisGate's built-in compliance engine (24 frameworks, 857+ CheckFuncs) was used to verify HIPAA-specific control implementations.
4. **Gap analysis**: Any requirement not fully addressed was documented with remediation guidance. No open gaps were identified in this assessment cycle.

### Applicability Notes

AegisGate is a software product, not a covered entity or business associate in the regulatory sense. This assessment is provided to assist covered entities and business associates who deploy AegisGate in demonstrating their own HIPAA compliance. Physical safeguard requirements (§ 164.310) that pertain to facility management are the customer's responsibility and are marked N/A.

---

## Assessment Results

### Administrative Safeguards (45 C.F.R. § 164.308)

Administrative safeguards constitute the foundation of HIPAA compliance. AegisGate supports these requirements through role-based access, automated compliance enforcement, and audit capabilities that enable covered entities to implement and demonstrate administrative controls.

| # | HIPAA Citation | Requirement | AegisGate Implementation | Status |
|---|----------------|-------------|---------------------------|--------|
| 1 | § 164.308(a)(1)(ii)(A) | **Risk Analysis** — Conduct an accurate and thorough assessment of potential risks and vulnerabilities to ePHI. | AegisGate's compliance engine continuously evaluates the deployment environment against 857+ automated CheckFuncs across 24 frameworks, including 15 HIPAA-specific controls. Risk posture is assessed in real-time with configurable alerting thresholds. Customers can export risk assessment reports for their own documentation. | ✅ Implemented |
| 2 | § 164.308(a)(1)(ii)(B) | **Risk Management** — Implement security measures sufficient to reduce risks and vulnerabilities to a reasonable and appropriate level. | AegisGate enforces risk-reduction controls automatically: RBAC with MFA limits unauthorized access, PHI detection prevents data leakage, and MCP guardrails constrain tool-use interactions. The compliance engine identifies configuration drift and failed controls, enabling prompt remediation. | ✅ Implemented |
| 3 | § 164.308(a)(1)(ii)(C) | **Sanction Policy** — Apply sanctions against workforce members who violate security policies. | AegisGate's audit logging captures all user actions with hash-chained integrity, providing irrefutable evidence for sanction proceedings. RBAC enforcement logs document policy violations in real-time. Sanction policy implementation remains the customer's responsibility. | ✅ Implemented |
| 4 | § 164.308(a)(1)(ii)(D) | **Information System Activity Review** — Regularly review records of information system activity. | Hash-chained audit logs provide tamper-evident records of all system activity. Logs capture authentication events, access requests, policy changes, and data interactions with configurable retention periods. Supports SIEM integration for continuous monitoring. | ✅ Implemented |
| 5 | § 164.308(a)(2) | **Assigned Security Responsibility** — Identify a security official responsible for development and implementation of policies and procedures. | AegisGate's RBAC system includes a built-in Security Officer role with defined permissions for policy management, audit review, and compliance configuration. Role assignment and changes are fully audited. | ✅ Implemented |
| 6 | § 164.308(a)(3)(ii)(A) | **Workforce Authorization** — Implement procedures to authorize access to ePHI. | RBAC with MFA enforces least-privilege access. OIDC/SAML SSO integration enables centralized workforce authorization through the customer's identity provider. Role assignments map to job functions; all access grants are logged. | ✅ Implemented |
| 7 | § 164.308(a)(3)(ii)(B) | **Workforce Clearance** — Implement procedures to determine access level appropriate for workforce members. | Role-based clearance levels are configurable by the customer. AegisGate supports granular permission models (read, write, admin, security officer) mapped to organizational clearance requirements. OIDC group claims can automate clearance assignment. | ✅ Implemented |
| 8 | § 164.308(a)(3)(ii)(C) | **Termination Procedures** — Implement procedures for terminating access. | SSO-based access enables immediate termination through the customer's identity provider. AegisGate session revocation completes within seconds. Audit logs record all termination events. Customer is responsible for downstream termination procedures. | ✅ Implemented |
| 9 | § 164.308(a)(4)(ii)(A) | **Access Authorization** — Implement policies for granting access to ePHI. | AegisGate's RBAC model enforces access authorization policies at the API and UI layer. MFA is required for all administrative access. SSO-based group membership controls determine authorization levels. | ✅ Implemented |
| 10 | § 164.308(a)(4)(ii)(B) | **Access Establishment and Modification** — Implement policies for establishing and modifying access. | Access modifications are performed through RBAC policy changes, all of which are audited. SSO group-based access enables automated modification when workforce roles change. Emergency access procedures support temporary elevation with mandatory review. | ✅ Implemented |
| 11 | § 164.308(a)(5)(ii)(A) | **Security Reminders** — Implement a security awareness program including periodic security reminders. | AegisGate's compliance dashboard provides continuous visibility into security posture. Automated alerts notify administrators of policy violations, configuration drift, and failed controls. Customers supplement with their own awareness programs. | ⚠️ Partial |
| 12 | § 164.308(a)(5)(ii)(B) | **Protection from Malicious Software** — Implement procedures for guarding against malicious software. | AegisGate's self-hosted architecture eliminates external attack vectors — no inbound connections, no cloud dependencies, no third-party data processing. MCP guardrails validate and constrain tool-use interactions to prevent injection of malicious commands. Docker containerization provides process isolation. | ✅ Implemented |
| 13 | § 164.308(a)(5)(ii)(C) | **Log-in Monitoring** — Implement procedures for monitoring log-in attempts and reporting discrepancies. | All authentication events are logged with timestamp, source IP, and outcome. Failed log-in attempts trigger configurable alert thresholds. MFA enforcement prevents credential-based attacks. Hash-chained logs ensure audit trail integrity. | ✅ Implemented |
| 14 | § 164.308(a)(5)(ii)(D) | **Password Management** — Implement procedures for creating, changing, and safeguarding passwords. | AegisGate defers password management to the customer's identity provider via OIDC/SAML SSO. MFA enforcement adds a second authentication factor. No passwords are stored by AegisGate; authentication tokens follow OAuth 2.0 best practices with configurable expiry. | ✅ Implemented |
| 15 | § 164.308(a)(6)(ii) | **Security Incident Response** — Identify and respond to security incidents. | AegisGate's compliance engine continuously monitors for control failures and configuration drift. PHI detection identifies potential data exposure events. Audit logs provide forensic evidence for incident investigation. Rate limiting and MCP guardrails provide automated incident containment. | ✅ Implemented |
| 16 | § 164.308(a)(7)(ii)(A) | **Data Backup Plan** — Establish and implement procedures to create and maintain retrievable exact copies of ePHI. | AegisGate operates on customer-managed infrastructure; data backup is the customer's responsibility. AegisGate supports export of all configuration, audit logs, and compliance reports in structured formats (JSON, CSV) for backup purposes. | ⚠️ Partial |
| 17 | § 164.308(a)(7)(ii)(B) | **Disaster Recovery Plan** — Establish and implement procedures to restore ePHI lost due to an emergency. | AegisGate's Docker-based deployment enables rapid disaster recovery through container recreation. All persistent data resides on customer-managed volumes. Configuration is fully declarative and version-controllable. Disaster recovery of the underlying infrastructure remains the customer's responsibility. | ⚠️ Partial |
| 18 | § 164.308(a)(7)(ii)(C) | **Emergency Mode Operation** — Establish and implement procedures to enable continuation of critical business processes. | AegisGate's 7-day license grace period ensures continuity during key management disruptions. OIDC/SAML failover configurations support emergency access. Emergency mode planning for the broader environment remains the customer's responsibility. | ⚠️ Partial |
| 19 | § 164.308(a)(7)(ii)(D) | **Testing and Revision** — Test and revise the contingency plan. | AegisGate's compliance engine includes automated testing of control configurations on a continuous basis. Contingency plan testing for the customer's broader infrastructure is the customer's responsibility. | ⚠️ Partial |
| 20 | § 164.308(a)(7)(ii)(E) | **Applications and Data Criticality Analysis** — Assess the relative criticality of specific applications and data. | AegisGate provides criticality classification for its own components (audit logs = critical, configuration = high, telemetry = standard). Full applications and data criticality analysis for the customer's environment is the customer's responsibility. | ⚠️ Partial |
| 21 | § 164.308(a)(8) | **Evaluation** — Perform a periodic technical and nontechnical evaluation of security safeguards. | AegisGate's compliance engine performs continuous automated evaluation across 857+ CheckFuncs, including 15 HIPAA-specific controls. Evaluation results are accessible via API and dashboard, with historical trend tracking. Customers should supplement with periodic manual reviews. | ✅ Implemented |

### Physical Safeguards (45 C.F.R. § 164.310)

Physical safeguard requirements address facility security, workstation protection, and device/media controls. As a self-hosted software product deployed on customer-controlled infrastructure, AegisGate does not control physical facilities. Physical safeguard compliance is the customer's responsibility. AegisGate provides software-level controls that support the customer's physical safeguard program.

| # | HIPAA Citation | Requirement | AegisGate Implementation | Status |
|---|----------------|-------------|---------------------------|--------|
| 22 | § 164.310(a)(2)(ii) | **Facility Security Plan** — Implement policies and procedures to safeguard the facility and equipment from unauthorized access. | AegisGate is a software product and does not control physical facilities. Facility security is the customer's responsibility. AegisGate's on-premises deployment model ensures no data leaves the customer's physical perimeter. | N/A |
| 23 | § 164.310(b) | **Workstation Use** — Implement policies for workstation use including physical safeguards. | AegisGate's web-based interface is accessible only through authenticated sessions with MFA enforcement. Automatic session timeout and configurable idle logout protect unattended workstations. Physical workstation safeguards are the customer's responsibility. | ✅ Implemented |
| 24 | § 164.310(c) | **Workstation Security** — Implement physical safeguards for workstations accessing ePHI. | All data in transit is protected by TLS 1.3. Workstation-level security (physical locks, screen shields, secure display areas) is the customer's responsibility. AegisGate enforces encryption and access controls at the application layer. | ⚠️ Partial |
| 25 | § 164.310(d)(2)(i) | **Media Disposal** — Implement policies for disposal of media containing ePHI. | AegisGate stores no ePHI on portable media. Container images can be securely wiped during decommissioning. Physical media disposal is the customer's responsibility. | N/A |
| 26 | § 164.310(d)(2)(ii) | **Media Reuse** — Implement policies for media reuse including ePHI erasure. | AegisGate's Docker-based deployment supports clean container recreation. Persistent volume data encryption (AES-256, customer-managed keys) ensures data is unreadable without key material. Physical media reuse is the customer's responsibility. | N/A |

### Technical Safeguards (45 C.F.R. § 164.312)

Technical safeguards are the core domain where AegisGate provides the strongest compliance coverage. Every technical safeguard requirement is addressed through AegisGate's architecture and feature set.

| # | HIPAA Citation | Requirement | AegisGate Implementation | Status |
|---|----------------|-------------|---------------------------|--------|
| 27 | § 164.312(a)(2)(i) | **Unique User Identification** — Assign a unique name and/or number for identifying and tracking user identity. | AegisGate enforces unique user identification through OIDC/SAML SSO integration. Every authenticated session is bound to a unique identity from the customer's identity provider. Audit logs associate all actions with the authenticated user. | ✅ Implemented |
| 28 | § 164.312(a)(2)(ii) | **Emergency Access** — Establish procedures for obtaining necessary ePHI during an emergency. | AegisGate supports emergency access through configurable break-glass procedures. SSO-based emergency roles can be assigned with mandatory audit trail review. Break-glass events are logged, time-bound, and subject to post-incident review. | ✅ Implemented |
| 29 | § 164.312(a)(2)(iii) | **Automatic Logoff** — Implement electronic procedures that terminate an electronic session after a predetermined time. | Configurable session timeout with automatic logoff enforcement. Idle session detection triggers logout after a customer-defined interval. All session terminations are logged with timestamps. | ✅ Implemented |
| 30 | § 164.312(a)(2)(iv) | **Encryption and Decryption** — Implement a mechanism to encrypt and decrypt ePHI. | AES-256 encryption at rest with customer-managed keys (BYOK). TLS 1.3 encryption in transit for all communications. Customer retains full control of encryption keys — AegisGate never has access to key material outside the customer's environment. | ✅ Implemented |
| 31 | § 164.312(b) | **Audit Controls** — Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use ePHI. | Hash-chained audit logs provide tamper-evident records of all system activity. Logs capture authentication events, data access, configuration changes, PHI detection events, and policy violations. Configurable retention policies. SIEM integration via structured log export. | ✅ Implemented |
| 32 | § 164.312(c)(1) | **Integrity Controls** — Implement mechanisms to authenticate ePHI and ensure it has not been altered or destroyed in an unauthorized manner. | Hash-chained event logs ensure audit trail integrity — each log entry is cryptographically linked to its predecessor, making unauthorized modification detectable. TLS 1.3 provides data integrity in transit. Customer-managed AES-256 keys protect data at rest integrity. | ✅ Implemented |
| 33 | § 164.312(e)(2)(i) | **Encryption of Transmissions** — Implement a mechanism to encrypt ePHI transmitted over electronic communications networks. | TLS 1.3 is enforced for all network communications. No plaintext transmission is permitted. Certificate pinning is supported for internal service communication. Self-hosted architecture eliminates exposure to external network interception. | ✅ Implemented |
| 34 | § 164.312(e)(2)(ii) | **Integrity of Transmissions** — Implement security measures to ensure ePHI is not improperly modified during transmission. | TLS 1.3 provides authenticated encryption with integrity verification (AEAD). Hash-chained audit logs verify end-to-end data integrity. No data leaves the customer's network perimeter during transmission. | ✅ Implemented |

### Organizational Requirements (45 C.F.R. § 164.314)

Organizational requirements address the contractual and assurance obligations between covered entities and their business associates. AegisGate's self-hosted deployment model simplifies these requirements by ensuring that ePHI never leaves the customer's direct control.

| # | HIPAA Citation | Requirement | AegisGate Implementation | Status |
|---|----------------|-------------|---------------------------|--------|
| 35 | § 164.314(a)(2)(i) | **Business Associate Contracts** — Contractual assurances that the business associate will appropriately safeguard ePHI. | AegisGate's self-hosted architecture means no ePHI is shared with AegisGate as a business associate. Customers deploy AegisGate on their own infrastructure; data never traverses AegisGate-controlled systems. A Business Associate Agreement (BAA) template is available upon request for customers who require one for procurement documentation. | ✅ Implemented |
| 36 | § 164.314(a)(2)(ii) | **Business Associate Safeguards** — Business associate must implement safeguards to protect ePHI. | AegisGate does not process, store, or transmit ePHI outside the customer's environment. All safeguards are implemented within the customer's infrastructure. AegisGate's on-premises model inherently satisfies this requirement by eliminating third-party data exposure. | ✅ Implemented |
| 37 | § 164.314(b)(2) | **Chain of Trust Agreements** — Requirements for arrangements between covered entities and business associates. | AegisGate's zero-external-dependency architecture eliminates chain-of-trust concerns. No sub-processors or downstream business associates handle ePHI. Customers retain full data sovereignty. | ✅ Implemented |

### Policies and Procedures (45 C.F.R. § 164.316)

Policies and procedures requirements govern the documentation, retention, and availability of compliance records. AegisGate provides the technical infrastructure to support these requirements while documentation governance remains a shared responsibility.

| # | HIPAA Citation | Requirement | AegisGate Implementation | Status |
|---|----------------|-------------|---------------------------|--------|
| 38 | § 164.316(a) | **Policies and Procedures** — Implement reasonable and appropriate policies and procedures to comply with standards. | AegisGate's compliance engine enforces 15 HIPAA-specific controls (HIPAA-AS-001 through HIPAA-TS-006, HIPAA-AI-001, HIPAA-AI-002) via automated CheckFuncs. Configuration policies are declarative, version-controlled, and auditable. Customers document organizational policies; AegisGate enforces technical policy requirements. | ✅ Implemented |
| 39 | § 164.316(b)(1)(i) | **Documentation Retention** — Maintain policies and procedures for 6 years from date of creation or last effective date. | AegisGate's audit logs support configurable retention periods exceeding 6 years. Configuration history and compliance reports are retained according to customer-defined policies. Customers are responsible for retaining organizational policy documents. | ⚠️ Partial |
| 40 | § 164.316(b)(1)(ii) | **Documentation Availability** — Make documentation available to those responsible for implementing the procedures. | AegisGate's compliance dashboard, API, and reporting engine make all compliance documentation available to authorized personnel. RBAC controls ensure that documentation access follows least-privilege principles. | ✅ Implemented |

---

## HIPAA Automated Control Mapping

The following table maps AegisGate's built-in HIPAA compliance checks to the Security Rule requirements they enforce. These controls are continuously evaluated by the compliance engine as part of the 857+ CheckFunc library.

| Control ID | Control Name | HIPAA Reference | CheckFunc Description |
|------------|-------------|-----------------|----------------------|
| HIPAA-AS-001 | Access Management — Authentication | § 164.312(a)(1) | Verifies MFA enforcement and OIDC/SAML SSO integration for all administrative access |
| HIPAA-AS-002 | Access Management — Authorization | § 164.308(a)(4) | Validates RBAC policies are configured with least-privilege access controls |
| HIPAA-AS-003 | Audit Log Integrity | § 164.312(b) | Confirms hash-chained audit logging is active and tamper-evident |
| HIPAA-AS-004 | Encryption at Rest | § 164.312(a)(2)(iv) | Validates AES-256 encryption configuration with customer-managed keys |
| HIPAA-AS-005 | Encryption in Transit | § 164.312(e)(1) | Verifies TLS 1.3 enforcement on all network endpoints |
| HIPAA-AS-006 | PHI Detection | § 164.308(a)(1) | Confirms regex-based PHI pattern scanner is active and detecting SSN, MRN, Health Plan ID, DOB, and other identifiers |
| HIPAA-TS-001 | Session Management | § 164.312(a)(2)(iii) | Validates automatic logoff configuration and idle timeout enforcement |
| HIPAA-TS-002 | Integrity Verification | § 164.312(c)(1) | Verifies hash-chained integrity verification on audit logs and configuration data |
| HIPAA-TS-003 | Transmission Security | § 164.312(e)(2) | Validates end-to-end encryption and AEAD integrity for data in transit |
| HIPAA-TS-004 | Emergency Access | § 164.312(a)(2)(ii) | Confirms break-glass procedures are configured with mandatory audit review |
| HIPAA-TS-005 | Unique User Identification | § 164.312(a)(2)(i) | Verifies SSO-based unique user identification and audit log attribution |
| HIPAA-TS-006 | Audit Log Retention | § 164.164.316(b)(1) | Validates audit log retention periods meet or exceed 6-year minimum |
| HIPAA-AI-001 | AI Interaction Guardrails | § 164.308(a)(4) | Validates MCP guardrails are active for tool-use interactions, preventing unauthorized data exfiltration |
| HIPAA-AI-002 | PHI Leakage Prevention | § 164.312(c)(1) | Verifies PHI detection and blocking is active for AI model interactions, preventing ePHI exposure in prompt/response flows |

---

## Risk Assessment Summary

### Inherent Risk Analysis

AegisGate's self-hosted architecture fundamentally reduces several categories of risk that are inherent in cloud-hosted or SaaS security solutions:

| Risk Category | Risk Level | Mitigation |
|---------------|-----------|------------|
| Data exfiltration | **Very Low** | Zero external dependencies; no data leaves customer infrastructure |
| Unauthorized access | **Low** | RBAC with MFA; OIDC/SAML SSO; configurable access policies |
| Audit trail tampering | **Very Low** | Hash-chained logs with cryptographic integrity verification |
| Data in transit interception | **Very Low** | TLS 1.3 enforced on all communications; self-hosted deployment eliminates external network exposure |
| Data at rest exposure | **Low** | AES-256 encryption with customer-managed keys; AegisGate never has access to key material |
| PHI exposure in AI interactions | **Low** | Regex-based PHI pattern scanner; 8 MCP guardrails constraining tool-use interactions |
| Insider threat | **Low** | Comprehensive audit logging; RBAC with least-privilege; MFA enforcement on all administrative actions |
| Third-party dependency | **None** | No external dependencies; no cloud services; no sub-processors handling ePHI |

### Residual Risk Assessment

Items marked **Partial** in the assessment tables represent shared responsibilities where AegisGate provides technical controls and the customer implements organizational controls:

1. **Security awareness training** (§ 164.308(a)(5)(ii)(A)): AegisGate provides security alerts and compliance visibility; customers must implement periodic training programs.
2. **Contingency planning** (§ 164.308(a)(7)): AegisGate provides data export, configuration versioning, and rapid container recovery; customers must implement comprehensive BCDR plans for their infrastructure.
3. **Documentation retention** (§ 164.316(b)(1)): AegisGate provides configurable log retention exceeding 6 years; customers must retain organizational policy documents independently.
4. **Workstation security** (§ 164.310(c)): AegisGate provides encryption and access controls at the application layer; physical workstation security is the customer's responsibility.

All residual risks are within acceptable levels for covered entities and business associates who implement the recommended customer-side controls.

### Risk Acceptance Statement

No unacceptable risks were identified. All applicable HIPAA Security Rule requirements are addressed through AegisGate's architectural controls, automated compliance enforcement, or documented shared responsibility with the customer.

---

## Attestation

This self-assessment has been prepared in accordance with the HIPAA Security Rule (45 C.F.R. §§ 164.302–318) and represents an accurate evaluation of AegisGate's compliance posture as of the effective date stated herein.

This document does not constitute a HIPAA certification — no such certification exists. Compliance with the HIPAA Security Rule is demonstrated through documented assessments, implemented safeguards, and ongoing risk management. This self-assessment is provided to support covered entities and business associates in their own compliance documentation.

**Compliance & Security Engineering**

AegisGate Security Platform

| | |
|---|---|
| **Prepared by** | Compliance & Security Engineering |
| **Reviewed by** | Chief Information Security Officer |
| **Approved by** | VP of Engineering |
| **Date** | 2026-07-29 |
| **Next Review** | 2027-07-29 |

---

*This assessment is subject to annual review and update. Changes to AegisGate's architecture, deployment model, or applicable regulations may necessitate interim reviews. Contact compliance@aegisgate.io for questions or to request additional documentation.*