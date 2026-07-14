import { defineEventHandler, deleteCookie } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import { verifyAndRehydrateSession } from "../../../utils/serverSession.js";
import {
  getSessionCookieName,
  getSessionCookieOptions,
  getTempSessionCookieName,
  getTempSessionCookieOptions
} from "../../../utils/session.js";
import { useRuntimeConfig } from "#imports";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const sessionSecret = config.thunderid?.sessionSecret;
  const publicConfig = config.public.thunderid;
  const fallbackUrl = publicConfig.afterSignOutUrl || "/";
  const clearCookies = () => {
    deleteCookie(event, getSessionCookieName(), getSessionCookieOptions());
    deleteCookie(event, getTempSessionCookieName(), getTempSessionCookieOptions());
  };
  const session = await verifyAndRehydrateSession(
    event,
    sessionSecret
  );
  if (!session) {
    clearCookies();
    return { redirectUrl: fallbackUrl };
  }
  try {
    const client = ThunderIDNuxtClient.getInstance();
    const signOutUrl = await client.signOut(session.sessionId);
    clearCookies();
    return { redirectUrl: signOutUrl || fallbackUrl };
  } catch (err) {
    console.error("[thunderid] Sign-out error:", err?.message || err);
    clearCookies();
    return { redirectUrl: fallbackUrl };
  }
});
