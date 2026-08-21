---
title: "Internal Audit Program"
description: "AegisGate Security, LLC ISMS internal audit program. Annual audit methodology, schedule, and reporting for continuous improvement."
type: "compliance"
date: 2026-07-29
layout: single
---

<div class="compliance-header">

# Internal Audit Program

**AegisGate Security, LLC**

| Field | Value |
|---|---|
| **Document ID** | AG-IAUD-2026-001 |
| **Version** | 1.0 |
| **Classification** | Confidential — Internal Use |
| **Owner** | Compliance & Security Engineering |
| **Approver** | Chief Executive Officer |
| **Review Cycle** | Annual |
| **Effective Date** | July 29, 2026 |
| **Next Review** | July 29, 2027 |

</div>

---

## 1. Purpose

This document establishes the Internal Audit Program for the AegisGate Information Security Management System (ISMS) in accordance with ISO/IEC 27001:2022 Clause 9.2. The program ensures that internal audits are conducted at planned intervals to determine whether the ISMS conforms to ISO 27001 requirements, is effectively implemented and maintained, and achieves its intended outcomes.

Internal audits are the primary mechanism for independent assurance that information security controls are operating as designed and that the ISMS continues to improve.

---

## 2. Scope

The Internal Audit Program covers:

- All ISMS processes, policies, and procedures
- All 93 ISO 27001:2022 Annex A controls documented in the Statement of Applicability (AG-ISO27001-SoA-2026-001)
- All information security objectives defined in the ISMS Policy (AG-ISMSPOL-2026-001)
- All risk treatment plans and their implementation
- All supporting infrastructure, platforms, and tools within the ISMS scope
- All personnel and organizational units within AegisGate Security, LLC

**Out of scope:** Customer-managed infrastructure, customer data processing environments, and third-party systems not acting as a subprocessor to AegisGate.

---

## 3. Audit Methodology

### 3.1 Approach

AegisGate employs a **risk-based audit methodology** that prioritizes areas of highest risk and greatest impact. The audit approach combines:

- **Document review:** Examination of policies, procedures, risk assessments, and evidence records.
- **Technical verification:** Automated compliance checks via the AegisGate compliance engine (1,457 automated controls across 31 frameworks) supplemented by manual technical testing.
- **Interview-based assessment:** Structured interviews with control owners, process operators, and management.
- **Observation:** Direct observation of control operation, configuration, and process execution.

### 3.2 Audit Types

| Type | Frequency | Scope | Trigger |
|---|---|---|---|
| **Comprehensive audit** | Annual | Full ISMS scope | Planned schedule |
| **Focused audit** | Quarterly | Specific control domains or high-risk areas | Risk assessment results, incident findings, or management review direction |
| **Follow-up audit** | As needed | Previously audited areas with open findings | Corrective action deadlines |
| **Extraordinary audit** | As triggered | Targeted scope | Significant incident, scope change, or regulatory requirement |

### 3.3 Audit Phases

| Phase | Activities | Duration |
|---|---|---|
| **Planning** | Define audit scope, objectives, criteria; identify audit team; prepare audit plan; notify auditees | 2 weeks |
| **Execution** | Conduct document review, technical verification, interviews, and observations; document findings | 1–2 weeks |
| **Reporting** | Compile findings, classify severity, draft audit report, present findings to management | 1 week |
| **Follow-up** | Track corrective actions, verify implementation, close findings | 30–90 days per finding severity |

---

## 4. Audit Schedule

### 4.1 Annual Audit Cycle

The annual audit cycle covers the full ISMS scope across four quarters, with each quarter focusing on specific control domains:

| Quarter | Focus Area | Controls Covered | Start Date | Target Completion |
|---|---|---|---|---|
| **Q1** | Organizational controls (Clause 5) | A.5.1–A.5.38 (37 controls) | January | February |
| **Q2** | People and Physical controls (Clauses 6–7) | A.6.1–A.7.14 (22 controls) | April | May |
| **Q3** | Technological controls (Clause 8, A.8.1–A.8.18) | A.8.1–A.8.18 (18 controls) | July | August |
| **Q4** | Technological controls (Clause 8, A.8.19–A.8.37) + ISMS management processes | A.8.19–A.8.37 (16 controls) + Clauses 4–10 | October | November |

### 4.2 Quarterly Focused Audits

| Quarter | Focus Topic | Rationale |
|---|---|---|
| Q1 | Access control and authentication | RBAC, MFA, SSO controls are critical attack surface |
| Q2 | Incident response and business continuity | Validates operational readiness |
| Q3 | Secure development and change management | Addresses highest-risk portion of the SDLC |
| Q4 | Compliance monitoring and reporting | Validates end-of-year compliance posture |

### 4.3 Schedule Adjustments

The audit schedule is adjusted when:

- A significant incident reveals control deficiencies in an area not yet audited
- A major change to the ISMS scope occurs
- Management review identifies a priority audit area
- Regulatory changes require immediate audit attention

Schedule adjustments require approval from Compliance & Security Engineering and notification to the Chief Executive Officer.

---

## 5. Audit Criteria

Audits are conducted against the following criteria:

| Criteria | Standard | Applicability |
|---|---|---|
| **ISO/IEC 27001:2022** | Primary | Full ISMS scope — all clauses and applicable Annex A controls |
| **SOC 2 Trust Services Criteria** | Secondary | Security, Availability, Confidentiality, Processing Integrity |
| **HIPAA Security Rule** | Contextual | Applicable to customer-facing compliance features |
| **NIST Cybersecurity Framework** | Contextual | Identify, Protect, Detect, Respond, Recover functions |
| **AegisGate ISMS Policy** | Internal | All ISMS requirements per AG-ISMSPOL-2026-001 |
| **AegisGate Risk Register** | Internal | All risk treatment plans and acceptance decisions |
| **Applicable legal and regulatory requirements** | External | Jurisdiction-specific requirements per legal register |

### 5.1 ISO 27001 Audit Coverage

The annual audit cycle ensures full coverage of all ISO 27001:2022 clauses:

| ISO 27001 Clause | Description | Audit Quarter |
|---|---|---|
| Clause 4 | Context of the organization | Q4 |
| Clause 5 | Leadership | Q4 |
| Clause 6 | Planning (risk assessment, SoA) | Q4 |
| Clause 7 | Support (resources, competence, awareness, communication, documented information) | Q4 |
| Clause 8 | Operation (risk assessment, control implementation) | Q1–Q3 |
| Clause 9 | Performance evaluation (monitoring, internal audit, management review) | Q4 |
| Clause 10 | Improvement (nonconformity, corrective action, continual improvement) | Q4 |
| Annex A | All 93 controls per Statement of Applicability | Q1–Q4 |

---

## 6. Findings Classification

Audit findings are classified by severity based on their impact on the ISMS and information security posture:

| Classification | Definition | Example | Corrective Action Deadline |
|---|---|---|---|
| **Critical** | A finding that indicates a complete failure or significant weakness in a control, creating immediate and serious risk to information security. Failure to meet a mandatory ISO 27001 requirement. | No incident response plan; hash-chained audit logs bypassed; unpatched critical vulnerability in production | 48 hours |
| **Major** | A finding that indicates a significant weakness in a control that could lead to a security breach or ISMS failure. Partial implementation of a control with material gap. | MFA not enforced for privileged accounts; risk assessment not covering critical assets; missing corrective actions from previous audit | 30 days |
| **Minor** | A finding that indicates a minor weakness or deviation that does not immediately threaten information security but could escalate if not addressed. | Incomplete documentation of an otherwise effective control; minor configuration deviation with no security impact; training records not updated | 90 days |
| **Observation** | An opportunity for improvement that does not constitute a nonconformity but could strengthen the ISMS if addressed. | Process could be automated; documentation format could be improved; opportunity to consolidate redundant controls | Next scheduled review |

### 6.1 Finding Escalation

| Severity | Escalation Path | Timeline |
|---|---|---|
| Critical | CEO immediate notification → Extraordinary Management Review | Within 4 hours |
| Major | CEO notification → Next Management Review | Within 24 hours |
| Minor | Compliance & Security Engineering tracking → Next quarterly audit review | Within 5 business days |
| Observation | Documented in audit report → Addressed in continuous improvement cycle | Per improvement roadmap |

---

## 7. Corrective Action Procedures

### 7.1 Corrective Action Process

All audit findings require corrective action per the following process:

1. **Identification:** Finding documented in audit report with classification, evidence, and recommendation.
2. **Root cause analysis:** Finding owner conducts root cause analysis using 5-Why or Ishikawa methodology.
3. **Corrective action plan:** Finding owner proposes corrective action with timeline, resource requirements, and verification method.
4. **Approval:** Compliance & Security Engineering approves corrective action plans for Minor and Observation findings. CEO approves plans for Critical and Major findings.
5. **Implementation:** Finding owner implements corrective action per approved plan and timeline.
6. **Verification:** Internal auditor verifies corrective action effectiveness through evidence review, re-testing, or follow-up audit.
7. **Closure:** Finding closed when corrective action is verified as effective. If not effective, process returns to step 3.

### 7.2 Corrective Action Timeline Enforcement

| Severity | Deadline | Extension Authority |
|---|---|---|
| Critical | 48 hours | CEO only |
| Major | 30 days | Compliance & Security Engineering (up to 15 additional days) |
| Minor | 90 days | Compliance & Security Engineering (up to 30 additional days) |
| Observation | Next scheduled review | Not applicable |

### 7.3 Corrective Action Tracking

All corrective actions are tracked in the audit action item register with:

- Finding ID, severity, and description
- Root cause analysis summary
- Corrective action plan and deadline
- Assigned owner
- Implementation status
- Verification evidence
- Closure date and verifier

---

## 8. Audit Team Independence

### 8.1 Independence Requirements

Internal audits are conducted with objectivity and impartiality. The following independence requirements apply:

- **No self-audit:** Auditors do not audit their own work areas. An auditor responsible for implementing a control is not assigned to audit that control.
- **No conflict of interest:** Auditors disclose any real or perceived conflict of interest before audit assignment. Conflicts result in reassignment.
- **Organizational independence:** The internal audit function reports directly to the CEO, not to the functions being audited.

### 8.2 Audit Team Composition

| Role | Responsibility | Independence Requirement |
|---|---|---|
| **Lead Auditor** | Plans and leads the audit, approves the audit report, presents findings to management | Cannot audit areas where they have operational responsibility |
| **Auditor** | Conducts audit activities per the audit plan, documents findings | Cannot audit areas where they have operational responsibility |
| **Technical Specialist** | Provides subject-matter expertise on specific technical controls | Cannot audit areas where they have operational responsibility |
| **Auditee** | Provides evidence, participates in interviews, implements corrective actions | Not a member of the audit team |

### 8.3 Competence Requirements

Audit team members possess:

- Understanding of ISO 27001:2022 requirements
- Knowledge of AegisGate's ISMS scope, policies, and procedures
- Audit methodology training
- Subject-matter expertise relevant to the audit scope
- Independence from audited areas

---

## 9. Reporting and Escalation

### 9.1 Audit Report

Each audit produces a formal report containing:

| Section | Content |
|---|---|
| Executive summary | High-level overview of audit scope, objectives, and key findings |
| Audit scope and criteria | What was audited, against what standards, and any scope exclusions |
| Findings summary | Table of all findings with classification, control reference, and status |
| Detailed findings | Full description of each finding with evidence, root cause analysis, and recommendation |
| Corrective action summary | All corrective actions with owners, deadlines, and status |
| ISMS effectiveness assessment | Overall assessment of ISMS conformity, effectiveness, and improvement opportunities |
| Audit conclusion | Statement on whether the ISMS conforms to audit criteria |

### 9.2 Reporting Distribution

| Report Section | Recipient | Distribution |
|---|---|---|
| Full audit report | CEO, Compliance & Security Engineering | Within 5 business days of audit completion |
| Executive summary | All ISMS personnel | Within 10 business days of audit completion |
| Finding-specific notifications | Finding owners | Within 2 business days of finding classification |

### 9.3 Management Review Integration

Audit results are a required input to each quarterly Management Review per the Management Review Procedure (AG-MGTREV-2026-001). The Lead Auditor presents:

- Summary of findings by severity and control domain
- Trend analysis across audit cycles
- Corrective action status and effectiveness
- Recommendations for ISMS improvement

---

## 10. Records Retention

### 10.1 Retention Schedule

| Record | Retention Period | Storage | Access Control |
|---|---|---|---|
| Audit plans | 7 years | Hash-chained audit log system | Restricted — ISMS personnel |
| Audit evidence (working papers) | 7 years | Hash-chained audit log system | Restricted — Audit team |
| Audit reports | 7 years | Hash-chained audit log system | Restricted — ISMS personnel |
| Corrective action records | 7 years | Hash-chained audit log system | Restricted — ISMS personnel |
| Finding closure records | 7 years | Hash-chained audit log system | Restricted — ISMS personnel |
| Auditor competence records | 7 years | HR system | Restricted — HR and Compliance |

### 10.2 Evidence Integrity

All audit records are stored in AegisGate's hash-chained audit log system, ensuring:

- **Integrity:** Cryptographic hash chains prevent undetected modification of audit records.
- **Authenticity:** Records are attributable to their authors via authenticated access.
- **Availability:** Records are available for external audit or certification body review.
- **Retention:** Records retained for a minimum of seven years per the ISMS records retention policy.

---

## 11. Audit Program Continuous Improvement

The Internal Audit Program itself is subject to continuous improvement. At each Management Review, the following are evaluated:

- Audit schedule adherence (were audits conducted on time?)
- Finding closure rates (are corrective actions implemented on time?)
- Recurring finding patterns (are the same findings recurring?)
- Audit methodology effectiveness (are audits identifying meaningful issues?)
- Auditor competence and training needs
- Coverage gaps (are any ISMS areas not being audited?)

Improvements to the audit program are documented in Management Review minutes and implemented per the document control requirements in the ISMS Policy.

---

## 12. References

| Document | ID |
|---|---|
| ISMS Policy | AG-ISMSPOL-2026-001 |
| ISO 27001 Statement of Applicability | AG-ISO27001-SoA-2026-001 |
| Management Review Procedure | AG-MGTREV-2026-001 |
| ISO/IEC 27001:2022 | Clause 9.2 — Internal audit |
| ISO 19011:2018 | Guidelines for auditing management systems |

---

*This program is maintained per the ISMS document control requirements. Questions regarding the Internal Audit Program should be directed to Compliance & Security Engineering at compliance@aegisgatesecurity.io.*