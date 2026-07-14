# <UserDropdown />

# ``

The `UserDropdown` component renders a dropdown menu with user information and common actions like viewing profile, settings, and signing out.

## Usage

### Basic Usage

```jsx title="src/Header.jsx" showLineNumbers

function Header() {
  return (
    <header>

    </header>
  )
}

export default Header
```

### Custom Menu Items

```jsx title="src/Header.jsx" showLineNumbers

function Header() {
  return (

      <UserDropdown.Item href="/profile">Profile</UserDropdown.Item>
      <UserDropdown.Item href="/settings">Settings</UserDropdown.Item>
      <UserDropdown.Item href="/billing">Billing</UserDropdown.Item>



  )
}

export default Header
```

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `children` | `ReactNode` | ❌ | Custom menu items (defaults to standard items) |
| `showAvatar` | `boolean` | ❌ | Show user avatar (defaults to `true`) |
| `showName` | `boolean` | ❌ | Show user name (defaults to `true`) |
| `showEmail` | `boolean` | ❌ | Show user email (defaults to `true`) |
