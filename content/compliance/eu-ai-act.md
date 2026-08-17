---
title: "EU AI Act Self-Assessment"
description: "AegisGate Security Platform EU AI Act (Regulation 2024/1689) self-assessment. Evaluates AegisGate's own compliance posture under the EU AI Act."
type: "compliance"
date: 2026-07-29
layout: single
---

| Field | Value |
|---|---|
| **Document Version** | 1.0 |
| **Classification** | Internal — Compliance |
| **Owner** | Compliance & Legal, AegisGate Inc. |
| **Approved By** | Chief Information Security Officer |
| **Review Cycle** | Annual (next review: 2027-07-29) |
| **Regulation Reference** | EU Regulation 2024/1689 (EU AI Act) |
| **Assessment Date** | 2026-07-29 |

---

## Executive Summary

AegisGate Inc. has conducted this self-assessment to evaluate its compliance posture under the EU AI Act (Regulation 2024/1689). This assessment was performed by the Compliance & Legal function in coordination with the Engineering and Product teams.

**AegisGate is not a general-purpose AI model (GPAI model), nor is it a high-risk AI system under Annex III.** AegisGate is a self-hosted, on-premises security gateway that monitors and protects AI infrastructure interactions. It does not generate content, make autonomous decisions, or provide AI capabilities to end users. It functions as a security proxy — analogous to a web application firewall or API gateway — positioned between AI model consumers and AI model providers.

This self-assessment concludes that AegisGate is **fully compliant** with all applicable obligations under the EU AI Act. The majority of the regulation's substantive requirements (Articles 9–15, 55) apply to high-risk AI systems and GPAI model providers, neither of which describes AegisGate's product category. AegisGate's applicable obligations are primarily limited to Article 52 (transparency obligations) and general provisions, all of which are met.

Additionally, AegisGate's EU AI Act compliance module — a feature of the AegisGate platform — provides 82 automated controls and 10 AI-specific controls (EUAIAct-AI-001 through EUAIAct-AI-010) that enable AegisGate's customers to meet their own obligations under the regulation. This module is outside the scope of this self-assessment but is referenced where relevant to demonstrate AegisGate's domain expertise.

---

## Scope and Methodology

### What AegisGate Is

AegisGate is a self-hosted, on-premises security gateway for AI infrastructure. It operates as a transparent security proxy between AI model consumers (applications, agents, end users) and AI model providers (OpenAI, Anthropic, Google, self-hosted models). Its core functions are:

- **Monitoring and inspection** of AI request/response traffic for security threats
- **Detection and prevention** of prompt injection, data exfiltration, PII/PHI leakage, secrets exposure, and 150+ additional threat patterns
- **Policy enforcement** through configurable rules and guardrails
- **Audit logging** with hash-chained integrity verification
- **Access control** through RBAC with MFA and OIDC/SAML SSO integration

AegisGate is deployed as a Docker container (19.1 MB) with zero external dependencies. It processes traffic in transit and does not store customer AI payloads beyond configurable log retention windows. All processing occurs within the customer's own infrastructure.

### What AegisGate Is Not

- **Not a GPAI model.** AegisGate does not contain, train, fine-tune, or deploy any AI model. It does not generate text, images, code, or any other content.
- **Not a high-risk AI system.** AegisGate does not make decisions about individuals, score persons, evaluate creditworthiness, assist in recruitment, or fall under any Annex III category.
- **Not an AI system as defined in Article 3(1).** AegisGate does not infer outputs from inputs using machine learning, logic- or knowledge-based approaches, or statistical methods to generate predictions, recommendations, or decisions. It applies deterministic pattern-matching rules and heuristic detection logic to security inspection — functionally equivalent to a network intrusion detection system applied to AI traffic.

### Assessment Methodology

1. **Regulatory mapping.** Each EU AI Act article was evaluated for applicability to AegisGate's product category and operational model.
2. **Gap analysis.** For each applicable obligation, AegisGate's current implementation was assessed against the statutory requirement.
3. **Evidence collection.** Technical documentation, architecture diagrams, and product configurations were reviewed to substantiate compliance claims.
4. **Residual risk assessment.** Any areas of partial applicability were evaluated for residual compliance risk.

---

## Classification Under the EU AI Act

### Article 3 — Definitions and Scope

| Criterion | Assessment |
|---|---|
| AI system (Art. 3(1)) | **Does not apply.** AegisGate does not operate as an AI system. It is a security gateway that applies deterministic detection rules to network traffic. It does not infer, predict, recommend, or decide. |
| GPAI model (Art. 3(63)) | **Does not apply.** AegisGate does not train or deploy any AI model, general-purpose or otherwise. |
| High-risk AI system (Annex III) | **Does not apply.** AegisGate is not listed in Annex III categories (biometric identification, critical infrastructure, education, employment, access to services, law enforcement, migration, justice). |
| Deployer | **AegisGate Inc. is a provider** of a security product. Organizations deploying AegisGate are deployers under the Act. |
| Provider | **AegisGate Inc. is the provider** of the AegisGate security platform. |

### Risk Classification Rationale

AegisGate is a security infrastructure component, not an AI system. Its function — monitoring and filtering AI traffic for security threats — is analogous to established security product categories (WAFs, API gateways, DLP systems). While AegisGate processes AI inputs and outputs, it does so in a security inspection capacity, not in an AI inferential capacity.

Organizations that deploy AegisGate may themselves be providers or deployers of high-risk AI systems under Annex III. AegisGate supports these customers through its EU AI Act compliance module but is not itself classified as a high-risk system.

---

## Assessment Results by Article

### Article 5 — Prohibited AI Practices

| | |
|---|---|
| **Article Reference** | Article 5 — Prohibited AI Practices |
| **Requirement** | AI systems that deploy subliminal techniques, exploit vulnerabilities, conduct social scoring, or perform real-time remote biometric identification in publicly accessible spaces are prohibited. |
| **AegisGate Implementation** | AegisGate does not implement, facilitate, or enable any prohibited AI practice. Specifically: (1) AegisGate does not deploy subliminal techniques or manipulate behavior. (2) AegisGate does not exploit vulnerabilities of any population group. (3) AegisGate does not conduct social scoring. (4) AegisGate does not perform real-time or retrospective biometric identification. AegisGate's detection capabilities include PII/PHI detection patterns that *prevent* the unauthorized processing of biometric data in AI traffic — functioning as a safeguard against prohibited practices, not an enabler of them. |
| **Status** | ✅ Compliant |

### Article 9 — Risk Management System

| | |
|---|---|
| **Article Reference** | Article 9 — Risk Management System |
| **Requirement** | High-risk AI systems shall implement a continuous risk management system to identify, analyze, and mitigate risks throughout the system's lifecycle. |
| **AegisGate Implementation** | AegisGate itself is not a high-risk AI system, and Article 9's substantive requirements do not apply. However, AegisGate maintains a risk management framework as a security product provider: (1) Threat model maintained and reviewed quarterly, covering the AegisGate gateway, customer deployment scenarios, and the AI threat landscape. (2) Vulnerability management program with responsible disclosure, CVE tracking, and patch SLAs. (3) AegisGate's EU AI Act compliance module (82 automated controls) includes EUAIAct-AI-001 through EUAIAct-AI-003, which map directly to Article 9 risk management requirements for customers who are providers or deployers of high-risk AI systems. |
| **Status** | ✅ Compliant (N/A for direct Article 9 obligations; risk management practices voluntarily maintained) |

### Article 10 — Data and Data Governance

| | |
|---|---|
| **Article Reference** | Article 10 — Data and Data Governance |
| **Requirement** | High-risk AI systems that train models shall employ data governance practices covering training, validation, and testing datasets, including examination of biases and data quality. |
| **AegisGate Implementation** | AegisGate does not train, fine-tune, or deploy any AI model. No training, validation, or testing datasets are used. Data governance requirements under Article 10 are not applicable. AegisGate's detection patterns (176 rules for prompt injection, PII/PHI, secrets, data exfiltration) are authored by AegisGate's security research team, reviewed through a controlled release process, and versioned in AegisGate's configuration. Pattern updates are delivered through signed release channels. |
| **Status** | ✅ Compliant (N/A — no training data or model training) |

### Article 11 — Technical Documentation

| | |
|---|---|
| **Article Reference** | Article 11 — Technical Documentation |
| **Requirement** | Providers of high-risk AI systems shall draw up and maintain technical documentation demonstrating compliance with the regulation. |
| **AegisGate Implementation** | AegisGate is not a high-risk AI system, and Article 11's Annex IV documentation requirements do not apply. However, AegisGate maintains comprehensive technical documentation as a security product: (1) System architecture documentation describing components, data flows, and security boundaries. (2) Threat model and security design documentation. (3) Deployment guides covering self-hosted installation, configuration, and hardening. (4) API documentation for all management and configuration endpoints. (5) Detection pattern documentation with descriptions, severity levels, and false-positive profiles. (6) This self-assessment document, which serves as AegisGate's voluntary compliance attestation. |
| **Status** | ✅ Compliant (N/A for Annex IV; technical documentation maintained as security product) |

### Article 12 — Record-Keeping (Logging)

| | |
|---|---|
| **Article Reference** | Article 12 — Record-Keeping |
| **Requirement** | High-risk AI systems shall enable automatic logging of events for the system's lifetime, with capabilities for identifying the subject of logging and ensuring logs are protected from tampering. |
| **AegisGate Implementation** | AegisGate is not a high-risk AI system, and mandatory Article 12 logging does not apply. However, AegisGate implements enterprise-grade audit logging as a core security capability: (1) Hash-chained audit logs — every log entry is cryptographically chained to the previous entry, making tampering detectable. Any modification to a historical log entry breaks the chain. (2) Configurable log retention policies with tamper-evident export. (3) Comprehensive event logging covering policy evaluations, detections, access decisions, configuration changes, and administrative actions. (4) Structured log format (JSON) with correlation IDs for end-to-end request tracing. (5) Log access controlled by RBAC with MFA enforcement. (6) AegisGate's EU AI Act compliance module (EUAIAct-AI-004) provides Article 12 logging controls for customers. |
| **Status** | ✅ Compliant (N/A for mandatory Article 12; logging exceeds requirements voluntarily) |

### Article 13 — Transparency and Provision of Information to Deployers

| | |
|---|---|
| **Article Reference** | Article 13 — Transparency and Provision of Information to Deployers |
| **Requirement** | High-risk AI systems shall be designed to allow deployers to interpret the system's output and use it appropriately, including clear documentation of intended purpose, performance characteristics, and limitations. |
| **AegisGate Implementation** | AegisGate is not a high-risk AI system, and mandatory Article 13 does not apply. However, transparency is central to AegisGate's product philosophy: (1) Every detection event includes the matched pattern, confidence score, rule ID, and the specific content that triggered the match — enabling deployers to understand and validate each security decision. (2) Policy evaluation results are fully observable: deployers can trace exactly why a request was allowed, blocked, or flagged. (3) Detection pattern documentation is provided with severity levels, description, and recommended responses. (4) AegisGate's configuration format is human-readable (YAML), enabling full auditability of security policies. (5) Performance characteristics (latency overhead, throughput impact) are documented in deployment guides. |
| **Status** | ✅ Compliant (N/A for mandatory Article 13; transparency principles voluntarily implemented) |

### Article 14 — Human Oversight

| | |
|---|---|
| **Article Reference** | Article 14 — Human Oversight |
| **Requirement** | High-risk AI systems shall be designed to allow effective human oversight, including the ability to understand the system's output, monitor its operation, and intervene or override decisions. |
| **AegisGate Implementation** | AegisGate is not a high-risk AI system. Mandatory Article 14 does not apply. AegisGate's design inherently supports human oversight: (1) AegisGate operates under explicit human-configured policies — it does not make autonomous security decisions beyond the rules defined by the deployer. (2) All enforcement actions (block, flag, redact) are configurable and can be set to audit-only mode for human review. (3) RBAC with MFA and OIDC/SAML SSO ensures that only authorized administrators can modify policies. (4) Alerting and notification integrations enable real-time human awareness of security events. (5) Override and bypass mechanisms are available to authorized administrators for incident response scenarios. |
| **Status** | ✅ Compliant (N/A for mandatory Article 14; human oversight is intrinsic to product design) |

### Article 15 — Accuracy, Robustness, and Cybersecurity

| | |
|---|---|
| **Article Reference** | Article 15 — Accuracy, Robustness, and Cybersecurity |
| **Requirement** | High-risk AI systems shall achieve appropriate levels of accuracy, robustness, and cybersecurity throughout their lifecycle, including resilience against errors, faults, and adversarial attacks. |
| **AegisGate Implementation** | AegisGate is not a high-risk AI system. Mandatory Article 15 does not apply. However, as a security product, AegisGate meets or exceeds Article 15's principles: **Accuracy:** (1) Detection pattern library covers 176 threat patterns with documented false-positive profiles. (2) Pattern updates are tested against regression suites before release. (3) Per-request detection with deterministic rule evaluation — no probabilistic inference that introduces accuracy variance. **Robustness:** (1) Self-hosted, on-premises deployment eliminates cloud-service availability dependencies. (2) Docker container (19.1 MB) with zero external dependencies — no supply-chain attack surface from third-party runtime dependencies. (3) Automatic recovery and health-check mechanisms. (4) Configuration validation prevents deployment of malformed policies. **Cybersecurity:** (1) TLS 1.3 for all data in transit. (2) AES-256 encryption for data at rest. (3) RBAC with MFA enforcement and OIDC/SAML SSO integration. (4) Hash-chained audit logs with tamper detection. (5) Minimal attack surface — single-purpose container with no exposed management ports beyond the configured proxy and API endpoints. (6) Regular security assessments and responsible disclosure program. |
| **Status** | ✅ Compliant (N/A for mandatory Article 15; accuracy, robustness, and cybersecurity exceed security industry standards) |

### Article 51 — Obligations for GPAI Model Providers (Transparency)

| | |
|---|---|
| **Article Reference** | Article 51 — Obligations for GPAI Model Providers |
| **Requirement** | Providers of GPAI models shall provide detailed documentation and information to downstream providers who integrate the model into AI systems, enabling those providers to comply with their obligations. |
| **AegisGate Implementation** | AegisGate is not a GPAI model. AegisGate does not train, fine-tune, host, or provide any AI model — general-purpose or otherwise. AegisGate is a security gateway that processes traffic between AI model consumers and AI model providers. Article 51 obligations do not apply. |
| **Status** | ✅ Compliant (N/A) |

### Article 52 — Transparency Obligations for AI Systems

| | |
|---|---|
| **Article Reference** | Article 52 — Transparency Obligations |
| **Requirement** | (1) Providers of AI systems that interact with natural persons shall ensure that those persons are informed that they are interacting with an AI system. (2) Deployers of emotion recognition or biometric categorization systems shall inform natural persons exposed to those systems. (3) Deployers of AI systems that generate synthetic audio, image, video, or text shall disclose that the content is AI-generated. |
| **AegisGate Implementation** | **Article 52(1):** AegisGate is not an AI system that interacts with natural persons. It is a security gateway operating in the infrastructure layer. End users do not interact with AegisGate — they interact with the applications and AI systems that AegisGate protects. AegisGate's deployers are responsible for meeting their own Article 52(1) transparency obligations regarding their AI systems. **Article 52(2):** AegisGate does not deploy emotion recognition or biometric categorization systems. AegisGate's detection capabilities include patterns that *prevent* the unauthorized processing of biometric and emotional data in AI traffic. **Article 52(3):** AegisGate does not generate synthetic content. It inspects and filters AI traffic but does not produce AI-generated text, images, audio, or video. **AegisGate's transparency commitments:** (1) AegisGate clearly identifies itself as a security product — not an AI system — in all documentation, marketing, and product interfaces. (2) AegisGate's product documentation and website disclose that AegisGate processes AI traffic for security inspection purposes. (3) Deployers are informed through documentation and configuration guidance about how AegisGate interacts with their AI traffic and what data is processed. (4) AegisGate's EU AI Act compliance module (EUAIAct-AI-005 through EUAIAct-AI-007) provides Article 52 transparency controls for customers. |
| **Status** | ✅ Compliant |

### Article 53 — Obligations for GPAI Model Providers (Technical Documentation, Copyright)

| | |
|---|---|
| **Article Reference** | Article 53 — Obligations for GPAI Model Providers |
| **Requirement** | Providers of GPAI models shall: (1) maintain and make available technical documentation covering training, compute, data, and evaluation; (2) comply with EU copyright law and provide a summary of training data content. |
| **AegisGate Implementation** | AegisGate is not a GPAI model. No AI model training, compute, or evaluation occurs within the AegisGate platform. Article 53 obligations do not apply. AegisGate Inc. complies with all applicable EU copyright law in its operations and product development. AegisGate's detection pattern library and documentation are original works authored by AegisGate's security research team. |
| **Status** | ✅ Compliant (N/A) |

### Article 55 — Obligations for GPAI Models with Systemic Risk

| | |
|---|---|
| **Article Reference** | Article 55 — Obligations for GPAI Models with Systemic Risk |
| **Requirement** | Providers of GPAI models with systemic risk (computed using training compute of >10^25 FLOPS) shall conduct model evaluations, assess and mitigate systemic risks, and report serious incidents. |
| **AegisGate Implementation** | AegisGate is not a GPAI model and does not meet the compute threshold for systemic risk classification. Article 55 obligations do not apply. |
| **Status** | ✅ Compliant (N/A) |

---

## GPAI Model Assessment

### Determination

**AegisGate is not a General-Purpose AI (GPAI) model** under Article 3(63) of the EU AI Act.

| Criterion | AegisGate Status |
|---|---|
| Trained on large datasets using self-supervised methods | No |
| Displays significant generality and is capable of competently performing a wide range of distinct tasks | No |
| Can be integrated into a variety of downstream systems or applications | No — AegisGate is not a model and is not integrated into systems as an AI capability |
| Trained compute exceeds 10^25 FLOPS | No |
| Marketed as a GPAI model | No — marketed as a security gateway |

AegisGate does not satisfy any element of the GPAI model definition. It is a deterministic security product that applies rule-based detection patterns to network traffic. It does not learn, infer, generate, or generalize.

---

## Transparency Obligations Summary

As a security gateway provider (not an AI system provider or GPAI model provider), AegisGate's transparency obligations under the EU AI Act are limited. AegisGate voluntarily exceeds these obligations:

| Obligation | Applicability | AegisGate Practice |
|---|---|---|
| Inform natural persons they are interacting with an AI system (Art. 52(1)) | Not applicable — AegisGate does not interact with natural persons as an AI system | AegisGate identifies itself as a security product, not an AI system, in all materials |
| Disclose AI-generated content (Art. 52(3)) | Not applicable — AegisGate does not generate content | AegisGate does not produce AI-generated content of any kind |
| Provide documentation to downstream providers (Art. 51) | Not applicable — AegisGate is not a GPAI model | Comprehensive technical documentation provided to all customers |
| Maintain technical documentation (Art. 53(1)) | Not applicable — AegisGate is not a GPAI model | Technical documentation maintained and available at docs.aegisgate.io |
| Copyright compliance and training data summary (Art. 53(2)) | Not applicable — AegisGate does not train models | All detection patterns and documentation are original works |

---

## Voluntary Compliance Measures

Although AegisGate is not subject to the substantive requirements for high-risk AI systems or GPAI models, AegisGate voluntarily implements the following measures that align with the EU AI Act's objectives:

| Measure | Alignment | Description |
|---|---|---|
| Hash-chained audit logging | Article 12 (Record-keeping) | Cryptographically verified, tamper-evident logging exceeding Article 12 requirements |
| RBAC with MFA and SSO | Article 14 (Human oversight) | Role-based access with multi-factor authentication and enterprise SSO integration |
| Deterministic detection logic | Article 15 (Accuracy) | No probabilistic inference — deterministic rule evaluation with documented false-positive profiles |
| TLS 1.3 + AES-256 | Article 15 (Cybersecurity) | Encryption in transit and at rest exceeding baseline security requirements |
| Self-hosted, on-premises architecture | Article 15 (Robustness) | Zero external dependencies, no cloud data processing, customer-controlled deployment |
| PII/PHI detection and prevention | Article 5 (Prohibited practices) | Active prevention of unauthorized biometric and personal data processing in AI traffic |
| EU AI Act compliance module (82 controls) | Multiple articles | Automated controls enabling AegisGate's customers to meet their own EU AI Act obligations |

---

## Attestation

This self-assessment has been prepared by the Compliance & Legal function of AegisGate Inc. and reviewed by the Chief Information Security Officer. The information contained herein is accurate and complete as of the assessment date.

**Findings:**

- AegisGate is **not a high-risk AI system** under Annex III of the EU AI Act.
- AegisGate is **not a GPAI model** under Article 3(63) of the EU AI Act.
- AegisGate **does not fall within the scope of prohibited AI practices** under Article 5.
- AegisGate **meets all applicable transparency obligations** under Article 52.
- AegisGate **voluntarily implements measures** that align with and, in several cases, exceed the requirements of Articles 9–15 and 51–55.

**Conclusion:** AegisGate is **fully compliant** with all applicable obligations under the EU AI Act (Regulation 2024/1689).

| Role | Name | Date |
|---|---|---|
| Chief Information Security Officer | _____________________ | 2026-07-29 |
| VP, Compliance & Legal | _____________________ | 2026-07-29 |
| VP, Engineering | _____________________ | 2026-07-29 |

---

*This document will be reviewed annually or upon material changes to AegisGate's product, classification, or applicable regulation. Next scheduled review: 2027-07-29.*