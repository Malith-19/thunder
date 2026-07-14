import Button_default from "../../primitives/Button/Button.js";
import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { forwardRef } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
const BaseSignUpButton = forwardRef(({ children, className, style, signUp, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ jsx(Fragment, { children: children({
		isLoading,
		meta,
		signUp
	}) });
	return /* @__PURE__ */ jsx(Button_default, {
		ref,
		className: cx(withVendorCSSClassPrefix("sign-up-button"), className),
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
export { BaseSignUpButton_default as default };
//# sourceMappingURL=BaseSignUpButton.js.map