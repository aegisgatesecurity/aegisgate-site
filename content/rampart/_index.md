---
title: "AegisGate Rampart — Local AI Security Proxy & IDE Plugin"
description: "Free, open-source local proxy that intercepts AI traffic from Copilot, Cursor, and any LLM. Real-time detection in VS Code, JetBrains, Neovim, and any LSP editor. Scans prompts and responses for secrets, PII, and injection attacks before they reach the model."
type: "landing"
---

<!-- ============================================================
     TIER 1: FOR THE CURIOUS HOME USER
     Plain language. "What is this and do I need it?"
     ============================================================ -->

> **⚡ AegisGate Rampart v0.6.2 is LIVE** — Local proxy, IDE plugins for VS Code/Cursor and JetBrains, real-time detection. [Download from GitHub](https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.2) (free, open source, Apache 2.0).

<div class="alert alert-success alert-center">
<strong>⚡ AegisGate Rampart</strong> is <strong>free and open source</strong>. No account required. No cloud calls. All detection happens locally on your machine.
<br><br>
<a href="https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.2" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download Rampart v0.6.2 →</a>
<a href="/rampart/#quick-start" class="btn btn-secondary">Quick start guide &rarr;</a>
</div>

---

## What is Rampart?

Rampart is a **local security tool for developers** who use AI coding assistants like GitHub Copilot, Cursor, or local LLMs (Ollama, LM Studio). It sits between your editor and the AI model, scanning everything you send — and everything the AI sends back — for sensitive data and security risks.

Think of it as a firewall for AI coding tools. It catches the moment you're about to send a database password to Copilot, or when the AI generates code that contains an API key, and stops it before it's too late.

---

## Do I need Rampart?

**If you use AI chat in a browser (ChatGPT, Claude, etc.):** You need [Lens](/lens/) — it's a free browser extension that protects you in the browser. Rampart is not for this use case.

**If you use AI coding tools (Copilot, Cursor, local LLMs, API calls):** You need Rampart. It protects the places Lens can't reach — your IDE, your terminal, your API calls.

| Your setup | What to use |
|-----------|-------------|
| ChatGPT or Claude in a browser | [Lens](/lens/) (free browser extension) |
| GitHub Copilot in VS Code | **Rampart** (IDE plugin) |
| Cursor AI editor | **Rampart** (IDE plugin) |
| Local LLMs (Ollama, LM Studio) | **Rampart** (local proxy) |
| API calls to OpenAI/Anthropic from your code | **Rampart** (local proxy) |
| Both browser chat AND coding tools | **Lens + Rampart** (both are free) |

---

## What does it catch?

| Risk | Examples |
|------|----------|
| **Secrets** | API keys (AWS, GitHub, OpenAI, Stripe), database passwords, SSH private keys, JWT tokens, OAuth tokens |
| **Personal info (PII)** | SSN, email, phone, credit card, passport, bank routing numbers |
| **Prompt injection** | Adversarial prompts designed to make the AI ignore safety rules, leak system prompts, or execute unauthorized actions |
| **Compliance violations** | Text that violates HIPAA, GDPR, PCI-DSS, EU AI Act |
| **Malicious code (XSS)** | Script injection, event handlers, encoded payloads, SVG vectors |
| **Response risks** | PII leaked in AI responses, hallucinated secrets, injected content in model output |

### Architecture Overview

{{< mermaid >}}
flowchart TD
    subgraph IDE["IDE Integration"]
        VS[VS Code / Cursor]
        JB[JetBrains]
        NV[Neovim / LSP]
    end

    subgraph Rampart["AegisGate Rampart v0.6.2"]
        direction TB
        
        subgraph PluginMode["IDE Plugin Mode"]
            PM1[LSP Server]
            PM2[Real-time Detection]
            PM3[Inline Warnings]
        end
        
        subgraph ProxyMode["Local Proxy Mode"]
            PX1[MITM Proxy :8443]
            PX2[Traffic Interception]
            PX3[API Redirection]
        end
        
        subgraph Engine["Detection Engine"]
            E1[176+ Patterns]
            E2[PII + Secrets]
            E3[XSS + Compliance]
            E4[ML Adversarial]
        end
    end

    subgraph AI["AI Services"]
        A[Copilot]
        B[Cursor]
        C[Ollama]
        D[OpenAI API]
        E[Local LLMs]
    end

    VS --> PluginMode
    JB --> PluginMode
    NV --> PluginMode
    
    PluginMode --> Engine
    ProxyMode --> Engine
    
    PluginMode --> AI
    ProxyMode --> A
    ProxyMode --> B
    ProxyMode --> C
    ProxyMode --> D
    ProxyMode --> E

    style PluginMode fill:#1a1f2e,stroke:#f59e0b,stroke-width:2px
    style ProxyMode fill:#1a1f2e,stroke:#f59e0b,stroke-width:2px
    style Engine fill:#1a1f2e,stroke:#38bdf8,stroke-width:2px
{{< /mermaid >}}

### Detection Flow

{{< mermaid >}}
sequenceDiagram
    participant Dev as Developer
    participant IDE as IDE / Editor
    participant Rampart as Rampart
    participant Proxy as Local Proxy
    participant AI as AI Service

    Dev->>IDE: Write Code / Prompt
    IDE->>Rampart: Send for Analysis (LSP)
    Rampart->>Rampart: Scan (PII, Secrets, XSS)
    
    alt Threat Detected
        Rampart-->>IDE: Show Warning (Inline)
        Dev->>IDE: Edit & Remove Risk
        IDE->>Rampart: Re-scan
    else Clean
        Rampart-->>IDE: Allow Send
        IDE->>Proxy: Forward to AI
        Proxy->>AI: POST Request
        AI-->>Proxy: AI Response
        Proxy->>Proxy: Scan Response
        Proxy-->>IDE: Return Response
    end

    Note over Rampart: All detection local (~5ms)
    Note over Proxy: Zero data leaves machine
{{< /mermaid >}}

---

## Is it private?

**Yes.** Everything runs on your machine. Nothing is sent to any server — not your prompts, not your code, not your detection results.

| ✅ Rampart DOES | ❌ Rampart does NOT |
|---|---|
| Run entirely on your machine | Send your prompts or code to any server |
| Scan traffic locally in real-time | Phone home with analytics or telemetry |
| Encrypt its CA keys with a passphrase | Store plaintext keys on disk |
| Redact PII/secrets from audit logs | Log your actual prompt text or secrets |
| Stay free and open source | Require an account or subscription |

Open source (Apache 2.0): [github.com/aegisgatesecurity/aegisgate-rampart](https://github.com/aegisgatesecurity/aegisgate-rampart)

---

<!-- ============================================================
     TIER 2: FOR DEVELOPERS / POWER USERS
     Quick start, IDE setup, proxy config, technical details
     ============================================================
-->

---

## Quick Start

### Option 1: Install the IDE plugin (recommended)

**VS Code / Cursor:**
1. Open the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for "AegisGate Rampart"
3. Click Install, then Reload
4. Detection runs automatically as you type — results appear as inline warnings

**JetBrains (IntelliJ, PyCharm, WebStorm, etc.):**
1. Open Settings → Plugins → Marketplace
2. Search for "AegisGate Rampart"
3. Click Install, then Restart
4. Detection results appear in the Problems tool window

**Neovim / any LSP editor:**
```bash
# Download the Rampart LSP binary
curl -L https://github.com/aegisgatesecurity/aegisgate-rampart/releases/latest/download/rampart-lsp-linux-amd64 -o /usr/local/bin/rampart-lsp
chmod +x /usr/local/bin/rampart-lsp

# Add to your LSP config (Neovim example)
# lspconfig.rampart_lsp.setup({})
```

### Option 2: Run as a local proxy

```bash
# Download for your platform
curl -L https://github.com/aegisgatesecurity/aegisgate-rampart/releases/latest/download/aegisgate-rampart-linux-amd64 -o aegisgate-rampart
chmod +x aegisgate-rampart

# Start the proxy
./aegisgate-rampart --port=8443 --upstream=https://api.openai.com

# Point your AI tool at the proxy
# Instead of: https://api.openai.com/v1/chat/completions
# Use:        http://localhost:8443/v1/chat/completions
```

### Option 3: Docker

```bash
docker run -d \
  -p 8443:8443 \
  -p 9090:9090 \
  ghcr.io/aegisgatesecurity/aegisgate-rampart:v0.6.2
```

---

## How it works

Rampart runs in two modes — you can use either or both:

### 1. IDE Plugin Mode

Rampart runs inside your editor as a Language Server (LSP). As you type prompts or code that will be sent to an AI tool, Rampart checks for sensitive data and security risks in real-time. Warnings appear inline, just like lint errors.

| Editor | Plugin | Status |
|--------|--------|--------|
| **VS Code / Cursor** | [aegisgate-rampart-ext](https://github.com/aegisgatesecurity/aegisgate-rampart-ext) | v0.3.0, published (IDE plugins — Rampart core is v0.6.2) |
| **JetBrains (IntelliJ, PyCharm, etc.)** | [aegisgate-rampart-jetbrains](https://github.com/aegisgatesecurity/aegisgate-rampart-jetbrains) | v0.3.0, published (IDE plugins — Rampart core is v0.6.2) |
| **Neovim / Emacs / Helix / Sublime** | Rampart-LSP (generic LSP server) | Available via `rampart-lsp` binary |

The LSP server uses JSON-RPC 2.0 over stdio — it works with any editor that supports LSP.

### 2. Local Proxy Mode

Rampart runs as a transparent proxy on your machine. Any AI tool that makes HTTP requests — Copilot, Cursor, local LLMs, API calls — gets intercepted and scanned.

```
Your AI tool (Copilot/Cursor/API) → Rampart proxy (localhost:8443) → AI model (OpenAI/Anthropic/local)
```

- Rampart generates a local CA certificate and configures your system to trust it
- All HTTPS traffic to AI services flows through the proxy
- Requests and responses are scanned in real-time
- Malicious content is blocked before it reaches the model (or before the response reaches you)
- CA keys are encrypted at rest with a passphrase — no plaintext keys on disk

---

## Rampart vs Lens vs Platform

| Feature | Lens (browser) | Rampart (local proxy/IDE) | Platform (server) |
|---------|:-:|:-:|:-:|
| **Protects browser AI chat** | ✅ | — | — |
| **Protects IDE AI tools** | — | ✅ | — |
| **Protects API calls** | — | ✅ | ✅ |
| **Protects server-to-server AI** | — | — | ✅ |
| **Real-time editor detection** | — | ✅ | — |
| **Compliance frameworks** | 5 facets | 5 facets | 31 frameworks |
| **SIEM/SOAR integration** | — | — | ✅ |
| **Multi-tenant** | — | — | ✅ |
| **Air-gapped deployment** | — | — | ✅ |
| **Price** | Free | Free | Free tier + paid |

---

<!-- ============================================================
     TIER 3: FOR ORGANIZATIONS / TECHNICAL DETAILS
     Architecture, download assets, IDE config, FAQs
     ============================================================
-->

---

## For Organizations

### Typical team setups

- **Individual developer**: Lens (browser) + Rampart (IDE) → full local protection, zero cost
- **Developer team (2-10)**: Rampart (IDE) for each dev + [Platform](/platform/) (server) for centralized policy, audit logs, and compliance reporting
- **Enterprise**: Platform (server) + Lens (browser) for non-technical staff + Rampart (IDE) for developers + SIEM/SOAR integration + 31 compliance frameworks

### Privacy & Security (for compliance teams)

1. **Zero data collection** — no telemetry, no analytics, no phone-home
2. **All detection is local** — patterns and ML model run on your machine
3. **CA keys encrypted at rest** — passphrase-protected, never plaintext
4. **Audit log redaction** — PII and secrets stripped from logs before writing to disk
5. **No network egress** — Rampart never sends your data anywhere
6. **Open source** — Apache 2.0, auditable, no hidden behavior

---

## Download

### Release Assets (v0.6.2)

| Platform | Asset | Architecture |
|----------|-------|-------------|
| macOS | `aegisgate-rampart-darwin-amd64.tar.gz` | Intel |
| macOS | `aegisgate-rampart-darwin-arm64.tar.gz` | Apple Silicon |
| Linux | `aegisgate-rampart-linux-amd64.tar.gz` | x86_64 |
| Linux | `aegisgate-rampart-linux-arm64.tar.gz` | ARM64 |
| Linux | `aegisgate-rampart-linux-amd64.deb` | Debian/Ubuntu |
| Linux | `aegisgate-rampart-linux-amd64.rpm` | RHEL/Fedora |
| Windows | `aegisgate-rampart-windows-amd64.zip` | x86_64 |
| Docker | `ghcr.io/aegisgatesecurity/aegisgate-rampart:v0.6.2` | Multi-arch (cosign-signed) |

<p>
<a href="https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.2" target="_blank" rel="noopener noreferrer" class="btn btn-primary">All 13 assets on GitHub →</a>
<a href="https://github.com/aegisgatesecurity/aegisgate-rampart" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Source code →</a>
</p>

---

## IDE Integration Details

For detailed setup instructions for each editor, see our [IDE Integration Guide](/docs/ide-integration/).

<details>
<summary><strong>VS Code / Cursor setup</strong></summary>

1. Install the [AegisGate Rampart extension](https://github.com/aegisgatesecurity/aegisgate-rampart-ext) from the VS Code marketplace
2. The extension automatically starts the Rampart LSP server
3. Detection results appear as inline diagnostics (like lint warnings)
4. Configure severity levels in `.vscode/settings.json`:

```json
{
  "rampart.detection.severity": "warning",
  "rampart.detection.categories": ["pii", "secrets", "xss", "compliance", "ml"]
}
```
</details>

<details>
<summary><strong>JetBrains setup</strong></summary>

1. Open Settings → Plugins → Marketplace
2. Search "AegisGate Rampart" → Install → Restart
3. Detection results appear in the Problems tool window
4. Configure in Settings → Tools → AegisGate Rampart
</details>

<details>
<summary><strong>Neovim setup (any LSP editor)</strong></summary>

```lua
-- Neovim (init.lua with nvim-lspconfig)
require'lspconfig'.rampart_lsp.setup{
  cmd = {"/path/to/rampart-lsp"},
  filetypes = {"*"}, -- scan all file types
  settings = {
    detection = {
      categories = {"pii", "secrets", "xss", "compliance", "ml"},
      severity = "warning"
    }
  }
}
```
</details>

---

## Architecture

{{< mermaid >}}
graph TB
    subgraph "Your Machine"
        A[AI Tool<br/>Copilot/Cursor/API] --> B[Rampart Proxy<br/>localhost:8443]
        A --> C[IDE Plugin<br/>VS Code/JetBrains/LSP]
        B --> D[Detection Engine]
        C --> D
        D --> E{Block or Allow?}
        E -->|Block| F[🛑 Warning + Log]
        E -->|Allow| G[Forward to AI Model]
    end
    G --> H[AI Model<br/>OpenAI/Anthropic/Local]
    H --> I[AI Response]
    I --> B
    B --> J[Response Scanner]
    J --> K{Safe?}
    K -->|No| F
    K -->|Yes| L[Return to AI Tool]
{{< /mermaid >}}

---

## Frequently Asked Questions

<details>
<summary><strong>Does Rampart slow down my AI tools?</strong></summary>

No. Detection adds ~5ms latency, which is imperceptible compared to the seconds-long response times of AI models. The ML model runs in pure Go — no external process, no network calls.
</details>

<details>
<summary><strong>Does Rampart store my prompts?</strong></summary>

No. Rampart processes prompts in memory and discards them. Audit logs are written with PII and secrets redacted — only the detection category and severity are recorded.
</details>

<details>
<summary><strong>Can I use Rampart without the proxy?</strong></summary>

Yes. The IDE plugin mode (LSP) works without the proxy. You can also use just the proxy without the IDE plugin. They're independent.
</details>

<details>
<summary><strong>How is Rampart different from Lens?</strong></summary>

Lens is a browser extension that watches what you type into AI chat websites. Rampart is a system-level proxy and IDE plugin that catches AI traffic from any application — Copilot, Cursor, API calls, local LLMs. They use the same detection engine but protect different surfaces.
</details>

<details>
<summary><strong>Is Rampart free for commercial use?</strong></summary>

Yes. Apache 2.0 license. Free for personal and commercial use. No restrictions, no attribution required beyond the license terms.
</details>

<details>
<summary><strong>Canonical facts (v0.6.2)</strong></summary>

Source: [aegisgate-rampart repo](https://github.com/aegisgatesecurity/aegisgate-rampart)

- **Local proxy**: Intercepts AI traffic transparently at the system level — no app changes needed
- **IDE integration**: VS Code/Cursor extension, JetBrains plugin, generic LSP server (Neovim, Emacs, Helix, Sublime)
- **MITM block mode**: Blocks malicious prompts before they reach the AI model
- **CA key encryption**: Encrypted at rest with passphrase — no plaintext keys on disk
- **Audit log redaction**: PII and secrets stripped from logs before writing
- **1,318 test functions**, 80.7% coverage
- **13 release assets**: macOS (Intel + ARM), Linux (deb + rpm), Windows, Docker (multi-arch, signed)
- **Apache 2.0**, zero external dependencies for core functionality

</details>