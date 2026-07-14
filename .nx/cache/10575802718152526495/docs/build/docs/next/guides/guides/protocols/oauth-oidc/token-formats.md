# Token Formats

# Token Formats

OpenID Connect lets you control the **cryptographic shape** of two outputs: the **ID Token** and the **UserInfo response**. ThunderID supports four formats and a curated set of algorithms — picked from the JOSE standards ([RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515) JWS, [RFC 7516](https://datatracker.ietf.org/doc/html/rfc7516) JWE, [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518) JWA).

The choice trades operational simplicity against confidentiality. JWS gives you integrity. JWE gives you confidentiality. NESTED_JWT gives you both.

## Format Matrix

| Format | Applies to | Signed | Encrypted | Content-Type |
|---|---|---|---|---|
| `JSON` | UserInfo only | ❌ | ❌ | `application/json` |
| `JWS` | ID Token (default), UserInfo | ✅ | ❌ | `application/jwt` |
| `JWE` | ID Token, UserInfo | ❌ | ✅ | `application/jwt` |
| `NESTED_JWT` | ID Token, UserInfo | ✅ | ✅ | `application/jwt` |

For the **ID Token**, JWS is the default and the most widely supported. Pick JWE or NESTED_JWT only when the ID Token will traverse an untrusted intermediary that must not read its contents.

For **UserInfo**, JSON is the default. Switch to JWS when integrity matters; to JWE or NESTED_JWT when confidentiality matters.

## Supported Signing Algorithms (JWS)

Applies to `JWS` and the signing step of `NESTED_JWT`.

| Algorithm | Family | Recommendation |
|---|---|---|
| `RS256` | RSA-PKCS#1 v1.5 | Widely supported. Strong default. |
| `RS512` | RSA-PKCS#1 v1.5 | Stronger hash. Higher CPU. |
| `PS256` | RSA-PSS | Probabilistic RSA. Preferred over `RS*` for new deployments. |
| `ES256` | ECDSA P-256 | Smaller signatures than RSA. Good default for performance-sensitive paths. |
| `ES384` | ECDSA P-384 | Larger curve. |
| `ES512` | ECDSA P-521 | Largest curve. |
| `EdDSA` | Ed25519 | Fastest signing and verification. Newest. |

Symmetric algorithms (`HS256`, `HS384`, `HS512`) are **not** supported for token signing.

## Supported Encryption Algorithms (JWE)

Applies to `JWE` and the encryption step of `NESTED_JWT`.

### Key Management (`alg`)

| Algorithm | Description |
|---|---|
| `RSA-OAEP` | RSA-OAEP with SHA-1 |
| `RSA-OAEP-256` | RSA-OAEP with SHA-256 (preferred) |

### Content Encryption (`enc`)

| Algorithm | Description |
|---|---|
| `A128CBC-HS256` | AES-128-CBC + HMAC-SHA-256 authentication tag |
| `A256GCM` | AES-256 in Galois/Counter Mode (preferred when supported) |

## Token Lifetimes

Access token and ID token lifetimes are configured per application. Both default to **3600 seconds** (one hour).

| Setting | Default | Description |
|---|---|---|
| `token.accessToken.validityPeriod` | `3600` | Access token lifetime in seconds |
| `token.idToken.validityPeriod` | `3600` | ID token lifetime in seconds |

Refresh tokens are governed separately — see [Refresh Token](https://thunderid.dev/docs/next/guides/guides/protocols/refresh-token.md).

## Embedded User Attributes

The `userAttributes` array on each token type controls which user attributes are embedded as claims.

| Setting | Description |
|---|---|
| `token.accessToken.userAttributes` | Attributes embedded in the access token payload. Standard claims (`sub`, `iss`, `exp`, …) are always included and cannot be removed. |
| `token.idToken.userAttributes` | Attributes embedded in the ID token. Only attributes covered by the requested scopes are returned — see [Claims & Scopes](https://thunderid.dev/docs/next/guides/guides/protocols/claims-and-scopes.md). |

## Certificate Prerequisites

Encrypted responses (`JWE`, `NESTED_JWT`) and `private_key_jwt` client authentication require a certificate on the application — either an inline `JWKS` or a `JWKS_URI` ThunderID can fetch. See [Application certificate](https://thunderid.dev/docs/next/guides/guides/protocols/client-authentication-methods.md#application-certificate) for the full rules.

| Use case | Certificate required? | Reason |
|---|---|---|
| `JWS` ID Token (default) | No | ThunderID signs with its own key (see [JWKS](https://thunderid.dev/docs/next/guides/guides/protocols/jwks.md)) |
| `JWE` / `NESTED_JWT` ID Token | Yes | Encrypted to the client's public key |
| `JWS` UserInfo | No | ThunderID signs with its own key |
| `JWE` / `NESTED_JWT` UserInfo | Yes | Encrypted to the client's public key |
| `private_key_jwt` client auth | Yes | Verifying the client's signed assertion |

## Try It in ThunderID


**Console**


1. Open **Applications** or **Agents** in the ThunderID Console and select your client.
2. Open the **Token** tab.
3. Use the **ID Token** section to configure ID Token format, signing, and encryption.
4. Use the **UserInfo** section to configure the UserInfo response format.
5. For encrypted responses, attach a **Certificate** under the **Advanced** tab.
6. Save.


**Dynamic Client Registration**


Per [RFC 7591](https://www.rfc-editor.org/rfc/rfc7591) field names:

```http
POST /oauth2/dcr/register
Content-Type: application/json

{
  "client_name": "Secure App",
  "redirect_uris": ["https://app.example.com/callback"],
  "grant_types": ["authorization_code"],
  "response_types": ["code"],

  "id_token_signed_response_alg": "PS256",
  "id_token_encrypted_response_alg": "RSA-OAEP-256",
  "id_token_encrypted_response_enc": "A256GCM",

  "userinfo_signed_response_alg": "PS256",
  "userinfo_encrypted_response_alg": "RSA-OAEP-256",
  "userinfo_encrypted_response_enc": "A256GCM",

  "jwks_uri": "https://app.example.com/.well-known/jwks.json"
}
```


### Inspect What a Deployment Advertises

The supported algorithms are listed in the [Server Metadata](https://thunderid.dev/docs/next/guides/guides/protocols/server-metadata.md) document — for example, `id_token_signing_alg_values_supported` and `userinfo_encryption_enc_values_supported`.

## Related Guides

- [OpenID Connect](https://thunderid.dev/docs/next/guides/guides/protocols/openid-connect.md) — the spec that defines ID Token shape
- [UserInfo](https://thunderid.dev/docs/next/guides/guides/protocols/userinfo.md) — the endpoint whose response format is selected here
- [JWKS](https://thunderid.dev/docs/next/guides/guides/protocols/jwks.md) — ThunderID's signing keys
- [Client Authentication Methods — Application certificate](https://thunderid.dev/docs/next/guides/guides/protocols/client-authentication-methods.md#application-certificate) — attaching the client's public key
