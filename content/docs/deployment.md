---
title: Deployment
description: AegisGate Platform deployment guide — Docker, Kubernetes, Helm, and bare-metal installation options with production best practices, ML detection setup, and ONNX Runtime configuration.
weight: 420
---

## Deployment

AegisGate can be deployed in minutes using Docker, Kubernetes, or bare metal.

### Docker (Quick Start)

```bash
docker run -d \
  --name aegisgate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.1.0
```

See the [5-Minute Quickstart](/docs/quickstart/) for the fastest path to a running instance.

### Docker with ML Detection (Recommended)

v4.1.0 introduces CNN-BiLSTM neural network detection. To enable it, mount the ONNX Runtime shared library:

```bash
# 1. Download ONNX Runtime
curl -sL https://github.com/microsoft/onnxruntime/releases/download/v1.21.0/onnxruntime-linux-x64-1.21.0.tgz | tar xz

# 2. Run with ML detection
docker run -d --name aegisgate \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  -v $(pwd)/config.yaml:/etc/aegisgate/config.yaml \
  -v $(pwd)/onnxruntime-linux-x64-1.21.0/lib/libonnxruntime.so:/usr/local/lib/libonnxruntime.so \
  -e ONNXRUNTIME_SHARED_LIBRARY_PATH=/usr/local/lib/libonnxruntime.so \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.1.0
```

**Without ONNX Runtime**, AegisGate runs in regex-only mode with 83.1% detection coverage. **With ONNX Runtime**, detection reaches 100% on the adversarial test suite with 0% false positives.

### Kubernetes (Helm)

```bash
helm repo add aegisgate https://ghcr.io/aegisgatesecurity/aegisgate-platform-chart
helm install aegisgate aegisgate/aegisgate-platform \
  --set config.apiKey=YOUR_API_KEY \
  --set config.tier=professional
```

For ML detection in Kubernetes, add the ONNX Runtime init container:

```yaml
# values.yaml
ml:
  enabled: true
  onnxRuntime:
    image: mcr.microsoft.com/onnxruntime:latest
    libraryPath: /onnxruntime/lib/libonnxruntime.so
  model:
    embedded: true  # Uses the embedded threat_cnn_bilstm.onnx
```

### Bare Metal

```bash
# 1. Download the binary
curl -sL https://github.com/aegisgatesecurity/aegisgate-platform/releases/download/v4.1.0/aegisgate-platform-linux-amd64 -o aegisgate-platform
chmod +x aegisgate-platform

# 2. (Optional) Install ONNX Runtime
curl -sL https://github.com/microsoft/onnxruntime/releases/download/v1.21.0/onnxruntime-linux-x64-1.21.0.tgz | tar xz
export ONNXRUNTIME_SHARED_LIBRARY_PATH=./onnxruntime-linux-x64-1.21.0/lib/libonnxruntime.so

# 3. Run
./aegisgate-platform --config config.yaml
```

### ML Detection Configuration

The ONNX model (`threat_cnn_bilstm.onnx`, 6.1MB) is embedded in the binary and loaded automatically when ONNX Runtime is available.

```yaml
# config.yaml
ml_detection:
  enabled: true  # Default: true when ONNX Runtime is available
  model: embedded  # "embedded" uses the bundled model, "path" for custom
  # model_path: /path/to/custom-model.onnx  # Optional: custom model
  fallback_to_regex: true  # Default: degrade gracefully if ONNX unavailable
```

### Graceful Degradation

| ONNX Runtime | Detection Mode | Coverage | Latency |
|-------------|---------------|----------|---------|
| Available | ML + Regex | 100% adversarial, 0% FPR | ~6ms |
| Unavailable | Regex Only | 83.1% | <1ms |
| Load Failure | Regex Only | 83.1% | <1ms |

The degradation path is fully automatic — no manual intervention required.

### Production Checklist

- [ ] TLS certificates configured (`tls.cert` and `tls.key` in config)
- [ ] API keys generated and stored in secrets manager
- [ ] Rate limits configured per tier
- [ ] Audit log destination configured (SIEM, file, or database)
- [ ] ML detection enabled (mount ONNX Runtime shared library)
- [ ] Health check endpoint monitored (`GET /health`)
- [ ] Prometheus metrics endpoint scraped (`GET /metrics`)
- [ ] Resource limits set (min 128MB RAM, 1 core CPU)

### Resource Requirements

| Component | Minimum | Recommended | Production |
|-----------|---------|-------------|-----------|
| CPU | 1 core | 4 cores | 8+ cores |
| RAM | 128MB | 512MB | 2GB+ |
| Disk | 100MB | 1GB | 10GB+ |
| Network | 10Mbps | 100Mbps | 1Gbps+ |

The Docker image is **19.1MB** with zero external runtime dependencies (excluding optional ONNX Runtime).

_See also: [Installation](/docs/installation/), [Configuration](/docs/configuration/), and [Performance](/docs/performance/)._