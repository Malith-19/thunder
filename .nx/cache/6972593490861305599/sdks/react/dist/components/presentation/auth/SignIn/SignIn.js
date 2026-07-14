import useThunderID_default from "../../../../contexts/ThunderID/useThunderID.js";
import BaseSignIn_default from "./BaseSignIn.js";
import SignIn_default from "./v2/SignIn.js";
import { Platform } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignIn/SignIn.tsx
/**
* A styled SignIn component that provides native authentication flow with pre-built styling.
* This component handles the API calls for authentication and delegates UI logic to BaseSignIn.
*
* @example
* ```tsx
* import { SignIn } from '@thunderid/react';
*
* const App = () => {
*   return (
*     <SignIn
*       onSuccess={(authData) => {
*         console.log('Authentication successful:', authData);
*         // Handle successful authentication (e.g., redirect, store tokens)
*       }}
*       onError={(error) => {
*         console.error('Authentication failed:', error);
*       }}
*       size="medium"
*       variant="outlined"
*     />
*   );
* };
* ```
*/
const SignIn = ({ className, size = "medium", children, preferences,...rest }) => {
	const { signIn, afterSignInUrl, isInitialized, isLoading, platform } = useThunderID_default();
	/**
	* Initialize the authentication flow.
	*/
	const handleInitialize = async () => await signIn({ response_mode: "direct" });
	/**
	* Handle authentication steps.
	*/
	const handleOnSubmit = async (payload, request) => await signIn(payload, request);
	/**
	* Handle successful authentication and redirect with query params.
	*/
	const handleSuccess = (authData) => {
		if (authData && afterSignInUrl) {
			const url = new URL(afterSignInUrl, window.location.origin);
			Object.entries(authData).forEach(([key, value]) => {
				if (value !== void 0 && value !== null) url.searchParams.append(key, String(value));
			});
			window.location.href = url.toString();
		}
	};
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(SignIn_default, {
		className,
		size,
		variant: rest.variant,
		onSuccess: rest.onSuccess,
		onError: rest.onError,
		preferences,
		children
	});
	return /* @__PURE__ */ jsx(BaseSignIn_default, {
		isLoading: isLoading || !isInitialized,
		afterSignInUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onSuccess: handleSuccess,
		className,
		size,
		showLogo: true,
		showSubtitle: true,
		showTitle: true,
		preferences,
		...rest
	});
};
var SignIn_default$1 = SignIn;

//#endregion
export { SignIn_default$1 as default };
//# sourceMappingURL=SignIn.js.map