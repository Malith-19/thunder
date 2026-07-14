import { CookieConfig } from "@thunderid/node";
import { setCookie } from "h3";
import { SignJWT, jwtVerify } from "jose";
const DEFAULT_EXPIRY_SECONDS = 3600;
function getSecret(sessionSecret) {
  const secret = sessionSecret || process.env.THUNDERID_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "[thunderid] THUNDERID_SESSION_SECRET environment variable is required in production. Set it to a secure random string of at least 32 characters."
      );
    }
    console.warn(
      "[thunderid] Using default session secret for development. Set THUNDERID_SESSION_SECRET for production."
    );
    return new TextEncoder().encode("thunderid-dev-secret-not-for-production");
  }
  return new TextEncoder().encode(secret);
}
export async function createSessionToken(params, sessionSecret) {
  const secret = getSecret(sessionSecret);
  return new SignJWT({
    accessToken: params.accessToken,
    accessTokenExpiresAt: params.accessTokenExpiresAt,
    idToken: params.idToken,
    organizationId: params.organizationId,
    refreshToken: params.refreshToken,
    scopes: params.scopes,
    sessionId: params.sessionId,
    type: "session"
  }).setProtectedHeader({ alg: "HS256" }).setSubject(params.userId).setIssuedAt().setExpirationTime(Date.now() / 1e3 + (params.expirySeconds ?? DEFAULT_EXPIRY_SECONDS)).sign(secret);
}
export async function createTempSessionToken(sessionId, sessionSecret, returnTo) {
  const secret = getSecret(sessionSecret);
  const payload = {
    sessionId,
    type: "temp"
  };
  if (returnTo) {
    payload.returnTo = returnTo;
  }
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("15m").sign(secret);
}
export async function verifySessionToken(token, sessionSecret) {
  const secret = getSecret(sessionSecret);
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
export async function verifyTempSessionToken(token, sessionSecret) {
  const secret = getSecret(sessionSecret);
  const { payload } = await jwtVerify(token, secret);
  if (payload.type !== "temp") {
    throw new Error("Invalid token type: expected temp session");
  }
  return {
    returnTo: payload.returnTo,
    sessionId: payload.sessionId
  };
}
export function getSessionCookieName() {
  return CookieConfig.SESSION_COOKIE_NAME;
}
export function getTempSessionCookieName() {
  return CookieConfig.TEMP_SESSION_COOKIE_NAME;
}
export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: DEFAULT_EXPIRY_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  };
}
export function getTempSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: 15 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  };
}
export async function issueSessionCookie(event, sessionId, tokenResponse, sessionSecret) {
  const { default: ThunderIDNuxtClient } = await import("../ThunderIDNuxtClient.js");
  const client = ThunderIDNuxtClient.getInstance();
  const idToken = await client.getDecodedIdToken(sessionId, tokenResponse.idToken);
  const userId = idToken.sub || sessionId;
  const organizationId = idToken.user_org || idToken.organization_id;
  const expiresInSeconds = parseInt(tokenResponse.expiresIn ?? "3600", 10);
  const accessTokenExpiresAt = Math.floor(Date.now() / 1e3) + (Number.isFinite(expiresInSeconds) ? expiresInSeconds : 3600);
  const sessionToken = await createSessionToken(
    {
      accessToken: tokenResponse.accessToken,
      accessTokenExpiresAt,
      idToken: tokenResponse.idToken || void 0,
      organizationId,
      refreshToken: tokenResponse.refreshToken || void 0,
      scopes: tokenResponse.scope || "",
      sessionId,
      userId
    },
    sessionSecret
  );
  setCookie(event, getSessionCookieName(), sessionToken, getSessionCookieOptions());
}
