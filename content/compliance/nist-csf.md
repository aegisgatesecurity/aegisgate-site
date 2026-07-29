---
title: "NIST CSF 2.0 Self-Assessment"
description: "AegisGate Security Platform NIST Cybersecurity Framework 2.0 self-assessment. Demonstrates cybersecurity posture across all six core functions."
type: "compliance"
date: 2026-07-29
layout: single
---

# NIST Cybersecurity Framework 2.0 Self-Assessment

| Field | Value |
|---|---|
| **Document Version** | 2.0 |
| **Classification** | Confidential — Internal Use |
| **Framework Reference** | NIST Cybersecurity Framework 2.0 (February 2024) |
| **Assessment Date** | 2026-07-29 |
| **Document Owner** | Compliance & Risk Engineering |
| **Review Cycle** | Annual (next review: 2027-07-29) |
| **Approval Authority** | VP, Security Engineering |

---

## Executive Summary

This self-assessment evaluates the AegisGate Security Platform against the NIST Cybersecurity Framework 2.0, covering all six core functions: Govern, Identify, Protect, Detect, Respond, and Recover. AegisGate is a self-hosted, on-premises security gateway for AI infrastructure, designed to provide enterprise-grade security controls while maintaining complete customer data sovereignty.

### Maturity Summary

| Core Function | Maturity Tier | Score | Status |
|---|---|---|---|
| **GOVERN (GV)** | Tier 2 — Risk-Informed | 2.4 / 4.0 | ⚠️ Partial |
| **IDENTIFY (ID)** | Tier 3 — Repeatable | 3.2 / 4.0 | ✅ Implemented |
| **PROTECT (PR)** | Tier 3 — Repeatable | 3.4 / 4.0 | ✅ Implemented |
| **DETECT (DE)** | Tier 3 — Repeatable | 3.3 / 4.0 | ✅ Implemented |
| **RESPOND (RS)** | Tier 3 — Repeatable | 3.1 / 4.0 | ✅ Implemented |
| **RECOVER (RC)** | Tier 2 — Risk-Informed | 2.7 / 4.0 | ⚠️ Partial |
| **Overall** | Tier 3 — Repeatable | 3.0 / 4.0 | ✅ Implemented |

**Key findings:**

- AegisGate achieves Tier 3 (Repeatable) maturity across four of six core functions, with repeatable and well-documented controls consistently executed.
- GOVERN and RECOVER operate at Tier 2 (Risk-Informed), reflecting the product-centric nature of organizational governance controls and the customer-managed recovery posture inherent to self-hosted deployments.
- 44 platform controls map directly to NIST CSF 2.0 subcategories, providing automated, auditable evidence of compliance.
- Zero external dependencies and a 34.7MB container footprint minimize the attack surface and reduce supply-chain risk.

---

## Scope and Methodology

### Scope

This assessment covers the AegisGate Security Platform — a self-hosted, on-premises AI security gateway deployed as a Docker container on customer-managed infrastructure. The assessment evaluates both:

1. **Platform controls** — Security capabilities delivered to customers as product features.
2. **Organizational controls** — Internal security governance, risk management, and operational practices.

Boundary: AegisGate software artifacts, deployment architecture, compliance engine, threat detection pipeline, and supporting documentation. Customer-managed infrastructure (networks, compute, storage) is out of scope but acknowledged where AegisGate controls depend on customer configuration.

### Methodology

- **Framework alignment**: Direct mapping of AegisGate capabilities to NIST CSF 2.0 subcategories using the Framework Core v2.0.
- **Control mapping**: Each subcategory is evaluated against documented platform controls (AG-* identifiers) and supporting evidence.
- **Maturity scoring**: Tier-based assessment per NIST CSF implementation tiers, with scoring calibrated to the product context.
- **Evidence sources**: Architecture documentation, source code audit, compliance engine CheckFunc registry, incident response policy, and published security documentation.

### Maturity Model

| Tier | Name | Description |
|---|---|---|
| **Tier 1** | Partial | Risk management is ad hoc; controls are reactive and inconsistent. |
| **Tier 2** | Risk-Informed | Risk awareness exists; practices are planned but not fully standardized. |
| **Tier 3** | Repeatable | Practices are consistently implemented, documented, and regularly updated. |
| **Tier 4** | Adaptive | Practices are proactive, risk-informed, and continuously improved through automation. |

**Target maturity**: Tier 3 (Repeatable) for platform security controls; Tier 2 (Risk-Informed) for organizational governance controls, consistent with AegisGate's product-centric operating model.

---

## Assessment Results

---

### Function 1: GOVERN (GV)

**Maturity: Tier 2 — Risk-Informed** | Score: 2.4 / 4.0

The GOVERN function establishes organizational context, risk management strategy, and supply-chain risk management. As a product-focused company, AegisGate implements governance through embedded platform controls and published policies rather than a traditional enterprise IT governance structure.

#### GV.OC — Organizational Context

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| GV.OC-01 | Organizational mission is informed by cybersecurity risk | AegisGate's mission — securing AI infrastructure — is the primary driver of product security architecture. Every platform control (857+ CheckFuncs across 24 frameworks) is designed to translate cybersecurity risk requirements into enforceable policy. | 2 | ✅ Implemented |
| GV.OC-02 | Internal and external stakeholders are identified | Stakeholder map includes: customers (security and platform engineering teams), regulators (via 24 compliance frameworks), AI model providers, and internal engineering. Published security documentation and incident response policy define stakeholder communication channels. | 2 | ✅ Implemented |
| GV.OC-03 | Cybersecurity risk management expectations and requirements are established | Compliance engine enforces risk requirements via 857+ automated CheckFuncs across NIST CSF, SOC 2, HIPAA, PCI-DSS, and 20 additional frameworks. Risk requirements are codified as policy, not advisory guidance. | 3 | ✅ Implemented |
| GV.OC-04 | Legal and regulatory requirements are understood and managed | Compliance engine provides automated mapping to 24 regulatory frameworks with continuous audit readiness. Legal requirements are translated into enforceable controls. | 2 | ⚠️ Partial |

#### GV.RM — Risk Management Strategy

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| GV.RM-01 | Risk management objectives are established | AG-RISK-GOVERNANCE defines the risk management framework. Objectives are codified in the compliance engine as enforceable policies covering access control, data protection, threat detection, and incident response. | 3 | ✅ Implemented |
| GV.RM-02 | Risk is acceptable to stakeholders | Risk appetite is defined through configurable policy thresholds — customers set their own risk tolerance via tiered RPM limits, guardrail configurations, and detection sensitivity levels. | 2 | ✅ Implemented |
| GV.RM-03 | Cybersecurity risk response is determined | Automated risk response via the compliance engine: violations trigger real-time alerts, enforcement actions (block, redact, rate-limit), and audit logging. 153+ detection patterns enable risk-informed response. | 3 | ✅ Implemented |
| GV.RM-04 | Risk management is integrated into business processes | Product security is embedded in the development lifecycle. Compliance checks are automated, not bolted on — 857+ CheckFuncs run continuously as part of platform operation. | 2 | ⚠️ Partial |

#### GV.SC — Supply Chain Risk Management

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| GV.SC-01 | Supply chain risk management plan is established | AegisGate's architecture eliminates external supply chain dependencies by design. The platform is self-hosted, zero-egress, and operates without third-party API calls. Docker image is 34.7MB with no shell — supply chain attack surface is minimized to the container build pipeline. | 3 | ✅ Implemented |
| GV.SC-02 | Suppliers are assessed and managed | All direct dependencies are audited. Container image uses minimal base with no shell, no package manager, and no external runtime dependencies. ECDSA P-256 license signing prevents supply chain tampering. | 2 | ⚠️ Partial |
| GV.SC-03 | Supply chain risk is understood | Dependencies are limited to the Docker runtime environment. Zero external API dependencies mean the supply chain is bounded and auditable. Vulnerability scanning of the container image is performed as part of the release process. | 2 | ⚠️ Partial |
| GV.SC-04 | Suppliers are monitored | Continuous monitoring of the build pipeline. Customer-managed deployment model means customers control infrastructure dependencies directly. | 2 | ⚠️ Partial |
| GV.SC-05 | Resilience is maintained through supply chain disruptions | Self-hosted architecture ensures zero dependency on AegisGate infrastructure for continued operation. Customers deploy on their own infrastructure — AegisGate service disruptions do not impact deployed instances. | 3 | ✅ Implemented |

---

### Function 2: IDENTIFY (ID)

**Maturity: Tier 3 — Repeatable** | Score: 3.2 / 4.0

The IDENTIFY function ensures assets are managed, risks are assessed, and improvements are prioritized. AegisGate provides comprehensive asset visibility and risk assessment through its compliance engine and audit infrastructure.

#### ID.AM — Asset Management

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| ID.AM-01 | Assets are identified and inventoried | AG-ASSET-INVENTORY maintains a comprehensive registry of AI models, API endpoints, and connected services. Inventory is automated and continuously updated through the gateway proxy layer. | 3 | ✅ Implemented |
| ID.AM-02 | Asset vulnerabilities are identified and managed | Compliance engine runs 857+ automated CheckFuncs including vulnerability-oriented controls across 24 frameworks. 153+ detection patterns identify exposure risks in real time (secrets, PII/PHI, prompt injection vectors, data exfiltration paths). | 3 | ✅ Implemented |
| ID.AM-03 | Asset roles and responsibilities are mapped | RBAC model with MFA enforcement defines clear role boundaries. Six authentication providers (OIDC/SAML SSO) integrate with customer identity infrastructure. Access roles map directly to asset responsibilities. | 3 | ✅ Implemented |
| ID.AM-04 | Asset interdependencies are understood | AI infrastructure topology is mapped through the gateway proxy. Dependency flows between models, tools, and data sources are explicitly configured and enforced via MCP guardrails (8 guardrails for tool-use security). | 3 | ✅ Implemented |
| ID.AM-05 | Asset criticality is assigned | Customer-configurable tier system assigns criticality levels. Rate limiting enforces per-tier RPM thresholds. High-criticality workflows receive enhanced monitoring and stricter guardrail enforcement. | 3 | ✅ Implemented |
| ID.AM-06 | Asset lifecycle is managed | Asset lifecycle is governed through configuration-as-code. Deployment, configuration changes, and decommissioning are audited via hash-chained event logs with configurable retention policies. | 3 | ✅ Implemented |

#### ID.RA — Risk Assessment

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| ID.RA-01 | Risk assessment process is established | AG-RISK-GOVERNANCE defines the risk assessment methodology. The compliance engine operationalizes risk assessment through continuous automated evaluation of 857+ control checks across 24 frameworks. | 3 | ✅ Implemented |
| ID.RA-02 | Threat sources are identified | 153+ detection patterns covering: secrets exposure, PII/PHI leakage, prompt injection attacks, data exfiltration attempts, and tool-use abuse. Detection patterns are continuously updated and validated against emerging threat intelligence. | 3 | ✅ Implemented |
| ID.RA-03 | Vulnerabilities and their likelihood are assessed | Compliance engine continuously evaluates configuration vulnerabilities and policy violations. Each of the 38 AG-* platform controls includes severity classification and risk scoring. | 3 | ✅ Implemented |
| ID.RA-04 | Potential impact is identified | Impact assessment is automated: data classification via PII/PHI detection, secrets exposure severity grading, and prompt injection risk scoring. Impact thresholds are customer-configurable. | 3 | ✅ Implemented |
| ID.RA-05 | Threat and vulnerability information is used | Detection patterns are informed by real-world threat data. 153+ patterns reflect known attack vectors in AI infrastructure, including OWASP LLM Top 10 coverage. | 3 | ✅ Implemented |
| ID.RA-06 | Risk responses are selected | Automated risk response via the compliance engine: block, redact, alert, or rate-limit based on detection severity. Response actions are policy-driven and fully auditable. | 3 | ✅ Implemented |
| ID.RA-07 | Risk assessment results are communicated | Audit logs with hash-chained integrity provide tamper-evident risk assessment records. Compliance dashboards communicate findings to stakeholders via 24 framework reports, including 6 NIST CSF controls (NIST-CSF-GOVERN through NIST-CSF-RECOVER). | 3 | ✅ Implemented |

#### ID.IM — Improvement

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| ID.IM-01 | Improvement opportunities are identified | Compliance engine identifies gaps through continuous automated assessment. Failed CheckFuncs generate actionable findings with specific remediation guidance across all 24 frameworks. | 3 | ✅ Implemented |
| ID.IM-02 | Security and resilience improvements are implemented | Platform updates are delivered as signed container images. ECDSA P-256 license verification ensures only authorized updates are applied. Release process includes security review and vulnerability remediation. | 2 | ✅ Implemented |
| ID.IM-03 | Improvement results are evaluated | Improvement effectiveness is measured through compliance score trending, detection pattern efficacy metrics, and incident reduction rates. Hash-chained audit logs provide longitudinal evidence of improvement. | 2 | ⚠️ Partial |

---

### Function 3: PROTECT (PR)

**Maturity: Tier 3 — Repeatable** | Score: 3.4 / 4.0

The PROTECT function encompasses access control, awareness training, data security, platform security, and technology infrastructure. AegisGate implements robust protective controls across all subcategories.

#### PR.AA — Identity Management, Authentication, and Access Control

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| PR.AA-01 | Identity is asserted and managed | Six authentication providers (OIDC/SAML SSO) integrate with customer identity infrastructure. Identity assertions are validated before any gateway operation. | 3 | ✅ Implemented |
| PR.AA-02 | Identity is authenticated | Multi-factor authentication enforced for all administrative access. SSO integration with IdP-enforced MFA policies. No anonymous or shared accounts permitted. | 3 | ✅ Implemented |
| PR.AA-03 | Access is authorized | AG-AC-ACCESS-ENFORCEMENT implements role-based access control with granular permissions. Access decisions are policy-driven, auditable, and enforced at the gateway layer. | 3 | ✅ Implemented |
| PR.AA-04 | Access permissions are managed | RBAC model with defined roles, least-privilege enforcement, and periodic access review via audit logs. Permission changes are hash-chained and tamper-evident. | 3 | ✅ Implemented |
| PR.AA-05 | Network integrity is protected | Self-hosted deployment on customer network infrastructure. AegisGate does not open inbound ports beyond customer-designated endpoints. All gateway traffic is TLS 1.3 encrypted. | 3 | ✅ Implemented |

#### PR.AT — Awareness and Training

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| PR.AT-01 | Personnel are trained on cybersecurity awareness | Security awareness training program documented ([/security/training/](/security/training/)) with role-based modules, quarterly phishing simulations, and completion tracking. AegisGate's compliance dashboard provides continuous visibility into security posture. Threat detection capabilities (153+ patterns) serve as real-time security awareness signals. | 3 | ⚠️ Partial → ✅ Addressed |
| PR.AT-02 | Personnel are trained on their role-specific duties | Role-based training program documented ([/security/training/](/security/training/)) with 8 modules mapped to roles (Engineering, Management, Compliance, Contractors). Training content maps to RBAC model and access levels. | 3 | ⚠️ Partial → ✅ Addressed |

#### PR.DS — Data Security

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| PR.DS-01 | Data at rest is protected | AES-256 encryption with customer-managed keys. Self-hosted deployment ensures encryption keys never leave customer infrastructure. No data is stored in AegisGate-controlled systems. | 3 | ✅ Implemented |
| PR.DS-02 | Data in transit is protected | TLS 1.3 enforced for all communications. Zero-egress architecture prevents data from traversing external networks. All gateway traffic remains within customer infrastructure boundaries. | 3 | ✅ Implemented |
| PR.DS-10 | Data-at-rest confidentiality is maintained | AES-256 with customer-managed keys ensures only authorized parties can decrypt stored data. Hash-chained audit logs provide integrity verification without exposing content. | 3 | ✅ Implemented |
| PR.DS-11 | Data in transit confidentiality is maintained | TLS 1.3 with forward secrecy. No data leaves customer infrastructure — self-hosted architecture ensures complete data sovereignty. | 3 | ✅ Implemented |

#### PR.PS — Platform Security

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| PR.PS-01 | Platform security is established | 34.7MB Docker image with no shell, no package manager, and no unnecessary binaries. Minimal attack surface by architecture. Container runs as non-root with read-only filesystem where possible. | 3 | ✅ Implemented |
| PR.PS-02 | Platform integrity is verified | ECDSA P-256 signed container images and license keys ensure integrity verification. Hash-chained audit logs provide runtime integrity attestation. | 3 | ✅ Implemented |
| PR.PS-03 | Platform security is maintained | Stateless proxy architecture eliminates persistent state vulnerabilities. Updates are delivered as complete signed container images — no in-place patching. | 3 | ✅ Implemented |

#### PR.IR — Technology Infrastructure Resilience

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| PR.IR-01 | Backups are maintained | Self-hosted architecture: customer-managed backups using their own infrastructure and procedures. AegisGate's stateless design means recovery requires only configuration restoration. | 2 | ✅ Implemented |
| PR.IR-02 | Redundancy is established | Stateless proxy architecture with no single point of failure at the application layer. Customers implement infrastructure redundancy per their own HA requirements. | 3 | ✅ Implemented |

---

### Function 4: DETECT (DE)

**Maturity: Tier 3 — Repeatable** | Score: 3.3 / 4.0

The DETECT function covers continuous monitoring and adverse event analysis. AegisGate provides real-time threat detection across the AI infrastructure attack surface.

#### DE.CM — Continuous Monitoring

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| DE.CM-01 | Assets are monitored for cybersecurity events | AG-AU-AUDIT-MONITORING provides continuous event monitoring through hash-chained audit logs. All gateway operations — authentication, authorization, policy enforcement, data flows — are monitored in real time. | 3 | ✅ Implemented |
| DE.CM-02 | Service and network behavior is monitored | 153+ detection patterns continuously analyze traffic behavior: anomaly detection for secrets exposure, PII/PHI leakage, prompt injection attempts, and data exfiltration. Per-tier RPM rate limiting monitors for abuse patterns. | 3 | ✅ Implemented |
| DE.CM-03 | External service provider behavior is monitored | MCP guardrails (8 guardrails) monitor and control external tool-use interactions. Every tool call, data access, and API invocation through the gateway is subject to guardrail enforcement and audit logging. | 3 | ✅ Implemented |
| DE.CM-06 | Physical environment is monitored | Customer-managed physical infrastructure. AegisGate's zero-external-dependency architecture eliminates the need to monitor third-party physical environments. | N/A | N/A |
| DE.CM-07 | Vulnerability management is monitored | Compliance engine continuously evaluates 857+ control checks, including vulnerability-oriented detections. Failed checks trigger alerts and remediation guidance. | 3 | ✅ Implemented |
| DE.CM-08 | Impact analysis is performed | Real-time impact analysis via detection pattern severity classification. Secrets exposure, PII/PHI leakage, and prompt injection events are graded by severity and potential blast radius. | 3 | ✅ Implemented |

#### DE.AE — Adverse Event Analysis

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| DE.AE-01 | Potential adverse events are identified | 153+ detection patterns provide comprehensive adverse event identification across: secrets exposure (API keys, credentials, tokens), PII/PHI leakage (names, SSNs, medical records), prompt injection (jailbreak, instruction override, role manipulation), and data exfiltration (bulk extraction, unauthorized forwarding). | 3 | ✅ Implemented |
| DE.AE-02 | Adverse events are analyzed | Detected events are analyzed in context: source identity, request pattern, data sensitivity, and threat severity. Analysis results feed into automated response decisions (block, redact, alert). | 3 | ✅ Implemented |
| DE.AE-03 | Adverse event information is shared | Hash-chained audit logs ensure tamper-evident event records. Findings are available through compliance dashboards and exportable to SIEM/SOAR via standard log formats. | 3 | ✅ Implemented |
| DE.AE-04 | Incident thresholds are established | Customer-configurable detection thresholds per pattern category. Rate limiting enforces RPM thresholds per tier. Alert thresholds are policy-driven and auditable. | 3 | ✅ Implemented |
| DE.AE-06 | Adverse events are prioritized | Severity classification system prioritizes events: critical (active data exfiltration, successful injection), high (secrets exposure, PHI leakage), medium (PII detection, rate limit violations), low (informational, near-miss). | 3 | ✅ Implemented |
| DE.AE-07 | Adverse event analysis is coordinated | Correlation across detection patterns provides coordinated analysis. A single request may trigger multiple detection categories, and the compliance engine coordinates these findings into unified risk scoring. | 3 | ✅ Implemented |

---

### Function 5: RESPOND (RS)

**Maturity: Tier 3 — Repeatable** | Score: 3.1 / 4.0

The RESPOND function covers incident management, analysis, mitigation, reporting, and communication. AegisGate provides automated response capabilities and a published incident response policy.

#### RS.MA — Incident Management

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| RS.MA-01 | Incident response plan is established | AG-IR-INCIDENT-RESPONSE defines the incident response framework. Published IR policy with defined roles, procedures, and escalation paths. 24-hour acknowledgment SLA for all reported incidents. | 3 | ✅ Implemented |
| RS.MA-02 | Incident response plan is tested | Incident response procedures validated through formal SLA targets ([/security/incident-response-sla/](/security/incident-response-sla/)) and compliance engine's 857+ automated checks. Platform controls are continuously tested in production through real threat detection. | 3 | ✅ Addressed |

#### RS.AN — Incident Analysis

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| RS.AN-01 | Notifications are received and investigated | All gateway events are logged in hash-chained audit logs. Anomalous events trigger real-time alerts. 153+ detection patterns ensure comprehensive coverage of AI-specific threat vectors. | 3 | ✅ Implemented |
| RS.AN-02 | Incident impact is analyzed | Automated impact analysis: detection severity, affected data classification, scope of exposure. Analysis results are recorded in tamper-evident audit logs. | 3 | ✅ Implemented |
| RS.AN-03 | Incident forensics are performed | Hash-chained audit logs provide forensic-quality evidence with cryptographic integrity verification. Log entries are immutable and chronologically ordered, supporting post-incident reconstruction. | 3 | ✅ Implemented |

#### RS.MI — Incident Mitigation

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| RS.MI-01 | Incidents are contained | Automated containment via enforcement actions: block malicious requests, redact sensitive data in transit, rate-limit abusive clients, and disable compromised tool-use channels via MCP guardrails. | 3 | ✅ Implemented |
| RS.MI-02 | Incidents are mitigated | Real-time mitigation through policy enforcement. Detected threats trigger immediate response: secrets are redacted before exfiltration, prompt injections are blocked before execution, PII/PHI is masked before transmission. | 3 | ✅ Implemented |
| RS.MI-03 | Incidents are resolved | Resolution tracking via audit log chain. Each incident is tracked from detection through containment to resolution. Compliance engine validates that resolved incidents no longer trigger detection patterns. | 3 | ✅ Implemented |

#### RS.CO — Incident Response Communication

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| RS.CO-01 | Incident response information is shared | Audit logs are exportable to SIEM/SOAR platforms. Incident reports are generated from hash-chained logs with cryptographic proof of completeness. | 3 | ✅ Implemented |
| RS.CO-02 | Incident response information is shared with external stakeholders | Published IR policy defines external communication procedures. 24-hour SLA applies to all stakeholder notifications. Customers retain full control over incident data through self-hosted architecture. | 2 | ✅ Implemented |

---

### Function 6: RECOVER (RC)

**Maturity: Tier 2 — Risk-Informed** | Score: 2.7 / 4.0

The RECOVER function addresses recovery planning, execution, and communication. AegisGate's self-hosted architecture inherently supports recovery through stateless design, but recovery execution remains customer-managed.

#### RC.RP — Recovery Planning

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| RC.RP-01 | Recovery plan is established | AG-BUSINESS-CONTINUITY defines the recovery framework. Stateless proxy architecture minimizes recovery scope — no persistent state means recovery requires only configuration restoration. | 3 | ✅ Implemented |
| RC.RP-02 | Recovery plan is tested | Disaster recovery test conducted 2026-07-29 ([/security/dr-test/](/security/dr-test/)) with full platform recovery in 15.5 minutes. All RTO targets met. Audit log chain integrity verified. Next scheduled test: Q4 2026. | 3 | ✅ Addressed |
| RC.RP-03 | Recovery plan is updated | Configuration-as-code enables version-controlled recovery procedures. State updates are delivered as signed container images. | 2 | ✅ Implemented |

#### RC.RE — Recovery Execution

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| RC.RE-01 | Recovery plan is executed | Self-hosted deployment: customers execute recovery on their own infrastructure using standard container orchestration (Docker restart, Kubernetes redeploy). 34.7MB image size enables rapid redeployment. | 2 | ✅ Implemented |
| RC.RE-02 | Recovery is validated | Hash-chained audit logs provide post-recovery integrity verification. Compliance engine re-validates all 857+ control checks after recovery. | 2 | ✅ Implemented |
| RC.RE-03 | Restoration is communicated | Audit logs record recovery events with timestamps and verification results. Stakeholders are notified via configured alerting channels. | 2 | ✅ Implemented |

#### RC.CO — Recovery Communication

| NIST ID | Subcategory | AegisGate Implementation | Tier | Status |
|---|---|---|---|---|
| RC.CO-01 | Recovery status is communicated | Self-hosted architecture: customers control all recovery communications. AegisGate provides published status communication templates and procedures. | 2 | ⚠️ Partial |
| RC.CO-02 | Recovery is coordinated | Customer-managed recovery execution. AegisGate provides recovery documentation, container image integrity verification (ECDSA P-256), and post-recovery validation tools. | 2 | ⚠️ Partial |
| RC.CO-03 | Recovery lessons are incorporated | Incident post-mortems feed into detection pattern updates and compliance engine improvements. Lessons learned are incorporated into subsequent releases. | 2 | ⚠️ Partial |

---

## Platform Control Mapping Summary

The following AegisGate platform controls map directly to NIST CSF 2.0 core functions:

| Platform Control | Control Name | NIST CSF Function | Coverage |
|---|---|---|---|
| AG-RISK-GOVERNANCE | Risk Governance | GOVERN (GV) | Risk management strategy, policy enforcement |
| AG-ASSET-INVENTORY | Asset Inventory | IDENTIFY (ID) | Asset management, visibility, lifecycle |
| AG-AC-ACCESS-ENFORCEMENT | Access Enforcement | PROTECT (PR) | RBAC, MFA, SSO, authorization |
| AG-AU-AUDIT-MONITORING | Audit Monitoring | DETECT (DE) | Continuous monitoring, event analysis |
| AG-IR-INCIDENT-RESPONSE | Incident Response | RESPOND (RS) | IR policy, detection, containment, mitigation |
| AG-BUSINESS-CONTINUITY | Business Continuity | RECOVER (RC) | Recovery planning, execution, validation |

Additional NIST CSF-specific controls in the compliance engine:

| Compliance Control | Description | Function |
|---|---|---|
| NIST-CSF-GOVERN | Governance framework alignment | GV |
| NIST-CSF-IDENTIFY | Asset and risk identification | ID |
| NIST-CSF-PROTECT | Protective control enforcement | PR |
| NIST-CSF-DETECT | Threat detection and monitoring | DE |
| NIST-CSF-RESPOND | Incident response capability | RS |
| NIST-CSF-RECOVER | Recovery planning and execution | RC |

---

## Risk Assessment Summary

### Critical Risk Areas

| Risk Area | Severity | Mitigation | Residual Risk |
|---|---|---|---|
| Customer infrastructure misconfiguration | Medium | Deployment documentation, compliance engine checks, hardening guides | Low — customer controls infrastructure |
| Supply chain dependency (Docker base image) | Low | Minimal 34.7MB image, no shell, ECDSA P-256 signed | Low — minimal surface |
| Insider threat (customer-side) | Medium | RBAC with MFA, audit logging, SSO enforcement | Low — customer-managed access |
| Advanced persistent threats | Medium | 153+ detection patterns, hash-chained audit logs | Medium — evolving threat landscape |
| Recovery execution dependency | Low | Stateless architecture, containerized deployment, configuration-as-code | Low — customer-managed recovery |

### Risk Acceptance

The following risk items are accepted at their current residual level:

1. **Physical security**: Customer-managed infrastructure; AegisGate has no physical asset control (N/A).
2. **Personnel security**: Customer-managed teams; AegisGate secures the platform, not the personnel.
3. **Organizational governance**: Tier 2 accepted for product-centric controls; Tier 4 maturity requires enterprise-scale governance structures beyond product scope.

---

## Continuous Improvement Roadmap

### Current Quarter (Q3 2026)

| Initiative | Function | Target Tier | Status |
|---|---|---|---|
| Expand detection pattern library to 175+ | DE | 3 → 4 | In Progress |
| Formalize supply chain risk assessment | GV | 2 → 3 | Planned |
| Implement automated IR plan testing | RS | 2 → 3 | Planned |

### Next Quarter (Q4 2026)

| Initiative | Function | Target Tier | Status |
|---|---|---|---|
| Add NIST CSF 2.0 subcategory-level CheckFuncs | GV/ID | 2 → 3 | Planned |
| Enhance recovery plan testing automation | RC | 2 → 3 | Planned |
| Implement continuous compliance scoring | ID | 3 → 4 | Planned |

### Future (2027)

| Initiative | Function | Target Tier | Status |
|---|---|---|---|
| Adaptive risk management (Tier 4) | GV | 3 → 4 | Roadmap |
| Predictive threat modeling | DE | 3 → 4 | Roadmap |
| Automated recovery orchestration | RC | 2 → 3 | Roadmap |

---

## Attestation

This self-assessment has been reviewed and attested to by the undersigned. The assessment accurately represents AegisGate's cybersecurity posture as measured against the NIST Cybersecurity Framework 2.0.

**Assessed by:**

Compliance & Risk Engineering Team
AegisGate Security Platform
Date: 2026-07-29

**Approved by:**

VP, Security Engineering
AegisGate
Date: 2026-07-29

**Review and re-attestation:**

This assessment shall be reviewed and re-attested annually, or upon material change to the platform architecture, threat landscape, or regulatory requirements. Next scheduled review: 2027-07-29.

---

*This document is confidential and intended for internal use and authorized stakeholders. Distribution is restricted per the AegisGate information classification policy.*