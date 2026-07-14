import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { fetchResources } from "./useGetResources.js";
import { fetchServerActions } from "./useGetServerActions.js";
import { fetchResourceActions } from "./useGetResourceActions.js";
import { useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useSubtreePermissions.ts
function useSubtreePermissions(resourceServerId) {
	const queryClient = useQueryClient();
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	async function collectSubtreePermissions(resource) {
		const serverUrl = getServerUrl();
		const typedHttp = http;
		const permissions = [resource.permission];
		const actionsData = await queryClient.fetchQuery({
			queryKey: [
				resource_server_query_keys_default.RESOURCE_ACTIONS,
				resourceServerId,
				resource.id
			],
			queryFn: () => fetchResourceActions(typedHttp, serverUrl, resourceServerId, resource.id)
		});
		for (const action of actionsData.actions) permissions.push(action.permission);
		const childData = await queryClient.fetchQuery({
			queryKey: [
				resource_server_query_keys_default.RESOURCES,
				resourceServerId,
				{ parentId: resource.id }
			],
			queryFn: () => fetchResources(typedHttp, serverUrl, resourceServerId, resource.id)
		});
		for (const child of childData.resources) {
			const childPerms = await collectSubtreePermissions(child);
			permissions.push(...childPerms);
		}
		return permissions;
	}
	function getCachedSubtreePermissions(resource) {
		const permissions = [resource.permission];
		const actionsData = queryClient.getQueryData([
			resource_server_query_keys_default.RESOURCE_ACTIONS,
			resourceServerId,
			resource.id
		]);
		if (actionsData === void 0) return null;
		for (const action of actionsData.actions) permissions.push(action.permission);
		const childData = queryClient.getQueryData([
			resource_server_query_keys_default.RESOURCES,
			resourceServerId,
			{ parentId: resource.id }
		]);
		if (childData === void 0) return null;
		for (const child of childData.resources) {
			const childPerms = getCachedSubtreePermissions(child);
			if (childPerms === null) return null;
			permissions.push(...childPerms);
		}
		return permissions;
	}
	async function collectServerPermissions() {
		const serverUrl = getServerUrl();
		const typedHttp = http;
		const permissions = [];
		const actionsData = await queryClient.fetchQuery({
			queryKey: [resource_server_query_keys_default.SERVER_ACTIONS, resourceServerId],
			queryFn: () => fetchServerActions(typedHttp, serverUrl, resourceServerId)
		});
		for (const action of actionsData.actions) permissions.push(action.permission);
		const rootData = await queryClient.fetchQuery({
			queryKey: [
				resource_server_query_keys_default.RESOURCES,
				resourceServerId,
				{ parentId: null }
			],
			queryFn: () => fetchResources(typedHttp, serverUrl, resourceServerId)
		});
		for (const resource of rootData.resources) {
			const subtree = await collectSubtreePermissions(resource);
			permissions.push(...subtree);
		}
		return permissions;
	}
	function getCachedServerPermissions() {
		const permissions = [];
		const actionsData = queryClient.getQueryData([resource_server_query_keys_default.SERVER_ACTIONS, resourceServerId]);
		if (actionsData === void 0) return null;
		for (const action of actionsData.actions) permissions.push(action.permission);
		const rootData = queryClient.getQueryData([
			resource_server_query_keys_default.RESOURCES,
			resourceServerId,
			{ parentId: null }
		]);
		if (rootData === void 0) return null;
		for (const resource of rootData.resources) {
			const subtree = getCachedSubtreePermissions(resource);
			if (subtree === null) return null;
			permissions.push(...subtree);
		}
		return permissions;
	}
	return {
		collectSubtreePermissions,
		getCachedSubtreePermissions,
		collectServerPermissions,
		getCachedServerPermissions
	};
}

//#endregion
export { useSubtreePermissions as default };