const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/api/getMeOrganizations.ts
/**
* Retrieves the organizations associated with the current user.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, optional query parameters, and request config.
* @returns A promise that resolves with the organizations information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const organizations = await getMeOrganizations({
*     baseUrl: "https://localhost:8090",
*     after: "",
*     before: "",
*     filter: "",
*     limit: 10,
*     recursive: false
*   });
*   console.log(organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const organizations = await getMeOrganizations({
*     baseUrl: "https://localhost:8090",
*     after: "",
*     before: "",
*     filter: "",
*     limit: 10,
*     recursive: false,
*     fetcher: customFetchFunction
*   });
*   console.log(organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*/
const getMeOrganizations = async ({ fetcher, instanceId = 0,...requestConfig }) => {
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
	return (0, __thunderid_browser.getMeOrganizations)({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getMeOrganizations_default = getMeOrganizations;

//#endregion
exports.default = getMeOrganizations_default;
//# sourceMappingURL=getMeOrganizations.cjs.map