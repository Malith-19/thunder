# Authorization Code

# Authorization Code

The **Authorization Code** grant ([RFC 6749 §4.1](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1)) is the redirect-based flow OAuth 2.1 recommends for any application that signs in a real user. The client redirects the browser to ThunderID, the user authenticates on ThunderID-hosted pages, ThunderID redirects back with a short-lived authorization **code**, and the client exchanges that code for tokens at the token endpoint.

Authorization codes are single-use, bound to the redirect URI and client, and short-lived. They exist only to let a confidential client (or a public client using PKCE) collect tokens over a back-channel without exposing them to the browser.

## How It Works


<details>
<summary>How ThunderID Implements It</summary>

| Aspect | Behavior |
|---|---|
| Authorization endpoint | `GET /oauth2/authorize` |
| Token endpoint | `POST /oauth2/token` |
| Response type | `code` only (implicit and hybrid response types are not supported) |
| PKCE | **Required** for public clients (`publicClient: true`); recommended for confidential clients |
| Redirect URI matching | Exact match against the application's registered `redirect_uris` |
| Redirect URI at token endpoint | Required only when included in the authorization request ([RFC 6749 §4.1.3](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3)); identical value enforced when present |
| `state` parameter | Required by RFC 6749 §10.12 / OAuth 2.1 — the client must validate it on callback |
| `iss` in response | Always included (see [Issuer Identification](https://thunderid.dev/docs/next/guides/guides/protocols/issuer-identification.md)) |
| Code lifetime | Single-use, short TTL; binding to client + redirect_uri enforced on exchange |
| Refresh token | Issued when `refresh_token` is in the application's `grantTypes` |

</details>

## Try It in ThunderID

The Authorization Code grant is the default for newly registered applications. Confirm or enable it on your application.


**Console**


1. Open **Applications** or **Agents** in the ThunderID Console and select your client.
2. Open the **Advanced Settings** tab.
3. Under **Grant Types**, ensure `authorization_code` is selected (add `refresh_token` to issue refresh tokens alongside).
4. Add at least one **Redirect URI**.
5. Save.


**Dynamic Client Registration**


```http
POST /oauth2/dcr/register
Content-Type: application/json

{
  "client_name": "My App",
  "redirect_uris": ["https://app.example.com/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "client_secret_basic"
}
```


### Run the Flow

```bash
# 1. Redirect the user to the authorization endpoint
https://thunderid.example.com/oauth2/authorize
  ?response_type=code
  &client_id=$CLIENT_ID
  &redirect_uri=https://app.example.com/callback
  &scope=openid%20profile
  &state=xyz
  &code_challenge=$CODE_CHALLENGE
  &code_challenge_method=S256

# 2. After sign-in, the authorization server redirects to:
# https://app.example.com/callback?code=...&state=xyz&iss=https://thunderid.example.com

# 3. Exchange the code for tokens
curl -X POST https://thunderid.example.com/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d "grant_type=authorization_code" \
  -d "code=$CODE" \
  -d "redirect_uri=https://app.example.com/callback" \
  -d "code_verifier=$CODE_VERIFIER"
```

## Related Guides

- [PKCE](https://thunderid.dev/docs/next/guides/guides/protocols/pkce.md) — required for public clients on this flow
- [Pushed Authorization Requests](https://thunderid.dev/docs/next/guides/guides/protocols/par.md) — push the authorization parameters over a back-channel before the redirect
- [Refresh Token](https://thunderid.dev/docs/next/guides/guides/protocols/refresh-token.md) — keep the session alive without re-authenticating
- [OpenID Connect](https://thunderid.dev/docs/next/guides/guides/protocols/openid-connect.md) — add `openid` to the scope to receive an ID Token
- [Issuer Identification](https://thunderid.dev/docs/next/guides/guides/protocols/issuer-identification.md) — validate the `iss` parameter on the callback
