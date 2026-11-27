---
title: Architecture
description: AegisGate Platform architecture — six-pillar AI security gateway, protocol stack, data flow, and deployment topology.
weight: 410
---

<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>


## Architecture

AegisGate is a six-pillar AI security gateway built in Go with zero external runtime dependencies.

### Six Security Pillars

```
┌─────────────────────────────────────────────────────┐
│                   AegisGate v5.2.1                   │
├─────────┬─────────┬─────────┬──────────┬──────────┤
│  HTTP   │   MCP   │   A2A   │   ACP    │   ANP    │
│  API    │Protocol │ Protocol│Protocol  │Protocol  │
├─────────┴─────────┴─────────┴──────────┴──────────┤
│                    RESPONSE                          │
│              (Output Safety Layer)                   │
├─────────────────────────────────────────────────────┤
│             Detection Engine                          │
│        (Regex + ATLAS Pipeline; ML withdrawn)        │
├─────────────────────────────────────────────────────┤
│            Trust & Compliance Engine                  │
│         (31 Frameworks · 2,043 controls)              │
├─────────────────────────────────────────────────────┤
│              Audit & Evidence Engine                  │
│        (ATLAS-Mapped · SOC 2 Evidence)              │
└─────────────────────────────────────────────────────┘
```

### Request Flow

1. **Ingress**: Client request arrives at one of the five protocol pillars
2. **Screening**: Detection engine classifies the request (regex + ATLAS; the neural ML layer was withdrawn 2026-11-23)
3. **Policy**: Trust engine applies compliance rules and rate limits
4. **Forward**: Clean requests are forwarded to the upstream AI service
5. **Response**: AI response is filtered through the RESPONSE pillar
6. **Audit**: Full detection evidence is logged with ATLAS mapping

### Technology Stack

| Component | Technology |
|-----------|-----------|
| Core | Go 1.26+, statically compiled |
| Detection | Regex + MITRE ATLAS (deterministic); ML withdrawn 2026-11-23 |
| Container | Docker (19.1MB image) |
| Orchestration | Kubernetes (Helm chart provided) |
| Observability | Prometheus metrics, structured JSON logging |
| Dependencies | Zero external runtime dependencies |

_See also: [Performance](/docs/performance/) and [Deployment](/docs/deployment/)._
