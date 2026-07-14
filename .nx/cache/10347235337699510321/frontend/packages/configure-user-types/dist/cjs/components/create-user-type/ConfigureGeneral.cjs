const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_configure_organization_units = require("@thunderid/configure-organization-units");
__thunderid_configure_organization_units = require_rolldown_runtime.__toESM(__thunderid_configure_organization_units);

//#region src/components/create-user-type/ConfigureGeneral.tsx
/**
* Step 2 of the user type creation wizard: configure organization unit and self-registration.
*
* @public
*/
function ConfigureGeneral({ ouId, onOuIdChange, allowSelfRegistration, onAllowSelfRegistrationChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { hasMultipleOUs, ouList } = (0, __thunderid_configure_organization_units.useHasMultipleOUs)();
	(0, react.useEffect)(() => {
		if (!ouId && ouList.length > 0) onOuIdChange(ouList[0].id);
	}, [
		ouList,
		ouId,
		onOuIdChange
	]);
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(ouId.trim().length > 0);
	}, [ouId, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-general",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "column",
				spacing: 1,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "h1",
					gutterBottom: true,
					children: t("userTypes:createWizard.general.title")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "subtitle1",
					gutterBottom: true,
					children: t("userTypes:createWizard.general.subtitle")
				})]
			}),
			hasMultipleOUs && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("userTypes:organizationUnit") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_configure_organization_units.OrganizationUnitTreePicker, {
					id: "user-type-ou-picker",
					value: ouId,
					onChange: onOuIdChange
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
				control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
					checked: allowSelfRegistration,
					onChange: (e) => onAllowSelfRegistrationChange(e.target.checked)
				}),
				label: t("userTypes:allowSelfRegistration")
			})
		]
	});
}

//#endregion
exports.default = ConfigureGeneral;