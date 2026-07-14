const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_TokenCallback = require('./TokenCallback.cjs');
const require_OAuthCallback = require('./OAuthCallback.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/auth/Callback/Callback.tsx
/**
* A unified Callback component that automatically routes to either OAuthCallback or TokenCallback
* based on the presence of URL parameters ('code' for OAuth, 'token' for token-based flows).
*/
const Callback = (props) => {
	const [flowType] = (0, react.useState)(() => {
		if (typeof window === "undefined") return "oauth";
		return new URLSearchParams(window.location.search).get("token") ? "token" : "oauth";
	});
	if (typeof window === "undefined") return null;
	if (flowType === "token") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TokenCallback.TokenCallback, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OAuthCallback.OAuthCallback, { ...props });
};

//#endregion
exports.Callback = Callback;
//# sourceMappingURL=Callback.cjs.map