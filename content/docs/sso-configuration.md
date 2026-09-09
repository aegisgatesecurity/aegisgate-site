---
title: "SSO Configuration Guide"
description: "Configure SAML 2.0 and OIDC single sign-on with Okta, Azure AD, Google Workspace, Keycloak, and other identity providers."
weight: 350
---

## Overview & Architecture

AegisGate Platform provides enterprise-grade single sign-on (SSO) integration that allows organizations to authenticate users through their existing identity provider (IdP) rather than managing local credentials. This centralizes access control, enforces organizational authentication policies, and simplifies user lifecycle management.

The SSO subsystem lives in the `pkg/sso/` package—over 18,800 lines of code across 39 files—and supports two industry-standard protocols:

| Protocol | Specification | Best For |
|----------|--------------|----------|
| **SAML 2.0** | OASIS SAML 2.0 | Legacy enterprise IdPs, Okta, Azure AD, Keycloak (SAML mode) |
| **OIDC / OAuth 2.0** | OpenID Connect 1.0 | Modern IdPs, Google Workspace, Azure AD, Auth0, Keycloak (OIDC mode) |

### Supported Identity Providers

AegisGate has been tested and verified against the following providers. Any SAML 2.0 or OIDC-compliant IdP will work:

- **Okta** (SAML 2.0 or OIDC)
- **Microsoft Azure AD / Entra ID** (OIDC recommended)
- **Google Workspace** (OIDC)
- **Keycloak** (SAML or OIDC)
- **PingFederate** (SAML 2.0)
- **OneLogin** (SAML 2.0 or OIDC)
- **Auth0** (OIDC)
- Any SAML 2.0 or OIDC compliant provider

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        User's Browser                         │
│                        (Session Cookie)                       │
└──────────┬──────────────────────────────┬────────────────────┘
           │ 1. GET /auth/login           │ 5. GET /auth/callback
           ▼                              │
┌─────────────────────┐                   │
│  AegisGate Dashboard │                   │
│     (dashboard mux)  │                   │
│                      │◄──────────────────┘
│  /auth/login         │
│  /auth/callback      │     4. SAML Response /
│  /auth/logout        │        OIDC Code + State
└──────────┬───────────┘
           │ 2. Redirect to IdP
           │ 3. User authenticates
           ▼
┌─────────────────────────┐
│   Identity Provider      │
│   (Okta, Azure AD, etc.) │
└─────────────────────────┘
           │
           │ 6. Validate assertion / token
           │ 7. Create session (PostgreSQL)
           ▼
┌─────────────────────────┐
│  AegisGate Session Store │
│  (PostgreSQL / In-Memory)│
└─────────────────────────┘
```

### Tier Requirement

SSO is available on the **Developer tier and above**. See the [pricing page](https://aegisgate.dev/pricing) for details.

---

## Prerequisites

Before configuring SSO, ensure the following are in place:

### System Requirements

- AegisGate Platform v2.0+ installed and running
- PostgreSQL database (recommended for production session storage)
- TLS/HTTPS configured on your AegisGate instance (required for SSO redirects)
- Admin access to your identity provider's management console

### Network Requirements

| Direction | Port | Protocol | Purpose |
|-----------|------|----------|---------|
| AegisGate → IdP | 443 | HTTPS | Fetch IdP metadata, exchange tokens, verify JWKS |
| User Browser → IdP | 443 | HTTPS | User authentication redirect |
| User Browser → AegisGate | 443 | HTTPS | SSO callback (`/auth/callback`) |
| IdP → AegisGate | 443 | HTTPS | Optional IdP-initiated SAML (if enabled) |

### DNS & TLS

Your AegisGate instance must be reachable at a stable, fully qualified domain name (FQDN) with a valid TLS certificate. SSO redirect URLs registered with your IdP must match exactly. For example:

```
https://aegisgate.yourcompany.com/auth/callback
```

Self-signed certificates are not supported in production SSO flows because most IdPs validate the redirect URL over HTTPS.

### Configuration File

SSO settings live in `configs/sso.yaml`. The full configuration structure is described below. After editing this file, restart the AegisGate service for changes to take effect.

```yaml
sso:
  enabled: false  # Set to true to enable SSO

  # OIDC Configuration (Google, GitHub, Azure AD, etc.)
  oidc:
    enabled: false
    provider: generic  # Options: google, github, azure, generic
    client_id: ""
    client_secret: ""
    auth_url: ""
    token_url: ""
    user_info_url: ""
    redirect_url: ""
    scopes:
      - openid
      - profile
      - email

  # SAML 2.0 Configuration
  saml:
    enabled: false
    idp_metadata_url: ""
    idp_cert: ""
    entity_id: ""
    acs_url: ""
    name_id_format: "email"  # Options: email, persistent, transient

  # Session Settings
  session:
    duration_hours: 8
    refresh_before_expiry: 1
    secure: true
    same_site: "lax"  # Options: strict, lax, none
```

---

## OIDC Configuration

OpenID Connect (OIDC) is the recommended protocol for modern identity providers. It uses OAuth 2.0 authorization code flow and returns a signed ID Token (JWT) that AegisGate validates against the provider's JWKS endpoint.

### Enabling OIDC

Set `sso.enabled: true` and `sso.oidc.enabled: true` in `configs/sso.yaml`, then configure the provider-specific fields below.

### OIDC Configuration Reference

| Field | Required | Description |
|-------|----------|-------------|
| `provider` | Yes | Provider type: `google`, `github`, `azure`, or `generic` |
| `client_id` | Yes | OAuth 2.0 client ID from your IdP |
| `client_secret` | Yes | OAuth 2.0 client secret from your IdP |
| `auth_url` | Yes | Authorization endpoint URL |
| `token_url` | Yes | Token exchange endpoint URL |
| `user_info_url` | No | UserInfo endpoint (if using userinfo flow) |
| `redirect_url` | Yes | Callback URL registered with the IdP |
| `issuer_url` | No | Issuer URL for ID token validation |
| `jwks_url` | No | JWKS endpoint for JWT signature verification |
| `end_session_url` | No | End session endpoint for single logout |
| `scopes` | Yes | OAuth scopes (default: `openid`, `profile`, `email`) |
| `acr_values` | No | Authentication Context Class Reference values |
| `use_pkce` | No | Enable PKCE (Proof Key for Code Exchange) |
| `pkce_challenge` | No | PKCE challenge method: `S256` or `plain` |
| `validate_access_token` | No | Validate access token against JWKS (default: true) |
| `validate_id_token` | No | Validate ID token signature (default: true) |
| `azure_ad_tenant` | No | Azure AD tenant ID (Azure provider only) |
| `gsuite_domain` | No | Google Workspace domain restriction (Google provider only) |
| `okta_domain` | No | Okta tenant domain (Okta provider only) |

### PKCE Recommendation

For providers that support it, enable PKCE to protect against authorization code interception attacks:

```yaml
sso:
  oidc:
    use_pkce: true
    pkce_challenge: "S256"
```

---

### Azure AD / Entra ID (OIDC)

Azure AD (now branded Entra ID) works seamlessly with AegisGate via OIDC. Use the `azure` provider type for automatic tenant-aware endpoint resolution.

#### Step 1: Register an Application in Azure AD

1. Navigate to **Azure Portal** → **App registrations** → **New registration**.
2. Set the redirect URI to: `https://aegisgate.yourcompany.com/auth/callback`
3. Under **Certificates & secrets**, create a new client secret and copy the value.
4. Under **API permissions**, ensure `openid`, `profile`, and `email` are granted (Microsoft Graph → Delegated).
5. Copy the **Application (client) ID** and **Directory (tenant) ID**.

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  oidc:
    enabled: true
    provider: azure
    client_id: "your-client-id-from-azure"
    client_secret: "your-client-secret-from-azure"
    azure_ad_tenant: "your-tenant-id"
    issuer_url: "https://login.microsoftonline.com/your-tenant-id/v2.0"
    auth_url: "https://login.microsoftonline.com/your-tenant-id/oauth2/v2.0/authorize"
    token_url: "https://login.microsoftonline.com/your-tenant-id/oauth2/v2.0/token"
    jwks_url: "https://login.microsoftonline.com/your-tenant-id/discovery/v2.0/keys"
    user_info_url: "https://graph.microsoft.com/oidc/userinfo"
    redirect_url: "https://aegisgate.yourcompany.com/auth/callback"
    scopes:
      - openid
      - profile
      - email
    validate_id_token: true
    validate_access_token: true
```

> **Tip**: Replace `your-tenant-id` with your Azure AD tenant GUID or verified domain name (e.g., `contoso.onmicrosoft.com`). Use `common` as the tenant for multi-tenant applications.

---

### Google Workspace (OIDC)

Google Workspace provides OIDC with domain restriction capabilities, allowing you to limit sign-ins to users within your organization's domain.

#### Step 1: Create OAuth Credentials in Google Cloud Console

1. Navigate to **Google Cloud Console** → **APIs & Services** → **Credentials**.
2. Click **Create Credentials** → **OAuth client ID**.
3. Set application type to **Web application**.
4. Add authorized redirect URI: `https://aegisgate.yourcompany.com/auth/callback`
5. Copy the **Client ID** and **Client Secret**.
6. Configure the OAuth consent screen with your organization's branding.
7. Restrict the app to your Google Workspace domain under **OAuth consent screen** → **User type: Internal**.

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  oidc:
    enabled: true
    provider: google
    client_id: "your-client-id.apps.googleusercontent.com"
    client_secret: "your-client-secret"
    gsuite_domain: "yourcompany.com"
    issuer_url: "https://accounts.google.com"
    auth_url: "https://accounts.google.com/o/oauth2/v2/auth"
    token_url: "https://oauth2.googleapis.com/token"
    user_info_url: "https://openidconnect.googleapis.com/v1/userinfo"
    jwks_url: "https://www.googleapis.com/oauth2/v3/certs"
    redirect_url: "https://aegisgate.yourcompany.com/auth/callback"
    scopes:
      - openid
      - profile
      - email
    validate_id_token: true
```

The `gsuite_domain` field ensures that only users with email addresses at `yourcompany.com` can authenticate. Users from other Google domains will be rejected.

---

### Auth0 (OIDC)

Auth0 is a flexible OIDC provider that supports custom domains, rules, and connections.

#### Step 1: Create an Application in Auth0

1. Navigate to **Auth0 Dashboard** → **Applications** → **Create Application**.
2. Select **Regular Web Applications**.
3. Under **Settings**, add the callback URL: `https://aegisgate.yourcompany.com/auth/callback`
4. Copy the **Client ID** and **Client Secret**.

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  oidc:
    enabled: true
    provider: generic
    client_id: "your-auth0-client-id"
    client_secret: "your-auth0-client-secret"
    issuer_url: "https://your-tenant.auth0.com/"
    auth_url: "https://your-tenant.auth0.com/authorize"
    token_url: "https://your-tenant.auth0.com/oauth/token"
    user_info_url: "https://your-tenant.auth0.com/userinfo"
    jwks_url: "https://your-tenant.auth0.com/.well-known/jwks.json"
    redirect_url: "https://aegisgate.yourcompany.com/auth/callback"
    scopes:
      - openid
      - profile
      - email
    use_pkce: true
    pkce_challenge: "S256"
    validate_id_token: true
```

> **Note**: If you use a custom Auth0 domain (e.g., `auth.yourcompany.com`), replace `your-tenant.auth0.com` with your custom domain in all URL fields.

---

### Keycloak (OIDC)

Keycloak is a popular open-source identity provider. OIDC is the recommended protocol for Keycloak integration.

#### Step 1: Create a Client in Keycloak

1. Navigate to your Keycloak Admin Console → select your realm.
2. Go to **Clients** → **Create client**.
3. Set **Client type** to **OpenID Connect**.
4. Set **Valid redirect URIs** to: `https://aegisgate.yourcompany.com/auth/callback`
5. Under **Credentials**, copy the client secret.
6. Note the **Client ID**.

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  oidc:
    enabled: true
    provider: generic
    client_id: "aegisgate"
    client_secret: "your-keycloak-client-secret"
    issuer_url: "https://keycloak.yourcompany.com/realms/your-realm"
    auth_url: "https://keycloak.yourcompany.com/realms/your-realm/protocol/openid-connect/auth"
    token_url: "https://keycloak.yourcompany.com/realms/your-realm/protocol/openid-connect/token"
    user_info_url: "https://keycloak.yourcompany.com/realms/your-realm/protocol/openid-connect/userinfo"
    jwks_url: "https://keycloak.yourcompany.com/realms/your-realm/protocol/openid-connect/certs"
    end_session_url: "https://keycloak.yourcompany.com/realms/your-realm/protocol/openid-connect/logout"
    redirect_url: "https://aegisgate.yourcompany.com/auth/callback"
    scopes:
      - openid
      - profile
      - email
    use_pkce: true
    pkce_challenge: "S256"
    validate_id_token: true
    validate_access_token: true
```

---

## SAML 2.0 Configuration

SAML 2.0 is the traditional enterprise SSO protocol and is widely supported by identity providers. AegisGate acts as a Service Provider (SP) and consumes assertions from your IdP.

### Enabling SAML

Set `sso.enabled: true` and `sso.saml.enabled: true` in `configs/sso.yaml`. You can enable SAML and OIDC simultaneously if your organization uses multiple IdPs.

### SAML Configuration Reference

| Field | Required | Description |
|-------|----------|-------------|
| `entity_id` | Yes | AegisGate's entity identifier (typically your SP URL) |
| `acs_url` | Yes | Assertion Consumer Service URL (`/auth/callback`) |
| `sls_url` | No | Single Logout Service URL |
| `idp_metadata_url` | Yes* | IdP metadata XML URL (preferred method) |
| `idp_entity_id` | No | IdP entity ID (if not using metadata URL) |
| `idp_cert` | Yes* | IdP signing certificate (if not using metadata URL) |
| `cert_file` | No | SP certificate file path for signed requests |
| `key_file` | No | SP private key file path for signed requests |
| `name_id_format` | Yes | NameID format: `email`, `persistent`, or `transient` |
| `authn_context_class` | No | Authentication context class (e.g., `PasswordProtectedTransport`) |
| `allow_create` | No | Allow IdP to create new identifiers (default: false) |
| `force_authn` | No | Force re-authentication at IdP (default: false) |
| `is_passive` | No | Passive authentication request (default: false) |
| `validate_signature` | No | Validate SAML response signatures (default: true) |
| `signature_algorithm` | No | Signature algorithm (default: `RSA_SHA256`) |
| `digest_algorithm` | No | Digest algorithm (default: `SHA256`) |
| `want_assertions_signed` | No | Require signed assertions (default: true) |
| `want_response_signed` | No | Require signed response (default: true) |

> **\*** Either `idp_metadata_url` or both `idp_cert` and `idp_entity_id` must be provided. Using the metadata URL is strongly recommended because it automatically retrieves the IdP's certificates and endpoints.

### Name ID Format Reference

| Format | SAML URN | Use When |
|--------|----------|----------|
| `email` | `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` | Users identified by email (most common) |
| `persistent` | `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent` | Users identified by a stable opaque identifier |
| `transient` | `urn:oasis:names:tc:SAML:2.0:nameid-format:transient` | Anonymous, session-specific identifiers |

---

### Okta (SAML 2.0)

Okta is one of the most popular enterprise identity providers. Configuring SAML with Okta requires creating a SAML application in the Okta admin console.

#### Step 1: Create a SAML Application in Okta

1. Log in to the **Okta Admin Console** (`https://your-tenant.okta.com/admin`).
2. Navigate to **Applications** → **Applications** → **Browse App Catalog** → **Create New App**.
3. Select **SAML 2.0** as the sign-in method and click **Create**.
4. On the **General Settings** tab, name the application (e.g., "AegisGate").
5. On the **Configure SAML** tab, set the following:

| Okta Field | Value |
|------------|-------|
| Single sign on URL | `https://aegisgate.yourcompany.com/auth/callback` |
| Audience URI (SP Entity ID) | `https://aegisgate.yourcompany.com` |
| Name ID format | `EmailAddress` |
| Application username | `Email` |

6. Under **Attribute Statements**, add the following:

| Name | Name format | Value |
|------|-------------|-------|
| `email` | Unspecified | `user.email` |
| `firstName` | Unspecified | `user.firstName` |
| `lastName` | Unspecified | `user.lastName` |
| `groups` | Unspecified | `user.groups` |

7. Click **Next** → **Finish**.
8. On the application's **Sign On** tab, click **View Setup Instructions** to find the **Identity Provider metadata URL** (format: `https://your-tenant.okta.com/app/exk1234567890/sso/saml/metadata`).

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  saml:
    enabled: true
    idp_metadata_url: "https://your-tenant.okta.com/app/exk1234567890/sso/saml/metadata"
    entity_id: "https://aegisgate.yourcompany.com"
    acs_url: "https://aegisgate.yourcompany.com/auth/callback"
    name_id_format: "email"
    validate_signature: true
    want_assertions_signed: true
    want_response_signed: true
    signature_algorithm: "RSA_SHA256"
    digest_algorithm: "SHA256"
```

#### Step 3: Assign Users and Groups

In the Okta admin console, go to the **Assignments** tab for your AegisGate application and assign the users or groups that should have access. Only assigned users will be able to authenticate.

---

### Keycloak (SAML 2.0)

Keycloak supports SAML 2.0 alongside OIDC. Use SAML if your Keycloak realm is configured for SAML clients or if you need SAML-specific features like signed assertions.

#### Step 1: Create a SAML Client in Keycloak

1. Navigate to your Keycloak Admin Console → select your realm.
2. Go to **Clients** → **Create client**.
3. Set **Client type** to **SAML**.
4. Set **Client ID** to your entity ID: `https://aegisgate.yourcompany.com`
5. Under **Settings**, configure:

| Keycloak Field | Value |
|----------------|-------|
| Valid redirect URIs | `https://aegisgate.yourcompany.com/auth/callback` |
| Master SAML Processing URL | `https://aegisgate.yourcompany.com/auth/callback` |
| Name ID format | `email` |

6. Under **Keys**, enable **Sign documents** and **Sign assertions** if you want signed responses.
7. Copy the **Client ID** and download the realm metadata.

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  saml:
    enabled: true
    idp_metadata_url: "https://keycloak.yourcompany.com/realms/your-realm/protocol/saml/descriptor"
    entity_id: "https://aegisgate.yourcompany.com"
    acs_url: "https://aegisgate.yourcompany.com/auth/callback"
    name_id_format: "email"
    validate_signature: true
    want_assertions_signed: true
    want_response_signed: true
    signature_algorithm: "RSA_SHA256"
    digest_algorithm: "SHA256"
```

The IdP metadata URL for Keycloak follows the pattern `https://keycloak.yourcompany.com/realms/{realm}/protocol/saml/descriptor`.

---

### PingFederate (SAML 2.0)

PingFederate is an enterprise-grade federation server. AegisGate integrates with PingFederate as a standard SAML SP.

#### Step 1: Create a SP Connection in PingFederate

1. Log in to the **PingFederate Admin Console**.
2. Navigate to **SP Connections** → **Create New**.
3. Set the **Partner's Entity ID** to: `https://aegisgate.yourcompany.com`
4. Set the **Assertion Consumer Service URL** to: `https://aegisgate.yourcompany.com/auth/callback`
5. Configure the **Name ID Format** as `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.
6. Configure attribute contract to include `email`, `firstName`, `lastName`, and `groups`.
7. Export the IdP metadata or copy the metadata URL.

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  saml:
    enabled: true
    idp_metadata_url: "https://pingfederate.yourcompany.com/idp/proxy/IdpMetaData"
    entity_id: "https://aegisgate.yourcompany.com"
    acs_url: "https://aegisgate.yourcompany.com/auth/callback"
    name_id_format: "email"
    validate_signature: true
    want_assertions_signed: true
    want_response_signed: true
```

---

### OneLogin (SAML 2.0)

OneLogin provides cloud-based SSO with SAML 2.0 support.

#### Step 1: Create a SAML App in OneLogin

1. Log in to the **OneLogin Admin Portal**.
2. Navigate to **Apps** → **Add Apps** → search for **SAML Custom Connector**.
3. Under **Configuration**, set:

| OneLogin Field | Value |
|----------------|-------|
| Audience | `https://aegisgate.yourcompany.com` |
| Recipient | `https://aegisgate.yourcompany.com/auth/callback` |
| ACS (Consumer) URL | `https://aegisgate.yourcompany.com/auth/callback` |
| ACS (Consumer) URL Validator | `^https://aegisgate\.yourcompany\.com/auth/callback$` |
| SAML nameID format | `email` |

4. Under **Parameters**, map `Email` to `email`, `First Name` to `firstName`, `Last Name` to `lastName`, and `Groups` to `groups`.
5. Go to the **SSO** tab to find the **Issuer URL** and **IdP metadata URL**.

#### Step 2: Configure AegisGate

```yaml
sso:
  enabled: true
  saml:
    enabled: true
    idp_metadata_url: "https://your-tenant.onelogin.com/saml/metadata/your-app-id"
    entity_id: "https://aegisgate.yourcompany.com"
    acs_url: "https://aegisgate.yourcompany.com/auth/callback"
    name_id_format: "email"
    validate_signature: true
    want_assertions_signed: true
    want_response_signed: true
```

---

## Session Management

After a user successfully authenticates via SSO, AegisGate creates a session that persists the user's authenticated state. Sessions are stored in PostgreSQL (production) or in-memory (development).

### HTTP Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/login` | Initiates SSO login flow — redirects the user to the IdP |
| `GET` | `/auth/callback` | Handles SSO callback from the IdP (OAuth2/OIDC/SAML) |
| `GET` | `/auth/logout` | Destroys the current SSO session and redirects to IdP logout (if configured) |

Sessions can be validated from either a **cookie** or an **Authorization header** (Bearer token), making AegisGate compatible with both browser-based and API-based access patterns.

### Session Configuration Reference

| Field | Default | Description |
|-------|---------|-------------|
| `session_duration_hours` | `8` | How long a session remains valid |
| `refresh_before_expiry` | `1` | Refresh the session this many hours before expiry |
| `max_session_age` | — | Maximum absolute session age regardless of refresh |
| `clock_skew_tolerance` | — | Tolerance for time-sensitive validations (e.g., SAML NotBefore/NotOnOrAfter) |
| `cookie_name` | — | Custom cookie name for the session |
| `cookie_secure` | `true` | Set the `Secure` flag on the session cookie |
| `cookie_http_only` | `true` | Set the `HttpOnly` flag on the session cookie |
| `cookie_same_site` | `lax` | SameSite attribute: `strict`, `lax`, or `none` |
| `cookie_domain` | — | Domain scope for the session cookie |
| `require_https` | `true` | Reject non-HTTPS requests in production |
| `allow_idp_initiated` | `false` | Allow IdP-initiated SAML SSO |
| `strict_audience` | `true` | Enforce strict audience validation in SAML responses |

### Example Session Configuration

```yaml
sso:
  enabled: true
  session:
    duration_hours: 8
    refresh_before_expiry: 1
    secure: true
    same_site: "lax"
    cookie_name: "aegisgate_session"
    cookie_http_only: true
    cookie_domain: ".yourcompany.com"
    require_https: true
    allow_idp_initiated: false
    strict_audience: true
    clock_skew_tolerance: "60s"
```

### SameSite Cookie Behavior

| Setting | Behavior | Recommendation |
|---------|----------|----------------|
| `strict` | Cookie only sent on same-site requests | Most secure; may break cross-site SSO flows |
| `lax` | Cookie sent on top-level navigations from external sites | **Recommended** — balances security and functionality |
| `none` | Cookie sent on all requests (requires `secure: true`) | Only use if cross-site embedding is required |

### Session Storage Backends

| Backend | Use Case | Persistence | Multi-Instance |
|---------|----------|-------------|----------------|
| **PostgreSQL** | Production | Yes (survives restarts) | Yes (shared across instances) |
| **In-Memory** | Development / Testing | No (lost on restart) | No (per-instance only) |

> **Warning**: In-memory session storage is not suitable for production deployments with multiple AegisGate instances. Sessions created on one instance will not be visible to others, causing intermittent authentication failures.

---

## Role & Attribute Mapping

AegisGate maps attributes from your IdP to internal user fields and roles. This allows you to control access and permissions based on IdP-provided data, so that when users are added or removed from groups in your IdP, their AegisGate access is automatically updated.

### Attribute Mapping

Attribute mapping translates IdP-specific attribute names to AegisGate's internal field names. Configure this under `attribute_mapping`:

```yaml
sso:
  attribute_mapping:
    email: "email"           # Maps IdP "email" attribute to internal "email" field
    first_name: "firstName"  # Maps IdP "firstName" attribute to internal "first_name" field
    last_name: "lastName"    # Maps IdP "lastName" attribute to internal "last_name" field
    display_name: "displayName"
    department: "department"
    groups: "groups"
```

For SAML, the attribute names correspond to the AttributeStatement names configured in your IdP. For OIDC, they correspond to the claims in the ID token or UserInfo response.

### Role Mapping

Role mapping translates IdP groups or attribute values into AegisGate roles. This enables automatic role assignment based on group membership:

```yaml
sso:
  role_mappings:
    # Map IdP group names to AegisGate roles
    "aegisgate-admins": "admin"
    "aegisgate-auditors": "auditor"
    "security-team": "security_analyst"
    "devops-engineers": "developer"
    "executives": "viewer"
```

When a user authenticates via SSO, AegisGate checks the user's IdP groups (from the `groups` attribute/claim) and assigns the highest-privilege matching role. Users without any mapped group will receive the default role (typically `viewer` or be denied access, depending on your configuration).

### Multi-Group Mapping Example

If a user belongs to both `security-team` and `devops-engineers` in your IdP, they will receive both `security_analyst` and `developer` roles. AegisGate uses the union of all mapped roles, with the most permissive role taking precedence for access decisions.

---

## Domain Access Control

AegisGate can restrict SSO authentication to specific email domains. This is particularly useful when your IdP serves multiple organizations or when you want to prevent personal accounts from accessing corporate resources.

### Allowed Domains

Only users with email addresses from the listed domains can authenticate:

```yaml
sso:
  allowed_domains:
    - "yourcompany.com"
    - "subsidiary.com"
    - "partner-org.com"
```

### Blocked Domains

Explicitly block specific domains even if they would otherwise be allowed:

```yaml
sso:
  blocked_domains:
    - "temp.yourcompany.com"
    - "legacy.yourcompany.com"
```

### Domain Evaluation Order

1. If `blocked_domains` is set and the user's email domain matches, access is **denied**.
2. If `allowed_domains` is set and the user's email domain does not match any entry, access is **denied**.
3. If neither `allowed_domains` nor `blocked_domains` is set, all domains are **allowed**.

> **Best Practice**: Always set `allowed_domains` in production to prevent unauthorized access from accounts outside your organization, even if your IdP theoretically restricts access.

---

## Security Considerations

SSO introduces an additional trust boundary between AegisGate and your identity provider. Follow these security best practices to maintain a robust security posture.

### Signature Validation

Always enable signature validation for both protocols:

```yaml
# SAML
sso:
  saml:
    validate_signature: true
    want_assertions_signed: true
    want_response_signed: true
    signature_algorithm: "RSA_SHA256"
    digest_algorithm: "SHA256"

# OIDC
sso:
  oidc:
    validate_id_token: true
    validate_access_token: true
```

AegisGate uses **W3C XML Canonicalization (c14n)** for SAML signature verification, ensuring compliance with the XML-Signature standard. For OIDC, AegisGate maintains a **JWKS cache** for JWT signature verification, supporting both RSA and EC key algorithms.

### Cookie Security

| Setting | Production Value | Why |
|---------|-----------------|-----|
| `cookie_secure` | `true` | Prevents cookie transmission over HTTP |
| `cookie_http_only` | `true` | Prevents JavaScript access to session cookie (XSS mitigation) |
| `cookie_same_site` | `lax` or `strict` | Prevents CSRF via cross-site requests |
| `require_https` | `true` | Rejects all non-HTTPS requests |

### Clock Skew Tolerance

SAML assertions and OIDC tokens have time-bound validity windows. If AegisGate and your IdP have slightly different clocks, valid assertions may be rejected. Configure a reasonable clock skew tolerance:

```yaml
sso:
  clock_skew_tolerance: "60s"
```

> **Note**: Keep clock skew tolerance small (under 120 seconds). Large tolerances weaken the time-bound security of assertions. Use NTP on all servers to minimize clock drift.

### PKCE for OIDC

Enable PKCE (Proof Key for Code Exchange) for OIDC providers that support it. PKCE protects against authorization code interception attacks, particularly important for public clients and mobile applications:

```yaml
sso:
  oidc:
    use_pkce: true
    pkce_challenge: "S256"
```

### Client Secret Management

- **Never commit** `client_secret` values to version control. Use environment variables or a secrets manager.
- Rotate client secrets periodically (every 90 days recommended).
- Use separate OAuth client credentials for each environment (dev, staging, production).
- Restrict redirect URIs in your IdP to exact matches — avoid wildcards.

### Network Security

- Ensure all SSO traffic flows over HTTPS/TLS.
- Configure your reverse proxy or load balancer to pass the `X-Forwarded-Proto` header so AegisGate correctly detects HTTPS.
- Restrict IdP metadata URL access to known IP ranges where possible.
- Use firewall rules to limit which IP addresses can reach `/auth/callback` if your IdP supports IP restrictions.

### IdP-Initiated SSO

By default, AegisGate disables IdP-initiated SAML SSO (`allow_idp_initiated: false`). Only enable this if your workflow specifically requires it, as it increases the attack surface for unsolicited SAML responses:

```yaml
sso:
  allow_idp_initiated: false  # Keep false unless explicitly needed
```

### Tenant Isolation

When using PostgreSQL session storage, AegisGate enforces **tenant isolation** — sessions are scoped to individual tenants and cannot be accessed across tenant boundaries. This is critical for multi-tenant deployments where multiple organizations share the same AegisGate instance.

---

## Troubleshooting

This section covers common SSO configuration issues and their solutions.

### Login Redirects to IdP but Never Returns

| Possible Cause | Solution |
|----------------|----------|
| Redirect URI mismatch | Ensure `redirect_url` / `acs_url` in `sso.yaml` exactly matches the URL configured in your IdP (including trailing slashes) |
| Firewall blocking callback | Ensure port 443 is open and your reverse proxy forwards `/auth/callback` correctly |
| HTTPS not configured | AegisGate requires HTTPS for SSO; ensure `require_https` is satisfied or `X-Forwarded-Proto: https` is set |

### SAML Signature Validation Fails

| Possible Cause | Solution |
|----------------|----------|
| Stale IdP certificate | Update `idp_metadata_url` to fetch the latest metadata, or manually update `idp_cert` |
| Wrong signature algorithm | Ensure `signature_algorithm` matches what your IdP uses (most modern IdPs use `RSA_SHA256`) |
| Clock skew | Increase `clock_skew_tolerance` temporarily to diagnose, then fix server clocks via NTP |
| Assertion not signed | If your IdP doesn't sign assertions, set `want_assertions_signed: false` (not recommended) |

### OIDC Token Validation Fails

| Possible Cause | Solution |
|----------------|----------|
| Wrong issuer URL | Ensure `issuer_url` matches the `iss` claim in the ID token exactly |
| JWKS endpoint unreachable | Verify `jwks_url` is correct and accessible from the AegisGate server |
| Key rotation | AegisGate caches JWKS keys; if keys rotated, the cache will refresh automatically. If it doesn't, restart the service |
| Wrong scopes | Ensure `scopes` includes `openid` — without it, no ID token is returned |

### Session Expires Immediately

| Possible Cause | Solution |
|----------------|----------|
| Clock skew between servers | Set `clock_skew_tolerance` to accommodate the difference |
| Session storage backend mismatch | Ensure all AegisGate instances use the same PostgreSQL session store |
| Cookie domain mismatch | Verify `cookie_domain` matches your deployment domain |
| Cookie not being sent | Check `cookie_secure` and `same_site` settings — if `same_site: none`, `cookie_secure` must be `true` |

### Users Cannot Access Despite Successful Authentication

| Possible Cause | Solution |
|----------------|----------|
| Domain not in allowed list | Add the user's email domain to `allowed_domains` |
| Domain in blocked list | Remove the domain from `blocked_domains` |
| No role mapping | Add a `role_mappings` entry for the user's IdP group, or assign a default role |
| Name ID format mismatch | Ensure `name_id_format` matches what your IdP sends |

### Debug Logging

Enable debug-level logging for the SSO package to diagnose authentication flows:

```yaml
logging:
  level: "debug"
  packages:
    "pkg/sso": "debug"
```

This will log detailed information about SAML assertions, OIDC token validation, session creation, and attribute mapping.

### Verifying IdP Metadata

To verify your IdP metadata URL is accessible and returns valid XML:

```bash
curl -s https://your-tenant.okta.com/app/exk1234567890/sso/saml/metadata | head -20
```

You should see valid SAML metadata XML starting with `<?xml version="1.0" encoding="UTF-8"?>` and containing `<EntityDescriptor>` elements.

---

## Testing with Mock IdPs

AegisGate includes built-in mock identity providers for testing SSO configuration without needing a real IdP. These are invaluable for development, CI/CD pipelines, and integration testing.

### SAML Mock Server

The SAML mock server simulates a SAML 2.0 IdP that signs assertions and responds to authentication requests.

```bash
# Start the SAML mock server (typically on port 8081)
./aegisgate mock-saml-idp --port 8081
```

Configure AegisGate to use the mock server:

```yaml
sso:
  enabled: true
  saml:
    enabled: true
    idp_metadata_url: "http://localhost:8081/saml/metadata"
    entity_id: "https://aegisgate.localhost"
    acs_url: "http://localhost:8080/auth/callback"
    name_id_format: "email"
    validate_signature: true
    want_assertions_signed: true
```

### OIDC Mock Server

The OIDC mock server simulates an OIDC provider with JWKS endpoint, token issuance, and UserInfo.

```bash
# Start the OIDC mock server (typically on port 8082)
./aegisgate mock-oidc-idp --port 8082
```

Configure AegisGate to use the mock server:

```yaml
sso:
  enabled: true
  oidc:
    enabled: true
    provider: generic
    client_id: "mock-client-id"
    client_secret: "mock-client-secret"
    issuer_url: "http://localhost:8082/"
    auth_url: "http://localhost:8082/auth"
    token_url: "http://localhost:8082/token"
    user_info_url: "http://localhost:8082/userinfo"
    jwks_url: "http://localhost:8082/.well-known/jwks.json"
    redirect_url: "http://localhost:8080/auth/callback"
    scopes:
      - openid
      - profile
      - email
    validate_id_token: true
```

### Testing Checklist

Use the following checklist to validate your SSO configuration before going to production:

- [ ] SSO login flow redirects to IdP correctly
- [ ] User can authenticate at the IdP
- [ ] Callback to `/auth/callback` completes successfully
- [ ] Session cookie is set with correct attributes (`Secure`, `HttpOnly`, `SameSite`)
- [ ] Authenticated user can access protected resources
- [ ] Session expires after configured `duration_hours`
- [ ] Logout (`/auth/logout`) destroys the session
- [ ] Role mapping assigns correct roles based on IdP groups
- [ ] Domain access control allows/denies users correctly
- [ ] Signature validation passes for both SAML assertions and OIDC tokens
- [ ] Clock skew tolerance is configured appropriately
- [ ] PostgreSQL session storage works across multiple instances
- [ ] HTTPS is enforced and all traffic is encrypted
- [ ] Client secrets are stored securely (not in plaintext config files)
- [ ] Mock IdP tests pass in CI/CD pipeline

---

## Quick Start Summary

For a rapid deployment, follow these high-level steps:

1. **Choose your protocol**: OIDC for modern providers (Google, Azure AD, Auth0), SAML for traditional enterprise providers (Okta, PingFederate, OneLogin).

2. **Register AegisGate with your IdP**: Create an application/client with the redirect URI `https://aegisgate.yourcompany.com/auth/callback`.

3. **Edit `configs/sso.yaml`**: Set `enabled: true`, configure the protocol-specific section, and copy the client credentials and endpoint URLs.

4. **Configure session management**: Set `session.duration_hours`, `session.same_site`, and `session.secure` for your environment.

5. **Set up role and domain mappings**: Map IdP groups to AegisGate roles and restrict access to your organization's domains.

6. **Restart AegisGate**: Apply the configuration changes.

7. **Test the login flow**: Navigate to `https://aegisgate.yourcompany.com/auth/login` and verify the complete authentication flow.

8. **Test with mock IdPs first**: Use the built-in mock servers to validate configuration before connecting to a production IdP.

For additional help, consult the [troubleshooting section](#troubleshooting) above or reach out to the AegisGate community on [GitHub Discussions](https://github.com/aegisgate/aegisgate/discussions).