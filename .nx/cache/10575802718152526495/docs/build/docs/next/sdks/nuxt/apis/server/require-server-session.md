# requireServerSession()

# `requireServerSession()`

`requireServerSession` reads the ThunderID session from the current H3 event and returns the decoded `ThunderIDSessionPayload`. If no valid session exists, it throws an H3 error with status code `401`.

## Signature

```ts
requireServerSession(event: H3Event): Promise<ThunderIDSessionPayload>
```

## Import

```ts

```

## Usage

### In a Nuxt API Route

```ts title="server/api/account.get.ts" showLineNumbers

export default defineEventHandler(async (event) => {
  const session = await requireServerSession(event)
  // session is guaranteed to be defined here
  return
})
```

### Fetching Data on Behalf of the User

```ts title="server/api/orders.get.ts" showLineNumbers

export default defineEventHandler(async (event) => {
  const session = await requireServerSession(event)

  const orders = await $fetch('https://api.example.com/orders', {
    headers: ` },
  })

  return orders
})
```

## Return Value

Returns a `Promise<ThunderIDSessionPayload>`. See [`useServerSession()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/use-server-session.md#thunderidsessionpayload) for the full payload shape.

## Error Behavior

When no valid session is found, throws:

```ts
createError()
```

## Notes

- Use [`useServerSession()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/use-server-session.md) when you want to handle the unauthenticated case yourself instead of throwing automatically.
- If the access token in the session may be expired, use [`getValidAccessToken()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/get-valid-access-token.md) after calling `requireServerSession` to ensure you have a fresh token.
