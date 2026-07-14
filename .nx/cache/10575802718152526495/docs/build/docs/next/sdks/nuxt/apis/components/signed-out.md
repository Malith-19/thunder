# <ThunderIDSignedOut />

# ``

The `ThunderIDSignedOut` component renders its default slot only when the user is **not** authenticated. It is auto-registered by the Nuxt module.

## Usage

### Basic Usage

```vue title="pages/index.vue" showLineNumbers
<template>



</template>
```

### Fallback Slot

Use the `fallback` slot to show content when the user is signed in:

```vue title="components/NavBar.vue" showLineNumbers
<template>


    <template #fallback>

    </template>

</template>
```

## Slots

| Slot | Description |
| :--- | :--- |
| `default` | Content rendered when the user is not authenticated |
| `fallback` | Content rendered when the user is authenticated |
