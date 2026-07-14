const require_dynamic_rendering = require('./dynamic-rendering-BCAIDVkI.js');
const require_SessionManager = require('./SessionManager-A3v2mgBb.js');

//#region src/server/actions/getAccessToken.ts
var import_headers = /* @__PURE__ */ require_dynamic_rendering.__toESM(require_SessionManager.require_headers(), 1);
/**
* Get the access token from the session cookie.
*
* @returns The access token if it exists, undefined otherwise
*/
const getAccessToken = async () => {
	const sessionToken = (await (0, import_headers.cookies)()).get(require_SessionManager.SessionManager_default.getSessionCookieName())?.value;
	if (sessionToken) try {
		return (await require_SessionManager.SessionManager_default.verifySessionToken(sessionToken))["accessToken"];
	} catch (error) {
		return;
	}
};
var getAccessToken_default = getAccessToken;

//#endregion
exports.default = getAccessToken_default;