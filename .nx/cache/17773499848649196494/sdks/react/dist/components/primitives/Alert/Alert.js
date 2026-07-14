import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Typography_default from "../Typography/Typography.js";
import Alert_styles_default from "./Alert.styles.js";
import CircleAlert_default from "../Icons/CircleAlert.js";
import CircleCheck_default from "../Icons/CircleCheck.js";
import Info_default from "../Icons/Info.js";
import TriangleAlert_default from "../Icons/TriangleAlert.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { createContext, forwardRef, useContext } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/Alert/Alert.tsx
const getDefaultIcon = (variant) => {
	switch (variant) {
		case "success": return CircleCheck_default;
		case "error": return CircleAlert_default;
		case "warning": return TriangleAlert_default;
		case "info": return Info_default;
		default: return Info_default;
	}
};
const AlertVariantContext = createContext("info");
const useAlertVariant = () => useContext(AlertVariantContext);
/**
* Alert component that displays important information with different severity levels.
*
* @example
* ```tsx
* <Alert variant="success" showIcon>
*   <Alert.Title>Success! Your changes have been saved</Alert.Title>
*   <Alert.Description>
*     This is an alert with icon, title and description.
*   </Alert.Description>
* </Alert>
* ```
*/
const Alert = forwardRef(({ variant = "info", showIcon = true, children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Alert_styles_default(theme, colorScheme, variant);
	const IconComponent = getDefaultIcon(variant);
	return /* @__PURE__ */ jsx(AlertVariantContext.Provider, {
		value: variant,
		children: /* @__PURE__ */ jsxs("div", {
			ref,
			role: "alert",
			style,
			className: cx(withVendorCSSClassPrefix(bem("alert")), styles["alert"], styles["variant"], withVendorCSSClassPrefix(bem("alert", null, variant)), className),
			...rest,
			children: [showIcon && /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("alert", "icon")), styles["icon"]),
				children: /* @__PURE__ */ jsx(IconComponent, {})
			}), /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("alert", "content")), styles["content"]),
				children
			})]
		})
	});
});
/**
* Alert title component.
*/
const AlertTitle = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Alert_styles_default(theme, colorScheme, useAlertVariant());
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ jsx(Typography_default, {
		component: "h3",
		variant: "h6",
		fontWeight: 600,
		style,
		className: cx(withVendorCSSClassPrefix(bem("alert", "title")), styles["title"], className),
		...filteredRest,
		children
	});
};
/**
* Alert description component.
*/
const AlertDescription = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Alert_styles_default(theme, colorScheme, useAlertVariant());
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ jsx(Typography_default, {
		component: "p",
		variant: "body2",
		style,
		className: cx(withVendorCSSClassPrefix(bem("alert", "description")), styles["description"], className),
		...filteredRest,
		children
	});
};
Alert.displayName = "Alert";
AlertTitle.displayName = "Alert.Title";
AlertDescription.displayName = "Alert.Description";
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
var Alert_default = Alert;

//#endregion
export { Alert_default as default };
//# sourceMappingURL=Alert.js.map