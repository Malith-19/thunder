# Add an OAuth 2.0 Identity Provider

# Add an OAuth 2.0 Identity Provider

This guide explains how to register a generic OAuth 2.0 identity provider (IdP) in ThunderID. Use this type for OAuth 2.0 providers that do not implement OpenID Connect discovery. If the provider supports OIDC, use [Add an OIDC Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-oidc-provider.md) instead.

## Prerequisites

- ThunderID is running. See [Get Started](https://thunderid.dev/docs/next/getting-started/get-thunderid.md).
- An access token with the `system` scope.
- A client application registered in the external OAuth 2.0 provider with a **Client ID**, **Client Secret**, and **redirect URI**.
- The provider's authorization endpoint, token endpoint, and userinfo endpoint URLs.

## Create the OAuth 2.0 IdP

Send a `POST` request to `/identity-providers` with your OAuth 2.0 provider credentials and endpoints:

```bash
curl -kL -X POST https://localhost:8090/identity-providers \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "My OAuth Provider",
    "description": "Custom OAuth 2.0 provider",
    "type": "OAUTH",
    "properties": [
      ,
      ,
      ,
      ,
      ,

    ]
  }'
```

**Response (201 Created):**

```json
{
  "id": "880e8400-e29b-41d4-a716-446655440003",
  "name": "My OAuth Provider",
  "type": "OAUTH",
  "properties": [
    ,
    ,
    ,
    ,
    ,

  ]
}
```

## Required Properties

| Property | Description |
|----------|-------------|
| `client_id` | The client ID issued by the OAuth 2.0 provider. |
| `client_secret` | The client secret issued by the OAuth 2.0 provider. |
| `redirect_uri` | The callback URL registered in the provider. |
| `authorization_endpoint` | The provider's authorization endpoint URL. |
| `token_endpoint` | The provider's token endpoint URL. |
| `userinfo_endpoint` | The provider's userinfo endpoint URL. ThunderID calls this endpoint to fetch the authenticated user's profile. |

## Optional Properties

| Property | Description |
|----------|-------------|
| `scopes` | Space-separated list of OAuth scopes to request. |
| `logout_endpoint` | The provider's logout endpoint URL. |
| `prompt` | The `prompt` parameter to send in authorization requests. |

To map this provider's claims to local user attributes, set the top-level `attributeConfiguration` field — see [Attribute Configuration](https://thunderid.dev/docs/next/guides/guides/add-oidc-provider.md#attribute-configuration).

Example with optional properties:

```bash
curl -kL -X POST https://localhost:8090/identity-providers \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "My OAuth Provider",
    "type": "OAUTH",
    "properties": [
      ,
      ,
      ,
      ,
      ,
      ,
      ,

    ]
  }'
```

## Next Steps

- [Connect an IdP to an Application](https://thunderid.dev/docs/next/guides/guides/connect-idp-to-application.md) — Add this OAuth 2.0 IdP to an application's authentication flow.
- [Manage Identity Providers](https://thunderid.dev/docs/next/guides/guides/manage-identity-providers.md) — Update or delete identity providers.
