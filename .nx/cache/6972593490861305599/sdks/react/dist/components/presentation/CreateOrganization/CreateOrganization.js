import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import useOrganization_default from "../../../contexts/Organization/useOrganization.js";
import { BaseCreateOrganization } from "./BaseCreateOrganization.js";
import createOrganization_default from "../../../api/createOrganization.js";
import { useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";

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
	const { isSignedIn, baseUrl, instanceId } = useThunderID_default();
	const { currentOrganization, revalidateMyOrganizations } = useOrganization_default();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, {});
	const parentId = defaultParentId || currentOrganization?.id || "";
	const handleSubmit = async (payload) => {
		setLoading(true);
		setError(null);
		try {
			let result;
			if (onCreateOrganization) result = await onCreateOrganization(payload);
			else {
				if (!baseUrl) throw new Error("Base URL is required for organization creation");
				result = await createOrganization_default({
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
	return /* @__PURE__ */ jsx(BaseCreateOrganization, {
		onSubmit: handleSubmit,
		loading,
		error,
		defaultParentId: parentId,
		onSuccess,
		...props
	});
};

//#endregion
export { CreateOrganization };
//# sourceMappingURL=CreateOrganization.js.map