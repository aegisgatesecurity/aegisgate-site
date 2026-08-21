---
title: "Processing Integrity Controls"
description: "AegisGate Security Platform processing integrity controls. Validation methods, error handling, and data accuracy assurance for SOC 2 Processing Integrity criteria."
type: "security"
date: 2026-07-29
layout: single
---

# Processing Integrity Controls

**Version:** 1.0
**Owner:** AegisGate Security, LLC
**Review Cycle:** Annual (next review: Q3 2027)
**Contact:** security@aegisgatesecurity.io

---

## 1. Purpose

This document describes the processing integrity controls implemented in AegisGate Security Platform, mapping to SOC 2 Trust Services Criteria for Processing Integrity (PI1). Processing integrity addresses whether system processing is complete, valid, accurate, timely, and authorized.

---

## 2. Processing Integrity Principles

| Principle | Definition | AegisGate Control |
|-----------|-----------|-------------------|
| **Completeness** | All processing steps execute without omission | Fail-closed architecture — if any check fails, the request is rejected |
| **Validity** | Processing follows defined business rules | 1,457 compliance controls validate rules at runtime |
| **Accuracy** | Processing produces correct results | Hash-chained audit logs verify output integrity |
| **Timeliness** | Processing occurs within defined timeframes | Per-tier rate limiting ensures timely processing |
| **Authorization** | Processing is initiated by authorized parties | RBAC + MFA + OIDC/SAML enforce authorization |

---

## 3. Control Implementation

### 3.1 Input Validation

| Control | Implementation | Verification |
|---------|---------------|--------------|
| Request authentication | ECDSA P-256 license key validation on every request | License check logging |
| Input sanitization | Regex pattern matching against 176 detection patterns | Scanner metrics dashboard |
| Schema validation | gRPC Protobuf schema validation for all 50 RPC methods | Protobuf compiler enforcement |
| Rate limiting | Per-tier RPM enforcement (Community: soft-throttle, Developer: 1000, Professional: 10,000, Enterprise: unlimited) | Rate limit headers in response |
| Authorization | RBAC policy evaluation on every request | Policy engine audit log |

### 3.2 Processing Controls

| Control | Implementation | Verification |
|---------|---------------|--------------|
| Fail-closed default | If any security check fails, encounters an error, or receives unexpected input, the request is rejected | Test coverage: nil handler recovery + deny |
| Compliance engine | 1,457 automated controls validate processing against 31 frameworks at runtime | Compliance status API endpoint |
| MCP guardrails | 8 guardrails validate MCP protocol interactions | Guardrail metrics per session |
| Threat detection | 176 patterns scanned per request/response pair | Detection metrics dashboard |
| PII/PHI scanning | Regex and pattern-based detection of 8 PHI identifiers and 12 PII categories | Scanner hit rates and false positive metrics |

### 3.3 Output Validation

| Control | Implementation | Verification |
|---------|---------------|--------------|
| Response scanning | Bidirectional scanning (request and response) | Scanner configuration audit |
| Redaction enforcement | Configurable redaction strategies (mask, replace, hash, remove) | Redaction policy audit |
| Trust attestation | ECDSA P-256 signed attestation for every processed event | Attestation verification CLI |
| Audit log integrity | Hash-chained append-only logs with SHA-256 | Chain integrity verification tool |
| Error handling | Structured error responses with correlation IDs | Error rate monitoring |

### 3.4 Data Accuracy

| Control | Implementation | Verification |
|---------|---------------|--------------|
| Hash-chained audit logs | SHA-256 hash chain ensures log entries cannot be modified without detection | Periodic chain integrity checks |
| Compliance reporting | Automated reports generated from verified log data | Report-to-log reconciliation |
| Configuration validation | Declarative YAML with schema validation | Configuration drift detection |
| Metric accuracy | Prometheus-compatible metrics with counter monotonicity | Metric audit procedures |

---

## 4. Error Handling

### 4.1 Error Classification

| Error Type | Response | Logging | Alert |
|-----------|----------|---------|-------|
| **Invalid input** | 400 Bad Request | Structured JSON | No |
| **Authentication failure** | 401 Unauthorized | Structured JSON + source IP | If >10/min per IP |
| **Authorization failure** | 403 Forbidden | Structured JSON + policy evaluation | If >10/min per user |
| **Rate limit exceeded** | 429 Too Many Requests | Structured JSON + tier info | If sustained >5 min |
| **License invalid** | 403 Forbidden (grace period: 7 days) | Structured JSON + license metadata | Immediate |
| **Internal error** | 500 Internal Server Error | Structured JSON + stack trace (internal only) | Immediate |
| **Security violation** | 403 Forbidden + log | Structured JSON + threat classification | Immediate |

### 4.2 Fail-Closed Architecture

AegisGate processes every request through a security-first pipeline:

```
Request → License Check → AuthN → AuthZ → Rate Limit → Scanner → Compliance → MCP Guardrails → Response
```

If any step fails, encounters an error, or produces unexpected output, the request is **rejected** — never silently allowed. This applies to:

- Missing or invalid authentication headers → 403 Forbidden
- Unregistered compliance framework → Error + fail
- Invalid or expired license key → 403 Forbidden (7-day grace period)
- Nil or missing security handler → Deny by default
- Internal panic → Recover + deny + log
- MCP session validation failure → Session terminated + audit

### 4.3 Data Reconciliation

| Reconciliation | Frequency | Method | Exception Handling |
|---------------|-----------|--------|-------------------|
| Audit log chain integrity | Every 1,000 entries | SHA-256 chain verification | Alert + quarantine affected entries |
| Compliance engine state | On startup + every 5 minutes | Framework registration count vs expected | Alert + fail-closed |
| License validation | Every request | ECDSA P-256 signature verification | 7-day grace period, then fail-closed |
| Scanner pattern count | On startup | Pattern count vs expected (176) | Alert + degraded mode |
| Rate limit counter accuracy | Every request | Atomic counter increment | Over-limit → 429 |

---

## 5. Processing Integrity by Tier

| Control | Community | Developer | Professional | Enterprise |
|---------|-----------|-----------|---------------|------------|
| Input validation | ✅ | ✅ | ✅ | ✅ |
| Fail-closed processing | ✅ | ✅ | ✅ | ✅ |
| Bidirectional scanning | ✅ | ✅ | ✅ | ✅ |
| Hash-chained audit logs | ✅ | ✅ | ✅ | ✅ |
| Compliance engine (frameworks) | ATLAS, NIST, OWASP | + Full | + Full | + Custom |
| Trust attestation | — | — | ✅ | ✅ |
| Processing integrity reports | — | Standard | Full | Custom |

---

## 6. Monitoring and Reporting

### 6.1 Automated Monitoring

| Metric | Collection Method | Alert Threshold |
|--------|-------------------|-----------------|
| Processing error rate | Structured log analysis | >0.1% of requests |
| Scanner false positive rate | Manual sampling + feedback loop | >5% of flagged requests |
| Rate limit rejection rate | Rate limit headers | >10% of requests |
| Audit log chain breaks | Periodic integrity check | Any break |
| License validation failures | License check logging | >0 (grace period excluded) |

### 6.2 Processing Integrity Reports

| Report | Frequency | Available To |
|--------|-----------|-------------|
| Compliance status summary | On demand via API | All tiers |
| Processing volume and error rates | Daily | Developer+ |
| Detailed processing integrity audit | Monthly | Professional+ |
| Custom processing integrity metrics | On demand | Enterprise |

---

## 7. Subprocessor Processing Integrity

| Subprocessor | Processing Role | Integrity Controls | Data Accessed |
|-------------|----------------|-------------------|---------------|
| **Cloudflare** | CDN, DDoS protection | SOC 2 Type II, ISO 27001 | DNS queries, edge traffic metadata |
| **Netlify** | Website hosting, CI/CD | SOC 2 Type II | Static website assets |
| **GitHub** | Source code hosting, CI/CD | SOC 2 Type II, ISO 27001 | Source code, CI artifacts |
| **Stripe** | Payment processing | SOC 2 Type II, PCI-DSS Level 1 | Tokenized payment data |

AegisGate's self-hosted architecture ensures subprocessors never process customer Platform data. All customer data remains on customer-controlled infrastructure.

---

## Attestation

This document was reviewed and approved by:

| Role | Name | Date |
|------|------|------|
| VP Engineering | AegisGate Security, LLC | 2026-07-29 |
| Security Lead | AegisGate Security, LLC | 2026-07-29 |