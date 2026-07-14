const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/BuilderLayout/BuilderLayout.tsx
/**
* Generic two-column builder layout with a collapsible left panel and a main content area.
*
* The left panel is rendered inside a persistent MUI Drawer that slides in/out.
* A floating expand button appears when the panel is collapsed.
*
* @param props - Props injected to the component.
* @returns The BuilderLayout component.
*/
function BuilderLayout({ open = true, onPanelToggle, panelWidth = 350, panelContent = void 0, expandTooltip = "Show panel", panelPaperSx = void 0, children = void 0, rightPanel = void 0,...rest }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		width: "100%",
		height: "100%",
		display: "flex",
		position: "relative",
		...rest,
		children: [
			!open && panelContent && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
				title: expandTooltip,
				placement: "right",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					"aria-label": expandTooltip,
					onClick: onPanelToggle,
					size: "small",
					sx: {
						position: "absolute",
						top: 16,
						left: 16,
						zIndex: 10,
						borderRadius: 1,
						"&:hover": { backgroundColor: "action.hover" }
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronRightIcon, { size: 16 })
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Drawer, {
				variant: "persistent",
				anchor: "left",
				open: open ?? false,
				sx: {
					width: panelWidth,
					height: "100%",
					flexShrink: 0,
					transition: (theme) => theme.transitions.create("width", {
						easing: open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
						duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
					}),
					...!open && { width: 0 },
					"& .MuiDrawer-paper": {
						width: panelWidth,
						position: "relative",
						border: "none",
						overflow: "scroll",
						p: 2,
						gap: 1,
						...panelPaperSx ?? {}
					}
				},
				children: panelContent
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				component: "main",
				sx: {
					flexGrow: 1,
					height: "100%",
					position: "relative",
					transition: (theme) => theme.transitions.create(["margin", "width"], {
						easing: open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
						duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
					})
				},
				children
			}),
			rightPanel
		]
	});
}
var BuilderLayout_default = (0, react.memo)(BuilderLayout);

//#endregion
exports.default = BuilderLayout_default;