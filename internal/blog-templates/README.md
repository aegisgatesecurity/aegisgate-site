# AegisGate Blog Post Template — Complete How-To Guide

---

## What is Frontmatter?

Frontmatter is the **metadata section at the top of the file**, enclosed by `---` dashes. It tells Hugo about your post before the content starts.

```
---
title: "Your Title"
date: 2026-04-28
draft: true
---
^ This is frontmatter — it controls how the post appears ^

Below this line is your actual content (markdown)
```

---

## Step-by-Step: Creating a New Blog Post

### Step 1: Create a New File

Create a new file in this folder:
```
content/blog/my-first-post.md
```

### Step 2: Copy the Template

Open `template-post.md`, select all, copy, and paste into your new file.

### Step 3: Fill in the Frontmatter (Metadata)

```yaml
---
# POST TITLE — The main heading people see
title: "How to Secure Your AI Agents in 5 Minutes"

# SHORT DESCRIPTION — Shown on blog listing page and search results
description: "A step-by-step guide to deploying AegisGate Security Platform"

# PUBLICATION DATE — Use format: YYYY-MM-DD
date: 2026-04-28

# YOUR NAME
author: "Jane Developer"

# TAGS — Words that describe your post (use lowercase, no spaces)
tags: ["security", "tutorial", "mcp"]

# CATEGORY — Which section this belongs to
categories: ["Tutorials"]

# DRAFT — Set to false when ready to publish
# true = post is hidden, false = post is visible
draft: false

# COVER IMAGE — Optional featured image
cover:
    image: "images/my-cover.png"
    alt: "A diagram showing AI security flow"
---
```

### Step 4: Write Your Content

Delete the template instructions section and write your actual post:

```markdown
## Summary

[One sentence about what the reader will learn]

## Introduction

[Why this matters]

## Step 1: Install AegisGate

```bash
docker run -d \
  -p 8080:8080 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:latest
```

## Step 2: Configure

[How to configure]

## Conclusion

[Summary]
```

### Step 5: Publish

1. Remove `draft: true` or change it to `draft: false`
2. Save the file
3. Hugo will automatically add it to `/blog/` listing

---

## Field Reference Table

| Field | Required? | Example | What it does |
|-------|-----------|---------|--------------|
| `title` | Yes | `"My Post Title"` | Shows as page heading |
| `description` | Yes | `"How to do X"` | Shows in blog listing + SEO |
| `date` | Yes | `2026-04-28` | Sort order on blog page |
| `author` | No | `"John Doe"` | Credit the author |
| `tags` | No | `["tutorial"]` | Filter/search posts |
| `categories` | No | `["News"]` | Group posts by category |
| `draft` | No | `false` | Hide until ready |
| `cover.image` | No | `"images/photo.png"` | Featured image |
| `cover.alt` | No | `"Photo description"` | Accessibility text |

---

## Quick Example: Your First Post

```yaml
---
title: "Announcing AegisGate v1.4.0"
description: "What's new in our latest release: enhanced guardrails and faster scanning."
date: 2026-04-28
author: "AegisGate Team"
tags: ["release", "announcement"]
categories: ["News"]
draft: false
---

## What's New

We've been busy! Here's what's in v1.4.0:

- **Faster scanning** — 40% improvement
- **New guardrails** — 3 additional checks
- **Better logging** — Structured JSON output

## How to Update

```bash
docker pull ghcr.io/aegisgatesecurity/aegisgate-platform:latest
```

## What's Next

Stay tuned for more updates!
```

---

## Tips

- **Use `draft: true`** while writing — post won't appear until you remove it
- **Keep titles short** — 60 characters or less is best for SEO
- **Use `##` for headings** inside your content (not `#` which is the page title)
- **Code blocks** use triple backticks: \`\`\`bash \`\`\`
- **Images** go in `static/images/` folder, reference as `/images/your-image.png`
- **Links** use markdown: `[link text](https://example.com)`
- **Bold text** uses double asterisks: `**bold**`
- **Italic text** uses single asterisks: `*italic*`

---

## Markdown Quick Reference

| Format | Syntax | Result |
|--------|--------|--------|
| Heading | `# ## ###` | Hierarchy of sections |
| Bold | `**text**` | **bold** |
| Italic | `*text*` | *italic* |
| Link | `[text](url)` | [text](url) |
| Image | `![alt](url)` | displays image |
| Code | `` `code` `` | `code` |
| Code Block | ```` ``` ```` | multi-line code |
| List | `- item` | bullet list |
| Numbered | `1. item` | numbered list |
| Quote | `> text` | blockquote |
| Horizontal Rule | `---` | section divider |

---

## Common Mistakes to Avoid

1. **Don't forget the closing `---`** — frontmatter must be wrapped
2. **Use proper dates** — `YYYY-MM-DD` format only
3. **Quotes matter** — title and description must be in double quotes
4. **Tags are arrays** — use `["tag1", "tag2"]` not `["tag1 tag2"]`
5. **Draft is boolean** — use `true` or `false`, not `"true"` or `"yes"`