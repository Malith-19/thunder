# Custom Implementation

# Custom Implementation

If you prefer full control over how app routes are secured, you can build a custom solution using the primitives provided by the ThunderID React SDK. This helps when you need to run custom application logic before enabling or disabling a route.

## Basic Custom Route Guard

```tsx title="src/App.tsx" showLineNumbers


const ProtectedRoute = (: ) => {
  const  = useThunderID()

  if (!isSignedIn) {
    return
  }

  return children
}

const App = () => {
  return (

      <Route
        path="/contact"
        element={
          <ProtectedRoute>


        }
      />
      } />
      } />
    </Routes>
  )
}

export default App
```

## Advanced Custom Implementation

You can extend the basic pattern to include loading states, redirects, and custom logic:

```tsx title="src/components/ProtectedRoute.tsx" showLineNumbers


interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
  fallback?: ReactNode
  requireRole?: string
}

export const ProtectedRoute = ({
  children,
  redirectTo = '/signin',
  fallback,
  requireRole,
}: ProtectedRouteProps) => {
  const  = useThunderID()

  // Show loading state while authentication is being checked
  if (loading) {
    return Loading...
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    if (fallback) {
      return <></>
    }
    return
  }

  // Check for required role if specified
  if (requireRole && user?.roles && !user.roles.includes(requireRole)) {
    return You don't have permission to access this page
  }

  return <></>
}
```
