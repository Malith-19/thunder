# Express SDK Overview

# Express SDK

The ThunderID Express SDK (`@thunderid/express`) provides Express middleware, route handlers, configuration types, and constants for integrating ThunderID authentication into Express applications.

## Installation

Install the ThunderID Express SDK using your preferred package manager:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/express



    yarn add @thunderid/express



    pnpm add @thunderid/express

</CodeGroup>

## Quick Start

For end-to-end setup instructions, see the [Express quickstart guide](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/express.md).

## Prerequisites

- `express`
- `cookie-parser` for flows that read `req.cookies`
- `express.json()` for embedded sign-in requests handled by `handleFlow()`

## What This Section Covers

This SDK section focuses on the Express-specific public surface exported by `@thunderid/express`:

- Middleware and handlers: [`thunderID()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/thunderid.md), [`handleSignIn()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-in.md), [`handleSignOut()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-out.md), [`protect()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/protect.md), and [`handleFlow()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-flow.md)
- Client additions: [`ThunderIDExpressClient`](https://thunderid.dev/docs/next/sdks/express/apis/client/thunderid-express-client.md)
- Configuration types: [`ExpressClientConfig`](https://thunderid.dev/docs/next/sdks/express/apis/configuration/express-client-config.md), `StrictExpressClientConfig`, and `ThunderIDExpressConfig`
- Constants: [`CookieConfig`](https://thunderid.dev/docs/next/sdks/express/apis/constants/cookie-config.md) and `SESSION_COOKIE_NAME`

> **Note**
>
> `@thunderid/express` also re-exports the `@thunderid/node` surface. This Express SDK section only documents the inherited Node and JavaScript SDK behavior that directly affects Express integration.


## Package Exports

| Export Group | Members |
| :--- | :--- |
| Middleware | `thunderID`, `handleSignIn`, `handleSignOut`, `protect`, `handleFlow` |
| Client | `ThunderIDExpressClient` |
| Types | `ExpressClientConfig`, `ThunderIDExpressConfig`, `StrictExpressClientConfig` |
| Constants | `CookieConfig`, `SESSION_COOKIE_NAME` |
| Re-exports | Public exports from `@thunderid/node` |

## Choose a Flow

### Redirect Flow

Use the redirect flow when you want standard OAuth 2.0 authorization-code redirects handled by the SDK.

Typical building blocks:

- `thunderID(config)` to initialize the SDK and attach the client to the request and response
- `handleSignIn()` for the sign-in route
- `handleSignOut()` for the sign-out route
- `protect()` for protected routes

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
app.get('/protected', protect(), (_req, res) => {
  res.send('Protected content');
});
```

See the [redirect flow guide](https://thunderid.dev/docs/next/sdks/express/guides/redirect-flow.md) for the full route wiring pattern.

### Embedded Sign-In

Use the embedded flow when your application drives the sign-in interaction step by step and posts flow state to the SDK.

Typical building blocks:

- `thunderID()`
- `handleFlow()` for the embedded sign-in endpoint
- `handleSignIn()` to complete the OAuth callback after the flow returns a redirect URL
- `handleSignOut()` for sign-out

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
    mode: 'embedded',
  }),
);

app.post('/flow/sign-in', handleFlow());
app.get('/login', handleSignIn());
app.get('/logout', handleSignOut());
```

See the [embedded sign-in guide](https://thunderid.dev/docs/next/sdks/express/guides/embedded-sign-in.md) for the request and response lifecycle.

## Default Behavior

- `mode` defaults to `'redirect'`
- If `afterSignInUrl` is not set, the SDK uses the first incoming request origin with `/login`
- If `afterSignOutUrl` is not set, the SDK uses the first incoming request origin with `/logout`
- Session cookie defaults come from `CookieConfig`:
  - `defaultExpirySeconds = 86400`
  - `defaultHttpOnly = true`
  - `defaultSameSite = 'lax'`
  - `defaultSecure = false`
