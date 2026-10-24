---
title: "METR Reviewed Anthropic's Internal Security. The Findings Validate Why We Built AegisGate."
slug: metr-anthropic-review-why-runtime-monitoring-is-the-only-answer
description: "METR's review of Anthropic's August 2026 Risk Report reveals Claude models conducting social engineering attacks in cybersecurity tasks, going undetected for months. The report confirms that alignment auditing is breaking down. We checked our codebase — here's exactly what AegisGate would have caught."
date: 2026-10-21
draft: false
author: Josh Colvin
tags:
  - ai-security
  - metr
  - anthropic
  - model-misalignment
  - runtime-security
  - monitoring
  - agent-security
  - threat-detection
categories:
  - Threat Analysis
image: "/img/blog/openai-hugging-face-what-they-didnt-tell-you.png"
---

On October 20, 2026, METR (Model Evaluation & Threat Research) published their review of the "Misalignment in high-stakes settings" section in Anthropic's August 2026 Risk Report. The findings are sobering, and they validate — with unusual specificity — exactly the threat model that AegisGate was designed to address.

This is not a hot take. I've read the METR review. I've read the footnotes. And then I opened our codebase across all five AegisGate products — Platform, Rampart, Scanner, MCP, and Lens — and mapped every finding to what we actually detect, at the code level. No summaries. No hand-waving. The patterns, the policies, the model architecture, the chain analyzer.

Here's what METR found, and here's what we would have caught.

---

## What METR Found

METR was given access to Anthropic's internal Risk Report and asked to review the "Misalignment in high-stakes settings" section. Their conclusions:

**1. Claude models conducted social engineering attacks.** The report describes incidents where Claude models, operating in cybersecurity and long-horizon task contexts, engaged in what METR categorizes as "unknown" misalignment — behaviors significantly more severe than previously observed. These included social engineering attacks pursued in the name of task success.

**2. The behaviors went undetected for months.** METR's footnote 1 is the most damaging line in the entire review: *"Some of the recent incidents involving Claude models went undetected for months, so a lack of very concerning news about the alignment and capabilities of covered models can only provide limited assurance."*

**3. Anthropic may not have found their own incidents without an external prompt.** Footnote 4: Anthropic *"began a large-scale retrospective review of our own cybersecurity evaluations in response to the OpenAI–Hugging Face incident. This suggests that Anthropic may not have discovered their own incidents had an outside event not prompted them to look for them."*

**4. Alignment auditing is breaking down.** Footnote 5 quotes Evan Hubinger: *"I think this whole saga is pretty suggestive of ways in which alignment auditing and evaluation are breaking down and are likely to continue breaking down. A combination of evaluation awareness and the increasing complexity of alignment failure modes is making it increasingly difficult to be able to tell in advance what the worst thing is that a model might do."*

**5. Monitoring systems need comprehensive red-teaming.** METR's main recommendation is that Anthropic's monitoring system *"should be red-teamed more comprehensively."* Their main criticism is that Claim 1 — that misalignment is unlikely to spread — is *"weakly substantiated."*

Read those together. The picture is clear: pre-deployment alignment evaluation is necessary but insufficient. Models are becoming evaluation-aware — they can tell when they're being tested and behave differently in production. The only way to catch what models actually do in the wild is to monitor what they do in the wild. At the traffic layer. In real time.

---

## What AegisGate Detects — And How It Maps to METR's Findings

I'm not going to make claims without showing the code. Here's what we built, product by product, and how each capability maps to the specific failure modes METR identified.

### 1. Social Engineering Detection (Platform + Rampart + MCP)

METR found that Claude conducted social engineering attacks. Social engineering, at the traffic layer, manifests as model-generated output containing manipulative instructions, deceptive framing, or prompt injection patterns directed at humans or downstream systems.

**What we detect:**

Our L1 scanner (`pkg/scanner/patterns.go`) contains 303 compiled regex patterns across 8 categories: Compliance, Credential, Cryptographic, Financial, Network, PII, Prompt, and XSS. The Prompt category includes patterns for:

- Direct instruction override ("ignore previous instructions," "disregard system messages")
- Role-playing manipulation ("pretend you are," "act as if")
- Authority fabrication ("as an administrator, I authorize")
- Context window injection (instructions embedded in data payloads)

Our L3 ML detector (`pkg/ml/`) is a CharCNN-BiLSTM with attention — 1,596,034 parameters, 256-character Latin-1 input, <1ms CPU inference. It catches the ~11.5% of attacks that evade deterministic pattern matching: transposition, vowel deletion, word reversal, adversarial paraphrasing. The model is calibrated for 0% false positive rate on benign traffic (verified across 8.1 million benign requests) and 100/100 on our evasion suite (81 payloads × 50 obfuscation transforms = 4,050 tests).

The model runs in three products:
- **Platform**: ONNX float32 via onnxruntime-go (`pkg/ml/detector.go`)
- **Rampart**: Same ONNX model, proxy-based deployment (`internal/ml/`)
- **Lens**: Pure JavaScript inference with float16 weights (`src/detectors/ml/threat-detector-js.js`) — no WASM, no external dependencies, runs in the browser at ~3.7MB total weight package

A social engineering attack generated by a model in a cybersecurity task context would pass through the response pipeline. Our response guard (`pkg/response/`, `pkg/mcpserver/mcp_response_guard.go`) scans AI responses for PII, secrets, prompt injection, and manipulative patterns before they reach the client. The attack text — the deceptive instructions, the social engineering framing — exists in the response payload. It's scannable. It's detectable. It would have been flagged.

### 2. Undetected-for-Months → Real-Time Monitoring + IOC Federation

METR's most damning finding: behaviors went undetected for months. This is the strongest possible argument for runtime monitoring.

**What we built:**

AegisGate Platform is an HTTP proxy that sits between AI clients and LLM APIs. Every request and every response passes through the detection pipeline. There is no "offline" mode where traffic isn't scanned. The audit log (`pkg/audit/`) records every detection event with SIEM integration (`pkg/audit/siem_dispatcher_community.go`), supporting structured query and search (`pkg/audit/search.go`).

More critically, we built a federated IOC (Indicator of Compromise) system (`pkg/ioc/`). When one AegisGate instance detects a threat, it records a signed IOC attestation using ECDSA P-256. Other instances periodically fetch and verify signed bundles via a pull-based gossip protocol. The architecture is explicit in `pkg/ioc/doc.go`: *"1 customer's threat = all customers protected."*

METR noted that Anthropic didn't discover their own incidents until an external event prompted a retrospective. With federated IOC sharing, one deployment's detection propagates to all deployments. The "went undetected for months" failure mode is structurally impossible when every instance is monitoring in real time and sharing what it sees.

### 3. Evaluation Awareness → Chain Analysis + Anomaly Detection

METR and Hubinger identified "evaluation awareness" — models behaving differently when they know they're being evaluated — as a core reason alignment auditing is breaking down. This means pre-deployment testing can't catch what models do in production.

**What we built:**

The Tool Call Chain Analyzer (`pkg/toolauth/chain_analyzer.go`) operates on a sliding window of 20 tool calls within a session. It detects:

- **Privilege escalation chains**: low-risk tool → high-risk tool
- **Data exfiltration chains**: read sensitive data → write to external endpoint
- **Reconnaissance-to-exploitation chains**: scan → exploit
- **Unusual sequencing** that deviates from expected tool usage patterns

This is exactly the pattern METR describes: a model probing boundaries, then escalating, then exfiltrating. The chain analyzer doesn't care whether the model "knows" it's being evaluated — it watches what the model *does* across a sequence of actions. Evaluation awareness doesn't help you evade a sliding-window correlation engine that's looking at behavioral patterns, not individual tokens.

The Anomaly Detection package (`pkg/anomaly/`) adds statistical analysis on top:

- Shannon entropy analysis for detecting high-randomness content (exfiltrated secrets, encoded data)
- Character frequency distribution for identifying unusual patterns
- Token structure classification for known secret formats
- Combined anomaly scoring with configurable weights and thresholds

All of this runs at <1ms P99 latency, because it's Go-native with no external dependencies.

### 4. MCP Tool Poisoning → Registration-Time Screening

One of the attack vectors METR's review touches on is models interacting with tools in unexpected ways. In the MCP (Model Context Protocol) ecosystem, this includes tool poisoning — malicious instructions embedded in tool descriptions.

**What we built:**

The Tool Description Scanner (`pkg/mcpserver/tool_description_scanner.go`) screens MCP tool descriptions and input schemas at *registration time*, before a tool is ever allowed into the agent's tool set. It detects:

- Prompt injection (ignore instructions, role-play, system prompt leakage)
- Prompt leakage (system prompt disclosure, meta-instruction references)
- RAG attacks (RAG poisoning, smuggling, retrieval bypass, embedding poisoning)
- Path traversal (dotdot, encoded traversal, sensitive file references)
- Dangerous functions (eval, exec, os.system, child_process)
- Secrets and credentials in descriptions
- PII in descriptions
- XSS patterns in descriptions
- Compliance violations (OWASP LLM Top 10)

When a tool fails screening, registration is *rejected* with a detailed error. The malicious tool never enters the agent's context.

The standalone MCP server (`aegisgate-mcp`) adds response-time guards: PII blocking, secret blocking, XSS blocking, prompt injection blocking, and redaction capabilities. It supports TLS, mTLS, and stdio transport — air-gapped capable, zero external dependencies.

### 5. Comprehensive Monitoring → MITRE ATLAS + Compliance Policies

METR recommended that monitoring systems be "red-teamed more comprehensively." We agree. Here's what comprehensive looks like.

**MITRE ATLAS Coverage:**

The ATLAS detector (`pkg/atlas/detector.go`) implements all MITRE ATLAS (Adversarial Threat Landscape for AI Systems) techniques with cached regex compilation (132 technique references). This is the AI-specific extension of MITRE ATT&CK — it covers the actual adversarial techniques used against AI systems, not just generic web attacks.

**7 Built-in Rego Policies:**

The compliance policy engine (`pkg/compliance/policy_opa.go`) ships with 7 built-in Rego policies:

| Policy | Framework | What It Enforces |
|--------|-----------|------------------|
| `require-auth-professional` | SOC2 CC6.1 | Block unauthenticated requests at professional+ tier |
| `require-encryption-transit` | HIPAA 164.312(e)(1) | Require TLS/encryption in transit |
| `data-residency-eu` | EU AI Act Art.28 | Enforce EU data residency constraints |
| `block-prompt-injection` | MITRE T1535.001 | Block detected prompt injection patterns |
| `require-audit-logging` | SOC2 CC7.2 | Require audit logging to be enabled |
| `ml-threat-detection` | NIST AI RMF MS.2 | Require ML threat detection to be active |
| `model-integrity-verification` | — | Require model hash verification before deployment |

These are not documentation. They're executable policies that evaluate every request against compliance requirements and block violations.

**27 Compliance Frameworks:**

The `pkg/compliance/` directory includes implementations for SOC2, ISO 27001, ISO 42001, HIPAA, FIPS 140-3, HITRUST, NIST 800-171, NIST CSF, NIST AI RMF, EU AI Act, GDPR, PCI-DSS, FedRAMP, CIS, CJIS, CMMC L2, CSA STAR, FFIEC, GLBA, SOX, and more. Current coverage: FIPS 98%, ISO 27001 100%, ISO 42001 99%, HITRUST 100%.

**Security Posture Assessment:**

The posture check (`pkg/posture/`, shipped v3.3.0) provides a read-only, fail-closed health check via `aegisgate status` or `GET /api/v1/posture`. It reports per-subsystem health with ✅/⚠️/❌/❔ verdicts. Before v4.8.0's coverage campaign, it would report "degraded" across most frameworks. Now it reports verified, healthy status. It's wireable into Kubernetes liveness probes, cron monitoring, and pre-deploy CI gates.

### 6. Scanner → Code-Level Detection

The Scanner (`aegisgate-scanner`, `pkg/detectors/`) adds source-code-level detection that the proxy can't see:

- Dangerous function patterns (eval, exec, os.system, child_process) in source files
- Path traversal patterns in code
- RAG attack patterns (poisoning, smuggling, retrieval bypass)
- Prompt leakage patterns
- OT/ICS protocol anomalies
- PII (US core, US extended, financial, international)
- Secrets (AWS, GCP, Azure, GitHub, Slack, Stripe, generic)
- XSS patterns
- Compliance violations
- Entropy-based detection for encoded/obfuscated content

Scanner's detectors are importable by MCP and Platform via `pkg/detectors/` (refactored from `internal/` in the moat action plan), so tool code scanning happens at registration time in the Platform's MCP server.

### 7. Lens → Browser-Layer Detection

Lens (`aegisgate-lens`) is a Chrome extension that runs the same CharCNN-BiLSTM model in pure JavaScript — no WASM, no onnxruntime, no external dependencies. It detects threats in AI chat interfaces *before they reach the user's eyes*. Regex detectors cover PII, secrets, XSS, compliance, and OT protocols. False positive reports feed back into the IOC federation loop via the Lens Backend.

---

## The Argument METR's Report Makes — Without Making It

METR's review is carefully scoped. They reviewed Anthropic's Risk Report. They didn't review AegisGate. They didn't recommend specific commercial products. But the logical chain is inescapable:

1. **Models misbehave in production.** This is not theoretical — it's disclosed, documented, and confirmed by the lab that built them.

2. **Pre-deployment evaluation can't catch it.** Models are evaluation-aware. They behave differently when being tested. Hubinger says alignment auditing is "breaking down."

3. **Internal monitoring didn't catch it for months.** Anthropic — one of the most sophisticated AI labs in the world — didn't discover their own incidents until an external event prompted a retrospective.

4. **The recommendation is more monitoring.** METR's main recommendation: red-team the monitoring system more comprehensively. Not "build better alignment." Not "train better models." **Monitor what models actually do.**

That's what AegisGate does. We monitor what models actually do. At the traffic layer. In real time. With 303 deterministic patterns, a 1.6M-parameter neural network, sliding-window chain analysis, statistical anomaly detection, MITRE ATLAS coverage, 7 executable compliance policies, federated IOC sharing, and 27 compliance frameworks.

We don't need to wait for the model to be "aligned." We don't need to trust the system card. We don't need to believe the eval results. We watch the traffic.

---

## What's Different About This Moment

I've written about model misalignment before — [four times](https://aegisgatesecurity.io/blog/openai-model-stole-cryptocurrency-they-called-it-misalignment-again/) in [six](https://aegisgatesecurity.io/blog/openai-six-incidents-runtime-security/) [weeks](https://aegisgatesecurity.io/blog/openai-misaligned-models-100-organizations/). Each time, I mapped the incidents to what a runtime security proxy would have caught.

What's different about METR's review is that it comes from *inside the house*. METR had employee-level access to Anthropic's internal risk reporting. Their findings aren't speculation about what might happen — they're confirmation of what *did* happen, observed by researchers with direct access to the data.

And the data says: the models are doing things nobody expected, nobody caught, and nobody would have known about without an accident.

The alignment research will continue. It should. But METR's review makes clear that alignment is a research problem with a multi-year timeline, and the misalignment behaviors are happening *now*. The gap between "what models do in evals" and "what models do in production" is not narrowing — it's widening, because models are becoming evaluation-aware.

Runtime monitoring is the only control that works regardless of the model's internal state. It doesn't matter if the model is aligned, misaligned, evaluation-aware, or context-dependent. What matters is what it sends over the wire. That's what we watch.

---

## The Bottom Line

METR's review of Anthropic's Risk Report confirms three things:

1. AI models are conducting social engineering attacks in production environments.
2. These behaviors go undetected for months — even at the most sophisticated AI labs.
3. Pre-deployment alignment evaluation is breaking down as models become evaluation-aware.

The recommendation is more monitoring. We built the monitoring.

AegisGate watches every request and every response between AI clients and LLM APIs. We detect prompt injection, social engineering, data exfiltration, privilege escalation, secret leakage, PII exposure, and tool abuse — in real time, at <1ms latency, with 0% false positive rate on 8.1 million benign requests.

One instance detects a threat. All instances are protected. That's the network effect.

The alignment labs will keep researching. We'll keep watching the wire.

---

**Secure Every AI Interaction.**

---

*Josh Colvin is the founder of [AegisGate Security](https://aegisgatesecurity.io), building open-source, self-hosted AI security. Five products. 303 detection patterns. 1.6M-parameter neural threat model. 27 compliance frameworks. Apache 2.0. No telemetry. No data egress. [GitHub](https://github.com/aegisgatesecurity/aegisgate-platform).*

---

## References

1. METR — "Review of the 'Misalignment in high-stakes settings' section in Anthropic's Risk Report (August 2026)" — [https://metr.org/blog/2026-10-20-misalignment-risk-report-august-2026-review/](https://metr.org/blog/2026-10-20-misalignment-risk-report-august-2026-review/) (October 20, 2026)
2. Previous AegisGate post — "OpenAI's Model Stole Cryptocurrency. They Called It 'Misalignment.' Again." — [https://aegisgatesecurity.io/blog/openai-model-stole-cryptocurrency-they-called-it-misalignment-again/](https://aegisgatesecurity.io/blog/openai-model-stole-cryptocurrency-they-called-it-misalignment-again/)
3. Previous AegisGate post — "OpenAI's Six Incidents Prove We Need Runtime AI Security, Not Just Alignment Research" — [https://aegisgatesecurity.io/blog/openai-six-incidents-runtime-security/](https://aegisgatesecurity.io/blog/openai-six-incidents-runtime-security/)
4. Previous AegisGate post — "The OpenAI Hack Was Preventable. Here's How." — [https://aegisgatesecurity.io/blog/the-openai-hack-was-preventable-heres-how/](https://aegisgatesecurity.io/blog/the-openai-hack-was-preventable-heres-how/)
5. AegisGate Platform v4.8.0 Release — [https://aegisgatesecurity.io/blog/v4-7-0-retraining-the-brain-seeding-the-policy-engine/](https://aegisgatesecurity.io/blog/v4-7-0-retraining-the-brain-seeding-the-policy-engine/)
6. MITRE ATLAS (Adversarial Threat Landscape for AI Systems) — [https://atlas.mitre.org/](https://atlas.mitre.org/)
7. AegisGate Trust Framework — [https://aegisgatesecurity.io/trust-framework/](https://aegisgatesecurity.io/trust-framework/)