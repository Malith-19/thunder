import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/Info.tsx
/**
* Info icon component.
*/
const Info = (props) => /* @__PURE__ */ jsxs("svg", {
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
		/* @__PURE__ */ jsx("path", { d: "M12 16v-4" }),
		/* @__PURE__ */ jsx("path", { d: "M12 8h.01" })
	]
});
var Info_default = Info;

//#endregion
export { Info_default as default };
//# sourceMappingURL=Info.js.map