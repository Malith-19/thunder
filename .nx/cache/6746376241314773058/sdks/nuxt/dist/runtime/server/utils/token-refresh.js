import { createError, setCookie } from "h3";
import { requireServerSession } from "./serverSession.js";
import { createSessionToken, getSessionCookieName, getSessionCookieOptions } from "./session.js";
import { useRuntimeConfig } from "#imports";
const REFRESH_SKEW_SECONDS = 60;
export async function getValidAccessToken(event) {
  const session = await requireServerSession(event);
  const now = Math.floor(Date.now() / 1e3);
  if (!session.accessTokenExpiresAt || session.accessTokenExpiresAt - REFRESH_SKEW_SECONDS > now) {
    return session.accessToken;
  }
  if (!session.refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: "Session expired. Please sign in again."
    });
  }
  const config = useRuntimeConfig(event);
  const publicConfig = config.public.thunderid;
  const privateConfig = config.thunderid;
  const tokenEndpoint = `${publicConfig.baseUrl}/oauth2/token`;
  const body = new URLSearchParams({
    client_id: publicConfig.clientId,
    grant_type: "refresh_token",
    refresh_token: session.refreshToken
  });
  if (privateConfig?.clientSecret) {
    body.set("client_secret", privateConfig.clientSecret);
  }
  let refreshed;
  try {
    const res = await fetch(tokenEndpoint, {
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST"
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => String(res.status));
      throw new Error(`Token endpoint returned ${res.status}: ${errText}`);
    }
    refreshed = await res.json();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[thunderid] Token refresh failed:", msg);
    throw createError({
      statusCode: 401,
      statusMessage: "Token refresh failed. Please sign in again."
    });
  }
  const newSessionToken = await createSessionToken(
    {
      accessToken: refreshed.access_token,
      accessTokenExpiresAt: now + (refreshed.expires_in ?? 3600),
      idToken: refreshed.id_token ?? session.idToken,
      organizationId: session.organizationId,
      refreshToken: refreshed.refresh_token ?? session.refreshToken,
      scopes: refreshed.scope ?? session.scopes,
      sessionId: session.sessionId,
      userId: session.sub
    },
    privateConfig?.sessionSecret
  );
  setCookie(event, getSessionCookieName(), newSessionToken, getSessionCookieOptions());
  return refreshed.access_token;
}
