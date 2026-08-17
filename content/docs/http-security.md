---
title: HTTP API Security
description: AegisGate security enforcement for HTTP/REST API interactions — request screening, response filtering, and rate limiting for AI-powered applications.
weight: 200
---

## HTTP API Security

AegisGate provides comprehensive security enforcement for HTTP/REST API interactions with AI systems.

### Threat Landscape

HTTP APIs are the most common interface for AI model access, exposing several attack vectors:

- **Prompt injection**: Malicious instructions embedded in API requests
- **Data exfiltration**: Sensitive data extraction through crafted prompts
- **Denial of service**: Token exhaustion, context flooding, and resource abuse
- **Adversarial inputs**: Carefully crafted inputs designed to bypass safety controls

### AegisGate Enforcement

| Layer | Protection | Detection Rate |
|-------|-----------|----------------|
| Request screening | Prompt injection, jailbreak detection | 100% (adversarial suite) |
| Response filtering | PII redaction, content classification | 83.1% coverage |
| Rate limiting | Per-IP, per-API-key, per-endpoint | Configurable |
| Audit logging | Full request/response recording | ATLAS-mapped |

### Configuration

```yaml
http:
  screening:
    enabled: true
    prompt_injection: block
    jailbreak: block
  response:
    filter_pii: true
    redact_patterns: [ssn, credit_card, email, phone]
  rate_limit:
    requests_per_minute: 60
    burst: 100
```

_For general security architecture, see [Security Overview](/docs/security/)._
