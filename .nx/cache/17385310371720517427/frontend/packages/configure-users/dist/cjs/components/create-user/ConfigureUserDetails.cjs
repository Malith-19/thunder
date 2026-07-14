const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_renderSchemaField = require('../../utils/renderSchemaField.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let react_hook_form = require("react-hook-form");
react_hook_form = require_rolldown_runtime.__toESM(react_hook_form);

//#region src/components/create-user/ConfigureUserDetails.tsx
/**
* Step 2 of the user creation wizard: fill in the dynamic form fields.
*
* @public
*/
function ConfigureUserDetails({ schema, defaultValues, onFormValuesChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { resolveDisplayName } = (0, __thunderid_hooks.useResolveDisplayName)({ handlers: { t } });
	const { control, watch, formState: { errors, isValid } } = (0, react_hook_form.useForm)({
		defaultValues,
		mode: "onChange"
	});
	(0, react.useEffect)(() => {
		const subscription = watch((values) => {
			onFormValuesChange(values);
		});
		return () => subscription.unsubscribe();
	}, [watch, onFormValuesChange]);
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(isValid);
	}, [isValid, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-user-details",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("users:createWizard.userDetails.title")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("users:createWizard.userDetails.subtitle")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: schema.schema && Object.entries(schema.schema).map(([fieldName, fieldDef]) => require_renderSchemaField.default(fieldName, fieldDef, control, errors, resolveDisplayName))
			})
		]
	});
}

//#endregion
exports.default = ConfigureUserDetails;