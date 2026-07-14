const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTranslation = require('../../hooks/useTranslation.cjs');
const require_Button = require('../primitives/Button/Button.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/FacebookButton.tsx
/**
* Facebook Sign-In Button Component.
* Handles authentication with Facebook identity provider.
*/
const FacebookButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = require_useTranslation.default(preferences?.i18n);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 512 512",
			xmlns: "http://www.w3.org/2000/svg",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				fill: "#1976D2",
				d: "M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
				fill: "#FAFAFA",
				d: "M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z"
			})]
		}),
		children: children ?? t("elements.buttons.facebook.text")
	});
};
var FacebookButton_default = FacebookButton;

//#endregion
exports.default = FacebookButton_default;
//# sourceMappingURL=FacebookButton.cjs.map