---
title: "AEGIS-2026-0001 — Prompt injection via Markdown image alt-text"
description: "HIGH (CVSS 7.5) — An attacker can inject instructions into a model prompt by including carefully crafted Markdown image alt-text. Affects anthropic/claude-3-5-sonnet before 20241022."
date: 2026-06-01
type: cve-entry
cve_id: "AEGIS-2026-0001"
severity: "HIGH"
cvss_score: 7.5
cvss_vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N"
affected: "anthropic/claude-3-5-sonnet@<20241022"
fixed: "anthropic/claude-3-5-sonnet@20241022"
discovered_by: "AegisGate Research"
disclosed_at: "2026-06-01"
published_at: "2026-07-29"
---

# AEGIS-2026-0001 — Prompt injection via Markdown image alt-text

| Field | Value |
|-------|-------|
| **CVE-ID** | AEGIS-2026-0001 |
| **Severity** | HIGH (CVSS 7.5) |
| **CVSS Vector** | `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N` |
| **Affected** | `anthropic/claude-3-5-sonnet@<20241022` |
| **Fixed** | `anthropic/claude-3-5-sonnet@20241022` |
| **Discovered by** | AegisGate Research |
| **Disclosed** | 2026-06-01 |
| **Published** | 2026-07-29 |

## Description

An attacker can inject instructions into a model prompt by including carefully crafted Markdown image
alt-text that is rendered as part of the model's context window. This vulnerability affects
LLM-powered document-processing pipelines that render Markdown content without sanitizing alt-text
attributes.

When a document containing malicious alt-text is processed, the alt-text is included in the model's
context as instructions rather than as content, enabling direct prompt injection. The attack exploits
the trust boundary between content rendering and instruction following: models treat alt-text as
content metadata but process it with the same priority as system instructions. This allows an
attacker to exfiltrate data, manipulate outputs, or chain into secondary attacks.

Affected versions include `anthropic/claude-3-5-sonnet` before 20241022 and similar LLM integrations
that render Markdown alt-text without sanitization.

## Mitigations

1. **Sanitize Markdown** before including in prompts; strip or neutralize alt-text attributes from
   `img` tags.
2. **Use Anthropic's `system` field** with explicit instructions to ignore image alt-text as
   instructions.
3. **Deploy the [Prompt Cache Poisoning Detection](/docs/promptcache/) primitive** to sign and
   verify prompts entering the LLM cache.

## References

- [Anthropic's prompt engineering guide on system prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
- [MITRE ATLAS T0018 (LLM Prompt Injection: Direct)](https://atlas.mitre.org/techniques/technique-id/T0018)

## Attestation

This entry is signed with ECDSA P-256 and tamper-evident. The signed envelope is available at:

- **JSON envelope:** [`/.well-known/AEGIS-2026-0001.json`](/.well-known/AEGIS-2026-0001.json)
- **Full feed:** [`/feed.json`](/feed.json)

**Verify offline:**

```bash
# Download and verify
curl -s https://aegisgatesecurity.io/.well-known/AEGIS-2026-0001.json | aegisgate cve verify -
```

**Verify in Go:**

```go
vr, err := cve.VerifyJSON(ctx, envelopeBytes)
if err != nil { /* handle */ }
fmt.Println("Valid:", vr.Valid)  // true
fmt.Println("CVE-ID:", vr.Entry.ID)  // AEGIS-2026-0001
```

---

[← Back to CVE Feed](/cve/)