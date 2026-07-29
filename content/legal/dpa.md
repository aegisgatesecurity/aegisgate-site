---
title: "Data Processing Agreement"
description: "GDPR Article 28 Data Processing Agreement for AegisGate Security, LLC customers. Effective 2026-06-07. 2.0 DRAFT for v3.5.0."
type: "legal-doc"
---

<div class="alert alert-warning" style="border-left: 4px solid #f0ad4e; padding: 16px; margin-bottom: 24px; background: #fff8e1;">
<strong>📋 DRAFT — Not Legal Advice</strong><br>
This document is self-drafted by AegisGate Security, LLC for the v3.5.0 release. AegisGate Security, LLC is not a law firm, and this document does not constitute legal advice. Production-grade review by qualified legal counsel is deferred to v3.5.0+ when budget is available. Until then, customers and counterparties should rely on this document at their own risk and consult their own legal counsel.
</div>

# Data Processing Agreement

> **First published:** 2026-06-07 (v3.5.0). **Effective:** 2026-06-07.
> **Real legal counsel review is deferred to v3.5.0+** when budget is available.

**Effective Date:** 2026-06-07
**Version:** 2.0 DRAFT (v3.5.0)

---

## Recitals

This Data Processing Agreement ("Agreement") is entered into by and between:

**Data Exporter (Controller):** The entity identified in the applicable Order Form ("Subscriber")

and

**Data Importer (Processor):** AegisGate Security, LLC ("Company")
**Address:** AegisGate Security, LLC, Wisconsin, USA
**Email:** legal@aegisgatesecurity.io

Each a "Party" and together the "Parties."

**WHEREAS:**

- The Subscriber is a data controller of personal data that it processes in the course of its business operations.
- The Subscriber wishes to engage the Company to provide the AegisGate Security Platform Services, which may involve the processing of personal data on behalf of the Subscriber.
- The Parties wish to set out the terms on which the Company will process personal data on behalf of the Subscriber, in compliance with Article 28 of the EU General Data Protection Regulation 2016/679 ("GDPR") and equivalent provisions of other applicable data protection laws.

**NOW, THEREFORE,** the Parties agree as follows.

---

## 1. Definitions

### 1.1 "Applicable Data Protection Law"
Means the EU General Data Protection Regulation 2016/679 ("GDPR"), the UK GDPR, the California Consumer Privacy Act ("CCPA") as amended by the CPRA, the Swiss Federal Act on Data Protection, and any other applicable data protection laws in jurisdictions in which the Subscriber or its data subjects are located.

### 1.2 "Personal Data"
Means any information relating to an identified or identifiable natural person ("Data Subject") as defined under Applicable Data Protection Law.

### 1.3 "Processing"
Means any operation performed on Personal Data, whether or not by automated means, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, alignment, restriction, erasure, or destruction.

### 1.4 "Data Subject"
Means an identified or identifiable natural person to whom Personal Data relates.

### 1.5 "Security Incident"
Means a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to Personal Data transmitted, stored, or otherwise processed.

### 1.6 "Standard Contractual Clauses" or "SCCs"
Means the Standard Contractual Clauses approved by the European Commission Decision 2021/914 of 4 June 2021 (Module 2: Controller-to-Processor), as may be updated or replaced from time to time.

---

## 2. Roles and Scope

### 2.1 Roles
The Subscriber is the **Data Controller** of Personal Data processed under this Agreement. The Company is the **Data Processor** that processes Personal Data on behalf of the Subscriber.

### 2.2 Subject Matter and Duration
The subject matter of the processing is the provision of the AegisGate Security Platform Services to the Subscriber. The duration of processing corresponds to the term of the Subscriber's subscription plus any post-termination data return / deletion period specified in Section 7.

### 2.3 Nature and Purpose of Processing
The Company will process Personal Data only for the purpose of providing the AegisGate Security Platform Services, which include:
- Inspecting HTTP, MCP, and A2A traffic for security threats
- Detecting and redacting PII and secrets in AI model responses
- Generating compliance reports against the frameworks enabled in the Subscriber's license
- Logging security events and audit data
- Storing data in accordance with Subscriber's retention preferences

### 2.4 Categories of Data Subjects and Personal Data
Categories of Data Subjects may include the Subscriber's end users, employees, contractors, and any natural persons whose personal data is contained in traffic flowing through the Subscriber's AegisGate deployment.

Categories of Personal Data may include: identifiers (name, email, IP address), authentication credentials (license keys, API tokens), content of HTTP/MCP/A2A requests and responses (which may incidentally contain personal data of end users), and audit log entries.

### 2.5 Sensitive Data
The Parties do not anticipate the processing of special categories of personal data (as defined in GDPR Article 9) or data subject to specific sectoral regulations beyond the compliance frameworks enabled in the Subscriber's license. Where such data is processed, the Subscriber shall notify the Company in writing, and the Parties shall agree on additional safeguards before processing commences.

---

## 3. Processor Obligations

The Company shall:

### 3.1 Documented Instructions
Process Personal Data only on documented instructions from the Subscriber, including with regard to transfers of Personal Data to a third country or international organization, unless required to do so by applicable law. In such a case, the Company shall inform the Subscriber of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest.

### 3.2 Confidentiality
Ensure that persons authorized to process Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.

### 3.3 Security Measures
Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including as appropriate:
- Encryption of Personal Data in transit (TLS 1.2+) and at rest (AES-256)
- Ongoing confidentiality, integrity, availability, and resilience of processing systems
- Regular testing and evaluation of the effectiveness of security measures
- Pseudonymization and minimization of Personal Data where feasible

### 3.4 Subprocessors
Not engage another processor without prior specific or general written authorization of the Subscriber. In the case of general written authorization, the Company shall inform the Subscriber of any intended changes concerning the addition or replacement of other processors, giving the Subscriber the opportunity to object. The Company's current subprocessors are listed in the [Subprocessor List](/legal/subprocessors/).

### 3.5 Assistance
Taking into account the nature of the processing, assist the Subscriber by appropriate technical and organizational measures, insofar as this is possible, for the fulfillment of the Subscriber's obligation to respond to requests for exercising the Data Subject's rights (access, rectification, erasure, restriction, portability, objection).

### 3.6 Breach Notification
Notify the Subscriber without undue delay (and in any event within 72 hours) after becoming aware of a Security Incident. The notification shall describe the nature of the Security Incident, the categories and approximate number of Data Subjects and Personal Data records concerned, the likely consequences, and the measures taken or proposed to address the Security Incident.

### 3.7 Data Return / Deletion
At the choice of the Subscriber, delete or return all Personal Data to the Subscriber after the end of the provision of services relating to processing, and delete existing copies, unless applicable law requires storage of the Personal Data.

### 3.8 Information and Audit Rights
Make available to the Subscriber all information necessary to demonstrate compliance with the obligations laid down in Article 28 of GDPR, and allow for and contribute to audits, including inspections, conducted by the Subscriber or another auditor mandated by the Subscriber.

---

## 4. Audit Rights (revised per the 17-clause framework, revision O3)

### 4.1 Audit Frequency
The Subscriber may conduct an audit of the Company's compliance with this Agreement **no more than once per calendar year**, except in the case of a Security Incident or other substantiated cause, in which case the Subscriber may conduct an additional audit.

### 4.2 Notice
The Subscriber shall provide the Company with at least **30 calendar days' written notice** of its intent to conduct an audit. Notice shall include the proposed scope, duration, and auditor identity.

### 4.3 Scope and Conduct
The audit shall be conducted during regular business hours, at the Subscriber's expense, in a manner that does not unreasonably interfere with the Company's operations. The Subscriber (or its auditor) shall be bound by reasonable confidentiality undertakings.

### 4.4 Alternative Evidence
The Company may satisfy its audit obligations by providing the Subscriber with (a) a current SOC 2 Type 1 report (or equivalent self-assessment against the Trust Services Criteria), (b) a current ISO 27001 certification (or equivalent), or (c) a self-attested security posture document, in each case covering the period in question. The provision of such evidence reduces the need for on-site audits and may, at the Company's discretion, satisfy the Subscriber's audit rights for the relevant period.

### 4.5 Security
The auditor and the Subscriber shall comply with the Company's reasonable security and confidentiality requirements when conducting an audit.

---

## 5. Obligations of Subscriber

The Subscriber shall:

### 5.1 Lawful Basis
Have and maintain a lawful basis under Applicable Data Protection Law for processing Personal Data and for instructing the Company to process Personal Data on its behalf.

### 5.2 Data Subject Rights
Respond to requests from Data Subjects exercising their rights under Applicable Data Protection Law. The Company shall provide reasonable assistance as set out in Section 3.5.

### 5.3 Sensitive Data
Not provide the Company with special categories of personal data (as defined in GDPR Article 9) without prior written notice and agreement on additional safeguards.

### 5.4 Compliance
Comply with all applicable laws in connection with its use of the AegisGate Security Platform Services.

---

## 6. International Data Transfers

### 6.1 Transfer Mechanisms
Where the Company processes Personal Data in a country outside the European Economic Area, the United Kingdom, or Switzerland (as applicable), the Parties shall rely on the Standard Contractual Clauses (SCCs) or other valid transfer mechanisms under Applicable Data Protection Law, including the EU-U.S. Data Privacy Framework (where applicable).

### 6.2 SCCs Incorporated by Reference
The SCCs are incorporated into this Agreement by reference and shall apply to any transfer of Personal Data from the Subscriber (as Data Exporter) to the Company (as Data Importer) that would otherwise be restricted by Applicable Data Protection Law. Module 2 (Controller-to-Processor) of the SCCs shall apply.

### 6.3 Supplementary Measures
The Parties shall implement any supplementary measures required by applicable data protection authorities to ensure an essentially equivalent level of protection in the destination country.

---

## 7. Data Return and Deletion at Termination

### 7.1 Return or Deletion
Upon termination of the subscription, the Subscriber may elect to receive a copy of all Personal Data processed under this Agreement in a commonly used, machine-readable format. The Company shall provide the export within 30 days of the Subscriber's written request, after which the Company shall delete all Personal Data within 30 days, except where applicable law requires continued storage.

### 7.2 Audit Logs
Audit logs shall be retained for the period specified in the Subscriber's subscription tier (Community 7 days, Developer 30 daysoper 30 days, Professional 90 days, Enterprise as agreed), after which they shall be deleted automatically.

### 7.3 Backup Retention
Personal Data may remain in encrypted backups for up to 90 days after deletion from primary storage, after which such backups shall be overwritten in the normal course of business.

---

## 8. General Provisions

### 8.1 Liability
The Parties' liability under this Agreement shall be subject to the limitations and exclusions set forth in the Subscriber's [Terms of Service](/legal/terms/) (Sections 10 and 11).

### 8.2 Order of Precedence
In the event of any conflict between this Agreement and the SCCs, the SCCs shall prevail. In the event of any conflict between this Agreement and the Subscriber's Terms of Service, this Agreement shall prevail with respect to the subject matter of personal data processing.

### 8.3 Amendment
This Agreement may be amended by mutual written agreement of the Parties. Material amendments will be communicated to the Subscriber at least 30 days before taking effect.

### 8.4 Severability
If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

### 8.5 Governing Law
This Agreement shall be governed by the laws of the State of Wisconsin, USA, without regard to its conflict of laws provisions. The Parties submit to the exclusive jurisdiction of the state and federal courts located in Wisconsin for any disputes arising out of or relating to this Agreement (subject to the arbitration provisions in the Subscriber's Terms of Service).

---

## 9. Contact

For questions about this Data Processing Agreement, contact:

**AegisGate Security, LLC**
**Email:** legal@aegisgatesecurity.io
**Address:** AegisGate Security, LLC, Wisconsin, USA

---

*— Counsel Sign-Off Required —*

*This document is a 2.0 DRAFT for the v3.5.0 release. The full 17-clause vendor-favorability framework applied to this DPA is documented in the internal legal review framework (a confidential document not published on this site; revision O3, audit-rights cap, applied). When budget is available, AegisGate Security, LLC will engage qualified counsel to review this DPA and convert it from a self-drafted DRAFT to a production-grade legal document. Until then, customers and counterparties should rely on this document at their own risk and consult their own legal counsel.*

*Audit log retention periods referenced in §7.2 reflect the platform's documented behavior as of v3.3.0 (2026-06-07). Consult the most recent version of this DPA for current retention periods.*
