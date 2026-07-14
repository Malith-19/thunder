import { FetchHttpClient, getAllOrganizations } from "@thunderid/browser";

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
const getAllOrganizations$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
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
	return getAllOrganizations({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getAllOrganizations_default = getAllOrganizations$1;

//#endregion
export { getAllOrganizations_default as default };
//# sourceMappingURL=getAllOrganizations.js.map