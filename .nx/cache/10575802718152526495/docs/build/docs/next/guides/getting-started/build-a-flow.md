# Build a Sign-In Flow

# Build a Sign-in Flow

By the end of this guide you will have a working username and password sign-in flow assigned to your application.

## Prerequisites

- ThunderID is running. See [Get Started](https://thunderid.dev/docs/next/guides/get-thunderid.md).
- You have created an application. See [Register an Application](https://thunderid.dev/docs/next/guides/register-an-application.md).


## Open the Flow Builder

1. Sign in to the ThunderID Console at [https://localhost:8090/console](https://localhost:8090/console).
2. Go to **Flows** and click **+ Create New Flow**.
3. Select **Sign-in** as the flow type and click **Continue**.
4. Choose the **Basic** template (username and password authentication) and click **Continue**.
5. Enter a unique flow name, for example `My Sign In`, then click **Create**.

The canvas opens with the Basic template already wired.

:::tip You're almost done
The Basic template is a complete, working username and password sign-in flow. If that's all you need, skip to [Assign the flow to your application](#assign-the-flow-to-your-application).
:::

## Review the Canvas

The Basic template has four nodes:

| Node | What it does |
|---|---|
| **Sign In** (View) | Renders the sign-in form with username and password fields |
| **Identifier + Password** (Executor) | Validates the submitted credentials against the user store |
| **Authorization** (Executor) | Checks whether the authenticated user can access the application |
| **Auth Assertion Generator** (Executor) | Issues the authentication assertion on success |

Each node connects to the next via its **green (success) output**. The final executor connects to **END**.

> **Note**
>
> Every executor also has a **red (failure) output**. In the Basic template the failure path from **Identifier + Password** is not connected — wire it back to the Sign In view so users can retry. Don't leave failure paths unconnected; an unconnected failure path stops the flow with an error.


## Save the Flow

Click **Save** in the top-right corner. ThunderID saves the flow and assigns it a version number.

## Assign the Flow to Your Application

A flow only activates once assigned to an application.

1. In the Console, go to **Applications** and open the application you created in the Quickstart.
2. Open the **Flows** tab.
3. Under **Authentication Flow**, select the flow you just saved from the dropdown.
4. Click **Save**.

ThunderID will now run this flow whenever a user signs in to your application.


## What's Next

Your sign-in flow is live. The next step is connecting your app so it can redirect users through this flow.


  - [Connect your application](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application.md) — Choose a framework quickstart and integrate sign-in with ThunderID SDK packages.
