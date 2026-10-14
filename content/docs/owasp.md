---
title: OWASP LLM Top 10 Coverage
description: AegisGate coverage mapping against the OWASP Top 10 for Large Language Model Applications and the OWASP MCP Top 10 — comprehensive protection across the full AI security stack.
weight: 310
---

## OWASP LLM Top 10 (2025) Coverage

AegisGate provides comprehensive, multi-layer coverage against the [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/). Coverage is delivered across five products that protect different layers of the AI stack — from the browser to the proxy to the platform.

### Coverage Matrix

| # | OWASP Risk | Coverage | Products | Patterns | Details |
|---|-----------|----------|----------|----------|---------|
| LLM01 | Prompt Injection | ✅ Full | Scanner, MCP, Rampart, Lens, Platform | 50+ | [See below](#llm01-prompt-injection) |
| LLM02 | Insecure Output Handling | ✅ Full | Scanner, MCP, Platform | 40+ | [See below](#llm02-insecure-output-handling) |
| LLM03 | Training Data Poisoning | ✅ Partial | Platform, Scanner, Rampart | 17 | [See below](#llm03-training-data-poisoning) |
| LLM04 | Model Denial of Service | ✅ Full | Platform, Rampart | 5 | [See below](#llm04-model-denial-of-service) |
| LLM05 | Supply Chain Vulnerabilities | ✅ Full | Platform, Scanner, MCP | 30+ | [See below](#llm05-supply-chain-vulnerabilities) |
| LLM06 | Sensitive Information Disclosure | ✅ Full | Scanner, MCP, Rampart, Lens, Platform | 80+ | [See below](#llm06-sensitive-information-disclosure) |
| LLM07 | Insecure Plugin Design | ✅ Full | MCP, Platform | 34 | [See below](#llm07-insecure-plugin-design) |
| LLM08 | Excessive Agency | ✅ Full | Platform, MCP | 20+ | [See below](#llm08-excessive-agency) |
| LLM09 | Overreliance | ⚠️ Advisory | Platform | 5 | [See below](#llm09-overreliance) |
| LLM10 | Model Theft | ✅ Full | Platform, Rampart, Lens | 15+ | [See below](#llm10-model-theft) |

---

### LLM01: Prompt Injection

**CWE-1357** · NIST AI RMF: Measure 2.7, Manage 2.3 · EU AI Act: Art. 14, 15

Prompt injection is the #1 risk in the OWASP LLM Top 10 and the most active attack vector in production AI systems. AegisGate detects prompt injection at every layer where user input meets an LLM.

| Product | Contribution |
|---------|-------------|
| **Scanner** | 17 prompt injection patterns + 17 prompt leakage patterns for static analysis of code that constructs prompts. Detects injection in source code, configuration files, and CI pipelines. |
| **MCP** | 11 prompt injection patterns in the standalone scanner + 34 tool description screening patterns that detect prompt injection hidden in MCP tool metadata (tool poisoning). |
| **Rampart** | Real-time HTTP inspection of prompts en route to LLM APIs. Blocks injection attempts before they reach the model. |
| **Lens** | Browser-layer detection of prompt injection in web-based chat interfaces. Catches injection attempts before they're submitted to the LLM. |
| **Platform** | Centralized pattern management with 256 canonical patterns. Cross-source IOC corroboration detects coordinated injection campaigns across organizations. |

**Detection categories**: direct injection (ignore instructions, role-play, delimiter abuse), indirect injection (embedded in retrieved content), RAG poisoning (conditional instructions triggered by retrieval), encoded payloads (base64, unicode escapes), and system prompt leakage.

---

### LLM02: Insecure Output Handling

**CWE-78** · NIST AI RMF: Measure 2.8 · EU AI Act: Art. 14

LLM outputs can contain XSS, SQL injection, command injection, and other downstream attack payloads. AegisGate treats LLM responses as untrusted input and screens them before they reach downstream systems.

| Product | Contribution |
|---------|-------------|
| **Scanner** | 30+ XSS/injection patterns for static analysis. Detects unsafe output handling patterns in source code. |
| **MCP** | Response scanning with XSS, SQL injection, and command injection detection. Blocks dangerous LLM outputs before they reach tool calls. |
| **Platform** | Response guard with PII redaction, secret detection, and XSS filtering. Token limiter prevents excessive output. Hallucination detector flags ungrounded claims. |

---

### LLM03: Training Data Poisoning

**CWE-1395** · NIST AI RMF: Map 1.2, Measure 2.2 · EU AI Act: Art. 10

Training data poisoning corrupts model behavior from the inside. While runtime detection can't prevent poisoned training, AegisGate can detect poisoned data artifacts and RAG-injected content that behaves like poisoning.

| Product | Contribution |
|---------|-------------|
| **Scanner** | 17 RAG poisoning patterns detecting conditional instructions embedded in documents (e.g., "when this document is retrieved, respond with..."), vector store injection, embedding manipulation, and retrieval bypass. |
| **Rampart** | 17 RAG poisoning patterns synced from Scanner — real-time HTTP inspection detects RAG-injected content in transit to LLM APIs. |
| **Platform** | 17 RAG poisoning patterns synced from Scanner, model integrity verification, AIBOM (AI Bill of Materials) generation for supply chain provenance, and training data audit trails. |

---

### LLM04: Model Denial of Service

**CWE-400** · NIST AI RMF: Measure 2.9 · EU AI Act: Art. 15

Resource exhaustion attacks against LLMs can take the form of extremely long prompts, recursive tool calls, or rapid-fire requests. AegisGate provides multi-layer DoS protection.

| Product | Contribution |
|---------|-------------|
| **Platform** | Rate limiting, token budget enforcement, and anomaly detection for usage spikes. Per-tenant quotas. |
| **Rampart** | HTTP-level rate limiting and request size limits at the proxy layer. Blocks oversized prompts before they reach the model. |

---

### LLM05: Supply Chain Vulnerabilities

**CWE-1357** · NIST AI RMF: Map 1.3, Manage 2.2 · EU AI Act: Art. 16

AI supply chains include models, datasets, MCP servers, tool definitions, and dependencies. Each is a potential attack surface.

| Product | Contribution |
|---------|-------------|
| **Scanner** | Dependency scanning with 30+ patterns for dangerous functions, hardcoded credentials, and suspicious URLs. Detects supply chain risks in source code. |
| **MCP** | 28 dangerous function patterns (eval, exec, os.system, child_process, pickle.loads, etc.) screened in tool descriptions and code. |
| **Platform** | Federated IOC library with peer reputation. AIBOM generation. CVE feed integration. Dependency vulnerability scanning. |

---

### LLM06: Sensitive Information Disclosure

**CWE-200** · NIST AI RMF: Measure 2.6, Identify 2.4 · EU AI Act: Art. 10, 52

The broadest category — covering PII leakage, secret exposure, and system prompt disclosure. AegisGate has the deepest coverage here.

| Product | Contribution |
|---------|-------------|
| **Scanner** | 80+ PII patterns (SSN, email, phone, credit card, healthcare codes, financial codes, OT protocols), 20+ secret/credential patterns, 16 system prompt leakage patterns. |
| **MCP** | PII, credential, financial, and cryptographic pattern sets for both request and response scanning. |
| **Rampart** | Real-time PII redaction and secret detection in HTTP traffic. 16 prompt leakage patterns synced from Scanner detect system prompt disclosure in responses. Blocks sensitive data before it reaches external LLM APIs. |
| **Lens** | Browser-layer detection of PII in chat inputs. Prevents sensitive data from being submitted to web-based AI tools. |
| **Platform** | Response-side PII scanner, secret detector, redaction pipeline, 16 prompt leakage patterns synced from Scanner, and DSAR (Data Subject Access Request) handling. Privacy-by-design: only hashed domains and metadata are stored. |

---

### LLM07: Insecure Plugin Design

**CWE-918** · NIST AI RMF: Map 1.4, Manage 2.4 · EU AI Act: Art. 14

MCP servers, ACP agents, A2A participants, and ANP networks all expose plugin-like interfaces to LLMs. AegisGate secures these at the protocol level.

| Product | Contribution |
|---------|-------------|
| **MCP** | Tool description scanner with 34 patterns that screen MCP tool descriptions for prompt injection, dangerous functions, secrets, PII, XSS, and OWASP compliance violations at registration time. Tool poisoning defense. |
| **Platform** | MCP server guardrails, ACP capability enforcement, A2A response guards, ANP policy enforcement. Cross-protocol security for all AI agent communication standards. |

---

### LLM08: Excessive Agency

**CWE-250** · NIST AI RMF: Manage 2.5, Map 1.5 · EU AI Act: Art. 14

AI agents with too much autonomy can cause real-world damage. AegisGate enforces least-privilege and capability boundaries.

| Product | Contribution |
|---------|-------------|
| **Platform** | A2A guardrails with capability tokens. ANP policy enforcement. MCP tool authorization. Chain analysis to detect multi-step escalation attacks. |
| **MCP** | Session guardrails, tool-call authorization, and policy enforcement. Prevents agents from accessing tools beyond their granted scope. |

---

### LLM09: Overreliance

**CWE-1078** · NIST AI RMF: Measure 2.3, Identify 2.5 · EU AI Act: Art. 14

Overreliance on LLM outputs without human verification is a human factors risk. AegisGate provides advisory controls.

| Product | Contribution |
|---------|-------------|
| **Platform** | Hallucination detector with confidence scoring. Flags ungrounded claims and low-confidence responses for human review. |

---

### LLM10: Model Theft

**CWE-1236** · NIST AI RMF: Protect 1.1, Manage 2.6 · EU AI Act: Art. 53

Model exfiltration through repeated queries, API abuse, or distillation attacks. AegisGate detects extraction patterns.

| Product | Contribution |
|---------|-------------|
| **Platform** | Distillation detection — identifies systematic querying patterns that suggest model extraction. Rate anomaly detection. Access controls and per-tenant isolation. |
| **Rampart** | HTTP-level rate limiting and request monitoring at the proxy. Detects high-volume API usage patterns. |
| **Lens** | Browser-layer detection of data exfiltration attempts in chat interfaces. Cross-correlates with Rampart detections for multi-layer signal escalation. |

---

## OWASP MCP Top 10 (2025) Coverage

OWASP has published a dedicated [MCP Top 10](https://owasp.org/www-project-top-10-for-mcp/) (currently beta) specifically for Model Context Protocol security. AegisGate's MCP product provides direct coverage:

| # | OWASP MCP Risk | Coverage | How |
|---|---------------|----------|-----|
| MCP01 | Token Mismanagement & Secret Exposure | ✅ Full | Secret detection patterns (API keys, tokens, credentials) in tool descriptions and MCP traffic |
| MCP02 | Privilege Escalation via Scope Creep | ✅ Full | Capability enforcement, tool-call authorization, session guardrails |
| MCP03 | Tool Poisoning | ✅ Full | Tool description scanner with 34 patterns — screens for prompt injection, dangerous functions, and exfiltration channels at registration |
| MCP04 | Software Supply Chain Attacks | ✅ Full | Dangerous function detection (eval, exec, pickle.loads), hardcoded URL detection, base64 blob detection |
| MCP05 | Command Injection & Execution | ✅ Full | 28 dangerous function patterns for Python, JavaScript, SQL, and shell commands |
| MCP06 | Prompt Injection via Contextual Payloads | ✅ Full | 11 prompt injection patterns + RAG poisoning patterns in MCP scanner |
| MCP07 | Insufficient Authentication & Authorization | ✅ Full | Session management, authentication middleware, RBAC |
| MCP08 | Lack of Audit and Telemetry | ✅ Full | Full audit logging, telemetry forwarding to Platform, SOC/SIEM integration |
| MCP09 | Shadow MCP Servers | ✅ Full | MCP server inventory, tool registration screening, stdio validation |
| MCP10 | Context Injection & Over-Sharing | ✅ Full | Response scanning with PII redaction, secret detection, and DLP patterns |

---

## Compliance Framework Cross-Reference

AegisGate maps every detection to multiple compliance frameworks:

| Framework | Coverage |
|-----------|----------|
| [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) | ✅ All 10 categories (8 full, 2 partial/advisory) |
| [OWASP MCP Top 10](https://owasp.org/www-project-top-10-for-mcp/) | ✅ All 10 categories |
| [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) | ✅ Govern, Map, Measure, Manage functions |
| [NIST CSF 2.0](https://www.nist.gov/cyberframework) | ✅ Identify, Protect, Detect, Respond, Recover |
| [EU AI Act](https://artificialintelligenceact.eu/) | ✅ Articles 10, 14, 15, 16, 52, 53 |
| [MITRE ATLAS](https://atlas.mitre.org/) | ✅ See [ATLAS coverage](/docs/atlas/) |

## Product Overview

| Product | Type | Layer | OWASP Coverage |
|---------|------|-------|---------------|
| **Platform** | Proprietary | Central control plane | All 10 categories — 256 canonical patterns, IOC corroboration, compliance evidence, AIBOM |
| **Scanner** | Open Source (Apache 2.0) | CI/CD + static analysis | LLM01, LLM02, LLM03, LLM05, LLM06, LLM08 — 301 detection patterns |
| **MCP** | Open Source (Apache 2.0) | MCP protocol layer | LLM01, LLM02, LLM05, LLM06, LLM07, LLM08 — 91 detection patterns + tool poisoning defense |
| **Rampart** | Open Source (Apache 2.0) | Network proxy | LLM01, LLM03, LLM04, LLM06, LLM10 — 256 detection patterns, real-time HTTP inspection |
| **Lens** | Open Source (Apache 2.0) | Browser extension | LLM01, LLM06, LLM10 — 223 detection patterns, client-side detection in web chat interfaces |

All products are air-gap capable — zero external communications required for full functionality. Interoperability is opt-in, outbound, and config-driven.

_See also: [MITRE ATLAS Coverage](/docs/atlas/) and [Compliance Frameworks](/docs/compliance/)._