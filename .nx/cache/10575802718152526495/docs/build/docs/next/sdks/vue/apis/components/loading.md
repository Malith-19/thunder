# <Loading />

# ``

The `Loading` component renders its default slot while the authentication state is being determined.
It checks the current authentication state and displays a loading indicator or custom content during the initial authentication check. Once authentication is complete, it renders an optional `#fallback` slot or nothing by default.
This makes it ideal for providing user feedback during the initial app load or authentication verification.

## Usage

You can use the `Loading` component to wrap any content that should be visible during authentication state checks.

### Basic Usage

Use `Loading` to show content while authentication is being verified.

```vue title="src/App.vue" showLineNumbers
<script setup>

</script>

<template>

    Checking authentication...

</template>
```

> **Note**
>
> Once the authentication state is determined, nothing will be rendered unless you provide a `#fallback` slot.


### Fallback Slot

Show your main application content once loading is complete using the `#fallback` slot:

```vue title="src/App.vue" showLineNumbers
<script setup>


</script>

<template>

    Checking authentication...
    <template #fallback>
      <SignedIn>





    </template>
  </Loading>
</template>
```

## Slots

| Slot | Description |
| :--- | :--- |
| `default` | Content to render during authentication loading |
| `fallback` | Content to render once authentication is determined |
