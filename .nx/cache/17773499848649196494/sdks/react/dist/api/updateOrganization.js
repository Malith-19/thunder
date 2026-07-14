import { FetchHttpClient, createPatchOperations, updateOrganization } from "@thunderid/browser";

//#region src/api/updateOrganization.ts
/**
* Updates the organization information using the Organizations Management API.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object with baseUrl, organizationId, operations and optional request config.
* @returns A promise that resolves with the updated organization information.
* @example
* ```typescript
* // Using the helper function to create operations automatically
* const operations = createPatchOperations({
*   name: "Updated Organization Name",      // Will use REPLACE
*   description: "",                        // Will use REMOVE (empty string)
*   customField: "Some value"              // Will use REPLACE
* });
*
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations
* });
*
* // Or manually specify operations
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations: [
*     { operation: "REPLACE", path: "/name", value: "Updated Organization Name" },
*     { operation: "REMOVE", path: "/description" }
*   ]
* });
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations: [
*     { operation: "REPLACE", path: "/name", value: "Updated Organization Name" }
*   ],
*   fetcher: customFetchFunction
* });
* ```
*/
const updateOrganization$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
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
	return updateOrganization({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var updateOrganization_default = updateOrganization$1;

//#endregion
export { createPatchOperations, updateOrganization_default as default };
//# sourceMappingURL=updateOrganization.js.map