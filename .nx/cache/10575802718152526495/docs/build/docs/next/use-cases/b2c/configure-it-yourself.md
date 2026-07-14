# Configure It Yourself

# Configure It Yourself

Use this page to build the Wayfinder setup manually instead of importing the declarative bundle from [Try It Out](https://thunderid.dev/docs/next/use-cases/try-it-out.md). Pick this path when you want to see exactly what gets created, adapt the setup to your own project, or learn the moving parts step by step.

The first section is the shared foundation, required regardless of which use cases you plan to exercise. The remaining three are independent and can be applied in any order.

- [Set Up the Foundation](#set-up-the-foundation): shared resources every walkthrough builds on.
- [Build the Registration Flow](#build-the-registration-flow): needed for [Self Sign-Up](https://thunderid.dev/docs/next/use-cases/try-it-out/self-sign-up.md).
- [Build the Account Recovery Flow](#build-the-account-recovery-flow): needed for [Account Recovery](https://thunderid.dev/docs/next/use-cases/try-it-out/account-recovery.md).
- [Set up Internal User Onboarding](#set-up-internal-user-onboarding): needed for [Onboard Internal Users](https://thunderid.dev/docs/next/use-cases/try-it-out/onboard-internal-users.md).

## Set Up the Foundation

These resources are shared by every B2C walkthrough.

1. **Create the `Customer` user type.**

   Navigate to **User Types** → **Create User Type**. Define the schema:

   | Attribute     | Type   | Properties          |
   | ------------- | ------ | ------------------- |
   | `username`    | string | Required, unique    |
   | `email`       | string | Required, unique    |
   | `password`    | string | Credential          |
   | `given_name`  | string | Optional            |
   | `family_name` | string | Optional            |
   | `sub`         | string | Optional            |

   See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

2. **Create the `wayfinder-booking` resource server.**

   Resource servers are managed through the Resource Management API. Create the resource server, the `booking` resource, and three actions in one call. The identifier is `http://localhost:8787/mcp` — a URL-shaped identifier per [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707), used by the AI agent / MCP Authorization tryouts to bind tokens to the MCP server's URL:

   ```bash
   curl -k -X POST https://localhost:8090/resource-servers \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Wayfinder Booking",
       "identifier": "http://localhost:8787/mcp",
       "delimiter": ":",
       "resources": [
         {
           "name": "Booking",
           "handle": "booking",
           "actions": [
             ,
             ,

           ]
         }
       ]
     }'
   ```

   This generates three permissions: `booking:read`, `booking:create`, and `booking:cancel`.

   See [Resource Servers](https://thunderid.dev/docs/next/guides/guides/resource-servers.md).

3. **Create the `Traveler` role.**

   Roles and their permissions are managed through the Role Management API. Create the role with the three `booking:*` permissions in one call. Replace `<default-ou-id>` with the ID of your default organization unit (look it up via `GET /organization-units`).

   ```bash
   curl -k -X POST https://localhost:8090/roles \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Traveler",
       "description": "Consumer role with full booking permissions",
       "ouId": "<default-ou-id>",
       "permissions": [
         {
           "resourceServerId": "http://localhost:8787/mcp",
           "permissions": ["booking:read", "booking:create", "booking:cancel"]
         }
       ]
     }'
   ```

   See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

4. **Register the `WAYFINDER` application.**

   Navigate to **Applications** → **Add Application** and choose **Browser App** as the type. Configure:

   | Setting             | Value                     |
   | ------------------- | ------------------------- |
   | Redirect URI        | `http://localhost:5173`        |
   | Allowed grants      | `authorization_code`      |
   | PKCE                | Required                  |
   | Allowed user types  | `Customer`                |

   See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

5. **Create John Doe as a `Customer`.**

   Navigate to **Users** → **Add User**. Select `Customer` as the user type and click **Create User**. Fill in the schema attributes (`username: john.doe`, `email: john.doe@example.com`, password: `john.doe`) and complete the user creation.

   Navigate to **Roles** → open the `Traveler` role → **Assignments** tab. Click **Add** and select John to assign the role.

   See [Manage Users](https://thunderid.dev/docs/next/guides/guides/users/manage-users.md).

## Build the Registration Flow

The registration flow drives [Self Sign-Up](https://thunderid.dev/docs/next/use-cases/try-it-out/self-sign-up.md). It:

- Resolves the user type (prompts the new user to pick one if the application allows multiple).
- Prompts for username and password.
- Runs credentials-auth and provisioning, with `properties.assignRole` set to attach the `Traveler` role automatically.
- Prompts for any remaining required schema attributes (rendered dynamically from the user type).
- Ends on a confirmation screen with a link back to the application, where the user can sign in with their new credentials.

1. Save the JSON below as `wayfinder-registration-flow.json` and POST it to the flows API:

   ```bash
   curl -k -X POST https://localhost:8090/flows \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @wayfinder-registration-flow.json
   ```

   <details>
   <summary>wayfinder-registration-flow.json</summary>

   ```json
   {
     "handle": "wayfinder-registration-flow",
     "name": "Wayfinder Registration Flow",
     "flowType": "REGISTRATION",
     "nodes": [
       ,
       {
         "id": "user_type_resolver",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "prompt_credentials",
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
         "id": "prompt_credentials",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             {
               "type": "BLOCK",
               "id": "block_credentials",
               "components": [
                 ,
                 ,

               ]
             }
           ]
         },
         "prompts": [
           {
             "inputs": [
               ,

             ],
             "action":
           }
         ]
       },
       {
         "id": "credentials_auth",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "provisioning"
       },
       {
         "id": "provisioning",
         "type": "TASK_EXECUTION",
         "properties": ,
         "executor": {
           "name": "ProvisioningExecutor",
           "inputs": [
             ,

           ]
         },
         "onSuccess": "registration_complete",
         "onIncomplete": "prompt_schema_attrs"
       },
       {
         "id": "prompt_schema_attrs",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             {
               "type": "BLOCK",
               "id": "block_dynamic_user_inputs",
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
             ,
             {
               "type": "STACK",
               "id": "registration_complete_link_stack",
               "category": "BLOCK",
               "align": "center",
               "direction": "row",
               "justify": "center",
               "gap": 2,
               "items": 1,
               "resourceType": "ELEMENT",
               "components": [
                 }\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"rich-text-link\">Go to Wayfinder</a></h3>" }
               ]
             }
           ]
         },
         "message": "Registration complete",
         "next": "end"
       },

     ]
   }
   ```

   </details>

   Replace `wayfinder-traveler-role` with the ID of the `Traveler` role you created above if it differs.

   See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

2. Go to **Applications** → **WAYFINDER** → **Flows** and select the registration flow you just created from the **Registration Flow** dropdown. Save the application.

   See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

## Build the Account Recovery Flow

The recovery flow drives [Account Recovery](https://thunderid.dev/docs/next/use-cases/try-it-out/account-recovery.md). It:

- Prompts the user for a username.
- Identifies the user.
- Generates a recovery token.
- Sends the recovery email.
- Verifies the token from the email link.
- Lands the user on a **Set new password** screen and updates the credential.

SMTP must be configured for recovery emails to reach the user. See [Configure SMTP Server](https://thunderid.dev/docs/guides/guides/smtp-server/smtp-server-configuration.md) for setup instructions. This is required regardless of which path you chose.

1. Save the JSON below as `wayfinder-recovery-flow.json` and POST it to the flows API:

   ```bash
   curl -k -X POST https://localhost:8090/flows \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @wayfinder-recovery-flow.json
   ```

   <details>
   <summary>wayfinder-recovery-flow.json</summary>

   ```json
   {
     "handle": "wayfinder-recovery-flow",
     "name": "Wayfinder Password Recovery Flow",
     "flowType": "RECOVERY",
     "nodes": [
       ,
       {
         "id": "prompt_username",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             ,
             {
               "type": "BLOCK",
               "id": "block_username",
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
         "id": "identify_user",
         "type": "TASK_EXECUTION",
         "executor": {
           "name": "IdentifyingExecutor",
           "mode": "identify",
           "inputs": [  ]
         },
         "onSuccess": "generate_recovery_token",
         "onFailure": "email_sent_status"
       },
       {
         "id": "generate_recovery_token",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "send_recovery_email"
       },
       {
         "id": "send_recovery_email",
         "type": "TASK_EXECUTION",
         "properties": ,
         "executor": ,
         "onSuccess": "email_sent_status",
         "onFailure": "email_sent_status"
       },
       {
         "id": "email_sent_status",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             ,

           ]
         },
         "message": "Check Your Email",
         "next": "verify_recovery_token"
       },
       {
         "id": "verify_recovery_token",
         "type": "TASK_EXECUTION",
         "executor": {
           "name": "InviteExecutor",
           "mode": "verify",
           "inputs": [  ]
         },
         "onSuccess": "prompt_new_password"
       },
       {
         "id": "prompt_new_password",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             {
               "type": "BLOCK",
               "id": "block_password",
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
         "id": "set_credential",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "recovery_complete"
       },
       {
         "id": "recovery_complete",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             ,

           ]
         },
         "message": "Password Reset Successful",
         "next": "end"
       },

     ]
   }
   ```

   </details>

   See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

2. Go to **Applications** → **WAYFINDER** → **Flows** and select the recovery flow you just created from the **Recovery Flow** dropdown. Save the application.

   See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

## Set up Internal User Onboarding

These resources drive [Onboard Internal Users](https://thunderid.dev/docs/next/use-cases/try-it-out/onboard-internal-users.md).

1. **Create the `Staff` user type.** Navigate to **User Types** → **Create User Type**. Define the schema:

   | Attribute     | Type   | Notes                            |
   | ------------- | ------ | -------------------------------- |
   | `username`    | string | Required, unique                 |
   | `email`       | string | Required, unique                 |
   | `password`    | string | Credential                       |
   | `displayName` | string | Captured on invitation accept    |

   See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

2. **Create the staff roles.** Navigate to **Roles** → **Add Role**. Add the three staff roles:

   | Role                | Purpose                          |
   | ------------------- | -------------------------------- |
   | `Support`           | Consumer support workflows       |
   | `DestinationsAdmin` | Curate featured destinations     |
   | `OpsAdmin`          | Invite and manage other staff    |

   See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

3. **Create the user onboarding flow.** Save the JSON below as `wayfinder-onboarding-flow.json` and POST it to the flows API. The flow validates admin permission, resolves the user type, prompts for the staff role (Support or DestinationsAdmin), collects the invitee's email, sends the invitation, and on accept provisions the new user with the matching role attached via `properties.assignRole`.

   ```bash
   curl -k -X POST https://localhost:8090/flows \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @wayfinder-onboarding-flow.json
   ```

   <details>
   <summary>wayfinder-onboarding-flow.json</summary>

   ```json
   {
     "handle": "wayfinder-onboarding-flow",
     "name": "Wayfinder Staff Onboarding Flow",
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
         "onSuccess": "prompt_staff_role",
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
         "id": "prompt_staff_role",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             ,
             {
               "type": "BLOCK",
               "id": "block_staff_role_actions",
               "components": [
                 {
                   "type": "STACK",
                   "id": "stack_staff_role_actions",
                   "direction": "row",
                   "justify": "center",
                   "components": [
                     ,

                   ]
                 }
               ]
             }
           ]
         },
         "prompts": [
            },
            }
         ]
       },
       {
         "id": "prompt_email_support",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             {
               "type": "BLOCK",
               "id": "block_email_s",
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
         "id": "check_email_uniqueness_support",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "invite_generate_support",
         "onIncomplete": "prompt_email_support"
       },
       {
         "id": "invite_generate_support",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "send_invite_email_support"
       },
       {
         "id": "send_invite_email_support",
         "type": "TASK_EXECUTION",
         "properties": ,
         "executor": ,
         "onSuccess": "email_invite_status_support",
         "onFailure": "email_invite_status_support"
       },
       {
         "id": "email_invite_status_support",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             ,

           ]
         },
         "message": "Invitation sent",
         "next": "invite_verify_support"
       },
       {
         "id": "invite_verify_support",
         "type": "TASK_EXECUTION",
         "inputs": [  ],
         "executor": ,
         "onSuccess": "provisioning_support"
       },
       {
         "id": "provisioning_support",
         "type": "TASK_EXECUTION",
         "properties": ,
         "executor": ,
         "onSuccess": "registration_complete",
         "onIncomplete": "prompt_user_details_support"
       },
       {
         "id": "prompt_user_details_support",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             {
               "type": "BLOCK",
               "id": "block_user_details_s",
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
         "id": "prompt_email_destinations",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             {
               "type": "BLOCK",
               "id": "block_email_d",
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
         "id": "check_email_uniqueness_destinations",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "invite_generate_destinations",
         "onIncomplete": "prompt_email_destinations"
       },
       {
         "id": "invite_generate_destinations",
         "type": "TASK_EXECUTION",
         "executor": ,
         "onSuccess": "send_invite_email_destinations"
       },
       {
         "id": "send_invite_email_destinations",
         "type": "TASK_EXECUTION",
         "properties": ,
         "executor": ,
         "onSuccess": "email_invite_status_destinations",
         "onFailure": "email_invite_status_destinations"
       },
       {
         "id": "email_invite_status_destinations",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             ,

           ]
         },
         "message": "Invitation sent",
         "next": "invite_verify_destinations"
       },
       {
         "id": "invite_verify_destinations",
         "type": "TASK_EXECUTION",
         "inputs": [  ],
         "executor": ,
         "onSuccess": "provisioning_destinations"
       },
       {
         "id": "provisioning_destinations",
         "type": "TASK_EXECUTION",
         "properties": ,
         "executor": ,
         "onSuccess": "registration_complete",
         "onIncomplete": "prompt_user_details_destinations"
       },
       {
         "id": "prompt_user_details_destinations",
         "type": "PROMPT",
         "meta": {
           "components": [
             ,
             {
               "type": "BLOCK",
               "id": "block_user_details_d",
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

   Replace `wayfinder-support-role-id` and `wayfinder-destinations-admin-role-id` with the IDs of the `Support` and `DestinationsAdmin` roles you created in step 2.

   See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

4. ThunderID permits one `USER_ONBOARDING` flow at a time, selected by handle in `deployment.yaml`. Point it at your flow and restart:

   ```yaml
   flow:
     user_onboarding_flow_handle: "wayfinder-onboarding-flow"
   ```

5. **Create Alex Carter as a `Staff` user** with the `OpsAdmin` role so he can issue invitations. Navigate to **Users** → **Add User**.

   See [Manage Users](https://thunderid.dev/docs/next/guides/guides/users/manage-users.md).
