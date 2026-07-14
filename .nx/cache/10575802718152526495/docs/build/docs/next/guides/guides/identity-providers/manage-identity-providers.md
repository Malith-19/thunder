# Manage Identity Providers

# Manage Identity Providers

This guide explains how to create, update, and delete identity providers using the ThunderID Identity Provider API.

> **Note**
>
> Identity provider management through the ThunderID Console is not yet available. Use the API commands in this guide to manage identity providers.


For provider-specific setup instructions, see:

- [Add a Google Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-google.md)
- [Add a GitHub Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-github.md)
- [Add an OIDC Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-oidc-provider.md)
- [Add an OAuth 2.0 Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-oauth-provider.md)

## Prerequisites

- ThunderID is running. See [Get Started](https://thunderid.dev/docs/next/getting-started/get-thunderid.md).
- An access token with the `system` scope.

## Create an Identity Provider

Send a `POST` request to `/identity-providers`:

```bash
curl -kL -X POST https://localhost:8090/identity-providers \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "My Provider",
    "description": "Optional description",
    "type": "GOOGLE",
    "properties": [
      ,
      ,

    ]
  }'
```

Valid `type` values: `GOOGLE`, `GITHUB`, `OIDC`, `OAUTH`.

**Response (201 Created):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My Provider",
  "description": "Optional description",
  "type": "GOOGLE",
  "properties": [
    ,
    ,

  ]
}
```

Secret property values are masked (`******`) in all API responses.

## List Identity Providers

Send a `GET` request to `/identity-providers`:

```bash
curl -kL https://localhost:8090/identity-providers \
  -H 'Authorization: Bearer <access-token>'
```

**Response (200 OK):**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Google",
    "description": "Google social login",
    "type": "GOOGLE",
    "isReadOnly": false
  }
]
```

## Get an Identity Provider

Send a `GET` request to `/identity-providers/`:

```bash
curl -kL https://localhost:8090/identity-providers/<idp-id> \
  -H 'Authorization: Bearer <access-token>'
```

## Update an Identity Provider

Send a `PUT` request to `/identity-providers/` with the full updated payload. The request body uses the same structure as the create request:

```bash
curl -kL -X PUT https://localhost:8090/identity-providers/<idp-id> \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "My Provider",
    "type": "GOOGLE",
    "properties": [
      ,
      ,

    ]
  }'
```

Changes take effect immediately for new authentication requests.

## Delete an Identity Provider

Send a `DELETE` request to `/identity-providers/`:

```bash
curl -kL -X DELETE https://localhost:8090/identity-providers/<idp-id> \
  -H 'Authorization: Bearer <access-token>'
```

A successful delete returns `204 No Content`.

> **Warning**
>
> Deleting an identity provider removes it permanently. Any authentication flow that references this IdP will fail at the social login step. Update or remove the flow node before deleting the IdP.


> **Note**
>
> Read-only identity providers created through declarative configuration return an error when you attempt to delete them via the API.


## Next Steps

- [Connect an IdP to an Application](https://thunderid.dev/docs/next/guides/guides/connect-idp-to-application.md) — Assign a configured IdP to an application's sign-in flow.
