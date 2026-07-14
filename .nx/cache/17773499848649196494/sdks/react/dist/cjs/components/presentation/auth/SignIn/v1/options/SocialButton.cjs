const require_rolldown_runtime = require('../../../../../../_virtual/rolldown_runtime.cjs');
const require_useTranslation = require('../../../../../../hooks/useTranslation.cjs');
const require_Button = require('../../../../../primitives/Button/Button.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignIn/v1/options/SocialButton.tsx
/**
* Social Login Sign-In Option Component.
* Handles authentication with external identity providers (Google, GitHub, etc.).
*/
const SocialLogin = ({ isLoading, preferences, children,...rest }) => {
	const { t } = require_useTranslation.default(preferences?.i18n);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "outline",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
			})
		}),
		children: t("elements.buttons.social.text", { connection: children })
	});
};
var SocialButton_default = SocialLogin;

//#endregion
exports.default = SocialButton_default;
//# sourceMappingURL=SocialButton.cjs.map