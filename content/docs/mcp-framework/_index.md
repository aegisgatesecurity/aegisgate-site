---
title: "MCP Framework"
description: "Documentation for AegisGate MCP — the open-source, security-first MCP server framework with 22 security layers"
type: docs
weight: 50
---

# AegisGate MCP Framework

AegisGate MCP is a free, open-source MCP server framework with 22 security layers, zero external dependencies, and SSE streaming. Apache 2.0 licensed.

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](/docs/mcp-framework/getting-started/) | Installation, first run, and basic configuration |
| [Build Your First Server](/docs/mcp-framework/building-your-first-server/) | Complete tutorial: custom tools, RBAC, policies, client connections |
| [Cursor Integration](/docs/mcp-framework/integrating-with-cursor/) | Connect Cursor via Streamable HTTP with SSE and session management |
| [Deployment Guide](/docs/mcp-framework/deployment/) | Docker, TLS, air-gapped setups, and production hardening |

## Quick Start

```bash
git clone https://github.com/aegisgatesecurity/aegisgate-mcp.git
cd aegisgate-mcp
go build -o mcp-server ./cmd/mcp-server
./mcp-server --demo
```

Or via Docker:

```bash
docker pull ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.1
docker run -p 8081:8081 ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.1 --demo
```

## Links

- **GitHub:** [aegisgatesecurity/aegisgate-mcp](https://github.com/aegisgatesecurity/aegisgate-mcp)
- **MCP Registry:** `io.github.aegisgatesecurity/aegisgate-mcp`
- **Latest Release:** [v1.4.1](https://github.com/aegisgatesecurity/aegisgate-mcp/releases/tag/v1.4.1)
- **License:** Apache 2.0