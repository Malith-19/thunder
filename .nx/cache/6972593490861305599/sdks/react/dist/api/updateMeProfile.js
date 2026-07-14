import { FetchHttpClient, updateMeProfile } from "@thunderid/browser";

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
const updateMeProfile$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
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
	return updateMeProfile({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var updateMeProfile_default = updateMeProfile$1;

//#endregion
export { updateMeProfile_default as default };
//# sourceMappingURL=updateMeProfile.js.map