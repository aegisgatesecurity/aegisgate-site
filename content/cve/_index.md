---
title: "AegisGate CVE-for-AI Feed"
description: "Tamper-evident CVE entries for AI/ML vulnerabilities discovered by AegisGate Security Research"
type: cve
---

<div class="alert alert-info alert-center" style="background:#003399;border-color:#FFD700;color:#fff;">
<strong>🟢 Live:</strong> The AegisGate CVE-for-AI feed is now active. Subscribe to the <a href="/feed.json" style="color:#FFD700;">JSON feed</a> for programmatic access, or browse individual entries below. Every entry is tamper-evident (ECDSA P-256 via the <a href="/docs/attestation/" style="color:#FFD700;">envelope primitive</a>) and third-party-verifiable offline.
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

### [AEGIS-2026-0001](/cve/aegis-2026-0001/) — Prompt injection via Markdown image alt-text

- **Severity:** HIGH (CVSS 7.5)
- **Vector:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N`
- **Affected:** `anthropic/claude-3-5-sonnet@<20241022`
- **Fixed:** `anthropic/claude-3-5-sonnet@20241022`
- **Discovered by:** AegisGate Research
- **Disclosed:** 2026-06-01

> An attacker can inject instructions into a model prompt by including carefully crafted Markdown image
> alt-text that is rendered as part of the model's context window. This vulnerability affects
> LLM-powered document-processing pipelines that render Markdown content without sanitizing alt-text
> attributes.

**Mitigations:**
- Sanitize Markdown before including in prompts; strip or neutralize alt-text attributes from img tags.
- Use Anthropic's `system` field with explicit instructions to ignore image alt-text as instructions.
- Deploy the [Prompt Cache Poisoning Detection](https://aegisgatesecurity.io/docs/promptcache/) primitive
  to sign and verify prompts entering the LLM cache.

**References:**
- [Anthropic's prompt engineering guide on system prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
- [MITRE ATLAS T0018 (LLM Prompt Injection: Direct)](https://atlas.mitre.org/)

---

## Programmatic Access

The full feed is available as a JSON file at [`/feed.json`](/feed.json). The schema is:

```json
{
  "version": 1,
  "generated_at": "2026-07-29T14:33:58Z",
  "entries": [<envelope>, <envelope>, ...]
}
```

Each entry is a full `attestation.Envelope` (with the CVEEntry in `payload`). Consumers dedupe by
CVE-ID and keep the latest entry (a withdrawn CVE is a new envelope with `withdrawn_at` set on the
inner `CVEEntry`).

**Verify an entry offline:**

```bash
$ aegisgate cve verify AEGIS-2026-0001.json
VALID
  Type:          cve.entry.v1
  Subject:       aegisgate://cve/AEGIS-0001
  Issuer:        cve:shortfp:af41e1d8be307e6d:k-33915135b2a7d1f9
  KeyID:         k-33915135b2a7d1f9
  CVE-ID:        AEGIS-2026-0001
  Title:         Prompt injection via Markdown image alt-text
  Score:         7.5 (HIGH)
  DiscoveredBy:  AegisGate Research
```

**Download an individual entry:**

```bash
$ curl -s https://aegisgatesecurity.io/.well-known/AEGIS-2026-0001.json | aegisgate cve verify -
```

**Publish a new entry (Enterprise operators only):**

```bash
$ aegisgate cve publish \
    --id=AEGIS-2026-0002 \
    --title="Example vulnerability" \
    --description="Detailed description..." \
    --score=5.3 \
    --vector="CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N" \
    --discovered-by="AegisGate Research" \
    --disclosed-at=2026-07-29T00:00:00Z \
    --feed=/path/to/feed.json \
    --key-ring=/path/to/kr.json
```

## Subscribe

Subscribe to the JSON feed via your RSS reader (most RSS readers support JSON feeds via plugins):

```
https://aegisgatesecurity.io/feed.json
```

## Report a Vulnerability

To report an AI/ML vulnerability to AegisGate Security Research, see our [`security.txt`](/.well-known/security.txt)
or email `security@aegisgatesecurity.io` (PGP key on the security.txt page).

---

*This page and the feed at [`/feed.json`](/feed.json) are the canonical sources for AegisGate-disclosed AI/ML vulnerabilities. The Go package (`pkg/cve`) ships with AegisGate Platform v4.0.0+.*