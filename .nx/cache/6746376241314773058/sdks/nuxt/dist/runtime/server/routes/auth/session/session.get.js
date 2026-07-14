import { defineEventHandler } from "h3";
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
    return { isLoading: false, isSignedIn: false, user: null };
  }
  try {
    const client = ThunderIDNuxtClient.getInstance();
    const user = await client.getUser(session.sessionId);
    return { isLoading: false, isSignedIn: true, user };
  } catch {
    return { isLoading: false, isSignedIn: false, user: null };
  }
});
