---
title: "The Billion-Dollar Challenge? We Already Built It."
slug: the-billion-dollar-challenge-we-already-built-it
description: "When The Register asked who will solve agentic AI security, two investors described AegisGate's exact architecture. We didn't build a pitch deck — we built the product, tested it across 8.5M requests, and open-sourced it. Here's the proof."
date: 2026-09-21
author: Josh Colvin
tags:
  - ai-security
  - agentic-security
  - threat-detection
  - open-source
  - startup
  - proof-not-panic
---

Last Saturday, *The Register* published a piece titled ["Agentic security is the billion-dollar challenge for some clever startup to solve."](https://www.theregister.com/security/2026/09/19/agentic-security-is-the-billion-dollar-challenge-for-some-clever-startup-to-solve/5297546) Two cybersecurity investors — Matt Hartman (Merlin Group, ex-CISA) and Todd Graham (Microsoft's M12 venture fund) — laid out exactly what they're looking for.

We read it and thought: *they're describing our product.*

Not a roadmap. Not a vision deck. The actual running code, deployed and tested.

---

## What They Asked For vs. What We Built

Let's be specific. Here's what the investors said they want, and here's what AegisGate does today — not next quarter, not after the next funding round, **today**.

### 1. "The security layer that governs agent behavior"
— Matt Hartman, Merlin Group

AegisGate is a reverse proxy that sits between your applications and your AI API providers (OpenAI, Anthropic, Google, and others). Every request and response passes through it. Every one is inspected. Threats are blocked. Behavior is logged. This isn't a monitoring dashboard that tells you about a breach after the fact — it's a gateway that stops the breach from happening.

### 2. "Clear limits on what they can access and do"
— Matt Hartman, Merlin Group

We have a Tool Risk Matrix that classifies every tool call by risk level: Low (file reads, web searches), Medium (file writes, HTTP requests), High (database queries), and Critical (shell commands, code execution). Our Chain Analyzer tracks sequences of tool calls across multi-turn conversations and detects escalation chains, data exfiltration patterns, and reconnaissance behavior — in real time, before the second call in an attack chain completes.

### 3. "An audit trail for actions taken on an agency's behalf"
— Matt Hartman, Merlin Group

Every request is logged: timestamp, session ID, detection results, ML threat scores, chain analysis verdict, block/allow decision, and the full request/response context. If an agent does something at 2 AM on a Tuesday — to use Hartman's phrase — you'll know exactly what it did, when, and whether AegisGate flagged or blocked it.

### 4. "Agentic identity and governance... the next Okta"
— Todd Graham, M12

Session-based conversation tracking gives every agent interaction a persistent identity. Chain analysis correlates tool calls across that session. The audit trail is the governance layer. We're not claiming to be Okta for AI — but the architectural foundation is there, and it's the right foundation.

### 5. "CrowdStrike for AI... AI endpoint security"
— Todd Graham, M12

This is the closest analogy. AegisGate is EDR for AI API traffic. Seven detection layers, each addressing a different class of threat:

| Layer | What It Detects | Status |
|-------|----------------|--------|
| **L1 — Regex Scanner** | 223 known attack patterns (prompt injection, SSTI, XSS, data exfil, system prompt extraction) | ✅ Blocking |
| **L2 — ATLAS/Compliance** | 52+ MITRE ATLAS techniques, OWASP LLM Top 10, compliance violations (GDPR/HIPAA/PCI) | ✅ Blocking |
| **L3 — CharCNN-BiLSTM Neural Net** | Adversarial prompt injection via ~1.6M param ONNX model — catches what regex can't | ✅ Blocking |
| **P2 — Chain Analyzer** | Multi-turn escalation, exfiltration, and reconnaissance chains across tool calls | ✅ Blocking |
| **Response Guard** | PII leakage, secret exposure, XSS in model responses | ✅ Blocking |
| **P4 — Anomaly Detector** | Volume spikes, geographic anomalies, behavioral drift | 🟡 Alert-only |
| **DIST2-5 — Distribution Detectors** | Proxy IP clusters, chain-of-thought extraction, account farming | 🟡 Alert-only |

Four layers are blocking. Two are in alert-only shadow mode because they need production traffic to validate true positive rates — and we refuse to flip them to blocking until we have that data. That's not a weakness. That's discipline.

### 6. "If I'm a CISO for a Fortune 500 company, no way I'm going to go buy 15 things to do one thing"
— Todd Graham, M12

AegisGate is one deployable gateway. One Docker container. One configuration file. Seven detectors, response guard, chain analysis, anomaly detection, compliance scanning, audit logging — all in one proxy. Not 15 vendors. Not 15 contracts. Not 15 dashboards.

---

## The Receipts

Graham said the incidents should be a wake-up call. We agree — and we already answered it.

Two weeks ago, we published a [detection gap analysis](/blog/when-the-attacks-shift-we-shift-too-v4.5.0-detection-parity/) showing our L1 regex layer caught 52.32% of real-world AI attack patterns from the last 90 days. That was the honest number. We didn't hide from it.

Then we went to work.

- **Retrained the L3 neural net** (v12 → v13) with expanded training corpora covering the six blind spots we'd identified
- **Built a full shadow validation infrastructure** — k6 load testing harness, mock upstream, Grafana dashboards
- **Ran a 7-day validation** across 7 detectors — 0% false positive rate on every single one
- **Ran a progressive stress test**: 8,546,186 requests, scaling from 50 to 10,000 concurrent users, peaking at ~28,000 requests per second

### The numbers:

| Metric | Value |
|--------|-------|
| Total requests | 8,546,186 |
| Adversarial requests | 427,522 |
| Detected | 425,724 |
| **True Positive Rate** | **99.57%** |
| Benign requests | 8,118,664 |
| False positives | 0 |
| **False Positive Rate** | **0.00%** |
| Peak load | ~28,000 RPS |
| Max concurrent users | 10,000 |

Zero false positives. Across 8.1 million benign requests. At every load tier we threw at it.

That's not a slide in a pitch deck. That's a [stress test you can read about in detail](/blog/from-shadow-to-shield-8-5m-requests-blocking-mode/), with methodology, infrastructure, and results.

---

## We Also Got Our First Community Security Report

While we were doing this, a security researcher ([@kta1kri](https://github.com/kta1kri)) submitted a vulnerability report through our security advisory program. Three findings — a content extraction bypass, a default configuration issue, and a dead blocking threshold. All valid. All real.

We verified, fixed, tested, and deployed all three fixes the same day. We published the advisory ([GHSA-8c34-rfx7-frm4](https://github.com/aegisgatesecurity/aegisgate-platform/security/advisories/GHSA-8c34-rfx7-frm4)), credited the researcher in our SECURITY.md, and thanked them publicly.

This is how security products should work. You don't hide from vulnerability reports. You thank the researcher, fix the issue, and tell the world.

---

## What We're Honest About

We're not going to claim we've "solved" agentic AI security. That would be dishonest. Here's what we haven't done yet:

- **P4 and DIST2-5 are alert-only.** They need real production traffic to validate true positive rates. We're looking for design partners who can provide that traffic — and we'll flip them to blocking only when the data justifies it.
- **Our validation is synthetic.** The 8.5M request stress test used generated adversarial payloads and benign traffic. It's rigorous, but it's not the same as production traffic from real users. That's the next step.
- **No SOC 2 or third-party pentest yet.** Both are planned and budgeted (SBIR-gated). We're a solo founder bootstrapping with an NSF SBIR — these are coming, but they take time and capital.
- **We're early stage.** Design partner stage, not enterprise production. We know that. But the architecture is right, the tests are real, and the code is open.

---

## Open Source

AegisGate Platform is [open source](https://github.com/aegisgatesecurity/aegisgate-platform) (Apache 2.0). The detection engine, the chain analyzer, the ML model architecture, the validation harness — all of it. You can read every line of code that blocks a request. You can run the tests yourself. You can audit the model weights.

We believe security products should be auditable. "Trust us" is not a security model.

---

## To the Investors

If you're an investor looking for the company that solves agentic AI security — we're not asking you to take our word for it. We're asking you to:

1. **Read the code.** It's open source.
2. **Run the tests.** The validation harness ships with the platform.
3. **Talk to us.** We're a solo founder with a working product, real test data, and a clear roadmap. We're not a slide deck. We're a deployed system.

The *Register* article asked: *"Who will solve this?"*

We already started. Come see.

---

**[AegisGate Security](https://aegisgatesecurity.io)** — Open-source AI security gateway. Built by Josh Colvin. Apache 2.0.

**[GitHub](https://github.com/aegisgatesecurity)** | **[Design Partners](mailto:josh@aegisgatesecurity.io)**