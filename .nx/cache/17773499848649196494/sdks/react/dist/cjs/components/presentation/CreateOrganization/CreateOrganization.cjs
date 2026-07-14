const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_useOrganization = require('../../../contexts/Organization/useOrganization.cjs');
const require_BaseCreateOrganization = require('./BaseCreateOrganization.cjs');
const require_createOrganization = require('../../../api/createOrganization.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/CreateOrganization/CreateOrganization.tsx
/**
* CreateOrganization component that provides organization creation functionality.
* This component automatically integrates with the ThunderID and Organization contexts.
*
* @example
* ```tsx
* import { CreateOrganization } from '@thunderid/react';
*
* // Basic usage - uses default API and contexts
* <CreateOrganization
*   onSuccess={(org) => console.log('Created:', org)}
*   onCancel={() => navigate('/organizations')}
* />
*
* // With custom organization creation handler
* <CreateOrganization
*   onCreateOrganization={async (payload) => {
*     const result = await myCustomAPI.createOrganization(payload);
*     return result;
*   }}
*   onSuccess={(org) => {
*     console.log('Organization created:', org.name);
*     // Custom success logic here
*   }}
* />
*
* // With fallback for unauthenticated users
* <CreateOrganization
*   fallback={<div>Please sign in to create an organization</div>}
* />
* ```
*/
const CreateOrganization = ({ onCreateOrganization, fallback = null, onSuccess, defaultParentId,...props }) => {
	const { isSignedIn, baseUrl, instanceId } = require_useThunderID.default();
	const { currentOrganization, revalidateMyOrganizations } = require_useOrganization.default();
	const [loading, setLoading] = (0, react.useState)(false);
	const [error, setError] = (0, react.useState)(null);
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, {});
	const parentId = defaultParentId || currentOrganization?.id || "";
	const handleSubmit = async (payload) => {
		setLoading(true);
		setError(null);
		try {
			let result;
			if (onCreateOrganization) result = await onCreateOrganization(payload);
			else {
				if (!baseUrl) throw new Error("Base URL is required for organization creation");
				result = await require_createOrganization.default({
					baseUrl,
					instanceId,
					payload: {
						...payload,
						parentId
					}
				});
			}
			await revalidateMyOrganizations();
			if (onSuccess) onSuccess(result);
		} catch (createError) {
			setError(createError instanceof Error ? createError.message : "Failed to create organization");
			throw createError;
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseCreateOrganization.BaseCreateOrganization, {
		onSubmit: handleSubmit,
		loading,
		error,
		defaultParentId: parentId,
		onSuccess,
		...props
	});
};

//#endregion
exports.CreateOrganization = CreateOrganization;
//# sourceMappingURL=CreateOrganization.cjs.map