import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/TriangleAlert.tsx
/**
* TriangleAlert icon component.
*/
const TriangleAlert = (props) => /* @__PURE__ */ jsxs("svg", {
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
		/* @__PURE__ */ jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
		/* @__PURE__ */ jsx("path", { d: "M12 9v4" }),
		/* @__PURE__ */ jsx("path", { d: "M12 17h.01" })
	]
});
var TriangleAlert_default = TriangleAlert;

//#endregion
export { TriangleAlert_default as default };
//# sourceMappingURL=TriangleAlert.js.map