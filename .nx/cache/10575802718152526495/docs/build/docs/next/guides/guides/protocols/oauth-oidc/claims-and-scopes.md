# Claims & Scopes

# Claims & Scopes

A **scope** is what a client *asks for*. A **claim** is what ThunderID *returns*. The mapping between the two is what controls which user attributes end up in your ID Token and your UserInfo response.

ThunderID implements three layers:

1. **Standard OIDC scopes** ([OIDC Core §5.4](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)) — `openid`, `profile`, `email`, `phone`, `address` — with fixed claim sets defined by the spec.
2. **Application-defined scope-to-claim mappings** (`scopeClaims`) — request a scope, get a configurable bundle of claims.
3. **The `claims` request parameter** ([OIDC Core §5.5](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)) — request specific claims directly, claim-by-claim.

## Standard OIDC Scopes

| Scope | Claims returned |
|---|---|
| `openid` | `sub` (always included on any OIDC request) |
| `profile` | `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, `updated_at` |
| `email` | `email`, `email_verified` |
| `phone` | `phone_number`, `phone_number_verified` |
| `address` | `address` (structured JSON object) |

The actual values come from the authenticated user's attributes — claims are omitted when the user has no value for them.

## Custom Scope-to-Claim Mapping (`scopeClaims`)

Each application can define its own scope-to-claim bundles. Asking for the scope returns the listed claims in both the ID Token and the UserInfo response.

```json
{
  "scopeClaims": {
    "profile": ["given_name", "family_name", "picture"],
    "email": ["email", "email_verified"],
    "roles": ["roles", "groups"]
  }
}
```

| Behavior | Detail |
|---|---|
| Overrides the standard mapping | Yes — `profile` here returns only the three listed claims, not the full OIDC `profile` set |
| Custom scope names | Allowed — `roles` here is an application-defined scope |
| Scope not in `scopeClaims` | Returns no extra claims (but the scope still passes through to access tokens) |
| Bypasses resource-server filtering | Yes — see "Filtering rules" below |

## `claims` Request Parameter

Sometimes you want exactly one claim, not a whole scope's bundle. Pass a JSON object on the authorization request:

```http
GET /oauth2/authorize
  ?response_type=code
  &client_id=$CLIENT_ID
  &scope=openid
  &claims=},"userinfo":}
```

| Sub-object | Targets |
|---|---|
| `claims.id_token` | Claims to include in the ID Token |
| `claims.userinfo` | Claims to include in the UserInfo response |

Inside each sub-object, claim names map to either `null` (request without constraint) or an object such as `` (request and mark as required).

ThunderID advertises `claims_parameter_supported: true` in [Server Metadata](https://thunderid.dev/docs/next/guides/guides/protocols/server-metadata.md).

## Filtering Rules

How the request-time scope list becomes the issued-token scope list:

| Scope category | Filtered by resource indicators? | Notes |
|---|---|---|
| `openid`, `profile`, `email`, `phone`, `address` | ❌ Always kept | OIDC standard scopes are reserved and pass through unchanged |
| Custom scopes covered by `scopeClaims` | ❌ Always kept | The application owns these |
| Permissions owned by a targeted resource server (see [Resource Indicators](https://thunderid.dev/docs/next/guides/guides/protocols/resource-indicators.md)) | ✅ Kept | RS-defined |
| Permissions owned by a different resource server | ❌ Dropped silently | RS-defined |
| Permissions not allowed on the application | ❌ Rejected | Request fails with `invalid_scope` |

## Try It in ThunderID


**Console**


1. Open **Applications** or **Agents** in the ThunderID Console and select your client.
2. Open the **Token** tab to list the allowed scopes and to define custom scope-to-claim mappings.
3. Save.


**Dynamic Client Registration**


```http
POST /oauth2/dcr/register
Content-Type: application/json

{
  "client_name": "My App",
  "redirect_uris": ["https://app.example.com/callback"],
  "grant_types": ["authorization_code"],
  "response_types": ["code"],
  "scope": "openid profile email roles"
}
```

The `scopeClaims` mapping is configured on the application object itself, alongside the `scopes` allowlist.


## Related Guides

- [OpenID Connect](https://thunderid.dev/docs/next/guides/guides/protocols/openid-connect.md) — the spec that defines standard scopes and the `claims` parameter
- [UserInfo](https://thunderid.dev/docs/next/guides/guides/protocols/userinfo.md) — receives the same claim set as the ID Token
- [Resource Indicators](https://thunderid.dev/docs/next/guides/guides/protocols/resource-indicators.md) — how scopes are filtered by targeted resource servers
- [Token Formats](https://thunderid.dev/docs/next/guides/guides/protocols/token-formats.md) — `userAttributes` selection on access and ID tokens
