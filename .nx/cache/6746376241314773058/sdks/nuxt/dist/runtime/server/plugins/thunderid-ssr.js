import { getRequestURL } from "h3";
import { defineNitroPlugin } from "nitropack/runtime";
import { createLogger } from "../../utils/log.js";
import ThunderIDNuxtClient from "../ThunderIDNuxtClient.js";
import { verifyAndRehydrateSession } from "../utils/serverSession.js";
import { useRuntimeConfig } from "#imports";
const log = createLogger("thunderid-ssr");
const CALLBACK_PATH = "/api/auth/callback";
function resolveCallbackUrl(event) {
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  return `${url.origin}${CALLBACK_PATH}`;
}
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("request", async (event) => {
    const client = ThunderIDNuxtClient.getInstance();
    if (!client.isInitialized) {
      const config2 = useRuntimeConfig(event);
      const publicConfig2 = config2.public.thunderid;
      const privateConfig = config2.thunderid;
      if (!publicConfig2?.baseUrl || !publicConfig2?.clientId) {
        log.error(
          "Missing required config: baseUrl and clientId. Set NUXT_PUBLIC_THUNDERID_BASE_URL and NUXT_PUBLIC_THUNDERID_CLIENT_ID."
        );
        return;
      }
      const sessionSecret2 = process.env.THUNDERID_SESSION_SECRET || privateConfig?.sessionSecret;
      if (!sessionSecret2) {
        if (process.env.NODE_ENV === "production") {
          log.error(
            "THUNDERID_SESSION_SECRET is required in production. Set it to a secure random string of at least 32 characters. Refusing to initialize ThunderID client."
          );
          return;
        }
        log.warn(
          "THUNDERID_SESSION_SECRET is not set. Using an insecure default for development only. Set THUNDERID_SESSION_SECRET before deploying."
        );
      }
      try {
        await client.initialize({
          afterSignInUrl: resolveCallbackUrl(event),
          afterSignOutUrl: publicConfig2.afterSignOutUrl || "/",
          baseUrl: publicConfig2.baseUrl,
          clientId: publicConfig2.clientId,
          clientSecret: privateConfig?.clientSecret || void 0,
          platform: publicConfig2.platform,
          scopes: publicConfig2.scopes || ["openid", "profile"],
          tokenRequest: publicConfig2.tokenRequest
        });
      } catch (err) {
        log.error("Failed to initialize ThunderID client:", err);
        return;
      }
    }
    const url = event.path || "";
    if (url.startsWith("/api/") || url.startsWith("/_nuxt/") || url.startsWith("/__nuxt_")) {
      return;
    }
    const config = useRuntimeConfig(event);
    const publicConfig = config.public.thunderid;
    const prefs = publicConfig?.preferences;
    const sessionSecret = process.env.THUNDERID_SESSION_SECRET || config.thunderid?.sessionSecret;
    const session = await verifyAndRehydrateSession(
      event,
      sessionSecret
    );
    if (!session) {
      const eventContext2 = event.context;
      eventContext2.thunderid = { isSignedIn: false, session: null };
      return;
    }
    const baseUrl = publicConfig?.baseUrl ?? "";
    let resolvedBaseUrl = baseUrl;
    try {
      if (session.organizationId) {
        resolvedBaseUrl = `${baseUrl}/o`;
      } else {
        const idToken = await client.getDecodedIdToken(
          session.sessionId
        );
        if (idToken?.user_org) {
          resolvedBaseUrl = `${baseUrl}/o`;
        }
      }
    } catch {
    }
    const shouldFetchProfile = prefs?.user?.fetchUserProfile !== false;
    const shouldFetchOrgs = prefs?.user?.fetchOrganizations !== false;
    const shouldFetchBranding = prefs?.theme?.inheritFromBranding !== false;
    const [userResult, userProfileResult, orgsResult, currentOrgResult, brandingResult] = await Promise.allSettled([
      // Always fetch the basic user object (needed for ThunderIDAuthState.user)
      client.getUser(session.sessionId),
      // SCIM2 user profile (flattened + schemas)
      shouldFetchProfile ? client.getUserProfile(session.sessionId) : Promise.resolve(null),
      // User's organisations
      shouldFetchOrgs ? client.getMyOrganizations(session.sessionId) : Promise.resolve([]),
      // Current organisation (derived from the ID token)
      shouldFetchOrgs ? client.getCurrentOrganization(session.sessionId) : Promise.resolve(null),
      // Branding preference (does not require a session)
      shouldFetchBranding ? client.getBrandingPreference({ baseUrl: resolvedBaseUrl }) : Promise.resolve(null)
    ]);
    if (userResult.status === "rejected") {
      log.debug("Failed to fetch user:", userResult.reason);
    }
    if (userProfileResult.status === "rejected") {
      log.warn("Failed to fetch user profile (SCIM2):", userProfileResult.reason);
    }
    if (orgsResult.status === "rejected") {
      log.warn("Failed to fetch my organisations:", orgsResult.reason);
    }
    if (currentOrgResult.status === "rejected") {
      log.warn("Failed to resolve current organisation:", currentOrgResult.reason);
    }
    if (brandingResult.status === "rejected") {
      log.warn("Failed to fetch branding preference:", brandingResult.reason);
    }
    const ssrData = {
      brandingPreference: brandingResult.status === "fulfilled" ? brandingResult.value : null,
      currentOrganization: currentOrgResult.status === "fulfilled" ? currentOrgResult.value : null,
      isSignedIn: true,
      myOrganizations: orgsResult.status === "fulfilled" && Array.isArray(orgsResult.value) ? orgsResult.value : [],
      resolvedBaseUrl,
      session,
      user: userResult.status === "fulfilled" ? userResult.value : null,
      userProfile: userProfileResult.status === "fulfilled" ? userProfileResult.value : null
    };
    const eventContext = event.context;
    eventContext.thunderid = { isSignedIn: true, session, ssr: ssrData };
    const authState = {
      isLoading: false,
      isSignedIn: true,
      user: ssrData.user
    };
    eventContext.__thunderidAuth = authState;
  });
});
