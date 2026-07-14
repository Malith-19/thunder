import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";
import { SettingsCard } from "@thunderid/components";
import { Check, Copy } from "@wso2/oxygen-ui-icons-react";

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
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("organizationUnits:edit.general.sections.quickCopy.title"),
		description: t("organizationUnits:edit.general.sections.quickCopy.description"),
		children: /* @__PURE__ */ jsxs(Stack, {
			spacing: 3,
			children: [/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "handle-input",
					children: t("organizationUnits:edit.general.handle.label")
				}), /* @__PURE__ */ jsx(TextField, {
					fullWidth: true,
					id: "handle-input",
					value: organizationUnit.handle,
					InputProps: {
						readOnly: true,
						endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ jsx(Tooltip, {
								title: copiedField === "handle" ? t("common:actions.copied") : t("common:actions.copy"),
								children: /* @__PURE__ */ jsx(IconButton, {
									"aria-label": copiedField === "handle" ? t("common:actions.copied") : t("common:actions.copy"),
									onClick: () => {
										onCopyToClipboard(organizationUnit.handle, "handle").catch(() => null);
									},
									edge: "end",
									children: copiedField === "handle" ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
								})
							})
						})
					},
					sx: { "& input": {
						fontFamily: "monospace",
						fontSize: "0.875rem"
					} }
				})]
			}), /* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "ou-id-input",
					children: t("organizationUnits:edit.general.ou.id.label")
				}), /* @__PURE__ */ jsx(TextField, {
					fullWidth: true,
					id: "ou-id-input",
					value: organizationUnit.id,
					InputProps: {
						readOnly: true,
						endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ jsx(Tooltip, {
								title: copiedField === "ou_id" ? t("common:actions.copied") : t("common:actions.copy"),
								children: /* @__PURE__ */ jsx(IconButton, {
									"aria-label": copiedField === "ou_id" ? t("common:actions.copied") : t("common:actions.copy"),
									onClick: () => {
										onCopyToClipboard(organizationUnit.id, "ou_id").catch(() => null);
									},
									edge: "end",
									children: copiedField === "ou_id" ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
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
export { QuickCopySection as default };