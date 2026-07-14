const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_resource_server_delimiters = require('../../config/resource-server-delimiters.cjs');
const require_permission_constants = require('../../constants/permission-constants.cjs');
const require_isValidPermissionDelimiter = require('../../utils/isValidPermissionDelimiter.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/create-resource-server/ConfigureSeparator.tsx
function ConfigureSeparator({ delimiter, handle, onDelimiterChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const isDelimiterValid = require_isValidPermissionDelimiter.isValidPermissionDelimiter(delimiter);
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(isDelimiterValid);
	}, [isDelimiterValid, onReadyChange]);
	const permissionPreview = `${handle.trim() || "my-api"}${delimiter}<resource>${delimiter}<action>`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "column",
				spacing: .5,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "h1",
					gutterBottom: true,
					children: t("resourceServers:create.separator.title", "Choose your permission delimiter")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body1",
					color: "text.secondary",
					children: t("resourceServers:create.separator.subtitle", "The delimiter character joins parts of a permission string. This cannot be changed after creation.")
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				error: !isDelimiterValid,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
						htmlFor: "resource-server-separator-select",
						children: t("resourceServers:create.separator.label", "Permission Delimiter")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Select, {
						id: "resource-server-separator-select",
						value: require_isValidPermissionDelimiter.isValidPermissionDelimiter(delimiter) ? delimiter : require_permission_constants.DEFAULT_PERMISSION_DELIMITER,
						onChange: (e) => {
							const val = e.target.value;
							if (require_isValidPermissionDelimiter.isValidPermissionDelimiter(val)) onDelimiterChange(val);
						},
						children: require_resource_server_delimiters.DELIMITER_OPTIONS.map((opt) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
							value: opt.value,
							children: t(opt.labelKey, opt.labelFallback)
						}, opt.value))
					}),
					!isDelimiterValid ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormHelperText, { children: t("resourceServers:create.separator.invalid", "Select a valid delimiter: . _ : - /") }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormHelperText, { children: t("resourceServers:create.separator.hint", "Choose the character that separates parts of a permission string.") })
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					p: 1.5,
					bgcolor: "action.hover",
					borderRadius: 1,
					border: "1px solid",
					borderColor: "divider"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "text.secondary",
					display: "block",
					sx: { mb: .5 },
					children: t("resourceServers:create.separator.previewLabel", "Example permission")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					sx: { fontFamily: "monospace" },
					children: permissionPreview
				})]
			})
		]
	});
}

//#endregion
exports.default = ConfigureSeparator;