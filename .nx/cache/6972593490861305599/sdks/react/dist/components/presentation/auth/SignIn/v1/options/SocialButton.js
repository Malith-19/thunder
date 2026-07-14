import useTranslation_default from "../../../../../../hooks/useTranslation.js";
import Button_default from "../../../../../primitives/Button/Button.js";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignIn/v1/options/SocialButton.tsx
/**
* Social Login Sign-In Option Component.
* Handles authentication with external identity providers (Google, GitHub, etc.).
*/
const SocialLogin = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "outline",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx("path", {
				fill: "currentColor",
				d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
			})
		}),
		children: t("elements.buttons.social.text", { connection: children })
	});
};
var SocialButton_default = SocialLogin;

//#endregion
export { SocialButton_default as default };
//# sourceMappingURL=SocialButton.js.map