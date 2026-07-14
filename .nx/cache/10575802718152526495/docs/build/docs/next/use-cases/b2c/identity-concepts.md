# Identity Concepts

# Identity Concepts

This page explains the identity concepts behind the Wayfinder sample you set up in [Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out/setup.md). Each section describes one ThunderID concept and shows how the sample uses it.

## Organization

ThunderID can host many businesses as isolated Organizations. Wayfinder is one such business, so everything lives in a single organization.

## User Types

A user type defines who can exist in the system and what attributes they carry. Each user record belongs to exactly one user type. Wayfinder defines two user types:

- `Customer`: a consumer who books travel, with profile attributes required for a traveller.
- `Staff`: an internal team member who manages the product, with profile attributes required for a staff member.

See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

## Resources and Permissions

Wayfinder Server protects its API endpoints using permissions issued by ThunderID.

A **resource server** represents the APIs of a single backend. Each resource server defines one or more **resources**, and each resource defines **actions**. ThunderID automatically generates a **permission** of the form `<resource>:<action>` for every action.

Wayfinder's booking API is one resource server with a single `booking` resource that has three actions: `read`, `create`, and `cancel`. The generated permissions are `booking:read`, `booking:create`, and `booking:cancel`.

```
booking-api                             (Resource Server)
└── booking                             (Resource)
    ├── read     →  booking:read        (Permission)
    ├── create   →  booking:create
    └── cancel   →  booking:cancel
```

Permissions are included in access tokens. See [Resource Servers](https://thunderid.dev/docs/next/guides/guides/resource-servers.md).

## Roles

A role groups permissions for a user category. A user's effective permissions are the combined set of permissions across all their assigned roles. Wayfinder defines four roles:

- `Traveler`: consumer role with all three `booking:*` permissions.
- `Support`: staff role for consumer support workflows.
- `DestinationsAdmin`: staff role for curating featured destinations.
- `OpsAdmin`: staff role for inviting and managing other staff.

See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

## Application

An application is the OAuth2 client that ThunderID issues tokens to. Wayfinder Web is registered as `WAYFINDER`.

See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

## Flows

A flow is the sequence of steps a user moves through when signing in, signing up, or recovering. Wayfinder uses the bundled `default-basic-flow` for sign-in, plus separate registration, recovery, and staff onboarding flows for the other use cases.

See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).
