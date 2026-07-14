# TanStack Router

# TanStack Router

`@thunderid/tanstack-router` is a supplementary package that provides seamless integration between ThunderID authentication and TanStack Router. It offers components to easily protect routes and handle authentication flows in your React applications using TanStack Router.

## Installation


<CodeBlock icon="npm" label="npm">
```bash
npm install @thunderid/tanstack-router
```


```bash
yarn add @thunderid/tanstack-router
```


```bash
pnpm add @thunderid/tanstack-router
```

</CodeGroup>

## Basic Setup with ProtectedRoute

```tsx title="src/App.tsx" showLineNumbers


const rootRoute = createRootRoute({
  component: () => Root Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => Public Home Page,
})

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignIn,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (



  ),
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (



  ),
})

const routeTree = rootRoute.addChildren([indexRoute, signinRoute, dashboardRoute, profileRoute])

const router = createRouter()

function App() {
  return (



  )
}

export default App
```

## Custom Fallback and Loading States

```tsx title="src/routes.tsx" showLineNumbers

// Redirect to custom login page
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (



  ),
})

// Custom fallback component
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (

          <h2>Please sign in</h2>
          <p>You need to be signed in to access this page.</p>
        </div>
      }
    >


  ),
})

// Custom loading state
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    Loading...</div>}>


  ),
})
```

## Integration with Layouts

```tsx title="src/App.tsx" showLineNumbers


const rootRoute = createRootRoute({
  component: () => Root Layout,
})

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignIn,
})

// Protected routes with layout
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: AppLayout,
})

const appDashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/dashboard',
  component: () => (



  ),
})

const appProfileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/profile',
  component: () => (



  ),
})

const appSettingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/settings',
  component: () => (



  ),
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  signinRoute,
  appLayoutRoute.addChildren([appDashboardRoute, appProfileRoute, appSettingsRoute]),
])

const router = createRouter()

function App() {
  return (



  )
}

export default App
```
