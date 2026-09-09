---
title: "Trust Framework Architecture"
description: "Technical deep-dive into the AegisGate Trust Framework — cryptographic agent identity, capability contracts, real-time trust scoring, and signed attestations for AI agent governance."
weight: 360
---

## Trust Framework Architecture

The AegisGate Trust Framework is the **6th pillar** of AegisGate's security coverage. It answers the question every regulated industry asks about AI agents: **"Who is this agent, what is it allowed to do, and can I trust what it just did?"**

Most AI security tools scan messages for prompt injection, PII, and secrets — but they treat the agent itself as anonymous. The Trust Framework gives the agent a **cryptographic identity**, an explicit **capability contract** (what tools it's allowed to invoke, what data it can read, what delegation it can perform), a **real-time trust score** based on observed behavior, and **cryptographically signed attestations** that prove the agent's behavior to auditors.

This is the same idea as X.509 certificates for HTTPS — but for AI agents, with real-time trust scoring on top of identity.

---

## The 4 Components

| Component | What it does | Implementation |
|-----------|--------------|----------------|
| **Agent Identity** | Each agent gets a unique ID + ECDSA P-256 keypair. Public key registered in a tamper-evident identity registry. | `pkg/trust/identity/` |
| **Capability Contracts** | Signed JSON documents that declare what an agent is allowed to do (tool calls, data access, agent delegation). Enforced at request time, fail-closed. | `pkg/trust/contract/` |
| **Trust Score Engine** | Real-time per-agent score (0–100) based on 4 weighted factors: contract compliance (40%), behavioral anomaly (30%), historical incidents (20%), capability drift (10%). Three verdicts: TRUSTED, SUSPICIOUS, BLOCKED. | `pkg/trust/score/` |
| **Signed Attestations** | ECDSA-signed JSON envelopes that prove to auditors: "agent X was at score 87.5 with these factors at this time." The auditor verifies the signature against the platform's public key, no server round-trip needed. | `pkg/trust/attestation/` |

---

## 1. Agent Identity

Every AI agent that operates through AegisGate is issued a **cryptographic identity**:

- **Algorithm**: ECDSA P-256 (FIPS 186-4, NIST P-256 — the same curve used in TLS 1.3 and JWT ES256)
- **Registration**: Agent submits a registration request with its public key. The platform records the binding between agent ID and public key.
- **Lifecycle**: Agents have a lifecycle — `active`, `suspended`, `revoked`. A suspended agent's operations are blocked pending review. A revoked agent's key is added to the revocation list.
- **Key rotation**: Agents can rotate their keypairs. The old key is marked superseded (not revoked), preserving audit trail continuity.

### Identity Registration Flow

```
Agent generates keypair → submits RegisterRequest (public key + metadata)
    → Platform validates → creates AgentIdentity record
    → Agent receives registration confirmation
    → All subsequent operations signed with agent's private key
```

### What identity proves

- **Non-repudiation**: The agent's private key signed the request. The agent cannot deny having made it.
- **Authenticity**: The platform verified the public key at registration time.
- **Continuity**: The keypair persists across sessions, enabling longitudinal trust scoring.

---

## 2. Capability Contracts

A capability contract is a **signed JSON document** that declares exactly what an agent is allowed to do. It is enforced at request time — if an agent attempts an operation not in its contract, the request is rejected (fail-closed).

### 20 Capability Types

| Category | Capabilities |
|----------|-------------|
| **File** | `file.read`, `file.write`, `file.delete` |
| **Network** | `network.connect`, `network.listen` |
| **Terminal** | `terminal.execute` |
| **Database** | `database.query`, `database.modify` |
| **API** | `api.call`, `api.key.access` |
| **Agent** | `agent.delegate`, `agent.receive` |
| **Data** | `data.classify`, `data.transform`, `data.export` |
| **Admin** | `admin.config`, `admin.users`, `admin.policy`, `admin.audit` |

### Contract Structure

```json
{
  "contract_id": "contract-uuid",
  "agent_id": "agent-001",
  "version": "1.0",
  "capabilities": [
    {
      "type": "file.read",
      "scope": {
        "paths": ["/data/public/*"],
        "max_size_mb": 10
      }
    },
    {
      "type": "api.call",
      "scope": {
        "endpoints": ["https://api.weather.com/*"],
        "rate_limit_per_minute": 60
      }
    }
  ],
  "signed_at": "2026-09-01T00:00:00Z",
  "signed_by": "platform-admin",
  "signature": "ECDSA-P256 signature bytes"
}
```

### Enforcement

- **Request-time check**: Every tool call, API request, or data access is checked against the agent's current contract.
- **Fail-closed**: If the contract cannot be loaded, is expired, or the capability is not listed, the request is blocked.
- **Scope enforcement**: Capabilities include scope constraints (path patterns, rate limits, size limits) that are validated per-request.

---

## 3. Trust Score Engine

The trust score is a **real-time, per-agent score** from 0 to 100 that reflects the platform's confidence in the agent's behavior. It is continuously updated based on observed actions.

### Scoring Factors

| Factor | Weight | What it measures |
|--------|--------|-----------------|
| **Contract compliance** | 40% | Did the agent stay within its capability contract? Violations reduce the score. |
| **Behavioral anomaly** | 30% | Does the agent's current behavior pattern deviate from its established baseline? |
| **Historical incidents** | 20% | How many and how severe were past incidents (blocked requests, violations)? |
| **Capability drift** | 10% | Is the agent requesting capabilities it hasn't used before, or expanding its scope? |

### Score Verdicts

| Score Range | Verdict | What happens |
|-------------|---------|-------------|
| 70–100 | **TRUSTED** | Normal operation. All capabilities available. |
| 50–69 | **SUSPICIOUS** | Elevated scrutiny. High-risk capabilities require approval. Warnings logged. |
| 0–49 | **BLOCKED** | All operations rejected. Agent must be reviewed by a human administrator. |

### Behavioral Baseline

The Trust Score Engine maintains a **per-agent behavioral baseline** — a statistical profile of the agent's normal operation patterns:

- Typical capability usage frequency
- Normal request patterns (timing, size, destination)
- Expected scope of operations
- Historical incident rate

When current behavior deviates significantly from the baseline, the anomaly factor increases, lowering the overall score. This catches agents that have been compromised or are operating outside their expected parameters — even if they haven't explicitly violated their contract.

### Score Recovery

Scores are not permanent. An agent that was SUSPICIOUS can recover to TRUSTED through:

- **Time decay**: Historical incident weight decreases over time (exponential decay, half-life ~7 days)
- **Consistent good behavior**: Contract compliance and low anomaly scores gradually pull the score up
- **Administrative review**: An admin can manually adjust the score after investigating an incident

---

## 4. Signed Attestations

Attestations are the **compliance evidence package**. They are cryptographically signed JSON envelopes that prove the state of an agent at a point in time.

### Attestation Structure

```json
{
  "attestation_id": "att-uuid",
  "agent_id": "agent-001",
  "timestamp": "2026-09-01T12:00:00Z",
  "trust_score": 87.5,
  "verdict": "TRUSTED",
  "score_factors": {
    "contract_compliance": 0.95,
    "behavioral_anomaly": 0.12,
    "historical_incidents": 0.0,
    "capability_drift": 0.05
  },
  "contract_version": "1.0",
  "recent_incidents": 0,
  "platform_public_key": "ECDSA P-256 public key (base64)",
  "signature": "ECDSA-P256 signature over the JSON payload (base64)"
}
```

### Self-Verifying Design

Every attestation response includes:

1. **The platform's public key** — so the auditor doesn't need to contact the platform
2. **The signed payload** — the attestation data
3. **The signature** — ECDSA P-256 signature over the payload

An auditor can verify the attestation using **only the public key**, with no server round-trip required. This is critical for:

- **Air-gapped environments**: No network access needed for verification
- **Long-term archival**: Attestations remain verifiable even if the platform is decommissioned (as long as the public key is preserved)
- **Third-party audit**: Auditors can verify evidence independently

### Cryptographic Primitives

- **Signing algorithm**: ECDSA P-256 (FIPS 186-4)
- **Hash**: SHA-256
- **Key format**: X.509 SubjectPublicKeyInfo (PEM or base64 DER)
- **Signature format**: ASN.1 DER-encoded ECDSA signature

These are **standardized** cryptographic primitives — the same used in TLS 1.3, JWT ES256, and FIDO2. They are not proprietary to AegisGate.

---

## Customer-Facing API

The Trust Framework exposes an HTTP API at `/api/v1/trust/*`:

| Endpoint | Method | What it returns | Auth |
|----------|--------|-----------------|------|
| `/api/v1/trust/score?agent=ID` | GET | Lifetime trust score for an agent | License (Professional+) |
| `/api/v1/trust/score?session=ID` | GET | Current session trust score | License (Professional+) |
| `/api/v1/trust/sessions?active=true&agent=ID` | GET | Active sessions for an agent | License (Professional+) |
| `/api/v1/trust/attestations?agent=ID&since=TS` | GET | Signed attestations since timestamp | License (Professional+) |
| `/api/v1/trust/attestations/latest?agent=ID` | GET | Most recent attestation | License (Professional+) |
| `/api/v1/trust/health` | GET | Liveness check | Public |

### Example: Get Trust Score

```bash
curl -H "X-API-Key: your-key" \
  "https://aegisgate.yourcompany.com/api/v1/trust/score?agent=agent-001"
```

```json
{
  "agent_id": "agent-001",
  "score": 87.5,
  "verdict": "TRUSTED",
  "factors": {
    "contract_compliance": 0.95,
    "behavioral_anomaly": 0.12,
    "historical_incidents": 0.0,
    "capability_drift": 0.05
  },
  "last_updated": "2026-09-01T12:00:00Z"
}
```

### Example: Get Latest Attestation

```bash
curl -H "X-API-Key: your-key" \
  "https://aegisgate.yourcompany.com/api/v1/trust/attestations/latest?agent=agent-001"
```

The response includes the signed attestation envelope, the platform's public key, and the ECDSA signature. An auditor can verify the signature independently.

---

## What's Enforced vs. Recommended

### Enforced at Runtime

- **Capability contracts**: Every tool call is checked against the agent's contract (fail-closed if unauthorized)
- **Trust score**: Every tool call updates the score (penalty for high-risk actions, anomaly for unexpected patterns)
- **Automatic blocking**: Score drops below 50 → agent is automatically blocked pending human review
- **Score 0–49 (BLOCKED)**: All operations rejected

### Recommended for Compliance Evidence

- **Signed attestations**: AegisGate generates them; the customer's compliance team or auditor verifies and archives them
- **Real-time agent dashboard**: Shows all agents + scores + recent activity (for SOC dashboards)
- **CISO posture reports**: Weekly summary with trust score trends

---

## Why This Matters for Regulated Industries

### Banking (SOC 2 + ISO 42001)

Auditors ask: "Show me the access log proving that the agent that processed this loan application was authorized for that customer, and show me the trust score it had at the time."

The Trust Framework answers both: capability contracts prove authorization, signed attestations prove the trust score with cryptographic integrity.

### Healthcare (HIPAA)

A hospital's AI agent processing patient data needs to prove it had PHI access authorization at the time of access. The Trust Framework's signed attestations are tamper-evident and include the agent's trust score, the capability contract version, and the timestamp — the minimum viable evidence package for HIPAA audit.

### Government / FedRAMP

Federal agencies require non-repudiation: who did what, when, with what authority, and how do I prove it? The Trust Framework's signed attestations + the audit log together provide a complete audit trail with cryptographic integrity.

### EU AI Act (Art 9 risk management, Art 14 human oversight)

The Trust Framework provides the cryptographic evidence that the customer's risk-management system can present to a Notified Body. The trust score provides the human oversight signal — a score dropping below threshold triggers human review.

---

## Linkage to Other AegisGate Modules

| Module | Integration |
|--------|------------|
| **Detection engine** | Every detection (PII, secrets, injection) feeds into the agent's trust score as a historical incident |
| **Compliance modules** | Each compliance scan report (HIPAA, SOC 2, EU AI Act) can include the relevant trust score for the agent that triggered the report |
| **A2A protocol** | Every agent-to-agent message carries a trust score header (`X-AegisGate-Trust-Score: 87.5`) so the receiving agent can make decisions based on the sender's trust |
| **MCP protocol** | MCP tool calls are validated against the agent's capability contract before execution |
| **Response scanning** | Response detections (PII leakage, hallucinated secrets) update the calling agent's trust score |

---

## What the Trust Framework Does NOT Cover

- **Notary / conformity assessment**: AegisGate is a security gateway, not a Notified Body
- **Background checks on agent developers**: We verify the agent's identity (cryptographic keypair), not the human's identity behind the agent
- **AI model risk scoring**: The Trust Framework scores the *agent* (behavior, contracts), not the underlying LLM model. Model risk is the customer's responsibility
- **Federated trust across organizations**: Current version is single-organization. Cross-org trust federation is on the roadmap
- **PKI / certificate authority integration**: AegisGate generates its own ECDSA keypairs. Integration with enterprise PKI (HashiCorp Vault, Microsoft AD CS) is on the Enterprise+ roadmap

---

## Self-Attested, Not Third-Party Validated

The Trust Framework's cryptographic primitives are **standardized** (ECDSA P-256 = FIPS 186-4, NIST P-256, used in TLS 1.3 and JWT ES256). The envelope format is internally specified.

The Trust Framework is **self-attested** for the AegisGate-specific trust-score algorithm and the TRUSTED/SUSPICIOUS/BLOCKED thresholds. Customers should consult qualified counsel or a Notified Body for opinion-of-counsel on the suitability of AegisGate's trust scoring for their specific compliance program.

---

## Configuration

Enable the Trust Framework in `configs/aegisgate-platform.yaml`:

```yaml
trust:
  enabled: true
  require_license: true  # Gate API behind Professional+ license (default: true)
  score_threshold_suspicious: 50  # Below this = SUSPICIOUS
  score_threshold_blocked: 50     # Below this = BLOCKED
  anomaly_sensitivity: 0.3        # 0-1, higher = more sensitive to anomalies
  incident_decay_hours: 168       # Half-life for incident weight (default: 7 days)
```

Or via environment variable: `AEGISGATE_TRUST_ENABLED=true`

---

## Tier & Pricing

- **Tier required**: Professional+ (Professional $499/mo, Enterprise $2,000/mo)
- **Pricing model**: Included in the tier — not a separately-billable module. The Trust Framework is a platform capability, not a compliance add-on.
- **Custom Enterprise SLAs**: Available for customers who need deeper trust-score analytics than the tier provides

---

## Version History

| AegisGate version | Trust Framework status |
|-------------------|------------------------|
| v3.0.0 and earlier | Not present (HTTP/MCP/A2A/RESPONSE only — 4 pillars) |
| v3.1.0 – v3.2.0 | Trust packages pre-built but not first-class |
| v3.3.0 | Trust packages available as opt-in; not yet wired into main |
| **v3.6.0+** | **Trust Framework promoted to 6th pillar; HTTP API at `/api/v1/trust/*`; tier-gated to Professional+** |
| v4.0+ (planned) | Cross-organization trust federation; PKI integration; ML-based anomaly detection |