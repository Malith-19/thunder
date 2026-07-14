import QuickCopySection from "./QuickCopySection.js";
import { useTranslation } from "react-i18next";
import { useResolveDisplayName } from "@thunderid/hooks";
import { Button, MenuItem, Select, Stack, Typography } from "@wso2/oxygen-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { OrganizationUnitTreePicker } from "@thunderid/configure-organization-units";
import { SettingsCard } from "@thunderid/components";

//#region src/components/edit-user-type/general-settings/EditGeneralSettings.tsx
/**
* General settings tab content for the User Type edit page.
* Displays Organization Unit, Self Registration, Display Attribute, and Danger Zone sections.
*/
function EditGeneralSettings({ userType, editedOuId, editedAllowSelfRegistration, editedDisplayAttribute, onFieldChange, onDeleteClick = void 0, eligibleDisplayProperties }) {
	const { t } = useTranslation();
	const { resolveDisplayName } = useResolveDisplayName({ handlers: { t } });
	const [copiedField, setCopiedField] = useState(null);
	const copyTimeoutRef = useRef(null);
	useEffect(() => () => {
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
	}, []);
	const handleCopyToClipboard = useCallback(async (text, fieldName) => {
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
	return /* @__PURE__ */ jsxs(Stack, {
		spacing: 3,
		children: [
			/* @__PURE__ */ jsx(QuickCopySection, {
				userType,
				copiedField,
				onCopyToClipboard: handleCopyToClipboard
			}),
			/* @__PURE__ */ jsx(SettingsCard, {
				title: t("userTypes:edit.general.organizationUnit.title", "Organization Unit"),
				description: t("userTypes:edit.general.organizationUnit.description", "The organization unit this user type belongs to."),
				children: /* @__PURE__ */ jsx(OrganizationUnitTreePicker, {
					value: effectiveOuId,
					onChange: userType.isReadOnly ? () => void 0 : (selectedOuId) => onFieldChange("ouId", selectedOuId),
					maxHeight: 400
				})
			}),
			/* @__PURE__ */ jsx(SettingsCard, {
				title: t("userTypes:edit.general.selfRegistration.title", "Self Registration"),
				description: t("userTypes:edit.general.selfRegistration.description", "Allow users to self-register with this user type."),
				enabled: effectiveAllowSelfRegistration,
				onToggle: userType.isReadOnly ? void 0 : (enabled) => onFieldChange("allowSelfRegistration", enabled),
				children: /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					children: t("userTypes:edit.general.selfRegistration.enabledHint", "Users can register themselves as this user type.")
				})
			}),
			/* @__PURE__ */ jsx(SettingsCard, {
				title: t("userTypes:edit.general.displayAttribute.title", "Display Attribute"),
				description: t("userTypes:edit.general.displayAttribute.description", "The attribute used to display user identity."),
				children: /* @__PURE__ */ jsxs(Select, {
					value: effectiveDisplayAttribute,
					onChange: (event) => onFieldChange("displayAttribute", event.target.value),
					disabled: userType.isReadOnly,
					size: "small",
					fullWidth: true,
					displayEmpty: true,
					renderValue: (selected) => {
						const value = typeof selected === "string" ? selected : "";
						if (!value) return /* @__PURE__ */ jsx(Typography, {
							variant: "body2",
							color: "text.secondary",
							children: t("userTypes:selectDisplayAttribute", "Select a display attribute")
						});
						const matchedProp = eligibleDisplayProperties.find((p) => p.name.trim() === value);
						const resolved = matchedProp?.displayName ? resolveDisplayName(matchedProp.displayName) : "";
						return resolved && resolved !== value ? `${resolved} (${value})` : value;
					},
					children: [/* @__PURE__ */ jsx(MenuItem, {
						value: "",
						children: /* @__PURE__ */ jsx(Typography, {
							variant: "body2",
							color: "text.secondary",
							children: t("common:none", "None")
						})
					}), eligibleDisplayProperties.map((prop) => {
						const propName = prop.name.trim();
						const resolved = prop.displayName ? resolveDisplayName(prop.displayName) : "";
						return /* @__PURE__ */ jsx(MenuItem, {
							value: propName,
							children: resolved && resolved !== propName ? `${resolved} (${propName})` : propName
						}, prop.id);
					})]
				})
			}),
			onDeleteClick && /* @__PURE__ */ jsxs(SettingsCard, {
				title: t("userTypes:edit.general.dangerZone.title", "Danger Zone"),
				description: t("userTypes:edit.general.dangerZone.description", "Irreversible actions for this user type."),
				children: [
					/* @__PURE__ */ jsx(Typography, {
						variant: "h6",
						gutterBottom: true,
						color: "error",
						children: t("userTypes:edit.general.dangerZone.deleteUserType", "Delete User Type")
					}),
					/* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						sx: { mb: 3 },
						children: t("userTypes:edit.general.dangerZone.deleteUserTypeDescription", "Permanently delete this user type and all associated schema definitions. This action cannot be undone.")
					}),
					/* @__PURE__ */ jsx(Button, {
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
export { EditGeneralSettings as default };