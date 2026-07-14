import { getCookie, createError } from "h3";
import { verifySessionToken, getSessionCookieName } from "./session.js";
import ThunderIDNuxtClient from "../ThunderIDNuxtClient.js";
import { useRuntimeConfig } from "#imports";
export async function useServerSession(event) {
  const config = useRuntimeConfig();
  const sessionSecret = config.thunderid?.sessionSecret;
  const sessionCookie = getCookie(event, getSessionCookieName());
  if (!sessionCookie) {
    return null;
  }
  try {
    return await verifySessionToken(sessionCookie, sessionSecret);
  } catch {
    return null;
  }
}
export async function requireServerSession(event) {
  const session = await useServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Authentication required."
    });
  }
  return session;
}
export async function verifyAndRehydrateSession(event, sessionSecret) {
  const sessionCookie = getCookie(event, getSessionCookieName());
  if (!sessionCookie) {
    return null;
  }
  let session;
  try {
    session = await verifySessionToken(sessionCookie, sessionSecret);
  } catch {
    return null;
  }
  try {
    await ThunderIDNuxtClient.getInstance().rehydrateSessionFromPayload(session);
  } catch {
  }
  return session;
}
