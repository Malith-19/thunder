const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/primitives/Icons/Info.tsx
/**
* Info icon component.
*/
const Info = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
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
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 16v-4" }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 8h.01" })
	]
});
var Info_default = Info;

//#endregion
exports.default = Info_default;
//# sourceMappingURL=Info.cjs.map