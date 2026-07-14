const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_utils = require("@thunderid/utils");
__thunderid_utils = require_rolldown_runtime.__toESM(__thunderid_utils);

//#region src/components/create-user-type/ConfigureName.tsx
/**
* Step 1 of the user type creation wizard: configure the user type name.
*
* @public
*/
function ConfigureName({ name, onNameChange, onReadyChange = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const nameSuggestions = (0, react.useMemo)(() => (0, __thunderid_utils.generateRandomHumanReadableIdentifiers)(), []);
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(name.trim().length > 0);
	}, [name, onReadyChange]);
	const handleNameSuggestionClick = (suggestion) => {
		onNameChange(suggestion);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-name",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("userTypes:createWizard.name.title")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "user-type-name-input",
					children: t("userTypes:createWizard.name.fieldLabel")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					fullWidth: true,
					id: "user-type-name-input",
					value: name,
					onChange: (e) => onNameChange(e.target.value),
					placeholder: t("userTypes:createWizard.name.placeholder"),
					inputProps: { "data-testid": "user-type-name-input" }
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
						children: t("userTypes:createWizard.name.suggestions.label")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						flexWrap: "wrap",
						gap: 1
					},
					children: nameSuggestions.map((suggestion) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						label: suggestion,
						onClick: () => handleNameSuggestionClick(suggestion),
						variant: "outlined",
						clickable: true,
						sx: { "&:hover": {
							bgcolor: "primary.main",
							color: "text.primary",
							borderColor: "primary.main"
						} }
					}, suggestion))
				})]
			})
		]
	});
}

//#endregion
exports.default = ConfigureName;