const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_ManageChildOrganizationUnitSection = require('./ManageChildOrganizationUnitSection.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/edit-organization-unit/child-organization-unit-settings/EditChildOrganizationUnitSettings.tsx
/**
* Child Organization Units tab content for the Organization Unit edit page.
*
* Displays sections for:
* - Managing child organization units (DataGrid with navigation)
*
* @param props - Component props
* @returns Child OUs tab content
*/
function EditChildOrganizationUnitSettings({ organizationUnitId, organizationUnitName }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
		spacing: 3,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ManageChildOrganizationUnitSection.default, {
			organizationUnitId,
			organizationUnitName
		})
	});
}

//#endregion
exports.default = EditChildOrganizationUnitSettings;