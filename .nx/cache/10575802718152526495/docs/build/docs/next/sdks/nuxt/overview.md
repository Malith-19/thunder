# Nuxt SDK Overview

# Nuxt SDK

The ThunderID Nuxt SDK (`@thunderid/nuxt`) is a Nuxt module that integrates ThunderID authentication into Nuxt 3 applications. It provides composables, auto-registered components, route middleware, server utilities, and a set of built-in API routes — all with full SSR hydration support.

## Installation

Install the ThunderID Nuxt SDK using your preferred package manager:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/nuxt



    yarn add @thunderid/nuxt



    pnpm add @thunderid/nuxt



    bun add @thunderid/nuxt

</CodeGroup>

## Getting Started

Register the module and provide your application credentials in `nuxt.config.ts`:

```ts title="nuxt.config.ts" showLineNumbers
export default defineNuxtConfig({
  modules: ['@thunderid/nuxt'],
  thunderid: {
    clientId: '<your-client-id>',
    clientSecret: '<your-client-secret>',
    baseUrl: 'https://localhost:8090',
  },
})
```

Then wrap your root layout with ``:

```vue title="app.vue" showLineNumbers
<template>



</template>
```

For full setup instructions, see the [Nuxt quickstart guide](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/nuxt.md).

## Features

### Configuration

The SDK is configured via the `thunderid` key in `nuxt.config.ts`.

- **[`Module Configuration`](https://thunderid.dev/docs/next/sdks/nuxt/apis/configuration/module-configuration.md)** — Full reference for all configuration options

### Composables

Auto-imported composables available in every component and page without explicit imports.

- **[`useThunderID()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/composables/use-thunderid.md)** — Access auth state and trigger sign-in, sign-out, and sign-up flows
- **[`useUser()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/composables/use-user.md)** — Access the authenticated user object

### Components

All components are auto-registered with the `ThunderID` prefix and do not require explicit imports.

#### Provider
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/thunderid-root.md)** — Root provider that mounts all authentication context providers

#### Control Components
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/signed-in.md)** — Render content only when the user is authenticated
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/signed-out.md)** — Render content only when the user is not authenticated
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/loading.md)** — Render content during authentication loading state

#### Action Components
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/sign-in-button.md)** — Trigger the sign-in flow
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/sign-out-button.md)** — Sign out the current user
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/sign-up-button.md)** — Trigger the sign-up flow

#### User Self-care Components
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/user.md)** — Access authenticated user data via slot props
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/user-profile.md)** — Full profile management interface
- **[``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/user-dropdown.md)** — User menu with profile and sign-out options

### Middleware

- **[`defineThunderIDMiddleware()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/middleware/define-thunderid-middleware.md)** — Factory for creating route middleware that gates pages by auth state, organization, or required scopes
- Named **`'auth'`** middleware — pre-built middleware that redirects unauthenticated users to sign-in

### Server Utilities

Server-only utilities imported from `@thunderid/nuxt/server` for use in API routes, server routes, and server middleware.

- **[`useServerSession()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/use-server-session.md)** — Read the session payload from the current request, or `null`
- **[`requireServerSession()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/require-server-session.md)** — Read the session or throw a `401` error
- **[`getValidAccessToken()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/get-valid-access-token.md)** — Get a valid access token, refreshing it automatically if expired
- **[`getThunderIDContext()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/server/get-thunderid-context.md)** — Read the typed ThunderID context attached to an H3 event

### Utilities

- **[`createRouteMatcher()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/utils/create-route-matcher.md)** — Build a route-matching function from glob patterns for use in middleware

### Error Handling

- **[`ThunderIDError`](https://thunderid.dev/docs/next/sdks/nuxt/apis/errors/thunderid-error.md)** — Structured error class thrown by the SDK with typed `ErrorCode` values

## Built-in API Routes

The module automatically registers the following server routes under `/api/auth`:

| Route | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/signin` | `GET` | Start redirect-based sign-in |
| `/api/auth/signin` | `POST` | Handle embedded sign-in step |
| `/api/auth/signup` | `POST` | Handle embedded sign-up step |
| `/api/auth/callback` | `GET / POST` | OAuth callback handler |
| `/api/auth/signout` | `POST` | Sign out and return redirect URL |
| `/api/auth/session` | `GET` | Get current auth state |
| `/api/auth/token` | `GET` | Get client-safe access token |
| `/api/auth/user` | `GET` | Get user object |
| `/api/auth/user/profile` | `GET / PATCH` | Get or update user profile |
| `/api/auth/branding` | `GET` | Get tenant branding preference |

## Package Exports

| Export Path | Contents |
| :--- | :--- |
| `@thunderid/nuxt` | Module, composables, components, middleware, types |
| `@thunderid/nuxt/server` | `useServerSession`, `requireServerSession`, `getValidAccessToken`, `getThunderIDContext` |
| `@thunderid/nuxt/utils` | `createRouteMatcher` |
| `@thunderid/nuxt/errors` | `ThunderIDError`, `ErrorCode` |
