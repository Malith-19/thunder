const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Typography = require('../Typography/Typography.cjs');
const require_Card_styles = require('./Card.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Card/Card.tsx
/**
* Card component that provides a flexible container for content.
*
* @example
* ```tsx
* <Card variant="elevated" clickable>
*   <Card.Header>
*     <Card.Title>Card Title</Card.Title>
*     <Card.Description>Card Description</Card.Description>
*     <Card.Action>
*       <Button variant="link">Action</Button>
*     </Card.Action>
*   </Card.Header>
*   <Card.Content>
*     <p>Card content goes here</p>
*   </Card.Content>
*   <Card.Footer>
*     <Button>Cancel</Button>
*     <Button variant="outline">Submit</Button>
*   </Card.Footer>
* </Card>
* ```
*/
const Card = (0, react.forwardRef)(({ variant = "default", clickable = false, children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Card_styles.default(theme, colorScheme, variant, clickable);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card")), styles["card"], styles["variant"], styles["clickable"], (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", null, variant)), { [(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", null, "clickable"))]: clickable }, className),
		...rest,
		children
	});
});
/**
* Card header component that contains the title, description, and optional actions.
*/
const CardHeader = (0, react.forwardRef)(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Card_styles.default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", "header")), styles["header"], className),
		...rest,
		children
	});
});
/**
* Card title component.
*/
const CardTitle = ({ children, level = 3, className, style,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Card_styles.default(theme, colorScheme, "default", false);
	const getVariantFromLevel = (lvl) => {
		switch (lvl) {
			case 1: return "h1";
			case 2: return "h2";
			case 3: return "h3";
			case 4: return "h4";
			case 5: return "h5";
			case 6: return "h6";
			default: return "h3";
		}
	};
	const getComponentFromLevel = (lvl) => {
		switch (lvl) {
			case 1: return "h1";
			case 2: return "h2";
			case 3: return "h3";
			case 4: return "h4";
			case 5: return "h5";
			case 6: return "h6";
			default: return "h3";
		}
	};
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		component: getComponentFromLevel(level),
		variant: getVariantFromLevel(level),
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", "title")), styles["title"], className),
		fontWeight: 600,
		...filteredRest,
		children
	});
};
/**
* Card description component.
*/
const CardDescription = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Card_styles.default(theme, colorScheme, "default", false);
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		component: "p",
		variant: "body2",
		color: "textSecondary",
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", "description")), styles["description"], className),
		...filteredRest,
		children
	});
};
/**
* Card action component for action elements in the header.
*/
const CardAction = (0, react.forwardRef)(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Card_styles.default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", "action")), styles["action"], className),
		...rest,
		children
	});
});
/**
* Card content component that contains the main content of the card.
*/
const CardContent = (0, react.forwardRef)(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Card_styles.default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", "content")), styles["content"], className),
		...rest,
		children
	});
});
/**
* Card footer component that contains footer actions or additional information.
*/
const CardFooter = (0, react.forwardRef)(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Card_styles.default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("card", "footer")), styles["footer"], className),
		...rest,
		children
	});
});
Card.displayName = "Card";
CardHeader.displayName = "Card.Header";
CardTitle.displayName = "Card.Title";
CardDescription.displayName = "Card.Description";
CardAction.displayName = "Card.Action";
CardContent.displayName = "Card.Content";
CardFooter.displayName = "Card.Footer";
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Action = CardAction;
Card.Content = CardContent;
Card.Footer = CardFooter;
var Card_default = Card;

//#endregion
exports.default = Card_default;
//# sourceMappingURL=Card.cjs.map