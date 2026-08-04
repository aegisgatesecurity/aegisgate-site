# AegisGate Corporate Website — Site Architecture

**Last Updated:** 2026-08-03  
**Status:** Production-ready, security-hardened

---

## 🏗️ Architecture Overview

This Hugo site uses a **full override pattern** — all critical files are in the site root, completely overriding the (now-deprecated) theme. This was done intentionally for:

- **Clear ownership** — all active code is in one place
- **No hidden inheritance** — what you see is what you get
- **Easier maintenance** — no need to check theme + site for conflicts

---

## 📁 Active File Structure

```
aegisgate-site/
├── hugo.toml                 # Main config (version, menus, params)
├── netlify.toml              # Build config + SECURITY HEADERS
├── _redirects                # Netlify redirects (demo → external)
│
├── content/                  # Markdown content
│   ├── _index.md            # Homepage (main landing page)
│   ├── docs/                # Documentation pages
│   ├── blog/                # Blog posts
│   ├── pricing/             # Pricing page
│   └── ...                  # Other content pages
│
├── layouts/                  # Hugo templates (ALL active)
│   ├── _default/
│   │   ├── baseof.html      # Base HTML template (security headers, SRI, fonts)
│   │   ├── home.html        # Homepage wrapper
│   │   ├── single.html      # Default single page
│   │   └── list.html        # List pages
│   ├── partials/
│   │   ├── header.html      # Navigation (custom, not from theme)
│   │   ├── footer.html      # Footer with legal links
│   │   └── docs-sidebar.html # Documentation sidebar
│   └── shortcodes/          # Custom shortcodes (terminal, mermaid, eu-flag)
│
├── assets/                   # Processed assets (Hugo pipes)
│   ├── css/
│   │   └── main.css         # Main stylesheet (787 lines, Space Grotesk + Inter)
│   └── js/
│       └── mermaid-init.js  # Mermaid diagram initialization
│
├── static/                   # Static files (copied as-is)
│   ├── favicon.svg          # Primary favicon (677 bytes, scalable)
│   ├── favicon-16.png       # Fallback 16x16
│   ├── favicon-32.png       # Fallback 32x32
│   ├── favicon-64.png       # Apple touch icon
│   ├── favicon.png          # Legacy (912KB, keep for backward compat)
│   ├── logo.png             # Logo image
│   ├── images/              # Other images
│   └── .well-known/         # Security files (security.txt, etc.)
│
└── themes/
    └── aegisgate-deprecated-YYYYMMDD/  # Backed-up theme (NOT USED)
```

---

## 🔒 Security Hardening

### Headers (set in `netlify.toml` for production, mirrored in `baseof.html` for dev)

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | `default-src 'self'; ...` | Prevents XSS, injection attacks |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forces HTTPS |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer leakage |
| `Permissions-Policy` | `geolocation=(), microphone=(), ...` | Disables unnecessary browser features |
| `Cross-Origin-*` | Various | Isolates from other origins |

### Subresource Integrity (SRI)

All CDN resources include SRI hashes:
```html
<script 
  src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js" 
  integrity="sha384-qX9VvWkP79m/O121ZE6sOYp0nf/pldQgtvWDbkpzi+3mUo4Wn4Ix4cFzNPay3VaB" 
  crossorigin="anonymous"
></script>
```

### Font Loading

- Preconnected to Google Fonts
- Preloaded CSS
- `display=swap` for performance
- Self-hosted alternative considered (not implemented yet)

---

## 🎨 Design System

### Typography
- **Headings:** Space Grotesk (400, 500, 600, 700)
- **Body:** Inter (300, 400, 500, 600, 700)
- **Code:** JetBrains Mono, Fira Code, SF Mono (system fallback)

### Color Palette
```css
--bg-primary: #0a0c10       /* Deep space blue */
--bg-secondary: #11141d     /* Card background */
--bg-tertiary: #1a1f2e      /* Elevated surfaces */
--primary: #38bdf8          /* Cyan (trust, security) */
--secondary: #10b981        /* Emerald (success, safety) */
--accent: #f43f5e           /* Rose (warnings, critical) */
```

### Components
- **Cards:** Glass morphism with hover lift + glow
- **CTAs:** Gradient primary, outlined secondary
- **Navigation:** Fixed, blurred backdrop, compact
- **Badges:** Small uppercase labels for features

---

## 🚀 Performance Optimizations

| Optimization | Status | Impact |
|--------------|--------|--------|
| Minified CSS | ✅ | Reduces 787 lines → ~25KB |
| Font preloading | ✅ | Eliminates FOUT, faster render |
| SVG favicon | ✅ | 677 bytes vs 912KB PNG |
| Deferred scripts | ✅ | Non-blocking JS execution |
| SRI hashes | ✅ | Security + cache validation |
| Lazy images | ⏳ | Future enhancement |
| Critical CSS inline | ⏳ | Future enhancement |

---

## 🛠️ Development Workflow

### Local Development
```bash
cd /home/chaos/Desktop/AegisGate/websites/aegisgate-site
hugo server --port 1313 --disableFastRender
# Open http://localhost:1313
```

### Production Build
```bash
hugo --minify --gc --environment production
# Output: public/
# Deploy: Netlify auto-deploys from git
```

### Security Audit Checklist
- [ ] Run `npx audit-ci` or similar
- [ ] Check CSP with browser dev tools
- [ ] Verify HSTS header
- [ ] Test clickjacking protection
- [ ] Validate SRI hashes after CDN updates

---

## 📝 Historical Context

**Why the full override?**

The original theme (`themes/aegisgate/`) was a skeleton that required complete overrides for:
- Custom navigation structure
- Security-focused design language
- Compliance badge integration
- Complex comparison tables

Rather than maintain parallel files (theme + override), we consolidated everything into the site root for clarity.

**Theme backup:** `themes/aegisgate-deprecated-YYYYMMDD/` preserved for reference.

---

## 🔗 Related Documentation

- [SESSION-HANDOFF-2026-08-02-v362-RELEASED.md](../../consolidated/aegisgate-platform/plans/)
- [Frontend Design Skill](../../consolidated/aegisgate-platform/skills/frontend-design/)
- [Netlify Security Headers Guide](https://docs.netlify.com/routing/headers/)
