---
title: "API Reference"
description: "AegisGate Security Platform API Reference v4.3.0"
type: docs
---

## API Reference

AegisGate provides a comprehensive REST API for integration with your applications, CI/CD pipelines, and monitoring systems.

### Base URL

```
http://localhost:8443/api/v1
```

### Authentication

All API requests require an API key in the `X-API-Key` header:

```bash
curl -H "X-API-Key: your-api-key" http://localhost:8443/api/v1/status
```

---

## Platform Endpoints

### Health Check

```
GET /health
```

Returns system health status, including dependency checks.

**Response (healthy):**
```json
{
  "status": "healthy",
  "version": "3.5.0",
  "dependencies": {
    "proxy": "up",
    "persistence": "up",
    "license": "up",
    "certificates": "up"
  }
}
```

**Response (degraded) — returns 503:**
```json
{
  "status": "degraded",
  "version": "3.5.0",
  "dependencies": {
    "proxy": "up",
    "persistence": "down",
    "license": "up",
    "certificates": "up"
  }
}
```

The health endpoint verifies proxy, persistence, license manager, and certificate store. If any dependency is unhealthy, the response returns HTTP 503 with `"status": "degraded"`.

### Dashboard Health

```
GET /api/v1/health
```

Extended health check that also verifies scanner and A2A subsystems.

**Response:**
```json
{
  "status": "healthy",
  "version": "3.5.0",
  "dependencies": {
    "proxy": "up",
    "persistence": "up",
    "license": "up",
    "certificates": "up",
    "scanner": "up",
    "a2a": "up"
  }
}
```

### Scan Content

```
POST /v1/scan
```

Scans content for threats, secrets, and PII.

**Request Body:**
```json
{
  "content": "string to scan",
  "options": {
    "scan_secrets": true,
    "scan_pii": true,
    "scan_injection": true
  }
}
```

**Response:**
```json
{
  "threats": [],
  "risk_score": 0,
  "scan_time_ms": 2.1
}
```

### Get Statistics

```
GET /stats
```

Returns platform statistics.

**Response:**
```json
{
  "requests_today": 15420,
  "threats_blocked": 23,
  "avg_latency_ms": 2.44
}
```

### Compliance Report

```
GET /api/v1/compliance
```

Generate compliance report for specified framework.

**Query Parameters:**
- `framework`: MITRE ATLAS, OWASP LLM, NIST AI RMF

### License Status

```
GET /api/v1/license/status
```

Returns current license tier and expiration.

**Response:**
```json
{
  "tier": "developer",
  "valid": true,
  "expires": "2027-01-01T00:00:00Z"
}
```

### SLA Information

```
GET /api/v1/sla
```

Returns SLA definitions and current SLO measurements for your tier.

**Response:**
```json
{
  "tier": "developer",
  "sla": {
    "uptime_target": "99.9%",
    "description": "Developer tier SLA"
  },
  "slos": [
    {
      "name": "api_latency_p99",
      "target": "< 200ms",
      "current": "145ms"
    },
    {
      "name": "threat_detection_accuracy",
      "target": "> 99.5%",
      "current": "99.8%"
    }
  ]
}
```

---

## A2A (Agent-to-Agent) Endpoints

A2A guardrails are enforced on all requests to A2A-enabled routes. Requests must include:

| Header | Required | Purpose |
|--------|----------|---------|
| `X-A2A-Agent-ID` | Yes | Identifies the calling agent |
| `A2A-Capability` | Yes | Declares the capability being exercised |
| `A2A-Signature` | Yes | HMAC-SHA256 of the request body |
| `X-A2A-License-Key` | For paid tiers | License key for tier-gated capabilities |

### A2A Error Response Format

All A2A guardrail violations return a structured JSON response:

```json
{
  "code": "A2A_CAP_DENIED",
  "message": "Agent 'agent-001' does not have capability 'create_artifact'"
}
```

### A2A Error Codes

| Code | HTTP Status | Meaning | Fix |
|------|-------------|---------|-----|
| `A2A_AUTH_FAILED` | 403 | mTLS client certificate authentication failed | Verify the client certificate is valid and trusted |
| `A2A_AUTH_NO_CERT` | 403 | No client certificate was presented | Include a valid mTLS client certificate in the request |
| `A2A_AUTH_MISSING_CN` | 403 | Client certificate has no Common Name (CN) | Regenerate the certificate with a valid CN field |
| `A2A_LICENSE_MISSING` | 403 | No license key provided for a paid-tier capability | Include `X-A2A-License-Key` header, or use Community-tier capabilities only |
| `A2A_LICENSE_INVALID` | 403 | License key is invalid, expired, or wrong tier | Verify the license key at `/api/v1/license/status` |
| `A2A_RATE_LIMITED` | 429 | Agent has exceeded its request rate limit | Reduce request frequency; check `X-RateLimit-Reset` header |
| `A2A_INTEGRITY_MISSING` | 403 | No HMAC signature provided | Include `A2A-Signature` header with HMAC-SHA256 of body |
| `A2A_INTEGRITY_INVALID` | 403 | HMAC signature does not match request body | Verify the shared secret and recompute the HMAC |
| `A2A_INTEGRITY_MALFORMED` | 403 | Signature header could not be decoded | Ensure the signature is valid base64-encoded HMAC-SHA256 |
| `A2A_CAP_MISSING` | 403 | No `A2A-Capability` header provided | Include the capability name in the `A2A-Capability` header |
| `A2A_CAP_DENIED` | 403 | Agent does not have the requested capability | Check the agent's capability map in `a2a_caps.yaml` |
| `A2A_CAP_UNKNOWN_AGENT` | 403 | Agent ID is not registered in the capability map | Register the agent in `a2a_caps.yaml` |
| `A2A_CAP_CHECK_FAILED` | 500 | Internal error during capability lookup | Check server logs; verify `a2a_caps.yaml` is valid YAML |
| `A2A_INTERNAL_ERROR` | 500 | Unexpected internal error (panic recovery) | Check server logs; file a bug report if persistent |

### A2A Rate Limits

Rate limits are per-agent (token bucket):

| Tier | Requests/Minute | Burst |
|------|----------------|-------|
| Community | 30 | 5 |
| Developer | 60 | 10 |
| Professional | 120 | 20 |
| Enterprise | Custom | Custom |

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1746500000
```

---

## General Error Responses

| HTTP Code | Description |
|-----------|-------------|
| 400 | Invalid request body or parameters |
| 401 | Missing or invalid API key |
| 403 | Forbidden — missing A2A headers, invalid license, or capability denied |
| 404 | Endpoint not found |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 503 | Service degraded — one or more dependencies unhealthy |

### Rate Limits

Rate limits depend on your tier. Headers show remaining quota:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1640000000
```