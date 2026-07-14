const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/api/getAllOrganizations.ts
/**
* Retrieves all organizations with pagination support.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, optional query parameters, and request config.
* @returns A promise that resolves with the paginated organizations information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const response = await getAllOrganizations({
*     baseUrl: "https://localhost:8090",
*     filter: "",
*     limit: 10,
*     recursive: false
*   });
*   console.log(response.organizations);
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
*   const response = await getAllOrganizations({
*     baseUrl: "https://localhost:8090",
*     filter: "",
*     limit: 10,
*     recursive: false,
*     fetcher: customFetchFunction
*   });
*   console.log(response.organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*/
const getAllOrganizations = async ({ fetcher, instanceId = 0,...requestConfig }) => {
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
	return (0, __thunderid_browser.getAllOrganizations)({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getAllOrganizations_default = getAllOrganizations;

//#endregion
exports.default = getAllOrganizations_default;
//# sourceMappingURL=getAllOrganizations.cjs.map