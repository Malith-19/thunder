# ThunderID Middleware

# `thunderID()`

The `thunderID()` function returns Express middleware that initializes a `ThunderIDExpressClient` and attaches it to both `req.thunderIDAuth` and `res.thunderIDAuth`.

## Signature

```ts
thunderID(config: ThunderIDExpressConfig): express.RequestHandler
```

## Import

```js
const  = require('@thunderid/express');
```

## Overview

Use `thunderID()` near the top of your middleware stack. It initializes the SDK once, then exposes the initialized client to later middleware and route handlers.

Unlike the old `thunderID()` router, this middleware does **not** mount any routes automatically. Register sign-in and sign-out handlers explicitly.

## Usage

```js title="index.js" showLineNumbers
const express = require('express');
const cookieParser = require('cookie-parser');
const  = require('@thunderid/express');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  thunderID({
    baseUrl: 'https://localhost:8090',
    clientId: '<your-client-id>',
    clientSecret: '<your-client-secret>',
  }),
);

app.get('/login', handleSignIn());
app.get('/logout', handleSignOut());
```

## Middleware Ordering

- Mount `cookie-parser` before routes that depend on `req.cookies`
- Mount `express.json()` before `handleFlow()` if you use embedded sign-in
- Mount `thunderID()` before `handleSignIn()`, `handleSignOut()`, `protect()`, or `handleFlow()`

## Runtime Behavior

- Creates a `ThunderIDExpressClient`
- Initializes the client with the provided configuration
- Attaches the initialized client to:
  - `req.thunderIDAuth`
  - `res.thunderIDAuth`

If `afterSignInUrl` or `afterSignOutUrl` is not provided, the middleware resolves defaults from the first incoming request origin:

- `afterSignInUrl`: `$/login`
- `afterSignOutUrl`: `$/logout`

## Notes

- `ThunderIDExpressConfig` is currently an alias of `ExpressClientConfig`
- The initialized client is available to later handlers such as `handleSignIn()` and to route handlers that call `req.thunderIDAuth.getUserFromRequest(req)`

## Related APIs

- [`handleSignIn()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-in.md)
- [`handleSignOut()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-out.md)
- [`protect()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/protect.md)
- [`handleFlow()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-flow.md)
- [`ExpressClientConfig`](https://thunderid.dev/docs/next/sdks/express/apis/configuration/express-client-config.md)
