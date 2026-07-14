const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/UnsavedChangesBar.tsx
/**
* A fixed bottom action bar shown when a form has unsaved changes.
* Provides reset and save actions.
*/
function UnsavedChangesBar({ message, resetLabel, saveLabel, savingLabel, isSaving, saveDisabled = false, onReset, onSave }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Paper, {
		sx: {
			position: "fixed",
			bottom: 0,
			left: 0,
			right: 0,
			p: 2,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: 2,
			borderRadius: "12px 12px 0 0",
			boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
			zIndex: 1e3,
			bgcolor: "background.paper"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			direction: "row",
			spacing: 2,
			alignItems: "center",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					sx: {
						display: "flex",
						alignItems: "center",
						gap: 1
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						component: "span",
						sx: {
							width: 20,
							height: 20,
							borderRadius: "50%",
							border: "2px solid",
							borderColor: "warning.main",
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "12px",
							fontWeight: "bold"
						},
						children: "!"
					}), message]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					variant: "outlined",
					color: "error",
					onClick: onReset,
					children: resetLabel
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					variant: "contained",
					onClick: onSave,
					disabled: isSaving || saveDisabled,
					children: isSaving ? savingLabel : saveLabel
				})
			]
		})
	});
}

//#endregion
exports.default = UnsavedChangesBar;