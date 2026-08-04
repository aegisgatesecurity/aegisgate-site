---
title: "AegisGate Platform™ — Secure Every AI Interaction"
description: "The only AI security gateway with six-pillar protection: HTTP API, MCP, A2A, ACP, Response, and Trust Framework scanning. MITRE ATLAS 66 techniques. 24 compliance frameworks. 151/170 FedRAMP automated. 11/11 SIEM platforms. Deploy in 60 seconds."
type: "landing"
---

<div class="hero-badges-wrapper">
<div class="project-badges">
    <a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.6.2" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Version-v3.6.2-blue?logo=semver" alt="Version"></a>
    <a href="https://golang.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Go-1.26.5+-00ADD8?logo=go" alt="Go"></a>
    <img src="https://img.shields.io/badge/Coverage-87%25+-green?logo=codecov" alt="Coverage">
    <img src="https://img.shields.io/badge/Docker-34.7MB-2496ED?logo=docker" alt="Docker">
    <a href="https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/compliance/eu-ai-act.md" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/EU_AI_Act-82_controls-003399?logo=europeanunion" alt="EU AI Act"></a>
</div>

<div class="hero-badges performance-badges">
    <a href="https://github.com/aegisgatesecurity/aegisgate-platform" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
    <a href="https://github.com/aegisgatesecurity/aegisgate-platform/security/policy" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/security-RFC%209116-blue.svg" alt="Security Policy"></a>
    <img src="https://img.shields.io/badge/p99 latency-2.8ms-00ADD8?logo=amd" alt="p99 latency">
    <img src="https://img.shields.io/badge/sustained RPS-15,645-00ADD8?logo=amd" alt="sustained RPS">
    <img src="https://img.shields.io/badge/uptime-99.9%25-00ADD8?logo=uptime" alt="uptime">
    <img src="https://img.shields.io/badge/tests-11,200+-00ADD8?logo=jest" alt="test coverage">
</div>

<a href="https://demo.aegisgatesecurity.io/" target="_blank" rel="noopener noreferrer" class="hero-demo-btn">🚀 Try the Live Demo</a>
</div>

<p class="hero-description">The only AI security gateway with six pillars of AI security (HTTP API, MCP, A2A, ACP, RESPONSE, Trust Framework), MITRE ATLAS enforcement, the EU AI Act Compliance Module, and zero external dependencies. Deploy in 60 seconds.</p>

<div class="alert alert-info alert-center">
<strong>🇪 NEW in v3.6.2:</strong> 11/11 SIEM platforms (Datadog + CloudWatch + SecurityHub), Incident PostgreSQL backend, SIEM event durability, reporting delivery (Webhook + SMTP), CSV data export. <a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.6.2" target="_blank" rel="noopener noreferrer">v3.6.2 release notes →</a>
</div>

<div class="alert alert-success alert-center">
<strong>🔒 v3.6.2:</strong> 11/11 SIEM platforms · Incident PostgreSQL backend · SIEM event durability · Webhook + Email reporting · CSV export · Zero-cost proxy (-2.8ms p99) · 102 packages, 0 failures
</div>

<div class="card-grid card-grid-2x2">
<div class="card">
<h3>🌐 HTTP API Security</h3>
<ul>
<li>153+ detection patterns</li>
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
<li>Capability enforcement per agent</li>
<li>License-aware enforcement</li>
<li>Rate limiting and audit logging</li>
</ul>
</div>
<div class="card">
<h3>🛡️ Agent Response Security</h3>
<ul>
<li>PII, secrets, hallucination, toxicity detection</li>
<li>Fail-closed by default</li>
<li>Redaction with multiple strategies</li>
<li>Compliance reports (GDPR, HIPAA, PCI, SOC 2)</li>
</ul>
</div>
<div class="card" style="border-color:#00ADD8;">
<h3>🔐 Trust Framework</h3>
<ul>
<li>Per-session trust score accumulator</li>
<li>Ed25519-signed attestations on every event</li>
<li>Cross-pillar correlation (MCP, A2A, Proxy, Response)</li>
<li>Professional+ tier feature</li>
</ul>
</div>
<div class="card" style="border-color:#38bdf8;">
<h3>🛡️ AegisGate Lens <span class="badge">FREE</span></h3>
<ul>
<li>Free, privacy-first Chrome extension</li>
<li>4-facet detection (PII, secrets, XSS, compliance)</li>
<li>8 AI providers: ChatGPT, Claude, Gemini, Copilot, DuckDuckGo, Perplexity, Mistral, Grok</li>
<li>734 automated tests, zero external dependencies</li>
</ul>
</div>
<div class="card" style="border-color:#f59e0b;">
<h3>⚡ gRPC Service Layer <span class="badge">v3.5.0</span></h3>
<ul>
<li>7 services: Compliance, Scanner, Trust, SSO, Audit, Analytics, Health</li>
<li>50 RPC methods with server reflection</li>
<li>gRPC health checking (grpc.health.v1)</li>
<li>TLS support with mutual TLS</li>
</ul>
</div>
<div class="card" style="border-color:#10b981;">
<h3>🔐 Trust Attestation <span class="badge">v3.5.0</span></h3>
<ul>
<li>ECDSA P-256 attestations with RFC 3161 TSA timestamping</li>
<li>Per-session trust score accumulator</li>
<li>Cross-pillar correlation (MCP, A2A, Proxy, Response)</li>
<li>Attestation verification CLI: <code>aegisgate attestation verify</code></li>
</ul>
</div>
<div class="card" style="border-color:#8b5cf6;">
<h3>📡 SIEM Integration <span class="badge">v3.6.2</span></h3>
<ul>
<li>11/11 SIEM platform coverage (Splunk, Elasticsearch, QRadar, Sentinel, SumoLogic, LogRhythm, ArcSight, Syslog, Datadog, CloudWatch, SecurityHub)</li>
<li>JSON-lines persistence with replay on startup</li>
<li>Batch event forwarding with retry logic</li>
<li>CEF, LEEF, JSON, Syslog RFC 5424, CSV formats</li>
</ul>
</div>
</div>

<div class="cta-grid-compact">
<div class="cta-card-compact">
<h3>🚀 Live Demo</h3>
<p>Try AegisGate in action with our interactive demo environment</p>

<ul>
<li>No account required</li>
<li>Instant access</li>
<li>Full feature set</li>
</ul>
<a href="https://demo.aegisgatesecurity.io/" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn-primary demo-button">
<span class="cta-text">🚀 Launch Demo →</span>
</a>
</div>

<div class="cta-card-compact">
<h3>📦 Download v3.6.2</h3>
<p>Deploy the latest release in your infrastructure</p>
<ul>
<li>Single binary: 34.7 MB</li>
<li>Docker: ghcr.io/aegisgatesecurity</li>
<li>Apache 2.0 licensed</li>
</ul>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v3.6.2" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn-secondary" style="min-width:auto;padding:0.75rem 1.5rem;margin-top:1rem;">
<span class="cta-text" style="font-size:0.95rem;">Download →</span>
</a>
</div>

<div class="cta-card-compact">
<h3>⭐ Star on GitHub</h3>
<p>Join our growing community of security engineers</p>
<ul>
<li>100+ contributors</li>
<li>Active development</li>
<li>Enterprise support available</li>
</ul>
<a href="https://github.com/aegisgatesecurity/aegisgate-platform" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn-outline" style="min-width:auto;padding:0.75rem 1.5rem;margin-top:1rem;">
<span class="cta-text" style="font-size:0.95rem;">Star Project →</span>
</a>
</div>
</div>

---

## Why AegisGate?

There are other AI security products. Here's how AegisGate compares on the dimensions that matter to enterprise security teams:

<table class="comparison-table">
<thead>
<tr>
<th>Capability</th>
<th>AegisGate</th>
<th>Lakera Guard</th>
<th>NeMo Guardrails</th>
<th>Rebuff</th>
<th>Protect AI</th>
</tr>
</thead>
<tbody>
<tr>
<td class="metric-label"><strong>Deployment model</strong></td>
<td class="metric-value">Self-hosted binary</td>
<td class="metric-note">SaaS API only</td>
<td class="metric-note">Library</td>
<td class="metric-note">Library</td>
<td class="metric-note">Platform</td>
</tr>
<tr>
<td class="metric-label"><strong>HTTP proxy scanning</strong></td>
<td class="metric-value">✅</td>
<td class="metric-note">✅</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">⚠️</td>
</tr>
<tr>
<td class="metric-label"><strong>MCP protocol protection</strong></td>
<td class="metric-value">✅</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
</tr>
<tr>
<td class="metric-label"><strong>A2A protocol protection</strong></td>
<td class="metric-value">✅</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
</tr>
<tr>
<td class="metric-label"><strong>ACP protocol protection</strong></td>
<td class="metric-value">✅</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
</tr>
<tr>
<td class="metric-label"><strong>Response scanning</strong></td>
<td class="metric-value">✅</td>
<td class="metric-note">✅</td>
<td class="metric-note">✅</td>
<td class="metric-note">✅</td>
<td class="metric-note">✅</td>
</tr>
<tr>
<td class="metric-label"><strong>Trust Framework</strong></td>
<td class="metric-value">✅ Ed25519</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">⚠️</td>
</tr>
<tr>
<td class="metric-label"><strong>MITRE ATLAS</strong></td>
<td class="metric-value">✅ 66 techniques</td>
<td class="metric-note">⚠️ Partial</td>
<td class="metric-note">❌</td>
<td class="metric-note">⚠️ Partial</td>
<td class="metric-note">✅</td>
</tr>
<tr>
<td class="metric-label"><strong>OWASP LLM Top 10</strong></td>
<td class="metric-value">✅ 49 patterns</td>
<td class="metric-note">✅</td>
<td class="metric-note">✅</td>
<td class="metric-note">✅</td>
<td class="metric-note">✅</td>
</tr>
<tr>
<td class="metric-label"><strong> EU AI Act</strong></td>
<td class="metric-value">✅ 82 controls</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
</tr>
<tr>
<td class="metric-label"><strong>Multi-framework</strong></td>
<td class="metric-value">✅ 24 frameworks</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">⚠️</td>
</tr>
<tr>
<td class="metric-label"><strong>Tamper-evident logs</strong></td>
<td class="metric-value">✅ Hash chain</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">❌</td>
<td class="metric-note">⚠️</td>
</tr>
<tr>
<td class="metric-label"><strong>Open source</strong></td>
<td class="metric-value">✅ Apache 2.0</td>
<td class="metric-note">❌</td>
<td class="metric-note">✅ Apache 2.0</td>
<td class="metric-note">✅ MIT</td>
<td class="metric-note">❌</td>
</tr>
<tr>
<td class="metric-label"><strong>Air-gap deployable</strong></td>
<td class="metric-value">✅ Single binary</td>
<td class="metric-note">❌</td>
<td class="metric-note">✅ Library</td>
<td class="metric-note">✅ Library</td>
<td class="metric-note">❌</td>
</tr>
<tr>
<td class="metric-label"><strong>Hardware footprint</strong></td>
<td class="metric-value">34.7 MB, &lt;256MB RAM</td>
<td class="metric-note">n/a</td>
<td class="metric-note">In-process</td>
<td class="metric-note">In-process</td>
<td class="metric-note">n/a</td>
</tr>
</tbody>
</table>

**TL;DR**: If you need **protocol-level security** (MCP, A2A, ACP) + **compliance evidence** + **self-hosting**, AegisGate is the only option that covers all three.

<ul class="tldr-list">
<li><strong>Library-style tools</strong> (NeMo Guardrails, Rebuff) are great for in-app alignment but don't protect your network boundary</li>
<li><strong>SaaS tools</strong> (Lakera) require sending your traffic to a third party</li>
<li><strong>Compliance-focused tools</strong> (Protect AI) are platforms, not gateways, and don't include protocol coverage</li>
</ul>

---

## Attack Surface Coverage

Your AI infrastructure spans multiple attack surfaces. Most security tools only cover one or two. AegisGate covers all six:


<table class="comparison-table">
<thead>
<tr>
<th>Attack Surface</th>
<th>Risk</th>
<th>Traditional WAFs</th>
<th>LLM Alignment Tools</th>
<th>AegisGate</th>
</tr>
</thead>
<tbody>
<tr>
<td class="metric-label"><strong>HTTP APIs</strong></td>
<td class="metric-note">Prompt injection, data leakage</td>
<td class="metric-note">⚠️ AI-agnostic</td>
<td class="metric-note">❌ No</td>
<td class="metric-value">✅ AI-aware, 153+ patterns</td>
</tr>
<tr>
<td class="metric-label"><strong>MCP Protocol</strong></td>
<td class="metric-note">Tool poisoning, session hijacking</td>
<td class="metric-note">❌ No protection</td>
<td class="metric-note">❌ No</td>
<td class="metric-value">✅ Built-in guard, 8 guardrails</td>
</tr>
<tr>
<td class="metric-label"><strong>A2A Communication</strong></td>
<td class="metric-note">Agent impersonation, tampering</td>
<td class="metric-note">❌ No protection</td>
<td class="metric-note">❌ No</td>
<td class="metric-value">✅ mTLS, HMAC, capability</td>
</tr>
<tr>
<td class="metric-label"><strong>Agent Response</strong></td>
<td class="metric-note">PII leakage, hallucination</td>
<td class="metric-note">❌ No protection</td>
<td class="metric-note">⚠️ Some</td>
<td class="metric-value">✅ Real-time guard, 5 detectors</td>
</tr>
<tr>
<td class="metric-label"><strong>ACP Protocol</strong></td>
<td class="metric-note">Message tampering, replay</td>
<td class="metric-note">❌ No protection</td>
<td class="metric-note">❌ No</td>
<td class="metric-value">✅ HMAC-signed messages</td>
</tr>
<tr>
<td class="metric-label"><strong>Trust / Audit</strong></td>
<td class="metric-note">No traceability</td>
<td class="metric-note">❌ No protection</td>
<td class="metric-note">❌ No</td>
<td class="metric-value">✅ Ed25519 attestations</td>
</tr>
</tbody>
</table>

****AegisGate secures all six** in a single 34.7 MB binary you deploy in 60 seconds.**

---

## Six Pillars in Detail

<div class="card-grid">
<div class="card">

### 🌐 HTTP Proxy Security

Bidirectional scanning of every API request and response. 153+ patterns detect secrets, PII, and threats before they reach your AI services.

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

Real-time threat detection with pattern matching across 153+ signatures. Blocks prompt injection, sensitive data exfiltration, and adversarial attacks.

</div>
<div class="card text-center">

### 📊 Full Observability

Every AI request, response, tool call, and session is logged. SIEM-ready with structured JSON output and compliance reports.

</div>
</div>

<div class="cta-grid-compact" style="margin: 2rem 0;">
<div class="cta-card-compact" style="grid-column: 1 / -1; border-color: rgba(255, 255, 255, 0.15);">
<h3> EU AI Act Compliance</h3>
<p>World's first comprehensive AI regulation compliance module — 82 controls across 8 categories, automated at no extra cost</p>
<ul>
<li><strong>9 automatic controls:</strong> Input validation, data quality, log retention</li>
<li><strong>73 manual controls:</strong> Checklists, evidence templates, audit reports</li>
<li><strong>API endpoints:</strong> `/api/v1/compliance/scan?framework=eu-ai-act`</li>
<li><strong>Tier:</strong> Included with Professional+ at no extra cost</li>
</ul>
<a href="/eu-ai-act/" class="cta-btn cta-btn-primary" style="min-width:auto;padding:0.75rem 1.5rem;margin-top:1rem;">
<span class="cta-text" style="font-size:0.95rem;">Learn More →</span>
</a>
</div>
</div>

---

##  EU AI Act Compliance Module — Included with Professional+ tier

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
<a href="/eu-ai-act/" class="btn btn-primary"> EU AI Act Module — Full Details</a>
</div>

> **Beta status**: This module is fully implemented and tested since v3.5.0. Counsel review of the legal interpretation is pending (v3.4.0+). Use for **evaluation and pre-audit work**; defer formal conformity assessment until counsel sign-off is complete.

---

## Compliance Frameworks

Choose the coverage that matches your compliance needs.


<table class="comparison-table">
<thead>
<tr>
<th>Framework</th>
<th>Community</th>
<th>Developer</th>
<th>Professional</th>
<th>Enterprise</th>
</tr>
</thead>
<tbody>
<tr>
<td class="metric-label"><strong>MITRE ATLAS</strong></td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>NIST AI RMF</strong></td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>OWASP LLM Top 10</strong></td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>GDPR</strong></td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>HIPAA</strong></td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>PCI-DSS</strong></td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>SOC2</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">Module</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>ISO 27001</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>ISO 42001 (AI)</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong> EU AI Act</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value"><strong>✓ Included</strong></td>
<td class="metric-value"><strong>✓ Included</strong></td>
</tr>
<tr>
<td class="metric-label"><strong>FedRAMP Moderate</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-note">151/170</td>
<td class="metric-value">170/170</td>
</tr>
<tr>
<td class="metric-label"><strong>CMMC Level 2</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>NIST 800-171</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>HITRUST CSF</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>TISAX</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
</tr>
<tr>
<td class="metric-label"><strong>CCPA</strong></td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-note">—</td>
<td class="metric-value">✓</td>
</tr>
</tbody>
</table>

*Developer tier adds full compliance (HIPAA + PCI-DSS) and mTLS. Professional includes everything **plus ISO 27001, ISO 42001, CMMC L2, FedRAMP Moderate (151/170), the EU AI Act Module at no extra cost, and the Trust Framework**. Enterprise adds custom frameworks, FedRAMP Moderate (full 170/170), and dedicated support.*

> **📋 Compliance Posture:** AegisGate publishes self-assessments against HIPAA, NIST CSF 2.0, SOC 2 Type 1, CIS Controls v8 IG1, and the EU AI Act. <a href="/compliance/" class="btn btn-secondary">📋 View all compliance documentation</a>

---

## Quick Start

<div class="command-box">
<button class="copy-btn">Copy</button>
<pre># Pull and run
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v3.6.2</pre>
</div>

<div class="command-box">
<button class="copy-btn">Copy</button>
<pre># Verify deployment
curl http://localhost:8443/health</pre>
</div>

---

## By the Numbers

<table class="stats-table">
<thead>
<tr>
<th>Metric</th>
<th>Value</th>
<th>Details</th>
</tr>
</thead>
<tbody>
<tr>
<td class="metric-label">Detection Patterns</td>
<td class="metric-value">153+</td>
<td class="metric-note">Comprehensive threat signatures</td>
</tr>
<tr>
<td class="metric-label">MITRE ATLAS Techniques</td>
<td class="metric-value">66</td>
<td class="metric-note">Full adversarial coverage</td>
</tr>
<tr>
<td class="metric-label">EU AI Act Controls</td>
<td class="metric-value">82</td>
<td class="metric-note">8 categories automated</td>
</tr>
<tr>
<td class="metric-label">Sustained RPS</td>
<td class="metric-value">15,645</td>
<td class="metric-note">v3.6.2 benchmark</td>
</tr>
<tr>
<td class="metric-label">Proxy Overhead p99</td>
<td class="metric-value">-2.8ms</td>
<td class="metric-note">Zero-cost (faster than direct)</td>
</tr>
<tr>
<td class="metric-label">Security Pillars</td>
<td class="metric-value">6</td>
<td class="metric-note">HTTP, MCP, A2A, ACP, RESPONSE, Trust</td>
</tr>
<tr>
<td class="metric-label">Compliance Frameworks</td>
<td class="metric-value">24</td>
<td class="metric-note">Global regulatory coverage</td>
</tr>
<tr>
<td class="metric-label">Test Coverage</td>
<td class="metric-value">86.1%</td>
<td class="metric-note">Comprehensive validation</td>
</tr>
<tr>
<td class="metric-label">Tests Passing</td>
<td class="metric-value">11,200+</td>
<td class="metric-note">CI/CD verified</td>
</tr>
<tr>
<td class="metric-label">Binary Size</td>
<td class="metric-value">34.7 MB</td>
<td class="metric-note">Single static binary</td>
</tr>
</tbody>
</table>

---

## Enterprise Security Features

<div class="card-grid card-grid-2x2">
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

