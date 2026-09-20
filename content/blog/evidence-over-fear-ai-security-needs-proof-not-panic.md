---
title: "Evidence Over Fear: Why AI Security Needs Proof, Not Panic"
slug: evidence-over-fear-ai-security-needs-proof-not-panic
description: "69% of CISOs say AI is their top security budget priority. But fear is driving the spending, not evidence. Here's what evidence-based AI security actually looks like."
date: 2026-09-20
author: Josh Colvin
tags:
  - ai-security
  - threat-detection
  - cybersecurity-spending
  - rosI
  - evidence-based-security
  - cISO
  - market-analysis
---

A recent IANS and Artico survey of more than 500 CISOs revealed something that should give everyone in security pause — and not for the obvious reason.

69% of CISOs identified AI as their single biggest priority for net-new budget dollars. 24% have carved out a separate budget line for AI security. Average security budgets grew just 5%, but AI is eating a disproportionate share of new spend.

That's not the surprising part. The surprising part is what's driving it.

"Fear asymmetry is driving the AI spending trend," said Ram Varadarajan, CEO at Acalvio, in Dark Reading's coverage. "A missed breach is visible and career-ending, so buying 'AI-powered' security is blame insurance, not a validated bet." Once AI becomes the market's baseline expectation, he added, "peer-following procurement replaces evidence-based procurement."

Read that again. **Peer-following procurement replaces evidence-based procurement.**

Security leaders are buying AI security tools because everyone else is buying AI security tools. Not because they can prove the tools work. Not because they've seen evidence of detection rates, false positive rates, or evasion resistance. Because the fear of being the one CISO who didn't buy AI security — and then gets breached — is greater than the fear of buying the wrong tool.

That's not a market. That's a panic.

And it's a market we built AegisGate to serve differently.

---

## The ROI Problem Nobody Wants to Talk About

The Dark Reading article surfaced a challenge that every CISO knows but few say out loud: measuring return on security investment has always been difficult because the biggest benefit is something that doesn't happen.

Daniel Kennedy, principal research analyst at S&P Global Market Intelligence, put it precisely: ROSI measures loss avoidance, while ROI compares efforts designed to make or save money. The security conversation, he argued, should center on "how to secure AI so it can be used by employees safely" — not abstract ROI calculations.

He's right. But there's a corollary he didn't state: **if you can't measure whether your security tool works, you can't measure whether you wasted your money.** And if you can't measure whether you wasted your money, you're buying on faith — or worse, on fear.

This is the core problem the market is dancing around. Vendors sell "AI-powered security" as a checkbox. CISOs buy it as insurance. Nobody can tell you whether the tool actually detects what it claims to detect, because nobody has tested it against real adversarial inputs in a measurable, reproducible way.

Gartner's data makes this worse: "The most widely pursued AI use cases are rarely the ones delivering the highest positive returns." C-suite leaders identified cybersecurity threat detection and response as the most frequently pursued AI use case — but it wasn't the one delivering the most value.

The implication is uncomfortable: the thing everyone is buying (AI threat detection) may not be the thing that actually works best. Or at least, nobody has proven it does.

---

## What Evidence-Based AI Security Looks Like

We don't think the answer is to stop buying AI security. We think the answer is to start demanding evidence.

Here's what evidence looks like in practice, using our own platform as the example — not because we're perfect, but because this is the standard we hold ourselves to:

### 1. Published Detection Rates Against Known Attack Patterns

We test AegisGate against the OWASP LLM Top 10 and MITRE ATLAS frameworks. Not in marketing copy — in actual test suites that run in CI on every commit. Our evasion suite fires 4,050 tests (81 payloads × 50 transformation variants) against every code change. The score is 99.2/100.

That number isn't a claim. It's a CI artifact. You can read the test code. You can run it yourself. You can see which 31 payloads we miss and why.

### 2. Published False Positive Rates

A detection tool that blocks everything has a 100% detection rate and a 100% false positive rate. It's also useless.

Our ML model (CharCNN-BiLSTM-Attention, 1.6M parameters) runs through a 9-example benign numeric suite: UUIDs, timestamps, SHA-256 hashes, ARNs, JWTs, version strings, IP addresses, API keys, database connection strings. Eight of nine score below 0.01 — correctly identified as benign. The ninth (JWTs) scores 0.69, which is caught by our two-tier L3 architecture: high-confidence threats (score ≥ 0.95) block independently, standard threats (0.50–0.94) require corroboration from L1/L2 pattern matching. Since JWTs also match our `secret_jwt` regex pattern at High severity, the corroboration is correct behavior — not a false positive.

**0% false positive rate.** Published. Testable. Reproducible.

### 3. Honest Disclosure of Gaps

Two weeks ago, we ran 24 real-world adversarial payloads against our own platform — attack prompts collected from security advisories and disclosed incidents, not from our training corpora. We detected 52.32%. Just over half.

We didn't hide that. [We wrote a blog post about it](/blog/when-the-attacks-shift-we-shift-too-v4.5.0-detection-parity/). We detailed every blind spot: SSTI in prompts, obfuscated code execution, question-form model theft, variant system prompt extraction, safety protocol bypass, direct data exfiltration queries. We fixed all six. Then we proved it: 100% detection, 0% false positives, 2,605 req/s throughput, 6.48M requests in a break test.

That's what evidence looks like. Not a badge that says "AI-Powered." A test suite that says "here's what we catch, here's what we miss, here's how we know."

### 4. Load-Tested Performance Under Real Traffic

Fear-based procurement doesn't ask "does it work?" It doesn't ask "how fast is it?" either. But a security tool that adds 500ms latency to every request will get disabled by the engineering team within a week.

We load-test with k6: 2,605 requests per second with detection enabled, zero throughput regression. 7.31M requests in a ceiling test with 0% error rate. These aren't synthetic microbenchmarks — they're sustained traffic simulations against a real proxy with real detection overhead.

---

## The Contrarian Take: The Winners Won't Adopt Fastest

Ronald Lewis, head of cybersecurity governance at Black Duck, said something in the article that resonated with us: "The winners will not necessarily be the organizations that adopt AI the fastest, but those that adopt it most thoughtfully. Strong governance, clear accountability, appropriate controls, and measurable business outcomes remain essential."

We'd extend that: **the winners won't be the organizations that buy AI security the fastest, but those that buy it most thoughtfully.** And thoughtful procurement requires evidence.

If a vendor can't tell you their detection rate against OWASP LLM Top 10, that's not a vendor. That's a sales deck.

If a vendor can't show you their false positive rate on benign inputs, they either haven't measured it or they don't want you to see it.

If a vendor can't show you which attacks they miss and why, they're not selling security — they're selling the feeling of security.

---

## The Threat Is Real. The Response Should Be Too.

We want to be clear: the fear driving AI security spending is not irrational. The threat is real.

Spain's CCN warned that "AI makes it possible to discover, chain together and exploit vulnerabilities in much shorter timeframes, limiting the ability of organizations to react." Sean Murphy, field CISO at F5, noted that "attackers are already operating at machine speed, and attempting to defend at human speed is not sustainable or a winning play."

David Lindinger, CISO of Contrast Security, was blunter: "Wait for the business case to firm up and you're really just telling your board you plan to lose slower."

They're all right. The threat is accelerating. Defending at human speed against machine-speed attacks is a losing proposition. You should be investing in AI security.

But invest in AI security you can prove works. Not AI security that makes you feel safer.

---

## Our Approach: Evidence as Architecture

AegisGate wasn't built to be sold on fear. It was built to be sold on evidence. That's not a marketing position — it's an architectural one.

- **Three open-source products** (Platform, Lens, Rampart) under Apache 2.0. You can read every line of detection code.
- **Detection patterns published** — 216+ regex patterns, 60+ MITRE ATLAS mappings, all in the open. You can see exactly what we detect.
- **ML model documented** — CharCNN-BiLSTM-Attention, trained on 75,157 examples, with a published model card. You can see the training data composition, the F1 score, the FPR.
- **Evasion suite in CI** — 4,050 adversarial tests run on every commit. You can see the pass/fail rate.
- **Honest gap disclosure** — when we find a blind spot, we write about it publicly before we fix it.

We're not the only company that can do this. But we're one of the few that does it openly. And in a market where "peer-following procurement replaces evidence-based procurement," openness is the differentiator that matters.

---

## The Bottom Line for CISOs

The IANS/Artico data shows that 69% of you are prioritizing AI security spending. That's the right instinct. The threat is real and accelerating.

But before you sign that PO, ask three questions:

1. **What's your detection rate against OWASP LLM Top 10 and MITRE ATLAS?** (Not a marketing claim — a testable number.)
2. **What's your false positive rate on benign inputs?** (Not "low" — a measured percentage with the test corpus described.)
3. **What do you miss, and how do you know?** (Every security tool misses something. The trustworthy ones can tell you what.)

If the vendor can't answer all three with specific, reproducible numbers, you're buying blame insurance. Not security.

We can answer all three. [The evidence is in our CI](https://github.com/aegisgatesecurity/aegisgate-platform/actions). [The code is on GitHub](https://github.com/aegisgatesecurity). [The gaps are on our blog](/blog/when-the-attacks-shift-we-shift-too-v4.5.0-detection-parity/).

That's what evidence-based AI security looks like. Not fear. Proof.

---

*AegisGate is an open-source AI security suite: Lens (free browser extension), Rampart (free local proxy), and Platform (enterprise AI security gateway). Three products, one mission: secure every AI interaction. [Explore the code](https://github.com/aegisgatesecurity).*