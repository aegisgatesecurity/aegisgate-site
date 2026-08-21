---
title: "Configuration"
description: "AegisGate configuration reference — YAML config structure, environment variable overrides, deploy profiles, and config validation"
type: docs
weight: 3
---

## Configuration

AegisGate is configured via a single YAML file. You can generate one automatically with the [setup wizard](/docs/getting-started/), use a [deploy profile](/docs/deploy-profiles/) preset, or write one manually.

### Configuration Precedence

Settings are applied in this order (highest to lowest):

1. **CLI flags** (e.g., `--proxy-port 9090`)
2. **Environment variables** (e.g., `AEGISGATE_PROXY_BIND_ADDRESS`)
3. **Config file** (YAML, specified with `--config`)
4. **Deploy profile** (preset, specified with `--profile`)
5. **Built-in defaults** (`DefaultConfig()`)

---

## Quick Start: Generate a Config

```bash
# Auto-detect environment and generate config
./aegisgate-platform setup --non-interactive

# Or use a specific profile
./aegisgate-platform setup --profile production --output /etc/aegisgate/config.yaml

# Validate before deploying
./aegisgate-platform config validate aegisgate-platform.yaml
```

---

## YAML Config Structure

The config file has these top-level sections:

```yaml
platform:       # Platform mode and shutdown timeout
proxy:          # Proxy server (bind address, upstream URL, rate limits)
agent:          # MCP/agent server settings
dashboard:      # Web dashboard
tls:            # TLS certificates, mTLS, FIPS
security:       # Security middleware (headers, CSRF, XSS, ML detection)
logging:        # Log level and format
a2a:            # Agent-to-Agent guardrails
acp:            # Agent Communication Protocol
trust:          # Trust Framework (Professional+)
persistence:    # Audit log storage
siem:           # SIEM integration (Professional+)
soar:           # SOAR integration (Professional+)
```

### Full Example (Production Profile)

```yaml
platform:
  mode: standalone          # "standalone" (embedded MCP) or "connected"
  shutdown_timeout: 30s

proxy:
  bind_address: "0.0.0.0:8080"
  upstream: "https://api.openai.com"
  rate_limit: 1000          # requests per minute (0 = unlimited)

agent:
  server:
    port: 8081
  rate_limit:
    enabled: true
    requests_per_minute: 500

dashboard:
  enabled: true
  bind_addr: "0.0.0.0"
  port: 8443
  ui_dir: "ui/frontend"

tls:
  enabled: true
  cert_file: "/data/certs/cert.pem"
  key_file: "/data/certs/key.pem"
  auto_generate: false       # Set true for self-signed certs
  min_version: "1.3"         # "1.2" or "1.3"
  mutual_tls:
    enabled: false
    mode: "optional"         # "optional" or "required"
    client_ca_file: ""
  fips:
    enabled: false
    level: "140-2"           # "140-2" or "140-3"

security:
  enable_security_headers: true
  enable_csrf: true
  enable_xss: true
  enable_panic_recovery: true
  enable_audit_middleware: true
  allowed_origins: ["https://yourdomain.com"]
  allowed_methods: ["GET", "POST", "PUT", "DELETE"]
  allowed_headers: ["Content-Type", "Authorization"]
  ml_threat_detection_enabled: false  # Enable after 7-day shadow validation
  ml_shadow_mode: true                # Log only, don't block

logging:
  level: "info"              # debug, info, warn, error
  format: "json"            # json or text

a2a:
  enabled: false
  config_file: "configs/a2a.yaml"

acp:
  enabled: false
  config_file: "configs/acp.yaml"

trust:
  enabled: false
  require_license: true      # Professional+ tier required

persistence:
  enabled: true
  data_dir: "/data"
  audit_dir: "/data/audit"
  prune_interval: 24h
  max_file_size: 52428800    # 50 MB per audit file

siem:
  enabled: false
  poll_interval: 5s
  batch_size: 100
  source: "aegisgate"
  buffer_max_size: 10000
  platforms:
    - platform: "splunk"
      enabled: true
      format: "cef"
      endpoint: "https://splunk.yourorg.com:8088/services/collector"
      auth:
        type: "api_key"
        api_key: "your-hec-token"

soar:
  enabled: false
  source: "aegisgate"
  max_retries: 3
  retry_interval: 30s
  platforms:
    - platform: "pagerduty"
      enabled: true
      endpoint: "https://events.pagerduty.com/v2/enqueue"
```

---

## Section Reference

### Platform

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `mode` | string | `standalone` | `standalone` (embedded MCP) or `connected` (external scanner) |
| `shutdown_timeout` | duration | `30s` | Grace period for in-flight requests during shutdown |

### Proxy

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bind_address` | string | `0.0.0.0:8080` | Address the proxy listens on |
| `upstream` | string | (required) | Target AI service URL (e.g., `https://api.openai.com`) |
| `rate_limit` | int | `1000` | Requests per minute (0 = unlimited, negative = error) |

### Dashboard

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `true` | Enable the web dashboard |
| `bind_addr` | string | `0.0.0.0` | Dashboard bind address |
| `port` | int | `8443` | Dashboard port (must differ from proxy and MCP) |
| `ui_dir` | string | `ui/frontend` | Path to frontend assets |

### TLS

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `false` | Enable TLS for all listeners |
| `cert_file` | string | (empty) | Path to TLS certificate (required if `auto_generate: false`) |
| `key_file` | string | (empty) | Path to TLS private key (required if `auto_generate: false`) |
| `auto_generate` | bool | `false` | Auto-generate self-signed certs on first start |
| `min_version` | string | `1.3` | Minimum TLS version: `1.2` or `1.3` |
| `mutual_tls.enabled` | bool | `false` | Enable mutual TLS |
| `mutual_tls.mode` | string | `optional` | `optional` or `required` |
| `fips.enabled` | bool | `false` | Enable FIPS mode |
| `fips.level` | string | `140-2` | `140-2` or `140-3` |

### Security

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enable_security_headers` | bool | `true` | CSP, HSTS, CORP, COEP, COOP headers |
| `enable_csrf` | bool | `false` | CSRF token validation |
| `enable_xss` | bool | `true` | XSS content scanning |
| `enable_panic_recovery` | bool | `true` | Recover from panics without crashing |
| `enable_audit_middleware` | bool | `true` | Log all requests/responses to audit trail |
| `ml_threat_detection_enabled` | bool | `false` | Enable ML threat detector (shadow mode first!) |
| `ml_shadow_mode` | bool | `true` | Log ML predictions without blocking |

### Logging

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `level` | string | `info` | `debug`, `info`, `warn`, `error` |
| `format` | string | `json` | `json` or `text` |

### Persistence

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `true` | Enable persistent audit log storage |
| `data_dir` | string | `/data` | Root data directory |
| `audit_dir` | string | `/data/audit` | Audit log directory |
| `prune_interval` | duration | `24h` | How often to prune old audit files |
| `max_file_size` | int64 | `52428800` | Max audit file size (50 MB) |

### SIEM (Professional+)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `false` | Enable SIEM event forwarding |
| `poll_interval` | duration | `5s` | How often to poll the audit ring buffer |
| `batch_size` | int | `100` | Max events per poll cycle |
| `source` | string | `aegisgate` | Source field on SIEM events |
| `buffer_max_size` | int | `10000` | Internal SIEM buffer size |

Supported SIEM platforms: Splunk, Elasticsearch, QRadar, Sentinel, Sumo Logic, LogRhythm, CloudWatch, Security Hub, ArcSight, syslog, custom.

### SOAR (Professional+)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `false` | Enable SOAR incident forwarding |
| `max_retries` | int | `3` | Retry attempts for failed deliveries |
| `retry_interval` | duration | `30s` | Delay between retries |

Supported SOAR platforms: PagerDuty, Jira, ServiceNow, custom webhook.

---

## Environment Variable Overrides

Key settings can be overridden via environment variables without editing the config file:

| Variable | Overrides | Example |
|----------|----------|---------|
| `AEGISGATE_PLATFORM_MODE` | `platform.mode` | `connected` |
| `AEGISGATE_PROXY_BIND_ADDRESS` | `proxy.bind_address` | `0.0.0.0:9090` |
| `AEGISGATE_RATE_LIMIT` | `proxy.rate_limit` | `2000` |
| `AEGISGATE_LICENSE_KEY` | License key (CLI flag) | `your-license-key` |

Environment variables take precedence over the config file but not over CLI flags.

---

## Deploy Profiles

Instead of writing a config file from scratch, use a deploy profile preset:

| Profile | TLS | Rate Limit | Persistence | Use Case |
|---------|-----|-----------|-------------|----------|
| `quickstart` | Off | 60 RPM | In-memory | Evaluation, demos |
| `small-team` | Auto-gen | 300 RPM | File-backed | 5-50 users |
| `production` | 1.3 (bring certs) | 1,000 RPM | File-backed | Production |
| `high-security` | mTLS required | 5,000 RPM | File-backed + FIPS | Regulated industries |
| `air-gapped` | 1.3 (bring certs) | 1,000 RPM | File-backed | Isolated networks |

See [Deploy Profiles](/docs/deploy-profiles/) for detailed comparison.

---

## Config Validation

Validate a config file before deploying:

```bash
./aegisgate-platform config validate aegisgate-platform.yaml
```

Checks performed:
- Port conflicts (proxy, MCP, dashboard must be distinct)
- Required fields (bind address, upstream URL, data directory)
- TLS cert file paths exist (when `auto_generate: false`)
- Valid TLS version (`1.2` or `1.3`)
- Valid mTLS mode (`optional` or `required`)
- Valid FIPS level (`140-2` or `140-3`)
- Valid log level and format
- Positive rate limits
- SIEM platforms have endpoints
- ML detection with shadow mode warning
- A2A/ACP config file existence
- Trust framework license requirement warning

### Show Effective Config

```bash
# Show as YAML
./aegisgate-platform config show aegisgate-platform.yaml

# Show as JSON
./aegisgate-platform config show --format json
```

---

## Next Steps

- [Deploy Profiles](/docs/deploy-profiles/) — Profile comparison and selection guide
- [CLI Reference](/docs/cli-reference/) — All commands and flags
- [Deployment](/docs/deployment/) — Production deployment options
- [SIEM Integration](/docs/siem-soar-integration/) — Forward events to Splunk, Elastic, etc.