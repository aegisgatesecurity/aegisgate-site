---
title: "Model Card"
description: "AegisGate Char CNN-BiLSTM Threat Detection Model v15 — architecture, training data, evaluation metrics, and deployment guidance."
weight: 380
---

## Model Card — AegisGate Threat Detector v15

This model card follows the ML Model Card framework (Mitchell et al., 2019) and provides transparency into the AegisGate threat detection model.

---

## Model Details

| Field | Value |
|-------|-------|
| **Model name** | AegisGate Threat Detector v15 |
| **Model type** | Character CNN-BiLSTM with Attention |
| **Version** | v15 (char-cnn-bilstm-v15) |
| **Release date** | 2026-10-20 |
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
| Hard-negative proverbs (v14) | 257 | Benign |
| Prompt injection (various) | ~1,905 | Adversarial |
| Other | ~2,892 | Mixed |
| **Total** | **70,830** | |

- **Split**: 80% train (56,664) / 10% val (7,083) / 10% test (7,083)
- **Data collection**: All synthetic or publicly available datasets. No real user data. Seeds derived from publicly documented ATLAS techniques.
- **Augmentation**: 52 ATLAS payload seeds × 50 transforms (character substitution, encoding, linguistic, whitespace, fragmentation)
- **Preprocessing**: Character-level normalization to Latin-1 (PAD=0, UNK=1)

---

## Evaluation Metrics

### Test Set Results (held-out 10%)

| Metric | Value |
|--------|-------|
| Accuracy | 98.22% |
| Precision | 98.04% |
| Recall (TPR) | 94.00% (1,504/1,600 detected) |
| F1 Score | 95.98% |
| False Positive Rate | 0.55% (30/5,483 benign flagged) |
| False Negative Rate | 6.00% (96 missed) |

**Confusion Matrix**: TP=1,504, FP=30, FN=96, TN=5,453

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
| ONNX (float32, Platform/Rampart) | `146f336ed38cc47772e58f51d9632b851b8015edec080e2a9eaed91f696caba0` |
| JSON weights (float16, Lens) | `3ff1d00f200b4ca189c20e56a3b65060c790fd404e1035e066890d179084296c` |

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
- **False positive management**: 0.55% FPR on test set. CalibrationManager provides zero-FPR threshold tuning. Shadow mode provides a safety net
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
ml_model_hash: "146f336ed38cc47772e58f51d9632b851b8015edec080e2a9eaed91f696caba0"
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
  "name": "v15-vs-v14",
  "variants": [
    {"name": "champion", "weight": 90, "model_ref": "model-v15"},
    {"name": "challenger", "weight": 10, "model_ref": "model-v14"}
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
| v13 | 2026-09-23 | Cross-product parity, 100.0/100 Platform/Rampart, 99.975/100 Lens (float16) | 99.57% | 0% (calibrated) |
| v14 | 2026-10-20 | 257 hard-negative proverbs, MaxSeqLen 128, ASCII vocab (reverted) | 95.10% | 0.67% |
| **v15** | **2026-10-20** | **256-char Latin-1 restored, 257 hard-negatives retained, all metrics improved** | **95.98%** | **0.55%** |

---

## Citation

```
AegisGate Platform v4.7.0
Char CNN-BiLSTM with Attention — Threat Detection Model v15
Apache License 2.0
https://github.com/aegisgatesecurity/aegisgate-platform
```