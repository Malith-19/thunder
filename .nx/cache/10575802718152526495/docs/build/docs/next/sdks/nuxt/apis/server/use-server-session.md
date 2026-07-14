# useServerSession()

# `useServerSession()`

`useServerSession` reads the ThunderID session from the current H3 event and returns the decoded `ThunderIDSessionPayload`, or `null` if no valid session exists.

## Signature

```ts
useServerSession(event: H3Event): Promise<ThunderIDSessionPayload | null>
```

## Import

```ts

```

## Usage

### In a Nuxt API Route

```ts title="server/api/profile.get.ts" showLineNumbers

export default defineEventHandler(async (event) => {
  const session = await useServerSession(event)

  if (!session) {
    throw createError()
  }

  return
})
```

### Server Middleware

```ts title="server/middleware/log.ts" showLineNumbers

export default defineEventHandler(async (event) => {
  const session = await useServerSession(event)
  if (session) {
    console.log('Authenticated request from:', session.sub)
  }
})
```

## Return Value

Returns a `Promise<ThunderIDSessionPayload | null>`. Returns `null` when:
- No session cookie is present on the request
- The session cookie cannot be verified (invalid signature or expired)

### `ThunderIDSessionPayload`

| Property | Type | Description |
| :--- | :--- | :--- |
| `sub` | `string` | The user's subject identifier |
| `sessionId` | `string` | The internal session ID |
| `accessToken` | `string` | The current access token |
| `accessTokenExpiresAt` | `number \| undefined` | Access token expiry as a Unix timestamp |
| `refreshToken` | `string \| undefined` | The refresh token, if issued |
| `idToken` | `string \| undefined` | The ID token, if issued |
| `scopes` | `string` | Space-separated list of granted scopes |
| `organizationId` | `string \| undefined` | The active organization ID, if any |
| `exp` | `number` | JWT expiry timestamp |
| `iat` | `number` | JWT issued-at timestamp |

## Notes

- Use [`requireServerSession()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/require-server-session.md) to throw a `401` automatically instead of handling `null` manually.
- The session payload is also available synchronously via [`getThunderIDContext()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/get-thunderid-context.md) if the SSR plugin has already run.
