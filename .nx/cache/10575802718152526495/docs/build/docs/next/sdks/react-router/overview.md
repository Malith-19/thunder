# React Router SDK Overview

# React Router SDK

The ThunderID React Router SDK (`@thunderid/react-router`) provides drop-in components for protecting routes and handling OAuth 2.0 callbacks in React Router v6 applications. It works alongside `@thunderid/react` and requires no extra configuration beyond what `ThunderIDProvider` already provides.

## Installation


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/react-router



    yarn add @thunderid/react-router



    pnpm add @thunderid/react-router



    bun add @thunderid/react-router

</CodeGroup>

### Peer Dependencies

| Package | Version |
|---------|---------|
| `@thunderid/react` | `>=0.15.0` |
| `react` | `>=16.8.0` |
| `react-router` | `>=6.30.1` |

## Quick Example

```tsx title="src/App.tsx" showLineNumbers


function App() {
  return (
    "
      baseUrl="https://localhost:8090"
      afterSignInUrl="http://localhost:5173/callback"
    >
      <BrowserRouter>
        <Routes>
          } />
          } />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute redirectTo="/signin">


            }
          />
        </Routes>
      </BrowserRouter>
    </ThunderIDProvider>
  )
}
```

## Components

- **[``](https://thunderid.dev/docs/next/sdks/react-router/apis/protected-route.md)** — Enforce authentication on a route. Redirects or shows a fallback when the user is not signed in.
- **[``](https://thunderid.dev/docs/next/sdks/react-router/apis/callback-route.md)** — Handle the OAuth 2.0 authorization code callback, exchange it for tokens, and navigate to the original destination.
