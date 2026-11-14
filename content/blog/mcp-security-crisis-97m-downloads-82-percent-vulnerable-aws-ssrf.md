---
title: "The MCP Security Crisis: 97M Downloads, 82% Vulnerable, and AWS Can't Even Get It Right"
slug: mcp-security-crisis-97m-downloads-82-percent-vulnerable-aws-ssrf
description: "The Model Context Protocol has 97M+ monthly downloads and an 82% path traversal vulnerability rate. AWS's own mcp-gateway-registry had an SSRF. 38% of public servers expose tools without authentication. Here's the threat landscape — and the open-source defense."
date: 2026-11-14
author: Josh Colvin
draft: false
tags:
  - mcp
  - model-context-protocol
  - ai-security
  - owasp
  - tool-poisoning
  - ssrf
  - supply-chain
  - open-source
---

The Model Context Protocol has a security problem, and the numbers are now too large to ignore.

97M+ monthly downloads. 82% of MCP servers vulnerable to path traversal. 8.5% using any form of authentication. 38% of 514 public servers exposing tools without auth. And on November 12, AWS's own `mcp-gateway-registry` was hit with CVE-2026-125926 — a server-side request forgery vulnerability in the reference implementation from the company that literally invented cloud security.

This isn't a fringe protocol with a small attack surface. MCP is the standard way AI models interact with external tools. Claude Desktop uses it. Cursor uses it. Windsurf uses it. The official registry lists hundreds of servers. The ecosystem is growing faster than its security — and the security was never good to begin with. I wrote about tool poisoning in October. The numbers have gotten worse since then.

---

## The Numbers

| Metric | Value | Source |
|--------|-------|--------|
| Monthly downloads | 97M+ | MCP registry stats, Nov 2026 |
| Path traversal vulnerability rate | 82% | MCP Security Statistics 2026 |
| Servers using OAuth/authentication | 8.5% | MCP Security Statistics 2026 |
| Public servers exposing tools without auth | 38% of 514 surveyed | Security Boulevard, Nov 5 |
| Critical CVEs in official MCP SDKs | 3 in 6 months | GitHub Advisory Database |
| Security advisories | 590+ | MCP Security Statistics 2026 |
| "Mother of All AI Supply Chains" flaw | 150M+ downloads affected | MCP SDK advisory |
| AWS mcp-gateway-registry CVE | CVE-2026-125926 (SSRF) | Nov 12, 2026 |

82% path traversal. That means 4 out of 5 MCP servers will let an attacker read arbitrary files from the filesystem — `/etc/passwd`, environment variables, SSH keys, application secrets — through a tool call. Not through an exploit. Through a legitimate tool call that the server processes without validation.

8.5% authentication. That means 91.5% of MCP servers have no authentication at all. Anyone who can reach the server can call any tool. No API key. No session token. No RBAC. Just a network connection and a JSON-RPC request.

---

## The AWS CVE — When the Reference Implementation Is Vulnerable

CVE-2026-125926 was published on November 12. The vulnerability is in AWS's `mcp-gateway-registry` — the reference implementation for running MCP servers in AWS environments. It's an SSRF (Server-Side Request Forgery) that allows an attacker to make the MCP server send requests to internal AWS metadata endpoints, potentially extracting IAM credentials, session tokens, and other secrets from the AWS instance metadata service.

The irony is sharp. AWS invented the shared responsibility model. AWS sells security as a first-class product. AWS's own MCP gateway had the same class of vulnerability that 82% of the ecosystem has — insufficient input validation on tool arguments that allows requests to internal resources. If the company that wrote the book on cloud security can't ship a secure MCP server, what hope does the average open-source contributor have?

The CVE has been patched, but the lesson is clear: if AWS's reference implementation had an SSRF, what do you think the 514 public servers in the registry look like?

---

## The OWASP MCP Top 10 — Where the Ecosystem Stands

The OWASP MCP Top 10 defines ten categories of MCP-specific risk. Here's where the ecosystem stands on each, and what AegisGate MCP does about it:

| OWASP MCP | Category | Ecosystem Status | AegisGate MCP Coverage |
|-----------|----------|------------------|------------------------|
| MCP01 | Token Mismanagement | 91.5% have no auth at all | Session management, 256-bit session IDs, 30-min expiry |
| MCP02 | Privilege Escalation | No RBAC in most servers | Role-based access control per tool, per request |
| MCP03 | Tool Poisoning | Active exploitation (Invariant Labs) | 22-pattern tool description scanner at registration time |
| MCP04 | Supply Chain Attacks | npm/PyPI dependencies | Zero external dependencies — Go stdlib only |
| MCP05 | Command Injection | Common in tool arguments | 28 dangerous function patterns + shell injection detection |
| MCP06 | Prompt Injection | Universal risk | 11 injection patterns + L3 neural ML detection |
| MCP07 | Insufficient Auth | 91.5% unauthenticated | Token auth, session management, RBAC enforcement |
| MCP08 | Lack of Audit | Most servers log nothing | Full audit logging — every request, every decision, every detection |
| MCP09 | Shadow MCP Servers | No inventory exists | Server inventory + registration screening |
| MCP10 | Context Injection | Response-level risk | Response scanning with PII/secret redaction |

---

## Tool Poisoning — The Attack That Keeps Working

In April 2025, Invariant Labs demonstrated that you don't need to hack an AI agent to make it misbehave. You just need to describe a tool. Hidden instructions in MCP tool descriptions manipulate agent behavior — and the user never sees the description, the agent never questions it, and the file gets exfiltrated through a perfectly normal tool call.

AegisGate MCP screens every tool registration with 22 tool poisoning patterns:

| Pattern | What It Catches |
|---------|-----------------|
| `ToolPoisonPathTraversal` | `../` sequences in tool arguments — the 82% vulnerability |
| `ToolPoisonSSRF` | Fetch requests to internal networks (169.254.x.x, 10.x.x.x, 192.168.x.x) |
| `ToolPoisonShellInjection` | Shell command chaining (`;`, `&&`, `\|`) with dangerous commands |
| `ToolPoisonExfilUrl` | Exfiltration URLs in tool arguments |
| `ToolPoisonConfigOverride` | Environment variable / config overrides in arguments |
| `ToolPoisonKeylogger` | Keylogger / keystroke capture references |
| `ToolPoisonReverseShell` | Netcat / reverse shell patterns |
| `ToolPoisonC2Beacon` | Command-and-control beacon patterns |
| `ToolPoisonRansomware` | File encryption / lock instructions |
| `ToolPoisonDataExfil` | Database / credential exfiltration instructions |
| `ToolPoisonSuspiciousPkgName` | Malicious package names in install instructions |
| `ToolPoisonCredentialForge` | Credential / token forgery instructions |
| `ToolPoisonB64Payload` | Base64-encoded payload execution |
| `ToolPoisonSSTI` | Server-side template injection (`{{__class__}}`) |
| `ToolPoisonXSSInArg` | XSS payloads in tool arguments |
| `ToolPoisonSQLiInArg` | SQL injection in tool arguments |
| `ToolPoisonIgnoreSafety` | Safety/guardrail override instructions |
| `ToolPoisonMultiTurn` | Multi-turn manipulation instructions |
| `ToolPoisonInstallInstruction` | Package install instructions in tool metadata |
| `ToolPoisonAgentInstruction` | Agent-directed install/execute in metadata |
| `ToolPoisonModifyBehavior` | Tool behavior modification instructions |

Registration-time screening means malicious tools are blocked before any agent can call them. No agent ever sees the poisoned description. No tool call is ever made.

---

## MCP Security Disclosure Is Broken

On November 5, Security Boulevard published an analysis showing that 38% of 514 public MCP servers exposed tools without any authentication. The article's conclusion: the MCP security disclosure process is fundamentally broken.

The problem is structural. MCP servers are published to the registry with no security review. There's no vulnerability disclosure requirement. There's no CVE process specific to MCP. There's no way for a user to know if the MCP server they just installed with Claude Desktop has been audited, tested, or even reviewed by anyone other than the author.

The official MCP SDK has had 3 critical CVEs in 6 months — including a CVSS 9.8 remote code execution and the "Mother of All AI Supply Chains" flaw affecting 150M+ downloads. The ecosystem is growing at 97M downloads per month. The security infrastructure isn't keeping up.

---

## What We Built

AegisGate MCP is a hardened MCP server framework with 23 security layers, 132 regex patterns, and L3 neural ML detection. Zero external dependencies — the entire binary is Go stdlib plus vendored ONNX runtime. It runs air-gapped. It runs in Docker. It runs as a standalone binary.

| Metric | Value |
|--------|-------|
| Security layers | 23 |
| Regex patterns | 132 |
| Tool poisoning patterns | 22 |
| External dependencies | 0 |
| CVEs | Zero. Ever. |
| Tests | 643 (611 unit/integration + 32 load/stress) |
| Coverage | 92.0% |
| ML inference | <1ms CPU (CharCNN-BiLSTM, 1.6M params) |
| License | Apache 2.0 |

### Quick Start

```bash
# Docker
docker pull ghcr.io/aegisgatesecurity/aegisgate-mcp:latest
docker run -p 8081:8081 ghcr.io/aegisgatesecurity/aegisgate-mcp:latest

# Build from source (air-gapped, zero deps)
git clone https://github.com/aegisgatesecurity/aegisgate-mcp.git
cd aegisgate-mcp
make build
./mcp-server --transport streamable-http --addr :8081
```

The server is live at `http://localhost:8081/mcp`. Every tool registration is automatically screened.

**MCP Registry:** `io.github.aegisgatesecurity/aegisgate-mcp`
**Also listed on:** [mcpservers.org](https://mcpservers.org/servers/aegisgatesecurity/aegisgate-mcp) · [Glama](https://glama.ai/mcp/servers/aegisgatesecurity/aegisgate-mcp) · [MCP Registry](https://registry.modelcontextprotocol.io/#/servers/io.github.aegisgatesecurity/aegisgate-mcp)

---

## What You Can Do Today

If you're using MCP servers with Claude Desktop, Cursor, Windsurf, or any other MCP client:

1. **Audit your MCP server list.** Check `claude_desktop_config.json` or your client's equivalent. Every server in that list has access to your filesystem, your tools, and your AI agent's context window.

2. **Check for authentication.** If your MCP server doesn't require a token, that's the first thing to fix. 91.5% of servers don't. Be the 8.5%.

3. **Screen tool descriptions.** Read every tool description in your MCP config. Look for instructions that reference other tools, system prompts, file paths, or install commands. Or use a framework that does this automatically.

4. **Run a security-first MCP server.** If you're building or running MCP servers, use a framework that treats security as architecture, not an afterthought. AegisGate MCP is Apache 2.0, zero-dependency, and has 23 security layers built in.

5. **Monitor for path traversal.** 82% of servers are vulnerable. If your server doesn't validate file paths in tool arguments, an attacker can read your secrets. Check now.

---

## The Bottom Line

MCP is the future of AI tool integration. It's also the future of AI attack surface. 97M monthly downloads with 82% path traversal vulnerability and 8.5% authentication is not a security posture — it's a target.

AWS — the company that wrote the book on cloud security — shipped an MCP gateway with an SSRF. The official SDK has had 3 critical CVEs in 6 months. The disclosure process is broken. The registry has no security review.

I built AegisGate MCP because I looked for a secure MCP server and couldn't find one. Not in the official registry. Not on mcpservers.org. Not on Glama. None of them had security layers. None of them had threat detection. None of them had so much as a regex scanner for known prompt injection patterns. So I built one.

It's free, it's open source, and it has zero dependencies, zero CVEs, and 23 security layers. There is no upsell here. There is no "schedule a demo." There is a repo you can clone and a Docker image you can pull.

The ecosystem won't fix itself. The vendors won't fix it for you. The disclosure process won't catch it in time. But you can deploy a security-first MCP server in the time it takes to run a `docker pull`.

Stay safe out there.

---

**[AegisGate MCP](https://github.com/aegisgatesecurity/aegisgate-mcp)** — Open-source MCP server framework with 23 security layers. 132 regex patterns. Zero dependencies. Apache 2.0.

**[MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers?search=aegisgate)** | **[GitHub](https://github.com/aegisgatesecurity/aegisgate-mcp)** | **[Docker](https://github.com/aegisgatesecurity/aegisgate-mcp/pkgs/container/aegisgate-mcp)**

**Secure Every AI Interaction.**

---

*Josh Colvin is the founder of [AegisGate Security](https://aegisgatesecurity.io), building open-source, self-hosted AI security. Apache 2.0. No telemetry. No data egress. [GitHub](https://github.com/aegisgatesecurity).*
