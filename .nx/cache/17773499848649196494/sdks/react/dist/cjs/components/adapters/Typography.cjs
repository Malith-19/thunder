const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../contexts/Theme/useTheme.cjs');
const require_Typography = require('../primitives/Typography/Typography.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/Typography.tsx
/**
* Typography component for sign-up forms (titles, descriptions, etc.).
*/
const TypographyComponent = ({ component }) => {
	const { theme } = require_useTheme.default();
	const config = component.config || {};
	const text = config["text"] || config["content"] || "";
	const variant = component.variant?.toLowerCase() || "body1";
	let typographyVariant = "body1";
	switch (variant) {
		case "h1":
			typographyVariant = "h1";
			break;
		case "h2":
			typographyVariant = "h2";
			break;
		case "h3":
			typographyVariant = "h3";
			break;
		case "h4":
			typographyVariant = "h4";
			break;
		case "h5":
			typographyVariant = "h5";
			break;
		case "h6":
			typographyVariant = "h6";
			break;
		case "subtitle1":
			typographyVariant = "subtitle1";
			break;
		case "subtitle2":
			typographyVariant = "subtitle2";
			break;
		case "body2":
			typographyVariant = "body2";
			break;
		case "caption":
			typographyVariant = "caption";
			break;
		default: typographyVariant = "body1";
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		variant: typographyVariant,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: text
	}, component.id);
};
var Typography_default$1 = TypographyComponent;

//#endregion
exports.default = Typography_default$1;
//# sourceMappingURL=Typography.cjs.map