---
title: "Graceful Degradation"
description: "How AegisGate maintains security coverage with deterministic rule-based detection; ML detection was withdrawn 2026-11-23"
type: docs
---


<div style="border:2px solid #b45309;background:#fffbeb;color:#78350f;padding:0.75rem 1rem;border-radius:0.5rem;margin:1rem 0;font-size:0.95em">
<strong>⚠ Notice — 2026-11-23: ML detection withdrawn.</strong> All detection-rate, catch-rate, and false-positive figures on this page that derive from the neural threat model are void. The model was withdrawn after its training corpus failed an independent label audit. Deterministic (non-ML) detection is unaffected. See <a href="/changelog/">changelog</a>.
</div>

## Overview

> **2026-11-23 — ML withdrawn.** The ML threat-detection layer was withdrawn on 2026-11-23 after its training corpus failed an independent label audit (~71% of attack-labeled items flipped to benign). The `ml_threat_detection_enabled` / `ml_shadow_mode` settings are inert, the model is no longer shipped or loaded, and all ML-derived coverage/FPR figures are void. AegisGate now operates in **rules-only mode permanently**: deterministic regex + ATLAS detection is always on. The historical ML degradation behavior is documented below for reference only — do not attempt to enable it.

AegisGate uses a **layered defense architecture** where rule-based detection serves as the always-on foundation. Rule-based detection runs on every request; there is no longer an ML layer to degrade from.

This means:

- **Rule-based detection never shuts down.** It runs on every request.
- **ML threat detection is withdrawn.** The flags below are inert and kept only for backward compatibility with existing config files.
- **No ML false positives.** All detection is deterministic.
- **Cold starts are safe.** Newly deployed instances have full rule-based coverage immediately.

---

## Architecture

```
┌──────────────────────────────────────────┐
│            Request Flow                   │
│                                           │
│  Incoming Request                         │
│       ↓                                   │
│  ┌─────────────────┐                     │
│  │ Rule-Based Scan  │ ← Always active     │
│  │ (deterministic)  │   0% FPR            │
│  └────────┬────────┘                     │
│           │                               │
│  ┌────────▼────────┐                     │
│  │ ML Threat Scan   │ ← WITHDRAWN         │
│  │ (2026-11-23)     │   2026-11-23        │
│  └────────┬────────┘                     │
│           │                               │
│  ┌────────▼────────┐                     │
│  │ Multi-Turn Check │ ← Always active     │
│  └────────┬────────┘                     │
│           │                               │
│  ┌────────▼────────┐                     │
│  │ Response         │                     │
│  │ (Block/Allow)    │                     │
│  └─────────────────┘                      │
└──────────────────────────────────────────┘
```

Every incoming request passes through the **Rule-Based Scan**, which is always active and provides deterministic protection with zero false positives. (The ML Threat Scan layer was withdrawn 2026-11-23.) The **Multi-Turn Check** runs on all requests to detect conversation-level attack patterns.

---

## Historical Modes (pre-2026-11-23, void)

| Mode | ML Enabled | Shadow Mode | Blocking | Status |
|------|------------|-------------|----------|--------|
| Full Protection | ✅ | — | ✅ | Withdrawn 2026-11-23 |
| Shadow Mode | ✅ | ✅ | — | Withdrawn 2026-11-23 |
| Rules Only | — | — | — | **Current behavior** |
| Cold Start | — | ✅ | — | Withdrawn 2026-11-23 |

All ML-derived coverage and FPR figures formerly listed here are void.

---

## Feature Flags (inert as of 2026-11-23)

```yaml
# aegisgate-platform.yaml
security:
  ml_threat_detection_enabled: false  # INERT — ML withdrawn 2026-11-23
  ml_shadow_mode: true                  # INERT — ML withdrawn 2026-11-23
```

These flags are retained only so old config files still parse. Setting them to `true` has no effect.

---

## Performance Impact

| Component | Latency | CPU | Memory |
|-----------|---------|-----|--------|
| Rule-based scan | <1ms | <1% | ~2MB |
| ML threat scan | — | — | — (withdrawn 2026-11-23) |
| Total | <1ms + multi-turn | <1% | ~2MB |

---

## Failure Modes

| Failure | Behavior | Recovery |
|---------|----------|----------|
| ML layer | Withdrawn 2026-11-23 — not loaded | n/a |
| Rule-based scan | Fails closed per policy | Restart/inspect logs |
| Multi-turn check | Degrades to per-message scanning | Automatic |

### Failure Mode Details

**ML layer**: Withdrawn 2026-11-23. The model file is no longer shipped; the loader is inert. Rule-based detection is unaffected.

**Rule-based scan**: deterministic and always on; a failure indicates a configuration or binary problem — check logs and restart.

_See also: [Configuration](/docs/configuration/), [Changelog](/changelog/)._
