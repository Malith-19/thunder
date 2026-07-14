import { generateSessionId } from "@thunderid/node";
import { defineEventHandler, getQuery, sendRedirect, setCookie, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import { createTempSessionToken, getTempSessionCookieName, getTempSessionCookieOptions } from "../../../utils/session.js";
import { useRuntimeConfig } from "#imports";
export default defineEventHandler(async (event) => {
  const client = ThunderIDNuxtClient.getInstance();
  const config = useRuntimeConfig();
  const sessionSecret = config.thunderid?.sessionSecret;
  const query = getQuery(event);
  const returnTo = query.returnTo;
  const safeReturnTo = returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : void 0;
  const sessionId = generateSessionId();
  const tempToken = await createTempSessionToken(sessionId, sessionSecret, safeReturnTo);
  setCookie(event, getTempSessionCookieName(), tempToken, getTempSessionCookieOptions());
  let authorizationUrl = null;
  await client.signIn(
    (url) => {
      authorizationUrl = url;
    },
    sessionId,
    void 0,
    // no authorization code (initial redirect)
    void 0,
    // no session_state
    void 0,
    // no state
    {}
  );
  if (!authorizationUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to generate authorization URL."
    });
  }
  return sendRedirect(event, authorizationUrl, 302);
});
