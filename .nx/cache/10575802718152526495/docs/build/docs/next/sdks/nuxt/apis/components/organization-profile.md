# <ThunderIDOrganizationProfile />

# ``

The `ThunderIDOrganizationProfile` component renders a management interface for the current organization. It allows administrators to view and update organization settings. It is auto-registered by the Nuxt module.

## Usage

```vue title="pages/org/settings.vue" showLineNumbers
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
| `preferences` | `Preferences` | ❌ | Customization options for i18n and theming |
