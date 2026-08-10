---
title: "Secure Every AI Interaction"
description: "Free browser protection, developer-grade local proxy, and enterprise AI security gateway. Three products that protect you before you press send on any AI tool — from ChatGPT to Copilot to custom LLMs."
type: "landing"
---

<!-- ============================================================
     HERO SECTION — Brand + Suite Overview
     Target: ALL users. Plain language. What is AegisGate?
     ============================================================ -->

<div class="hero-badges-wrapper">
<div class="project-badges">
    <a href="https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v4.0.0" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Platform-v4.0.0-blue?logo=semver" alt="Platform Version"></a>
    <a href="https://github.com/aegisgatesecurity/aegisgate-lens/releases/tag/v0.3.0" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Lens-v0.3.0-blue?logo=semver" alt="Lens Version"></a>
    <a href="https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.0" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Rampart-v0.6.0-blue?logo=semver" alt="Rampart Version"></a>
    <a href="https://github.com/aegisgatesecurity/aegisgate-platform" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
</div>
</div>

<p class="hero-description">Every time you type a prompt into an AI tool, you might be leaking sensitive data — passwords, API keys, personal information, trade secrets. <strong>AegisGate catches those risks before you press send.</strong> Three products, one mission: secure every AI interaction.</p>

<div class="alert alert-success alert-center">
<strong>100% open source.</strong> Apache 2.0. No data collection. No vendor lock-in. Self-hosted or cloud. Deploy in 60 seconds.
</div>

<!-- ============================================================
     THREE PRODUCTS — Audience Paths
     ============================================================ -->

<h2 style="text-align:center; margin-top:60px;">Which one are you?</h2>

<p style="text-align:center; color:#888; font-size:1.1rem; margin-bottom:40px;">Pick your path — we'll meet you where you are.</p>

<div class="card-grid card-grid-3">

<!-- ── BEGINNER PATH: LENS ────────────────────────────────── -->
<div class="card" style="border-color:#38bdf8;">
<h3>🛡️ Lens — For Everyone <span class="badge">FREE</span></h3>
<p><strong>You use ChatGPT, Claude, or other AI chat tools.</strong></p>
<p>Lens is a free browser extension that watches what you type into AI chat sites. If you're about to send your Social Security number, a password, an API key, or a prompt injection attack — it warns you <em>before</em> you click send.</p>
<ul>
<li>Works with 10 AI chat tools (ChatGPT, Claude, Gemini, Copilot, and more)</li>
<li>Detects PII, passwords, API keys, XSS, compliance risks, and adversarial attacks</li>
<li>100% on-device — nothing ever leaves your browser</li>
<li>Free forever. No account needed. No data collected.</li>
</ul>
<p>
<a href="https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip" class="btn btn-primary">Install for Chrome →</a>
<a href="/lens/" class="btn btn-secondary">Learn more →</a>
</p>
</div>

<!-- ── ADVANCED PATH: RAMPART ─────────────────────────────── -->
<div class="card" style="border-color:#f59e0b;">
<h3>⚡ Rampart — For Developers</h3>
<p><strong>You write code and use AI coding tools like Copilot or Cursor.</strong></p>
<p>Rampart runs as a local proxy on your machine, intercepting AI traffic from any tool — Copilot, Cursor, local LLMs, API calls. It scans prompts and responses for security risks in real-time, right in your IDE.</p>
<ul>
<li>Local proxy mode: intercepts all AI traffic transparently</li>
<li>IDE integration: VS Code, Cursor, JetBrains, Neovim, any LSP editor</li>
<li>Real-time detection in your editor — no context switching</li>
<li>Catches secrets, PII, injection attacks before they reach the AI model</li>
</ul>
<p>
<a href="https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.0" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download Rampart →</a>
<a href="/rampart/" class="btn btn-secondary">Learn more →</a>
</p>
</div>

<!-- ── ENTERPRISE PATH: PLATFORM ─────────────────────────── -->
<div class="card" style="border-color:#10b981;">
<h3>🏢 Platform — For Teams & Organizations</h3>
<p><strong>You need to secure AI usage across your entire organization.</strong></p>
<p>Platform is an enterprise gateway that sits between your users and any AI service. It scans all AI traffic — HTTP APIs, MCP, agent-to-agent protocols, and AI responses — with 31 compliance frameworks, SIEM/SOAR integration, and a web UI.</p>
<ul>
<li>6 attack surfaces: HTTP API, MCP, A2A, ACP, Response, Trust Framework</li>
<li>31 compliance frameworks (HIPAA, SOC 2, EU AI Act, FedRAMP, and more)</li>
<li>SIEM integration (12 platforms), SOAR integration (4 platforms)</li>
<li>Web UI, multi-tenant, air-gapped deployment, single 19.1MB Go binary</li>
</ul>
<p>
<a href="https://demo.aegisgatesecurity.io/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">🚀 Try the Live Demo</a>
<a href="/platform/" class="btn btn-secondary">Learn more →</a>
</p>
</div>

</div>

<!-- ============================================================
     WHAT DOES AEGISGATE ACTUALLY DETECT?
     Plain language for all users
     ============================================================ -->

<h2 style="text-align:center; margin-top:60px;">What does AegisGate catch?</h2>

<p style="text-align:center; color:#888; font-size:1.1rem; margin-bottom:40px;">The risks you didn't know you were taking.</p>

<div class="card-grid card-grid-2x2">

<div class="card">
<h3>🔐 Personal Information (PII)</h3>
<p>Social Security numbers, email addresses, phone numbers, passport numbers, credit card numbers, bank routing numbers. If it identifies a person, Lens and Rampart catch it before it reaches the AI.</p>
</div>

<div class="card">
<h3>🔑 Secrets & Credentials</h3>
<p>API keys, AWS access keys, GitHub tokens, database passwords, private SSH keys, JWT tokens. The #1 way data breaches happen is secrets accidentally pasted into AI chat.</p>
</div>

<div class="card">
<h3>💉 Prompt Injection Attacks</h3>
<p>Adversarial prompts designed to manipulate AI into ignoring safety rules, leaking system prompts, or executing unauthorized actions. Our ML model catches 100/100 known attack patterns.</p>
</div>

<div class="card">
<h3>📋 Compliance Risks</h3>
<p>Text that violates HIPAA, GDPR, PCI-DSS, EU AI Act, or 27 other regulatory frameworks. Enterprise teams get automatic compliance scanning on every AI interaction.</p>
</div>

</div>

<!-- ============================================================
     PRODUCT COMPARISON AT A GLANCE
     ============================================================ -->

<h2 style="text-align:center; margin-top:60px;">Three products, one mission</h2>

<table class="comparison-table">
<thead>
<tr>
<th></th>
<th>🛡️ Lens</th>
<th>⚡ Rampart</th>
<th>🏢 Platform</th>
</tr>
</thead>
<tbody>
<tr>
<td class="metric-label"><strong>Who it's for</strong></td>
<td>Everyone</td>
<td>Developers</td>
<td>Teams & Enterprises</td>
</tr>
<tr>
<td class="metric-label"><strong>What it protects</strong></td>
<td>Browser AI chat</td>
<td>IDE + local proxy</td>
<td>All AI traffic</td>
</tr>
<tr>
<td class="metric-label"><strong>Deployment</strong></td>
<td>Browser extension</td>
<td>Local proxy + IDE plugin</td>
<td>Self-hosted server</td>
</tr>
<tr>
<td class="metric-label"><strong>AI tools covered</strong></td>
<td>10 chat tools</td>
<td>Copilot, Cursor, any LLM</td>
<td>Any HTTP/MCP/A2A traffic</td>
</tr>
<tr>
<td class="metric-label"><strong>Price</strong></td>
<td>Free forever</td>
<td>Free / open source</td>
<td>Free tier + paid tiers</td>
</tr>
<tr>
<td class="metric-label"><strong>Compliance frameworks</strong></td>
<td>5 facets (PII, secrets, XSS, compliance, ML)</td>
<td>Same detection engine</td>
<td>31 frameworks</td>
</tr>
<tr>
<td class="metric-label"><strong>Data collection</strong></td>
<td>Zero</td>
<td>Zero</td>
<td>Zero (self-hosted)</td>
</tr>
<tr>
<td class="metric-label"><strong>Open source</strong></td>
<td>✅ Apache 2.0</td>
<td>✅ Apache 2.0</td>
<td>✅ Apache 2.0</td>
</tr>
</tbody>
</table>

<!-- ============================================================
     WHY AEGISGATE — Key Differentiators
     ============================================================ -->

<h2 style="text-align:center; margin-top:60px;">Why AegisGate?</h2>

<div class="card-grid card-grid-2x2">

<div class="card">
<h3>🔒 Zero Data Collection</h3>
<p>Every product runs on your machine or your infrastructure. No telemetry. No analytics. No phone-home. Your prompts never leave your control.</p>
</div>

<div class="card">
<h3>🧠 ML Threat Detection</h3>
<p>CharCNN-BiLSTM neural network (1.58M params) runs in pure JavaScript in your browser. 100/100 evasion resistance, 0% false positive rate, ~5ms inference. No cloud calls.</p>
</div>

<div class="card">
<h3>🏗️ Self-Hosted, No Lock-In</h3>
<p>Platform is a single 19.1MB Go binary. Deploy in 60 seconds with Docker. Air-gapped deployment supported. No SaaS dependency, no vendor lock-in, no subscription required.</p>
</div>

<div class="card">
<h3>📊 Proven at Scale</h3>
<p>5,000 concurrent virtual users, 23,578 requests per second, 0% errors. 11,983+ tests passing. 31 compliance frameworks. 12 SIEM integrations. 4 SOAR integrations.</p>
</div>

</div>

<!-- ============================================================
     GET STARTED — Quick CTAs by product
     ============================================================ -->

<h2 style="text-align:center; margin-top:60px;">Get started in 60 seconds</h2>

<div class="card-grid card-grid-3">

<div class="card text-center" style="border-color:#38bdf8;">
<h3>🛡️ Install Lens</h3>
<p>Free browser extension. Chrome or Firefox.</p>
<p><a href="https://chromewebstore.google.com/detail/aegisgate-lens/lkioinepjpjfdhiggaomoafnhagfcjip" class="btn btn-primary">Chrome Web Store →</a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/aegisgate-lens/" class="btn btn-primary">Firefox Add-ons →</a></p>
</div>

<div class="card text-center" style="border-color:#f59e0b;">
<h3>⚡ Download Rampart</h3>
<p>Local proxy + IDE plugin. macOS, Linux, Windows.</p>
<p><a href="https://github.com/aegisgatesecurity/aegisgate-rampart/releases/tag/v0.6.0" target="_blank" rel="noopener noreferrer" class="btn btn-primary">GitHub Releases →</a></p>
<p style="font-size:0.85rem; color:#888;">VS Code, JetBrains, Neovim, any LSP editor</p>
</div>

<div class="card text-center" style="border-color:#10b981;">
<h3>🏢 Deploy Platform</h3>
<p>Single binary. Docker or bare metal.</p>
<div class="command-box">
<button class="copy-btn">Copy</button>
<pre>docker run -d -p 8080:8080 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v4.0.0</pre>
</div>
<p><a href="https://demo.aegisgatesecurity.io/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Try Live Demo →</a></p>
</div>

</div>

<!-- ============================================================
     BY THE NUMBERS
     ============================================================ -->

<h2 style="text-align:center; margin-top:60px;">By the numbers</h2>

<div class="card-grid card-grid-3">
<div class="card text-center">
<h3 style="font-size:2.5rem; color:#38bdf8;">10</h3>
<p>AI chat tools Lens protects</p>
</div>
<div class="card text-center">
<h3 style="font-size:2.5rem; color:#f59e0b;">100/100</h3>
<p>Adversarial attack patterns caught</p>
</div>
<div class="card text-center">
<h3 style="font-size:2.5rem; color:#10b981;">0%</h3>
<p>False positive rate</p>
</div>
<div class="card text-center">
<h3 style="font-size:2.5rem; color:#38bdf8;">31</h3>
<p>Compliance frameworks</p>
</div>
<div class="card text-center">
<h3 style="font-size:2.5rem; color:#f59e0b;">23,578</h3>
<p>Requests per second sustained</p>
</div>
<div class="card text-center">
<h3 style="font-size:2.5rem; color:#10b981;">~5ms</h3>
<p>Detection latency</p>
</div>
</div>

<!-- ============================================================
     LINKS & RESOURCES
     ============================================================ -->

<h2 style="text-align:center; margin-top:60px;">Explore further</h2>

<div class="card-grid card-grid-2x2">

<div class="card">
<h3>📖 Documentation</h3>
<ul>
<li><a href="/docs/">Full documentation</a> — architecture, API, deployment, configuration</li>
<li><a href="/docs/executive-brief/">Executive brief</a> — one-page overview for CISOs and CIOs</li>
<li><a href="/docs/ide-integration/">IDE integration guide</a> — VS Code, JetBrains, Neovim, LSP</li>
<li><a href="/docs/siem-soar-integration/">SIEM/SOAR integration</a> — 12 SIEM + 4 SOAR platforms</li>
<li><a href="/docs/comparison/">Competitive comparison</a> — 7 competitors, 31 frameworks</li>
</ul>
</div>

<div class="card">
<h3>🔗 Resources</h3>
<ul>
<li><a href="/lens/">Lens product page</a> — full feature list, architecture, privacy</li>
<li><a href="/rampart/">Rampart product page</a> — local proxy, IDE plugins, developer guide</li>
<li><a href="/platform/">Platform product page</a> — enterprise gateway, six pillars, compliance, SIEM/SOAR</li>
<li><a href="/pricing/">Pricing</a> — 5 tiers from free to enterprise</li>
<li><a href="/compliance/">Compliance documentation</a> — HIPAA, SOC 2, EU AI Act, FedRAMP</li>
<li><a href="/blog/">Blog</a> — case studies, technical deep dives</li>
</ul>
</div>

<div class="card">
<h3>🛡️ Security</h3>
<ul>
<li><a href="/cve/">CVE Feed</a> — AegisGate vulnerability disclosures</li>
<li><a href="/atlas/">ATLAS coverage</a> — MITRE ATLAS technique mapping</li>
<li><a href="/tech/">Technical architecture</a> — six-pillar deep dive</li>
<li><a href="/changelog/">Changelog</a> — version history and release notes</li>
</ul>
</div>

<div class="card">
<h3>💬 Community</h3>
<ul>
<li><a href="https://github.com/aegisgatesecurity" target="_blank" rel="noopener noreferrer">GitHub</a> — all 6 repos, Apache 2.0</li>
<li><a href="https://x.com/aegisgate" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
<li><a href="https://mastodon.social/@aegisgate" target="_blank" rel="noopener noreferrer">Mastodon</a></li>
<li><a href="mailto:security@aegisgatesecurity.io">security@aegisgatesecurity.io</a></li>
<li><a href="mailto:sales@aegisgatesecurity.io">sales@aegisgatesecurity.io</a></li>
</ul>
</div>

</div>