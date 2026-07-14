import { v as __toESM } from "./dynamic-rendering-DlX6qWhq.js";
import { n as require_headers, t as SessionManager_default } from "./SessionManager-CPmH8SM1.js";

//#region src/server/actions/getSessionId.ts
var import_headers = /* @__PURE__ */ __toESM(require_headers(), 1);
/**
* Get the session ID from cookies.
* Tries JWT session first, then falls back to legacy session ID.
*
* @returns The session ID if it exists, undefined otherwise
*/
const getSessionId = async () => {
	const sessionToken = (await (0, import_headers.cookies)()).get(SessionManager_default.getSessionCookieName())?.value;
	if (sessionToken) try {
		return (await SessionManager_default.verifySessionToken(sessionToken)).sessionId;
	} catch (error) {
		return;
	}
};
var getSessionId_default = getSessionId;

//#endregion
export { getSessionId_default as t };