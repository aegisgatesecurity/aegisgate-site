---
title: "FAQ"
description: "Frequently Asked Questions about AegisGate Security Platform"
type: docs
---

## Frequently Asked Questions

### What is AegisGate?

AegisGate is an AI security platform that acts as a gateway for your AI infrastructure. It provides:

- **Bidirectional scanning** of every API request and response
- **MCP protocol protection** for AI agent tool execution
- **Threat detection** across 153+ patterns
- **Compliance reporting** for MITRE ATLAS, OWASP LLM, NIST AI RMF, and more

### How does AegisGate work?

AegisGate deploys as a sidecar proxy or standalone gateway. All traffic to your AI services flows through AegisGate, which:

1. Intercepts requests and responses
2. Scans content for threats, secrets, and PII
3. Applies RBAC and rate limiting policies
4. Logs all activity for audit trails

### What AI models does AegisGate support?

AegisGate works with any AI API:

- **OpenAI** (ChatGPT, GPT-4)
- **Anthropic** (Claude)
- **Google** (Gemini)
- **Azure OpenAI**
- **AWS Bedrock**
- **Self-hosted models** via OpenAI-compatible API

### Is AegisGate self-hosted?

Yes. AegisGate runs entirely on your infrastructure with **zero external dependencies**. No data leaves your environment.

### What's the performance impact?

AegisGate adds an average of **2.44ms latency** per request. The scanning is optimized for speed and scales horizontally.

### How do I upgrade my tier?

Contact [sales@aegisgatesecurity.io](mailto:sales@aegisgatesecurity.io) for Developer, Professional, or Enterprise tiers.

### Does AegisGate support Kubernetes?

Yes. Deploy via:

- **Helm chart**: `helm install aegisgate aegisgate/aegisgate-platform`
- **Operator**: For GitOps workflows
- **Docker Compose**: For local development

### Can I try AegisGate before buying?

Start with the **Community tier** (free) to evaluate the platform. Upgrade when you're ready for SSO, RBAC, and compliance features.