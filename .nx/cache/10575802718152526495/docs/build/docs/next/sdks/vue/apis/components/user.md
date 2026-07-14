# <User />

# ``

The `User` component is a declarative way to access the authenticated user object from the ThunderID authentication context. It uses a scoped slot to expose the user data, making it easy to display user information or conditionally render UI based on authentication state.

## Usage

Use the `User` component to access and display user information in your Vue application.

### Basic Usage

Display the user's name and email using a scoped slot:

```vue title="src/App.vue" showLineNumbers
<script setup>

</script>

<template>

    <template #default="">

        <h1>Welcome, }!</h1>
        <p>Email: }</p>

    </template>
    <template #fallback>
      <p>Please sign in</p>
    </template>

</template>
```

> **Note**
>
> The `#fallback` slot is rendered when no user is signed in. If no `#fallback` slot is provided, nothing is rendered.


## Slots

| Slot | Slot Props | Description |
| :--- | :--- | :--- |
| `default` | `` | Rendered when a user is signed in. Receives the user object as a scoped slot prop. |
| `fallback` | – | Rendered when no user is signed in. |

## Slot Props

The default slot receives the following scoped slot props:

| Prop | Type | Description |
| :--- | :--- | :--- |
| `user` | `User` | The authenticated user object |
