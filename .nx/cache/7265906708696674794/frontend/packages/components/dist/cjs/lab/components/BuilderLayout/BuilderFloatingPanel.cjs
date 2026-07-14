const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/BuilderLayout/BuilderFloatingPanel.tsx
/**
* Floating side panel rendered as an absolutely-positioned temporary Drawer within a canvas container.
*
* The panel renders portal-ed inside the provided `container` element (e.g. `#drawer-container`)
* so it appears to float over the canvas rather than the full viewport.
* Pointer events are disabled on the backdrop so canvas interactions remain active when the panel is open.
*
* @param props - Props injected to the component.
* @returns The BuilderFloatingPanel component.
*/
function BuilderFloatingPanel({ open, onClose, container = void 0, width = 350, anchor = "right", paperSx = void 0, children = void 0,...rest }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Drawer, {
		open,
		anchor,
		onClose,
		elevation: 5,
		slotProps: {
			paper: {
				sx: {
					width,
					p: 2,
					boxShadow: "-2px 0px 12px 0 rgba(0, 0, 0, 0.08)",
					top: "66px",
					bottom: "8px",
					height: "calc(100% - 72px)",
					backdropFilter: "blur(10px)",
					display: "flex",
					flexDirection: "column",
					pointerEvents: "auto",
					...anchor === "left" ? { left: "8px" } : { right: "8px" },
					...paperSx ?? {}
				},
				style: { position: "absolute" }
			},
			backdrop: { style: { position: "absolute" } }
		},
		ModalProps: {
			container,
			keepMounted: true,
			style: { pointerEvents: "none" }
		},
		sx: { pointerEvents: "none" },
		hideBackdrop: true,
		variant: "temporary",
		...rest,
		children
	});
}
var BuilderFloatingPanel_default = (0, react.memo)(BuilderFloatingPanel);

//#endregion
exports.default = BuilderFloatingPanel_default;