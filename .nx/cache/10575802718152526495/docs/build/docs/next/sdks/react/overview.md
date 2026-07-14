# React SDK Overview

# React SDK

The ThunderID React SDK (`@thunderid/react`) provides a comprehensive set of components, hooks, and utilities to integrate ThunderID authentication and user management into your React applications.

## Installation

Install the ThunderID React SDK using your preferred package manager:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/react



    yarn add @thunderid/react



    pnpm add @thunderid/react



    bun add @thunderid/react

</CodeGroup>

## Getting Started

To get started quickly, check out our [React Quickstart Guide](https://thunderid.dev/docs/next/guides/getting-started/connect-your-application/react.md) for step-by-step instructions.

## Features

### Contexts

The SDK provides a powerful context provider that manages authentication state across your application.

- **[``](https://thunderid.dev/docs/next/sdks/react/apis/contexts/thunderid-provider.md)** - Root provider component that wraps your application and manages authentication state

### Components

Pre-built, customizable components for common authentication flows and user management.

#### Action Components
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/sign-in-button.md)** - Trigger sign-in flow
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/sign-out-button.md)** - Sign out the current user
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/sign-up-button.md)** - Trigger sign-up flow

#### Control Components
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/signed-in.md)** - Conditionally render content for authenticated users
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/signed-out.md)** - Conditionally render content for unauthenticated users
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/loading.md)** - Display loading state during authentication

#### User Self-care Components
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/user-dropdown.md)** - User menu with profile and settings
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/user-profile.md)** - Complete user profile management interface
- **[``](https://thunderid.dev/docs/next/sdks/react/apis/components/user.md)** - Display user information

### Hooks

React hooks for programmatic access to authentication and user data.

- **[`useThunderID()`](https://thunderid.dev/docs/next/sdks/react/apis/hooks/use-thunderid.md)** - Access the main ThunderID SDK instance

## Customization

All components in the ThunderID React SDK are fully customizable. You can:

- Override default styles using CSS classes or inline styles
- Customize component behavior through props
- Build custom components using the provided hooks
- Extend functionality with middleware and plugins
