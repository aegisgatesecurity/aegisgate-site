---
title: "ARTEX Detections Shipped: 13 Patterns, 5 Correlation Rules, 5 Incident Rules"
slug: artex-detections-shipped
description: "We just shipped ARTEX-specific detection patterns and behavioral correlation rules across all four AegisGate products. 13 regex signatures for the ARTEX autonomous pentesting framework and LiteLLM supply chain compromise, 5 correlation patterns for multi-agent attack behavior, and 5 incident rules with FedRAMP, SOC2, NIST CSF, and MITRE ATLAS compliance mappings. All cross-product parity checks pass."
date: 2026-10-22
author: Josh Colvin
tags:
  - cybersecurity
  - ai-security
  - artex
  - black-october
  - detection-engineering
  - open-source
  - threat-intelligence
  - supply-chain
---

## TL;DR

Following our [Black October Blue Team Field Guide](/blog/black-october-blue-team-guide/), we've shipped ARTEX-specific detections across all four AegisGate products. This is the technical follow-up — what we detected, how we detected it, and how the parity gate ensured every product got the same coverage.

**What shipped:**
- 13 new regex patterns (ARTEX traffic signatures + LiteLLM supply chain indicators)
- 5 correlation patterns (behavioral detection for multi-agent attacks)
- 5 incident rules with compliance mappings (FedRAMP IR-4, SOC2 CC6.1, NIST CSF DE.AE-2/3/4, MITRE ATLAS T0029/T0050)
- Cross-product parity: Platform v4.8.0, Rampart v0.9.2, Scanner v0.4.2, Lens v0.5.3

**Pattern counts:**
| Product | Before | After |
|---------|--------|-------|
| Platform | 284 | 297 |
| Rampart | 284 | 297 |
| Scanner | 335 | 348 |
| Lens (compliance) | 54 | 62 |

---

## The Threat: ARTEX + LiteLLM

Two specific threats from Black October required dedicated detections:

### ARTEX (Autonomous AI Pentesting)

ARTEX is an open-source AI autonomous pentesting framework (Go + Next.js, AGPL-3.0) that coordinates multiple LLM agents to conduct reconnaissance, exploitation, and lateral movement. It was used by Chinese APT Storm-0940 against Microsoft 365 tenants — 2,900 authentication attempts per minute across 327 accounts in 8 organizations, with 151,000+ failed sign-ins.

The attack pattern: initial targeting → privileged cloud access in under 3 hours. AI-accelerated, multi-agent, and using non-Western LLM providers (DeepSeek for recon/exploit, GLM/Zhipu for review, Grok for auxiliary tasks).

### LiteLLM Supply Chain Compromise

LiteLLM, an open-source AI gateway, was compromised via a malicious `litellm_init.pth` file — a Python credential stealer that exfiltrated API keys, tokens, and environment variables to attacker-controlled endpoints. The compromise also included SSRF to cloud metadata services (169.254.169.254), admin endpoint privilege escalation, and RAT/malware deployment through the supply chain.

---

## What We Detected: 13 Regex Patterns

### ARTEX Traffic Signatures (8 patterns)

| Pattern | Severity | Category | What It Catches |
|---------|----------|----------|-----------------|
| `artex_tool_reference` | High | Compliance | ARTEX / Autumn-27 tool name references |
| `artex_model_deepseek` | Low | Compliance | DeepSeek model configuration |
| `artex_model_glm` | Low | Compliance | GLM / Zhipu model configuration |
| `artex_model_grok` | Low | Compliance | Grok model configuration |
| `artex_mcp_external` | Medium | Network | MCP Streamable HTTP/SSE to external servers |
| `artex_compat_gateway_probe` | Medium | Network | OpenAI-compatible API probes with non-standard models |
| `artex_multi_agent_attack` | High | Compliance | Multi-agent orchestration + attack context |
| `artex_repo_reference` | Medium | Compliance | ARTEX repository clone/fork references |

Model config patterns (`artex_model_*`) are Low severity because they're indicators, not threats by themselves. DeepSeek, GLM, and Grok are legitimate models — but when combined with other signals (multi-agent orchestration, rapid endpoint probing), they form a pattern that matches ARTEX's known TTPs.

### LiteLLM Supply Chain Indicators (5 patterns)

| Pattern | Severity | Category | What It Catches |
|---------|----------|----------|-----------------|
| `litellm_init_pth` | Critical | Credential | Known credential stealer file |
| `litellm_ssrf_metadata` | Critical | Network | SSRF targeting cloud metadata endpoints |
| `litellm_admin_abuse` | High | Compliance | Admin endpoint privilege escalation |
| `litellm_cred_exfil` | Critical | Credential | Credential exfiltration via LiteLLM proxy |
| `litellm_rat_deploy` | Critical | Compliance | RAT/malware deployment via supply chain |

---

## Behavioral Detection: 5 Correlation Patterns

Regex patterns catch known signatures. But ARTEX's real danger is behavioral — AI-accelerated, multi-agent attacks that don't match any single signature. We added 5 correlation patterns to the Platform's correlation engine:

### 1. `artex_rapid_recon` (High)
**Indicators:** `endpoint_probe` + `multi_endpoint_scan`  
**Window:** 60 seconds  
**What it catches:** Rapid endpoint probing followed by multi-endpoint scanning — the first phase of an ARTEX attack.

### 2. `artex_credential_spray` (Critical — auto-block)
**Indicators:** `auth_failure_burst` + `credential_stuffing`  
**Window:** 5 minutes  
**What it catches:** Storm-0940's signature attack — 2,900 auth/min across hundreds of accounts. This is the only ARTEX rule with `AutoExecute=true` — it blocks the attacking agent automatically.

### 3. `artex_multi_agent_coord` (High)
**Indicators:** `parallel_agent_activity` + `cross_agent_handoff`  
**Window:** 10 minutes  
**What it catches:** Multiple LLM agents coordinating reconnaissance and exploitation — ARTEX's core capability.

### 4. `artex_ai_accelerated` (Medium)
**Indicators:** `rapid_lateral_movement` + `fast_privilege_escalation`  
**Window:** 3 hours  
**What it catches:** The AI-accelerated attack timeline — initial targeting to privileged access in under 3 hours.

### 5. `artex_graph_anomaly` (High)
**Indicators:** `graph_recon_query` + `oauth_app_registration`  
**Window:** 30 minutes  
**What it catches:** Graph API reconnaissance followed by OAuth app registration — cloud persistence techniques.

---

## Incident Rules: Compliance Mappings

Each correlation pattern maps to an incident rule with compliance framework mappings:

| Rule | Severity | Auto-Execute | Compliance |
|------|----------|-------------|------------|
| `artex_rapid_recon` | High | No (triage) | NIST CSF DE.AE-2, MITRE ATLAS T0029 |
| `artex_credential_spray` | Critical | **Yes (auto-block)** | FedRAMP IR-4, SOC2 CC6.1, NIST CSF DE.AE-3 |
| `artex_multi_agent_coord` | High | No (triage) | NIST CSF DE.AE-2, MITRE ATLAS T0050 |
| `artex_ai_accelerated` | Medium | No (triage) | NIST CSF DE.AE-4, FedRAMP IR-5 |
| `artex_graph_anomaly` | High | No (triage) | NIST CSF DE.AE-2, SOC2 CC6.1 |

Only `artex_credential_spray` auto-executes. The others require triage — they could be legitimate activity (load testing, admin operations, authorized multi-agent workflows).

---

## Cross-Product Parity: How It Works

AegisGate has four products with shared detection logic. We use a CI-enforced parity gate to ensure consistency:

| Relationship | Parity Level | Meaning |
|-------------|-------------|---------|
| Platform ↔ Rampart | FULL | All pattern names AND regex content must match exactly |
| Scanner ↔ Rampart | SUPERSET | All Rampart patterns must be in Scanner (Scanner may have extras) |
| Lens | SUBSET | Compliance-category patterns only, JS regex format |

The parity check runs on every PR and push that touches detection files, plus weekly on Mondays. It validates:
- Pattern name parity (exact match)
- Regex content parity (exact match)
- Model hash alignment
- Evasion suite payload count
- Transform count
- ML threshold alignment
- Detection logic (regex + ML, not ML-only)

**Result:** 14/14 parity checks PASS. All four products have the same ARTEX detection coverage.

---

## Testing: 5+ Consecutive Green Runs

Before pushing, we ran:

- **5 consecutive test runs** on Platform (scanner, correlation, incident packages)
- **5 consecutive test runs** on Rampart and Scanner (detector packages, ~2 min each)
- **Full test suites** on all repos (all packages, not just modified ones)
- **`go vet`** clean across all 4 Go repos
- **Lens unit tests** — 271 tests, 0 failures
- **Detection parity check** — 14/14 PASS
- **Normalization conformance** — 28/28 PASS

We found and fixed two issues during testing:
1. **`TestPatternCountParity`** — hardcoded compliance pattern count needed updating (45 → 53)
2. **`TestDefaultDetectionRulesIntegrity`** — hardcoded rule count needed updating (5 → 10)

Both were test-side issues, not detection logic issues. This is why we run 5+ consecutive runs before claiming green.

---

## What's Next

These detections are live in all four products as of today:

- **Platform v4.8.0** — Full detection (regex + correlation + incident rules)
- **Rampart v0.9.2** — Regex detection (FULL parity with Platform)
- **Scanner v0.4.2** — Regex detection (SUPERSET of Rampart)
- **Lens v0.5.3** — Compliance-category regex detection (browser extension)

All products are free and open source (Apache 2.0). The Community tier of Platform includes all 297 regex patterns and protocol-level scanning at no cost. No feature gating, no "contact us for the real version."

**If you're running AI agents through any of the channels ARTEX exploits — API gateways, MCP servers, A2A protocols — deploy Platform in front of them.** The free tier catches the patterns described in this post. The Pro+ ML anomaly detection adds behavioral detection for novel attacks that don't match known signatures.

---

*AegisGate is open source AI agent security. Five products, one mission: detect threats in AI API traffic, AI artifacts, and AI agent communications. Free Community tier, Apache 2.0, air-gapped capable. [Get started](/docs/quickstart/).*