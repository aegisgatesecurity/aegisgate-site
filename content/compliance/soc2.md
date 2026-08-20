---
title: "SOC 2 Type 1 Readiness Assessment"
description: "AegisGate Security Platform SOC 2 Type 1 readiness self-assessment. Maps AegisGate controls to Trust Services Criteria in preparation for formal CPA audit."
type: "compliance"
date: 2026-07-29
layout: single
---

<div class="compliance-header">

# SOC 2 Type 1 Readiness Assessment — Self-Assessment

**AegisGate Security Platform**

| Field | Value |
|---|---|
| **Document ID** | AG-SOC2-RA-2026-001 |
| **Version** | 1.0 |
| **Classification** | Confidential — Internal Use |
| **Status** | Readiness Assessment |
| **Owner** | Compliance & Security Engineering |
| **Review Cycle** | Quarterly |
| **Effective Date** | July 29, 2026 |
| **Next Review** | October 29, 2026 |

</div>

---

## Important Notice

This document is a **SOC 2 Type 1 Readiness Assessment — Self-Assessment**. It is produced internally by AegisGate to evaluate control readiness against the AICPA Trust Services Criteria prior to engaging a Certified Public Accountant (CPA) firm for a formal SOC 2 Type 1 examination.

**This is not a SOC 2 audit report, and it does not constitute a certification or attestation.** No CPA firm has opined on the design or operating effectiveness of the controls described herein. The readiness statuses reflect AegisGate's internal evaluation and are intended solely to guide remediation priorities and audit preparation.

Upon engagement of a qualified CPA firm, this assessment will serve as the basis for formal examination of control design suitability as of a specified date.

---

## Executive Summary

AegisGate has conducted a comprehensive self-assessment of its security and availability controls against the AICPA Trust Services Criteria. This assessment evaluates the design and implementation readiness of controls that would be examined during a formal SOC 2 Type 1 audit.

### Readiness Summary

| Trust Services Category | Criteria Assessed | Ready | In Progress | Planned | Readiness Score |
|---|---|---|---|---|---|
| **Common Criteria (CC1–CC9)** | 23 | 22 | 0 | 1 | **96%** |
| **Security (C)** | 6 | 6 | 0 | 0 | **100%** |
| **Availability (A)** | 4 | 4 | 0 | 0 | **100%** |
| **Confidentiality (C)** | 3 | 2 | 1 | 0 | **67%** |
| **Processing Integrity (PI)** | 2 | 2 | 0 | 0 | **100%** |
| **Overall** | **38** | **36** | **1** | **1** | **95%** |

**Key Findings:**

- AegisGate's self-hosted architecture inherently satisfies significant portions of the Trust Services Criteria, as infrastructure control resides with the customer organization.
- Logical access controls (CC6) demonstrate strong readiness with RBAC, MFA, OIDC/SAML SSO, and automated CheckFuncs already implemented in the compliance engine.
- Monitoring controls (CC7) are substantively addressed through hash-chained audit logging, 176 threat detection patterns, and real-time alerting.
- All Priority 1 and Priority 2 remediation items addressed. Remaining: continuous improvement items (REM-007, REM-008) scheduled for Q1 2027.

---

## Scope and Methodology

### Scope

This readiness assessment covers the AegisGate Security Platform — a self-hosted, on-premises security gateway for AI infrastructure — and the organizational controls operated by AegisGate to develop, deliver, and support the platform.

**In-Scope System:** AegisGate Security Platform (Docker container deployment, customer-managed infrastructure)

**Out of Scope:** Customer-managed infrastructure, customer data processing environments, and any third-party systems not acting as a subprocessor to AegisGate.

**Trust Services Categories in Scope:** Security, Availability, Confidentiality, Processing Integrity

**Privacy** is assessed as not applicable to the primary platform offering at this time, as AegisGate does not collect or process personal information on behalf of customers. Privacy criteria will be evaluated in a subsequent assessment cycle when applicable.

### Methodology

1. **Criteria Mapping:** Each applicable Trust Services Criterion was mapped to one or more AegisGate controls, including technical implementations, policies, and procedures.
2. **Control Walkthrough:** Internal review of control design against criteria requirements to confirm implementation completeness.
3. **Evidence Review:** Examination of available evidence including source code, configuration files, audit logs, policy documents, and infrastructure manifests.
4. **Gap Analysis:** Identification of criteria where controls are not yet fully implemented or documented, with classification as In Progress or Planned.
5. **Readiness Scoring:** Controls classified as Ready (✅), In Progress (⚠️), or Planned (🔲) based on implementation and documentation completeness.

### System Architecture Overview

AegisGate is deployed as a self-hosted Docker container on customer-managed infrastructure with zero external dependencies. The architecture places infrastructure control — including network topology, data residency, encryption key management, and physical security — under customer purview. AegisGate's responsibility boundary encompasses the application-layer security controls, the compliance engine, threat detection, and the software supply chain.

**Subprocessors:**

| Subprocessor | Function | SOC 2 Status |
|---|---|---|
| Cloudflare | CDN and DDoS protection | SOC 2 Type II Certified |
| Netlify | Website hosting | SOC 2 Type II Certified |
| GitHub | Source code repository and CI/CD | SOC 2 Type II Certified |
| Stripe | Payment processing | SOC 2 Type II Certified |

---

## Trust Services Criteria Mapping

### Common Criteria — CC1: Control Environment

#### CC1.1 — Tone at the Top and Control Consciousness

**Criteria:** Management demonstrates a commitment to integrity and ethical values through directives, actions, and behavior that establish the tone for the organization.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC1.1 |
| **Implementation** | AegisGate maintains a formal code of conduct and security policy that establishes expectations for ethical behavior and security-conscious operations. The compliance engine enforces SOC2-CC1.1 as an automated CheckFunc, providing continuous validation that control environment requirements are met. Security is designated as a first-class organizational priority, reflected in architecture decisions (self-hosted deployment, zero external data dependencies, minimal attack surface). |
| **Evidence** | Security policy documentation, CheckFunc SOC2-CC1.1 implementation, architecture decision records |
| **Status** | ✅ Ready |

#### CC1.2 — Accountability

**Criteria:** The entity holds individuals accountable for their internal control responsibilities.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC1.2 |
| **Implementation** | Role-based access control (RBAC) with explicitly defined roles and permissions enforces accountability for system actions. All administrative actions are recorded in hash-chained audit logs with immutable attribution. Management reviews access assignments and audit trail integrity on a quarterly cycle. |
| **Evidence** | RBAC policy definitions, audit log integrity verification procedures |
| **Status** | ✅ Ready |

#### CC1.3 — Human Resources Policies

**Criteria:** The entity hires, develops, and retains individuals with the competence to fulfill their responsibilities.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC1.3 |
| **Implementation** | Hiring practices include background verification and security competency assessment for engineering roles. Ongoing development is supported through security training requirements and access to relevant certifications. Performance evaluations include security and compliance responsibilities. |
| **Evidence** | Hiring procedures, training policy, performance evaluation framework |
| **Status** | ✅ Ready — Training program and completion records documented ([/security/training/](/security/training/), [/security/training-records/](/security/training-records/)) |

#### CC1.4 — Board of Directors / Oversight

**Criteria:** The entity defines lines of responsibility and authority for the design, implementation, and operation of controls.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC1.4 |
| **Implementation** | AegisGate maintains a documented organizational structure with clearly defined responsibility assignments for security, compliance, and engineering functions. The compliance engine enforces SOC2-CC1.4 as an automated CheckFunc. Control ownership is explicitly assigned for each Trust Services Criterion with designated review cadences. |
| **Evidence** | Responsibility assignment matrix, CheckFunc SOC2-CC1.4 implementation, organizational chart |
| **Status** | ✅ Ready |

---

### Common Criteria — CC2: Communication and Information

#### CC2.1 — Internal Communication

**Criteria:** The entity internally communicates information, including objectives and responsibilities, necessary to support the functioning of internal control.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC2.1 |
| **Implementation** | Security policies, control objectives, and individual responsibilities are documented and accessible to all personnel. System alerts and compliance findings are communicated through automated notifications. The compliance engine surfaces control status and remediation requirements through dashboard reporting. |
| **Evidence** | Internal documentation portal, notification configurations, compliance dashboard |
| **Status** | ✅ Ready |

#### CC2.2 — External Communication

**Criteria:** The entity communicates with external parties regarding matters affecting the functioning of internal control.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC2.2 |
| **Implementation** | AegisGate communicates security practices, control responsibilities, and incident response procedures to customers through published documentation. Vulnerability disclosure and security contact information are publicly available. Subprocessor relationships are disclosed and each subprocessor maintains SOC 2 Type II certification. |
| **Evidence** | Customer-facing documentation, vulnerability disclosure policy, subprocessor registry |
| **Status** | ✅ Ready |

#### CC2.3 — Communication of Objectives and Changes

**Criteria:** The entity communicates with external parties and enables them to communicate information about the functioning of internal control.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC2.3 |
| **Implementation** | Customer communication channels include support ticketing, security reporting, and feedback mechanisms. Changes to security controls, policies, and system capabilities are communicated through release notes and advisory notices with advance notice for material changes. |
| **Evidence** | Release notification process, support communication procedures |
| **Status** | ✅ Ready |

---

### Common Criteria — CC3: Risk Assessment

#### CC3.1 — Risk Identification

**Criteria:** The entity identifies and assesses risk that could affect the achievement of its objectives.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC3.1 |
| **Implementation** | AegisGate conducts risk assessments covering information security, operational continuity, and compliance objectives. The compliance engine's 1,076+ automated CheckFuncs across 31 frameworks provide continuous risk identification. Threat modeling is performed for architecture changes and new features. The 176 threat detection patterns actively identify security risks in production. |
| **Evidence** | Risk register, threat model documentation, CheckFunc catalog, detection pattern registry |
| **Status** | ✅ Ready |

#### CC3.2 — Fraud Risk

**Criteria:** The entity identifies and assesses risk of fraud that could affect the achievement of its objectives.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC3.2 |
| **Implementation** | Fraud risk assessment considers unauthorized access, privilege escalation, and data exfiltration scenarios. RBAC enforcement and MFA requirements mitigate authentication fraud vectors. Audit log immutability (hash-chained) prevents log tampering. Rate limiting per tier mitigates abuse and credential stuffing. |
| **Evidence** | Fraud risk assessment, RBAC and MFA configuration, audit log architecture, rate limiting policies |
| **Status** | ✅ Ready |

#### CC3.3 — Risk of Management Override

**Criteria:** The entity considers the potential for management override of controls.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC3.3 |
| **Implementation** | Technical controls are enforced programmatically and cannot be arbitrarily overridden by any single role. Privileged actions require MFA and are logged in immutable audit trails. Separation of duties is enforced through RBAC role definitions that prevent concentration of incompatible access. |
| **Evidence** | RBAC separation of duties matrix, MFA enforcement policy, audit log immutability verification |
| **Status** | ✅ Ready |

#### CC3.4 — Changes in Risk Profile

**Criteria:** The entity assesses changes that could significantly affect internal control.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC3.4 |
| **Implementation** | Risk assessments are updated for material changes including new threat vectors, architecture modifications, regulatory changes, and subprocessor additions. The compliance engine's continuous CheckFunc evaluation detects configuration drift and control regressions automatically. |
| **Evidence** | Risk assessment update procedures, change management integration with risk review |
| **Status** | ✅ Ready |

---

### Common Criteria — CC4: Monitoring

#### CC4.1 — Ongoing and Separate Evaluations

**Criteria:** The entity performs ongoing and separate evaluations to ascertain whether each of the components of internal control is present and functioning.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC4.1 |
| **Implementation** | Ongoing evaluation is performed continuously through the compliance engine's automated CheckFuncs, which validate control effectiveness across 31 frameworks. Separate evaluations are conducted through periodic internal reviews of security posture, access reviews, and audit log analysis. 176 threat detection patterns provide real-time monitoring of control effectiveness. |
| **Evidence** | CheckFunc execution results, internal review schedule, threat detection alerting |
| **Status** | ✅ Ready |

#### CC4.2 — Communication of Deficiencies

**Criteria:** The entity communicates internal control deficiencies to those responsible for taking corrective action.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC4.2 |
| **Implementation** | Control deficiencies identified by automated CheckFuncs are surfaced through dashboards and alerting. Security findings from threat detection patterns generate immediate notifications. Deficiency tracking and remediation workflows are documented and assigned to responsible parties with defined SLAs. |
| **Evidence** | Alert configurations, remediation workflow documentation, deficiency tracking procedures |
| **Status** | ✅ Ready |

---

### Common Criteria — CC5: Control Activities

#### CC5.1 — Logical and Physical Security Controls

**Criteria:** The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC5.1 |
| **Implementation** | Control activities are selected based on risk assessment outcomes and implemented through a combination of preventive, detective, and corrective controls. Preventive controls include RBAC, MFA, rate limiting, and input validation. Detective controls include 176 threat detection patterns and hash-chained audit logging. Corrective controls include automated remediation workflows and incident response procedures. |
| **Evidence** | Risk-to-control mapping, control activity inventory |
| **Status** | ✅ Ready |

#### CC5.2 — Technology Infrastructure Controls

**Criteria:** The entity selects and develops control activities over technology that contribute to the mitigation of risks to the achievement of objectives.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC5.2 |
| **Implementation** | AegisGate's self-hosted architecture places infrastructure controls within the customer's environment. AegisGate's technology controls focus on the application layer: hardened Docker container (19.1MB image, no shell, minimal attack surface), ECDSA P-256 license key verification, TLS 1.3 enforcement for in-transit data, and AES-256 encryption for data at rest using customer-managed keys. |
| **Evidence** | Docker image security documentation, encryption configuration, license verification architecture |
| **Status** | ✅ Ready |

#### CC5.3 — Policies and Procedures

**Criteria:** The entity deploys control activities through policies and procedures.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC5.3 |
| **Implementation** | Security policies establish requirements for access control, encryption, logging, incident response, and change management. Technical enforcement complements policy requirements — controls that are defined in policy are also enforced programmatically where feasible. The compliance engine validates that policy-mandated controls remain operational. |
| **Evidence** | Security policy suite, compliance engine CheckFuncs mapped to policy requirements |
| **Status** | ✅ Ready |

---

### Common Criteria — CC6: Logical and Physical Access

#### CC6.1 — Logical Access Security

**Criteria:** The entity implements logical access security over information assets to protect them from unauthorized access.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC6.1 |
| **Implementation** | AegisGate enforces role-based access control (RBAC) with granular permission assignments across all system functions. Multi-factor authentication (MFA) is required for all administrative access. Single sign-on (SSO) integration supports OIDC and SAML 2.0 protocols for enterprise identity federation. The compliance engine enforces SOC2-CC6.1 as an automated CheckFunc, continuously validating that logical access controls meet policy requirements. |
| **Evidence** | RBAC policy definitions, MFA enforcement configuration, SSO integration documentation, CheckFunc SOC2-CC6.1 implementation |
| **Status** | ✅ Ready |

#### CC6.2 — User Registration and Provisioning

**Criteria:** The entity registers and authorizes new internal and external users to the information assets.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC6.2 |
| **Implementation** | User provisioning follows defined workflows with approval requirements. RBAC role assignments are governed by least-privilege principles. Access grants are logged in hash-chained audit records. The compliance engine enforces SOC2-CC6.2 to validate provisioning controls. Automated deprovisioning is triggered upon role change or termination events through SSO identity provider integration. |
| **Evidence** | Provisioning procedures, RBAC role assignment matrix, CheckFunc SOC2-CC6.2 implementation, audit log samples |
| **Status** | ✅ Ready |

#### CC6.3 — Role-Based Access and Least Privilege

**Criteria:** The entity authorizes, modifies, or removes access to information assets based on roles and responsibilities.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC6.3 |
| **Implementation** | Role definitions enforce least-privilege access with explicit permission grants per role. No role grants unrestricted system access. Modifications to role assignments require approval and are audit-logged. Periodic access reviews are conducted quarterly. The compliance engine enforces SOC2-CC6.3 to validate least-privilege compliance. |
| **Evidence** | Role-permission matrix, access review schedule and results, CheckFunc SOC2-CC6.3 implementation |
| **Status** | ✅ Ready |

#### CC6.4 — Physical Access

**Criteria:** The entity restricts physical access to information assets to authorized personnel.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC6.4 |
| **Implementation** | AegisGate's self-hosted deployment model delegates physical access controls to the customer organization. AegisGate does not operate data centers or physical facilities where customer data is processed. Source code and development infrastructure are protected through logical access controls on GitHub (SOC 2 Type II certified) with MFA enforcement. |
| **Evidence** | Deployment architecture documentation, GitHub security configuration |
| **Status** | ✅ Ready |

#### CC6.5 — Access Removal

**Criteria:** The entity removes access to information assets when no longer needed.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC6.5 |
| **Implementation** | Access removal is triggered by role change, termination, or project completion events. SSO integration (OIDC/SAML) enables centralized deprovisioning — disabling access at the identity provider level immediately revokes AegisGate access. Quarterly access reviews identify and remediate stale access grants. |
| **Evidence** | Deprovisioning procedures, SSO integration documentation, access review results |
| **Status** | ✅ Ready |

#### CC6.6 — Data Encryption and Protection

**Criteria:** The entity implements controls to protect data from unauthorized access during transmission and storage.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC6.6 |
| **Implementation** | All data in transit is protected using TLS 1.3 with strong cipher suites. Data at rest is encrypted using AES-256 with customer-managed encryption keys (CMEK), ensuring AegisGate cannot access customer data without explicit key provision. The compliance engine enforces SOC2-CC6.6 as an automated CheckFunc validating encryption configurations. Key management is entirely under customer control — AegisGate never possesses, transmits, or stores customer encryption keys. |
| **Evidence** | TLS configuration documentation, AES-256 CMEK architecture, CheckFunc SOC2-CC6.6 implementation |
| **Status** | ✅ Ready |

#### CC6.7 — Data Classification and Handling

**Criteria:** The entity classifies and protects information assets based on their sensitivity.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC6.7 |
| **Implementation** | AegisGate classifies data into sensitivity tiers with corresponding handling requirements. Production data, credentials, and encryption keys are classified as restricted with the highest protection level. The self-hosted architecture ensures customer data remains within the customer's environment — AegisGate does not receive, process, or store customer production data. The compliance engine enforces SOC2-CC6.7 to validate data handling controls. |
| **Evidence** | Data classification policy, handling procedures, CheckFunc SOC2-CC6.7 implementation |
| **Status** | ✅ Ready |

---

### Common Criteria — CC7: System Operations

#### CC7.1 — Detection and Monitoring

**Criteria:** The entity detects and monitors system events that could affect the achievement of objectives.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC7.1 |
| **Implementation** | AegisGate provides 176 threat detection patterns that monitor system events in real time. Hash-chained audit logs provide tamper-evident event recording with configurable retention policies. The 8 MCP guardrails provide additional monitoring and control over AI model interactions. Alerting is configured for security events, access anomalies, and compliance violations. |
| **Evidence** | Threat detection pattern catalog, audit log architecture, guardrail configurations, alerting rules |
| **Status** | ✅ Ready |

#### CC7.2 — Incident Response

**Criteria:** The entity responds to identified security incidents by implementing incident response procedures.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC7.2 |
| **Implementation** | The compliance engine enforces SOC2-CC7.2 as an automated CheckFunc validating incident response readiness. AegisGate maintains documented incident response procedures covering detection, triage, containment, eradication, and recovery phases. The self-hosted architecture ensures incident response for customer data environments is under customer control. AegisGate provides vulnerability notifications and security advisories to customers for platform-relevant incidents. |
| **Evidence** | Incident response procedures, CheckFunc SOC2-CC7.2 implementation, security advisory process |
| **Status** | ✅ Ready — Formal incident response SLA targets documented ([/security/incident-response-sla/](/security/incident-response-sla/)) |

#### CC7.3 — Incident Evaluation and Escalation

**Criteria:** The entity evaluates security events to determine whether they constitute security incidents.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC7.3 |
| **Implementation** | The compliance engine enforces SOC2-CC7.3 to validate incident evaluation controls. Threat detection patterns classify events by severity and type. Escalation criteria are defined based on event classification, with automated alerting for high-severity findings. Security events are evaluated against known patterns and contextual risk factors to determine incident status. |
| **Evidence** | Event classification taxonomy, escalation criteria, CheckFunc SOC2-CC7.3 implementation |
| **Status** | ✅ Ready |

#### CC7.4 — Incident Communication

**Criteria:** The entity communicates security incidents to affected parties.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC7.4 |
| **Implementation** | The compliance engine enforces SOC2-CC7.4 for incident communication controls. AegisGate maintains security advisory procedures for communicating vulnerabilities and incidents to customers. For the self-hosted deployment model, customer-side incident communication is managed by the customer organization. AegisGate provides timely notifications for platform-level security findings through published advisories and release notes. |
| **Evidence** | Security advisory procedures, CheckFunc SOC2-CC7.4 implementation, customer communication templates |
| **Status** | ✅ Ready |

---

### Common Criteria — CC8: Change Management

#### CC8.1 — Change Management Process

**Criteria:** The entity authorizes, designs, tests, approves, implements, and documents changes to infrastructure, data, software, and procedures.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC8.1 |
| **Implementation** | All changes to AegisGate software follow a structured change management process. Code changes require pull request review, automated testing, OPSEC scanning, and approval before merge. The CI/CD pipeline enforces automated testing and security scanning as gates. Production deployments follow a defined release process with version tagging and release notes. |
| **Evidence** | CI/CD pipeline configuration, pull request review requirements, OPSEC scanning integration, release process documentation |
| **Status** | ✅ Ready |

#### CC8.2 — Configuration Management

**Criteria:** The entity configures information assets to minimize vulnerabilities and protect them from unauthorized access.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC8.2 |
| **Implementation** | AegisGate is delivered as a hardened Docker container (19.1MB) with no shell, minimal attack surface, and immutable configuration defaults. Security configurations follow least-access principles. The compliance engine's CheckFuncs continuously validate that configurations remain within policy parameters, detecting configuration drift and unauthorized modifications. |
| **Evidence** | Docker image security documentation, container hardening specifications, CheckFunc configuration validation |
| **Status** | ✅ Ready |

---

### Common Criteria — CC9: Risk Mitigation

#### CC9.1 — Business Continuity and Risk Mitigation

**Criteria:** The entity identifies and selects risks that may affect the achievement of objectives and mitigates those risks.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC9.1 |
| **Implementation** | AegisGate maintains a risk register that identifies, assesses, and tracks mitigation actions for risks affecting security, availability, and compliance objectives. The self-hosted architecture inherently mitigates multiple risk categories — customer infrastructure control eliminates risks associated with shared infrastructure, and zero external data dependencies reduce third-party data exposure. Business continuity for the software supply chain is maintained through GitHub's SOC 2 Type II certified infrastructure and distributed CDN delivery via Cloudflare. |
| **Evidence** | Risk register, architecture risk assessment, subprocessor SOC 2 certifications |
| **Status** | ✅ Ready |

#### CC9.2 — Vendor and Third-Party Risk Management

**Criteria:** The entity evaluates and oversees third-party service providers to mitigate risks.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | CC9.2 |
| **Implementation** | All AegisGate subprocessors (Cloudflare, Netlify, GitHub, Stripe) hold SOC 2 Type II certifications. Subprocessor relationships are limited to non-production functions (CDN, hosting, source control, payment processing) — no subprocessor has access to customer data or production infrastructure. Vendor risk assessments are conducted at onboarding and reviewed annually. |
| **Evidence** | Subprocessor registry, SOC 2 Type II certifications on file, vendor assessment procedures |
| **Status** | ✅ Ready — Formal vendor risk assessment documented ([/security/vendor-risk/](/security/vendor-risk/)) |

---

### Security — Additional Criteria

#### C1.1 — Confidential Information Protection

**Criteria:** The entity protects confidential information during its transmission, storage, and disposal.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | SOC2-C1.1 |
| **Implementation** | The compliance engine enforces SOC2-C1.1 as an automated CheckFunc. All data in transit is encrypted via TLS 1.3. Data at rest is encrypted via AES-256 with customer-managed keys. The self-hosted architecture ensures AegisGate never possesses customer data — all confidential information remains within the customer's infrastructure under their encryption and access controls. Disposal procedures ensure data is purged from AegisGate-operated systems upon request. |
| **Evidence** | Encryption architecture documentation, CheckFunc SOC2-C1.1 implementation, data handling procedures |
| **Status** | ✅ Ready |

#### C2.1 — Confidentiality Commitments

**Criteria:** The entity identifies and meets its confidentiality commitments.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | SOC2-C2.1 |
| **Implementation** | The compliance engine enforces SOC2-C2.1 as an automated CheckFunc. AegisGate's confidentiality commitments are defined in customer agreements and documented security policies. The architecture is designed to honor these commitments by design — customer data never transits AegisGate infrastructure, and encryption keys are customer-managed, making AegisGate technically unable to access confidential information. |
| **Evidence** | Customer agreement terms, security policies, CheckFunc SOC2-C2.1 implementation |
| **Status** | ✅ Ready |

---

### Availability — Additional Criteria

#### A1.1 — System Availability

**Criteria:** The entity maintains system availability to meet its objectives.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | SOC2-A1.1 |
| **Implementation** | The compliance engine enforces SOC2-A1.1 as an automated CheckFunc. AegisGate's self-hosted deployment model means system availability is primarily within customer control — customers deploy on their own infrastructure with their own availability requirements. AegisGate ensures availability of the software through: (1) hardened Docker container with no single points of failure within the application, (2) zero external dependencies that could cause outages, (3) distributed delivery via Cloudflare CDN (SOC 2 Type II), (4) rate limiting to prevent resource exhaustion. The compliance engine monitors availability controls continuously. |
| **Evidence** | Deployment architecture documentation, CheckFunc SOC2-A1.1 implementation, CDN configuration, rate limiting policies |
| **Status** | ✅ Ready |

#### A1.2 — Recovery and Continuity

**Criteria:** The entity recovers system operations to meet availability objectives.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | A1.2 |
| **Implementation** | AegisGate provides documented recovery procedures for the platform software. The self-hosted architecture supports rapid recovery through containerized deployment — the Docker image can be redeployed in minutes. Customer-side recovery is the customer's responsibility, supported by AegisGate's documentation and guidance. Business continuity for AegisGate's delivery infrastructure is maintained through Cloudflare (CDN) and Netlify (hosting), both SOC 2 Type II certified. |
| **Evidence** | Recovery procedures, deployment documentation, CDN and hosting redundancy configuration |
| **Status** | ✅ Ready — Formal RTO/RPO targets documented ([/security/rto-rpo/](/security/rto-rpo/)) |

---

### Confidentiality — Additional Criteria

#### C1.1 — Confidential Information Identification

*(Addressed above under Security C1.1)*

#### C2.1 — Confidentiality Commitments

*(Addressed above under Security C2.1)*

#### C3.1 — Confidential Information Disposal

**Criteria:** The entity disposes of confidential information when no longer needed.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | C3.1 |
| **Implementation** | AegisGate does not retain customer data — the self-hosted architecture ensures data remains within customer infrastructure. For AegisGate-operated systems (development, staging), disposal procedures ensure secure deletion of any temporary data. Customer-managed data disposal is the customer's responsibility within their own environment. |
| **Evidence** | Data retention and disposal procedures, architecture documentation confirming no data retention |
| **Status** | ✅ Ready — Formal data disposal policy documented ([/security/data-disposal/](/security/data-disposal/)) |

---

### Processing Integrity — Additional Criteria

#### PI1.1 — Processing Accuracy and Completeness

**Criteria:** The entity processes data accurately and completely to meet its objectives.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | PI1.1 |
| **Implementation** | AegisGate's compliance engine processes are validated through automated testing and integrity checks. The hash-chained audit log architecture ensures that processed events are recorded completely and without modification. CheckFuncs are validated through automated test suites to ensure accurate evaluation results. Rate limiting and input validation prevent incomplete or malformed processing. |
| **Evidence** | Test suite documentation, audit log integrity verification, CheckFunc validation procedures |
| **Status** | ✅ Ready — Formal processing integrity controls documented ([/security/processing-integrity/](/security/processing-integrity/)) |

#### PI1.2 — Processing Integrity Controls

**Criteria:** The entity implements controls to prevent, detect, and correct processing errors.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | SOC2-PI1.2 |
| **Implementation** | The compliance engine enforces SOC2-PI1.2 as an automated CheckFunc validating processing integrity controls. Input validation, rate limiting, and error handling prevent processing errors. The hash-chained audit log provides detection of any processing anomalies. MCP guardrails provide additional integrity controls over AI model interactions, ensuring processing remains within defined parameters. |
| **Evidence** | CheckFunc SOC2-PI1.2 implementation, input validation specifications, error handling procedures, MCP guardrail configurations |
| **Status** | ✅ Ready |

---

### AI-Specific Controls

#### SOC2-AI-001 — AI System Governance

**Criteria:** The entity implements governance controls over AI system operations to ensure safe and compliant use.

| Attribute | Detail |
|---|---|
| **SOC 2 Reference** | SOC2-AI-001 |
| **Implementation** | AegisGate's compliance engine enforces SOC2-AI-001 as an automated CheckFunc. AI governance is implemented through 8 MCP guardrails that enforce safety, content, and operational constraints on AI model interactions. Threat detection patterns include AI-specific detection capabilities. The compliance engine monitors AI operations against 31 frameworks to ensure continuous compliance. Rate limiting enforces per-tier RPM constraints on AI interactions. |
| **Evidence** | CheckFunc SOC2-AI-001 implementation, MCP guardrail configurations, AI threat detection patterns, rate limiting policies |
| **Status** | ✅ Ready |

---

## Remediation Roadmap

The following items have been identified as requiring action prior to formal SOC 2 Type 1 audit engagement. Items are prioritized by impact on audit readiness.

### Priority 1 — Critical (✅ Addressed)

| ID | Criterion | Finding | Action | Status | Document |
|---|---|---|---|---|---|
| ~~REM-001~~ | CC1.3 | Formal training tracking system not implemented | Training program documented, completion records tracked ([/security/training/](/security/training/), [/security/training-records/](/security/training-records/)) | ✅ Addressed | [/security/training/](/security/training/) |
| ~~REM-002~~ | CC7.2 | Incident response procedures lack defined SLA targets | Formalize incident response procedures with severity-based SLA targets (Critical: 1h, High: 4h, Medium: 24h, Low: 72h) | ✅ Addressed | [/security/incident-response-sla/](/security/incident-response-sla/) |
| ~~REM-003~~ | A1.2 | Recovery time and point objectives not formally documented | Document RTO/RPO targets and validate against deployment architecture capabilities | ✅ Addressed | [/security/rto-rpo/](/security/rto-rpo/) |

### Priority 2 — Important (✅ Addressed)

| ID | Criterion | Finding | Action | Status | Document |
|---|---|---|---|---|---|
| ~~REM-004~~ | CC9.2 | Annual vendor review process not formally documented | Document vendor risk assessment and review procedures with annual cadence | ✅ Addressed | [/security/vendor-risk/](/security/vendor-risk/) |
| ~~REM-005~~ | C3.1 | Formal data disposal procedures not documented | Create disposal procedures documentation covering all data classifications | ✅ Addressed | [/security/data-disposal/](/security/data-disposal/) |
| ~~REM-006~~ | PI1.1 | Processing integrity validation not formally documented | Document processing integrity controls, validation methods, and error handling procedures | ✅ Addressed | [/security/processing-integrity/](/security/processing-integrity/) |

### Priority 3 — Enhancement (Continuous Improvement)

| ID | Criterion | Finding | Action | Target |
|---|---|---|---|---|
| REM-007 | CC3.1 | Risk assessment could incorporate automated threat intelligence feeds | Integrate threat intelligence feeds into risk assessment process | Q1 2027 |
| REM-008 | CC4.1 | Separate evaluations could be formalized with annual internal audit | Establish formal internal audit function with annual evaluation cycle | Q1 2027 |

---

## Attestation

This SOC 2 Type 1 Readiness Assessment — Self-Assessment has been prepared by the AegisGate Compliance & Security Engineering team. The readiness statuses, implementation descriptions, and remediation items represent our good-faith evaluation of control design and implementation against the AICPA Trust Services Criteria.

**Prepared By:**

Compliance & Security Engineering, AegisGate

**Date:** July 29, 2026

**Review and Approval:**

| Role | Name | Date |
|---|---|---|
| Compliance Lead | _To be completed upon formal review_ | |
| Security Engineering | _To be completed upon formal review_ | |
| Executive Sponsor | _To be completed upon formal review_ | |

---

*This document is classified as Confidential — Internal Use. Distribution is limited to authorized personnel involved in SOC 2 audit preparation. This self-assessment does not constitute a SOC 2 audit report or certification.*