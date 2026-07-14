# <ThunderIDUser />

# ``

The `ThunderIDUser` component provides access to the authenticated user object via a scoped slot. It is auto-registered by the Nuxt module.

## Usage

### Basic Usage

```vue title="pages/profile.vue" showLineNumbers
<template>

    <template #default="">

        <h1>Welcome, }!</h1>
        <p>}</p>

    </template>

</template>
```

### Fallback Slot

Show alternative content when no user is signed in:

```vue title="pages/profile.vue" showLineNumbers
<template>

    <template #default="">
      <h1>}</h1>
    </template>
    <template #fallback>
      <p>Please sign in to view your profile.</p>
    </template>

</template>
```

## Slots

| Slot | Slot Props | Description |
| :--- | :--- | :--- |
| `default` | `` | Receives the authenticated user object |
| `fallback` | — | Rendered when no user is signed in |

### `User` Slot Prop

| Property | Type | Description |
| :--- | :--- | :--- |
| `sub` | `string` | The user's unique subject identifier |
| `displayName` | `string \| null` | The user's display name |
| `email` | `string \| null` | The user's email address |
| `firstName` | `string \| null` | The user's first name |
| `lastName` | `string \| null` | The user's last name |
| `profileUrl` | `string \| null` | URL to the user's profile picture |
