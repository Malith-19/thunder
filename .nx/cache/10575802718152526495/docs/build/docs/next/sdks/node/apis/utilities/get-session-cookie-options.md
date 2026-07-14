# getSessionCookieOptions()

# `getSessionCookieOptions()`

`getSessionCookieOptions` merges the provided partial [`CookieOptions`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/cookie-options.md) with the default values from [`CookieConfig`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/cookie-config.md). Any property you omit falls back to its default.

## Signature

```ts
getSessionCookieOptions(options: Partial<CookieOptions>): CookieOptions
```

## Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `options` | `Partial<CookieOptions>` | ✅ | Cookie options to apply. Unspecified properties use the defaults from `CookieConfig`. |

## Returns

`CookieOptions` — A complete cookie options object with all required fields populated.

## Default Values

| Property | Default |
| :--- | :--- |
| `httpOnly` | `true` |
| `maxAge` | `3600` seconds (1 hour) |
| `sameSite` | `'lax'` |
| `secure` | `true` |

## Usage

### Use Defaults with a Custom Lifetime

```ts showLineNumbers

// Override only maxAge; all other properties use defaults
const options = getSessionCookieOptions() // 24 hours
```

### Override Multiple Options

```ts showLineNumbers

const options = getSessionCookieOptions({
  maxAge: 7200,
  sameSite: 'strict',
  secure: true,
})
```

### Apply to a Response Cookie

```ts title="src/routes/callback.ts" showLineNumbers

app.get('/callback', async (req, res) => {
  const sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]

  await auth.signIn(
    (authUrl) => res.redirect(authUrl),
    sessionId,
    req.query.code as string,
    req.query.session_state as string,
    req.query.state as string,
  )

  res.cookie(
    CookieConfig.SESSION_COOKIE_NAME,
    sessionId,
    getSessionCookieOptions(),
  )

  res.redirect('/dashboard')
})
```

## Related

- [`CookieOptions`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/cookie-options.md) — Interface for cookie configuration
- [`CookieConfig`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/cookie-config.md) — Default constant values
