import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import BaseOrganizationProfile_default from "./BaseOrganizationProfile.js";
import getOrganization_default from "../../../api/getOrganization.js";
import updateOrganization_default, { createPatchOperations } from "../../../api/updateOrganization.js";
import { createPackageComponentLogger } from "@thunderid/browser";
import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/OrganizationProfile/OrganizationProfile.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "OrganizationProfile");
/**
* OrganizationProfile component displays organization information in a
* structured and styled format. It automatically fetches organization details
* using the provided organization ID and displays them using BaseOrganizationProfile.
*
* The component supports editing functionality, allowing users to modify organization
* fields inline. Updates are automatically synced with the backend via the SCIM2 API.
*
* This component is the React-specific implementation that automatically
* retrieves the organization data from ThunderID API.
*
* @example
* ```tsx
* // Basic usage with editing enabled (default)
* <OrganizationProfile organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1" />
*
* // Read-only mode
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   editable={false}
* />
*
* // With card layout and custom fallbacks
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   cardLayout={true}
*   loadingFallback={<div>Loading organization...</div>}
*   errorFallback={<div>Failed to load organization</div>}
*   fallback={<div>No organization data available</div>}
* />
*
* // With custom fields configuration and update callback
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   fields={[
*     { key: 'id', label: 'Organization ID', editable: false },
*     { key: 'name', label: 'Organization Name', editable: true },
*     { key: 'description', label: 'Description', editable: true, render: (value) => value || 'No description' },
*     { key: 'created', label: 'Created Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'lastModified', label: 'Last Modified Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'attributes', label: 'Custom Attributes', editable: true }
*   ]}
*   onUpdate={async (payload) => {
*     console.log('Organization updated:', payload);
*     // payload contains the updated field values
*     // The component automatically converts these to patch operations
*   }}
* />
*
* // In popup mode
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   popupTitle="Edit Organization Profile"
* />
* ```
*/
const OrganizationProfile = ({ organizationId, mode = "default", open = false, onOpenChange, onUpdate, popupTitle, loadingFallback, errorFallback, preferences,...rest }) => {
	const { baseUrl, instanceId } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [organization, setOrganization] = useState(null);
	const fetchOrganization = async () => {
		if (!baseUrl || !organizationId) return;
		try {
			setOrganization(await getOrganization_default({
				baseUrl,
				instanceId,
				organizationId
			}));
		} catch (err) {
			logger$1.error("Failed to fetch organization:");
			setOrganization(null);
		}
	};
	useEffect(() => {
		fetchOrganization();
	}, [baseUrl, organizationId]);
	const handleOrganizationUpdate = async (payload) => {
		if (!baseUrl || !organizationId) return;
		try {
			await updateOrganization_default({
				baseUrl,
				instanceId,
				operations: createPatchOperations(payload),
				organizationId
			});
			await fetchOrganization();
			if (onUpdate) await onUpdate(payload);
		} catch (err) {
			logger$1.error("Failed to update organization:");
			throw err;
		}
	};
	return /* @__PURE__ */ jsx(BaseOrganizationProfile_default, {
		organization,
		onUpdate: handleOrganizationUpdate,
		mode: mode === "popup" ? "popup" : "inline",
		open,
		onOpenChange,
		title: popupTitle || t("organization.profile.heading"),
		preferences,
		...rest
	});
};
var OrganizationProfile_default = OrganizationProfile;

//#endregion
export { OrganizationProfile_default as default };
//# sourceMappingURL=OrganizationProfile.js.map