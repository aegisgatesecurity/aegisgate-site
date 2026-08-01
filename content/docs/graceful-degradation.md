---
title: "Graceful Degradation"
description: "How AegisGate maintains security coverage when ML threat detection is disabled or unavailable"
type: docs
---

## Overview

AegisGate uses a **layered defense architecture** where rule-based detection serves as the always-on foundation, with ML threat detection as an additional layer. When ML is disabled or unavailable, the platform gracefully degrades to **rules-only mode** with zero loss of deterministic protection.

This means:

- **Rule-based detection never shuts down.** It runs on every request regardless of ML status.
- **ML threat detection is additive.** It provides an extra security layer when enabled.
- **No false positives from ML in rules-only mode.** The 0% FPR guarantee is always maintained.
- **Cold starts are safe.** Newly deployed instances start with full rule-based coverage immediately.

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
│  │ (88.5/100)       │   0% FPR            │
│  └────────┬────────┘                     │
│           │                               │
│  ┌────────▼────────┐                     │
│  │ ML Threat Scan   │ ← Feature-gated     │
│  │ (if enabled)     │   Shadow/Block      │
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

Every incoming request first passes through the **Rule-Based Scan**, which is always active and provides deterministic protection with zero false positives. If ML threat detection is enabled, the request also passes through the **ML Threat Scan** layer. Finally, the **Multi-Turn Check** runs on all requests to detect conversation-level attack patterns.

---

## Degradation Modes

| Mode | ML Enabled | Shadow Mode | Blocking | Coverage | FPR |
|------|------------|-------------|----------|----------|-----|
| Full Protection | ✅ | — | ✅ | Highest | ~0% |
| Shadow Mode | ✅ | ✅ | — | Highest | 0% (logs only) |
| Rules Only | — | — | — | 88.5/100 | 0% |
| Cold Start | — | ✅ | — | 88.5/100 | 0% |

### Mode Descriptions

- **Full Protection**: Both rule-based and ML detection are active. ML predictions can block requests. This provides the highest coverage with near-zero false positive rate.
- **Shadow Mode**: ML detection runs and logs predictions, but never blocks. This is used for validation before enabling blocking mode. Rules still block as normal.
- **Rules Only**: ML detection is completely disabled. All protection comes from deterministic rules with a 0% false positive guarantee.
- **Cold Start**: A newly deployed instance with shadow mode enabled by default. ML predictions are collected for review while rules provide immediate protection.

---

## Feature Flags

```yaml
# aegisgate-platform.yaml
security:
  ml_threat_detection_enabled: false  # Default: disabled
  ml_shadow_mode: true                  # Default: shadow mode
```

Environment variable overrides:
```bash
export AEGIS_ML_THREAT_DETECTION_ENABLED=true
export AEGIS_ML_SHADOW_MODE=false
```

Feature flags can be toggled at runtime without restarting the service. Changes take effect on the next request processed.

---

## Deployment Sequence

The recommended deployment sequence ensures safe activation of ML threat detection:

### Step 1: Deploy with ML Disabled (Default)

Deploy v3.8+ with ML disabled. All rule-based detection is active and providing full deterministic protection.

```bash
# Default configuration - ML disabled
docker run -d \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  ghcr.io/aegisgatesecurity/aegisgate-platform:v3.8.0
```

### Step 2: Enable Shadow Mode for 7 Days

ML predictions are logged but never block. This allows you to review ML behavior in production.

```bash
export AEGIS_ML_THREAT_DETECTION_ENABLED=true
export AEGIS_ML_SHADOW_MODE=true
```

### Step 3: Review Shadow Logs for FPR

Analyze shadow mode predictions for false positive rate. Adjust the detection threshold using the `CalibrationManager` API.

```bash
# Review shadow logs
curl http://localhost:8081/v1/shadow-logs?last=7d

# Adjust threshold
curl -X PATCH http://localhost:8081/v1/calibration \
  -d '{"threshold": 0.85}'
```

### Step 4: Enable Blocking Mode

After validation, enable ML blocking mode. ML and rules now work together for maximum coverage.

```bash
export AEGIS_ML_SHADOW_MODE=false
```

---

## Performance Impact

| Component | Latency | CPU | Memory |
|-----------|---------|-----|--------|
| Rule-based scan | <1ms | <1% | ~2MB |
| ML threat scan | <1ms | ~2% | ~50MB (ONNX model) |
| Shadow mode logging | <0.1ms | <0.5% | ~5MB |
| Total (full protection) | <2ms | ~3% | ~55MB |

The ONNX Runtime-based ML inference engine is optimized for minimal latency impact. Even in full protection mode, total request processing adds less than 2ms to latency.

---

## Failure Modes

| Failure | Behavior | Recovery |
|---------|----------|----------|
| ONNX model fails to load | Falls back to heuristic-only | Auto-retry with backoff |
| ONNX inference error | Falls back to heuristic-only | Logs error, continues |
| Memory pressure | ML disabled, rules continue | GC + model reload |
| Shadow log disk full | Shadow mode disabled | Rotate logs, re-enable |

### Failure Mode Details

**ONNX model fails to load**: If the ONNX model file is corrupted or missing, the ML threat detection module is disabled. Rule-based detection continues normally. The system auto-retries loading the model with exponential backoff.

**ONNX inference error**: If an individual inference call fails (e.g., malformed input), the request falls back to heuristic-based evaluation. The error is logged and processing continues without interruption.

**Memory pressure**: When the system detects memory pressure, ML threat detection is disabled to free the ~50MB used by the ONNX model. Rule-based detection continues with its ~2MB footprint. When memory is available again, the model is reloaded.

**Shadow log disk full**: If the disk storing shadow mode logs fills up, shadow mode is automatically disabled. Log rotation cleans up old entries, and shadow mode can be re-enabled once space is available.