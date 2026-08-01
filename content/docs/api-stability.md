---
title: "API Versioning & Stability Policy"
description: "AegisGate API versioning, backward compatibility guarantees, and deprecation policy"
type: docs
---

## API Versioning

AegisGate uses URL-based API versioning. All endpoints are prefixed with `/api/v{N}/` where `{N}` is the major version number.

**Current version**: `v1` (stable since 3.0.0)

**Examples**:
- `GET /api/v1/compliance/scan`
- `POST /api/v1/compliance/report?framework=atlas`
- `GET /api/v1/compliance/integrity`
- `GET /api/v1/sla`

## Stability Guarantees

| Guarantee | Scope | Details |
|-----------|-------|---------|
| **No breaking changes within v1** | Endpoints | All v1 endpoints maintain backward compatibility |
| **Additive only** | Fields | New fields may be added to responses; clients must ignore unknown fields |
| **Deprecated fields** | Fields | Deprecated fields are maintained for at least 2 minor versions (6+ months) |
| **HTTP status codes** | Responses | Status codes will not change for existing error conditions |
| **Rate limiting** | Headers | `X-RateLimit-*` headers are contractually stable |

## What Counts as a Breaking Change

A breaking change is any change that would cause a correctly-implemented client to fail:

- Removing an endpoint
- Removing a response field
- Changing a field type (string → number, etc.)
- Changing an HTTP method (GET → POST)
- Changing a URL path segment
- Changing error response structure
- Increasing required parameters

## What Does NOT Count as a Breaking Change

- Adding a new response field (clients must ignore unknowns)
- Adding a new endpoint
- Adding a new optional query parameter
- Adding a new enum value (clients must handle unknown values)
- Changing documentation or error messages
- Reordering JSON object keys

## Deprecation Policy

1. **Announcement**: Deprecated features are announced in release notes and via `Deprecation` HTTP headers
2. **Grace period**: At least 2 minor versions (6+ months) after announcement
3. **Removal**: Only in a new major version (v2)
4. **Migration guide**: Provided for all breaking changes

## Release Cadence

| Release Type | Cadence | Breaking Changes |
|-------------|---------|------------------|
| **Patch** (3.8.x) | Weekly | Never |
| **Minor** (3.x.0) | Monthly | Never |
| **Major** (x.0.0) | Quarterly (estimated) | Only on major bump |

## API Endpoint Stability Matrix

| Endpoint | Version | Status | Since |
|----------|---------|--------|-------|
| `GET /api/v1/compliance/health` | v1 | ✅ Stable | 3.0.0 |
| `GET /api/v1/compliance/scan` | v1 | ✅ Stable | 3.0.0 |
| `GET /api/v1/compliance/report` | v1 | ✅ Stable | 3.0.0 |
| `GET /api/v1/compliance/integrity` | v1 | ✅ Stable | 3.8.0 |
| `GET /api/v1/sla` | v1 | ✅ Stable | 3.0.0 |
| `POST /v1/scan` | v1 | ✅ Stable | 3.0.0 |

## Version Negotiation

Clients should:
1. Use the `Accept` header to request a specific version: `Accept: application/json; version=1`
2. Handle unknown response fields gracefully (RFC 7231)
3. Monitor `Deprecation` and `Sunset` response headers
4. Check the `X-API-Version` response header for the current version

## Contact

For API versioning questions, open an issue at [github.com/aegisgatesecurity/aegisgate-platform](https://github.com/aegisgatesecurity/aegisgate-platform) or email security@aegisgate.dev