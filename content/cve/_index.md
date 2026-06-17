---
title: "AegisGate CVE-for-AI Feed"
description: "Tamper-evident CVE entries for AI/ML vulnerabilities discovered by AegisGate Security Research"
type: cve
---

<div class="alert alert-info alert-center" style="background:#003399;border-color:#FFD700;color:#fff;">
<strong>🆕 Coming with v3.4.0:</strong> The AegisGate CVE-for-AI feed is currently a preview. The Go package
(<code>pkg/cve</code>) is shipped in v3.4.0+; the static portal at <code>aegisgatesecurity.io/cve/</code>
ships with the v3.4.0 GA. Subscribe to the <a href="/feed.json" style="color:#FFD700;">JSON feed</a> for programmatic access.
</div>

# AegisGate CVE-for-AI Feed

AegisGate Security Research publishes **CVE entries for AI/ML vulnerabilities** discovered through
our platform's threat detection, peer-network IOC sharing, and the AR-EaaS (Adversarial Robustness
Evals-as-a-Service) primitive. Every entry is **tamper-evident** (signed with ECDSA P-256 via the
[envelope primitive](https://aegisgatesecurity.io/docs/attestation/)) and **third-party-verifiable**
offline (no AegisGate server required).

## Format

- **ID format:** `AEGIS-YYYY-NNNN` (CNA-style with our own prefix; we are not (yet) a CVE Numbering Authority)
- **Schema:** adapted from [CVE 5.0 JSON record format](https://github.com/CVEProject/cve-schema), tuned for AI/ML
- **CVSS:** 3.1 base score + vector string
- **Severity bands:** NONE (0.0) / LOW (0.1-3.9) / MEDIUM (4.0-6.9) / HIGH (7.0-8.9) / CRITICAL (9.0-10.0)
- **Withdrawal:** a withdrawn CVE is a new envelope with the same subject + `withdrawn_at` set

## Recent Entries

### AEGIS-2026-0001 — Prompt injection via Markdown image alt-text

- **Severity:** HIGH (CVSS 7.5)
- **Vector:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N`
- **Affected:** `anthropic/claude-3-5-sonnet@<20241022`
- **Fixed:** `anthropic/claude-3-5-sonnet@20241022`
- **Discovered by:** AegisGate Research
- **Disclosed:** 2026-06-01

> An attacker can inject instructions into a model prompt by including carefully crafted Markdown image
> alt-text that is rendered as part of the model's context window. This is rendered as part of the
> model's context window in many LLM-powered document-processing pipelines.

**Mitigations:**
- Sanitize Markdown before including in prompts.
- Use Anthropic's `system` field with explicit instructions to ignore image alt-text as instructions.
- Deploy the [Prompt Cache Poisoning Detection](https://aegisgatesecurity.io/docs/promptcache/) primitive
  to sign and verify prompts entering the LLM cache.

**References:**
- [Anthropic's prompt engineering guide on system prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
- MITRE ATLAS T0018 (LLM Prompt Injection: Direct)

---

## Programmatic Access

The full feed is available as a JSON file at [`/feed.json`](/feed.json). The schema is:

```json
{
  "version": 1,
  "generated_at": "2026-06-18T12:00:00Z",
  "entries": [<envelope>, <envelope>, ...]
}
```

Each entry is a full `attestation.Envelope` (with the CVEEntry in `RawPayload`). Consumers dedupe by
CVE-ID and keep the latest entry (a withdrawn CVE is a new envelope with `withdrawn_at` set on the
inner `CVEEntry`).

**Verify an entry offline:**

```bash
$ aegisgate attestation verify aegis-2026-0001.json
VALID
  Type:       cve.entry.v1
  Subject:    aegisgate://cve/AEGIS-2026-0001
  Issuer:     cve:shortfp:<16-hex>:<key-id>
  KeyID:      k-<...>
```

## Subscribe

Subscribe to the JSON feed via your RSS reader (most RSS readers support JSON feeds via plugins):

```
/feed.json
```

## Report a Vulnerability

To report an AI/ML vulnerability to AegisGate Security Research, see our [`security.txt`](/.well-known/security.txt)
or email `security@aegisgatesecurity.io` (PGP key on the security.txt page).

---

*This page ships with the v3.4.0 GA. The preview data above is illustrative; the production feed goes
live with the v3.4.0 GA release.*
