import { EmbeddedFlowStatus } from "@thunderid/node";
import { defineEventHandler, readBody, createError } from "h3";
import ThunderIDNuxtClient from "../../../ThunderIDNuxtClient.js";
import { useRuntimeConfig } from "#imports";
function hasFlowStatus(value) {
  return typeof value === "object" && value !== null && "flowStatus" in value;
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const afterSignUpUrl = config.public.thunderid?.afterSignInUrl || "/";
  const body = await readBody(event);
  const payload = body?.payload;
  if (!payload) {
    return { data: { signUpUrl: "" }, success: true };
  }
  const client = ThunderIDNuxtClient.getInstance();
  let response;
  try {
    response = await client.signUp(payload);
  } catch (err) {
    throw createError({
      statusCode: 502,
      statusMessage: `Embedded sign-up step failed: ${err?.message ?? String(err)}`
    });
  }
  if (hasFlowStatus(response) && response.flowStatus === EmbeddedFlowStatus.Complete) {
    return { data: { afterSignUpUrl }, success: true };
  }
  return { data: response, success: true };
});
