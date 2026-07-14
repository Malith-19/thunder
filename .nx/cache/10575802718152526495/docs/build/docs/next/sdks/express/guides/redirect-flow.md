# Redirect Flow

# Redirect Flow

Use the redirect flow when you want the SDK to drive a standard OAuth 2.0 authorization-code redirect cycle for your Express application.

## Prerequisites

- `express`
- `cookie-parser`
- an application configured in ThunderID
- a redirect route such as `http://localhost:3000/login`

## Middleware Order

Mount middleware in this order:

1. `cookie-parser()`
2. `express.json()` if you also need JSON request parsing
3. `thunderID(config)`
4. Route handlers that use `handleSignIn()`, `handleSignOut()`, or `protect()`

## Example

```js title="index.js" showLineNumbers
const express = require('express');
const cookieParser = require('cookie-parser');
const  = require('@thunderid/express');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(
  thunderID({
    baseUrl: 'https://localhost:8090',
    clientId: '<your-client-id>',
    clientSecret: '<your-client-secret>',
    afterSignInUrl: 'http://localhost:3000/login',
    afterSignOutUrl: 'http://localhost:3000/logout',
  }),
);

app.get('/', (_req, res) => {
  res.send('<a href="/protected">Go to protected page</a>');
});

app.get('/login', handleSignIn());
app.get('/logout', handleSignOut());

app.get(
  '/protected',
  protect((res) => res.redirect('/login')),
  (_req, res) => {
    res.send('You are signed in and can access this protected route.');
  },
);

app.get('/me', protect(), async (req, res) => {
  const user = await req.thunderIDAuth.getUserFromRequest(req);
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:$`);
});
```

## Flow Lifecycle

1. The user opens a protected route.
2. `protect()` checks the session cookie and current sign-in state.
3. If the request is unauthenticated, your `onUnauthenticated` callback can redirect to `/login`.
4. `handleSignIn()` starts the redirect flow.
5. ThunderID redirects back to the configured sign-in callback route.
6. `handleSignIn()` exchanges the authorization code for tokens and sets the session cookie.
7. Protected routes can now continue and route handlers can read the signed-in user.

## Access the Current User

After `thunderID()` runs, the initialized client is available on `req.thunderIDAuth`.

```js title="index.js" showLineNumbers
app.get('/me', protect(), async (req, res) => {
  const user = await req.thunderIDAuth.getUserFromRequest(req);
  res.json(user);
});
```

## Related APIs

- [`thunderID()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/thunderid.md)
- [`handleSignIn()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-in.md)
- [`handleSignOut()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-out.md)
- [`protect()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/protect.md)
