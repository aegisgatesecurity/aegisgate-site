---
title: "Case Study: How a 200-person Series-B SaaS Passed SOC 2 Type II with AegisGate"
description: "A composite case study showing how a mid-size SaaS used AegisGate Platform Professional + EU AI Act module to pass a SOC 2 Type II audit in 90 days, with the Trust Framework as the primary evidence source for AI controls."
date: 2026-07-21
draft: false
type: "case-study"
author: "AegisGate Security"
---

> **📋 Note:** This is a **composite case study** built from anonymized
> customer patterns observed in our beta program (January–June 2026).
> It is not a real customer. The names, numbers, and quotes below
> are representative of the customer segment and are not tied to any
> specific organization. We publish composite case studies to
> illustrate the value of AegisGate without disclosing customer
> information. Real customer case studies will be published with
> explicit written consent. See our [customer reference policy](#customer-reference-policy)
> below.

## Executive Summary

| Field | Value |
|-------|-------|
| **Customer segment** | Series-B SaaS, 200 employees, B2B fintech-adjacent |
| **Industry** | Financial Technology (B2B SaaS for SMB lending) |
| **Tier deployed** | **Professional** ($499/mo) + **EU AI Act** module ($99/mo) |
| **Time to SOC 2 Type II audit** | **90 days** (vs. industry average of 6–12 months) |
| **Audit outcome** | **PASSED** with 0 findings on AI controls |
| **Primary evidence source** | AegisGate **Trust Framework** (signed attestations) |

> "The Trust Framework's signed attestations were the only AI control
> evidence our auditor needed. We didn't have to write custom scripts
> to pull logs or build a Notion page of evidence — AegisGate generated
> the package in one API call." — **Composite CTO quote, Series-B SaaS segment**

## The Challenge

A typical Series-B SaaS in 2026 faces three converging problems that
block their SOC 2 audit:

1. **AI tool sprawl.** By the time of audit prep, the engineering team
   is using 4–8 AI tools daily (OpenAI, Anthropic, Cursor, internal
   RAG, MCP servers for support agents). No central visibility into
   what data is being sent to which model, by whom, with what
   authorization.
2. **SOC 2 evidence is hard to produce.** Traditional SOC 2 controls
   (CC6.1 logical access, CC7.2 system operations) assume on-prem
   infrastructure with predictable logs. AI tool usage is
   distributed, ephemeral, and crosses trust boundaries (third-party
   LLM providers, browser extensions, MCP servers).
3. **The auditor doesn't know what to ask for.** SOC 2 auditors in
   2026 are still building their AI control framework. A typical
   auditor will ask "show me your AI governance" but the customer
   doesn't have a standardized evidence package to provide.

A typical Series-B SaaS would solve this with: a Notion page of
screenshots, custom Python scripts to pull OpenAI usage logs, and
a 200-hour internal effort over 3–6 months to assemble the package.

## The Solution

This customer deployed **AegisGate Platform Professional** in front of
all internal AI services, with the **EU AI Act** module activated for
the compliance evidence package and the **Trust Framework** enabled
for the cryptographic attestations that became the primary SOC 2
evidence source.

### Deployment (Day 1–7)

```bash
# 1. Install the platform binary (14MB compressed, 19MB Docker image)
curl -L https://aegisgatesecurity.io/install.sh | sh

# 2. Configure the gateway in front of all internal AI services
#    (OpenAI, Anthropic, internal RAG, MCP servers)
#    configs/aegisgate-platform.yaml uses the canonical keys
#    (proxy.*, dashboard.*, tls.*, etc.) and is committed to the
#    customer's private git repo

# 3. Activate the Professional tier license (signed JSON license key)
#    via AEGISGATE_LICENSE_KEY env var
export AEGISGATE_LICENSE_KEY="<signed-license>"

# 4. Enable the Trust Framework (Professional+ tier feature)
export AEGISGATE_TRUST_ENABLED=true
export AEGISGATE_TRUST_REQUIRE_LICENSE=true
```

The platform binary is a **single self-hosted binary** with three
listeners: 8080 (proxy), 8081 (MCP), 8443 (dashboard). The customer
deployed it in their existing Kubernetes cluster (Helm chart
available) with the existing PostgreSQL database for audit log
retention (90 days, Professional tier default).

### Configuration (Day 7–14)

The platform is configured to:

- **Enforce the capability contract for every agent.** Every
  AI agent (MCP server, A2A peer) must have a signed capability
  contract declaring what data it can access, what tools it can
  invoke, and what delegation it can perform. Requests outside the
  contract are blocked at the gateway, not at the agent.
- **Track per-agent trust scores.** Every request updates the
  agent's trust score. The score is included in every audit log
  entry. The score is signed (ECDSA P-256 envelope) for audit
  integrity.
- **Generate the weekly CISO Posture Digest** (PDF + signed
  envelope) and route it to the auditor.
- **Scan every request and response for PII, secrets, prompt
  injection, and OWASP LLM Top 10.** The scanner runs once per
  request, the result is mapped to all enabled compliance
  frameworks (MITRE ATLAS, NIST AI RMF, OWASP LLM Top 10, EU AI Act),
  and the findings are stored in the audit log.

### Audit Preparation (Day 14–90)

The customer's security team did **not** write any custom evidence
scripts. The AegisGate platform generates the SOC 2 evidence package
automatically:

- **CC6.1 (Logical access)**: AegisGate's RBAC system + Trust Framework
  identity registry provides the access control evidence.
- **CC6.2 (ML environment security)**: The capability contract
  system + Trust Framework capability enforcement is the primary
  control.
- **CC6.4 (Adversarial defense)**: The scanner output (prompt injection
  blocked, PII redaction rate, secret detection rate) is the evidence.
- **CC6.6 (System operations)**: The audit log with signed
  attestations is the evidence. Every event is cryptographically
  signed; the auditor verifies the signature using AegisGate's
  public key, no server round-trip needed.
- **CC7.2 (System operations)**: The weekly CISO Posture Digest
  is the management review evidence.
- **PI1.2 (ML processing integrity)**: The Trust Framework's
  signed attestations include the trust score and capability
  contract version at the time of the request. The auditor
  can verify "this agent was authorized for this data at
  this time" with cryptographic integrity.

The auditor was given read-only access to the platform's
`/api/v1/compliance/scan?framework=soc2` endpoint and the
`/api/v1/trust/attestations?agent=...` endpoint. The auditor
queried these directly during the audit window.

## Key Metrics

| Metric | Before AegisGate | After AegisGate | Improvement |
|--------|------------------|-----------------|-------------|
| **SOC 2 audit prep effort** | 200+ hours internal | 8 hours (query API endpoints) | 96% reduction |
| **AI tool visibility** | 0% (no central logs) | 100% (every request audited) | Full coverage |
| **Capability contract coverage** | 0% (informal) | 100% (every agent signed) | Full coverage |
| **Evidence integrity** | Screenshots + manual logs | Cryptographic signed attestations | Tamper-evident |
| **Compliance frameworks covered** | 0 (AI tools excluded) | 4 (SOC 2, MITRE ATLAS, NIST AI RMF, EU AI Act) | 4 frameworks |
| **PII detection rate** | 0% (no scanner) | 99.2% (per platform scan) | New |
| **Prompt injection blocks** | 0/month (no defense) | 12/month (per platform scan) | New |
| **Audit findings on AI controls** | N/A (no controls existed) | **0** | Zero findings |
| **Time to audit** | 6–12 months (industry average) | 90 days | 50–75% faster |

## Compliance Achievements

| Framework | Status | Notes |
|-----------|:------:|-------|
| **SOC 2 Type II** | ✅ PASSED | 0 findings on AI controls |
| **MITRE ATLAS** | ✅ All 66 techniques | Built-in, Community tier |
| **NIST AI RMF** | ✅ Full framework | Built-in, Community tier |
| **OWASP LLM Top 10** | ✅ All categories | Built-in, Community tier |
| **EU AI Act** | ✅ Module purchased | Ready for August 2026 deadline |
| **HIPAA** | 🟡 Not purchased | Available as $99/mo add-on |
| **PCI-DSS** | 🟡 Not applicable | Company doesn't process card data |
| **GDPR** | ✅ Built-in | Community tier |

## Customer Quote (Composite)

> "We had three weeks until the SOC 2 audit window and we didn't
> have an AI control framework. The auditor was asking questions
> we couldn't answer: 'show me your agent authorization at the
> time of this transaction.' AegisGate's Trust Framework gave us
> a signed attestation for every agent request. We queried the
> API during the audit and pulled the evidence in minutes.
> The audit team said it was the cleanest AI control evidence
> they'd seen from a Series-B company."
>
> **— Composite quote, CTO persona, Series-B SaaS segment**

## Looking Forward

The composite customer in this case study expanded the AegisGate
deployment in three ways after the SOC 2 audit:

1. **EU AI Act module activation** (August 2026 deadline for
   high-risk AI systems). The platform's EU AI Act module
   (82 controls, 9 automated) was activated 6 weeks before the
   deadline. The customer's EU subsidiary was the first
   high-risk AI system to come into scope.
2. **AegisGate Lens rollout** to all 200 employees (the free
   browser extension). Lens catches PII/secrets/XSS in the
   browser that the server-side platform can't see. The
   combined Layer 1 (Lens) + Layer 2 (Platform) coverage is
   the natural progression documented in the
   [Lens → Platform upsell 1-pager](/lens/compare/).
3. **Federated IOC library opt-in** (`AEGISGATE_IOC_SHARE=true`).
   The customer opted in to share detected IOCs with peer
   AegisGate instances. Within the first 30 days, the customer's
   AegisGate instance detected 14 new prompt-injection patterns
   that were not in the bundled corpus; 9 of those patterns
   were observed at peer instances within 24 hours of being
   shared, demonstrating the network effect.

## Customer Reference Policy

AegisGate publishes **composite case studies** (built from
anonymized patterns across multiple customers) and **named case
studies** (with explicit written consent from a single customer).

**Composite case studies** (this one):
- Built from anonymized patterns observed across multiple customers
- Names, numbers, and quotes are representative, not real
- Published to illustrate the value of AegisGate for a customer segment
- No customer information is disclosed

**Named case studies** (not yet available):
- Published with explicit written consent from a single customer
- Real names, real numbers, real quotes
- The customer approves the final case study before publication
- Available for Enterprise tier customers who consent

If you're a current AegisGate customer interested in a named case
study, please contact [sales@aegisgatesecurity.io](mailto:sales@aegisgatesecurity.io).

## About AegisGate Security Platform

The AegisGate Security Platform provides comprehensive AI
infrastructure security — from HTTP APIs to MCP agents, A2A
agent-to-agent communication, ACP code-editor integration, and
AI response scanning. The Trust Framework (6th pillar) provides
per-agent cryptographic identity, capability contracts, real-time
trust scoring, and signed attestations for compliance evidence.

**Key features** (v3.4.0+, 66/66 packages passing, 6,066 tests):

- **6 protocol coverage** (HTTP, MCP, A2A, ACP, RESPONSE, Trust Framework)
- **153+ threat detection patterns** (MITRE ATLAS, OWASP LLM Top 10)
- **8 MCP guardrails** (tier-based limits, response scanning, auth)
- **27 compliance frameworks** (10 Community: MITRE ATLAS, OWASP LLM Top 10, NIST AI RMF, GDPR, CIS Controls, NIST CSF 2.0, OWASP Web, CSA STAR, NIST AI 600-1, CCPA/CPRA; 3 Developer: HIPAA, PCI, SOC 2; 11 Professional: ISO 27001, ISO 42001, FedRAMP, FIPS 140, EU AI Act, CMMC L2, NIST 800-171, FERPA, SOX, GLBA, NERC CIP; 3 Enterprise: HITRUST, TISAX, CJIS)
- **Trust Framework** (8 packages, ~8,500 LOC, 548 tests, 85–91% coverage)
- **Federated IOC library** (12,902 LOC, ECDSA-signed, opt-in, serverless)

**Website:** [https://aegisgatesecurity.io](https://aegisgatesecurity.io)
**Pricing:** [https://aegisgatesecurity.io/pricing](https://aegisgatesecurity.io/pricing)
**Trust Framework 1-pager:** See [docs/trust-framework.md](/docs/trust-framework/) (the AegisGate Platform repo)
**Contact:** [sales@aegisgatesecurity.io](mailto:sales@aegisgatesecurity.io)

---

*Composite case study version 1.0 — published 2026-07-21*
*AegisGate Platform v3.4.0+*
