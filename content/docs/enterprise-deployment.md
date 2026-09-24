---
title: "Enterprise Deployment Guide"
description: "Complete guide for deploying AegisGate Platform in enterprise environments — SSO, SIEM, SOAR, compliance, multi-tenant, and high-availability configurations."
weight: 370
mermaid: true
---

## Enterprise Deployment Guide

This guide covers deploying AegisGate Platform in enterprise environments, tying together SSO authentication, SIEM log forwarding, SOAR incident automation, compliance frameworks, and multi-tenant isolation into a single coherent deployment architecture.

---

## Architecture Overview

{{< mermaid >}}
graph TB
    subgraph "Identity Layer"
        IDP[Okta / Azure AD / Keycloak]
    end

    subgraph "AegisGate Platform"
        SSO[SSO Manager<br/>SAML 2.0 + OIDC]
        PROXY[Proxy + Detection Engine]
        TRUST[Trust Framework]
        COMPLIANCE[Compliance Engine<br/>SOC 2 / HIPAA / PCI]
        AUDIT[Audit Pipeline]
    end

    subgraph "Integration Layer"
        SIEM[SIEM Forwarder<br/>12 platforms]
        SOAR[SOAR Manager<br/>4 platforms]
        WEBHOOK[Webhook Notifier]
    end

    subgraph "External Systems"
        SPLUNK[Splunk / Datadog / QRadar]
        PD[PagerDuty / Jira / ServiceNow]
        SLACK[Slack / Teams]
    end

    IDP -->|SAML/OIDC| SSO
    SSO --> PROXY
    PROXY --> TRUST
    PROXY --> COMPLIANCE
    PROXY --> AUDIT
    AUDIT --> SIEM
    AUDIT --> SOAR
    AUDIT --> WEBHOOK
    SIEM --> SPLUNK
    SOAR --> PD
    WEBHOOK --> SLACK

    style SSO fill:#1a1f2e,stroke:#38bdf8,stroke-width:2px
    style PROXY fill:#1a1f2e,stroke:#f59e0b,stroke-width:2px
    style TRUST fill:#1a1f2e,stroke:#22c55e,stroke-width:2px
    style SIEM fill:#1a1f2e,stroke:#a855f7,stroke-width:2px
    style SOAR fill:#1a1f2e,stroke:#ec4899,stroke-width:2px
{{< /mermaid >}}

---

## Prerequisites

### Infrastructure

| Component | Requirement | Purpose |
|-----------|-------------|---------|
| **PostgreSQL 14+** | Required for Enterprise tier | Persistent sessions, audit logs, RBAC, multi-tenant isolation |
| **TLS certificate** | X.509 cert + private key | HTTPS for proxy and dashboard |
| **Reverse proxy** | nginx, HAProxy, or cloud load balancer | TLS termination, load balancing, WAF |
| **DNS** | A/AAAA record for platform | e.g., `aegisgate.yourcompany.com` |

### Identity Provider

One of the following SAML 2.0 or OIDC compliant IdPs:

| Provider | Protocol | Notes |
|----------|----------|-------|
| Okta | SAML 2.0, OIDC | Most common enterprise choice |
| Microsoft Entra ID (Azure AD) | OIDC, SAML 2.0 | Use `azure` provider type |
| Google Workspace | OIDC | Use `google` provider type, set `gsuite_domain` |
| Keycloak | SAML 2.0, OIDC | Open-source, self-hosted |
| PingFederate | SAML 2.0 | Enterprise federation |
| OneLogin | SAML 2.0, OIDC | Cloud IdP |
| Auth0 | OIDC | Developer-friendly |

See the [SSO Configuration Guide](/docs/sso-configuration/) for provider-specific setup instructions.

### SIEM Platform (Optional but Recommended)

One or more of: Splunk, Elasticsearch, IBM QRadar, Microsoft Sentinel, Sumo Logic, LogRhythm, AWS CloudWatch, AWS Security Hub, Micro Focus ArcSight, Datadog, Syslog, or custom webhook.

### SOAR Platform (Optional)

One or more of: PagerDuty, Jira, ServiceNow, or custom webhook.

---

## Deployment Profiles

AegisGate supports three deployment profiles. Choose based on your scale and requirements.

### Profile 1: Single-Instance (Up to 500 users)

```yaml
# aegisgate-platform.yaml
server:
  proxy_port: 8443
  dashboard_port: 8444
  tls_cert: /etc/aegisgate/cert.pem
  tls_key: /etc/aegisgate/key.pem

database:
  url: "postgres://aegisgate:password@localhost:5432/aegisgate"

sso:
  enabled: true
  # See SSO Configuration Guide for provider config

siem:
  enabled: true
  # See SIEM & SOAR Integration guide

soar:
  enabled: true
  # See SIEM & SOAR Integration guide

trust:
  enabled: true
  require_license: true

ml_threat_detection_enabled: true
ml_shadow_mode: false  # Set to true for first 7 days
```

**Infrastructure**: Single VM or container, PostgreSQL on same host or managed service.

### Profile 2: Multi-Instance with Load Balancer (500–5000 users)

```yaml
# Shared PostgreSQL (managed or dedicated)
database:
  url: "postgres://aegisgate:password@pg-cluster.internal:5432/aegisgate"
  max_connections: 50

# Redis for distributed state (if using cluster features)
cluster:
  enabled: true
  redis_url: "redis://redis.internal:6379"

# Each instance runs behind a load balancer
# TLS terminated at the load balancer (nginx/ALB)
```

**Infrastructure**: 2–5 AegisGate instances behind a load balancer, managed PostgreSQL, Redis for cluster coordination.

### Profile 3: Air-Gapped / On-Premises Enterprise

```yaml
# No external network access
server:
  proxy_port: 8443
  dashboard_port: 8444

database:
  url: "postgres://aegisgate:password@db.internal:5432/aegisgate"

# SSO via on-prem IdP (Keycloak, AD FS)
sso:
  enabled: true
  saml:
    enabled: true
    idp_metadata_url: "https://keycloak.internal/realms/your-realm/protocol/saml/descriptor"

# SIEM via internal Syslog or Splunk HEC
siem:
  enabled: true
  platforms:
    - platform: splunk
      endpoint: "https://splunk.internal:8088/services/collector"
      token: "${SPLUNK_HEC_TOKEN}"

# No external API calls
ml_shadow_mode: false
```

**Infrastructure**: Fully isolated network, on-prem IdP, on-prem SIEM, no internet egress.

---

## SSO Configuration

### 1. Configure your Identity Provider

Create an application in your IdP for AegisGate:

- **Assertion Consumer Service (ACS) URL**: `https://aegisgate.yourcompany.com/auth/callback`
- **Entity ID**: `https://aegisgate.yourcompany.com`
- **Name ID format**: Email address
- **Attributes to release**: email, name, groups (for role mapping)

### 2. Configure AegisGate SSO

Edit `configs/sso.yaml`:

```yaml
sso:
  enabled: true

  oidc:
    enabled: true
    provider: azure           # or: google, okta, generic
    client_id: "your-client-id"
    client_secret: "your-client-secret"
    redirect_url: "https://aegisgate.yourcompany.com/auth/callback"
    scopes:
      - openid
      - profile
      - email

  session:
    duration_hours: 8
    secure: true
    same_site: "lax"
```

### 3. Map IdP Groups to AegisGate Roles

```yaml
sso:
  role_mappings:
    - idp_group: "security-admins"
      aegisgate_role: "admin"
    - idp_group: "security-analysts"
      aegisgate_role: "analyst"
    - idp_group: "developers"
      aegisgate_role: "viewer"

  allowed_domains:
    - "yourcompany.com"
    - "subsidiary.com"
```

### 4. Verify SSO

```bash
# Test SSO login flow
curl -L https://aegisgate.yourcompany.com/auth/login

# Should redirect to your IdP login page
# After authentication, should redirect back to dashboard
```

See the [SSO Configuration Guide](/docs/sso-configuration/) for provider-specific step-by-step instructions.

---

## SIEM Integration

### Enable SIEM Forwarding

```yaml
siem:
  enabled: true
  source: "aegisgate-prod"
  poll_interval: 5s
  batch_size: 100
  platforms:
    - platform: splunk
      endpoint: "https://splunk.yourcompany.com:8088/services/collector"
      token: "${SPLUNK_HEC_TOKEN}"
      format: json
      enabled: true

    - platform: datadog
      endpoint: "https://api.datadoghq.com/api/v2/logs"
      token: "${DD_API_KEY}"
      format: json
      enabled: true
```

### Supported SIEM Platforms

| Platform | Format | Authentication |
|----------|--------|---------------|
| Splunk | CEF, JSON | HEC token |
| Elasticsearch | JSON | API key, basic auth |
| IBM QRadar | LEEF, JSON | API key, basic auth |
| Microsoft Sentinel | JSON | OAuth2, API key |
| Sumo Logic | JSON | API key |
| LogRhythm | JSON, CEF | API key |
| AWS CloudWatch | JSON | IAM access key |
| AWS Security Hub | JSON | IAM access key |
| Micro Focus ArcSight | CEF | API key, basic auth |
| Datadog | JSON | API key |
| Syslog (RFC 5424) | Syslog | None |
| Custom webhook | JSON | API key, HMAC, OAuth2 |

### Verify SIEM Forwarding

```bash
# Check SIEM status
curl -H "X-API-Key: your-key" \
  https://aegisgate.yourcompany.com/api/v1/siem/status

# Generate a test event
curl -X POST -H "X-API-Key: your-key" \
  -d '{"content":"test-secret AKIAIOSFODNN7EXAMPLE"}' \
  https://aegisgate.yourcompany.com/v1/scan

# Check your SIEM for the forwarded event
```

See the [SIEM & SOAR Integration guide](/docs/siem-soar-integration/) for full configuration details.

---

## SOAR Integration

### Enable SOAR Incident Automation

```yaml
soar:
  enabled: true
  platforms:
    - platform: pagerduty
      endpoint: "https://events.pagerduty.com/v2/enqueue"
      token: "${PAGERDUTY_INTEGRATION_KEY}"
      severity_threshold: "high"  # Only high+ severity triggers SOAR

    - platform: jira
      endpoint: "https://yourcompany.atlassian.net"
      token: "${JIRA_API_TOKEN}"
      project: "SEC"
      severity_threshold: "medium"

    - platform: servicenow
      endpoint: "https://yourcompany.service-now.com"
      token: "${SN_API_TOKEN}"
      severity_threshold: "critical"
```

### Severity Mapping

| AegisGate Severity | PagerDuty | Jira | ServiceNow |
|--------------------|-----------|------|------------|
| Critical | critical | Highest | 1 - Critical |
| High | error | High | 2 - High |
| Medium | warning | Medium | 3 - Moderate |
| Low | info | Low | 4 - Low |

### Supported SOAR Platforms

| Platform | Integration Type | Key Features |
|----------|-----------------|-------------|
| PagerDuty | Events API v2 | Dedup keys, severity-based routing |
| Jira | REST API | Create issues with priority mapping |
| ServiceNow | REST API | Create incidents with severity mapping |
| Custom webhook | HTTP POST | HMAC-SHA256 signed, custom headers |

---

## Compliance Configuration

### Enable Compliance Frameworks

```yaml
compliance:
  enabled: true
  frameworks:
    - soc2
    - hipaa
    - pci_dss
    - eu_ai_act
    - nist_ai_rmf
    - owasp_llm
    - iso_27001

  # Live compliance scanning
  live_scan: true
  scan_interval: 1h

  # Report generation
  auto_generate_reports: true
  report_retention_days: 365
```

### Compliance API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/compliance` | GET | Generate compliance report for a framework |
| `/api/v1/compliance/live` | GET | Get live compliance status |
| `/api/v1/dsar/export` | POST | GDPR data subject access request — export |
| `/api/v1/dsar/erase` | POST | GDPR data subject access request — erasure |
| `/api/v1/legal-holds` | POST | Create legal hold (e-discovery) |
| `/api/v1/legal-holds` | GET | List legal holds |
| `/api/v1/legal-holds/{id}` | DELETE | Release a legal hold |
| `/api/v1/legal-holds/check/{entityID}` | GET | Check if entity is under hold |

### DSAR (GDPR) Workflow

```
Request received → POST /api/v1/dsar/export → Data bundle generated
                 → POST /api/v1/dsar/erase  → Data erased (if not under legal hold)
                                              → 409 Conflict if under hold
```

### Legal Hold Workflow

```
Litigation notice → POST /api/v1/legal-holds → Entity's data frozen
                  → DSAR erasure blocked (409 Conflict)
                  → DELETE /api/v1/legal-holds/{id} → Hold released, data can be pruned
```

---

## Trust Framework Configuration

```yaml
trust:
  enabled: true
  require_license: true
  score_threshold_suspicious: 50
  score_threshold_blocked: 50
  anomaly_sensitivity: 0.3
  incident_decay_hours: 168
```

See the [Trust Framework Architecture](/docs/trust-framework-architecture/) for the full technical deep-dive.

---

## Multi-Tenant Configuration

For organizations serving multiple customers or business units:

```yaml
multi_tenant:
  enabled: true
  default_tenant: "default"

  # Tenant isolation via Row-Level Security (RLS)
  rls:
    enabled: true
    policy_column: "tenant_id"

  # Per-tenant configuration
  tenants:
    - id: "tenant-a"
      name: "Business Unit A"
      sso_provider: "okta-tenant-a"
      siem_platform: "splunk-tenant-a"
    - id: "tenant-b"
      name: "Business Unit B"
      sso_provider: "azure-tenant-b"
      siem_platform: "datadog-tenant-b"
```

Each tenant has isolated:
- SSO provider configuration
- SIEM forwarding destinations
- Audit logs (RLS-enforced)
- Trust Framework agents
- Compliance reports
- RBAC roles and permissions

---

## ML Threat Detection

### Recommended Deployment Sequence

1. **Days 1–7**: Shadow mode (log-only, no blocking)
   ```yaml
   ml_threat_detection_enabled: true
   ml_shadow_mode: true
   ```
   Review shadow predictions. Check for false positives in your environment.

2. **Day 8**: Enable active blocking
   ```yaml
   ml_threat_detection_enabled: true
   ml_shadow_mode: false
   ```

3. **Ongoing**: Monitor via SIEM and SOAR integrations

### A/B Testing

Compare ML model variants before promoting to production:

```bash
# Create an A/B test
curl -X POST -H "X-API-Key: your-key" \
  -d '{
    "name": "v4.4-evaluation",
    "description": "Compare current vs new model",
    "variants": [
      {"name": "champion", "weight": 90, "model_ref": "model-v13"},
      {"name": "challenger", "weight": 10, "model_ref": "model-v12"}
    ]
  }' \
  https://aegisgate.yourcompany.com/api/v1/abtest/tests

# Start the test
curl -X POST -H "X-API-Key: your-key" \
  https://aegisgate.yourcompany.com/api/v1/abtest/tests/{id}/start

# Check metrics
curl -H "X-API-Key: your-key" \
  https://aegisgate.yourcompany.com/api/v1/abtest/tests/{id}/metrics
```

---

## High Availability

### Health Checks

```bash
# Basic health (proxy + persistence + license + certificates)
curl https://aegisgate.yourcompany.com/health

# Extended health (includes scanner + A2A)
curl https://aegisgate.yourcompany.com/api/v1/health

# Readiness check (for load balancer)
curl https://aegisgate.yourcompany.com/ready
```

### Load Balancer Configuration

Configure your load balancer with:
- **Health check path**: `/ready`
- **Health check interval**: 10s
- **Unhealthy threshold**: 3 consecutive failures
- **Sticky sessions**: Not required (state is in PostgreSQL)
- **TLS termination**: At load balancer (recommended) or at AegisGate

### Database

- Use managed PostgreSQL (AWS RDS, Azure Database, Cloud SQL) or a PostgreSQL cluster
- Connection pooling: Configure `max_connections` based on instance count (recommend 20–50 per instance)
- Backups: Daily snapshots + WAL archiving for point-in-time recovery
- RLS: Enable row-level security for multi-tenant isolation

---

## Security Hardening Checklist

| Item | Status | Notes |
|------|--------|-------|
| TLS enabled on proxy + dashboard | ☐ | Use valid certificate from your CA |
| SSO enabled (no local-only auth) | ☐ | See SSO Configuration Guide |
| SIEM forwarding enabled | ☐ | Forward all audit events to your SIEM |
| SOAR alerts configured | ☐ | At minimum, critical severity → PagerDuty |
| ML threat detection enabled | ☐ | Start with shadow mode for 7 days |
| Trust Framework enabled | ☐ | Required for Professional+ tier |
| Multi-tenant RLS enabled | ☐ | If serving multiple tenants |
| RBAC roles configured | ☐ | Map IdP groups to AegisGate roles |
| Allowed domains restricted | ☐ | Only your corporate domains |
| Cookie secure flag | ☐ | `secure: true` in SSO config |
| Audit log retention configured | ☐ | Minimum 365 days for compliance |
| Legal hold policy documented | ☐ | For e-discovery readiness |
| DSAR process documented | ☐ | For GDPR compliance |
| Rate limiting configured | ☐ | Per-tier and per-agent limits |
| CA keys encrypted at rest | ☐ | For Rampart instances connecting to Platform |

---

## Monitoring & Observability

### Prometheus Metrics

AegisGate exposes Prometheus metrics at `/metrics`:

```
aegisgate_requests_total{tier="enterprise",result="blocked"}
aegisgate_threats_detected_total{category="pii",layer="l1"}
aegisgate_ml_inference_latency_ms
aegisgate_trust_score{agent="agent-001"}
aegisgate_siem_events_forwarded_total{platform="splunk"}
aegisgate_soar_incidents_sent_total{platform="pagerduty"}
```

### Grafana Dashboards

Pre-built Grafana dashboards are available for:
- Request volume and threat detection rates
- ML model performance (latency, accuracy, shadow mode comparison)
- Trust Framework scores and agent activity
- SIEM forwarding health
- SOAR incident delivery

See [Grafana Dashboards](/docs/grafana-dashboards/) for dashboard JSON templates.

### Distributed Tracing

AegisGate supports OpenTelemetry distributed tracing. See [Distributed Tracing](/docs/distributed-tracing/) for configuration.

---

## Day 2 Operations

### Routine Tasks

| Frequency | Task | How |
|-----------|------|-----|
| Daily | Review blocked threats | SIEM dashboard or `/api/v1/audit` |
| Daily | Check SIEM/SOAR health | `/api/v1/siem/status` |
| Weekly | Review trust score trends | Trust Framework dashboard |
| Weekly | Review ML false positives | A/B test metrics or audit log filter |
| Monthly | Compliance report generation | `/api/v1/compliance?framework=soc2` |
| Monthly | Review RBAC role assignments | IdP group membership audit |
| Quarterly | Legal hold review | `/api/v1/legal-holds` |
| Quarterly | DSAR process test | Submit test DSAR export/erase |

See [Day 2 Operations](/docs/day-2-operations/) for the full operations runbook.

---

## Troubleshooting

### SSO login fails

1. Check SSO config: `cat configs/sso.yaml`
2. Verify IdP metadata is accessible: `curl -I {idp_metadata_url}`
3. Check logs for SSO errors: `journalctl -u aegisgate | grep SSO`
4. Verify redirect URL matches IdP configuration
5. See [SSO Configuration Guide](/docs/sso-configuration/) troubleshooting section

### SIEM events not arriving

1. Check SIEM status: `GET /api/v1/siem/status`
2. Verify network connectivity to SIEM endpoint
3. Check SIEM platform credentials
4. Review SIEM platform logs for received events
5. See [SIEM & SOAR Integration](/docs/siem-soar-integration/) troubleshooting

### ML model not loading

1. Verify model file exists: `ls -la pkg/ml/models/threat_cnn_bilstm.onnx`
2. Check model hash matches expected: compare SHA-256 with `ExpectedModelHash` in config
3. Review logs: `journalctl -u aegisgate | grep "ml\|onnx\|model"`
4. Verify ONNX runtime is available

### Trust score not updating

1. Verify Trust Framework is enabled: `trust.enabled: true` in config
2. Check agent has activity: `GET /api/v1/trust/sessions?active=true&agent=ID`
3. Review score factors: `GET /api/v1/trust/score?agent=ID`
4. Check for blocking incidents in audit log