---
title: Performance
description: AegisGate Platform performance benchmarks, latency metrics, throughput capacity, and resource requirements for production deployments.
weight: 430
---

## Performance

AegisGate is engineered for minimal latency impact while providing comprehensive security enforcement.

### Latency Benchmarks

| Operation | p50 | p95 | p99 |
|-----------|-----|-----|-----|
| Prompt screening (regex) | <1ms | 2ms | 5ms |
| Prompt screening (ML) | 4ms | 8ms | 12ms |
| Response filtering | <1ms | 2ms | 5ms |
| Full pipeline (regex + ML) | 5ms | 10ms | 18ms |
| Configuration reload | <1ms | — | — |

### Throughput

| Metric | Value |
|--------|-------|
| Sustained throughput | **23,578 RPS** (5,000 VUs, 0% error) |
| Ceiling test | 7,310,431 requests, 0% error rate |
| Single-instance ceiling | 5,000 concurrent VUs |
| Memory footprint (idle) | 19.1MB |
| Memory footprint (screening) | ~50MB |

### Resource Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 1 core | 4+ cores |
| RAM | 128MB | 512MB |
| Disk | 100MB | 1GB |
| Network | 10Mbps | 100Mbps |

### Docker Image

The AegisGate container image is **19.1MB** with zero external dependencies — no Python, no Java, no Node.js runtime. Just a single statically-linked Go binary.

```bash
docker pull ghcr.io/aegisgatesecurity/aegisgate-platform:v4.3.0
```

_See also: [Installation](/docs/installation/) and [Configuration](/docs/configuration/)._
