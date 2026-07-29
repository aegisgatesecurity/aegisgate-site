---
title: "Quick Reference"
description: "AegisGate Security Platform quick reference guide"
type: docs
---

## Quick Reference

Essential commands and configuration for AegisGate.

### Common Commands

```bash
# Start AegisGate
docker run -d -p 8080:8080 -p 8081:8081 -p 8443:8443 ghcr.io/aegisgatesecurity/aegisgate-platform:latest

# Check health
curl http://localhost:8443/health

# Scan content
curl -X POST http://localhost:8443/v1/scan -d '{"content": "test"}'

# View stats
curl http://localhost:8443/stats

# Get version
curl http://localhost:8443/version
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AEGIS_LICENSE` | community | License tier |
| `AEGIS_LOG_LEVEL` | info | Log verbosity |
| `AEGIS_PROXY_PORT` | 8080 | HTTP proxy port |
| `AEGIS_MCP_PORT` | 8081 | MCP server port |
| `AEGIS_DASHBOARD_PORT` | 8443 | Dashboard port |
| `AEGIS_RATE_LIMIT` | 1000 | Requests per minute |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | System health |
| `GET` | `/stats` | Platform statistics |
| `GET` | `/version` | Version info |
| `POST` | `/v1/scan` | Scan content |
| `GET` | `/api/v1/config` | Current configuration |
| `POST` | `/api/v1/compliance` | Generate compliance report |

### Port Reference

| Port | Service | Protocol |
|------|---------|----------|
| 8080 | HTTP Proxy | HTTP |
| 8081 | MCP Server | HTTP/gRPC |
| 8443 | Dashboard/API | HTTPS |

### Detection Patterns

- 153+ threat signatures
- Real-time pattern matching
- Configurable severity levels

### Compliance Frameworks

MITRE ATLAS • OWASP LLM • NIST AI RMF • ISO 27001 • SOC2 • HIPAA • GDPR • PCI-DSS