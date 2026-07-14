const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/BuilderLayout/BuilderStaticPanel.tsx
/**
* Persistent, in-flow side panel whose visual style matches {@link BuilderFloatingPanel}.
*
* Unlike the floating panel this component is part of the normal document flow — it pushes
* adjacent content rather than overlaying the canvas. Use it for always-visible config or
* property panels in a builder layout.
*
* @param props - Props injected to the component.
* @returns The BuilderStaticPanel component.
*/
function BuilderStaticPanel({ width = 350, anchor = "right", header = void 0, paperSx = void 0, children = void 0, open = true }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Drawer, {
		variant: "persistent",
		anchor,
		open,
		elevation: 5,
		sx: {
			width,
			height: "100%",
			flexShrink: 0,
			mr: 1,
			transition: (theme) => theme.transitions.create("width", {
				easing: open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
				duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
			}),
			...!open && {
				width: 0,
				mr: 0
			},
			"& .MuiDrawer-paper": {
				width,
				position: "relative",
				border: "none",
				overflow: "scroll",
				p: 2,
				gap: 1,
				...paperSx ?? {}
			}
		},
		children: [header !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: {
				height: 40,
				flexShrink: 0,
				px: 2,
				display: "flex",
				alignItems: "center",
				borderBottom: "1px solid",
				borderColor: "divider"
			},
			children: typeof header === "string" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h6",
				children: header
			}) : header
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: {
				flex: 1,
				minHeight: 0,
				display: "flex",
				flexDirection: "column"
			},
			children
		})]
	});
}
var BuilderStaticPanel_default = (0, react.memo)(BuilderStaticPanel);

//#endregion
exports.default = BuilderStaticPanel_default;