---
title: "Technical Details"
description: "Deep dive into AegisGate Security Platform architecture, security mechanisms, and implementation"
type: "tech"
---

## Architecture Overview

AegisGate v3.5.0 secures AI interactions across **six pillars** — five protocol layers (HTTP API, MCP, A2A, **ACP**, RESPONSE) plus the **Trust Framework** — in a single 34.7 MB binary.

{{< mermaid >}}
flowchart TB
    subgraph Client["Client Layer"]
        A["HTTP Client"]
        B["MCP Client"]
        C["A2A Agent"]
        D["ACP Agent"]
        E["ANP Client"]
    end

    subgraph AegisGate["AegisGate Platform v3.2.0"]
        G["HTTP Proxy :8080"]
        H["MCP Server :8081"]
        I["A2A Endpoint :8082"]
        J["ACP Gateway :8083"]
        K["ANP Router :8084"]
        L["RESPONSE Guard"]
        TR["Trust Framework\nPkg/trust/\n(NEW v3.2.0)"]

        M["Scanner - 153+ patterns"]
        N["ATLAS - 66 techniques"]
        O["Rate Limiter"]
        P["Audit Logger - RFC 5424"]

        Q["SSO - OIDC/SAML"]
        R["RBAC Engine"]
        S["License - ECDSA P-256"]

        T["Prometheus :8443"]
    end

    subgraph Upstream["Upstream"]
        U["AI Services"]
        V["MCP Tools"]
        W["Peer Agents"]
    end

    A --> G
    B --> H
    C --> I
    D --> J
    E --> K

    G --> M & O & P & L
    H --> M & O & P & L
    I --> M & O & P & L
    J --> M & O & P & L
    K --> M & O & P & L

    M --> N
    L --> M
    O --> T
    P --> T
    Q --> R
    S --> R

    M --> TR
    L --> TR
    P --> TR
    S --> TR
{{< /mermaid >}}

---

## Six Pillars of AI Security

AegisGate v3.2.0 protects every AI interaction with four protocol pillars and one cross-cutting trust pillar. The **Trust Framework** is the 5th pillar, new in v3.2.0, and ties together the four protocol pillars with cryptographically-signed attestations and a per-session trust score.

### 1. HTTP API Security (v3.0+, port 8080)

Bidirectional scanning with 153+ detection patterns:

| Pattern Set | Count | Coverage |
|-------------|-------|----------|
| MITRE ATLAS | 52 | Adversarial AI tactics |
| OWASP LLM Top 10 | 49 | LLM01-LLM10 |
| Secrets Scanning | 44+ | API keys, tokens, credentials |
| PII Detection | 12+ | GDPR/CCPA compliance |

### 2. MCP Protocol Protection (v3.0+, port 8081)

8 guardrails for every MCP connection:

| # | Guardrail | Description |
|---|-----------|-------------|
| 1 | Session Authentication | Auth required for all MCP sessions |
| 2 | Concurrent Session Limits | Max simultaneous sessions per tier |
| 3 | Tools per Session | Max tools available per session |
| 4 | STDIO Validation | Command injection prevention |
| 5 | Execution Timeout | Max execution time per tool call |
| 6 | Memory Monitoring | Alerts at configurable threshold |
| 7 | Per-Client RPM | Max requests/minute per client |
| 8 | Tool Authorization | Risk-based tool call approval matrix |

### 3. A2A Agent-to-Agent Security (v2.0+, port 8082)

Zero-trust guardrails for inter-agent communication. ACP and ANP are routed through the A2A endpoint as sub-transports; their security mechanisms (HMAC, mTLS, capability enforcement) live inside this pillar.

| # | Guardrail | Description |
|---|-----------|-------------|
| 1 | mTLS Authentication | X.509 certificate verification |
| 2 | HMAC-SHA256 Integrity | Full request body validation |
| 3 | Capability Enforcement | Least-privilege per agent |
| 4 | Token-Bucket Rate Limiting | Per-agent request quotas |
| 5 | Request Size Limits | Configurable body size limit |
| 6 | Timeout Enforcement | Configurable request timeouts |
| 7 | License Validation | ECDSA P-256 cryptographic enforcement |
| 8 | Audit Logging | RFC 5424 structured logs |

### 4. RESPONSE Security (v3.1, all ports)

AI response scanning for all protocols:

| # | Guardrail | Description |
|---|-----------|-------------|
| 1 | PII Scanner | SSN, credit cards, emails, phones, health info |
| 2 | Secret Detector | API keys (Stripe, GitHub, AWS, OpenAI, Slack) |
| 3 | Hallucination Detector | False statements, overconfidence, unverified claims |
| 4 | Toxicity Filter | Hate speech, violence, harassment |
| 5 | Token Limiter | Rate limiting for response token counts |
| 6 | Response Redactor | Intelligent redaction with multiple strategies |
| 7 | Compliance Reports | Auto-generates GDPR, HIPAA, PCI-DSS, SOC2 reports |
| 8 | Response Guard Middleware | Unified scanning for HTTP, MCP, A2A, ACP, ANP |

### 5. Trust Framework (v3.2.0, new)

The 5th pillar. Continuous, per-session trust scoring with cryptographically-signed attestations. Ties the four protocol pillars together into a single, auditable trust story. Available on Professional+ tiers.

| # | Component | Description |
|---|-----------|-------------|
| 1 | Session Trust Score | 0–100 score accumulated per session from MCP, A2A, Proxy, and Response events |
| 2 | Ed25519 Attestations | Every event emits a signed attestation (`pkg/trust/attestation/signer.go`) |
| 3 | Attestation Verifier | Any party can verify a signed attestation offline (`pkg/trust/attestation/verifier.go`) |
| 4 | Cross-Pillar Correlation | Findings from all 4 protocol pillars feed into a single trust score |
| 5 | Trust Score API | `GET /api/v1/trust/score?session=ID` returns the live score and component breakdown |
| 6 | Attestations Feed | `GET /api/v1/trust/attestations?since=TIMESTAMP` returns the rolling event log |
| 7 | Tier-Gated Activation | The `TRUST_PILLAR_ENABLED` feature flag gates the API behind Professional+ |
| 8 | Compliance Scan Engine | Powers the `/api/v1/compliance/scan` and `/api/v1/compliance/report` endpoints |

#### Trust Framework API

```
GET /api/v1/trust/score?session=SESSION_ID
→ { "session_id": "...", "score": 87, "components": { "threat_blocks": 5, "tool_risk_avg": 2.3, "a2a_caps_used": 1, "response_findings": 0 } }

GET /api/v1/trust/attestations?since=TIMESTAMP&limit=100
→ { "attestations": [
    { "id": "att_...", "session_id": "...", "timestamp": "...", "pillar": "mcp", "verdict": "blocked_threat", "signature": "ed25519:..." },
    ...
] }
```

#### Attestation Format

Each attestation is a JSON object signed with Ed25519. The signature is computed over the canonicalized attestation body (excluding the `signature` field) and verified using the platform's public key. Attestations are append-only and intended for offline audit and external verification.

#### Tier Gating

The Trust Framework is enabled by the `TRUST_PILLAR_ENABLED` feature flag, which is set automatically for Professional and Enterprise tiers. Developer and lower tiers receive HTTP 402 (Payment Required) from the trust API endpoints.

---

## Enterprise Authentication (v3.0+)

| Feature | Tier | Details |
|---------|------|---------|
| OIDC / OAuth 2.0 | Community+ | Full OpenID Connect with PKCE |
| SAML 2.0 | Community+ | Pre-configured Azure AD, Okta, Google Workspace |
| RBAC | Community+ | Role-based access control |
| Tool Authorization Matrix | Community+ | Risk-weighted tool approval by role |
| License Enforcement | Community+ | ECDSA P-256 cryptographic validation |
| API Key Fallback | Community+ | Key-based auth for CI/CD |

---

## Compliance Frameworks (v3.1)

| Framework | Coverage | Tier |
|-----------|----------|------|
| MITRE ATLAS | 66 techniques | Community |
| NIST AI RMF 1.500 | Full coverage | Community |
| OWASP LLM Top 10 | 49 patterns | Community |
| GDPR | PII detection | Community |
| HIPAA | PHI detection | Professional |
| PCI-DSS | Card data detection | Professional |
| SOC2 Type II | Enterprise controls | Professional |
| ISO 27001 | Information security | Professional |
| ISO 42001 | AI management | Professional |

---

## Performance (v3.2.0)

| Metric | Target | Achieved |
|--------|--------|----------|
| Test Coverage | 95%+ | **97.8%** |
| Total Tests | All | **5,484** |
| PII Detection Latency | < 1ms | **94.7 us** |
| Secret Detection Latency | < 1ms | **121.3 us** |
| Token Counting Speed | < 1ms | **97 ns** |
| Error Rate | < 0.1% | **0.00%** |
| Docker Image Size | < 20MB | **19 MB** |
| CVEs | 0 | **0** |

---

## Deployment

### Docker (Recommended)

```bash
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8082:8082 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v3.2.0
```

### Kubernetes (Helm)

```bash
helm repo add aegisgate https://aegisgatesecurity.github.io/aegisgate-platform
helm install aegisgate aegisgate/aegisgate-platform
```

The Helm chart includes HPA autoscaling (1-10 replicas), NetworkPolicy, ServiceMonitor for Prometheus, and rolling update strategy.

---

## Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `AEGISGATE_HTTP_PORT` | HTTP proxy port (default: 8080) |
| `AEGISGATE_MCP_PORT` | MCP server port (default: 8081) |
| `AEGISGATE_A2A_PORT` | A2A endpoint port (default: 8082) |
| `AEGISGATE_ACP_PORT` | ACP gateway port (default: 8083) |
| `AEGISGATE_ANP_PORT` | ANP router port (default: 8084) |
| `AEGISGATE_METRICS_PORT` | Prometheus metrics port (default: 8443) |
| `AEGISGATE_LICENSE_KEY` | License key for commercial tiers |

---

_For API documentation, see [docs/API.md](/docs/api/)._
