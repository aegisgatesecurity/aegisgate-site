---
title: "From Shadow to Shield: Validating 8.5M Requests and Flipping Our Detectors to Blocking"
slug: from-shadow-to-shield-8-5m-requests-blocking-mode
description: "36 hours after publishing our detection gap analysis, we validated our advanced detectors across 8.5 million requests, achieved 0% false positives, and flipped two more layers to blocking mode. Here's the story — and the receipts."
date: 2026-09-20
author: Josh Colvin
tags:
  - ai-security
  - threat-detection
  - adversarial-testing
  - machine-learning
  - detection-parity
---

In our [previous post](/blog/when-the-attacks-shift-we-shift-too-v4.5.0-detection-parity/), we analyzed real-world AI attack patterns from the last 90 days, ran them against our own detection stack, and found a 52.32% detection rate. We fixed six blind spots in our L1 regex patterns, achieved 100% on the adversarial test suite, and shipped v4.5.0.

That was Act I — the regex gaps. Act II was bigger.

---

## The Question We Couldn't Answer

v4.5.0 shipped with five advanced detectors all in alert-only mode. They could detect threats, but they didn't block anything:

| Detector | What It Does | Mode at v4.5.0 Ship |
|---|---|---|
| **L3** (CharCNN-BiLSTM) | Neural net prompt injection detection | Alert-only (shadow) |
| **P2** (Chain Analyzer) | Multi-step tool call chain attacks | Alert-only |
| **P4** (Anomaly Detector) | API key usage anomalies | Alert-only |
| **DIST2-5** | AI model distillation / key theft | Alert-only |

The L1 regex fix was the headline. But the real question was: **can we validate these advanced detectors at production scale and flip them to blocking — with zero false positives?**

If a F500 company came to us tomorrow as a design partner, could we guarantee that flipping these detectors to blocking mode wouldn't break their legitimate traffic?

We didn't have the data. So we went and got it.

---

## Building the Validation Infrastructure

We built a shadow validation harness designed to answer one question: **what is the false positive rate under production-scale load?**

- **k6 load testing scripts** — 7-day FPR validation, progressive stress test (50→10K concurrent users), and targeted TPR tests for each detector
- **Mock upstream server** — instant 200s, ensuring the security processing was the bottleneck, not the LLM backend
- **Grafana dashboard** — real-time FPR/TPR per detector, visible during test runs
- **Docker Compose override** — shadow mode configuration for the test environment

The shadow detectors run *before* the request is forwarded to the upstream. Using a mock upstream doesn't affect FPR/TPR measurement — the security processing happens regardless of what the backend does.

---

## The 7-Day Shadow Validation

First, a smoke test to verify the infrastructure. Then the full 7-day run:

| Metric | Value |
|---|---|
| Total requests | 13,618 |
| Benign requests | 12,968 |
| **FPR (all 7 detectors)** | **0.00%** |
| TPR (L3, short synthetic run) | 28.92% |

Zero false positives across every detector. The TPR was low — expected for a short run with a small adversarial payload set. The real question was whether FPR would hold at 0% under production load.

---

## The Stress Test: 8.5 Million Requests

We built a progressive stress test that ramps through 5 load tiers, holding each for 60 seconds:

| Tier | Concurrent Users | Duration | Requests | Throughput |
|---|---|---|---|---|
| 1 | 50 | 60s | 841K | 12,943 RPS |
| 2 | 500 | 60s | 1.63M | 27,169 RPS |
| 3 | 1,000 | 60s | 1.68M | 28,072 RPS |
| 4 | 5,000 | 60s | 1.69M | 28,219 RPS |
| 5 | 10,000 | 60s | 1.69M | 28,159 RPS |
| **Total** | | **6m15s** | **8,546,186** | **~28K RPS peak** |

### Results

| Metric | Value |
|---|---|
| **False Positive Rate** | **0.00%** (0 / 8,118,664 benign requests) |
| **True Positive Rate (L3 neural net)** | **99.57%** (425,724 / 427,522 adversarial) |
| Peak throughput | ~28,000 requests per second |
| Total errors | 279 (0.003%) |
| Crashes | 0 |
| p50 latency at 10K concurrent users | 36ms |
| p95 latency at 10K concurrent users | 378ms |

**Zero false positives across 8.1 million benign requests.** At every load tier. That was the number we needed.

The 0.43% miss rate on L3 represents the most subtle prompt injection variants — attacks phrased as legitimate questions that barely cross the detection threshold. In a layered defense, L1 and L2 catch most of those. No single layer is perfect. That's why there are four.

---

## The Detection Architecture

After this validation, the AegisGate detection stack looks like this:

```
Incoming Request
       │
       ▼
  L1: Regex Pattern Matching (216 patterns)
       │  → SSTI, obfuscated code, model theft, system prompt extraction,
       │    safety bypass, data exfiltration, OWASP Top 10 for LLMs
       ▼
  L2: MITRE ATLAS Technique Mapping (52+ techniques)
       │  → Compliance violations, sophisticated attack patterns
       ▼
  L3: CharCNN-BiLSTM Neural Network (~1.6M params, ONNX)
       │  → Subtle prompt injection that regex can't see
       ▼
  P2: Tool Call Chain Analyzer
       │  → Escalation, exfiltration, reconnaissance chains
       ▼
   ✅ Forward to upstream (or 403 if blocked)

  P4: Anomaly Detector (alert-only)     DIST2-5: Distillation (alert-only)
       │                                      │
       └─→ Logs + metrics                     └─→ Logs + metrics
```

**Four layers actively blocking. Two layers watching and logging.**

---

## Flipping L3 to Blocking

With 0% FPR validated across 8.5M requests, we flipped L3 (the neural net) from shadow mode to blocking mode.

One config change: `MLShadowMode: false`.

Live verification:

| Request | Expected | Result |
|---|---|---|
| Subtle prompt injection | 403 Forbidden | ✅ 403 |
| Benign question | 200 OK | ✅ 200 |

The neural net went from watching to blocking. 425,724 adversarial requests that would have reached the upstream now get a 403.

---

## Flipping P2 to Blocking

P2 (Chain Analyzer) detects multi-step attacks across tool calls in a conversation session. It looks for three patterns:

- **Escalation chains** — risk levels increase across calls (e.g., `file_read` → `process_list` → `database_query` → `shell_command`)
- **Exfiltration chains** — read operations followed by network calls (e.g., `database_query` → `http_request`)
- **Reconnaissance chains** — recon tools followed by high-risk execution (e.g., `scan_ports` → `bash`)

We built a targeted TPR test using registered tool names from the risk matrix:

| Metric | Value |
|---|---|
| TPR | 88.33% |
| FPR | 0.00% |
| Chain alerts triggered | 53 |

88% is not 99.57%. Chain analysis catches most escalation, exfiltration, and reconnaissance patterns, but approximately 12% slip through — usually chains that don't cross enough risk thresholds within the 20-call analysis window. In a layered defense, L1/L2/L3 provide backstop coverage. It's still significantly better than no chain detection at all.

With FPR at 0%, we flipped P2 to blocking. Live verification — a 4-request escalation chain sharing a conversation ID:

| Request | Tool | Risk | Result |
|---|---|---|---|
| 1 | `file_read` | Low | 200 OK |
| 2 | `process_list` | Medium | **403 BLOCKED** (escalation detected) |
| 3 | `database_query` | High | **403 BLOCKED** |
| 4 | `shell_command` | Critical | **403 BLOCKED** |

Benign chain (`file_read` → `web_search` → `git_status`, all low risk): all 200 OK.

The block triggers on the second call — once the chain pattern establishes. The first call is always allowed because a single low-risk tool call is benign by itself. That's by design. Chain analysis requires seeing multiple calls.

---

## What's Still Alert-Only (And Why That's a Feature)

Two detectors remain in alert-only mode: P4 (anomaly detection) and DIST2-5 (distillation / key theft detection).

We validated their **false positive rate is 0%**. But we could **not** validate their true positive rate. Here's why:

**P4 anomaly detection is time-based.** It checks for volume spikes (hourly request count > mean + 3σ), off-hours usage, new tool appearance, and geo-shift. In synthetic testing, all requests share the same hour → standard deviation = 0 → volume spike detection can't fire. All requests originate from the same Docker host IP → geo-shift can't fire. These checks require real-world traffic variation.

**DIST2-5 is pattern-based.** It checks for proxy service IPs (DigitalOcean, AWS, Linode, Vultr, Oracle, Hetzner, Contabo ranges), sustained chain-of-thought extraction patterns, account clustering across API keys, and stolen key usage. Synthetic traffic from a Docker host doesn't match any of these conditions.

This isn't a bug. It's the fundamental limitation of lab testing. These detectors need **real traffic with natural variation** to validate true positive rate. That's exactly what a design partner provides.

The code is ready. The configuration flag pattern is proven — identical to what we just did for L3 and P2. When a design partner sends real traffic and we validate TPR, flipping to blocking is a single boolean change.

---

## Model Parity: Three Products, One Model

During this session, we also audited model parity across all three AegisGate products. We found four stale ONNX model copies — the standalone platform repo, the testlab Docker mount, the upstream code path, and the enterprise repo all had older model versions. All were updated to v13.

| Product | Format | Hash | Status |
|---|---|---|---|
| Platform (6 locations) | ONNX | `329fd89a...` | ✅ v13 |
| Rampart | ONNX | `329fd89a...` | ✅ v13 |
| Lens (3 locations) | JS weights | `b46bbde2...` | ✅ v13 |

Full parity verified. One model, three runtimes (Go proxy, local MCP proxy, browser extension), same detection behavior.

---

## The Numbers: Before and After

| Metric | 36 Hours Ago | Now |
|---|---|---|
| L1 detection rate | 52.32% | 100% (24/24) |
| L3 true positive rate | 100% (training corpus only) | 99.57% (8.5M requests) |
| False positive rate | 0% (24 benign payloads) | 0.00% (8,118,664 benign) |
| Active blocking layers | 2 (L1 + L2) | 4 (L1 + L2 + L3 + P2) |
| Peak load tested | 2,000 VUs / 2,605 RPS | 10,000 VUs / 28,000 RPS |
| Total requests validated | 6.48M | 8,546,186 |
| Detectors FPR-validated | 1 (L1) | 6 of 6 |
| Detectors TPR-validated | 1 (L1) | 4 of 6 |

---

## What We Learned

**1. "It works in the lab" is not "it's ready for production."** The L1 fix was a lab test — 24 payloads, 24 benign. The real validation was 8.5 million requests across 5 load tiers. The lab test told us the patterns were correct. The stress test told us they don't break at scale.

**2. Shadow mode is how you build trust.** Running detectors in alert-only mode first, measuring FPR against real traffic patterns, and only flipping to blocking when FPR = 0% — this is the discipline most vendors skip. It's easy to block everything. It's hard to block only threats.

**3. Some gaps can't be closed in a lab.** P4 and DIST2-5 are validated for false positives but not true positives. That's not a failure — it's an honest assessment. The validation requires real-world traffic. That's a design partner conversation, not an engineering problem.

---

## A Note on Community Security Research

During this session, we received our first community-submitted security report — [GHSA-8c34-rfx7-frm4](https://github.com/aegisgatesecurity/aegisgate-platform/security/advisories/GHSA-8c34-rfx7-frm4) from [@kta1kri](https://github.com/kta1kri).

The report identified three vulnerabilities in our request scanning pipeline:

1. **Content extraction bypass** — Our `extractContentFromRequest` function only scanned messages with `user` and `system` roles. A crafted request could place adversarial content in a fabricated `assistant` or `tool` message turn, bypassing all detection layers entirely.
2. **Response Guard defaulting to non-blocking** — `StrictMode` was set to `false` by default, meaning PII, secret, and XSS findings in responses were logged but never blocked. There was no configuration surface to enable it.
3. **Dead blocking threshold** — The scanner's `ShouldBlock()` function hardcoded a `>= High` severity check, ignoring the configurable `BlockThreshold` setting entirely. Medium-severity PII findings could never be blocked regardless of configuration.

All three were verified, fixed, and live-tested within hours. The advisory was published, and the researcher is credited in our [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/SECURITY.md).

This is the kind of feedback that makes open-source security software better. We're a solo-founder company, and we shipped a fix the same day. If you find something, [report it](https://github.com/aegisgatesecurity/aegisgate-platform/security/advisories/new) — we'll take it seriously, we'll fix it fast, and we'll give you credit.

Thank you, @kta1kri.

---

## What's Next

AegisGate now blocks AI prompt injection, tool chain attacks, and compliance violations across 4 detection layers with 0% false positives, validated across 8.5 million requests at 28,000 requests per second.

Two detectors — anomaly detection and distillation/key theft detection — are validated for false positives and awaiting design partner traffic to complete true positive rate validation. The code is ready. The flip is one configuration change.

### Design Partners

If your organization runs AI APIs in production and wants to be part of validating the last two detection layers, we'd like to talk. Design partners get:

- Self-hosted deployment (Apache 2.0, no telemetry, no data egress)
- Direct input on detection priorities for your traffic patterns
- P4 and DIST2-5 TPR validation against your real-world traffic
- Blocking mode flip for validated detectors in your environment

[Contact us →](https://aegisgatesecurity.io/#contact)

**Secure Every AI Interaction.**

---

*Josh Colvin is the founder of [AegisGate Security](https://aegisgatesecurity.io), building open-source, self-hosted AI security. Apache 2.0. No telemetry. No data egress. [GitHub](https://github.com/aegisgatesecurity/aegisgate-platform).*