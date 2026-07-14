import { defineNuxtRouteMiddleware, navigateTo, useState } from "#app";
const DEFAULT_REDIRECT_TO = "/api/auth/signin";
export function defineThunderIDMiddleware(options = {}) {
  const { redirectTo = DEFAULT_REDIRECT_TO, requireOrganization = false, requireScopes = [] } = options;
  return defineNuxtRouteMiddleware((to) => {
    const authState = useState("thunderid:auth");
    if (!authState.value?.isSignedIn) {
      const returnTo = encodeURIComponent(to.fullPath);
      return navigateTo(`${redirectTo}?returnTo=${returnTo}`, { external: true });
    }
    const user = authState.value.user;
    if (requireOrganization && !user?.organizationId) {
      return navigateTo(redirectTo, { external: true });
    }
    if (requireScopes.length > 0) {
      const sessionScopes = String(user?.scopes ?? "").split(" ");
      const hasAllScopes = requireScopes.every((s) => sessionScopes.includes(s));
      if (!hasAllScopes) {
        return navigateTo(redirectTo, { external: true });
      }
    }
    return void 0;
  });
}
