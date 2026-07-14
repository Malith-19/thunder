# View Profile

# View Profile

This walkthrough configures ThunderID for self-service profile management. Users can view the attributes stored about them, update those attributes, and change their password — all without leaving your application.

:::info Background
[Add Self-Service Profile Management](https://thunderid.dev/docs/next/use-cases/customer-identity.md#add-self-service-profile-management) covers the requirements story behind this use case.
:::

:::note Prerequisites
Complete the [Login](https://thunderid.dev/docs/next/use-cases/b2c/add-login.md) walkthrough first. The user type and application set up there are required here.
:::

## Pick Your Pattern

<details open>
  <summary>Redirect-based</summary>

In the redirect-based pattern, your application renders the profile UI itself. Profile attributes are read from the ID token on sign-in. Attribute updates and credential changes go to ThunderID's self-service endpoints, which act on the signed-in user's own record — no additional permissions are needed beyond the access token.

### Configure ThunderID

**1. Ensure your user type has the attributes you want to expose**

Navigate to **User Types** and open your consumer user type. Add any attributes you want users to view or update (for example, `given_name`, `family_name`). Mark attributes you want users to be able to update as non-credential, non-unique fields.

See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

**2. Ensure your application allows the required scopes**

Navigate to **Applications** → your app. Under **Allowed Scopes**, confirm that `openid`, `profile`, and `email` are listed. These scopes allow the ID token to include the user's name and email attributes.

See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

### Integrate into Your App

Your app reads profile attributes from the ID token and calls the self-service endpoints for updates. Use the SDK for your framework:

| Framework   | Where to integrate                                                                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React       | [React SDK Overview](https://thunderid.dev/docs/next/sdks/react/overview.md) — [``](https://thunderid.dev/docs/next/sdks/react/apis/components/user-profile.md) for the full profile UI, [``](https://thunderid.dev/docs/next/sdks/react/apis/components/user.md) to read user attributes                               |
| Next.js     | [Next.js Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/nextjs.md)                                                                     |
| Vue         | [Vue Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/vue.md)                                                                            |
| Browser SDK | [Browser SDK Overview](https://thunderid.dev/docs/next/sdks/browser/overview.md)                                                                                                    |

For direct API access, profile attributes are read and updated through the self-service endpoints:

| Operation         | Endpoint                             | Method |
| ----------------- | ------------------------------------ | ------ |
| Read profile      | `/users/me`                          | GET    |
| Update attributes | `/users/me`                          | PATCH  |
| Change password   | `/users/me/update-credentials`       | POST   |

See the [APIs reference](https://thunderid.dev/docs/next/apis.md).

### Try It Out

1. Start your app and sign in as your test user.
2. Navigate to the profile section. Verify that the user's attributes render from the ID token.
3. Edit an attribute (for example, the user's last name) and save. Confirm the update is reflected.
4. Change the password. Sign out, sign back in with the new password, and verify it works.

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

- Want to understand which attributes are stored on a user record? See [User Types](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#user-types) in Identity Concepts.
- Want to see this use case running against the Wayfinder sample? See [View Profile — Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out/profile-section.md).
