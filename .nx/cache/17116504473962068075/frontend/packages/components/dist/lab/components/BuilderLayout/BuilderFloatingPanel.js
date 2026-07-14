import { memo } from "react";
import { Drawer } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";

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
	return /* @__PURE__ */ jsx(Drawer, {
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
var BuilderFloatingPanel_default = memo(BuilderFloatingPanel);

//#endregion
export { BuilderFloatingPanel_default as default };