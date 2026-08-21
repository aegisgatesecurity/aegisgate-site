---
title: "Tenant Management"
description: "Multi-tenant management API for MSP/MSSP operators — create, list, update, and delete tenants with PostgreSQL persistence and Row-Level Security"
weight: 350
---

## Tenant Management

AegisGate Platform v4.3.0+ includes a tenant management API for MSP/MSSP operators who need to manage multiple isolated tenants on a single AegisGate deployment.

### Overview

Multi-tenant support operates at three layers:

| Layer | Mechanism | Status |
|-------|-----------|--------|
| **Data isolation** | PostgreSQL Row-Level Security (RLS) on 6 tenant-scoped tables | ✅ Migration 008 |
| **Application filtering** | `tenant_id` columns + application-level query filtering | ✅ Existing |
| **Management API** | REST CRUD for tenant metadata with PostgreSQL persistence | ✅ v4.3.0 |

### API Endpoints

All endpoints require authentication. Write operations (POST, PUT, DELETE) require the `user:manage` permission (admin role only).

| Method | Path | Description | Permission |
|--------|------|-------------|------------|
| `GET` | `/api/v1/tenants` | List all tenants | `RequireAuth` |
| `POST` | `/api/v1/tenants` | Create a tenant | `user:manage` |
| `GET` | `/api/v1/tenants/{id}` | Get a tenant by ID | `RequireAuth` |
| `PUT` | `/api/v1/tenants/{id}` | Update a tenant | `user:manage` |
| `DELETE` | `/api/v1/tenants/{id}` | Delete a tenant | `user:manage` |

### Examples

**Create a tenant:**

```bash
curl -X POST http://localhost:8443/api/v1/tenants \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corp",
    "displayName": "Acme Corporation",
    "email": "admin@acme.com",
    "licenseTier": "professional",
    "maxUsers": 50,
    "maxAgents": 10
  }'
```

Response:

```json
{
  "id": "tnt_a1b2c3d4e5f6a7b8",
  "name": "Acme Corp",
  "displayName": "Acme Corporation",
  "email": "admin@acme.com",
  "licenseTier": "professional",
  "maxUsers": 50,
  "maxAgents": 10,
  "active": true,
  "createdAt": "2026-08-21T15:30:00Z",
  "updatedAt": "2026-08-21T15:30:00Z"
}
```

**List all tenants:**

```bash
curl http://localhost:8443/api/v1/tenants \
  -H "Authorization: Bearer $TOKEN"
```

**Update a tenant:**

```bash
curl -X PUT http://localhost:8443/api/v1/tenants/tnt_a1b2c3d4e5f6a7b8 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"maxUsers": 100, "active": false}'
```

### Storage Backends

| Backend | When | Persistence |
|---------|------|-------------|
| **PostgreSQL** | `DATABASE_URL` set + Professional/Enterprise tier | Persistent across restarts |
| **In-memory** | No database or Community/Developer tier | Lost on restart |

The platform automatically selects PostgreSQL when available. If PostgreSQL is not configured, it falls back to in-memory storage with a warning log.

### Row-Level Security (RLS)

Migration 008 enables PostgreSQL RLS on 6 tenant-scoped tables:

- `ioc_fingerprints`, `ioc_events`
- `rbac_agents`, `rbac_agent_sessions`, `rbac_user_sessions`
- `license_cache`

RLS policies use `app.tenant_id` and `app.is_admin` session variables. The application sets these before executing queries:

```go
ioc.WithTenantContext(ctx, pool, tenantID, isAdmin, func(tx pgx.Tx) error {
    // All queries in this transaction are RLS-filtered
    return tx.QueryRow(ctx, "SELECT ...").Scan(...)
})
```

Admin users (`is_admin = true`) bypass RLS filtering. Shared data (empty `tenant_id`) is accessible to all tenants.

### Tenant Context in Authentication

Tenant context is propagated through the auth middleware:

| Auth Method | Tenant ID Source | Admin Bypass |
|-------------|-----------------|--------------|
| SSO | (empty — single-tenant default) | Role = admin |
| JWT | (empty — single-tenant default) | Role = admin |
| Scoped API token | 4th field in token definition | Role = admin |
| Legacy API token | N/A | Always admin |
| Dev mode | N/A | Always admin |

### Scoped API Tokens with Tenant Context

Scoped API tokens can include a tenant ID as the 4th colon-separated field:

```bash
# Format: token:role:tier[:tenant_id]
export AEGISGATE_SCOPED_TOKENS="svc-acme:analyst:professional:tnt_a1b2c3d4e5f6a7b8,svc-admin:admin:enterprise"
```

In this example, `svc-acme` is scoped to tenant `tnt_a1b2c3d4e5f6a7b8` with analyst role, while `svc-admin` has admin access (no tenant filtering).