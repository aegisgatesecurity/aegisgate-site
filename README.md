# 📝 AegisGate Website — Setup & Workflow Guide

This document explains how to:

1. **Set up the website** (one-time setup)
2. **Edit content locally** (when working at your dev machine)
3. **Edit content via Sveltia CMS** (when away from your dev machine)
4. **Deploy to aegisgatesecurity.io** (automatic via Netlify)

---

## 🎯 Quick Reference

| Task | How |
|---|---|
| Edit a blog post in your browser | Go to https://aegisgatesecurity.io/admin/, log in, edit |
| Edit a blog post locally | Edit `content/blog/POST.md` in this repo, `git push` |
| Preview changes before deploy | Netlify auto-creates a preview URL for each branch |
| Deploy to production | `git push origin main` (or merge a PR to main) |
| Add a new blog post | `/admin/` → New Blog → fill in form → Publish |
| Add a new docs page | Create `content/docs/NEW.md`, push |
| Add a new legal page | Create `content/legal/NEW.md`, push |

---

## 🚀 One-Time Setup (you need to do this)

### 1. Connect this repo to Netlify

This repo (`aegisgatesecurity/aegisgate-site`) is set up to be auto-built by Netlify on every push to `main`. To activate:

1. Sign in to https://app.netlify.com/ (free plan is fine)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and authorize Netlify to access the `aegisgatesecurity` org
4. Select the `aegisgatesecurity/aegisgate-site` repo
5. Configure:
   - **Branch to deploy**: `main`
   - **Build command**: `hugo --minify --gc` (Netlify should auto-detect from `netlify.toml`)
   - **Publish directory**: `public` (auto-detected)
6. Click "Deploy site"
7. Once deployed, go to Site settings → Domain management → Add custom domain `aegisgatesecurity.io`
8. Update DNS at your registrar:
   - For apex (`aegisgatesecurity.io`): add an A record to Netlify's load balancer (Netlify shows you the IP)
   - For `www`: add a CNAME to `<your-site>.netlify.app`
9. Enable HTTPS (one-click in Netlify UI)

**Total time**: 15-20 minutes. After this, every `git push` to `main` auto-deploys.

### 2. Register a GitHub OAuth App (for Sveltia)

Sveltia needs a GitHub OAuth app to authenticate you. To create one:

1. Go to https://github.com/settings/applications/new
2. Fill in:
   - **Application name**: `AegisGate Site CMS`
   - **Homepage URL**: `https://aegisgatesecurity.io`
   - **Application description**: `Content management for the AegisGate website`
   - **Authorization callback URL**: `https://aegisgatesecurity.io/admin/`
3. Click "Register application"
4. On the next page, copy the **Client ID** and generate a **Client Secret**
5. Save these — you'll need them in step 3

### 3. Add Netlify Environment Variables (or use Sveltia's built-in flow)

Sveltia can use the GitHub OAuth credentials you just created. Two options:

**Option A: Use Sveltia's "Netlify-style" flow (recommended)**
- In your Netlify site dashboard, go to "Identity" (legacy) or "Visitor Access" (new)
- Enable "Git Gateway" which uses your GitHub account automatically
- No need to register a separate OAuth app

**Option B: Use your own OAuth app**
- Add the Client ID/Secret to Netlify environment variables:
  - `GITHUB_OAUTH_CLIENT_ID`
  - `GITHUB_OAUTH_CLIENT_SECRET`
- Reference them in your Sveltia config (already done if you use Sveltia's env var syntax)

**Time**: 10-15 minutes.

### 4. Test the CMS

Once everything is set up:

1. Visit https://aegisgatesecurity.io/admin/
2. Click "Login with GitHub"
3. Authorize the OAuth app
4. You should see the Sveltia editor
5. Click "New Blog" → fill in a test post → "Publish"
6. Netlify should auto-build within ~30 seconds
7. Visit https://aegisgatesecurity.io/blog/ to see your new post

**If anything fails**, check:
- Netlify deploy logs (in the Netlify UI)
- Sveltia browser console (F12)
- GitHub repo for the new commit (sveltia should have created one)

---

## 📂 Repository Structure

```
aegisgate-site/
├── admin/                      # Sveltia CMS (admin UI)
│   ├── index.html              # Loads Sveltia from CDN
│   └── config.yml              # Schema + backend config
├── archetypes/                 # Hugo content templates (default.md, etc.)
├── assets/                     # Bundled assets (CSS, JS for Hugo pipes)
├── config.yaml                 # Hugo config (legacy)
├── content/                    # All site content (Markdown files)
│   ├── _index.md               # Homepage
│   ├── 404.md                  # 404 page
│   ├── blog/                   # Blog posts
│   │   ├── _index.md           # Blog list page
│   │   └── v2.0.0-a2a-security-launch.md
│   ├── docs/                   # Documentation (13 pages)
│   ├── legal/                  # Legal pages (7 pages)
│   └── eu-ai-act.md            # EU AI Act module page
├── data/                       # Hugo data files (pricing, features)
├── hugo.toml                   # Hugo config (preferred)
├── internal/                   # Hugo internal templates
├── layouts/                    # HTML templates (overrides theme)
│   ├── _default/               # baseof, single, list
│   ├── blog/                   # blog list
│   ├── docs/                   # docs templates
│   ├── index.html              # homepage template
│   ├── partials/               # header, footer, sidebar
│   └── shortcodes/             # mermaid, terminal
├── netlify.toml                # Netlify build + security headers config
├── public/                     # (gitignored) Hugo build output
├── static/                     # Files served as-is at site root
│   ├── _redirects              # Netlify redirect rules
│   ├── admin/                  # Sveltia CMS (served at /admin/)
│   ├── images/                 # Static images
│   ├── favicon.png             # Browser favicon
│   └── logo.png                # Site logo
├── themes/                     # Hugo themes
│   └── aegisgate/              # Custom theme
└── README.md                   # This file
```

---

## 🔄 Daily Workflow

### Writing a blog post (the easy way, via Sveltia)

1. Open https://aegisgatesecurity.io/admin/ in your browser
2. Log in with GitHub
3. Click "New Blog" button
4. Fill in:
   - Title
   - Description (1-2 sentences)
   - Body (Markdown — write in the editor)
   - Tags, categories, etc.
5. Click "Save" to save as draft
6. Click "Publish" to make it live

Netlify auto-deploys within ~30 seconds. Your post is live.

### Writing a blog post (the local way)

If you prefer writing in your local editor (VS Code, vim, etc.):

1. Clone this repo (or `cd` to it if already cloned)
2. Create a new file: `content/blog/YYYY-MM-DD-my-post-slug.md`
3. Edit it with your preferred editor
4. Preview locally:
   ```bash
   hugo server
   # Open http://localhost:1313 in your browser
   ```
5. When ready, commit and push:
   ```bash
   git add content/blog/YYYY-MM-DD-my-post-slug.md
   git commit -m "blog: my new post title"
   git push origin main
   ```
6. Netlify auto-deploys within ~30 seconds

### Editing docs

Same as blog, but use the `docs` directory instead. Use the `docs` collection in Sveltia.

### Editing legal pages

Same as blog, but use the `legal` directory. **Edit with caution** — these are legal documents.

### Editing the homepage

The homepage is `content/_index.md`. Edit it directly in the repo (Sveltia can also edit it via the "Site pages" collection).

---

## 🛠️ Local Development

### Prerequisites
- Hugo 0.123.7+extended (https://gohugo.io/installation/)
- Git

### Running locally
```bash
# Clone the repo
git clone https://github.com/aegisgatesecurity/aegisgate-site.git
cd aegisgate-site

# Run Hugo in dev mode (auto-rebuilds on file changes)
hugo server

# Open http://localhost:1313 in your browser
```

### Building for production
```bash
hugo --minify --gc
# Output goes to public/
```

### Preview a specific commit
```bash
git checkout <commit-sha>
hugo server
```

---

## 🔐 Security Notes

1. **Sveltia runs in the browser** — it never has direct access to your GitHub credentials. OAuth flow only.
2. **The OAuth callback URL must be exact** — if you change domains, update the GitHub OAuth app.
3. **The `cms/*` branches** are auto-created by Sveltia when you publish. Don't delete them manually.
4. **The `static/admin/` directory** is the only public-facing admin UI. Anyone can visit `/admin/` but they can't do anything without GitHub auth.
5. **Don't commit secrets to this repo** — no API keys, no license keys, no tokens. Use environment variables in Netlify if needed.

---

## 📊 Git Workflow

### Branches

- `main` — Production. Auto-deploys to aegisgatesecurity.io.
- `cms/*` — Auto-created by Sveltia. Merged to main via editorial workflow or manually.

### Commit Messages

Conventional Commits (lightweight):
- `blog: ...` — Blog post changes
- `docs: ...` — Documentation changes
- `feat: ...` — New feature (new page, new section, new template)
- `fix: ...` — Bug fix
- `chore: ...` — Repo maintenance (config, .gitignore, etc.)
- `style: ...` — Cosmetic changes (formatting, typos)

---

## 🆘 Troubleshooting

### "Hugo not found" when building
- Install Hugo 0.123.7+extended: https://gohugo.io/installation/
- Or use the `netlify.toml`-pinned version (Netlify installs the right Hugo version automatically)

### Sveltia won't load
- Check the browser console (F12) for errors
- Verify the Sveltia script URL is reachable: https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js
- Check that `/admin/index.html` is being served (not 404'd)

### "Authentication failed" in Sveltia
- Verify the GitHub OAuth app callback URL is `https://aegisgatesecurity.io/admin/`
- If using Netlify Identity, make sure Git Gateway is enabled
- Check Netlify env vars if using your own OAuth app

### Netlify build fails
- Check the build log in Netlify UI
- Common causes: Hugo version mismatch, missing file, syntax error in Markdown
- Try building locally with `hugo --minify --gc` to reproduce

### "I broke the homepage and need to revert"
- Find the last good commit: `git log --oneline | head -10`
- Revert it: `git revert <commit-sha>` then `git push`
- Or reset: `git reset --hard <commit-sha> && git push --force-with-lease` (destructive — only if revert doesn't work)

### "I want to roll back to a specific release"
- `git checkout v1.2.3 -- .` (replaces all files with that version's)
- `git commit -m "revert: rollback to v1.2.3"` then `git push`

---

## 🔗 Useful Links

- **Live site**: https://aegisgatesecurity.io
- **Sveltia admin**: https://aegisgatesecurity.io/admin/
- **GitHub repo**: https://github.com/aegisgatesecurity/aegisgate-site
- **Netlify dashboard**: https://app.netlify.com/ (your sites)
- **Hugo docs**: https://gohugo.io/documentation/
- **Sveltia docs**: https://sveltia.org/

---

**Last updated**: 2026-06-09
**AegisGate version**: v3.3.0-beta.2
**Hugo version**: 0.123.7
**Sveltia version**: latest (loaded from CDN)
