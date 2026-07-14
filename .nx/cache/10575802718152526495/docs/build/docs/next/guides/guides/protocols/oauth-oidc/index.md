# OAuth & OpenID Connect

# OAuth & OpenID Connect

ThunderID implements **OAuth 2.1**, **OpenID Connect Core 1.0**, and a curated set of modern security extensions. Each page below explains a single protocol or feature: what it is, how it works, how ThunderID implements it, and how to enable it on your client.

For other identity standards, see the [Protocols & Standards](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/...md) overview.

## Clients in ThunderID

An OAuth **client** in ThunderID is either a registered **application** (a user-facing app or a backend service) or an **agent** (an autonomous or AI service identity). Both are first-class OAuth clients: they share the same `/oauth2/token` endpoint, the same client authentication methods, the same grant handlers, and the same security extensions (PKCE, PAR, DPoP, Resource Indicators).

## Grant Types

How clients obtain access tokens, ID tokens, and refresh tokens from ThunderID.

| Protocol | Spec | Summary |
|---|---|---|
| [Authorization Code](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/authorization-code.md) | RFC 6749 §4.1 | Redirect-based flow for user-facing applications. PKCE is required for public clients. |
| [Client Credentials](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/client-credentials.md) | RFC 6749 §4.4 | Machine-to-machine flow for backend services. No user is involved. |
| [Refresh Token](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/refresh-token.md) | RFC 6749 §6 | Exchange a refresh token for a new access token without re-authenticating the user. |
| [Token Exchange](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/token-exchange.md) | RFC 8693 | Exchange one token for another to delegate, impersonate, or downscope. |
| [Backchannel Authentication (CIBA)](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/backchannel-authentication.md) | CIBA Core 1.0 | Decoupled flow where a client triggers user authentication on a separate device, without a browser redirect. |

## Client Authentication

How a registered client proves its identity to ThunderID.

| Protocol | Spec | Summary |
|---|---|---|
| [Client Authentication Methods](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/client-authentication-methods.md) | RFC 6749 §2.3 · RFC 7523 | The four supported methods: `client_secret_basic`, `client_secret_post`, `private_key_jwt`, and `none`. |

## Security Extensions

Protections layered on top of the core flows.

| Protocol | Spec | Summary |
|---|---|---|
| [PKCE](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/pkce.md) | RFC 7636 | Protects authorization codes against interception. Required for public clients. |
| [Pushed Authorization Requests](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/par.md) | RFC 9126 | Send authorization parameters to ThunderID over a back-channel before the redirect. |
| [DPoP — Sender-Constrained Tokens](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/dpop.md) | RFC 9449 | Bind access and refresh tokens to a client-held key. |
| [Issuer Identification](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/issuer-identification.md) | RFC 9207 | Include `iss` in the authorization response to prevent mix-up attacks. |
| [Resource Indicators](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/resource-indicators.md) | RFC 8707 | Target an access token to a specific resource server via the `resource` parameter. |

## Token Operations

Endpoints for inspecting and managing tokens.

| Protocol | Spec | Summary |
|---|---|---|
| [Token Introspection](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/token-introspection.md) | RFC 7662 | Ask ThunderID whether a token is active and what it carries. |

## Discovery & Registration

How clients and resource servers find ThunderID and register with it.

| Protocol | Spec | Summary |
|---|---|---|
| [Server Metadata](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/server-metadata.md) | RFC 8414 · OIDC Discovery 1.0 | The `.well-known` documents that advertise endpoints and supported features. |
| [JWKS](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/jwks.md) | RFC 7517 | Public-key endpoint used to verify ThunderID-issued JWTs. |
| [Dynamic Client Registration](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/dynamic-client-registration.md) | RFC 7591 | Register a client programmatically over HTTP. |

## OpenID Connect

The identity layer on top of OAuth 2.1.

| Protocol | Spec | Summary |
|---|---|---|
| [OpenID Connect](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/openid-connect.md) | OIDC Core 1.0 | ID tokens, the `openid` scope, and authentication context parameters (`nonce`, `prompt`, `acr_values`). |
| [UserInfo](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/userinfo.md) | OIDC Core 1.0 §5.3 | Endpoint that returns claims about the authenticated user. |
| [Claims & Scopes](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/claims-and-scopes.md) | OIDC Core 1.0 §5 | Standard OIDC scopes, custom scope-to-claim mapping, and the `claims` parameter. |
| [Token Formats](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/token-formats.md) | RFC 7515 · RFC 7516 | ID Token and UserInfo response formats: JWS, JWE, and NESTED_JWT. |
