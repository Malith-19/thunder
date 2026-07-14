# Account Recovery

# Account Recovery

In this walkthrough, John has forgotten his Wayfinder password. He selects **Forgot password?** on the sign-in screen, receives a recovery email, opens the link, and sets a new password. ThunderID runs the recovery flow end-to-end and returns him to Wayfinder ready to sign in with the new credentials.

:::note Prerequisites
Complete [Set Up Your Environment](https://thunderid.dev/docs/next/use-cases/b2c/setup.md#set-up-your-environment) before starting this walkthrough.
:::

:::info Background
[B2C overview](https://thunderid.dev/docs/next/use-cases/b2c/...md#building-blocks-of-the-b2c-identity-journey) covers the requirements story behind this use case.
:::

## Set Up Account Recovery

1. Recovery emails are delivered through a SMTP server. Configure a SMTP provider and apply the configuration in `deployment.yaml`.

    **Sample SMTP Configuration:**

    ```yaml
    email:
      smtp:
        host: "<smtp-host>"
        port: <smtp-port>
        username: "<smtp-username>"
        password: "<smtp-password>"
        from_address: "<from-address>"
        enable_start_tls: true
        enable_authentication: true
    ```

2. Restart ThunderID for the changes to take effect.

## Pick Your Pattern

<details open>
  <summary>Redirect-based</summary>

In the redirect-based pattern, the consumer app sends the user to ThunderID for the entire recovery experience. The Wayfinder web frontend is configured exactly this way: the **Sign in** button triggers an OIDC redirect to ThunderID. From there, the user picks **Forgot password?**, completes the recovery flow, and returns to Wayfinder to sign in with the new password.

**Try the Use Case**

1. Open http://localhost:5173 and select **Sign in**. The browser navigates to ThunderID.
2. On the ThunderID sign-in page, select **Forgot password?**.
3. Enter `john.doe` as the username and submit. ThunderID runs the recovery flow and sends a recovery email to `john.doe@example.com`.
4. Open the email in John's inbox and open the link inside.
5. ThunderID renders a **Set new password** screen. Enter a new password and submit.
6. ThunderID shows a confirmation and returns John to Wayfinder. Select **Sign in** again and sign in with the new password.

</details>

<details>
  <summary>App-native step-by-step</summary>

Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/integration-patterns.md#app-native) for what to expect.

</details>

<details>
  <summary>App-native managed</summary>

Coming soon. See the [App-native pattern](https://thunderid.dev/docs/next/use-cases/integration-patterns.md#app-native) for what to expect.

</details>

## Going Deeper

- Want to understand the steps the recovery flow takes? See [Flows](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#flows) in the Identity Concepts.
- Prefer to build the recovery flow manually? See [Build the Account Recovery Flow](https://thunderid.dev/docs/next/use-cases/b2c/configure-it-yourself.md#build-the-account-recovery-flow) in Configure It Yourself.
