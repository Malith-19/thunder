# Nuxt Quickstart

# Nuxt Quickstart

This is **step 4** of the getting started sequence. By the end you will have a working Nuxt 3 app with sign-in and sign-out powered by ThunderID.


## What You Will Learn

}>Create a new Nuxt 3 app
}>Register the <code>@thunderid/nuxt</code> module</TutorialHeroItem>
}>Add working sign-in and sign-out</TutorialHeroItem>
}>Display the signed-in user's profile</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../getting-started/get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Node.js 18.0 or later installed on your system</TutorialHeroItem>
}>npm, yarn, or pnpm</TutorialHeroItem>
}>Your preferred code editor</TutorialHeroItem>

</TutorialHero>


## Create a Nuxt App

Create a new Nuxt 3 app:


  <CodeBlock lang="bash" label="npm">
    npx nuxi@latest init my-nuxt-app
    cd my-nuxt-app
    npm install



    pnpm dlx nuxi@latest init my-nuxt-app
    cd my-nuxt-app
    pnpm install



    yarn dlx nuxi@latest init my-nuxt-app
    cd my-nuxt-app
    yarn install

</CodeGroup>

## Install @thunderid/nuxt

Install the ThunderID Nuxt module:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/nuxt



    pnpm add @thunderid/nuxt



    yarn add @thunderid/nuxt



    bun add @thunderid/nuxt

</CodeGroup>

## Register the Module

Add `@thunderid/nuxt` to your `nuxt.config.ts`:

```typescript title="nuxt.config.ts" showLineNumbers
export default defineNuxtConfig({
  modules: ['@thunderid/nuxt'],
});
```

That's all the `nuxt.config.ts` change needed — the module reads all configuration from environment variables.

> **Info**
>
> The module automatically registers `/api/auth/callback` as a Nitro server route. Make sure the authorized redirect URL in your ThunderID application settings is set to `http://localhost:3000/api/auth/callback`. You do **not** need to create the callback route yourself.


## Set Up Environment Variables

Create a `.env` file in the root of your project:

```bash title=".env"
NUXT_PUBLIC_THUNDERID_BASE_URL=https://localhost:8090
NUXT_PUBLIC_THUNDERID_CLIENT_ID=<your-client-id>
THUNDERID_CLIENT_SECRET=<your-client-secret>
THUNDERID_SESSION_SECRET=<your-session-secret>
```

:::tip Generating a session secret
Run the following command to generate a strong random secret for `THUNDERID_SESSION_SECRET`:

```bash
openssl rand -base64 32
```
:::

:::warning Security
`THUNDERID_CLIENT_SECRET` and `THUNDERID_SESSION_SECRET` have no `NUXT_PUBLIC_` prefix — Nuxt keeps them server-side only and never exposes them to the browser.
:::

| Variable | Description |
|----------|-------------|
| `NUXT_PUBLIC_THUNDERID_BASE_URL` | Your ThunderID instance URL |
| `NUXT_PUBLIC_THUNDERID_CLIENT_ID` | The Client ID from your ThunderID application |
| `THUNDERID_CLIENT_SECRET` | The Client Secret (server-side only) |
| `THUNDERID_SESSION_SECRET` | Secret for signing session JWT cookies (server-side only) |

## Wrap Your App with ThunderIDRoot

The `` component mounts the full authentication provider tree. Wrap your application content with it in `app.vue`:

```vue title="app.vue" showLineNumbers
<template>
  <ThunderIDRoot>


</template>
```

:::info Auto-imports
The `@thunderid/nuxt` module auto-registers all components and auto-imports all composables. You do **not** need to import them manually.
:::

## Add Sign-In and Sign-Out

The module provides ``, `<SignedOut>`, `<SignInButton>`, and `<SignOutButton>` components for conditional rendering and authentication actions.

Create `pages/index.vue`:

```vue title="pages/index.vue" showLineNumbers
<template>
  <main>
    <header>
      <h1>ThunderID Auth Demo</h1>
      <SignedIn>
        <SignOutButton>Sign Out
      </SignedIn>

        <SignInButton>Sign In
      </SignedOut>
    </header>
  </main>
</template>
```

## Display User Profile Information

Use `` with a scoped slot to access and display profile information for the signed-in user:

```vue title="pages/index.vue" showLineNumbers
<template>
  <main>
    <header>
      <h1>ThunderID Auth Demo</h1>
      <SignedIn>
        <SignOutButton>Sign Out
      </SignedIn>

        <SignInButton>Sign In
      </SignedOut>
    </header>

    <section>

        <User>
          <template #default="">

              <img
                v-if="user.picture"
                :src="user.picture"
                :alt="user.name || 'User avatar'"
                style="width: 80px; height: 80px; border-radius: 50%"
              />
              <h2>Welcome, }!</h2>
              <div>
                <p><strong>Email:</strong> }</p>
                <p><strong>First Name:</strong> }</p>
                <p><strong>Last Name:</strong> }</p>

            </div>
          </template>

      </SignedIn>
    </section>
  </main>
</template>
```

## Protect a Page

To require authentication on a page, add the built-in `'thunderIDMiddleware'` route middleware:

```vue title="pages/dashboard.vue"
<script setup>
definePageMeta();
</script>
```

Unauthenticated users are automatically redirected to the sign-in page. For more control — such as requiring specific scopes or an organization context — use `defineThunderIDMiddleware`:

```vue title="pages/admin.vue"
<script setup>
const protect = defineThunderIDMiddleware();
definePageMeta();
</script>
```

## Run Your App

Start the development server:


  <CodeBlock lang="bash" label="npm">
    npm run dev



    pnpm run dev



    yarn dev

</CodeGroup>

Visit your app at [http://localhost:3000](http://localhost:3000)

:::tip Success
You should see the sign-in button. Click it to open the ThunderID-hosted sign-in page. Authenticate with the test user you created in step 2, and land back in your app with the user profile displayed.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with a Client ID and Client Secret
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ Nuxt 3 app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the sign-in flow
      Add MFA, passkeys, or social login to your flow — no app code changes required.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/nuxt/overview" style=}>

      <div style=}>Nuxt SDK Reference
      Explore the full API reference for the ThunderID Nuxt SDK.
      API Reference →
    </div>
  </a>

</div>
