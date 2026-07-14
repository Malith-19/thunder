import userTypeQueryKeys_default from "../constants/userTypeQueryKeys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetUserTypes.ts
/**
* Custom React hook to fetch a paginated list of user types from the server.
*
* @param params - Optional pagination parameters
* @param params.limit - Maximum number of records to return
* @param params.offset - Number of records to skip for pagination
* @returns TanStack Query result object containing user types list data, loading state, and error information
*/
function useGetUserTypes(params) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit, offset } = params ?? {};
	return useQuery({
		queryKey: [userTypeQueryKeys_default.USER_TYPES, {
			limit,
			offset
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const queryParams = new URLSearchParams();
			if (limit !== void 0) queryParams.append("limit", limit.toString());
			if (offset !== void 0) queryParams.append("offset", offset.toString());
			queryParams.append("include", "display");
			const queryString = queryParams.toString();
			const url = `${serverUrl}/user-types${queryString ? `?${queryString}` : ""}`;
			return (await http.request({
				url,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
export { useGetUserTypes as default };