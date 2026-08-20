---
title: "AegisGate Platform — Enterprise AI Security Gateway"
description: "Self-hosted AI security gateway. Six pillars of protection: HTTP API, MCP, A2A, ACP, Response scanning, and Trust Framework. 31 compliance frameworks, 11 SIEM integrations, 4 SOAR integrations. Single 19.1MB Go binary. Deploy in 60 seconds."
type: "landing"
---

> **🏢 AegisGate Platform v4.1.0 is LIVE** — Six-pillar AI security, ML threat detection, 31 compliance frameworks, 11 SIEM + 4 SOAR integrations, web UI, air-gapped deployment. [Try the Live Demo](https://demo.aegisgatesecurity.io/) or [Download v4.1.0](https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v4.1.0).

<!-- Source of truth: https://github.com/aegisgatesecurity/aegisgate-platform -->

<div class="alert alert-info">
<strong>🏢 AegisGate Platform v4.1.0</strong> &mdash; <em>canonical facts (source: <a href="https://github.com/aegisgatesecurity/aegisgate-platform">aegisgate-platform repo</a>)</em>

<ul>
<li><strong>6 attack surfaces</strong>: HTTP API, MCP, A2A, ACP, Response, Trust Framework</li>
<li><strong>31 compliance frameworks</strong>: HIPAA, SOC 2, EU AI Act, FedRAMP, ISO 27001, ISO 42001, NIST AI RMF, OWASP LLM Top 10, and more</li>
<li><strong>11 SIEM integrations</strong>: Splunk, Elastic, Datadog, Sumo Logic, Chronicle, Loki, Fluentd, Logstash, Cribl, Kafka, Graylog, syslog</li>
<li><strong>4 SOAR integrations</strong>: PagerDuty, Jira, ServiceNow, Custom webhook</li>
<li><strong>ML threat detection</strong>: CharCNN-BiLSTM (1.58M params), 100/100 evasion resistance, 0% FPR, ~5ms</li>
<li><strong>176+ detection patterns</strong>, MITRE ATLAS 66 techniques</li>
<li><strong>Web UI</strong>: 7-page dashboard at <code>/ui/</code></li>
<li><strong>Single 19.1MB Go binary</strong>, zero external dependencies, air-gapped deployment</li>
<li><strong>8,000+ tests passing</strong>, 83.1% coverage</li>
<li><strong>Load tested</strong>: 5,000 VUs, 23,578 RPS, 0% errors</li>
<li><strong>Apache 2.0 community edition</strong>, self-hosted, zero data collection</li>
</ul>
</div>

<div class="alert alert-success alert-center">
<strong>🏢 AegisGate Platform</strong> is <strong>open-core</strong> (Apache 2.0 community edition + commercial enterprise modules). Free Community tier. Self-hosted. No vendor lock-in. <a href="https://demo.aegisgatesecurity.io/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-left:12px">🚀 Try the Live Demo</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v4.1.0" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="margin-left:12px">Download v4.1.0 →</a>
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

## Six Pillars of AI Security

Platform v4.1.0 protects every AI interaction across six attack surfaces:

<div class="card-grid card-grid-2x2">
<div class="card">
<h3>🌐 HTTP API Security</h3>
<ul>
<li>176+ detection patterns</li>
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
<div class="card" style="border-color:#22c55e;">
<h3>🧠 ML Threat Detection <span class="badge">NEW v4.1.0</span></h3>
<ul>
<li>CharCNN-BiLSTM (1.58M params)</li>
<li>100/100 evasion resistance</li>
<li>0% false positive rate</li>
<li>~5ms inference (pure Go)</li>
</ul>
</div>
</div>

---

## Compliance Frameworks

Platform includes 31 compliance frameworks — the most comprehensive AI compliance coverage available:

| Framework | Tier | Coverage |
|-----------|------|----------|
| MITRE ATLAS | Community | 66 techniques |
| NIST AI RMF 1.0 | Community | Full |
| OWASP LLM Top 10 | Community | 49 patterns |
| GDPR | Community | PII detection |
| HIPAA | Developer+ | PHI detection |
| PCI-DSS | Developer+ | Card data |
| SOC 2 | Professional+ | Enterprise controls |
| ISO 27001 | Professional+ | InfoSec |
| ISO 42001 | Professional+ | AI management |
| CMMC L2 | Professional+ | Access control |
| FedRAMP Moderate | Professional+ | 153/170 controls |
| EU AI Act | Professional+ | 120 controls, 8 categories |
| NIST CSF 2.0 | Community | Full |
| CIS Controls v8 | Community | IG1 |

<p style="font-size:0.9rem; color:#888;">...and 17 more frameworks. <a href="/compliance/">View all compliance documentation →</a></p>

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
| Settings | Configuration, API keys, tier management |
| Users | User management and RBAC |
| Audit | Audit log viewer with export |

---

## Deployment

### Docker (Recommended)

```bash
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8082:8082 \
  -p 8083:8083 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.1.0
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

## Pricing Tiers

| Tier | Price | Key Features |
|------|-------|--------------|
| **Community** | Free | HTTP proxy, MCP, A2A, 176+ patterns, MITRE ATLAS, basic compliance |
| **Developer** | $79/mo | + mTLS, OIDC/SAML, RBAC, code exec sandbox, advanced ML |
| **Professional** | $499/mo | + Trust Framework, SIEM/SOAR, gRPC API, K8s/Helm, policy engine |
| **Enterprise** | Custom | + Air-gapped deployment, custom compliance modules, dedicated SE, SLA |

<p><a href="/pricing/" class="btn btn-secondary">Full pricing details →</a></p>

---

## Performance

| Metric | Value |
|--------|-------|
| Sustained RPS | 23,578 |
| Concurrent VUs tested | 5,000 |
| Error rate | 0% |
| Proxy overhead p99 | 2.8ms |
| PII detection latency | 94.7 µs |
| Secret detection latency | 121.3 µs |
| ML inference latency | ~5ms |
| Binary size | 19.1 MB |
| Docker image size | 19.1 MB |
| Test coverage | 83.1% |
| Tests passing | 8,000+ |

---

## Competitive Comparison

| Capability | AegisGate | Lakera Guard | NeMo Guardrails | Protect AI |
|-----------|:-:|:-:|:-:|:-:|
| Self-hosted binary | ✅ | ❌ (SaaS only) | ❌ (library) | ⚠️ |
| MCP protocol protection | ✅ | ❌ | ❌ | ❌ |
| A2A protocol protection | ✅ | ❌ | ❌ | ❌ |
| ACP protocol protection | ✅ | ❌ | ❌ | ❌ |
| Response scanning | ✅ | ❌ | ⚠️ | ⚠️ |
| Trust attestation | ✅ | ❌ | ❌ | ❌ |
| ML threat detection | ✅ | ⚠️ | ❌ | ⚠️ |
| 31 compliance frameworks | ✅ | ❌ | ❌ | ⚠️ |
| 11 SIEM integrations | ✅ | ❌ | ❌ | ⚠️ |
| 4 SOAR integrations | ✅ | ❌ | ❌ | ❌ |
| Air-gapped deployment | ✅ | ❌ | ❌ | ❌ |
| Open-core (Apache 2.0 community + commercial enterprise) | ✅ | ❌ | ✅ (Apache) | ❌ |

<p><a href="/docs/comparison/" class="btn btn-secondary">Full competitive analysis →</a></p>

---

## Deep Dive

For the full technical architecture — six-pillar internals, Trust Framework API, authentication, configuration, and environment variables — see the [Technical Architecture page](/tech/).

---

## Links

<p>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Source code →</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v4.1.0" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Release notes →</a>
<a href="/docs/" class="btn btn-secondary">Documentation →</a>
<a href="/pricing/" class="btn btn-secondary">Pricing →</a>
<a href="/compliance/" class="btn btn-secondary">Compliance →</a>
<a href="/tech/" class="btn btn-secondary">Technical architecture →</a>
</p>