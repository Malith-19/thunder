import useFlow_default from "../../../../../../contexts/Flow/useFlow.js";
import useTheme_default from "../../../../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../../../../hooks/useTranslation.js";
import Button_default from "../../../../../primitives/Button/Button.js";
import { createField } from "../../../../../factories/FieldFactory.js";
import { EmbeddedSignInFlowAuthenticatorParamType, FieldType } from "@thunderid/browser";
import { useEffect } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignIn/v1/options/IdentifierFirst.tsx
/**
* Identifier First Sign-In Option Component.
* Handles identifier-first authentication flow (username first, then password).
*/
const IdentifierFirst = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { setTitle, setSubtitle } = useFlow_default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	useEffect(() => {
		setTitle(t("identifier.first.heading"));
		setSubtitle(t("identifier.first.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [formFields.map((param) => /* @__PURE__ */ jsx("div", { children: createField({
		className: inputClassName,
		disabled: isLoading,
		label: param.displayName,
		name: param.param,
		onChange: (value) => onInputChange(param.param, value),
		placeholder: t(`elements.fields.generic.placeholder`, { field: (param.displayName || param.param).toLowerCase() }),
		required: authenticator.requiredParams.includes(param.param),
		touched: touchedFields[param.param] || false,
		type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType.Password : FieldType.Text,
		value: formValues[param.param] || ""
	}) }, param.param)), /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("identifier.first.buttons.submit.text")
	})] });
};
var IdentifierFirst_default = IdentifierFirst;

//#endregion
export { IdentifierFirst_default as default };
//# sourceMappingURL=IdentifierFirst.js.map