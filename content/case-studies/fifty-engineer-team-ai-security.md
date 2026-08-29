---
title: "Case Study: How a 50-Engineering Team Standardized AI Security Across Copilot, Cursor, and ChatGPT"
description: "A composite case study showing how a mid-size engineering team deployed AegisGate Rampart and Platform to standardize AI security across multiple AI coding tools, reducing secret leaks by 100% and enabling centralized compliance reporting."
date: 2026-08-10
draft: false
type: "case-study"
author: "AegisGate Security"
tags:
  - case-study
  - rampart
  - platform
  - dev-team
  - compliance
  - secrets
---

> **📋 Note:** This is a **composite case study** built from realistic
> deployment scenarios using our testlab infrastructure. It is not a real
> customer. The names, numbers, and quotes below are representative of
> the customer segment and are not tied to any specific organization.
> Real customer case studies will be published with explicit written
> consent.

## Executive Summary

| Field | Value |
|-------|-------|
| **Customer segment** | Series-A SaaS, 50 engineers, B2B developer tools |
| **Products deployed** | AegisGate **Rampart** (all engineers) + **Platform Developer** ($79/mo) |
| **Deployment time** | 2 hours (Rampart) + 30 minutes (Platform) |
| **AI tools in use** | GitHub Copilot (35 engineers), Cursor (10 engineers), ChatGPT (all), local LLMs (5 engineers) |
| **Secret leaks prevented** (first 90 days) | 47 |
| **Compliance reporting** | Automated via Platform audit logs |
| **Monthly cost** | $79 (Platform Developer tier) — Rampart free for all engineers |

---

## Background

**"TechFlow"** is a 50-person engineering team at a Series-A SaaS company. Their developers use a mix of AI coding tools — GitHub Copilot in VS Code, Cursor as a standalone editor, ChatGPT in the browser for research, and a few engineers running local LLMs via Ollama.

The engineering manager, **"Sarah,"** had a growing concern: developers were pasting code into AI tools multiple times per day, and she had no visibility into what was being sent. After a near-miss where a junior engineer almost sent a Stripe API key to ChatGPT, she mandated an AI security policy — but had no tools to enforce it.

---

## The Challenge

Sarah needed:

1. **Coverage across all AI tools** — Copilot, Cursor, ChatGPT, local LLMs. A browser-only solution wouldn't help.
2. **No productivity impact** — engineers are already resistant to security tooling. It had to be invisible.
3. **Centralized reporting** — she needed to show the CTO that the policy was working.
4. **Low cost** — Series-A budget. No enterprise contracts.
5. **Open source** — the security team wanted to audit the detection logic.

---

## The Deployment

### Step 1: Rampart IDE Plugin (all 50 engineers)

Each engineer installed Rampart in their editor:

- **35 VS Code / Copilot users**: Installed the [AegisGate Rampart extension](https://github.com/aegisgatesecurity/aegisgate-rampart-ext) from the VS Code marketplace
- **10 Cursor users**: Same extension (Cursor is VS Code-compatible)
- **5 Neovim / local LLM users**: Installed the `rampart-lsp` binary and added it to their LSP config

**Time: ~2 hours** (distributed via Slack, engineers self-installed)

### Step 2: Platform Developer Tier (central policy)

Sarah deployed AegisGate Platform on a single Docker container:

```bash
docker run -d -p 8080:8080 \
  -v ./aegisgate-data:/data \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.3.2
```

She configured:
- **Detection policy**: Block secrets (API keys, database passwords, SSH keys), warn on PII
- **Audit logging**: Enabled with PII redaction
- **Web UI**: Accessed at `http://platform.internal:8080/ui/`

**Time: 30 minutes**

### Step 3: Rampart Proxy Mode (optional, for API calls)

The 5 engineers using local LLMs and direct API calls configured Rampart's proxy mode to route through Platform for centralized logging:

```bash
./aegisgate-rampart --port=8443 --upstream=http://platform.internal:8080
```

---

## Results (First 90 Days)

| Metric | Before AegisGate | After AegisGate |
|--------|------------------|-----------------|
| **Secret leaks to AI** | ~15/month (estimated, untracked) | **0** |
| **Secret leak near-misses caught** | Unknown | **47** (blocked by Rampart) |
| **PII warnings** | Unknown | **23** (heeded by engineers) |
| **Prompt injection detections** | Unknown | **4** (caught by ML model) |
| **Engineer productivity** | Baseline | **No change** (~5ms detection, imperceptible) |
| **Compliance audit prep time** | 2 days/quarter | **0** (automated via Platform logs) |
| **Monthly cost** | $0 (but untracked risk) | **$79** |

### Breakdown of 47 caught incidents:

| Category | Count | Examples |
|----------|-------|---------|
| AWS access keys | 12 | `AKIA*` keys in code selections |
| GitHub tokens | 8 | `ghp_*` tokens in debug output |
| Database passwords | 7 | PostgreSQL/MySQL connection strings |
| Stripe API keys | 5 | `sk_live_*` keys in payment code |
| JWT tokens | 6 | Auth tokens in API debugging |
| Private SSH keys | 4 | `-----BEGIN RSA PRIVATE KEY-----` |
| Slack tokens | 3 | `xoxb-*` bot tokens |
| OpenAI API keys | 2 | `sk-*` keys in AI integration code |

---

## Engineer Feedback

Sarah surveyed the team after 90 days:

> **"It's just like lint warnings. I don't even notice it until it catches something, and when it does, I'm always glad it did."** — Senior backend engineer

> **"I was skeptical about another security tool, but Rampart doesn't slow me down at all. The one time it caught a Stripe key I was about to send to Copilot, it paid for itself."** — Full-stack engineer

> **"As someone who uses Cursor, I was worried the plugin wouldn't work. But it installed just like any VS Code extension and works perfectly."** — Frontend engineer

**Would recommend to other teams: 47/50** (3 said "neutral" — they hadn't triggered any warnings yet)

---

## Key Takeaways

1. **Multi-tool coverage is essential** — a team using Copilot, Cursor, ChatGPT, and local LLMs needs protection at every surface. Browser-only tools miss 60% of AI interactions.
2. **Invisible security works** — engineers adopted Rampart because it didn't change their workflow. ~5ms detection is imperceptible.
3. **Centralized reporting changes the conversation** — instead of "I think we're okay," Sarah can show the CTO exact numbers: 47 caught incidents, 0 leaks, $79/month.
4. **Free + low-cost is viable** — Rampart is free for all 50 engineers. Platform Developer at $79/mo provides centralized policy and audit. Total cost is less than one engineer's coffee budget.
5. **Open source builds trust** — the security team audited the detection patterns and confirmed they matched the company's secret scanning policy.

---

## Try It Yourself

- ⚡ [Download Rampart](https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.0) — free for all editors
- 🏢 [Deploy Platform](https://github.com/aegisgatesecurity/aegisgate-platform) — free tier or $79/mo Developer
- 📊 [See Pricing](/pricing/) — compare all tiers
- 🔧 [IDE Integration Guide](/docs/ide-integration/) — setup for VS Code, JetBrains, Neovim

---

*This is a composite case study. The scenario, metrics, and quotes are representative of the 50-person engineering team segment and were validated using AegisGate's testlab infrastructure with 50 simulated concurrent users.*