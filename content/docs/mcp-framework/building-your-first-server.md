---
title: "Build Your First Secure MCP Server"
description: "Complete tutorial — build a production-ready MCP server with custom tools, RBAC, policies, and all 22 security layers"
type: docs
weight: 52
---

# Building Your First Secure MCP Server

> **License:** Apache-2.0 &nbsp;|&nbsp; **Version:** 1.4.2 &nbsp;|&nbsp; **Go:** 1.26+ &nbsp;|&nbsp; **Dependencies:** Zero external runtime dependencies

This tutorial walks you through building a complete, production-ready MCP server with AegisGate MCP — from registering custom tools to enrolling agents with RBAC, configuring security policies, and connecting a real MCP client.

**Time to complete:** 15 minutes  
**What you'll build:** A secure MCP server with a custom "weather lookup" tool, RBAC-enrolled agents, policy rules, and all 22 security layers active

---

## Prerequisites

```bash
go version    # 1.26+ required
git --version # any recent version
```

## Step 1: Create Your Project

```bash
mkdir my-secure-mcp && cd my-secure-mcp
go mod init my-secure-mcp
go get github.com/aegisgatesecurity/aegisgate-mcp
```

> **Note:** AegisGate MCP has zero external dependencies. The only `require` directive in your go.mod will be AegisGate MCP itself.

## Step 2: Write the Server

Create `main.go`:

```go
package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	mcp "github.com/aegisgatesecurity/aegisgate-mcp"
)

func main() {
	addr := flag.String("addr", ":8081", "Listen address")
	flag.Parse()

	// 1. Configure the server with secure defaults
	cfg := mcp.DefaultServerConfig()
	cfg.Address = *addr
	cfg.AuthToken = "my-secret-bearer"

	// 2. Create the server
	srv, err := mcp.NewSecuredMCPServer(cfg)
	if err != nil {
		log.Fatalf("failed to create server: %v", err)
	}

	// 3. Register a custom tool: weather lookup
	srv.RegisterTool(mcp.Tool{
		Name:        "get_weather",
		Description: "Get current weather for a city",
		InputSchema: json.RawMessage(`{
			"type": "object",
			"properties": {
				"city": {
					"type": "string",
					"description": "City name, e.g. 'San Francisco'"
				}
			},
			"required": ["city"]
		}`),
	})

	// 4. Register the tool handler
	srv.RegisterToolHandler("get_weather", func(ctx context.Context, params json.RawMessage) (interface{}, error) {
		var args struct {
			City string `json:"city"`
		}
		if err := json.Unmarshal(params, &args); err != nil {
			return nil, fmt.Errorf("invalid params: %w", err)
		}

		// Simulated weather data (replace with real API call)
		return map[string]interface{}{
			"city":        args.City,
			"temperature": "72°F",
			"condition":   "Sunny",
			"humidity":    "45%",
		}, nil
	})

	// 5. Enroll an agent with RBAC permissions
	srv.RegisterAgent(mcp.Agent{
		ID:       "my-assistant",
		MaxTier:  mcp.TierStandard,
		Tools:    []string{"get_weather", "ping", "echo"},
		Policies: []string{"default"},
	})

	// 6. Load default security policies (22 layers)
	srv.LoadDefaultPolicies()

	// 7. Add a custom policy rule
	srv.AddPolicyRule(mcp.PolicyRule{
		Name:     "work-hours-only",
		Priority: 10,
		Action:   mcp.ActionAllow,
		Condition: func(req *mcp.PolicyRequest) bool {
			return true // allow for demo
		},
	})

	// 8. Start the server
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		if err := srv.Start(ctx); err != nil {
			log.Fatalf("server error: %v", err)
		}
	}()

	fmt.Printf("Secure MCP server running on %s\n", *addr)
	fmt.Println("Tools: get_weather, ping, echo")
	fmt.Println("Security: 22 layers active (regex, ML, RBAC, policy, audit)")
	fmt.Println("Press Ctrl+C to stop")

	// Graceful shutdown
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	<-sigCh
	cancel()
	fmt.Println("\nShutting down...")
}
```

## Step 3: Build and Run

```bash
go build -o my-mcp-server .
./my-mcp-server --addr :8081
```

## Step 4: Test with curl (Streamable HTTP)

```bash
curl -s http://localhost:8081/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-06-18","clientInfo":{"name":"test","version":"1.0"}},"id":1}'
```

Response includes `Mcp-Session-Id` header. Use it for subsequent requests:

```bash
curl -s http://localhost:8081/mcp \
  -H "Content-Type: application/json" \
  -H "Mcp-Session-Id: a1b2c3d4e5f6..." \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"get_weather","arguments":{"city":"San Francisco"}},"id":2}'
```

## Step 5: Connect Claude Desktop

```json
{
  "mcpServers": {
    "my-secure-mcp": {
      "command": "/path/to/my-mcp-server",
      "args": ["--addr", ":8081", "--transport", "stdio"]
    }
  }
}
```

## Step 6: Connect Cursor

```bash
./my-mcp-server --addr :8081 --transport http
```

In Cursor Settings → MCP Servers → Add: URL `http://localhost:8081/mcp`

## What's Happening Under the Hood

Every request passes through 22 security layers before reaching your tool handler:

```
Client Request
    ↓
[1] Authentication (Bearer token)
    ↓
[2] Input Scanning — Regex (30 patterns)
    ↓
[3] Input Scanning — ATLAS technique mapping
    ↓
[4] Input Scanning — CharCNN-BiLSTM ML detection
    ↓
[5] Tool Poisoning Detection
    ↓
[6] RBAC — Is this agent allowed to call this tool?
    ↓
[7] Policy Engine — Custom rules
    ↓
[8] Tool Handler executes
    ↓
[9] Response Scanning — PII/secret redaction
    ↓
[10] Audit Logging — Full request/response recorded
    ↓
Client Response
```

If any layer blocks the request, the tool handler never executes.

## Next Steps

- **Add more tools**: Call `srv.RegisterTool()` and `srv.RegisterToolHandler()` for each new tool
- **Add RBAC tiers**: Use `mcp.TierRestricted`, `mcp.TierStandard`, `mcp.TierElevated`
- **Enable TLS**: See the [GitHub how-to guides](https://github.com/aegisgatesecurity/aegisgate-mcp/blob/main/docs/how-to-guides.md)
- **Deploy with Docker**: See the [Deployment Guide](/docs/mcp-framework/deployment/)