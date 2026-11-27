---
title: Deployment
description: AegisGate Platform deployment guide — Docker, Kubernetes, Helm, and bare-metal installation options with production best practices and deterministic detection configuration.
weight: 420
---


<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>

## Deployment

AegisGate can be deployed in minutes using Docker, Kubernetes, or bare metal. The **Guided Setup** features (v4.4.0+) make deployment even simpler — use the setup wizard to auto-detect your environment and generate a validated config, or pick a deploy profile that matches your use case.

### Guided Setup (30-Second Setup)

```bash
# Build the binary
go build -o aegisgate-platform ./cmd/aegisgate-platform/

# Auto-detect your environment and generate a validated config
./aegisgate-platform setup --non-interactive

# Start the platform
./aegisgate-platform --config aegisgate-platform.yaml --embedded-mcp
```

The setup wizard detects Docker, Kubernetes, systemd, or bare metal; recommends a deploy profile; generates a validated YAML config with TLS paths auto-filled; and prints next steps. No YAML editing required.

**Deploy profiles** (5 presets for every scenario):

| Profile | TLS | Rate Limit | Use Case |
|---------|-----|------------|----------|
| `quickstart` | Off | 60 RPM | Zero-config evaluation |
| `small-team` | Auto-generated | 300 RPM | 5–50 users |
| `production` | TLS 1.3 (bring certs) | 1,000 RPM | Hardened production |
| `high-security` | mTLS + FIPS | 5,000 RPM | Regulated industries (HIPAA, SOC 2, EU AI Act) |
| `air-gapped` | TLS 1.3 (bring certs) | 1,000 RPM | Isolated networks (FedRAMP, CMMC, HITRUST) |

```bash
# List all profiles
./aegisgate-platform --profile list

# Run with a profile (no config file needed)
./aegisgate-platform --profile small-team --embedded-mcp

# Generate a config from a profile for customization
./aegisgate-platform setup --profile production --output my-config.yaml
```

**Config precedence**: CLI flags > env vars > config file > profile > defaults.

### Config Validation

Before deploying, validate your configuration:

```bash
# Validate a config file (checks ports, TLS paths, log levels, rate limits, SIEM endpoints)
./aegisgate-platform config validate aegisgate-platform.yaml

# Show effective config (what the platform would use with all overrides applied)
./aegisgate-platform config show --format json
```

### Maintenance Windows

Schedule maintenance windows without taking the platform offline:

```bash
# Enable maintenance mode (returns 503 with Retry-After header to clients)
./aegisgate-platform maintenance enable --message "Security update in progress"

# Schedule a future window
./aegisgate-platform maintenance schedule --start "2026-09-01T02:00:00Z" --end "2026-09-01T04:00:00Z" --reason "Quarterly patch"

# Check status
./aegisgate-platform maintenance status

# Disable
./aegisgate-platform maintenance disable
```

During maintenance, the platform returns HTTP 503 with a `Retry-After` header. Health (`/health`), version (`/version`), and maintenance (`/api/v1/maintenance`) endpoints remain accessible so load balancers and monitoring tools can detect the maintenance state.

### Docker (Quick Start)

```bash
docker run -d \
  --name aegisgate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v5.2.1
```

See the [5-Minute Quickstart](/docs/quickstart/) for the fastest path to a running instance.

### ML Detection — Withdrawn 2026-11-23

The CNN-BiLSTM neural network detector was **withdrawn on 2026-11-23** after its training corpus failed an independent label audit (~71% of attack-labeled items flipped to benign). All ML-derived metrics are void. AegisGate runs regex + ATLAS deterministic detection; no ONNX Runtime or model mount is required or supported. See [/changelog/](/changelog/) for the notice.

```bash
docker run -d --name aegisgate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  -v $(pwd)/config.yaml:/etc/aegisgate/config.yaml \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v5.2.1
```

### Kubernetes (Helm)

```bash
helm repo add aegisgate https://ghcr.io/aegisgatesecurity/aegisgate-platform-chart
helm install aegisgate aegisgate/aegisgate-platform \
  --set config.apiKey=YOUR_API_KEY \
  --set config.tier=professional
```

ML detection was withdrawn 2026-11-23; do not enable `ml` in Helm values. Deterministic regex/ATLAS detection requires no extra components.

### Bare Metal

```bash
# 1. Download the binary
curl -sL https://github.com/aegisgatesecurity/aegisgate-platform/releases/download/v5.2.1/aegisgate-platform-linux-amd64 -o aegisgate-platform
chmod +x aegisgate-platform

# 2. Run (deterministic detection; no ONNX Runtime required)
./aegisgate-platform --config config.yaml
```

### Detection Configuration

ML detection was withdrawn 2026-11-23. The `ml_detection` settings are inert: the neural model is no longer loaded or used, and all ML-derived metrics are void. Deterministic regex + ATLAS detection is always on.

### Graceful Degradation

| Detection Mode | Status |
|-------------|--------|
| Regex + ATLAS (deterministic) | Active — always on |
| ML + Regex | Withdrawn 2026-11-23 (corpus label audit failure) |

### Production Checklist

- [ ] TLS certificates configured (`tls.cert` and `tls.key` in config)
- [ ] API keys generated and stored in secrets manager
- [ ] Rate limits configured per tier
- [ ] Audit log destination configured (SIEM, file, or database)
- [ ] Deterministic detection verified (regex + ATLAS active)
- [ ] Health check endpoint monitored (`GET /health`)
- [ ] Prometheus metrics endpoint scraped (`GET /metrics`)
- [ ] Resource limits set (min 128MB RAM, 1 core CPU)
- [ ] Config validated (`aegisgate-platform config validate`)
- [ ] Maintenance window schedule planned (if needed)

### Resource Requirements

| Component | Minimum | Recommended | Production |
|-----------|---------|-------------|-----------|
| CPU | 1 core | 4 cores | 8+ cores |
| RAM | 128MB | 512MB | 2GB+ |
| Disk | 100MB | 1GB | 10GB+ |
| Network | 10Mbps | 100Mbps | 1Gbps+ |

The Docker image is **19.1MB** with zero external runtime dependencies.

_See also: [Installation](/docs/installation/), [Configuration](/docs/configuration/), and [Performance](/docs/performance/)._