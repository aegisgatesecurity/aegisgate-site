---
title: Threat Model
description: AegisGate Platform threat model — STRIDE analysis, attack surface mapping, and security controls for AI gateway deployments.
weight: 440
---


<div class="ml-notice">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>

## Threat Model

AegisGate's threat model is structured using the [STRIDE](https://en.wikipedia.org/wiki/STRIDE_(threat_modeling)) framework and maps to the [MITRE ATLAS](https://atlas.mitre.org/) adversarial tactics matrix.

### Attack Surface

| Surface | Protocol | Primary Threats |
|---------|----------|----------------|
| AI prompt input | HTTP, MCP | Prompt injection, jailbreak, data exfiltration |
| AI response output | RESPONSE | Toxic content, PII leakage, instruction echo |
| Inter-agent communication | A2A, ACP, ANP | Agent impersonation, task manipulation, context poisoning |
| Management API | HTTP | Unauthorized config changes, credential theft |
| Supply chain | All | Dependency vulnerabilities, model poisoning |

### STRIDE Analysis

| Threat Type | Risk | Mitigation |
|-------------|------|------------|
| **S**poofing | Agent identity forgery | Capability tokens, HMAC verification |
| **T**ampering | Prompt/response manipulation | Integrity checks, deterministic detection (ML withdrawn 2026-11-23) |
| **R**epudiation | Denial of security events | Immutable audit log, ATLAS mapping |
| **I**nformation disclosure | PII leakage in responses | DLP patterns, PII redaction |
| **D**enial of service | Token exhaustion, API flooding | Rate limiting, token budgets |
| **E**levation of privilege | Agent privilege escalation | RBAC, capability-based access |

### L3 ML Detection — WITHDRAWN 2026-11-23

v4.2.0 introduced a CNN-BiLSTM neural network for prompt classification. It was **withdrawn on 2026-11-23** after its training corpus failed an independent label audit (~71% of attack-labeled items flipped to benign). All ML detection-rate/FPR figures are **void**. The system uses deterministic regex + ATLAS detection only; degradation is no longer relevant because ML is off by default and inert. See [/changelog/](/changelog/).

_See also: [Security Overview](/docs/security/) and [MITRE ATLAS Coverage](/docs/atlas/)._
