import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@wso2/oxygen-ui";
import { Check, Copy } from "@wso2/oxygen-ui-icons-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { SettingsCard } from "@thunderid/components";

//#region src/components/edit-user-type/general-settings/QuickCopySection.tsx
function QuickCopySection({ userType, copiedField, onCopyToClipboard }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("userTypes:edit.general.sections.quickCopy.title", "Quick Copy"),
		description: t("userTypes:edit.general.sections.quickCopy.description", "Copy user type identifiers for use in your application."),
		children: /* @__PURE__ */ jsx(Stack, {
			spacing: 3,
			children: /* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "user-type-id-input",
					children: t("userTypes:edit.general.labels.userTypeId", "User Type ID")
				}), /* @__PURE__ */ jsx(TextField, {
					fullWidth: true,
					id: "user-type-id-input",
					value: userType.id,
					InputProps: {
						readOnly: true,
						endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ jsx(Tooltip, {
								title: copiedField === "user_type_id" ? t("common:actions.copied", "Copied") : t("userTypes:edit.copyId", "Copy user type ID"),
								children: /* @__PURE__ */ jsx(IconButton, {
									"aria-label": copiedField === "user_type_id" ? t("common:actions.copied", "Copied") : t("userTypes:edit.copyId", "Copy user type ID"),
									onClick: () => {
										onCopyToClipboard(userType.id, "user_type_id").catch(() => null);
									},
									edge: "end",
									children: copiedField === "user_type_id" ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
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
export { QuickCopySection as default };