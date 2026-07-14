import { defineEventHandler, getRouterParam, createError } from "h3";
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
  const organizationId = getRouterParam(event, "id");
  if (!organizationId) {
    throw createError({ statusCode: 400, statusMessage: "Organization ID is required." });
  }
  try {
    const client = ThunderIDNuxtClient.getInstance();
    return await client.getOrganization(organizationId, session.sessionId);
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to retrieve organisation: ${err instanceof Error ? err.message : String(err)}`
    });
  }
});
