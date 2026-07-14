# Node.js Quickstart

# Node.js Quickstart

Use this guide to add ThunderID authentication to a vanilla Node.js application using the `@thunderid/node` SDK and the built-in `http` module — no framework required.


## What You Will Learn

}>Create a Node.js project
}>Install the <code>@thunderid/node</code> package</TutorialHeroItem>
}>Add working sign-in and sign-out routes</TutorialHeroItem>
}>Protect routes and display the signed-in user's profile</TutorialHeroItem>

## Prerequisites

}>About 15 minutes</TutorialHeroItem>
}>Steps 1–3 complete: ThunderID running, an application registered, and a sign-in flow built. Start at <a href="../../get-thunderid">Get ThunderID</a> if you haven't already.</TutorialHeroItem>
}>Node.js 18+ installed on your system</TutorialHeroItem>
}>npm, yarn, or pnpm</TutorialHeroItem>
}>Your preferred code editor</TutorialHeroItem>

</TutorialHero>


## Create a Node.js Project

Initialize a new Node.js project:


  <CodeBlock lang="bash" label="npm">
    mkdir my-node-app
    cd my-node-app
    npm init -y



    mkdir my-node-app
    cd my-node-app
    yarn init -y



    mkdir my-node-app
    cd my-node-app
    pnpm init

</CodeGroup>

## Install @thunderid/node

Install the ThunderID Node.js SDK:


  <CodeBlock lang="bash" label="npm">
    npm install @thunderid/node



    yarn add @thunderid/node



    pnpm add @thunderid/node

</CodeGroup>

## Initialize the Client

Create an `index.js` file and initialize the `ThunderIDNodeClient` with your application credentials:

```js title="index.js" showLineNumbers
const http = require('http');
const  = require('url');
const  = require('crypto');
const  = require('@thunderid/node');

const PORT = 3000;
const SESSION_COOKIE = 'tid_session';

const auth = new ThunderIDNodeClient();

function getSessionId(req) {
  const cookieHeader = req.headers.cookie ?? '';
  for (const part of cookieHeader.split(';')) {
    const [name, value] = part.trim().split('=');
    if (name === SESSION_COOKIE) return decodeURIComponent(value);
  }
  return null;
}

async function main() {
  await auth.initialize({
    clientId: '<your-client-id>',
    clientSecret: '<your-client-secret>',
    baseUrl: 'https://localhost:8090',
    afterSignInUrl: 'http://localhost:3000/callback',
    afterSignOutUrl: 'http://localhost:3000',
  });

  const server = http.createServer(async (req, res) => {
    // routes added in the next step
  });

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:$`);
  });
}

main();
```

:::warning Configuration
Replace `<your-client-id>` and `<your-client-secret>` with the values from your ThunderID application. Set the authorized redirect URL in your application settings to `http://localhost:3000/callback`.
:::

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `clientId` | The Client ID from your ThunderID application |
| `clientSecret` | The Client Secret from your ThunderID application |
| `baseUrl` | Your ThunderID instance URL (e.g., `https://localhost:8090`) |
| `afterSignInUrl` | The callback URL ThunderID redirects to after sign-in |
| `afterSignOutUrl` | The URL to redirect to after sign-out |

## Add Sign-In and Sign-Out Routes

The `signIn` method works in two phases: it first redirects the user to ThunderID, then handles the authorization code on the callback. Session state is tied to a session ID stored in a cookie.

Replace the `// routes added in the next step` comment with:

```js title="index.js" showLineNumbers
    const url = new URL(req.url, `http://localhost:$`);

    try {
      if (url.pathname === '/login') {
        let sessionId = getSessionId(req);
        const extraHeaders = ;
        if (!sessionId) {
          sessionId = randomUUID();
          extraHeaders['Set-Cookie'] =
            `$=$; HttpOnly; SameSite=Lax; Path=/`;
        }
        await auth.signIn((authUrl) => {
          res.writeHead(302, );
          res.end();
        }, sessionId);

      } else if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        const sessionState = url.searchParams.get('session_state');
        const sessionId = getSessionId(req);

        if (!sessionId || !code || !state) {
          res.writeHead(400);
          return res.end('Bad request');
        }

        await auth.signIn(() => , sessionId, code, sessionState, state);
        res.writeHead(302, );
        res.end();

      } else if (url.pathname === '/logout') {
        const sessionId = getSessionId(req);
        if (!sessionId) {
          res.writeHead(302, );
          return res.end();
        }
        const signOutUrl = await auth.signOut(sessionId);
        res.writeHead(302, {
          Location: signOutUrl,
          'Set-Cookie': `$=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
        });
        res.end();

      }
    } catch {
      res.writeHead(500);
      res.end('Internal server error');
    }
```

**How the sign-in flow works:**

1. `GET /login` — generates a session ID, stores it in a cookie, and calls `signIn` with an `authUrlCallback`. The callback receives the ThunderID authorization URL and redirects the user's browser there.
2. `GET /callback` — ThunderID redirects back with `code` and `state` query parameters. Calling `signIn` again with those values exchanges the code for tokens and stores the session.
3. `GET /logout` — calls `signOut` to get the OIDC end-session URL, clears the local cookie, then redirects the browser to complete the logout at ThunderID.

## Protect a Route and Display User Info

Use `isSignedIn` to guard routes and `getUser` to retrieve the authenticated user's profile. Add these inside the same `try` block, before the closing `}`:

```js title="index.js" showLineNumbers
      if (url.pathname === '/') {
        const sessionId = getSessionId(req);
        const signedIn = sessionId && (await auth.isSignedIn(sessionId));
        res.writeHead(200, );
        res.end(signedIn
          ? '<a href="/profile">View profile</a> | <a href="/logout">Sign out</a>'
          : '<a href="/login">Sign in</a>'
        );

      } else if (url.pathname === '/profile') {
        const sessionId = getSessionId(req);
        if (!sessionId || !(await auth.isSignedIn(sessionId))) {
          res.writeHead(302, );
          return res.end();
        }
        const user = await auth.getUser(sessionId);
        res.writeHead(200, );
        res.end(`
          <h1>Welcome, $!</h1>
          <p><strong>Email:</strong> $</p>
          <p><strong>First name:</strong> $</p>
          <p><strong>Last name:</strong> $</p>
          <a href="/logout">Sign out</a>
        `);

      } else if (url.pathname === '/login') {
```

## Complete index.js

Here is the full file for reference:

```js title="index.js" showLineNumbers
const http = require('http');
const  = require('url');
const  = require('crypto');
const  = require('@thunderid/node');

const PORT = 3000;
const SESSION_COOKIE = 'tid_session';

const auth = new ThunderIDNodeClient();

function getSessionId(req) {
  const cookieHeader = req.headers.cookie ?? '';
  for (const part of cookieHeader.split(';')) {
    const [name, value] = part.trim().split('=');
    if (name === SESSION_COOKIE) return decodeURIComponent(value);
  }
  return null;
}

async function main() {
  await auth.initialize({
    clientId: '<your-client-id>',
    clientSecret: '<your-client-secret>',
    baseUrl: 'https://localhost:8090',
    afterSignInUrl: 'http://localhost:3000/callback',
    afterSignOutUrl: 'http://localhost:3000',
  });

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:$`);

    try {
      if (url.pathname === '/') {
        const sessionId = getSessionId(req);
        const signedIn = sessionId && (await auth.isSignedIn(sessionId));
        res.writeHead(200, );
        res.end(signedIn
          ? '<a href="/profile">View profile</a> | <a href="/logout">Sign out</a>'
          : '<a href="/login">Sign in</a>'
        );

      } else if (url.pathname === '/profile') {
        const sessionId = getSessionId(req);
        if (!sessionId || !(await auth.isSignedIn(sessionId))) {
          res.writeHead(302, );
          return res.end();
        }
        const user = await auth.getUser(sessionId);
        res.writeHead(200, );
        res.end(`
          <h1>Welcome, $!</h1>
          <p><strong>Email:</strong> $</p>
          <p><strong>First name:</strong> $</p>
          <p><strong>Last name:</strong> $</p>
          <a href="/logout">Sign out</a>
        `);

      } else if (url.pathname === '/login') {
        let sessionId = getSessionId(req);
        const extraHeaders = ;
        if (!sessionId) {
          sessionId = randomUUID();
          extraHeaders['Set-Cookie'] =
            `$=$; HttpOnly; SameSite=Lax; Path=/`;
        }
        await auth.signIn((authUrl) => {
          res.writeHead(302, );
          res.end();
        }, sessionId);

      } else if (url.pathname === '/callback') {
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        const sessionState = url.searchParams.get('session_state');
        const sessionId = getSessionId(req);

        if (!sessionId || !code || !state) {
          res.writeHead(400);
          return res.end('Bad request');
        }

        await auth.signIn(() => , sessionId, code, sessionState, state);
        res.writeHead(302, );
        res.end();

      } else if (url.pathname === '/logout') {
        const sessionId = getSessionId(req);
        if (!sessionId) {
          res.writeHead(302, );
          return res.end();
        }
        const signOutUrl = await auth.signOut(sessionId);
        res.writeHead(302, {
          Location: signOutUrl,
          'Set-Cookie': `$=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
        });
        res.end();

      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    } catch {
      res.writeHead(500);
      res.end('Internal server error');
    }
  });

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:$`);
  });
}

main();
```

## Run Your App

Start the server:


  <CodeBlock lang="bash" label="npm">
    node index.js



    yarn node index.js



    pnpm node index.js

</CodeGroup>

Open [http://localhost:3000](http://localhost:3000).

:::tip Success
You should see the sign-in link. Click it to be redirected to the ThunderID-hosted sign-in page. After authenticating with your test user, you'll return to the `/profile` route with your user profile displayed.
:::


## You're Done

You have completed the full getting started sequence:

1. ✅ ThunderID running
2. ✅ Application registered with Client ID and Client Secret
3. ✅ Sign-in flow built in the Flow Designer
4. ✅ Node.js app integrated and authenticating

## What's Next


  <a href="../../../guides/flows/what-are-flows" style=}>
    <div style=}>
      <div style=}>Upgrade the sign-in flow
      Add MFA, passkeys, or social login to your flow without changing your route wiring.
      Flow Designer →
    </div>
  </a>

  <a href="../../../../sdks/node/overview" style=}>

      <div style=}>Node.js SDK Reference
      Explore the full API reference for the ThunderID Node.js SDK.
      API Reference →
    </div>
  </a>

</div>
