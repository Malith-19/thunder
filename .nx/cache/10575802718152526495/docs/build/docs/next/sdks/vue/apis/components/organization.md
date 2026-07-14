# <Organization />

# ``

The `Organization` component is a declarative way to access the current organization object from the ThunderID authentication context. It uses a scoped slot to expose the organization data, making it easy to display organization information or conditionally render UI based on the active organization.

## Usage

### Basic Usage

Display organization information using a scoped slot:

```vue title="src/OrgCard.vue" showLineNumbers
<script setup>

</script>

<template>

    <template #default="">

        <h3>}</h3>

    </template>
    <template #fallback>
      <p>No organization selected.</p>
    </template>

</template>
```

### Custom Fields

Use the scoped slot to render any field on the organization object:

```vue title="src/OrgCard.vue" showLineNumbers
<script setup>

</script>

<template>

    <template #default="">

        <h3>}</h3>
        <p>ID: }</p>

    </template>

</template>
```

## Slots

| Slot | Slot Props | Description |
| :--- | :--- | :--- |
| `default` | `` | Rendered when a current organization is available. Receives the organization object. |
| `fallback` | – | Rendered when no organization is selected. |
