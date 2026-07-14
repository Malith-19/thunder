import { deriveHandle } from "../../utils/deriveHandle.js";
import { Box, Chip, FormControl, FormLabel, Stack, TextField, Typography, useTheme } from "@wso2/oxygen-ui";
import { Lightbulb } from "@wso2/oxygen-ui-icons-react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { generateRandomHumanReadableIdentifiers } from "@thunderid/utils";

//#region src/components/create-resource-server/ConfigureName.tsx
function ConfigureName({ name, handle, delimiter = void 0, handleEdited = false, onHandleEditedChange = void 0, onNameChange, onHandleChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	const theme = useTheme();
	const suggestions = useMemo(() => generateRandomHumanReadableIdentifiers(), []);
	useEffect(() => {
		if (onReadyChange) onReadyChange(name.trim().length > 0);
	}, [
		name,
		handle,
		onReadyChange
	]);
	const handleNameChange = (e) => {
		const newName = e.target.value;
		onNameChange(newName);
		if (!handleEdited) onHandleChange(deriveHandle(newName, delimiter));
	};
	const handleSuggestionClick = (suggestion) => {
		onNameChange(suggestion);
		onHandleChange(deriveHandle(suggestion, delimiter));
		onHandleEditedChange?.(false);
	};
	const handleHandleChange = (e) => {
		onHandleEditedChange?.(true);
		const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9._\-:/]/g, "");
		onHandleChange(delimiter ? sanitized.replace(new RegExp(`\\${delimiter}`, "g"), "") : sanitized);
	};
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("resourceServers:create.name.title", "Name your resource server")
			}),
			/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "resource-server-name-input",
					children: t("resourceServers:create.name.nameLabel", "Resource Server Name")
				}), /* @__PURE__ */ jsx(TextField, {
					id: "resource-server-name-input",
					fullWidth: true,
					value: name,
					onChange: handleNameChange,
					placeholder: t("resourceServers:create.name.namePlaceholder", "e.g. Payments API")
				})]
			}),
			/* @__PURE__ */ jsxs(Stack, {
				direction: "column",
				spacing: 2,
				children: [/* @__PURE__ */ jsxs(Stack, {
					direction: "row",
					alignItems: "center",
					spacing: 1,
					children: [/* @__PURE__ */ jsx(Lightbulb, {
						size: 20,
						color: theme.vars?.palette.warning.main
					}), /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("resourceServers:create.name.suggestions", "Need inspiration? Pick one:")
					})]
				}), /* @__PURE__ */ jsx(Box, {
					sx: {
						display: "flex",
						flexWrap: "wrap",
						gap: 1
					},
					children: suggestions.map((suggestion) => /* @__PURE__ */ jsx(Chip, {
						label: suggestion,
						onClick: () => handleSuggestionClick(suggestion),
						variant: "outlined",
						clickable: true,
						sx: { "&:hover": {
							bgcolor: "primary.main",
							color: "primary.contrastText",
							borderColor: "primary.main"
						} }
					}, suggestion))
				})]
			}),
			/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "resource-server-handle-input",
					children: t("resourceServers:create.name.handleLabel", "Handle")
				}), /* @__PURE__ */ jsx(TextField, {
					id: "resource-server-handle-input",
					fullWidth: true,
					value: handle,
					onChange: handleHandleChange,
					placeholder: t("resourceServers:create.name.handlePlaceholder", "e.g. payments-api"),
					helperText: t("resourceServers:create.name.handleHint", "The handle prefixes every permission in this resource server. It cannot be changed after creation.")
				})]
			})
		]
	});
}

//#endregion
export { ConfigureName as default };