# <ThunderIDOrganization />

# ``

The `ThunderIDOrganization` component provides access to the current organization object via a scoped slot. It is auto-registered by the Nuxt module.

## Usage

```vue title="pages/dashboard.vue" showLineNumbers
<template>

    <template #default="">

        <h1>}</h1>
        <p>ID: }</p>

    </template>
    <template #fallback>
      <p>No organization selected.</p>
    </template>

</template>
```

## Slots

| Slot | Slot Props | Description |
| :--- | :--- | :--- |
| `default` | `` | Receives the current organization object |
| `fallback` | — | Rendered when no organization is active |

### `Organization` Slot Prop

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | The organization's unique identifier |
| `name` | `string` | The organization's display name |
| `ref` | `string \| null` | An optional external reference identifier |
