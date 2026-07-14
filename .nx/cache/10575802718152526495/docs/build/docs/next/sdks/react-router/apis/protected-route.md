# <ProtectedRoute />

# ``

The `ProtectedRoute` component wraps a route's element and enforces authentication. When the user is not signed in it either redirects to a specified URL or renders a fallback element. While authentication state is being resolved it shows a loading state.

> **Note**
>
> `ProtectedRoute` must be rendered inside a `ThunderIDProvider`. It also requires React Router's router context — place it within a `BrowserRouter`, `HashRouter`, or similar.


## Usage

### Basic Usage

```tsx title="src/App.tsx" showLineNumbers


function App() {
  return (
    " baseUrl="https://localhost:8090">
      <BrowserRouter>
        <Routes>
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

### Custom Fallback

Render a custom element instead of redirecting when the user is not authenticated:

```tsx title="src/App.tsx"

      <h2>Sign in required</h2>
      <p>You must be signed in to view this page.</p>
    </div>
  }
>


```

### Custom Loading State

Replace the default `null` loading state with a spinner or skeleton:

```tsx title="src/App.tsx"
Loading...</div>}
>


```

### Custom Sign-In Logic

Override the default sign-in behavior with `onSignIn`. Receives the `defaultSignIn` function so you can add pre/post logic or use your own flow:

```tsx title="src/App.tsx"
 {
    console.log('Redirecting to sign in')
    defaultSignIn(signInOptions)
  }}
  signInOptions=}
>


```

### Protecting Multiple Routes with a Shared Layout

```tsx title="src/App.tsx" showLineNumbers

function App() {
  return (

      <Routes>
        } />
        } />
        }>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute redirectTo="/signin">


            }
          />



            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `children` | `ReactElement` | ✅ | The element to render when the user is authenticated |
| `redirectTo` | `string` | ❌ | Path to redirect unauthenticated users to. Either `redirectTo` or `fallback` must be provided |
| `fallback` | `ReactElement` | ❌ | Element to render when the user is not authenticated. Either `redirectTo` or `fallback` must be provided |
| `loader` | `ReactNode` | ❌ | Element to render while authentication state is being resolved. Defaults to `null` |
| `onSignIn` | `(defaultSignIn: (options?: Record<string, any>) => void, signInOptions?: Record<string, any>) => void` | ❌ | Override the default sign-in trigger. Called with the built-in `defaultSignIn` function and the `signInOptions` value |
| `signInOptions` | `Record<string, any>` | ❌ | Additional parameters forwarded to the authorization request (e.g., `prompt`, `fidp`, `login_hint`, `max_age`, `ui_locales`) |

> **Note**
>
> You must provide either `redirectTo` or `fallback`. If neither is provided, a `ThunderIDRuntimeError` is thrown.


## Error Handling

`ProtectedRoute` throws a `ThunderIDRuntimeError` if neither `redirectTo` nor `fallback` is provided.

```tsx
// This will throw — one of redirectTo or fallback is required



```
