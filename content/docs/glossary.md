---
title: "Glossary"
description: "Key terms and definitions for AegisGate Security Platform — AI security, compliance, deployment, and architecture concepts."
weight: 900
---

<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>


## Glossary

A reference for terms used throughout AegisGate documentation. Organized by category for easier browsing.

### AI Security

| Term | Definition |
|------|-----------|
| **A2A** | Agent-to-Agent protocol. AegisGate secures A2A communication with mTLS, HMAC integrity, and capability enforcement. See `pkg/a2a/`. |
| **ACP** | Agent Capability Policy. Controls which actions an AI agent is permitted to perform. See `pkg/acp/`. |
| **Adversarial Pattern** | A prompt or content pattern designed to bypass security controls (prompt injection, jailbreak, encoding evasion). AegisGate detects 820 such patterns. |
| **ATLAS** | MITRE ATLAS (Adversarial Threat Landscape for AI Systems). A framework cataloging attacks against AI systems. AegisGate maps detections to ATLAS techniques. |
| **CheckFunc** | The Go type for an automated compliance control check. Each `CheckFunc` evaluates a specific control and returns compliant/partial/non-compliant status. |
| **Fail-Closed** | A security principle where the system blocks traffic if it cannot scan or verify it. AegisGate is fail-closed by default — if scanning fails, the request is blocked, not allowed through. |
| **MCP** | Model Context Protocol. A protocol for AI agents to invoke external tools. AegisGate secures MCP server interactions with capability enforcement and content scanning. See `pkg/mcpserver/`. |
| **Prompt Injection** | An attack where malicious instructions are embedded in content to manipulate an AI model's behavior. AegisGate detects and blocks prompt injection patterns. |
| **PII** | Personally Identifiable Information. AegisGate detects and redacts PII (SSN, credit card, email, phone, DOB, health plan ID) in AI traffic. |
| **Trust Framework** | AegisGate's system for cryptographic agent identity, per-session trust scoring, and signed attestations. See `pkg/attestation/`. |

### Compliance

| Term | Definition |
|------|-----------|
| **Automated Control** | A compliance control that AegisGate can verify programmatically using one of 4 automation methods. 1,457 of 2,043 controls are automated (71.3%). |
| **Audit Trail Evidence** | One of 4 automation methods. Examines audit logs for required evidence artifacts (access logged, data retention enforced, incident response tracked). |
| **CCPA/CPRA** | California Consumer Privacy Act / California Privacy Rights Act. Developer-tier framework with 26 controls. |
| **CMMC L2** | Cybersecurity Maturity Model Certification Level 2. DoD framework for defense contractors. Enterprise-tier, 110 practices. |
| **Config State Verification** | One of 4 automation methods. Reads running configuration and validates it against framework requirements (TLS enabled, audit logging on). |
| **Cross-Framework Mapping** | One of 4 automation methods. Maps evidence from one framework to satisfy another's requirements (HIPAA access logging → SOC 2 CC6.1). |
| **Detection Engine State** | One of 4 automation methods. Checks that detection rules and scanners are active and covering required patterns. |
| **EU AI Act** | European Union AI Act. First comprehensive AI regulation. Professional-tier, 120 controls across 8 risk categories. |
| **FedRAMP** | Federal Risk and Authorization Management Program. U.S. government cloud security authorization. Enterprise-tier, 170 controls. |
| **Framework** | A compliance framework (HIPAA, SOC 2, EU AI Act, etc.). AegisGate supports 31 frameworks with full Go implementations. |
| **HITRUST CSF** | HITRUST Common Security Framework. Enterprise-tier framework for healthcare and regulated industries. |
| **Manual Control** | A compliance control that requires human processes (organizational policies, legal agreements, physical security, HR training). 586 of 2,043 controls are manual (28.7%). |
| **NIST AI RMF** | NIST AI Risk Management Framework 1.0. Community-tier framework with 50 controls across 4 functions: GOVERN, MAP, MEASURE, MANAGE. |
| **SOC 2** | Service Organization Control 2. Developer-tier framework for service organizations. 64 controls across Trust Services Criteria. |
| **TISAX** | Trusted Information Security Assessment Exchange. European automotive industry security assessment. Enterprise-tier. |

### Deployment

| Term | Definition |
|------|-----------|
| **Air-Gapped** | A deployment with no internet access. AegisGate supports fully offline operation with the `air-gapped` deploy profile. |
| **Config Precedence** | The order in which configuration values are resolved: CLI flags > env vars > config file > deploy profile > defaults. |
| **Deploy Profile** | A predefined configuration preset (v4.2.0+). 5 profiles: `quickstart`, `small-team`, `production`, `high-security`, `air-gapped`. Each populates all config fields with sensible defaults. |
| **Guided Setup** | The v4.2.0 initiative comprising deploy profiles, setup wizard, config validation, and maintenance windows. Makes deployment accessible without DevOps expertise. |
| **Maintenance Window** | A planned downtime period (v4.2.0+) where the platform returns 503 to proxy requests while keeping health/version endpoints accessible. Uses `atomic.Bool` for zero-overhead state checks. |
| **Setup Wizard** | Interactive or non-interactive environment detection tool (v4.2.0+). Auto-detects Docker, K8s, systemd, bare metal; recommends a profile; generates a validated config. |
| **Standalone Mode** | Running AegisGate with `--embedded-mcp` flag, which starts the MCP server in-process without external MCP infrastructure. |

### Architecture

| Term | Definition |
|------|-----------|
| **6 Pillars** | AegisGate's six protection domains: HTTP API, MCP, A2A, ACP (Agent Capability Policy), Response, and Trust. |
| **Detection Pattern** | A regex/ATLAS-mapped deterministic pattern that identifies a specific threat type (secret, XSS, PII, prompt injection, etc.). Wired into every request/response. |
| **Graceful Degradation** | The platform always falls back to deterministic regex-only detection instead of failing. ML detection was withdrawn 2026-11-23; see /changelog/. |
| **ML Threat Detection** | Withdrawn 2026-11-23. The Char CNN-BiLSTM neural model was removed after its training corpus failed an independent label audit; all ML metrics are void. Deterministic regex + ATLAS detection remains. See /changelog/. |
| **ONNX Runtime** | Open Neural Network Exchange runtime. Former optional dependency for the (now withdrawn) ML threat detection. No longer required; detection is regex + ATLAS. |
| **Open-Source** | AegisGate's licensing model: all products are Apache 2.0 open source. All features available in the open-source build. |
| **RBAC** | Role-Based Access Control. Available in self-hosted deployments. |
| **SIEM** | Security Information and Event Management. AegisGate forwards audit events to 11 SIEM platforms (Splunk, Elasticsearch, QRadar, etc.). self-hosted deployments. |
| **SOAR** | Security Orchestration, Automation, and Response. AegisGate integrates with 4 SOAR platforms (PagerDuty, Jira, ServiceNow). |
| **Trust Score** | A per-session trust rating computed by the Trust Framework based on agent identity, behavior, and posture. |

_See also: [Configuration Reference](/docs/configuration/), [CLI Reference](/docs/cli-reference/), [Compliance Frameworks](/docs/compliance/)._