# Identity Concepts

# Identity Concepts

This page explains the identity concepts behind the AI agent sample you set up in [Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out.md). Each section describes one ThunderID concept and shows how the sample uses it.

## Organization

ThunderID can host many isolated tenants. Wayfinder needs only one, so everything lives in a single organization.

## User Types

A user type defines who can exist in the system and what attributes they carry. Each user record belongs to exactly one user type. Wayfinder defines a `Customer` user type for the two demo consumers — John Doe and Jane Smith — with standard attributes like username, email, and name.

See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

## Resources and Permissions

The **AI Agent API** and the **Wayfinder Server** both need protection in the sample. The AI Agent API decides who is allowed to chat with the agent at all, and the Wayfinder Server decides who can book travel. Each is registered as a resource server, with its actions generating one permission per action.

A **resource server** groups the APIs of one backend. Each resource server defines one or more **resources**, each resource defines **actions**, and ThunderID automatically generates a **permission** of the form `<resource>:<action>` for every action.

```
wayfinder-agent                         (Resource Server)
└── agent                               (Resource)
    └── access     →  agent:access      (Permission)

wayfinder-booking                       (Resource Server)
└── booking                             (Resource)
    ├── read       →  booking:read      (Permission)
    ├── create     →  booking:create
    ├── cancel     →  booking:cancel
    └── recommend  →  booking:recommend
```

`wayfinder-booking` protects both the booking REST API on `/api/*` and the MCP tools on `/mcp` — the Wayfinder Server checks the same `booking:*` permissions on both surfaces.

Permissions are included in access tokens. See [Resource Servers](https://thunderid.dev/docs/next/guides/guides/resource-servers.md).

## Roles

A role bundles permissions for a class of principal. A user's or agent's effective permissions are the union of permissions across their roles. Wayfinder defines three roles for the AI agent tryout:

- `Chat User`: grants `agent:access`, the permission required to talk to the Wayfinder Concierge.
- `Booking User`: grants `booking:read`, `booking:create`, and `booking:cancel` for booking travel through the UI.
- `Recommender`: grants `booking:recommend`, the permission the Wayfinder Concierge needs to surface flight recommendations on its own.

John Doe carries both user roles; Jane Smith carries only `Booking User`. The `Recommender` role is assigned to the `WAYFINDER-CONCIERGE` agent, not to a user.

See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

## Application

An application is the OAuth2 client that ThunderID issues tokens to. Wayfinder Web is registered as `WAYFINDER` — a public, PKCE-enforced browser client.

See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

## Agent

An agent is a first-class non-human principal in ThunderID with its own credentials. The Wayfinder Concierge is registered as `WAYFINDER-CONCIERGE`, with two grants enabled:

- `client_credentials` — for the agent's own M2M token, used to call browsing tools.
- `authorization_code` (with PKCE) — for the on-behalf-of flow, where the user consents and the agent calls mutating tools as the user.

See [Manage Agents](https://thunderid.dev/docs/next/guides/guides/agents/manage-agents.md) and [Agent Authentication](https://thunderid.dev/docs/next/guides/guides/agents/agent-authentication.md).

## Flows

A flow is the sequence of steps a user moves through when signing in or granting consent. Wayfinder Web uses the bundled `default-basic-flow` for sign-in. The agent uses a separate **Wayfinder Agent Authentication Flow** that drives the OBO consent screen.

The consent screen surfaces each requested `booking:*` permission as an individual toggle. The user picks which ones to grant, and the issued token carries only what they ticked — the agent cannot widen its access after the fact. The resulting OBO token identifies *both* the user (as the subject) and the agent (as the actor), so downstream services know the request was made by an agent acting for that user. The token's effective permissions are the intersection of what the user holds and what the user just consented to.

See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md) and [Agent Authentication](https://thunderid.dev/docs/next/guides/guides/agents/agent-authentication.md).
