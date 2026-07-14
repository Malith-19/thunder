import { defineEventHandler, getQuery, getCookie, deleteCookie, sendRedirect, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import {
  issueSessionCookie,
  verifyTempSessionToken,
  getTempSessionCookieName,
  getTempSessionCookieOptions
} from "../../../utils/session.js";
import { useRuntimeConfig } from "#imports";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const sessionSecret = config.thunderid?.sessionSecret;
  const publicConfig = config.public.thunderid;
  const query = getQuery(event);
  const code = query.code;
  const state = query.state;
  const sessionState = query.session_state;
  const error = query.error;
  const errorDescription = query.error_description;
  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Authentication failed: ${errorDescription || error}`
    });
  }
  if (!code || !state) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required OAuth parameters: code and state are required."
    });
  }
  const tempSessionCookie = getCookie(event, getTempSessionCookieName());
  if (!tempSessionCookie) {
    throw createError({
      statusCode: 400,
      statusMessage: "No temporary session found. Please start the sign-in flow again."
    });
  }
  let sessionId;
  let returnTo;
  try {
    const tempSession = await verifyTempSessionToken(
      tempSessionCookie,
      sessionSecret
    );
    sessionId = tempSession.sessionId;
    returnTo = tempSession.returnTo;
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or expired temporary session. Please start the sign-in flow again."
    });
  }
  const client = ThunderIDNuxtClient.getInstance();
  let tokenResponse;
  try {
    tokenResponse = await client.signIn(
      () => {
      },
      // no-op redirect callback (we're handling the code exchange)
      sessionId,
      code,
      sessionState || "",
      state
    );
  } catch (err) {
    throw createError({
      data: err?.message || "An unexpected error occurred during token exchange.",
      statusCode: 500,
      statusMessage: "Token exchange failed."
    });
  }
  if (!tokenResponse?.accessToken && !tokenResponse?.idToken) {
    throw createError({
      statusCode: 500,
      statusMessage: "Token exchange failed: Invalid response from Identity Provider."
    });
  }
  try {
    await issueSessionCookie(event, sessionId, tokenResponse, sessionSecret);
    deleteCookie(event, getTempSessionCookieName(), getTempSessionCookieOptions());
  } catch (err) {
    console.error("[thunderid] Failed to create JWT session:", err?.message || err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to establish session after authentication."
    });
  }
  const redirectUrl = returnTo || publicConfig.afterSignInUrl || "/";
  return sendRedirect(event, redirectUrl, 302);
});
