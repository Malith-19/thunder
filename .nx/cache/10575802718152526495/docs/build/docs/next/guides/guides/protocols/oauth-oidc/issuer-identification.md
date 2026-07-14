# Issuer Identification

# Issuer Identification

**OAuth 2.0 Authorization Server Issuer Identification** ([RFC 9207](https://datatracker.ietf.org/doc/html/rfc9207)) adds an `iss` parameter to every authorization response. Clients that talk to more than one authorization server can use it to verify that the authorization code they just received actually came from the authorization server they redirected the user to. This defeats the "mix-up" class of attack, where an attacker tricks a client into delivering a code minted by Server A to Server B.

OAuth 2.1 incorporates RFC 9207 as recommended behavior. ThunderID always includes the parameter; there is nothing to enable.

## How It Works

Every successful authorization response includes `iss` alongside `code` and `state`:

```http
HTTP/1.1 302 Found
Location: https://app.example.com/callback
  ?code=SplxlOBeZQQYbYS6WxSbIA
  &state=xyz
  &iss=https://thunderid.example.com
```

The same parameter appears on error responses too:

```http
HTTP/1.1 302 Found
Location: https://app.example.com/callback
  ?error=access_denied
  &state=xyz
  &iss=https://thunderid.example.com
```

Discovery (`/.well-known/oauth-authorization-server`) advertises the support:

```json
{
  "authorization_response_iss_parameter_supported": true,
  "issuer": "https://thunderid.example.com",
  ...
}
```

<details>
<summary>How ThunderID Implements It</summary>

| Aspect | Behavior |
|---|---|
| Included on success | Yes — every `code` response |
| Included on error | Yes — every error response that goes via redirect |
| Value | The configured `issuer` URL of the ThunderID instance |
| Per-client opt-out | None — the parameter is always sent |
| Discovery advertisement | `authorization_response_iss_parameter_supported: true` |

</details>

## Try It in ThunderID

No configuration is needed. The behavior is on by default and cannot be disabled.

## How Clients Should Validate `iss`

A client that talks to multiple authorization servers must compare the `iss` parameter to the authorization server's expected issuer **before** exchanging the code:

```javascript
function handleCallback(url) {
  const params = new URL(url).searchParams;
  const iss = params.get('iss');

  if (iss !== EXPECTED_ISSUER) {
    throw new Error(`Mix-up detected: response came from $, expected $`);
  }

  // Safe to exchange the code now.
  return exchangeCode(params.get('code'), params.get('state'));
}
```

Clients that talk to a single authorization server should still verify `iss` defensively — the cost is one string comparison.

## Related Guides

- [Authorization Code](https://thunderid.dev/docs/next/guides/guides/protocols/authorization-code.md) — the response that carries `iss`
- [Server Metadata](https://thunderid.dev/docs/next/guides/guides/protocols/server-metadata.md) — `iss` is the `issuer` value from discovery
