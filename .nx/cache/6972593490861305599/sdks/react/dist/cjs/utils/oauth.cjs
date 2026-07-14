const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/utils/oauth.ts
/**
* Initiates OAuth redirect with CSRF protection.
* Generates random state, stores return path in sessionStorage, and redirects to OAuth provider.
*
* @param redirectURL - OAuth authorization URL from the server
*/
function initiateOAuthRedirect(redirectURL) {
	const basePath = document.querySelector("base")?.getAttribute("href") || "";
	let returnPath = window.location.pathname;
	if (basePath && returnPath.startsWith(basePath)) returnPath = returnPath.slice(basePath.length) || "/";
	const state = crypto.randomUUID();
	sessionStorage.setItem(`thunderid_oauth_${state}`, JSON.stringify({
		path: returnPath,
		timestamp: Date.now()
	}));
	const redirectUrlObj = new URL(redirectURL);
	redirectUrlObj.searchParams.set("state", state);
	(0, __thunderid_browser.navigate)(redirectUrlObj.toString());
}

//#endregion
exports.initiateOAuthRedirect = initiateOAuthRedirect;
//# sourceMappingURL=oauth.cjs.map