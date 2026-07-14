import user_query_keys_default from "../constants/user-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetUsers.ts
/**
* Custom hook to fetch a list of users.
*
* @param params - Optional query parameters for filtering and pagination
* @returns TanStack Query result object containing user list data, loading state, and error information
*/
function useGetUsers(params) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit, offset, filter } = params ?? {};
	return useQuery({
		queryKey: [user_query_keys_default.USERS, {
			limit,
			offset,
			filter
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const searchParams = new URLSearchParams();
			if (limit !== void 0) searchParams.append("limit", String(limit));
			if (offset !== void 0) searchParams.append("offset", String(offset));
			if (filter) searchParams.append("filter", filter);
			searchParams.append("include", "display");
			const queryString = searchParams.toString();
			return (await http.request({
				url: `${serverUrl}/users${queryString ? `?${queryString}` : ""}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
export { useGetUsers as default };