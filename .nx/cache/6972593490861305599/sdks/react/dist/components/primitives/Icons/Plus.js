import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/Icons/Plus.tsx
/**
* Plus (add) icon component.
*/
const Plus = (props) => /* @__PURE__ */ jsxs("svg", {
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
	children: [/* @__PURE__ */ jsx("path", { d: "M5 12h14" }), /* @__PURE__ */ jsx("path", { d: "M12 5v14" })]
});
var Plus_default = Plus;

//#endregion
export { Plus_default as default };
//# sourceMappingURL=Plus.js.map