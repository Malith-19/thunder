import { TokenCallback } from "./TokenCallback.js";
import { OAuthCallback } from "./OAuthCallback.js";
import { useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/components/auth/Callback/Callback.tsx
/**
* A unified Callback component that automatically routes to either OAuthCallback or TokenCallback
* based on the presence of URL parameters ('code' for OAuth, 'token' for token-based flows).
*/
const Callback = (props) => {
	const [flowType] = useState(() => {
		if (typeof window === "undefined") return "oauth";
		return new URLSearchParams(window.location.search).get("token") ? "token" : "oauth";
	});
	if (typeof window === "undefined") return null;
	if (flowType === "token") return /* @__PURE__ */ jsx(TokenCallback, { ...props });
	return /* @__PURE__ */ jsx(OAuthCallback, { ...props });
};

//#endregion
export { Callback };
//# sourceMappingURL=Callback.js.map