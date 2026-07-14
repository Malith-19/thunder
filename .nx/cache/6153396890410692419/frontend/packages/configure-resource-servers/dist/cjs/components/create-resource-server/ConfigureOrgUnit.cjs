const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_configure_organization_units = require("@thunderid/configure-organization-units");
__thunderid_configure_organization_units = require_rolldown_runtime.__toESM(__thunderid_configure_organization_units);

//#region src/components/create-resource-server/ConfigureOrgUnit.tsx
function ConfigureOrgUnit({ selectedOuId, onOuIdChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(selectedOuId.length > 0);
	}, [selectedOuId, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("resourceServers:create.orgUnit.title", "Choose an organization unit")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("resourceServers:create.orgUnit.subtitle", "Select which organization unit this resource server belongs to.")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("resourceServers:create.orgUnit.fieldLabel", "Organization Unit") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_configure_organization_units.OrganizationUnitTreePicker, {
					id: "resource-server-create-ou-picker",
					value: selectedOuId,
					onChange: onOuIdChange,
					maxHeight: 400
				})]
			})
		]
	});
}

//#endregion
exports.default = ConfigureOrgUnit;