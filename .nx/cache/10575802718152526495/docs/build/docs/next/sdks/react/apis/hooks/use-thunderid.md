# useThunderID()

# `useThunderID()`

The `useThunderID` hook provides access to the ThunderID authentication context in React applications. It allows you to retrieve authentication state, user information, and other context values managed by the `ThunderIDProvider`.

## Usage

Import and use the hook in any functional component to access authentication data:

```jsx title="src/MyComponent.jsx" showLineNumbers

function MyComponent() {
  const  = useThunderID()

  return (

      {isSignedIn ? (
        <>
          <p>Welcome, !</p>
          <button onClick=>Sign Out</button>
        </>
      ) : (
        <button onClick=>Sign In</button>
      )}

  )
}

export default MyComponent
```

> **Note**
>
> This hook must be used inside a component rendered within `ThunderIDProvider`. Otherwise, it will throw an error.


## Return Values

The hook returns all properties and methods provided by `ThunderIDContextProps`:

| Property | Type | Description |
| :--- | :--- | :--- |
| `isSignedIn` | `boolean` | Whether the user is currently signed in |
| `user` | `User \| null` | The authenticated user object, or `null` if not signed in |
| `signIn` | `() => Promise<void>` | Initiates the sign-in flow |
| `signOut` | `() => Promise<void>` | Initiates the sign-out flow |
| `loading` | `boolean` | Indicates if an authentication operation is in progress |
| `error` | `Error \| null` | The last error encountered during authentication, if any |

## Error Handling

If `useThunderID` is called outside of a `ThunderIDProvider`, it throws:

```text
Error: useThunderID must be used within a ThunderIDProvider
```
