# TanStack Router SDK Overview

# TanStack Router SDK

The ThunderID TanStack Router SDK (`@thunderid/tanstack-router`) provides drop-in components for protecting routes and handling OAuth 2.0 callbacks in TanStack Router applications. It works alongside `@thunderid/react` and requires no extra configuration beyond what `ThunderIDProvider` already provides.

## Installation


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/tanstack-router



    yarn add @thunderid/tanstack-router



    pnpm add @thunderid/tanstack-router



    bun add @thunderid/tanstack-router

</CodeGroup>

### Peer Dependencies

| Package | Version |
|---------|---------|
| `@thunderid/react` | `>=0.15.0` |
| `@tanstack/react-router` | `>=1.134.4` |
| `react` | `>=16.8.0` |

## Quick Example

```tsx title="src/main.tsx" showLineNumbers


const rootRoute = createRootRoute()

const callbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/callback',
  component: CallbackRoute,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (



  ),
})

const router = createRouter({
  routeTree: rootRoute.addChildren([callbackRoute, dashboardRoute]),
})

function App() {
  return (
    "
      baseUrl="https://localhost:8090"
      afterSignInUrl="http://localhost:5173/callback"
    >


  )
}
```

## Components

- **[``](https://thunderid.dev/docs/next/sdks/tanstack-router/apis/protected-route.md)** — Enforce authentication on a route. Redirects or shows a fallback when the user is not signed in.
- **[``](https://thunderid.dev/docs/next/sdks/tanstack-router/apis/callback-route.md)** — Handle the OAuth 2.0 authorization code callback, exchange it for tokens, and navigate to the original destination.
