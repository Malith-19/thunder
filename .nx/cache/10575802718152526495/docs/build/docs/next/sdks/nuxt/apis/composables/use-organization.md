# useOrganization()

# `useOrganization()`

The `useOrganization` composable returns the currently active organization object as a reactive computed ref. It is auto-imported and available everywhere without an explicit import.

## Usage

```vue title="pages/dashboard.vue" showLineNumbers
<script setup lang="ts">
const organization = useOrganization()
</script>

<template>

    <h1>}</h1>
    <p>Organization ID: }</p>

  <p v-else>No organization selected.</p>
</template>
```

## Return Value

`useOrganization()` returns a `ComputedRef<Organization | null>`. The value is `null` when the user is not signed in or has no active organization.

### `Organization` Object

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | The organization's unique identifier |
| `name` | `string` | The organization's display name |
| `ref` | `string \| null` | An optional external reference identifier |

## Notes

- This composable is re-exported from `@thunderid/vue` and behaves identically in Nuxt.
- On SSR-rendered pages, the organization value is hydrated from the server session when `preferences.user.fetchOrganizations` is enabled.
- To switch organizations, use the [``](https://thunderid.dev/docs/next/sdks/nuxt/apis/components/organization-switcher.md) component or call the `/api/auth/organizations/switch` route directly.
