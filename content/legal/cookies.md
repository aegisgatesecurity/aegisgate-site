---
title: "Cookie Policy"
description: "How AegisGate Security, LLC uses cookies and tracking technologies. Effective 2026-06-07. 2.0 DRAFT for v3.5.0."
type: "legal-doc"
---

<div class="alert alert-warning" style="border-left: 4px solid #f0ad4e; padding: 16px; margin-bottom: 24px; background: #fff8e1;">
<strong>📋 DRAFT — Not Legal Advice</strong><br>
This document is self-drafted by AegisGate Security, LLC for the v3.5.0 release. AegisGate Security, LLC is not a law firm, and this document does not constitute legal advice. Production-grade review by qualified legal counsel is deferred to v3.5.0+ when budget is available. Until then, customers and end users should rely on this document at their own risk and consult their own legal counsel.
</div>

# Cookie Policy

**Effective Date:** 2026-06-07
**Version:** 2.0 DRAFT (v3.5.0)
**Last Updated:** 2026-06-07

---

## 1. What Are Cookies?

Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies may be set by the website you are visiting ("first-party cookies") or by a third party ("third-party cookies").

We use cookies for a small, specific set of purposes described below. We do **not** use cookies for advertising, cross-site tracking, or behavioral profiling.

## 2. How We Use Cookies

We use cookies for the following purposes:

- **Authentication** — to keep you signed in to the AegisGate management UI / dashboard.
- **Security** — to detect and prevent fraudulent or malicious activity (e.g., session hijacking, bot detection).
- **Preferences** — to remember your settings, such as your preferred language or theme.
- **Analytics** (marketing site only) — none. We do not use Google Analytics, Facebook Pixel, or any third-party analytics on aegisgatesecurity.io. Netlify Analytics is used at the infrastructure level and is cookieless.

## 3. Cookies Used on the AegisGate Platform

The following cookies are set by the AegisGate Security Platform itself (when you run the platform in your own environment or use the hosted beta). These cookies are required for the platform to function.

| Cookie Name | Provider | Type | Duration | Purpose |
|---|---|---|---|---|
| `aegisgate_session` | AegisGate Security Platform | First-party HTTP cookie (essential) | Session | Authentication session identifier. Set when you sign in to the platform's management UI. |
| `csrf_token` | AegisGate Security Platform | First-party HTTP cookie (essential) | Session | CSRF protection token. Set automatically; not visible to the user. |
| `_dd_s` | Datadog (when APM is enabled) | First-party HTTP cookie (analytics) | 2 years (rolling) | Session aggregation for Datadog Real User Monitoring. **Only set if the platform operator has enabled Datadog APM** in their `aegisgate.yaml` configuration. |
| `_ddgid` | Datadog (when APM is enabled) | First-party HTTP cookie (analytics) | 24 hours | Granular session ID for Datadog RUM. **Only set if Datadog APM is enabled.** |

**Self-hosters:** Datadog cookies are set only if you explicitly enable Datadog APM in your `aegisgate.yaml`. By default, the platform does not contact Datadog and does not set these cookies.

## 4. Third-Party Cookies

### 4.1 Cloudflare (aegisgatesecurity.io only)

Cloudflare provides the CDN and DDoS protection for the marketing site. Cloudflare may set its own cookies for security and bot-detection purposes. Cloudflare's cookies are used at the network level and are governed by Cloudflare's privacy policy.

- **Privacy Policy:** https://www.cloudflare.com/privacypolicy/
- **Cookie details:** https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cookies/

### 4.2 Netlify (aegisgatesecurity.io only)

Netlify hosts the marketing site as a static site. Netlify's hosting itself does not set cookies. Netlify Analytics is cookieless (server-side log analysis). If you sign in to the Netlify Identity widget (CMS preview, etc.), Netlify may set authentication cookies.

- **Privacy Policy:** https://www.netlify.com/privacy/
- **Cookie details:** https://docs.netlify.com/manage/accounts/cookies/

### 4.3 GitHub (github.com/aegisgatesecurity/* only)

The AegisGate platform's source code is hosted on GitHub. Visiting github.com is governed by GitHub's privacy policy and cookie practices; this is not a part of the AegisGate platform.

- **Privacy Policy:** https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement

### 4.4 Stripe (pricing page, only when interacting with a Buy Button)

When you click a "Buy" button on the pricing page, Stripe's payment widget loads in an iframe or popup. Stripe may set its own cookies for fraud detection and payment processing during the buy interaction. These cookies are set by Stripe, not by AegisGate, and are governed by Stripe's privacy policy.

- **Privacy Policy:** https://stripe.com/privacy
- **Cookie details:** https://stripe.com/legal/cookies-policy

**Note:** The AegisGate platform itself does **not** embed Stripe.js. Stripe integration is limited to the marketing site's Buy Buttons and the post-purchase webhook (server-side).

## 5. Your Choices Regarding Cookies

### 5.1 Cookie Consent Banner
When you first visit aegisgatesecurity.io, a cookie consent banner will appear allowing you to:
- **Accept All** — consent to all cookie categories (essential, analytics, functional)
- **Reject All** — consent to essential cookies only (required for authentication and security)
- **Customize** — choose which non-essential categories to enable

Your choice is stored in your browser's `localStorage` (not a cookie) and persists until you clear your browser data. You can change your preferences at any time by clicking **"Manage Cookies"** in the site footer.

### 5.2 Browser Controls
Most web browsers allow you to control cookies through their settings. You can set your browser to:
- Block all cookies
- Block only third-party cookies
- Delete cookies when you close your browser
- Notify you before a cookie is set

**Note:** Blocking essential cookies (e.g., `aegisgate_session`, `csrf_token`) will prevent you from using the AegisGate platform's management UI.

Browser-specific opt-out instructions:
- **Chrome:** Settings → Privacy and Security → Cookies and other site data
- **Firefox:** Settings → Privacy & Security → Cookies and Site Data
- **Safari:** Preferences → Privacy → Cookies and website data
- **Edge:** Settings → Cookies and site permissions → Cookies and site data

### 5.3 Global Privacy Control (GPC)
We honor the **Global Privacy Control (GPC)** signal. If your browser sends a GPC header, we treat it as a valid opt-out of any non-essential cookies. The AegisGate platform's cookie banner does not appear for visitors sending GPC, and any non-essential cookies are suppressed.

### 5.4 Do Not Track (DNT)
We honor the legacy Do Not Track (DNT) signal from your browser in the same way as GPC.

## 6. Updates to This Policy

We may update this Cookie Policy from time to time. The most current version is always available at https://aegisgatesecurity.io/legal/cookies.

Material changes will be communicated via:
- The cookie consent banner will reappear, requiring renewed consent
- A notice on aegisgatesecurity.io for at least 30 days
- An email to active subscribers for changes affecting platform cookies

**Last Updated:** 2026-06-07

## 7. Contact Us

If you have questions about our use of cookies, contact us at:

**AegisGate Security, LLC**
**Email:** privacy@aegisgatesecurity.io
**Website:** https://aegisgatesecurity.io/contact

---

*— Counsel Sign-Off Required —*

*This document is a 2.0 DRAFT for the v3.5.0 release. When budget is available, AegisGate Security, LLC will engage qualified counsel to review this Cookie Policy and convert it from a self-drafted DRAFT to a production-grade legal document. Until then, customers and end users should rely on this document at their own risk and consult their own legal counsel.*

*Cookie list reflects the platform's documented behavior as of v3.3.0 (2026-06-07). Self-hosters with custom `aegisgate.yaml` configurations may set additional cookies beyond what is listed here; consult your deployment configuration for the actual cookie footprint in your environment.*
