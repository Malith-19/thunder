const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_DangerZoneSection = require('./DangerZoneSection.cjs');
const require_ParentSettingsSection = require('./ParentSettingsSection.cjs');
const require_QuickCopySection = require('./QuickCopySection.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/components/edit-organization-unit/general-settings/EditGeneralSettings.tsx
/**
* Container component for general organization unit settings.
*
* Displays sections for:
* - Quick copy of organization unit identifiers (Handle, ID)
* - Parent Organization Unit information
* - Danger zone (delete organization unit)
*
* @param props - Component props
* @returns General settings sections wrapped in a Stack
*/
function EditGeneralSettings({ organizationUnit, onDeleteClick }) {
	const [copiedField, setCopiedField] = (0, react.useState)(null);
	const copyTimeoutRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => () => {
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		spacing: 3,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_QuickCopySection.default, {
				organizationUnit,
				copiedField,
				onCopyToClipboard: (0, react.useCallback)(async (text, fieldName) => {
					await navigator.clipboard.writeText(text);
					setCopiedField(fieldName);
					if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
					copyTimeoutRef.current = setTimeout(() => {
						setCopiedField(null);
					}, 2e3);
				}, [])
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ParentSettingsSection.default, { organizationUnit }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_DangerZoneSection.default, { onDeleteClick })
		]
	});
}

//#endregion
exports.default = EditGeneralSettings;