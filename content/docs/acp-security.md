---
title: ACP Protocol Security
description: AegisGate security enforcement for the Agent Communication Protocol (ACP) — protecting inter-agent messaging, capability negotiation, and trust establishment.
weight: 230
---

## ACP Protocol Security

AegisGate enforces security for the Agent Communication Protocol (ACP), protecting agent messaging and capability negotiation.

### Threat Landscape

ACP enables structured agent-to-agent communication with capability negotiation:

- **Capability spoofing**: Agents claiming capabilities they don't possess
- **Message tampering**: Modification of inter-agent messages in transit
- **Replay attacks**: Replaying legitimate ACP messages to trigger unauthorized actions
- **Trust chain attacks**: Exploiting trust relationships between communicating agents

### AegisGate Enforcement

| Layer | Protection | Detection Rate |
|-------|-----------|----------------|
| Capability verification | Signed capability assertions | Full verification |
| Message integrity | HMAC validation, replay detection | 100% (adversarial suite) |
| Trust establishment | Certificate-based agent identity | Configurable |
| Rate limiting | Per-agent, per-protocol | Configurable |

### Configuration

```yaml
acp:
  enabled: true
  verification:
    require_signed_capabilities: true
    verify_message_integrity: true
  trust:
    min_trust_level: verified
    reject_unverified_agents: true
```

_For general security architecture, see [Security Overview](/docs/security/)._
