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

//#region src/components/actions/SignOutButton/BaseSignOutButton.tsx
/**
* Base SignOutButton component that supports both render props and traditional props patterns.
*
* @example Using render props
* ```tsx
* <BaseSignOutButton>
*   {({signOut, isLoading}) => (
*     <button onClick={signOut} disabled={isLoading}>
*       {isLoading ? 'Signing out...' : 'Sign Out'}
*     </button>
*   )}
* </BaseSignOutButton>
* ```
*
* @example Using traditional props
* ```tsx
* <BaseSignOutButton className="custom-button">Sign Out</BaseSignOutButton>
* ```
*/
const BaseSignOutButton = (0, react.forwardRef)(({ children, className, style, signOut, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children({
		isLoading,
		meta,
		signOut
	}) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		ref,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("sign-out-button"), className),
		style,
		disabled: isLoading,
		loading: isLoading,
		type: "button",
		...rest,
		children
	});
});
BaseSignOutButton.displayName = "BaseSignOutButton";
var BaseSignOutButton_default = BaseSignOutButton;

//#endregion
exports.default = BaseSignOutButton_default;
//# sourceMappingURL=BaseSignOutButton.cjs.map