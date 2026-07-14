import { defineNuxtPlugin, useState, useRequestEvent, useRuntimeConfig, navigateTo } from "#app";
import { getRedirectBasedSignUpUrl } from "@thunderid/browser";
import { ThunderIDPlugin, THUNDERID_KEY } from "@thunderid/vue";
import { computed } from "vue";
import ThunderIDRoot from "../components/ThunderIDRoot.js";
export default defineNuxtPlugin((nuxtApp) => {
  const publicConfig = useRuntimeConfig().public.thunderid;
  if (import.meta.client && import.meta.dev) {
    if (!publicConfig?.baseUrl || !publicConfig?.clientId) {
      console.warn(
        "[@thunderid/nuxt] Missing baseUrl or clientId. Set NUXT_PUBLIC_THUNDERID_BASE_URL and NUXT_PUBLIC_THUNDERID_CLIENT_ID, or configure `thunderid` in nuxt.config. Auth endpoints will not function until this is resolved."
      );
    }
  }
  const authState = useState("thunderid:auth", () => ({
    isLoading: true,
    isSignedIn: false,
    user: null
  }));
  const userProfileState = useState("thunderid:user-profile", () => null);
  const currentOrgState = useState("thunderid:current-org", () => null);
  const myOrgsState = useState("thunderid:my-orgs", () => []);
  const brandingState = useState(
    "thunderid:branding",
    () => null
  );
  if (import.meta.server) {
    const event = useRequestEvent();
    const ssr = event?.context?.thunderid?.ssr;
    if (ssr) {
      authState.value = {
        isLoading: false,
        isSignedIn: ssr.isSignedIn,
        user: ssr.user
      };
      userProfileState.value = ssr.userProfile;
      currentOrgState.value = ssr.currentOrganization;
      myOrgsState.value = ssr.myOrganizations;
      brandingState.value = ssr.brandingPreference;
    } else {
      const ssrContext = event?.context?.thunderid;
      if (ssrContext) {
        authState.value = {
          isLoading: false,
          isSignedIn: ssrContext.isSignedIn ?? false,
          user: ssrContext.session?.sub ? { sub: ssrContext.session.sub } : null
        };
      } else {
        const legacyAuth = event?.context?.__thunderidAuth;
        authState.value = legacyAuth ?? { isLoading: false, isSignedIn: false, user: null };
      }
    }
  }
  if (import.meta.client) {
    authState.value = { ...authState.value, isLoading: false };
  }
  const isSignedIn = computed(() => authState.value.isSignedIn);
  const isLoading = computed(() => authState.value.isLoading);
  const isInitialized = computed(() => !authState.value.isLoading);
  const user = computed(() => authState.value.user ?? null);
  const organizationRef = computed(() => currentOrgState.value);
  const signIn = async (options) => {
    const returnTo = typeof options?.returnTo === "string" ? options.returnTo : void 0;
    const url = returnTo ? `/api/auth/signin?returnTo=${encodeURIComponent(returnTo)}` : "/api/auth/signin";
    await navigateTo(url, { external: true });
  };
  const signOut = async () => {
    const res = await $fetch("/api/auth/signout", { method: "POST" });
    await navigateTo(res.redirectUrl || "/", { external: true });
  };
  const signUp = async () => {
    if (publicConfig.signUpUrl) {
      await navigateTo(publicConfig.signUpUrl, { external: true });
      return;
    }
    const redirectUrl = getRedirectBasedSignUpUrl({
      applicationId: publicConfig.applicationId,
      baseUrl: publicConfig.baseUrl,
      clientId: publicConfig.clientId
    });
    if (redirectUrl) {
      await navigateTo(redirectUrl, { external: true });
      return;
    }
    await navigateTo("/api/auth/signup", { external: true });
  };
  const getAccessToken = async () => {
    try {
      const res = await $fetch("/api/auth/token");
      return res.accessToken ?? "";
    } catch {
      return "";
    }
  };
  const noop = async () => void 0;
  nuxtApp.vueApp.provide(THUNDERID_KEY, {
    afterSignInUrl: publicConfig.afterSignInUrl,
    applicationId: publicConfig.applicationId,
    baseUrl: publicConfig.baseUrl,
    clearSession: noop,
    clientId: publicConfig.clientId,
    exchangeToken: noop,
    getAccessToken,
    getDecodedIdToken: noop,
    getIdToken: noop,
    http: { request: noop, requestAll: noop },
    instanceId: 0,
    isInitialized,
    isLoading,
    isSignedIn,
    organization: organizationRef,
    organizationHandle: publicConfig.organizationHandle,
    platform: void 0,
    reInitialize: async () => false,
    signIn,
    signInOptions: void 0,
    signInSilently: noop,
    signInUrl: publicConfig.signInUrl,
    signOut,
    signUp,
    signUpUrl: publicConfig.signUpUrl,
    storage: void 0,
    switchOrganization: noop,
    user
  });
  nuxtApp.vueApp.component("ThunderIDRoot", ThunderIDRoot);
  nuxtApp.vueApp.use(ThunderIDPlugin, { mode: "delegated" });
});
