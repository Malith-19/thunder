import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/X.tsx
/**
* X (close) icon component.
*/
const X = (props) => /* @__PURE__ */ jsxs("svg", {
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
	children: [/* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }), /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })]
});
var X_default = X;

//#endregion
export { X_default as default };
//# sourceMappingURL=X.js.map