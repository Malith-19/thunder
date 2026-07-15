# App-Native Authentication

By default the Wayfinder sample authenticates users through a browser redirect to the ThunderID-hosted Login Gate. This document describes how to run the sample in **app-native mode**, where authentication happens inside the application itself — no redirect to a hosted page.

The app drives each flow step directly via `/flow/execute` API calls and renders its own step UI, covering sign-in, registration (with automatic sign-in on completion), and password recovery.

> **Verbose mode is not currently supported in app-native mode.** The verbose variant lets the React SDK's `SignIn`/`SignUp` components render the flow, but those components call `/flow/execute` internally and cannot attach the Flow Secret header that app-native flow initiation now requires. Setting `VITE_AUTH_IS_VERBOSE=true` is ignored in native mode (the app falls back to the standard step UI). Re-enabling it depends on the SDK gaining Flow Secret header support.

> **The AI concierge (chat) is hidden in app-native mode.** Agent consent uses a redirect-based `authorization_code` popup, which has no app-native equivalent yet — so chat and the agent routes are only available in redirect mode.

## ThunderID Setup

The app-native config is in `thunderid-config/app-native/`. Use it **instead of** the redirect config.

1. Start ThunderID and open the Console.
2. On the **welcome screen**, choose **Open** and upload `thunderid-config/app-native/thunderid-config.yaml`. For environment variables, upload `thunderid-config/app-native/thunderid.env`.

Key differences from the redirect config:

- Adds a dedicated `wayfinder-native` application for app-native flow execution. Unlike the public, redirect-based `wayfinder-app`, this is a **confidential, non-redirect** client: it initiates flows directly via `/flow/execute` by presenting a **Flow Secret**, then exchanges the resulting assertion for tokens using its client credentials. (A public, redirect-based app cannot initiate flows directly, which is why native mode needs a separate app.)
- Uses `wayfinder-registration-autosignin-flow` — registration completes with an automatic sign-in.
- Password recovery links redirect back to `http://localhost:5173/recovery` (set via `WAYFINDER_RECOVERY_BASE_URL`).
- The AI concierge is hidden in app-native mode (agent consent is redirect-only), so its clients/flows are unused here.

### SMTP (for Password Recovery)

Update `deployment.yaml` to deliver recovery emails to the sample inbox:

```yaml
email:
  smtp:
    host: "127.0.0.1"
    port: 2525
    username: "dev"
    password: "dev"
    from_address: "noreply@thunderid.dev"
    enable_start_tls: false
    enable_authentication: true
```

## Configure the Frontend

In `frontend/.env`, set:

```env
VITE_THUNDER_BASE_URL=https://localhost:8090

# Disable redirect-based auth
VITE_AUTH_IS_REDIRECT_BASED=false

# The dedicated app-native application and its secrets. These values must match the
# wayfinder-native app in thunderid-config/app-native/thunderid-config.yaml.
VITE_THUNDER_NATIVE_APP_ID=wayfinder-native
VITE_THUNDER_NATIVE_CLIENT_ID=WAYFINDER-NATIVE
VITE_THUNDER_NATIVE_CLIENT_SECRET=wayfinder-native-client-secret
VITE_THUNDER_NATIVE_FLOW_SECRET=wayfinder-native-flow-secret
```

`VITE_THUNDER_CLIENT_ID` and `VITE_THUNDER_APP_ID` (the redirect app) are not required in app-native mode.

> **Security note:** shipping a client secret and Flow Secret in a browser app is insecure — a real single-page app should never do this. It is acceptable here only because this is a local sample. The recommended pattern is a backend that holds the secrets and proxies flow execution.

## Run

```bash
cd backend     && npm install && npm run seed && npm start  # http://localhost:8787
cd smtp-server && npm install && npm run dev                # SMTP :2525 | Inbox http://localhost:8788
cd frontend    && npm install && npm run dev                # http://localhost:5173
```

## Try It

### Sign in

Open `http://localhost:5173` and click **Sign in**. You land on an in-app sign-in page. Enter `john.doe` / `john.doe`.

### Register

Click **Register** on the sign-in page and fill in the form. The registration-with-auto-sign-in flow signs you in immediately on completion.

### Password Recovery

Click **Forgot password**, enter your username, and check the SMTP inbox at `http://localhost:8788` for the recovery email. Follow the link to set a new password.

## Switching Back to Redirect Mode

Set `VITE_AUTH_IS_REDIRECT_BASED=true` (or remove it) in `frontend/.env`, re-upload the redirect config, and restart the dev server. Redirect mode restores the AI concierge and, if you want it, verbose SDK-rendered auth.
