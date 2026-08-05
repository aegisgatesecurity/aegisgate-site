---
title: Prompt Cache
description: AegisGate prompt cache — intelligent prompt caching for reduced latency, deduplicated threat analysis, and improved throughput in AI gateway deployments.
weight: 500
---

## Prompt Cache

AegisGate includes an intelligent prompt cache that reduces redundant threat analysis for repeated or similar prompts.

### How It Works

1. **Prompt received**: Incoming request is hashed (SHA-256)
2. **Cache lookup**: If an identical prompt was recently screened, the cached result is returned
3. **Cache miss**: Full regex + ML screening pipeline executes
4. **Result cached**: Screening result is stored with configurable TTL

### Configuration

```yaml
prompt_cache:
  enabled: true
  ttl: 300s          # Cache entry lifetime
  max_size: 10000    # Maximum cached entries
  eviction: lru      # Least Recently Used eviction
  similarity: false  # Enable semantic similarity matching (ML required)
```

### Performance Impact

| Metric | Without Cache | With Cache |
|--------|--------------|------------|
| Repeated prompt latency | ~6ms (ML) | <0.1ms |
| Throughput improvement | Baseline | 3-5x |
| Memory overhead | 0 | ~2MB |

### Security Considerations

- Cached results include the original threat classification
- Cache entries expire automatically (TTL)
- No raw prompt text is stored — only SHA-256 hashes
- Cache is per-tenant isolated in multi-tenant deployments

_See also: [Performance](/docs/performance/) and [Configuration](/docs/configuration/)._
