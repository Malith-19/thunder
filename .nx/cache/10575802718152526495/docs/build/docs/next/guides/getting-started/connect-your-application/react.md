# React Quickstart

# React Quickstart

This is **step 4** of the getting started sequence. By the end you will have a working React app with sign-in and sign-out powered by ThunderID.


## What You Will Learn

}>Create a new React app using Vite
}>Install the <code>@thunderid/react</code> package</TutorialHeroItem>
}>Add working sign-in and sign-out</TutorialHeroItem>
}>Display the signed-in user's profile</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Node.js installed on your system</TutorialHeroItem>
}>npm, yarn, or pnpm</TutorialHeroItem>
}>Your preferred code editor</TutorialHeroItem>

</TutorialHero>

:::tip Example Source Code
Check out the complete React Sample App in the ThunderID repository
:::


## Create a React App

Create your new React app using Vite:


  <CodeBlock lang="bash" label="npm">
    npm create vite@latest my-react-app -- --template react
    cd my-react-app
    npm install



    yarn create vite my-react-app --template react
    cd my-react-app
    yarn install



    pnpm create vite my-react-app --template react
    cd my-react-app
    pnpm install

</CodeGroup>

## Install @thunderid/react

Install the ThunderID React SDK in your project:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/react



    yarn add @thunderid/react



    pnpm add @thunderid/react



    bun add @thunderid/react

</CodeGroup>

## Add ThunderIDProvider to Your App

The `` serves as a context provider for the SDK. Integrate it by wrapping your root component.

Update the `main.jsx` file with the following:

```jsx title="src/main.jsx" showLineNumbers


import './App.css'

function App() {
  return (
    <>

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
            {(user) => user && (

                {user.picture && (
                  <img
                    src=
                    alt=
                    style=}
                  />
                )}
                <h2>Welcome, !</h2>
                <div className="user-details">
                  <p><strong>Email:</strong> </p>
                  <p><strong>First Name:</strong> </p>
                  <p><strong>Last Name:</strong> </p>

              </div>
            )}

        </SignedIn>
      </main>
    </>
  )
}

export default App
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
You should see the sign-in button. Click it, you'll be redirected to the ThunderID-hosted sign-in page. Authenticate with the test user you created in step 2 and you'll land back in your app with the user profile displayed.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with a Client ID
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ React app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the sign-in flow
      Add MFA, passkeys, or social login to your flow, no app code changes required.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/react/overview" style=}>

      <div style=}>React SDK Reference
      Explore the full API reference for the ThunderID React SDK.
      API Reference →
    </div>
  </a>

</div>
