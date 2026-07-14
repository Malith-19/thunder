# <UserProfile />

# ``

The `UserProfile` component renders a complete user profile management interface where users can view and edit their personal information, change passwords, manage sessions, and more.

## Usage

### Basic Usage

```jsx title="src/ProfilePage.jsx" showLineNumbers

function ProfilePage() {
  return (

      <h1>My Profile</h1>


  )
}

export default ProfilePage
```

### Custom Appearance

```jsx title="src/ProfilePage.jsx" showLineNumbers

function ProfilePage() {
  return (

  )
}

export default ProfilePage
```

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `appearance` | `Appearance` | ❌ | Customize component appearance |
| `sections` | `string[]` | ❌ | Which sections to show (defaults to all sections) |
