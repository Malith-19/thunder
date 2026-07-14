# Server Actions

# Server Actions

The ThunderID Next.js SDK provides server actions for authentication, session management, and user operations. These run only on the server and never expose tokens to the client.

Import all server actions from `@thunderid/nextjs/server`.

## Authentication

### `signInAction()`

Start the sign-in flow. By default, redirects the user to the ThunderID sign-in page. Optionally accepts parameters for embedded sign-in flows.

```ts

// Redirect-based sign-in (default)
await signInAction()

// With embedded flow payload (advanced)
await signInAction(payload, requestConfig)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `payload` | `EmbeddedSignInFlowHandleRequestPayload` | Optional payload for embedded sign-in flows |
| `requestConfig` | `EmbeddedFlowExecuteRequestConfig` | Optional request configuration for embedded flows |

### `signOutAction()`

Sign out the current user and clear the session cookie.

```ts

await signOutAction()
```

### `signUpAction()`

Start the sign-up flow.

```ts

await signUpAction()
```

### `refreshToken()`

Manually refresh the access token.

```ts

const result = await refreshToken()
// result.expiresAt — token expiry timestamp
```

**Returns:** `Promise<>`

## Session

### `isSignedIn()`

Check whether the current user is authenticated.

```ts

const authenticated = await isSignedIn()
```

**Returns:** `Promise<boolean>`

### `getSessionId()`

Retrieve the current session ID.

```ts

const sessionId = await getSessionId()
```

**Returns:** `Promise<string | undefined>`

### `getSessionPayload()`

Retrieve the full session token payload including user ID, scopes, and organization.

```ts

const session = await getSessionPayload()
if (session) {
  console.log(session.sub, session.scopes)
}
```

**Returns:** `Promise<SessionTokenPayload | undefined>`

### `getAccessToken()`

Retrieve the current access token for making authenticated API calls from the server.

```ts

const token = await getAccessToken()
```

**Returns:** `Promise<string | undefined>`

### `clearSession()`

Clear the session cookie without triggering a sign-out flow.

```ts

await clearSession()
```

## User Management

### `getUserAction()`

Retrieve the authenticated user's profile.

```ts

const sessionId = await getSessionId()
const result = await getUserAction(sessionId)

if (result.success) {
  console.log(result.data.user)
}
```

**Returns:** `Promise<; error: string | null; success: boolean }>`

### `getUserProfileAction()`

Retrieve the extended user profile.

```ts

const sessionId = await getSessionId()
const result = await getUserProfileAction(sessionId)

if (result.success) {
  console.log(result.data.userProfile)
}
```

### `updateUserProfileAction()`

Update the current user's profile.

```ts

const result = await updateUserProfileAction({
  name: ,
})
```

## Organization Management

### `getMyOrganizations()`

List organizations the current user belongs to.

```ts

const organizations = await getMyOrganizations()
```

### `switchOrganization()`

Switch the current session to a different organization.

```ts

await switchOrganization(targetOrganization)
```

### `createOrganization()`

Create a new organization.

```ts

const org = await createOrganization()
```

### `getAllOrganizations()`

List all organizations (requires admin privileges).

```ts

const response = await getAllOrganizations()
```

### `getCurrentOrganizationAction()`

Retrieve the organization for the current session.

```ts

const sessionId = await getSessionId()
const result = await getCurrentOrganizationAction(sessionId)
```

## `thunderid()` Client Access

For advanced use cases, access the server-side client directly:

```ts

const client = await thunderid()

const token = await client.getAccessToken(sessionId)
const result = await client.exchangeToken(config, sessionId)
```

| Method | Description |
|--------|-------------|
| `getAccessToken(sessionId)` | Retrieve the access token for a session |
| `getSessionId()` | Retrieve the current session ID |
| `exchangeToken(config, sessionId)` | Perform a custom token exchange |
| `reInitialize(config)` | Update SDK configuration at runtime |
