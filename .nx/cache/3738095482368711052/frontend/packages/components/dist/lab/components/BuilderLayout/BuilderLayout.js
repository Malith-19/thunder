import { memo } from "react";
import { Box, Drawer, IconButton, Tooltip } from "@wso2/oxygen-ui";
import { ChevronRightIcon } from "@wso2/oxygen-ui-icons-react";
import { jsx, jsxs } from "react/jsx-runtime";

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
	return /* @__PURE__ */ jsxs(Box, {
		width: "100%",
		height: "100%",
		display: "flex",
		position: "relative",
		...rest,
		children: [
			!open && panelContent && /* @__PURE__ */ jsx(Tooltip, {
				title: expandTooltip,
				placement: "right",
				children: /* @__PURE__ */ jsx(IconButton, {
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
					children: /* @__PURE__ */ jsx(ChevronRightIcon, { size: 16 })
				})
			}),
			/* @__PURE__ */ jsx(Drawer, {
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
			/* @__PURE__ */ jsx(Box, {
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
var BuilderLayout_default = memo(BuilderLayout);

//#endregion
export { BuilderLayout_default as default };