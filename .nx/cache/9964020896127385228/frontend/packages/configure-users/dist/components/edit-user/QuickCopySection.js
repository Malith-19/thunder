import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@wso2/oxygen-ui";
import { Check, Copy } from "@wso2/oxygen-ui-icons-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { SettingsCard } from "@thunderid/components";

//#region src/components/edit-user/QuickCopySection.tsx
function QuickCopySection({ user, copiedField, onCopyToClipboard }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("users:manageUser.sections.quickCopy.title", "Quick Copy"),
		description: t("users:manageUser.sections.quickCopy.description", "Copy user identifiers for use in your application."),
		children: /* @__PURE__ */ jsx(Stack, {
			spacing: 3,
			children: /* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "user-id-input",
					children: t("users:manageUser.sections.quickCopy.userId", "User ID")
				}), /* @__PURE__ */ jsx(TextField, {
					fullWidth: true,
					id: "user-id-input",
					value: user.id,
					InputProps: {
						readOnly: true,
						endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
							position: "end",
							children: /* @__PURE__ */ jsx(Tooltip, {
								title: copiedField === "userId" ? t("common:actions.copied", "Copied") : t("users:manageUser.sections.quickCopy.copyUserId", "Copy User ID"),
								children: /* @__PURE__ */ jsx(IconButton, {
									"aria-label": copiedField === "userId" ? t("common:actions.copied", "Copied") : t("users:manageUser.sections.quickCopy.copyUserId", "Copy User ID"),
									onClick: () => {
										onCopyToClipboard(user.id, "userId").catch(() => null);
									},
									edge: "end",
									children: copiedField === "userId" ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
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