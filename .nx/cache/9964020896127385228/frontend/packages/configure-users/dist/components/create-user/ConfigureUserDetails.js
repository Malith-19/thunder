import renderSchemaField_default from "../../utils/renderSchemaField.js";
import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@wso2/oxygen-ui";
import { useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useResolveDisplayName } from "@thunderid/hooks";
import { useForm } from "react-hook-form";

//#region src/components/create-user/ConfigureUserDetails.tsx
/**
* Step 2 of the user creation wizard: fill in the dynamic form fields.
*
* @public
*/
function ConfigureUserDetails({ schema, defaultValues, onFormValuesChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	const { resolveDisplayName } = useResolveDisplayName({ handlers: { t } });
	const { control, watch, formState: { errors, isValid } } = useForm({
		defaultValues,
		mode: "onChange"
	});
	useEffect(() => {
		const subscription = watch((values) => {
			onFormValuesChange(values);
		});
		return () => subscription.unsubscribe();
	}, [watch, onFormValuesChange]);
	useEffect(() => {
		if (onReadyChange) onReadyChange(isValid);
	}, [isValid, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-user-details",
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("users:createWizard.userDetails.title")
			}),
			/* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("users:createWizard.userDetails.subtitle")
			}),
			/* @__PURE__ */ jsx(Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: schema.schema && Object.entries(schema.schema).map(([fieldName, fieldDef]) => renderSchemaField_default(fieldName, fieldDef, control, errors, resolveDisplayName))
			})
		]
	});
}

//#endregion
export { ConfigureUserDetails as default };