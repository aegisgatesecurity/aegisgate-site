---
title: "SLA & SLO"
description: "AegisGate Security Platform — Service Level Agreements and Service Level Objectives by tier"
date: 2026-05-05T00:00:00Z
layout: single
---

# Service Level Agreements & Objectives

AegisGate Security Platform publishes transparent service level commitments for every tier. These aren't aspirational — they're measurable against the `/health`, `/metrics`, and `/api/v1/sla` endpoints.

## SLA by Tier

| Commitment | Community | Developer | Professional | Enterprise |
|---|:---:|:---:|:---:|:---:|
| **Uptime Target** | 99.0% | 99.9% | 99.95% | 99.99% |
| **Support Response** | Best-effort (community) | 24 hours | 4 hours | 1 hour |
| **Support Channel** | GitHub Issues | Email + Priority Issues | Dedicated channel | 24/7 + Slack |
| **Incident Response** | No SLA | 8h (P1), 24h (P2) | 2h (P1), 8h (P2) | 30min (P1), 2h (P2) |
| **Data Retention** | 7 days | 90 days | 365 days | Custom |
| **Uptime Downtime/Year** | ~3.7 days | ~8.7 hours | ~4.4 hours | ~52 minutes |

## Service Level Objectives

We measure these SLOs continuously via Prometheus metrics exported at `/metrics`:

| SLO | Target | Window | Metric |
|---|---|---|---|
| **API Availability** | ≥99.5% | 30d | `successful_requests / total_requests` |
| **Request Latency (P99)** | ≤100ms | 30d | `histogram_quantile(0.99, request_duration_seconds)` |
| **MCP Session Availability** | ≥99.9% | 30d | `active_mcp_sessions / attempted_sessions` |
| **A2A Auth Success Rate** | ≥99.9% | 30d | `a2a_auth_success / a2a_auth_total` |
| **Guardrail Enforcement Rate** | 100% | 30d | `guardrail_enforced / guardrail_evaluated` |
| **Audit Log Completeness** | 100% | 30d | `audit_entries / total_requests` |

### Why 100% for Guardrails and Audit?

AegisGate is a **security product**. If a guardrail fails to enforce or an audit log entry goes missing, that's a security incident — not a performance issue. These SLOs are set to 100% because anything less means a threat could pass through undetected.

The fail-closed architecture ensures that any guardrail error, timeout, or internal failure results in a **deny** rather than an **allow**. This architecture guarantees the 100% enforcement target.

## Health Check

The `/health` endpoint verifies all critical dependencies:

```json
{
  "status": "healthy",
  "tier": "community",
  "version": "3.5.0",
  "checks": {
    "proxy": { "enabled": true, "healthy": true },
    "persistence": { "enabled": true, "started": true, "healthy": true },
    "license": { "valid": true, "tier": "community", "healthy": true },
    "certificates": { "valid": true, "healthy": true }
  }
}
```

If any dependency is unhealthy, the health check returns `"status": "unhealthy"` with HTTP 503.

## SLA API

The `/api/v1/sla` endpoint returns the SLA and SLOs for the current tier:

```bash
curl -s http://localhost:8443/api/v1/sla | jq
```

```json
{
  "tier": "community",
  "uptime_target": 99,
  "support_response": "Best-effort (community forum)",
  "support_channel": "GitHub Issues",
  "incident_response": "No SLA — best effort",
  "data_retention_days": 7,
  "slos": [
    {
      "name": "api_availability",
      "target": 99.5,
      "window": "30d",
      "metric": "successful_requests / total_requests",
      "description": "API request success rate"
    }
  ]
}
```

## Incident Response Priority Levels

| Priority | Definition | Examples |
|---|---|---|
| **P1 — Critical** | Security product is down or actively compromised | Proxy down, guardrails bypassed, data breach |
| **P2 — High** | Major feature degraded but functional | MCP sessions failing, A2A auth intermittent |
| **P3 — Medium** | Minor feature impacted | Dashboard slow, metrics delay |
| **P4 — Low** | Cosmetic or informational | UI glitch, documentation error |

## Measuring Compliance

AegisGate uses Prometheus metrics to track all SLOs. You can monitor compliance with standard PromQL queries:

```promql
# API availability over 30 days
sum(rate(aegisgate_requests_total{code!~"5xx"}[30d]))
/
sum(rate(aegisgate_requests_total[30d]))

# P99 latency
histogram_quantile(0.99, sum(rate(aegisgate_request_duration_seconds_bucket[30d])) by (le))

# Guardrail enforcement rate
sum(rate(aegisgate_guardrails_enforced_total[30d]))
/
sum(rate(aegisgate_guardrails_evaluated_total[30d]))
```