---
title: "EU AI Act Compliance Module"
description: "AegisGate's EU AI Act Module gives you 82 controls across 8 categories of EU Regulation 2024/1689, included with Professional+ tier."
type: "landing"
---

<div class="alert alert-info alert-center" style="background:#003399;border-color:#FFD700;color:#fff;">
<strong>{{< eu-flag >}} v3.6.2 (GA):</strong> The EU AI Act Compliance Module is fully implemented and tested. <strong>Beta status</strong>: counsel review of the legal interpretation is pending (v3.4.0+). Use for evaluation and pre-audit work.
</div>

## What is the EU AI Act?

The **[EU AI Act (Regulation 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)** is the world's first comprehensive AI regulation. It entered into force on **August 1, 2024**, and applies to:

- **AI providers** that place AI systems on the EU market
- **Deployers** of AI systems in the EU
- **Providers and deployers outside the EU** if the AI system's output is used in the EU

The Act is being phased in over **2 years**, with key dates:

| Date | What becomes applicable |
|------|--------------------------|
| **February 2, 2025** | Prohibitions on unacceptable-risk AI (Article 5) |
| **August 2, 2025** | Governance obligations, penalties |
| **August 2, 2026** | Most provisions, including high-risk AI requirements (Annex III) |
| **August 2, 2027** | Full applicability, including embedded high-risk AI systems |

## Who Needs the EU AI Act Module?

You need the **EU AI Act Compliance Module** if any of the following apply to you:

- **You provide high-risk AI systems** (Annex III categories): employment, education, law enforcement, critical infrastructure, biometric ID, migration, justice, etc.
- **You deploy AI in the EU** for any of the above use cases
- **You are a GPAI (General-Purpose AI) model provider** with > 10²⁵ FLOPs of training compute
- **You provide AI systems** that interact with EU citizens, even if you're not EU-based
- **You sell AI products or services** to EU-based companies for any of the above use cases

> **If you only deploy general-purpose AI for non-high-risk use cases** (chatbots, content generation, etc.) and don't have any of the above characteristics, you may have minimal obligations. The Module still helps with transparency and disclosure requirements (Article 50).

## What AegisGate's EU AI Act Module Provides

AegisGate's EU AI Act Compliance Module gives you a **single source of truth** for whether your AI system is compliant — across **82 controls** in **8 categories**.

### 8 Categories, 82 Controls

| # | Category | EU AI Act Article | # of Controls | Type |
|---|----------|-------------------|---------------|------|
| 1 | **Prohibited Practices** | Article 5 | 6 | Automatic + Manual |
| 2 | **Risk Management** | Article 9 | 12 | Automatic + Manual |
| 3 | **Data Quality** | Article 10 | 9 | Automatic + Manual |
| 4 | **Technical Documentation** | Articles 11+12 | 14 | Manual |
| 5 | **Record-Keeping** | Articles 13+14 | 11 | Automatic + Manual |
| 6 | **Human Oversight** | Article 15 | 8 | Manual |
| 7 | **Accuracy, Robustness, Cybersecurity** | Articles 51–55 | 12 | Automatic + Manual |
| 8 | **Annex IV Technical Documentation** | AI-* | 10 | Manual |
| | **Total** | | **82** | **9 Automatic + 73 Manual** |

### 9 Automatic Controls (Enforced by AegisGate)

These controls are **enforced in-line** by AegisGate — you don't have to manually verify them, AegisGate does it:

1. **Input validation** — rejects malformed or malicious inputs before they reach your AI
2. **Data quality checks** — verifies training data quality dimensions documented at scan time
3. **Log retention** — 6-month minimum retention of system logs (Article 19)
4. **Accuracy benchmarks** — runs accuracy tests against a baseline dataset
5. **Robustness tests** — runs adversarial robustness tests against MITRE ATLAS techniques
6. **Cybersecurity checks** — verifies TLS, mTLS, signature validation on AI service endpoints
7. **PII detection** — flags PII in inputs/outputs for human review
8. **Hallucination detection** — flags low-confidence outputs for human review
9. **Audit log integrity** — hash-chained RFC 5424 logs (tamper-evident)

### 73 Manual Controls (AegisGate Helps You Satisfy)

These controls require human input (policies, processes, governance) but AegisGate provides:

- **Checklists** for each control, with step-by-step instructions
- **Evidence templates** you can fill in (e.g., for risk management policies, human oversight procedures)
- **Audit-ready reports** that bundle all 82 controls with their status
- **Coverage tracking** that shows what's done vs. what's outstanding

## How the Module Works in Practice

### 1. Compliance Scan API

Check your current compliance status:

```bash
curl -H "X-License-Key: $AEGISGATE_LICENSE" \
  "http://localhost:8443/api/v1/compliance/scan?framework=eu-ai-act"
```

Response:

```json
{
  "framework": "eu-ai-act",
  "controls_total": 82,
  "controls_enforced": 47,
  "controls_manual": 35,
  "compliance_pct": 57.3,
  "missing_modules": [],
  "automatic_controls": {
    "active": 9,
    "passing": 9,
    "failing": 0
  },
  "manual_controls": {
    "complete": 38,
    "in_progress": 9,
    "not_started": 35
  }
}
```

### 2. Full Audit Report

Get the full control list for auditor export:

```bash
curl -H "X-License-Key: $AEGISGATE_LICENSE" \
  "http://localhost:8443/api/v1/compliance/report?framework=eu-ai-act" \
  > eu-ai-act-audit-report.json
```

The report includes, for each of the 82 controls:
- **Control ID** (e.g., `AI-ACT-9.1`, `AI-ACT-10.3`)
- **EU AI Act article reference**
- **Description** (plain English)
- **Status**: `enforced` (AegisGate enforces this) / `manual` (you need to provide evidence)
- **Source module** (if enforced by AegisGate: which package does it)
- **Evidence checklist** (if manual: what to provide)

### 3. Continuous Monitoring

Once you've completed a manual control and uploaded evidence, AegisGate tracks it across releases. When you upgrade AegisGate, your compliance posture is preserved. When the EU AI Act is amended (which is expected — this is new regulation), AegisGate updates the control set and notifies you.

## Who Is This Module NOT For?

This Module is **not for**:

- **AI alignment researchers** (we don't train or fine-tune models)
- **EU AI Act auditors** (we don't replace a qualified auditor — we give them the data they need)
- **Legal counsel** (we provide technical evidence, not legal advice)
- **Non-EU companies that don't place AI on the EU market** (you may have no obligations under the Act; verify with counsel)

If you fall into one of the above categories, you may not need this Module. Contact `sales@` for guidance.

## Pricing & Tier

- **Tier gate**: **Professional+** (Professional and Enterprise tiers)
- **Pricing**: **Included** with Professional and Enterprise at no extra cost
- **Add-on**: Not available as a separate module — it's part of the Professional+ tier
- **Migration**: If you're on a Community or Developer tier, [upgrade to Professional](/pricing/) to enable the EU AI Act Module

## Documentation

- 📘 **Customer 1-pager** (this page): what the Module is, who needs it, how it works
- 📚 **Full control mapping**: [docs/compliance/eu-ai-act-mapping.md](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/compliance/eu-ai-act-mapping.md) — 438 lines, all 82 controls with article references
- 🧪 **Sub-package source**: [`pkg/compliance/eu-ai-act/`](https://github.com/aegisgatesecurity/aegisgate-platform/tree/main/pkg/compliance/eu-ai-act) — 4 Go files, full implementation
- 🧪 **Tests**: [`eu_ai_act_test.go`](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/pkg/compliance/eu-ai-act/eu_ai_act_test.go) — verifies 9+ control categories, control registry integrity, evaluator logic

## Beta Status & Counsel Review

> **This Module is in beta.** The implementation is complete and tested. Counsel review of the legal interpretation of each EU AI Act article and the mapping to AegisGate controls is **pending** (v3.4.0+).

What this means for you:

- ✅ **You can use the Module for evaluation and integration testing** (the API works, the controls are enforced, the audit reports are generated)
- ✅ **You can use it for pre-audit work** (evidence collection, gap analysis, internal review)
- ⚠️ **Defer your formal EU AI Act conformity assessment** until counsel has signed off on the mapping
- ⚠️ **Don't use AegisGate's audit reports as your sole evidence** for EU AI Act compliance — they should supplement, not replace, qualified legal review

When counsel sign-off is complete (target: v3.6.2), we'll:

- Update the Module to v1.0-GA
- Publish the counsel-reviewed mapping
- Issue updated audit reports for all beta users
- Notify all Professional+ customers via email

## Get Started

To enable the EU AI Act Compliance Module:

1. **Verify your tier** — Professional or Enterprise (Module is included)
   - Not on Professional yet? [Upgrade at /pricing/](/pricing/) or [contact sales](mailto:sales@aegisgatesecurity.io)
2. **Pull the latest image**:
   ```bash
   docker pull ghcr.io/aegisgatesecurity/aegisgate-platform:v3.6.2
   ```
3. **Run the compliance scan**:
   ```bash
   curl -H "X-License-Key: $AEGISGATE_LICENSE" \
     "http://localhost:8443/api/v1/compliance/scan?framework=eu-ai-act"
   ```
4. **Review the audit report**:
   ```bash
   curl -H "X-License-Key: $AEGISGATE_LICENSE" \
     "http://localhost:8443/api/v1/compliance/report?framework=eu-ai-act" \
     | less
   ```
5. **Plan your conformity assessment** with qualified legal counsel
6. **Subscribe to Module updates** — we'll email you when the v1.0-GA mapping is published

## Questions?

- 📧 **Sales / pre-sales questions**: [sales@aegisgatesecurity.io](mailto:sales@aegisgatesecurity.io)
- 🔒 **Security disclosures**: [security@aegisgatesecurity.io](mailto:security@aegisgatesecurity.io)
- 💬 **General questions**: [GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-platform/discussions)
- 🐛 **Bug reports**: [GitHub Issues](https://github.com/aegisgatesecurity/aegisgate-platform/issues)

---

**Related**: [Pricing](/pricing/) · [Documentation](/docs/) · [Legal](/legal/) · [Changelog](/changelog/) · [GitHub](https://github.com/aegisgatesecurity/aegisgate-platform)
