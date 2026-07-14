const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/hooks/useBrowserUrl.ts
/**
* Hook that provides utilities for handling browser URLs in authentication flows.
*
* @returns An object containing URL utility functions
*
* @example
* ```tsx
* const { hasAuthParams } = useBrowserUrl();
* const url = new URL(window.location.href);
*
* if (hasAuthParams(url, "/after-signin")) {
*   // Handle authentication callback
* }
* ```
*/
const useBrowserUrl = () => {
	const hasAuthParams = (url, afterSignInUrl) => (0, __thunderid_browser.hasAuthParamsInUrl)() && new URL(url.origin + url.pathname).toString() === new URL(afterSignInUrl).toString() || url.searchParams.get("error") !== null;
	const hasCalledForThisInstance = (url, instanceId) => (0, __thunderid_browser.hasCalledForThisInstanceInUrl)(instanceId, url.search);
	return {
		hasAuthParams,
		hasCalledForThisInstance
	};
};
var useBrowserUrl_default = useBrowserUrl;

//#endregion
exports.default = useBrowserUrl_default;
//# sourceMappingURL=useBrowserUrl.cjs.map