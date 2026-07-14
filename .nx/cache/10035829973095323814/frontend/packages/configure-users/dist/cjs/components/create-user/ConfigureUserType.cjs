const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/create-user/ConfigureUserType.tsx
/**
* Step 1 of the user creation wizard: select a user type (schema).
*
* @public
*/
function ConfigureUserType({ schemas, selectedSchema, onSchemaChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(selectedSchema !== null);
	}, [selectedSchema, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-user-type",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("users:createWizard.selectUserType.title")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("users:createWizard.selectUserType.subtitle")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "user-type-select",
					children: t("users:createWizard.selectUserType.fieldLabel")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
					id: "user-type-select",
					value: selectedSchema?.id ?? "",
					onChange: (e) => {
						onSchemaChange(schemas.find((s) => s.id === e.target.value) ?? null);
					},
					displayEmpty: true,
					"data-testid": "user-type-select",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
						value: "",
						disabled: true,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("em", { children: t("users:createWizard.selectUserType.placeholder") })
					}), schemas.map((schema) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
						value: schema.id,
						children: schema.name
					}, schema.id))]
				})]
			})
		]
	});
}

//#endregion
exports.default = ConfigureUserType;