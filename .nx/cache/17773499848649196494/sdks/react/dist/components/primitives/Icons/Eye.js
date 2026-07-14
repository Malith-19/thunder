import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/Eye.tsx
/**
* Eye icon component.
*/
const Eye = (props) => /* @__PURE__ */ jsxs("svg", {
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
	children: [/* @__PURE__ */ jsx("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})]
});
var Eye_default = Eye;

//#endregion
export { Eye_default as default };
//# sourceMappingURL=Eye.js.map