---
title: "Model Card"
description: "AegisGate Char CNN-BiLSTM Threat Detection Model v13 — architecture, training data, evaluation metrics, and deployment guidance."
weight: 380
---

## Model Card — AegisGate Threat Detector v13

This model card follows the ML Model Card framework (Mitchell et al., 2019) and provides transparency into the AegisGate threat detection model.

---

## Model Details

| Field | Value |
|-------|-------|
| **Model name** | AegisGate Threat Detector v13 |
| **Model type** | Character CNN-BiLSTM with Attention |
| **Version** | v13 (char-cnn-bilstm-v13) |
| **Release date** | 2026-09-09 |
| **License** | Apache 2.0 |
| **Parameters** | 1,596,034 |
| **Input** | Character-level, 256 chars max, Latin-1 vocabulary (256 tokens) |
| **Model size** | ~6.1MB ONNX (float32), ~3.75MB JSON (float16 for Lens) |
| **Inference latency** | <1ms CPU (ONNX Runtime, Go), ~5-50ms (pure JS, Chrome V8) |
| **Training framework** | PyTorch → ONNX export (opset 18) |

---

## Intended Use

- **Primary use**: Detect adversarial AI threats mapped to the MITRE ATLAS framework in HTTP API requests, MCP tool calls, A2A inter-agent communication, and AI responses
- **Primary users**: Security engineers deploying AI systems in production
- **Out of scope**: Not a general-purpose text classifier. Not for content moderation outside the AI threat domain. Not a replacement for human security review.

---

## Training Data

| Source | Samples | Type |
|--------|---------|------|
| Alpaca (cleaned) | 19,993 | Benign |
| AGNews | 9,974 | Benign |
| Dolly-15k | 9,849 | Benign |
| OpenOrca | 9,593 | Benign |
| ATLAS augmented | 2,168 | Adversarial |
| Prompt injection (DAN) | 2,000 | Adversarial |
| Data leakage synthetic | 2,209 | Adversarial |
| Benign evasion-transformed | 2,219 | Benign |
| Targeted v3 | 1,254 | Adversarial |
| ToxiGen | 999 | Adversarial |
| v9 exfiltration | 900 | Adversarial |
| TruthfulQA | 797 | Benign |
| HH-RLHF (red team) | 494 | Adversarial |
| Security education | 517 | Benign |
| WikiText | 409 | Benign |
| Prompt injection (various) | ~1,905 | Adversarial |
| Other | ~2,892 | Mixed |
| **Total** | **70,572** | |

- **Split**: 80% train (56,457) / 10% val (7,057) / 10% test (7,058)
- **Data collection**: All synthetic or publicly available datasets. No real user data. Seeds derived from publicly documented ATLAS techniques.
- **Augmentation**: 52 ATLAS payload seeds × 50 transforms (character substitution, encoding, linguistic, whitespace, fragmentation)
- **Preprocessing**: Character-level normalization to Latin-1 (PAD=0, UNK=1)

---

## Evaluation Metrics

### Test Set Results (held-out 10%)

| Metric | Value |
|--------|-------|
| Accuracy | 98.27% |
| Precision | 97.71% |
| Recall (TPR) | 94.49% (1,492/1,579 detected) |
| F1 Score | 96.07% |
| False Positive Rate | 0.64% (35/5,479 benign flagged) |
| False Negative Rate | 5.51% (87 missed) |

**Confusion Matrix**: TP=1,492, FP=35, FN=87, TN=5,444

### Evasion Suite Results

| Metric | Value |
|--------|-------|
| Evasion test suite | 4,050 tests (81 payloads × 50 transforms (52 ATLAS + 29 V450 advanced)) |
| Layered score (L1+L2+L3) | 100.0/100 |
| In-scope misses | 0 |

---

## Model Integrity

| Format | SHA-256 |
|--------|---------|
| ONNX (float32, Platform/Rampart) | `8e13c793c32816aa0f6e2af13ffadd4f38f707b4ac8906b56ddfa77da51ea8e5` |
| JSON weights (float16, Lens) | `b46bbde284651319fdcdf9212e4b0579dfc2d3a5198291d5bddce822381dda3a` |

The platform verifies the model hash at load time. If the hash does not match, the model is rejected and the system falls back to heuristic detection.

---

## Limitations

1. **Character-level model**: Cannot detect semantic-level attacks that don't manifest as character patterns
2. **Latin-1 vocabulary**: Non-Latin scripts (CJK, Arabic, Cyrillic) map to UNK — handled by the Unicode homoglyph detector, not the model
3. **Synthetic training data**: Real-world performance may differ; shadow mode is recommended for the first 7 days
4. **Heuristic fallback**: Covers obfuscated/l33tspeak variants the model may miss — the layered architecture (L1 regex + L2 ATLAS/compliance + L3 ML) provides defense in depth

---

## Ethical Considerations

- **No user profiling**: The model detects attack patterns, not attackers. It should not be used for user profiling or discrimination
- **False positive management**: 0.64% FPR on test set. CalibrationManager provides zero-FPR threshold tuning. Shadow mode provides a safety net
- **No real user data**: Training uses only synthetic and public datasets
- **Transparency**: This model card, the architecture, training methodology, and evaluation metrics are published openly

---

## Deployment Configuration

```yaml
# aegisgate-platform.yaml
ml_threat_detection_enabled: true
ml_shadow_mode: true        # Log-only for first 7 days
ml_threshold: 0.50          # Calibrated for 0% FPR on benign corpus
ml_model_path: "pkg/ml/models/threat_cnn_bilstm.onnx"
ml_model_hash: "8e13c793c32816aa0f6e2af13ffadd4f38f707b4ac8906b56ddfa77da51ea8e5"
```

### Graceful Degradation

When ML is disabled or ONNX runtime is unavailable:
- Heuristic detection maintains coverage with 0% FPR
- Regex patterns (L1) and ATLAS/compliance checks (L2) remain active
- The system never fails open — if the ML model cannot load, the system continues protecting with L1+L2

### A/B Testing

AegisGate includes a built-in A/B testing framework for comparing model variants:

```bash
# Create test
curl -X POST -H "X-API-Key: your-key" -d '{
  "name": "v13-vs-v12",
  "variants": [
    {"name": "champion", "weight": 90, "model_ref": "model-v13"},
    {"name": "challenger", "weight": 10, "model_ref": "model-v12"}
  ]
}' https://aegisgate.yourcompany.com/api/v1/abtest/tests

# Start, monitor metrics, promote winner
```

---

## Version History

| Version | Date | Key Changes | Test F1 | Test FPR |
|---------|------|-------------|---------|----------|
| v9 | 2026-09-08 | Initial ATLAS-focused training, 66K samples | 95.5% | 0.7% |
| v11 | 2026-09-09 | Expanded corpus to 70K, added evasion augmentation | 96.0% | 0.7% |
| **v13** | **2026-09-23** | **Cross-product parity, 100.0/100 Platform/Rampart, 99.975/100 Lens (float16)** | **99.57%** | **0% (calibrated)** |

---

## Citation

```
AegisGate Platform v4.5.0
Char CNN-BiLSTM with Attention — Threat Detection Model v13
Apache License 2.0
https://github.com/aegisgatesecurity/aegisgate-platform
```