import{Sn as e}from"./vendor-mui-DfBexhDa.js";import{RC as t,ac as n,cc as r,dp as i,os as a}from"./vendor-oxygen-DFNgTxPQ.js";var o={id:`backend`,displayName:`Backend`,description:`Machine-to-machine backend service`,creationFlow:{steps:[`STACK`,`NAME`,`ORGANIZATION_UNIT`,`COMPLETE`]},defaults:{name:`Backend Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`client_credentials`],pkceRequired:!1,tokenEndpointAuthMethod:`client_secret_basic`,publicClient:!1}}]}},s={id:`browser`,displayName:`Browser`,description:`Web application running in browser`,defaults:{name:`Browser Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[],pkceRequired:!0,tokenEndpointAuthMethod:`none`,publicClient:!0}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!0},pkceRequired:{readOnly:!0,value:!0},tokenEndpointAuthMethod:{readOnly:!0,value:`none`}}}},c={id:`custom`,displayName:`Custom`,description:`Fully customizable application with all configuration options available`,creationFlow:{steps:[`NAME`,`ORGANIZATION_UNIT`,`COMPLETE`]},defaults:{name:`My Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`client_credentials`],responseTypes:[],redirectUris:[],pkceRequired:!1,tokenEndpointAuthMethod:`client_secret_basic`,publicClient:!1}}],allowedUserTypes:[]}},l={id:`server`,displayName:`Full-Stack`,description:`Apps with both server and client code`,defaults:{name:`Full-Stack Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[],pkceRequired:!0,tokenEndpointAuthMethod:`client_secret_basic`,publicClient:!1}}],allowedUserTypes:[]}},u={id:`mobile`,displayName:`Mobile`,description:`Native mobile application`,defaults:{name:`Mobile Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[],pkceRequired:!0,tokenEndpointAuthMethod:`none`,publicClient:!0}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!0},pkceRequired:{readOnly:!0,value:!0},tokenEndpointAuthMethod:{readOnly:!0,value:`none`}}}},d={REACT:`REACT`,EXPRESS:`EXPRESS`,NEXTJS:`NEXTJS`,VANILLA_JS:`VANILLA_JS`,VUE:`VUE`,NUXT:`NUXT`,NODEJS:`NODEJS`,OTHER:`OTHER`},f={BACKEND:`BACKEND`,BROWSER:`BROWSER`,MOBILE:`MOBILE`,FULL_STACK:`FULL_STACK`,CUSTOM:`CUSTOM`},p=e(),m=[{value:f.BROWSER,icon:(0,p.jsx)(i,{size:32}),titleKey:`applications:onboarding.configure.stack.platform.browser.title`,descriptionKey:`applications:onboarding.configure.stack.platform.browser.description`,template:s,categories:[`web`]},{value:f.FULL_STACK,icon:(0,p.jsx)(r,{size:32}),titleKey:`applications:onboarding.configure.stack.platform.full_stack.title`,descriptionKey:`applications:onboarding.configure.stack.platform.full_stack.description`,template:l,categories:[`web`,`backend`]},{value:f.MOBILE,icon:(0,p.jsx)(a,{size:32}),titleKey:`applications:onboarding.configure.stack.platform.mobile.title`,descriptionKey:`applications:onboarding.configure.stack.platform.mobile.description`,template:u,categories:[`mobile`]},{value:f.BACKEND,icon:(0,p.jsx)(t,{size:32}),titleKey:`applications:onboarding.configure.stack.platform.backend.title`,descriptionKey:`applications:onboarding.configure.stack.platform.backend.description`,template:o,categories:[`backend`]},{value:f.CUSTOM,icon:(0,p.jsx)(n,{size:32}),titleKey:`applications:onboarding.configure.stack.platform.custom.title`,descriptionKey:`applications:onboarding.configure.stack.platform.custom.description`,template:c,categories:[`web`,`backend`,`mobile`]}],h={id:`express`,displayName:`Express`,description:`Server-side Node.js application built with Express`,defaults:{name:`Express Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[`http://localhost:3000/login`],pkceRequired:!1,tokenEndpointAuthMethod:`client_secret_basic`,publicClient:!1}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!1},tokenEndpointAuthMethod:{readOnly:!0,value:`client_secret_basic`}}},integrationGuides:{INBUILT:{llm_prompt:{id:`llm-prompt`,title:`Integrate with a Coding Agent Prompt`,description:`Use AI to generate integration code for your Express application`,type:`llm`,icon:`sparkles`,content:"# Integrate {{productName}} Authentication in an Express Application (Inbuilt Mode)\n\n## Context\nI have an Express application and I want to integrate {{productName}} authentication using the ThunderID Express SDK with {{productName}}-hosted sign-in pages.\n\n## Requirements\n- Use `@thunderid/express` in a Node.js + Express application\n- Use `cookie-parser` and `express.json()` middleware\n- Configure ThunderID middleware with `baseUrl`, `clientId`, `clientSecret`, `afterSignInUrl`, and `afterSignOutUrl`\n- Implement `/login` with `handleSignIn()` and `/logout` with `handleSignOut()`\n- Protect a route (`/protected`) using `protect((res) => res.redirect('/login'))`\n- Add a `/me` route that returns the authenticated user profile as JSON\n- Keep the code minimal, production-lean, and fully runnable\n\n## Configuration\n- **Client ID**: {{clientId}}\n- **Client Secret**: `<your-client-secret>`\n- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)\n- **App URL**: http://localhost:3000\n- **Login Callback Route**: `/login`\n- **Logout Callback Route**: `/logout`\n- **SDK**: @thunderid/express\n\n## Important Rules\n- Use CommonJS syntax (`require`) in `index.js`\n- Use these SDK imports exactly: `thunderID`, `handleSignIn`, `handleSignOut`, `protect`\n- Ensure redirect URL alignment: the app callback URL must be `http://localhost:3000/login`, and the post-logout redirect URL must be `http://localhost:3000/logout`\n- Do not invent unsupported SDK APIs or custom wrappers\n- Keep route names and behavior exactly as specified\n\n## Implementation Steps\n1. Create a new project and install `express` and `cookie-parser`\n2. Install `@thunderid/express`\n3. Add `index.js` with ThunderID middleware and auth routes\n4. Add `/protected` and `/me` routes with `protect()`\n5. Start the server with `node index.js`\n6. Validate the flow by opening `/protected`, then `/me`\n\nPlease provide:\n- The exact terminal commands\n- A complete `index.js` file\n- A short verification checklist for sign-in, sign-out, and protected route behavior"},manual_steps:[{step:1,title:`Create an Express app`,description:`Create your project and install the base dependencies:`,code:{language:`terminal`,content:`mkdir my-express-app
cd my-express-app
npm init -y
npm install express cookie-parser`}},{step:2,title:`Install @thunderid/express`,description:`Install the ThunderID Express SDK package:`,code:{language:`terminal`,content:`npm install @thunderid/express`}},{step:3,title:`Add ThunderID middleware and authentication routes`,description:`Create an index.js file with middleware and auth route handlers:`,code:{language:`javascript`,filename:`index.js`,content:`const express = require('express');
const cookieParser = require('cookie-parser');
const {thunderID, handleSignIn, handleSignOut, protect} = require('@thunderid/express');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

app.use(
  thunderID({
    baseUrl: 'https://localhost:8090',
    clientId: '{{clientId}}',
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
  console.log(\`Server running on http://localhost:\${port}\`);
});`}},{step:4,title:`Update credentials`,description:`Replace the placeholders with your actual application credentials from {{productName}}:`,bullets:["Replace `{{clientId}}` with your Client ID","Replace `<your-client-secret>` with your Client Secret","Ensure your authorized redirect URL is `http://localhost:3000/login`","Ensure your allowed post-logout redirect URL is `http://localhost:3000/logout`"]},{step:5,title:`Run the app`,description:`Start your Express server:`,code:{language:`terminal`,content:`node index.js`}},{step:6,title:`Verify authentication flow`,description:`Test the integration end-to-end:`,bullets:["Open `http://localhost:3000/protected` and verify redirect to {{productName}} sign-in",`Sign in and confirm access to the protected route`,"Open `http://localhost:3000/me` to inspect the signed-in user profile JSON","Open `http://localhost:3000/logout` while signed in and verify sign-out"]}]}}},g={id:`nextjs`,displayName:`Next.js`,description:`Server-side rendered application built with Next.js`,defaults:{name:`Next.js Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[`http://localhost:3000`],pkceRequired:!1,tokenEndpointAuthMethod:`client_secret_post`,publicClient:!1}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!1},pkceRequired:{readOnly:!0,value:!1},tokenEndpointAuthMethod:{readOnly:!0,value:`client_secret_post`}}},integrationGuides:{INBUILT:{llm_prompt:{id:`llm-prompt`,title:`Integrate with a Coding Agent Prompt`,description:`Use AI to generate integration code for your Next.js application`,type:`llm`,icon:`sparkles`,content:`# Integrate {{productName}} Authentication in Next.js Application

## Context
I have a Next.js application (App Router) and I want to integrate {{productName}}'s authentication system using the {{productName}} Next.js SDK with {{productName}}-hosted login pages.

## Requirements
- Use @thunderid/nextjs SDK for authentication
- Configure {{productName}}-hosted login pages (not custom/embedded)
- Use the App Router (not Pages Router)
- Implement sign-in and sign-out with prebuilt components
- Add middleware for route protection and automatic token refresh
- Display signed-in user's profile information

## Configuration
- **Client ID**: {{clientId}}
- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)
- **SDK**: @thunderid/nextjs

## IMPORTANT Configuration Rules
- Use environment variables for configuration (NOT props on the provider)
- Required env vars: NEXT_PUBLIC_THUNDERID_BASE_URL, NEXT_PUBLIC_THUNDERID_CLIENT_ID, THUNDERID_CLIENT_SECRET, THUNDERID_SECRET
- Import ThunderIDProvider from '@thunderid/nextjs/server' (NOT from '@thunderid/nextjs')
- Import middleware utilities from '@thunderid/nextjs/middleware'
- Import UI components from '@thunderid/nextjs'
- The ThunderIDProvider handles the OAuth callback automatically — no manual callback route is needed

## Implementation Steps
1. Create a Next.js app: npx create-next-app@latest nextjs-demo
2. Navigate into the project: cd nextjs-demo
3. Install @thunderid/nextjs: npm install @thunderid/nextjs
4. Create .env.local with NEXT_PUBLIC_THUNDERID_BASE_URL, NEXT_PUBLIC_THUNDERID_CLIENT_ID, THUNDERID_CLIENT_SECRET, THUNDERID_SECRET
5. Wrap root layout with <ThunderIDProvider> from '@thunderid/nextjs/server'
6. Create middleware.ts with thunderIDMiddleware and createRouteMatcher for route protection
7. Add SignInButton, SignOutButton, SignedIn, SignedOut, UserDropdown components to pages
8. Run: npm run dev

Please provide complete, working code with proper configuration for {{productName}} authentication using the {{productName}} Next.js SDK.`},manual_steps:[{step:1,title:`Create a Next.js app`,description:`Run the following command to create a new Next.js app:`,code:{language:`terminal`,content:`npx create-next-app@latest nextjs-demo
cd nextjs-demo`}},{step:2,title:`Install @thunderid/nextjs`,description:`The {{productName}} Next.js SDK provides server-side authentication, middleware, and prebuilt UI components.`,subDescription:`Run the following command to install the SDK:`,code:{language:`terminal`,content:`npm install @thunderid/nextjs`}},{step:3,title:`Set environment variables`,description:`Create a .env.local file in your project root with the following configuration:`,code:{language:`bash`,filename:`.env.local`,content:`NEXT_PUBLIC_THUNDERID_BASE_URL=https://localhost:8090
NEXT_PUBLIC_THUNDERID_CLIENT_ID={{clientId}}
THUNDERID_CLIENT_SECRET=<your-client-secret>
THUNDERID_SECRET=<a-random-secret-at-least-32-chars>`}},{step:4,title:`Add <ThunderIDProvider /> to your layout`,description:`Wrap your root layout with the ThunderIDProvider from the server export:`,code:{language:`typescript`,filename:`app/layout.tsx`,content:`import { ThunderIDProvider } from '@thunderid/nextjs/server'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThunderIDProvider>
          {children}
        </ThunderIDProvider>
      </body>
    </html>
  )
}`}},{step:5,title:`Add middleware for route protection`,description:`Create a middleware.ts file at your project root:`,code:{language:`typescript`,filename:`middleware.ts`,content:`import {
  thunderIDMiddleware,
  createRouteMatcher,
} from '@thunderid/nextjs/middleware'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default thunderIDMiddleware(async (thunderid, request) => {
  if (isProtectedRoute(request)) {
    await thunderid.protectRoute()
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}`}},{step:6,title:`Add sign-in and sign-out`,description:`Update your home page with authentication components:`,code:{language:`typescript`,filename:`app/page.tsx`,content:`import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserDropdown,
} from '@thunderid/nextjs'

export default function Home() {
  return (
    <main>
      <h1>{{productName}} Next.js Demo</h1>

      <SignedOut>
        <SignInButton>Sign In</SignInButton>
      </SignedOut>

      <SignedIn>
        <UserDropdown />
        <SignOutButton>Sign Out</SignOutButton>
      </SignedIn>
    </main>
  )
}`}},{step:7,title:`Run the app`,description:`Start your development server and test the authentication flow:`,code:{language:`terminal`,content:`npm run dev`}}]}}},_={id:`node`,displayName:`Node.js`,description:`Backend service built with Node.js`,creationFlow:{steps:[`STACK`,`NAME`,`ORGANIZATION_UNIT`,`COMPLETE`]},defaults:{name:`Node.js Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[`http://localhost:3000/callback`],pkceRequired:!1,tokenEndpointAuthMethod:`client_secret_basic`,publicClient:!1}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!1},tokenEndpointAuthMethod:{readOnly:!0,value:`client_secret_basic`}}},integrationGuides:{INBUILT:{llm_prompt:{id:`llm-prompt`,title:`Integrate with a Coding Agent Prompt`,description:`Use AI to generate integration code for your Node.js application`,type:`llm`,icon:`sparkles`,content:`# Integrate {{productName}} Authentication in a Node.js Application

## Context
I have a Node.js application and I want to integrate {{productName}} authentication using the @thunderid/node SDK and the built-in http module — no framework required.

## Requirements
- Use @thunderid/node SDK with the built-in Node.js http module
- Initialize ThunderIDNodeClient with clientId, clientSecret, baseUrl, afterSignInUrl, afterSignOutUrl
- Implement /login route to start the sign-in flow (redirects to {{productName}})
- Implement /callback route to handle the OAuth authorization code exchange
- Implement /logout route to sign out and clear the session cookie
- Protect the /profile route using isSignedIn() and display user info with getUser()
- Manage sessions using a session ID stored in an HttpOnly cookie
- Keep code minimal and fully runnable with CommonJS require()

## Configuration
- **Client ID**: {{clientId}}
- **Client Secret**: \`<your-client-secret>\`
- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)
- **App URL**: http://localhost:3000
- **Callback Route**: /callback
- **SDK**: @thunderid/node

## Important Rules
- Use CommonJS syntax (require) in index.js
- Initialize ThunderIDNodeClient with auth.initialize({...}) before starting the server
- signIn() works in two phases: first call redirects the user (authUrlCallback), second call (with code+state) exchanges the token
- Store the session ID in a cookie named 'tid_session' with HttpOnly and SameSite=Lax flags
- Use randomUUID() from the built-in 'crypto' module to generate session IDs
- Use isSignedIn(sessionId) to guard protected routes
- Use getUser(sessionId) to retrieve the authenticated user profile
- Use signOut(sessionId) to get the OIDC end-session URL, then clear the local cookie and redirect

## Implementation Steps
1. Create a new project: mkdir my-node-app && cd my-node-app && npm init -y
2. Install @thunderid/node: npm install @thunderid/node
3. Create index.js with ThunderIDNodeClient initialization
4. Add /login route: generate session ID cookie and redirect to {{productName}} auth URL
5. Add /callback route: exchange authorization code for tokens using signIn()
6. Add /logout route: call signOut() to get end-session URL, clear cookie, redirect
7. Add / route: show sign-in or profile link based on isSignedIn()
8. Add /profile route: guard with isSignedIn(), display user info from getUser()
9. Start the server: node index.js

Please provide a complete, working index.js file with all routes and the ThunderIDNodeClient wired up correctly.`},manual_steps:[{step:1,title:`Create a Node.js project`,description:`Initialize a new Node.js project:`,code:{language:`terminal`,content:`mkdir my-node-app
cd my-node-app
npm init -y`}},{step:2,title:`Install @thunderid/node`,description:`The {{productName}} Node.js SDK provides a framework-agnostic authentication client for server-side Node.js applications.`,subDescription:`Run the following command to install the SDK:`,code:{language:`terminal`,content:`npm install @thunderid/node`}},{step:3,title:`Initialize the client`,description:`Create an index.js file and initialize the ThunderIDNodeClient with your application credentials:`,code:{language:`javascript`,filename:`index.js`,content:`const http = require('http');
const { URL } = require('url');
const { randomUUID } = require('crypto');
const { ThunderIDNodeClient } = require('@thunderid/node');

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
    clientId: '{{clientId}}',
    clientSecret: '<your-client-secret>',
    baseUrl: 'https://localhost:8090',
    afterSignInUrl: 'http://localhost:3000/callback',
    afterSignOutUrl: 'http://localhost:3000',
  });

  const server = http.createServer(async (req, res) => {
    // routes added in the next step
  });

  server.listen(PORT, () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

main();`}},{step:4,title:`Add sign-in, callback, and sign-out routes`,description:`Replace the routes comment in index.js with sign-in, callback, and sign-out handling:`,code:{language:`javascript`,filename:`index.js`,content:`    const url = new URL(req.url, \`http://localhost:\${PORT}\`);

    try {
      if (url.pathname === '/login') {
        let sessionId = getSessionId(req);
        const extraHeaders = {};
        if (!sessionId) {
          sessionId = randomUUID();
          extraHeaders['Set-Cookie'] =
            \`\${SESSION_COOKIE}=\${sessionId}; HttpOnly; SameSite=Lax; Path=/\`;
        }
        await auth.signIn((authUrl) => {
          res.writeHead(302, { ...extraHeaders, Location: authUrl });
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

        await auth.signIn(() => {}, sessionId, code, sessionState, state);
        res.writeHead(302, { Location: '/profile' });
        res.end();

      } else if (url.pathname === '/logout') {
        const sessionId = getSessionId(req);
        if (!sessionId) {
          res.writeHead(302, { Location: '/' });
          return res.end();
        }
        const signOutUrl = await auth.signOut(sessionId);
        res.writeHead(302, {
          Location: signOutUrl,
          'Set-Cookie': \`\${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0\`,
        });
        res.end();
      }
    } catch {
      res.writeHead(500);
      res.end('Internal server error');
    }`}},{step:5,title:`Add protected profile route`,description:`Add the home and profile routes inside the same try block, before the closing }:`,code:{language:`javascript`,filename:`index.js`,content:`      if (url.pathname === '/') {
        const sessionId = getSessionId(req);
        const signedIn = sessionId && (await auth.isSignedIn(sessionId));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(signedIn
          ? '<a href="/profile">View profile</a> | <a href="/logout">Sign out</a>'
          : '<a href="/login">Sign in</a>'
        );

      } else if (url.pathname === '/profile') {
        const sessionId = getSessionId(req);
        if (!sessionId || !(await auth.isSignedIn(sessionId))) {
          res.writeHead(302, { Location: '/login' });
          return res.end();
        }
        const user = await auth.getUser(sessionId);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(\`
          <h1>Welcome, \${user.name || user.username}!</h1>
          <p><strong>Email:</strong> \${user.email}</p>
          <p><strong>First name:</strong> \${user.given_name}</p>
          <p><strong>Last name:</strong> \${user.family_name}</p>
          <a href="/logout">Sign out</a>
        \`);
      }`}},{step:6,title:`Update credentials`,description:`Replace the placeholders with your actual application credentials from {{productName}}:`,bullets:["Replace `{{clientId}}` with your Client ID","Replace `<your-client-secret>` with your Client Secret","Ensure your authorized redirect URL is `http://localhost:3000/callback`"]},{step:7,title:`Run the app`,description:`Start your Node.js server:`,code:{language:`terminal`,content:`node index.js`}},{step:8,title:`Verify authentication flow`,description:`Test the integration end-to-end:`,bullets:["Open `http://localhost:3000` and click Sign in to be redirected to {{productName}}","Authenticate with your test user and confirm redirect back to `/profile`",`Verify user profile details are displayed on the profile page`,`Click Sign out and verify the session is cleared`]}]}}},v={id:`nuxt`,displayName:`Nuxt`,description:`Full-stack Vue framework with server-side rendering`,defaults:{name:`Nuxt Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[`http://localhost:3000/api/auth/callback`],pkceRequired:!0,tokenEndpointAuthMethod:`client_secret_post`,publicClient:!1}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!1},pkceRequired:{readOnly:!0,value:!0},tokenEndpointAuthMethod:{readOnly:!0,value:`client_secret_post`}}},integrationGuides:{INBUILT:{llm_prompt:{id:`llm-prompt`,title:`Integrate with a Coding Agent Prompt`,description:`Use AI to generate integration code for your Nuxt 3 application`,type:`llm`,icon:`sparkles`,content:`# Integrate {{productName}} Authentication in Nuxt 3 Application

## Context
I have a Nuxt 3 application and I want to integrate {{productName}}'s authentication system using the @thunderid/nuxt module with {{productName}}-hosted login pages.

## Requirements
- Use @thunderid/nuxt module for authentication
- Register the module in nuxt.config.ts
- Configure via environment variables (no inline config)
- Wrap app.vue content with <ThunderIDRoot>
- Implement sign-in and sign-out with auto-imported components
- Display signed-in user's profile information
- Optionally protect pages with the built-in thunderIDMiddleware

## Configuration
- **Client ID**: {{clientId}}
- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)
- **Callback URL**: http://localhost:3000/api/auth/callback (auto-registered by the module)
- **SDK**: @thunderid/nuxt

## IMPORTANT Configuration Rules
- Add '@thunderid/nuxt' to the modules array in nuxt.config.ts — no other config needed there
- All configuration is read from environment variables with NUXT_PUBLIC_ prefix for public values
- Required env vars: NUXT_PUBLIC_THUNDERID_BASE_URL, NUXT_PUBLIC_THUNDERID_CLIENT_ID, THUNDERID_CLIENT_SECRET, THUNDERID_SESSION_SECRET
- THUNDERID_CLIENT_SECRET and THUNDERID_SESSION_SECRET must NOT have the NUXT_PUBLIC_ prefix
- The /api/auth/callback route is auto-registered by the module — do NOT create it manually
- Wrap <NuxtPage /> with <ThunderIDRoot> in app.vue
- All components (SignedIn, SignedOut, SignInButton, SignOutButton, User) and composables are auto-imported
- Protect pages by adding definePageMeta({ middleware: ['thunderIDMiddleware'] })

## Implementation Steps
1. Create a Nuxt 3 app: npx nuxi@latest init my-nuxt-app
2. Navigate into the project: cd my-nuxt-app && npm install
3. Install @thunderid/nuxt: npm install @thunderid/nuxt
4. Add '@thunderid/nuxt' to modules in nuxt.config.ts
5. Create .env with NUXT_PUBLIC_THUNDERID_BASE_URL, NUXT_PUBLIC_THUNDERID_CLIENT_ID, THUNDERID_CLIENT_SECRET, THUNDERID_SESSION_SECRET
6. Wrap <NuxtPage /> with <ThunderIDRoot> in app.vue
7. Create pages/index.vue with SignInButton, SignOutButton, SignedIn, SignedOut, and User components
8. Optionally add definePageMeta({ middleware: ['thunderIDMiddleware'] }) to protected pages
9. Run: npm run dev

Please provide complete, working code with proper configuration for {{productName}} authentication using the @thunderid/nuxt module.`},manual_steps:[{step:1,title:`Create a Nuxt 3 app`,description:`Run the following command to create a new Nuxt 3 app:`,code:{language:`terminal`,content:`npx nuxi@latest init my-nuxt-app
cd my-nuxt-app
npm install`}},{step:2,title:`Install @thunderid/nuxt`,description:`The {{productName}} Nuxt module provides server-side auth, auto-imported components, and route middleware.`,subDescription:`Run the following command to install the module:`,code:{language:`terminal`,content:`npm install @thunderid/nuxt`}},{step:3,title:`Register the module`,description:`Add @thunderid/nuxt to the modules array in nuxt.config.ts:`,code:{language:`typescript`,filename:`nuxt.config.ts`,content:`export default defineNuxtConfig({
  modules: ['@thunderid/nuxt'],
})`}},{step:4,title:`Set environment variables`,description:`Create a .env file in your project root with the following configuration:`,code:{language:`bash`,filename:`.env`,content:`NUXT_PUBLIC_THUNDERID_BASE_URL=https://localhost:8090
NUXT_PUBLIC_THUNDERID_CLIENT_ID={{clientId}}
THUNDERID_CLIENT_SECRET=<your-client-secret>
THUNDERID_SESSION_SECRET=<a-random-secret-at-least-32-chars>`}},{step:5,title:`Wrap your app with <ThunderIDRoot />`,description:`Update app.vue to wrap your application content with the ThunderIDRoot component:`,code:{language:`vue`,filename:`app.vue`,content:`<template>
  <ThunderIDRoot>
    <NuxtPage />
  </ThunderIDRoot>
</template>`}},{step:6,title:`Add sign-in and sign-out`,description:`Create pages/index.vue with authentication components (all auto-imported by the module):`,code:{language:`vue`,filename:`pages/index.vue`,content:`<template>
  <main>
    <header>
      <h1>{{productName}} Auth Demo</h1>
      <SignedIn>
        <SignOutButton>Sign Out</SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>Sign In</SignInButton>
      </SignedOut>
    </header>
  </main>
</template>`}},{step:7,title:`Display signed-in user's profile information`,description:`Update pages/index.vue to use the User component with a scoped slot to display the signed-in user's profile:`,code:{language:`vue`,filename:`pages/index.vue`,content:`<template>
  <main>
    <header>
      <h1>{{productName}} Auth Demo</h1>
      <SignedIn>
        <SignOutButton>Sign Out</SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>Sign In</SignInButton>
      </SignedOut>
    </header>

    <section>
      <SignedIn>
        <User>
          <template #default="{ user }">
            <div class="user-profile">
              <img
                v-if="user.picture"
                :src="user.picture"
                :alt="user.name || 'User avatar'"
                style="width: 80px; height: 80px; border-radius: 50%"
              />
              <h2>Welcome, {{ user.name || user.username }}!</h2>
              <div>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>First Name:</strong> {{ user.given_name }}</p>
                <p><strong>Last Name:</strong> {{ user.family_name }}</p>
              </div>
            </div>
          </template>
        </User>
      </SignedIn>
    </section>
  </main>
</template>`}},{step:8,title:`Run the app`,description:`Start your development server and test the authentication flow:`,code:{language:`terminal`,content:`npm run dev`}}]}}},y={id:`react`,displayName:`React`,description:`Single Page Application built with React`,defaults:{name:`React Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[`http://localhost:5173`],pkceRequired:!0,tokenEndpointAuthMethod:`none`,publicClient:!0}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!0},pkceRequired:{readOnly:!0,value:!0},tokenEndpointAuthMethod:{readOnly:!0,value:`none`}}},integrationGuides:JSON.parse('{"INBUILT":{"llm_prompt":{"id":"llm-prompt","title":"Integrate with a Coding Agent Prompt","description":"Use AI to generate integration code for your React application","type":"llm","icon":"sparkles","content":"# Integrate {{productName}} Authentication in React Application (Inbuilt Mode)\\n\\n## Context\\nI have a React application and I want to integrate {{productName}}\'s authentication system using the ThunderID React SDK with {{productName}}-hosted login pages.\\n\\n## Requirements\\n- Use @thunderid/react SDK for authentication\\n- Configure {{productName}}-hosted login, registration, and account management UIs\\n- Implement sign-in and sign-out functionality using prebuilt components\\n- Display signed-in user\'s profile information\\n- Handle authentication state automatically\\n\\n## Configuration\\n- **Client ID**: {{clientId}}\\n- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)\\n- **SDK**: @thunderid/react\\n\\n## IMPORTANT Configuration Rules\\n- DO NOT create a separate config object - pass all configuration as individual props directly to <ThunderIDProvider>\\n- Required props: `clientId` and `baseUrl`\\n- Optional props: `afterSignInUrl`, `afterSignOutUrl`, `scopes` (string array)\\n- NEVER use property names like `signInRedirectURL` or `signOutRedirectURL`\\n- Example: <ThunderIDProvider clientId=\\"xxx\\" baseUrl=\\"xxx\\">\\n\\n## Implementation Steps\\n1. Create a React app using Vite by running: `npm create vite@latest react-demo -- --template react --rolldown --no-interactive`\\n2. Navigate into the project directory: `cd react-demo`\\n3. Install dependencies: `npm install`\\n4. Install @thunderid/react package: `npm install @thunderid/react`\\n5. Wrap your app with <ThunderIDProvider /> and configure clientId and baseUrl\\n6. Add <SignInButton /> for signed-out users and <SignOutButton /> for signed-in users\\n7. Use <SignedIn> and <SignedOut> components to conditionally render UI\\n8. Display user profile with <UserDropdown /> component\\n9. Run the development server: `npm run dev`\\n\\nPlease provide complete, working code with proper configuration for {{productName}} authentication using the ThunderID React SDK."},"manual_steps":[{"step":1,"title":"Create a React app using Vite","description":"Run the following command to create a new React app with Vite:","code":{"language":"terminal","content":"npm create vite@latest react-demo -- --template react --rolldown --no-interactive\\ncd react-demo\\nnpm install"}},{"step":2,"title":"Install @thunderid/react","description":"The ThunderID React SDK provides prebuilt components, hooks, and helpers for {{productName}} authentication.","subDescription":"Run the following command to install the SDK:","code":{"language":"terminal","content":"npm install @thunderid/react"}},{"step":3,"title":"Add <ThunderIDProvider /> to your app","description":"In your main.jsx or index.jsx, wrap your application with the ThunderIDProvider component:","code":{"language":"javascript","filename":"src/main.jsx","content":"import { StrictMode } from \'react\'\\nimport { createRoot } from \'react-dom/client\'\\nimport \'./index.css\'\\nimport App from \'./App.jsx\'\\nimport { ThunderIDProvider } from \'@thunderid/react\'\\n\\ncreateRoot(document.getElementById(\'root\')).render(\\n  <StrictMode>\\n    <ThunderIDProvider\\n      clientId=\\"{{clientId}}\\"\\n      baseUrl=\\"https://localhost:8090\\"\\n    >\\n      <App />\\n    </ThunderIDProvider>\\n  </StrictMode>\\n)"}},{"step":4,"title":"Add <SignInButton /> and <SignOutButton /> to your app","description":"Replace the existing content of the App.jsx file with following content:","code":{"language":"javascript","filename":"src/App.jsx","content":"import { SignedIn, SignedOut, SignInButton, SignOutButton } from \'@thunderid/react\'\\nimport \'./App.css\'\\n\\nfunction App() {\\n  return (\\n    <header>\\n      <SignedIn>\\n        <SignOutButton />\\n      </SignedIn>\\n      <SignedOut>\\n        <SignInButton />\\n      </SignedOut>\\n    </header>\\n  )\\n}\\n\\nexport default App"}},{"step":5,"title":"Display signed-in user\'s profile information","description":"Add the UserDropdown component to display user profile information:","code":{"language":"javascript","filename":"src/App.jsx","content":"import { SignedIn, SignedOut, SignInButton, SignOutButton, UserDropdown } from \'@thunderid/react\'\\nimport \'./App.css\'\\n\\nfunction App() {\\n  return (\\n    <>\\n      <header>\\n        <SignedIn>\\n          <UserDropdown />\\n          <SignOutButton />\\n        </SignedIn>\\n        <SignedOut>\\n          <SignInButton />\\n        </SignedOut>\\n      </header>\\n    </>\\n  )\\n}\\n\\nexport default App"}},{"step":6,"title":"Run the app","description":"Start your development server and test the authentication flow:","code":{"language":"terminal","content":"npm run dev"}}]},"EMBEDDED":{"llm_prompt":{"id":"llm-prompt","title":"Integrate with a Coding Agent Prompt","description":"Use AI to generate integration code for your React application","type":"llm","icon":"sparkles","content":"# Integrate {{productName}} Authentication in React Application (Custom Mode)\\n\\n## Context\\nI have a React application and I want to integrate {{productName}}\'s authentication system using the ThunderID React SDK with a custom login UI instead of {{productName}}-hosted pages.\\n\\n## Requirements\\n- Use @thunderid/react SDK for authentication\\n- Build custom login UI with the <SignIn /> component\\n- Use react-router-dom for routing to the custom sign-in page\\n- Configure custom signInUrl in ThunderIDProvider\\n- Implement sign-in and sign-out functionality\\n- Display signed-in user\'s profile information\\n- Handle authentication state automatically\\n\\n## Configuration\\n- **Application ID**: {{applicationId}}\\n- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)\\n- **Sign In URL**: http://localhost:5173/signin (custom route)\\n- **SDK**: @thunderid/react\\n- **Router**: react-router-dom\\n\\n## IMPORTANT Configuration Rules\\n- DO NOT create a separate config object - pass all configuration as individual props directly to <ThunderIDProvider>\\n- Required props: `baseUrl`, `signInUrl`, and `applicationId`\\n- Optional props: `afterSignInUrl`, `afterSignOutUrl`, `scopes`\\n- NEVER use property names like `signInRedirectURL` or `signOutRedirectURL`\\n- Example: <ThunderIDProvider baseUrl=\\"xxx\\" signInUrl=\\"xxx\\" applicationId=\\"xxx\\">\\n\\n## Available SDK APIs\\n\\n### Hook: useThunderID (ONLY hook available)\\n- The SDK provides ONLY ONE hook: `useThunderID`\\n- No other hooks like useAuth, useSession, useUser, etc. exist\\n- Use this hook to access authentication state and methods\\n\\nExample:\\n```javascript\\nimport { useThunderID } from \'@thunderid/react\';\\n\\nconst MyComponent = () => {\\n  const { isSignedIn, user, signIn, signOut } = useThunderID();\\n\\n  return (\\n    <div>\\n      {isSignedIn ? (\\n        <>\\n          <p>Welcome, {user.displayName}!</p>\\n          <button onClick={signOut}>Sign Out</button>\\n        </>\\n      ) : (\\n        <button onClick={signIn}>Sign In</button>\\n      )}\\n    </div>\\n  );\\n};\\n```\\n\\n### User Data Components (use if needed)\\n\\n1. **User Component** - Render props for user data:\\n```javascript\\nimport { User } from \'@thunderid/react\'\\n\\n<User fallback={<p>Please sign in</p>}>\\n  {(user) => (\\n    <div>\\n      <h1>Welcome, {user?.displayName}!</h1>\\n      <p>Email: {user?.email}</p>\\n    </div>\\n  )}\\n</User>\\n```\\n\\n2. **UserProfile Component** - Pre-built user profile UI:\\n```javascript\\nimport { UserProfile } from \'@thunderid/react\'\\n\\n<UserProfile />\\n```\\n\\n## Implementation Steps\\n1. Create a React app using Vite by running: `npm create vite@latest react-demo -- --template react --rolldown --no-interactive`\\n2. Navigate into the project directory: `cd react-demo`\\n3. Install dependencies: `npm install`\\n4. Install react-router-dom package: `npm install react-router-dom`\\n5. Install @thunderid/react package: `npm install @thunderid/react`\\n6. Wrap your app with <ThunderIDProvider /> and configure baseUrl, signInUrl, and applicationId\\n7. Set up React Router with BrowserRouter\\n8. Add <SignInButton /> for signed-out users and <SignOutButton /> for signed-in users\\n9. Create a /signin route and integrate the <SignIn /> component\\n10. Use <SignedIn> and <SignedOut> components to conditionally render UI\\n11. Display user profile with <UserDropdown /> component or use useThunderID hook if needed\\n12. Run the development server: `npm run dev`\\n\\nPlease provide complete, working code with:\\n- Proper routing configuration\\n- Custom sign-in page integration\\n- Proper integration with the ThunderID React SDK\\n- Use of useThunderID hook if programmatic access to auth state is needed"},"manual_steps":[{"step":1,"title":"Create a React app using Vite","description":"Run the following command to create a new React app with Vite:","code":{"language":"terminal","content":"npm create vite@latest react-demo -- --template react --rolldown --no-interactive\\ncd react-demo\\nnpm install"}},{"step":2,"title":"Install react-router","description":"Install react-router-dom for routing to the custom sign-in page:","code":{"language":"terminal","content":"npm install react-router-dom"}},{"step":3,"title":"Install @thunderid/react","description":"The ThunderID React SDK provides prebuilt components, hooks, and helpers for {{productName}} authentication:","code":{"language":"terminal","content":"npm install @thunderid/react"}},{"step":4,"title":"Add <ThunderIDProvider /> to your app","description":"In your main.jsx or index.jsx, wrap your application with the ThunderIDProvider component and configure the signInUrl:","code":{"language":"javascript","filename":"src/main.jsx","content":"import { StrictMode } from \'react\'\\nimport { createRoot } from \'react-dom/client\'\\nimport \'./index.css\'\\nimport App from \'./App.jsx\'\\nimport { ThunderIDProvider } from \'@thunderid/react\'\\n\\ncreateRoot(document.getElementById(\'root\')).render(\\n  <StrictMode>\\n    <ThunderIDProvider\\n      baseUrl=\\"https://localhost:8090\\"\\n      signInUrl=\\"http://localhost:5173/signin\\"\\n      applicationId=\\"{{applicationId}}\\"\\n    >\\n      <App />\\n    </ThunderIDProvider>\\n  </StrictMode>\\n)"}},{"step":5,"title":"Add <SignInButton /> and <SignOutButton /> to your app","description":"Replace the existing content of the App.jsx file with following content:","code":{"language":"javascript","filename":"src/App.jsx","content":"import { SignedIn, SignedOut, SignInButton, SignOutButton } from \'@thunderid/react\'\\nimport \'./App.css\'\\n\\nfunction App() {\\n  return (\\n    <header>\\n      <SignedIn>\\n        <SignOutButton />\\n      </SignedIn>\\n      <SignedOut>\\n        <SignInButton />\\n      </SignedOut>\\n    </header>\\n  )\\n}\\n\\nexport default App"}},{"step":6,"title":"Integrate the <SignIn /> component","description":"Create a new route /signin and add the <SignIn /> component to handle the sign-in process:","code":{"language":"javascript","filename":"src/App.jsx","content":"import { BrowserRouter as Router, Routes, Route } from \'react-router-dom\'\\nimport { SignIn, SignedIn, SignedOut, SignInButton, SignOutButton } from \'@thunderid/react\'\\nimport \'./App.css\'\\n\\nfunction App() {\\n  return (\\n    <Router>\\n      <header>\\n        <SignedIn>\\n          <SignOutButton />\\n        </SignedIn>\\n        <SignedOut>\\n          <SignInButton />\\n        </SignedOut>\\n      </header>\\n      <Routes>\\n        <Route path=\\"/signin\\" element={<SignIn />} />\\n      </Routes>\\n    </Router>\\n  )\\n}\\n\\nexport default App"}},{"step":7,"title":"Display signed-in user\'s profile information","description":"Add the UserDropdown component to display user profile information:","code":{"language":"javascript","filename":"src/App.jsx","content":"import { BrowserRouter as Router, Routes, Route } from \'react-router-dom\'\\nimport { SignIn, SignedIn, SignedOut, SignInButton, SignOutButton, UserDropdown } from \'@thunderid/react\'\\nimport \'./App.css\'\\n\\nfunction App() {\\n  return (\\n    <Router>\\n      <header>\\n        <SignedIn>\\n          <UserDropdown />\\n          <SignOutButton />\\n        </SignedIn>\\n        <SignedOut>\\n          <SignInButton />\\n        </SignedOut>\\n      </header>\\n      <Routes>\\n        <Route path=\\"/signin\\" element={<SignIn />} />\\n      </Routes>\\n    </Router>\\n  )\\n}\\n\\nexport default App"}},{"step":8,"title":"Run the app","description":"Start your development server and test the authentication flow with custom sign-in page:","code":{"language":"terminal","content":"npm run dev"}}]}}')},b=[{value:d.REACT,icon:(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`40`,height:`40`,viewBox:`0 0 16 16`,fill:`#149ECA`,children:[(0,p.jsx)(`path`,{fillRule:`evenodd`,clipRule:`evenodd`,d:`M2.769 5.92C1.414 6.53.762 7.295.762 7.999c0 .703.652 1.467 2.007 2.077 1.319.593 3.168.97 5.231.97 2.063 0 3.912-.377 5.231-.97 1.355-.61 2.007-1.374 2.007-2.077 0-.704-.652-1.468-2.007-2.077C11.912 5.327 10.063 4.95 8 4.95c-2.063 0-3.912.377-5.231.97Zm-.313-.694C3.895 4.579 5.855 4.188 8 4.188c2.145 0 4.105.39 5.544 1.038C14.946 5.857 16 6.808 16 7.998c0 1.19-1.054 2.14-2.456 2.771-1.439.648-3.399 1.038-5.544 1.038-2.145 0-4.105-.39-5.544-1.038C1.054 10.14 0 9.188 0 7.998s1.054-2.141 2.456-2.772Z`}),(0,p.jsx)(`path`,{fillRule:`evenodd`,clipRule:`evenodd`,d:`M7.183 2.429c-1.205-.869-2.193-1.052-2.802-.7-.61.352-.945 1.298-.795 2.777.145 1.439.743 3.229 1.775 5.015 1.031 1.787 2.282 3.2 3.456 4.045 1.205.869 2.193 1.052 2.802.7.61-.352.945-1.298.795-2.777-.145-1.439-.743-3.229-1.775-5.015-1.031-1.787-2.282-3.2-3.456-4.045Zm.445-.618c1.28.922 2.598 2.424 3.671 4.282 1.073 1.857 1.715 3.75 1.873 5.32.155 1.53-.142 2.918-1.172 3.513-1.03.595-2.38.158-3.629-.741-1.28-.923-2.598-2.425-3.67-4.283-1.073-1.857-1.715-3.75-1.873-5.32C2.673 3.052 2.969 1.664 4 1.07c1.03-.595 2.38-.157 3.628.742Z`}),(0,p.jsx)(`path`,{fillRule:`evenodd`,clipRule:`evenodd`,d:`M12.414 4.506c.15-1.478-.186-2.425-.795-2.777-.61-.352-1.597-.169-2.802.7-1.174.845-2.425 2.258-3.456 4.045-1.032 1.786-1.63 3.576-1.775 5.015-.15 1.479.186 2.425.795 2.777.61.352 1.597.169 2.802-.7 1.174-.845 2.425-2.258 3.456-4.045 1.032-1.786 1.63-3.576 1.775-5.015Zm.758.076c-.158 1.57-.8 3.463-1.873 5.32-1.072 1.858-2.39 3.36-3.67 4.283-1.248.899-2.598 1.336-3.629.74-1.03-.594-1.327-1.982-1.172-3.512.158-1.57.8-3.462 1.873-5.32 1.072-1.858 2.39-3.36 3.67-4.282C9.62.91 10.97.474 12 1.069c1.03.595 1.327 1.983 1.172 3.513Z`}),(0,p.jsx)(`path`,{d:`M8 9.521a1.524 1.524 0 1 0 0-3.047A1.524 1.524 0 0 0 8 9.52Z`})]}),titleKey:`applications:onboarding.configure.stack.technology.react.title`,descriptionKey:`applications:onboarding.configure.stack.technology.react.description`,template:y,categories:[`web`]},{value:d.EXPRESS,icon:(0,p.jsxs)(`svg`,{width:`40`,height:`40`,viewBox:`0 0 20 20`,style:{fill:`white`},children:[(0,p.jsx)(`path`,{d:`M6.504 7.181c1.47 0 1.812 1.29 1.812 2.108H4.5c.103-.906.683-2.108 2.004-2.108Z`}),(0,p.jsx)(`path`,{fillRule:`evenodd`,d:`M10 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-3.05-7.291c-1.321 0-2.438-.728-2.464-2.492l5.032.013c.04-.2.062-.405.058-.61 0-1.32-.621-3.37-2.955-3.37-2.109 0-3.385 1.737-3.385 3.875 0 2.137 1.328 3.625 3.535 3.625a5.738 5.738 0 0 0 2.39-.475l-.223-.938a4.65 4.65 0 0 1-1.988.372Zm5.833-4.78L11.759 6.4h-1.455l2.437 3.505-2.555 3.666h1.439l1.04-1.604a26.7 26.7 0 0 1 .261-.425c.171-.274.336-.538.494-.837h.031l.023.037c.245.413.479.807.75 1.225l1.067 1.604h1.471L14.238 9.86l2.45-3.46h-1.425l-.995 1.514c-.096.157-.194.312-.293.47-.146.231-.294.465-.435.704h-.03l-.165-.273c-.176-.291-.35-.58-.563-.887Z`})]}),titleKey:`applications:onboarding.configure.stack.technology.express.title`,descriptionKey:`applications:onboarding.configure.stack.technology.express.description`,template:h,categories:[`backend`]},{value:d.NEXTJS,icon:(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`40`,height:`40`,viewBox:`0 0 16 16`,fill:`none`,children:[(0,p.jsx)(`path`,{d:`M8 15.733A7.733 7.733 0 1 0 8 .267a7.733 7.733 0 0 0 0 15.466Z`,fill:`#000`}),(0,p.jsx)(`path`,{fillRule:`evenodd`,clipRule:`evenodd`,d:`M8 .533a7.467 7.467 0 1 0 0 14.934A7.467 7.467 0 0 0 8 .533ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z`,fill:`#fff`}),(0,p.jsx)(`path`,{d:`M13.29 14.002 6.146 4.8H4.8v6.397h1.077v-5.03l6.567 8.486c.297-.198.58-.416.846-.651Z`,fill:`url(#b)`}),(0,p.jsx)(`path`,{d:`M11.289 4.8h-1.067v6.4h1.067V4.8Z`,fill:`url(#c)`}),(0,p.jsxs)(`defs`,{children:[(0,p.jsxs)(`linearGradient`,{id:`b`,x1:`9.689`,y1:`10.355`,x2:`12.845`,y2:`14.267`,gradientUnits:`userSpaceOnUse`,children:[(0,p.jsx)(`stop`,{stopColor:`#fff`}),(0,p.jsx)(`stop`,{offset:`1`,stopColor:`#fff`,stopOpacity:`0`})]}),(0,p.jsxs)(`linearGradient`,{id:`c`,x1:`10.755`,y1:`4.8`,x2:`10.738`,y2:`9.5`,gradientUnits:`userSpaceOnUse`,children:[(0,p.jsx)(`stop`,{stopColor:`#fff`}),(0,p.jsx)(`stop`,{offset:`1`,stopColor:`#fff`,stopOpacity:`0`})]})]})]}),titleKey:`applications:onboarding.configure.stack.technology.nextjs.title`,descriptionKey:`applications:onboarding.configure.stack.technology.nextjs.description`,template:g,categories:[`web`,`backend`]},{value:d.VANILLA_JS,icon:(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`40`,height:`40`,viewBox:`0 0 256 256`,children:[(0,p.jsx)(`rect`,{width:`256`,height:`256`,fill:`#F7DF1E`}),(0,p.jsx)(`path`,{d:`M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574`})]}),titleKey:`applications:onboarding.configure.stack.technology.vanillaJs.title`,descriptionKey:`applications:onboarding.configure.stack.technology.vanillaJs.description`,template:{id:`vanilla-js`,displayName:`JavaScript`,description:`Browser application built with vanilla JavaScript`,defaults:{name:`JavaScript Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[`http://localhost:5173`],pkceRequired:!0,tokenEndpointAuthMethod:`none`,publicClient:!0}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!0},pkceRequired:{readOnly:!0,value:!0},tokenEndpointAuthMethod:{readOnly:!0,value:`none`}}},integrationGuides:{INBUILT:{llm_prompt:{id:`llm-prompt`,title:`Integrate with a Coding Agent Prompt`,description:`Use AI to generate integration code for your JavaScript application`,type:`llm`,icon:`sparkles`,content:"# Integrate {{productName}} Authentication in Vanilla JavaScript Application\n\n## Context\nI have a vanilla JavaScript application and I want to integrate {{productName}}'s authentication system using the ThunderID Browser SDK with {{productName}}-hosted login pages.\n\n## Requirements\n- Use @thunderid/browser SDK for authentication\n- Configure {{productName}}-hosted login pages\n- Implement sign-in and sign-out functionality\n- Display signed-in user's profile information\n- Handle authentication state\n\n## Configuration\n- **Client ID**: {{clientId}}\n- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)\n- **SDK**: @thunderid/browser\n\n## IMPORTANT Configuration Rules\n- Create a ThunderIDBrowserClient instance and call initialize() with a config object\n- Required config properties: `clientId` and `baseUrl`\n- Optional config properties: `afterSignInUrl`, `afterSignOutUrl`, `scopes` (string array), `storage`\n- Storage options: 'sessionStorage' (default), 'localStorage', 'browserMemory'\n- NEVER use property names like `signInRedirectURL` or `signOutRedirectURL`\n\n## Available SDK APIs\n\n### ThunderIDBrowserClient\n- `initialize(config)` - Initialize the client with configuration\n- `signIn()` - Redirect to {{productName}} sign-in page\n- `signOut()` - Sign out and clear session\n- `isSignedIn()` - Check if user is signed in (returns Promise<boolean>)\n- `getUser()` - Get authenticated user profile (returns Promise<User>)\n- `getAccessToken()` - Get current access token\n- `getIdToken()` - Get ID token\n- `getDecodedIdToken()` - Get decoded ID token claims\n- `httpRequest(config)` - Make authenticated HTTP request\n- `on(hook, callback)` - Register event callbacks (Hooks.SignIn, Hooks.SignOut, etc.)\n\n### User Object Properties\n- `displayName` - User's display name\n- `username` - Username\n- `email` - Email address\n- `given_name` - First name\n- `family_name` - Last name\n- `picture` - Profile picture URL\n\n## Implementation Steps\n1. Create a vanilla JS app using Vite by running: `npm create vite@latest js-demo -- --template vanilla`\n2. Navigate into the project directory: `cd js-demo`\n3. Install dependencies: `npm install`\n4. Install @thunderid/browser package: `npm install @thunderid/browser`\n5. Create src/auth.js to initialize ThunderIDBrowserClient with clientId and baseUrl\n6. Update src/main.js to check isSignedIn(), show sign-in button or user profile\n7. Add event listeners for sign-in and sign-out buttons\n8. Run the development server: `npm run dev`\n\nPlease provide complete, working code with proper configuration for {{productName}} authentication using the ThunderID Browser SDK."},manual_steps:[{step:1,title:`Create a JavaScript app using Vite`,description:`Run the following command to create a new vanilla JavaScript app with Vite:`,code:{language:`terminal`,content:`npm create vite@latest js-demo -- --template vanilla
cd js-demo
npm install`}},{step:2,title:`Install @thunderid/browser`,description:`The ThunderID Browser SDK provides a framework-agnostic authentication client for browser applications.`,subDescription:`Run the following command to install the SDK:`,code:{language:`terminal`,content:`npm install @thunderid/browser`}},{step:3,title:`Initialize the SDK`,description:`Create a new file src/auth.js to initialize and export the ThunderIDBrowserClient:`,code:{language:`javascript`,filename:`src/auth.js`,content:`import { ThunderIDBrowserClient } from '@thunderid/browser'

const auth = new ThunderIDBrowserClient()

await auth.initialize({
  clientId: '{{clientId}}',
  baseUrl: 'https://localhost:8090',
  afterSignInUrl: window.location.origin,
  afterSignOutUrl: window.location.origin,
})

export default auth`}},{step:4,title:`Add sign-in and sign-out`,description:`Replace the content of src/main.js with the following to add authentication:`,code:{language:`javascript`,filename:`src/main.js`,content:`import './style.css'
import auth from './auth.js'

async function renderApp() {
  const isSignedIn = await auth.isSignedIn()

  if (isSignedIn) {
    const user = await auth.getUser()

    document.querySelector('#app').innerHTML = \`
      <div>
        <h1>ThunderID Auth Demo</h1>
        <div class="card">
          <h2>Welcome, \${user.displayName || user.username}!</h2>
          <p><strong>Email:</strong> \${user.email || 'N/A'}</p>
          <button id="sign-out-btn" type="button">Sign Out</button>
        </div>
      </div>
    \`

    document.querySelector('#sign-out-btn')
      .addEventListener('click', () => auth.signOut())
  } else {
    document.querySelector('#app').innerHTML = \`
      <div>
        <h1>ThunderID Auth Demo</h1>
        <div class="card">
          <p>You are not signed in.</p>
          <button id="sign-in-btn" type="button">Sign In</button>
        </div>
      </div>
    \`

    document.querySelector('#sign-in-btn')
      .addEventListener('click', () => auth.signIn())
  }
}

renderApp()`}},{step:5,title:`Display signed-in user's profile information`,description:`Update src/main.js to display additional user profile details:`,code:{language:`javascript`,filename:`src/main.js`,content:`import './style.css'
import auth from './auth.js'

async function renderApp() {
  const isSignedIn = await auth.isSignedIn()

  if (isSignedIn) {
    const user = await auth.getUser()

    document.querySelector('#app').innerHTML = \`
      <div>
        <h1>ThunderID Auth Demo</h1>
        <div class="card">
          \${user.picture ? \`<img src="\${user.picture}" alt="Avatar" style="width:80px;height:80px;border-radius:50%" />\` : ''}
          <h2>Welcome, \${user.displayName || user.username}!</h2>
          <div class="user-details">
            <p><strong>Email:</strong> \${user.email || 'N/A'}</p>
            <p><strong>First Name:</strong> \${user.given_name || 'N/A'}</p>
            <p><strong>Last Name:</strong> \${user.family_name || 'N/A'}</p>
          </div>
          <button id="sign-out-btn" type="button">Sign Out</button>
        </div>
      </div>
    \`

    document.querySelector('#sign-out-btn')
      .addEventListener('click', () => auth.signOut())
  } else {
    document.querySelector('#app').innerHTML = \`
      <div>
        <h1>ThunderID Auth Demo</h1>
        <div class="card">
          <p>You are not signed in.</p>
          <button id="sign-in-btn" type="button">Sign In</button>
        </div>
      </div>
    \`

    document.querySelector('#sign-in-btn')
      .addEventListener('click', () => auth.signIn())
  }
}

renderApp()`}},{step:6,title:`Run the app`,description:`Start your development server and test the authentication flow:`,code:{language:`terminal`,content:`npm run dev`}}]}}},categories:[`web`]},{value:d.VUE,icon:(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`40`,height:`40`,viewBox:`0 0 261.76 226.69`,children:[(0,p.jsx)(`path`,{d:`M161.096.001l-30.225 52.351L100.647.001H0l130.871 226.688L261.742.001z`,fill:`#41b883`}),(0,p.jsx)(`path`,{d:`M161.096.001l-30.225 52.351L100.647.001H52.346l78.525 136.01L209.398.001z`,fill:`#34495e`})]}),titleKey:`applications:onboarding.configure.stack.technology.vue.title`,descriptionKey:`applications:onboarding.configure.stack.technology.vue.description`,template:{id:`vue`,displayName:`Vue`,description:`Single Page Application built with Vue 3`,defaults:{name:`Vue Application`,inboundAuthConfig:[{type:`oauth2`,config:{grantTypes:[`authorization_code`,`refresh_token`],responseTypes:[`code`],redirectUris:[`http://localhost:5173`],pkceRequired:!0,tokenEndpointAuthMethod:`none`,publicClient:!0}}],allowedUserTypes:[]},fieldConstraints:{oauth2:{publicClient:{readOnly:!0,value:!0},pkceRequired:{readOnly:!0,value:!0},tokenEndpointAuthMethod:{readOnly:!0,value:`none`}}},integrationGuides:{INBUILT:{llm_prompt:{id:`llm-prompt`,title:`Integrate with a Coding Agent Prompt`,description:`Use AI to generate integration code for your Vue 3 application`,type:`llm`,icon:`sparkles`,content:`# Integrate {{productName}} Authentication in Vue 3 Application

## Context
I have a Vue 3 application and I want to integrate {{productName}}'s authentication system using the @thunderid/vue SDK with {{productName}}-hosted login pages.

## Requirements
- Use @thunderid/vue SDK for authentication
- Register the ThunderIDPlugin in main.js
- Wrap the app with ThunderIDProvider in App.vue
- Implement sign-in and sign-out with prebuilt components
- Display signed-in user's profile information
- Handle loading state during authentication

## Configuration
- **Client ID**: {{clientId}}
- **Base URL**: https://localhost:8090 (or your {{productName}} instance URL)
- **SDK**: @thunderid/vue

## IMPORTANT Configuration Rules
- Register ThunderIDPlugin via app.use(ThunderIDPlugin) in src/main.js
- Import ThunderIDPlugin from '@thunderid/vue'
- Wrap the app root in App.vue with <ThunderIDProvider client-id="..." base-url="...">
- Pass configuration as kebab-case attributes: \`client-id\` and \`base-url\`
- Import UI components (SignInButton, SignOutButton, SignedIn, SignedOut, Loading, User) from '@thunderid/vue'
- Use <User> with a scoped slot #default="{ user }" to access user profile data

## Implementation Steps
1. Create a Vue 3 app: npm create vite@latest my-vue-app -- --template vue
2. Navigate into the project: cd my-vue-app && npm install
3. Install @thunderid/vue: npm install @thunderid/vue
4. Register ThunderIDPlugin in src/main.js with app.use(ThunderIDPlugin)
5. Wrap app content with <ThunderIDProvider client-id="{{clientId}}" base-url="https://localhost:8090"> in src/App.vue
6. Add SignInButton and SignOutButton inside SignedOut/SignedIn conditional wrappers
7. Use <Loading> component to show a loading state during auth initialization
8. Use <User> with scoped slot to display user profile details
9. Run: npm run dev

Please provide complete, working code with proper configuration for {{productName}} authentication using the @thunderid/vue SDK.`},manual_steps:[{step:1,title:`Create a Vue 3 app`,description:`Run the following command to create a new Vue 3 app with Vite:`,code:{language:`terminal`,content:`npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install`}},{step:2,title:`Install @thunderid/vue`,description:`The {{productName}} Vue SDK provides a plugin, prebuilt components, and helpers for authentication.`,subDescription:`Run the following command to install the SDK:`,code:{language:`terminal`,content:`npm install @thunderid/vue`}},{step:3,title:`Register the ThunderIDPlugin`,description:`Update src/main.js to register the ThunderID Vue plugin:`,code:{language:`javascript`,filename:`src/main.js`,content:`import { createApp } from 'vue'
import { ThunderIDPlugin } from '@thunderid/vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(ThunderIDPlugin)
app.mount('#app')`}},{step:4,title:`Add <ThunderIDProvider /> and sign-in / sign-out`,description:`Replace the content of src/App.vue with the following to wrap your app with ThunderIDProvider and add authentication components:`,code:{language:`vue`,filename:`src/App.vue`,content:`<script setup>
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  Loading,
} from '@thunderid/vue'
<\/script>

<template>
  <ThunderIDProvider
    client-id="{{clientId}}"
    base-url="https://localhost:8090"
  >
    <Loading>
      <div>Loading authentication...</div>
    </Loading>

    <header>
      <h1>{{productName}} Auth Demo</h1>
      <SignedIn>
        <SignOutButton>Sign Out</SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>Sign In</SignInButton>
      </SignedOut>
    </header>
  </ThunderIDProvider>
</template>`}},{step:5,title:`Display signed-in user's profile information`,description:`Update src/App.vue to use the User component with a scoped slot to display the signed-in user's profile:`,code:{language:`vue`,filename:`src/App.vue`,content:`<script setup>
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  Loading,
  User,
} from '@thunderid/vue'
<\/script>

<template>
  <ThunderIDProvider
    client-id="{{clientId}}"
    base-url="https://localhost:8090"
  >
    <Loading>
      <div>Loading authentication...</div>
    </Loading>

    <header>
      <h1>{{productName}} Auth Demo</h1>
      <SignedIn>
        <SignOutButton>Sign Out</SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>Sign In</SignInButton>
      </SignedOut>
    </header>

    <main>
      <SignedIn>
        <User>
          <template #default="{ user }">
            <div class="user-profile">
              <img
                v-if="user.picture"
                :src="user.picture"
                :alt="user.name || 'User avatar'"
                style="width: 80px; height: 80px; border-radius: 50%"
              />
              <h2>Welcome, {{ user.name || user.username }}!</h2>
              <div class="user-details">
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>First Name:</strong> {{ user.given_name }}</p>
                <p><strong>Last Name:</strong> {{ user.family_name }}</p>
              </div>
            </div>
          </template>
        </User>
      </SignedIn>
    </main>
  </ThunderIDProvider>
</template>`}},{step:6,title:`Run the app`,description:`Start your development server and test the authentication flow:`,code:{language:`terminal`,content:`npm run dev`}}]}}},categories:[`web`]},{value:d.NUXT,icon:(0,p.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`40`,height:`40`,viewBox:`0 0 221 120`,children:(0,p.jsx)(`path`,{d:`M120.81 120H212.7c1.903 0 3.773-.498 5.408-1.442a10.827 10.827 0 003.977-3.92 10.657 10.657 0 001.458-5.36c0-1.889-.5-3.745-1.458-5.36L166.037 19.2a10.827 10.827 0 00-3.977-3.92 10.978 10.978 0 00-10.816 0 10.827 10.827 0 00-3.977 3.92l-9.684 16.704-18.664-32.28A10.827 10.827 0 00114.942 0a10.978 10.978 0 00-10.816 0 10.827 10.827 0 00-3.977 3.92L1.458 104.008A10.697 10.697 0 000 109.278a10.657 10.657 0 001.458 5.36 10.827 10.827 0 003.977 3.92A10.978 10.978 0 0010.843 120H67.89c21.187 0 36.72-9.152 47.248-26.88L140.47 51.2l12.94 22.4-21.6 37.36C125.097 118.18 113.433 120 120.81 120zm-58.168-21.28l-36.19-.08 72.368-125.2 18.096 31.28-25.936 44.8c-8.784 14.56-18.37 49.2-28.338 49.2z`,fill:`#00dc82`})}),titleKey:`applications:onboarding.configure.stack.technology.nuxt.title`,descriptionKey:`applications:onboarding.configure.stack.technology.nuxt.description`,template:v,categories:[`web`,`backend`]},{value:d.NODEJS,icon:(0,p.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`40`,height:`40`,viewBox:`0 0 256 289`,children:[(0,p.jsx)(`path`,{d:`M128 288.774c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.082c1.06-.53 1.59-1.59 1.59-2.915V94.28c0-1.325-.53-2.385-1.59-2.915L128.795 30.55c-1.06-.53-2.385-.53-3.18 0L19.875 91.365c-1.06.53-1.59 1.855-1.59 2.915v122.165c0 1.06.53 2.385 1.59 2.915l28.887 16.696c15.635 7.95 25.442-1.325 25.442-10.6V107.35c0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 3.18 1.325 3.18 3.18v118.11c0 20.936-11.395 32.861-31.271 32.861-6.095 0-10.865 0-24.382-6.625L10.07 235.2A22.312 22.312 0 010 216.46V94.28c0-7.685 4.24-14.84 11.13-18.815L116.87 14.648c6.625-3.975 15.635-3.975 22.26 0L244.87 75.465c6.89 3.975 11.13 11.13 11.13 18.815V216.46c0 7.685-4.24 14.84-11.13 18.815L139.13 295.93c-3.445 1.59-7.155 2.384-11.13 2.384v-.265z`,fill:`#539E43`}),(0,p.jsx)(`path`,{d:`M163.573 215.666c-46.217 0-55.757-21.2-55.757-39.22 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.915 1.06 3.18 2.65 2.12 14.31 8.48 21.466 35.882 21.466 22.26 0 31.536-5.035 31.536-16.96 0-6.89-2.65-11.925-37.472-15.37-29.152-2.915-47.277-9.275-47.277-32.596 0-21.466 18.12-34.187 48.337-34.187 33.921 0 50.617 11.66 52.737 37.207 0 .795-.265 1.59-.795 2.12-.53.53-1.325.795-2.12.795h-13.78c-1.325 0-2.65-1.06-2.915-2.385-3.18-14.575-11.13-19.345-33.127-19.345-24.382 0-27.297 8.48-27.297 14.84 0 7.685 3.445 10.07 36.412 14.31 32.7 4.24 48.602 10.335 48.602 33.391 0 23.32-19.345 36.572-53.266 36.572l-.62-.109z`,fill:`#539E43`})]}),titleKey:`applications:onboarding.configure.stack.technology.nodejs.title`,descriptionKey:`applications:onboarding.configure.stack.technology.nodejs.description`,template:_,categories:[`backend`]}],x={EMBEDDED_SUFFIX:`-embedded`};export{d as a,f as i,b as n,m as r,x as t};