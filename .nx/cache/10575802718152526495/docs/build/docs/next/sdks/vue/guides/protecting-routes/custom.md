# Custom Implementation

# Custom Implementation

If you prefer full control over how app routes are secured, you can build a custom solution using the primitives provided by the ThunderID Vue SDK. This helps when you need to run custom application logic before enabling or disabling a route.

## Basic Custom Route Guard With ``

The simplest approach is to wrap the protected page content with the `` component and render a fallback for unauthenticated users:

```vue title="src/pages/Contact.vue" showLineNumbers
<script setup>


</script>

<template>




    <p>You must sign in to view this page.</p>

</template>
```

## Custom Composable Using `useThunderID`

For more advanced control — for example, role-based protection or a redirect — use `useThunderID()` together with Vue Router's `useRouter`:

```ts title="src/composables/useRequireAuth.ts" showLineNumbers


export interface RequireAuthOptions {
  redirectTo?: string
  requireRole?: string
}

export function useRequireAuth(options: RequireAuthOptions = ) {
  const  = options
  const  = useThunderID()
  const router = useRouter()

  watchEffect(() => {
    if (!isInitialized.value) return

    if (!isSignedIn.value) {
      router.replace(redirectTo)
      return
    }

    if (requireRole && !user.value?.roles?.includes(requireRole)) {
      router.replace('/forbidden')
    }
  })
}
```

Then use it inside any protected page:

```vue title="src/pages/AdminDashboard.vue" showLineNumbers
<script setup>

useRequireAuth()
</script>

<template>
  <h1>Admin Dashboard</h1>
  <!-- ... -->
</template>
```

## Custom Navigation Guard

You can also build a Vue Router navigation guard from scratch using the SDK's `inject` key directly. This is essentially what `createThunderIDGuard` does internally, and you can fork it to add custom logic.

```ts title="src/router/guards.ts" showLineNumbers


export const requireAuth: NavigationGuard = async (to, from, next) => {
  const ctx = inject<ThunderIDContext>(THUNDERID_KEY)

  if (!ctx) {
    return next()
  }

  // Wait for initialization
  while (!ctx.isInitialized.value) {
    await new Promise((resolve) => requestAnimationFrame(resolve))
  }

  if (!ctx.isSignedIn.value) {
    return next( })
  }

  // Add any custom role / permission checks here

  return next()
}
```
