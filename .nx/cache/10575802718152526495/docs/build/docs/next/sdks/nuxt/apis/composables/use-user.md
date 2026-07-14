# useUser()

# `useUser()`

The `useUser` composable returns the currently authenticated user object as a reactive computed ref. It is auto-imported and available everywhere without an explicit import.

## Usage

```vue title="pages/profile.vue" showLineNumbers
<script setup lang="ts">
const user = useUser()
</script>

<template>

    <h1>}</h1>
    <p>}</p>

  <p v-else>Not signed in.</p>
</template>
```

## Return Value

`useUser()` returns a `ComputedRef<User | null>`. The value is `null` when no user is authenticated.

### `User` Object

| Property | Type | Description |
| :--- | :--- | :--- |
| `sub` | `string` | The user's unique subject identifier |
| `displayName` | `string \| null` | The user's display name |
| `email` | `string \| null` | The user's email address |
| `firstName` | `string \| null` | The user's first name |
| `lastName` | `string \| null` | The user's last name |
| `profileUrl` | `string \| null` | URL to the user's profile picture |

## Notes

- This composable is re-exported from `@thunderid/vue` and behaves identically in Nuxt.
- On an SSR-rendered page, the user value is hydrated from the server session and available on first render without a client-side fetch.
- Use [`useThunderID()`](https://thunderid.dev/docs/next/sdks/nuxt/apis/composables/use-thunderid.md) if you also need access to auth methods (`signIn`, `signOut`, etc.).
