---
title: "Troubleshooting"
description: "Troubleshoot AegisGate Security Platform"
type: docs
---

## Troubleshooting Guide

Common issues and solutions for AegisGate Security Platform.

### Container Won't Start

**Symptom:** Docker container exits immediately after starting.

**Solutions:**

1. Check container logs:
   ```bash
   docker logs aegisgate
   ```

2. Verify ports are available:
   ```bash
   netstat -tlnp | grep -E '8080|8081|8443'
   ```

3. Ensure ports are not already in use by another service.

### Health Check Fails

**Symptom:** `curl http://localhost:8443/health` returns 503 or unhealthy.

**Solutions:**

1. Wait 10–30 seconds for services to fully initialize.

2. Check the specific failing dependency:
   ```bash
   curl http://localhost:8443/health | jq .dependencies
   ```
   The response shows which dependency is down: proxy, persistence, license, or certificates.

3. If `persistence` is down, check that the data directory is writable and the capability JSON file is valid.

4. If `license` is down, verify `AEGISGATE_LICENSE_KEY` is set or the license file is readable.

5. Review service logs for errors.

### Dashboard Health Shows More Detail

**Symptom:** Need to check scanner or A2A subsystem specifically.

```bash
curl http://localhost:8443/api/v1/health | jq .dependencies
```

This includes scanner and A2A in addition to the base health checks.

### High Latency

**Symptom:** Requests are slow through the proxy.

**Solutions:**

1. Check system resources:
   ```bash
   docker stats aegisgate
   ```

2. Enable debug logging temporarily:
   ```bash
   AEGIS_LOG_LEVEL=debug
   ```

3. Scale horizontally if CPU-bound.

### Rate Limiting Too Aggressive

**Symptom:** Legitimate requests are being rate-limited.

**Solutions:**

1. Check current rate limit:
   ```bash
   curl http://localhost:8443/api/v1/config | jq .rate_limiting
   ```

2. For A2A rate limits, check per-agent counters in the logs.

3. Increase limit in config:
   ```bash
   AEGIS_RATE_LIMIT=10000
   ```

4. Check for misbehaving clients.

### SSO Not Working

**Symptom:** Users cannot authenticate via SSO.

**Solutions:**

1. Verify SSO configuration:
   ```bash
   curl http://localhost:8443/api/v1/config | jq .sso
   ```

2. Check SSO provider connectivity.

3. Verify callback URL in identity provider.

---

## A2A Troubleshooting

A2A guardrails are fail-closed. If anything is missing or invalid, the request is rejected with a structured error code. This section helps you diagnose and fix each error.

### `A2A_AUTH_FAILED` / `A2A_AUTH_NO_CERT` / `A2A_AUTH_MISSING_CN`

**Meaning:** mTLS client certificate authentication failed.

**Fix:**

1. Verify the client certificate is present in the request:
   ```bash
   curl --cert agent-cert.pem --key agent-key.pem \
        --cacert ca.pem \
        https://localhost:8443/api/v1/a2a/message
   ```

2. Check that the certificate's Common Name (CN) matches the agent ID.

3. Verify the CA that signed the client certificate is in AegisGate's trust store.

### `A2A_INTEGRITY_MISSING` / `A2A_INTEGRITY_INVALID` / `A2A_INTEGRITY_MALFORMED`

**Meaning:** HMAC-SHA256 integrity check failed.

**Fix:**

1. Compute the correct HMAC signature before sending:
   ```bash
   BODY='{"message":"hello"}'
   SECRET='your-hmac-shared-secret'
   SIGNATURE=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64)
   curl -H "A2A-Signature: $SIGNATURE" \
        -H "Content-Type: application/json" \
        -d "$BODY" https://localhost:8443/api/v1/a2a/message
   ```

2. Verify the shared secret matches between client and `configs/a2a.yaml`.

3. If `MALFORMED`, ensure the signature is base64-encoded (not hex).

### `A2A_CAP_MISSING`

**Meaning:** The `A2A-Capability` header was not provided.

**Fix:** Every A2A request must declare its capability:
```bash
curl -H "A2A-Capability: send_message" ...
```

### `A2A_CAP_DENIED`

**Meaning:** The agent does not have the requested capability.

**Fix:**

1. Check the agent's capabilities in `configs/a2a_caps.yaml`:
   ```yaml
   agents:
     agent-001:
       capabilities:
         - send_message
         - get_task
   ```

2. Add the missing capability to the agent's list.

3. Restart AegisGate or send a `SIGHUP` to reload capabilities.

### `A2A_CAP_UNKNOWN_AGENT`

**Meaning:** The agent ID is not registered in the capability map.

**Fix:** Add the agent to `configs/a2a_caps.yaml` with its allowed capabilities.

### `A2A_CAP_CHECK_FAILED`

**Meaning:** Internal error during capability lookup.

**Fix:**

1. Check that `configs/a2a_caps.yaml` is valid YAML.
2. Verify the capability persistence file (JSON) is not corrupted.
3. Check server logs for the specific error.

### `A2A_LICENSE_MISSING` / `A2A_LICENSE_INVALID`

**Meaning:** A paid-tier capability was requested without a valid license.

**Fix:**

1. Verify your license status:
   ```bash
   curl http://localhost:8443/api/v1/license/status
   ```

2. Include the license key in the request:
   ```bash
   curl -H "X-A2A-License-Key: your-license-key" ...
   ```

3. If the license is expired or invalid, contact support for a renewal.

### `A2A_RATE_LIMITED`

**Meaning:** The agent has exceeded its per-minute request limit.

**Fix:**

1. Check the `X-RateLimit-Reset` header to see when the limit resets.

2. Reduce the request frequency from this agent.

3. If the limit is too low for your use case, adjust `a2a.yaml`:
   ```yaml
   rate_limit:
     requests_per_minute: 120
     burst: 20
   ```

### `A2A_INTERNAL_ERROR`

**Meaning:** Unexpected internal error (panic recovery — request denied).

**Fix:**

1. Check server logs immediately — this indicates a bug.
2. File an issue at [GitHub Issues](https://github.com/aegisgatesecurity/aegisgate-platform/issues).
3. Include the error code, approximate time, and any request details you can share.

### A2A Capabilities Lost After Restart

**Meaning:** Agent capabilities that were set at runtime disappeared after a restart.

**Fix:** PersistentCapEnforcer should handle this automatically. If capabilities are lost:

1. Check that the capability persistence file exists and is writable:
   ```bash
   ls -la data/a2a_capabilities.json
   ```

2. Verify the file is valid JSON:
   ```bash
   jq . data/a2a_capabilities.json
   ```

3. If the file is missing, capabilities will be re-seeded from `configs/a2a_caps.yaml` on next startup.

---

## Can't Detect Threats

**Symptom:** Known threats not being detected.

**Solutions:**

1. Verify scanning is enabled:
   ```bash
   curl http://localhost:8443/api/v1/config | jq .scanning
   ```

2. Check detection patterns are loaded:
   ```bash
   curl http://localhost:8443/api/v1/stats
   ```

3. Review audit logs for blocked/allowed decisions.

### Getting More Help

- **Documentation:** [https://docs.aegisgatesecurity.io](/docs/)
- **API Reference:** [/docs/api-reference/](/docs/api-reference/)
- **Email Support:** [security@aegisgatesecurity.io](mailto:security@aegisgatesecurity.io)
- **GitHub Issues:** [https://github.com/aegisgatesecurity/aegisgate-platform/issues](https://github.com/aegisgatesecurity/aegisgate-platform/issues)