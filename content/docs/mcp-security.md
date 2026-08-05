---
title: MCP Protocol Security
description: AegisGate security enforcement for the Model Context Protocol (MCP) — prompt injection prevention, tool validation, and response filtering for MCP-connected AI systems.
weight: 210
---

## MCP Protocol Security

AegisGate provides comprehensive security enforcement for the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), the standard protocol for AI model-tool interaction.

### Threat Landscape

MCP enables AI models to invoke external tools, retrieve context, and interact with APIs. This creates several attack vectors:

- **Prompt injection via tool results**: Malicious tool responses can inject instructions into the AI's context window
- **Tool poisoning**: Adversarial tool definitions that manipulate model behavior
- **Cross-server request smuggling**: Attacks that tunnel through MCP server-to-server communication
- **Token limit abuse**: Tools that return oversized responses to exhaust context windows

### AegisGate Enforcement

| Layer | Protection | Detection Rate |
|-------|-----------|----------------|
| Request screening | Prompt injection detection | 100% (adversarial suite) |
| Tool validation | Schema enforcement, parameter sanitization | 42 attack patterns |
| Response filtering | Output classification, PII redaction | 87%+ coverage |
| Rate limiting | Per-server, per-tool, per-client | Configurable |
| Audit logging | Full MCP session recording | ATLAS-mapped |

### Configuration

```yaml
mcp:
  enabled: true
  screening:
    prompt_injection: block
    tool_poisoning: block
    token_abuse: warn
  response:
    filter_pii: true
    max_response_tokens: 4096
```

_For general security architecture, see [Security Overview](/docs/security/)._
