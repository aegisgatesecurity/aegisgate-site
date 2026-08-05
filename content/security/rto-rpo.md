---
title: "Recovery Time and Point Objectives"
description: "AegisGate Security Platform recovery time objectives (RTO) and recovery point objectives (RPO). Formal availability and data recovery targets by tier."
type: "security"
date: 2026-07-29
layout: single
---

# Recovery Time and Point Objectives

**Version:** 1.0
**Owner:** AegisGate Security, LLC
**Review Cycle:** Annual (next review: Q3 2027)
**Contact:** security@aegisgatesecurity.io

---

## Overview

This document defines AegisGate Security Platform's Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) for each deployment component. These targets support SOC 2 Availability criteria, HIPAA contingency planning requirements (45 C.F.R. § 164.308(a)(7)), and business continuity planning.

AegisGate is a self-hosted, on-premises security gateway. Infrastructure recovery is the customer's responsibility. This document covers the Platform software components and the recovery capabilities AegisGate provides.

---

## Architecture Context

| Component | State | Deployment | Recovery Model |
|-----------|-------|------------|----------------|
| AegisGate binary (34.7 MB) | Stateless | Docker container | Pull and recreate |
| Configuration (YAML) | Semi-stateful | Volume mount | Customer-managed backup |
| Audit logs (hash-chained) | Stateful | Volume mount | Customer-managed backup |
| License key (ECDSA P-256) | Stateless | Environment variable | Re-download from portal |
| Session state (Redis) | Ephemeral | In-memory | Auto-reconstructed |
| Compliance engine | Stateless | Embedded in binary | Recreated on startup |

---

## Recovery Time Objectives

### Platform Software

| Component | RTO | Rationale |
|-----------|-----|-----------|
| **AegisGate container** | 15 minutes | Docker pull + container start. No initialization dependencies. |
| **Configuration restoration** | 30 minutes | Restore from version-controlled YAML backup. |
| **License reactivation** | 5 minutes | Re-download from portal or restore environment variable. |
| **Compliance engine warm-up** | 2 minutes | Framework registration and pattern compilation on startup. |
| **Full service restoration** | **45 minutes** | Worst case: container + config + license + warm-up. |

### Infrastructure (Customer Responsibility)

| Component | Target RTO | Rationale |
|-----------|------------|-----------|
| **Host OS recovery** | 2–4 hours | Customer-managed. VM restore or re-provisioning. |
| **Docker daemon** | 15 minutes | Standard package installation. |
| **Network reconfiguration** | 30 minutes | Customer-managed firewall, DNS, load balancer rules. |
| **Volume restoration** | 1–2 hours | Customer-managed backup restoration. |
| **Full environment restoration** | **4–8 hours** | Worst case: complete environment rebuild. |

### Tier-Specific Targets

| Tier | Overall RTO | SLA | Rationale |
|------|------------|-----|-----------|
| **Community** | 24 hours | Best effort | No guaranteed response time |
| **Starter** | 8 hours | Next business day | Email support |
| **Developer** | 4 hours | Same business day | Priority email |
| **Professional** | 2 hours | 24/7 security support | Dedicated security channel |
| **Enterprise** | 1 hour | 24/7 + dedicated engineer | Named engineer on-call |

---

## Recovery Point Objectives

### Platform Data

| Data Type | RPO | Mechanism |
|-----------|-----|-----------|
| **AegisGate configuration** | 0 (stateless) | Declarative YAML, version-controlled by customer |
| **Compliance engine state** | 0 (reconstructed) | Derived from configuration on startup |
| **Audit logs** | Configurable (default: 0) | Hash-chained, append-only. Customer-configurable backup frequency. |
| **License state** | 0 (stateless) | Re-validated from portal on startup |
| **Session state** | Near-zero | Redis ephemeral; sessions reconstruct on next request |

### Customer Data (Customer Responsibility)

| Data Type | Target RPO | Mechanism |
|-----------|------------|-----------|
| **Persistent volumes** | Customer-defined | Customer backup solution (e.g., Velero, AWS EBS snapshots) |
| **Database backups** | Customer-defined | Customer backup solution |
| **Audit log exports** | Customer-defined | Customer-configurable retention and export schedule |

---

## Disaster Recovery Procedures

### AegisGate Platform Recovery

1. **Pull latest container image**: `docker pull ghcr.io/aegisgatesecurity/aegisgate-platform:v4.0.0`
2. **Restore configuration**: Mount version-controlled YAML from backup
3. **Restore license**: Set `AEGISGATE_LICENSE` environment variable
4. **Start container**: `docker run -d -p 8080:8080 -p 8443:8443 ...`
5. **Verify health**: `curl https://localhost:8443/health`
6. **Validate compliance**: `curl https://localhost:8443/api/v1/compliance/status`

### Failover Verification

After recovery, validate:

- [ ] Health endpoint returns 200 OK
- [ ] Compliance engine reports all frameworks registered
- [ ] Audit log chain integrity verified
- [ ] TLS certificates valid
- [ ] RBAC policies loaded
- [ ] Rate limiting active
- [ ] MCP guardrails active

---

## Business Continuity Considerations

| Scenario | Impact | Mitigation |
|----------|--------|------------|
| **Single container failure** | Service unavailable until restart (15 min RTO) | Docker restart policy, health check monitoring |
| **Configuration corruption** | Service starts with defaults | Version-controlled YAML, automated backup |
| **License key expiration** | 7-day grace period, then fail-closed | License auto-renewal, expiration alerts |
| **Audit log volume full** | Logs stop writing, compliance risk | Configurable retention, rotation alerts |
| **Host OS failure** | Full environment rebuild (4-8 hours) | Customer-managed DR, infrastructure-as-code |
| **Complete data center loss** | Full recovery from backup (8+ hours) | Customer-managed off-site backup, multi-region |

---

## Testing Schedule

| Test | Frequency | Responsible | Last Completed |
|------|-----------|-------------|----------------|
| Container recreation | Quarterly | Engineering | 2026-07-29 |
| Configuration restoration | Quarterly | Engineering | 2026-07-29 |
| License reactivation | Annually | Engineering | 2026-07-29 |
| Full DR test | Annually | Engineering + Customer | 2026-07-29 |
| Failover verification | Quarterly | Engineering | 2026-07-29 |

---

## Attestation

This document was reviewed and approved by:

| Role | Name | Date |
|------|------|------|
| VP Engineering | AegisGate Security, LLC | 2026-07-29 |
| Security Lead | AegisGate Security, LLC | 2026-07-29 |