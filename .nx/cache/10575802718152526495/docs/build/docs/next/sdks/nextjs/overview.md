# Next.js SDK Overview

# Next.js SDK

The ThunderID Next.js SDK (`@thunderid/nextjs`) provides server-side authentication, middleware-based route protection, and pre-built UI components for Next.js applications using the App Router.

## Installation

Install the ThunderID Next.js SDK using your preferred package manager:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/nextjs



    yarn add @thunderid/nextjs



    pnpm add @thunderid/nextjs

</CodeGroup>

## Getting Started

To get started quickly, check out our [Next.js Quickstart Guide](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/nextjs.md) for step-by-step instructions.

## Architecture

The Next.js SDK uses a **server-first** approach:

- **Authentication tokens** are stored in HttpOnly cookies, preventing client-side access
- **Token refresh** happens automatically in middleware before requests reach your pages
- **Server Actions** handle sign-in, sign-out, and user operations without exposing tokens
- **Pre-built components** from `@thunderid/react` are available for client-side UI

## Features

### Server Exports

- **[``](https://thunderid.dev/docs/next/sdks/nextjs/apis/thunderid-provider.md)** — Server-side provider that wraps your app layout
- **[Server Actions](https://thunderid.dev/docs/next/sdks/nextjs/apis/server-actions.md)** — Authentication, session, and user management actions
- **[`thunderid()`](https://thunderid.dev/docs/next/sdks/nextjs/apis/server-actions.md#thunderid-client-access)** — Direct access to the server-side client for token and session operations

### Middleware (`@thunderid/nextjs/middleware`)

- **[`thunderIDMiddleware()`](https://thunderid.dev/docs/next/sdks/nextjs/apis/middleware.md)** — Automatic token refresh and route protection
- **[`createRouteMatcher()`](https://thunderid.dev/docs/next/sdks/nextjs/apis/middleware.md#createroutematcher)** — Define protected route patterns

### Client Components (`@thunderid/nextjs`)

#### Action Components
- `` — Trigger sign-in flow
- `` — Sign out the current user
- `` — Trigger sign-up flow

#### Control Components
- `` — Conditionally render content for authenticated users
- `` — Conditionally render content for unauthenticated users

#### User Self-Care Components
- `` — User menu with profile and settings
- `` — Complete user profile management interface
- `` — Display user information

#### Organization Components (B2B)
- `` — Create new organizations
- `` — Manage organization settings
- `` — Switch between organizations
- `` — List user's organizations

### Hooks

- **`useThunderID()`** — Access authentication state and methods from client components

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_THUNDERID_BASE_URL` | Yes | Your ThunderID instance URL |
| `NEXT_PUBLIC_THUNDERID_CLIENT_ID` | Yes | The Client ID from your application |
| `THUNDERID_CLIENT_SECRET` | Yes | The Client Secret (server-side only) |
| `THUNDERID_SECRET` | Production | Secret for signing session cookies (at least 32 characters) |
| `THUNDERID_SESSION_COOKIE_EXPIRY_TIME` | No | Cookie lifetime in seconds (default: 86400) |
