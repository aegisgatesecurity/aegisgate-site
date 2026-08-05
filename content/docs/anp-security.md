---
title: ANP Protocol Security
description: AegisGate security enforcement for the Agent Network Protocol (ANP) — securing multi-agent network topologies, service discovery, and mesh communication.
weight: 240
---

## ANP Protocol Security

AegisGate enforces security for the Agent Network Protocol (ANP), securing multi-agent network topologies and service discovery.

### Threat Landscape

ANP enables dynamic agent networks with service discovery and mesh communication:

- **Rogue agent injection**: Unauthorized agents joining the network
- **Service discovery poisoning**: Advertising malicious services to agents
- **Network topology manipulation**: Redirecting agent communication paths
- **Mesh communication eavesdropping**: Intercepting messages in the agent mesh

### AegisGate Enforcement

| Layer | Protection | Detection Rate |
|-------|-----------|----------------|
| Network admission | Agent identity verification | Full verification |
| Service discovery | Signed service advertisements | 100% (adversarial suite) |
| Mesh integrity | Topology validation, anomaly detection | 87%+ coverage |
| Rate limiting | Per-agent, per-service | Configurable |

### Configuration

```yaml
anp:
  enabled: true
  admission:
    require_agent_identity: true
    reject_unknown_agents: true
  discovery:
    verify_service_signatures: true
  mesh:
    max_network_diameter: 4
    topology_check_interval: 30s
```

_For general security architecture, see [Security Overview](/docs/security/)._
