---
title: "Scoped API Tokens"
description: "Least-privilege API tokens with per-token role, tier, and tenant isolation for service accounts and CI/CD"
weight: 360
---

## Scoped API Tokens

AegisGate Platform v4.3.0+ supports scoped API tokens that restrict access by role, tier, and tenant. This provides least-privilege access for service accounts, CI/CD pipelines, and automated integrations.

### Configuration

Scoped tokens are configured via the `AEGISGATE_SCOPED_TOKENS` environment variable:

```bash
# Format: token:role:tier[:tenant_id],token2:role2:tier2[:tenant_id2],...
export AEGISGATE_SCOPED_TOKENS="svc-monitor:viewer:community,svc-compliance:compliance_officer:professional,svc-acme:analyst:professional:tnt_a1b2c3d4e5f6a7b8"
```

### Token Fields

| Field | Position | Required | Description |
|-------|----------|----------|-------------|
| Token | 1st | Yes | The API token string (use a strong random value) |
| Role | 2nd | Yes | RBAC role: `viewer`, `analyst`, `compliance_officer`, or `admin` |
| Tier | 3rd | Yes | License tier: `community`, `developer`, `professional`, or `enterprise` |
| Tenant ID | 4th | No | Tenant ID for multi-tenant isolation (e.g., `tnt_a1b2c3d4e5f6a7b8`) |

### Role Permissions

| Role | Key Permissions |
|------|-----------------|
| `viewer` | Read-only access to dashboard, metrics, compliance status |
| `analyst` | Viewer + IOC management, incident review, audit log access |
| `compliance_officer` | Analyst + compliance scan, evidence collection, report generation |
| `admin` | Full access — all resources, all actions, bypasses tenant filtering |

### Precedence Rules

1. **Scoped tokens take precedence** over the legacy `AEGISGATE_API_TOKEN` when both match
2. The legacy admin token (`AEGISGATE_API_TOKEN`) still works for backward compatibility — it gets `admin` role with `enterprise` tier
3. Invalid entries in `AEGISGATE_SCOPED_TOKENS` are silently skipped (fail-safe)
4. If a token matches both scoped and legacy, the scoped token's restrictions apply

### Example Use Cases

**Monitoring service (read-only):**
```bash
export AEGISGATE_SCOPED_TOKENS="prom-scraper:viewer:community"
```
This token can scrape `/metrics` and view dashboard data but cannot modify anything.

**Compliance automation (CI/CD):**
```bash
export AEGISGATE_SCOPED_TOKENS="ci-compliance:compliance_officer:professional"
```
This token can trigger compliance scans and collect evidence but cannot change config.

**Multi-tenant MSP (per-tenant service):**
```bash
export AEGISGATE_SCOPED_TOKENS="svc-acme:analyst:professional:tnt_a1b2c3d4e5f6a7b8,svc-globex:analyst:professional:tnt_b2c3d4e5f6a7b8c9"
```
Each token is scoped to a specific tenant — RLS policies ensure data isolation.

### Security Considerations

- **Use strong token values**: Generate tokens with `openssl rand -hex 32` or equivalent
- **Rotate regularly**: Update tokens and restart the platform to apply changes
- **Principle of least privilege**: Assign the minimum role needed for the use case
- **Tenant isolation**: For multi-tenant deployments, always include the tenant ID field
- **Fail-safe**: If a token is invalid or the env var is malformed, the token is simply not available — no security bypass

### Usage

Clients authenticate with scoped tokens using the `X-API-Token` header:

```bash
curl http://localhost:8443/api/v1/compliance \
  -H "X-API-Token: svc-compliance"
```