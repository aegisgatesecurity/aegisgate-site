---
title: "SIEM & SOAR Integration"
description: "Configure AegisGate Platform to forward security events to Splunk, QRadar, Elasticsearch, Datadog, and more — plus SOAR webhooks for PagerDuty, Jira, and ServiceNow."
weight: 430
---

## SIEM & SOAR Integration

AegisGate Platform provides two distinct integration pathways for external security tooling:

| Integration | Package | Purpose | Direction |
|-------------|---------|---------|-----------|
| **SIEM** | `pkg/siem/` | Forward raw audit events to log/observability platforms | AegisGate → SIEM |
| **SOAR** | `pkg/soar/` | Send structured incident alerts to automation platforms | AegisGate → SOAR |

**In short:** SIEM says "log this event for analysis." SOAR says "alert this platform so action is taken."

Both require Professional tier or higher.

---

## SIEM Integration (Event Forwarding)

### Supported Platforms (12)

| Platform | Config Value | Format | Auth |
|----------|-------------|--------|------|
| Splunk | `splunk` | CEF, JSON | API key (HEC token) |
| Elasticsearch | `elasticsearch` | JSON | API key, basic |
| IBM QRadar | `qradar` | LEEF, JSON | API key, basic |
| Microsoft Sentinel | `sentinel` | JSON | OAuth2, API key |
| Sumo Logic | `sumologic` | JSON | API key |
| LogRhythm | `logrhythm` | JSON, CEF | API key |
| AWS CloudWatch | `cloudwatch` | JSON | IAM (access key) |
| AWS Security Hub | `securityhub` | JSON | IAM (access key) |
| Micro Focus ArcSight | `arcsight` | CEF | API key, basic |
| Datadog | `datadog` | JSON | API key |
| Syslog (RFC 5424) | `syslog` | Syslog | None |
| Custom webhook | `custom` | JSON | API key, HMAC, OAuth2 |

### Configuration

Enable SIEM in `aegisgate-platform.yaml`:

```yaml
siem:
  enabled: true
  source: "aegisgate"           # Source field on every event
  poll_interval: 5s             # How often to poll audit ring buffer
  batch_size: 100               # Max events per poll cycle
  buffer_max_size: 10000        # Internal buffer capacity
  platforms:
    # ── Splunk via HEC ──
    - platform: splunk
      enabled: true
      format: cef                 # or "json"
      endpoint: "https://splunk.example.com:8088/services/collector"
      auth:
        type: api_key
        api_key: "your-hec-token"  # env: AEGISGATE_SIEM_API_KEY
      retry:
        enabled: true
        max_attempts: 3
        initial_backoff: "1s"
        max_backoff: "30s"
        backoff_multiplier: 2.0
      batch:
        enabled: true
        max_size: 100
        max_wait: "5s"

    # ── Datadog Logs ──
    - platform: datadog
      enabled: true
      format: json
      endpoint: "https://http-intake.logs.datadoghq.com/v1/input"
      auth:
        type: api_key
        api_key: "your-datadog-api-key"

    # ── Syslog (RFC 5424) ──
    - platform: syslog
      enabled: true
      format: syslog
      endpoint: "10.0.0.50:514"    # syslog server
      tls:
        enabled: false             # true for TLS-encrypted syslog
```

### CLI Flag

```bash
./aegisgate --siem-enabled
# or via environment:
AEGISGATE_SIEM_ENABLED=true ./aegisgate
```

### Event Structure

Each SIEM event contains:

| Field | Description | Example |
|------|-------------|---------|
| `timestamp` | UTC timestamp | `2026-08-10T12:00:00Z` |
| `source` | Always `aegisgate` | `aegisgate` |
| `type` | Event type | `detection`, `block`, `policy` |
| `severity` | Severity level | `critical`, `high`, `medium`, `low`, `info` |
| `category` | Detection category | `pii`, `secrets`, `xss`, `compliance`, `ml_threat` |
| `user_hash` | SHA-256 hash of user ID | `a1b2c3...` |
| `domain_hash` | SHA-256 hash of target domain | `d4e5f6...` |
| `action` | User action taken | `warn`, `redact`, `block`, `allow` |

**No prompt content, no PII, no secrets in the event payload.** All values are hashed or categorized.

### Health Check

```bash
curl http://localhost:8443/api/v1/siem/health
```

Returns per-platform health, last send time, and error count.

---

## SOAR Integration (Incident Alerting)

### Supported Platforms (4)

| Platform | Config Value | Auth | Incident Action |
|----------|-------------|------|-----------------|
| PagerDuty | `pagerduty` | API key (routing key) | Trigger, acknowledge, resolve |
| Jira | `jira` | API key, basic | Create issue with priority mapping |
| ServiceNow | `servicenow` | API key, basic | Create incident (security > compliance) |
| Custom webhook | `custom` | HMAC, API key, OAuth2 | POST JSON payload |

### Severity Mapping

| AegisGate | PagerDuty | Jira | ServiceNow |
|-----------|-----------|------|------------|
| critical | critical | Highest | 1 |
| high | error | High | 2 |
| medium | warning | Medium | 3 |
| low | info | Low | 4 |
| info | info | Lowest | 4 |

### Configuration

Enable SOAR in `aegisgate-platform.yaml`:

```yaml
soar:
  enabled: true
  source: "aegisgate"
  max_retries: 3
  retry_interval: 5s
  platforms:
    # ── PagerDuty (Events API v2) ──
    - platform: pagerduty
      enabled: true
      endpoint: "https://events.pagerduty.com/v2/enqueue"
      auth:
        type: api_key
        api_key: "your-routing-key"    # env: AEGISGATE_SOAR_API_KEY
      settings:
        dedup_key_prefix: "aegisgate"

    # ── Jira (create issues) ──
    - platform: jira
      enabled: true
      endpoint: "https://yourcompany.atlassian.net/rest/api/3/issue"
      auth:
        type: api_key
        api_key: "your-jira-api-token"
      settings:
        project_key: "SEC"
        issue_type: "Security Incident"

    # ── ServiceNow (create incidents) ──
    - platform: servicenow
      enabled: true
      endpoint: "https://yourcompany.service-now.com/api/now/table/incident"
      auth:
        type: basic
        username: "aegisgate-integration"
        password: "your-servicenow-password"
      settings:
        assignment_group: "Security"
        category: "security"
        subcategory: "compliance"

    # ── Custom webhook with HMAC signing ──
    - platform: custom
      enabled: true
      endpoint: "https://your-webhook.example.com/aegisgate"
      auth:
        type: hmac
        hmac_secret: "your-hmac-secret"
```

### CLI Flag

```bash
./aegisgate --soar-enabled
# or via environment:
AEGISGATE_SOAR_ENABLED=true ./aegisgate
```

### Incident Structure

Each SOAR incident contains:

| Field | Description | Example |
|------|-------------|---------|
| `id` | Incident ID | `INC-001` |
| `title` | Short title | `HIPAA Access Control Violation` |
| `description` | Detailed description | `PII detected in AI request: SSN pattern matched` |
| `severity` | Mapped to platform severity | `critical` |
| `status` | Lifecycle state | `triggered`, `acknowledged`, `resolved` |
| `source` | Always `aegisgate` | `aegisgate` |
| `timestamp` | UTC timestamp | `2026-08-10T12:00:00Z` |
| `framework` | Compliance framework | `hipaa`, `cjis`, `soc2` |
| `control_id` | Control identifier | `HIPAA-AC-001` |
| `control_name` | Control name | `Access Control` |
| `details` | Extended details | `User attempted to send SSN to ChatGPT` |
| `remediation` | Suggested fix | `Review data handling policy, redact SSN` |
| `affected_systems` | List of systems | `["chatgpt.com"]` |
| `dedup_key` | PagerDuty dedup key | `aegisgate-hipaa-HIPAA-AC-001` |

**No prompt content or PII in the incident payload.** Details are metadata descriptions, not raw user input.

### Health Check

```bash
curl http://localhost:8443/api/v1/soar/health
```

Returns per-platform delivery health, last send time, and error count.

---

## Combined SIEM + SOAR Deployment

A typical enterprise deployment uses both:

```
AI Traffic → AegisGate Platform
                    │
                    ├── SIEM → Splunk (all events, for analysis & dashboards)
                    │       → Datadog (all events, for DevOps observability)
                    │
                    └── SOAR → PagerDuty (critical/high → page on-call)
                              → Jira (medium+ → create ticket for SOC)
                              → ServiceNow (all → GRC tracking & compliance)
```

### Example: ServiceNow + Splunk

```yaml
# aegisgate-platform.yaml
siem:
  enabled: true
  source: "aegisgate"
  platforms:
    - platform: splunk
      enabled: true
      format: cef
      endpoint: "https://splunk.company.com:8088/services/collector"
      auth:
        type: api_key
        api_key: "hec-token-here"

soar:
  enabled: true
  source: "aegisgate"
  platforms:
    - platform: servicenow
      enabled: true
      endpoint: "https://company.service-now.com/api/now/table/incident"
      auth:
        type: basic
        username: "aegisgate-bot"
        password: "secure-password"
      settings:
        assignment_group: "Security Operations"
        category: "security"
        subcategory: "ai_compliance"
```

---

## Verification

After configuring SIEM/SOAR, verify:

```bash
# Check SIEM health
curl -s http://localhost:8443/api/v1/siem/health | jq

# Check SOAR health
curl -s http://localhost:8443/api/v1/soar/health | jq

# Generate a test detection (requires auth)
curl -X POST http://localhost:8443/api/v1/scan \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"input":"My SSN is 123-45-6789","model":"gpt-4"}'

# Check that the event appeared in your SIEM/SOAR
```

---

## Privacy Guarantee

All SIEM and SOAR events are **metadata-only**:

- ✅ No prompt text is sent to SIEM or SOAR
- ✅ No PII values are sent (only the category `pii` and the pattern matched, not the actual PII)
- ✅ No secrets are sent (only the category `secrets` and the pattern name, not the secret value)
- ✅ User identifiers are SHA-256 hashed
- ✅ Domain identifiers are SHA-256 hashed
- ✅ Timestamps are UTC ISO-8601

This means your SIEM/SOAR integration does not create a secondary data store of sensitive information. The audit trail, SIEM events, and SOAR incidents all contain only structural metadata about what happened — never the content of what was detected.