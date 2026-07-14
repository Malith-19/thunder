import { DELIMITER_OPTIONS } from "../../config/resource-server-delimiters.js";
import { DEFAULT_PERMISSION_DELIMITER } from "../../constants/permission-constants.js";
import { isValidPermissionDelimiter } from "../../utils/isValidPermissionDelimiter.js";
import { Box, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, Typography } from "@wso2/oxygen-ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/create-resource-server/ConfigureSeparator.tsx
function ConfigureSeparator({ delimiter, handle, onDelimiterChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	const isDelimiterValid = isValidPermissionDelimiter(delimiter);
	useEffect(() => {
		if (onReadyChange) onReadyChange(isDelimiterValid);
	}, [isDelimiterValid, onReadyChange]);
	const permissionPreview = `${handle.trim() || "my-api"}${delimiter}<resource>${delimiter}<action>`;
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		children: [
			/* @__PURE__ */ jsxs(Stack, {
				direction: "column",
				spacing: .5,
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h1",
					gutterBottom: true,
					children: t("resourceServers:create.separator.title", "Choose your permission delimiter")
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body1",
					color: "text.secondary",
					children: t("resourceServers:create.separator.subtitle", "The delimiter character joins parts of a permission string. This cannot be changed after creation.")
				})]
			}),
			/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				error: !isDelimiterValid,
				children: [
					/* @__PURE__ */ jsx(FormLabel, {
						htmlFor: "resource-server-separator-select",
						children: t("resourceServers:create.separator.label", "Permission Delimiter")
					}),
					/* @__PURE__ */ jsx(Select, {
						id: "resource-server-separator-select",
						value: isValidPermissionDelimiter(delimiter) ? delimiter : DEFAULT_PERMISSION_DELIMITER,
						onChange: (e) => {
							const val = e.target.value;
							if (isValidPermissionDelimiter(val)) onDelimiterChange(val);
						},
						children: DELIMITER_OPTIONS.map((opt) => /* @__PURE__ */ jsx(MenuItem, {
							value: opt.value,
							children: t(opt.labelKey, opt.labelFallback)
						}, opt.value))
					}),
					!isDelimiterValid ? /* @__PURE__ */ jsx(FormHelperText, { children: t("resourceServers:create.separator.invalid", "Select a valid delimiter: . _ : - /") }) : /* @__PURE__ */ jsx(FormHelperText, { children: t("resourceServers:create.separator.hint", "Choose the character that separates parts of a permission string.") })
				]
			}),
			/* @__PURE__ */ jsxs(Box, {
				sx: {
					p: 1.5,
					bgcolor: "action.hover",
					borderRadius: 1,
					border: "1px solid",
					borderColor: "divider"
				},
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "caption",
					color: "text.secondary",
					display: "block",
					sx: { mb: .5 },
					children: t("resourceServers:create.separator.previewLabel", "Example permission")
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					sx: { fontFamily: "monospace" },
					children: permissionPreview
				})]
			})
		]
	});
}

//#endregion
export { ConfigureSeparator as default };