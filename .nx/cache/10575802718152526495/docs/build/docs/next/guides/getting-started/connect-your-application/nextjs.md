# Next.js Quickstart

# Next.js Quickstart

This is **step 4** of the getting started sequence. By the end you will have a working Next.js app with sign-in and sign-out powered by ThunderID.


## What You Will Learn

}>Create a new Next.js app
}>Install the <code>@thunderid/nextjs</code> package</TutorialHeroItem>
}>Add working sign-in and sign-out</TutorialHeroItem>
}>Protect routes with middleware</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../getting-started/get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Node.js installed on your system</TutorialHeroItem>
}>npm, yarn, or pnpm</TutorialHeroItem>
}>Your preferred code editor</TutorialHeroItem>

</TutorialHero>


## Create a Next.js App

Create your new Next.js app:


  <CodeBlock lang="bash" label="npm">
    npx create-next-app@latest my-nextjs-app
    cd my-nextjs-app



    yarn create next-app my-nextjs-app
    cd my-nextjs-app



    pnpm create next-app my-nextjs-app
    cd my-nextjs-app

</CodeGroup>

When prompted, select the **App Router** option (the default).

## Install @thunderid/nextjs

Install the ThunderID Next.js SDK in your project:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/nextjs



    yarn add @thunderid/nextjs



    pnpm add @thunderid/nextjs

</CodeGroup>

## Set Environment Variables

Create a `.env.local` file in your project root with the following:

```bash title=".env.local" showLineNumbers
NEXT_PUBLIC_THUNDERID_BASE_URL=https://localhost:8090
NEXT_PUBLIC_THUNDERID_CLIENT_ID=<your-client-id>
THUNDERID_CLIENT_SECRET=<your-client-secret>
THUNDERID_SECRET=<a-random-secret-for-session-signing>
```

:::warning Configuration
Replace `<your-client-id>` and `<your-client-secret>` with the values from your ThunderID application. Generate a random string for `THUNDERID_SECRET` (at least 32 characters).
:::

## Add `ThunderIDProvider` to Your Layout

Wrap your root layout with `ThunderIDProvider` from the server export. This enables authentication across your entire app.

> **Info**
>
> `ThunderIDProvider` handles the OAuth callback automatically — no manual callback route is needed. Make sure the authorized redirect URL in your ThunderID application settings is set to `http://localhost:3000`.


```tsx title="app/layout.tsx" showLineNumbers

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>



      </body>
    </html>
  )
}
```

## Add Middleware for Route Protection

Create a `middleware.ts` file at your project root to protect routes and handle token refresh:

```ts title="middleware.ts" showLineNumbers

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default thunderIDMiddleware(async (thunderid, request) => {
  if (isProtectedRoute(request)) {
    await thunderid.protectRoute()
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

## Add Sign-In and Sign-Out

Update your home page to show sign-in and sign-out buttons:

```tsx title="app/page.tsx" showLineNumbers

export default function Home() {
  return (
    <main>
      <h1>Next.js Auth Demo</h1>


        <SignInButton>Sign In
      </SignedOut>



        <SignOutButton>Sign Out
      </SignedIn>
    </main>
  )
}
```

## Run Your App

Start the development server:


  <CodeBlock lang="bash" label="npm">
    npm run dev



    yarn dev



    pnpm dev

</CodeGroup>

Visit your app at [http://localhost:3000](http://localhost:3000)

:::tip Success
You should see the sign-in button. Click it to be redirected to the ThunderID-hosted sign-in page. Authenticate with the test user you created in step 2, then return to your app with the user dropdown displayed.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with a Client ID and Secret
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ Next.js app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the Sign-In Flow
      Add MFA, passkeys, or social login to your flow — no app code changes required.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/nextjs/overview" style=}>

      <div style=}>Next.js SDK Reference
      Explore the full API reference for the ThunderID Next.js SDK.
      API Reference →
    </div>
  </a>


</div>
