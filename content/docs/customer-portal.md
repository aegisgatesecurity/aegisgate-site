---
title: "Customer Portal"
description: "Self-service account management, billing, and usage analytics"
type: docs
---

## Customer Portal

The AegisGate **Customer Portal** is a self-service web application for managing your organization's account, viewing usage metrics, accessing invoices, and downloading compliance documents. The portal runs as a companion service alongside the main AegisGate platform.

### Architecture

The Customer Portal is a lightweight Go HTTP server that provides:

- **Profile management** — Organization details, plan information, and renewal dates
- **License information** — Current tier, feature access, and expiration status
- **Subscription management** — Billing details, payment methods, and next billing date
- **Usage analytics** — API and MCP request counts against tier caps
- **Invoice access** — Download past invoices and receipts
- **Compliance documents** — BAA, DPA, and SOC2 reports

### Quick Start

```bash
# Run the Customer Portal (defaults to port 8081)
go run cmd/customer-portal/main.go

# With custom configuration
./customer-portal \
  --port 8082 \
  --session-timeout 30m
```

### API Reference

All endpoints return JSON responses. The portal runs on port `8081` by default.

#### Get Customer Profile

```bash
curl -s http://localhost:8081/api/v1/customer | jq .
```

```json
{
  "success": true,
  "data": {
    "customer_id": "cust_example",
    "organization": "Example Corp",
    "email": "admin@example.com",
    "plan": "developer",
    "activated_at": "2026-01-15T10:00:00Z",
    "renewal_date": "2027-01-15T10:00:00Z",
    "status": "active"
  }
}
```

#### Get License Information

```bash
curl -s http://localhost:8081/api/v1/customer/license | jq .
```

```json
{
  "success": true,
  "data": {
    "license_id": "lic_xxxx",
    "tier": "developer",
    "features": ["sso", "rbac", "compliance"],
    "max_servers": 5,
    "max_users": 25,
    "issued_at": "2026-01-15T10:00:00Z",
    "expires_at": "2027-01-15T10:00:00Z",
    "status": "active",
    "support_level": "email"
  }
}
```

#### Get Subscription Details

```bash
curl -s http://localhost:8081/api/v1/customer/subscription | jq .
```

```json
{
  "success": true,
  "data": {
    "subscription_id": "sub_xxxx",
    "tier": "developer",
    "price_cents": 7900,
    "currency": "USD",
    "billing_cycle": "monthly",
    "next_billing_date": "2026-06-15T10:00:00Z",
    "status": "active",
    "payment_method": "card"
  }
}
```

#### Get Usage Metrics

```bash
curl -s http://localhost:8081/api/v1/customer/usage | jq .
```

```json
{
  "success": true,
  "data": {
    "api_requests": 45000,
    "api_requests_cap": 500000,
    "mcp_requests": 12000,
    "mcp_requests_cap": 250000,
    "active_sessions": 8,
    "max_sessions": 25,
    "storage_used_mb": 128,
    "storage_cap_mb": 5120
  }
}
```

#### Get Invoices

```bash
curl -s http://localhost:8081/api/v1/customer/invoices | jq .
```

```json
{
  "success": true,
  "data": [
    {
      "invoice_id": "inv_001",
      "invoice_number": "AEGIS-2026-0001",
      "amount_cents": 7900,
      "currency": "USD",
      "status": "paid",
      "issued_at": "2026-05-01T00:00:00Z",
      "due_at": "2026-05-15T00:00:00Z",
      "paid_at": "2026-05-03T14:22:00Z",
      "download_url": "/invoices/AEGIS-2026-0001.pdf"
    }
  ]
}
```

#### Get Compliance Documents

```bash
curl -s http://localhost:8081/api/v1/customer/documents | jq .
```

```json
{
  "success": true,
  "data": [
    {
      "document_id": "doc_baa_001",
      "name": "Business Associate Agreement (BAA)",
      "version": "2.1",
      "effective_date": "2026-01-15",
      "url": "/documents/baa.pdf",
      "signed": true
    }
  ]
}
```

#### Health Check

```bash
curl -s http://localhost:8081/health | jq .
```

```json
{
  "success": true,
  "data": {
    "status": "healthy"
  }
}
```

### Security

The Customer Portal includes built-in security hardening:

- **Read/Write/Idle timeouts** — 15s read, 15s write, 60s idle (prevents slow-loris attacks)
- **JSON-only responses** — All endpoints return `application/json` with proper status codes
- **No template rendering** — Pure API surface, no XSS attack surface
- **CORS protection** — Configurable `AllowedOrigins` restricts cross-origin access

### Pricing

See our [pricing page](/pricing/) for tier details, rate limits, and feature comparison.

### Integration with Main Platform

The Customer Portal communicates with the main AegisGate platform through the billing package:

```
┌──────────────────────┐     ┌──────────────────────┐
│   Customer Portal     │     │   AegisGate Platform  │
│   (port 8081)          │     │   (port 8080/8443)    │
│                        │     │                        │
│  GET /api/v1/customer  │────▶│  pkg/billing          │
│  GET /api/v1/license   │────▶│  pkg/license          │
│  GET /api/v1/usage     │────▶│  pkg/metrics           │
└──────────────────────┘     └──────────────────────┘
```

For admin-level management, see the [License Portal](/docs/license-portal/) documentation.