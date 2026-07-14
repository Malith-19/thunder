const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/PageLoadingAnimation.tsx
function PageLoadingAnimation() {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		role: "status",
		sx: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "400px",
			width: "100%"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { "aria-label": "Loading content" })
	});
}

//#endregion
exports.default = PageLoadingAnimation;