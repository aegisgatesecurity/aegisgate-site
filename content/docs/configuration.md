---
title: "Configuration"
description: "Configure AegisGate Security Platform"
type: docs
---

## Configuration

AegisGate is configured via environment variables, YAML configuration files, or both.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AEGIS_LICENSE` | License key | Community |
| `AEGIS_LOG_LEVEL` | Log verbosity | info |
| `AEGIS_PROXY_PORT` | HTTP proxy port | 8080 |
| `AEGIS_MCP_PORT` | MCP server port | 8081 |
| `AEGIS_DASHBOARD_PORT` | Dashboard port | 8443 |
| `AEGIS_RATE_LIMIT` | Requests per minute | 1000 |
| `AEGIS_API_KEY` | API authentication key | (generated) |
| `AEGIS_SCAN_SECRETS` | Enable secret scanning | true |
| `AEGIS_SCAN_PII` | Enable PII detection | true |
| `AEGIS_SCAN_INJECTION` | Enable injection detection | true |

### Configuration File

Create `config.yaml` for advanced configuration:

```yaml
server:
  proxy_port: 8080
  mcp_port: 8081
  dashboard_port: 8443

security:
  scan_secrets: true
  scan_pii: true
  scan_injection: true
  detection_threshold: 0.8

rate_limiting:
  requests_per_minute: 1000
  burst_size: 100

logging:
  level: info
  format: json
  output: stdout

compliance:
  frameworks:
    - MITRE ATLAS
    - OWASP LLM
    - NIST AI RMF
```

### TLS/SSL Configuration

Enable TLS for production deployments:

```bash
AEGIS_TLS_CERT=/path/to/cert.pem
AEGIS_TLS_KEY=/path/to/key.pem
```

### SSO Configuration

Configure OIDC/SAML for enterprise authentication:

```bash
AEGIS_SSO_PROVIDER=okta
AEGIS_SSO_CLIENT_ID=your-client-id
AEGIS_SSO_CLIENT_SECRET=your-secret
AEGIS_SSO_ISSUER=https://your-org.okta.com
```

### Environment Examples

**Development:**
```bash
AEGIS_LOG_LEVEL=debug
AEGIS_RATE_LIMIT=100
```

**Production:**
```bash
AEGIS_LOG_LEVEL=warn
AEGIS_RATE_LIMIT=10000
AEGIS_TLS_CERT=/etc/aegisgate/cert.pem
AEGIS_TLS_KEY=/etc/aegisgate/key.pem
```

### Hot Reload

AegisGate watches for configuration changes and reloads automatically. No restart required.