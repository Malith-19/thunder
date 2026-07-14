const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/api/updateMeProfile.ts
/**
* Updates the user profile information at the specified SCIM2 Me endpoint.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object with URL, payload and optional request config.
* @returns A promise that resolves with the updated user profile information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* await updateMeProfile({
*   url: "https://localhost:8090/scim2/Me",
*   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } }
* });
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* await updateMeProfile({
*   url: "https://localhost:8090/scim2/Me",
*   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } },
*   fetcher: customFetchFunction
* });
* ```
*/
const updateMeProfile = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await __thunderid_browser.FetchHttpClient.getInstance(instanceId).request({
			data: config.body ? JSON.parse(config.body) : void 0,
			headers: config.headers,
			method: config.method || "PATCH",
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
	return (0, __thunderid_browser.updateMeProfile)({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var updateMeProfile_default = updateMeProfile;

//#endregion
exports.default = updateMeProfile_default;
//# sourceMappingURL=updateMeProfile.cjs.map