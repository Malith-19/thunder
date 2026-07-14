const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_QuickCopySection = require('./QuickCopySection.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_configure_organization_units = require("@thunderid/configure-organization-units");
__thunderid_configure_organization_units = require_rolldown_runtime.__toESM(__thunderid_configure_organization_units);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);

//#region src/components/edit-user-type/general-settings/EditGeneralSettings.tsx
/**
* General settings tab content for the User Type edit page.
* Displays Organization Unit, Self Registration, Display Attribute, and Danger Zone sections.
*/
function EditGeneralSettings({ userType, editedOuId, editedAllowSelfRegistration, editedDisplayAttribute, onFieldChange, onDeleteClick = void 0, eligibleDisplayProperties }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { resolveDisplayName } = (0, __thunderid_hooks.useResolveDisplayName)({ handlers: { t } });
	const [copiedField, setCopiedField] = (0, react.useState)(null);
	const copyTimeoutRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => () => {
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
	}, []);
	const handleCopyToClipboard = (0, react.useCallback)(async (text, fieldName) => {
		await navigator.clipboard.writeText(text);
		setCopiedField(fieldName);
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
		copyTimeoutRef.current = setTimeout(() => {
			setCopiedField(null);
		}, 2e3);
	}, []);
	const effectiveOuId = editedOuId ?? userType.ouId;
	const effectiveAllowSelfRegistration = editedAllowSelfRegistration ?? userType.allowSelfRegistration;
	const effectiveDisplayAttribute = editedDisplayAttribute ?? userType.systemAttributes?.display ?? "";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		spacing: 3,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_QuickCopySection.default, {
				userType,
				copiedField,
				onCopyToClipboard: handleCopyToClipboard
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
				title: t("userTypes:edit.general.organizationUnit.title", "Organization Unit"),
				description: t("userTypes:edit.general.organizationUnit.description", "The organization unit this user type belongs to."),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_configure_organization_units.OrganizationUnitTreePicker, {
					value: effectiveOuId,
					onChange: userType.isReadOnly ? () => void 0 : (selectedOuId) => onFieldChange("ouId", selectedOuId),
					maxHeight: 400
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
				title: t("userTypes:edit.general.selfRegistration.title", "Self Registration"),
				description: t("userTypes:edit.general.selfRegistration.description", "Allow users to self-register with this user type."),
				enabled: effectiveAllowSelfRegistration,
				onToggle: userType.isReadOnly ? void 0 : (enabled) => onFieldChange("allowSelfRegistration", enabled),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					color: "text.secondary",
					children: t("userTypes:edit.general.selfRegistration.enabledHint", "Users can register themselves as this user type.")
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
				title: t("userTypes:edit.general.displayAttribute.title", "Display Attribute"),
				description: t("userTypes:edit.general.displayAttribute.description", "The attribute used to display user identity."),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
					value: effectiveDisplayAttribute,
					onChange: (event) => onFieldChange("displayAttribute", event.target.value),
					disabled: userType.isReadOnly,
					size: "small",
					fullWidth: true,
					displayEmpty: true,
					renderValue: (selected) => {
						const value = typeof selected === "string" ? selected : "";
						if (!value) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "body2",
							color: "text.secondary",
							children: t("userTypes:selectDisplayAttribute", "Select a display attribute")
						});
						const matchedProp = eligibleDisplayProperties.find((p) => p.name.trim() === value);
						const resolved = matchedProp?.displayName ? resolveDisplayName(matchedProp.displayName) : "";
						return resolved && resolved !== value ? `${resolved} (${value})` : value;
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
						value: "",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "body2",
							color: "text.secondary",
							children: t("common:none", "None")
						})
					}), eligibleDisplayProperties.map((prop) => {
						const propName = prop.name.trim();
						const resolved = prop.displayName ? resolveDisplayName(prop.displayName) : "";
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
							value: propName,
							children: resolved && resolved !== propName ? `${resolved} (${propName})` : propName
						}, prop.id);
					})]
				})
			}),
			onDeleteClick && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__thunderid_components.SettingsCard, {
				title: t("userTypes:edit.general.dangerZone.title", "Danger Zone"),
				description: t("userTypes:edit.general.dangerZone.description", "Irreversible actions for this user type."),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "h6",
						gutterBottom: true,
						color: "error",
						children: t("userTypes:edit.general.dangerZone.deleteUserType", "Delete User Type")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						sx: { mb: 3 },
						children: t("userTypes:edit.general.dangerZone.deleteUserTypeDescription", "Permanently delete this user type and all associated schema definitions. This action cannot be undone.")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
						variant: "contained",
						color: "error",
						onClick: onDeleteClick,
						children: t("common:actions.delete")
					})
				]
			})
		]
	});
}

//#endregion
exports.default = EditGeneralSettings;