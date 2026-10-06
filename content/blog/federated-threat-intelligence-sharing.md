---
title: "Federated Threat Intelligence: How AegisGate Shares IOCs Across Organizations"
slug: federated-threat-intelligence-sharing
description: "One organization detects an AI attack. Every other organization is now protected — without sharing raw content. Here's how we built a federated IOC gossip protocol with peer reputation, soft quarantine, and encryption at rest."
date: 2026-10-06
author: Josh Colvin
tags:
  - ai-security
  - threat-intelligence
  - federated-ioc
  - gossip-protocol
  - cryptography
  - release
---

The fundamental problem in threat intelligence is latency. Organization A detects a novel prompt injection. Organization B, C, and D won't see it until someone writes a blog post, a vendor updates a signature, and a SIEM rule gets deployed. In AI security, that latency window is measured in hours — and attacks iterate faster than that.

Today we're shipping AegisGate Platform v4.5.2, which completes a four-phase initiative to make our federated threat intelligence component production-ready. This post explains how it works, why we made the design choices we did, and what it means for the broader AI security community.

---

## The Design Goal

We wanted to solve a specific problem: **when one AegisGate instance detects a threat, every other instance should know about it — without sharing sensitive data.**

The constraints were non-negotiable:

1. **No raw content crosses trust boundaries.** We never share prompts, responses, or PII. Period.
2. **Trust is earned, not assumed.** A peer you've never seen before doesn't get the same weight as one you've been exchanging IOCs with for months.
3. **Fail safe.** If a peer goes rogue or is compromised, the system degrades gracefully — it doesn't create a new attack vector.
4. **Self-hosted, air-gapped compatible.** No phone-home. No cloud dependency. No "trust us with your data."

---

## How It Works

### IOC Fingerprinting

When AegisGate detects a threat, it creates an Indicator of Compromise (IOC) — but not the kind you might expect. Instead of sharing the raw attack payload, we compute a SHA-256 fingerprint over the canonicalized detection struct. This fingerprint captures the *essence* of the attack (technique, pattern match, confidence) without any of the original content.

This means two organizations can independently detect the same novel prompt injection technique, produce the same fingerprint, and confirm they're seeing the same attack — without either one knowing what the other's actual prompt said.

### Gossip Protocol

Instances communicate via a pull-based HTTP gossip protocol. Every instance exposes a manifest endpoint listing its signed IOC bundles. Peers periodically fetch manifests, verify signatures, and ingest new IOCs.

Each bundle is signed with ECDSA P-256. The keyring is managed per-instance, and peers discover each other's public keys through a bootstrap peer list. There's no central authority — it's a trust mesh, not a hierarchy.

### Peer Reputation (EWMA)

Not all peers are equal. We track reputation using an Exponentially Weighted Moving Average (EWMA) with a 7-day half-life. This means:

- A peer that consistently shares IOCs that you later corroborate sees its reputation *increase*
- A peer that shares noise or never-corroborated IOCs sees its reputation *decay* over time
- Reputation is per-peer, per-instance — your trust in peer X is independent of my trust in peer X

Reputation scores range from 0.0 to 1.0. The threshold for "trusted" is configurable, and reputation directly influences how IOCs from that peer are handled.

### Corroboration Escalation

Here's where the feedback loop closes. When your local AegisGate detects a threat, it creates a local IOC. If a peer subsequently shares an IOC with the same fingerprint, that's *corroboration* — independent confirmation that another organization saw the same attack.

In conservative mode (the default), corroboration escalates the response: a detection that was previously "alert and log" becomes "block." One organization's threat becomes every organization's protection.

In aggressive mode, peer IOCs alone can trigger blocking — useful for high-trust federation partners where you want to benefit from their detections even before you see the attack yourself.

### External TAXII Feeds

In addition to peer-to-peer gossip, we support standard TAXII 2.1 feeds for integrating with existing threat intelligence platforms. Each feed has a configurable reputation weight (0.0–1.0) and severity floor. High-trust feeds (weight ≥ 0.5) count as peer corroboration; low-trust feeds contribute IOCs but don't independently escalate.

This means you can blend community gossip, commercial TI feeds, and your own detections into a single trust-weighted view of the threat landscape.

---

## The Hardening (Phase 4)

Shipping the gossip protocol and reputation system was necessary but not sufficient. For production deployment, we needed four hardening layers.

### 1. Rate Limiting on Gossip Endpoints

Every gossip endpoint (manifest, health) is rate-limited per-IP using a token bucket (default 60 requests/minute). A CIDR allow-list lets trusted partner networks bypass the limit entirely.

This prevents a compromised or noisy peer from DOSing your manifest endpoint, and it caps the blast radius of a peer that's been compromised and is flooding the network.

### 2. Admin API Token Authentication

The IOC admin API (quarantine management, feed configuration, status) sits behind the existing dashboard auth middleware. We added a second layer: bearer token authentication using `crypto/subtle.ConstantTimeCompare` for constant-time comparison.

When the admin token is set, both layers must pass — dashboard auth *and* the bearer token. When it's unset, the system is backward compatible (dashboard auth only). This is defense-in-depth: if the dashboard auth is bypassed, the admin token still gates access.

### 3. Keyring Encryption at Rest

The ECDSA keyring file contains the private keys that sign IOC bundles. In production, this file cannot sit on disk in plaintext.

We encrypt it with AES-256-GCM. The passphrase is stretched via SHA-256 to derive a 32-byte key. The encrypted file format is a JSON envelope:

```json
{
  "encrypted": true,
  "nonce": "<base64>",
  "ciphertext": "<base64>"
}
```

The system auto-detects whether the existing file is encrypted or plaintext on load. If the file is encrypted and no passphrase is provided, startup fails with a clear error. If a passphrase is set and the file is still plaintext, it's automatically migrated to encrypted on the next key rotation. This means you can deploy the passphrase env var and the migration happens transparently — no manual file conversion needed.

### 4. Soft Quarantine for Low-Reputation IOCs

This is the design decision I'm most proud of.

Previously, IOCs from peers below the reputation threshold were rejected outright. This is the safe choice — don't trust untrusted sources. But it's also the *wasteful* choice. A below-threshold peer might be sharing legitimate IOCs that you'd want to act on once that peer earns your trust.

Instead of rejecting, we now **quarantine**. IOCs from below-threshold peers are stored with a `Quarantined = true` flag. The corroboration checker excludes quarantined IOCs from blocking recommendations — they're invisible to the enforcement layer. But they're sitting in the store, waiting.

When the peer's reputation eventually crosses the threshold (or an admin manually promotes them), the quarantined IOCs are un-quarantined and immediately available for corroboration. No re-fetch needed. The IOCs were already there.

The critical guarantee: **trusted IOCs are never downgraded by quarantined merges.** If a low-reputation peer shares an IOC that matches one you already trust from a reputable source, the trusted IOC stays trusted. A compromised peer cannot taint your trust store by flooding it with matching quarantined entries.

---

## The Metrics

You can't operate what you can't observe. We instrumented the entire IOC pipeline with Prometheus metrics:

- `aegisgate_ioc_store_size` / `aegisgate_ioc_store_capacity` — current IOC count and limit
- `aegisgate_ioc_peer_count` / `aegisgate_ioc_peer_reachable` — total peers and reachable peers
- `aegisgate_ioc_feed_errors_total` / `aegisgate_ioc_feed_iocs_total` — per-feed error and IOC counts
- `aegisgate_ioc_feed_last_pull_timestamp` — last successful pull per feed

A Grafana dashboard (13 panels) visualizes the full pipeline, and 10 Prometheus alert rules cover the failure modes (peer unreachable, feed errors, store capacity, quarantine buildup).

---

## What This Enables

The end result is a threat intelligence system that:

- **Shares attack fingerprints without sharing content** — privacy-safe by design
- **Learns from every participant** — one detection benefits all
- **Degrades safely** — low-trust peers are quarantined, not catastrophic
- **Integrates with existing TI infrastructure** — TAXII 2.1, STIX export, Prometheus/Grafana
- **Runs anywhere** — self-hosted, air-gapped, no phone-home
- **Is cryptographically verifiable** — every IOC bundle is ECDSA-signed, every keyring is AES-256-GCM encrypted

For a single organization, this means your AegisGate deployment gets smarter over time. For a federation of organizations (MSSPs, industry ISACs, enterprise partners), it means collective defense — the first organization to see a new attack pattern instantly protects every other organization in the mesh.

---

## Testing

We don't ship without proving it. This release adds 37 new tests:

- **20 unit tests** covering rate limiting (per-IP, window reset, allow-list bypass), key encryption (round-trip, wrong passphrase, migration, backward compat), and soft quarantine (store merge, no-downgrade, promotion, checker exclusion, stats)
- **10 in-process integration tests** covering full gossip round-trips with rate limiting, quarantine lifecycle, key encryption lifecycle, and admin token auth
- **7 Docker-gated integration tests** running against live containers with real TLS, real gossip, and real rate limiting

All 362 `pkg/ioc` tests pass. The full test suite is 11,573+ tests across 127 packages. `go vet` clean, `gofmt` clean, `go build` clean.

---

## What's Next

v4.5.2 completes the IOC production readiness initiative. The next steps are operational, not engineering:

1. **Production deployment** — rolling this out to our own infrastructure first
2. **Partner federation** — onboarding the first set of MSSP/enterprise partners into a shared trust mesh
3. **STIX 2.1 export** — standardized output for SIEM and TI platform integration
4. **Community feed** — exploring a public, opt-in IOC feed for the broader AegisGate community

If you're interested in joining the federation or want to evaluate AegisGate for your organization, [get in touch](https://aegisgatesecurity.io/partners/) or [try the live demo](https://demo.aegisgatesecurity.io/).

---

**v4.5.2 is live.** [Release notes](https://github.com/aegisgatesecurity/aegisgate-platform/releases/tag/v4.5.2) · [CHANGELOG](https://github.com/aegisgatesecurity/aegisgate-platform/blob/main/CHANGELOG.md) · [Docker image](https://github.com/aegisgatesecurity/aegisgate-platform/pkgs/container/aegisgate-platform)

**Secure Every AI Interaction.**

---

*Josh Colvin is the founder of [AegisGate Security](https://aegisgatesecurity.io), building open-source, self-hosted AI security. Apache 2.0. No telemetry. No data egress. [GitHub](https://github.com/aegisgatesecurity/aegisgate-platform).*