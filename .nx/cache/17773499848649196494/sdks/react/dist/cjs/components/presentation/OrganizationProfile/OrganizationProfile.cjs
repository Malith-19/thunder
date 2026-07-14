const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_BaseOrganizationProfile = require('./BaseOrganizationProfile.cjs');
const require_getOrganization = require('../../../api/getOrganization.cjs');
const require_updateOrganization = require('../../../api/updateOrganization.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/OrganizationProfile/OrganizationProfile.tsx
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "OrganizationProfile");
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
	const { baseUrl, instanceId } = require_useThunderID.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const [organization, setOrganization] = (0, react.useState)(null);
	const fetchOrganization = async () => {
		if (!baseUrl || !organizationId) return;
		try {
			setOrganization(await require_getOrganization.default({
				baseUrl,
				instanceId,
				organizationId
			}));
		} catch (err) {
			logger.error("Failed to fetch organization:");
			setOrganization(null);
		}
	};
	(0, react.useEffect)(() => {
		fetchOrganization();
	}, [baseUrl, organizationId]);
	const handleOrganizationUpdate = async (payload) => {
		if (!baseUrl || !organizationId) return;
		try {
			await require_updateOrganization.default({
				baseUrl,
				instanceId,
				operations: (0, __thunderid_browser.createPatchOperations)(payload),
				organizationId
			});
			await fetchOrganization();
			if (onUpdate) await onUpdate(payload);
		} catch (err) {
			logger.error("Failed to update organization:");
			throw err;
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseOrganizationProfile.default, {
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
exports.default = OrganizationProfile_default;
//# sourceMappingURL=OrganizationProfile.cjs.map