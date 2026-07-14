import { navigateTo, useState, useRuntimeConfig } from "#app";
import { EmbeddedSignInFlowStatus, getRedirectBasedSignUpUrl } from "@thunderid/browser";
import { useThunderID as useThunderIDVue } from "@thunderid/vue";
export function useThunderID() {
  const context = useThunderIDVue();
  const signIn = async (...args) => {
    const arg0 = args[0];
    const isEmbedded = typeof arg0 === "object" && arg0 !== null && "flowId" in arg0;
    if (isEmbedded) {
      const payload = arg0;
      const request = args[1] ?? {};
      const res = await $fetch("/api/auth/signin", {
        body: { payload, request },
        method: "POST"
      });
      if (res.data?.afterSignInUrl) {
        if (import.meta.client) {
          try {
            const session = await $fetch("/api/auth/session");
            const authState = useState("thunderid:auth");
            authState.value = session;
          } catch {
          }
        }
        return {
          authData: {},
          flowStatus: EmbeddedSignInFlowStatus.SuccessCompleted
        };
      }
      return res.data;
    }
    const options = arg0;
    const returnTo = typeof options?.returnTo === "string" ? options.returnTo : void 0;
    const url = returnTo ? `/api/auth/signin?returnTo=${encodeURIComponent(returnTo)}` : "/api/auth/signin";
    await navigateTo(url, { external: true });
    return void 0;
  };
  const signOut = async () => {
    const res = await $fetch("/api/auth/signout", { method: "POST" });
    await navigateTo(res.redirectUrl || "/", { external: true });
  };
  const signUp = async (...args) => {
    const payload = args[0];
    if (payload && typeof payload === "object" && "flowType" in payload) {
      const res = await $fetch("/api/auth/signup", {
        body: { payload },
        method: "POST"
      });
      if (res.data?.afterSignUpUrl) {
        await navigateTo(res.data.afterSignUpUrl, { external: false });
        return void 0;
      }
      return res.data;
    }
    const cfg = useRuntimeConfig().public.thunderid ?? {};
    if (cfg.signUpUrl) {
      await navigateTo(cfg.signUpUrl, { external: true });
      return void 0;
    }
    const redirectUrl = getRedirectBasedSignUpUrl({
      applicationId: cfg.applicationId,
      baseUrl: cfg.baseUrl,
      clientId: cfg.clientId
    });
    if (redirectUrl) {
      await navigateTo(redirectUrl, { external: true });
      return void 0;
    }
    await navigateTo("/sign-up", { external: false });
    return void 0;
  };
  return { ...context, signIn, signOut, signUp };
}
