import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Button_styles_default from "./Button.styles.js";
import Spinner_default from "../Spinner/Spinner.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/Button/Button.tsx
const getSpinnerWidth = (sizeVal, spacingUnit) => {
	if (sizeVal === "small") return `calc(${spacingUnit} * 1.5)`;
	if (sizeVal === "medium") return `calc(${spacingUnit} * 2)`;
	return `calc(${spacingUnit} * 2.5)`;
};
/**
* Button component with multiple variants and types.
*
* @example
* ```tsx
* // Primary solid button
* <Button color="primary" variant="solid">
*   Click me
* </Button>
*
* // Secondary outline button
* <Button color="secondary" variant="outline" size="large">
*   Cancel
* </Button>
*
* // Text button with loading state
* <Button color="tertiary" variant="text" loading>
*   Loading...
* </Button>
*
* // Button with icons
* <Button
*   color="primary"
*   startIcon={<Icon />}
*   endIcon={<Arrow />}
* >
*   Save and Continue
* </Button>
* ```
*/
const Button = forwardRef(({ color = "primary", variant = "solid", size = "medium", fullWidth = false, loading = false, startIcon, endIcon, children, className, disabled, style, shape = "square",...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Button_styles_default(theme, colorScheme, color, variant, size, fullWidth, disabled || false, loading, shape);
	const isIconVariant = variant === "icon";
	const spinnerWidth = getSpinnerWidth(size, theme.vars.spacing.unit);
	return /* @__PURE__ */ jsxs("button", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("button")), withVendorCSSClassPrefix(bem("button", variant)), withVendorCSSClassPrefix(bem("button", color)), withVendorCSSClassPrefix(bem("button", size)), withVendorCSSClassPrefix(bem("button", shape)), fullWidth ? withVendorCSSClassPrefix(bem("button", "fullWidth")) : void 0, loading ? withVendorCSSClassPrefix(bem("button", "loading")) : void 0, disabled || loading ? withVendorCSSClassPrefix(bem("button", "disabled")) : void 0, styles["button"], styles["size"], styles["variant"], styles["fullWidth"], styles["loading"], styles["shape"], className),
		disabled: disabled || loading,
		...rest,
		children: [
			loading && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "spinner")), styles["spinner"]),
				children: /* @__PURE__ */ jsx(Spinner_default, {
					size,
					color: "currentColor",
					style: {
						height: spinnerWidth,
						width: spinnerWidth
					}
				})
			}),
			!loading && isIconVariant && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "icon")), styles["icon"]),
				children: children || startIcon || endIcon
			}),
			!loading && !isIconVariant && startIcon && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "start-icon")), styles["startIcon"]),
				children: startIcon
			}),
			!isIconVariant && children && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "content")), styles["content"]),
				children
			}),
			!loading && !isIconVariant && endIcon && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "end-icon")), styles["endIcon"]),
				children: endIcon
			})
		]
	});
});
Button.displayName = "Button";
var Button_default = Button;

//#endregion
export { Button_default as default };
//# sourceMappingURL=Button.js.map