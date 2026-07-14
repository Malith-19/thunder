# <CreateOrganization />

# ``

The `CreateOrganization` component renders a form that allows users to create new sub-organizations in B2B applications.

## Usage

### Basic Usage

```vue title="src/CreateOrgPage.vue" showLineNumbers
<script setup>

</script>

<template>

    <h1>Create Organization</h1>


</template>
```

### Custom Title and Description

```vue title="src/CreateOrgPage.vue" showLineNumbers
<script setup>

</script>

<template>

</template>
```

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `title` | `string` | ❌ | Form title. Defaults to `'Create Organization'`. |
| `description` | `string` | ❌ | Form description text. Defaults to `'Create a new sub-organization.'`. |
| `className` | `string` | ❌ | Extra CSS class added to the root element |
