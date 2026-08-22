---
title: "Compliance Pipelines (v4.3.1)"
description: "DSAR, Legal Hold, and A/B Testing — GDPR Articles 15-20, e-discovery, and ML model evaluation"
weight: 25
---

# Compliance Pipelines (v4.3.1)

AegisGate v4.3.1 introduces three new compliance and testing pipelines:

## DSAR — GDPR Data Subject Access Requests

Implements GDPR Articles 15–20: right to access, right to erasure, right to data portability.

- **Export**: Produces a structured JSON bundle of all data for an entity across all registered providers
- **Erase**: Deletes all data for an entity, blocked if under legal hold

### HTTP Endpoints

| Method | Path | Role | Description |
|--------|------|------|-------------|
| POST | `/api/v1/dsar/export` | Admin | Export all data for entity |
| POST | `/api/v1/dsar/erase` | Admin | Erase all data for entity |

### SDK Usage

```go
bundle, err := client.DSAR.Export(ctx, "user-123")
result, err := client.DSAR.Erase(ctx, "user-123")
```

## Legal Hold — E-Discovery Compliance

Freezes data deletion for entities under litigation hold. When active, DSAR erasure and retention pruning skip the held entity.

### HTTP Endpoints

| Method | Path | Role | Description |
|--------|------|------|-------------|
| POST | `/api/v1/legal-holds` | Auth | Create hold |
| GET | `/api/v1/legal-holds` | Auth | List all holds |
| GET | `/api/v1/legal-holds/{id}` | Auth | Get hold by ID |
| DELETE | `/api/v1/legal-holds/{id}` | Auth | Release hold |
| GET | `/api/v1/legal-holds/check/{entityID}` | Auth | Check if under hold |

### SDK Usage

```go
hold, _ := client.LegalHold.CreateHold(ctx, &aegisgate.LegalHoldCreateRequest{
    EntityID: "user-123", EntityType: "user",
    Reason: "Case #2026-001", IssuedBy: "admin@co.com",
})
underHold, _ := client.LegalHold.CheckUnderHold(ctx, "user-123")
```

## A/B Testing — ML Model Evaluation

Variant-based A/B testing with FNV hash assignment. Integrated into the proxy pipeline via middleware.

### HTTP Endpoints

| Method | Path | Role | Description |
|--------|------|------|-------------|
| POST | `/api/v1/abtest/tests` | Admin | Create test |
| GET | `/api/v1/abtest/tests` | Admin | List tests |
| POST | `/api/v1/abtest/tests/{id}/start` | Admin | Start test |
| POST | `/api/v1/abtest/tests/{id}/stop` | Admin | Stop test |
| GET | `/api/v1/abtest/tests/{id}/metrics` | Admin | Get metrics |
| POST | `/api/v1/abtest/tests/{id}/assign` | Admin | Assign variant |
| POST | `/api/v1/abtest/tests/{id}/result` | Admin | Record result |

### SDK Usage

```go
test, _ := client.ABTestV4.CreateTest(ctx, &aegisgate.ABTestV4CreateRequest{
    Name: "model-comparison",
    Variants: []aegisgate.ABTestV4Variant{
        {Name: "champion", Weight: 50, ModelRef: "v4.2"},
        {Name: "challenger", Weight: 50, ModelRef: "v4.3"},
    },
})
client.ABTestV4.StartTest(ctx, test.ID)
variant, _ := client.ABTestV4.AssignVariant(ctx, test.ID, "req-123")
client.ABTestV4.RecordResult(ctx, test.ID, &aegisgate.ABTestV4ResultRequest{
    VariantName: variant, Detected: true, LatencyMs: 38.7,
})
```

## gRPC Services

All three pipelines are also available via gRPC (10 services, 64 RPC methods total):

- `grpc.DSARService` — Export, Erase
- `grpc.LegalHoldService` — CreateHold, ReleaseHold, IsUnderHold, ListHolds, GetHold
- `grpc.ABTestService` — CreateTest, ListTests, StartTest, StopTest, GetMetrics, AssignVariant, RecordResult

## Row-Level Security

All tenant-scoped tables (7 total including legal_holds) have FORCE ROW LEVEL SECURITY applied. Even the database owner is subject to RLS policies, providing true defense-in-depth tenant isolation at the database level.