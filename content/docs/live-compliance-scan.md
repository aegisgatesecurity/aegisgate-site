---
title: "Live Compliance Scanning"
description: "Real-time infrastructure compliance scanning — 10 config checks mapped to NIST CSF controls with pass/fail reporting"
weight: 370
---

## Live Infrastructure Compliance Scanning

AegisGate Platform v4.3.0+ includes a live infrastructure compliance scanner that checks your platform's runtime configuration against security best practices and maps results to NIST CSF controls.

### Overview

Unlike the compliance framework scanner (which evaluates controls against documented evidence), the live scanner checks the **actual running configuration** of your AegisGate deployment. It answers the question: "Is my platform configured securely right now?"

### API Endpoint

```bash
GET /api/v1/compliance/live
```

Requires `compliance:read` permission (compliance_officer or admin role).

### Checks Performed

| # | Check | NIST CSF Control | What It Verifies |
|---|-------|------------------|------------------|
| 1 | TLS Configuration | SC-8 | TLS is enabled with valid certificate paths |
| 2 | Auth Enforcement | AC-2 | `REQUIRE_AUTH` is not set to `false` in production |
| 3 | Audit Logging | AU-2 | Audit middleware is enabled |
| 4 | Security Headers | SI-10 | CSP, HSTS, X-Frame-Options headers are enabled |
| 5 | Rate Limiting | SC-5 | Rate limiting is configured (requests per minute > 0) |
| 6 | RBAC | AC-3 | RBAC is enabled |
| 7 | SSO/SAML/OIDC | IA-2 | At least one SSO provider is configured |
| 8 | Maintenance Windows | MA-2 | Maintenance mode is not currently active |
| 9 | Data Retention | SI-12 | Log level is configured (audit trail retention) |
| 10 | ML Threat Detection | SI-3 | ML threat detection is enabled |

### Check Status Values

| Status | Meaning |
|--------|---------|
| `pass` | Check passed — configuration meets the requirement |
| `fail` | Check failed — configuration does not meet the requirement |
| `warning` | Check passed with caveats — review recommended |
| `skip` | Check skipped — feature not configured or not applicable |

### Example

```bash
curl http://localhost:8443/api/v1/compliance/live \
  -H "Authorization: Bearer $TOKEN"
```

Response:

```json
{
  "timestamp": "2026-08-21T15:30:00Z",
  "summary": {
    "total": 10,
    "pass": 8,
    "fail": 1,
    "warning": 1,
    "skip": 0
  },
  "passRate": 80.0,
  "duration": "2.1ms",
  "results": [
    {
      "id": "tls",
      "name": "TLS Configuration",
      "category": "transport",
      "status": "pass",
      "message": "TLS is enabled with valid certificate paths",
      "control": "SC-8",
      "framework": "NIST CSF"
    },
    {
      "id": "auth-enforcement",
      "name": "Auth Enforcement",
      "category": "access-control",
      "status": "fail",
      "message": "REQUIRE_AUTH=false detected — auth is disabled",
      "remediation": "Set REQUIRE_AUTH=true or remove the env var (defaults to true)",
      "control": "AC-2",
      "framework": "NIST CSF"
    },
    {
      "id": "sso",
      "name": "SSO/SAML/OIDC",
      "category": "identity",
      "status": "warning",
      "message": "No SSO provider configured — using local auth only",
      "remediation": "Configure SAML or OIDC for centralized identity management",
      "control": "IA-2",
      "framework": "NIST CSF"
    }
  ]
}
```

### Remediation

Each failed or warning check includes a `remediation` field with actionable guidance on how to fix the issue. Common remediations:

| Check | Remediation |
|-------|------------|
| TLS | Set `tls.enabled: true` and provide `cert_file` + `key_file` paths |
| Auth enforcement | Remove `REQUIRE_AUTH=false` or set to `true` |
| Audit logging | Set `security.enable_audit_middleware: true` |
| Security headers | Set `security.enable_security_headers: true` |
| Rate limiting | Set `proxy.rate_limit` to a value > 0 |
| RBAC | Set `rbac.enabled: true` |
| SSO | Configure a SAML or OIDC provider in the `sso` config section |
| ML detection | Set `security.ml_threat_detection_enabled: true` |

### Use Cases

- **Pre-deployment validation**: Run the scan before going live to verify all security settings
- **Continuous monitoring**: Integrate with monitoring tools to alert on configuration drift
- **Audit evidence**: Use scan results as evidence for compliance frameworks that require configuration verification
- **Security posture dashboard**: Display pass rate in internal dashboards