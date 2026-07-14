# generateSessionId()

# `generateSessionId()`

`generateSessionId` generates a unique session identifier string. Use this utility to create a new session ID when a user signs in and store the value in a cookie or server-side session store.

## Signature

```ts
generateSessionId(): string
```

## Returns

`string` — A unique session identifier composed of a timestamp-based prefix and a random suffix, encoded in base-36.

## Usage

```ts title="src/routes/sign-in.ts" showLineNumbers

app.get('/sign-in', (req, res) => {
  const sessionId = generateSessionId()

  res.cookie(
    CookieConfig.SESSION_COOKIE_NAME,
    sessionId,
    getSessionCookieOptions(),
  )

  auth.signIn(
    (authUrl) => res.redirect(authUrl),
    sessionId,
  )
})
```

## Related

- [`CookieConfig`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/cookie-config.md) — Cookie name constants
- [`getSessionCookieOptions()`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/get-session-cookie-options.md) — Build cookie options with defaults applied
