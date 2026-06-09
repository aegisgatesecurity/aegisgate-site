---
title: "AegisGate Platform™ — Secure Every AI Interaction"
description: "The only AI security gateway with five-pillar protection: HTTP API, MCP, A2A, Response, and Trust Framework scanning. MITRE ATLAS 66 techniques. Deploy in 60 seconds."
type: "landing"
---

<div class="alert alert-warning alert-center">
<strong>"One platform. Complete AI security. From HTTP APIs to agent communication."</strong>
</div>

<div class="alert alert-info alert-center" style="background:#003399;border-color:#FFD700;color:#fff;">
<strong>{{< eu-flag >}} NEW in v3.3.0-beta.2:</strong> The <a href="/eu-ai-act/" style="color:#FFD700;text-decoration:underline;"><strong>EU AI Act Compliance Module</strong></a> — 82 controls across 8 categories of EU Regulation 2024/1689, included with Professional+ tier. <a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.3.0-beta.2" target="_blank" style="color:#FFD700;">Read the release notes →</a>
</div>

AegisGate Security Platform secures every AI interaction point with **five pillars**: HTTP API scanning, MCP protocol protection, A2A agent-to-agent verification, real-time response scanning, and the **Trust Framework** (v3.2.0) — continuous, cryptographically-signed trust scoring for every AI interaction. The **EU AI Act Compliance Module** (v3.3.0) adds 82 controls for EU AI Regulation 2024/1689, included with Professional+ tier.

<div class="card-grid card-grid-2">
<div class="card">

### 🌐 HTTP API Security

- 144+ detection patterns
- MITRE ATLAS 66 techniques
- PII, secrets, API key detection
- Bidirectional request/response scanning

</div>
<div class="card">

### 🔗 MCP Protocol Protection

- Session authentication + isolation
- 8 guardrails active
- MITRE ATLAS enforcement
- Tool authorization with risk matrix

</div>
<div class="card">

### 🤝 A2A Agent-to-Agent Security

- mTLS + HMAC-SHA256 integrity
- Capability enforcement per agent
- License-aware enforcement
- Rate limiting and audit logging

</div>
<div class="card">

### 🛡️ Agent Response Security

- PII, secrets, hallucination, toxicity detection
- Fail-closed by default
- Redaction with multiple strategies
- Compliance reports (GDPR, HIPAA, PCI, SOC 2)

</div>
<div class="card" style="border-color:#00ADD8;box-shadow:0 0 16px rgba(0,173,216,0.25);">

### 🔐 Trust Framework <span style="font-size:11px;background:#00ADD8;color:#000;padding:2px 6px;border-radius:4px;margin-left:6px;">NEW in v3.2.0</span>

- Per-session trust score accumulator
- Ed25519-signed attestations on every event
- Cross-pillar correlation (MCP, A2A, Proxy, Response)
- Professional+ tier feature
- Read scores via `GET /api/v1/trust/score`

</div>
</div>

---

<div class="btn-group">
<a href="/demo/" class="btn btn-primary">Try Interactive Demo</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.3.0-beta.2" target="_blank" class="btn btn-secondary">Download v3.3.0-beta.2</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform" target="_blank" class="btn btn-ghost">⭐ Star on GitHub</a>
</div>

---

## Why AegisGate?

There are other AI security products. Here's how AegisGate compares on the dimensions that matter to enterprise security teams:

| Capability | **AegisGate** | Lakera Guard | NeMo Guardrails | Rebuff | Protect AI |
|---|---|---|---|---|---|
| **Deployment model** | Self-hosted single binary | SaaS API only | Library (in-app) | Library (in-app) | Platform |
| **HTTP proxy scanning** | ✅ | ✅ | ❌ | ❌ | ⚠️ |
| **MCP protocol protection** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **A2A protocol protection** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **ACP protocol protection** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Response-side scanning** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Trust Framework (attestations)** | ✅ Ed25519-signed | ❌ | ❌ | ❌ | ⚠️ |
| **MITRE ATLAS coverage** | ✅ 66 techniques | ⚠️ Partial | ❌ | ⚠️ Partial | ✅ |
| **OWASP LLM Top 10** | ✅ 49 patterns | ✅ | ✅ | ✅ | ✅ |
| **{{< eu-flag >}} EU AI Act controls** | ✅ 82 controls | ❌ | ❌ | ❌ | ❌ |
| **Multi-framework compliance** | ✅ 10 frameworks | ❌ | ❌ | ❌ | ⚠️ |
| **Tamper-evident audit logs** | ✅ Hash chain + RFC 5424 | ❌ | ❌ | ❌ | ⚠️ |
| **Open source** | ✅ Apache 2.0 | ❌ | ✅ Apache 2.0 | ✅ MIT | ❌ |
| **Air-gap deployable** | ✅ Single binary | ❌ | ✅ Library | ✅ Library | ❌ |
| **Hardware footprint** | 13.3 MB binary, < 256 MB RAM | n/a (SaaS) | In-process | In-process | n/a (platform) |

**TL;DR**: If you need **protocol-level security** (MCP, A2A, ACP) + **compliance evidence** + **self-hosting**, AegisGate is the only option that covers all three.

<ul class="tldr-list">
<li><strong>Library-style tools</strong> (NeMo Guardrails, Rebuff) are great for in-app alignment but don't protect your network boundary</li>
<li><strong>SaaS tools</strong> (Lakera) require sending your traffic to a third party</li>
<li><strong>Compliance-focused tools</strong> (Protect AI) are platforms, not gateways, and don't include protocol coverage</li>
</ul>

---

## Attack Surface Coverage

Your AI infrastructure spans multiple attack surfaces. Most security tools only cover one or two. AegisGate covers all six:

| Attack Surface | Risk | Traditional WAFs | LLM Alignment Tools | **AegisGate** |
|---|---|---|---|---|
| **HTTP APIs** | Prompt injection, data leakage, PII exposure | ⚠️ AI-agnostic | ❌ No | ✅ AI-aware scanning, 144+ patterns |
| **MCP Protocol** | Tool poisoning, session hijacking, supply-chain attacks | ❌ No native protection | ❌ No | ✅ Built-in protocol guard, 8 guardrails |
| **A2A Communication** | Agent impersonation, data tampering, capability escalation | ❌ No native protection | ❌ No | ✅ mTLS, HMAC, capability enforcement |
| **Agent Response** | PII leakage, secret exposure, hallucination, toxicity | ❌ No native protection | ⚠️ Some | ✅ Real-time response guard, 5 detectors |
| **ACP Protocol** | Message tampering, capability escalation, replay attacks | ❌ No native protection | ❌ No | ✅ HMAC-signed messages |
| **Trust / Audit** | No traceability of agent behavior across protocols | ❌ No native protection | ❌ No | ✅ Ed25519-signed attestations |

AegisGate fills these gaps with a single unified platform.

**AegisGate secures all six in a single 13.3 MB binary you deploy in 60 seconds.**

---

## Five Pillars in Detail

<div class="card-grid">
<div class="card">

### 🌐 HTTP Proxy Security

Bidirectional scanning of every API request and response. 144+ patterns detect secrets, PII, and threats before they reach your AI services.

</div>
<div class="card">

### 🔗 MCP Protocol Protection

Session authentication, tool authorization, and 8 guardrails protect your AI agents from supply chain attacks and unauthorized tool execution.

</div>
<div class="card">

### 🤝 A2A Agent-to-Agent Security

Zero-trust guardrails for inter-agent communication. mTLS authentication, HMAC integrity, capability enforcement, and license-aware rate limiting.

</div>
<div class="card">

### 🔐 ACP Protocol Security

HMAC-signed messages, per-session rate limiting, and response scanning protect agent communication from tampering and replay attacks.

</div>
<div class="card">

### 🛡️ Agent Response Security

Real-time scanning of LLM outputs for PII, secrets, hallucination, and toxicity. Fail-closed security protects sensitive data.

</div>
<div class="card">

### ⚡ Rate Limiting & Throttling

Protect your AI infrastructure from abuse with intelligent rate limiting. Per-client, per-IP, and per-model quotas prevent DoS attacks and manage costs.

</div>
<div class="card text-center">

### 🔍 Threat Intelligence

Real-time threat detection with pattern matching across 144+ signatures. Blocks prompt injection, sensitive data exfiltration, and adversarial attacks.

</div>
<div class="card text-center">

### 📊 Full Observability

Every AI request, response, tool call, and session is logged. SIEM-ready with structured JSON output and compliance reports.

</div>
</div>

---

## {{< eu-flag >}} EU AI Act Compliance Module (NEW in v3.3.0) — Included with Professional+ tier

The **EU AI Act** (Regulation 2024/1689) is the world's first comprehensive AI regulation. AegisGate's **EU AI Act Compliance Module** gives you a single source of truth for whether your AI system is compliant — across **82 controls** in **8 categories**.

<div class="cta-stack">

<div class="cta-card cta-eu">
<div class="cta-card-icon">📊</div>
<div class="cta-card-content">
<h3>82 controls, 8 categories</h3>
<ul>
<li><strong>Prohibited Practices</strong> (Article 5)</li>
<li><strong>Risk Management</strong> (Article 9)</li>
<li><strong>Data Quality</strong> (Article 10)</li>
<li><strong>Technical Documentation</strong> (Articles 11+12)</li>
<li><strong>Record-Keeping</strong> (Articles 13+14)</li>
<li><strong>Human Oversight</strong> (Article 15)</li>
<li><strong>Accuracy, Robustness, Cybersecurity</strong> (Articles 51–55)</li>
<li><strong>Annex IV Technical Documentation</strong> (AI-*)</li>
</ul>
</div>
</div>

<div class="cta-card cta-eu">
<div class="cta-card-icon">🎯</div>
<div class="cta-card-content">
<h3>Who needs it</h3>
<ul>
<li><strong>AI providers</strong> placing high-risk AI systems (Annex III) on the EU market after <strong>August 2026</strong></li>
<li><strong>Deployers</strong> of AI in employment, education, law enforcement, critical infrastructure</li>
<li><strong>GPAI model providers</strong> with > 10²⁵ FLOPs of training compute</li>
<li><strong>EU + non-EU companies</strong> placing AI on the EU market</li>
</ul>
</div>
</div>

<div class="cta-card cta-eu">
<div class="cta-card-icon">⚙️</div>
<div class="cta-card-content">
<h3>How it works</h3>
<ul>
<li><strong>9 automatic controls</strong> — AegisGate enforces these in-line (input validation, data quality, log retention, etc.)</li>
<li><strong>73 manual controls</strong> — AegisGate provides checklists, evidence templates, audit-ready reports</li>
<li><strong>Compliance scan endpoint</strong>: <code>GET /api/v1/compliance/scan?framework=eu-ai-act</code> returns coverage %, missing modules, remediation steps</li>
<li><strong>Full audit report</strong>: <code>GET /api/v1/compliance/report?framework=eu-ai-act</code> returns all 82 controls with status</li>
</ul>
</div>
</div>

<div class="cta-card cta-eu">
<div class="cta-card-icon">💼</div>
<div class="cta-card-content">
<h3>Tier &amp; pricing</h3>
<ul>
<li><strong>Tier gate</strong>: Professional+ (Professional and Enterprise)</li>
<li><strong>Pricing</strong>: <strong>Included</strong> with Professional and Enterprise at no extra cost</li>
<li><strong>BAA + DPA</strong>: standard agreements cover EU AI Act data flows (see <a href="/legal/">/legal/</a>)</li>
<li><strong>Read the customer 1-pager</strong>: <a href="/docs/compliance/eu-ai-act/">EU AI Act overview</a></li>
</ul>
</div>
</div>

</div>

<div style="text-align:center;margin:30px 0;">
<a href="/eu-ai-act/" class="btn btn-primary">{{< eu-flag >}} EU AI Act Module — Full Details</a>
</div>

> **Beta status**: This module is fully implemented and tested in v3.3.0-beta.2. Counsel review of the legal interpretation is pending (v3.4.0+). Use for **evaluation and pre-audit work**; defer formal conformity assessment until counsel sign-off is complete.

---

## Compliance Frameworks

Choose the coverage that matches your compliance needs.

| Framework | Community | Starter | Developer | Professional | Enterprise |
|-----------|:---------:|:-------:|:---------:|:------------:|:----------:|
| MITRE ATLAS | ✓ | ✓ | ✓ | ✓ | ✓ |
| NIST AI RMF | ✓ | ✓ | ✓ | ✓ | ✓ |
| OWASP LLM Top 10 | ✓ | ✓ | ✓ | ✓ | ✓ |
| ISO 27001 | ✓ | ✓ | ✓ | ✓ | ✓ |
| GDPR | — | View | ✓ | ✓ | ✓ |
| HIPAA | — | — | ✓ | ✓ | ✓ |
| PCI-DSS | — | — | ✓ | ✓ | ✓ |
| SOC2 Type II | — | — | Module | ✓ | ✓ |
| ISO 42001 (AI) | — | — | — | ✓ | ✓ |
| **{{< eu-flag >}} EU AI Act** | — | — | — | **✓ Included** | **✓ Included** |

*Starter tier adds SSO, RBAC, and GDPR view for SMB/SLED/SOHO teams. Developer tier adds full compliance and mTLS. Professional includes everything **plus the EU AI Act Module at no extra cost**. Enterprise adds custom frameworks and dedicated support.*

---

## Quick Start

<div class="command-box">
<button class="copy-btn">Copy</button>
<pre># Pull and run
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v3.3.0-beta.2</pre>
</div>

<div class="command-box">
<button class="copy-btn">Copy</button>
<pre># Verify deployment
curl http://localhost:8443/health</pre>
</div>

---

## By the Numbers

<div class="stats-grid">
<div class="stat">
<div class="value">144+</div>
<div class="label">Detection Patterns</div>
</div>
<div class="stat">
<div class="value">66</div>
<div class="label">MITRE ATLAS Techniques</div>
</div>
<div class="stat">
<div class="value">82</div>
<div class="label">{{< eu-flag >}} EU AI Act Controls</div>
</div>
<div class="stat">
<div class="value">24,806</div>
<div class="label">Peak RPS <span style="font-size:10px;color:#888;">(v3.1.1 bench)</span></div>
</div>
<div class="stat">
<div class="value">3.2ms</div>
<div class="label">Avg Latency <span style="font-size:10px;color:#888;">(v3.1.1 bench)</span></div>
</div>
<div class="stat">
<div class="value">5</div>
<div class="label">Security Pillars <span style="font-size:10px;color:#00ADD8;">+Trust</span></div>
</div>
<div class="stat">
<div class="value">10</div>
<div class="label">Compliance Frameworks</div>
</div>
<div class="stat">
<div class="value">97.8%</div>
<div class="label">Test Coverage</div>
</div>
<div class="stat">
<div class="value">5,484</div>
<div class="label">Tests Passing</div>
</div>
<div class="stat">
<div class="value">13.3 MB</div>
<div class="label">Binary Size</div>
</div>
</div>

---

## Enterprise Security Features

<div class="card-grid card-grid-2">
<div class="card">

### 🔐 Cryptographic Identity

ECDSA P-256 agent identity and verification. Challenge-response authentication with key rotation support.

</div>
<div class="card">

### 🛡️ Fail-Secure Design

Insecure fallback replaced with fail-closed behavior. All security checks are fail-closed by default.

</div>
<div class="card">

### 📋 STRIDE Threat Model

Comprehensive threat analysis covering spoofing, tampering, repudiation, information disclosure, DoS, and elevation of privilege.

</div>
<div class="card">

### 🔄 Cross-Protocol Correlation

Correlate threats across HTTP, MCP, A2A, ACP, and ANP protocols with real-time pattern matching.

</div>
</div>
