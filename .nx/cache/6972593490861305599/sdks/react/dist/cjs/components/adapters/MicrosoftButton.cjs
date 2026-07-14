const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTranslation = require('../../hooks/useTranslation.cjs');
const require_Button = require('../primitives/Button/Button.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/MicrosoftButton.tsx
/**
* Microsoft Sign-In Button Component.
* Handles authentication with Microsoft identity provider.
*/
const MicrosoftButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = require_useTranslation.default(preferences?.i18n);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 23 23",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					fill: "#f3f3f3",
					d: "M0 0h23v23H0z"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					fill: "#f35325",
					d: "M1 1h10v10H1z"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					fill: "#81bc06",
					d: "M12 1h10v10H12z"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					fill: "#05a6f0",
					d: "M1 12h10v10H1z"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					fill: "#ffba08",
					d: "M12 12h10v10H12z"
				})
			]
		}),
		children: children ?? t("elements.buttons.microsoft.text")
	});
};
var MicrosoftButton_default = MicrosoftButton;

//#endregion
exports.default = MicrosoftButton_default;
//# sourceMappingURL=MicrosoftButton.cjs.map