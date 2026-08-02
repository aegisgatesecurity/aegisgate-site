---
title: "Getting Started"
description: "Get started with AegisGate Security Platform in 60 seconds"
type: docs
---

## Getting Started

Welcome to the AegisGate Security Platform. This guide will have you protecting your AI infrastructure in under 60 seconds.

### Prerequisites

- Docker 20.10+ or container runtime
- 2GB RAM minimum (4GB recommended)
- Port 8080, 8081, 8443 available

### Quick Start (Docker)

The fastest way to deploy AegisGate:

```bash
docker run -d \
  --name aegisgate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v3.6.2
```

### Verify Installation

Check that all services are running:

```bash
curl http://localhost:8443/health
```

Expected response:

```json
{
  "status": "healthy",
  "version": "3.6.2",
  "services": {
    "proxy": "up",
    "mcp": "up",
    "scanner": "up",
    "a2a": "up",
    "trust": "up"
  }
}
```

### Your First Scan

Test the threat detection with sample content:

```bash
curl -X POST http://localhost:8080/v1/scan \
  -H "Content-Type: application/json" \
  -d '{"content": "API Key: sk-abc123xyz789"}'
```

AegisGate will detect and block the exposed secret.

### Next Steps

1. **[Configuration](/docs/configuration/)** - Customize settings for your environment
2. **[Installation](/docs/installation/)** - Deploy via Kubernetes or binaries
3. **[API Reference](/docs/api-reference/)** - Integrate with your applications
4. **[Security](/docs/security/)** - Understand AegisGate's protection capabilities