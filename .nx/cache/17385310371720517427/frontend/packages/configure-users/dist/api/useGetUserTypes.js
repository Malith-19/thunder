import user_query_keys_default from "../constants/user-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetUserTypes.ts
/**
* Custom hook to fetch a list of user types.
*
* @param params - Optional query parameters for pagination
* @returns TanStack Query result object containing user type list data, loading state, and error information
*/
function useGetUserTypes(params) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit, offset } = params ?? {};
	return useQuery({
		queryKey: [user_query_keys_default.USER_TYPES, {
			limit,
			offset
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const searchParams = new URLSearchParams();
			if (limit !== void 0) searchParams.append("limit", String(limit));
			if (offset !== void 0) searchParams.append("offset", String(offset));
			const queryString = searchParams.toString();
			return (await http.request({
				url: `${serverUrl}/user-types${queryString ? `?${queryString}` : ""}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
export { useGetUserTypes as default };