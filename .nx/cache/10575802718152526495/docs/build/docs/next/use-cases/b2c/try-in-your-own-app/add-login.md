# Login

# Login

This walkthrough configures ThunderID for sign-in and walks you through integrating it into your application. By the end, a user who clicks your sign-in button is authenticated by ThunderID and lands back in your app with an access token.

:::info Background
[Add Login to Your Application](https://thunderid.dev/docs/next/use-cases/customer-identity.md#add-login-to-your-application) covers the requirements story behind this use case.
:::

## Pick Your Pattern

<details open>
  <summary>Redirect-based</summary>

In the redirect-based pattern, your app redirects the user to ThunderID for the sign-in experience, and ThunderID returns them to your app with tokens. Your app never handles credentials.

### Configure ThunderID

**1. Allow your app origin**

Add your app's origin to `cors.allowed_origins` in `deployment.yaml`. Leave any existing entries in place.

```yaml
cors:
  allowed_origins:
    # ...existing entries...
    - "http://localhost:5173"   # replace with your app's origin
```

Restart ThunderID after the change.

**2. Register your application**

Navigate to **Applications** → **Add Application** and choose **Browser App**. Configure:

| Setting            | Value                              |
| ------------------ | ---------------------------------- |
| Redirect URI       | Your app's callback URL (e.g., `http://localhost:5173`) |
| Allowed grants     | `authorization_code`               |
| PKCE               | Required                           |
| Allowed user types | Your consumer user type            |

Copy the **Client ID** — your SDK configuration needs it.

See [Register an Application](https://thunderid.dev/docs/next/guides/getting-started/register-an-application.md) and [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

**3. Build a sign-in flow and attach it**

Create a sign-in flow in the Flow Designer and assign it to your application.

See [Build a Sign-In Flow](https://thunderid.dev/docs/next/guides/getting-started/build-a-flow.md).

**4. Create a test user**

Navigate to **Users** → **Add User**. Select your consumer user type and fill in the attributes.

See [Manage Users](https://thunderid.dev/docs/next/guides/guides/users/manage-users.md).

### Integrate into Your App

Your app initiates the redirect and handles the callback. Use the SDK for your framework:

| Framework   | Where to integrate                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| React       | [React Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/react.md) — ``, ``, ``      |
| Next.js     | [Next.js Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/nextjs.md)                                                         |
| Vue         | [Vue Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/vue.md)                                                                |
| Browser SDK | [Browser SDK Overview](https://thunderid.dev/docs/next/sdks/browser/overview.md)                                                                                        |

:::tip Using a different SDK?
The redirect-based pattern is standard OAuth 2.0 authorization code flow with PKCE, so **any OIDC-compliant SDK works** — you are not limited to the ThunderID SDK. Point it at your ThunderID server's discovery endpoint (`http://localhost:8080/oauth2/token/.well-known/openid-configuration`) and use your **Client ID** from the registered application.
:::

### Try It Out

1. Start your app and open it in the browser.
2. Click your sign-in button. The browser navigates to ThunderID.
3. Sign in with your test user's credentials.
4. ThunderID runs the sign-in flow and redirects back to your app.
5. Verify that your app receives the tokens and the user is signed in.

</details>

<details>
  <summary>App-native step-by-step</summary>

Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/solution-patterns.md#app-native) for what to expect.

</details>

<details>
  <summary>App-native managed</summary>

Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/solution-patterns.md#app-native) for what to expect.

</details>

<details>
  <summary>Direct API</summary>

Coming soon. See the [Direct API pattern](https://thunderid.dev/docs/next/use-cases/solution-patterns.md#direct-api) for what to expect.

</details>

## Going Deeper

- Curious how access tokens get their permissions? See [Resources and Permissions](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#resources-and-permissions) and [Roles](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#roles) in Identity Concepts.
- Want to see this use case running against the Wayfinder sample? See [Login — Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out/add-login.md).
