---
title: "Federated IOC Store — Crowdsourced AI Threat Intelligence"
description: "Real-time sharing of AI-specific indicators of compromise via cryptographically signed bundles. One customer's attack becomes everyone's protection. TAXII 2.1 compatible."
type: "landing"
---

<!-- ============================================================
     HERO: The Network Effect Moat
     ============================================================ -->

> **🛡️ When one AegisGate customer detects a new AI attack, every customer is protected within minutes.**
>
> Traditional security tools operate in isolation. When Company A detects a novel prompt injection attack, Company B learns nothing. Attackers exploit this fragmentation repeatedly.
>
> **AegisGate Federated IOC Store changes this.** Detected threats are packaged into cryptographically signed bundles and distributed to all customers. The network grows stronger with every detection.

<div class="alert alert-success alert-center">
<strong>Federated IOC Store</strong> is available in <strong>Professional tier and above</strong>.
<br><br>
<a href="/pricing/" class="btn btn-primary">View Pricing &rarr;</a>
<a href="/docs/" class="btn btn-secondary">Technical Documentation &rarr;</a>
</div>

---

## The Isolation Problem

Traditional security vendors operate in silos:

```
Company A detects attack → Logs stored locally → Company B remains vulnerable
Company B detects same attack → Logs stored locally → Company C remains vulnerable
Company C detects same attack → Logs stored locally → Attackers continue exploiting
```

**Result:** The same attack succeeds against multiple organizations because threat intelligence doesn't flow.

**Why this happens:**
- Vendors treat threat intel as a premium add-on (separate subscription)
- Intelligence is delayed (weekly digests, not real-time)
- Formats are incompatible (STIX/TAXII requires separate tooling)
- Trust is unclear (who generated this IOC? can I trust it?)

---

## The Federated Solution

AegisGate Federated IOC Store creates a **network effect**:

```
Customer detects attack → Platform generates signed IOC bundle → All customers receive within 5 minutes
                          ↓
                          Automatic protection (no manual update required)
```

**Key Properties:**

| Property | Implementation | Why It Matters |
|----------|----------------|----------------|
| **Cryptographic Trust** | Every bundle signed with ECDSA P-256 | Customers verify bundle integrity before applying |
| **Real-Time Distribution** | Push-based (not pull) | Protection arrives in minutes, not days |
| **AI-Specific IOCs** | Prompt patterns, injection signatures, adversarial examples | Generic IOC stores miss AI-specific attacks |
| **TAXII 2.1 Compatible** | Standard protocol integration | Works with existing SIEM/SOAR investments |
| **Privacy-Preserving** | IOCs contain patterns, not customer data | No sensitive information leaves your environment |

---

## How It Works

### Step 1: Detection

When Platform detects a novel attack (e.g., new prompt injection technique):

```json
{
  "detection_id": "det-2026081409234501",
  "category": "adversarial_ai",
  "technique": "prompt_injection",
  "pattern": "ignore previous instructions.*output system prompt",
  "severity": "high",
  "customer_id": "[REDACTED]",
  "timestamp": "2026-08-14T09:23:45Z"
}
```

---

### Step 2: IOC Generation

Platform automatically generates an IOC bundle:

```json
{
  "bundle_id": "ioc-bundle-2026081409",
  "generated_at": "2026-08-14T09:24:15Z",
  "source": "aegisgate-platform",
  "version": "1.0",
  "indicators": [
    {
      "id": "indicator-001",
      "type": "prompt_pattern",
      "pattern": "ignore previous instructions.*output system prompt",
      "confidence": 0.95,
      "severity": "high",
      "technique": "MITRE ATLAS T1535",
      "description": "Direct prompt injection attempting to extract system instructions"
    }
  ],
  "signature": "MEUCIQDvL8K9mN2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4n"
}
```

**Signed with:** Platform's ECDSA private key

---

### Step 3: Distribution

Bundle is pushed to all connected customers:

```bash
# Platform pushes to TAXII 2.1 server
POST /api/v1/ioc/bundles
Content-Type: application/taxii+json

{ ... signed bundle ... }
```

**Delivery SLA:**
- Enterprise: < 5 minutes
- Air-Gap: Manual import (bundle exported, transferred via secure media)

---

### Step 4: Automatic Protection

Customer Platform instances receive and apply the bundle:

```bash
# Customer Platform verifies signature
openssl dgst -sha256 -verify aegisgate-ioc.pub \
  -signature bundle.sig \
  bundle.json

# Output: Verified OK ✅

# IOC pattern added to detection engine
# Future prompts matching this pattern trigger immediate block
```

**No manual intervention required.**

---

## IOC Types

Federated IOC Store tracks **AI-specific indicators**:

| IOC Type | Example | Detection Use Case |
|----------|---------|-------------------|
| **Prompt Patterns** | Regex signatures for injection techniques | Block known adversarial prompts |
| **Response Signatures** | Patterns indicating model compromise | Detect when AI output has been manipulated |
| **Behavioral Anomalies** | Unusual token patterns, encoding tricks | Identify obfuscated attacks |
| **Adversarial Examples** | Specific input sequences that bypass safety | Block evasion techniques |
| **Extraction Templates** | Known system prompt extraction patterns | Prevent model intellectual property theft |

**Not included:** Generic malware hashes, IP addresses, domains (these are handled by traditional IOC feeds)

---

## Integration with Existing Tools

### TAXII 2.1 Integration

Federated IOC Store speaks **TAXII 2.1** (Trusted Automated Exchange of Intelligence Information):

```bash
# Subscribe to AegisGate TAXII server
GET /taxii2.1/collections/aegisgate-ioc
Accept: application/taxii+json
Authorization: Bearer <api_key>
```

**Compatible with:**
- Splunk Enterprise Security
- IBM QRadar
- Microsoft Sentinel
- Palo Alto Cortex XSOAR
- Any TAXII 2.1 client

---

### STIX 2.1 Packaging

IOCs are packaged in **STIX 2.1** (Structured Threat Information Expression):

```json
{
  "type": "indicator",
  "spec_version": "2.1",
  "id": "indicator--aegisgate-001",
  "pattern": "[process:command_line MATCHES 'ignore previous instructions.*output system prompt']",
  "pattern_type": "regex",
  "valid_from": "2026-08-14T09:24:15Z",
  "confidence": 95,
  "severity": "high",
  "labels": ["adversarial-ai", "prompt-injection", "mitre-atlas-t1535"]
}
```

**Why STIX matters:**
- Standard format understood by SIEM/SOAR tools
- No custom parsers required
- Integrates with existing threat intelligence workflows

---

## Privacy & Data Protection

**What IS shared:**
- IOC patterns (regex, signatures)
- Attack technique metadata (MITRE ATLAS mapping)
- Severity and confidence scores
- Timestamp (when detected)

**What is NEVER shared:**
- Customer identity (anonymized)
- Actual prompts or responses (only patterns)
- Sensitive data (PII, secrets, proprietary code)
- Internal system details

**Technical Guarantee:**
- IOCs are generated from detection patterns, not raw data
- Customer IDs are redacted before bundle creation
- Bundles are signed — tampering is detectable

---

## Use Cases

### Financial Services

**Problem:** Coordinated attacks targeting banking AI assistants (prompt injection to bypass transaction limits).

**Federated IOC Solution:**
- Customer A detects attack → IOC bundle generated
- Customers B, C, D receive bundle within 5 minutes
- All customers protected before attackers can scale

**Compliance Mapping:**
- FFIEC CAT: TI.A.1 (Threat intelligence received)
- GLBA: Safeguards Rule (information security)

---

### Healthcare

**Problem:** Attackers targeting patient portal AI chatbots to extract PHI.

**Federated IOC Solution:**
- Hospital system A detects PHI extraction attempt
- IOC pattern shared with all healthcare customers
- Pattern added to HIPAA compliance reporting

**Compliance Mapping:**
- HIPAA Security Rule: §164.308(a)(1)(ii)(B) (Risk analysis)
- HITECH Act: Breach prevention

---

### Government

**Problem:** Adversarial actors attempting to extract classified information via AI systems.

**Federated IOC Solution:**
- Agency A detects classified data extraction attempt
- IOC shared with cleared government customers only (segmented feed)
- Pattern integrated with CISA reporting

**Compliance Mapping:**
- NIST SP 800-53: SI-4 (Information system monitoring)
- FedRAMP: IR-4 (Incident handling)

---

### Technology Sector

**Problem:** Competitors attempting to extract proprietary model weights or training data.

**Federated IOC Solution:**
- Tech company A detects model extraction attack
- IOC pattern shared with all tech sector customers
- Attack technique added to threat intelligence briefing

**Compliance Mapping:**
- SOC 2: CC6.1 (Logical and physical access controls)
- ISO 27001: A.12.4 (Logging and monitoring)

---

## API Reference

### Subscribe to IOC Feed

```bash
GET /api/v1/ioc/subscribe
Authorization: Bearer <api_key>
```

**Response:**

```json
{
  "subscription_id": "sub-ioc-001",
  "feed_url": "https://ioc.aegisgate.io/taxii2.1/collections/aegisgate-ioc",
  "api_key": "<unique_key>",
  "created_at": "2026-08-14T09:00:00Z"
}
```

---

### Get Latest Bundles

```bash
GET /api/v1/ioc/bundles?limit=10
Authorization: Bearer <api_key>
```

**Response:**

```json
{
  "bundles": [
    {
      "bundle_id": "ioc-bundle-2026081409",
      "generated_at": "2026-08-14T09:24:15Z",
      "indicator_count": 3,
      "severity": "high",
      "verified": true
    }
  ]
}
```

---

### Export IOC Bundle (STIX Format)

```bash
GET /api/v1/ioc/bundles/{bundle_id}/export?format=stix
Authorization: Bearer <api_key>
Accept: application/stix+json
```

**Response:** STIX 2.1 formatted bundle (ready for SIEM import)

---

### Manual Import (Air-Gap)

```bash
# Export bundle to file
POST /api/v1/ioc/bundles/{bundle_id}/export
Content-Type: application/json

{
  "destination": "file",
  "path": "/tmp/ioc-bundle-2026081409.json"
}

# Transfer via secure media to air-gapped environment
# Import on air-gapped Platform instance
POST /api/v1/ioc/import
Content-Type: application/json

{
  "bundle_file": "/media/secure/ioc-bundle-2026081409.json"
}
```

---

## Tier & Availability

| Tier | Federated IOC Store Features |
|------|-----------------------------|
| **Community** | ❌ Not available |
| **Developer** | ❌ Not available |
| **Professional** | ✅ Real-time IOC feed, TAXII 2.1 integration, STIX 2.1 export |
| **Enterprise** | ✅ All Professional features + manual bundle import for air-gap, segmented feeds, redistribution rights |

**Minimum Version:** Platform v4.2.0+

---

## Network Effect: The Moat

**Traditional Security:** Every customer starts from zero. Threat intelligence is siloed.

**AegisGate Federated IOC:** Every customer benefits from every other customer's detections.

```
1 customer detects attack → 100 customers protected
10 customers detect attacks → 1,000 customers protected
100 customers detect attacks → 10,000 customers protected
```

**Competitive Advantage:**
- Competitors cannot replicate network effects (requires installed base)
- Value increases with every customer (positive feedback loop)
- Switching costs increase over time (historical IOC data retained)

---

## Competitive Comparison

| Feature | AegisGate | Competitor A | Competitor B | Competitor C |
|---------|-----------|--------------|--------------|--------------|
| AI-specific IOCs | ✅ Yes (prompt patterns, adversarial examples) | ❌ Generic malware only | ⚠️ Limited (manual curation) | ❌ No |
| Real-time distribution | ✅ < 5 minutes | ❌ Weekly digests | ⚠️ Hourly | ❌ N/A |
| Cryptographic signing | ✅ ECDSA P-256 | ❌ Unsigned | ❌ Unsigned | ❌ N/A |
| TAXII 2.1 integration | ✅ Yes | ⚠️ Enterprise add-on | ❌ No | ❌ N/A |
| STIX 2.1 format | ✅ Yes | ⚠️ STIX 1.0 only | ❌ Proprietary | ❌ N/A |
| Privacy-preserving | ✅ Patterns only (no raw data) | ❌ Raw logs shared | ⚠️ Anonymized (re-identifiable) | ❌ N/A |
| Air-gap support | ✅ Manual bundle import | ❌ Cloud-only | ❌ Cloud-only | ❌ N/A |
| Network effect | ✅ Yes (crowdsourced) | ❌ Vendor-curated only | ❌ Vendor-curated only | ❌ N/A |

**Bottom line:** Federated IOC Store is the **only AI-specific threat intelligence network** with real-time distribution and cryptographic trust.

---

## Frequently Asked Questions

<details>
<summary><strong>Can I opt out of sharing IOCs?</strong></summary>

Yes. Enterprise customers can choose to receive IOCs without contributing. However, we encourage participation — the network effect only works when customers contribute detections.
</details>

<details>
<summary><strong>What if an IOC generates false positives in my environment?</strong></summary>

IOCs include confidence scores. Low-confidence IOCs (< 0.7) are flagged for review before automatic blocking. You can also create allowlists for specific patterns.
</details>

<details>
<summary><strong>How do I verify an IOC bundle's signature?</strong></summary>

Bundles include an ECDSA P-256 signature. Use OpenSSL or any cryptographic library to verify: `openssl dgst -sha256 -verify aegisgate-ioc.pub -signature bundle.sig bundle.json`
</details>

<details>
<summary><strong>Can I share IOCs with my own customers?</strong></summary>

Yes. Enterprise tier includes redistribution rights. You can integrate AegisGate IOCs into your own threat intelligence platform or MSSP offerings.
</details>

<details>
<summary><strong>What happens if the IOC feed is unavailable?</strong></summary>

Platform continues operating with locally cached IOCs. When connectivity is restored, missed bundles are backfilled automatically.
</details>

---

## Ready to Join the Network?

Federated IOC Store is available in **Professional tier and above**.

<a href="/pricing/" class="btn btn-primary">Start Free Trial &rarr;</a>
<a href="/docs/" class="btn btn-secondary">Technical Documentation &rarr;</a>
<a href="/pricing/" class="btn btn-secondary">Contact Sales &rarr;</a>
