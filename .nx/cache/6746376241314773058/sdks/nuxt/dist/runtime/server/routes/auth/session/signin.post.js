import { EmbeddedSignInFlowStatus, generateSessionId, isEmpty } from "@thunderid/node";
import { defineEventHandler, readBody, getCookie, setCookie, deleteCookie, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import { useServerSession } from "../../../utils/serverSession.js";
import {
  issueSessionCookie,
  createTempSessionToken,
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
  const client = ThunderIDNuxtClient.getInstance();
  let sessionId;
  const liveSession = await useServerSession(event);
  if (liveSession?.sessionId) {
    sessionId = liveSession.sessionId;
  } else {
    const tempCookie = getCookie(event, getTempSessionCookieName());
    if (tempCookie) {
      try {
        const tempSession = await verifyTempSessionToken(
          tempCookie,
          sessionSecret
        );
        sessionId = tempSession.sessionId;
      } catch {
        sessionId = generateSessionId();
      }
    } else {
      sessionId = generateSessionId();
    }
    const tempToken = await createTempSessionToken(sessionId, sessionSecret);
    setCookie(event, getTempSessionCookieName(), tempToken, getTempSessionCookieOptions());
  }
  const body = await readBody(event);
  const payload = body?.payload ?? {};
  const request = body?.request ?? {};
  if (isEmpty(payload) || !("flowId" in payload)) {
    try {
      const signInUrl = await client.getAuthorizeRequestUrl(
        { client_secret: "{{clientSecret}}", response_mode: "direct" },
        sessionId
      );
      return { data: { signInUrl }, success: true };
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to build authorize URL: ${err?.message ?? String(err)}`
      });
    }
  }
  let response;
  try {
    response = await client.signIn(payload, request, sessionId);
  } catch (err) {
    throw createError({
      statusCode: 502,
      statusMessage: `Embedded sign-in step failed: ${err?.message ?? String(err)}`
    });
  }
  if (response?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) {
    const authData = response?.authData ?? {};
    const { code, state, session_state: sessionState } = authData;
    if (!code) {
      throw createError({ statusCode: 502, statusMessage: "Authorization code missing from completed flow response." });
    }
    let tokenResponse;
    try {
      tokenResponse = await client.signIn({ code, session_state: sessionState, state }, {}, sessionId);
    } catch (err) {
      throw createError({
        statusCode: 502,
        statusMessage: `Token exchange failed after embedded flow: ${err?.message ?? String(err)}`
      });
    }
    if (!isTokenResponse(tokenResponse)) {
      throw createError({
        statusCode: 502,
        statusMessage: "Token exchange failed: Invalid token response from Identity Provider."
      });
    }
    try {
      await issueSessionCookie(event, sessionId, tokenResponse, sessionSecret);
      deleteCookie(event, getTempSessionCookieName(), getTempSessionCookieOptions());
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to establish session: ${err?.message ?? String(err)}`
      });
    }
    return { data: { afterSignInUrl }, success: true };
  }
  return { data: response, success: true };
});
