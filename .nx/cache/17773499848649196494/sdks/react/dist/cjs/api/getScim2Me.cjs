const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/api/getScim2Me.ts
/**
* Retrieves the user profile information from the specified SCIM2 /Me endpoint.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param requestConfig - Request configuration object.
* @returns A promise that resolves with the user profile information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const userProfile = await getScim2Me({
*     url: "https://localhost:8090/scim2/Me",
*   });
*   console.log(userProfile);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get user profile:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const userProfile = await getScim2Me({
*     url: "https://localhost:8090/scim2/Me",
*     fetcher: customFetchFunction
*   });
*   console.log(userProfile);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get user profile:', error.message);
*   }
* }
* ```
*/
const getScim2Me = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await __thunderid_browser.FetchHttpClient.getInstance(instanceId).request({
			headers: config.headers,
			method: config.method || "GET",
			url
		});
		return {
			json: () => Promise.resolve(response.data),
			ok: response.status >= 200 && response.status < 300,
			status: response.status,
			statusText: response.statusText || "",
			text: () => Promise.resolve(typeof response.data === "string" ? response.data : JSON.stringify(response.data))
		};
	};
	return (0, __thunderid_browser.getScim2Me)({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getScim2Me_default = getScim2Me;

//#endregion
exports.default = getScim2Me_default;
//# sourceMappingURL=getScim2Me.cjs.map