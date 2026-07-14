import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, MenuItem, Select, Stack, Typography } from "@wso2/oxygen-ui";
import { useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/create-user/ConfigureUserType.tsx
/**
* Step 1 of the user creation wizard: select a user type (schema).
*
* @public
*/
function ConfigureUserType({ schemas, selectedSchema, onSchemaChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	useEffect(() => {
		if (onReadyChange) onReadyChange(selectedSchema !== null);
	}, [selectedSchema, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-user-type",
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("users:createWizard.selectUserType.title")
			}),
			/* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("users:createWizard.selectUserType.subtitle")
			}),
			/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "user-type-select",
					children: t("users:createWizard.selectUserType.fieldLabel")
				}), /* @__PURE__ */ jsxs(Select, {
					id: "user-type-select",
					value: selectedSchema?.id ?? "",
					onChange: (e) => {
						onSchemaChange(schemas.find((s) => s.id === e.target.value) ?? null);
					},
					displayEmpty: true,
					"data-testid": "user-type-select",
					children: [/* @__PURE__ */ jsx(MenuItem, {
						value: "",
						disabled: true,
						children: /* @__PURE__ */ jsx("em", { children: t("users:createWizard.selectUserType.placeholder") })
					}), schemas.map((schema) => /* @__PURE__ */ jsx(MenuItem, {
						value: schema.id,
						children: schema.name
					}, schema.id))]
				})]
			})
		]
	});
}

//#endregion
export { ConfigureUserType as default };