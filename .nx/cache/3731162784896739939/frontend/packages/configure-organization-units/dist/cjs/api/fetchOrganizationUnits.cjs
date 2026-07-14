
//#region src/api/fetchOrganizationUnits.ts
/**
* Fetches a paginated list of root organization units from the server.
*
* This is a standalone API utility that can be used both by React Query hooks
* and by imperative fetch calls (e.g. via queryClient.fetchQuery).
*
* @param http - The HTTP client from useThunderID
* @param serverUrl - The base server URL
* @param params - Pagination parameters
* @param params.limit - Maximum number of records to return
* @param params.offset - Number of records to skip
* @returns The organization unit list response
*/
async function fetchOrganizationUnits(http, serverUrl, params) {
	const queryParams = new URLSearchParams({
		limit: String(params.limit),
		offset: String(params.offset)
	});
	return (await http.request({
		url: `${serverUrl}/organization-units?${queryParams.toString()}`,
		method: "GET",
		headers: { "Content-Type": "application/json" }
	})).data;
}

//#endregion
exports.default = fetchOrganizationUnits;