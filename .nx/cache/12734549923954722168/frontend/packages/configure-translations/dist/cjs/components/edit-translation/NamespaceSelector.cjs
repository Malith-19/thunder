const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/components/edit-translation/NamespaceSelector.tsx
/**
* Autocomplete control for selecting a translation namespace.
*
* Formats camelCase namespace keys into human-readable labels and shows a
* helper text below the input.
*
* @param props - The component props
*
* @returns JSX element rendering the namespace selector
*
* @public
*/
function NamespaceSelector({ namespaces, value, loading, onChange }) {
	const { t } = (0, react_i18next.useTranslation)("translations");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			gap: 2,
			alignItems: "center",
			mb: 2
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			sx: { maxWidth: 600 },
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "namespace-selector",
					children: t("editor.namespace")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Autocomplete, {
					id: "namespace-selector",
					options: namespaces,
					value: value ?? "",
					onChange: (_, v) => v && onChange(v),
					disableClearable: true,
					size: "small",
					loading,
					renderInput: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, { ...params }),
					getOptionLabel: (opt) => opt.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim()
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormHelperText, { children: t("editor.namespace.helperText") })
			]
		})
	});
}

//#endregion
exports.default = NamespaceSelector;