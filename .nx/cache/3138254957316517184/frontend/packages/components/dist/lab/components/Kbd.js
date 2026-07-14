import { jsx } from "react/jsx-runtime";

//#region src/lab/components/Kbd.tsx
/**
* Renders keyboard key labels styled as a `<kbd>` element.
*
* @param props - Component props
* @returns A styled keyboard key element
*/
function Kbd({ children }) {
	return /* @__PURE__ */ jsx("kbd", {
		style: {
			display: "inline-block",
			padding: "1px 5px",
			fontSize: "0.7rem",
			fontFamily: "inherit",
			lineHeight: "1.4",
			color: "inherit",
			backgroundColor: "rgba(0, 0, 0, 0.06)",
			border: "1px solid rgba(0, 0, 0, 0.18)",
			borderRadius: "4px",
			boxShadow: "inset 0 -1px 0 rgba(0, 0, 0, 0.12)",
			whiteSpace: "nowrap"
		},
		children
	});
}

//#endregion
export { Kbd as default };