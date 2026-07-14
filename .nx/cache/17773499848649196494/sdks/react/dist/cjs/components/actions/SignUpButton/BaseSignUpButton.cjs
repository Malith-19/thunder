const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_Button = require('../../primitives/Button/Button.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/actions/SignUpButton/BaseSignUpButton.tsx
/**
* Base SignUpButton component that supports both render props and traditional props patterns.
*
* @example Using render props
* ```tsx
* <BaseSignUpButton>
*   {({ signUp, isLoading }) => (
*     <button onClick={signUp} disabled={isLoading}>
*       {isLoading ? 'Creating account...' : 'Create Account'}
*     </button>
*   )}
* </BaseSignUpButton>
* ```
*
* @example Using traditional props
* ```tsx
* <BaseSignUpButton className="custom-button">Create Account</BaseSignUpButton>
* ```
*/
const BaseSignUpButton = (0, react.forwardRef)(({ children, className, style, signUp, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children({
		isLoading,
		meta,
		signUp
	}) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		ref,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("sign-up-button"), className),
		style,
		disabled: isLoading,
		loading: isLoading,
		type: "button",
		color: "primary",
		variant: "solid",
		...rest,
		children
	});
});
BaseSignUpButton.displayName = "BaseSignUpButton";
var BaseSignUpButton_default = BaseSignUpButton;

//#endregion
exports.default = BaseSignUpButton_default;
//# sourceMappingURL=BaseSignUpButton.cjs.map