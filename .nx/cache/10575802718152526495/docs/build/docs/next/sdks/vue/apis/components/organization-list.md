# <OrganizationList />

# ``

The `OrganizationList` component renders a list of organizations that the current user belongs to. Clicking an organization in the list switches the active organization automatically.

## Usage

### Basic Usage

```vue title="src/OrganizationsPage.vue" showLineNumbers
<script setup>

</script>

<template>

    <h1>My Organizations</h1>


</template>
```

### Listening for Selection

The component emits a `select` event before switching, which is useful for analytics, custom navigation, or showing a confirmation dialog:

```vue title="src/OrganizationsPage.vue" showLineNumbers
<script setup>

function handleSelect(org) {
  console.log('Switching to organization:', org.name)
}
</script>

<template>

</template>
```

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `className` | `string` | ❌ | Extra CSS class added to the root element |

## Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `select` | `Organization` | Emitted when the user selects an organization, before switching takes effect |
