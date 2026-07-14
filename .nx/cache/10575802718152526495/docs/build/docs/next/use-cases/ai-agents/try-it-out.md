# Try It Out

# Try It Out

Each walkthrough on this page runs one of the agent identity patterns from [Identity for AI Agents](https://thunderid.dev/docs/next/use-cases/overview.md) against a working sample.

## Meet Wayfinder

Wayfinder is a travel-booking application with an AI agent built in — the **Wayfinder Concierge**, an in-app chat assistant. Through Wayfinder, consumers search for flights and hotels, book trips, and ask the Concierge to do the same on their behalf.

Wayfinder has two principals you'll meet in these walkthroughs: consumers who book travel and chat with the agent, and the **Wayfinder Concierge** that acts as their assistant. Each carries its own identity in ThunderID.


### Meet the Cast

- **Consumers** book travel and chat with the agent.
  - **John Doe** is the customer with full access. He can book through the UI *and* talk to the Wayfinder Concierge. He carries both the `Booking User` and `Chat User` roles.
  - **Jane Smith** also books through the UI, but does not have access to the Wayfinder Concierge. She carries only the `Booking User` role.
- **The Wayfinder Concierge** is a first-class principal in ThunderID with its own credentials. It uses its own identity for browsing tools, and switches to a user-context token when a tool needs the consumer's consent.

## Sample Architecture

Wayfinder runs as three deployable pieces. The **Wayfinder Web** browser app hosts the chat widget, the **AI Agent** drives the conversation, and the **Wayfinder Server** exposes booking data over MCP.

ThunderID sits alongside as the identity authority. It issues a user token on sign-in, an M2M token for the agent itself, and an on-behalf-of (OBO) token when the agent acts for the consumer. The Wayfinder Server also fetches ThunderID's JWKS to validate every incoming JWT.


## Identity Model

The setup below creates a set of ThunderID resources. Here is what each one is and how it maps to Wayfinder concepts.

### Organization

ThunderID can host many isolated tenants. Wayfinder needs only one, so everything lives in a single organization.

### User Types

A user type defines who can exist in the system and what attributes they carry. Each user record belongs to exactly one user type. Wayfinder defines a `Customer` user type for the two demo consumers — John Doe and Jane Smith — with standard attributes like username, email, and name.

See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

### Resources and Permissions

The **AI Agent API** and the **Wayfinder Server** both need protection in the sample. The AI Agent API decides who is allowed to chat with the agent at all, and the Wayfinder Server decides who can book travel. Each is registered as a resource server, with its actions generating one permission per action.

A **resource server** groups the APIs of one backend. Each resource server defines one or more **resources**, each resource defines **actions**, and ThunderID automatically generates a **permission** of the form `<resource>:<action>` for every action.

```
wayfinder-agent                         (Resource Server)
└── agent                               (Resource)
    └── access     →  agent:access      (Permission)

booking-api                             (Resource Server)
└── booking                             (Resource)
    ├── read       →  booking:read      (Permission)
    ├── create     →  booking:create
    ├── cancel     →  booking:cancel
    └── recommend  →  booking:recommend
```

Permissions are issued to the access tokens. See [Resource Servers](https://thunderid.dev/docs/next/guides/guides/resource-servers.md).

### Roles

A role bundles permissions for a class of principal. A user's or agent's effective permissions are the union of permissions across their roles. Wayfinder defines three roles:

- `Chat User`: grants `agent:access`, the permission required to talk to the Wayfinder Concierge.
- `Booking User`: grants `booking:read`, `booking:create`, and `booking:cancel` for booking travel through the UI.
- `Recommender`: grants `booking:recommend`, the permission the Wayfinder Concierge needs to surface flight recommendations on its own.

John Doe carries both user roles; Jane Smith carries only `Booking User`. The `Recommender` role is assigned to the `WAYFINDER-CONCIERGE` agent, not to a user.

See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

### Application

An application is the OAuth2 client that ThunderID issues tokens to. Wayfinder Web is registered as `WAYFINDER` — a public, PKCE-enforced browser client.

See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

### Agent

An agent is a first-class non-human principal in ThunderID with its own credentials. The Wayfinder Concierge is registered as `WAYFINDER-CONCIERGE`, with two grants enabled:

- `client_credentials` — for the agent's own M2M token, used to call browsing tools.
- `authorization_code` (with PKCE) — for the on-behalf-of flow, where the user consents and the agent calls mutating tools as the user.

See [Manage Agents](https://thunderid.dev/docs/next/guides/guides/agents/manage-agents.md) and [Agent Authentication](https://thunderid.dev/docs/next/guides/guides/agents/agent-authentication.md).

### Flows

A flow is the sequence of steps a user moves through when signing in or granting consent. Wayfinder Web uses the bundled `default-basic-flow` for sign-in. The agent uses a separate **Wayfinder Agent Authentication Flow** that drives the OBO consent screen.

See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

## Setup

Complete the setup once. Every walkthrough below builds on the same starting point.

The two tabs below offer the same end state through different paths.

- **Quick Start** imports a single bundle that creates every resource the walkthroughs share — including the agent.
- **Configure It Yourself** creates the same resources manually so you can see how each one is made.

Before you begin, make sure you have:

- ThunderID running locally, with `http://localhost:5173` added to `cors.allowed_origins` in `backend/cmd/server/deployment.yaml` so the web app can call ThunderID from the browser. Keep existing entries and restart ThunderID after the change. See [Get ThunderID](https://thunderid.dev/docs/next/guides/getting-started/get-thunderid.md).

  ```yaml
  cors:
    allowed_origins:
      - "http://localhost:5173"
  ```

- The Wayfinder sample distribution. The [Get ThunderID](https://thunderid.dev/docs/next/guides/getting-started/get-thunderid.md) step above already pulls the archive that ships it. It contains a `thunderid-config/` directory with an importable YAML config and a `thunderid.env` file, plus the Wayfinder web frontend and the Concierge services.
- **Node.js 20+** for running the sample's services.
- **An LLM API key.** One of an Anthropic API key from [console.anthropic.com](https://console.anthropic.com) or a Google Gemini API key from [aistudio.google.com](https://aistudio.google.com).


**Quick Start**


Import the Wayfinder configuration bundle.

1. **Edit `thunderid-config/thunderid.env`** if you want to change the agent's client secret. The default value (`wayfinder-agent-secret`) matches the sample's defaults.

2. **Import the bundle into ThunderID.**

   - Sign in to the ThunderID Console at [https://localhost:8090/console](https://localhost:8090/console).
   - On first sign-in, a welcome screen appears with an **Open** button. (Later, reach the same screen from the user profile menu in the top-right corner of the Console.)
   - Click **Open** and select your `thunderid-config/thunderid-config.yaml` file from the sample distribution.
   - Select your `thunderid-config/thunderid.env` file to provide the environment variables referenced in the YAML.
   - The Console imports the files and reports the resources it created when the import completes.

   The import creates:

   - **Resource servers:** `wayfinder-agent` (with `agent:access`) and `booking-api` (with `booking:read`, `booking:create`, `booking:cancel`, `booking:recommend`).
   - **Roles:** `Chat User`, `Booking User`, and `Recommender`, with users and the agent pre-assigned:
     - `Chat User` → `john.doe`.
     - `Booking User` → `john.doe` and `jane.smith`.
     - `Recommender` → `WAYFINDER-CONCIERGE`.
   - **Application:** `WAYFINDER` (public, PKCE, redirect to `http://localhost:5173`).
   - **Agent:** `WAYFINDER-CONCIERGE` (confidential client with `client_credentials` + `authorization_code` grants).
   - **Flow:** `Wayfinder Agent Authentication Flow` (assigned to the agent).
   - **Users:** `john.doe` / `john.doe` and `jane.smith` / `jane.smith` (typed as `Customer`).

3. **Start the sample** following the commands in its README.


**Configure It Yourself**


Create every resource manually in the ThunderID console.

1. **Create the `wayfinder-agent` resource server.**

   Invoke the **Resource Management API** to create the resource server. Set the identifier to `wayfinder-agent`. Replace `<organization-unit-id>` with the ID of your default organization unit (look it up via `GET /organization-units`):

   ```bash
   curl -kL -X POST https://localhost:8090/resource-servers \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d '{
       "name": "Wayfinder Agent",
       "description": "Controls access to the Wayfinder Concierge agent",
       "identifier": "wayfinder-agent",
       "ouId": "<organization-unit-id>",
       "delimiter": ":"
     }'
   ```

   Add a resource with handle `agent` under it:

   ```bash
   curl -kL -X POST https://localhost:8090/resource-servers/<wayfinder-agent-rs-id>/resources \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d ''
   ```

   Then add one action under the resource:

   ```bash
   curl -kL -X POST https://localhost:8090/resource-servers/<wayfinder-agent-rs-id>/resources/<agent-resource-id>/actions \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d ''
   ```

   | Action   | Generated permission |
   | -------- | -------------------- |
   | `access` | `agent:access`       |

   See [Resource Servers](https://thunderid.dev/docs/next/guides/guides/resource-servers.md).

2. **Create the `booking-api` resource server.**

   Invoke the **Resource Management API** again. Set the identifier to `booking-api`:

   ```bash
   curl -kL -X POST https://localhost:8090/resource-servers \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d '{
       "name": "Booking API",
       "description": "Controls booking operations in the Wayfinder Travel API",
       "identifier": "booking-api",
       "ouId": "<organization-unit-id>",
       "delimiter": ":"
     }'
   ```

   Add a resource with handle `booking`:

   ```bash
   curl -kL -X POST https://localhost:8090/resource-servers/<booking-api-rs-id>/resources \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d ''
   ```

   Then add four actions under the resource — repeat the call below for each handle (`read`, `create`, `cancel`, `recommend`):

   ```bash
   curl -kL -X POST https://localhost:8090/resource-servers/<booking-api-rs-id>/resources/<booking-resource-id>/actions \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d ''
   ```

   | Action      | Generated permission |
   | ----------- | -------------------- |
   | `read`      | `booking:read`       |
   | `create`    | `booking:create`     |
   | `cancel`    | `booking:cancel`     |
   | `recommend` | `booking:recommend`  |

3. **Create the `Chat User` role.**

   Send a `POST` to `/roles`. The role grants `agent:access` on the `wayfinder-agent` resource server:

   ```bash
   curl -kL -X POST https://localhost:8090/roles \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d '{
       "name": "Chat User",
       "description": "Grants access to use the Wayfinder Concierge agent",
       "ouId": "<organization-unit-id>",
       "permissions": [
         {
           "resourceServerId": "<wayfinder-agent-rs-id>",
           "permissions": ["agent:access"]
         }
       ]
     }'
   ```

4. **Create the `Booking User` role.**

   Grant it `booking:read`, `booking:create`, and `booking:cancel` on `booking-api`:

   ```bash
   curl -kL -X POST https://localhost:8090/roles \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d '{
       "name": "Booking User",
       "description": "Grants booking permissions for the Wayfinder sample",
       "ouId": "<organization-unit-id>",
       "permissions": [
         {
           "resourceServerId": "<booking-api-rs-id>",
           "permissions": ["booking:read", "booking:create", "booking:cancel"]
         }
       ]
     }'
   ```

5. **Create the `Recommender` role.**

   Grant it `booking:recommend` on `booking-api`. This role will be assigned to the Wayfinder Concierge, not to a user:

   ```bash
   curl -kL -X POST https://localhost:8090/roles \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer <access-token>' \
     -d '{
       "name": "Recommender",
       "description": "Grants the booking:recommend permission to the Wayfinder Concierge",
       "ouId": "<organization-unit-id>",
       "permissions": [
         {
           "resourceServerId": "<booking-api-rs-id>",
           "permissions": ["booking:recommend"]
         }
       ]
     }'
   ```

   See [Authorization](https://thunderid.dev/docs/next/guides/key-concepts/authorization.md).

6. **Create the `Customer` user type.**

   Navigate to **User Types** → **Add User Type**. Name it `Customer` and define the schema with the attributes the agent needs to issue claims for:

   | Attribute     | Type   | Required | Notes                                  |
   | ------------- | ------ | -------- | -------------------------------------- |
   | `username`    | string | Yes      | Unique                                 |
   | `password`    | string | No       | Marked as a credential                 |
   | `email`       | string | Yes      | Unique                                 |
   | `given_name`  | string | No       |                                        |
   | `family_name` | string | No       |                                        |

   See [User Types](https://thunderid.dev/docs/next/guides/guides/users/user-types.md).

7. **Create the two demo users.**

   Navigate to **Users** → **Add User**. Select the `Customer` user type and create:

   | Username     | Password     |
   | ------------ | ------------ |
   | `john.doe`   | `john.doe`   |
   | `jane.smith` | `jane.smith` |

   See [Manage Users](https://thunderid.dev/docs/next/guides/guides/users/manage-users.md).

8. **Assign user roles.**

   - **Roles** → **Chat User** → **Assignments** tab → **Add Assignment**. Pick **User** and assign `john.doe`.
   - **Roles** → **Booking User** → **Assignments** tab → **Add Assignment**. Pick **User** and assign both `john.doe` and `jane.smith`.

9. **Register the `WAYFINDER` application.**

   Navigate to **Applications** → **Add Application** and choose **Browser App** as the type. Configure:

   | Setting             | Value                                          |
   | ------------------- | ---------------------------------------------- |
   | Client ID           | `WAYFINDER`                                    |
   | Redirect URI        | `http://localhost:5173`                        |
   | Allowed grants      | `authorization_code`, `refresh_token`          |
   | PKCE                | Required                                       |
   | Allowed user types  | `Customer`                                     |

   See [Manage Applications](https://thunderid.dev/docs/next/guides/guides/applications/manage-applications.md).

10. **Register the `WAYFINDER-CONCIERGE` agent.**

   Navigate to **Agents** → **Add Agent**. Name the agent `WAYFINDER-CONCIERGE`, then:

   - **Capture the client secret.** ThunderID prints it only once. You will use it in `ai-agent/.env`.
   - Under **Protocol** settings, enable the **Authorization Code** grant. Client Credentials is on by default for agents.
   - Add the redirect URI `http://localhost:5173/agent-callback`.
   - Under `accessToken.userAttributes`, add `given_name`, `family_name`, `email`, `groups`.

   See [Manage Agents](https://thunderid.dev/docs/next/guides/guides/agents/manage-agents.md) and [Agent Authentication](https://thunderid.dev/docs/next/guides/guides/agents/agent-authentication.md).

11. **Assign the `Recommender` role to the agent.**

    With the agent created, complete the role assignment:

    - **Roles** → **Recommender** → **Assignments** tab → **Add Assignment**. Pick **Agent** and assign `WAYFINDER-CONCIERGE`.

12. **Create the `Wayfinder Agent Authentication Flow`.**

    Navigate to **Flows** and create a flow that authenticates the user with username and password, then shows a consent screen listing the `booking:*` permissions the agent is requesting. Attach the flow to the `WAYFINDER-CONCIERGE` agent.

    See [Build a Flow](https://thunderid.dev/docs/next/guides/guides/flows/build-a-flow.md).

13. **Start the sample** following the commands in its README, passing the agent client secret you captured in step 10.


## Walkthrough Structure

Each walkthrough below starts from the setup above. The walkthroughs map onto the patterns from [Identity for AI Agents](https://thunderid.dev/docs/next/use-cases/overview.md), so you can read about a pattern and then run it.

Select a walkthrough to begin:

- [Protect the Agent](https://thunderid.dev/docs/next/use-cases/ai-agents/protect-the-agent.md)
- [Acting on Its Own](https://thunderid.dev/docs/next/use-cases/ai-agents/act-on-its-own.md)
- [Acting on Behalf of a User](https://thunderid.dev/docs/next/use-cases/ai-agents/act-on-behalf-of-user.md)
