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

## Appendix A: EU Standard Contractual Clauses (Module 2: Controller → Processor)

*As required by Commission Implementing Decision (EU) 2021/914 of 4 June 2021, Standard Contractual Clauses for the transfer of personal data to third countries pursuant to Regulation (EU) 2016/679 of the European Parliament and of the Council (Module 2: Controller to Processor). These Clauses are incorporated into and form an integral part of this Data Processing Agreement.*

### Clause 1 — Purpose and Scope

1. These Standard Contractual Clauses ("Clauses") set out appropriate safeguards, including enforceable data subject rights and effective legal remedies, pursuant to Regulation (EU) 2016/679 ("GDPR") for the transfer of personal data to a third country.
2. The Parties agree that these Clauses are attached to and form an integral part of the Data Processing Agreement ("DPA") between the Data Exporter and the Data Importer.
3. These Clauses apply to the transfer of personal data as specified in Annex I (List of Parties) and Annex II (Technical and Organizational Measures).
4. These Clauses shall not apply where the processing of personal data by the Data Importer is subject to the GDPR because it is carried out by a controller or processor established in the Union, or is subject to the GDPR pursuant to Article 3(2) of the GDPR.

### Clause 2 — Duration

1. These Clauses shall apply for the duration of the DPA, as specified in Section 2.2 of the DPA, unless terminated earlier in accordance with Clause 15.
2. In the event of any conflict between these Clauses and the DPA, these Clauses shall prevail to the extent of the conflict.

### Clause 3 — Controller Obligations

The Data Exporter (Controller) warrants that it has used reasonable efforts to determine that the Data Importer is able to satisfy its legal obligations under these Clauses and shall:

(a) determine the purposes and means of processing personal data, and issue written instructions to the Data Importer in accordance with Clause 4;
(b) ensure that the processing of personal data by the Data Importer is carried out in compliance with the GDPR and applicable data protection laws;
(c) not issue instructions that would cause the Data Importer to act in breach of the GDPR or other applicable data protection laws;
(d) inform the Data Importer of any change in applicable laws or regulations that affects the processing of personal data;
(e) ensure that any data subject rights requests are handled in accordance with Clause 5.

### Clause 4 — Processor Obligations

The Data Importer (Processor) warrants that it has no reason to believe that the legislation applicable to it prevents it from fulfilling the instructions received from the Data Exporter and its obligations under these Clauses, and shall:

(a) **Documented Instructions:** Process personal data only on documented instructions from the Data Exporter, including with regard to transfers of personal data to a third country or international organization, unless required to do so by applicable Union or Member State law. In such a case, the Data Importer shall inform the Data Exporter of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest.

(b) **Confidentiality:** Ensure that all persons authorized to process personal data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.

(c) **Security Measures:** Implement all appropriate technical and organizational security measures as specified in Annex II, including but not limited to: encryption of personal data in transit (TLS 1.3) and at rest (AES-256), role-based access controls (RBAC), single sign-on (SSO) authentication, audit logging, regular vulnerability assessments, and pseudonymization where feasible.

(d) **Sub-processing:** Not engage another processor (sub-processor) without prior specific or general written authorization of the Data Exporter. In the case of general written authorization, the Data Importer shall inform the Data Exporter of any intended addition or replacement of sub-processors, thereby giving the Data Exporter the opportunity to object to such changes, in accordance with Clause 7.

(e) **Assistance:** Assist the Data Exporter in ensuring compliance with the obligations of the Data Exporter pursuant to Articles 32 to 36 of the GDPR, taking into account the nature of the processing and the information available to the Data Importer.

(f) **Data Subject Rights:** Assist the Data Exporter in responding to data subject requests for the exercise of their rights, in accordance with Clause 5.

(g) **Notification:** Notify the Data Exporter without undue delay after becoming aware of a personal data breach, in accordance with Clause 16.

(h) **Records:** Make available to the Data Exporter all information necessary to demonstrate compliance with these Clauses and allow for and contribute to audits and inspections conducted by the Data Exporter or a mandated auditor, in accordance with Clause 6.

### Clause 5 — Data Subject Rights

1. The Data Importer shall, to the extent legally permitted, promptly notify the Data Exporter of any request received from a data subject to exercise their rights under applicable data protection law.
2. The Data Importer shall not respond to such requests itself unless authorized to do so by the Data Exporter.
3. The Data Exporter shall ensure that data subjects are provided with transparency information regarding the processing of their personal data, including: (a) the identity and contact details of the controller; (b) the purposes of processing; (c) the categories of personal data concerned; (d) the recipients or categories of recipients; (e) transfers to third countries and the safeguards applied; (f) the right to access, rectify, erase, restrict, port, and object to the processing of personal data; and (g) the right to lodge a complaint with a supervisory authority.
4. The Data Importer shall assist the Data Exporter in fulfilling the Data Exporter's obligations to respond to data subject requests for access, rectification, erasure, restriction, data portability, and objection.

### Clause 6 — Audit Rights

1. The Data Exporter shall have the right to audit the Data Importer's compliance with these Clauses, subject to the audit provisions set out in Section 4 of the DPA.
2. The Data Importer shall make available to the Data Exporter all information necessary to demonstrate compliance with these Clauses.
3. Audits, including inspections, shall be conducted by the Data Exporter or a mandated auditor, subject to: (a) at least 30 calendar days' written notice; (b) conduct during regular business hours; (c) compliance with the Data Importer's reasonable security and confidentiality requirements; and (d) no more than once per calendar year, unless triggered by a Security Incident or other substantiated cause.
4. The Data Importer may satisfy its audit obligations by providing the Data Exporter with a current SOC 2 Type 1 report, ISO 27001 certification, or equivalent attestation, as set out in Section 4.4 of the DPA.

### Clause 7 — Sub-processing

1. The Data Importer shall not engage another processor (sub-processor) for the processing of personal data without prior specific or general written authorization of the Data Exporter.
2. Where the Data Importer engages a sub-processor for carrying out specific processing activities on behalf of the Data Exporter, the same data protection obligations as set out in these Clauses shall be imposed on the sub-processor by way of a contract, in particular providing sufficient guarantees to implement appropriate technical and organizational measures so that the processing meets the requirements of the GDPR.
3. The Data Importer shall remain fully liable to the Data Exporter for the performance of the sub-processor's obligations.
4. In the case of general written authorization, the Data Importer shall inform the Data Exporter of any intended addition or replacement of sub-processors, giving the Data Exporter the opportunity to object to such changes. The Data Importer shall provide the Data Exporter with at least 30 days' notice of any such change. If the Data Exporter objects to the appointment of a sub-processor, the Data Exporter may terminate the DPA in accordance with Clause 15.

### Clause 8 — Liability

1. Each Party shall be liable to the other Party for any damages it causes the other Party by any breach of these Clauses.
2. The Data Importer shall be liable to the Data Exporter for any damages caused by any sub-processor's breach of the obligations imposed on it under the sub-processing agreement.
3. Where more than one Party is responsible for any damages caused to a data subject, all responsible Parties shall be jointly and severally liable, and the data subject is entitled to obtain full compensation for damages from any of the responsible Parties.
4. The Data Importer shall indemnify the Data Exporter against any claims, actions, or demands arising from the Data Importer's breach of these Clauses, subject to the liability limitations set forth in the Terms of Service.

### Clause 9 — Duration and Termination

1. These Clauses shall apply for the duration of the DPA, unless terminated earlier in accordance with Clause 15.
2. Upon termination of these Clauses, the Data Importer shall, at the choice of the Data Exporter, return all personal data to the Data Exporter or delete all personal data, and certify the deletion, unless applicable law requires storage of the personal data.
3. The obligations of the Parties under these Clauses that by their nature continue after termination, including Clauses 4(b) (confidentiality), 5, 6, 8, 9, and 16, shall survive termination.

### Clause 10 — General Provisions

1. **Governing Law:** These Clauses shall be governed by the laws of Ireland, unless the Data Exporter is established in another EU Member State, in which case the laws of that Member State shall apply.
2. **Competent Courts:** Any disputes arising out of these Clauses shall be resolved by the courts of Ireland, unless the Data Exporter is established in another EU Member State, in which case the courts of that Member State shall have jurisdiction.
3. **Amendment:** These Clauses may be amended only by mutual written agreement of the Parties, provided that any such amendment does not diminish the data subject rights under these Clauses.
4. **Entire Agreement:** These Clauses, together with the DPA and Annexes I and II, constitute the entire agreement between the Parties with respect to the transfer of personal data and supersede any prior agreements or understandings relating to such transfer.

### Clause 11 — Local Law Compliance

1. The Data Importer warrants that, to the best of its knowledge, there is no local law or practice in the destination country (the United States) that prevents the Data Importer from fulfilling its obligations under these Clauses.
2. The Data Importer agrees to inform the Data Exporter (including through the publication of information on its website) of any local law or practice that comes to its knowledge that may substantially affect its ability to comply with these Clauses.
3. The Data Importer warrants that it has no reason to believe that the legislation applicable in the destination country prevents it from fulfilling the instructions received from the Data Exporter and its obligations under these Clauses.

### Clause 12 — Third-Party Beneficiaries

1. Data subjects shall be deemed third-party beneficiaries of these Clauses and may directly enforce, against the Data Exporter and/or the Data Importer, the following provisions: Clause 4 (Processor Obligations), Clause 5 (Data Subject Rights), Clause 6 (Audit Rights), Clause 7 (Sub-processing), Clause 8 (Liability), Clause 9 (Duration and Termination), Clause 11 (Local Law Compliance), Clause 14 (Local Law and Obligations), and Clause 16 (Data Importer Obligations).
2. Where a data subject invokes third-party beneficiary rights under these Clauses, the Data Importer shall accept the data subject's right to lodge a complaint with the competent supervisory authority.

### Clause 13 — Supervision

1. The supervisory authority responsible for ensuring compliance with the GDPR by the Data Exporter, as identified in Annex I, shall have jurisdiction over these Clauses.
2. In the event of a conflict between the competent supervisory authorities, the supervisory authority of the Member State in which the Data Exporter is established shall have primary jurisdiction.

### Clause 14 — Local Law and Obligations

1. The Parties warrant that they have no reason to believe that the legislation in the destination country (the United States), including local laws, regulations, or practices, prevents the Data Importer from fulfilling its obligations under these Clauses.
2. The Data Importer shall promptly notify the Data Exporter if: (a) it becomes aware of any local law or practice that may substantially affect its compliance with these Clauses; (b) it receives a request from a third country authority for access to personal data processed under these Clauses; or (c) it is subject to a legally binding request for disclosure of personal data from a third country authority.
3. In the event of a conflict between these Clauses and any local law in the destination country, the Data Importer shall: (a) promptly inform the Data Exporter of such conflict; (b) use reasonable efforts to challenge the local law request or seek a waiver; and (c) document the conflict and its response.

### Clause 15 — Termination

1. Either Party may terminate these Clauses, and consequently the DPA, with written notice if: (a) the other Party commits a material breach of these Clauses and fails to remedy such breach within 30 days of receiving written notice; (b) a competent authority determines that these Clauses do not provide adequate safeguards for the transfer of personal data; or (c) the Data Importer is unable to comply with its obligations under these Clauses due to conflicting local laws.
2. Upon termination, the Data Importer shall, at the choice of the Data Exporter, return all personal data to the Data Exporter or delete all personal data and certify such deletion, in accordance with Section 7 of the DPA.
3. Termination of these Clauses shall not affect the obligations of the Parties under these Clauses that by their nature continue after termination.

### Clause 16 — Data Importer Obligations

The Data Importer (AegisGate Security, LLC) shall:

1. **Processing Records:** Maintain a complete and accurate record of all processing activities carried out under these Clauses, including the categories of processing activities performed, the categories of personal data processed, the categories of data subjects, and the categories of recipients.
2. **Security Incident Notification:** Notify the Data Exporter without undue delay (and in any event within 72 hours) after becoming aware of a personal data breach, providing: (a) the nature of the breach including, where possible, the categories and approximate number of data subjects and personal data records concerned; (b) a description of the likely consequences of the breach; (c) a description of the measures taken or proposed to address the breach; and (d) the contact details of a point of contact from whom more information may be obtained.
3. **Cooperation:** Cooperate with the Data Exporter and, where applicable, the competent supervisory authority, in ensuring compliance with the obligations arising under the GDPR and these Clauses, including by providing access to records, systems, and personnel as reasonably required.
4. **Data Transfer Impact Assessment:** Upon request by the Data Exporter, provide information and cooperate in conducting a transfer impact assessment for the destination country, to the extent such information is reasonably available to the Data Importer.
5. **Notification of Legal Requests:** Promptly inform the Data Exporter of any request for access to personal data received from a public authority, including law enforcement, unless legally prohibited from doing so.

---

### Annex I — List of Parties

**Data Exporter (Controller):**
- **Name:** The Subscriber entity identified in the applicable Order Form
- **Address:** As specified in the Order Form
- **Contact person:** As specified in the Order Form
- **Contact details:** As specified in the Order Form
- **Data protection officer:** As specified by the Data Exporter
- **Competent supervisory authority:** The supervisory authority in the EU Member State where the Data Exporter is established

**Data Importer (Processor):**
- **Name:** AegisGate Security, LLC
- **Address:** Wisconsin, USA
- **Contact person:** Legal Department
- **Contact details:** legal@aegisgatesecurity.io
- **Data protection officer:** legal@aegisgatesecurity.io
- **Activities relevant to the data transferred:** Provision of the AegisGate Security Platform Services, including inspection of HTTP, MCP, and A2A traffic for security threats; detection and redaction of PII and secrets in AI model responses; generation of compliance reports; logging of security events and audit data; and storage of data in accordance with the Data Exporter's retention preferences.
- **Role:** Processor

---

### Annex II — Technical and Organizational Measures

The Data Importer shall implement and maintain the following technical and organizational measures to ensure a level of security appropriate to the risk:

1. **Encryption:**
   - Data in transit: TLS 1.3 (minimum TLS 1.2) for all network communications
   - Data at rest: AES-256 encryption for all stored personal data
   - Key management: Hardware Security Module (HSM)-backed key management with regular key rotation

2. **Access Controls:**
   - Role-Based Access Control (RBAC) with principle of least privilege
   - Single Sign-On (SSO) authentication (SAML 2.0, OIDC)
   - Multi-Factor Authentication (MFA) for administrative access
   - Unique user identification and authentication for all authorized personnel

3. **Audit Logging and Monitoring:**
   - Comprehensive audit logging of all access to and processing of personal data
   - Real-time security monitoring and alerting
   - Log retention per subscription tier (Community 7 days, Developer 30 days, Professional 90 days, Enterprise as agreed)
   - Tamper-evident log storage

4. **Physical Security:**
   - Data center security managed by cloud infrastructure providers with SOC 2 Type 2 certification
   - Logical isolation of customer environments

5. **Incident Response:**
   - Documented incident response procedures
   - 72-hour notification commitment for personal data breaches
   - Regular incident response drills and tabletop exercises

6. **Data Minimization and Pseudonymization:**
   - Processing limited to what is necessary for the purposes specified
   - Pseudonymization of personal data where feasible
   - Automatic PII detection and redaction capabilities

7. **Business Continuity:**
   - Regular backups with encrypted storage
   - Disaster recovery procedures
   - Availability target of 99.9% uptime

8. **Compliance Frameworks:**
   - SOC 2 Type 1 (transitioning to Type 2) compliance
   - ISO 27001 alignment
   - Regular vulnerability assessments and penetration testing

9. **Personnel Security:**
   - Background checks for personnel with access to personal data
   - Mandatory confidentiality agreements
   - Regular security awareness training

10. **Sub-processor Security:**
    - Contractual obligations requiring sub-processors to implement equivalent technical and organizational measures
    - Due diligence assessments before engaging sub-processors
    - Annual review of sub-processor compliance

---

## Appendix B: UK International Data Transfer Addendum

*As required by the UK Information Commissioner's Office under the UK General Data Protection Regulation for transfers of personal data from the United Kingdom to third countries (specifically the United States). This Addendum supplements the EU Standard Contractual Clauses in Appendix A and is made pursuant to the UK International Data Transfer Agreement (IDTA) as issued by the UK Information Commissioner under Section 17A of the Data Protection Act 2018.*

### Part 1: Interpretation

1. This UK International Data Transfer Addendum ("UK Addendum") is made pursuant to the International Data Transfer Addendum issued by the UK Information Commissioner's Office ("ICO") and forms part of the Data Processing Agreement and the EU Standard Contractual Clauses (Module 2: Controller to Processor) set out in Appendix A.
2. Except as otherwise defined in this UK Addendum, terms defined in the EU SCCs (Appendix A) and the DPA shall have the same meaning in this UK Addendum.
3. "Data Exporter" means the Subscriber (controller) as identified in the applicable Order Form, established in the United Kingdom.
4. "Data Importer" means AegisGate Security, LLC, Wisconsin, USA, the processor of the personal data.
5. "UK GDPR" means the UK General Data Protection Regulation as it applies in the United Kingdom by virtue of Section 3 of the Data Protection Act 2018.
6. "ICO" means the UK Information Commissioner's Office.
7. "EU SCCs" means the Standard Contractual Clauses set out in Appendix A (Module 2: Controller to Processor).
8. "Addendum EU SCCs" means the EU SCCs as modified and supplemented by this UK Addendum.
9. "Appendix" means the appendices to this UK Addendum (Tables 1 through 5).

### Part 2: Mandatory Tables

**This Part 2 must be completed by the Parties with the information set out below.**

---

#### Table 1: Parties

| **Field** | **Data Exporter (Controller)** | **Data Importer (Processor)** |
|---|---|---|
| **Name** | The Subscriber entity identified in the applicable Order Form | AegisGate Security, LLC |
| **Address** | As specified in the Order Form | Wisconsin, USA |
| **Contact person** | As specified in the Order Form | Legal Department |
| **Contact details** | As specified in the Order Form | legal@aegisgatesecurity.io |
| **Role** | Controller | Processor |
| **Competent supervisory authority** | The UK Information Commissioner's Office (ICO) | N/A |

---

#### Table 2: Selected SCCs, Modules and Selected Clauses

| **Field** | **Value** |
|---|---|
| **Selected EU SCCs** | Commission Implementing Decision (EU) 2021/914 of 4 June 2021 |
| **Selected Module** | Module 2: Controller to Processor |
| **Selected Clauses** | Clauses 1 through 16, as set out in Appendix A |
| **Annex I** | As set out in Appendix A, Annex I (List of Parties) |
| **Annex II** | As set out in Appendix A, Annex II (Technical and Organizational Measures) |
| **Annex III** | Not applicable (Module 2 does not include Annex III for onward transfer) |

---

#### Table 3: Annex — Incorporation of the EU SCCs

| **Field** | **Value** |
|---|---|
| **How the EU SCCs are incorporated into the UK Addendum** | The EU SCCs as set out in Appendix A (Module 2: Controller to Processor, Clauses 1–16) are incorporated in full by reference and supplemented by the modifications set out in this UK Addendum. |
| **Table 4 additions** | As specified in Table 4 below |
| **Appendix to the UK Addendum** | As specified in Table 5 below |
| **Governing law** | As specified in Table 4 below |

---

#### Table 4: UK Addendum Only Provisions

| **Clause** | **Content** |
|---|---|
| **Governing law** | These Clauses and this UK Addendum shall be governed by the laws of England and Wales. |
| **Competent courts** | The courts of England and Wales shall have exclusive jurisdiction over any dispute arising out of or in connection with these Clauses and this UK Addendum. |
| **Import mandatory provisions** | Clause 15 (Termination) of the EU SCCs shall apply as written. In addition, the Data Importer warrants that it will not transfer personal data to a third country outside the UK unless the transfer is made pursuant to these Clauses or another lawful transfer mechanism under the UK GDPR. |
| **Import permissive provisions** | The Data Importer shall be entitled to process personal data for the limited purposes set out in Annex I of the EU SCCs and in accordance with the documented instructions of the Data Exporter. |
| **ICO decision** | In the event that the ICO issues a decision regarding the adequacy of the level of protection in the destination country (the United States) or makes an order regarding these Clauses, the Parties shall comply with such decision or order. |
| **Conflict** | In the event of any conflict or ambiguity between the EU SCCs and this UK Addendum, the UK Addendum shall prevail to the extent of the conflict or ambiguity, insofar as it relates to transfers of personal data subject to the UK GDPR. |
| **Hierarchy** | In the event of any conflict or ambiguity between this UK Addendum and any other agreement between the Parties, this UK Addendum shall prevail to the extent it relates to transfers of personal data subject to the UK GDPR. |
| **Severance** | If any provision of this UK Addendum is held invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be replaced by a valid provision that comes as close as possible to the intention of the invalid provision. |
| **Termination** | This UK Addendum shall terminate automatically upon: (a) termination of the EU SCCs; (b) the ICO determining that these Clauses no longer provide appropriate safeguards; or (c) the destination country (the United States) being designated as providing adequate protection under the UK GDPR. |

---

#### Table 5: Supplementary Measures

| **Category** | **Measures** |
|---|---|
| **Encryption** | All personal data transferred under these Clauses shall be encrypted in transit using TLS 1.3 (minimum TLS 1.2) and at rest using AES-256. Encryption keys shall be managed via a Hardware Security Module (HSM)-backed key management system with regular key rotation. |
| **Pseudonymization** | Where feasible, personal data shall be pseudonymized so that it can no longer be attributed to a specific data subject without the use of additional information, provided such additional information is kept separately and subject to technical and organizational measures to ensure non-attribution. |
| **Access Controls** | Access to personal data shall be restricted using role-based access controls (RBAC) with the principle of least privilege, single sign-on (SSO) authentication (SAML 2.0, OIDC), and multi-factor authentication (MFA) for administrative access. |
| **Audit Rights** | The Data Exporter shall have the right to audit the Data Importer's compliance with these Clauses and this UK Addendum, subject to the audit provisions set out in Clause 6 of the EU SCCs and Section 4 of the DPA, including the right to mandate a qualified independent auditor. |
| **Incident Notification** | The Data Importer shall notify the Data Exporter without undue delay (and in any event within 72 hours) of becoming aware of a personal data breach, in accordance with Clause 16.2 of the EU SCCs. |
| **Data Minimization** | The Data Importer shall process personal data only to the extent necessary for the purposes specified in Annex I and shall implement data minimization and storage limitation principles in accordance with Article 5(1)(c) and (e) of the UK GDPR. |
| **Transfer Impact Assessment** | The Data Importer shall, upon request by the Data Exporter, provide information and cooperate in conducting a transfer impact assessment for the destination country (the United States) to evaluate whether the supplementary measures ensure an essentially equivalent level of protection. |
| **Government Access Requests** | In the event that the Data Importer receives a request from a public authority in the destination country for access to personal data transferred under these Clauses, the Data Importer shall: (a) promptly notify the Data Exporter (unless legally prohibited from doing so); (b) use reasonable efforts to challenge the request or seek a protective order; and (c) document the request and its response. |
| **Sub-processor Controls** | Any sub-processor engaged by the Data Importer shall be contractually required to implement technical and organizational measures no less protective than those set out in Annex II and this Table 5. |
| **Training** | The Data Importer shall ensure that all personnel authorized to process personal data have received appropriate training on data protection and the obligations under these Clauses and this UK Addendum. |

---

### Part 3: Signature and Effective Date

This UK Addendum shall become effective on the later of: (a) the Effective Date of the DPA; or (b) the date on which both Parties sign this UK Addendum. The Parties acknowledge that this UK Addendum forms an integral part of the DPA and the EU SCCs in Appendix A.

**Data Exporter (Controller):** The Subscriber entity identified in the applicable Order Form

**Data Importer (Processor):** AegisGate Security, LLC, Wisconsin, USA

---

*End of Appendix B*

---

*— Counsel Sign-Off Required —*

*This document is a 2.0 DRAFT for the v3.5.0 release. The full 17-clause vendor-favorability framework applied to this DPA is documented in the internal legal review framework (a confidential document not published on this site; revision O3, audit-rights cap, applied). When budget is available, AegisGate Security, LLC will engage qualified counsel to review this DPA and convert it from a self-drafted DRAFT to a production-grade legal document. Until then, customers and counterparties should rely on this document at their own risk and consult their own legal counsel.*

*Audit log retention periods referenced in §7.2 reflect the platform's documented behavior as of v3.3.0 (2026-06-07). Consult the most recent version of this DPA for current retention periods.*
