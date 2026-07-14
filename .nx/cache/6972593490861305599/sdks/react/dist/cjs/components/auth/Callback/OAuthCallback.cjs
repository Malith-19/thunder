const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/components/auth/Callback/OAuthCallback.tsx
/**
* BaseCallback is a headless component that handles OAuth callback parameter forwarding.
* This component extracts OAuth parameters (code, state, error) from the URL and forwards them
* to the original component that initiated the OAuth flow.
*
* Works standalone using the browser navigate utility (History API) for navigation by default.
* Pass an onNavigate prop to enable framework-specific navigation (e.g., via React Router).
*
* Flow: Extract OAuth parameters from URL -> Parse state parameter -> Redirect to original path with parameters
*
* The original component (SignIn/AcceptInvite) is responsible for:
* - Processing the OAuth code via the SDK
* - Calling /flow/execute
* - Handling the assertion and auth/callback POST
* - Managing the authenticated session
*/
const OAuthCallback = ({ onNavigate, onError }) => {
	const processingRef = (0, react.useRef)(false);
	const navigate = (path) => {
		if (onNavigate) onNavigate(path);
		else (0, __thunderid_browser.navigate)(path);
	};
	(0, react.useEffect)(() => {
		const processOAuthCallback = () => {
			if (processingRef.current) return;
			processingRef.current = true;
			let returnPath = "/";
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get("code");
				const state = urlParams.get("state");
				const nonce = urlParams.get("nonce");
				const oauthError = urlParams.get("error");
				const errorDescription = urlParams.get("error_description");
				if (window.opener) {
					window.opener.postMessage({
						code,
						error: oauthError,
						errorDescription,
						nonce,
						state
					}, window.location.origin);
					return;
				}
				if (!state) throw new Error("Missing OAuth state parameter - possible security issue");
				const storedData = sessionStorage.getItem(`thunderid_oauth_${state}`);
				if (!storedData) {
					if (oauthError) {
						const errorMsg = errorDescription || oauthError || "OAuth authentication failed";
						onError?.(new Error(errorMsg));
						const params$1 = new URLSearchParams();
						params$1.set("error", oauthError);
						if (errorDescription) params$1.set("error_description", errorDescription);
						navigate(`/?${params$1.toString()}`);
						return;
					}
					throw new Error("Invalid OAuth state - possible CSRF attack");
				}
				const { path, timestamp } = JSON.parse(storedData);
				returnPath = path || "/";
				if (Date.now() - timestamp > 6e5) {
					sessionStorage.removeItem(`thunderid_oauth_${state}`);
					throw new Error("OAuth state expired - please try again");
				}
				sessionStorage.removeItem(`thunderid_oauth_${state}`);
				if (oauthError) {
					const errorMsg = errorDescription || oauthError || "OAuth authentication failed";
					onError?.(new Error(errorMsg));
					const params$1 = new URLSearchParams();
					params$1.set("error", oauthError);
					if (errorDescription) params$1.set("error_description", errorDescription);
					navigate(`${returnPath}?${params$1.toString()}`);
					return;
				}
				if (!code) throw new Error("Missing OAuth authorization code");
				const params = new URLSearchParams();
				params.set("code", code);
				if (nonce) params.set("nonce", nonce);
				navigate(`${returnPath}?${params.toString()}`);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "OAuth callback processing failed";
				console.error("OAuth callback error:", err);
				onError?.(err instanceof Error ? err : new Error(errorMessage));
				const params = new URLSearchParams();
				params.set("error", "callback_error");
				params.set("error_description", errorMessage);
				navigate(`${returnPath}?${params.toString()}`);
			}
		};
		processOAuthCallback();
	}, [onNavigate, onError]);
	return null;
};

//#endregion
exports.OAuthCallback = OAuthCallback;
//# sourceMappingURL=OAuthCallback.cjs.map