# <SignedIn />

# ``

The `SignedIn` component conditionally renders its default slot only when the user is authenticated with ThunderID.
It checks the current authentication state and displays protected UI content for signed-in users. When the user is not authenticated, it renders an optional `#fallback` slot or nothing by default.
This makes it ideal for guarding routes or UI sections that require authentication.

## Usage

You can use the `SignedIn` component to wrap any content that should only be visible to authenticated users.

### Basic Usage

Use `SignedIn` to show content only when signed in.

```vue title="src/App.vue" showLineNumbers
<script setup>

</script>

<template>

    <p>Welcome! You are signed in.</p>

</template>
```

> **Note**
>
> If the user is not signed in, nothing will be rendered unless you provide a `#fallback` slot.


### Fallback Slot

Show alternative content when the user is not signed in using the `#fallback` slot:

```vue title="src/App.vue" showLineNumbers
<script setup>

</script>

<template>

    <p>Welcome! You are signed in.</p>
    <template #fallback>
      <p>Please sign in to continue</p>
    </template>

</template>
```

## Slots

| Slot | Description |
| :--- | :--- |
| `default` | Content to render when the user is signed in |
| `fallback` | Content to render when the user is not signed in |
