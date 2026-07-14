import user_query_keys_default from "../constants/user-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";

//#region src/api/useGetUserType.ts
/**
* Custom hook to fetch a single user type by ID.
*
* @param id - The ID of the user type to fetch
* @returns TanStack Query result object containing user type data, loading state, and error information
*/
function useGetUserType(id) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [user_query_keys_default.USER_TYPE, id],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/user-types/${id}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(id)
	});
}

//#endregion
export { useGetUserType as default };