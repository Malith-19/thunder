import user_query_keys_default from "../constants/user-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";

//#region src/api/useGetUser.ts
/**
* Custom hook to fetch a single user by ID.
*
* @param userId - The ID of the user to fetch
* @returns TanStack Query result object containing user data, loading state, and error information
*/
function useGetUser(userId) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [user_query_keys_default.USER, userId],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/users/${userId}?include=display`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(userId)
	});
}

//#endregion
export { useGetUser as default };