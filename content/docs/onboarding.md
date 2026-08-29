---
title: "Onboarding"
description: "Step-by-step onboarding guide for new AegisGate users — from initial setup to first scan and compliance reporting."
type: docs
---

## Onboarding Guide

Welcome to AegisGate Security Platform. This guide walks you through getting up and running in 5 steps — no DevOps or Kubernetes expertise required.

### Step 1: Deploy AegisGate

**Option A: Guided Setup (recommended for new users)**

```bash
# Build the binary
go build -o aegisgate-platform ./cmd/aegisgate-platform/

# Auto-detect your environment and generate a validated config
./aegisgate-platform setup --non-interactive

# Start the platform
./aegisgate-platform --config aegisgate-platform.yaml --embedded-mcp
```

The setup wizard detects Docker, Kubernetes, systemd, or bare metal; recommends a deploy profile; and generates a validated config file. No YAML editing required.

**Option B: Deploy Profile**

```bash
# List available profiles
./aegisgate-platform --profile list

# Run with the quickstart profile (zero-config evaluation)
./aegisgate-platform --profile quickstart --embedded-mcp
```

**Option C: Docker**

```bash
docker run -d --name aegisgate \
  -p 8080:8080 -p 8081:8081 -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.3.3
```

### Step 2: Verify Installation

```bash
curl http://localhost:8443/health | jq .
```

Expected response:
```json
{
  "status": "healthy",
  "tier": "community",
  "version": "4.2.0"
}
```

If you see `"status": "unhealthy"`, check the [Troubleshooting Guide](/docs/troubleshooting/).

### Step 3: Point Your AI Traffic Through AegisGate

```bash
# Set OpenAI to use AegisGate proxy
export OPENAI_BASE_URL=http://localhost:8080/v1
```

Or configure your application to use AegisGate as a forward proxy. All traffic to your AI services will be scanned for threats, secrets, and PII.

### Step 4: Test Detection

Send a test request to verify scanning is working:

```bash
curl -X POST http://localhost:8080/api/v1/scan \
  -H "Content-Type: application/json" \
  -d '{"content": "My credit card is 4532-1234-5678-9012 and my SSN is 123-45-6789"}'
```

You should see PII detection blocking or redacting the sensitive data.

### Step 5: Configure for Your Needs

#### Configure Scanning Rules

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

#### Enable Compliance Frameworks (Developer+)

```bash
# Check which frameworks are available for your tier
curl http://localhost:8443/api/v1/compliance/status | jq .
```

#### Set Up SSO (Developer+)

1. Navigate to Dashboard → Settings → SSO
2. Select your identity provider (Okta, Azure AD, Google Workspace)
3. Enter Client ID and Client Secret
4. Configure user attribute mapping
5. Test connection

#### Enable SIEM Integration (Professional+)

```yaml
siem:
  enabled: true
  platform: splunk  # or elasticsearch, qrad, sentinel, etc.
  endpoint: "https://your-siem.example.com:8088"
  token: "your-hec-token"
```

### Step 6: Validate Your Config

```bash
# Validate before going to production
./aegisgate-platform config validate aegisgate-platform.yaml
```

### Recommended First Actions

1. ✅ Run a test scan to verify detection is working
2. ✅ Review the [Configuration Reference](/docs/configuration/)
3. ✅ Set up [Compliance Reports](/docs/compliance/) for your framework
4. ✅ Configure team RBAC policies
5. ✅ Set up [monitoring and alerts](/docs/day-2-operations/#monitoring)
6. ✅ Plan a [maintenance window](/docs/maintenance-windows/) for your first patch

### Next Steps

- [Getting Started Guide](/docs/getting-started/) — Detailed setup walkthrough
- [Day 2 Operations](/docs/day-2-operations/) — Monitoring, compliance reporting, and common tasks
- [CLI Reference](/docs/cli-reference/) — Complete command-line documentation
- [Compliance Frameworks](/docs/compliance/) — 31 frameworks, 2,043 controls
- [Troubleshooting](/docs/troubleshooting/) — Common issues and solutions
- [Glossary](/docs/glossary/) — Key terms and definitions