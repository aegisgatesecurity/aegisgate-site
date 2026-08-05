---
title: Architecture
description: AegisGate Platform architecture — six-pillar AI security gateway, protocol stack, data flow, and deployment topology.
weight: 410
---

## Architecture

AegisGate is a six-pillar AI security gateway built in Go with zero external runtime dependencies.

### Six Security Pillars

```
┌─────────────────────────────────────────────────────┐
│                   AegisGate v4.0.0                   │
├─────────┬─────────┬─────────┬──────────┬──────────┤
│  HTTP   │   MCP   │   A2A   │   ACP    │   ANP    │
│  API    │Protocol │ Protocol│Protocol  │Protocol  │
├─────────┴─────────┴─────────┴──────────┴──────────┤
│                    RESPONSE                          │
│              (Output Safety Layer)                   │
├─────────────────────────────────────────────────────┤
│               ML Detection Engine                    │
│            (CNN-BiLSTM + Regex Pipeline)             │
├─────────────────────────────────────────────────────┤
│            Trust & Compliance Engine                  │
│         (27 Frameworks · 312 Controls)              │
├─────────────────────────────────────────────────────┤
│              Audit & Evidence Engine                  │
│        (ATLAS-Mapped · SOC 2 Evidence)              │
└─────────────────────────────────────────────────────┘
```

### Request Flow

1. **Ingress**: Client request arrives at one of the five protocol pillars
2. **Screening**: ML engine classifies the request (regex + neural network)
3. **Policy**: Trust engine applies compliance rules and rate limits
4. **Forward**: Clean requests are forwarded to the upstream AI service
5. **Response**: AI response is filtered through the RESPONSE pillar
6. **Audit**: Full detection evidence is logged with ATLAS mapping

### Technology Stack

| Component | Technology |
|-----------|-----------|
| Core | Go 1.26+, statically compiled |
| ML Runtime | ONNX Runtime (optional, graceful degradation) |
| Container | Docker (34.7MB image) |
| Orchestration | Kubernetes (Helm chart provided) |
| Observability | Prometheus metrics, structured JSON logging |
| Dependencies | Zero external runtime dependencies |

_See also: [Performance](/docs/performance/) and [Deployment](/docs/deployment/)._
