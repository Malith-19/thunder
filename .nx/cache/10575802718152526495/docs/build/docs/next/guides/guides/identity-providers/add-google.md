# Add a Google Identity Provider

# Add a Google Identity Provider

This guide walks you through registering a Google identity provider (IdP) in ThunderID. Once configured, you can add **Sign in with Google** to any application by including a Google social login executor in its authentication flow.

## Prerequisites

- ThunderID is running. See [Get Started](https://thunderid.dev/docs/next/getting-started/get-thunderid.md).
- An access token with the `system` scope.
- A Google account with access to [Google Cloud Console](https://console.cloud.google.com).

## Step 1: Register an OAuth App in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com) and sign in.
2. Select or create a project.
3. In the navigation menu, go to **APIs & Services** → **Credentials**.
4. Click **Create Credentials** → **OAuth client ID**.
5. Set **Application type** to **Web application**.
6. Under **Authorized redirect URIs**, add the callback URL for your ThunderID deployment:

   ```
   https://<your-thunderid-host>/oauth2/callback
   ```

7. Click **Create**. Google displays your **Client ID** and **Client Secret**. Copy both values — you need them in the next step.

## Step 2: Create the Google IdP

Send a `POST` request to `/identity-providers` with your Google credentials:

```bash
curl -kL -X POST https://localhost:8090/identity-providers \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "Google",
    "description": "Google social login",
    "type": "GOOGLE",
    "properties": [
      ,
      ,

    ]
  }'
```

**Response (201 Created):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Google",
  "description": "Google social login",
  "type": "GOOGLE",
  "properties": [
    ,
    ,
    ,
    ,
    ,
    ,

  ]
}
```

ThunderID automatically populates the Google authorization, token, userinfo, and JWKS endpoints. You do not need to supply them.

## Optional Properties

You can include the following optional properties in the request `properties` array:

| Property | Description |
|----------|-------------|
| `scopes` | Space-separated list of OAuth scopes to request. Defaults to `openid email profile` if not set. |
| `prompt` | Controls the Google consent screen behavior. Common values: `consent`, `select_account`. |
| `issuer` | The Google token issuer. Required when `token_exchange_enabled` is `true`. |
| `token_exchange_enabled` | Set to `true` to enable token exchange. When enabled, `issuer` and the JWKS endpoint must be present. |

Example with optional properties:

```bash
curl -kL -X POST https://localhost:8090/identity-providers \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <access-token>' \
  -d '{
    "name": "Google",
    "type": "GOOGLE",
    "properties": [
      ,
      ,
      ,
      ,

    ]
  }'
```

## Next Steps

- [Connect an IdP to an Application](https://thunderid.dev/docs/next/guides/guides/connect-idp-to-application.md) — Add this Google IdP to an application's authentication flow.
- [Manage Identity Providers](https://thunderid.dev/docs/next/guides/guides/manage-identity-providers.md) — Update or delete identity providers.
