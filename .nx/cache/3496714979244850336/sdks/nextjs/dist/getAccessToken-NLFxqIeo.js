import { v as __toESM } from "./dynamic-rendering-DlX6qWhq.js";
import { n as require_headers, t as SessionManager_default } from "./SessionManager-CPmH8SM1.js";

//#region src/server/actions/getAccessToken.ts
var import_headers = /* @__PURE__ */ __toESM(require_headers(), 1);
/**
* Get the access token from the session cookie.
*
* @returns The access token if it exists, undefined otherwise
*/
const getAccessToken = async () => {
	const sessionToken = (await (0, import_headers.cookies)()).get(SessionManager_default.getSessionCookieName())?.value;
	if (sessionToken) try {
		return (await SessionManager_default.verifySessionToken(sessionToken))["accessToken"];
	} catch (error) {
		return;
	}
};
var getAccessToken_default = getAccessToken;

//#endregion
export { getAccessToken_default as default };