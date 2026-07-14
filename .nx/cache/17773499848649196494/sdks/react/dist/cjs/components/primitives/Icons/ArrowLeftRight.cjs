const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/primitives/Icons/ArrowLeftRight.tsx
/**
* ArrowLeftRight Icon component (lucide-compatible).
*/
const ArrowLeftRight = ({ color = "currentColor", size = 24 }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: color,
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M8 3 4 7l4 4" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4 7h16" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m16 21 4-4-4-4" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M20 17H4" })
	]
});
ArrowLeftRight.displayName = "ArrowLeftRight";
var ArrowLeftRight_default = ArrowLeftRight;

//#endregion
exports.default = ArrowLeftRight_default;
//# sourceMappingURL=ArrowLeftRight.cjs.map