# <ThunderIDUserProfile />

# ``

The `ThunderIDUserProfile` component renders a full profile management interface. Users can view and edit their personal information, change their password, and manage linked accounts. It is auto-registered by the Nuxt module.

## Usage

### Basic Usage

```vue title="pages/profile.vue" showLineNumbers
<template>

</template>
```

### Dedicated Profile Page

```vue title="pages/profile.vue" showLineNumbers
<script setup lang="ts">
definePageMeta()
</script>

<template>



</template>
```

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `appearance` | `Appearance` | ❌ | Customize the component's visual appearance |
| `sections` | `string[]` | ❌ | Restrict which profile sections are shown. Defaults to all sections |
| `preferences` | `Preferences` | ❌ | Customization options for i18n and theming |
