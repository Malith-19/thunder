import Button_default from "../../primitives/Button/Button.js";
import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { forwardRef } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
const BaseSignOutButton = forwardRef(({ children, className, style, signOut, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ jsx(Fragment, { children: children({
		isLoading,
		meta,
		signOut
	}) });
	return /* @__PURE__ */ jsx(Button_default, {
		ref,
		className: cx(withVendorCSSClassPrefix("sign-out-button"), className),
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
export { BaseSignOutButton_default as default };
//# sourceMappingURL=BaseSignOutButton.js.map