const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_resource_server_query_keys = require('../constants/resource-server-query-keys.cjs');
const require_useGetResources = require('./useGetResources.cjs');
const require_useGetServerActions = require('./useGetServerActions.cjs');
const require_useGetResourceActions = require('./useGetResourceActions.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useSubtreePermissions.ts
function useSubtreePermissions(resourceServerId) {
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	async function collectSubtreePermissions(resource) {
		const serverUrl = getServerUrl();
		const typedHttp = http;
		const permissions = [resource.permission];
		const actionsData = await queryClient.fetchQuery({
			queryKey: [
				require_resource_server_query_keys.default.RESOURCE_ACTIONS,
				resourceServerId,
				resource.id
			],
			queryFn: () => require_useGetResourceActions.fetchResourceActions(typedHttp, serverUrl, resourceServerId, resource.id)
		});
		for (const action of actionsData.actions) permissions.push(action.permission);
		const childData = await queryClient.fetchQuery({
			queryKey: [
				require_resource_server_query_keys.default.RESOURCES,
				resourceServerId,
				{ parentId: resource.id }
			],
			queryFn: () => require_useGetResources.fetchResources(typedHttp, serverUrl, resourceServerId, resource.id)
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
			require_resource_server_query_keys.default.RESOURCE_ACTIONS,
			resourceServerId,
			resource.id
		]);
		if (actionsData === void 0) return null;
		for (const action of actionsData.actions) permissions.push(action.permission);
		const childData = queryClient.getQueryData([
			require_resource_server_query_keys.default.RESOURCES,
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
			queryKey: [require_resource_server_query_keys.default.SERVER_ACTIONS, resourceServerId],
			queryFn: () => require_useGetServerActions.fetchServerActions(typedHttp, serverUrl, resourceServerId)
		});
		for (const action of actionsData.actions) permissions.push(action.permission);
		const rootData = await queryClient.fetchQuery({
			queryKey: [
				require_resource_server_query_keys.default.RESOURCES,
				resourceServerId,
				{ parentId: null }
			],
			queryFn: () => require_useGetResources.fetchResources(typedHttp, serverUrl, resourceServerId)
		});
		for (const resource of rootData.resources) {
			const subtree = await collectSubtreePermissions(resource);
			permissions.push(...subtree);
		}
		return permissions;
	}
	function getCachedServerPermissions() {
		const permissions = [];
		const actionsData = queryClient.getQueryData([require_resource_server_query_keys.default.SERVER_ACTIONS, resourceServerId]);
		if (actionsData === void 0) return null;
		for (const action of actionsData.actions) permissions.push(action.permission);
		const rootData = queryClient.getQueryData([
			require_resource_server_query_keys.default.RESOURCES,
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
exports.default = useSubtreePermissions;