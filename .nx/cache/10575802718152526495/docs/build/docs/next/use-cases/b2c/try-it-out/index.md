# Try It Out

# Try It Out

The walkthroughs in this section use Wayfinder, a fictional consumer travel-booking app, as the sample. You will sign users in, register new accounts, view and update profiles, recover lost passwords, and onboard staff — all against a locally running application connected to ThunderID.

## Cast

These sample users appear throughout the walkthroughs, each mapped to a specific flow: sign-up, sign-in, recovery, profile management, and staff onboarding.

_[Cast diagram: Wayfinder sample users]_

## Architecture

The Wayfinder sample application has three main parts: a consumer web app, a booking API, and ThunderID as the identity provider.
The following diagram shows how these pieces connect and where the identity flows run in the system.

_[Architecture diagram: Wayfinder components]_

## Set Up the Sample

Before running any walkthrough, set up the Wayfinder sample application. Two paths lead to the same end state:


  - [Quick Start](https://thunderid.dev/docs/next/use-cases/b2c/try-it-out/setup.md) — Download the sample and import a pre-built configuration bundle into ThunderID. Everything the walkthroughs need is created in one step.
  - [Configure It Yourself](https://thunderid.dev/docs/next/use-cases/b2c/try-it-out/configure-it-yourself.md) — Create the same resources step by step through the console and API. Use this path to understand how each piece is set up.


## Walkthroughs

Once the sample is running, pick a walkthrough:


  - [Login](https://thunderid.dev/docs/next/use-cases/b2c/try-it-out/add-login.md) — John Doe signs in to Wayfinder and arrives at the dashboard.
  - [Self Sign-Up](https://thunderid.dev/docs/next/use-cases/b2c/try-it-out/self-sign-up.md) — Emma Wilson signs up with email and password.
  - [View Profile](https://thunderid.dev/docs/next/use-cases/b2c/try-it-out/profile-section.md) — John views and updates his profile.
  - [Account Recovery](https://thunderid.dev/docs/next/use-cases/b2c/try-it-out/account-recovery.md) — John resets a forgotten password through an email link.
  - [Onboard Internal Users](https://thunderid.dev/docs/next/use-cases/b2c/try-it-out/onboard-internal-users.md) — Alex invites staff members from the console.
