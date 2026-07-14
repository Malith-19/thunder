import Button_default from "../../primitives/Button/Button.js";
import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { forwardRef } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
const BaseSignInButton = forwardRef(({ children, className, style, signIn, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ jsx(Fragment, { children: children({
		isLoading,
		meta,
		signIn
	}) });
	return /* @__PURE__ */ jsx(Button_default, {
		ref,
		className: cx(withVendorCSSClassPrefix("sign-in-button"), className),
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
export { BaseSignInButton_default as default };
//# sourceMappingURL=BaseSignInButton.js.map