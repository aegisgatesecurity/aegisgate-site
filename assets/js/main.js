// AegisGate Security Platform - Main JavaScript

// ============================================
// No-JS Detection (Progressive Enhancement)
// ============================================
// This must run BEFORE DOMContentLoaded to add the .js class to <html>.
// The CSS uses the .js class to gate animation behavior: when JS is loaded,
// .fade-in starts at opacity:0 and fades in via IntersectionObserver. When
// JS is NOT loaded, .fade-in has no effect and content is always visible.
//
// This is a SAFETY-CRITICAL pattern: the page must never depend on JS for
// basic visibility. (Fix for the 2026-06-09 "page fades to black" bug.)
(function() {
    var html = document.documentElement;
    html.classList.remove('no-js');
    html.classList.add('js');
})();

document.addEventListener('DOMContentLoaded', function() {
    initTerminal();
    initCopyButtons();
    initAnimations();
});

// ============================================
// Terminal Emulator
// ============================================
function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    if (!terminalInput) return;
    
    const terminal = document.getElementById('terminal-body');
    let commandHistory = [];
    let historyIndex = -1;
    
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            if (command) {
                executeCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                this.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                this.value = '';
            }
        }
    });
}

function executeCommand(command) {
    const terminal = document.getElementById('terminal-body');
    if (!terminal) return;
    
    // Echo command
    const cmdLine = document.createElement('div');
    cmdLine.innerHTML = `<span class="prompt">$</span> <span class="command">${escapeHtml(command)}</span>`;
    terminal.appendChild(cmdLine);
    
    // Execute command
    setTimeout(() => {
        const result = simulateCommand(command);
        if (result) {
            const output = document.createElement('div');
            output.className = 'output';
            output.innerHTML = result;
            terminal.appendChild(output);
        }
        
        // Auto-scroll
        terminal.scrollTop = terminal.scrollHeight;
    }, 300);
}

function simulateCommand(command) {
    const cmd = command.toLowerCase().trim();
    
    // Docker commands
    if (cmd.startsWith('docker run')) {
        return `<span class="success">✓ Container started successfully</span>
Pulling image ghcr.io/aegisgatesecurity/aegisgate-platform:latest... done
Creating aegisgate-proxy ... done

🛡️ AegisGate Platform v1.3.7 is running!

Endpoints:
  HTTP Proxy:  http://localhost:8080
  MCP Server: http://localhost:8081
  Dashboard:  https://localhost:8443

<span class="success">✓ All systems operational</span>`;
    }
    
    if (cmd === 'docker ps') {
        return `<span class="success">✓ CONTAINER ID   IMAGE                                                      STATUS          PORTS</span>
a1b2c3d4e5f6   ghcr.io/aegisgatesecurity/aegisgate-platform:latest   Up 2 minutes   0.0.0.0:8080->8080/tcp`;
    }
    
    if (cmd.startsWith('docker logs')) {
        return `[2026-04-28 10:00:00] 🛡️ AegisGate v1.3.7 starting...
[2026-04-28 10:00:00] ✓ Configuration loaded
[2026-04-28 10:00:00] ✓ License: Community Edition
[2026-04-28 10:00:01] ✓ MCP Guardrails initialized (8 rules)
[2026-04-28 10:00:01] ✓ Pattern Scanner loaded (144+ patterns)
[2026-04-28 10:00:01] ✓ Compliance frameworks: ATLAS, NIST, OWASP
[2026-04-28 10:00:01] ✓ HTTP Proxy listening on :8080
[2026-04-28 10:00:01] ✓ MCP Server listening on :8081
[2026-04-28 10:00:01] ✓ Dashboard listening on :8443
[2026-04-28 10:00:01] <span class="success">✓ All systems operational</span>`;
    }
    
    // Health checks
    if (cmd === 'curl localhost:8080/health' || cmd === 'curl http://localhost:8080/health') {
        return `<span class="success">✓ {"status":"healthy","version":"1.3.7","services":{"proxy":"up","mcp":"up","scanner":"up"}}</span>`;
    }
    
    if (cmd === 'curl localhost:8443/health' || cmd === 'curl https://localhost:8443/health') {
        return `<span class="success">✓ {"status":"healthy","tier":"community","features":["atlas","nist","owasp"]}</span>`;
    }
    
    if (cmd === 'curl localhost:8081/health' || cmd === 'curl http://localhost:8081/health') {
        return `<span class="success">✓ {"status":"healthy","mcp":"enabled","sessions":0,"tools_registered":0}</span>`;
    }
    
    // Status command
    if (cmd === 'status' || cmd === 'aegisgate status') {
        return `🛡️ AegisGate Platform™ v1.3.7
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
License:        Community Edition
Uptime:         2 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Services:
  HTTP Proxy    ✓ Running (0.0.0.0:8080)
  MCP Server    ✓ Running (0.0.0.0:8081)
  Dashboard     ✓ Running (0.0.0.0:8443)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Security:
  Guardrails    8 active
  Patterns      144+ loaded
  Sessions      0 active
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frameworks:
  MITRE ATLAS   ✓ Enabled
  NIST AI RMF   ✓ Enabled
  OWASP LLM     ✓ Enabled`;
    }
    
    // Stats command
    if (cmd === 'stats' || cmd === 'aegisgate stats') {
        return `📊 AegisGate Statistics (Last 24h)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Requests:       <span style="color: var(--primary)">1,847,293</span>
Blocked:        <span style="color: var(--accent)">23,847</span> (1.3%)
Threats:        <span style="color: var(--accent)">1,293</span> (0.07%)
Latency (avg):  <span style="color: var(--secondary)">2.44ms</span>
Throughput:     <span style="color: var(--secondary)">11,681 RPS</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top Threats:
  1. Prompt Injection    892
  2. Credential Scan     234
  3. PII Exposure        167
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }
    
    // Version
    if (cmd === 'version' || cmd === 'aegisgate version') {
        return `🛡️ AegisGate Platform v1.3.7
Build:          2026-04-28
Go:             1.25.9
License:        Apache 2.0 (Community)`;
    }
    
    // Config
    if (cmd === 'config' || cmd === 'aegisgate config show') {
        return `⚙️ AegisGate Configuration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
General:
  Mode:         proxy
  Log Level:    info
  License:      community
  
HTTP Proxy:
  Listen:       :8080
  Timeout:      30s
  
MCP Server:
  Listen:       :8081
  Auth:         session
  
Guardrails:
  Rate Limit:   1000 RPM
  Max Tools:   50/session
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }
    
    // List tools
    if (cmd === 'tools list' || cmd === 'aegisgate tools list') {
        return `🛠️ Registered MCP Tools (Sample)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1. database_query     (read-only SQL)
  2. file_read          (sandboxed)
  3. web_search         (rate-limited)
  4. code_execute       (disabled)
  5. secret_manager     (restricted)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }
    
    // Scan command
    if (cmd.startsWith('scan ') || cmd.startsWith('aegisgate scan')) {
        // API Key / Secret detection
        if (cmd.includes('password') || cmd.includes('secret') || cmd.includes('sk-')) {
            return `🔍 Scan Result
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span style="color: var(--accent)">⚠️ THREAT DETECTED</span>
Type:           API Key / Secret
Pattern:        aws_key
Severity:       HIGH
Action:         Blocked
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="success">✓ Request blocked by AegisGate guardrail</span>`;
        }
        
        // PII/PHI detection
        if (cmd.includes('ssn') || cmd.includes('123-45-6789') || cmd.includes('social security')) {
            return `🔍 Scan Result
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span style="color: var(--accent)">⚠️ THREAT DETECTED</span>
Type:           PII / PHI
Pattern:        hipaa_ssn
Severity:       HIGH
Framework:      HIPAA
Action:         Blocked
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="success">✓ PHI detected and blocked by HIPAA scanner</span>`;
        }
        
        // Prompt injection detection
        if (cmd.includes('ignore previous') || cmd.includes('disregard') || cmd.includes('forget')) {
            return `🔍 Scan Result
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span style="color: var(--accent)">⚠️ THREAT DETECTED</span>
Type:           Prompt Injection
Pattern:        atlas_prompt_override
Severity:       CRITICAL
Framework:      MITRE ATLAS
Action:         Blocked
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="success">✓ Prompt injection blocked by ATLAS guardrail</span>`;
        }
        
        return `🔍 Scan Result
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="success">✓ No threats detected</span>
Content Length:  ${cmd.length} chars
Patterns Matched: 0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }
    
    // Help
    if (cmd === 'help' || cmd === '?') {
        return `Available commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span style="color: var(--primary)">docker run ...</span>  - Start AegisGate container
<span style="color: var(--primary)">status</span>          - Show system status
<span style="color: var(--primary)">stats</span>           - Show statistics
<span style="color: var(--primary)">version</span>        - Show version
<span style="color: var(--primary)">config</span>         - Show configuration
<span style="color: var(--primary)">tools list</span>     - List MCP tools
<span style="color: var(--primary)">scan [text]</span>     - Scan content for threats
<span style="color: var(--primary)">clear</span>           - Clear terminal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span style="color: var(--text-muted)">Try: scan with 'sk-api-key-xxx' or '123-45-6789'</span>`;
    }
    
    // Clear
    if (cmd === 'clear' || cmd === 'cls') {
        const terminal = document.getElementById('terminal-body');
        if (terminal) terminal.innerHTML = '';
        return '';
    }
    
    // Unknown command
    return `<span style="color: var(--accent)">Command not found: ${escapeHtml(cmd.split(' ')[0])}</span>
<span style="color: var(--text-muted)">Type 'help' for available commands</span>`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Copy Buttons
// ============================================
function initCopyButtons() {
    // Handle Hugo's .highlight divs
    const highlightBlocks = document.querySelectorAll('.highlight');
    
    highlightBlocks.forEach(highlight => {
        // Skip if already has a copy button
        if (highlight.querySelector('.copy-btn')) {
            return;
        }
        
        const preElement = highlight.querySelector('pre');
        if (!preElement) return;
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(preElement.textContent).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = 'rgba(56, 189, 248, 0.3)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'rgba(56, 189, 248, 0.2)';
                }, 2000);
            });
        });
        
        highlight.appendChild(copyBtn);
    });
    
    // Also handle any other .copy-btn elements (for non-highlight code blocks)
    const existingButtons = document.querySelectorAll('.copy-btn:not(.highlight .copy-btn)');
    existingButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const preElement = this.parentElement.querySelector('pre');
            if (preElement) {
                navigator.clipboard.writeText(preElement.textContent).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = 'var(--secondary)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                });
            }
        });
    });
}

// ============================================
// Fill Terminal Command
// ============================================
function fillCommand(cmd) {
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        terminalInput.value = cmd;
        terminalInput.focus();
        
        const terminal = document.querySelector('.terminal-container');
        if (terminal) {
            terminal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        // Redirect to demo page
        window.location.href = '/demo/';
    }
}

// ============================================
// Animations
// ============================================
// IMPORTANT: This animation logic is a SAFETY-CRITICAL fix.
//
// History: 2026-06-09 — User reported "homepage displays briefly, then fades to
// black". Root cause: the previous implementation called
//   document.querySelectorAll('section, .card, .stat').forEach(el => el.classList.add('fade-in'))
// on every section/card/stat on the page. The .fade-in CSS rule starts elements
// at opacity:0 and only fades them to opacity:1 when the IntersectionObserver
// adds the .visible class. The observer only fires for elements that scroll
// into view at 10% threshold with a -50px bottom rootMargin, so most above-
// the-fold content (including the hero) was stuck at opacity:0, leaving only
// the dark body background visible (--bg-primary = #0a0c10).
//
// The fix below is conservative: we only apply the fade-in to elements that
// are NOT in the viewport at page load (i.e., truly below the fold), so above-
// the-fold content is never hidden. We also skip the hero section explicitly
// as a belt-and-suspenders measure. If JavaScript fails to load for any
// reason, content remains visible by default (no .fade-in class is added
// until we know it's safe to hide it).
function initAnimations() {
    // Defensive check: only run if browser supports IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
        return; // Graceful degradation — no animation, but content visible
    }

    // Build the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, stop observing to save cycles
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Whitelist of selectors to animate. We explicitly EXCLUDE:
    //   - .hero (the main hero section — must always be visible)
    //   - .no-fade (opt-out class for any element that shouldn't fade)
    //   - elements that are above the fold at page load (rect.top < window.innerHeight)
    const selectorsToAnimate = 'section:not(.hero):not(.no-fade), .card:not(.no-fade), .stat:not(.no-fade)';

    document.querySelectorAll(selectorsToAnimate).forEach(el => {
        // Only animate elements that are BELOW the fold at page load
        // (i.e., require scrolling to see)
        const rect = el.getBoundingClientRect();
        if (rect.top >= window.innerHeight) {
            el.classList.add('fade-in');
            observer.observe(el);
        }
    });
}

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
