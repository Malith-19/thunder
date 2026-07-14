const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_BaseAcceptInvite = require('./BaseAcceptInvite.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/AcceptInvite/v2/AcceptInvite.tsx
/**
* Helper to extract query parameters from URL.
*/
const getUrlParams = () => {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	return {
		executionId: params.get("executionId") || void 0,
		inviteToken: params.get("inviteToken") || void 0
	};
};
/**
* AcceptInvite component for end-users to accept an invite and set their password.
*
* This component is designed for end users accessing the thunder-gate app via an invite link.
* It automatically:
* 1. Extracts executionId and inviteToken from URL query parameters
* 2. Validates the invite token with the backend
* 3. Displays the password form if token is valid
* 4. Completes the accept invite when password is set
*
* @example
* ```tsx
* import { AcceptInvite } from '@thunderid/react';
*
* // URL: /invite?executionId=xxx&inviteToken=yyy
*
* const AcceptInvitePage = () => {
*   return (
*     <AcceptInvite
*       baseUrl="https://api.thunder.io"
*       onComplete={() => navigate('/signin')}
*       onError={(error) => console.error(error)}
*     >
*       {({ values, components, isLoading, isComplete, isValidatingToken, isTokenInvalid, error, handleInputChange, handleSubmit }) => (
*         <div>
*           {isValidatingToken && <p>Validating your invite...</p>}
*           {isTokenInvalid && <p>Invalid or expired invite link</p>}
*           {isComplete && <p>Registration complete! You can now sign in.</p>}
*           {!isComplete && !isValidatingToken && !isTokenInvalid && (
*             // Render password form based on components
*           )}
*         </div>
*       )}
*     </AcceptInvite>
*   );
* };
* ```
*/
const AcceptInvite = ({ baseUrl, executionId: executionIdProp, inviteToken: inviteTokenProp, onComplete, onError, onFlowChange, onGoToSignIn, className, children, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { executionId: urlExecutionId, inviteToken: urlInviteToken } = (0, react.useMemo)(() => getUrlParams(), []);
	const executionId = executionIdProp || urlExecutionId;
	const inviteToken = inviteTokenProp || urlInviteToken;
	const apiBaseUrl = (0, react.useMemo)(() => {
		if (baseUrl) return baseUrl;
		if (typeof window !== "undefined") return window.location.origin;
		return "";
	}, [baseUrl]);
	/**
	* Submit flow step data.
	* Makes an unauthenticated request to /flow/execute endpoint.
	*/
	const handleSubmit = async (payload) => {
		const response = await fetch(`${apiBaseUrl}/flow/execute`, {
			body: JSON.stringify({
				...payload,
				verbose: true
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST"
		});
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Request failed: ${errorText}`);
		}
		return response.json();
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseAcceptInvite.default, {
		executionId,
		inviteToken,
		onSubmit: handleSubmit,
		onComplete,
		onError,
		onFlowChange,
		onGoToSignIn,
		className,
		size,
		variant,
		showTitle,
		showSubtitle,
		children
	});
};
var AcceptInvite_default = AcceptInvite;

//#endregion
exports.default = AcceptInvite_default;
//# sourceMappingURL=AcceptInvite.cjs.map