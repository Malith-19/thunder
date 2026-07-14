# <ThunderIDSignUpButton />

# ``

The `ThunderIDSignUpButton` component initiates the sign-up flow when clicked. It is auto-registered by the Nuxt module and requires no imports.

## Usage

### Basic Usage

```vue title="pages/index.vue" showLineNumbers
<template>

</template>
```

### Custom Label

```vue title="pages/index.vue" showLineNumbers
<template>
  Create an account
</template>
```

### Using the Default Slot for Full Control

```vue title="pages/index.vue" showLineNumbers
<template>

    <template #default="">
      <button :disabled="isLoading" @click="signUp">
        }
      </button>
    </template>

</template>
```

## Slots

| Slot | Slot Props | Description |
| :--- | :--- | :--- |
| `default` | `` | Custom content rendered inside the button. If omitted, renders a default "Sign Up" button |

## Props

| Prop | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `preferences` | `Preferences` | ❌ | Customization options for i18n and theming |
