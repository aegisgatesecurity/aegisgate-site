---
title: "AegisGate MCP — Secure MCP Server Framework"
description: "Free, open-source MCP server framework with 23 security layers. Zero external dependencies. Apache 2.0. Protect AI agents from prompt injection, tool poisoning, and malicious tool calls."
type: "landing"
---

<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>


<!-- ============================================================
     MCP STANDALONE SERVER FRAMEWORK
     ============================================================ -->

> **🛡️ AegisGate MCP v1.8.0 is LIVE** — 23 security layers, Streamable HTTP transport with SSE streaming, server-initiated notifications, resource subscriptions, resource templates, tool poisoning detection, zero dependencies. (ML threat detection withdrawn 2026-11-23.) [View on GitHub](https://github.com/aegisgatesecurity/aegisgate-mcp) (free, open source, Apache 2.0).

<div class="alert alert-success alert-center">
<strong>🛡️ AegisGate MCP</strong> is a <strong>free, open-source MCP server framework</strong> built for security-first AI agent deployments.
23 layers of defense, zero external dependencies, signed releases.
<br><br>
<a href="https://github.com/aegisgatesecurity/aegisgate-mcp" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on GitHub →</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-mcp/releases/tag/v1.8.0" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Download v1.8.0 →</a>
</div>

---

## What Is AegisGate MCP?

AegisGate MCP is a standalone MCP server framework that applies **23 security layers** to every JSON-RPC request — from prompt injection detection to tool poisoning prevention to response scanning. It's the security-hardened alternative to the official MCP SDKs, designed for teams that can't afford to treat MCP security as an afterthought.

- **Protocol:** MCP 2025-06-18
- **Language:** Go 1.26.9
- **License:** Apache 2.0
> **Patent Pending** (8 U.S. provisional applications). Published research on [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7652138).
- **Dependencies:** Zero (no `require` directives in go.mod)

## 23 Security Layers

| # | Layer | What It Does |
|---|-------|-------------|
| 1 | Regex Pattern Matching | 132 patterns detect known injection vectors |
| 2 | ATLAS Compliance | Maps to ATLAS threat framework |
| 3 | ~~Neural ML Detection~~ | **Withdrawn 2026-11-23** — corpus label audit failure; deterministic layers remain |
| 4 | Tool Poisoning Detection | Scans tool descriptions and schemas at registration |
| 5 | RBAC | Role-based access control per tool |
| 6 | Policy Engine | Configurable allow/deny rules |
| 7 | Audit Logging | Full session recording, ATLAS-mapped |
| 8 | Response Scanning | Scans tool outputs before returning to client |
| 9 | Rate Limiting | Per-session, per-tool, per-client |
| 10 | Session Management | 256-bit session IDs, 30-min expiry |
| 11-23 | Additional layers | Signature verification, guardrails, chain analysis, evasion detection (L2.5), elicitation support, and more |

## Transports

| Mode | Flag | Description |
|------|------|-------------|
| TCP | `--transport tcp` (default) | TCP listener, supports TLS/mTLS |
| stdio | `--transport stdio` | Standard MCP stdin/stdout for local clients |
| HTTP | `--transport http` | Streamable HTTP (MCP 2025-06-18) with `Mcp-Session-Id` session management and SSE streaming |

## What's New in v1.8.0

- **Pattern Expansion (30→91)** — 61 new regex patterns across prompt injection, PII, secrets, compliance, and OWASP 2025 categories
- **Tool Code Scanner** — Scans MCP tool definitions for dangerous functions, injection vectors, and suspicious patterns at registration time
- **Platform Forwarder** — Forwards security events to AegisGate Platform for centralized telemetry and SIEM integration
- **Evasion Detection (L2.5)** — 15 regex patterns detecting encoding, splitting, obfuscation, and semantic evasion
- **Elicitation Support** — Server-asks-client across all 3 transports via `elicitation/create`
- **Per-Tool Rate Limiting** — `MaxCallsPerToolPerSession` with per-tool overrides
- **SSE Reconnection** — `Last-Event-ID` header with ring buffer replay
- **643 tests** (611 unit/integration + 32 load/stress), 14 benchmarks, 3 fuzz targets, 92.0% coverage
- **Race detector clean** — CI runs `go test -race` on every PR

## Quick Start

```bash
# Download signed binary
wget https://github.com/aegisgatesecurity/aegisgate-mcp/releases/download/v1.8.0/mcp-server-linux-amd64
chmod +x mcp-server-linux-amd64

# Run with demo tools
./mcp-server-linux-amd64 --demo --addr :8081

# Or use Docker
docker run -p 8081:8081 ghcr.io/aegisgatesecurity/aegisgate-mcp:1.5.1
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

Every release includes Cosign-signed assets (ML binary variants withdrawn 2026-11-23):
- Binaries for amd64 and arm64 (ML variants withdrawn 2026-11-23; see the releases page for current assets)
- 4 SHA256 checksums
- 4 Cosign bundles (Sigstore/Fulcio/Rekor)
- SBOM attestation on container images

## Comparison

| Feature | AegisGate MCP | Official MCP SDK | mcpgate | mcp-shield |
|---------|--------------|-----------------|---------|------------|
| Security layers | 23 | 0 | ~5 | ~3 |
| Tool poisoning detection | ✅ | ❌ | ❌ | ❌ |
| ML threat detection | Withdrawn 2026-11-23 | ❌ | ❌ | ❌ |
| SSE streaming | ✅ | ❌ | ❌ | ❌ |
| External dependencies | 0 | Many | Many | Many |
| Supply chain signing | ✅ Cosign | ❌ | ❌ | ❌ |
| Protocol version | 2025-06-18 | 2025-06-18 | 2024-11-05 | 2024-11-05 |

See [full comparison](https://github.com/aegisgatesecurity/aegisgate-mcp/blob/main/docs/comparison.md) and [OWASP MCP Top 10 mapping](https://github.com/aegisgatesecurity/aegisgate-mcp/blob/main/docs/owasp-mcp-top-10.md).

## When to Upgrade to Platform

AegisGate MCP is free and standalone. When you need broader coverage (OAuth/SAML/SSO, SIEM integration, 31 compliance frameworks, multi-protocol support), see [AegisGate Platform](/platform).

| Need | AegisGate MCP (free) | AegisGate Platform |
|------|---------------------|-------------------|
| Secure MCP server | ✅ 23 layers | ✅ Embedded |
| ML threat detection | Withdrawn 2026-11-23 | Withdrawn 2026-11-23 |
| OAuth/SAML/SSO | ❌ Bearer tokens | ✅ Full SSO |
| SIEM integration | ❌ File + Prometheus | ✅ 11 platforms |
| Compliance | ❌ | ✅ 31 frameworks |
| Scale | 250 connections | Unlimited |