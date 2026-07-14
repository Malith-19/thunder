import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/Building.tsx
/**
* Building Icon component.
*
* @param props - Props injected to the component.
* @returns Building Icon component.
*/
const Building = ({ color = "currentColor", height = 24, width = 24 }) => /* @__PURE__ */ jsxs("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ jsx("path", {
			d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M6 12h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M6 8h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M14 8h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M14 12h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M6 18h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M14 18h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	]
});
Building.displayName = "Building";
var Building_default = Building;

//#endregion
export { Building_default as default };
//# sourceMappingURL=Building.js.map