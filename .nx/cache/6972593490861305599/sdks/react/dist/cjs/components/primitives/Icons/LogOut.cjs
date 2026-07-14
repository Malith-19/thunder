const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/primitives/Icons/LogOut.tsx
/**
* LogOut icon component.
*/
const LogOut = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
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
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "m16 17 5-5-5-5" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M21 12H9" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" })
	]
});
var LogOut_default = LogOut;

//#endregion
exports.default = LogOut_default;
//# sourceMappingURL=LogOut.cjs.map