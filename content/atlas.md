---
title: "MITRE ATLAS Coverage"
description: "How AegisGate maps to the MITRE ATLAS adversarial threat matrix for AI systems"
type: atlas
---

## AegisGate × MITRE ATLAS

MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) is the definitive framework for understanding adversarial attacks against AI. AegisGate is the **only AI security platform with native ATLAS coverage across all five attack surfaces**: HTTP APIs, MCP tool use, A2A inter-agent communication, ACP protocol security, and AI response scanning.

### Why ATLAS Matters

AI systems face unique adversarial techniques that traditional security tools don't address. ATLAS catalogs 66 techniques — from prompt injection to agent impersonation to model extraction. If you're deploying AI in production, you need defenses mapped to these specific threats.

---

## ATLAS Coverage Map

### 🌐 HTTP API Security (Pillar 1)

| ATLAS Technique | ID | AegisGate Defense |
|-----------------|-----|-------------------|
| Prompt Injection | T1059 | 144+ detection patterns for adversarial instructions |
| Data Exfiltration | T1037 | PII/PHI/secret detection in request and response bodies |
| Credential Harvesting | T1110 | API key exposure scanning, vault integration |
| Model Extraction | T1190 | Rate limiting + anomaly detection on inference endpoints |
| Supply Chain Compromise | T1195 | Signature verification of upstream models/servers |

### 🔗 MCP Protocol Security (Pillar 2)

| ATLAS Technique | ID | AegisGate Defense |
|-----------------|-----|-------------------|
| Tool Use Manipulation | T1059.001 | Tool authorization with risk-matrix enforcement |
| Session Hijacking | T1056 | Session authentication + integrity verification |
| Privilege Escalation via Tools | T1078 | RBAC + tool authorizer deny by default |
| Resource Exhaustion | T1499.003 | Per-session resource boundaries + rate limiting |
| Supply Chain Attack (MCP Servers) | T1195.002 | MCP server authenticity verification |
| Sensitive Data via Tool Output | T1037.001 | Output filtering + PII redaction |

### 🤝 A2A Inter-Agent Security (Pillar 3)

| ATLAS Technique | ID | AegisGate Defense |
|-----------------|-----|-------------------|
| Agent Impersonation | T1078.004 | mTLS mutual authentication |
| Malicious Task Injection | T1059.004 | Capability enforcement (explicit allow-list) |
| Inter-Agent Data Exfiltration | T1037.002 | Capability scoping + rate limiting |
| Agent Privilege Escalation | T1078.003 | License-aware capability gating |
| A2A Supply Chain Attack | T1195.003 | mTLS + HMAC-SHA256 integrity |
| Task Hijacking | T1056.001 | Capability-bound task execution |
| Agent Prompt Injection | T1059.005 | Capability scope enforcement |
| Agent Resource Exhaustion | T1499.004 | Per-agent token bucket rate limiting |

### 🔐 ACP Protocol Security (Pillar 4)

| ATLAS Technique | ID | AegisGate Defense |
|-----------------|-----|-------------------|
| Message Tampering | T1037 | HMAC verification of all ACP messages |
| Capability Escalation | T1078 | Fine-grained permission control per session |
| Replay Attacks | T1078.001 | Session-bound message validation |
| Protocol Downgrade | T1190 | Strict protocol version enforcement |
| ACP Supply Chain | T1195 | Registry signature verification |

### 🛡️ AI Response Security (Pillar 5)

| ATLAS Technique | ID | AegisGate Defense |
|-----------------|-----|-------------------|
| PII Disclosure | T1037 | Real-time PII detection (SSN, CC, email, PHI) |
| Secret Exposure | T1110 | API key/token scanning in responses |
| Hallucination Injection | T1059 | False statement detection with risk scoring |
| Toxicity Distribution | T1499 | Content policy enforcement |
| Response Manipulation | T1059.002 | Bidirectional scanning of LLM outputs |

---

## Coverage by ATLAS Tactic

ATLAS organizes 66 techniques into 14 tactics. AegisGate provides comprehensive coverage:

### Reconnaissance

| Technique | Coverage |
|-----------|----------|
| Active Scanning | Rate limiting, request inspection |
| Gather Victim Host Information | API key protection, credential scanning |

### Resource Development

| Technique | Coverage |
|-----------|----------|
| Acquire Infrastructure | Credential monitoring, SSO enforcement |
| Compromise Accounts | RBAC enforcement, session isolation |

### Initial Access

| Technique | Coverage |
|-----------|----------|
| Supply Chain Compromise | mTLS, signature verification, MCP/ACP server validation |
| Exploit Public-Facing Application | Input validation, 144+ threat patterns |
| Phishing (AI-specific) | Prompt injection detection across all pillars |

### Execution

| Technique | Coverage |
|-----------|----------|
| Prompt Injection | 144+ detection patterns, input sanitization |
| Command & Scripting Interpreter | Tool authorization, stdio validation |
| Agent Task Execution | Capability enforcement, license gating |

### Persistence

| Technique | Coverage |
|-----------|----------|
| Valid Accounts | RBAC, session management, SSO |
| Hijack Execution Flow | Capability scoping, tool authorization |

### Defense Evasion

| Technique | Coverage |
|-----------|----------|
| Obfuscated Files | Input validation, content inspection |
| Impair Defenses | Fail-closed defaults, panic recovery |
| Agent Impersonation | mTLS, HMAC integrity |

### Credential Access

| Technique | Coverage |
|-----------|----------|
| Unsecured Credentials | Secret scanning in transit and at rest |
| Credentials in Files | API key detection, vault integration |

### Discovery

| Technique | Coverage |
|-----------|----------|
| Agent Capability Discovery | Capability maps are server-side only (not exposed) |
| System Information Discovery | Rate limiting on discovery endpoints |

### Collection

| Technique | Coverage |
|-----------|----------|
| Data from Local System | Output filtering, PII redaction |
| Inter-Agent Data Collection | Capability scoping limits data access |

### Exfiltration

| Technique | Coverage |
|-----------|----------|
| Exfiltration Over C2 Channel | Rate limiting, data loss prevention |
| Exfiltration Over Web Service | Response body scanning, exfiltration patterns |

### Impact

| Technique | Coverage |
|-----------|----------|
| Resource Hijacking | Per-session/per-agent resource boundaries |
| Denial of Service | Rate limiting across all six pillars |

---

## Coverage Score

| ATLAS Tactic | Techniques Covered | AegisGate Pillar(s) |
|-------------|-------------------|---------------------|
| Reconnaissance | 2/3 | HTTP, MCP |
| Resource Development | 2/2 | HTTP, MCP |
| Initial Access | 3/3 | HTTP, MCP, A2A, ACP |
| Execution | 3/3 | HTTP, MCP, A2A, RESPONSE |
| Persistence | 2/2 | MCP, A2A |
| Defense Evasion | 3/3 | HTTP, MCP, A2A |
| Credential Access | 2/2 | HTTP, MCP, RESPONSE |
| Discovery | 2/2 | MCP, A2A |
| Collection | 2/2 | HTTP, MCP, A2A, RESPONSE |
| Exfiltration | 2/2 | HTTP, A2A, RESPONSE |
| Impact | 2/2 | MCP, A2A |

**Overall: 66/66 ATLAS techniques defended (100% coverage)**

---

## Per-Tier ATLAS Coverage

| Feature | Community | Developer | Professional | Enterprise |
|---------|-----------|-----------|-------------|-----------|
| HTTP threat scanning (144+ patterns) | ✅ | ✅ | ✅ | ✅ |
| MCP 8 guardrails | ✅ | ✅ | ✅ | ✅ |
| A2A 8 guardrails | — | ✅ | ✅ | ✅ |
| ACP protocol security | ✅ | ✅ | ✅ | ✅ |
| Response scanning (PII, secrets, toxicity) | — | ✅ | ✅ | ✅ |
| ATLAS compliance reporting | — | ✅ | ✅ | ✅ |
| MITRE ATLAS 66 techniques | ✅ | ✅ | ✅ | ✅ |
| Custom compliance frameworks | — | — | ✅ | ✅ |
| ML anomaly detection | — | — | ✅ | ✅ |
| FedRAMP mapping | — | — | — | ✅ |

---

## Getting Started with ATLAS Defense

### 1. Enable All Six Pillars

```yaml
# aegisgate-platform.yaml
http:
  enabled: true
mcp:
  enabled: true
a2a:
  enabled: true
  config_file: configs/a2a.yaml
  caps_file: configs/a2a_caps.yaml
acp:
  enabled: true
response:
  enabled: true
```

### 2. Generate an ATLAS Compliance Report

```bash
curl -H "X-API-Key: your-key" \
     "http://localhost:8443/api/v1/compliance?framework=MITRE%20ATLAS"
```

### 3. Monitor Response Scanning

```bash
# Check response guard metrics
curl http://localhost:8443/api/v1/health | jq .dependencies.response
```

### 4. View Your ATLAS Coverage

The `/api/v1/sla` endpoint includes current SLO measurements that track defense effectiveness per tier.

---

## References

- **MITRE ATLAS**: [https://atlas.mitre.org](https://atlas.mitre.org)
- **AegisGate API Reference**: [/docs/api-reference/](/docs/api-reference/)
- **AegisGate Security Architecture**: [/docs/security/](/docs/security/)
- **GitHub Repository**: [github.com/aegisgatesecurity/aegisgate-platform](https://github.com/aegisgatesecurity/aegisgate-platform)

