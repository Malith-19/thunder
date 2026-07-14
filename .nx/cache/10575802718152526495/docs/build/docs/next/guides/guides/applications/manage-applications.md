# Manage Applications

# Manage Applications

An application in ThunderID represents the client that your users sign in to. You register your web app, mobile app, or backend service as an application to configure the authentication experience and control which users can access it.

Each application holds:

- An **authentication flow** that defines the steps users follow to sign in.
- An optional **registration and recovery flow** for self-service user sign-up and recovery.

OAuth 2.0 applications additionally hold:

- A **Client ID** (and optionally a **Client Secret**) for token-based authentication.
- OAuth 2.0 settings including redirect URIs, grant types, scopes, and token configuration.

## Application Types

ThunderID provides four application types. Choose the one that matches your architecture.

| Type | Description | Client Secret |
|------|-------------|---------------|
| ⚛️ **Browser App** | For single-page applications (React, Angular, Vue) that run entirely in the browser.| No - public client |
| 🌐 **Full-stack App** | For server-rendered web applications (Express, Spring, .NET) where the backend handles the token exchange. | Yes - confidential client |
| 📱 **Mobile App** | For native or cross-platform mobile apps (Swift, Kotlin, React Native, Flutter).| No - public client |
| 🤖 **Backend Service** | For server-to-server communication with no user interaction (background jobs, internal APIs, microservices). | Yes - confidential client |

## Create an Application

Follow these steps in the ThunderID Console to register a new application.


### Step 1: Select Technology or Application Type

1. Sign in to the ThunderID Console.
2. Navigate to **Applications** → **Add Application**.
3. Pick your **Technology** if your framework is listed (for example, React). ThunderID uses this to pre-configure the right defaults and SDK integration. If your framework isn't listed, select an **Application Type** directly instead.

### Step 2: Enter Application Name

Enter an **Application Name**. This name identifies the application in the Console and may be visible to users on the consent screen.

### Step 3: Customize the Appearance

Choose an **Application Logo** from the available icons, or click **Shuffle** to cycle through options. This logo appears on the sign-in page and consent screen.

Select a **Theme** — **Classic** or **High Contrast** — for the authentication pages of this application.

> **Note**
>
> Backend Service applications skip the appearance, sign-in options, and sign-in experience steps and go directly to the creation step.


### Step 4: Select Sign-In Options

Select the sign-in methods users will use to authenticate with this application (for example, Username & Password, Google, or Apple). At least one option is required.

### Step 5: Configure the Sign-In Experience

**Sign-In Approach** determines how users reach the sign-in experience:

- **Redirect to ThunderID sign-in/sign-up handling pages** (recommended) — users are redirected to ThunderID-hosted sign-in pages. You can customize these pages with the Flow Designer and integrate with SDKs.
- **Embedded sign-in/sign-up components in your app** — the sign-in experience renders inside your application using ThunderID's UI components or APIs. No redirect occurs.

**User Access** controls which user types can register with this application. Select one or more of the allowed user types (for example, **Customer** or **Person**).
Learn more about user types in [User Types](https://thunderid.dev/docs/next/guides/users/user-types.md).

### Step 6: Configure Application

This step varies based on your application type and sign-in options. Backend Service applications skip this step entirely.

**Browser App and Full-stack App** — enter the **Hosting URL** where your application is deployed (for example, `https://yourapp.example.com`). For the callback URL, choose whether to use the same URL or provide a custom one.

**Mobile App** — enter a **Deep Link or Universal Link** that ThunderID redirects users back to after authentication (for example, `com.example.app://auth/callback` or `https://yourapp.example.com/auth/callback`).

If you selected **Passkey** as a sign-in option, this step also shows **Passkey Settings**. Configure the **Relying Party ID** (your application's domain, for example `yourapp.example.com`) and **Relying Party Name** (a label shown to users during passkey prompts).

> **Note**
>
> If you chose the **Embedded** sign-in approach in Step 5, this step only appears when Passkey is selected.


### Step 7: Create Application

After creating an OAuth 2.0 application, ThunderID generates a **Client ID** which you can find on the **General** tab of the created application.

For confidential clients (Full-stack App and Backend Service), ThunderID also generates a **Client Secret** and displays it once during creation.

> **Warning**
>
> Copy and store your **Client Secret** before clicking **Continue**. ThunderID never shows it again. Treat it with the same level of security as a password. Never expose it in browser console, version control, or logs.


## Update an Application

To update an application:

1. Navigate to **Applications** and open the application you want to edit.
2. Update the relevant settings. Learn more about each setting in [Application Settings](https://thunderid.dev/docs/next/guides/guides/application-settings.md).
3. Click **Save**.

Changes take effect immediately for new authentication requests. Active sessions and issued tokens are not affected until they expire.

## Delete an Application

To delete an application:

1. Open the application from the **Applications** list.
2. Click **Delete Application** and confirm.

> **Warning**
>
> Deleting an application is permanent. Any client using the application's Client ID will immediately lose the ability to authenticate. Issued tokens remain valid until they expire.


## Next Steps

- [Application Settings](https://thunderid.dev/docs/next/guides/guides/application-settings.md) - Configure OAuth 2.0, tokens, flows, and consent for your application
- [Flows](https://thunderid.dev/docs/next/guides/flows/what-are-flows.md) - Build and assign custom authentication and registration flows
- [Dynamic Client Registration](https://thunderid.dev/docs/next/guides/protocols/oauth-oidc/dynamic-client-registration.md) - Register OAuth 2.0 clients programmatically without using the Console
