---
title: "We Needed a Secure MCP Server. There Wasn't One. So We Built One."
slug: we-needed-a-secure-mcp-server-there-wasnt-one-so-we-built-one
description: "The Model Context Protocol is the future of AI tool integration — and it ships with zero security. We audited the ecosystem, found nothing that met the bar, and built AegisGate MCP: 22 security layers, zero dependencies, now in the official MCP Registry."
date: 2026-10-08
author: Josh Colvin
tags:
  - mcp
  - model-context-protocol
  - ai-security
  - prompt-injection
  - tool-poisoning
  - open-source
  - release
---

The Model Context Protocol (MCP) is becoming the standard way AI models interact with external tools, data sources, and services. Claude Desktop uses it. Cursor uses it. Windsurf uses it. The protocol is well-designed, actively developed, and gaining adoption.

It also ships with zero security.

MCP servers execute tool calls, access resources, and broker interactions between AI models and your infrastructure. The official SDK provides the protocol plumbing — transport handling, message routing, session management. What it doesn't provide is any detection or prevention of the attacks that target those interactions.

Prompt injection. Tool poisoning. Data exfiltration. System prompt extraction. These aren't theoretical — they're the same attack classes we've been blocking at the HTTP API layer for months. But in the MCP ecosystem, nobody was blocking them.

We looked for a solution. We evaluated every Go MCP framework we could find. None of them had security layers. None of them had threat detection. None of them had so much as a regex scanner for known prompt injection patterns.

So we built one.

---

## The Challenge

The requirement was simple: **an MCP server framework that treats security as a first-class concern, not an afterthought.**

The constraints were harder:

1. **Zero external dependencies.** No `require` directives in `go.mod`. Not one. The entire ML inference pipeline — ONNX Runtime shared libraries, the neural network model, the Go bindings — is vendored. You can clone the repo and build on an air-gapped machine with no network access. This is non-negotiable for our deployment model, and it's a legitimate differentiator in an ecosystem where "zero dependencies" usually means "only 47 transitive dependencies."

2. **Real threat detection, not stubs.** We've seen MCP frameworks that implement `resources/subscribe` as a no-op that returns success. That's worse than not implementing it — it's dishonest. Every capability we claim is backed by working code and test coverage.

3. **Protocol compliance with honest documentation.** If we don't implement SSE streaming yet, we say so. If we killed fake subscribe stubs, we document that they return `method not found`. The README describes what the code actually does, not what we hope it will do someday.

4. **Enterprise-grade supply chain.** Cosign-signed releases. SBOM. Gitleaks, TruffleHog, Gosec, Govulncheck, Trivy, OPSEC pre-commit hooks. 17-check CI pipeline. This is the same CI standard we hold the Platform to — because it's the same security posture.

---

## What We Built

AegisGate MCP is a standalone MCP server framework with 22 security layers across 8 detection categories:

| Category | What It Does |
|----------|-------------|
| **L1 — Regex Scanner** | 30 patterns covering OWASP LLM Top 10, prompt injection, SSTI, XSS, data exfiltration, system prompt extraction |
| **L2 — ATLAS/Compliance** | MITRE ATLAS technique mapping, compliance violation detection (GDPR/HIPAA/PCI) |
| **L3 — CharCNN-BiLSTM Neural Net** | ~1.6M parameter ONNX model for adversarial prompt injection detection — catches what regex can't |
| **Tool Poisoning Detection** | Identifies malicious tool definitions designed to manipulate model behavior |
| **RBAC** | Role-based access control for tool execution |
| **Policy Engine** | Configurable allow/deny rules per tool, per role, per request |
| **Audit Logging** | Every request, every decision, every detection — logged and queryable |
| **Response Scanning** | Inspects model responses for PII leakage, secret exposure, and injected content |

Each category contains multiple individual layers — the full breakdown is in the [README](https://github.com/aegisgatesecurity/aegisgate-mcp#security-layers).

Plus: session management with 256-bit IDs and 30-minute expiry, SSE streaming via `Accept: text/event-stream` content negotiation, and full Streamable HTTP transport with `Mcp-Session-Id` headers.

### The Numbers

| Metric | Value |
|--------|-------|
| Tests | 412 |
| Coverage | 91.3% |
| External dependencies | 0 |
| CI checks | 17 |
| Signed release assets | 12 per release |
| Protocol version | MCP 2025-06-18 |
| Go version | 1.26.6 |
| License | Apache 2.0 |

---

## Building It Right

During development we made three commitments to ourselves about how this code would ship:

**1. Comments match code.** When SSE wasn't implemented yet, the transport comments said "request/response mode only" — not "SSE supported." When we added SSE in v1.3.0, we updated the comments to reflect that. Documentation should describe what the code does, not what we hope it will do.

**2. No stub capabilities.** `resources/subscribe` and `resources/unsubscribe` aren't implemented yet. Instead of shipping no-op handlers that return success, they return `method not found` (-32601). If a capability doesn't exist, the server says so. Building on a framework means trusting its capability claims — and that trust has to be earned.

**3. Session management from day one.** The Streamable HTTP transport implements `Mcp-Session-Id` with 256-bit crypto-random session IDs, 30-minute idle expiry, `DELETE` for termination, and `404` for invalid sessions. The spec requires it. We implemented it.

This is a security product. If the documentation doesn't match the code, someone will build on it assuming capabilities that don't exist. That's how security gaps become security incidents.

---

## Now in the Official MCP Registry

AegisGate MCP is now listed in the [official MCP Registry](https://registry.modelcontextprotocol.io) — the same registry that Claude Desktop, Cursor, and other MCP clients query to discover and install servers.

```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=aegisgate"
```

You'll find us at `io.github.aegisgatesecurity/aegisgate-mcp`, version 1.4.0, with the OCI package at `ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.0`.

This means any MCP client that supports registry-based discovery can now find and install AegisGate MCP. That's the first real distribution channel — and it's the official one.

---

## Quick Start

```bash
# Pull the Docker image
docker pull ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.0

# Run it
docker run -p 8081:8081 ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.0

# Or build from source (zero external deps, air-gapped compatible)
git clone https://github.com/aegisgatesecurity/aegisgate-mcp.git
cd aegisgate-mcp
make build
./mcp-server --transport streamable-http --addr :8081
```

The server speaks MCP 2025-06-18 over Streamable HTTP at `/mcp`, with SSE streaming for clients that send `Accept: text/event-stream`.

---

## What's Honest

We're not claiming we've "solved" MCP security. Here's what we haven't done yet:

- **SSE is single-event, not long-lived streaming.** Each request gets one response and the connection closes. True server-initiated streaming (progress updates, multi-event notifications) is P2 on the roadmap.
- **No `resources/templates/list`.** The spec defines it. We don't implement it yet. P4.
- **No `resources/subscribe`.** Removed until we have a real implementation. P3 on the roadmap.
- **No server-initiated `notifications/*_list_changed`.** P2.

We could have left the subscribe stubs in and claimed "full resources support." We didn't. The code says what it does. The README says what the code does. The tests prove it.

---

## Why This Matters

The MCP ecosystem is growing fast. Every week, new servers appear — database connectors, file system bridges, code execution tools, API proxies. Each one is a new attack surface. Each one runs with access to your data, your tools, and your infrastructure.

The official SDK gives you the protocol. It doesn't give you a firewall.

AegisGate MCP is that firewall. 22 layers of detection. Zero dependencies. Signed releases. 412 tests. Now discoverable in the official registry.

The challenge was presented: secure MCP servers don't exist. We built one.

---

**[AegisGate MCP](https://github.com/aegisgatesecurity/aegisgate-mcp)** — Open-source MCP server framework with 22 security layers. Zero dependencies. Apache 2.0.

**[MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers?search=aegisgate)** | **[GitHub](https://github.com/aegisgatesecurity/aegisgate-mcp)** | **[Docker](https://github.com/aegisgatesecurity/aegisgate-mcp/pkgs/container/aegisgate-mcp)**

**Secure Every AI Interaction.**

---

*Josh Colvin is the founder of [AegisGate Security](https://aegisgatesecurity.io), building open-source, self-hosted AI security. Apache 2.0. No telemetry. No data egress. [GitHub](https://github.com/aegisgatesecurity).*