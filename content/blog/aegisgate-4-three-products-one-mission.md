---
title: "AegisGate 4.0 — Three Products, One Mission: Secure Every AI Interaction"
slug: aegisgate-4-three-products-one-mission
description: "AegisGate launches three open-source AI security products: Lens (free browser extension), Rampart (local proxy + IDE plugin), and Platform (enterprise gateway). All Apache 2.0. Zero data collection. From ChatGPT to Copilot to enterprise AI gateways."
date: 2026-08-10
author: AegisGate Security
tags:
  - release
  - launch
  - lens
  - rampart
  - platform
  - v4.1.0
  - open-source
  - ai-security
---

Every day, millions of people type sensitive data into AI tools. A developer pastes a database password into Copilot. A lawyer sends a contract to ChatGPT for summarization. A journalist asks Claude to analyze a document containing source identities.

Most of the time, nothing goes wrong. Some of the time, everything goes wrong. And you never know which time it is until it's too late.

**AegisGate exists to make sure the sensitive data never leaves your device in the first place.**

Today we're announcing three products — all open source, all Apache 2.0, all built on the same detection engine — that cover the full AI interaction surface, from your browser to your IDE to your enterprise infrastructure.

---

## 🛡️ AegisGate Lens v0.3.1 — Free Browser Protection for Everyone

Lens is a free browser extension for Chrome and Firefox that detects PII, secrets, XSS, compliance risks, and adversarial prompt injections **before you click send** on 10 AI chat tools:

- ChatGPT, Claude, Gemini, Microsoft Copilot, DuckDuckGo, Perplexity, Mistral, Grok, DeepSeek, Meta AI

It runs 100% on-device. No account. No telemetry. No data collection. Nothing ever leaves your browser.

**How it works:** As you type a prompt, Lens checks it locally with 151 regex patterns and a CharCNN-BiLSTM machine learning model (~5ms detection time). If it finds something sensitive — a credit card number, an API key, a prompt injection attack — a banner appears warning you what was detected and giving you three options: Cancel, Edit & Redact, or Send Anyway.

**Key stats:**
- 100/100 adversarial attack patterns caught by the ML model
- 0% false positive rate on the ML detection layer
- ~5ms detection in Chrome (pure JavaScript, no WASM)
- 504 automated tests
- Extension size: 4.2MB (down from 25MB in v0.2.0)

**Install:** [Chrome Web Store](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) · [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/aegisgate-lens/) · [Source code](https://github.com/aegisgatesecurity/aegisgate-lens)

---

## ⚡ AegisGate Rampart v0.6.1 — Local Proxy + IDE Plugin for Developers

Rampart protects the AI tools that Lens can't reach — your IDE, your terminal, your API calls. It runs as a local proxy or as an IDE plugin, intercepting AI traffic from Copilot, Cursor, local LLMs (Ollama, LM Studio), and direct API calls to OpenAI/Anthropic.

**Two modes:**
1. **IDE Plugin** — installs in VS Code/Cursor, JetBrains, or any LSP editor. Real-time detection as you type, inline warnings like lint errors.
2. **Local Proxy** — runs on `localhost:8443`, intercepts all AI HTTP traffic. MITM block mode stops malicious prompts before they reach the model. CA keys encrypted at rest. Audit logs redacted.

**Key stats:**
- 1,318 test functions, 80.7% coverage
- 13 release assets (macOS, Linux, Windows, Docker — cosign-signed)
- Same detection engine as Lens: PII, secrets, XSS, compliance, adversarial ML
- Apache 2.0, zero external dependencies for core functionality

**Download:** [GitHub Releases](https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.1) · [Source code](https://github.com/aegisgatesecurity/aegisgate-rampart)

---

## 🏢 AegisGate Platform v4.1.0 — Enterprise AI Security Gateway

Platform is the server-side gateway for teams and organizations. It sits in front of your AI infrastructure — HTTP APIs, MCP servers, A2A agents, ACP/ANP protocols — and scans every request and response for security risks.

**Six pillars of protection:**
1. **HTTP API Security** — scans prompts and responses on any REST API endpoint
2. **MCP Protocol** — protects Model Context Protocol servers from injection and data exfiltration
3. **A2A (Agent-to-Agent)** — secures inter-agent communication
4. **ACP/ANP** — Agent Communication Protocol and Agent Network Protocol protection
5. **Response Scanning** — scans AI responses for PII leakage, hallucinated secrets, injected content
6. **Trust Framework** — cryptographic attestation of AI interactions for audit and compliance

**Key stats:**
- 31 compliance frameworks (HIPAA, GDPR, PCI-DSS, EU AI Act, SOC 2, ISO 27001, NIST CSF, and 24 more)
- 12 SIEM integrations (Splunk, Elastic, Datadog, Sumo Logic, Chronicle, QRadar, Sentinel, ArcSight, Rapid7, LogRhythm, Graylog, Loki)
- 4 SOAR integrations (PagerDuty, Jira, ServiceNow, Custom webhooks)
- Web UI (7 pages, served at `/ui/`)
- Air-gapped deployment supported
- Single 19.1MB Go binary — no runtime dependencies
- 8,000+ tests, 83.1% coverage
- Performance: 23,578 requests per second sustained, 5,000 concurrent VUs, 0% errors

**Deploy:** `docker run -d -p 8080:8080 ghcr.io/aegisgatesecurity/aegisgate-platform:v4.1.0` · [Live Demo](https://demo.aegisgatesecurity.io/) · [Source code](https://github.com/aegisgatesecurity/aegisgate-platform)

---

## One Detection Engine, Three Deployment Surfaces

All three products share the same detection corpus — the same PII patterns, the same secret signatures, the same XSS vectors, the same compliance mappings, and the same ML adversarial model. What changes is where the detection runs:

| Surface | Product | Where it runs |
|---------|---------|---------------|
| Browser (ChatGPT, Claude, etc.) | Lens | In your browser, on-device |
| IDE (Copilot, Cursor, etc.) | Rampart | On your machine, in your editor |
| API calls, server-to-server | Rampart proxy | On your machine, system-level |
| Enterprise AI infrastructure | Platform | On your servers, in front of AI |

**You don't need all three.** If you only use ChatGPT in a browser, install Lens (free, 10 seconds). If you also code with Copilot, add Rampart (free, 2 minutes). If you run AI infrastructure for a team, deploy Platform.

---

## Privacy by Design — Not by Promise

Every AegisGate product follows the same privacy principles:

- **Zero data collection** — no telemetry, no analytics, no phone-home
- **All detection is local** — patterns and ML run on your device or your server
- **Open source** — Apache 2.0, every line of code is auditable
- **No account required** — for Lens and Rampart, no signup, no email, no tracking
- **No "Pro" upsell** — Lens and Rampart are free forever, not freemium

We believe security tools should not require trust. Our code is open. Our detection runs locally. We collect nothing — because the best way to protect your data is to never touch it.

---

## Getting Started

| You are... | What to install | Time | Cost |
|------------|-----------------|------|------|
| Anyone who uses ChatGPT/Claude/etc. | [Lens](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) | 10 seconds | Free |
| Developer using Copilot/Cursor | [Rampart](https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.1) | 2 minutes | Free |
| Team or enterprise running AI infrastructure | [Platform](https://github.com/aegisgatesecurity/aegisgate-platform) | 5 minutes | Free tier + paid |

**All three products are Apache 2.0. No vendor lock-in. No proprietary formats. No hidden behavior.**

---

*Built by a solo founder. Proven at scale. Open source forever.*

[Website](https://aegisgatesecurity.io) · [GitHub](https://github.com/aegisgatesecurity) · [Documentation](https://aegisgatesecurity.io/docs/) · [Pricing](https://aegisgatesecurity.io/pricing/)