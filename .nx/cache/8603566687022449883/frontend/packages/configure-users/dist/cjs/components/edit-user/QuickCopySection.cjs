const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);

//#region src/components/edit-user/QuickCopySection.tsx
function QuickCopySection({ user, copiedField, onCopyToClipboard }) {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
		title: t("users:manageUser.sections.quickCopy.title", "Quick Copy"),
		description: t("users:manageUser.sections.quickCopy.description", "Copy user identifiers for use in your application."),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
			spacing: 3,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "user-id-input",
					children: t("users:manageUser.sections.quickCopy.userId", "User ID")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					fullWidth: true,
					id: "user-id-input",
					value: user.id,
					InputProps: {
						readOnly: true,
						endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: copiedField === "userId" ? t("common:actions.copied", "Copied") : t("users:manageUser.sections.quickCopy.copyUserId", "Copy User ID"),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
									"aria-label": copiedField === "userId" ? t("common:actions.copied", "Copied") : t("users:manageUser.sections.quickCopy.copyUserId", "Copy User ID"),
									onClick: () => {
										onCopyToClipboard(user.id, "userId").catch(() => null);
									},
									edge: "end",
									children: copiedField === "userId" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 16 })
								})
							})
						})
					},
					sx: { "& input": {
						fontFamily: "monospace",
						fontSize: "0.875rem"
					} }
				})]
			})
		})
	});
}

//#endregion
exports.default = QuickCopySection;