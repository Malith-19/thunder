# <SignOutButton />

# ``

The `SignOutButton` component signs out the current user, clears their session, and revokes authentication tokens when clicked. It automatically handles loading state, error handling, and supports custom UI via render props or direct children. You can customize its behavior and appearance using the `preferences` prop, including i18n overrides.

## Usage

You can use the `SignOutButton` in two main ways: as a simple button or with render props for more control over the UI and behavior.

### Basic Usage

Use `SignOutButton` as a simple button to trigger sign-out.

```jsx title="src/App.jsx" showLineNumbers

function App() {
  return
}

export default App
```

> **Note**
>
> You can simply use the `SignOutButton` component without any children `` to render a default button with the text "Sign Out".


## Props

The `SignOutButton` component accepts all props from `BaseSignOutButton`, plus:

| Prop | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` or `function` | ❌ | Render prop function or ReactNode for button content |
| `preferences` | `Preferences` | ❌ | Customization options for i18n, theming, etc. |
| `onClick` | `function` | ❌ | Callback after sign-out is triggered |
| `redirectUrl` | `string` | ❌ | URL to redirect to after sign-out |

## Customization

The `SignOutButton` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom `CSS` classes to the button.

```jsx title="src/App.jsx"  showLineNumbers

function App() {
  return (

      Sign Out

  )
}

export default App
```

#### Default CSS Classes

The button includes a default vendor-prefixed class for targeting:
- `.thunderid-sign-out-button` – Main sign-out button element

### CSS Custom Properties (CSS Variables)

You can theme the button and other SDK components using CSS variables:

```css title="index.css" showLineNumbers
:root {
  --thunderid-primary-color: #007bff;
  --thunderid-primary-hover: #0056b3;
  --thunderid-border-radius: 8px;
  --thunderid-font-family: 'Inter', sans-serif;
  --thunderid-button-padding: 12px 24px;
}
```

### Internationalization (i18n)

Override button text and translations using the `preferences` prop:

```jsx title="src/App.jsx"  showLineNumbers

function App() {
  return (

      Sign Out

  )
}

export default App
```

### Render Props for Custom UI

You can customize the button UI and behavior using render props. This allows you to access the `signOut` function and `isLoading` state directly, giving you the flexibility to use any library like Tailwind CSS, Shadcn UI, Material-UI, etc.

```jsx title="src/App.jsx"  showLineNumbers

function App() {
  return (

      ) => (
        <button
          onClick=
          disabled=
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth=
            viewBox="0 0 24 24"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>

        </button>
      )}

  )
}

export default App
```

## Error Handling
If sign-out fails, a `ThunderIDRuntimeError` is thrown with a descriptive message.
