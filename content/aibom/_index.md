---
title: "AIBOM Generator — AI Bill of Materials for Compliance & Supply Chain Security"
description: "Automatically generate CycloneDX 1.6+ SBOMs extended with AI components. Track models, prompts, training data, and AI dependencies. EU AI Act ready."
type: "landing"
---

<!-- ============================================================
     HERO: The Emerging Standard
     ============================================================ -->

> **📋 The EU AI Act requires transparency. Your AI systems must have a bill of materials. Do you know what's inside your AI applications?**
>
> Traditional SBOMs track software dependencies. But AI systems have different components: models, prompts, training datasets, embeddings, vector stores. These are invisible to standard SBOM tools.
>
> **AegisGate AIBOM Generator fills this gap.** Automatically generate CycloneDX 1.6+ compliant AI Bill of Materials that tracks every AI component in your systems.

<div class="alert alert-success alert-center">
<strong>AIBOM Generator</strong> is available in <strong>Developer tier and above</strong>.
<br><br>
<a href="/pricing/" class="btn btn-primary">View Pricing &rarr;</a>
<a href="/docs/" class="btn btn-secondary">Technical Documentation &rarr;</a>
</div>

---

## The AI Transparency Problem

Regulators worldwide are demanding AI transparency:

| Regulation | Requirement | Deadline |
|------------|-------------|----------|
| **EU AI Act** | Article 50: Technical documentation for high-risk AI | 2026 |
| **NIST AI RMF** | Map function: Document AI system components | Voluntary (but expected) |
| **ISO/IEC 42001** | AI management system documentation | 2025 |
| **CycloneDX 1.6+** | AI extension standard for SBOMs | Published 2025 |

**The challenge:** AI systems are opaque. You might know you're using GPT-4, but:
- Which prompts are sent to the model?
- What training data was used to fine-tune it?
- Which embeddings are stored in your vector database?
- What version of the model is running in production?

**Without this information, you cannot:**
- Demonstrate compliance with EU AI Act
- Assess supply chain risks (what if the model provider changes terms?)
- Respond to incidents (which systems are affected by a model vulnerability?)
- Answer auditor questions (what data trained this model?)

---

## The AIBOM Solution

AegisGate AIBOM Generator automatically creates **AI Bill of Materials** in CycloneDX 1.6+ format:

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "version": 1,
  "metadata": {
    "timestamp": "2026-08-14T09:30:00Z",
    "component": {
      "type": "application",
      "name": "customer-support-chatbot",
      "version": "2.1.0"
    }
  },
  "components": [
    {
      "type": "ai-model",
      "name": "gpt-4",
      "provider": "OpenAI",
      "version": "gpt-4-0613",
      "modelCard": "https://openai.com/gpt-4-model-card",
      "parameters": "1.76T",
      "architecture": "transformer"
    },
    {
      "type": "ai-prompt",
      "name": "system-prompt-v3",
      "hash": "SHA256:a1b2c3d4e5f6...",
      "template": "You are a customer support assistant..."
    },
    {
      "type": "dataset",
      "name": "customer-faq-2026",
      "version": "2026.01",
      "size": "2.3GB",
      "license": "proprietary"
    },
    {
      "type": "ai-embedding",
      "name": "text-embedding-ada-002",
      "provider": "OpenAI",
      "dimension": 1536,
      "vectorStore": "pinecone"
    }
  ],
  "signature": "MEUCIQDvL8K9mN2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4n"
}
```

**Key Properties:**
- **CycloneDX 1.6+ compliant** (emerging standard for AI SBOMs)
- **Byte-stable** (identical input = identical output, verifiable)
- **Cryptographically signed** (tamper-evident)
- **Automatically generated** (no manual documentation required)

---

## What AIBOM Tracks

### AI Models

```json
{
  "type": "ai-model",
  "name": "llama-3-70b",
  "provider": "Meta",
  "version": "3.0",
  "parameters": "70B",
  "architecture": "transformer",
  "quantization": "INT8",
  "license": "llama-3-community",
  "modelCard": "https://llama.meta.com/model-card",
  "purl": "pkg:aibom/meta/llama-3-70b@3.0"
}
```

**Tracked Properties:**
- Model name and version
- Provider/developer
- Parameter count
- Architecture type
- Quantization (if applicable)
- License terms
- Model card URL
- Package URL (purl) for dependency tracking

---

### Prompts & Templates

```json
{
  "type": "ai-prompt",
  "name": "system-prompt-customer-support",
  "hash": "SHA256:7d8a9b2c4e5f6a1b3c4d5e6f7a8b9c0d",
  "template": "You are a customer support assistant for Company X...",
  "version": "3.2",
  "createdAt": "2026-01-15T09:00:00Z",
  "updatedAt": "2026-08-10T14:30:00Z"
}
```

**Tracked Properties:**
- Prompt hash (for integrity verification)
- Template content (for audit)
- Version history
- Creation/modification timestamps
- Author (if available)

---

### Training Datasets

```json
{
  "type": "dataset",
  "name": "customer-support-training-data",
  "version": "2026.01",
  "size": "2.3GB",
  "recordCount": 150000,
  "license": "proprietary",
  "source": "internal",
  "piiContent": false,
  "hash": "SHA256:b2c3d4e5f6a1..."
}
```

**Tracked Properties:**
- Dataset name and version
- Size and record count
- License terms
- Source (internal, third-party, public)
- PII content flag (for GDPR/HIPAA compliance)
- Cryptographic hash

---

### Embeddings & Vector Stores

```json
{
  "type": "ai-embedding",
  "name": "text-embedding-ada-002",
  "provider": "OpenAI",
  "dimension": 1536,
  "vectorStore": "pinecone",
  "indexName": "customer-faq-index",
  "recordCount": 50000
}
```

**Tracked Properties:**
- Embedding model name
- Provider
- Vector dimension
- Vector store system
- Index name
- Record count

---

## Use Cases

### EU AI Act Compliance

**Requirement:** Article 50 requires technical documentation for high-risk AI systems.

**AIBOM Solution:**
- AIBOM provides structured technical documentation
- Tracks all AI components (models, prompts, data)
- CycloneDX format is regulator-acceptable
- Cryptographic signature ensures document integrity

**Compliance Mapping:**
- EU AI Act Article 50: Technical documentation
- Annex III: High-risk AI system classification
- Annex IV: Technical documentation requirements

---

### Supply Chain Risk Management

**Problem:** Your AI model provider changes terms, shuts down, or has a security incident.

**AIBOM Solution:**
- AIBOM lists all AI dependencies with provider information
- You can quickly assess impact (which systems use this model?)
- Alternative models can be evaluated (what are the substitutes?)
- License terms are tracked (are you compliant?)

**Example:**
```
GPT-4 terms change → Query AIBOM → 12 systems affected → Plan migration
```

---

### Incident Response

**Problem:** A vulnerability is disclosed in a popular AI model (e.g., prompt extraction attack).

**AIBOM Solution:**
- Query AIBOM for affected models
- Identify all systems using vulnerable model
- Prioritize remediation based on system criticality
- Demonstrate due diligence to regulators

**Example:**
```
CVE-2026-12345 (GPT-4 prompt extraction) → 
  Query AIBOM → 
  8 production systems affected → 
  Emergency patching initiated
```

---

### Auditor Requests

**Problem:** Auditor asks: "What data trained your customer support chatbot?"

**AIBOM Solution:**
- Export AIBOM in PDF/JSON format
- Provide to auditor (cryptographically signed)
- Auditor can verify integrity (no tampering)
- Request satisfied in minutes, not days

**Example:**
```
Auditor: "Show me your AI system documentation"
You: [Exports AIBOM PDF]
Auditor: [Verifies signature] "Thank you. This is complete."
```

---

## API Reference

### Generate AIBOM

```bash
POST /api/v1/aibom/generate
Content-Type: application/json
Authorization: Bearer <api_key>

{
  "system_id": "customer-support-chatbot",
  "version": "2.1.0",
  "includePrompts": true,
  "includeDatasets": true,
  "includeEmbeddings": true
}
```

**Response:**

```json
{
  "aibom_id": "aibom-2026081409300001",
  "system_id": "customer-support-chatbot",
  "version": "2.1.0",
  "generated_at": "2026-08-14T09:30:00Z",
  "format": "cyclonedx-1.6",
  "component_count": 12,
  "signature": "MEUCIQDvL8K9mN2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4n",
  "download_url": "/api/v1/aibom/aibom-2026081409300001/download"
}
```

---

### Download AIBOM (JSON)

```bash
GET /api/v1/aibom/{aibom_id}/download?format=json
Authorization: Bearer <api_key>
Accept: application/json
```

**Response:** CycloneDX 1.6+ JSON (ready for integration)

---

### Download AIBOM (PDF)

```bash
GET /api/v1/aibom/{aibom_id}/download?format=pdf
Authorization: Bearer <api_key>
Accept: application/pdf
```

**Response:** PDF document (regulator-ready format)

---

### Verify AIBOM Signature

```bash
POST /api/v1/aibom/verify
Content-Type: application/json

{
  "aibom_file": "...",
  "signature": "MEUCIQDvL..."
}
```

**Response:**

```json
{
  "verified": true,
  "integrity": "intact",
  "timestamp": "2026-08-14T09:30:00Z"
}
```

---

### List Historical AIBOMs

```bash
GET /api/v1/aibom/systems/{system_id}?limit=10
Authorization: Bearer <api_key>
```

**Response:**

```json
{
  "aiboms": [
    {
      "aibom_id": "aibom-2026081409300001",
      "version": "2.1.0",
      "generated_at": "2026-08-14T09:30:00Z"
    },
    {
      "aibom_id": "aibom-2026070109000001",
      "version": "2.0.0",
      "generated_at": "2026-07-01T09:00:00Z"
    }
  ]
}
```

---

## Tier & Availability

| Tier | AIBOM Generator Features |
|------|-------------------------|
| **Community** | ❌ Not available |
| **Developer** | ✅ AIBOM generation (JSON), basic component tracking |
| **Professional** | ✅ All Developer features + PDF export, cryptographic signature, historical tracking |
| **Enterprise** | ✅ All Professional features + FIPS 140-2 crypto, offline generation |

**Minimum Version:** Platform v4.1.0+

---

## CycloneDX 1.6+ Compliance

AegisGate AIBOM Generator is **fully compliant** with CycloneDX 1.6+ AI extension:

| Requirement | AegisGate Implementation |
|-------------|-------------------------|
| **Component types** | ✅ ai-model, ai-prompt, dataset, ai-embedding |
| **Package URLs (purl)** | ✅ pkg:aibom/provider/name@version |
| **Hash algorithms** | ✅ SHA256, SHA384, SHA512 |
| **External references** | ✅ modelCard, license, documentation |
| **Signature** | ✅ Cryptographic (ECDSA P-256) |
| **Byte-stable** | ✅ Identical input = identical output |

**Why CycloneDX matters:**
- Emerging industry standard (OWASP project)
- Recognized by regulators (EU AI Act, NIST)
- Tool ecosystem (dependency-track, cyclonedx-cli)
- Future-proof (versioned standard)

---

## Competitive Comparison

| Feature | AegisGate | Competitor A | Competitor B | Competitor C |
|---------|-----------|--------------|--------------|--------------|
| AI-specific components | ✅ Models, prompts, datasets, embeddings | ❌ Software only | ⚠️ Models only | ❌ No |
| CycloneDX 1.6+ | ✅ Yes | ❌ CycloneDX 1.4 (no AI) | ⚠️ Proprietary format | ❌ No |
| Cryptographic signature | ✅ ECDSA P-256 | ❌ Unsigned | ❌ Unsigned | ❌ N/A |
| PDF export | ✅ Regulator-ready | ❌ JSON only | ⚠️ HTML only | ❌ N/A |
| Historical tracking | ✅ Version history | ❌ Current state only | ⚠️ Manual | ❌ N/A |
| Air-gap support | ✅ Offline generation | ❌ Cloud-only | ❌ Cloud-only | ❌ N/A |
| EU AI Act mapping | ✅ Article 50, Annex III-IV | ❌ No | ⚠️ Generic compliance | ❌ N/A |

**Bottom line:** AegisGate is the **only AIBOM generator** with CycloneDX 1.6+ AI extension support and cryptographic integrity.

---

## Frequently Asked Questions

<details>
<summary><strong>Can I manually edit the AIBOM?</strong></summary>

AIBOMs are automatically generated from Platform's inventory. Manual edits will invalidate the cryptographic signature. If you need to add components, update the system configuration and regenerate.
</details>

<details>
<summary><strong>How often should I generate AIBOMs?</strong></summary>

We recommend generating AIBOMs on every production deployment. Enterprise tier supports automated generation via CI/CD integration.
</details>

<details>
<summary><strong>Can I export AIBOMs for multiple systems at once?</strong></summary>

Yes. Enterprise tier supports batch export: `GET /api/v1/aibom/export?system_ids=system1,system2,system3`
</details>

<details>
<summary><strong>What if my AI components change between AIBOM generations?</strong></summary>

Each AIBOM is versioned. Historical AIBOMs are retained for audit purposes. You can compare versions to track changes over time.
</details>

<details>
<summary><strong>Is AIBOM accepted by EU AI Act regulators?</strong></summary>

CycloneDX is recognized by EU regulators as an acceptable format for technical documentation. AIBOM provides the AI-specific details required by Article 50 and Annex IV.
</details>

---

## Ready to Document Your AI Systems?

AIBOM Generator is available in **Developer tier and above**.

<a href="/pricing/" class="btn btn-primary">Start Free Trial &rarr;</a>
<a href="/docs/" class="btn btn-secondary">Technical Documentation &rarr;</a>
<a href="/pricing/" class="btn btn-secondary">Contact Sales &rarr;</a>
