---
title: "AegisGate MCP — Secure MCP Server Framework"
description: "Free, open-source MCP server framework with 22 security layers. Zero external dependencies. Apache 2.0. Protect AI agents from prompt injection, tool poisoning, and malicious tool calls."
type: "landing"
---

<!-- ============================================================
     MCP STANDALONE SERVER FRAMEWORK
     ============================================================ -->

> **🛡️ AegisGate MCP v1.4.1 is LIVE** — 22 security layers, Streamable HTTP transport with SSE streaming, server-initiated notifications, resource subscriptions, resource templates, tool poisoning detection, ML threat detection, zero dependencies. [View on GitHub](https://github.com/aegisgatesecurity/aegisgate-mcp) (free, open source, Apache 2.0).

<div class="alert alert-success alert-center">
<strong>🛡️ AegisGate MCP</strong> is a <strong>free, open-source MCP server framework</strong> built for security-first AI agent deployments.
22 layers of defense, zero external dependencies, signed releases.
<br><br>
<a href="https://github.com/aegisgatesecurity/aegisgate-mcp" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on GitHub →</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-mcp/releases/tag/v1.4.1" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Download v1.4.1 →</a>
</div>

---

## What Is AegisGate MCP?

AegisGate MCP is a standalone MCP server framework that applies **22 security layers** to every JSON-RPC request — from prompt injection detection to tool poisoning prevention to response scanning. It's the security-hardened alternative to the official MCP SDKs, designed for teams that can't afford to treat MCP security as an afterthought.

- **Protocol:** MCP 2025-06-18
- **Language:** Go 1.26.6
- **License:** Apache 2.0
- **Dependencies:** Zero (no `require` directives in go.mod)

## 22 Security Layers

| # | Layer | What It Does |
|---|-------|-------------|
| 1 | Regex Pattern Matching | 30 patterns detect known injection vectors |
| 2 | ATLAS Compliance | Maps to ATLAS threat framework |
| 3 | Neural ML Detection | CharCNN-BiLSTM v13 model, 94.2% accuracy |
| 4 | Tool Poisoning Detection | Scans tool descriptions and schemas at registration |
| 5 | RBAC | Role-based access control per tool |
| 6 | Policy Engine | Configurable allow/deny rules |
| 7 | Audit Logging | Full session recording, ATLAS-mapped |
| 8 | Response Scanning | Scans tool outputs before returning to client |
| 9 | Rate Limiting | Per-session, per-tool, per-client |
| 10 | Session Management | 256-bit session IDs, 30-min expiry |
| 11-22 | Additional layers | Signature verification, guardrails, chain analysis, and more |

## Transports

| Mode | Flag | Description |
|------|------|-------------|
| TCP | `--transport tcp` (default) | TCP listener, supports TLS/mTLS |
| stdio | `--transport stdio` | Standard MCP stdin/stdout for local clients |
| HTTP | `--transport http` | Streamable HTTP (MCP 2025-06-18) with `Mcp-Session-Id` session management and SSE streaming |

## Quick Start

```bash
# Download signed binary
wget https://github.com/aegisgatesecurity/aegisgate-mcp/releases/download/v1.4.1/mcp-server-linux-amd64
chmod +x mcp-server-linux-amd64

# Run with demo tools
./mcp-server-linux-amd64 --demo --addr :8081

# Or use Docker
docker run -p 8081:8081 ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.1
```

## Use as a Go Library

```go
import "github.com/aegisgatesecurity/aegisgate-mcp"

srv, _ := mcpsecurity.NewSecuredMCPServer(cfg)
srv.RegisterTool("my-tool", "Description", 10, inputSchema, handler)
srv.RegisterResource("file:///data", "Data", "Data resource", "application/json", resourceHandler)
srv.RegisterPrompt("greeting", "Greeting prompt", promptHandler)
srv.Start(ctx)
```

## Supply Chain Integrity

Every release includes 12 Cosign-signed assets:
- 4 binaries (Lite+ML × amd64+arm64)
- 4 SHA256 checksums
- 4 Cosign bundles (Sigstore/Fulcio/Rekor)
- SBOM attestation on container images

## Comparison

| Feature | AegisGate MCP | Official MCP SDK | mcpgate | mcp-shield |
|---------|--------------|-----------------|---------|------------|
| Security layers | 22 | 0 | ~5 | ~3 |
| Tool poisoning detection | ✅ | ❌ | ❌ | ❌ |
| ML threat detection | ✅ | ❌ | ❌ | ❌ |
| SSE streaming | ✅ | ❌ | ❌ | ❌ |
| External dependencies | 0 | Many | Many | Many |
| Supply chain signing | ✅ Cosign | ❌ | ❌ | ❌ |
| Protocol version | 2025-06-18 | 2025-06-18 | 2024-11-05 | 2024-11-05 |

See [full comparison](https://github.com/aegisgatesecurity/aegisgate-mcp/blob/main/docs/comparison.md) and [OWASP MCP Top 10 mapping](https://github.com/aegisgatesecurity/aegisgate-mcp/blob/main/docs/owasp-mcp-top-10.md).

## When to Upgrade to Platform

AegisGate MCP is free and standalone. When you need enterprise scale (unlimited ML inference, OAuth/SAML/SSO, SIEM integration, 31 compliance frameworks, multi-protocol support), upgrade to [AegisGate Platform](/platform).

| Need | AegisGate MCP (free) | AegisGate Platform |
|------|---------------------|-------------------|
| Secure MCP server | ✅ 22 layers | ✅ Embedded |
| ML threat detection | ✅ 100 inf/min | ✅ Unlimited |
| OAuth/SAML/SSO | ❌ Bearer tokens | ✅ Full SSO |
| SIEM integration | ❌ File + Prometheus | ✅ 11 platforms |
| Compliance | ❌ | ✅ 31 frameworks |
| Scale | 250 connections | Unlimited |