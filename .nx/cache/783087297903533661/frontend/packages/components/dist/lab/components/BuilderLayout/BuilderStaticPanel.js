import { memo } from "react";
import { Box, Drawer, Typography } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";

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
	return /* @__PURE__ */ jsxs(Drawer, {
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
		children: [header !== void 0 && /* @__PURE__ */ jsx(Box, {
			sx: {
				height: 40,
				flexShrink: 0,
				px: 2,
				display: "flex",
				alignItems: "center",
				borderBottom: "1px solid",
				borderColor: "divider"
			},
			children: typeof header === "string" ? /* @__PURE__ */ jsx(Typography, {
				variant: "h6",
				children: header
			}) : header
		}), /* @__PURE__ */ jsx(Box, {
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
var BuilderStaticPanel_default = memo(BuilderStaticPanel);

//#endregion
export { BuilderStaticPanel_default as default };