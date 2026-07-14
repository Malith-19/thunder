# Pushed Authorization Requests (PAR)

# Pushed Authorization Requests (PAR)

**Pushed Authorization Requests** ([RFC 9126](https://datatracker.ietf.org/doc/html/rfc9126)) let a client send authorization parameters to ThunderID over a direct, authenticated back-channel **before** redirecting the user's browser to `/oauth2/authorize`. ThunderID stores the parameters and returns an opaque `request_uri` that the client uses in the redirect.

PAR removes sensitive parameters (`scope`, `redirect_uri`, `state`, `claims`, `resource`, `code_challenge`) from the browser URL and from any intermediate logs. It also lets ThunderID reject tampered authorization requests at the source — once a request is pushed, the only thing that can travel through the front-channel is the opaque `request_uri`.

## How It Works


<details>
<summary>How ThunderID Implements It</summary>

| Aspect | Behavior |
|---|---|
| Endpoint | `POST /oauth2/par` |
| Client authentication | Required — same method as `/oauth2/token` (see [Client Authentication Methods](https://thunderid.dev/docs/next/guides/guides/protocols/client-authentication-methods.md)) |
| Request lifetime | The returned `request_uri` is single-use and expires after a short TTL |
| `request_uri` format | `urn:ietf:params:oauth:request_uri:<opaque>` |
| Per-application enforcement | `requirePushedAuthorizationRequests: true` on the application requires PAR for every authorization request |
| Global enforcement | `oauth.par.require_par: true` in `deployment.yaml` requires PAR for every client |
| DPoP interaction | When DPoP is in use, a DPoP proof on the PAR request binds the resulting authorization code to the proof's public key |
| Failure mode | Direct `GET /oauth2/authorize` requests without a `request_uri` are rejected with `invalid_request` when PAR is required |

When both the global flag and the per-application flag are set, the per-application flag adds enforcement on top — there is no way to opt **out** of a globally required PAR.

</details>

## Try It in ThunderID

### Enable per Application (Console)

1. Open **Applications** or **Agents** in the ThunderID Console and select your client.
2. Open the **Advanced Settings** tab.
3. Toggle **Require Pushed Authorization Requests** on.
4. Save.

### Enable per Application (DCR)

```http
POST /oauth2/dcr/register
Content-Type: application/json

{
  "client_name": "My App",
  "redirect_uris": ["https://app.example.com/callback"],
  "grant_types": ["authorization_code"],
  "response_types": ["code"],
  "require_pushed_authorization_requests": true
}
```

### Enable Globally (deployment.yaml)

```yaml
oauth:
  par:
    require_par: true
```

### Push and Redirect

```bash
# 1. Push the request
curl -X POST https://thunderid.example.com/oauth2/par \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d "response_type=code" \
  -d "client_id=$CLIENT_ID" \
  -d "redirect_uri=https://app.example.com/callback" \
  -d "scope=openid profile" \
  -d "state=xyz" \
  -d "code_challenge=$CODE_CHALLENGE" \
  -d "code_challenge_method=S256"
```

Response:

```json
{
  "request_uri": "urn:ietf:params:oauth:request_uri:abc123...",
  "expires_in": 60
}
```

```http
# 2. Redirect the user
GET /oauth2/authorize
  ?client_id=$CLIENT_ID
  &request_uri=urn:ietf:params:oauth:request_uri:abc123...
```

## Related Guides

- [Authorization Code](https://thunderid.dev/docs/next/guides/guides/protocols/authorization-code.md) — the flow PAR fronts
- [PKCE](https://thunderid.dev/docs/next/guides/guides/protocols/pkce.md) — `code_challenge` is pushed inside the PAR request
- [DPoP](https://thunderid.dev/docs/next/guides/guides/protocols/dpop.md) — pushing the PAR request with a DPoP proof binds the auth code
- [Client Authentication Methods](https://thunderid.dev/docs/next/guides/guides/protocols/client-authentication-methods.md) — required on the PAR endpoint
