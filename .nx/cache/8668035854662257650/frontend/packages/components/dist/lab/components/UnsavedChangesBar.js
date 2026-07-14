import { Box, Button, Paper, Stack, Typography } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/lab/components/UnsavedChangesBar.tsx
/**
* A fixed bottom action bar shown when a form has unsaved changes.
* Provides reset and save actions.
*/
function UnsavedChangesBar({ message, resetLabel, saveLabel, savingLabel, isSaving, saveDisabled = false, onReset, onSave }) {
	return /* @__PURE__ */ jsx(Paper, {
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
		children: /* @__PURE__ */ jsxs(Stack, {
			direction: "row",
			spacing: 2,
			alignItems: "center",
			children: [
				/* @__PURE__ */ jsxs(Typography, {
					variant: "body2",
					sx: {
						display: "flex",
						alignItems: "center",
						gap: 1
					},
					children: [/* @__PURE__ */ jsx(Box, {
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
				/* @__PURE__ */ jsx(Button, {
					variant: "outlined",
					color: "error",
					onClick: onReset,
					children: resetLabel
				}),
				/* @__PURE__ */ jsx(Button, {
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
export { UnsavedChangesBar as default };