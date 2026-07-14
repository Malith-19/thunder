# Node.js SDK Overview

# Node.js SDK

The ThunderID Node.js SDK (`@thunderid/node`) provides authentication and session management for server-side Node.js applications. The SDK implements the OAuth 2.0 Authorization Code flow with PKCE and supports multi-user session management.

## Installation

Install the ThunderID Node.js SDK using your preferred package manager:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/node



    yarn add @thunderid/node



    pnpm add @thunderid/node



    bun add @thunderid/node

</CodeGroup>

## Next Steps

To integrate the SDK into your application, start with the [Handling Authentication](https://thunderid.dev/docs/next/sdks/node/guides/handling-authentication.md) guide, which walks you through client setup, the sign-in flow, and sign-out. Then explore:

- [Protecting Routes](https://thunderid.dev/docs/next/sdks/node/guides/protecting-routes.md) — Restrict access based on session state
- [Accessing Protected APIs](https://thunderid.dev/docs/next/sdks/node/guides/accessing-protected-apis.md) — Call downstream APIs with the access token

## Features

### Clients

The SDK provides authentication clients designed for server-side Node.js applications.

- **[`ThunderIDNodeClient`](https://thunderid.dev/docs/next/sdks/node/apis/clients/thunderid-node-client.md)** — Abstract base class for building Node.js framework integrations

### Configuration

- **[`ThunderIDNodeConfig`](https://thunderid.dev/docs/next/sdks/node/apis/config/thunderid-node-config.md)** — Configuration type for the Node.js SDK

### Utilities

Helper functions and constants for session and cookie management.

- **[`CookieConfig`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/cookie-config.md)** — Default cookie configuration constants
- **[`CookieOptions`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/cookie-options.md)** — Cookie configuration interface
- **[`generateSessionId()`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/generate-session-id.md)** — Generate unique session identifiers
- **[`getSessionCookieOptions()`](https://thunderid.dev/docs/next/sdks/node/apis/utilities/get-session-cookie-options.md)** — Build cookie options with defaults applied
