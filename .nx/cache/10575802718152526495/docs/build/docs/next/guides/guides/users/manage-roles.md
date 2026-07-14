# Roles

# Roles

A role in ThunderID is a named set of permissions that you assign to users, groups, applications, or agents. Roles connect the permissions defined in your [resource servers](https://thunderid.dev/docs/next/guides/resource-servers.md) to the principals that need access to them.

Each role:

- Belongs to an **Organization Unit (OU)**, which defines the organizational scope of the role.
- Contains a set of **permissions** drawn from one or more resource servers.
- Has zero or more **assignments** — the users, groups, applications, or agents that hold the role.

## Prerequisites

Before creating a role, you need:

- An organization unit to scope the role. See [Organization Units](https://thunderid.dev/docs/next/guides/organization-units.md).
- At least one resource server with defined permissions. See [Resource Servers](https://thunderid.dev/docs/next/guides/resource-servers.md).

## Create a Role

1. Navigate to **Roles** in the ThunderID Console and click **Create Role**.
2. Enter a **Name** for the role. The name must be unique within the selected organization unit.
3. Optionally enter a **Description**.
4. Select the **Organization Unit** the role belongs to.
5. Select the **Permissions** to include by choosing a resource server and its actions.
6. Optionally add **Assignments** to immediately assign the role to users, groups, applications, or agents.
7. Click **Create**.

## List Roles

Navigate to **Roles** in the ThunderID Console to view all roles. The list shows each role's name, description, and organization unit.

Roles created from declarative configuration are marked as read-only and cannot be modified or deleted.

## Update a Role

1. Open the role from the **Roles** list.
2. Update the **Name**, **Description**, or **Permissions**.
3. Click **Save**.

> **Warning**
>
> The update replaces the full set of permissions. Include every permission the role should keep — any permission omitted from the request is removed.


## Delete a Role

1. Open the role from the **Roles** list.
2. Click **Delete** and confirm.

> **Warning**
>
> Deletion fails if the role has active assignments. Remove all assignments before deleting the role.


## Manage Role Assignments

A role assignment grants the role's permissions to a principal. Principals can be users, groups, applications, or agents. When you assign a role to a group, all members of that group inherit the role's permissions.

| Assignee Type | Description |
|---------------|-------------|
| `user` | A user account. |
| `group` | A group. All current and future members inherit the role's permissions. |
| `app` | An application principal. |
| `agent` | An agent principal. |

### View Assignments

Open the role from the **Roles** list and select the **Assignments** tab to see all current assignments organized by type.

### Add Assignments

1. Open the role from the **Roles** list.
2. Select the **Assignments** tab.
3. Click **Add Assignments**.
4. Search for and select the users, groups, applications, or agents you want to assign.
5. Click **Add**.

### Remove Assignments

1. Open the role from the **Roles** list.
2. Select the **Assignments** tab.
3. Click **Remove** next to the assignment you want to delete and confirm.

## Related Guides

- [Resource Servers](https://thunderid.dev/docs/next/guides/resource-servers.md) - Define the permissions that roles reference
- [Groups](https://thunderid.dev/docs/next/guides/guides/manage-groups.md) - Assign roles to groups to grant permissions to all their members
- [Users](https://thunderid.dev/docs/next/guides/guides/manage-users.md) - Assign roles directly to individual users
- [Organization Units](https://thunderid.dev/docs/next/guides/organization-units.md) - Each role is scoped to an organization unit
