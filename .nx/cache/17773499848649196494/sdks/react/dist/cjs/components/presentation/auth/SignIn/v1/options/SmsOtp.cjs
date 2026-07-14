const require_rolldown_runtime = require('../../../../../../_virtual/rolldown_runtime.cjs');
const require_useFlow = require('../../../../../../contexts/Flow/useFlow.cjs');
const require_useTheme = require('../../../../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../../../../hooks/useTranslation.cjs');
const require_Button = require('../../../../../primitives/Button/Button.cjs');
const require_OtpField = require('../../../../../primitives/OtpField/OtpField.cjs');
const require_FieldFactory = require('../../../../../factories/FieldFactory.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignIn/v1/options/SmsOtp.tsx
/**
* SMS OTP Sign-In Option Component.
* Handles SMS-based OTP authentication.
*/
const SmsOtp = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = require_useTheme.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const { setTitle, setSubtitle } = require_useFlow.default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	(0, react.useEffect)(() => {
		setTitle(t("sms.otp.heading"));
		setSubtitle(t("sms.otp.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	const hasOtpField = formFields.some((param) => param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code"));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [formFields.map((param) => {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: (param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code")) && hasOtpField ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OtpField.default, {
			length: 6,
			value: formValues[param.param] || "",
			onChange: (event) => onInputChange(param.param, event.target.value),
			disabled: isLoading,
			className: inputClassName
		}) : require_FieldFactory.createField({
			className: inputClassName,
			disabled: isLoading,
			label: param.displayName,
			name: param.param,
			onChange: (value) => onInputChange(param.param, value),
			required: authenticator.requiredParams.includes(param.param),
			touched: touchedFields[param.param] || false,
			type: param.type === __thunderid_browser.EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? __thunderid_browser.FieldType.Password : __thunderid_browser.FieldType.Text,
			value: formValues[param.param] || ""
		}) }, param.param);
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
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
exports.default = SmsOtp_default;
//# sourceMappingURL=SmsOtp.cjs.map