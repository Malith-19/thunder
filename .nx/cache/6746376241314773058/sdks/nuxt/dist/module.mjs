import { defineNuxtModule, createResolver, addServerHandler, addServerPlugin, addPlugin, addRouteMiddleware, addImports, addComponent, extendViteConfig } from '@nuxt/kit';
import { defu } from 'defu';

const PACKAGE_NAME = "@thunderid/nuxt";
const module$1 = defineNuxtModule({
  defaults: {},
  meta: {
    configKey: "thunderid",
    name: PACKAGE_NAME
  },
  setup(userOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const publicConfig = defu(
      // Layer 1: environment variables — only win when actually set
      {
        afterSignInUrl: process.env.NUXT_PUBLIC_THUNDERID_AFTER_SIGN_IN_URL,
        afterSignOutUrl: process.env.NUXT_PUBLIC_THUNDERID_AFTER_SIGN_OUT_URL,
        applicationId: process.env.NUXT_PUBLIC_THUNDERID_APPLICATION_ID,
        baseUrl: process.env.NUXT_PUBLIC_THUNDERID_BASE_URL,
        clientId: process.env.NUXT_PUBLIC_THUNDERID_CLIENT_ID,
        signInUrl: process.env.NUXT_PUBLIC_THUNDERID_SIGN_IN_URL,
        signUpUrl: process.env.NUXT_PUBLIC_THUNDERID_SIGN_UP_URL
      },
      // Layer 2: nuxt.config.ts options
      userOptions,
      // Layer 3: hard defaults
      {
        afterSignInUrl: "/",
        afterSignOutUrl: "/",
        scopes: ["openid", "profile"]
      }
    );
    const privateConfig = {
      clientSecret: process.env.THUNDERID_CLIENT_SECRET || userOptions.clientSecret || "",
      sessionSecret: process.env.THUNDERID_SESSION_SECRET || userOptions.sessionSecret || ""
    };
    const { options } = nuxt;
    options.runtimeConfig.thunderid = defu(
      options.runtimeConfig.thunderid || {},
      privateConfig
    );
    options.runtimeConfig.public.thunderid = defu(
      options.runtimeConfig.public.thunderid || {},
      {
        afterSignInUrl: publicConfig.afterSignInUrl,
        afterSignOutUrl: publicConfig.afterSignOutUrl,
        applicationId: publicConfig.applicationId,
        baseUrl: publicConfig.baseUrl,
        clientId: publicConfig.clientId,
        platform: publicConfig.platform,
        preferences: publicConfig.preferences,
        scopes: publicConfig.scopes,
        signInUrl: publicConfig.signInUrl,
        signUpUrl: publicConfig.signUpUrl,
        tokenRequest: publicConfig.tokenRequest
      }
    );
    const publicThunderID = options.runtimeConfig.public.thunderid;
    if (publicThunderID?.clientSecret) {
      delete publicThunderID.clientSecret;
      console.error(
        `[${PACKAGE_NAME}] SECURITY: clientSecret found in public config. Removed. Use THUNDERID_CLIENT_SECRET env var.`
      );
    }
    if (publicThunderID?.sessionSecret) {
      delete publicThunderID.sessionSecret;
      console.error(
        `[${PACKAGE_NAME}] SECURITY: sessionSecret found in public config. Removed. Use THUNDERID_SESSION_SECRET env var.`
      );
    }
    const serverRoutes = [
      // ── Auth flow ──────────────────────────────────────────────────────
      { handler: resolve("./runtime/server/routes/auth/session/signin.get"), route: "/api/auth/signin" },
      {
        handler: resolve("./runtime/server/routes/auth/session/signin.post"),
        method: "post",
        route: "/api/auth/signin"
      },
      {
        handler: resolve("./runtime/server/routes/auth/session/signup.post"),
        method: "post",
        route: "/api/auth/signup"
      },
      { handler: resolve("./runtime/server/routes/auth/session/callback.get"), route: "/api/auth/callback" },
      {
        handler: resolve("./runtime/server/routes/auth/session/callback.post"),
        method: "post",
        route: "/api/auth/callback"
      },
      {
        handler: resolve("./runtime/server/routes/auth/session/signout.post"),
        method: "post",
        route: "/api/auth/signout"
      },
      // ── Session / token ───────────────────────────────────────────────
      { handler: resolve("./runtime/server/routes/auth/session/session.get"), route: "/api/auth/session" },
      { handler: resolve("./runtime/server/routes/auth/session/token.get"), route: "/api/auth/token" },
      // ── User ──────────────────────────────────────────────────────────
      { handler: resolve("./runtime/server/routes/auth/user/user.get"), route: "/api/auth/user" },
      { handler: resolve("./runtime/server/routes/auth/user/profile.get"), route: "/api/auth/user/profile" },
      {
        handler: resolve("./runtime/server/routes/auth/user/profile.patch"),
        method: "patch",
        route: "/api/auth/user/profile"
      },
      // ── Organisations ─────────────────────────────────────────────────
      {
        handler: resolve("./runtime/server/routes/auth/organizations/index.get"),
        route: "/api/auth/organizations"
      },
      {
        handler: resolve("./runtime/server/routes/auth/organizations/index.post"),
        method: "post",
        route: "/api/auth/organizations"
      },
      {
        handler: resolve("./runtime/server/routes/auth/organizations/me.get"),
        route: "/api/auth/organizations/me"
      },
      {
        handler: resolve("./runtime/server/routes/auth/organizations/current.get"),
        route: "/api/auth/organizations/current"
      },
      {
        handler: resolve("./runtime/server/routes/auth/organizations/id.get"),
        route: "/api/auth/organizations/:id"
      },
      {
        handler: resolve("./runtime/server/routes/auth/organizations/switch.post"),
        method: "post",
        route: "/api/auth/organizations/switch"
      },
      // ── Branding ──────────────────────────────────────────────────────
      { handler: resolve("./runtime/server/routes/auth/branding/branding.get"), route: "/api/auth/branding" }
    ];
    serverRoutes.forEach((sr) => {
      addServerHandler({ handler: sr.handler, method: "method" in sr ? sr.method : void 0, route: sr.route });
    });
    addServerPlugin(resolve("./runtime/server/plugins/thunderid-ssr"));
    addPlugin(resolve("./runtime/plugins/thunderid"));
    addRouteMiddleware({
      name: "auth",
      path: resolve("./runtime/middleware/auth")
    });
    addImports([
      // Core auth composable (Nuxt-specific wrapper around @thunderid/vue)
      { from: resolve("./runtime/composables/useThunderID"), name: "useThunderID" },
      // Composables from @thunderid/vue — auto-imported directly, no local wrappers
      { from: "@thunderid/vue", name: "useUser" },
      { from: "@thunderid/vue", name: "useOrganization" },
      { from: "@thunderid/vue", name: "useFlow" },
      { from: "@thunderid/vue", name: "useFlowMeta" },
      { from: "@thunderid/vue", name: "useTheme" },
      { from: "@thunderid/vue", name: "useBranding" },
      // useI18n aliased to `useThunderIDI18n` to avoid collision with @nuxtjs/i18n
      { as: "useThunderIDI18n", from: "@thunderid/vue", name: "useI18n" },
      // Middleware factory
      { from: resolve("./runtime/middleware/defineThunderIDMiddleware"), name: "defineThunderIDMiddleware" }
    ]);
    addComponent({
      filePath: resolve("./runtime/components/ThunderIDRoot"),
      name: "ThunderIDRoot"
    });
    addComponent({ filePath: resolve("./runtime/components/control/SignedIn"), name: "ThunderIDSignedIn" });
    addComponent({ filePath: resolve("./runtime/components/control/SignedOut"), name: "ThunderIDSignedOut" });
    addComponent({ filePath: resolve("./runtime/components/control/Loading"), name: "ThunderIDLoading" });
    addComponent({ filePath: resolve("./runtime/components/actions/SignInButton"), name: "ThunderIDSignInButton" });
    addComponent({ filePath: resolve("./runtime/components/actions/SignOutButton"), name: "ThunderIDSignOutButton" });
    addComponent({ filePath: resolve("./runtime/components/actions/SignUpButton"), name: "ThunderIDSignUpButton" });
    addComponent({ filePath: resolve("./runtime/components/auth/SignIn"), name: "ThunderIDSignIn" });
    addComponent({ filePath: resolve("./runtime/components/auth/SignUp"), name: "ThunderIDSignUp" });
    addComponent({ filePath: resolve("./runtime/components/user/User"), name: "ThunderIDUser" });
    addComponent({ filePath: resolve("./runtime/components/user/UserProfile"), name: "ThunderIDUserProfile" });
    addComponent({ filePath: resolve("./runtime/components/user/UserDropdown"), name: "ThunderIDUserDropdown" });
    addComponent({ filePath: resolve("./runtime/components/organization/Organization"), name: "ThunderIDOrganization" });
    addComponent({
      filePath: resolve("./runtime/components/organization/OrganizationProfile"),
      name: "ThunderIDOrganizationProfile"
    });
    addComponent({
      filePath: resolve("./runtime/components/organization/OrganizationSwitcher"),
      name: "ThunderIDOrganizationSwitcher"
    });
    addComponent({
      filePath: resolve("./runtime/components/organization/OrganizationList"),
      name: "ThunderIDOrganizationList"
    });
    addComponent({
      filePath: resolve("./runtime/components/organization/CreateOrganization"),
      name: "ThunderIDCreateOrganization"
    });
    addComponent({ filePath: resolve("./runtime/components/auth/Callback"), name: "ThunderIDCallback" });
    extendViteConfig(
      (viteConfig) => {
        const deps = [
          "@thunderid/browser",
          "@thunderid/javascript",
          "@thunderid/vue",
          "base64url",
          "fast-sha256"
        ];
        const existingInclude = viteConfig.optimizeDeps?.include ?? [];
        const newDeps = deps.filter((dep) => !existingInclude.includes(dep));
        Object.assign(viteConfig, {
          optimizeDeps: {
            ...viteConfig.optimizeDeps,
            include: [...existingInclude, ...newDeps]
          }
        });
      },
      { client: true }
    );
  }
});

export { module$1 as default };
