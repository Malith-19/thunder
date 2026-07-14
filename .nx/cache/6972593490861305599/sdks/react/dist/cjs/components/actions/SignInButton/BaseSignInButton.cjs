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

//#region src/components/actions/SignInButton/BaseSignInButton.tsx
/**
* Base SignInButton component that supports both render props and traditional props patterns.
*
* @example Using render props
* ```tsx
* <BaseSignInButton>
*   {({signIn, isLoading}) => (
*     <button onClick={signIn} disabled={isLoading}>
*       {isLoading ? 'Signing in...' : 'Sign In'}
*     </button>
*   )}
* </BaseSignInButton>
* ```
*
* @example Using traditional props
* ```tsx
* <BaseSignInButton className="custom-button">Sign In</BaseSignInButton>
* ```
*/
const BaseSignInButton = (0, react.forwardRef)(({ children, className, style, signIn, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children({
		isLoading,
		meta,
		signIn
	}) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		ref,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("sign-in-button"), className),
		style,
		disabled: isLoading,
		loading: isLoading,
		type: "button",
		...rest,
		children
	});
});
BaseSignInButton.displayName = "BaseSignInButton";
var BaseSignInButton_default = BaseSignInButton;

//#endregion
exports.default = BaseSignInButton_default;
//# sourceMappingURL=BaseSignInButton.cjs.map