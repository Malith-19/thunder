//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let __thunderid_react = require("@thunderid/react");
__thunderid_react = __toESM(__thunderid_react);
let react_router = require("react-router");
react_router = __toESM(react_router);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

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
const ProtectedRoute = ({ children, fallback, redirectTo, loader = null, onSignIn, signInOptions: overriddenSignInOptions = {} }) => {
	const { isSignedIn, isLoading, signIn, signInOptions, signInUrl } = (0, __thunderid_react.useThunderID)();
	if (isLoading) return loader;
	if (isSignedIn) return children;
	if (fallback) return fallback;
	if (redirectTo) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.Navigate, {
		to: redirectTo,
		replace: true
	});
	if (!isSignedIn) if (signInUrl) (0, __thunderid_react.navigate)(signInUrl);
	else if (onSignIn) onSignIn(signIn, overriddenSignInOptions);
	else (async () => {
		try {
			await signIn(overriddenSignInOptions ?? signInOptions);
		} catch (error) {
			throw new __thunderid_react.ThunderIDRuntimeError("Sign-in failed in ProtectedRoute.", "ProtectedRoute-SignInError-001", "react-router", `An error occurred during sign-in: ${error.message}`);
		}
	})();
	throw new __thunderid_react.ThunderIDRuntimeError("ProtectedRoute misconfiguration.", "ProtectedRoute-Misconfiguration-001", "react-router", "The internal handler failed to process the state. Please try with a fallback or redirectTo prop.");
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
	const navigate$1 = (0, react_router.useNavigate)();
	const location = (0, react_router.useLocation)();
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_react.Callback, {
		onNavigate: handleNavigate,
		onError: onError || ((error) => {
			console.error("OAuth callback error:", error);
		})
	});
};
var CallbackRoute_default = CallbackRoute;

//#endregion
exports.CallbackRoute = CallbackRoute_default;
exports.ProtectedRoute = ProtectedRoute_default;
//# sourceMappingURL=index.js.map