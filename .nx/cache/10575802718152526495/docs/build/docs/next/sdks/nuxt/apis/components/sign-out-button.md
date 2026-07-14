# <ThunderIDSignOutButton />

# ``

The `ThunderIDSignOutButton` component signs out the current user when clicked. It is auto-registered by the Nuxt module and requires no imports.

## Usage

### Basic Usage

```vue title="components/NavBar.vue" showLineNumbers
<template>

</template>
```

### Custom Label

```vue title="components/NavBar.vue" showLineNumbers
<template>
  Log out
</template>
```

### Using the Default Slot for Full Control

```vue title="components/NavBar.vue" showLineNumbers
<template>

    <template #default="">
      <button :disabled="isLoading" @click="signOut">
        }
      </button>
    </template>

</template>
```

## Slots

| Slot | Slot Props | Description |
| :--- | :--- | :--- |
| `default` | `` | Custom content rendered inside the button. If omitted, renders a default "Sign Out" button |

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `preferences` | `Preferences` | ❌ | Customization options for i18n and theming |
