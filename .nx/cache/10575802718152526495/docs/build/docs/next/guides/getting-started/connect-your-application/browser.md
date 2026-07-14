# Vanilla JavaScript Quickstart

# Vanilla JavaScript Quickstart

This is **step 4** of the getting started sequence. By the end you will have a working vanilla JavaScript app with sign-in and sign-out powered by ThunderID.


## What You Will Learn

}>Create a new JavaScript app using Vite
}>Install the <code>@thunderid/browser</code> package</TutorialHeroItem>
}>Add working sign-in and sign-out</TutorialHeroItem>
}>Display the signed-in user's profile</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Node.js installed on your system</TutorialHeroItem>
}>npm, yarn, or pnpm</TutorialHeroItem>
}>Your preferred code editor</TutorialHeroItem>

</TutorialHero>


## Create a JavaScript App

Create your new JavaScript app using Vite:


  <CodeBlock lang="bash" label="npm">
    npm create vite@latest my-js-app -- --template vanilla
    cd my-js-app
    npm install



    yarn create vite my-js-app --template vanilla
    cd my-js-app
    yarn install



    pnpm create vite my-js-app --template vanilla
    cd my-js-app
    pnpm install

</CodeGroup>

## Install @thunderid/browser

Install the ThunderID Browser SDK in your project:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/browser



    yarn add @thunderid/browser



    pnpm add @thunderid/browser



    bun add @thunderid/browser

</CodeGroup>

## Initialize the SDK

The `ThunderIDBrowserClient` serves as the main entry point for the SDK. Create a new file to initialize and export the client instance.

Create `src/auth.js` with the following:

```js title="src/auth.js" showLineNumbers

const auth = new ThunderIDBrowserClient()

await auth.initialize({
  clientId: '<your-client-id>',
  baseUrl: 'https://localhost:8090',
  afterSignInUrl: window.location.origin,
  afterSignOutUrl: window.location.origin,
})

export default auth
```

:::warning Configuration
Replace `<your-client-id>` with the Client ID you obtained when creating the application in ThunderID.
:::

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `clientId` | The Client ID from your ThunderID application |
| `baseUrl` | Your ThunderID instance URL (e.g., `https://localhost:8090`) |
| `afterSignInUrl` | URL to redirect to after sign-in (defaults to current origin) |
| `afterSignOutUrl` | URL to redirect to after sign-out (defaults to current origin) |

## Add Sign-In and Sign-Out

Replace the content of `src/main.js` with the following to add sign-in and sign-out functionality:

```js title="src/main.js" showLineNumbers

async function renderApp() {
  const isSignedIn = await auth.isSignedIn()

  if (isSignedIn) {
    const user = await auth.getUser()

    document.querySelector('#app').innerHTML = `

        <h1>ThunderID Auth Demo</h1>
        <div class="card">
          <h2>Welcome, $!</h2>
          <div class="user-details">
            <p><strong>Email:</strong> $</p>
            <p><strong>Username:</strong> $</p>

          <button id="sign-out-btn" type="button">Sign Out</button>
        </div>
      </div>
    `

    document.querySelector('#sign-out-btn')
      .addEventListener('click', () => auth.signOut())
  } else {
    document.querySelector('#app').innerHTML = `

        <h1>ThunderID Auth Demo</h1>
        <div class="card">
          <p>You are not signed in.</p>
          <button id="sign-in-btn" type="button">Sign In</button>

      </div>
    `

    document.querySelector('#sign-in-btn')
      .addEventListener('click', () => auth.signIn())
  }
}

renderApp()
```

## Update the HTML Entry Point

Replace the content of `index.html` to provide a clean entry point:

```html title="index.html" showLineNumbers
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ThunderID JavaScript Demo</title>
  </head>
  <body>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
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
You should see the sign-in button. Click it to be redirected to the ThunderID-hosted sign-in page. Authenticate with the test user you created in step 2, then return to your app with the user profile displayed.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with a Client ID
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ JavaScript app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the Sign-In Flow
      Add MFA, passkeys, or social login to your flow — no app code changes required.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/browser/overview" style=}>

      <div style=}>Browser SDK Reference
      Explore the full API reference for the ThunderID Browser SDK.
      API Reference →
    </div>
  </a>


</div>
