import { Box, CircularProgress } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";

//#region src/PageLoader/PageLoader.tsx
function PageLoader() {
	return /* @__PURE__ */ jsx(Box, {
		sx: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh"
		},
		children: /* @__PURE__ */ jsx(CircularProgress, {})
	});
}

//#endregion
export { PageLoader as default };