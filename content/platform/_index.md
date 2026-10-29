---
title: "AegisGate Platform — Enterprise AI Security Gateway"
description: "Self-hosted AI security gateway. Eight pillars of protection: HTTP API, MCP, A2A, ACP, ANP, Response scanning, Trust Framework, and Agent Registry. 31 compliance frameworks, 11 SIEM integrations, 4 SOAR integrations. Single 19.1MB Go binary. Deploy in 60 seconds."
type: "landing"
mermaid: true
---

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-platform -->

<div class="alert alert-success alert-center">
<strong>🏢 AegisGate Platform v5.0.0</strong> — open-source (Apache 2.0). Self-hosted, air-gapped, zero data collection. <a href="https://demo.aegisgatesecurity.io/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-left:12px">🚀 Try the Live Demo</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v5.0.0" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="margin-left:12px">Download v5.0.0 →</a>
</div>

---

## What is AegisGate Platform?

AegisGate Platform is an **enterprise AI security gateway**. It sits between your organization's users, agents, and applications — and any AI service they talk to. Every request and response is scanned for security threats, compliance violations, and adversarial attacks.

### Who is it for?

- **Security teams** who need to enforce AI usage policies across the organization
- **Compliance officers** who need audit trails for HIPAA, GDPR, EU AI Act, FedRAMP
- **DevOps teams** who need to integrate AI security into CI/CD, SIEM, and SOAR pipelines
- **CISOs** who need visibility into what data employees are sending to AI tools

### What problem does it solve?

When your team uses AI tools — ChatGPT API, Copilot, MCP-based agents, agent-to-agent communication — they expose your organization to:

1. **Data leakage**: Secrets, PII, and IP accidentally sent to external AI providers
2. **Adversarial attacks**: Prompt injections that manipulate AI into ignoring safety rules
3. **Compliance violations**: Unregulated AI usage that breaks HIPAA, GDPR, EU AI Act
4. **Lack of visibility**: No audit trail of what was sent to which AI service

Platform solves all four with a single self-hosted binary.

---

## See Platform in Action

<div class="video-container" style="max-width: 960px; margin: 2rem auto; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);">
<video controls preload="metadata" poster="/videos/platform/poster.jpg" style="width: 100%; display: block;">
<source src="/videos/platform/demo.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
</div>

<div style="text-align: center; margin: 1.5rem 0;">
<p style="color: var(--text-secondary); font-size: 1rem;">Explore the enterprise dashboard — real-time threat detection, compliance coverage, and SIEM integrations.</p>
</div>

---

## Seven Pillars of AI Security

Platform v5.0.0 protects every AI interaction across seven security pillars:

<div class="card-grid card-grid-2x2">
<div class="card">
<h3>🌐 HTTP API Security</h3>
<ul>
<li>303 detection patterns</li>
<li>MITRE ATLAS 66 techniques</li>
<li>PII, secrets, API key detection</li>
<li>Bidirectional request/response scanning</li>
</ul>
</div>
<div class="card">
<h3>🔗 MCP Protocol Protection</h3>
<ul>
<li>Session authentication + isolation</li>
<li>8 guardrails active</li>
<li>MITRE ATLAS enforcement</li>
<li>Tool authorization with risk matrix</li>
</ul>
</div>
<div class="card">
<h3>🤝 A2A Agent-to-Agent Security</h3>
<ul>
<li>mTLS + HMAC-SHA256 integrity</li>
<li>Capability enforcement</li>
<li>Token-bucket rate limiting</li>
<li>Audit logging (RFC 5424)</li>
</ul>
</div>
<div class="card">
<h3>🛡️ Agent Response Security</h3>
<ul>
<li>PII scanner (SSN, cards, emails, phones)</li>
<li>Secret detector (Stripe, GitHub, AWS, OpenAI)</li>
<li>Hallucination + toxicity detection</li>
<li>Response redaction with multiple strategies</li>
</ul>
</div>
<div class="card" style="border-color:#00ADD8;">
<h3>🔐 Trust Framework</h3>
<ul>
<li>Per-session trust scoring (0–100)</li>
<li>Ed25519 signed attestations</li>
<li>Cross-pillar correlation</li>
<li>Offline-verifiable audit trail</li>
</ul>
</div>
<div class="card" style="border-color:#a855f7;">
<h3>📋 Agent Registry <span class="badge">NEW v5.0.0</span></h3>
<ul>
<li>6-source agent discovery (RBAC, MCP, A2A, AIBOM, Correlation, Intent Signing)</li>
<li>5-state lifecycle: provisioned → active → dormant → quarantined → revoked</li>
<li>DormancyEngine with automated credential revocation</li>
<li>Cross-deployment federation (ECDSA P-256 signed attestation bundles)</li>
</ul>
</div>
<div class="card" style="border-color:#22c55e;">
<h3>🧠 ML Threat Detection <span class="badge">NEW v4.4.0+</span></h3>
<ul>
<li>CharCNN-BiLSTM (1.6M params)</li>
<li>100/100 evasion resistance</li>
<li>0% false positive rate</li>
<li>~5ms inference (pure Go)</li>
</ul>
</div>
</div>

### Architecture Diagram

{{< mermaid >}}
flowchart TD
    subgraph UserLayer["User Layer"]
        A[Developers]
        B[AI Agents]
        C[Applications]
    end

    subgraph Platform["AegisGate Platform v5.0.0"]
        direction TB
        P1["🌐 HTTP API — 303 patterns, PII, Secrets"]
        P2["🔗 MCP — Session auth, 8 guardrails"]
        P3["🤝 A2A — mTLS, HMAC, Rate limiting"]
        P4["🛡️ Response — PII, Secrets, Redaction"]
        P5["🔐 Trust — Scoring, Ed25519 attestation"]
        P6["🧠 ML — CharCNN-BiLSTM, 100/100 evasion"]
    end

    subgraph Output["AI Services"]
        D[OpenAI]
        E[Anthropic]
        F[Local LLMs]
        G[MCP Servers]
    end

    A --> Platform
    B --> Platform
    C --> Platform
    
    P1 --> Output
    P2 --> Output
    P3 --> Output
    P4 --> Output
    
    P5 -.->|Attestations| P1
    P5 -.->|Attestations| P2
    P5 -.->|Attestations| P3
    P6 -.->|Threat Scores| P1
    P6 -.->|Threat Scores| P4

    style P1 fill:#1a1f2e,stroke:#38bdf8,stroke-width:2px
    style P2 fill:#1a1f2e,stroke:#38bdf8,stroke-width:2px
    style P3 fill:#1a1f2e,stroke:#38bdf8,stroke-width:2px
    style P4 fill:#1a1f2e,stroke:#38bdf8,stroke-width:2px
    style P5 fill:#1a1f2e,stroke:#00ADD8,stroke-width:2px
    style P6 fill:#1a1f2e,stroke:#22c55e,stroke-width:2px
{{< /mermaid >}}

### Detection Flow

{{< mermaid >}}
sequenceDiagram
    participant Client as Client App
    participant Proxy as Platform Proxy
    participant Scanner as Detection Engine
    participant Trust as Trust Framework
    participant SIEM as SIEM/SOAR
    participant AI as AI Service

    Client->>Proxy: POST /proxy/ai-request
    Proxy->>Scanner: Scan Request (PII, Secrets, XSS)
    
    alt Threat Detected
        Scanner-->>Proxy: Block (403 Forbidden)
        Proxy->>Trust: Generate Attestation
        Trust-->>Proxy: Signed Attestation
        Proxy->>SIEM: Log Security Event
        Proxy-->>Client: 403 Forbidden + Attestation ID
    else Clean Request
        Scanner-->>Proxy: Allow
        Proxy->>AI: Forward Request
        AI-->>Proxy: AI Response
        Proxy->>Scanner: Scan Response (PII, Hallucination)
        
        alt Response Threat
            Scanner-->>Proxy: Redact/Block
            Proxy->>Trust: Generate Attestation
            Proxy-->>Client: Redacted Response
        else Clean Response
            Scanner-->>Proxy: Allow
            Proxy->>Trust: Generate Attestation
            Proxy->>SIEM: Log Transaction
            Proxy-->>Client: AI Response + Attestation
        end
    end

    Note over Proxy,Trust: Every action cryptographically signed
    Note over Scanner: 303 patterns + ML model (~5ms)
{{< /mermaid >}}

---

## Compliance Frameworks

Platform includes 31 compliance frameworks (2,043 total controls, 1,457 automated) — the most comprehensive AI compliance coverage available:

| Framework | Coverage |
|-----------|----------|
| OWASP LLM Top 10 | 49 patterns |
| OWASP Web Top 10 | 10 categories |
| MITRE ATLAS | 66 techniques |
| NIST AI RMF 1.0 | 50 controls |
| HIPAA | PHI detection (54 controls) |
| PCI-DSS v4.0 | Card data (152 controls) |
| SOC 2 Type II | 64 controls |
| ISO/IEC 27001:2022 | 116 controls |
| CCPA/CPRA | 26 controls |
| GDPR | PII detection (99 controls) |
| EU AI Act | 120 controls, 8 categories |
| ISO/IEC 42001:2023 | AI management (38 controls) |
| NIST CSF 2.0 | 131 controls |
| CIS Controls v8 | 50 controls |
| FedRAMP Moderate | 170 controls |

<p style="font-size:0.9rem; color:#888;">...and 16 more frameworks. <a href="/docs/compliance/">View all compliance documentation →</a></p>

---

## SIEM & SOAR Integration

Platform integrates with your existing security operations stack:

### SIEM (11 platforms)

| Platform | Format | Transport |
|----------|--------|-----------|
| Splunk | HEC JSON | HTTPS |
| Elastic / ELK | ECS JSON | HTTP |
| Datadog | Logs API | HTTPS |
| Sumo Logic | HTTP Source | HTTPS |
| Chronicle (Google) | C2S API | HTTPS |
| Grafana Loki | HTTP Push | HTTP |
| Fluentd | msgpack | TCP |
| Logstash | Beats / JSON | TCP |
| Cribl | HTTP | HTTPS |
| Kafka | Avro/JSON | TCP |
| Graylog | GELF | UDP/TCP |
| Syslog (RFC 5424) | Structured | UDP/TCP |

### SOAR (4 platforms)

| Platform | Integration |
|----------|-------------|
| PagerDuty | Incident trigger with severity mapping |
| Jira | Ticket creation with custom fields |
| ServiceNow | Incident + change request |
| Custom webhook | Configurable payload + headers |

For detailed setup, see our [SIEM/SOAR Integration Guide](/docs/siem-soar-integration/).

---

## Web UI

Platform includes a built-in web dashboard at `/ui/`:

| Page | Purpose |
|------|---------|
| Dashboard | Real-time metrics, threat feed, system status |
| Events | Detection events with filtering and search |
| Compliance | Framework scan results and reports |
| Sessions | Active AI session monitoring |
| Agent Registry | Agent inventory, dormancy report, AIBOM drift, lifecycle policies, federation |
| Settings | Configuration, API keys, tier management |
| Users | User management and RBAC |
| Audit | Audit log viewer with export |

---

## Deployment

### Guided Setup (30-Second Setup)

```bash
# Build the binary
go build -o aegisgate-platform ./cmd/aegisgate-platform/

# Auto-detect your environment and generate a validated config
./aegisgate-platform setup --non-interactive

# Start the platform
./aegisgate-platform --config aegisgate-platform.yaml --embedded-mcp
```

The setup wizard auto-detects Docker, Kubernetes, systemd, or bare metal; recommends a deploy profile; generates a validated config; and prints next steps. No YAML editing required.

**Deploy profiles** (5 presets): `quickstart`, `small-team`, `production`, `high-security`, `air-gapped`.

```bash
# List all profiles
./aegisgate-platform --profile list

# Run with a profile
./aegisgate-platform --profile production --embedded-mcp
```

### Docker (Recommended)

```bash
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8082:8082 \
  -p 8083:8083 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v5.0.0
```

### Bare Metal

```bash
# Download the binary
curl -L https://github.com/aegisgatesecurity/aegisgate-platform/releases/latest/download/aegisgate-platform-linux-amd64 -o aegisgate-platform
chmod +x aegisgate-platform
./aegisgate-platform
```

### Kubernetes (Helm)

```bash
helm repo add aegisgate https://aegisgatesecurity.github.io/aegisgate-platform
helm install aegisgate aegisgate/aegisgate-platform
```

Includes HPA autoscaling (1-10 replicas), NetworkPolicy, ServiceMonitor, and rolling updates.

### Air-Gapped Deployment

Platform runs fully offline. No external dependencies. No phone-home. No telemetry. The binary, Docker image, and Helm chart can all be transferred to air-gapped environments via offline media.

---

## Performance

| Metric | Value |
|--------|-------|
| Sustained RPS | 28,000 |
| Concurrent VUs tested | 5,000 |
| Error rate | 0% |
| Proxy overhead p99 | 2.8ms |
| PII detection latency | 94.7 µs |
| Secret detection latency | 121.3 µs |
| ML inference latency | ~5ms |
| Binary size | 19.1 MB |
| Docker image size | 19.1 MB |
| Test coverage | 85%+ |
| Tests passing | 11,654+ |

---

## Competitive Comparison

| Capability | AegisGate | Lakera Guard | NeMo Guardrails | Protect AI |
|-----------|:-:|:-:|:-:|:-:|
| Self-hosted binary | ✅ | ❌ (SaaS only) | ❌ (library) | ⚠️ |
| MCP protocol protection | ✅ | ❌ | ❌ | ❌ |
| A2A protocol protection | ✅ | ❌ | ❌ | ❌ |
| ACP protocol protection | ✅ | ❌ | ❌ | ❌ |
| ANP protocol protection | ✅ | ❌ | ❌ | ❌ |
| Response scanning | ✅ | ❌ | ⚠️ | ⚠️ |
| Trust attestation | ✅ | ❌ | ❌ | ❌ |
| Agent Registry & dormancy detection | ✅ | ❌ | ❌ | ❌ |
| ML threat detection | ✅ | ⚠️ | ❌ | ⚠️ |
| 31 compliance frameworks | ✅ | ❌ | ❌ | ⚠️ |
| 11 SIEM integrations | ✅ | ❌ | ❌ | ⚠️ |
| 4 SOAR integrations | ✅ | ❌ | ❌ | ❌ |
| Air-gapped deployment | ✅ | ❌ | ❌ | ❌ |
| Open-source (Apache 2.0) | ✅ | ❌ | ✅ (Apache) | ❌ |

<p><a href="/docs/comparison/" class="btn btn-secondary">Full competitive analysis →</a></p>

---

## Deep Dive

For the full technical architecture — six-pillar internals, Trust Framework API, authentication, configuration, and environment variables — see the [Technical Architecture page](/tech/).

---

## Links

<p>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Source code →</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v5.0.0" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Release notes →</a>
<a href="/docs/" class="btn btn-secondary">Documentation →</a>
<a href="/pricing/" class="btn btn-secondary">Pricing →</a>
<a href="/compliance/" class="btn btn-secondary">Compliance →</a>
<a href="/tech/" class="btn btn-secondary">Technical architecture →</a>
</p>