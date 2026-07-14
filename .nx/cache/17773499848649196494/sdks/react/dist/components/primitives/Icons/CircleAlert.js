import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/CircleAlert.tsx
/**
* CircleAlert icon component.
*/
const CircleAlert = (props) => /* @__PURE__ */ jsxs("svg", {
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
		/* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ jsx("line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12"
		}),
		/* @__PURE__ */ jsx("line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16"
		})
	]
});
var CircleAlert_default = CircleAlert;

//#endregion
export { CircleAlert_default as default };
//# sourceMappingURL=CircleAlert.js.map