import { useTranslation } from "react-i18next";
import { Checkbox, FormControl, FormControlLabel, FormLabel, Stack, Typography } from "@wso2/oxygen-ui";
import { useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { OrganizationUnitTreePicker, useHasMultipleOUs } from "@thunderid/configure-organization-units";

//#region src/components/create-user-type/ConfigureGeneral.tsx
/**
* Step 2 of the user type creation wizard: configure organization unit and self-registration.
*
* @public
*/
function ConfigureGeneral({ ouId, onOuIdChange, allowSelfRegistration, onAllowSelfRegistrationChange, onReadyChange = void 0 }) {
	const { t } = useTranslation();
	const { hasMultipleOUs, ouList } = useHasMultipleOUs();
	useEffect(() => {
		if (!ouId && ouList.length > 0) onOuIdChange(ouList[0].id);
	}, [
		ouList,
		ouId,
		onOuIdChange
	]);
	useEffect(() => {
		if (onReadyChange) onReadyChange(ouId.trim().length > 0);
	}, [ouId, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-general",
		children: [
			/* @__PURE__ */ jsxs(Stack, {
				direction: "column",
				spacing: 1,
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h1",
					gutterBottom: true,
					children: t("userTypes:createWizard.general.title")
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "subtitle1",
					gutterBottom: true,
					children: t("userTypes:createWizard.general.subtitle")
				})]
			}),
			hasMultipleOUs && /* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				required: true,
				children: [/* @__PURE__ */ jsx(FormLabel, { children: t("userTypes:organizationUnit") }), /* @__PURE__ */ jsx(OrganizationUnitTreePicker, {
					id: "user-type-ou-picker",
					value: ouId,
					onChange: onOuIdChange
				})]
			}),
			/* @__PURE__ */ jsx(FormControlLabel, {
				control: /* @__PURE__ */ jsx(Checkbox, {
					checked: allowSelfRegistration,
					onChange: (e) => onAllowSelfRegistrationChange(e.target.checked)
				}),
				label: t("userTypes:allowSelfRegistration")
			})
		]
	});
}

//#endregion
export { ConfigureGeneral as default };