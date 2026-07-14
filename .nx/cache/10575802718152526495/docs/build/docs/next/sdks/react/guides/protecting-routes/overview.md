# Protecting Routes

# Protecting Routes

In a React app, routes define the paths within the application that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application.

The ThunderID SDK provides multiple approaches to secure routes in your application. This guide demonstrates how to secure routes in a single-page React app using official ThunderID router integrations for popular routing libraries.

## Choose Your Router


  <Grid size=}>
    }
      title="React Router"
      packageName="@thunderid/react-router"
      packageManager="npm"
      description="Protect routes in React Router v6 applications with the official integration package."
      href="/docs/next/sdks/react/guides/protecting-routes/react-router"
    />


    }
      title="TanStack Router"
      packageName="@thunderid/tanstack-router"
      packageManager="npm"
      description="Protect routes in TanStack Router applications with the official integration package."
      href="/docs/next/sdks/react/guides/protecting-routes/tanstack-router"
    />

</Grid>


  Custom Implementation


  Prefer to build your own route protection? Learn how to create custom route guards using ThunderID primitives in our
  [custom implementation guide](https://thunderid.dev/docs/next/sdks/react/guides/protecting-routes/custom.md).
