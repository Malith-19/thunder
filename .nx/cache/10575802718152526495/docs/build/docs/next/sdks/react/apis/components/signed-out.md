# <SignedOut />

# ``

The `SignedOut` component conditionally renders its children only when the user is not authenticated with ThunderID.
It checks the current authentication state and displays content for unauthenticated users, while rendering optional `fallback` content (or nothing by default) when the user is authenticated.
This makes it ideal for showing sign-in prompts, public landing pages, or content that should only be visible to guests.

## Usage

You can use the `SignedOut` component to wrap any content that should only be visible to unauthenticated users.

### Basic Usage

Use `SignedOut` to show content only when not signed in.

```jsx title="src/App.jsx" showLineNumbers

function App() {
  return (


        <h1>Welcome!</h1>



  )
}

export default App
```

> **Note**
>
> If the user is signed in, nothing will be rendered unless you provide a `fallback` prop.


### Fallback Prop

Show alternative content when the user is signed in:

```jsx title="src/App.jsx" showLineNumbers

function App() {
  return (
    You are already signed in</p>}>

        <h1>Welcome!</h1>
        <p>Please sign in to continue</p>


  )
}

export default App
```

## Props

| Prop      | Type       | Required | Description                                     |
|-----------|------------|:--------:|-------------------------------------------------|
| `children`| ReactNode  |   ✅     | Content to render when the user is signed out   |
| `fallback`| ReactNode  |   ❌     | Content to render when signed in                |
