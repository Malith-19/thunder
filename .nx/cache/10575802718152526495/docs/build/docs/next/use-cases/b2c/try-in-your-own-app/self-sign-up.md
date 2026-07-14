# Self Sign-Up

# Self Sign-Up

This walkthrough configures ThunderID so that new consumers can register themselves with an email and password. ThunderID creates a user record and returns the new user to your app signed in.

:::info Background
[Enable Self Sign-Up](https://thunderid.dev/docs/next/use-cases/customer-identity.md#enable-self-sign-up) covers the requirements story behind this use case.
:::

:::note Prerequisites
Complete the [Login](https://thunderid.dev/docs/next/use-cases/b2c/add-login.md) walkthrough first. The user type, application, and sign-in flow set up there are required here.
:::

## Pick Your Pattern

<details open>
  <summary>Redirect-based</summary>

In the redirect-based pattern, your app redirects the user to ThunderID for the entire registration experience. After the user fills in the sign-up form, ThunderID creates the account and returns them to your app signed in.

### Configure ThunderID

**1. Build a registration flow**

Build a `REGISTRATION` flow using the Flow Designer or the flows API. See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

Your registration flow should collect the user's credentials, provision the account, and return an auth assertion so the user lands signed in.

To automatically assign a default role to every self-registered user, create the role under **Roles** → **Add Role**. Then set `properties.assignRole` to that role's ID on the `ProvisioningExecutor` node in your flow. See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

<details>
  <summary>Sample registration flow</summary>

```json
{
  "handle": "consumer-registration-flow",
  "name": "Consumer Registration Flow",
  "flowType": "REGISTRATION",
  "nodes": [
    ,
    {
      "id": "user_type_resolver",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "prompt_credentials",
      "onIncomplete": "prompt_usertype"
    },
    {
      "id": "prompt_usertype",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          {
            "type": "BLOCK",
            "id": "block_usertype",
            "components": [
              ,

            ]
          }
        ]
      },
      "prompts": [
        {
          "inputs": [  ],
          "action":
        }
      ]
    },
    {
      "id": "prompt_credentials",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          {
            "type": "BLOCK",
            "id": "block_credentials",
            "components": [
              ,
              ,

            ]
          }
        ]
      },
      "prompts": [
        {
          "inputs": [
            ,

          ],
          "action":
        }
      ]
    },
    {
      "id": "credentials_auth",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "provisioning"
    },
    {
      "id": "provisioning",
      "type": "TASK_EXECUTION",
      "executor": {
        "name": "ProvisioningExecutor",
        "inputs": [
          ,

        ]
      },
      "onSuccess": "auth_assert",
      "onIncomplete": "prompt_schema_attrs"
    },
    {
      "id": "prompt_schema_attrs",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          {
            "type": "BLOCK",
            "id": "block_dynamic_user_inputs",
            "components": [
              ,

            ]
          }
        ]
      },
      "prompts": [
         }
      ]
    },
    {
      "id": "auth_assert",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "end"
    },

  ]
}
```

</details>

**2. Attach the registration flow to your application**

Go to **Applications** → your app → **Flows** tab. Under **Registration Flow**, select the flow you created. Save the application.

See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

### Integrate into Your App

Trigger sign-up from your app using the SDK. The registration experience is hosted by ThunderID, so your app only needs a sign-up entry point:

| Framework   | Where to integrate                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| React       | [React Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/react.md) — `` component                       |
| Next.js     | [Next.js Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/nextjs.md)                                                    |
| Vue         | [Vue Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/vue.md)                                                           |
| Browser SDK | [Browser SDK Overview](https://thunderid.dev/docs/next/sdks/browser/overview.md)                                                                                   |

:::tip Using a different SDK?
The redirect-based pattern is standard OAuth 2.0 authorization code flow with PKCE, so **any OIDC-compliant SDK works** — you are not limited to the ThunderID SDK. Point it at your ThunderID server's discovery endpoint (`http://localhost:8080/oauth2/token/.well-known/openid-configuration`) and use your **Client ID** from the registered application.
:::

### Try It Out

1. Start your app and open it in the browser.
2. Click your sign-up button. The browser navigates to ThunderID.
3. Fill in a username, email, and password for a new user.
4. Submit. ThunderID runs the registration flow, creates the user, and redirects back to your app.
5. Verify that the new user lands in your app signed in.

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

- Want to understand how user types and schemas work? See [User Types](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#user-types) in Identity Concepts.
- Want to automatically assign a role to self-registered users? See [Roles](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#roles) in Identity Concepts.
- Want to see this use case running against the Wayfinder sample? See [Self Sign-Up — Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out/self-sign-up.md).
