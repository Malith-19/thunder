const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTranslation = require('../../hooks/useTranslation.cjs');
const require_Button = require('../primitives/Button/Button.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/SignInWithEthereumButton.tsx
/**
* Sign In With Ethereum Button Component.
* Handles authentication with Sign In With Ethereum identity provider.
*/
const SignInWithEthereumButton = ({ isLoading, preferences, children,...rest }) => {
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
				fill: "#627EEA",
				d: "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
			})
		}),
		children: children ?? t("elements.buttons.ethereum.text")
	});
};
var SignInWithEthereumButton_default = SignInWithEthereumButton;

//#endregion
exports.default = SignInWithEthereumButton_default;
//# sourceMappingURL=SignInWithEthereumButton.cjs.map