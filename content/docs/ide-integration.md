---
title: "IDE Integration"
description: "AegisGate Rampart provides real-time AI security detection in VS Code, Cursor, JetBrains IDEs, and any LSP-capable editor. Install guides and configuration for each."
weight: 440
---

## IDE Integration

AegisGate Rampart provides real-time PII, secrets, XSS, compliance, and adversarial prompt detection inside your IDE. Three integration paths cover every major editor:

| Editor | Plugin | Type | Status |
|--------|--------|------|--------|
| **VS Code / Cursor** | [aegisgate-rampart-ext](https://github.com/aegisgatesecurity/aegisgate-rampart-ext) | Native extension | ✅ v0.3.0 |
| **JetBrains** (IntelliJ, PyCharm, WebStorm, GoLand, etc.) | [aegisgate-rampart-jetbrains](https://github.com/aegisgatesecurity/aegisgate-rampart-jetbrains) | Native plugin | ✅ v0.3.0 |
| **Any LSP editor** (Neovim, Emacs, Helix, Sublime) | `rampart-lsp` | Language Server Protocol | ✅ v0.3.0 |

All three connect to a local Rampart proxy running on your machine. **Zero external communication. Zero data retention. localhost only.**

---

## Prerequisites

Install and start the Rampart proxy:

```bash
# Build or download Rampart
./rampart --daemon

# Verify it's running
curl http://localhost:8080/health
```

Rampart listens on `localhost:8080` by default. All IDE plugins connect to this local endpoint.

---

## VS Code / Cursor

### Install

1. Open VS Code or Cursor
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "AegisGate Rampart"
4. Click Install

Or install from CLI:

```bash
code --install-extension aegisgate-rampart
# For Cursor:
cursor --install-extension aegisgate-rampart
```

### Features

| Feature | Description |
|---------|-------------|
| **Auto-scan on edit** | Debounced scanning as you type (configurable interval) |
| **Scan on save** | Automatic scan when you save a file |
| **Scan Selection** | Select text → Command Palette → "Rampart: Scan Selected Text" |
| **Scan Document** | Command Palette → "Rampart: Scan Active Document" |
| **Inline diagnostics** | 🔐 PII · 💳 Financial · 🌍 International · 🔑 Secrets · ⚔️ XSS · 📋 Compliance · 🧠 ML |
| **Status bar** | Detection count + connection status (bottom right) |
| **Block mode indicator** | Visual indicator when Rampart is in block mode |
| **Severity filtering** | Only show diagnostics at or above your chosen threshold |

### Configuration

Open Settings (Ctrl+, / Cmd+,) and search for "aegisgate":

| Setting | Default | Description |
|---------|---------|-------------|
| `aegisgate-rampart.proxyUrl` | `http://localhost:8080` | Rampart proxy URL (localhost only) |
| `aegisgate-rampart.autoScan` | `true` | Scan automatically on text changes |
| `aegisgate-rampart.scanDebounceMs` | `500` | Milliseconds to wait before scanning after edit |
| `aegisgate-rampart.scanOnSave` | `true` | Scan when saving a file |
| `aegisgate-rampart.severityThreshold` | `low` | Minimum severity to display (`low`, `medium`, `high`, `critical`) |
| `aegisgate-rampart.maxDiagnostics` | `50` | Maximum diagnostics per document |
| `aegisgate-rampart.languageIds` | *(many)* | Language IDs to auto-scan |
| `aegisgate-rampart.showStatusBar` | `true` | Show status bar indicator |

### Commands

| Command | Shortcut |
|---------|----------|
| Rampart: Scan Selected Text | — |
| Rampart: Scan Active Document | — |
| Rampart: Check Status | — |
| Rampart: Show Stats | — |

### Detection Categories

The extension displays 154 regex patterns + ML neural network detections from Rampart:

| Icon | Category | Detects |
|------|----------|---------|
| 🔐 | PII US Core | SSN, email, phone, DOB, name |
| 🔐 | PII US Extended | Driver license, passport, medical record |
| 💳 | PII Financial | Credit card (Luhn), bank account |
| 🌍 | PII International | National IDs for 15+ countries |
| 🔑 | Secrets | AWS keys, GitHub tokens, OAuth, JWT, database URLs |
| ⚔️ | XSS | Script injection, event handlers, data URIs |
| 📋 | Compliance | GDPR, HIPAA, PCI-DSS, SOX identifiers |
| 🧠 | ML Threat | Char CNN-BiLSTM adversarial prompt detection |

---

## JetBrains (IntelliJ, PyCharm, WebStorm, GoLand, etc.)

### Install

**Option A: JetBrains Marketplace (coming soon)**

1. Go to Settings → Plugins → Marketplace
2. Search for "AegisGate Rampart"
3. Click Install

**Option B: Build from source**

```bash
git clone https://github.com/aegisgatesecurity/aegisgate-rampart-jetbrains
cd aegisgate-rampart-jetbrains
./gradlew buildPlugin
# Install the .zip from build/distributions/ via:
# Settings → Plugins → ⚙️ → Install Plugin from Disk
```

### Configuration

Go to Settings → Tools → AegisGate Rampart:

| Setting | Default | Description |
|---------|---------|-------------|
| Rampart proxy URL | `http://localhost:9090` | Rampart proxy URL |
| Auto-scan on save | Enabled | Scan files when saved |
| Minimum severity | `medium` | `critical`, `high`, `medium`, `low`, `info` |

### Features

- Inline annotations (same icon set as VS Code extension)
- Scan Current File (Tools → Rampart → Scan Current File)
- Check Connection (Tools → Rampart → Check Connection)
- Status bar widget showing detection count + block mode
- Auto-scan on save

---

## Any LSP-Capable Editor (Neovim, Emacs, Helix, Sublime)

The `rampart-lsp` binary is a Language Server Protocol implementation that communicates over stdio via JSON-RPC 2.0. It calls Rampart's `/detect` endpoint and publishes diagnostics back to the editor.

### Build

```bash
cd aegisgate-rampart
go build -o rampart-lsp ./cmd/rampart-lsp
```

### Usage

```bash
./rampart-lsp \
  --rampart-url http://localhost:8080 \
  --debounce-ms 300 \
  --min-severity medium
```

| Flag | Default | Description |
|------|---------|-------------|
| `--rampart-url` | `http://localhost:9090` | URL of Rampart `/detect` endpoint |
| `--debounce-ms` | `300` | Milliseconds to debounce before calling `/detect` after text changes |
| `--min-severity` | `medium` | Minimum severity to report (`critical`, `high`, `medium`, `low`) |
| `--version` | — | Print version and exit |

### Neovim Configuration

Add to your `init.lua`:

```lua
-- Configure rampart-lsp as a language server
local lspconfig = require('lspconfig')

lspconfig.rampart_lsp.setup {
  cmd = {
    "rampart-lsp",
    "--rampart-url", "http://localhost:8080",
    "--debounce-ms", "300",
    "--min-severity", "medium"
  },
  filetypes = { "markdown", "text", "plaintext", "python", "javascript", "typescript", "go", "rust", "java" },
  root_dir = function() return vim.fn.getcwd() end,
}
```

Or in VimScript (`init.vim`):

```vim
" Configure rampart-lsp
lua << EOF
require('lspconfig').rampart_lsp.setup {
  cmd = { "rampart-lsp", "--rampart-url", "http://localhost:8080" },
  filetypes = { "markdown", "text", "python", "javascript", "typescript", "go" },
}
EOF
```

### Emacs Configuration

Add to your `init.el`:

```elisp
(use-package lsp-mode
  :hook ((markdown-mode text-mode python-mode) . lsp)
  :config
  (lsp-register-client
   (make-lsp-client
    :new-connection (lsp-stdio-connection
                     '("rampart-lsp" "--rampart-url" "http://localhost:8080"))
    :major-modes '(markdown-mode text-mode python-mode)
    :server-id 'rampart-lsp)))
```

### Helix Configuration

Add to `.config/helix/languages.toml`:

```toml
[language-server.rampart]
command = "rampart-lsp"
args = ["--rampart-url", "http://localhost:8080", "--min-severity", "medium"]

[[language]]
name = "markdown"
language-servers = ["rampart"]
```

### Sublime Text (via LSP package)

Add to `LSP.sublime-settings`:

```json
{
  "clients": {
    "rampart-lsp": {
      "command": ["rampart-lsp", "--rampart-url", "http://localhost:8080"],
      "enabled": true,
      "languages": [
        { "syntaxes": ["Markdown", "Plain Text", "Python"] }
      ]
    }
  }
}
```

---

## How It Works

```
You type in IDE
     │
     ▼
IDE plugin (VS Code / JetBrains / LSP)
     │
     ▼ HTTP POST to localhost
Rampart proxy (running locally as --daemon)
     │
     ▼ 154 regex patterns + CharCNN-BiLSTM ML model
Detection results
     │
     ▼ JSON-RPC diagnostics
Back to IDE as inline warnings
```

1. You type or paste text in your editor
2. The plugin sends text to Rampart's `/detect` endpoint on `localhost`
3. Rampart runs 154 regex patterns + ML neural network detection
4. Results return as LSP diagnostics (inline warnings with severity + category)
5. You see 🔐 🔑 ⚔️ 📋 🧠 icons next to detected content

**No text ever leaves your machine.** The plugin talks only to `localhost`. Rampart does the detection locally. No cloud, no telemetry, no external API calls.

---

## Privacy (12 Non-Negotiables)

All three IDE integrations enforce the same privacy rules:

1. No prompt text stored or sent externally
2. No URLs logged
3. No page content stored
4. No PII stored
5. No credentials stored
6. No fingerprinting
7. No cross-site tracking
8. No provider metadata collected
9. No keystroke logging
10. No clipboard reading
11. No file system access beyond what the editor provides
12. All communication is localhost-only

---

## Troubleshooting

### "No detections appearing"

1. Verify Rampart is running: `curl http://localhost:8080/health`
2. Check the proxy URL in your IDE settings matches Rampart's port
3. Try a manual scan (Command Palette → "Rampart: Scan Active Document")
4. Test with known PII: paste `My SSN is 123-45-6789` — should trigger a PII detection

### "Connection failed"

1. Check Rampart is running with `--daemon` flag
2. Verify no firewall is blocking localhost connections
3. Try `curl http://localhost:8080/detect -d '{"text":"test"}'`

### "JetBrains plugin: wrong port"

The JetBrains plugin defaults to port `9090`. If Rampart runs on `8080` (default), update Settings → Tools → AegisGate Rampart → Rampart proxy URL to `http://localhost:8080`.

### "VS Code: too many diagnostics"

Lower `aegisgate-rampart.maxDiagnostics` or raise `aegisgate-rampart.severityThreshold` to `medium` or `high`.