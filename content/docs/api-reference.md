---
title: "API Reference"
description: "AegisGate Security Platform API Reference v4.5.0 — all REST endpoints for health, scanning, compliance, trust, DSAR, legal hold, A/B testing, SIEM, and SOAR."
weight: 100
---

## API Reference — v4.5.0

AegisGate provides a comprehensive REST API for integration with your applications, CI/CD pipelines, and monitoring systems.

### Base URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Proxy** | `https://aegisgate.yourcompany.com:8443` | AI traffic proxy + scanning |
| **Dashboard** | `https://aegisgate.yourcompany.com:8444` | Management API, admin, compliance |

### Authentication

All API requests require authentication via one of:

| Method | Header | Notes |
|--------|--------|-------|
| API key | `X-API-Key: <key>` | Standard for API integrations |
| Bearer token | `Authorization: Bearer <token>` | From SSO or local auth |
| API token | `X-API-Token: <token>` | Legacy alias for API key |

```bash
curl -H "X-API-Key: your-api-key" https://aegisgate.yourcompany.com:8444/api/v1/status
```

---

## Health & Status

### Health Check

```
GET /health
```

Returns system health status including dependency checks.

**Response (healthy):**
```json
{
  "status": "healthy",
  "version": "4.5.0",
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
  "version": "4.5.0",
  "dependencies": {
    "proxy": "up",
    "persistence": "down",
    "license": "up",
    "certificates": "up"
  }
}
```

### Dashboard Health

```
GET /api/v1/health
```

Extended health check that also verifies scanner and A2A subsystems.

**Response:**
```json
{
  "status": "healthy",
  "version": "4.5.0",
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

### Readiness Check

```
GET /ready
```

Returns 200 if the platform is ready to accept traffic, 503 otherwise. Use for load balancer health checks.

### Version

```
GET /version
```

**Response:**
```json
{
  "version": "4.5.0",
  "commit": "eebe132",
  "build_date": "2026-09-09T00:00:00Z"
}
```

---

## Scanning

### Scan Content

```
POST /v1/scan
```

Scans content for threats, secrets, PII, and injection attacks using the 3-layer detection engine (regex + ATLAS/compliance + ML).

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
  "threats": [
    {
      "category": "secrets",
      "type": "aws_access_key",
      "severity": "critical",
      "pattern": "AKIA[0-9A-Z]{16}",
      "redacted_match": "AKIA****EXAMPLE"
    }
  ],
  "risk_score": 85,
  "scan_time_ms": 2.1,
  "layers_triggered": ["l1_regex", "l3_ml"]
}
```

### Statistics

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

---

## License & Tier

### License Status

```
GET /api/v1/license/status
```

**Response:**
```json
{
  "tier": "enterprise",
  "valid": true,
  "expires": "2027-01-01T00:00:00Z"
}
```

### Tier Information

```
GET /api/v1/tier
```

Returns current tier and enabled features.

### SLA Information

```
GET /api/v1/sla
```

**Response:**
```json
{
  "tier": "enterprise",
  "sla": {
    "uptime_target": "99.9%",
    "description": "Enterprise tier SLA"
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

## Configuration & Policies

### Get Configuration

```
GET /api/v1/config
```

**Required permission**: `config:read`

Returns the current platform configuration.

### Get Profiles

```
GET /api/v1/profiles
```

**Required permission**: `config:read`

Returns available deployment profiles.

### Apply Profile

```
POST /api/v1/profiles/apply
```

**Required permission**: `config:write`

**Request Body:**
```json
{
  "profile": "enterprise"
}
```

### Policies

```
GET /api/v1/policies
```

Returns current detection policies (enabled categories, thresholds, block/monitor mode).

### Guardrails

```
GET /api/v1/guardrails
```

Returns active A2A guardrail configuration.

---

## Audit & Compliance

### Audit Log

```
GET /api/v1/audit
```

**Query Parameters:**
- `from`: Start timestamp (ISO 8601)
- `to`: End timestamp (ISO 8601)
- `category`: Filter by category (pii, secrets, injection, etc.)
- `severity`: Filter by severity (critical, high, medium, low)
- `limit`: Max results (default: 100, max: 1000)

### Audit Stream (SSE)

```
GET /api/v1/audit/stream
```

Server-Sent Events stream of real-time audit events. Useful for live monitoring dashboards.

### Compliance Report

```
GET /api/v1/compliance?framework=soc2
```

**Required permission**: `compliance:read`

**Query Parameters:**
- `framework`: `soc2`, `hipaa`, `pci_dss`, `eu_ai_act`, `nist_ai_rmf`, `owasp_llm`, `iso_27001`, `mitre_atlas`

### Live Compliance Scan

```
GET /api/v1/compliance/live
```

**Required permission**: `compliance:read`

Returns real-time compliance status across all enabled frameworks.

---

## DSAR — GDPR Data Subject Access Request

Implements GDPR Articles 15–20: right to access, right to erasure, right to data portability.

### Export Entity Data

```
POST /api/v1/dsar/export
```

**Required role**: Admin

Export all data associated with an entity across all registered data providers.

**Request body:**
```json
{
  "entity_id": "user-123"
}
```

**Response (200 OK):**
```json
{
  "entity_id": "user-123",
  "exported_at": "2026-09-09T18:00:00Z",
  "providers": {
    "rbac": { "roles": ["analyst"], "permissions": ["audit:read"] },
    "audit": { "events": 42, "date_range": "2026-01-01/2026-09-09" },
    "ioc": { "matches": 0 }
  }
}
```

The response includes a `Content-Disposition` header suggesting a filename for download.

### Erase Entity Data

```
POST /api/v1/dsar/erase
```

**Required role**: Admin

Erase all data for an entity. If the entity is under legal hold, the erasure is blocked.

**Request body:**
```json
{
  "entity_id": "user-123"
}
```

**Response (200 OK):**
```json
{
  "entity_id": "user-123",
  "erased_at": "2026-09-09T18:00:00Z",
  "records_affected": 42,
  "providers": {
    "rbac": 5,
    "audit": 37
  }
}
```

**Response (409 Conflict — blocked by legal hold):**
```json
{
  "entity_id": "user-123",
  "blocked_by": "legal_hold"
}
```

---

## Legal Hold — E-Discovery

Manages legal holds that freeze data deletion for entities under litigation.

### Create Legal Hold

```
POST /api/v1/legal-holds
```

**Request body:**
```json
{
  "entity_id": "user-123",
  "entity_type": "user",
  "reason": "Case #2026-001 — pending litigation",
  "issued_by": "admin@company.com"
}
```

**Response (201 Created):**
```json
{
  "id": "hold_1724272800000000000",
  "entity_id": "user-123",
  "entity_type": "user",
  "reason": "Case #2026-001 — pending litigation",
  "issued_by": "admin@company.com",
  "created_at": "2026-09-09T18:00:00Z"
}
```

### List Legal Holds

```
GET /api/v1/legal-holds
```

**Response (200 OK):** Array of hold objects.

### Get Legal Hold

```
GET /api/v1/legal-holds/{id}
```

**Response (200 OK):** Single hold object.

**Response (404):** `{"error": "hold <id> not found"}`

### Release Legal Hold

```
DELETE /api/v1/legal-holds/{id}
```

Releases (deactivates) a legal hold. The hold record is retained for audit trail.

**Response (200 OK):** `{"status": "released"}`

### Check Legal Hold Status

```
GET /api/v1/legal-holds/check/{entityID}
```

**Response (200 OK):**
```json
{
  "under_hold": true
}
```

---

## A/B Testing — ML Model Evaluation

Manages A/B tests for comparing ML model variants using deterministic FNV hashing for variant assignment.

### Create A/B Test

```
POST /api/v1/abtest/tests
```

**Required role**: Admin

**Request body:**
```json
{
  "name": "v4.4-detection-comparison",
  "description": "Compare v11b vs v12 detection model",
  "variants": [
    {"name": "champion", "weight": 50, "model_ref": "model-v11b"},
    {"name": "challenger", "weight": 50, "model_ref": "model-v12"}
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "test-abc123",
  "name": "v4.4-detection-comparison",
  "status": "created",
  "created_at": "2026-09-09T18:00:00Z"
}
```

### List A/B Tests

```
GET /api/v1/abtest/tests
```

### Start Test

```
POST /api/v1/abtest/tests/{id}/start
```

**Response:** `{"status": "started", "test_id": "test-abc123"}`

### Stop Test

```
POST /api/v1/abtest/tests/{id}/stop
```

**Response:** `{"status": "stopped", "test_id": "test-abc123"}`

### Get Test Metrics

```
GET /api/v1/abtest/tests/{id}/metrics
```

**Response (200 OK):**
```json
[
  {
    "variant_name": "champion",
    "total_requests": 500,
    "detections": 120,
    "false_positives": 15,
    "avg_latency_ms": 45.2
  },
  {
    "variant_name": "challenger",
    "total_requests": 500,
    "detections": 135,
    "false_positives": 10,
    "avg_latency_ms": 38.7
  }
]
```

### Assign Variant

```
POST /api/v1/abtest/tests/{id}/assign
```

**Request body:**
```json
{
  "request_id": "req-unique-123"
}
```

**Response:** `{"variant": "challenger", "test_id": "test-abc123"}`

### Record Result

```
POST /api/v1/abtest/tests/{id}/result
```

**Request body:**
```json
{
  "variant_name": "challenger",
  "detected": true,
  "false_positive": false,
  "latency_ms": 38.7
}
```

**Response:** `{"status": "recorded"}`

---

## Trust Framework

The Trust Framework provides cryptographic agent identity, capability contracts, real-time trust scoring, and signed attestations. See [Trust Framework Architecture](/docs/trust-framework-architecture/) for details.

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/v1/trust/score?agent=ID` | GET | Lifetime trust score for an agent | Professional+ |
| `/api/v1/trust/score?session=ID` | GET | Current session trust score | Professional+ |
| `/api/v1/trust/sessions?active=true&agent=ID` | GET | Active sessions for an agent | Professional+ |
| `/api/v1/trust/attestations?agent=ID&since=TS` | GET | Signed attestations since timestamp | Professional+ |
| `/api/v1/trust/attestations/latest?agent=ID` | GET | Most recent attestation | Professional+ |
| `/api/v1/trust/health` | GET | Liveness check | Public |

### Example: Get Trust Score

```bash
curl -H "X-API-Key: your-key" \
  "https://aegisgate.yourcompany.com:8444/api/v1/trust/score?agent=agent-001"
```

```json
{
  "agent_id": "agent-001",
  "score": 87.5,
  "verdict": "TRUSTED",
  "factors": {
    "contract_compliance": 0.95,
    "behavioral_anomaly": 0.12,
    "historical_incidents": 0.0,
    "capability_drift": 0.05
  },
  "last_updated": "2026-09-09T12:00:00Z"
}
```

---

## SIEM & SOAR

### SIEM Status

```
GET /api/v1/siem/status
```

Returns SIEM forwarding health and per-platform statistics.

**Response:**
```json
{
  "enabled": true,
  "platforms": [
    {
      "platform": "splunk",
      "status": "healthy",
      "events_forwarded": 15420,
      "last_forward": "2026-09-09T17:59:00Z",
      "errors": 0
    }
  ]
}
```

See [SIEM & SOAR Integration](/docs/siem-soar-integration/) for full SIEM configuration and [Enterprise Deployment Guide](/docs/enterprise-deployment/) for SOAR setup.

---

## SSO Authentication

### Login

```
GET /auth/login
```

Initiates the SSO login flow. Redirects to the configured identity provider (SAML or OIDC).

### Callback

```
GET /auth/callback
```

Handles the SSO callback from the identity provider. Redirects to the dashboard on success.

### Logout

```
GET /auth/logout
```

Terminates the SSO session and redirects to the IdP logout endpoint (if configured).

See [SSO Configuration Guide](/docs/sso-configuration/) for provider setup instructions.

---

## Infrastructure

### Persistence Status

```
GET /api/v1/persistence
```

Returns persistence backend status (PostgreSQL or in-memory).

### Certificates

```
GET /api/v1/certs
```

Returns TLS certificate status and expiration.

### Cluster Health

```
GET /api/v1/cluster/health
```

Returns cluster node health (if cluster mode is enabled).

### Metrics (Prometheus)

```
GET /metrics
```

Returns Prometheus-format metrics for monitoring.

### Analytics

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/analytics/usage` | GET | Token usage analytics |
| `/api/v1/analytics/cost` | GET | Cost analytics |
| `/api/v1/analytics/anomalies` | GET | Usage anomaly detection |
| `/api/v1/analytics/dashboard` | GET | Dashboard summary data |

---

## A2A (Agent-to-Agent) Guardrails

A2A guardrails are enforced on all requests to A2A-enabled routes. Requests must include:

| Header | Required | Purpose |
|--------|----------|---------|
| `X-A2A-Agent-ID` | Yes | Identifies the calling agent |
| `A2A-Capability` | Yes | Declares the capability being exercised |
| `A2A-Signature` | Yes | HMAC-SHA256 of the request body |
| `X-A2A-License-Key` | For paid tiers | License key for tier-gated capabilities |

### A2A Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `A2A_AUTH_FAILED` | 403 | mTLS client certificate authentication failed |
| `A2A_AUTH_NO_CERT` | 403 | No client certificate presented |
| `A2A_LICENSE_MISSING` | 403 | No license key for paid-tier capability |
| `A2A_LICENSE_INVALID` | 403 | License key invalid or wrong tier |
| `A2A_RATE_LIMITED` | 429 | Agent exceeded rate limit |
| `A2A_INTEGRITY_MISSING` | 403 | No HMAC signature provided |
| `A2A_INTEGRITY_INVALID` | 403 | HMAC signature mismatch |
| `A2A_CAP_MISSING` | 403 | No capability header |
| `A2A_CAP_DENIED` | 403 | Agent lacks requested capability |
| `A2A_CAP_UNKNOWN_AGENT` | 403 | Agent ID not registered |
| `A2A_CAP_CHECK_FAILED` | 500 | Internal error during capability lookup |

### A2A Rate Limits

| Tier | Requests/Minute | Burst |
|------|----------------|-------|
| Community | 30 | 5 |
| Developer | 60 | 10 |
| Professional | 120 | 20 |
| Enterprise | Custom | Custom |

Rate limit headers in every response:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1746500000
```

---

## General Error Responses

| HTTP Code | Description |
|-----------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Invalid request body or parameters |
| 401 | Missing or invalid authentication |
| 403 | Forbidden — insufficient role, A2A guardrail violation, or capability denied |
| 404 | Endpoint or resource not found |
| 405 | Method not allowed |
| 409 | Conflict (e.g., erasure blocked by legal hold) |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 503 | Service degraded — one or more dependencies unhealthy |

Error response body format:
```json
{"error": "descriptive error message"}
```

---

## SDK Usage

The AegisGate Go SDK provides typed access to all endpoints:

```go
import aegisgate "github.com/aegisgatesecurity/aegisgate-platform/sdk/go"

// DSAR
bundle, err := client.DSAR.Export(ctx, "user-123")
result, err := client.DSAR.Erase(ctx, "user-123")

// Legal Hold
hold, err := client.LegalHold.CreateHold(ctx, &aegisgate.LegalHoldCreateRequest{
    EntityID:   "user-123",
    EntityType: "user",
    Reason:     "Case #2026-001",
    IssuedBy:   "admin@company.com",
})
underHold, err := client.LegalHold.CheckUnderHold(ctx, "user-123")
err = client.LegalHold.ReleaseHold(ctx, hold.ID)

// A/B Testing
test, err := client.ABTestV4.CreateTest(ctx, &aegisgate.ABTestV4CreateRequest{
    Name:        "v4.4-comparison",
    Description: "Compare models",
    Variants: []aegisgate.ABTestV4Variant{
        {Name: "champion", Weight: 50, ModelRef: "model-v11b"},
        {Name: "challenger", Weight: 50, ModelRef: "model-v12"},
    },
})
err = client.ABTestV4.StartTest(ctx, test.ID)
variant, err := client.ABTestV4.AssignVariant(ctx, test.ID, "req-123")
err = client.ABTestV4.RecordResult(ctx, test.ID, &aegisgate.ABTestV4ResultRequest{
    VariantName:   variant,
    Detected:      true,
    FalsePositive: false,
    LatencyMs:     38.7,
})
metrics, err := client.ABTestV4.GetMetrics(ctx, test.ID)
```