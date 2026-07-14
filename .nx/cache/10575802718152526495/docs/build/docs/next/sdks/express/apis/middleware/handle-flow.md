# handleFlow()

# `handleFlow()`

The `handleFlow()` function returns an Express route handler that advances the embedded sign-in flow and responds with JSON.

## Signature

```ts
handleFlow(): express.RequestHandler
```

## Import

```js
const  = require('@thunderid/express');
```

## Prerequisites

- Mount [`thunderID()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/thunderid.md) with `mode: 'embedded'`
- Mount `express.json()` before this handler so the SDK can read `req.body`
- Keep `handleSignIn()` mounted on your callback route so the returned redirect URL can complete sign-in

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
    mode: 'embedded',
  }),
);

app.post('/flow/sign-in', handleFlow());
app.get('/login', handleSignIn());
app.get('/logout', handleSignOut());
```

## Request Shapes

### First Request

When no `executionId` is present, send:

```json
{
  "applicationId": "app-id",
  "flowType": "SIGN_IN"
}
```

If `flowType` is omitted, the SDK uses `'SIGN_IN'`.

### Continuation Request

When continuing an existing flow, send:

```json
{
  "executionId": "...",
  "challengeToken": "...",
  "authId": "...",
  "inputs": {
    "...": "..."
  }
}
```

## Response Shapes

### Flow Continues

If the flow needs another step, the handler returns:

```json
{
  "authId": "...",
  "challengeToken": "...",
  "components": [],
  "executionId": "...",
  "flowStatus": "..."
}
```

### Flow Completes

If the flow finishes and the next step is the OAuth callback, the handler returns:

```json
{
  "done": true,
  "redirectUrl": "/login?code=..."
}
```

The client must navigate to `redirectUrl`, which is then handled by `handleSignIn()` to exchange the code and set the session cookie.

## Runtime Behavior

- Requires `req.thunderIDAuth` from `thunderID()`
- Requires `baseUrl` in the initialized config
- On the first request, if `authId` is not provided, the handler derives it from `client.getSignInUrl()`
- Delegates flow execution to the embedded sign-in flow executor and normalizes the response into JSON

## Failure Behavior

The handler returns `500` JSON responses for these cases:

| Condition | Response |
| :--- | :--- |
| `thunderID()` not mounted first | `` |
| `baseUrl` missing from config | `` |
| Flow execution failure | `` |

## Related APIs

- [`thunderID()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/thunderid.md)
- [`handleSignIn()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-in.md)
- [`Embedded Sign-In`](https://thunderid.dev/docs/next/sdks/express/guides/embedded-sign-in.md)
