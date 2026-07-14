const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);

//#region src/components/edit-organization-unit/general-settings/QuickCopySection.tsx
/**
* Section component for quickly copying organization unit identifiers.
*
* Displays read-only text fields with copy buttons for:
* - Handle (unique identifier)
* - Organization Unit ID
*
* Provides visual feedback when values are copied.
*
* @param props - Component props
* @returns Quick copy UI within a SettingsCard
*/
function QuickCopySection({ organizationUnit, copiedField, onCopyToClipboard }) {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
		title: t("organizationUnits:edit.general.sections.quickCopy.title"),
		description: t("organizationUnits:edit.general.sections.quickCopy.description"),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			spacing: 3,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "handle-input",
					children: t("organizationUnits:edit.general.handle.label")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					fullWidth: true,
					id: "handle-input",
					value: organizationUnit.handle,
					InputProps: {
						readOnly: true,
						endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: copiedField === "handle" ? t("common:actions.copied") : t("common:actions.copy"),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
									"aria-label": copiedField === "handle" ? t("common:actions.copied") : t("common:actions.copy"),
									onClick: () => {
										onCopyToClipboard(organizationUnit.handle, "handle").catch(() => null);
									},
									edge: "end",
									children: copiedField === "handle" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 16 })
								})
							})
						})
					},
					sx: { "& input": {
						fontFamily: "monospace",
						fontSize: "0.875rem"
					} }
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "ou-id-input",
					children: t("organizationUnits:edit.general.ou.id.label")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					fullWidth: true,
					id: "ou-id-input",
					value: organizationUnit.id,
					InputProps: {
						readOnly: true,
						endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: copiedField === "ou_id" ? t("common:actions.copied") : t("common:actions.copy"),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
									"aria-label": copiedField === "ou_id" ? t("common:actions.copied") : t("common:actions.copy"),
									onClick: () => {
										onCopyToClipboard(organizationUnit.id, "ou_id").catch(() => null);
									},
									edge: "end",
									children: copiedField === "ou_id" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 16 })
								})
							})
						})
					},
					sx: { "& input": {
						fontFamily: "monospace",
						fontSize: "0.875rem"
					} }
				})]
			})]
		})
	});
}

//#endregion
exports.default = QuickCopySection;