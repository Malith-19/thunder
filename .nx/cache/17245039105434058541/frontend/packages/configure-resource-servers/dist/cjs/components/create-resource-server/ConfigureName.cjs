const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_deriveHandle = require('../../utils/deriveHandle.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_utils = require("@thunderid/utils");
__thunderid_utils = require_rolldown_runtime.__toESM(__thunderid_utils);

//#region src/components/create-resource-server/ConfigureName.tsx
function ConfigureName({ name, handle, delimiter = void 0, handleEdited = false, onHandleEditedChange = void 0, onNameChange, onHandleChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const suggestions = (0, react.useMemo)(() => (0, __thunderid_utils.generateRandomHumanReadableIdentifiers)(), []);
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(name.trim().length > 0);
	}, [
		name,
		handle,
		onReadyChange
	]);
	const handleNameChange = (e) => {
		const newName = e.target.value;
		onNameChange(newName);
		if (!handleEdited) onHandleChange(require_deriveHandle.deriveHandle(newName, delimiter));
	};
	const handleSuggestionClick = (suggestion) => {
		onNameChange(suggestion);
		onHandleChange(require_deriveHandle.deriveHandle(suggestion, delimiter));
		onHandleEditedChange?.(false);
	};
	const handleHandleChange = (e) => {
		onHandleEditedChange?.(true);
		const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9._\-:/]/g, "");
		onHandleChange(delimiter ? sanitized.replace(new RegExp(`\\${delimiter}`, "g"), "") : sanitized);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("resourceServers:create.name.title", "Name your resource server")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "resource-server-name-input",
					children: t("resourceServers:create.name.nameLabel", "Resource Server Name")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					id: "resource-server-name-input",
					fullWidth: true,
					value: name,
					onChange: handleNameChange,
					placeholder: t("resourceServers:create.name.namePlaceholder", "e.g. Payments API")
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "column",
				spacing: 2,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
					direction: "row",
					alignItems: "center",
					spacing: 1,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Lightbulb, {
						size: 20,
						color: theme.vars?.palette.warning.main
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("resourceServers:create.name.suggestions", "Need inspiration? Pick one:")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						flexWrap: "wrap",
						gap: 1
					},
					children: suggestions.map((suggestion) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						label: suggestion,
						onClick: () => handleSuggestionClick(suggestion),
						variant: "outlined",
						clickable: true,
						sx: { "&:hover": {
							bgcolor: "primary.main",
							color: "primary.contrastText",
							borderColor: "primary.main"
						} }
					}, suggestion))
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "resource-server-handle-input",
					children: t("resourceServers:create.name.handleLabel", "Handle")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					id: "resource-server-handle-input",
					fullWidth: true,
					value: handle,
					onChange: handleHandleChange,
					placeholder: t("resourceServers:create.name.handlePlaceholder", "e.g. payments-api"),
					helperText: t("resourceServers:create.name.handleHint", "The handle prefixes every permission in this resource server. It cannot be changed after creation.")
				})]
			})
		]
	});
}

//#endregion
exports.default = ConfigureName;