---
title: "MCP Getting Started"
description: "Install, run, and test AegisGate MCP — the security-first MCP server framework with 22 security layers and zero dependencies"
type: docs
weight: 51
---

# Getting Started with AegisGate MCP

> **License:** Apache-2.0 &nbsp;|&nbsp; **Version:** 1.4.1 &nbsp;|&nbsp; **Go:** 1.26+ &nbsp;|&nbsp; **Dependencies:** Zero external runtime dependencies

AegisGate MCP is a security-first Model Context Protocol (MCP) server designed for secure AI agent tool use across any environment. It provides tool execution, role-based access control (RBAC), policy enforcement, audit logging, and neural threat detection out of the box — all in a single Go binary with zero external module dependencies.

---

## Prerequisites

| Requirement | Minimum Version | Notes |
|---|---|---|
| **Go** | 1.26 | Required for building from source or using as a module dependency |
| **Git** | any recent version | Required for cloning the repository |
| **Docker** *(optional)* | any recent version | Only needed for containerized deployment |

```bash
go version    # should print go1.26 or later
git --version
docker --version   # optional
```

---

## Installation

### From Source

```bash
git clone https://github.com/aegisgatesecurity/aegisgate-mcp.git
cd aegisgate-mcp
go build -o mcp-server ./cmd/mcp-server
```

> **Note:** The project has zero external module dependencies — all third-party code (ONNX Runtime, Unicode normalization) is vendored. No `go mod download` step is needed.

### Docker

```bash
# Full ML-enabled build (~135 MB)
docker build -t aegisgate-mcp .
docker run -p 8081:8081 aegisgate-mcp --demo

# Heuristic-only build (~8 MB, no ONNX)
docker build --build-arg CGO_ENABLED=0 -t aegisgate-mcp:lite .
```

### As a Go Module Dependency

```bash
go get github.com/aegisgatesecurity/aegisgate-mcp
```

---

## First Run

### 1. Start the Server (TCP Mode)

```bash
./mcp-server --demo
```

This starts the server on **`127.0.0.1:8081`** in TCP mode with three demo tools:

| Tool | Description | Required Parameters |
|---|---|---|
| `ping` | Returns `"pong"` | none |
| `system_info` | Returns basic system information | none |
| `echo` | Echoes back a provided message | `message` (string) |

### 2. Verify It Works

```bash
echo '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","clientInfo":{"name":"test","version":"1.0"}},"id":1}' | nc 127.0.0.1 8081
```

**Expected response:**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "protocolVersion": "2024-11-05",
    "serverInfo": {
      "name": "aegisgate-mcp",
      "version": "1.4.1"
    },
    "capabilities": {
      "tools": {}
    }
  },
  "id": 1
}
```

### 3. List Available Tools

```bash
echo '{"jsonrpc":"2.0","method":"tools/list","id":2}' | nc 127.0.0.1 8081
```

### 4. Call a Tool

```bash
echo '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"ping","arguments":{}},"id":3}' | nc 127.0.0.1 8081
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [{"type": "text", "text": "pong"}]
  },
  "id": 3
}
```

---

## stdio Mode (Claude Desktop)

```bash
./mcp-server --transport stdio --demo
```

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aegisgate-mcp": {
      "command": "/path/to/mcp-server",
      "args": ["--transport", "stdio", "--demo"]
    }
  }
}
```

---

## Streamable HTTP Mode (Cursor)

```bash
./mcp-server --transport http --demo --addr :8081
```

The server accepts MCP requests at `http://localhost:8081/mcp` with SSE streaming and Mcp-Session-Id session management. See the [Cursor Integration guide](/docs/mcp-framework/integrating-with-cursor/) for details.

---

## With Authentication

```bash
./mcp-server --demo --token my-secret-bearer
```

Clients must include the token in the `initialize` request's `params.auth` field.

---

## Health Check

```bash
./mcp-server --demo --health-addr :8082
```

| Endpoint | Purpose |
|----------|---------|
| `GET /healthz` | Liveness probe |
| `GET /readyz` | Readiness probe |
| `GET /stats` | Runtime statistics |

---

## Command-Line Flags

| Flag | Description | Default |
|---|---|---|
| `--demo` | Start with 3 built-in demo tools and no auth | `false` |
| `--transport` | Transport mode: `tcp`, `stdio`, or `http` (Streamable HTTP) | `tcp` |
| `--addr` | TCP listen address | `:8081` |
| `--max-connections` | Max concurrent TCP connections (-1 = unlimited) | `1000` |
| `--token` | Bearer token for authentication *(optional)* | none |
| `--health-addr` | HTTP health-check listener address *(optional)* | none |

---

## Next Steps

| Guide | What You'll Learn |
|---|---|
| [Build Your First Server](/docs/mcp-framework/building-your-first-server/) | Complete tutorial with custom tools, RBAC, and policies |
| [Cursor Integration](/docs/mcp-framework/integrating-with-cursor/) | Streamable HTTP transport with SSE and sessions |
| [Deployment Guide](/docs/mcp-framework/deployment/) | Docker, TLS, and production hardening |
| [GitHub Docs](https://github.com/aegisgatesecurity/aegisgate-mcp/tree/main/docs) | Full documentation including how-to guides, admin guide, and more |