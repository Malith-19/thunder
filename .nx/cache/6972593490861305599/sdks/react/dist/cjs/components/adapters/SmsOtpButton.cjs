const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTranslation = require('../../hooks/useTranslation.cjs');
const require_Button = require('../primitives/Button/Button.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/SmsOtpButton.tsx
/**
* SMS OTP Sign-In Button Component.
* Handles authentication with SMS OTP.
*/
const SmsOtpButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = require_useTranslation.default(preferences?.i18n);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z"
			})
		}),
		children: children ?? t("elements.buttons.smsotp.text")
	});
};
var SmsOtpButton_default = SmsOtpButton;

//#endregion
exports.default = SmsOtpButton_default;
//# sourceMappingURL=SmsOtpButton.cjs.map