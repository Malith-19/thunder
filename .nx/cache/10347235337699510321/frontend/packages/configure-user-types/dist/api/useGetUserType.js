import userTypeQueryKeys_default from "../constants/userTypeQueryKeys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetUserType.ts
/**
* Custom React hook to fetch a single user type by ID from the server.
*
* @param id - The unique identifier of the user type to fetch
* @returns TanStack Query result object containing user type data, loading state, and error information
*/
function useGetUserType(id) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [userTypeQueryKeys_default.USER_TYPE, id],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/user-types/${id}?include=display`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(id)
	});
}

//#endregion
export { useGetUserType as default };