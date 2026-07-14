import { defineEventHandler, readBody, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import { verifyAndRehydrateSession } from "../../../utils/serverSession.js";
import { useRuntimeConfig } from "#imports";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const sessionSecret = config.thunderid?.sessionSecret;
  const session = await verifyAndRehydrateSession(
    event,
    sessionSecret
  );
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized: Invalid or expired session." });
  }
  let payload;
  try {
    payload = await readBody(event);
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid request body." });
  }
  try {
    const client = ThunderIDNuxtClient.getInstance();
    return await client.createOrganization(payload, session.sessionId);
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to create organisation: ${err instanceof Error ? err.message : String(err)}`
    });
  }
});
