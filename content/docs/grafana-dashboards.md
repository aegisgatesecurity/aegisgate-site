---
title: "Grafana Dashboards"
description: "Pre-built Grafana dashboards for AegisGate Platform — security operations, MCP/agent monitoring, and system overview"
weight: 450
---

## Grafana Dashboards

AegisGate Platform ships with 3 pre-built Grafana dashboards (34 panels total) that deploy automatically via the Helm chart's ConfigMap.

### Available Dashboards

| Dashboard | Panels | Focus |
|----------|--------|-------|
| `aegisgate-overview` | 10 | System health, request rates, error rates, latency, upstream status |
| `aegisgate-security` | 12 | Security operations: MTTD/MTTR, incidents, detection latency, scan pipeline |
| `aegisgate-mcp-agents` | 12 | MCP/agent monitoring: sessions, tool invocations, A2A failures, capability denials |

### Helm Deployment

The Helm chart includes a ConfigMap (`grafana-dashboard-configmap.yaml`) that deploys all 3 dashboards with the `grafana_dashboard: "1"` label for automatic discovery by Grafana's sidecar provisioner.

```yaml
# values.yaml
grafana:
  dashboards:
    enabled: true
  sidecar:
    dashboards:
      enabled: true
      label: grafana_dashboard
```

### Dashboard Details

#### AegisGate Security (v4.3.0+)

12 panels for security operations teams:

| Panel | Metric | Description |
|-------|--------|-------------|
| Security Scans by Result | `aegisgate_scan_results_total` | Count of scans by result (blocked, allowed, flagged) |
| Total Audit Events | `aegisgate_audit_events_total` | All audit events over time |
| Active Connections | `aegisgate_active_connections` | Current active proxy connections |
| Rate Limit Hits | `aegisgate_rate_limit_hits_total` | Rate limit enforcement events |
| Security Scans Over Time | `aegisgate_scans_total` | Scan throughput time series |
| MTTD (p50/p95/p99) | `aegisgate_mttd_seconds` | Mean Time To Detect histogram |
| MTTR (p50/p95) | `aegisgate_mttr_seconds` | Mean Time To Respond histogram |
| Incidents by Severity | `aegisgate_incidents_total` | Incidents grouped by severity level |
| Detection Latency by Framework | `aegisgate_detection_latency_seconds` | Per-framework detection timing |
| Incident Status Distribution | `aegisgate_incident_status` | Open vs. resolved vs. acknowledged |
| Scan Pipeline Duration | `aegisgate_scan_duration_seconds` | End-to-end scan pipeline timing |
| ML Shadow Predictions | `aegisgate_ml_predictions_total` | ML model predictions in shadow mode |

#### AegisGate MCP/Agents (v4.3.0+)

12 panels for MCP and agent-to-agent monitoring:

| Panel | Metric | Description |
|-------|--------|-------------|
| Active MCP Sessions | `aegisgate_mcp_active_sessions` | Current active MCP sessions |
| MCP Tool Invocations | `aegisgate_mcp_tool_invocations_total` | Tool call count by tool name |
| A2A Auth Failures | `aegisgate_a2a_auth_failures_total` | Agent-to-agent authentication failures |
| MCP Connections Over Time | `aegisgate_mcp_connections_total` | MCP connection throughput |
| Tool Invocations by Tool | `aegisgate_mcp_tool_invocations_total` | Breakdown by tool name |
| MCP Tool Results | `aegisgate_mcp_tool_results_total` | Success vs. error vs. denied |
| A2A Integrity Failures | `aegisgate_a2a_integrity_failures_total` | HMAC verification failures |
| A2A Capability Denials | `aegisgate_a2a_capability_denials_total` | Capability enforcement denials |
| A2A License Failures | `aegisgate_a2a_license_failures_total` | License-tier enforcement failures |
| Requests by Tier | `aegisgate_requests_by_tier_total` | Request volume by license tier |
| ML Inference Duration | `aegisgate_ml_inference_seconds` | ML model inference timing |
| Regex Scan Duration | `aegisgate_regex_scan_seconds` | Regex pattern matching timing |

### Prometheus Alerts

The Helm chart also deploys a `PrometheusRule` with 10 pre-configured alerts:

| Alert | Severity | Trigger |
|-------|----------|---------|
| HighScanBlockRate | warning | > 10% of scans blocked in 5 min |
| CriticalIncidentRate | critical | Any critical incident in 1 min |
| HighMTTD | warning | p95 MTTD > 5s for 10 min |
| HighMTTR | warning | p95 MTTR > 60s for 10 min |
| MCPSessionSpike | warning | > 100 active MCP sessions |
| A2AFailureSpike | warning | > 10 A2A auth failures in 5 min |
| RateLimitExceeded | info | Rate limit hits increasing |
| AuditLogGap | critical | No audit events for 5 min |
| MLDriftDetected | warning | ML model drift detected |
| UpstreamUnhealthy | critical | Upstream provider unhealthy |

### Manual Import

If not using Helm, import the JSON files directly into Grafana:

```bash
# Dashboard JSON files are in the Helm chart:
deploy/helm/aegisgate-platform/dashboards/aegisgate-overview.json
deploy/helm/aegisgate-platform/dashboards/aegisgate-security.json
deploy/helm/aegisgate-platform/dashboards/aegisgate-mcp-agents.json
```

In Grafana: **Dashboards → Import → Upload JSON file**.