import { useTranslation } from "react-i18next";
import { Box, Chip, FormControl, FormLabel, Stack, TextField, Typography, useTheme } from "@wso2/oxygen-ui";
import { Lightbulb } from "@wso2/oxygen-ui-icons-react";
import { useEffect, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { generateRandomHumanReadableIdentifiers } from "@thunderid/utils";

//#region src/components/create-user-type/ConfigureName.tsx
/**
* Step 1 of the user type creation wizard: configure the user type name.
*
* @public
*/
function ConfigureName({ name, onNameChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	const theme = useTheme();
	const nameSuggestions = useMemo(() => generateRandomHumanReadableIdentifiers(), []);
	useEffect(() => {
		if (onReadyChange) onReadyChange(name.trim().length > 0);
	}, [name, onReadyChange]);
	const handleNameSuggestionClick = (suggestion) => {
		onNameChange(suggestion);
	};
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-name",
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("userTypes:createWizard.name.title")
			}),
			/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "user-type-name-input",
					children: t("userTypes:createWizard.name.fieldLabel")
				}), /* @__PURE__ */ jsx(TextField, {
					fullWidth: true,
					id: "user-type-name-input",
					value: name,
					onChange: (e) => onNameChange(e.target.value),
					placeholder: t("userTypes:createWizard.name.placeholder"),
					inputProps: { "data-testid": "user-type-name-input" }
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
						children: t("userTypes:createWizard.name.suggestions.label")
					})]
				}), /* @__PURE__ */ jsx(Box, {
					sx: {
						display: "flex",
						flexWrap: "wrap",
						gap: 1
					},
					children: nameSuggestions.map((suggestion) => /* @__PURE__ */ jsx(Chip, {
						label: suggestion,
						onClick: () => handleNameSuggestionClick(suggestion),
						variant: "outlined",
						clickable: true,
						sx: { "&:hover": {
							bgcolor: "primary.main",
							color: "text.primary",
							borderColor: "primary.main"
						} }
					}, suggestion))
				})]
			})
		]
	});
}

//#endregion
export { ConfigureName as default };