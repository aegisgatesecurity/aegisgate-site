---
title: "Security"
description: "AegisGate Security Platform — three-pillar AI security architecture"
type: docs
---

## Security Architecture

AegisGate secures AI infrastructure across three pillars — every request is verified, every agent is authenticated, and every failure denies by default.

### Fail-Closed Default

AegisGate is a security product. When in doubt, we deny. If any security check fails, encounters an error, or receives unexpected input, the request is **rejected** — never silently allowed through. This applies across all three pillars:

| Scenario | Behavior |
|----------|----------|
| Missing authentication header | 403 Forbidden |
| Unregistered compliance framework | Error + fail |
| Invalid license key | 403 Forbidden (no silent downgrade) |
| Nil/missing security handler | Deny |
| Internal panic | Recover + deny |
| Missing A2A capability header | 403 Forbidden |

---

## Pillar 1: HTTP API Security

AegisGate scans all HTTP traffic using 144+ detection patterns covering:

- **Secrets & API Keys**: Detects exposed credentials before they leak
- **PII/PHI**: Identifies personally identifiable and health information
- **Prompt Injection**: Blocks adversarial instructions trying to manipulate AI behavior
- **Data Exfiltration**: Prevents sensitive data from leaving your environment

---

## Pillar 2: MCP Protocol Protection

The Model Context Protocol (MCP) guardrails protect tool-use interactions:

1. **Session Authentication** — Verify identity of AI agents before allowing tool access
2. **Tool Authorization** — Risk-matrix based control over which tools each agent can access
3. **Input Validation** — Sanitize all inputs before reaching AI services
4. **Output Filtering** — Remove sensitive data from responses
5. **Rate Limiting** — Prevent abuse and DoS attacks
6. **Audit Logging** — Complete trail of all tool executions
7. **Resource Boundaries** — Limit memory and computation per session
8. **Supply Chain Verification** — Validate MCP server authenticity

**Fail-closed MCP guarantees:**

| Condition | Behavior |
|-----------|----------|
| Untracked session | Denied |
| `nil` tool authorizer | All tools denied |
| `nil` stdio validator | All commands denied |
| Session counter drift | `OnSessionDestroy` corrects on close |

---

## Pillar 3: A2A (Agent-to-Agent) Security

A2A guardrails protect inter-agent communication — the newest attack surface for AI systems:

1. **mTLS Authentication** — Mutual TLS verifies both caller and callee identities via client certificates
2. **HMAC-SHA256 Integrity** — Every request body is signed; tampering is detected and rejected
3. **Capability Enforcement** — Each agent can only exercise explicitly declared capabilities
4. **License-Aware Gating** — Advanced capabilities require the appropriate license tier
5. **Per-Agent Rate Limiting** — Token bucket limits prevent any single agent from overwhelming the system
6. **Structured Error Codes** — 14 diagnostic `A2A_*` error codes for fast debugging
7. **Panic Recovery** — If the middleware panics, the request is denied (never allowed through)
8. **Persistent Capabilities** — Agent capability maps survive restarts via atomic JSON persistence

### A2A Request Flow

```
Client → mTLS Auth → HMAC Verify → License Check → Rate Limit → Capability Check → Handler
                                                                        ↓ (fail)
                                                                      403/429 + A2A_ERR_*
```

### A2A Error Codes

All A2A errors use structured codes for programmatic handling. See the [API Reference](/docs/api-reference/) for the complete list of 14 error codes, HTTP statuses, and remediation steps.

Quick reference:

| Code | Why |
|------|-----|
| `A2A_AUTH_FAILED` | Bad or missing client certificate |
| `A2A_LICENSE_MISSING` | No license key for paid-tier capability |
| `A2A_LICENSE_INVALID` | Invalid or expired license |
| `A2A_RATE_LIMITED` | Too many requests from this agent |
| `A2A_INTEGRITY_MISSING` | No HMAC signature |
| `A2A_INTEGRITY_INVALID` | HMAC doesn't match body |
| `A2A_CAP_MISSING` | No capability header |
| `A2A_CAP_DENIED` | Agent lacks the requested capability |
| `A2A_CAP_UNKNOWN_AGENT` | Agent not in capability map |
| `A2A_INTERNAL_ERROR` | Unexpected error (recover + deny) |

### A2A Configuration

| File | Purpose |
|------|---------|
| `configs/a2a.yaml` | HMAC shared secret, rate limits |
| `configs/a2a_caps.yaml` | Agent capability map |
| Environment vars | `AEGISGATE_A2A_ENABLED`, `AEGISGATE_A2A_CONFIG_FILE`, `AEGISGATE_A2A_CAPS_FILE` |

### ATLAS Threat Coverage

A2A guardrails map directly to MITRE ATLAS adversarial techniques:

| ATLAS Pattern | A2A Guardrail |
|---------------|---------------|
| Agent Impersonation | mTLS Authentication |
| Malicious Task Injection | Capability Enforcement |
| Inter-Agent Data Exfiltration | Capability + Rate Limiting |
| Agent Privilege Escalation | License-Aware Gating |
| A2A Supply Chain Attack | mTLS + HMAC Integrity |
| Task Hijacking | Capability Enforcement |
| Agent Prompt Injection | Capability Scope |
| Agent Resource Exhaustion | Per-Agent Rate Limiting |

---

## Compliance Frameworks

AegisGate supports:

| Framework | Coverage |
|-----------|----------|
| MITRE ATLAS | Adversarial AI threat matrix |
| NIST AI RMF | AI risk management |
| OWASP LLM Top 10 | Large language model vulnerabilities |
| ISO 27001 | Information security |
| SOC2 Type II | Security, availability, confidentiality |
| HIPAA | Health information protection |
| GDPR | EU data protection |
| PCI-DSS | Payment card data security |

If a compliance framework returns unregistered, AegisGate fails closed — it reports an error and marks the check as failed, rather than silently passing.

---

## Zero-Trust Architecture

Every request is verified:

```bash
# All traffic is authenticated
curl -H "X-API-Key: your-key" http://localhost:8443/api/v1/scan

# A2A agents must present certificates, signatures, and capabilities
curl -H "X-A2A-Agent-ID: agent-001" \
     -H "A2A-Capability: send_message" \
     -H "A2A-Signature: <hmac-sha256>" \
     http://localhost:8443/api/v1/a2a/message
```

RBAC is enforced on all endpoints. Audit logs record every operation.

---

## Encryption

- **In Transit**: TLS 1.3 for all external connections; mTLS for A2A inter-agent
- **At Rest**: AES-256 encryption for stored data
- **Secrets**: HashiCorp Vault integration for key management
- **Integrity**: HMAC-SHA256 for A2A message authentication