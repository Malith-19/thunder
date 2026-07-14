import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/BuildingAlt.tsx
/**
* Alternative Building Icon component.
*
* @param props - Props injected to the component.
* @returns Alternative Building Icon component.
*/
const BuildingAlt = ({ height = 24, width = 24 }) => /* @__PURE__ */ jsxs("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ jsx("path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }),
		/* @__PURE__ */ jsx("path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }),
		/* @__PURE__ */ jsx("path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }),
		/* @__PURE__ */ jsx("path", { d: "M10 6h4" }),
		/* @__PURE__ */ jsx("path", { d: "M10 10h4" }),
		/* @__PURE__ */ jsx("path", { d: "M10 14h4" }),
		/* @__PURE__ */ jsx("path", { d: "M10 18h4" })
	]
});
BuildingAlt.displayName = "BuildingAlt";
var BuildingAlt_default = BuildingAlt;

//#endregion
export { BuildingAlt_default as default };
//# sourceMappingURL=BuildingAlt.js.map