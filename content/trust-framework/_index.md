---
title: "Trust Framework — Cryptographically Verifiable AI Agent Identity"
description: "Per-agent ECDSA identity, capability contracts, real-time trust scoring, and signed attestations. The only AI security platform with cryptographic proof of agent behavior."
type: "landing"
---

<!-- ============================================================
     HERO: The Problem Every CISO Faces
     ============================================================ -->

> **🔐 When an AI agent takes action in your systems, can you prove _which_ agent did it?**
>
> Most AI security tools treat all agents as anonymous. When something goes wrong, you get logs saying "an AI made this request" — but no cryptographic proof of which agent, what it was authorized to do, or whether its behavior matched its intended role.
>
> **AegisGate Trust Framework changes this.** Every agent gets a unique cryptographic identity. Every action is signed. Every attestation is independently verifiable. No server round-trip needed.

<div class="alert alert-success alert-center">
<strong>Trust Framework</strong> is available in <strong>Professional tier and above</strong>.
<br><br>
<a href="/pricing/" class="btn btn-primary">View Pricing &rarr;</a>
<a href="/docs/" class="btn btn-secondary">Technical Documentation &rarr;</a>
</div>

---

## The Anonymous Agent Problem

Today's AI deployments have a critical blind spot:

| What Happens | What You Can Prove |
|--------------|-------------------|
| Agent A queries your customer database | "An AI made a database query" |
| Agent B modifies a production config | "An AI changed production" |
| Agent C exfiltrates sensitive data | "An AI accessed sensitive data" |

**When incident response begins, you cannot cryptographically prove:**
- Which specific agent took the action
- What capabilities that agent was authorized to use
- Whether the agent's behavior matched its intended role
- Whether the logs themselves have been tampered with

This is **compliance theater**, not security.

---

## The Trust Framework Solution

AegisGate Trust Framework provides **four cryptographic guarantees**:

### 1. Per-Agent ECDSA Identity

Every agent gets a unique **ECDSA P-256 keypair** at registration:

```json
{
  "agent_id": "agent-copilot-dev-001",
  "public_key": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...",
  "registered_at": "2026-01-15T09:23:47Z",
  "fingerprint": "SHA256:7d8a9b2c4e5f6a1b3c4d5e6f7a8b9c0d"
}
```

**Why this matters:**
- No two agents share the same identity
- Public key is registered in a tamper-evident ledger
- Fingerprint allows human-verifiable identity confirmation
- Private key never leaves the agent's secure enclave

---

### 2. Capability Contracts

Every agent operates under a **signed capability contract** that explicitly defines what it's authorized to do:

```json
{
  "agent_id": "agent-copilot-dev-001",
  "capabilities": ["code_suggestion", "file_read"],
  "restrictions": ["no_file_write", "no_network_call", "no_secret_access"],
  "issued_by": "platform-admin",
  "issued_at": "2026-01-15T09:23:47Z",
  "expires_at": "2027-01-15T09:23:47Z",
  "signature": "MEUCIQDvL..."
}
```

**Enforcement:**
- Platform enforces contracts at **runtime** (fail-closed)
- Agent cannot exceed authorized capabilities
- Contract violations trigger immediate trust score degradation
- Contracts are cryptographically signed — tamper-evident

---

### 3. Real-Time Trust Scoring

Every agent has a **dynamic trust score (0-100)** that updates in real-time based on:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Contract Compliance** | 40% | Has the agent stayed within its capability contract? |
| **Behavioral Baseline** | 30% | Does this action match the agent's historical pattern? |
| **Detection Events** | 20% | Has the agent triggered PII/secrets/injection detections? |
| **Temporal Anomalies** | 10% | Is the agent operating outside normal hours/frequency? |

**Trust Score Actions:**

| Score Range | Status | Platform Response |
|-------------|--------|------------------|
| 80-100 | ✅ Trusted | Full capability access |
| 60-79 | ⚠️ Degraded | Enhanced logging, manual review required for sensitive ops |
| 40-59 | 🚫 Restricted | Capabilities reduced to read-only |
| 0-39 | 🔒 Revoked | Agent identity revoked, all operations blocked |

**Anomaly Detection:**
- Sudden trust score drops trigger alerts
- Platform tracks rolling 30-day baselines
- Unusual access patterns (time, frequency, resource type) flagged

---

### 4. Signed Attestations

Every agent action produces a **self-verifying attestation envelope**:

```json
{
  "attestation_id": "att-2026011509234701",
  "agent_id": "agent-copilot-dev-001",
  "action": "file_read",
  "resource": "/src/config/database.yml",
  "timestamp": "2026-01-15T09:23:47Z",
  "trust_score": 94,
  "payload_hash": "SHA256:a1b2c3d4e5f6...",
  "signature": "MEUCIQDvL8K9mN2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hI2jK3lM4n"
}
```

**Verification (no server round-trip):**

```bash
# Anyone with the agent's public key can verify offline
openssl dgst -sha256 -verify agent-copilot-dev-001.pub \
  -signature attestation.sig \
  attestation.json
```

**Output:** `Verified OK` ✅

**Why this matters:**
- Auditors can verify attestations without accessing your Platform instance
- Evidence is admissible in regulatory proceedings (cryptographic integrity)
- No dependency on AegisGate servers — attestations are self-contained
- Tamper-evident: any modification invalidates the signature

---

## Use Cases by Industry

### Banking & Financial Services

**Problem:** Regulators require proof of who (or what) accessed customer data.

**Trust Framework Solution:**
- Every AI agent accessing customer PII has a cryptographic identity
- Capability contracts enforce "read-only" for non-transactional agents
- Signed attestations provide audit trail for FFIEC, SOX, GLBA exams
- Trust score degradation triggers automatic escalation

**Compliance Mappings:**
- FFIEC CAT: PR.AM-3 (Asset inventory), PR.DS-5 (Data access audit)
- SOX: Section 404 (Internal controls over financial reporting)
- GLBA: Safeguards Rule (21 CFR Part 314)

---

### Healthcare

**Problem:** HIPAA requires audit controls for PHI access. AI agents accessing patient records must be accountable.

**Trust Framework Solution:**
- Agents accessing EHR systems have unique cryptographic identities
- Capability contracts limit agents to minimum necessary PHI
- Signed attestations provide tamper-evident audit logs
- Trust score drops trigger HIPAA breach assessment workflow

**Compliance Mappings:**
- HIPAA Security Rule: §164.312(b) (Audit controls), §164.308(a)(1)(ii)(D) (Information system activity review)
- HITECH Act: Breach notification requirements

---

### Government & Defense

**Problem:** NIST, FedRAMP, DoD IL5 require cryptographic identity for all system actors.

**Trust Framework Solution:**
- ECDSA P-256 meets FIPS 186-4 digital signature requirements
- Per-agent identity satisfies NIST SP 800-53 IA-2 (Identification and Authentication)
- Signed attestations provide non-repudiation (NIST SP 800-53 AU-10)
- Air-gap compatible: verification works offline

**Compliance Mappings:**
- NIST SP 800-53: IA-2, IA-3, AU-10, SI-4
- FedRAMP Moderate/High: IA-2, IA-3, AU-10
- DoD IL5: Cryptographic identity requirements

---

### Energy & Critical Infrastructure

**Problem:** NERC CIP, TSA Security Directives require accountability for all access to critical systems.

**Trust Framework Solution:**
- Agents monitoring OT/ICS protocols have cryptographic identity
- Capability contracts prevent unauthorized control operations
- Trust score anomalies trigger CISA reporting workflows
- Signed attestations survive incident response (tamper-evident)

**Compliance Mappings:**
- NERC CIP-004-6 (Personnel training), CIP-007-6 (System security management)
- TSA SD 2021-01 (Pipeline cybersecurity)
- CISA Cybersecurity Performance Goals

---

## API Reference

### Get Agent Identity

```bash
GET /api/v1/trust/agents/{agent_id}
```

**Response:**

```json
{
  "agent_id": "agent-copilot-dev-001",
  "public_key": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...",
  "fingerprint": "SHA256:7d8a9b2c4e5f6a1b3c4d5e6f7a8b9c0d",
  "registered_at": "2026-01-15T09:23:47Z",
  "status": "active",
  "trust_score": 94,
  "capability_contract": {
    "capabilities": ["code_suggestion", "file_read"],
    "restrictions": ["no_file_write", "no_network_call"],
    "expires_at": "2027-01-15T09:23:47Z"
  }
}
```

---

### Verify Attestation (Offline)

```bash
POST /api/v1/trust/verify
Content-Type: application/json

{
  "attestation": { ... },
  "public_key": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE..."
}
```

**Response:**

```json
{
  "verified": true,
  "agent_id": "agent-copilot-dev-001",
  "timestamp": "2026-01-15T09:23:47Z",
  "integrity": "intact"
}
```

---

### Export Attestations (Audit)

```bash
GET /api/v1/trust/attestations?agent_id=agent-copilot-dev-001&from=2026-01-01&to=2026-01-31
Accept: application/json
```

**Response:** JSON array of signed attestations (verifiable offline)

---

## Tier & Availability

| Tier | Trust Framework Features |
|------|-------------------------|
| **Free** | ❌ Not available |
| **Professional** | ✅ Per-agent identity, capability contracts, trust scoring |
| **Enterprise** | ✅ All Professional features + signed attestations, audit export, SIEM integration |
| **Air-Gap** | ✅ All Enterprise features + offline verification, FIPS 140-2 validated crypto |

**Minimum Version:** Platform v4.2.0+

---

## Competitive Comparison

| Feature | AegisGate | Competitor A | Competitor B | Competitor C |
|---------|-----------|--------------|--------------|--------------|
| Per-agent cryptographic identity | ✅ ECDSA P-256 | ❌ Anonymous | ❌ API key only | ⚠️ Shared service account |
| Capability enforcement | ✅ Runtime (fail-closed) | ❌ Policy-only | ⚠️ Best-effort | ❌ None |
| Trust scoring | ✅ Real-time, 4-factor | ❌ None | ⚠️ Binary (allowed/blocked) | ❌ None |
| Signed attestations | ✅ Self-verifying | ❌ Server-dependent logs | ❌ Unsigned JSON | ❌ None |
| Offline verification | ✅ Yes (openssl) | ❌ Requires server access | ❌ Requires server access | ❌ N/A |
| FIPS 140-2 crypto | ✅ Available (Enterprise+) | ⚠️ Enterprise only | ❌ No | ❌ No |
| Air-gap compatible | ✅ Yes | ❌ Cloud-only | ❌ Cloud-only | ⚠️ Limited |

**Bottom line:** No competitor provides cryptographic proof of agent identity and behavior. Trust Framework is a **category-defining capability**, not a feature checkbox.

---

## Frequently Asked Questions

<details>
<summary><strong>What happens if an agent's private key is compromised?</strong></summary>

The agent identity is immediately revoked via the tamper-evident registry. All future attestations signed with that key will fail verification. A new keypair must be generated and registered. Platform triggers an alert and requires manual re-authorization.
</details>

<details>
<summary><strong>Can attestations be forged?</strong></summary>

No. Attestations are signed with ECDSA P-256. Without the agent's private key, an attacker cannot produce a valid signature. Any modification to the attestation payload invalidates the signature.
</details>

<details>
<summary><strong>How long are attestations retained?</strong></summary>

Default retention is 365 days (configurable). Attestations are stored in immutable storage. Enterprise tier supports export to SIEM/SOAR for long-term retention.
</details>

<details>
<summary><strong>Does Trust Framework work in air-gapped environments?</strong></summary>

Yes. Attestations are self-verifying — no server round-trip required. Auditors can verify attestations offline using the agent's public key. FIPS 140-2 validated crypto is available in Enterprise Air-Gap tier.
</details>

<details>
<summary><strong>Can I integrate trust scores with my SIEM?</strong></summary>

Yes. Enterprise tier includes SIEM integration (Splunk, QRadar, Sentinel). Trust score changes are emitted as CEF/LEEF events. Custom webhooks available for other SIEMs.
</details>

---

## Ready to Deploy Verifiable AI Security?

Trust Framework is available in **Professional tier and above**.

<a href="/pricing/" class="btn btn-primary">Start Free Trial &rarr;</a>
<a href="/docs/" class="btn btn-secondary">Technical Documentation &rarr;</a>
<a href="/pricing/" class="btn btn-secondary">Contact Sales &rarr;</a>
