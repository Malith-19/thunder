import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Typography_default from "../Typography/Typography.js";
import Card_styles_default from "./Card.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
const Card = forwardRef(({ variant = "default", clickable = false, children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, variant, clickable);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card")), styles["card"], styles["variant"], styles["clickable"], withVendorCSSClassPrefix(bem("card", null, variant)), { [withVendorCSSClassPrefix(bem("card", null, "clickable"))]: clickable }, className),
		...rest,
		children
	});
});
/**
* Card header component that contains the title, description, and optional actions.
*/
const CardHeader = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "header")), styles["header"], className),
		...rest,
		children
	});
});
/**
* Card title component.
*/
const CardTitle = ({ children, level = 3, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
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
	return /* @__PURE__ */ jsx(Typography_default, {
		component: getComponentFromLevel(level),
		variant: getVariantFromLevel(level),
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "title")), styles["title"], className),
		fontWeight: 600,
		...filteredRest,
		children
	});
};
/**
* Card description component.
*/
const CardDescription = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ jsx(Typography_default, {
		component: "p",
		variant: "body2",
		color: "textSecondary",
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "description")), styles["description"], className),
		...filteredRest,
		children
	});
};
/**
* Card action component for action elements in the header.
*/
const CardAction = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "action")), styles["action"], className),
		...rest,
		children
	});
});
/**
* Card content component that contains the main content of the card.
*/
const CardContent = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "content")), styles["content"], className),
		...rest,
		children
	});
});
/**
* Card footer component that contains footer actions or additional information.
*/
const CardFooter = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "footer")), styles["footer"], className),
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
export { Card_default as default };
//# sourceMappingURL=Card.js.map