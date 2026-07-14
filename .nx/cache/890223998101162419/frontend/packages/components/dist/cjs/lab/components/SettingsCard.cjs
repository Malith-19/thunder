const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/SettingsCard.tsx
/**
* Reusable settings card component for application edit pages.
* Provides consistent styling with optional enable/disable toggle.
*
* @example
* ```tsx
* <SettingsCard
*   title="Quick Copy"
*   description="Copy application credentials"
* >
*   <TextField label="Application ID" />
* </SettingsCard>
* ```
*
* @example With toggle
* ```tsx
* <SettingsCard
*   title="Registration Flow"
*   description="Allow users to register"
*   enabled={isEnabled}
*   onToggle={(enabled) => handleToggle(enabled)}
* >
*   <TextField label="Flow ID" />
* </SettingsCard>
* ```
*/
function SettingsCard({ title, description = void 0, children, enabled = void 0, onToggle = void 0, titleIcon = void 0, headerAction = void 0, slotProps = void 0 }) {
	const hasToggle = enabled !== void 0 && onToggle !== void 0;
	const { sx: rootSx,...rootProps } = slotProps?.root ?? {};
	const { sx: headerSx,...headerProps } = slotProps?.header ?? {};
	const { sx: titleSx,...titleProps } = slotProps?.title ?? {};
	const { sx: descriptionSx,...descriptionProps } = slotProps?.description ?? {};
	const { sx: contentSx,...contentProps } = slotProps?.content ?? {};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Paper, {
		...rootProps,
		sx: rootSx,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			...headerProps,
			sx: {
				p: 3,
				...headerSx
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				justifyContent: "space-between",
				spacing: 2,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
					direction: "row",
					alignItems: "center",
					spacing: 1.5,
					children: [titleIcon, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "h5",
						...titleProps,
						sx: titleSx,
						children: title
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
					direction: "row",
					alignItems: "center",
					spacing: 2,
					children: [headerAction, hasToggle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Switch, {
						checked: enabled,
						onChange: (e) => onToggle(e.target.checked),
						inputProps: { "aria-label": `Toggle ${title}` }
					})]
				})]
			}), description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				...descriptionProps,
				sx: {
					mt: .5,
					color: "text.disabled",
					...descriptionSx
				},
				children: description
			})]
		}), (!hasToggle || enabled) && children && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Paper, {
			...contentProps,
			sx: {
				p: 3,
				...contentSx
			},
			children
		})]
	});
}

//#endregion
exports.default = SettingsCard;