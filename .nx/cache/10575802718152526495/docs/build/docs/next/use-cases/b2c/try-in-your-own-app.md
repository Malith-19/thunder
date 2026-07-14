# Try In Your Own App

# Try In Your Own App

Each walkthrough below configures ThunderID for one B2C use case and walks you through integrating it into your application.

:::tip Already following Try It Out?
This path is for integrating ThunderID into your own app. If you'd rather see the use cases running against a pre-built sample, see [Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out.md).
:::

## Prerequisites

- ThunderID running locally. Follow [Get ThunderID](https://thunderid.dev/docs/next/guides/getting-started/get-thunderid.md) if you haven't already.

## Foundation

All walkthroughs build on a shared consumer user type. Create it once here; each walkthrough then layers its own configuration on top.

Navigate to **User Types** → **Create User Type**. Add at minimum:

| Attribute  | Type   | Properties       |
| ---------- | ------ | ---------------- |
| `username` | string | Required, unique |
| `email`    | string | Required, unique |
| `password` | string | Credential       |

See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

Start with the [Login](https://thunderid.dev/docs/next/use-cases/b2c/add-login.md) walkthrough — it registers your application and builds the sign-in flow that every other walkthrough depends on.

## Walkthroughs


  - [Login](https://thunderid.dev/docs/next/use-cases/b2c/add-login.md) — Configure sign-in and wire it into your app.
  - [Self Sign-Up](https://thunderid.dev/docs/next/use-cases/b2c/self-sign-up.md) — Let new users register themselves with email and password.
  - [View Profile](https://thunderid.dev/docs/next/use-cases/b2c/profile-section.md) — Display and update a user's profile attributes and password.
  - [Account Recovery](https://thunderid.dev/docs/next/use-cases/b2c/account-recovery.md) — Let users reset a forgotten password through an email link.
  - [Onboard Internal Users](https://thunderid.dev/docs/next/use-cases/b2c/onboard-internal-users.md) — Invite staff by email and provision them with the right role on accept.
