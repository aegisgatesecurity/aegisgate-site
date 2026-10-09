---
title: "MCP Deployment Guide"
description: "Deploy AegisGate MCP in production — Docker, TLS, air-gapped setups, ML detection, and health monitoring"
type: docs
weight: 54
---

# Deployment Guide

> **License:** Apache-2.0 &nbsp;|&nbsp; **Version:** 1.4.2 &nbsp;|&nbsp; **Go:** 1.26+ &nbsp;|&nbsp; **Dependencies:** Zero external runtime dependencies

---

## Docker Deployment

### Full ML-Enabled Image (~135 MB)

```bash
docker build -t aegisgate-mcp .
docker run -d --name aegisgate-mcp \
  -p 8081:8081 \
  aegisgate-mcp --transport http --token my-secret
```

### Heuristic-Only Image (~8 MB)

```bash
docker build --build-arg CGO_ENABLED=0 -t aegisgate-mcp:lite .
docker run -d --name aegisgate-mcp \
  -p 8081:8081 \
  aegisgate-mcp:lite --transport http --token my-secret
```

### Pre-built Image from GHCR

```bash
docker pull ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.2
docker run -d --name aegisgate-mcp \
  -p 8081:8081 \
  ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.2 \
  --transport http --demo
```

### Docker Compose

```yaml
version: '3.8'
services:
  aegisgate-mcp:
    image: ghcr.io/aegisgatesecurity/aegisgate-mcp:1.4.2
    ports:
      - "8081:8081"
      - "8082:8082"  # health checks
    command: --transport http --token ${MCP_TOKEN} --health-addr :8082
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8082/healthz"]
      interval: 30s
      timeout: 5s
      retries: 3
```

---

## TLS Configuration

### Generate Certificates

```bash
# Certificate Authority
openssl genrsa -out ca.key 4096
openssl req -new -x509 -key ca.key -out ca.pem -days 3650 -subj "/CN=AegisGate CA"

# Server certificate
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/CN=mcp-server"
openssl x509 -req -in server.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out server.pem -days 365
```

### Start with TLS

```bash
./mcp-server --transport http --tls --tls-cert server.pem --tls-key server.key --addr :8443
```

### Start with mTLS (Client Certificates)

```bash
./mcp-server --transport http \
  --tls --tls-cert server.pem --tls-key server.key \
  --tls-client-ca ca.pem \
  --tls-min-version 1.3 \
  --addr :8443
```

---

## Air-Gapped Deployment

AegisGate MCP is designed for air-gapped environments. The repository contains everything needed to build and run — no external downloads required.

### Offline Build

```bash
# On a connected machine
git clone https://github.com/aegisgatesecurity/aegisgate-mcp.git
cd aegisgate-mcp
go build -o mcp-server ./cmd/mcp-server

# Transfer the binary to the air-gapped machine
scp mcp-server user@airgap-server:/usr/local/bin/
```

### Offline Docker Build

```bash
# On a connected machine
docker save aegisgate-mcp | gzip > aegisgate-mcp.tar.gz

# Transfer and load on the air-gapped machine
gunzip -c aegisgate-mcp.tar.gz | docker load
```

---

## Health Monitoring

### Health Check Endpoints

Start with `--health-addr :8082` to enable:

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `GET /healthz` | Liveness | `{"status":"ok"}` |
| `GET /readyz` | Readiness | `{"status":"ready"}` |
| `GET /stats` | Runtime stats | JSON with tools, sessions, connections, audit entries |

### Kubernetes Probes

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8082
  initialDelaySeconds: 5
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /readyz
    port: 8082
  initialDelaySeconds: 10
  periodSeconds: 5
```

---

## ML Detection Setup

### CGO-Enabled Build (Full ML)

```bash
CGO_ENABLED=1 go build -o mcp-server ./cmd/mcp-server
```

Requires the vendored ONNX Runtime libraries in `lib/` and model in `models/`. These are included in the repository.

### Non-CGO Build (Heuristic Only)

```bash
CGO_ENABLED=0 go build -o mcp-server ./cmd/mcp-server
```

Falls back to regex + ATLAS heuristic detection only. The CharCNN-BiLSTM neural model is not loaded. Suitable for minimal deployments where the ~80MB of ML libraries is not needed.

---

## JSON Configuration File

For complex deployments, use a JSON config file instead of CLI flags:

```bash
./mcp-server --config /etc/aegisgate/mcp-config.json
```

```json
{
  "address": ":8081",
  "transport": "http",
  "auth_token": "my-secret-bearer",
  "health_address": ":8082",
  "max_connections": 1000,
  "tls_enabled": true,
  "tls_cert_file": "/etc/ssl/mcp/server.pem",
  "tls_key_file": "/etc/ssl/mcp/server.key",
  "tls_client_ca_file": "/etc/ssl/mcp/ca.pem",
  "tls_min_version": "1.3",
  "demo_tools": false,
  "audit_log_path": "/var/log/aegisgate/audit.jsonl",
  "max_audit_entries": 10000
}
```

---

## Production Checklist

- [ ] Authentication enabled (`--token` or config `auth_token`)
- [ ] TLS enabled with valid certificates
- [ ] Health checks configured (`--health-addr`)
- [ ] Audit logging to persistent storage
- [ ] RBAC agents enrolled with least-privilege tool access
- [ ] Policy rules configured for your environment
- [ ] Container resource limits set (memory, CPU)
- [ ] Log shipping configured for stderr output

---

## Further Reading

| Resource | Description |
|----------|-------------|
| [Getting Started](/docs/mcp-framework/getting-started/) | Installation and first run |
| [Build Your First Server](/docs/mcp-framework/building-your-first-server/) | Custom tools, RBAC, and policies tutorial |
| [Cursor Integration](/docs/mcp-framework/integrating-with-cursor/) | Streamable HTTP transport guide |
| [GitHub Docs](https://github.com/aegisgatesecurity/aegisgate-mcp/tree/main/docs) | Full documentation including admin guide, how-to guides, and more |