const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/primitives/Icons/CircleAlert.tsx
/**
* CircleAlert icon component.
*/
const CircleAlert = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12"
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16"
		})
	]
});
var CircleAlert_default = CircleAlert;

//#endregion
exports.default = CircleAlert_default;
//# sourceMappingURL=CircleAlert.cjs.map