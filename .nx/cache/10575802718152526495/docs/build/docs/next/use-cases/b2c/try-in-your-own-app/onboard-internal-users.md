# Onboard Internal Users

# Onboard Internal Users

This walkthrough configures ThunderID so that an admin can invite staff members by email. When the invitee accepts, ThunderID provisions their account and attaches the right role automatically. The invitation and acceptance flow runs inside the ThunderID Console, so this walkthrough applies regardless of which solution pattern your consumer app uses.

:::info Background
[Onboard Internal Users](https://thunderid.dev/docs/next/use-cases/customer-identity.md#onboard-internal-users) covers the requirements story behind this use case.
:::

:::note Prerequisites
Configure SMTP so that ThunderID can send invitation emails. See [Email Configuration](https://thunderid.dev/docs/next/guides/getting-started/configuration.md#email-configuration), then restart ThunderID for the changes to take effect.
:::

## Configure ThunderID

**1. Create an internal user type**

Navigate to **User Types** → **Create User Type**. Define the schema for your staff accounts. At minimum:

| Attribute     | Type   | Notes                         |
| ------------- | ------ | ----------------------------- |
| `username`    | string | Required, unique              |
| `email`       | string | Required, unique              |
| `password`    | string | Credential                    |
| `displayName` | string | Captured on invitation accept |

See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

**2. Create staff roles**

Navigate to **Roles** → **Add Role** and create the roles your internal users need. Assign the permissions that match each role's access level in your application.

See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

**3. Build a user onboarding flow**

Build a `USER_ONBOARDING` flow that sends the invitation email and provisions the invitee with the correct role on acceptance. See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

Set `properties.assignRole` on the `ProvisioningExecutor` node to the ID of the role from step 2. If you have multiple staff roles, duplicate the invite/provision branch for each.

<details>
  <summary>Sample user onboarding flow</summary>

```json
{
  "handle": "staff-onboarding-flow",
  "name": "Staff Onboarding Flow",
  "flowType": "USER_ONBOARDING",
  "nodes": [
    ,
    {
      "id": "permission_validator",
      "type": "TASK_EXECUTION",
      "properties": ,
      "executor": ,
      "onSuccess": "user_type_resolver"
    },
    {
      "id": "user_type_resolver",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "prompt_email",
      "onIncomplete": "prompt_usertype"
    },
    {
      "id": "prompt_usertype",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          {
            "type": "BLOCK",
            "id": "block_usertype",
            "components": [
              ,

            ]
          }
        ]
      },
      "prompts": [
        {
          "inputs": [  ],
          "action":
        }
      ]
    },
    {
      "id": "prompt_email",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          {
            "type": "BLOCK",
            "id": "block_email",
            "components": [
              ,

            ]
          }
        ]
      },
      "prompts": [
        {
          "inputs": [  ],
          "action":
        }
      ]
    },
    {
      "id": "check_email_uniqueness",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "invite_generate",
      "onIncomplete": "prompt_email"
    },
    {
      "id": "invite_generate",
      "type": "TASK_EXECUTION",
      "executor": ,
      "onSuccess": "send_invite_email"
    },
    {
      "id": "send_invite_email",
      "type": "TASK_EXECUTION",
      "properties": ,
      "executor": ,
      "onSuccess": "email_invite_status",
      "onFailure": "email_invite_status"
    },
    {
      "id": "email_invite_status",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          ,

        ]
      },
      "message": "Invitation sent",
      "next": "invite_verify"
    },
    {
      "id": "invite_verify",
      "type": "TASK_EXECUTION",
      "inputs": [  ],
      "executor": ,
      "onSuccess": "provisioning"
    },
    {
      "id": "provisioning",
      "type": "TASK_EXECUTION",
      "properties": ,
      "executor": ,
      "onSuccess": "registration_complete",
      "onIncomplete": "prompt_user_details"
    },
    {
      "id": "prompt_user_details",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          {
            "type": "BLOCK",
            "id": "block_user_details",
            "components": [
              ,

            ]
          }
        ]
      },
      "prompts": [
         }
      ]
    },
    {
      "id": "registration_complete",
      "type": "PROMPT",
      "meta": {
        "components": [
          ,
          ,

        ]
      },
      "message": "Registration complete",
      "next": "end"
    },

  ]
}
```

</details>

**4. Activate the onboarding flow**

Point the `user_onboarding_flow_handle` at your flow handle in `deployment.yaml` and restart:

```yaml
flow:
  user_onboarding_flow_handle: "staff-onboarding-flow"
```

**5. Create an admin user**

Navigate to **Users** → **Add User**. Create a user with your internal user type and assign the role that grants admin permissions. This user will issue invitations from the ThunderID Console.

See [Manage Users](https://thunderid.dev/docs/next/guides/guides/users/manage-users.md).

## Try It Out

1. Sign in to the ThunderID Console at https://localhost:8090/console as the admin user you created.
2. Navigate to **Users** and select **Invite User**.
3. Select your internal user type and enter the invitee's email address. Send the invitation.
4. Open the invitation email in the invitee's inbox and click the link.
5. Fill in the required attributes (username, display name, password) and submit.
6. Verify that the new staff account appears in **Users** in the Console with the correct role attached.

## Going Deeper

- Want to understand how the staff user type and roles fit together? See [User Types](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#user-types) and [Roles](https://thunderid.dev/docs/next/use-cases/identity-concepts.md#roles) in Identity Concepts.
- Want to see this use case running against the Wayfinder sample? See [Onboard Internal Users — Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out/onboard-internal-users.md).
