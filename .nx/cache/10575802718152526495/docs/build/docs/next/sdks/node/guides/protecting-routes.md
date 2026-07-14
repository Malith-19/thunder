# Protecting Routes

# Protecting Routes

This guide shows how to restrict access to routes in a Node.js server-side application based on authentication state. You will create reusable middleware that checks whether the current user has an active session before allowing access to protected resources.

## Prerequisites

- Complete the [Handling Authentication](https://thunderid.dev/docs/next/sdks/node/guides/handling-authentication.md) guide to set up the authentication client and session cookie.

## How It Works

The `isSignedIn` method checks whether the user's session exists and is still valid. If the access token has expired but a refresh token exists, the SDK automatically refreshes the token before returning the result. Use this method in a middleware function to gate access to protected routes.

## Create an Authentication Middleware

```ts title="src/middleware/requireAuth.ts" showLineNumbers


export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]

  if (!sessionId) {
    res.redirect('/sign-in')
    return
  }

  const signedIn = await auth.isSignedIn(sessionId)

  if (!signedIn) {
    res.redirect('/sign-in')
    return
  }

  next()
}
```

## Apply Middleware to Routes

### Protect Individual Routes

Apply the middleware to specific routes that require authentication.

```ts title="src/routes/dashboard.ts" showLineNumbers

app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard')
})

app.get('/profile', requireAuth, async (req, res) => {
  const sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]
  const user = await auth.getUser(sessionId)
  res.render('profile', )
})
```

### Protect an Entire Router

Apply the middleware to all routes within a router using `router.use`.

```ts title="src/routes/protected.ts" showLineNumbers


const router = Router()

router.use(requireAuth)

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

router.get('/settings', (req, res) => {
  res.render('settings')
})

export default router
```

## Attach User Data to the Request

Extend the request object to carry user information, so protected route handlers can access it without fetching it again.

```ts title="src/middleware/requireAuth.ts" showLineNumbers


declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]

  if (!sessionId) {
    res.redirect('/sign-in')
    return
  }

  const signedIn = await auth.isSignedIn(sessionId)

  if (!signedIn) {
    res.redirect('/sign-in')
    return
  }

  req.user = await auth.getUser(sessionId)

  next()
}
```

Route handlers can then access the user directly from the request:

```ts
app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', )
})
```

## Handle Token Refresh Failures

The `isSignedIn` method attempts to refresh an expired access token automatically. If the refresh fails (for example, the refresh token has also expired), it returns `false`. The middleware handles this by redirecting to the sign-in route.

To distinguish an expired session from a network failure, you can catch errors explicitly:

```ts title="src/middleware/requireAuth.ts" showLineNumbers
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const sessionId = req.cookies[CookieConfig.SESSION_COOKIE_NAME]

  if (!sessionId) {
    res.redirect('/sign-in')
    return
  }

  try {
    const signedIn = await auth.isSignedIn(sessionId)

    if (!signedIn) {
      res.clearCookie(CookieConfig.SESSION_COOKIE_NAME)
      res.redirect('/sign-in')
      return
    }
  } catch (error) {
    res.status(500).send('Authentication check failed.')
    return
  }

  next()
}
```

## Next Steps

- [Accessing Protected APIs](https://thunderid.dev/docs/next/sdks/node/guides/accessing-protected-apis.md) — Use the access token to call downstream services
