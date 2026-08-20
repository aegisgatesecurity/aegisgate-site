---
title: "Documentation"
description: "Learn how to deploy, configure, and use AegisGate Security Platform"
type: "docs"
---

# Documentation

## Getting Started

Welcome to the AegisGate Security Platform documentation. Here you'll find everything you need to deploy, configure, and use AegisGate Security Platform.

---

## Quick Start

### Docker (Recommended)

```bash
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  -p 9000:9000 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.1.0
```

### Verify Installation

```bash
curl http://localhost:8443/health
```

Expected response:
```json
{"status":"healthy","version":"3.6.2","services":{"proxy":"up","mcp":"up","scanner":"up","a2a":"up","trust":"up"}}
```

---

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AEGIS_LICENSE` | License key | Community |
| `AEGIS_LOG_LEVEL` | Log verbosity | info |
| `AEGIS_PROXY_PORT` | HTTP proxy port | 8080 |
| `AEGIS_MCP_PORT` | MCP server port | 8081 |
| `AEGIS_DASHBOARD_PORT` | Dashboard port | 8443 |
| `AEGIS_RATE_LIMIT` | Requests per minute | 1000 |



## API Reference

### Health Check

```
GET /health
```

Returns system status.

### Proxy Endpoints

```
POST /v1/scan
```

Scans content for threats.

---

## Next Steps

- [Detection Coverage Matrix](/docs/detection-coverage/) - Per-category detection rates and evasion resistance scores
- [Graceful Degradation](/docs/graceful-degradation/) - How AegisGate maintains security when ML is unavailable
- [Technical Details](/tech/) - Deep dive into architecture
- [Blog](/blog/) - Security research and updates
