import { FormControl, FormLabel, Stack, Typography } from "@wso2/oxygen-ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { OrganizationUnitTreePicker } from "@thunderid/configure-organization-units";

//#region src/components/create-resource-server/ConfigureOrgUnit.tsx
function ConfigureOrgUnit({ selectedOuId, onOuIdChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	useEffect(() => {
		if (onReadyChange) onReadyChange(selectedOuId.length > 0);
	}, [selectedOuId, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("resourceServers:create.orgUnit.title", "Choose an organization unit")
			}),
			/* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("resourceServers:create.orgUnit.subtitle", "Select which organization unit this resource server belongs to.")
			}),
			/* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ jsx(FormLabel, { children: t("resourceServers:create.orgUnit.fieldLabel", "Organization Unit") }), /* @__PURE__ */ jsx(OrganizationUnitTreePicker, {
					id: "resource-server-create-ou-picker",
					value: selectedOuId,
					onChange: onOuIdChange,
					maxHeight: 400
				})]
			})
		]
	});
}

//#endregion
export { ConfigureOrgUnit as default };