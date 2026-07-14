import { Box, CircularProgress } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";

//#region src/lab/components/PageLoadingAnimation.tsx
function PageLoadingAnimation() {
	return /* @__PURE__ */ jsx(Box, {
		role: "status",
		sx: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "400px",
			width: "100%"
		},
		children: /* @__PURE__ */ jsx(CircularProgress, { "aria-label": "Loading content" })
	});
}

//#endregion
export { PageLoadingAnimation as default };