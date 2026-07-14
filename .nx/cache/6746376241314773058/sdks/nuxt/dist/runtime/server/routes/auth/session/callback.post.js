import { defineEventHandler, readBody, getCookie, deleteCookie, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import {
  issueSessionCookie,
  verifyTempSessionToken,
  getTempSessionCookieName,
  getTempSessionCookieOptions
} from "../../../utils/session.js";
import { useRuntimeConfig } from "#imports";
function isTokenResponse(value) {
  return typeof value === "object" && value !== null && ("accessToken" in value || "idToken" in value || "refreshToken" in value);
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const sessionSecret = config.thunderid?.sessionSecret;
  const afterSignInUrl = config.public.thunderid?.afterSignInUrl || "/";
  const body = await readBody(event);
  const { code, state, sessionState } = body ?? {};
  if (!code) {
    throw createError({ statusCode: 400, statusMessage: "Missing required parameter: code" });
  }
  const tempCookie = getCookie(event, getTempSessionCookieName());
  if (!tempCookie) {
    throw createError({ statusCode: 400, statusMessage: "No active auth session found. Please restart sign-in." });
  }
  let sessionId;
  try {
    const tempSession = await verifyTempSessionToken(
      tempCookie,
      sessionSecret
    );
    sessionId = tempSession.sessionId;
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Auth session expired or invalid. Please restart sign-in." });
  }
  const client = ThunderIDNuxtClient.getInstance();
  let tokenResponse;
  try {
    tokenResponse = await client.signIn({ code, session_state: sessionState, state }, {}, sessionId);
  } catch (err) {
    return { error: err?.message ?? String(err), success: false };
  }
  if (!isTokenResponse(tokenResponse)) {
    return { error: "Invalid token response from Identity Provider.", success: false };
  }
  try {
    await issueSessionCookie(event, sessionId, tokenResponse, sessionSecret);
    deleteCookie(event, getTempSessionCookieName(), getTempSessionCookieOptions());
  } catch (err) {
    return { error: `Failed to establish session: ${err?.message ?? String(err)}`, success: false };
  }
  return { redirectUrl: afterSignInUrl, success: true };
});
