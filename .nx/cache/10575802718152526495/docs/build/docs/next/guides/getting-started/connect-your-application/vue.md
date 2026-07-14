# Vue Quickstart

# Vue Quickstart

This is **step 4** of the getting started sequence. By the end you will have a working Vue 3 app with sign-in and sign-out powered by ThunderID.


## What You Will Learn

}>Create a new Vue 3 app using Vite
}>Install the <code>@thunderid/vue</code> package</TutorialHeroItem>
}>Add working sign-in and sign-out</TutorialHeroItem>
}>Display the signed-in user's profile</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Node.js installed on your system</TutorialHeroItem>
}>npm, yarn, or pnpm</TutorialHeroItem>
}>Your preferred code editor</TutorialHeroItem>

</TutorialHero>


## Create a Vue App

Create your new Vue 3 app using Vite:


  <CodeBlock lang="bash" label="npm">
    npm create vite@latest my-vue-app -- --template vue
    cd my-vue-app
    npm install



    yarn create vite my-vue-app --template vue
    cd my-vue-app
    yarn install



    pnpm create vite my-vue-app --template vue
    cd my-vue-app
    pnpm install

</CodeGroup>

## Install @thunderid/vue

Install the ThunderID Vue SDK in your project:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/vue



    yarn add @thunderid/vue



    pnpm add @thunderid/vue



    bun add @thunderid/vue

</CodeGroup>

## Register the Plugin and Add ThunderIDProvider

The `@thunderid/vue` SDK provides a Vue plugin that registers the ThunderIDProvider component globally. Register the plugin in `main.js`, then wrap your root component with ThunderIDProvider in `App.vue`.

**Step 1:** Update `src/main.js` to register the plugin:

```js title="src/main.js" showLineNumbers


</script>

<template>
  "
    base-url="https://localhost:8090"
  >
    <Loading>
      Loading authentication...


    <header>
      <h1>ThunderID Auth Demo</h1>

        <SignOutButton>Sign Out
      </SignedIn>

        <SignInButton>Sign In
      </SignedOut>
    </header>
  </ThunderIDProvider>
</template>
```

## Display User Profile Information

Use the `User` component with a scoped slot to access and display user profile information:

```vue title="src/App.vue" showLineNumbers
<script setup>

</script>

<template>
  "
    base-url="https://localhost:8090"
  >
    <Loading>
      Loading authentication...


    <header>
      <h1>ThunderID Auth Demo</h1>

        <SignOutButton>Sign Out
      </SignedIn>

        <SignInButton>Sign In
      </SignedOut>
    </header>

    <main>

        <User>
          <template #default="">

              <img
                v-if="user.picture"
                :src="user.picture"
                :alt="user.name || 'User avatar'"
                style="width: 80px; height: 80px; border-radius: 50%"
              />
              <h2>Welcome, }!</h2>
              <div class="user-details">
                <p><strong>Email:</strong> }</p>
                <p><strong>First Name:</strong> }</p>
                <p><strong>Last Name:</strong> }</p>

            </div>
          </template>

      </SignedIn>
    </main>
  </ThunderIDProvider>
</template>
```

## Run Your App

Start the development server:


  <CodeBlock lang="bash" label="npm">
    npm run dev



    yarn dev



    pnpm run dev

</CodeGroup>

Visit your app at [http://localhost:5173](http://localhost:5173)

:::tip Success
You should see the sign-in button. Click it, you'll be redirected to the ThunderID-hosted sign-in page. Authenticate with the test user you created in step 2, and you will land back in your app with the user profile displayed.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with a Client ID
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ Vue 3 app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the sign-in flow
      Add MFA, passkeys, or social login to your flow, no app code changes required.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/vue/overview" style=}>

      <div style=}>Vue SDK Reference
      Explore the full API reference for the ThunderID Vue SDK.
      API Reference →
    </div>
  </a>

</div>
