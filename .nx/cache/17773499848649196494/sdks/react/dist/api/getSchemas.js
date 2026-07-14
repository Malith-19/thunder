import { FetchHttpClient, getSchemas } from "@thunderid/browser";

//#region src/api/getSchemas.ts
/**
* Retrieves the SCIM2 schemas from the specified endpoint.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Request configuration object.
* @returns A promise that resolves with the SCIM2 schemas information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const schemas = await getSchemas({
*     url: "https://localhost:8090/scim2/Schemas",
*   });
*   console.log(schemas);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get schemas:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const schemas = await getSchemas({
*     url: "https://localhost:8090/scim2/Schemas",
*     fetcher: customFetchFunction
*   });
*   console.log(schemas);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get schemas:', error.message);
*   }
* }
* ```
*/
const getSchemas$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
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
	return getSchemas({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getSchemas_default = getSchemas$1;

//#endregion
export { getSchemas_default as default };
//# sourceMappingURL=getSchemas.js.map