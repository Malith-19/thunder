import { navigate } from "@thunderid/browser";

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
	navigate(redirectUrlObj.toString());
}

//#endregion
export { initiateOAuthRedirect };
//# sourceMappingURL=oauth.js.map