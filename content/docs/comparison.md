---
title: "AegisGate vs Competitors"
description: "How AegisGate compares to Rebuff, Protect AI, and Lakera for AI security"
type: docs
---

# AI Security Platform Comparison

Choosing an AI security platform means evaluating coverage, accuracy, and operational fit. AegisGate is the only platform with native MITRE ATLAS coverage across all five AI attack surfaces — prompt injection, model extraction, supply-chain compromise, agent-to-agent abuse, and response leakage — delivered as open-source, self-hosted software with measured zero-percent false-positive rates.

## Feature Comparison Table

| Feature | AegisGate | Rebuff | Protect AI | Lakera |
|---------|-----------|--------|------------|--------|
| **ATLAS Coverage** | **52 patterns, 17 categories** | 8-10 patterns | 12-15 patterns | 15-20 patterns |
| **Detection Method** | Regex + heuristic + ML | Regex + ML | ML-first | Regex + ML |
| **Heuristic Fallback** | ✅ (transposition, vowel deletion, reversal) | ❌ | ❌ | ❌ |
| **Shadow Mode** | ✅ (zero-risk deployment) | ❌ | ❌ | Partial |
| **Multi-Protocol** | HTTP + MCP + A2A + ACP + Response | HTTP only | HTTP only | HTTP only |
| **MCP Security** | ✅ (8 guardrails) | ❌ | ❌ | ❌ |
| **A2A Security** | ✅ (mTLS, capability scoping) | ❌ | ❌ | ❌ |
| **Response Scanning** | ✅ (PII, secrets, toxicity) | ❌ | Partial | Partial |
| **FedRAMP Mapping** | ✅ | ❌ | ❌ | ❌ |
| **SOC 2 Mapping** | ✅ | ❌ | Partial | ❌ |
| **ISO 27001 Mapping** | ✅ | ❌ | ❌ | ❌ |
| **NIST 800-171** | ✅ | ❌ | ❌ | ❌ |
| **EU AI Act** | ✅ | ❌ | Partial | ✅ |
| **Shadow Mode Deployment** | ✅ | ❌ | ❌ | Partial |
| **FPR (Measured)** | **0.0%** (10,538 benign) | ~2-5% (est.) | ~3-7% (est.) | ~1-3% (est.) |
| **Evasion Resistance** | **88.5/100** | Not published | Not published | Not published |
| **ONNX Export** | ✅ (<1ms CPU inference) | N/A | N/A | N/A |
| **Open Source** | ✅ (Apache 2.0) | ✅ (MIT) | ❌ (proprietary) | ❌ (proprietary) |
| **Self-Hosted** | ✅ | ✅ | ❌ | ❌ |
| **SIEM Integration** | ✅ (10+ platforms) | ❌ | Partial | ✅ (limited) |
| **Incident Playbooks** | ✅ (FedRAMP, SOC2, NIST, ATLAS) | ❌ | ❌ | ❌ |
| **Attestation** | ✅ (signed envelopes) | ❌ | ❌ | ❌ |
| **SOC 2 Type II** | ✅ | ❌ | In progress | ❌ |

## Key Differentiators

1. **Only multi-protocol AI security gateway** — HTTP APIs, MCP, A2A, ACP, and response scanning in one platform
2. **Measured 0% FPR** — tested against 10,538 benign examples including 1,869 near-miss cases
3. **Compliance-native** — built-in mappings for FedRAMP, SOC 2, ISO 27001, NIST 800-171, and MITRE ATLAS
4. **Shadow mode deployment** — zero-risk ML deployment with 7-day validation window
5. **Open source** — Apache 2.0 license, self-hosted, no vendor lock-in
6. **Incident response automation** — built-in playbooks for 4 compliance frameworks plus ATLAS

## Pricing Context

AegisGate offers four tiers — **Community** (free), **Developer**, **Professional**, and **Enterprise** — with MITRE ATLAS coverage available at every tier. Community and Developer tiers are fully self-hosted; Professional and Enterprise add managed options, priority support, and compliance attestation packages.