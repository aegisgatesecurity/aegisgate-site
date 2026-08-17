---
title: "Information Security Management System Policy"
description: "AegisGate Security, LLC ISMS Policy. Top-level commitment to information security management, objectives, and continuous improvement."
type: "compliance"
date: 2026-07-29
layout: single
---

<div class="compliance-header">

# Information Security Management System Policy

**AegisGate Security, LLC**

| Field | Value |
|---|---|
| **Document ID** | AG-ISMSPOL-2026-001 |
| **Version** | 1.0 |
| **Classification** | Public — External Use |
| **Owner** | Chief Executive Officer |
| **Approver** | Chief Executive Officer |
| **Review Cycle** | Annual (or upon material change) |
| **Effective Date** | July 29, 2026 |
| **Next Review** | July 29, 2027 |

</div>

---

## 1. Policy Statement

AegisGate Security, LLC is committed to establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS) in accordance with ISO/IEC 27001:2022. This commitment extends to every aspect of our operations — from the design and development of the AegisGate Security Platform through its deployment, support, and decommissioning.

Information security is integral to AegisGate's mission. We build security infrastructure for AI systems, and our own security posture must exemplify the standards we enforce for our customers. This policy establishes the framework within which AegisGate protects information assets against threats to confidentiality, integrity, and availability.

Leadership at AegisGate provides top-down commitment to information security. Resources are allocated to ensure the ISMS operates effectively, risks are managed proactively, and continuous improvement is embedded in every process.

---

## 2. ISMS Scope

### 2.1 In Scope

The AegisGate ISMS covers:

1. **AegisGate Security Platform** — self-hosted, on-premises security gateway for AI infrastructure, delivered as a Docker container (19.1MB) with zero external dependencies.
2. **Software development lifecycle** — source code management (GPG-signed commits), CI/CD pipelines, release signing (ECDSA P-256 license keys), secure development practices.
3. **Compliance engine** — 857+ automated CheckFuncs across 31 compliance frameworks, including the ISO 27001 module with dedicated control checks.
4. **Trust and attestation services** — hash-chained audit logging, cryptographic attestation generation, evidence collection.
5. **Customer-facing security operations** — threat detection (176 patterns), RBAC with MFA, OIDC/SAML SSO integration, TLS 1.3 transport encryption, AES-256 encryption at rest with customer-managed keys.
6. **Organizational processes** — information security policy, risk management, incident response, business continuity, management review, and internal audit.
7. **Supporting infrastructure** — AegisGate's development environments, internal systems, and third-party services used in platform delivery.

### 2.2 Out of Scope

The following are excluded from the AegisGate ISMS scope:

1. **Customer-managed infrastructure** — physical servers, data centers, network topology, and on-premises hardware deployed by customers.
2. **Customer data processing environments** — AegisGate never sees customer data after deployment; data processing is entirely under customer control.
3. **Third-party services provisioned by customers** — cloud providers, CDN configurations, or external integrations operated by customers in their own environments.

**Justification:** AegisGate is deployed on customer-managed infrastructure. Per the shared responsibility model, physical security, data center operations, and on-premises infrastructure management fall within the customer's ISMS scope. AegisGate's ISMS covers the application-layer security controls, platform integrity, and organizational processes within AegisGate Security, LLC.

### 2.3 Boundaries

| Boundary | Description |
|---|---|
| **Logical boundary** | All AegisGate-developed software, configuration, and documentation. All network endpoints operated by AegisGate Security, LLC. |
| **Physical boundary** | AegisGate Security, LLC operates remote-first. Physical assets are managed per the Asset Security Policy. Customer data centers are out of scope. |
| **Organizational boundary** | All AegisGate Security, LLC personnel, contractors, and subprocessors acting on behalf of AegisGate. |

---

## 3. Information Security Objectives

AegisGate establishes the following measurable information security objectives, reviewed quarterly during Management Review and updated annually:

| ID | Objective | Target | Measurement Method | Review Frequency |
|---|---|---|---|---|
| OBJ-01 | Maintain platform availability | ≥ 99.9% uptime for AegisGate-hosted services | Service monitoring metrics | Monthly |
| OBJ-02 | Prevent unauthorized access | Zero confirmed unauthorized access incidents | Incident tracking system | Quarterly |
| OBJ-03 | Maintain compliance alignment | ≥ 85% of applicable ISO 27001 controls implemented | Internal audit results | Quarterly |
| OBJ-04 | Reduce mean time to remediate vulnerabilities | Critical: ≤ 48 hours; High: ≤ 7 days; Medium: ≤ 30 days | Vulnerability tracking system | Monthly |
| OBJ-05 | Maintain audit log integrity | Zero confirmed audit log tampering incidents | Hash chain verification | Monthly |
| OBJ-06 | Complete security awareness training | 100% of personnel complete annual training | Training tracking system | Annual |
| OBJ-07 | Maintain cryptographic integrity | 100% of releases signed with GPG keys; 100% of license keys validated via ECDSA P-256 | Release verification; License key validation logs | Per release |
| OBJ-08 | Ensure third-party compliance | 100% of critical subprocessors hold SOC 2 Type II or equivalent certification | Supplier review records | Annual |

---

## 4. Risk Management Approach

AegisGate adopts a risk-based approach to information security management aligned with ISO 27001 Clause 6.1 and ISO 31000 principles:

### 4.1 Risk Assessment

- **Methodology:** Qualitative risk assessment using likelihood and impact matrices. Risk assessments performed annually and upon material change.
- **Context:** Risk assessments consider AegisGate's self-hosted architecture, the shared responsibility model, and threat intelligence from the 176 detection patterns integrated into the compliance engine.
- **Criteria:** Risks evaluated on a 5-point scale for both likelihood (Rare to Almost Certain) and impact (Negligible to Severe). Risk scores drive prioritization.

### 4.2 Risk Treatment

- **Risk treatment options:** Modify (implement controls), Share (transfer to third party), Retain (accept with documented rationale), Avoid (eliminate the risk source).
- **Statement of Applicability:** Risk treatment decisions documented in the ISO 27001 Statement of Applicability (AG-ISO27001-SoA-2026-001), including justification for controls deemed not applicable.
- **Risk acceptance:** Risks accepted only with documented rationale and approval per the risk acceptance authority matrix.

### 4.3 Risk Monitoring

- Risks monitored continuously through the compliance engine's 857+ automated CheckFuncs.
- Risk register reviewed quarterly during Management Review.
- Emerging risks from threat intelligence feeds evaluated monthly.

---

## 5. Continuous Improvement Commitment

AegisGate is committed to continual improvement of the ISMS through the Plan-Do-Check-Act (PDCA) cycle:

**Plan:** Risk assessments, objective setting, control selection, and resource allocation documented in the ISMS and Statement of Applicability.

**Do:** Implementation and operation of controls through the compliance engine (857+ CheckFuncs across 31 frameworks), operational procedures, and security awareness training.

**Check:** Monitoring, measurement, internal audits, and management reviews. Hash-chained audit logs provide continuous tamper-evident monitoring. Internal audits conducted annually per the Internal Audit Program (AG-IAUD-2026-001).

**Act:** Corrective actions, preventive actions, and ISMS improvements driven by audit findings, management review outputs, and incident learnings. Improvements tracked in the Continuous Improvement Roadmap.

### 5.1 Improvement Mechanisms

| Mechanism | Frequency | Owner |
|---|---|---|
| Internal audit | Annual cycle | Compliance & Security Engineering |
| Management review | Quarterly | Chief Executive Officer |
| Risk assessment review | Annual + material change | Compliance & Security Engineering |
| Incident post-mortem | Per incident | Incident Response Lead |
| Compliance engine coverage review | Quarterly | Compliance & Security Engineering |
| Policy review | Annual | Chief Executive Officer |

---

## 6. Management Review

The ISMS is subject to quarterly Management Review per the Management Review Procedure (AG-MGTREV-2026-001). Review inputs include:

- Results of internal audits and compliance assessments
- Feedback from interested parties
- Information security performance and objective achievement
- Risk assessment results and risk treatment status
- Incident reports and corrective action effectiveness
- Emerging threats and regulatory changes
- Continuous improvement opportunities

Review outputs include decisions and actions related to:

- ISMS improvement opportunities
- Changes to information security objectives
- Resource needs and allocation
- Corrective action priorities

---

## 7. Roles and Responsibilities

| Role | Responsibilities |
|---|---|
| **Chief Executive Officer** | Ultimate accountability for the ISMS. Approves this policy. Chairs Management Review. Establishes information security objectives. |
| **Compliance & Security Engineering** | Day-to-day operation of the ISMS. Conducts risk assessments. Maintains the Statement of Applicability. Leads internal audits. |
| **Engineering Leadership** | Implements security controls in platform design and development. Reviews and accepts risk treatment decisions. |
| **All Personnel** | Complies with this policy and supporting procedures. Reports information security events. Completes security awareness training. |

### 7.1 Competence

AegisGate ensures that all personnel performing work affecting information security are competent on the basis of:

- Appropriate education, training, or experience
- Security awareness training completed upon hire and annually thereafter
- Role-specific security training as defined in the training matrix
- Competence records maintained per the Records Retention Policy

---

## 8. Communication

This policy and supporting documents are communicated to all AegisGate personnel through:

- Publication on the internal documentation system
- Security awareness training upon hire and annually
- Management review meeting minutes distributed to all personnel
- Policy changes communicated within 30 days of approval

Interested parties outside AegisGate may request policy information through the compliance contact: **compliance@aegisgatesecurity.io**

---

## 9. Document Control

### 9.1 Document Hierarchy

| Level | Document | ID |
|---|---|---|
| Level 1 | ISMS Policy (this document) | AG-ISMSPOL-2026-001 |
| Level 2 | ISO 27001 Statement of Applicability | AG-ISO27001-SoA-2026-001 |
| Level 2 | Management Review Procedure | AG-MGTREV-2026-001 |
| Level 2 | Internal Audit Program | AG-IAUD-2026-001 |
| Level 3 | Operational procedures, work instructions, configuration guides | Various |
| Level 4 | Records, logs, evidence | Various |

### 9.2 Review Cycle

| Document | Review Frequency | Approver |
|---|---|---|
| ISMS Policy | Annual or material change | Chief Executive Officer |
| Statement of Applicability | Quarterly or material change | Compliance & Security Engineering |
| Management Review Procedure | Annual | Chief Executive Officer |
| Internal Audit Program | Annual | Compliance & Security Engineering |
| Supporting procedures | Annual or material change | Compliance & Security Engineering |

---

## 10. Policy Review

This policy is reviewed annually or when material changes occur to:

- The ISMS scope
- The business context
- Legal or regulatory requirements
- Risk assessment results
- Incident findings
- Management review outputs

Policy changes require approval from the Chief Executive Officer and are communicated to all personnel within 30 days.

---

## Sign-Off

| Role | Name | Signature | Date |
|---|---|---|---|
| **Chief Executive Officer** | _________________________ | _________________________ | July 29, 2026 |
| **Compliance & Security Engineering** | _________________________ | _________________________ | July 29, 2026 |

---

*This document is the property of AegisGate Security, LLC. Unauthorized reproduction or distribution is prohibited. For questions regarding this policy, contact compliance@aegisgatesecurity.io.*