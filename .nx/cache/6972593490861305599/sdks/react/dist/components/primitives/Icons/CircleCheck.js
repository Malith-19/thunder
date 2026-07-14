import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/CircleCheck.tsx
/**
* CircleCheck icon component.
*/
const CircleCheck = (props) => /* @__PURE__ */ jsxs("svg", {
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
	children: [/* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), /* @__PURE__ */ jsx("path", { d: "m9 12 2 2 4-4" })]
});
var CircleCheck_default = CircleCheck;

//#endregion
export { CircleCheck_default as default };
//# sourceMappingURL=CircleCheck.js.map