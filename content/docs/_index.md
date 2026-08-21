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

### Guided Setup (30-Second Setup)

```bash
# Build the binary
go build -o aegisgate-platform ./cmd/aegisgate-platform/

# Auto-detect your environment and generate a validated config
./aegisgate-platform setup --non-interactive

# Start the platform
./aegisgate-platform --config aegisgate-platform.yaml --embedded-mcp
```

The setup wizard auto-detects Docker, Kubernetes, systemd, or bare metal; recommends a deploy profile; generates a validated config; and prints next steps. No YAML editing required.

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
{"status":"healthy","version":"4.1.0","services":{"proxy":"up","mcp":"up","scanner":"up","a2a":"up","trust":"up"}}
```

---

## Configuration

### Deploy Profiles

Instead of editing YAML from scratch, use one of 5 predefined profiles:

| Profile | Use Case | TLS | Rate Limit |
|---------|----------|-----|------------|
| `quickstart` | Zero-config evaluation | Off | 60 RPM |
| `small-team` | 5–50 users | Auto-gen | 300 RPM |
| `production` | Hardened production | TLS 1.3 (bring certs) | 1,000 RPM |
| `high-security` | Regulated industries | mTLS + FIPS | 5,000 RPM |
| `air-gapped` | Isolated networks | TLS 1.3 (bring certs) | 1,000 RPM |

```bash
# List all profiles
./aegisgate-platform --profile list

# Run with a profile
./aegisgate-platform --profile small-team --embedded-mcp

# Generate a config from a profile for customization
./aegisgate-platform setup --profile production --output my-config.yaml
```

### Config Validation

```bash
# Validate before deploying
./aegisgate-platform config validate aegisgate-platform.yaml

# Show effective config (what the running platform would use)
./aegisgate-platform config show --format json
```

### Maintenance Windows

```bash
# Enable maintenance mode (returns 503 with Retry-After)
./aegisgate-platform maintenance enable --message "Security update in progress"

# Schedule a future window
./aegisgate-platform maintenance schedule --start "2026-09-01T02:00:00Z" --end "2026-09-01T04:00:00Z" --reason "Quarterly patch"

# Disable
./aegisgate-platform maintenance disable
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AEGIS_LICENSE` | License key | Community |
| `AEGIS_LOG_LEVEL` | Log verbosity | info |
| `AEGIS_PROXY_PORT` | HTTP proxy port | 8080 |
| `AEGIS_MCP_PORT` | MCP server port | 8081 |
| `AEGIS_DASHBOARD_PORT` | Dashboard port | 8443 |
| `AEGIS_RATE_LIMIT` | Requests per minute | 1000 |

> **Tip:** Use `./aegisgate-platform config show` to see the full effective configuration including defaults, profile values, file overrides, and environment variable overrides. Config precedence: CLI flags > env vars > config file > profile > defaults.

---

## API Reference

### Health Check

```
GET /health
```

Returns system status including all subsystem health (proxy, MCP, scanner, A2A, trust, persistence, license, certificates, SIEM).

### Proxy Endpoints

```
POST /api/v1/scan
```

Scans content for threats. Returns detection results with MITRE ATLAS mapping, PII findings, and compliance cross-references.

### Maintenance API

```
GET  /api/v1/maintenance    # Get maintenance state
POST /api/v1/maintenance     # Enable/disable/schedule
```

---

## Next Steps

- [Deploy Profiles](/docs/deploy-profiles/) - 5 configuration presets for every deployment scenario
- [Getting Started Guide](/docs/getting-started/) - Step-by-step setup, configuration, and first-request walkthrough
- [Configuration Reference](/docs/configuration/) - Full config file format, environment variables, and precedence rules
- [Compliance Frameworks](/docs/compliance/) - 31 frameworks, 2,043 controls, 1,457 automated
- [Tier Comparison](/docs/tiers/) - Community, Developer, Professional, and Enterprise editions
- [Detection Coverage Matrix](/docs/detection-coverage/) - Per-category detection rates and evasion resistance scores
- [Graceful Degradation](/docs/graceful-degradation/) - How AegisGate maintains security when ML is unavailable
- [Technical Details](/tech/) - Deep dive into architecture
- [Blog](/blog/) - Security research and updates
