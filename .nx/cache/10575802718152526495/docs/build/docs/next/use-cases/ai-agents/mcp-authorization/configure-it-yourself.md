# Configure It Yourself

# Configure It Yourself

Use this page to register the external MCP client manually instead of importing the declarative bundle from [Try It Out](https://thunderid.dev/docs/next/use-cases/ai-agents/try-it-out.md). Pick this path when you want to see exactly what gets created, or adapt the setup to your own project.

If you haven't created the `wayfinder-booking` resource server, the `Customer` user type, the booking roles, and the `john.doe` user yet, do that first by following [Configure It Yourself](https://thunderid.dev/docs/next/use-cases/configure-it-yourself.md) under Securing AI Agents. This page adds only the external client application on top — no new role, no changes to `john.doe`.

## Register the External MCP Client Application

The external MCP client (MCP Inspector or any third-party MCP client) needs its own OAuth application registered in ThunderID. Public client, PKCE required, with redirect URIs covering the supported client.

Navigate to **Applications** → **Add Application** and choose **Browser App** as the type. Configure:

| Setting              | Value                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Client ID            | `EXTERNAL-MCP-CLIENT`                                                                                                             |
| Redirect URIs        | `http://localhost:6274/oauth/callback/debug`, `http://localhost:6274/oauth/callback` |
| Allowed grants       | `authorization_code`, `refresh_token`                                                                                              |
| PKCE                 | Required                                                                                                                          |
| Allowed user types   | `Customer`                                                                                                                        |
| Authentication flow  | `wayfinder-agent-auth-flow` (the same flow the Wayfinder Concierge uses, so the consent screen surfaces each `booking:*` permission as a toggle)        |

See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

The walkthrough relies on the consent screen at sign-in to narrow what the external client gets. `john.doe` keeps his existing `Booking User` role unchanged, and picks which `booking:*` permissions to release the first time he signs in through Inspector.

> **Alternative: Dynamic Client Registration**
>
> If you don't want to register every MCP client up-front, ThunderID also supports [Dynamic Client Registration](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/dynamic-client-registration.md). An MCP client that supports DCR can discover ThunderID through the MCP server's protected-resource metadata and register itself, after which it uses its issued credentials for the same authorization-code flow. The tryout uses static registration for predictability — DCR is the right choice when you can't enumerate every client in advance.


## Start the Sample

With the new application in place, follow the commands in the Wayfinder sample's README. The MCP server runs as part of the Wayfinder Server process and serves `/mcp` alongside `/api/*` automatically.
