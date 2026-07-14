const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Typography = require('../Typography/Typography.cjs');
const require_Alert_styles = require('./Alert.styles.cjs');
const require_CircleAlert = require('../Icons/CircleAlert.cjs');
const require_CircleCheck = require('../Icons/CircleCheck.cjs');
const require_Info = require('../Icons/Info.cjs');
const require_TriangleAlert = require('../Icons/TriangleAlert.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Alert/Alert.tsx
const getDefaultIcon = (variant) => {
	switch (variant) {
		case "success": return require_CircleCheck.default;
		case "error": return require_CircleAlert.default;
		case "warning": return require_TriangleAlert.default;
		case "info": return require_Info.default;
		default: return require_Info.default;
	}
};
const AlertVariantContext = (0, react.createContext)("info");
const useAlertVariant = () => (0, react.useContext)(AlertVariantContext);
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
const Alert = (0, react.forwardRef)(({ variant = "info", showIcon = true, children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Alert_styles.default(theme, colorScheme, variant);
	const IconComponent = getDefaultIcon(variant);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AlertVariantContext.Provider, {
		value: variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			ref,
			role: "alert",
			style,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("alert")), styles["alert"], styles["variant"], (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("alert", null, variant)), className),
			...rest,
			children: [showIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("alert", "icon")), styles["icon"]),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconComponent, {})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("alert", "content")), styles["content"]),
				children
			})]
		})
	});
});
/**
* Alert title component.
*/
const AlertTitle = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Alert_styles.default(theme, colorScheme, useAlertVariant());
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		component: "h3",
		variant: "h6",
		fontWeight: 600,
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("alert", "title")), styles["title"], className),
		...filteredRest,
		children
	});
};
/**
* Alert description component.
*/
const AlertDescription = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Alert_styles.default(theme, colorScheme, useAlertVariant());
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		component: "p",
		variant: "body2",
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("alert", "description")), styles["description"], className),
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
exports.default = Alert_default;
//# sourceMappingURL=Alert.cjs.map