# Project Proxy

A proof of concept that gives ThunderID a project concept from the outside, without changing
ThunderID. It is meant for the cloud deployment, where projects are a platform construct shared by
several products. ThunderID itself knows only organization units (OUs).

- A **project** is one OU tree. The project ID is the ID of its root OU, so there is no mapping to store.
- Callers present a **platform token** from the cloud platform's identity provider. Its `projects` claim
  lists the projects the caller may act on.
- The proxy forwards each request with a **ThunderID token bound to the project's root OU**. ThunderID's
  own authorization keeps the request inside that OU, so isolation does not depend on the proxy parsing
  requests correctly.

## How a request is handled

```
Caller ── Bearer <platform token>, X-Project-Id: P ──▶ Project proxy
  1. Refuse paths other than /users, /groups, /organization-units and /user-types.
  2. Verify the platform token (JWKS signature, iss, aud, exp, nbf).
  3. Check P is listed in the token's projects claim.
  4. Get a ThunderID token: client_credentials at /ou/P/oauth2/token, cached per project.
     It carries ouId = P and the configured scopes, never "system".
  5. On a JSON create without ouId (or parent, for an OU), set it to P.
  6. Replace the Authorization header and forward to ThunderID.
```

## Running it

You need Go, curl, jq and a ThunderID distribution (for example from `make build`).

1. **Set up ThunderID.** Use a ThunderID distribution, not the source checkout: the `setup.sh` at the
   repository root is the distribution's script and expects the `thunderid` binary beside it. Unzip a
   distribution (`make build` writes one to `target/dist/`), copy
   [bootstrap/90-project-proxy.yaml](bootstrap/90-project-proxy.yaml) into its `bootstrap/` directory,
   then run its setup with a secret for the proxy's client:

   ```bash
   unzip target/dist/thunderid-1.0.0-macos-arm64.zip -d ~/project-proxy-poc
   cp project-proxy/bootstrap/90-project-proxy.yaml ~/project-proxy-poc/thunderid-1.0.0-macos-arm64/bootstrap/
   openssl rand -hex 24 > ~/project-proxy-poc/client-secret
   cd ~/project-proxy-poc/thunderid-1.0.0-macos-arm64
   PROJECT_PROXY_CLIENT_SECRET=$(cat ~/project-proxy-poc/client-secret) ./setup.sh && ./start.sh
   ```

   The secret is saved to a file because the proxy needs the same value in step 3, and ThunderID keeps
   only its hash.

   The file creates everything the proxy needs, plus two demo projects, `project-shop` and
   `project-bank`, each with its own user type (`shop-person`, `bank-person`). No admin token or API
   calls are needed.

2. **Run the development issuer.** It stands in for the platform identity provider, serving a JWKS and
   issuing a token for any subject and project list. Use it on a developer machine only.

   ```bash
   go run ./cmd/devissuer
   ```

3. **Run the proxy.**

   ```bash
   PROJECT_PROXY_CLIENT_SECRET=$(cat ~/project-proxy-poc/client-secret) \
     go run ./cmd/projectproxy -config config.example.json
   ```

   The client secret is read from `PROJECT_PROXY_CLIENT_SECRET` when the configuration file does not
   set `client.clientSecret`.

4. **Run the demo.** It creates users in both projects and checks that neither project can reach the
   other.

   ```bash
   ./scripts/demo.sh
   ```

To run the same scenarios in Postman, import
[postman/project-proxy-poc.postman_collection.json](postman/project-proxy-poc.postman_collection.json)
and run its folders in order. The first folder fetches the platform tokens; each request asserts the
expected status.

To call it yourself:

```bash
ALICE=$(curl -s "localhost:8096/token?sub=alice&projects=project-shop" | jq -r .access_token)
curl -s localhost:8097/users -H "Authorization: Bearer $ALICE" -H "X-Project-Id: project-shop"
```

Unit tests: `go test -race ./...`

## What the bootstrap file sets up, and why

| Resource | Why |
|---|---|
| `project-proxy-platform` OU | Owns the proxy's client and role. It is not a project. |
| `project-proxy-permissions` resource server | Declares `system:ou`, `system:user`, `system:group` and `system:usertype`. ThunderID ships only the top-level `system` permission, which would let the proxy reach every OU. |
| `project-proxy` client, shared with every OU (`allUnits`) | Lets the proxy request a token for any project's root OU. This kind of policy can only be declared, not created over REST. |
| Role with those permissions, assigned to the client | Sets the ceiling of what the proxy can do inside a project. Never grant `system`. |
| A root OU and a user type per demo project | A user type is visible only within its own OU tree, and its handle must be unique across the deployment, so each project needs its own. |

## Known gaps

- **Child OUs inside a project cannot be managed.** ThunderID lets a caller act only on its own OU (exact
  match). A project token can create a child OU but cannot read or manage it. The fix belongs in
  ThunderID: an opt-in rule that lets a caller administer its OU and everything beneath it.
- **Resources not bound to an OU** (flows, identity providers, themes, layouts, connections,
  certificates, variables, secrets, translations, server configuration) are shared by all projects, so
  the proxy does not serve them.
- **Applications and agents** are not served yet. Their list endpoints and sharing policies need review,
  since a sharing policy can name another project's OU.
- **Every project member has the same permissions.** Mapping platform roles to scopes would need the
  token cache keyed by project and role.
- **Audit identity.** ThunderID sees the proxy's client as the subject, not the platform user.
- **Revocation.** Platform tokens are verified offline, so a revoked one works until it expires.
- **Plain HTTP and no CORS.** The Console cannot call the proxy yet.
