const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);

//#region src/components/edit-organization-unit/general-settings/DangerZoneSection.tsx
/**
* Section component displaying the danger zone with destructive actions.
*
* Displays a delete button for permanently removing the organization unit.
*
* @param props - Component props
* @returns Danger zone UI within a Paper
*/
function DangerZoneSection({ onDeleteClick }) {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__thunderid_components.SettingsCard, {
		title: t("organizationUnits:edit.general.sections.dangerZone.title"),
		description: t("organizationUnits:edit.general.sections.dangerZone.description"),
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h6",
				gutterBottom: true,
				color: "error",
				children: t("organizationUnits:edit.general.sections.dangerZone.deleteOU.title")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				color: "text.secondary",
				sx: { mb: 3 },
				children: t("organizationUnits:edit.general.sections.dangerZone.deleteOU.description")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "contained",
				color: "error",
				onClick: onDeleteClick,
				children: t("organizationUnits:edit.general.dangerZone.delete.button.label")
			})
		]
	});
}

//#endregion
exports.default = DangerZoneSection;