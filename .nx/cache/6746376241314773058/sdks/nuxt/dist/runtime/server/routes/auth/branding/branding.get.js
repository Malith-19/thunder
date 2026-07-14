import { defineEventHandler, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import { verifyAndRehydrateSession } from "../../../utils/serverSession.js";
import { useRuntimeConfig } from "#imports";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const publicConfig = config.public.thunderid;
  const sessionSecret = config.thunderid?.sessionSecret;
  const baseUrl = publicConfig?.baseUrl ?? "";
  let resolvedBaseUrl = baseUrl;
  try {
    const session = await verifyAndRehydrateSession(
      event,
      sessionSecret
    );
    if (session) {
      if (session.organizationId) {
        resolvedBaseUrl = `${baseUrl}/o`;
      } else {
        const client = ThunderIDNuxtClient.getInstance();
        const idToken = await client.getDecodedIdToken(
          session.sessionId
        );
        if (idToken?.user_org) {
          resolvedBaseUrl = `${baseUrl}/o`;
        }
      }
    }
  } catch {
  }
  try {
    const client = ThunderIDNuxtClient.getInstance();
    return await client.getBrandingPreference({ baseUrl: resolvedBaseUrl });
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to retrieve branding preference: ${err instanceof Error ? err.message : String(err)}`
    });
  }
});
