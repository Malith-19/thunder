# Try It Out

# Try It Out

Each walkthrough below runs the [Securing MCP](https://thunderid.dev/docs/next/use-cases/ai-agents/overview.md) pattern against the Wayfinder sample. The Wayfinder Server hosts an MCP server on `/mcp` alongside its REST API; an external MCP client signs in through ThunderID and calls Wayfinder's tools, with ThunderID enforcing who can invoke which tool.

## Meet Wayfinder

Wayfinder is the same travel-booking application from the [Securing AI Agents tryout](https://thunderid.dev/docs/next/use-cases/try-it-out.md), where the in-product **Wayfinder Concierge** acts as an MCP client from inside the app. This tryout covers the other side: an **external** MCP client connecting to the same Wayfinder MCP server through its own OAuth application in ThunderID. The application is pre-registered in the bundle; in production, clients that support [Dynamic Client Registration](https://thunderid.dev/docs/next/guides/guides/protocols/oauth-oidc/dynamic-client-registration.md) can self-register at runtime instead.


### Meet the Cast

- **John Doe** signs in to the external MCP client and picks which `booking:*` permissions to grant at consent. He carries the `Booking User` role with read, create, and cancel permissions.
- **MCP Inspector** is the [reference debug UI](https://github.com/modelcontextprotocol/inspector) for MCP servers — browser-based, speaks the protocol, supports OAuth-protected servers out of the box.

## Sample Architecture

This tryout extends the AI Agents architecture with one new piece:

- **External MCP Client**: an OAuth client (MCP Inspector) that signs in through ThunderID and calls the Wayfinder MCP server's tools.

The Wayfinder Server validates the issued access token on every MCP call and enforces the per-tool scope before invoking the tool handler.


## Set Up Your Environment

Complete the [AI Agents Set Up Your Environment](https://thunderid.dev/docs/next/use-cases/try-it-out.md#set-up-your-environment) first. The same bundle also seeds the `EXTERNAL-MCP-CLIENT` application used here.


### Verify the New Application

In the ThunderID Console at https://localhost:8090/console, open **Applications** and confirm `EXTERNAL-MCP-CLIENT` is listed.

### Install MCP Inspector

Launch MCP Inspector locally:

```bash
npx @modelcontextprotocol/inspector
```

### Allow Inspector in CORS

Add Inspector's origin to ThunderID's CORS allow-list in `repository/conf/deployment.yaml`, then restart ThunderID:

```yaml
cors:
  allowed_origins:
    # ...existing entries...
    - "http://localhost:6274"
```


## Walkthroughs

Pick a walkthrough to begin. Each one starts from the setup above.


  - [MCP Authorization](https://thunderid.dev/docs/next/use-cases/ai-agents/mcp-authorization/connect-via-inspector.md) — Authorize an external MCP client, list Wayfinder's tools, call a few, and watch scope enforcement deny delete_all_bookings.


## Going Deeper

- Curious how the MCP-specific application and consent step map to ThunderID concepts? See [Identity Concepts](https://thunderid.dev/docs/next/use-cases/ai-agents/identity-concepts.md).
- Prefer to register the application manually? See [Configure It Yourself](https://thunderid.dev/docs/next/use-cases/ai-agents/configure-it-yourself.md).
- Want to compare server-side and client-side patterns before going to production? See [Solution Patterns](https://thunderid.dev/docs/next/use-cases/ai-agents/solution-patterns.md).
