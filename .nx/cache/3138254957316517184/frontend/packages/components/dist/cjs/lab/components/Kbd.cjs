const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/Kbd.tsx
/**
* Renders keyboard key labels styled as a `<kbd>` element.
*
* @param props - Component props
* @returns A styled keyboard key element
*/
function Kbd({ children }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("kbd", {
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
exports.default = Kbd;