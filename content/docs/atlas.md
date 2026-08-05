---
title: MITRE ATLAS Coverage
description: AegisGate coverage mapping against the MITRE ATLAS adversarial tactics framework — comprehensive defense against every stage of AI-targeted attacks.
weight: 300
---

## MITRE ATLAS Coverage

AegisGate maps all security detections to the [MITRE ATLAS](https://atlas.mitre.org/) (Adversarial Threat Landscape for Artificial-Intelligence Systems) framework.

### Tactics Coverage

| Tactic | AegisGate Coverage | Controls |
|--------|-------------------|----------|
| Reconnaissance | ✅ Full | IOC library, supply chain scanning |
| Resource Development | ✅ Full | Model integrity verification, dependency scanning |
| Initial Access | ✅ Full | Prompt injection detection, auth enforcement |
| Execution | ✅ Full | Response filtering, content classification |
| Persistence | ⚠️ Partial | Configuration integrity checks |
| Defense Evasion | ✅ Full | ML-based detection, adversarial training |
| Credential Access | ✅ Full | PII redaction, secret detection |
| Discovery | ✅ Full | Rate anomaly detection, access pattern monitoring |
| Lateral Movement | ✅ Full | A2A/ACP/ANP protocol enforcement |
| Collection | ✅ Full | Data exfiltration prevention, DLP patterns |
| Command and Control | ⚠️ Partial | Network anomaly detection |
| Exfiltration | ✅ Full | PII redaction, response filtering |
| Impact | ✅ Full | Rate limiting, resource budgets |

### Evidence Packages

AegisGate generates ATLAS-mapped audit evidence for each detection, supporting:

- **SOC 2 Type II**: Continuous monitoring evidence
- **EU AI Act**: Article 9 risk management, Article 15 accuracy
- **ISO 27001**: A.12.4 logging and monitoring
- **NIST AI RMF**: Govern, Map, Measure, Manage functions

_See also: [OWASP LLM Top 10 Coverage](/docs/owasp/) and [Compliance Frameworks](/docs/compliance/)._
