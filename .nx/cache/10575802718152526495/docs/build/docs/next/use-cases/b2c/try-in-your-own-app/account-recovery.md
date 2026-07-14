# Account Recovery

# Account Recovery

This walkthrough configures ThunderID to let users reset a forgotten password through an email link. ThunderID identifies the user, sends the recovery email, verifies the link, and lets the user set a new password — all on the hosted sign-in pages in the redirect-based pattern.

:::info Background
[Add Account Recovery](https://thunderid.dev/docs/next/use-cases/customer-identity.md#add-account-recovery) covers the requirements story behind this use case.
:::

:::note Prerequisites
- Complete the [Login](https://thunderid.dev/docs/next/use-cases/b2c/add-login.md) walkthrough first. The user type and application set up there are required here.
- Configure SMTP so that ThunderID can send recovery emails. See [Email Configuration](https://thunderid.dev/docs/next/guides/getting-started/configuration.md#email-configuration), then restart ThunderID for the changes to take effect.
:::

## Pick Your Pattern

<details open>
  <summary>Redirect-based</summary>

In the redirect-based pattern, the entire recovery experience is hosted by ThunderID. Your app provides a **Forgot password?** link that redirects the user to ThunderID. After the user completes the recovery flow, they return to your app's sign-in page.

### Configure ThunderID

**1. Build a recovery flow**

Build a `RECOVERY` flow that identifies the user, generates a recovery token, sends the email, verifies the link, and lets the user set a new password. See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

<details>
  <summary>Sample recovery flow</summary>

```json
{
  "handle": "consumer-recovery-flow",
  "name": "Consumer Password Recovery Flow",
  "flowType": "RECOVERY",
  "nodes": [
    ,
    {
      "id": "prompt_username",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          ,
          {
            "type": "BLOCK",
            "id": "block_username",
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
      "id": "identify_user",
      "type": "TASK_EXECUTION",
      "executor": {
        "name": "IdentifyingExecutor",
        "mode": "identify",
        "inputs": [  ]
      },
      "onSuccess": "generate_recovery_token",
      "onFailure": "email_sent_status"
    },
    {
      "id": "generate_recovery_token",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "send_recovery_email"
    },
    {
      "id": "send_recovery_email",
      "type": "TASK_EXECUTION",
      "properties": ,
      "executor": ,
      "onSuccess": "email_sent_status",
      "onFailure": "email_sent_status"
    },
    {
      "id": "email_sent_status",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          ,

        ]
      },
      "message": "Check Your Email",
      "next": "verify_recovery_token"
    },
    {
      "id": "verify_recovery_token",
      "type": "TASK_EXECUTION",
      "executor": {
        "name": "InviteExecutor",
        "mode": "verify",
        "inputs": [  ]
      },
      "onSuccess": "prompt_new_password"
    },
    {
      "id": "prompt_new_password",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          {
            "type": "BLOCK",
            "id": "block_password",
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
      "id": "set_credential",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "recovery_complete"
    },
    {
      "id": "recovery_complete",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          ,

        ]
      },
      "message": "Password Reset Successful",
      "next": "end"
    },

  ]
}
```

</details>

**2. Attach the recovery flow to your application**

Go to **Applications** → your app → **Flows** tab. Under **Recovery Flow**, select the flow you created. Save the application.

See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

### Integrate into Your App

The recovery flow is hosted on ThunderID. Your app only needs a **Forgot password?** entry point that your SDK routes to the hosted recovery experience:

| Framework   | Where to integrate                                                                            |
| ----------- | --------------------------------------------------------------------------------------------- |
| React       | [React SDK Overview](https://thunderid.dev/docs/next/sdks/react/overview.md) — use the SDK's recovery entry point    |
| Next.js     | [Next.js Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/nextjs.md)       |
| Vue         | [Vue Quickstart](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/vue.md)              |
| Browser SDK | [Browser SDK Overview](https://thunderid.dev/docs/next/sdks/browser/overview.md)                                      |

### Try It Out

1. Start your app and navigate to the sign-in screen.
2. Click **Forgot password?** (or your equivalent entry point). The browser navigates to ThunderID.
3. Enter your test user's username and submit.
4. Check the inbox for the test user's email address and open the recovery link.
5. ThunderID renders the **Set new password** screen. Enter a new password and submit.
6. Return to your app and sign in with the new password.

</details>

<details>
  <summary>App-native step-by-step</summary>

Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/solution-patterns.md#app-native) for what to expect.

</details>

<details>
  <summary>App-native managed</summary>

Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/solution-patterns.md#app-native) for what to expect.

</details>

## Going Deeper

- Want to understand how the recovery flow nodes work? See [Flows](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#flows) in Identity Concepts.
- Want to see this use case running against the Wayfinder sample? See [Account Recovery — Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out/account-recovery.md).
