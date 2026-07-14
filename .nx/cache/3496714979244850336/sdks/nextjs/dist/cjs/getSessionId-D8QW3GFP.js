const require_dynamic_rendering = require('./dynamic-rendering-BCAIDVkI.js');
const require_SessionManager = require('./SessionManager-A3v2mgBb.js');

//#region src/server/actions/getSessionId.ts
var import_headers = /* @__PURE__ */ require_dynamic_rendering.__toESM(require_SessionManager.require_headers(), 1);
/**
* Get the session ID from cookies.
* Tries JWT session first, then falls back to legacy session ID.
*
* @returns The session ID if it exists, undefined otherwise
*/
const getSessionId = async () => {
	const sessionToken = (await (0, import_headers.cookies)()).get(require_SessionManager.SessionManager_default.getSessionCookieName())?.value;
	if (sessionToken) try {
		return (await require_SessionManager.SessionManager_default.verifySessionToken(sessionToken)).sessionId;
	} catch (error) {
		return;
	}
};
var getSessionId_default = getSessionId;

//#endregion
Object.defineProperty(exports, 'getSessionId_default', {
  enumerable: true,
  get: function () {
    return getSessionId_default;
  }
});