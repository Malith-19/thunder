# Login

# Login

In this walkthrough, John Doe signs in to Wayfinder from his laptop and arrives at the dashboard with his upcoming trips visible. The app receives an access token bound to the `booking-api` resource server, carrying the three booking permissions attached to his `Traveler` role.

:::note Prerequisites
Complete [Set Up Your Environment](https://thunderid.dev/docs/next/use-cases/b2c/setup.md#set-up-your-environment) before starting this walkthrough.
:::

:::info Background
[B2C overview](https://thunderid.dev/docs/next/use-cases/b2c/...md#building-blocks-of-the-b2c-identity-journey) covers the requirements story behind this use case.
:::

## Pick Your Pattern

[Integration Patterns](https://thunderid.dev/docs/next/use-cases/integration-patterns.md) describes three ways to add identity to a consumer app. Select your pattern to see the walkthrough.



**Redirect-based**


In the redirect-based pattern, the consumer app sends the user to ThunderID for the entire sign-in experience and returns them as a signed-in user with tokens attached. The Wayfinder web frontend is configured exactly this way. Selecting **Sign in** triggers an OIDC redirect, and ThunderID shows the sign-in page. The browser then returns to the app with an authorization code that the app exchanges for tokens.

**Try the Use Case**

1. Open http://localhost:5173. Wayfinder's home page loads.
2. Select **Sign in**. The browser navigates to ThunderID.
3. Sign in as John (`john.doe` / `john.doe`). ThunderID runs the authentication flow and grants John's `booking:*` permissions into the access token.
4. The browser returns to Wayfinder, the dashboard loads, and John's bookings render because the Wayfinder API accepted the token's `booking:read` permission.

**Try a Variant**

- Add Google as a sign-in option on the flow and verify that a **Sign in with Google** button appears on the ThunderID page.
- Restrict the application's allowed scopes so the token only carries `booking:read`. Attempt a booking and confirm the API rejects it.


**App-native step-by-step**


Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/integration-patterns.md#app-native) for what to expect.


**App-native managed**


Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/integration-patterns.md#app-native) for what to expect.


**Direct API**


Coming soon. See the [Direct API pattern](https://thunderid.dev/docs/next/use-cases/integration-patterns.md#direct-api) for what to expect.


## Going Deeper

- Want to understand how the access token gets its booking permissions? See [Resources and Permissions](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#resources-and-permissions) and [Roles](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#roles) in the Identity Concepts.
- Prefer to set up the application and `Traveler` role manually? See [Set Up the Foundation](https://thunderid.dev/docs/next/use-cases/b2c/configure-it-yourself.md#set-up-the-foundation) in Configure It Yourself.
