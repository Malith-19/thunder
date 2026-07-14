import { hasAuthParamsInUrl, hasCalledForThisInstanceInUrl } from "@thunderid/browser";

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
	const hasAuthParams = (url, afterSignInUrl) => hasAuthParamsInUrl() && new URL(url.origin + url.pathname).toString() === new URL(afterSignInUrl).toString() || url.searchParams.get("error") !== null;
	const hasCalledForThisInstance = (url, instanceId) => hasCalledForThisInstanceInUrl(instanceId, url.search);
	return {
		hasAuthParams,
		hasCalledForThisInstance
	};
};
var useBrowserUrl_default = useBrowserUrl;

//#endregion
export { useBrowserUrl_default as default };
//# sourceMappingURL=useBrowserUrl.js.map