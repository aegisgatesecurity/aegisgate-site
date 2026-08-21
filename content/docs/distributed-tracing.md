---
title: "Distributed Tracing"
description: "OpenTelemetry distributed tracing for AegisGate Platform — OTLP export, W3C Trace Context, and Jaeger integration"
weight: 440
---

## Distributed Tracing

AegisGate Platform v4.3.0+ includes built-in OpenTelemetry distributed tracing. Tracing is **opt-in** and disabled by default — enabling it adds zero overhead when not configured.

### Configuration

Tracing is controlled via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `AEGISGATE_TRACING_ENABLED` | `false` | Enable/disable tracing. Set to `true` to activate. |
| `AEGISGATE_TRACING_EXPORTER` | `otlp` | Exporter type: `otlp` (OTLP gRPC) or `stdout` (console output) |
| `AEGISGATE_TRACING_ENDPOINT` | `localhost:4317` | OTLP gRPC collector endpoint (e.g., Jaeger, Tempo) |
| `AEGISGATE_TRACING_SERVICE_NAME` | `aegisgate-platform` | Service name in trace attributes |
| `AEGISGATE_TRACING_SAMPLE_RATIO` | `0.1` | Sampling ratio (0.0–1.0). 1.0 = sample all requests. |

### Quick Start with Jaeger

```bash
# 1. Start Jaeger collector
docker run -d --name jaeger \
  -p 4317:4317 \
  -p 16686:16686 \
  jaegertracing/all-in-one:latest

# 2. Start AegisGate with tracing enabled
AEGISGATE_TRACING_ENABLED=true \
AEGISGATE_TRACING_ENDPOINT=localhost:4317 \
AEGISGATE_TRACING_SAMPLE_RATIO=1.0 \
./aegisgate-platform

# 3. View traces at http://localhost:16686
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aegisgate-platform
spec:
  template:
    spec:
      containers:
      - name: aegisgate
        image: ghcr.io/aegisgatesecurity/aegisgate-platform:v4.3.0
        env:
        - name: AEGISGATE_TRACING_ENABLED
          value: "true"
        - name: AEGISGATE_TRACING_ENDPOINT
          value: "otel-collector.observability.svc:4317"
        - name: AEGISGATE_TRACING_SAMPLE_RATIO
          value: "0.1"
```

### How It Works

When enabled, AegisGate wraps both the proxy and dashboard HTTP handlers with tracing middleware. Every HTTP request creates a span with:

- **Service name**: `aegisgate-platform` (configurable)
- **Span name**: HTTP method + sanitized path (e.g., `GET /api/v1/compliance`)
- **Attributes**: HTTP method, path, status code, handler name (`proxy` or `dashboard`)
- **Trace context**: W3C Trace Context headers propagated from incoming requests

The middleware sanitizes paths to reduce cardinality (e.g., `/api/v1/tenants/tnt_abc123` → `/api/v1/tenants/{id}`).

### Performance Impact

- **Disabled** (default): Zero overhead — no-op tracer provider
- **Enabled with sampling**: Overhead is proportional to sample ratio. At 10% sampling, < 0.1ms per request
- **Enabled at 100%**: ~0.5ms per request for span creation and export

### Integration with Existing Observability

Tracing complements the existing observability stack:

| Signal | Tool | Endpoint |
|--------|------|----------|
| **Metrics** | Prometheus | `/metrics` |
| **Logs** | RFC 5424 structured logging | stdout / syslog |
| **Traces** | OpenTelemetry / OTLP | configurable (default: `localhost:4317`) |

All three signals can be exported to the same collector (e.g., Grafana Alloy, OpenTelemetry Collector) for unified observability.