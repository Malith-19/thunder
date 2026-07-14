import { defineEventHandler } from "h3";
import { getValidAccessToken } from "../../../utils/token-refresh.js";
export default defineEventHandler(async (event) => {
  const accessToken = await getValidAccessToken(event);
  return { accessToken };
});
