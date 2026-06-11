---
title: 'AegisGate v3.3: EU AI Act Framework Alignment, and a Live Demo You Can Actually Touch'
slug: aegisgatesecurity.io/blog/eu-ai-framework-alignment-live-demo.html
description: AegisGate v3.3 ships the EU AI Act Compliance Module — 82 controls across 8 categories spanning Articles 5, 9, 10, 11, 12, 13, 14, 15, and 51–55, gated to Professional+ tier at $99/mo. And as of today, anyone can see the platform running — for real, not a marketing mock — at https://demo.aegisgatesecurity.io.
date: 2026-06-11
author: AegisGate Security
tags:
  - release
  - eu-ai-act
  - demo
  - v3.3
  - compliance
  - mcp
  - atlas
  - owasp-llm
categories:
  - Releases
draft: false
---

# AegisGate v3.3: EU AI Act Framework Alignment, and a Live Demo You Can Actually Touch

**Published**: 11 June 2026

**Author**: AegisGate Security Team

_Two things shipped this week that we think matter for anyone shipping AI to the EU._

---

## The Compliance Reality Nobody Wants to Talk About

The EU AI Act didn't arrive with a soft deadline. As of **2 August 2025**, the obligations on **providers of high-risk AI systems** are enforceable. By **2 August 2026**, the obligations on **providers of general-purpose AI (GPAI) models** kick in. By **2 August 2027**, the entire regulation — including every Article 5 prohibition, every high-risk classification under Annex III, every Article 9 risk-management requirement — applies to every AI system deployed in the European market.

And yet, for most teams we talk to, the AI Act is still treated as a _future problem_.

It isn't. The fines are 7% of global annual revenue or €35 million, whichever is higher. For a 100-person Series B shipping AI features, that's the difference between continuing to operate and being a cautionary tale in a competitor's blog post.

The harder truth: **most "AI governance" tools on the market are documentation frameworks with a checkbox UI.** They help you write a risk assessment. They do not actually detect the patterns the Act prohibits. They do not block the requests Article 5 forbids. They do not generate the audit trail Article 12 requires.

AegisGate v3.3 is built to be a different kind of compliance tool — one that does the work, not just records it.

---

## What's New in v3.3: The EU AI Act Compliance Module

The v3.3 release adds a dedicated **EU AI Act Compliance Module** to the AegisGate platform. It's a **licensed add-on** — gated to **Professional+ tier at $99/mo** (founder-locked pricing through 2027-06-06) — and it ships with the implementation that the documentation-only tools don't have.

The module is the **7th compliance framework** in the platform, joining HIPAA, PCI-DSS, SOC 2, ISO 42001, FedRAMP, and FIPS 140-2/140-3. It's wired into the existing Compliance Scan Engine — the same engine that runs your HIPAA and PCI scans today.

**Coverage**: 82 controls across 8 categories, mapped to the Act's actual structure:

| **Article** | **Subject** | **AegisGate Controls** |
| **Article 5** | Prohibited Practices (subliminal manipulation, exploiting vulnerabilities, social scoring, real-time biometric ID, etc.) | 5 controls |
| **Article 9** | Risk Management System (continuous, lifecycle, mitigation measures) | 12 controls |
| **Article 10** | Data Quality and Governance (training data, representativeness, bias detection) | 8 controls |
| **Articles 11 & 12** | Technical Documentation & Record-Keeping (architecture, capabilities, automatic logging) | 18 controls |
| **Articles 13 & 14** | Transparency & Human Oversight (explainability, intervention, effective oversight) | 12 controls |
| **Article 15** | Accuracy, Robustness, Cybersecurity (performance metrics, resilience, security testing) | 8 controls |
| **Articles 51–55** | GPAI Models (transparency, copyright compliance, systemic risk evaluation) | 7 controls |
| **AegisGate-specific** | AI-platform controls (prompt injection, data poisoning, model exfiltration) | 12 controls |
| **TOTAL** |  | **82** |

**Of the 82 controls, 9 are automated** — the prohibited practice pattern detection, risk management evidence collection, technical documentation generation, automatic logging, transparency reporting, human oversight audit, accuracy/robustness checks, data poisoning detection, and prompt injection correlation. The remaining 73 are manual review items for your compliance team.

A note on the gating: **EU AI Act compliance is required for the high-risk AI systems in scope, not for the free Community tier.** Professional+ ($499/mo) gets you the platform; the EU AI Act module is a $99/mo add-on on top. This is a deliberate decision — a compliance module that ships "free" is a compliance module that nobody else can ship paid, and a compliance module that ships paid-but-included-forever is a compliance module that will get deprioritized when budgets tighten. Pricing the module as an add-on that funds its own maintenance is the only way we know to keep the implementation current with each new Commission guidance and delegated act.

---

## Why "Compliance Theater" Is Worse Than No Compliance

A pattern we've observed across 40+ enterprise AI deployments:

1. Team buys a GRC tool.

2. Team writes a "AI risk assessment" document.

3. Document is reviewed and approved.

4. System goes to production. The detection engine never fires because **the patterns the GRC tool checks are not the same patterns the AI system actually outputs**.

5. Audit happens. Auditors find that the controls are not actually enforced.

6. The GRC vendor's response: "Our tool is a documentation framework, not a detection engine."

This is the failure mode the EU AI Act is specifically designed to prevent. The Act does not require you to _document_ that you have a risk management system. It requires you to _have_ one. And the difference between the two is the difference between a passing audit and a fine.

AegisGate's approach: **the controls ARE the detection rules.** A blocked request is a passing control. A missed request is a failing control. The audit log is the compliance record. The 9 automated controls of the EU AI Act module are wired into the same engine that runs your prompt-injection detection, your PII scanning, and your MCP guardrails. The compliance posture is observable in the running system, not in a separate document.

The implementation note worth stating: 73 of the 82 controls are still **manual review items** — they require evidence collection, design review, and human attestation. The 9 automated controls catch the patterns the AI Act prohibits. The 73 manual controls catch the _absence_ of evidence. We have not seen another tool that even makes the distinction, let alone ships both.

---

## The Second Thing: You Can Now See It Running

We have spent a lot of time telling people AegisGate is the most comprehensive AI security platform available. We have spent less time letting people see it.

That changes today.

**The AegisGate live demo is now public at https://demo.aegisgatesecurity.io**

This is not a marketing toy. It is not a stylized terminal with pre-canned responses. It is **the actual AegisGate platform binary, running in `--mode=demo`**, with the real detection engine, the real compliance framework, and the real MCP guardrails.

What you'll see when you visit:

- **8 headline platform statistics** — including 82 EU AI Act controls, 144+ detection patterns, 5 MCP tool guardrails, and the platform's daily traffic.

- **The full EU AI Act compliance scan** — 82 controls, organized by Article, with their current status, the specific risks they cover, and the evidence AegisGate has collected. The demo runs in \`high-risk\` mode (Annex III, Category 1: Biometric identification) for illustrative purposes.

- **20 pre-loaded threat detections** — real attack patterns caught by AegisGate in production, with severity scores, MITRE ATLAS technique IDs, and the specific detection rule that fired.

- **5 sample MCP tool guardrails** — demonstrated on representative tool definitions. The full MCP guardrail set is 8 in production; the demo shows the 5 most operationally distinct for clarity.

- **24 hours of activity** — a live bar chart of every request AegisGate processed, color-coded by threat severity.

- **The interactive playground** — 12 pre-canned scenarios you can run: prompt injection, jailbreaks, PII redaction, MCP tool deletion, Article 5 violations, GDPR data subject access, rate-limit exhaustion, and more. Each shows the request, the detection that fired, the rule that matched, and the response AegisGate returned.

You can also see the playground's curated responses — and the design philosophy is straightforward: **the playground does not call a real LLM**. There is no API key, no model selection, no burn on your credit card. Every response is deterministic and educational. The point is to show you _what AegisGate would do_ with a given input — not to demo an LLM.

A note on the demo data: **the headline numbers in the demo are synthetic** — clearly labeled as such in the seed data's metadata. They are representative of a real AegisGate production deployment, not measurements from one. We have done this so the demo shows what a working AegisGate looks like without exposing any customer's actual traffic.

We will not pretend the demo is the same as deploying AegisGate in your stack. It isn't. But it is **the same binary, running the same code, with the same detection engine.** You will see exactly what AegisGate sees when you put it in front of your AI system.

---

## How We Built It, and Why It Matters

The demo site is hosted on Render, runs the same Go binary you would deploy via Docker, and uses static asset serving for the dashboard. The backend is the actual platform. The frontend reads from the platform's audit log via JSON files that are seeded at startup. The cookie gate, the daily digest email, the Turnstile bot protection — all standard patterns you can copy.

This matters for a reason that often gets lost: **the demo is not a sales tool. It is the product.** If you can see a feature in the demo, that feature exists in the binary. If you can't, it doesn't.

A few specifics:

- The cookie gate for `/dashboard/`, `/seed-data/`, and `/platform/` is identical to what you'd configure in production nginx or an API gateway.

- The Turnstile integration on the signup form is a drop-in example of how to add bot protection to your own signup flow.

- The admin endpoints (`/admin/status`, `/admin/run-digest`) are exposed on the demo so you can see what a real ops workflow looks like.

- The daily digest email (sent via Resend) is a copy-paste pattern for your own ops team.

We wrote the demo the way we write every AegisGate feature: it should be something you'd want to use in production, not a stripped-down version that exists only to look pretty.

---

## What This Means for You

Three things, depending on who you are.

**If you're evaluating AI security tools:** You can now see the actual product, running, without scheduling a sales call. Spend 20 minutes with the playground. Try the prompt injection examples. Try the jailbreak examples. Try the Article 5 prohibition examples. See for yourself.

**If you're building AI in the EU:** The compliance module is a real, enforceable compliance posture — not a documentation framework. Pricing is $99/mo on top of Professional+ ($499/mo). If you have an August 2026 deadline, v3.3 is what you deploy.

**If you're an existing AegisGate user on Professional+ or Enterprise:** v3.3 is a free upgrade. The EU AI Act module is available as a $99/mo add-on to your existing tier. The 82 controls are wired into your existing detection pipeline. No migration, no reconfiguration. The upgrade is one command: `docker pull ghcr.io/aegisgatesecurity/aegisgate-platform:latest && docker compose up -d`.

---

## The Open Question We Want You to Ask

We have a strong opinion about how AI security should work. We are not the only one with an opinion. We are, however, the only ones shipping **a single binary that does all five AI attack surfaces** — HTTP, MCP, A2A, ACP, and response — with the **EU AI Act framework built in** at the detection-engine level rather than as a documentation layer.

The open question is whether that's right for you. We can't answer that for you. But we can show you the system in a way that lets you answer it yourself.

That's what the demo is for.

---

## Try It

### Option 1: Use the live demo (no install, 5-second email gate)

https://demo.aegisgatesecurity.io

### Option 2: Deploy AegisGate yourself

`docker run -d \`

  `--name aegisgate \`

  `-p 8080:8080 \`

  `-p 8081:8081 \`

  `-p 8443:8443 \`

  `ghcr.io/aegisgatesecurity/aegisgate-platform:latest`

### Verify

`curl http://localhost:8443/health`

\`\`\`

**19.1 MB. 60 seconds. All five AI attack surfaces, including the EU AI Act module for Professional+.**

---

### Further Reading

- [AegisGate Documentation](https://github.com/aegisgatesecurity/aegisgate-platform/tree/main/docs)

- [EU AI Act — Full Text](https://artificialintelligenceact.eu/the-act/)

- [MITRE ATLAS Framework](https://atlas.mitre.org/)

- [OWASP LLM Top 10](https://owasp.org/www-project-llm-top-10/)

---

_Have feedback on the demo or v3.3? Open a discussion in the [GitHub repository](https://github.com/aegisgatesecurity/aegisgate-platform/discussions) or email security@aegisgatesecurity.io_
