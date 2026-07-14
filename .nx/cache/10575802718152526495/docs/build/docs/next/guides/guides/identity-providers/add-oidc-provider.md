# Add an OIDC Identity Provider

# Add an OIDC Identity Provider

This guide explains how to register a generic OpenID Connect (OIDC) identity provider (IdP) in ThunderID. Use this type for any standard OIDC-compliant provider.

## Prerequisites

- ThunderID is running. See [Get Started](https://thunderid.dev/docs/next/getting-started/get-thunderid.md).
- An access token with the `system` scope.
- A client application registered in the external OIDC provider with a **Client ID**, **Client Secret**, and **redirect URI**.

:::tip Finding endpoint URLs
Most OIDC providers publish their endpoint URLs in a discovery document at:

```
https://<provider-domain>/.well-known/openid-configuration
```

Open this URL in a browser to find the `authorization_endpoint`, `token_endpoint`, `userinfo_endpoint`, `jwks_uri`, and `issuer` values.
:::

## Create the OIDC IdP

Send a `POST` request to `/identity-providers` with your OIDC provider credentials and endpoints:

```bash
curl -kL -X POST https://localhost:8090/identity-providers \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "My OIDC Provider",
    "description": "Corporate OIDC provider",
    "type": "OIDC",
    "properties": [
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
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "name": "My OIDC Provider",
  "type": "OIDC",
  "properties": [
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
| `client_id` | The client ID issued by the OIDC provider. |
| `client_secret` | The client secret issued by the OIDC provider. |
| `redirect_uri` | The callback URL registered in the OIDC provider. |
| `authorization_endpoint` | The provider's authorization endpoint URL. |
| `token_endpoint` | The provider's token endpoint URL. |

## Optional Properties

| Property | Description |
|----------|-------------|
| `userinfo_endpoint` | The provider's userinfo endpoint URL. Used to fetch user profile claims. |
| `jwks_endpoint` | The URL of the provider's JSON Web Key Set. Required when `token_exchange_enabled` is `true`. |
| `issuer` | The provider's issuer identifier. Required when `token_exchange_enabled` is `true`. |
| `scopes` | Space-separated list of OIDC scopes to request (for example, `openid email profile`). |
| `logout_endpoint` | The provider's end-session endpoint. |
| `prompt` | The `prompt` parameter to send in authorization requests (for example, `login`, `consent`). |
| `token_exchange_enabled` | Set to `true` to enable token exchange with this provider. Requires `issuer` and `jwks_endpoint`. |

## Attribute Configuration

External providers emit attributes under their own names, which may differ from the attribute names ThunderID uses locally (for example, a provider may emit `given_name` where your user type defines `firstName`). Configure the IdP's `attributeConfiguration` to map external attributes to local user attributes.

```json
{
  "name": "My OIDC Provider",
  "type": "OIDC",
  "properties": [ /* ... */ ],
  "attributeConfiguration": {
    "userTypeResolution": {
      "default": "Person"
    },
    "userTypeAttributeMappings": [
      {
        "userType": "Person",
        "attributes": [
          ,

        ]
      }
    ]
  }
}
```

| Field | Description |
|-------|-------------|
| `userTypeResolution` | **Required.** Resolves the local user type for an incoming identity. |
| `userTypeAttributeMappings` | An array where each entry holds the attribute mappings for one user type. |

Each entry has a `userType` (the user type whose schema defines the valid local targets) and an `attributes` array. Each item in `attributes` has the following fields:

| Field | Description |
|-------|-------------|
| `externalAttribute` | **Required.** The external attribute name. |
| `localAttribute` | **Required.** The target local attribute. Must be an attribute defined in `userType` schema. |

Behavior:

- The `externalAttribute` (source) supports attributes in complex forms. We can use **dot notation** to read a value nested inside another attribute — for example, `email.work` reads the `work` field from an `email` object.
- The `localAttribute` (target) must be an attribute defined in the profile's `userType` schema; this is validated when the IdP is created or updated.
- An attribute whose name is mapped is renamed to its local attribute; attributes without a mapping pass through unchanged.

The mapping applies both when a user signs in through this IdP in an authentication flow and when a token from this IdP is exchanged (see [Trusted Issuer](https://thunderid.dev/docs/next/guides/trusted-issuer.md#attribute-configuration)). The resulting local attributes flow into the issued access and ID tokens, subject to the application's `userAttributes` configuration.

Example with token exchange enabled:

```bash
curl -kL -X POST https://localhost:8090/identity-providers \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "My OIDC Provider",
    "type": "OIDC",
    "properties": [
      ,
      ,
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

- [Connect an IdP to an Application](https://thunderid.dev/docs/next/guides/guides/connect-idp-to-application.md) — Add this OIDC IdP to an application's authentication flow.
- [Manage Identity Providers](https://thunderid.dev/docs/next/guides/guides/manage-identity-providers.md) — Update or delete identity providers.
