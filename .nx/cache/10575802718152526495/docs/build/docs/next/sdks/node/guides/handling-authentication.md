# Handling Authentication

# Handling Authentication

This guide explains how to implement authentication in a Node.js server-side application using the ThunderID Node.js SDK. You will set up the client, redirect users to the identity provider for sign-in, handle the OAuth 2.0 callback, and implement sign-out.

## Prerequisites

- Node.js 18 or later
- An application registered in ThunderID with the callback URL configured (for example, `http://localhost:3000/callback`)
- The `@thunderid/node` package installed

## 1. Initialize the Client

Create a shared authentication client instance and initialize it with your application's configuration.

```ts title="src/auth.ts" showLineNumbers

// auth is an instance of your framework client (e.g. from @thunderid/express)
// initialized with this configuration
const config: ThunderIDNodeConfig = {
  clientId: '<your-client-id>',
  serverOrigin: 'https://localhost:8090',
  afterSignInUrl: 'http://localhost:3000/callback',
  afterSignOutUrl: 'http://localhost:3000',
  scope: ['openid', 'profile'],
}

export default config
```

> **Note**
>
> The SDK uses an in-memory cache as the default session store. For production deployments with multiple server instances, configure a shared external store by passing a custom `store` to `initialize`.


## 2. Start the Sign-In Flow

When the user navigates to the sign-in route, generate a session identifier, store it in a cookie, and redirect the user to the identity provider's authorization endpoint.

```ts title="src/routes/sign-in.ts" showLineNumbers


app.get('/sign-in', async (req, res) => {
  let sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]

  if (!sessionId) {
    sessionId = generateSessionId()
    res.cookie(
      CookieConfig.SESSION_COOKIE_NAME,
      sessionId,
      getSessionCookieOptions(),
    )
  }

  await auth.signIn(
    (authUrl) => res.redirect(authUrl),
    sessionId,
  )
})
```

The `authURLCallback` function receives the authorization URL. Redirect the user to this URL to continue the sign-in flow at the identity provider.

## 3. Handle the Callback

After the user authenticates at the identity provider, the browser redirects to the callback URL with the authorization code, session state, and state parameter. Exchange these values for tokens.

```ts title="src/routes/callback.ts" showLineNumbers


app.get('/callback', async (req, res) => {
  const sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]

  if (!sessionId) {
    return res.redirect('/sign-in')
  }

  const  = req.query

  await auth.signIn(
    (authUrl) => res.redirect(authUrl),
    sessionId,
    code as string,
    session_state as string,
    state as string,
  )

  // Refresh the cookie with the full session expiry time
  res.cookie(
    CookieConfig.SESSION_COOKIE_NAME,
    sessionId,
    getSessionCookieOptions(),
  )

  res.redirect('/dashboard')
})
```

After a successful token exchange, the SDK stores the tokens internally. The session ID in the cookie links the browser session to the stored tokens.

## 4. Implement Sign-Out

To sign a user out, clear the session data and redirect the user to the identity provider's end session endpoint.

```ts title="src/routes/sign-out.ts" showLineNumbers


app.get('/sign-out', async (req, res) => {
  const sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]

  if (!sessionId) {
    return res.redirect('/')
  }

  const signOutUrl = await auth.signOut(sessionId)

  res.clearCookie(CookieConfig.SESSION_COOKIE_NAME)
  res.redirect(signOutUrl)
})
```

## Next Steps

- [Protecting Routes](https://thunderid.dev/docs/next/sdks/node/guides/protecting-routes.md) — Restrict access to routes based on authentication state
- [Accessing Protected APIs](https://thunderid.dev/docs/next/sdks/node/guides/accessing-protected-apis.md) — Use the access token to call downstream APIs
