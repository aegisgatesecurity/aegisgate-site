---
title: "Incident Response SLA"
description: "AegisGate Security, LLC incident response service level agreements. Severity-based response targets and escalation procedures."
type: "security"
date: 2026-07-29
layout: single
---

# Incident Response Service Level Agreement

| Field | Value |
|-------|-------|
| **Document Version** | 1.0 |
| **Owner** | Security Operations, AegisGate Security, LLC |
| **Review Cycle** | Quarterly |
| **Last Reviewed** | July 29, 2026 |
| **Next Review** | October 29, 2026 |
| **Classification** | Internal & Customer-Facing |

---

## 1. Purpose

This document defines the formal service level agreements (SLAs) governing AegisGate Security, LLC's incident response operations. It establishes severity-based response targets, escalation procedures, and accountability standards to ensure timely, consistent, and transparent handling of security incidents across all AegisGate products and services.

This policy is a companion to the [Breach Notification Policy](/security/breach-notification/) and should be read in conjunction with that document.

## 2. Scope

This SLA applies to all security incidents affecting AegisGate systems, data, customers, and operations, including but not limited to:

- Unauthorized access or attempted access to systems or data
- Malware infections, ransomware, or other malicious code execution
- Denial-of-service attacks
- Data leakage or exposure
- Vulnerability exploitation
- Configuration errors with security implications
- Third-party vendor incidents impacting AegisGate services

## 3. Severity Classification

All security incidents are classified according to the following severity levels based on their scope, impact, and urgency.

| Severity | Classification | Definition |
|----------|---------------|------------|
| **Critical** | Sev-1 | Active exploitation, data breach confirmed, complete service outage, or imminent threat to customer data integrity. Requires immediate, all-hands response. |
| **High** | Sev-2 | Confirmed vulnerability under active exploit, partial service degradation, limited data exposure, or significant risk of escalation without intervention. |
| **Medium** | Sev-3 | Confirmed security event with moderate impact, such as a successfully phishing attempt with contained scope, policy violation with data implications, or vulnerability with known exploit but no active exploitation. |
| **Low** | Sev-4 | Suspicious activity requiring investigation, non-critical policy violations, informational security events, or vulnerabilities with no known exploit. Minimal immediate risk to data or operations. |

## 4. SLA Targets

The following table defines the response and resolution targets for each severity level. All times are measured from the moment an incident is formally triaged and assigned a severity level.

| Severity | Initial Response | Status Update | Resolution Target | Escalation |
|----------|----------------|---------------|-------------------|------------|
| **Critical** | 1 hour | Every 2 hours | 4 hours | VP Engineering + CISO within 30 min |
| **High** | 4 hours | Every 8 hours | 24 hours | Engineering Lead within 2 hours |
| **Medium** | 24 hours | Every 24 hours | 72 hours | Engineering Lead within 8 hours |
| **Low** | 72 hours | Weekly | 30 days | Standard queue |

**Definitions:**

- **Initial Response**: Time from triage to first actionable response by the incident response team, including acknowledgment, initial assessment, and containment measures.
- **Status Update**: Maximum interval between proactive updates to affected stakeholders, including internal leadership and impacted customers.
- **Resolution Target**: Target time to achieve full resolution, defined as containment, remediation, and restoration of normal operations. Extended investigations may exceed this target with CISO approval.
- **Escalation**: Time within which the designated escalation contacts must be notified.

## 5. Communication Channels

### 5.1 Incident Reporting

All security incidents, vulnerabilities, or suspicious activity should be reported immediately through the following channels:

- **Email**: [security@aegisgatesecurity.io](mailto:security@aegisgatesecurity.io)
- **PGP Key**: Available at `/security/pgp-key/` — All sensitive reports should be encrypted using our published PGP key
- **Bug Bounty Program**: For responsible disclosure of vulnerabilities, see our security disclosure policy

### 5.2 Internal Communications

During an active incident, the Security Operations team will use the following channels, selected based on severity:

| Severity | Primary Channel | Secondary Channel |
|----------|----------------|-------------------|
| Critical | Dedicated incident war room (voice + chat) | Phone tree to VP Engineering / CISO |
| High | Dedicated incident chat channel | Email with escalation recipients |
| Medium | Incident tracking system | Email to relevant stakeholders |
| Low | Incident tracking system | Weekly security review meeting |

### 5.3 Customer Communications

Customer-facing communications during incidents will follow the protocols established in the [Breach Notification Policy](/security/breach-notification/), including the 72-hour regulatory notification requirement where applicable.

## 6. Escalation Procedures

### 6.1 Automatic Escalation

Incidents are automatically escalated under the following conditions:

- **SLA breach**: Any SLA target missed by more than 25% triggers automatic escalation to the next severity level's contacts
- **Scope expansion**: An incident whose impact widens significantly (e.g., Sev-3 expands to affect multiple customers) is immediately re-triaged at a higher severity
- **Customer-reported incidents**: Any incident reported by a customer is escalated one severity level from its initial classification for the first 4 hours, ensuring heightened visibility

### 6.2 Escalation Chain

```
Sev-4 (Low)        → Engineering on-call → Engineering Lead
Sev-3 (Medium)     → Security Operations → Engineering Lead (within 8 hours)
Sev-2 (High)       → Security Operations → Engineering Lead (within 2 hours) → VP Engineering
Sev-1 (Critical)   → Security Operations → CISO + VP Engineering (within 30 min) → CEO (if SLA breached)
```

### 6.3 External Escalation

When external support is required, the following escalation paths are available:

- **Legal counsel**: Engaged for any Sev-1 or Sev-2 incident with potential regulatory implications
- **Law enforcement**: Coordinated through legal counsel for criminal activity
- **Third-party incident response**: Pre-approved forensic firms available on retainer for Sev-1 incidents
- **Regulatory bodies**: Notification per the [Breach Notification Policy](/security/breach-notification/) and applicable regulations (GDPR Article 33, CCPA, etc.)

## 7. Post-Incident Review

### 7.1 Mandatory Reviews

Post-incident reviews are mandatory for all incidents classified as Critical or High severity. Reviews must be completed within **5 business days** of incident resolution.

### 7.2 Review Requirements

Each post-incident review must include:

- **Incident timeline**: Detailed chronological record from detection to resolution
- **Root cause analysis**: Identification of the underlying cause and contributing factors
- **Impact assessment**: Scope of data, systems, and customers affected
- **Response evaluation**: Assessment of SLA compliance and response effectiveness
- **Remediation actions**: Specific, assigned, and tracked corrective actions with deadlines
- **Process improvements**: Recommendations for preventing recurrence or improving response

### 7.3 Optional Reviews

Medium and Low severity incidents may receive a post-incident review at the discretion of the Security Operations team or Engineering Lead. Reviews are recommended for any incident that:

- Involved novel attack vectors
- Revealed gaps in detection or response capabilities
- Required escalation beyond the initial severity level

## 8. Metrics and Reporting

### 8.1 Key Performance Indicators

AegisGate tracks the following incident response metrics on a continuous basis:

| Metric | Abbreviation | Definition |
|--------|-------------|------------|
| Mean Time to Detect | MTTD | Average time from incident occurrence to initial detection |
| Mean Time to Respond | MTTR | Average time from detection to initial response action |
| Mean Time to Resolve | MTTR | Average time from detection to full resolution |
| SLA Compliance Rate | — | Percentage of incidents meeting all SLA targets for their severity |
| Incident Count by Severity | — | Number of incidents categorized by severity per quarter |

### 8.2 Reporting Cadence

| Report | Audience | Frequency |
|--------|----------|-----------|
| Incident Summary | CISO, VP Engineering | Weekly |
| SLA Compliance Dashboard | CISO, Executive Team | Monthly |
| Incident Trend Analysis | Board of Directors | Quarterly |
| Annual Security Review | Board, Customers (upon request) | Annually |

### 8.3 Targets

| Metric | Target |
|--------|--------|
| SLA Compliance Rate | ≥ 95% across all severities |
| MTTD | < 24 hours (target); < 1 hour (aspiration) |
| Critical SLA Compliance | 100% |
| Post-Incident Review Completion | 100% for Sev-1/Sev-2 within 5 business days |

## 9. Relationship to Breach Notification Policy

This Incident Response SLA operates in parallel with the [Breach Notification Policy](/security/breach-notification/). Key intersections include:

- **72-Hour Regulatory Notification**: Where an incident constitutes a reportable breach under applicable law (GDPR Article 33, CCPA, etc.), the Breach Notification Policy's 72-hour notification requirement applies regardless of the incident's resolution target under this SLA.
- **Severity Alignment**: A Critical (Sev-1) incident involving confirmed data exfiltration or unauthorized access to personal data will trigger the Breach Notification Policy's notification workflow in parallel with this SLA's response procedures.
- **Communication Overlap**: Customer notifications issued under the Breach Notification Policy satisfy the status update requirements of this SLA for the corresponding time period.

## 10. Policy Review

This SLA is subject to quarterly review by the Security Operations team and CISO. Reviews will assess:

- SLA compliance trends and target adjustments
- Severity classification criteria adequacy
- Escalation procedure effectiveness
- Emerging threat landscape considerations

Any material changes to this SLA will be communicated to affected customers within 30 days.

---

*This document is maintained by AegisGate Security, LLC. For questions, contact [security@aegisgatesecurity.io](mailto:security@aegisgatesecurity.io).*