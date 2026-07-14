# JavaScript SDK Overview

# JavaScript SDK

The ThunderID JavaScript SDK (`@thunderid/javascript`) is the framework-agnostic core library that powers platform-specific SDKs such as `@thunderid/browser`, `@thunderid/react`, and `@thunderid/express`. Use it directly when building custom integrations, writing platform adapters, or working in environments without a dedicated ThunderID SDK.

## Installation

Install the ThunderID JavaScript SDK using your preferred package manager:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/javascript



    yarn add @thunderid/javascript



    pnpm add @thunderid/javascript



    bun add @thunderid/javascript

</CodeGroup>

## When to Use This SDK

| Use case | Recommended SDK |
|----------|----------------|
| React applications | [`@thunderid/react`](https://thunderid.dev/docs/next/sdks/react/overview.md) |
| Vanilla JavaScript browser apps | [`@thunderid/browser`](https://thunderid.dev/docs/next/sdks/browser/overview.md) |
| Express.js middleware | `@thunderid/express` |
| Custom platform adapter | `@thunderid/javascript` (this SDK) |
| Building a new framework SDK | `@thunderid/javascript` (this SDK) |

## Quick Example

Extend `ThunderIDJavaScriptClient` to build a platform-specific client:

```ts title="src/my-client.ts" showLineNumbers

class MyCustomClient extends ThunderIDJavaScriptClient {
  async signIn(options = ) {
    await this.loadOpenIDProviderConfiguration()
    const url = await this.getSignInUrl(options)
    window.location.href = url
  }

  async handleCallback() {
    const params = new URLSearchParams(window.location.search)
    return this.requestAccessToken(
      params.get('code')!,
      params.get('session_state') ?? '',
      params.get('state')!,
    )
  }
}

const auth = new MyCustomClient()

await auth.initialize({
  clientId: '<your-client-id>',
  baseUrl: 'https://localhost:8090',
  afterSignInUrl: window.location.origin,
})
```

## Features

### Core APIs

- **[`ThunderIDJavaScriptClient`](https://thunderid.dev/docs/next/sdks/javascript/apis/thunderid-javascript-client.md)** — Base class for all platform SDKs. Handles OIDC discovery, PKCE, token exchange, session storage, JWT decoding, and agent/OBO authentication.
- **[Configuration](https://thunderid.dev/docs/next/sdks/javascript/apis/configuration.md)** — Full reference for all initialization options including auth, token validation, discovery, and preferences.
- **[`HttpClient`](https://thunderid.dev/docs/next/sdks/javascript/apis/http-client.md)** — Abstract HTTP client base with handler lifecycle, request/response callbacks, and parallel request support.
- **[`StorageManager`](https://thunderid.dev/docs/next/sdks/javascript/apis/storage-manager.md)** — Typed storage layer for config, OIDC metadata, session, and temporary PKCE data.

### Auth Flow Functions

Standalone functions for driving authentication flows step-by-step without browser redirects.

#### V2 Flows (Recommended)
- **[Sign-In Flow](https://thunderid.dev/docs/next/sdks/javascript/apis/flows/embedded-sign-in-flow-v2.md)** — `executeEmbeddedSignInFlowV2`
- **[Sign-Up Flow](https://thunderid.dev/docs/next/sdks/javascript/apis/flows/embedded-sign-up-flow-v2.md)** — `executeEmbeddedSignUpFlowV2`
- **[Recovery Flow](https://thunderid.dev/docs/next/sdks/javascript/apis/flows/embedded-recovery-flow-v2.md)** — `executeEmbeddedRecoveryFlowV2`
- **[User Onboarding Flow](https://thunderid.dev/docs/next/sdks/javascript/apis/flows/embedded-onboarding-flow-v2.md)** — `executeEmbeddedUserOnboardingFlowV2`
- **[Flow Meta](https://thunderid.dev/docs/next/sdks/javascript/apis/flows/flow-meta-v2.md)** — `getFlowMetaV2` — aggregated app/org branding, theme, and i18n metadata

#### V1 Flows
- **[Embedded Sign-In Flow](https://thunderid.dev/docs/next/sdks/javascript/apis/flows/embedded-sign-in-flow.md)** — `initializeEmbeddedSignInFlow` / `executeEmbeddedSignInFlow`
- **[Embedded Sign-Up Flow](https://thunderid.dev/docs/next/sdks/javascript/apis/flows/embedded-sign-up-flow.md)** — `executeEmbeddedSignUpFlow`

### User & Profile

- **[User Profile](https://thunderid.dev/docs/next/sdks/javascript/apis/user/user-profile.md)** — `getUserInfo`

### Organizations

- **[Organizations](https://thunderid.dev/docs/next/sdks/javascript/apis/organizations.md)** — `getAllOrganizations`, `getMeOrganizations`, `getOrganization`, `createOrganization`, `updateOrganization`, `createPatchOperations`
- **[Organization Units](https://thunderid.dev/docs/next/sdks/javascript/apis/organizations/organization-units.md)** — `getOrganizationUnitChildren`

### Branding & Theme

- **[Branding](https://thunderid.dev/docs/next/sdks/javascript/apis/branding.md)** — `getBrandingPreference`, `transformBrandingPreferenceToTheme`
- **[Theme](https://thunderid.dev/docs/next/sdks/javascript/apis/theme.md)** — `createTheme`, `DEFAULT_THEME`

### Internationalization

- **[Internationalization](https://thunderid.dev/docs/next/sdks/javascript/apis/i18n.md)** — `getDefaultI18nBundles`, `normalizeTranslations`, `TranslationBundleConstants`. Built-in support for 9 locales.

### Errors

- **[Errors](https://thunderid.dev/docs/next/sdks/javascript/apis/errors.md)** — `ThunderIDError`, `ThunderIDAPIError`, `ThunderIDRuntimeError`, `ThunderIDAuthException`

### Utilities

- **[Utilities](https://thunderid.dev/docs/next/sdks/javascript/apis/utilities.md)** — Encoding, auth helpers, URL utilities, data manipulation, V2 flow template literals, BEM styling, and structured logging.
