# Token Exchange with External Identity Providers

# Token Exchange with External Identity Providers

ThunderID can exchange a token issued by an external identity provider (IdP) for a ThunderID-issued access token. This lets a client that authenticates users via an external OIDC provider — such as Asgardeo, Google, Azure AD, or Keycloak — obtain a ThunderID-scoped access token without requiring users to sign in again.

This uses [RFC 8693 Token Exchange](https://datatracker.ietf.org/doc/html/rfc8693). For general information about the token exchange grant type, see [Token Exchange](https://thunderid.dev/docs/next/guides/protocols/oauth-oidc/token-exchange.md).

## When to Use

Use this when:

- A client authenticates users via an external OIDC provider and needs a ThunderID-scoped access token to call ThunderID-protected APIs.
- You want to centralize token issuance through ThunderID while delegating user authentication to an upstream IdP.

This is different from the [trusted issuer](https://thunderid.dev/docs/next/guides/trusted-issuer.md) feature. Trusted issuer lets ThunderID accept and validate tokens from a central authorization server directly, without issuing new tokens. Token exchange accepts an external token and issues a new ThunderID token in return.

## Prerequisites

- ThunderID is running. See [Get Started](https://thunderid.dev/docs/next/getting-started/get-thunderid.md).
- An external OIDC identity provider that issues JWTs with an `iss` claim and exposes a JWKS endpoint.
- An access token with the `system` scope for the setup API calls.

## Step 1: Register the External Identity Provider

Register the external IdP in ThunderID and enable it for token exchange. Only three properties are required for a token-exchange-only IdP:

| Property | Required | Description |
|----------|----------|-------------|
| `issuer` | Yes | The exact `iss` claim value in tokens from this IdP. ThunderID matches incoming tokens against this value to identify which IdP issued them. |
| `jwks_endpoint` | Yes | The IdP's JWKS URL. ThunderID fetches public signing keys from this URL to verify token signatures. |
| `token_exchange_enabled` | Yes | Set to `"true"` to allow this IdP's tokens to be exchanged. |

The redirect-flow OIDC properties (`client_secret`, `redirect_uri`, `authorization_endpoint`, `token_endpoint`) are not required unless the same IdP is also used for redirect-based sign-in.

```bash
curl -X POST https://thunder.example.com/identity-providers \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Asgardeo",
    "type": "OIDC",
    "properties": [
      ,
      ,

    ]
  }'
```

## Step 2: Create an OAuth Application with the Token Exchange Grant

Create an OAuth application and include `urn:ietf:params:oauth:grant-type:token-exchange` in its allowed grant types. This is the client that will perform exchanges on behalf of users.

```bash
curl -X POST https://thunder.example.com/applications \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Token Exchange Client",
    "inboundAuthConfig": [{
      "type": "oauth2",
      "config": {
        "clientId": "te_client",
        "clientSecret": "te_secret",
        "grantTypes": ["urn:ietf:params:oauth:grant-type:token-exchange"],
        "tokenEndpointAuthMethod": "client_secret_basic"
      }
    }]
  }'
```

## Step 3: Exchange the External Token

Send the external IdP token to ThunderID's token endpoint using the token exchange grant type:

```bash
curl -X POST https://thunder.example.com/oauth2/token \
  -u 'te_client:te_secret' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
  -d 'subject_token=<JWT_FROM_EXTERNAL_IDP>' \
  -d 'subject_token_type=urn:ietf:params:oauth:token-type:jwt'
```

A successful response returns a ThunderID-issued access token:

```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token"
}
```

The issued token's `sub` claim contains the external user's subject identifier from the original token.

## How ThunderID Validates the External Token

When processing an external token for exchange, ThunderID:

1. Extracts the `iss` claim and matches it against registered IdPs with `token_exchange_enabled=true`.
2. Fetches the matching IdP's JWKS and verifies the token signature.
3. Checks that the token's `aud` claim contains this ThunderID instance's own issuer.
4. Validates `exp` (and `nbf` if present) with the configured clock-skew leeway.
5. Extracts the `sub` claim and non-standard claims as user attributes.

If any step fails, the exchange returns HTTP 400 with `error=invalid_request` and an `"Invalid subject_token"` message.

## Attribute Configuration

Attribute configuration for token exchange uses the same `attributeConfiguration` structure as federated sign-in. See [Add an OIDC Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-oidc-provider.md#attribute-configuration) for the full reference.

## Limitations

- Only JWT tokens are supported. Opaque tokens (for example, GitHub access tokens) cannot be exchanged.
- The external user's `sub` is passed through as-is. No local user lookup or just-in-time provisioning occurs.
- No scope mapping is applied; external token scopes use the existing intersection logic. External claims can be renamed to local attributes via the IdP's `attributeConfiguration` (see [Attribute Configuration](#attribute-configuration)); the resulting attributes are still filtered by the application's `userAttributes` configuration.
- Token exchange is available to all applications that have the token exchange grant type. No per-application IdP restriction applies.

## Next Steps

- [Manage Identity Providers](https://thunderid.dev/docs/next/guides/guides/manage-identity-providers.md) — Create, update, and delete identity providers using the API.
- [Connect an IdP to an Application](https://thunderid.dev/docs/next/guides/guides/connect-idp-to-application.md) — Use an IdP for redirect-based sign-in flows.
- [Token Exchange](https://thunderid.dev/docs/next/guides/protocols/oauth-oidc/token-exchange.md) — Learn about the RFC 8693 token exchange grant type in ThunderID.
