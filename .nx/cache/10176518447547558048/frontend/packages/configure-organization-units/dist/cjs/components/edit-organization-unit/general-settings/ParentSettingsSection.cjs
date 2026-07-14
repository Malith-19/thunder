const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useGetOrganizationUnit = require('../../../api/useGetOrganizationUnit.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/components/edit-organization-unit/general-settings/ParentSettingsSection.tsx
/**
* Section component displaying the parent organization unit information.
*
* Shows:
* - A link to the parent OU if one exists and is loaded
* - A loading spinner while fetching parent OU details
* - A "no parent" message if the OU has no parent
* - The raw parent ID if the parent OU details cannot be resolved
*
* @param props - Component props
* @returns Parent organization unit info within a SettingsCard
*/
function ParentSettingsSection({ organizationUnit }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { data: parentOU, isLoading: isLoadingParent } = require_useGetOrganizationUnit.default(organizationUnit.parent ?? void 0, Boolean(organizationUnit.parent));
	const renderParentInfo = () => {
		if (!organizationUnit.parent) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
			fullWidth: true,
			id: "parent-ou-input",
			value: t("organizationUnits:edit.general.ou.noParent.label"),
			InputProps: { readOnly: true }
		});
		if (isLoadingParent) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 });
		if (parentOU) {
			const navigationState = { fromOU: {
				id: organizationUnit.id,
				name: organizationUnit.name
			} };
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				spacing: 1,
				alignItems: "center",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					component: react_router.Link,
					to: `/organization-units/${parentOU.id}`,
					state: navigationState,
					"data-state": JSON.stringify(navigationState),
					variant: "body2",
					sx: {
						color: "primary.main",
						textDecoration: "none",
						"&:hover": { textDecoration: "underline" }
					},
					children: parentOU.name
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					color: "text.secondary",
					children: [
						"(",
						parentOU.id,
						")"
					]
				})]
			});
		}
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
			fullWidth: true,
			id: "parent-ou-input",
			value: organizationUnit.parent,
			InputProps: { readOnly: true },
			sx: { "& input": {
				fontFamily: "monospace",
				fontSize: "0.875rem"
			} }
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
		title: t("organizationUnits:edit.general.sections.parentOUSettings.title"),
		description: t("organizationUnits:edit.general.sections.parentOUSettings.description"),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			fullWidth: true,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: "parent-ou-input",
				children: t("organizationUnits:edit.general.ou.parent.label")
			}), renderParentInfo()]
		})
	});
}

//#endregion
exports.default = ParentSettingsSection;