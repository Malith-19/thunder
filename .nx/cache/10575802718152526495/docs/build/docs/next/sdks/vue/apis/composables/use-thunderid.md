# useThunderID()

# `useThunderID()`

The `useThunderID` composable provides access to the ThunderID authentication context in Vue applications. It allows you to retrieve authentication state, user information, and other context values managed by the [``](https://thunderid.dev/docs/next/sdks/vue/apis/providers/thunderid-provider.md).

## Usage

Import and use the composable inside `<script setup>` (or `setup()`) to access authentication data:

```vue title="src/MyComponent.vue" showLineNumbers
<script setup>

const  = useThunderID()
</script>

<template>

    <template v-if="isSignedIn">
      <p>Welcome, }!</p>
      <button @click="signOut()">Sign Out</button>
    </template>
    <template v-else>
      <button @click="signIn()">Sign In</button>
    </template>

</template>
```

> **Note**
>
> This composable must be used inside a component rendered within `` (or after `ThunderIDPlugin` is installed). Otherwise, it will throw an error.


:::tip Reactive state
`isSignedIn`, `isLoading`, `isInitialized`, `user`, and `organization` are Vue `Ref`s. In templates Vue unwraps them automatically (`isSignedIn` instead of `isSignedIn.value`). In `<script>` code you must access `.value`.
:::

## Return Values

The composable returns the full ThunderID context:

| Property | Type | Description |
| :--- | :--- | :--- |
| `isSignedIn` | `boolean` | Whether the user is currently signed in |
| `isLoading` | `boolean` | Whether an authentication operation is in progress |
| `user` | `User \| null` | The authenticated user object, or `null` if not signed in |
| `organization` | `Organization \| null` | The current active organization |
| `signIn` | `(...args) => Promise<User \| EmbeddedSignInFlowResponse>` | Initiates the sign-in flow |
| `signOut` | `(...args) => Promise<any>` | Signs the current user out |
| `signUp` | `(...args) => Promise<any>` | Initiates the sign-up flow |
| `getAccessToken` | `() => Promise<string>` | Returns the current access token |
| `getDecodedIdToken` | `() => Promise<IdToken>` | Returns the decoded ID token payload |
| `http` | `` | Authenticated HTTP client (see [Accessing Protected APIs](https://thunderid.dev/docs/next/sdks/vue/guides/accessing-protected-apis.md)) |

## Error Handling

If `useThunderID` is called outside of a ``, it throws:

```text
[ThunderID] useThunderID() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.
```
