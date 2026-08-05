---
title: OWASP LLM Top 10 Coverage
description: AegisGate coverage mapping against the OWASP Top 10 for Large Language Model Applications — comprehensive protection for every LLM vulnerability category.
weight: 310
---

## OWASP LLM Top 10 Coverage

AegisGate provides comprehensive coverage against the [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/).

| # | OWASP Risk | AegisGate Coverage | Detection |
|---|-----------|-------------------|-----------|
| LLM01 | Prompt Injection | ✅ Full | 100% adversarial suite |
| LLM02 | Insecure Output Handling | ✅ Full | RESPONSE protocol filtering |
| LLM03 | Training Data Poisoning | ✅ Partial | Model integrity verification |
| LLM04 | Model Denial of Service | ✅ Full | Rate limiting, token budgets |
| LLM05 | Supply Chain Vulnerabilities | ✅ Full | IOC library, dependency scanning |
| LLM06 | Sensitive Information Disclosure | ✅ Full | PII redaction, DLP patterns |
| LLM07 | Insecure Plugin Design | ✅ Full | MCP/ACP/ANP protocol enforcement |
| LLM08 | Excessive Agency | ✅ Full | A2A guardrails, capability tokens |
| LLM09 | Overreliance | ⚠️ Advisory | Hallucination detection, confidence scoring |
| LLM10 | Model Theft | ⚠️ Advisory | Rate anomaly detection, access controls |

### Detailed Coverage

For each OWASP risk category, AegisGate provides:

- **Detection**: Real-time monitoring and classification of threats
- **Prevention**: Blocking, redaction, and rate limiting
- **Audit**: Full logging mapped to ATLAS and OWASP frameworks
- **Evidence**: Compliance evidence packages for each control

_See also: [MITRE ATLAS Coverage](/docs/atlas/) and [Compliance Frameworks](/docs/compliance/)._
