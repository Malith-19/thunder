import useFlow_default from "../../../../../../contexts/Flow/useFlow.js";
import useTheme_default from "../../../../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../../../../hooks/useTranslation.js";
import Button_default from "../../../../../primitives/Button/Button.js";
import OtpField_default from "../../../../../primitives/OtpField/OtpField.js";
import { createField } from "../../../../../factories/FieldFactory.js";
import { EmbeddedSignInFlowAuthenticatorParamType, FieldType } from "@thunderid/browser";
import { useEffect } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignIn/v1/options/SmsOtp.tsx
/**
* SMS OTP Sign-In Option Component.
* Handles SMS-based OTP authentication.
*/
const SmsOtp = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { setTitle, setSubtitle } = useFlow_default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	useEffect(() => {
		setTitle(t("sms.otp.heading"));
		setSubtitle(t("sms.otp.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	const hasOtpField = formFields.some((param) => param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code"));
	return /* @__PURE__ */ jsxs(Fragment, { children: [formFields.map((param) => {
		return /* @__PURE__ */ jsx("div", { children: (param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code")) && hasOtpField ? /* @__PURE__ */ jsx(OtpField_default, {
			length: 6,
			value: formValues[param.param] || "",
			onChange: (event) => onInputChange(param.param, event.target.value),
			disabled: isLoading,
			className: inputClassName
		}) : createField({
			className: inputClassName,
			disabled: isLoading,
			label: param.displayName,
			name: param.param,
			onChange: (value) => onInputChange(param.param, value),
			required: authenticator.requiredParams.includes(param.param),
			touched: touchedFields[param.param] || false,
			type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType.Password : FieldType.Text,
			value: formValues[param.param] || ""
		}) }, param.param);
	}), /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("sms.otp.buttons.submit.text")
	})] });
};
var SmsOtp_default = SmsOtp;

//#endregion
export { SmsOtp_default as default };
//# sourceMappingURL=SmsOtp.js.map