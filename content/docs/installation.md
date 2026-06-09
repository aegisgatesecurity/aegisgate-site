---
title: "Installation"
description: "Install AegisGate Security Platform"
type: docs
---

## Installation

AegisGate can be deployed via Docker, Kubernetes, or direct binary installation.

### Docker (Recommended)

The fastest way to get started:

```bash
# Pull the latest image
docker pull ghcr.io/aegisgatesecurity/aegisgate-platform:latest

# Run with default ports
docker run -d \
  --name aegisgate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:latest
```

**With persistent configuration:**

```bash
docker run -d \
  --name aegisgate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  -v /path/to/config.yaml:/etc/aegisgate/config.yaml \
  ghcr.io/aegisgatesecurity/aegisgate-platform:latest
```

### Kubernetes (Helm)

Deploy via Helm chart for production environments:

```bash
# Add Helm repository
helm repo add aegisgate https://aegisgatesecurity.github.io/helm
helm repo update

# Install with default values
helm install aegisgate aegisgate/aegisgate-platform

# Customize via values file
helm install aegisgate aegisgate/aegisgate-platform -f custom-values.yaml
```

**Example values.yaml:**

```yaml
replicaCount: 3

ports:
  proxy: 8080
  mcp: 8081
  dashboard: 8443

resources:
  limits:
    cpu: 2000m
    memory: 4Gi
  requests:
    cpu: 500m
    memory: 1Gi

persistence:
  enabled: true
  size: 10Gi
```

### Kubernetes Operator

For GitOps workflows, use the Kubernetes Operator:

```bash
# Install operator
kubectl apply -f https://operatorhub.io/aegisgate-operator.yaml

# Create AegisGate instance
kubectl apply -f - <<EOF
apiVersion: aegisgate.io/v1
kind: AegisGate
metadata:
  name: my-aegisgate
spec:
  tier: developer
  replicas: 3
EOF
```

### Binary Installation

Download binaries from GitHub releases:

```bash
# Linux
wget https://github.com/aegisgatesecurity/aegisgate-platform/releases/latest/aegisgate-linux-amd64
chmod +x aegisgate-linux-amd64
./aegisgate-linux-amd64 serve
```

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 2 GB | 4 GB |
| Disk | 10 GB | 50 GB |
| Network | 100 Mbps | 1 Gbps |

### Verify Installation

```bash
curl http://localhost:8443/health
```

Expected response:
```json
{"status":"healthy","version":"2.0.1"}
```