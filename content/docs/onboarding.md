---
title: "Onboarding"
description: "Onboarding guide for new AegisGate users"
type: docs
---

## Onboarding Guide

Welcome to AegisGate Security Platform. This guide will help you get up and running.

### Step 1: Initial Setup

1. **Deploy AegisGate** using Docker or Kubernetes
2. **Verify installation** with `curl http://localhost:8443/health`
3. **Generate an API key** for authentication

### Step 2: Configure Your AI Services

Point your AI traffic through AegisGate:

```bash
# Set OpenAI to use AegisGate proxy
export OPENAI_BASE_URL=http://localhost:8080/v1
```

Or configure your application to use AegisGate as a forward proxy.

### Step 3: Define Access Policies

Create RBAC policies for your team:

```bash
# Create a developer role
curl -X POST http://localhost:8443/api/v1/roles \
  -H "X-API-Key: admin-key" \
  -d '{"name": "developer", "permissions": ["scan", "read_stats"]}'
```

### Step 4: Enable SSO (Enterprise)

Connect your identity provider:

1. Navigate to Settings → SSO
2. Select your identity provider (Okta, Azure AD, Google Workspace)
3. Enter Client ID and Client Secret
4. Configure user attribute mapping
5. Test connection

### Step 5: Configure Scanning Rules

Customize threat detection:

```yaml
scanning:
  secrets:
    - pattern: "sk-[a-zA-Z0-9]{48}"
      severity: critical
  pii:
    - type: ssn
      action: block
    - type: credit_card
      action: mask
```

### Step 6: Set Up Monitoring

Enable alerting and dashboards:

1. **SIEM Integration**: Configure syslog or Fluentd output
2. **Grafana Dashboard**: Import AegisGate dashboard template
3. **Slack Alerts**: Set up notifications for critical threats

### Recommended First Actions

1. ✅ Run a test scan to verify detection is working
2. ✅ Review the [Configuration](/docs/configuration/) options
3. ✅ Set up [Compliance Reports](/docs/api-reference/) for your framework
4. ✅ Configure team [RBAC policies](#)

### Next Steps

- [Explore API Reference](/docs/api-reference/)
- [Review Security Features](/docs/security/)
- [Join the Community](#)