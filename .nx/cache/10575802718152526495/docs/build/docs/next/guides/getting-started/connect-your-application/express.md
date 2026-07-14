# Express Quickstart

# Express Quickstart

Use this guide to add ThunderID authentication to an Express app with sign-in, sign-out, and route protection.


## What You Will Learn

}>Create a new Express app
}>Install the <code>@thunderid/express</code> package</TutorialHeroItem>
}>Add working sign-in and sign-out routes</TutorialHeroItem>
}>Protect routes and access the signed-in user</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../getting-started/get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Node.js installed on your system</TutorialHeroItem>
}>npm, yarn, or pnpm</TutorialHeroItem>
}>Your preferred code editor</TutorialHeroItem>

</TutorialHero>


## Create an Express App

Create your new Node.js application:


  <CodeBlock lang="bash" label="npm">
    mkdir my-express-app
    cd my-express-app
    npm init -y
    npm install express cookie-parser



    mkdir my-express-app
    cd my-express-app
    yarn init -y
    yarn add express cookie-parser



    mkdir my-express-app
    cd my-express-app
    pnpm init
    pnpm add express cookie-parser

</CodeGroup>

## Install the SDK and Dependencies

Install the ThunderID Express SDK:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/express



    yarn add @thunderid/express



    pnpm add @thunderid/express

</CodeGroup>

## Add Authentication Middleware and Routes

Create an `index.js` file with ThunderID middleware and auth routes:

```js title="index.js" showLineNumbers
const express = require('express');
const cookieParser = require('cookie-parser');
const  = require('@thunderid/express');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

app.use(
  thunderID({
    baseUrl: 'https://localhost:8090',
    clientId: '<your-client-id>',
    clientSecret: '<your-client-secret>',
    afterSignInUrl: 'http://localhost:3000/login',
    afterSignOutUrl: 'http://localhost:3000/logout',
  }),
);

app.get('/', (_req, res) => {
  res.send('<a href="/protected">Go to protected page</a>');
});

app.get('/login', handleSignIn());
app.get('/logout', handleSignOut());

app.get(
  '/protected',
  protect((res) => res.redirect('/login')),
  (_req, res) => {
    res.send('You are signed in and can access this protected route.');
  },
);

app.get('/me', protect(), async (req, res) => {
  const user = await req.thunderIDAuth.getUserFromRequest(req);
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:$`);
});
```

:::warning Configuration
Replace `<your-client-id>` and `<your-client-secret>` with values from your ThunderID application. Make sure the authorized redirect URL in your application settings is set to `http://localhost:3000/login`.
:::

## Run Your App

Start the server:


  <CodeBlock lang="bash" label="npm">
    node index.js



    yarn node index.js



    pnpm node index.js

</CodeGroup>

Open [http://localhost:3000/protected](http://localhost:3000/protected).

You should be redirected to ThunderID sign-in. After successful login, you'll return to your app and access the protected route. Then open [http://localhost:3000/me](http://localhost:3000/me) to inspect the signed-in user profile.


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with Client ID and Client Secret
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ Express app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the sign-in flow
      Add MFA, passkeys, or social login to your flow without changing your route wiring.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/express/overview" style=}>

      <div style=}>Express SDK Reference
      Explore the full API reference for the ThunderID Express SDK.
      API Reference →
    </div>
  </a>

</div>
