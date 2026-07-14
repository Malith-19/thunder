const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_ManageGroupsSection = require('./ManageGroupsSection.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/edit-organization-unit/group-settings/EditGroupSettings.tsx
/**
* Groups tab content for the Organization Unit edit page.
*
* Displays sections for:
* - Managing groups belonging to the organization unit (DataGrid)
*
* @param props - Component props
* @returns Groups tab content
*/
function EditGroupSettings({ organizationUnitId }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
		spacing: 3,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ManageGroupsSection.default, { organizationUnitId })
	});
}

//#endregion
exports.default = EditGroupSettings;