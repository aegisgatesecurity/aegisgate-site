---
title: "AegisGate Lens — Terms of Service"
description: "Terms of Service for AegisGate Lens browser extension. Last updated 2026-07-29. Applies to v0.2.0 and later."
type: "docs"
weight: 4
---

# AegisGate Lens — Terms of Service

**Last updated**: 2026-07-29
**Effective for**: AegisGate Lens v0.2.0 and later
**Licensor:** AegisGate Security, LLC ("AegisGate", "we", "us")
**Licensee:** End user of the AegisGate Lens Chrome extension ("you", "your")

These Terms of Service ("ToS") govern your use of the AegisGate Lens Chrome browser extension. By installing or using the Lens, you agree to these ToS.

AegisGate Lens is **open-source software** licensed under the Apache License 2.0 (`LICENSE` in the repository). The Apache 2.0 license governs your rights to copy, modify, and redistribute the source code. **These ToS are separate from the Apache 2.0 license** and govern your **use** of the installed extension, not your rights to the source code.

---

## 1. Eligibility

You must be at least 13 years old (or the minimum age required by your jurisdiction) to install AegisGate Lens. The Lens is not directed to children under 13 and we do not knowingly collect any data from children under 13.

If you are entering into these ToS on behalf of a company or organization, you represent that you have the authority to bind that entity to these ToS.

## 2. License Grant

Subject to these ToS and the Apache 2.0 license, AegisGate grants you a non-exclusive, non-transferable, royalty-free license to install and use the AegisGate Lens browser extension for its intended purpose: detecting PII, secrets, XSS payloads, and compliance keywords in AI provider text inputs.

You may not:
- Use the Lens to violate any law or regulation
- Reverse-engineer, decompile, or disassemble the Lens for purposes not permitted by the Apache 2.0 license
- Use the Lens to develop a competing product without complying with the Apache 2.0 license terms
- Remove, alter, or obscure any proprietary notices on the Lens

## 3. Privacy

Your privacy is paramount. The Lens's privacy commitments are documented in our [Privacy Policy](/lens/privacy/) and in the [12 Privacy Non-Negotiables](https://github.com/aegisgatesecurity/aegisgate-lens/blob/v0.2.0/docs/PRIVACY-POLICY.md).

**Key commitments:**
- The Lens never sends prompt text, URLs, or page content to any server by default
- The Lens never collects user IDs, session IDs, or cookies
- Telemetry is opt-in, not opt-out
- Detection happens locally in your browser
- The full source code is auditable on GitHub (Apache 2.0)

## 4. Telemetry

The Lens's default mode is **Detect-only (Tier 0)**: zero network egress, zero data collection.

If you opt in to **false-positive reporting** (Tier 1), the Lens may send:
- Detection category (e.g., "pii_email", "secret_api_key")
- Pattern ID (e.g., "credit_card_visa_v1")
- Domain hash (SHA-256 prefix of the AI provider hostname, 16 hex characters, k-anonymous)

**The Lens never sends prompt text, URLs, page content, or personal identifiers at any opt-in level.**

## 5. Updates

AegisGate may release updates to the Lens through the Chrome Web Store. Updates may include security fixes, new detection patterns, and feature improvements. You may disable automatic updates through your browser settings, but we strongly recommend keeping the Lens updated for security reasons.

## 6. Disclaimers

THE LENS IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. AEGISGATE DOES NOT WARRANT THAT:

- THE LENS WILL DETECT ALL PII, SECRETS, XSS PAYLOADS, OR COMPLIANCE KEYWORDS
- THE LENS WILL BE ERROR-FREE, UNINTERRUPTED, OR SECURE
- THE RESULTS OBTAINED FROM THE USE OF THE LENS WILL BE ACCURATE OR RELIABLE
- THE LENS WILL MEET YOUR SPECIFIC REQUIREMENTS

YOU BEAR ALL RISK OF USE. THE LENS IS A DETECTION AID, NOT A GUARANTEE OF SECURITY OR COMPLIANCE.

## 7. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AEGISGATE SECURITY, LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:

- YOUR USE OF OR INABILITY TO USE THE LENS
- ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS OR ANY PERSONAL INFORMATION STORED THEREIN
- ANY INTERRUPTIONS OR CESSATION OF TRANSMISSION TO OR FROM THE LENS
- ANY BUGS, VIRUSES, OR SIMILAR HARMFUL CODE THAT MAY BE TRANSMITTED TO OR THROUGH THE LENS
- ANY ERRORS OR OMISSIONS IN THE LENS'S DETECTION CAPABILITIES

IN NO EVENT SHALL AEGISGATE'S TOTAL LIABILITY EXCEED ONE HUNDRED US DOLLARS ($100.00).

## 8. Indemnification

You agree to indemnify, defend, and hold harmless AegisGate Security, LLC and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Lens in violation of these ToS or any applicable law.

## 9. Termination

You may stop using the Lens at any time by uninstalling the browser extension.

AegisGate may terminate these ToS if you violate any term. Upon termination, you must uninstall the Lens and cease all use.

Sections 6 (Disclaimers), 7 (Limitation of Liability), 8 (Indemnification), and 10 (Governing Law) shall survive termination.

## 10. Governing Law

These ToS shall be governed by and construed in accordance with the laws of the State of Wisconsin, United States, without regard to its conflict of law provisions.

Any disputes arising under these ToS shall be resolved in the courts of the State of Wisconsin or the United States District Court for the Eastern District of Wisconsin.

## 11. Changes to These Terms

We may update these ToS from time to time. Material changes will be announced via:
- A notice on the [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- An update to the "Last updated" date on this page

Continued use of the Lens after changes take effect constitutes acceptance of the updated ToS.

## 12. Severability

If any provision of these ToS is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining provisions remain in full force and effect.

## 13. Entire Agreement

These ToS, together with the [Privacy Policy](/lens/privacy/) and the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0), constitute the entire agreement between you and AegisGate regarding the use of the Lens.

## 14. Contact

- **General questions:** [Lens GitHub Discussions](https://github.com/aegisgatesecurity/aegisgate-lens/issues)
- **Security disclosures:** security@aegisgatesecurity.io
- **Privacy:** privacy@aegisgatesecurity.io
- **Legal:** legal@aegisgatesecurity.io
- **X/Twitter:** [@aegisgate](https://x.com/aegisgate)
- **Mastodon:** [@aegisgate@mastodon.social](https://mastodon.social/@aegisgate)

---

*These Terms of Service are effective as of the Last Updated date above. AegisGate Security, LLC is a Wisconsin limited liability company.*