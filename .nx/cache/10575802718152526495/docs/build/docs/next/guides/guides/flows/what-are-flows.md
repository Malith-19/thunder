# What Are Flows?

# What Are Flows?

A **flow** defines the step-by-step journey a user takes during a specific interaction with your application — signing in, creating an account, or resetting a password. ThunderID executes the assigned flow whenever a user initiates that action.

ThunderID supports four flow types:

| Type | Purpose | Assigned To |
|------|---------|-------------|
| **Authentication** | Controls how users sign in, including Multi-Factor Authentication (MFA) and social login | Application → Authentication Flow |
| **Registration** | Controls how new users create accounts and provide profile data | Application → Registration Flow (toggle must be enabled) |
| **Recovery** | Controls how users regain access to their account, such as resetting a forgotten password | Application → Recovery Flow (toggle must be enabled) |
| **User Onboarding** | Controls how admins create and onboard new users — directly or via an invite link | System-level |

Each flow is a **named, versioned definition**. One flow can be assigned to multiple applications. Every time you save a flow, ThunderID creates a new version. The version number appears in the Version column on the Flows list page; previous versions are preserved and can be restored via API. See [Flow Versioning API Reference](https://thunderid.dev/docs/next/apis.md#tag/flow-versioning).


## Next Steps

- Understand the fundamentals — Learn about executors, steps, flow builder, and conditions in [Flow Concepts](https://thunderid.dev/docs/next/guides/guides/flow-concepts.md).
- Start building — Follow a step-by-step walkthrough in [Build a Flow](https://thunderid.dev/docs/next/guides/guides/build-a-flow.md).
