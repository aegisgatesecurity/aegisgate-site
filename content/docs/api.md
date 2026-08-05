---
title: API Reference
description: Complete AegisGate Platform API reference — endpoints, authentication, request/response schemas, rate limits, and error codes for the HTTP, MCP, A2A, and RESPONSE protocols.
weight: 400
---

## AegisGate API Reference

The AegisGate Platform exposes a comprehensive REST API for security enforcement, configuration, and monitoring.

### Base URL

```
https://your-gateway.example.com/api/v1
```

### Authentication

All API requests require a valid API key via the `X-API-Key` header or Bearer token via the `Authorization` header.

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-gateway.example.com/api/v1/screen
```

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/screen` | POST | Screen a prompt for security threats |
| `/api/v1/screen/response` | POST | Screen an AI response |
| `/api/v1/config` | GET | Get current configuration |
| `/api/v1/config` | PUT | Update configuration |
| `/api/v1/health` | GET | Health check |
| `/api/v1/metrics` | GET | Prometheus metrics |
| `/api/v1/audit` | GET | Query audit log |

### Rate Limits

| Tier | Requests/minute | Burst |
|------|----------------|-------|
| Community | 60 | 100 |
| Professional | 600 | 1,000 |
| Enterprise | Unlimited | Unlimited |

_For the complete API documentation with all endpoints, schemas, and examples, see [API Reference (Full)](/docs/api-reference/)._
