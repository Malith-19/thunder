const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/primitives/Icons/Plus.tsx
/**
* Plus (add) icon component.
*/
const Plus = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
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
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M5 12h14" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 5v14" })]
});
var Plus_default = Plus;

//#endregion
exports.default = Plus_default;
//# sourceMappingURL=Plus.cjs.map