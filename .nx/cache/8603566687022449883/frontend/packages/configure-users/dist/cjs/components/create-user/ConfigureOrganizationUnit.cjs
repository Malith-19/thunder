const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_OrganizationUnitTreePicker = require('../../configure-organization-units/dist/components/OrganizationUnitTreePicker.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/create-user/ConfigureOrganizationUnit.tsx
function ConfigureOrganizationUnit({ rootOuId, selectedOuId, onOuIdChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	(0, react.useEffect)(() => {
		if (!selectedOuId) onOuIdChange(rootOuId);
	}, [
		selectedOuId,
		rootOuId,
		onOuIdChange
	]);
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(selectedOuId.length > 0);
	}, [selectedOuId, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-organization-unit",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("users:createWizard.selectOrganizationUnit.title")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("users:createWizard.selectOrganizationUnit.subtitle")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("users:createWizard.selectOrganizationUnit.fieldLabel") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationUnitTreePicker.OrganizationUnitTreePicker, {
					id: "user-create-ou-picker",
					rootOuId,
					value: selectedOuId,
					onChange: onOuIdChange,
					maxHeight: 500
				})]
			})
		]
	});
}

//#endregion
exports.default = ConfigureOrganizationUnit;