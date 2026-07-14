import { jsx } from "react/jsx-runtime";

//#region src/components/primitives/Icons/ChevronDown.tsx
/**
* ChevronDown Icon component.
*
* @param props - Props injected to the component.
* @returns ChevronDown Icon component.
*/
const ChevronDown = ({ color = "currentColor", height = 24, width = 24 }) => /* @__PURE__ */ jsx("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: /* @__PURE__ */ jsx("path", {
		d: "m6 9 6 6 6-6",
		stroke: color,
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
});
ChevronDown.displayName = "ChevronDown";
var ChevronDown_default = ChevronDown;

//#endregion
export { ChevronDown_default as default };
//# sourceMappingURL=ChevronDown.js.map