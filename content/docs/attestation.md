---
title: Attestation
description: AegisGate compliance attestation — automated evidence generation, integrity verification, and signed audit reports for SOC 2, ISO 27001, and EU AI Act.
weight: 330
---

<div style="border:2px solid #b45309;background:#fffbeb;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>


## Attestation

AegisGate provides automated compliance attestation with cryptographic evidence integrity.

### Evidence Packages

AegisGate generates signed evidence packages for each security detection:

- **Timestamp**: RFC 3339 formatted, UTC
- **Detection rule**: Rule ID, category, confidence score
- **Detection layer**: Deterministic regex/ATLAS rule that fired (ML classification withdrawn 2026-11-23)
- **ATLAS mapping**: MITRE ATLAS tactic and technique IDs
- **Framework cross-reference**: SOC 2, ISO 27001, EU AI Act control IDs

### Integrity Verification

Every evidence package is SHA256-hashed for tamper detection:

```bash
curl http://localhost:8443/api/v1/compliance/integrity
# Returns: {"algorithm":"sha256","hash":"a1b2c3d4...","patterns":42,"timestamp":"..."}
```

### Signed Reports

For formal attestation, AegisGate can generate signed compliance reports:

```bash
curl -H "X-API-Key: your-key" \
     "http://localhost:8443/api/v1/compliance/report?framework=soc2&format=pdf"
```

_See also: [Compliance Frameworks](/docs/compliance/) and [MITRE ATLAS Coverage](/docs/atlas/)._
