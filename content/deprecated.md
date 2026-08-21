---
title: "AegisGate v1.x — End of Life"
description: "AegisGate v1.x (aegisgate) has been deprecated. All development has moved to aegisgate-platform."
date: 2026-08-21
draft: false
weight: 1
aliases:
  - "/v1/"
  - "/legacy/"
---

# AegisGate v1.x — End of Life

The original AegisGate repository (`aegisgatesecurity/aegisgate`) has been
**archived and deprecated** as of August 2026.

All active development has moved to
[`aegisgatesecurity/aegisgate-platform`](https://github.com/aegisgatesecurity/aegisgate-platform),
a ground-up rewrite with significant improvements:

## What changed

| v1.x (legacy) | v4.x (current) |
|----------------|----------------|
| Single-process proxy | Modular platform with dashboard, analytics, MCP support |
| Basic pattern matching | 31 compliance frameworks, 2,043 controls, 1,457 automated |
| CLI-only configuration | Guided Setup wizard, deploy profiles, config validation |
| No UI | Full web dashboard with compliance, maintenance, and system health |
| Limited framework support | Community (4) + Developer (6) + Professional (16) + Enterprise (5) |
| Manual compliance reporting | 4 automation methods with cross-framework mapping |

## What you should do

- **If you're a new user**: Start with
  [aegisgate-platform](https://github.com/aegisgatesecurity/aegisgate-platform)
  and follow the [Getting Started guide](/docs/getting-started/).
- **If you're a current v1.x user**: Migrate to v4.x. The platform includes
  a [setup wizard](/docs/getting-started/) and
  [deploy profiles](/docs/deploy-profiles/) to simplify deployment.
- **If you have v1.x code**: The archived repo remains available at
  [github.com/aegisgatesecurity/aegisgate](https://github.com/aegisgatesecurity/aegisgate)
  for reference, but is read-only and receives no updates.

## Why was it archived?

The v1.x codebase was a monolithic proxy that grew organically. The v4.x
platform is a complete redesign built around modularity, compliance automation,
and enterprise-grade operations — while remaining Apache 2.0 open source.

The old repository is now marked as **DEPRECATED** on GitHub with a pointer
to the new home.