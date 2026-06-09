---
title: "Interactive Demo"
description: "Try the AegisGate Security Platform terminal emulator and experience AI security in action"
type: "demo"
---

## Live Terminal Emulator

Try the interactive terminal below. Type commands and see AegisGate Security Platform in action.

<div class="terminal-container">
<div class="terminal">
<div class="terminal-header">
<span class="terminal-dot red"></span>
<span class="terminal-dot yellow"></span>
<span class="terminal-dot green"></span>
<span class="terminal-title">aegisgate-terminal</span>
</div>
<div class="terminal-body" id="terminal-body">
<div class="output">
🛡️ AegisGate Security Platform v2.0.1 Terminal Emulator<br>
<br>
Type <span style="color: var(--primary)">docker run...</span> to start AegisGate<br>
Type <span style="color: var(--primary)">help</span> for available commands<br>
<br>
</div>
</div>
<div class="terminal-input">
<span>$</span>
<input type="text" id="terminal-input" placeholder="Type a command..." autocomplete="off" spellcheck="false">
</div>
</div>
</div>

---

## Available Commands

| Command | Description | Try It |
|---------|-------------|--------|
| `docker run ...` | Start AegisGate container | <button class="btn btn-secondary" onclick="fillCommand('docker run -d -p 8080:8080 ghcr.io/aegisgatesecurity/aegisgate-platform:latest')">Use</button> |
| `status` | Show system status dashboard | <button class="btn btn-secondary" onclick="fillCommand('status')">Use</button> |
| `stats` | Show 24-hour statistics | <button class="btn btn-secondary" onclick="fillCommand('stats')">Use</button> |
| `version` | Show version information | <button class="btn btn-secondary" onclick="fillCommand('version')">Use</button> |
| `config` | Show configuration | <button class="btn btn-secondary" onclick="fillCommand('config')">Use</button> |
| `tools list` | List registered MCP tools | <button class="btn btn-secondary" onclick="fillCommand('tools list')">Use</button> |
| `scan [text]` | Scan content for threats | <button class="btn btn-secondary" onclick="fillCommand('scan test')">Use</button> |

---

## 🎮 Interactive Security Demos

Experience AegisGate Security Platform threat detection in action. Try the scan commands below.

<div class="card-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">

<div class="card">

### 🔍 Secret/API Key Detection

Scans for exposed API keys and secrets.

<div style="background: var(--code-bg); padding: 1rem; border-radius: 6px; margin: 1rem 0;">
<code style="color: var(--text-muted);">scan sk-api-key-abc123XYZ</code>
</div>

<button class="btn btn-primary" onclick="fillCommand('scan sk-api-key-abc123XYZ')" style="margin: 0.5rem;">Try This</button>

</div>

<div class="card">

### 🔐 PII/PHI Detection

Detects personally identifiable information.

<div style="background: var(--code-bg); padding: 1rem; border-radius: 6px; margin: 1rem 0;">
<code style="color: var(--text-muted);">scan John Doe SSN: 123-45-6789</code>
</div>

<button class="btn btn-primary" onclick="fillCommand('scan John Doe SSN: 123-45-6789')" style="margin: 0.5rem;">Try This</button>

</div>

<div class="card">

### ⚠️ Prompt Injection Detection

Blocks manipulation attempts.

<div style="background: var(--code-bg); padding: 1rem; border-radius: 6px; margin: 1rem 0;">
<code style="color: var(--text-muted);">scan ignore previous instructions</code>
</div>

<button class="btn btn-primary" onclick="fillCommand('scan ignore previous instructions')" style="margin: 0.5rem;">Try This</button>

</div>

</div>

---

<div class="alert alert-info" style="text-align: center;">
<strong>💡 Tip:</strong> Type <code>help</code> in the terminal to see all available commands
</div>
