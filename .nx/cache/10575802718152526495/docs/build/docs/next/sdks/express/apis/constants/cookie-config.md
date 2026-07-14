# CookieConfig

# `CookieConfig`

The Express SDK exports `CookieConfig` and `SESSION_COOKIE_NAME` for the session cookie behavior used by the SDK.

## Import

```js
const  = require('@thunderid/express');
```

## Session Cookie Name

| Export | Value | Description |
| :--- | :--- | :--- |
| `SESSION_COOKIE_NAME` | `'THUNDERID_SESSION_ID'` | Session cookie key used by the Express SDK |

## Default Cookie Values

| Property | Value |
| :--- | :--- |
| `defaultExpirySeconds` | `86400` |
| `defaultHttpOnly` | `true` |
| `defaultSameSite` | `'lax'` |
| `defaultSecure` | `false` |

## Usage

You do not need to set these values directly when `sessionCookie` options are omitted from `ExpressClientConfig`. The SDK uses these defaults automatically.

```js title="index.js" showLineNumbers
const  = require('@thunderid/express');

app.get('/session-id', (req, res) => {
  res.json();
});
```

## Related APIs

- [`ExpressClientConfig`](https://thunderid.dev/docs/next/sdks/express/apis/configuration/express-client-config.md)
- [`handleSignIn()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-in.md)
- [`handleSignOut()`](https://thunderid.dev/docs/next/sdks/express/apis/middleware/handle-sign-out.md)
