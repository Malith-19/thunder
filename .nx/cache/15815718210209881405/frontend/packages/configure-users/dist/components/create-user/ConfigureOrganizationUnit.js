import { OrganizationUnitTreePicker } from "../../configure-organization-units/dist/components/OrganizationUnitTreePicker.js";
import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, Stack, Typography } from "@wso2/oxygen-ui";
import { useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/create-user/ConfigureOrganizationUnit.tsx
function ConfigureOrganizationUnit({ rootOuId, selectedOuId, onOuIdChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	useEffect(() => {
		if (!selectedOuId) onOuIdChange(rootOuId);
	}, [
		selectedOuId,
		rootOuId,
		onOuIdChange
	]);
	useEffect(() => {
		if (onReadyChange) onReadyChange(selectedOuId.length > 0);
	}, [selectedOuId, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-organization-unit",
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("users:createWizard.selectOrganizationUnit.title")
			}),
			/* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("users:createWizard.selectOrganizationUnit.subtitle")
			}),
			/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ jsx(FormLabel, { children: t("users:createWizard.selectOrganizationUnit.fieldLabel") }), /* @__PURE__ */ jsx(OrganizationUnitTreePicker, {
					id: "user-create-ou-picker",
					rootOuId,
					value: selectedOuId,
					onChange: onOuIdChange,
					maxHeight: 500
				})]
			})
		]
	});
}

//#endregion
export { ConfigureOrganizationUnit as default };