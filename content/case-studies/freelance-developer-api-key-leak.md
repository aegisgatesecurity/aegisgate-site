---
title: "Case Study: How a Freelance Developer Caught an API Key Leak Before It Hit Copilot"
description: "A composite case study showing how a freelance full-stack developer used AegisGate Lens and Rampart to catch an AWS API key accidentally included in a Copilot prompt, preventing a potential cloud security breach."
date: 2026-08-10
draft: false
type: "case-study"
author: "AegisGate Security"
tags:
  - case-study
  - lens
  - rampart
  - developer
  - secrets
  - api-keys
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
| **User profile** | Freelance full-stack developer, 1-person consultancy |
| **Products used** | AegisGate **Lens** (Chrome) + **Rampart** (VS Code plugin) |
| **Cost** | $0 (both products free) |
| **Incident prevented** | AWS root API key leak to GitHub Copilot |
| **Time to detect** | <1 second (before prompt was sent) |
| **Potential cost avoided** | ~$12,000+ in unauthorized AWS usage |

---

## Background

**"Alex"** is a freelance full-stack developer who works with 4-5 clients at any given time. They use GitHub Copilot in VS Code for code completion and ChatGPT in the browser for debugging and architecture questions. They handle sensitive client infrastructure — AWS environments, databases, CI/CD pipelines.

Before AegisGate, Alex had no AI security controls. Like most developers, they occasionally pasted code snippets into ChatGPT for debugging without thinking about what else was in the snippet.

---

## The Incident

On a Tuesday afternoon, Alex was debugging a failing deployment script for a client's AWS environment. The script referenced environment variables, and Alex had a `.env` file open in their editor with the client's AWS credentials.

They highlighted a block of code that included the `.env` file's contents and pressed `Tab` to accept Copilot's suggestion — which would have sent the entire selection (including the AWS root access key) to Copilot's backend.

**Rampart's IDE plugin caught it.** An inline warning appeared:

> ⚠️ **AWS Access Key Detected**
> `AKIAIOSFODNN7EXAMPLE` — This appears to be an AWS access key. Sending this to an AI service may expose your client's cloud infrastructure.

Alex stopped, removed the credentials from the selection, and continued. The key never left their machine.

---

## What Happened Next

After the near-miss, Alex installed Lens for browser-based AI chat protection. One week later, Lens caught a similar incident — Alex was about to paste a database connection string (containing a PostgreSQL password) into ChatGPT to ask about a connection error. Lens showed its warning banner:

> ⚠️ **AegisGate Lens detected potential risks in your prompt:**
> - 🔑 **Database Password** — A PostgreSQL connection string with credentials was detected. Sending this to an AI service may expose your database.

Alex chose "Edit & Redact" — Lens automatically redacted the password from the prompt, and Alex sent the sanitized version to ChatGPT.

---

## Impact

| Metric | Before AegisGate | After AegisGate |
|--------|------------------|-----------------|
| **Secrets leaked to AI** | 2-3 near-misses per month | 0 |
| **Time spent checking prompts** | Manual review, often skipped | Automatic, <1 second |
| **Cost** | Risk of breach | $0 |
| **Client trust** | Unknown risk exposure | Verifiable protection |

**In Alex's words:**

> "I didn't even think about it before. I was pasting code into ChatGPT multiple times a day, and sometimes that code had credentials in it. Rampart caught an AWS key I didn't even realize was in the selection — that would have gone straight to Copilot's servers. Now I can't imagine working without it."

---

## Deployment Summary

| Component | Setup | Time |
|-----------|-------|------|
| Lens (Chrome) | [Chrome Web Store install](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) | 10 seconds |
| Rampart (VS Code) | Extensions panel → search "AegisGate Rampart" → Install | 30 seconds |
| Total cost | $0 | — |
| Total setup time | <1 minute | — |

**No configuration needed.** Both products work out of the box with default detection rules. Alex later customized Rampart to block (not just warn) on secrets, using a `.vscode/settings.json` override.

---

## Key Takeaways

1. **Developers don't intentionally leak secrets** — it happens by accident, through copy-paste, code selection, and context inclusion. Automated detection catches what humans miss.
2. **Browser + IDE coverage is necessary** — ChatGPT in the browser and Copilot in the IDE are two different attack surfaces. Lens and Rampart each cover one.
3. **Free tools can prevent expensive incidents** — the AWS root key leak could have cost thousands in unauthorized usage, not to mention the client relationship damage.
4. **Zero-friction adoption** — both products installed in under a minute with no account, no configuration, and no performance impact.

---

## Try It Yourself

- 🛡️ [Install Lens for Chrome](https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip) — free, 10 seconds
- 🛡️ [Install Lens for Firefox](https://addons.mozilla.org/en-US/firefox/addon/aegisgate-lens/) — free, 10 seconds
- ⚡ [Download Rampart](https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.0) — free, VS Code/JetBrains/LSP

---

*This is a composite case study. The scenario, metrics, and quotes are representative of the freelance developer segment and were validated using AegisGate's testlab infrastructure.*