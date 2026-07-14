import { Callback, ThunderIDRuntimeError, navigate, useThunderID } from "@thunderid/react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { jsx } from "react/jsx-runtime";

//#region src/components/ProtectedRoute.tsx
/**
* A protected route component that requires authentication to access.
*
* This component should be used as the element prop of a Route component.
* It checks authentication status and either renders the protected content,
* shows a loading state, redirects, or shows a fallback.
*
* Either a `redirectTo` prop or a `fallback` prop must be provided to handle
* unauthenticated users.
*
* @example Basic usage with redirect
* ```tsx
* <Route
*   path="/dashboard"
*   element={
*     <ProtectedRoute redirectTo="/signin">
*       <Dashboard />
*     </ProtectedRoute>
*   }
* />
* ```
*
* @example With custom fallback
* ```tsx
* <Route
*   path="/admin"
*   element={
*     <ProtectedRoute fallback={<div>Access denied</div>}>
*       <AdminPanel />
*     </ProtectedRoute>
*   }
* />
* ```
*
* @example With custom sign-in parameters
* ```tsx
* <Route
*   path="/secure"
*   element={
*     <ProtectedRoute signInOptions={{ prompt: "login", fidp: "OrganizationSSO" }}>
*       <SecureContent />
*     </ProtectedRoute>
*   }
* />
* ```
*
* @example With custom sign-in handler
* ```tsx
* <Route
*   path="/custom"
*   element={
*     <ProtectedRoute
*       onSignIn={(defaultSignIn, options) => {
*         // Custom logic before sign-in
*         console.log('Initiating custom sign-in');
*         defaultSignIn({ ...options, prompt: "login" });
*       }}
*       signInOptions={{ fidp: "CustomIDP" }}
*     >
*       <CustomContent />
*     </ProtectedRoute>
*   }
* />
* ```
*/
const ProtectedRoute = ({ children, fallback, redirectTo, loader = null, onSignIn, signInOptions: overriddenSignInOptions, tokenRequest: overriddenTokenRequest }) => {
	const { isSignedIn, isLoading, signIn, signInOptions, tokenRequest, signInUrl } = useThunderID();
	if (isLoading) return loader;
	if (isSignedIn) return children;
	if (fallback) return fallback;
	if (redirectTo) return /* @__PURE__ */ jsx(Navigate, {
		to: redirectTo,
		replace: true
	});
	if (!isSignedIn) if (signInUrl) navigate(signInUrl);
	else if (onSignIn) onSignIn(signIn, overriddenSignInOptions);
	else (async () => {
		try {
			const mergedParams = (overriddenTokenRequest ?? tokenRequest)?.params;
			await signIn(overriddenSignInOptions ?? signInOptions, void 0, void 0, void 0, mergedParams && Object.keys(mergedParams).length > 0 ? { params: mergedParams } : void 0);
		} catch (error) {
			throw new ThunderIDRuntimeError("Sign-in failed in ProtectedRoute.", "ProtectedRoute-SignInError-001", "react-router", `An error occurred during sign-in: ${error.message}`);
		}
	})();
	throw new ThunderIDRuntimeError("ProtectedRoute misconfiguration.", "ProtectedRoute-Misconfiguration-001", "react-router", "The internal handler failed to process the state. Please try with a fallback or redirectTo prop.");
};
var ProtectedRoute_default = ProtectedRoute;

//#endregion
//#region src/components/CallbackRoute.tsx
/**
* Handles OAuth callback redirects for React Router applications.
* Processes authorization code, validates CSRF state, and navigates back to the original path.
* Automatically handles React Router basename when configured.
*
* @example
* ```tsx
* <Route path="/callback" element={<CallbackRoute />} />
* ```
*/
const CallbackRoute = ({ onError, onNavigate }) => {
	const navigate$1 = useNavigate();
	const location = useLocation();
	const handleNavigate = (path) => {
		if (onNavigate) {
			onNavigate(path);
			return;
		}
		const fullPath = window.location.pathname;
		const relativePath = location.pathname;
		const basename = fullPath.endsWith(relativePath) ? fullPath.slice(0, -relativePath.length).replace(/\/$/, "") : "";
		navigate$1(basename && path.startsWith(basename) ? path.slice(basename.length) || "/" : path);
	};
	return /* @__PURE__ */ jsx(Callback, {
		onNavigate: handleNavigate,
		onError: onError || ((error) => {
			console.error("OAuth callback error:", error);
		})
	});
};
var CallbackRoute_default = CallbackRoute;

//#endregion
export { CallbackRoute_default as CallbackRoute, ProtectedRoute_default as ProtectedRoute };
//# sourceMappingURL=index.js.map