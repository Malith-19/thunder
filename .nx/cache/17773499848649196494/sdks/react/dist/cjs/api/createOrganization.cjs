const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/api/createOrganization.ts
/**
* Creates a new organization.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, payload and optional request config.
* @returns A promise that resolves with the created organization information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const organization = await createOrganization({
*     baseUrl: "https://localhost:8090",
*     payload: {
*       description: "Share your screens",
*       name: "Team Viewer",
*       orgHandle: "team-viewer",
*       parentId: "f4825104-4948-40d9-ab65-a960eee3e3d5",
*       type: "TENANT"
*     }
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to create organization:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const organization = await createOrganization({
*     baseUrl: "https://localhost:8090",
*     payload: {
*       description: "Share your screens",
*       name: "Team Viewer",
*       orgHandle: "team-viewer",
*       parentId: "f4825104-4948-40d9-ab65-a960eee3e3d5",
*       type: "TENANT"
*     },
*     fetcher: customFetchFunction
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to create organization:', error.message);
*   }
* }
* ```
*/
const createOrganization = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await __thunderid_browser.FetchHttpClient.getInstance(instanceId).request({
			data: config.body ? JSON.parse(config.body) : void 0,
			headers: config.headers,
			method: config.method || "POST",
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
	return (0, __thunderid_browser.createOrganization)({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var createOrganization_default = createOrganization;

//#endregion
exports.default = createOrganization_default;
//# sourceMappingURL=createOrganization.cjs.map