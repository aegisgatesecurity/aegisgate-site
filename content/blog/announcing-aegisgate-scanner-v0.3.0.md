---
title: "Announcing AegisGate Scanner v0.3.0: Antivirus for AI Artifacts"
slug: announcing-aegisgate-scanner-v0.3.0
description: "A static analysis tool that detects prompt injection, PII, secrets, dangerous code, and compliance violations in RAG documents, training data, model configs, and agent skills — before they reach production."
date: 2026-10-13
author: Josh Colvin
tags:
  - ai-security
  - scanner
  - static-analysis
  - prompt-injection
  - ci-cd
  - sarif
  - github-action
  - open-source
---

Today we're releasing **AegisGate Scanner v0.3.0** — a static analysis tool that scans AI artifacts for security threats before they reach production. It's available now on [GitHub](https://github.com/aegisgatesecurity/aegisgate-scanner), the [GitHub Marketplace](https://github.com/marketplace/actions/aegisgate-scanner), Homebrew, and Docker.

**268 detection patterns. 9 categories. 8 output formats. Apache 2.0.**

---

## The Problem: AI Artifacts Are a Supply Chain

AI systems consume artifacts the same way software systems consume dependencies. RAG documents, training datasets, model configurations, and agent skills are all inputs that shape what your AI does. A single poisoned document can inject malicious prompts, exfiltrate secrets, or cause model misbehavior.

Existing SAST tools don't understand AI-specific threats. Semgrep and CodeQL are built for code-level dataflow analysis. TruffleHog and Gitleaks find secrets — but nothing else. Nobody is scanning for prompt injection embedded in a RAG corpus, or dangerous function calls hidden in an agent skill file.

| Threat | Semgrep / CodeQL | TruffleHog / Gitleaks | AegisGate Scanner |
|---|---|---|---|
| Prompt injection | ❌ | ❌ | ✅ 17 patterns + ML |
| Secrets | Partial | ✅ | ✅ 64 patterns |
| PII (US + International) | ❌ | ❌ | ✅ 85 patterns |
| Dangerous code (agent skills) | Partial | ❌ | ✅ 34 patterns |
| Compliance (HIPAA/GDPR/EU AI Act) | ❌ | ❌ | ✅ 47 patterns |
| OT/ICS protocol exposure | ❌ | ❌ | ✅ 9 patterns |
| Archive extraction | ❌ | ❌ | ✅ zip/tar.gz/tar.bz2 |
| SARIF output | ✅ | ❌ | ✅ |
| ML-based detection | ❌ | ❌ | ✅ |
| SBOM generation | ❌ | ❌ | ✅ SPDX |

AegisGate Scanner fills the gap. It's not a replacement for your existing SAST or secret scanner — it's a complementary tool purpose-built for the AI artifact attack surface.

---

## What It Detects

Scanner covers nine detection categories with 268 regex patterns, plus an optional neural detection layer for adversarial prompt injection:

| Category | Patterns | What It Catches |
|---|---|---|
| **Prompt Injection** | 17 | "Ignore all previous instructions", role-play attacks, delimiter injection, SSTI probes, base64-encoded payloads, indirect injection |
| **Secrets** | 64 | AWS keys, GitHub tokens, OpenAI keys, Stripe keys, Slack tokens, JWT, private keys, database URLs |
| **PII — US Core** | 32 | SSN, email, phone, passport, driver's license, ITIN |
| **PII — US Extended** | 13 | Employer ID, VIN, bank routing, Medicare, NAIC |
| **PII — Financial** | 16 | Credit card numbers (Visa/MC/Amex/Discover), IBAN, SWIFT/BIC |
| **PII — International** | 24 | UK NHS, Canada SIN, Germany Steuer, France INSEE, Australia TFN |
| **XSS** | 12 | Script injection, event handlers, encoded payloads, SVG vectors |
| **Compliance** | 47 | OWASP LLM Top 10, EU AI Act, MITRE ATLAS, HIPAA, GDPR, COPPA, CCPA, model config safety |
| **Dangerous Functions** | 34 | `eval()`, `exec()`, `os.system()`, `subprocess`, `pickle.load()`, `child_process.exec()` |
| **OT/ICS Protocols** | 9 | Modbus, S7comm, DNP3, BACnet, EtherCAT, OPC UA, Profinet |
| **ML (optional)** | 1 model | Neural detector for adversarial prompt injection variants |

The ML layer is optional. The scanner ships in two builds: a **lite build** (pure Go, no CGO, ~20MB Docker image) that runs regex-only detection, and an **ML build** (with ONNX Runtime, ~150MB) that adds neural detection for adversarial prompt injection. Both builds share the same 268 regex patterns — the ML layer is additive, not a dependency.

---

## How to Use It

### CLI

```bash
# Install
curl -fsSL https://raw.githubusercontent.com/aegisgatesecurity/aegisgate-scanner/main/install.sh | bash

# Or via Homebrew
brew install aegisgatesecurity/tap/aegisgate-scanner

# Or from source
go install github.com/aegisgatesecurity/aegisgate-scanner/cmd/aegisgate-scanner@latest

# Scan a directory
aegisgate-scanner scan ./my-project

# Scan with SARIF output for CI/CD
aegisgate-scanner scan ./rag-docs --format sarif -o results.sarif

# Pipe content via stdin
cat suspicious_agent_skill.py | aegisgate-scanner scan - --stdin-ext .py

# Self-test (verify installation)
aegisgate-scanner doctor
```

### GitHub Action

Add this to any workflow to scan on every push or PR:

```yaml
- uses: aegisgatesecurity/aegisgate-scanner@v0
  with:
    path: '.'
    format: 'sarif'
    severity: 'medium'
- uses: github/codeql-action/upload-sarif@v4
  with:
    sarif_file: aegisgate-report.sarif
```

The Action uploads SARIF results directly to GitHub's code scanning UI, so findings appear inline in your PRs — same workflow you'd use with CodeQL or Semgrep. Use `@v0` for auto-updating to the latest major version, or pin `@v0.3.0` for reproducibility.

The scanner is also live on the [GitHub Marketplace](https://github.com/marketplace/actions/aegisgate-scanner).

### Docker

Two images from a single Dockerfile:

```bash
# ML-enabled (full detection, ~150MB)
docker build --target ml -t aegisgate-scanner .
docker run --rm -v $(pwd):/github/workspace aegisgate-scanner scan /github/workspace

# Lite (heuristic-only, ~20MB, distroless)
docker build --target lite -t aegisgate-scanner:lite .
docker run --rm -v $(pwd):/github/workspace aegisgate-scanner:lite scan /github/workspace
```

The lite image is distroless — no shell, no package manager, minimal attack surface. It's designed for CI pipelines where you want the smallest possible image and don't need ML detection.

---

## Output Formats

Scanner supports 8 output formats out of the box:

| Format | Flag | Use Case |
|---|---|---|
| Text | `--format text` | Terminal / human-readable |
| JSON | `--format json` | Programmatic / API integration |
| JSONL | `--format jsonl` | NDJSON for Splunk, ELK, Datadog |
| SARIF | `--format sarif` | GitHub Code Scanning / CI/CD |
| HTML | `--format html` | Reports / email / sharing |
| PR Comment | `--format pr-comment` | Pull request comment (markdown table) |
| GitHub Actions | `--format github-actions` | PR annotations in CI |
| SBOM | `--format sbom` | SPDX software bill of materials |

---

## Performance

The v0.3.0 release includes a performance sprint that achieved a **12x improvement** over v0.2.0 through line-by-line keyword pre-filtering and binary-search line/column lookup:

| Input Size | Latency | Throughput |
|---|---|---|
| 1 KB | 18.7 ms | ~53 KB/s |
| 100 KB | 0.19 s | ~526 KB/s |
| 1 MB | 1.88 s | ~532 KB/s |
| 10 MB | 18.8 s | ~532 KB/s |

Latency scales linearly with input size. The 1 KB case (~19ms) is suitable for real-time IDE integration. A self-scan of the scanner's own codebase (61 Go files) completes in 5.8 seconds with 14 MB peak memory.

---

## Advanced Features

### Archive Extraction
Scanner extracts and scans inside `.zip`, `.tar.gz`, and `.tar.bz2` archives. Archive bomb protection enforces a 100MB extraction limit and 10,000 file count limit. Path traversal (Zip Slip / Tar Slip) is blocked.

### Baseline Suppression
Suppress known or accepted findings using `--diff --baseline` to show only new findings since the last scan. Useful for CI/CD gating without blocking on pre-existing issues.

### Content-Hash Caching
Skip re-scanning unchanged files across runs. Results are cached by SHA-256(content) — renamed files still hit the cache. Only content changes, pattern changes, or scanner version bumps invalidate the cache.

### Git History Scanning
The `scan-history` command scans commit-by-commit, showing when findings were introduced and by whom.

### Configuration
Create a `.aegisgate.yml` in your project root to configure ignore paths, severity thresholds, custom patterns, and more:

```yaml
ignore_paths:
  - "node_modules"
  - "vendor"
  - "dist"
severity: "medium"
ml: false
custom_patterns:
  - name: "custom_api_key"
    regex: "MY_KEY_[a-zA-Z0-9]{32}"
    severity: "high"
    description: "Custom API key format"
```

---

## Testing

The scanner is extensively tested:

| Test Type | Count | Description |
|---|---|---|
| Unit tests | 1,080+ | Per-function correctness |
| Benchmark tests | 8 | Performance regression detection |
| Fuzz tests | 6 | Random input crash detection |
| Race tests | 7 | Concurrent access validation |
| Archive security tests | 12 | Bomb/traversal/symlink protection |
| Evasion suite | 1 | 50 transforms × 52 adversarial payloads |
| E2E tests | 10 | Full pipeline integration |

All 9 testable packages maintain ≥90% coverage. The scanner passes with the Go race detector enabled. Fuzz testing runs in CI.

---

## Where It Fits in the AegisGate Ecosystem

AegisGate Scanner is the fourth product in our ecosystem:

- **[AegisGate Platform](https://github.com/aegisgatesecurity/aegisgate-platform)** — Server-side AI security gateway. Intercepts live API calls, runs 223 detection patterns, 30+ compliance frameworks, MCP/A2A/ACP protection. For teams running AI in production.
- **[AegisGate Rampart](https://github.com/aegisgatesecurity/aegisgate-rampart)** — Free local proxy. Intercepts secrets and sensitive data before they leave your machine when using AI coding tools (Copilot, Cursor, local LLMs). For individual developers.
- **[AegisGate MCP](https://github.com/aegisgatesecurity/aegisgate-mcp)** — Standalone secure MCP server framework with 23 security layers built in. For teams building MCP servers.
- **AegisGate Scanner** — Static analysis for AI artifacts. Runs in CI/CD or locally. Scans files before they reach your AI system.

Scanner occupies a unique niche: it scans **files** (not live traffic), it runs **in your pipeline** (not as a proxy), and it targets **AI-specific threats** (not just code vulnerabilities). It's the shift-left complement to our runtime products.

---

## What's Next

v0.3.0 is the first public release. The roadmap includes:

- **Scanner-specific corpus evaluation** — dedicated test corpora for static analysis, not just ported runtime tests
- **Competitive benchmark report** — head-to-head against TruffleHog, Gitleaks, and Semgrep
- **Transformer-based ML model upgrade** — DistilBERT/BERT for enhanced adversarial detection
- **Multimodal artifact support** — image-based prompt injection detection
- **Streaming scan mode** — chunk-based processing for very large files
- **Additional archive formats** — .7z, .rar

---

## Get Started

```bash
curl -fsSL https://raw.githubusercontent.com/aegisgatesecurity/aegisgate-scanner/main/install.sh | bash
aegisgate-scanner scan ./my-project
```

- **GitHub**: [aegisgatesecurity/aegisgate-scanner](https://github.com/aegisgatesecurity/aegisgate-scanner)
- **GitHub Marketplace**: [AegisGate Scanner Action](https://github.com/marketplace/actions/aegisgate-scanner)
- **Scanner page**: [aegisgatesecurity.io/scanner/](https://aegisgatesecurity.io/scanner/)
- **License**: Apache 2.0
- **Patent**: US Provisional 64/174,824 filed

If Scanner helps you secure your AI artifacts, please consider ⭐ starring the repo. It helps others discover it.

**Secure Every AI Interaction.**

---

*Josh Colvin is the founder of AegisGate Security, LLC. He writes about AI security, threat detection, and the practical realities of defending AI systems in production.*