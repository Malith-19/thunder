const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../contexts/Theme/useTheme.cjs');
const require_Divider = require('../primitives/Divider/Divider.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/DividerComponent.tsx
/**
* Divider component for sign-up forms.
*/
const DividerComponent = ({ component }) => {
	const { theme } = require_useTheme.default();
	const text = (component.config || {})["text"] || "";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Divider.default, {
		orientation: (component.variant?.toLowerCase() || "horizontal") === "vertical" ? "vertical" : "horizontal",
		style: { margin: `calc(${theme.vars.spacing.unit} * 2) 0` },
		children: text
	}, component.id);
};
var DividerComponent_default = DividerComponent;

//#endregion
exports.default = DividerComponent_default;
//# sourceMappingURL=DividerComponent.cjs.map