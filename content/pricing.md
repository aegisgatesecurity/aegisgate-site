---
title: "Pricing"
description: "Simple, transparent pricing for every team size - from solo developers to enterprise"
type: pricing
---

<div class="alert alert-success alert-center" style="background:#0d2538;border-color:#38bdf8;color:#fff;margin-bottom:24px;">
<strong>🛡️ AegisGate Lens — Free, forever.</strong> The same security team builds a free, privacy-first Chrome extension that protects users across 6 AI providers (ChatGPT, Claude, Gemini, Copilot, duck.ai, Perplexity) with 6-facet detection. <a href="/lens/" style="color:#38bdf8;">Learn more</a> · <a href="/lens/compare/" style="color:#38bdf8;">Lens vs Platform</a> · <a href="https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjdjfdhiggaomoafnhagfcjip" style="color:#38bdf8;">Install from Chrome Web Store</a>
</div>

Simple, transparent pricing. No hidden fees. Start free, upgrade when you are ready.

## 📚 Customer 1-pagers

These 1-pagers explain the technical depth behind each tier and module for sales engineers, security architects, and procurement teams. They follow the established pattern of being self-attested (we engineer the scanner; a Notified Body or counsel provides the certification / legal opinion).

| 1-pager | What it explains |
|---------|------------------|
| **[Trust Framework 1-pager](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/trust-framework.md)** | The 6th pillar (per-agent identity, capability contracts, real-time trust scoring, signed attestations) |
| **[Federated IOC Library 1-pager](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/federated-ioc-library-1pager.md)** | "1 customer's threat = all AegisGate customers protected" — the network effect |
| **[EU AI Act 1-pager](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/compliance/eu-ai-act.md)** | The 7th compliance framework (82 controls, 9 automated) |
| **[Lens → Platform Upsell 1-pager](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/lens-to-platform-upsell.md)** | The 4-stage conversion funnel (individual → team → POC → production) |
| **[Case Study: Series-B SaaS + SOC 2 with Trust Framework](/blog/case-study-series-b-saas-soc2-with-trust-framework/)** | How a 200-person Series-B SaaS passed SOC 2 Type II in 90 days using AegisGate |

The case study is **representative**, not a real customer. It is built from anonymized patterns across multiple AegisGate customers. We publish composite case studies to illustrate the value of AegisGate for a customer segment without disclosing customer information.

<div class="pricing-availability-notice">
<strong>📌 Currently available for purchase:</strong> Community (free), Developer ($79/mo).
<strong>Hidden pending v3.4.0 + legal review:</strong> Professional tier and the 6 compliance modules (HIPAA, PCI-DSS, SOC 2, ISO 42001, FedRAMP, FIPS).
For early access to hidden plans, <a href="mailto:sales@aegisgatesecurity.io">contact sales</a>.
</div>

<div class="legal-acceptance-notice">
<strong>By purchasing a subscription or add-on, you agree to the
<a href="/legal/terms/">Terms of Service</a> and
<a href="/legal/privacy/">Privacy Policy</a>.</strong>
The current ToS version (v2.0 DRAFT, 2026-06-07) is recorded at purchase for audit purposes. Beta program participants additionally agree to the <a href="/legal/beta-agreement/">Beta User Agreement</a>.
</div>

<script async src="https://js.stripe.com/v3/buy-button.js"></script>

<div class="pricing-cards">

<div class="pricing-card">
<h3>Community</h3>
<div class="price">Free <span>forever</span></div>
<p>Free forever: Lens browser extension + Platform server-side protection with 5 compliance frameworks.</p>
<ul>
<li>Unlimited proxy RPM (soft-throttle)</li>
<li>5 concurrent users</li>
<li>144+ security detection patterns</li>
<li>8 MCP guardrails</li>
<li>8 A2A guardrails (mTLS, HMAC, capabilities, rate limiting)</li>
<li>MITRE ATLAS (66 techniques)</li>
<li>NIST AI RMF support</li>
<li>OWASP LLM Top 10</li>
<li>Built-in Certificate Authority</li>
<li>7-day audit log retention</li>
<li>Community support (GitHub Issues)</li>
</ul>
<a href="/docs/getting-started/" class="btn btn-primary">Get Started</a>
</div>

</div>

<div class="pricing-card">
<h3>Developer</h3>
<div class="price">$79 <span>/month</span></div>
<p>For teams building AI-powered applications that need compliance coverage.</p>
<ul>
<li>1,000 proxy RPM / 500 MCP RPM</li>
<li>25 concurrent users</li>
<li>Everything in Community, plus:</li>
<li>mTLS authentication (proxy + A2A)</li>
<li>A2A capability persistence</li>
<li>Full GDPR and HIPAA compliance</li>
<li>PCI-DSS compliance</li>
<li>SOC2 compliance module</li>
<li>Advanced ML anomaly detection</li>
<li>Code execution sandbox</li>
<li>Grafana integration</li>
<li>Priority email support</li>
</ul>
<div class="pricing-buttons">
<stripe-buy-button
  buy-button-id="buy_btn_1TezBqK2DQfk64XN7Y79VYM7"
  publishable-key="pk_live_51TT0vSK2DQfk64XNCkz1nS9rVZEZyUQXUtpS4aylNiMlTqo53fQ0vhif7wskRXnx3GB5o1jMZfAfcAqmB8po1QWI00cIxRUy9u"
>
</stripe-buy-button>
<stripe-buy-button
  buy-button-id="buy_btn_1TezDrK2DQfk64XNjhDhfBDO"
  publishable-key="pk_live_51TT0vSK2DQfk64XNCkz1nS9rVZEZyUQXUtpS4aylNiMlTqo53fQ0vhif7wskRXnx3GB5o1jMZfAfcAqmB8po1QWI00cIxRUy9u"
>
</stripe-buy-button>
<p class="price-note">Monthly or annual (Save 20%)</p>
</div>
</div>

<div class="pricing-card professional">
<h3>Professional</h3>
<div class="price">$499 <span>/month</span></div>
<p>For teams with serious security and compliance requirements.</p>
<ul>
<li>10,000 proxy RPM / 5,000 MCP RPM</li>
<li>100 concurrent users</li>
<li>Everything in Developer, plus:</li>
<li>A2A agent registry & trust scoring</li>
<li>A2A task-level ACLs</li>
<li>A2A artifact validation</li>
<li><strong>Trust Framework (6th pillar)</strong> — per-agent identity, capability contracts, real-time trust scoring, signed attestations. <a href="https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/trust-framework.md" style="color:#00ADD8">Read the 1-pager</a></li>
<li><strong>Federated IOC library</strong> — opt-in sharing of detected threats. <a href="https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/docs/federated-ioc-library-1pager.md" style="color:#00ADD8">Read the 1-pager</a></li>
<li>ISO 27001 compliance</li>
<li>ISO 42001 AI compliance</li>
<li>SOC2 Type II</li>
<li>Custom RBAC policy engine</li>
<li>Department separation</li>
<li>Kubernetes and Helm deployment</li>
<li>Process-level MCP sandboxing</li>
<li>Priority support</li>
</ul>
<div class="pricing-buttons">
<div class="coming-soon">
  <strong>Targeting Q4 2026 (was v3.4.0 + legal review)</strong>
  <p>The Professional tier is currently hidden pending production-grade legal review and the v3.4.0 security pentest. <a href="mailto:sales@aegisgatesecurity.io">Contact sales</a> for early access or to join the waitlist.</p>
</div>
</div>
</div>

<div class="pricing-card enterprise">
<h3>Enterprise</h3>
<div class="price">Custom <span>pricing</span></div>
<p>For large organizations with custom requirements.</p>
<ul>
<li>Unlimited proxy RPM / MCP RPM</li>
<li>Unlimited concurrent users</li>
<li>Everything in Professional, plus:</li>
<li>Dedicated infrastructure</li>
<li>Custom SLA and support tier</li>
<li>On-premise deployment option</li>
<li>White-label options</li>
<li>Dedicated account manager</li>
<li>Custom integrations</li>
</ul>
<a href="mailto:sales@aegisgatesecurity.io" class="btn btn-primary">Contact Sales</a>
</div>

</div>

## Compliance Modules (Add-ons)

Add individual compliance modules to any paid tier. Modules are billed separately
and can be turned on or off at any time from the customer portal.

<div class="module-grid">

<div class="module-card">
<h4>HIPAA</h4>
<div class="module-price">$99 <span>/month</span></div>
<p class="module-tier">Requires Developer tier or above</p>
<p>HIPAA-compliant logging, PHI detection, Business Associate Agreement (BAA) support.</p>
<div class="module-buttons">
<div class="coming-soon">
  <strong>Targeting Q4 2026 (was v3.4.0 + legal review)</strong>
  <p>The HIPAA module is currently hidden pending production-grade legal review and the v3.4.0 security pentest. <a href="mailto:sales@aegisgatesecurity.io">Contact sales</a> for early access.</p>
</div>
</div>
</div>

<div class="module-card">
<h4>PCI-DSS</h4>
<div class="module-price">$99 <span>/month</span></div>
<p class="module-tier">Requires Developer tier or above</p>
<p>Payment card data detection, PCI-scoped audit logs, card data tokenization.</p>
<div class="module-buttons">
<div class="coming-soon">
  <strong>Targeting Q4 2026 (was v3.4.0 + legal review)</strong>
  <p>The PCI-DSS module is currently hidden pending production-grade legal review and the v3.4.0 security pentest. <a href="mailto:sales@aegisgatesecurity.io">Contact sales</a> for early access.</p>
</div>
</div>
</div>

<div class="module-card">
<h4>SOC 2</h4>
<div class="module-price">$149 <span>/month</span></div>
<p class="module-tier">Requires Developer tier or above</p>
<p><strong>8 controls across 4 categories</strong> of AICPA Trust Services Criteria (CC6.x Security, PI1 Processing Integrity, C1 Confidentiality, AI controls). 5 of 8 controls are automated (CC6.1 access control, CC6.2 ML environment, CC6.3 data protection, CC6.6 audit logging, CC6.7 transmission security). <a href="https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/pkg/compliance/soc2/" style="color:#00ADD8">See the implementation</a> for the full control-to-check mapping.</p>
<div class="module-buttons">
<div class="coming-soon">
  <strong>Targeting Q4 2026 (was v3.4.0 + legal review)</strong>
  <p>The SOC 2 module is currently hidden pending production-grade legal review and the v3.4.0 security pentest. <a href="mailto:sales@aegisgatesecurity.io">Contact sales</a> for early access.</p>
</div>
</div>
</div>

<div class="module-card">
<h4>ISO 42001</h4>
<div class="module-price">$79 <span>/month</span></div>
<p class="module-tier">Requires Professional tier or above</p>
<p><strong>8 controls across 5 ISO 42001 clauses</strong> (4 Context, 5 Leadership, 6 Planning, 7 Support, 8 Operation, 9 Performance Evaluation, AI extension). 5 of 8 controls are automated (5.2 AI policy, 6.1 risk assessment, 7.5 documented info, 8.2 risk treatment, 9.1 monitoring). <a href="https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/pkg/compliance/iso42001/" style="color:#00ADD8">See the implementation</a> for the full control-to-check mapping.</p>
<div class="module-buttons">
  <div class="coming-soon">
  <strong>Targeting Q4 2026 (was v3.4.0 + legal review)</strong>
  <p>The ISO 42001 module is currently hidden pending production-grade legal review and the v3.4.0 security pentest. <a href="mailto:sales@aegisgatesecurity.io">Contact sales</a> for early access.</p>
</div>
</div>
</div>

<div class="module-card">
<h4>FedRAMP</h4>
<div class="module-price">$499 <span>/month</span></div>
<p class="module-tier">Requires Professional tier or above</p>
<p>FedRAMP Moderate/High control mapping, continuous monitoring evidence.</p>
<div class="module-buttons">
  <div class="coming-soon">
  <strong>Targeting Q4 2026 (was v3.4.0 + legal review)</strong>
  <p>The FedRAMP module is currently hidden pending production-grade legal review and the v3.4.0 security pentest. <a href="mailto:sales@aegisgatesecurity.io">Contact sales</a> for early access.</p>
</div>
</div>
</div>

<div class="module-card">
<h4>FIPS 140-2/140-3</h4>
<div class="module-price">$299 <span>/month</span></div>
<p class="module-tier">Requires Professional tier or above</p>
<p><strong>10 controls across 5 FIPS 140 areas</strong> (Cryptographic Module Specification, Ports/Interfaces, Roles/Services/Auth, Software Security, Operational Environment). 8 of 10 controls are automated (mode enabled, approved ciphers, TLS 1.2+, approved hashes, key sizes, self-test, audit logging). 2 are manual (CMVP, HSM). <a href="https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/pkg/compliance/fips/" style="color:#00ADD8">See the implementation</a>. <em>Note: AegisGate is FIPS-compliant (uses FIPS-approved algorithms) but the Go runtime is not CMVP-validated. Federal agencies need a CMVP-validated execution environment.</em></p>
<div class="module-buttons">
  <div class="coming-soon">
  <strong>Targeting Q4 2026 (was v3.4.0 + legal review)</strong>
  <p>The FIPS 140-2/140-3 module is currently hidden pending production-grade legal review and the v3.4.0 security pentest. <a href="mailto:sales@aegisgatesecurity.io">Contact sales</a> for early access.</p>
</div>
</div>
</div>

</div>

<style>
.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin: 40px 0;
}
.pricing-card {
  background: #1a1a2e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
}
.pricing-card h3 {
  color: #00ADD8;
  margin-bottom: 20px;
}
.pricing-card .price {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin: 20px 0;
}
.pricing-card .price span {
  font-size: 18px;
  color: #888;
}
.pricing-card ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
}
.pricing-card li {
  padding: 8px 0;
  color: #ccc;
  border-bottom: 1px solid #333;
}
.pricing-buttons {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
.pricing-buttons stripe-buy-button {
  display: block;
}
.price-note {
  font-size: 12px;
  color: #888;
  margin: 8px 0 0 0;
}
.price-note-upcoming {
  font-size: 12px;
  color: #ffaa00;
  margin: 8px 0 0 0;
  padding: 8px;
  background: rgba(255, 170, 0, 0.1);
  border-radius: 4px;
}
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  margin: 4px 0;
}
.btn-primary {
  background: #00ADD8;
  color: #000;
}
.btn-primary:hover {
  background: #00c4e8;
}
.btn-secondary {
  background: #333;
  color: #fff;
}
.btn-secondary:hover {
  background: #444;
}
.btn-ghost {
  background: transparent;
  color: #00ADD8;
  border: 1px solid #00ADD8;
}

/* Module grid: 3 across on desktop, 2 on tablet, 1 on mobile.
   Cards are wide enough that the Stripe Buy Button fits without overflow.
   v3.2.0: pinned layout (was auto-fit minmax(240px) which made cards too
   narrow for the buy button on small desktops). */
.module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 30px 0;
}
@media (max-width: 900px) {
  .module-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .module-grid { grid-template-columns: 1fr; }
}
.module-card {
  background: #1a1a2e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.module-card h4 {
  color: #00ADD8;
  margin: 0 0 12px 0;
  font-size: 20px;
}
.module-price {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin: 8px 0;
}
.module-price span {
  font-size: 14px;
  color: #888;
}
.module-tier {
  font-size: 12px;
  color: #aaa;
  margin: 4px 0 12px 0;
  font-style: italic;
}
.module-card p {
  color: #ccc;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  flex: 1;
}
/* Module buy button container: forces the <stripe-buy-button> custom element
   to fill the card width. The custom element renders an inline-block at its
   intrinsic width by default; we override with display:block + width:100% so
   it stretches to the card padding box and stays inside the border. */
.module-buttons {
  display: block;
  width: 100%;
  margin-top: auto;
  padding-top: 8px;
}
.module-buttons stripe-buy-button {
  display: block;
  width: 100%;
  max-width: 100%;
}
/* Pricing-availability notice (v3.3.0): explains which tiers and modules
   are live and which are hidden pending legal review and pentest completion.
   Sits above the legal-acceptance-notice so it's the first thing the user
   sees before scrolling to the buy buttons. */
.pricing-availability-notice {
  background: rgba(0, 173, 216, 0.1);
  border-left: 4px solid #00ADD8;
  padding: 12px 16px;
  margin: 0 0 16px 0;
  color: #ccc;
  font-size: 14px;
  line-height: 1.6;
  border-radius: 0 4px 4px 0;
}
.pricing-availability-notice strong {
  color: #fff;
}
.pricing-availability-notice a {
  color: #00ADD8;
  text-decoration: underline;
}
.pricing-availability-notice a:hover {
  color: #5cc8e6;
}
.legal-acceptance-notice {
  background: rgba(255, 248, 225, 0.1);
  border-left: 4px solid #f0ad4e;
  padding: 12px 16px;
  margin: 0 0 24px 0;
  color: #ccc;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 0 4px 4px 0;
}
.legal-acceptance-notice strong {
  color: #fff;
}
.legal-acceptance-notice a {
  color: #00ADD8;
  text-decoration: underline;
}
.legal-acceptance-notice a:hover {
  color: #5cc8e6;
}
/* Coming-soon placeholder for plans/modules hidden pending legal review
   and pentest completion. v3.4.0: Developer tier is live and
   sellable today. Professional tier and the 6 compliance modules are hidden
   until production-grade legal review and the v3.4.0 security pentest. */
.pricing-buttons .coming-soon,
.module-buttons .coming-soon {
  display: block;
  width: 100%;
  padding: 16px;
  background: rgba(255, 248, 225, 0.08);
  border: 1px dashed #f0ad4e;
  border-radius: 4px;
  text-align: center;
  color: #ccc;
}
.pricing-buttons .coming-soon strong,
.module-buttons .coming-soon strong {
  display: block;
  color: #f0ad4e;
  font-size: 14px;
  margin-bottom: 6px;
}
.pricing-buttons .coming-soon p,
.module-buttons .coming-soon p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #aaa;
}
.pricing-buttons .coming-soon a,
.module-buttons .coming-soon a {
  color: #00ADD8;
  text-decoration: underline;
}
</style>
