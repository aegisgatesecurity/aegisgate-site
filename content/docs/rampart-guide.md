---
title: "Rampart Configuration Guide"
description: "Complete guide for installing, configuring, and operating AegisGate Rampart — the local AI security proxy for developers using Copilot, Cursor, and local LLMs."
weight: 440
---

## Overview

**AegisGate Rampart** is a free, open-source local proxy that sits between AI coding tools (GitHub Copilot, Cursor, local LLMs) and the AI models they communicate with. It inspects every prompt you send and every response you receive, scanning in real time for leaked secrets, personally identifiable information (PII), prompt-injection attacks, hallucinated code, and toxic content.

| | |
|---|---|
| **Version** | v0.7.1 |
| **License** | Apache 2.0 |
| **Language** | Go (single static binary, zero runtime dependencies) |
| **Detection latency** | ~5 ms per request |
| **Throughput** | 235 requests/second |
| **Test functions** | 1,318 (80.7% coverage) |
| **AI endpoints intercepted** | 27 |
| **LLM presets** | 10 |
| **Crash rate** | 0.0000% |

### Who is Rampart for?

- **Individual developers** who use Copilot, Cursor, or local LLMs and want to prevent accidental secret leakage.
- **Teams** that need a lightweight, local-first security layer before adopting a centralized platform.
- **Security-conscious organizations** that require air-gapped, on-device detection with no network egress.
- **Privacy advocates** who want full transparency — Rampart is Apache 2.0 and ships with zero external dependencies for core functionality.

---

## Installation

Rampart ships as a single static binary with no runtime dependencies. Pre-built release assets are cosign-signed and available for all major platforms.

### Binary Releases

13 release assets are published for every version:

| Platform | Asset | Architecture |
|---|---|---|
| macOS | `rampart-darwin-amd64` | Intel |
| macOS | `rampart-darwin-arm64` | Apple Silicon |
| Linux | `rampart-linux-amd64` | x86-64 |
| Linux | `rampart-linux-arm64` | ARM64 |
| Linux (deb) | `rampart_0.7.1_amd64.deb` | x86-64 |
| Linux (rpm) | `rampart-0.7.1.x86_64.rpm` | x86-64 |
| Windows | `rampart-windows-amd64.exe` | x86-64 |
| Windows | `rampart-windows-arm64.exe` | ARM64 |
| Docker | `ghcr.io/aegisgatesecurity/aegisgate-rampart:v0.7.1` | Multi-arch |

Download from the [releases page](https://github.com/AegisGateSecurity/rampart/releases), verify the cosign signature, and place the binary on your `PATH`:

```bash
# macOS / Linux
chmod +x rampart
sudo mv rampart /usr/local/bin/

# Verify installation
rampart version
rampart verify
```

### Docker

```bash
docker pull ghcr.io/aegisgatesecurity/aegisgate-rampart:v0.7.1

# Run in proxy mode on port 8080
docker run -d \
  --name rampart \
  -p 8080:8080 \
  -v rampart-config:/config \
  ghcr.io/aegisgatesecurity/aegisgate-rampart:v0.7.1 \
  --port=8080 --config=/config --mode=block
```

### IDE Plugins

Rampart integrates directly into popular editors via the Language Server Protocol (LSP):

| Editor | Installation |
|---|---|
| **VS Code / Cursor** | Install the "AegisGate Rampart" extension from the marketplace. The extension launches the LSP server automatically. |
| **JetBrains** | Install the "AegisGate Rampart" plugin from the JetBrains marketplace. |
| **Neovim** | Add `rampart` to your LSP config (`lspconfig.rampart.setup({})`). |
| **Emacs** | Use `lsp-mode` with `rampart` as the server command. |
| **Vim** | Use `coc.nvim` with `:CocInstall coc-rampart`. |

> **Note:** IDE plugin mode provides real-time inline warnings as you type, before the prompt is even sent. Proxy mode scans traffic after it leaves the editor. Using both together gives you defense-in-depth.

---

## Quick Start

### Option A: Local Proxy Mode (5 minutes)

1. **Install the CA certificate** so Rampart can intercept HTTPS traffic:

```bash
rampart --trust
```

2. **Start the proxy in block mode:**

```bash
rampart --port=8080 --mode=block -v
```

3. **Point your AI tool at the proxy.** Set the proxy as your HTTP/HTTPS proxy:

```bash
export HTTP_PROXY=http://localhost:8080
export HTTPS_PROXY=http://localhost:8080
```

Or configure your IDE's proxy settings to `http://localhost:8080`.

4. **Use your AI tool normally.** Rampart inspects every request and response transparently. Detected threats are logged (monitor mode) or blocked (block mode).

### Option B: IDE Plugin Mode (3 minutes)

1. Install the Rampart extension/plugin for your editor (see [IDE Plugins](#ide-plugins)).
2. Open a file and start typing a prompt to your AI assistant.
3. Inline diagnostics appear in real time — no proxy configuration needed.
4. Configure blocking behavior in your editor settings or via the Rampart config file.

### Option C: Daemon Mode (background)

```bash
# Start as a background daemon with system tray
rampart --daemon

# Check status
rampart --status

# Stop / remove auto-start
rampart --no-autostart
```

---

## Configuration

Rampart can be configured via CLI flags, configuration files, and environment variables. CLI flags take precedence over config files, which take precedence over environment variables.

### CLI Flags

| Flag | Default | Description |
|---|---|---|
| `--daemon` | `false` | Run as background daemon with system tray notifications |
| `--port` | `8080` | Local proxy port |
| `--config` | `""` | Configuration directory path |
| `--platform-url` | `""` | Optional Platform backend URL for telemetry |
| `--platform-api-key` | `""` | API key for Platform authentication |
| `-v` | `false` | Verbose output |
| `--trust` | `false` | Install CA certificate into system trust store |
| `--autostart` | `false` | Configure auto-start on boot |
| `--no-autostart` | `false` | Remove auto-start configuration |
| `--status` | `false` | Show current status and exit |
| `--rate-limit` | `0` | Rate limit (requests/second, 0 = no limit) |
| `--block` | `false` | Enable block mode (actively block detected threats) |
| `--mode` | `""` | Operating mode: `monitor` (log only) or `block` (active blocking) |
| `--pprof` | `""` | Enable pprof debug server (e.g. `localhost:6060`) |
| `--ca-key-passphrase` | `""` | Passphrase for encrypting the CA private key at rest |
| `--audit-key-passphrase` | `""` | Passphrase for encrypting audit logs at rest |
| `--anonymized-metrics` | `false` | Enable privacy-preserving anonymized metrics (opt-in) |
| `--metrics-endpoint` | `""` | Custom endpoint for anonymized metrics |

### CLI Subcommands

| Subcommand | Description |
|---|---|
| `version` | Show version information |
| `verify` | Verify installation integrity |
| `scan <file>` | Scan a file for secrets, PII, and injection patterns |
| `config hash` | Show configuration hash |
| `config verify` | Verify configuration file integrity |
| `config check` | Check configuration for errors |
| `decrypt-audit` | Decrypt encrypted audit logs |
| `llm list` | List available LLM provider presets |
| `webhook add` | Add a webhook endpoint |
| `webhook list` | List configured webhooks |
| `webhook remove` | Remove a webhook |
| `webhook test` | Test webhook delivery |
| `webhook enable` | Enable a webhook |
| `webhook disable` | Disable a webhook |

#### Webhook subcommand usage

```bash
# Add a Slack webhook
rampart webhook add \
  -name "slack-alerts" \
  -url "https://hooks.slack.com/services/YOUR_TEAM/YOUR_CHANNEL/YOUR_WEBHOOK_TOKEN" \
  -secret "my-hmac-secret" \
  -skip-tls-verify=false \
  -timeout 30s

# List all webhooks
rampart webhook list

# Test a webhook
rampart webhook test -name "slack-alerts"

# Enable / disable
rampart webhook enable -name "slack-alerts"
rampart webhook disable -name "slack-alerts"

# Remove
rampart webhook remove -name "slack-alerts"
```

### Configuration File

Rampart looks for a configuration file in the directory specified by `--config` (default: `~/.rampart/`). The main configuration file is `config.yaml`:

```yaml
# ~/.rampart/config.yaml

mode: block                    # monitor | block
port: 8080                     # local proxy port
rate_limit: 0                  # requests/second (0 = unlimited)

# CA certificate encryption
ca_key_passphrase: ""          # passphrase for CA private key encryption

# Audit log encryption
audit_key_passphrase: ""       # passphrase for audit log encryption
audit_log_path: ~/.rampart/audit

# Privacy-preserving metrics (opt-in)
anonymized_metrics: false
metrics_endpoint: ""

# Platform integration (optional)
platform:
  url: ""
  api_key: ""

# Detection settings
detection:
  enable_l1_regex: true        # 38 L1 regex patterns
  enable_l2_compliance: true   # 35 L2 compliance patterns
  enable_ml_evasion: true      # 15 ML evasion resistance patterns
  enable_ml_model: true        # Char CNN-BiLSTM with Attention
  enable_response_scan: true   # Scan AI responses
  enable_pii_scan: true
  enable_secret_scan: true
  enable_hallucination_scan: true
  enable_toxicity_scan: true

# Webhooks
webhooks:
  - name: "slack-alerts"
    url: "https://hooks.slack.com/services/..."
    enabled: true
    method: POST
    secret: "my-hmac-secret"
    skip_tls_verify: false
    timeout: 30s
    headers:
      Content-Type: "application/json"

# LLM provider presets (override defaults)
llm_presets:
  ollama:
    url: "http://localhost:11434/v1"
  lm_studio:
    url: "http://localhost:1234/v1"
```

Verify your configuration at any time:

```bash
rampart config check
rampart config verify
rampart config hash
```

### Environment Variables

All CLI flags can also be set via environment variables using the `RAMPART_` prefix. Dashes become underscores:

| Environment Variable | Equivalent Flag |
|---|---|
| `RAMPART_PORT` | `--port` |
| `RAMPART_MODE` | `--mode` |
| `RAMPART_CONFIG` | `--config` |
| `RAMPART_PLATFORM_URL` | `--platform-url` |
| `RAMPART_PLATFORM_API_KEY` | `--platform-api-key` |
| `RAMPART_RATE_LIMIT` | `--rate-limit` |
| `RAMPART_CA_KEY_PASSPHRASE` | `--ca-key-passphrase` |
| `RAMPART_AUDIT_KEY_PASSPHRASE` | `--audit-key-passphrase` |
| `RAMPART_ANONYMIZED_METRICS` | `--anonymized-metrics` |
| `RAMPART_METRICS_ENDPOINT` | `--metrics-endpoint` |

```bash
export RAMPART_MODE=block
export RAMPART_PORT=8080
export RAMPART_CA_KEY_PASSPHRASE="my-secure-passphrase"
rampart
```

---

## Operating Modes

Rampart supports three deployment modes and two enforcement modes. These are orthogonal — you choose a deployment mode (how Rampart runs) and an enforcement mode (what it does with detections).

### Deployment Modes

#### 1. IDE Plugin Mode (LSP Server)

Runs inside your editor as a Language Server Protocol server. Provides real-time inline diagnostics as you type — before the prompt is even sent to the model.

- **Best for:** Individual developers who want immediate feedback
- **Setup:** Install the editor extension/plugin (no proxy config needed)
- **Coverage:** Scans prompts in the editor; does not intercept network traffic

```bash
# The LSP server is launched automatically by the editor plugin.
# You can also launch it manually for debugging:
rampart --lsp
```

#### 2. Local Proxy Mode (MITM)

Runs as a transparent HTTPS proxy on `localhost`. Intercepts all AI-related HTTP traffic, regardless of which tool generated it.

- **Best for:** Comprehensive coverage across all AI tools on your machine
- **Setup:** Install CA cert (`--trust`), configure proxy settings
- **Coverage:** Scans both prompts (requests) and responses

```bash
rampart --port=8080 --mode=block --trust -v
```

#### 3. Daemon Mode

Runs as a background process with system tray notifications. Combines proxy functionality with desktop alerts.

- **Best for:** Always-on protection without a terminal window
- **Setup:** `rampart --daemon` (optionally with `--autostart`)

```bash
# Start daemon with auto-start on boot
rampart --daemon --autostart --mode=block

# Check status
rampart --status

# Remove auto-start and stop
rampart --no-autostart
```

### Enforcement Modes

| Mode | Behavior | Flag |
|---|---|---|
| **Monitor** | Logs detected threats but allows traffic through | `--mode=monitor` or omit |
| **Block** | Actively blocks requests/responses containing threats | `--mode=block` or `--block` |

```bash
# Monitor mode — log only, no blocking
rampart --mode=monitor

# Block mode — actively block threats
rampart --mode=block

# Equivalent shorthand
rampart --block
```

> **Tip:** Start in monitor mode to understand what Rampart detects in your workflow, then switch to block mode once you're confident in the detection results.

---

## Detection Capabilities

Rampart uses a multi-layered detection pipeline combining regex patterns, compliance rule sets, ML evasion resistance, and a deep learning model — all running locally with ~5 ms latency.

### Layer 1: Regex Patterns (38 patterns)

| Category | Count | Examples |
|---|---|---|
| **PII** | 11 | SSN, email, phone, credit card, passport, IBAN, IP address, MAC address, AWS account ID, VIN, license plate |
| **Secrets** | 17 | AWS access keys, GitHub tokens, Slack tokens, Stripe keys, Google API keys, JWT, private keys, database connection strings, generic high-entropy strings |
| **Hallucination** | 4 | Fabricated package names, non-existent CVEs, invented library imports, phantom function signatures |
| **Toxicity** | 6 | Profanity, hostile language, social engineering prompts, manipulative instructions, discriminatory content, threat language |

### Layer 2: Compliance Patterns (35 patterns)

Rampart maps detections to major compliance frameworks, making it easy to demonstrate regulatory adherence:

| Framework | Coverage |
|---|---|
| **OWASP LLM Top 10** | LLM01–LLM10 prompt injection, insecure output, training data poisoning, etc. |
| **MITRE ATLAS** | Adversarial tactics, techniques, and procedures for AI systems |
| **EU AI Act** | Risk classification and prohibited practices |
| **NIST AI RMF** | Risk management framework mappings |
| **ISO 42001** | AI management system controls |
| **CCPA** | California Consumer Privacy Act data categories |
| **LGPD** | Brazilian General Data Protection Law |
| **PIPEDA** | Canadian Personal Information Protection Act |
| **POPIA** | South African Protection of Personal Information Act |

### Layer 3: ML Evasion Resistance (15 patterns)

Detects attempts to bypass regex-based detection using common obfuscation techniques:

| Technique | Description |
|---|---|
| **Keyboard walk** | Sequences like `qwerty`, `asdfgh` used to disguise patterns |
| **Encoding** | Base64, hex, URL-encoded, Unicode-escaped secrets |
| **L33tspeak** | Character substitution: `s3cr3t`, `p@ssw0rd`, `t0k3n` |
| **Fragmentation** | Splitting secrets across multiple lines or string concatenation |

### Layer 4: ML Model (Char CNN-BiLSTM with Attention)

Rampart includes a character-level CNN-BiLSTM neural network with attention mechanism — the same architecture used in AegisGate Platform, reimplemented in pure Go for on-device inference.

- **Architecture:** Char CNN → BiLSTM → Attention → Dense
- **Inference:** Pure Go, no external ML runtime required
- **Latency:** Sub-millisecond inference, ~5 ms total pipeline
- **Purpose:** Catches novel prompt injection and obfuscated secrets that regex misses

### Response Scanning

Rampart doesn't just scan what you send — it also scans what comes back:

| Response Category | Patterns | What it catches |
|---|---|---|
| **PII in responses** | 11 | Models leaking training data, exposed user information |
| **Secrets in responses** | 17 | Models regurgitating API keys, tokens, credentials from training data |
| **Hallucination detection** | 4 | Fabricated package names, non-existent CVEs, invented APIs |
| **Toxicity filtering** | 6 | Harmful, manipulative, or hostile content in responses |

```bash
# Enable response scanning (enabled by default)
rampart --mode=block -v
# Response scanning can be toggled in config.yaml:
# detection:
#   enable_response_scan: true
```

---

## Webhook Integration

Rampart can forward audit events to webhook endpoints, enabling real-time alerts in Slack, Discord, Microsoft Teams, or any custom HTTP endpoint.

### Configuration

Webhooks are configured via CLI subcommands or directly in `config.yaml`:

```yaml
webhooks:
  # Slack
  - name: "slack-alerts"
    url: "https://hooks.slack.com/services/YOUR_TEAM/YOUR_CHANNEL/YOUR_WEBHOOK_TOKEN"
    enabled: true
    method: POST
    secret: "my-hmac-signing-secret"
    skip_tls_verify: false
    timeout: 30s
    headers:
      Content-Type: "application/json"

  # Discord
  - name: "discord-alerts"
    url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"
    enabled: true
    method: POST
    secret: ""
    skip_tls_verify: false
    timeout: 30s
    headers:
      Content-Type: "application/json"

  # Microsoft Teams
  - name: "teams-alerts"
    url: "https://outlook.office.com/webhook/..."
    enabled: true
    method: POST
    secret: "teams-signing-secret"
    skip_tls_verify: false
    timeout: 30s

  # Custom endpoint
  - name: "siem-forwarder"
    url: "https://siem.internal.company.com/api/rampart-events"
    enabled: true
    method: POST
    secret: "siem-hmac-secret"
    skip_tls_verify: true
    timeout: 10s
    headers:
      Content-Type: "application/json"
      Authorization: "Bearer internal-token"
```

### WebhookConfig Fields

| Field | Type | Description |
|---|---|---|
| `ID` | string | Unique internal identifier |
| `Name` | string | Human-readable webhook name |
| `URL` | string | Webhook endpoint URL |
| `Enabled` | bool | Whether the webhook is active |
| `Method` | string | HTTP method (default: `POST`) |
| `Headers` | map[string]string | Custom HTTP headers |
| `Secret` | string | HMAC-SHA256 signing secret |
| `SkipTLSVerify` | bool | Skip TLS certificate verification |
| `Timeout` | duration | Request timeout (default: `30s`) |

### Event Payload

Each audit event is delivered as a JSON payload:

```json
{
  "timestamp": "2026-09-09T16:59:00Z",
  "event_type": "secret_detected",
  "host": "developer-laptop-01",
  "blocked": true,
  "category": "secrets",
  "severity": "critical",
  "pattern": "aws_access_key_id",
  "redacted_content": "AKIA****XXXX"
}
```

| Field | Description |
|---|---|
| `Timestamp` | ISO 8601 timestamp of the event |
| `EventType` | Type of detection (e.g. `secret_detected`, `pii_detected`, `injection_blocked`) |
| `Host` | Hostname of the machine where the event occurred |
| `Blocked` | Whether the request/response was blocked |
| `Category` | Detection category (`secrets`, `pii`, `hallucination`, `toxicity`, `injection`) |
| `Severity` | `low`, `medium`, `high`, or `critical` |
| `Pattern` | The specific pattern that matched |
| `RedactedContent` | Redacted excerpt of the matched content (PII/secrets stripped) |

### HMAC Verification

Webhook payloads are signed with HMAC-SHA256 using the configured `Secret`. The signature is sent in the `X-Rampart-Signature` header:

```python
# Example: verifying the signature in Python
import hmac
import hashlib

def verify_signature(payload: bytes, secret: str, signature: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

```javascript
// Example: verifying the signature in Node.js
const crypto = require('crypto');

function verifySignature(payload, secret, signature) {
    const expected = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature)
    );
}
```

### Managing Webhooks via CLI

```bash
# Add
rampart webhook add \
  -name "slack-alerts" \
  -url "https://hooks.slack.com/services/..." \
  -secret "my-hmac-secret" \
  -skip-tls-verify=false \
  -timeout 30s

# List
rampart webhook list

# Test delivery
rampart webhook test -name "slack-alerts"

# Enable / disable
rampart webhook enable -name "slack-alerts"
rampart webhook disable -name "slack-alerts"

# Remove
rampart webhook remove -name "slack-alerts"
```

---

## Platform Integration

Rampart operates fully standalone in air-gap mode. Connecting to [AegisGate Platform](/platform/) is **optional** and enables centralized policy management, aggregated audit, and compliance reporting.

### Connecting to Platform

```bash
rampart --platform-url="https://platform.aegisgate.io" \
        --platform-api-key="ak_live_XXXXXXXXXXXXXX" \
        --mode=block
```

Or via environment variables:

```bash
export RAMPART_PLATFORM_URL="https://platform.aegisgate.io"
export RAMPART_PLATFORM_API_KEY="ak_live_XXXXXXXXXXXXXX"
rampart
```

### What Platform Integration Provides

| Feature | Air-Gap (standalone) | With Platform |
|---|---|---|
| **Detection** | Full local detection | Full local detection |
| **Policy management** | Local config file | Centralized policy pushed from Platform |
| **Audit logs** | Local encrypted logs | Local + centralized on Platform |
| **Compliance reporting** | Manual export | Automated compliance dashboards |
| **Telemetry** | None | Opt-in audit event forwarding |
| **Team management** | Per-machine config | Centralized team and role management |
| **Alert routing** | Local webhooks | Platform-managed alert routing |

### Air-Gap Mode

When `--platform-url` is not set (the default), Rampart operates in full air-gap mode:

- No network egress whatsoever
- All detection, logging, and alerting happens locally
- No data leaves your machine
- No account or registration required

> **Privacy guarantee:** Disconnecting from Platform at any time instantly reverts to full air-gap mode. No data is retained on Platform after disconnection.

---

## LLM Provider Presets

Rampart ships with built-in presets for popular local LLM inference servers. These presets auto-configure the correct API endpoint format for each provider.

| Provider | Default Endpoint | Preset Name |
|---|---|---|
| **Ollama** | `http://localhost:11434/v1` | `ollama` |
| **LM Studio** | `http://localhost:1234/v1` | `lm_studio` |
| **LocalAI** | `http://localhost:8080/v1` | `localai` |
| **vLLM** | `http://localhost:8000/v1` | `vllm` |
| **Text Generation WebUI** | `http://localhost:5000/v1` | `text_generation_webui` |

### Listing Presets

```bash
rampart llm list
```

```
Available LLM presets:
  ollama                 http://localhost:11434/v1
  lm_studio              http://localhost:1234/v1
  localai                http://localhost:8080/v1
  vllm                   http://localhost:8000/v1
  text_generation_webui  http://localhost:5000/v1
```

### Overriding Preset URLs

Override any preset URL in your config file:

```yaml
llm_presets:
  ollama:
    url: "http://192.168.1.100:11434/v1"
  vllm:
    url: "http://gpu-server.local:8000/v1"
```

### Using Rampart with Local LLMs

When using local LLMs through Rampart, configure your AI tool to point at Rampart's proxy instead of the LLM server directly. Rampart will forward traffic to the correct preset endpoint:

```bash
# Start Rampart in proxy mode
rampart --port=8080 --mode=block -v

# Point your tool at Rampart instead of Ollama directly
# Before:  http://localhost:11434/v1/chat/completions
# After:   http://localhost:8080/v1/chat/completions
```

---

## Privacy & Security

Rampart is built on **12 non-negotiable privacy principles**. These are architectural guarantees, not configurable options.

### The 12 Privacy Guarantees

| # | Principle | How it works |
|---|---|---|
| 1 | **Zero telemetry by default** | Air-gap mode when `--platform-url` is not set. No network egress, no phone-home, no analytics. |
| 2 | **All detection is local** | Regex, compliance, and ML model all run on-device. No cloud inference. |
| 3 | **CA keys encrypted at rest** | The MITM CA private key is encrypted with a passphrase you provide (`--ca-key-passphrase`). |
| 4 | **Audit log redaction** | PII and secrets are stripped from audit logs before they are written. Logs contain redacted excerpts only. |
| 5 | **No network egress** | In air-gap mode, Rampart makes zero outbound network connections (except to the AI provider you're proxying to). |
| 6 | **Open source (Apache 2.0)** | Full source code available. No proprietary or closed-source components. |
| 7 | **No npm/external dependencies for core** | Single static Go binary. Zero runtime dependencies. |
| 8 | **No account required** | Download and run. No registration, no login, no email. |
| 9 | **Configurable anonymized metrics (opt-in only)** | `--anonymized-metrics` is off by default. When enabled, only privacy-preserving aggregate counters are sent. |
| 10 | **Rate limiting support** | `--rate-limit` prevents runaway tools from flooding your AI provider. |
| 11 | **Block mode with configurable thresholds** | Choose monitor-only or active blocking. Configure which categories trigger blocks. |
| 12 | **Audit log encryption at rest** | Audit logs are encrypted with `--audit-key-passphrase`. Only decryptable with the passphrase. |

### CA Certificate Security

Rampart generates a local CA certificate for MITM interception. This CA is:

- Generated locally on your machine
- Encrypted at rest with your passphrase
- Never transmitted anywhere
- Removable via `rampart --no-autostart` and manual cert cleanup

```bash
# Install CA cert into system trust store
rampart --trust

# Encrypt the CA private key at rest
rampart --trust --ca-key-passphrase="my-secure-passphrase"
```

### Anonymized Metrics (Opt-In)

When explicitly enabled, Rampart sends only aggregate, non-identifiable counters:

```bash
rampart --anonymized-metrics --metrics-endpoint="https://metrics.aegisgate.io/v1/rampart"
```

What is sent:
- Total request count (per hour)
- Detection category counts (e.g. "5 secrets, 2 PII")
- No prompts, no responses, no patterns, no IPs, no hostnames

What is **never** sent:
- Prompt or response content (even redacted)
- Pattern names or matched text
- Hostnames, IP addresses, or user identifiers
- Configuration details

---

## Audit Logs

Rampart maintains a local audit log of all detection events. Audit logs are encrypted at rest and contain redacted content only — no raw secrets or PII are ever stored.

### Enabling Audit Log Encryption

```bash
# Set a passphrase for audit log encryption
rampart --audit-key-passphrase="my-audit-passphrase" --mode=block
```

Or in config:

```yaml
audit_key_passphrase: "my-audit-passphrase"
audit_log_path: ~/.rampart/audit
```

### Audit Log Format

Each audit entry contains:

```json
{
  "timestamp": "2026-09-09T16:59:00.123Z",
  "event_type": "secret_detected",
  "host": "dev-laptop-01",
  "blocked": true,
  "category": "secrets",
  "severity": "critical",
  "pattern": "aws_access_key_id",
  "redacted_content": "AKIA****XXXX",
  "source": "proxy",
  "destination": "api.openai.com"
}
```

> **Note:** The `redacted_content` field always shows redacted excerpts. Raw secrets, full PII, and complete prompt/response text are never written to disk.

### Decrypting Audit Logs

To read encrypted audit logs, use the `decrypt-audit` subcommand:

```bash
rampart decrypt-audit \
  --audit-key-passphrase="my-audit-passphrase" \
  ~/.rampart/audit/2026-09-09.log.enc
```

To decrypt and pipe to a file:

```bash
rampart decrypt-audit \
  --audit-key-passphrase="my-audit-passphrase" \
  ~/.rampart/audit/2026-09-09.log.enc > audit-2026-09-09.json
```

### Audit Log Rotation

Audit logs are written daily and rotated automatically. Old logs remain encrypted and can be decrypted at any time with the original passphrase.

> **Warning:** If you lose your audit passphrase, encrypted audit logs cannot be recovered. Store your passphrase securely.

---

## Troubleshooting

### Common Issues

#### Rampart is not intercepting traffic

**Symptom:** No detections appear in logs despite using AI tools.

**Solutions:**

1. Verify the CA certificate is installed:
   ```bash
   rampart --trust
   rampart verify
   ```

2. Verify proxy settings are correct:
   ```bash
   echo $HTTPS_PROXY
   # Should show: http://localhost:8080
   ```

3. Run in verbose mode to see intercepted traffic:
   ```bash
   rampart --port=8080 -v
   ```

4. Some tools bypass system proxy settings. Check your IDE's proxy configuration directly.

#### CA certificate errors

**Symptom:** `x509: certificate signed by unknown authority`

**Solutions:**

```bash
# Re-install the CA certificate
rampart --trust

# On macOS, you may need to manually trust the cert in Keychain Access
# On Linux, copy the cert to /usr/local/share/ca-certificates/ and run update-ca-certificates
# On Windows, use certmgr to import the Rampart CA
```

#### "Port already in use"

**Symptom:** `bind: address already in use`

**Solutions:**

```bash
# Use a different port
rampart --port=8081

# Or find and stop the process using port 8080
lsof -i :8080    # macOS/Linux
netstat -ano | findstr :8080  # Windows
```

#### High CPU usage

**Symptom:** Rampart consuming excessive CPU.

**Solutions:**

1. Enable rate limiting:
   ```bash
   rampart --rate-limit=100
   ```

2. Disable ML model if not needed (falls back to regex + compliance only):
   ```yaml
   detection:
     enable_ml_model: false
   ```

3. Check for pprof data:
   ```bash
   rampart --pprof=localhost:6060
   # Then visit http://localhost:6060/debug/pprof/
   ```

#### Webhook delivery failures

**Symptom:** Webhook test fails or events not arriving.

**Solutions:**

```bash
# Test the webhook
rampart webhook test -name "slack-alerts"

# Check if webhook is enabled
rampart webhook list

# For self-signed certs on the receiving end
rampart webhook add -name "custom" -url "https://internal.example.com/hook" \
  -skip-tls-verify=true -timeout 60s
```

#### Audit log decryption fails

**Symptom:** `decrypt-audit` returns errors.

**Solutions:**

1. Verify you're using the correct passphrase:
   ```bash
   rampart decrypt-audit --audit-key-passphrase="correct-passphrase" file.log.enc
   ```

2. Check if the log file is corrupted:
   ```bash
   rampart verify
   ```

3. If the passphrase is lost, the logs cannot be recovered. This is by design — encryption is meant to protect the logs.

### Debug Mode

For detailed debugging, use verbose output and the pprof server:

```bash
rampart --mode=monitor -v --pprof=localhost:6060
```

### Verifying Installation Integrity

```bash
rampart verify
```

This checks:
- Binary integrity (checksums)
- CA certificate presence and validity
- Configuration file validity
- Required permissions

### Getting Help

- **GitHub Issues:** [github.com/AegisGateSecurity/rampart/issues](https://github.com/AegisGateSecurity/rampart/issues)
- **Documentation:** [docs.aegisgate.io](/docs/)
- **Community:** [community.aegisgate.io](https://community.aegisgate.io)

---

## FAQ

### Is Rampart really free?

Yes. Rampart is 100% free and open source under the Apache 2.0 license. There is no freemium model, no telemetry, and no vendor lock-in. The optional AegisGate Platform integration is a separate paid product, but Rampart itself is and will always be free.

### Does Rampart send my data anywhere?

No. By default, Rampart operates in air-gap mode with zero network egress. All detection happens locally on your machine. The only outbound connections are to the AI provider you're proxying to (which is the whole point — that traffic would happen anyway). Anonymized metrics are opt-in and contain only aggregate counts, never content.

### Can I use Rampart without any AI coding tools?

Yes. Rampart's `scan` command lets you scan any file directly:

```bash
rampart scan ./src/config.py
rampart scan ./.env
rampart scan ./docker-compose.yml
```

This is useful for CI/CD pipelines or pre-commit hooks.

### How does Rampart compare to GitHub Advanced Security or other secret scanners?

Rampart is specifically designed for **AI coding workflows**. Traditional secret scanners examine files at rest; Rampart examines prompts and responses in flight. It detects:

- Secrets you're about to paste into a prompt (before they reach the AI provider)
- PII that an AI model might leak in a response
- Prompt injection attacks embedded in code comments or documentation
- Hallucinated package names and APIs in AI-generated code

Traditional scanners and Rampart are complementary, not competitive.

### Does Rampart slow down my AI tools?

No. Rampart adds approximately 5 ms of latency per request. At 235 requests per second throughput capacity, this is imperceptible in normal developer workflows. The ML model runs in pure Go with no external runtime, keeping memory and CPU overhead minimal.

### Can I use Rampart in a corporate environment?

Yes. Rampart is designed for both individual and enterprise use. Key enterprise features:

- Air-gap mode for restricted networks
- CA key encryption at rest
- Audit log encryption at rest
- Configurable rate limiting
- Webhook integration with SIEM systems
- Optional Platform integration for centralized management
- Cosign-signed release binaries for supply chain security
- No external dependencies to audit

### What AI providers does Rampart intercept?

Rampart intercepts all HTTP/HTTPS traffic through its proxy. It has been tested with 27 AI API endpoints including:

- OpenAI (ChatGPT API, Copilot)
- Anthropic (Claude)
- Google (Gemini, Codey)
- GitHub Copilot
- Cursor
- Ollama, LM Studio, vLLM, LocalAI, Text Generation WebUI (local LLMs)
- Azure OpenAI
- AWS Bedrock
- Cohere
- Mistral AI
- Together AI
- Anyscale
- Replicate

If your AI tool communicates over HTTP/HTTPS, Rampart can intercept it.

### What happens when Rampart detects a threat in block mode?

In block mode, Rampart:

1. **For requests:** Prevents the prompt from reaching the AI provider. Returns a 403 response with a diagnostic message explaining what was detected.
2. **For responses:** Strips or replaces the offending content before it reaches your editor. The rest of the response is delivered normally.
3. **In IDE plugin mode:** Shows inline diagnostics and prevents the prompt from being sent.

The detection is always logged to the audit log (with redacted content), and forwarded to any configured webhooks.

### Can I customize which detections block vs. monitor?

Yes. In your config file, you can set per-category enforcement:

```yaml
detection:
  block_on:
    - secrets
    - pii
  monitor_on:
    - hallucination
    - toxicity
```

### How do I update Rampart?

```bash
# Check current version
rampart version

# Download the new binary from releases, then:
rampart verify   # Verify integrity of the new binary

# Your existing config and CA certificates are preserved
```

For Docker:

```bash
docker pull ghcr.io/aegisgatesecurity/aegisgate-rampart:v0.7.2
docker stop rampart && docker rm rampart
docker run -d --name rampart -p 8080:8080 -v rampart-config:/config \
  ghcr.io/aegisgatesecurity/aegisgate-rampart:v0.7.2 --mode=block
```

### Is Rampart FIPS compliant?

Rampart uses Go's standard crypto library, which is FIPS-eligible. For strict FIPS 140-2 environments, use the Go FIPS-enabled build. Check the [releases page](https://github.com/AegisGateSecurity/rampart/releases) for FIPS-compliant binaries.

### Can I contribute to Rampart?

Yes! Rampart is open source and welcomes contributions. See the [contributing guide](https://github.com/AegisGateSecurity/rampart/blob/main/CONTRIBUTING.md) for details on building from source, running tests, and submitting pull requests.

```bash
# Build from source
git clone https://github.com/AegisGateSecurity/rampart.git
cd rampart
go build -o rampart ./cmd/rampart

# Run tests
go test ./... -cover
```

With 1,318 test functions and 80.7% coverage, the test suite ensures reliability across all detection layers.