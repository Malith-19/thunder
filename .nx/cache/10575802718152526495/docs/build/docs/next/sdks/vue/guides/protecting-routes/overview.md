# Protecting Routes

# Protecting Routes

In a Vue app, routes define the paths within the application that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application.

The ThunderID SDK provides multiple approaches to secure routes in your application. This guide demonstrates how to secure routes in a Vue 3 single-page app using the navigation guard helper shipped with `@thunderid/vue`.

## Choose Your Approach


  <Grid size=}>
    }
      title="Vue Router"
      packageName="vue-router"
      packageManager="npm"
      description="Protect routes in Vue Router applications using the `createThunderIDGuard` navigation guard."
      href="/docs/next/sdks/vue/guides/protecting-routes/vue-router"
    />

</Grid>


  Custom Implementation


  Prefer to build your own route protection? Learn how to create custom route guards using ThunderID primitives in our
  [custom implementation guide](https://thunderid.dev/docs/next/sdks/vue/guides/protecting-routes/custom.md).
