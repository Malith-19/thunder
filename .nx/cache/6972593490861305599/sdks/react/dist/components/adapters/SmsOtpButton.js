import useTranslation_default from "../../hooks/useTranslation.js";
import Button_default from "../primitives/Button/Button.js";
import { jsx } from "react/jsx-runtime";

//#region src/components/adapters/SmsOtpButton.tsx
/**
* SMS OTP Sign-In Button Component.
* Handles authentication with SMS OTP.
*/
const SmsOtpButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx("path", {
				fill: "currentColor",
				d: "M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z"
			})
		}),
		children: children ?? t("elements.buttons.smsotp.text")
	});
};
var SmsOtpButton_default = SmsOtpButton;

//#endregion
export { SmsOtpButton_default as default };
//# sourceMappingURL=SmsOtpButton.js.map