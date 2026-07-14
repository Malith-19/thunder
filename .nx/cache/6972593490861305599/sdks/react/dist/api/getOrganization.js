import { FetchHttpClient, getOrganization } from "@thunderid/browser";

//#region src/api/getOrganization.ts
/**
* Retrieves detailed information for a specific organization.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, organizationId, and request config.
* @returns A promise that resolves with the organization details.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const organization = await getOrganization({
*     baseUrl: "https://localhost:8090",
*     organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organization:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const organization = await getOrganization({
*     baseUrl: "https://localhost:8090",
*     organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*     fetcher: customFetchFunction
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organization:', error.message);
*   }
* }
* ```
*/
const getOrganization$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
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
	return getOrganization({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getOrganization_default = getOrganization$1;

//#endregion
export { getOrganization_default as default };
//# sourceMappingURL=getOrganization.js.map