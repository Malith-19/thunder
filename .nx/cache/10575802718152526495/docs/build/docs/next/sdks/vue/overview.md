# Vue SDK Overview

# Vue SDK

The ThunderID Vue SDK (`@thunderid/vue`) provides a comprehensive set of components, composables, and utilities to integrate ThunderID authentication and user management into your Vue 3 applications.

## Installation

Install the ThunderID Vue SDK using your preferred package manager:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/vue



    yarn add @thunderid/vue



    pnpm add @thunderid/vue



    bun add @thunderid/vue

</CodeGroup>

## Getting Started

To get started quickly, check out our [Vue Quickstart Guide](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/vue.md) for step-by-step instructions.

## Features

### Providers

The SDK provides a root provider component that manages authentication state across your application via Vue's `provide`/`inject`.

- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/providers/thunderid-provider.md)** - Root provider component that wraps your application and manages authentication state

### Components

Pre-built, customizable components for common authentication flows and user management.

#### Action Components
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/sign-in-button.md)** - Trigger sign-in flow
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/sign-out-button.md)** - Sign out the current user
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/sign-up-button.md)** - Trigger sign-up flow

#### Control Components
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/signed-in.md)** - Conditionally render content for authenticated users
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/signed-out.md)** - Conditionally render content for unauthenticated users
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/loading.md)** - Display loading state during authentication

#### User Self-care Components
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/user-dropdown.md)** - User menu with profile and settings
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/user-profile.md)** - Complete user profile management interface
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/user.md)** - Display user information

#### Organization Components (B2B)
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/create-organization.md)** - Create new organizations
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/organization-profile.md)** - Manage organization settings
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/organization-switcher.md)** - Switch between organizations
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/organization-list.md)** - List user's organizations
- **[``](https://thunderid.dev/docs/next/sdks/vue/apis/components/organization.md)** - Display organization information

### Composables

Vue composables for programmatic access to authentication and user data.

- **[`useThunderID()`](https://thunderid.dev/docs/next/sdks/vue/apis/composables/use-thunderid.md)** - Access the main ThunderID SDK instance

## Customization

All components in the ThunderID Vue SDK are fully customizable. You can:

- Override default styles using CSS classes or inline styles
- Customize component behavior through props
- Build custom components using the provided composables
- Use scoped slots to control rendering
