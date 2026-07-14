# <User />

# ``

The `User` component is a declarative way to access the authenticated user object from the ThunderID authentication context. It uses render props to expose the user data, making it easy to display user information or conditionally render UI based on authentication state.

## Usage

Use the `User` component to access and display user information in your React application.

### Basic Usage

Display the user's name and email:

```jsx title="src/App.jsx" showLineNumbers

function App() {
  return (
    Please sign in</p>}>
      {(user) => (

          <h1>Welcome, !</h1>
          <p>Email: </p>

      )}

  )
}

export default App
```

> **Note**
>
> The user object will be `null` if no user is signed in. Use the `fallback` prop to show alternative content.


## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `children` | `(user: User \| null) => ReactNode` | ✅ | Render prop function that receives the user object |
| `fallback` | `ReactNode` | ❌ | Content to render when no user is signed in |
