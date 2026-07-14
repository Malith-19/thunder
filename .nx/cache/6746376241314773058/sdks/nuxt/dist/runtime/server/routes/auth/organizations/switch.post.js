import { defineEventHandler, readBody, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import { verifyAndRehydrateSession } from "../../../utils/serverSession.js";
import { issueSessionCookie } from "../../../utils/session.js";
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
  const { sessionId } = session;
  let organization;
  try {
    const body = await readBody(event);
    organization = body.organization;
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid request body." });
  }
  if (!organization?.id) {
    throw createError({ statusCode: 400, statusMessage: "organization.id is required." });
  }
  let tokenResponse;
  try {
    const client = ThunderIDNuxtClient.getInstance();
    const response = await client.switchOrganization(organization, sessionId);
    tokenResponse = response;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `Organisation switch failed: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  try {
    const runtimeConfig = useRuntimeConfig();
    const runtimeSessionSecret = runtimeConfig.thunderid?.sessionSecret;
    await issueSessionCookie(event, sessionId, tokenResponse, runtimeSessionSecret);
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to establish new session after organisation switch: ${err instanceof Error ? err.message : String(err)}`
    });
  }
  return { success: true };
});
