# What are Identity Providers?

# Identity Providers

An identity provider (IdP) in ThunderID represents an external system that authenticates users on your behalf. When you integrate an IdP, users can sign in to your applications using their existing accounts with that provider — for example, their Google or GitHub account.

ThunderID supports four IdP types.

| Type | Use Case |
|------|----------|
| **Google** | Sign in with Google accounts. Endpoints are pre-configured. Requires only your Google OAuth client credentials. |
| **GitHub** | Sign in with GitHub accounts. Endpoints are pre-configured. Requires only your GitHub OAuth app credentials. |
| **OIDC** | Connect any standard OpenID Connect-compliant provider. You supply the endpoints. |
| **OAuth** | Connect any OAuth 2.0 provider that does not support OIDC discovery. You supply all endpoint URLs. |

> **Note**
>
> Identity provider management through the ThunderID Console is not yet available. Use the Identity Provider REST API to create and manage identity providers.


## How IdPs Connect to Applications

Applications in ThunderID do not reference IdPs directly. The connection runs through authentication flows:

1. You create an IdP using the API and configure its credentials.
2. You add a social login executor to an authentication flow and configure it with the IdP.
3. You assign that flow to your application.

When a user signs in to the application, ThunderID runs the assigned flow, which triggers the IdP's authorization redirect.

See [Connect an IdP to an Application](https://thunderid.dev/docs/next/guides/guides/connect-idp-to-application.md) for the full walkthrough.

## Set Up an Identity Provider

Choose the guide for your provider type:

- [Add a Google Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-google.md)
- [Add a GitHub Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-github.md)
- [Add an OIDC Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-oidc-provider.md)
- [Add an OAuth 2.0 Identity Provider](https://thunderid.dev/docs/next/guides/guides/add-oauth-provider.md)

## Manage Identity Providers

- [Manage Identity Providers](https://thunderid.dev/docs/next/guides/guides/manage-identity-providers.md) — Create, update, and delete identity providers using the API.

## Next Steps

- [Connect an IdP to an Application](https://thunderid.dev/docs/next/guides/guides/connect-idp-to-application.md) — Wire a configured IdP into an application's sign-in flow.
- [Build a Sign-In Flow](https://thunderid.dev/docs/next/guides/flows/build-a-flow.md) — Learn how to customize authentication flows in the Flow Designer.
