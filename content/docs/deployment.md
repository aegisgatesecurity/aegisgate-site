---
title: Deployment
description: AegisGate Platform deployment guide — Docker, Kubernetes, Helm, and bare-metal installation options with production best practices.
weight: 420
---

## Deployment

AegisGate can be deployed in minutes using Docker, Kubernetes, or bare metal.

### Docker (Quick Start)

```bash
docker run -d \
  --name aegisgate \
  -p 8080:8080 \
  -p 8443:8443 \
  -v $(pwd)/config.yaml:/etc/aegisgate/config.yaml \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.0.0
```

### Kubernetes (Helm)

```bash
helm repo add aegisgate https://ghcr.io/aegisgatesecurity/aegisgate-platform-chart
helm install aegisgate aegisgate/aegisgate-platform \
  --set config.apiKey=YOUR_API_KEY \
  --set config.tier=professional
```

### ML Detection (Optional)

To enable neural network-based detection:

1. Download the ONNX Runtime shared library for your platform
2. Set the `ONNXRUNTIME_SHARED_LIBRARY_PATH` environment variable
3. Restart AegisGate — the ML engine will activate automatically

Without ONNX Runtime, AegisGate degrades gracefully to regex-only detection (87%+ coverage).

### Production Checklist

- [ ] TLS certificates configured
- [ ] API keys generated and stored in secrets manager
- [ ] Rate limits configured per tier
- [ ] Audit log destination configured (SIEM, file, or database)
- [ ] ML detection enabled (optional but recommended)
- [ ] Health check endpoint monitored
- [ ] Prometheus metrics endpoint scraped

_See also: [Installation](/docs/installation/) and [Configuration](/docs/configuration/)._
