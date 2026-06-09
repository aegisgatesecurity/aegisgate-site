---
title: "License Portal"
description: "Activate and manage your AegisGate license key"
type: docs
---

## License Portal

AegisGate uses a **client-side license validation system** powered by ECDSA P-256 cryptographic signatures. No remote API calls are required for license checks — all validation happens locally on your infrastructure.

### How Licenses Work

Every AegisGate license key is a **base64-encoded JSON structure** containing:

| Field | Description |
|-------|-------------|
| `license_id` | Unique license identifier (UUID) |
| `tier` | License tier: `community`, `developer`, `professional`, or `enterprise` |
| `customer` | Customer identifier |
| `issued_at` | RFC3339 timestamp |
| `expires_at` | RFC3339 timestamp or `"never"` for perpetual licenses |
| `features` | Optional feature flags array |
| `signature` | ECDSA P-256 signature covering all other fields |

### Activation

#### Docker

```bash
docker run -d \
  -p 8080:8080 -p 8081:8081 -p 8443:8443 \
  -e AEGISGATE_LICENSE_KEY="base64-encoded-license-key" \
  ghcr.io/aegisgatesecurity/aegisgate-platform:latest
```

#### Binary

```bash
./aegisgate-platform \
  --license-key "base64-encoded-license-key" \
  --proxy-port 8080 \
  --mcp-port 8081 \
  --dashboard-port 8443
```

#### Configuration File

```yaml
# aegisgate.yaml
license_key: "base64-encoded-license-key"
proxy_port: 8080
mcp_port: 8081
dashboard_port: 8443
```

### Grace Period

If a license **expires** or fails validation:

- A **7-day grace period** is automatically applied
- During grace, all features continue to work
- A warning banner appears in the dashboard
- After grace period expires, the platform **falls back to Community tier**

### Generating License Keys

License keys are generated using the `licensegen` CLI tool:

```bash
# Generate a Professional tier license for 365 days
licensegen generate \
  --customer "Acme Corp" \
  --tier professional \
  --duration 365d \
  --key secrets/aegisgate-private.pem \
  --output license.key

# Generate a perpetual Enterprise license
licensegen generate \
  --customer "MegaCorp Inc" \
  --tier enterprise \
  --duration never \
  --key secrets/aegisgate-private.pem \
  --max-servers 10 \
  --max-users 500
```

#### License Generation Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--customer` | Customer name or identifier (required) | — |
| `--tier` | License tier: `community`, `developer`, `professional`, `enterprise` | `professional` |
| `--duration` | License duration (e.g., `30d`, `365d`, `never`) | `365d` |
| `--key` | Path to ECDSA P-256 private key PEM file (required) | — |
| `--output` | Output file path (default: stdout) | stdout |
| `--features` | Comma-separated feature overrides | — |
| `--max-servers` | Maximum servers (0 = unlimited) | `0` |
| `--max-users` | Maximum users (0 = unlimited) | `0` |

### Validation Response

When the platform validates a license, the following JSON is returned:

```json
{
  "valid": true,
  "license_id": "550e8400-e29b-41d4-a716-446655440000",
  "tier": "professional",
  "customer": "Acme Corp",
  "issued_at": "2026-04-15T10:30:00Z",
  "expires_at": "2027-04-15T10:30:00Z",
  "features": ["sso", "rbac", "compliance"],
  "grace_period": false
}
```

### Tier Feature Matrix

| Feature | Community | Developer | Professional | Enterprise |
|---------|-----------|-----------|--------------|------------|
| API Rate Limit | 120 RPM | 1,000 RPM | 10,000 RPM | Unlimited |
| MCP Rate Limit | 60 RPM | 500 RPM | 5,000 RPM | Unlimited |
| Max Users | 5 | 25 | 100 | Unlimited |
| SSO (OIDC/SAML) | — | ✅ | ✅ | ✅ |
| RBAC | — | ✅ | ✅ | ✅ |
| Compliance Reports | — | Basic | Advanced | Full |
| Audit Log Retention | 7 days | 30 days | 90 days | 1 year |

### Troubleshooting

#### License Not Recognized

```bash
# Check license status via API
curl -s http://localhost:8443/api/v1/license | jq .
```

#### Expired License

If your license has expired, AegisGate will:

1. Enter a **7-day grace period** with full functionality
2. Display a warning in the dashboard and logs
3. After the grace period, **fall back to Community tier**

Contact [sales@aegisgatesecurity.io](mailto:sales@aegisgatesecurity.io) to renew or upgrade your license.

#### Key Format Errors

License keys must be valid base64-encoded JSON with an ECDSA P-256 signature. Common errors:

- `invalid base64`: Key is corrupted or truncated
- `invalid signature`: Key was tampered with or generated with a different key pair
- `expired license`: The `expires_at` date has passed (grace period applies)