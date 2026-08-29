---
title: "Vulnerability Disclosure Policy"
description: "How to report security vulnerabilities in AegisGate products. We follow RFC 9116 and offer coordinated disclosure with a 90-day timeline."
type: "security"
date: 2026-07-29
layout: single
---

# Vulnerability Disclosure Policy

**Last updated:** 2026-07-29
**Policy owner:** AegisGate Security, LLC
**Contact:** security@aegisgatesecurity.io
**PGP key:** [SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/SECURITY.md)

AegisGate Security, LLC takes security vulnerabilities seriously. This policy describes how to report vulnerabilities, what to expect, and our commitments to researchers.

---

## Our Commitments

1. **We will acknowledge** your report within 24 hours.
2. **We will triage** your report within 72 hours and provide an initial assessment.
3. **We will not pursue legal action** against researchers who follow this policy.
4. **We will credit** researchers in our security advisories (unless you request anonymity).
5. **We follow coordinated disclosure** with a 90-day timeline (see below).

---

## How to Report

### Option 1: Email (Preferred)

Send your report to **security@aegisgatesecurity.io**.

For sensitive reports, encrypt with our PGP key (fingerprint: `97C0 418A DBE0 5396`), available at:
- [GitHub SECURITY.md](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/SECURITY.md)
- [`.well-known/security.txt`](https://aegisgatesecurity.io/.well-known/security.txt) (per RFC 9116)

### Option 2: GitHub Security Advisory

For vulnerabilities in open-source repositories, use GitHub's private vulnerability reporting:
- [Platform: Report a vulnerability](https://github.com/aegisgatesecurity/aegisgate-platform/security/advisories/new)
- [Lens: Report a vulnerability](https://github.com/aegisgatesecurity/aegisgate-lens/security/advisories/new)

### Option 3: CVE-for-AI Feed

For AI-specific vulnerabilities (prompt injection, model manipulation, adversarial attacks), you may also submit via our [CVE-for-AI feed](/cve/). See [AEGIS-2026-0001](/cve/aegis-2026-0001/) for an example of how we publish AI vulnerability disclosures.

---

## What to Include

Please include as much of the following as possible:

| Item | Description |
|------|-------------|
| **Vulnerability description** | Clear description of the issue and its impact |
| **Affected product** | AegisGate Platform, Lens, or website |
| **Affected version** | Version number or commit hash |
| **Reproduction steps** | Step-by-step instructions to reproduce the issue |
| **Proof of concept** | Code, screenshots, or network traces demonstrating the vulnerability |
| **Impact assessment** | What an attacker could achieve (data access, privilege escalation, etc.) |
| **Suggested fix** | If you have ideas for how to fix the issue |
| **Your contact info** | Email, GitHub handle, or other preferred contact method |

---

## Scope

### In Scope

| Product | Scope |
|---------|-------|
| **AegisGate Platform** | All code in `aegisgate-platform` repository, including API, CLI, compliance modules, and Docker images |
| **AegisGate Lens** | All code in `aegisgate-lens` repository, including the browser extension and backend |
| **aegisgatesecurity.io** | The corporate website (Hugo static site) |
| **Infrastructure** | DNS, TLS certificates, and publicly accessible endpoints |

### Out of Scope

- Social engineering attacks against AegisGate employees or contractors
- Physical attacks against AegisGate infrastructure
- Denial of service attacks (we ask that you do not test these without prior authorization)
- Vulnerabilities in third-party services (Stripe, Cloudflare, Netlify, GitHub) — report these to the respective providers
- Issues in dependencies that are already known and have available patches
- Best practice issues (missing headers, verbose errors) without demonstrable security impact

---

## Coordinated Disclosure Timeline

We follow a **90-day coordinated disclosure timeline**:

| Day | Milestone |
|-----|-----------|
| **Day 0** | Vulnerability reported to security@aegisgatesecurity.io |
| **Day 1** | Acknowledgment sent to reporter |
| **Day 3** | Initial triage and severity assessment completed |
| **Day 7** | Fix developed and tested internally |
| **Day 14** | Fix released in a new version (for critical/high severity) |
| **Day 30** | Fix released (for medium/low severity) |
| **Day 90** | Public disclosure (if not already released) |

### Exceptions

- **Active exploitation:** If a vulnerability is being actively exploited, we may disclose earlier than 90 days to protect users.
- **Reporter request:** If the reporter requests a shorter or longer timeline, we will accommodate reasonable requests.
- **Complex fixes:** If a fix requires significant changes, we may extend the timeline with the reporter's agreement.

---

## Severity Classification

We use the [Common Vulnerability Scoring System (CVSS) v3.1](https://www.first.org/cvss/v3.1/specification-document):

| Severity | CVSS Range | Response Time | Example |
|----------|-----------|---------------|---------|
| **Critical** | 9.0–10.0 | 24 hours | Remote code execution without authentication |
| **High** | 7.0–8.9 | 72 hours | Privilege escalation, sensitive data exposure |
| **Medium** | 4.0–6.9 | 14 days | XSS with user interaction, CSRF |
| **Low** | 0.1–3.9 | 30 days | Information disclosure with limited impact |

---

## Safe Harbor

AegisGate Security, LLC considers research conducted under this policy to be **authorized testing** and will not pursue civil or criminal legal action against researchers who:

1. Act in good faith to identify and report vulnerabilities
2. Do not access, modify, or delete data belonging to others
3. Do not degrade or disrupt AegisGate services
4. Do not publicly disclose the vulnerability before the coordinated disclosure timeline expires
5. Provide AegisGate reasonable time to remediate the issue before public disclosure

---

## Bounty Program

AegisGate Security, LLC does not currently operate a paid bug bounty program. However, we are committed to:

- **Public credit** in our security advisories and CVE disclosures
- **Swag** (AegisGate-branded merchandise) for confirmed vulnerabilities
- **Early access** to new features for researchers who find significant vulnerabilities

If you are interested in a paid bounty program, please contact security@aegisgatesecurity.io. We are exploring options for a formal program.

---

## Supported Versions

| Product | Version | Support Status |
|---------|---------|---------------|
| **AegisGate Platform** | v4.1.x | ✅ Current release |
| **AegisGate Platform** | v4.0.x | ✅ Active support |
| **AegisGate Platform** | v4.1.x | ⚠️ Critical fixes only |
| **AegisGate Platform** | v3.5.x | ⛔ End of life |
| **AegisGate Platform** | v3.4.x | ⛔ End of life |
| **AegisGate Platform** | v3.3.x | ⛔ End of life |
| **AegisGate Rampart** | v0.6.2 | ✅ Current release |
| **AegisGate Lens** | v0.3.2 | ✅ Current release |
| **AegisGate Lens** | v0.3.2 | ⚠️ Critical fixes only |
| **AegisGate Lens** | v0.1.x | ⛔ End of life |

---

## CVE-for-AI Feed

AegisGate publishes AI-specific vulnerability disclosures through our CVE-for-AI feed at [/cve/](/cve/). This feed covers:

- Prompt injection vulnerabilities
- AI model manipulation
- Adversarial attacks against AI systems
- Training data poisoning
- Model extraction and data leakage

See [AEGIS-2026-0001](/cve/aegis-2026-0001/) for our first published advisory.

---

## Contact

| Channel | Purpose |
|---------|---------|
| **security@aegisgatesecurity.io** | Vulnerability reports (PGP-encrypted preferred) |
| [GitHub Security Advisory (Platform)](https://github.com/aegisgatesecurity/aegisgate-platform/security/advisories/new) | Open-source vulnerability reports |
| [GitHub Security Advisory (Lens)](https://github.com/aegisgatesecurity/aegisgate-lens/security/advisories/new) | Open-source vulnerability reports |
| **X/Twitter** | [@aegisgate](https://x.com/aegisgate) |
| **Mastodon** | [@aegisgate@mastodon.social](https://mastodon.social/@aegisgate) |

---

*AegisGate Security, LLC follows [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) for security.txt and vulnerability disclosure. Our security.txt is available at [aegisgatesecurity.io/.well-known/security.txt](https://aegisgatesecurity.io/.well-known/security.txt).*