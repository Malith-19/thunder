const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/primitives/Icons/Check.tsx
/**
* Check Icon component.
*
* @param props - Props injected to the component.
* @returns Check Icon component.
*/
const Check = ({ color = "currentColor", height = 24, width = 24 }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
		d: "M20 6 9 17l-5-5",
		stroke: color,
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
});
Check.displayName = "Check";
var Check_default = Check;

//#endregion
exports.default = Check_default;
//# sourceMappingURL=Check.cjs.map