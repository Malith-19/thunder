const require_dynamic_rendering = require('./dynamic-rendering-BCAIDVkI.js');
require('./SessionManager-A3v2mgBb.js');
const require_server = require('./server-CKXDSUxG.js');
const require_getSessionId = require('./getSessionId-D8QW3GFP.js');
require('./segment-DgYqRzOA.js');
let __thunderid_node = require("@thunderid/node");
__thunderid_node = require_dynamic_rendering.__toESM(__thunderid_node);
let react = require("react");
react = require_dynamic_rendering.__toESM(react);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_dynamic_rendering.__toESM(__thunderid_react);

//#region src/client/contexts/ThunderID/useThunderID.ts
const useThunderID = () => {
	const context = (0, react.useContext)(require_server.ThunderIDContext_default);
	if (!context) throw new Error("useThunderID must be used within an ThunderIDProvider");
	return context;
};
var useThunderID_default = useThunderID;

//#endregion
//#region src/client/components/presentation/Organization/Organization.tsx
var import_jsx_runtime = /* @__PURE__ */ require_dynamic_rendering.__toESM(require_server.require_jsx_runtime());
/**
* A component that uses render props to expose the current organization object.
* This component automatically retrieves the current organization from Organization context.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { Organization } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <Organization fallback={<p>No organization selected</p>}>
*       {(organization) => (
*         <div>
*           <h1>Current Organization: {organization.name}!</h1>
*           <p>ID: {organization.id}</p>
*           <p>Role: {organization.role}</p>
*           {organization.memberCount && (
*             <p>Members: {organization.memberCount}</p>
*           )}
*         </div>
*       )}
*     </Organization>
*   );
* }
* ```
*/
const Organization = ({ children, fallback = null }) => {
	const { currentOrganization } = (0, __thunderid_react.useOrganization)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseOrganization, {
		organization: currentOrganization,
		fallback,
		children
	});
};
Organization.displayName = "Organization";
var Organization_default = Organization;

//#endregion
//#region src/client/components/presentation/CreateOrganization/CreateOrganization.tsx
/**
* CreateOrganization component that provides organization creation functionality.
* This component automatically integrates with the ThunderID and Organization contexts.
*
* @example
* ```tsx
* import { CreateOrganization } from '@thunderid/react';
*
* // Basic usage - uses default API and contexts
* <CreateOrganization
*   onSuccess={(org) => console.log('Created:', org)}
*   onCancel={() => navigate('/organizations')}
* />
*
* // With custom organization creation handler
* <CreateOrganization
*   onCreateOrganization={async (payload) => {
*     const result = await myCustomAPI.createOrganization(payload);
*     return result;
*   }}
*   onSuccess={(org) => {
*     console.log('Organization created:', org.name);
*     // Custom success logic here
*   }}
* />
*
* // With fallback for unauthenticated users
* <CreateOrganization
*   fallback={<div>Please sign in to create an organization</div>}
* />
* ```
*/
const CreateOrganization = ({ onCreateOrganization, fallback = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {}), onSuccess, defaultParentId,...props }) => {
	const { isSignedIn, baseUrl } = useThunderID_default();
	const { currentOrganization, revalidateMyOrganizations, createOrganization } = (0, __thunderid_react.useOrganization)();
	const [loading, setLoading] = (0, react.useState)(false);
	const [error, setError] = (0, react.useState)(null);
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	const parentId = defaultParentId || currentOrganization?.id || "";
	const handleSubmit = async (payload) => {
		setLoading(true);
		setError(null);
		try {
			let result;
			if (onCreateOrganization) result = await onCreateOrganization(payload);
			else {
				if (!baseUrl) throw new Error("Base URL is required for organization creation");
				if (!createOrganization) throw new __thunderid_node.ThunderIDRuntimeError(`createOrganization function is not available.`, "CreateOrganization-handleSubmit-RuntimeError-001", "nextjs", "The createOrganization function must be provided by the Organization context.");
				result = await createOrganization({
					...payload,
					parentId
				}, await require_getSessionId.getSessionId_default());
			}
			if (revalidateMyOrganizations) await revalidateMyOrganizations();
			if (onSuccess) onSuccess(result);
		} catch (createError) {
			setError(createError instanceof Error ? createError.message : "Failed to create organization");
			throw createError;
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseCreateOrganization, {
		onSubmit: handleSubmit,
		loading,
		error,
		defaultParentId: parentId,
		onSuccess,
		...props
	});
};
var CreateOrganization_default = CreateOrganization;

//#endregion
//#region src/server/actions/getOrganizationAction.ts
/**
* Server action to create an organization.
*/
const getOrganizationAction = async (organizationId, sessionId) => {
	try {
		return {
			data: { organization: await require_server.getClient_default().getOrganization(organizationId, sessionId) },
			error: null,
			success: true
		};
	} catch (error) {
		return {
			data: { user: {} },
			error: "Failed to get organization",
			success: false
		};
	}
};
var getOrganizationAction_default = getOrganizationAction;

//#endregion
//#region src/client/components/presentation/OrganizationProfile/OrganizationProfile.tsx
/**
* OrganizationProfile component displays organization information in a
* structured and styled format. It automatically fetches organization details
* using the provided organization ID and displays them using BaseOrganizationProfile.
*
* The component supports editing functionality, allowing users to modify organization
* fields inline. Updates are automatically synced with the backend via the SCIM2 API.
*
* This component is the React-specific implementation that automatically
* retrieves the organization data from ThunderID API.
*
* @example
* ```tsx
* // Basic usage with editing enabled (default)
* <OrganizationProfile organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1" />
*
* // Read-only mode
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   editable={false}
* />
*
* // With card layout and custom fallbacks
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   cardLayout={true}
*   loadingFallback={<div>Loading organization...</div>}
*   errorFallback={<div>Failed to load organization</div>}
*   fallback={<div>No organization data available</div>}
* />
*
* // With custom fields configuration and update callback
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   fields={[
*     { key: 'id', label: 'Organization ID', editable: false },
*     { key: 'name', label: 'Organization Name', editable: true },
*     { key: 'description', label: 'Description', editable: true, render: (value) => value || 'No description' },
*     { key: 'created', label: 'Created Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'lastModified', label: 'Last Modified Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'attributes', label: 'Custom Attributes', editable: true }
*   ]}
*   onUpdate={async (payload) => {
*     console.log('Organization updated:', payload);
*     // payload contains the updated field values
*     // The component automatically converts these to patch operations
*   }}
* />
*
* // In popup mode
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   popupTitle="Edit Organization Profile"
* />
* ```
*/
const OrganizationProfile = ({ organizationId, mode = "default", open = false, onOpenChange, onUpdate, popupTitle,...rest }) => {
	const { baseUrl } = useThunderID_default();
	const { t } = (0, __thunderid_react.useTranslation)();
	const [organization, setOrganization] = (0, react.useState)(null);
	const [, setLoading] = (0, react.useState)(true);
	const [, setError] = (0, react.useState)(false);
	const fetchOrganization = async () => {
		if (!baseUrl || !organizationId) {
			setLoading(false);
			setError(true);
			return;
		}
		try {
			setLoading(true);
			setError(false);
			const result = await getOrganizationAction_default(organizationId, await require_getSessionId.getSessionId_default());
			if (result.data?.organization) {
				setOrganization(result.data.organization);
				return;
			}
			setError(true);
		} catch (err) {
			require_server.logger_default.error("Failed to fetch organization:", err);
			setError(true);
			setOrganization(null);
		} finally {
			setLoading(false);
		}
	};
	(0, react.useEffect)(() => {
		fetchOrganization();
	}, [baseUrl, organizationId]);
	const handleOrganizationUpdate = async (payload) => {
		if (!baseUrl || !organizationId) return;
		try {
			await (0, __thunderid_node.updateOrganization)({
				baseUrl,
				operations: (0, __thunderid_node.createPatchOperations)(payload),
				organizationId
			});
			await fetchOrganization();
			if (onUpdate) await onUpdate(payload);
		} catch (err) {
			require_server.logger_default.error("Failed to update organization:", err);
			throw err;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseOrganizationProfile, {
		organization,
		onUpdate: handleOrganizationUpdate,
		mode: mode === "popup" ? "popup" : "inline",
		open,
		onOpenChange,
		title: popupTitle || t("organization.profile.heading"),
		...rest
	});
};
var OrganizationProfile_default = OrganizationProfile;

//#endregion
//#region src/client/components/presentation/OrganizationList/OrganizationList.tsx
/**
* OrganizationList component that provides organization listing functionality with pagination.
* This component uses the enhanced OrganizationContext, eliminating the polling issue and
* providing better integration with the existing context system.
*
* @example
* ```tsx
* import { OrganizationList } from '@thunderid/react';
*
* // Basic usage
* <OrganizationList />
*
* // With custom limit and filter
* <OrganizationList
*   limit={20}
*   filter="active"
*   onOrganizationSelect={(org) => {
*     console.log('Selected organization:', org.name);
*   }}
* />
*
* // As a popup dialog
* <OrganizationList
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   title="Select Organization"
* />
*
* // With custom organization renderer
* <OrganizationList
*   renderOrganization={(org) => (
*     <div key={org.id}>
*       <h3>{org.name}</h3>
*       <p>Can switch: {org.canSwitch ? 'Yes' : 'No'}</p>
*     </div>
*   )}
* />
* ```
*/
const OrganizationList = ({ onOrganizationSelect,...baseProps }) => {
	const { getAllOrganizations, error, isLoading, myOrganizations } = (0, __thunderid_react.useOrganization)();
	const [allOrganizations, setAllOrganizations] = (0, react.useState)({ organizations: [] });
	(0, react.useEffect)(() => {
		(async () => {
			setAllOrganizations(await getAllOrganizations());
		})();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseOrganizationList, {
		allOrganizations,
		myOrganizations,
		error,
		isLoading,
		onOrganizationSelect,
		...baseProps
	});
};
var OrganizationList_default = OrganizationList;

//#endregion
//#region src/client/components/presentation/OrganizationSwitcher/OrganizationSwitcher.tsx
/**
* OrganizationSwitcher component that provides organization switching functionality.
* This component automatically retrieves organizations from the OrganizationContext.
* You can also override the organizations, currentOrganization, and onOrganizationSwitch
* by passing them as props.
*
* @example
* ```tsx
* import { OrganizationSwitcher } from '@thunderid/react';
*
* // Basic usage - uses OrganizationContext
* <OrganizationSwitcher />
*
* // With custom organization switch handler
* <OrganizationSwitcher
*   onOrganizationSwitch={(org) => {
*     console.log('Switching to:', org.name);
*     // Custom logic here
*   }}
* />
*
* // With fallback for unauthenticated users
* <OrganizationSwitcher
*   fallback={<div>Please sign in to view organizations</div>}
* />
* ```
*/
const OrganizationSwitcher = ({ currentOrganization: propCurrentOrganization, fallback = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {}), onOrganizationSwitch: propOnOrganizationSwitch, organizations: propOrganizations,...props }) => {
	const { isSignedIn } = useThunderID_default();
	const { currentOrganization: contextCurrentOrganization, myOrganizations: contextOrganizations, switchOrganization, isLoading, error } = (0, __thunderid_react.useOrganization)();
	const [isCreateOrgOpen, setIsCreateOrgOpen] = (0, react.useState)(false);
	const [isProfileOpen, setIsProfileOpen] = (0, react.useState)(false);
	const [isOrganizationListOpen, setIsOrganizationListOpen] = (0, react.useState)(false);
	const { t } = (0, __thunderid_react.useTranslation)();
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	const organizations = propOrganizations || contextOrganizations || [];
	const currentOrganization = propCurrentOrganization || contextCurrentOrganization;
	const onOrganizationSwitch = propOnOrganizationSwitch || switchOrganization;
	const handleManageOrganizations = () => {
		setIsOrganizationListOpen(true);
	};
	const handleManageOrganization = () => {
		setIsProfileOpen(true);
	};
	const defaultMenuItems = [];
	if (currentOrganization) defaultMenuItems.push({
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BuildingAlt, {}),
		label: t("organization.switcher.manage.organizations"),
		onClick: handleManageOrganizations
	});
	defaultMenuItems.push({
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14m-7-7h14" })
		}),
		label: t("organization.switcher.create.organization"),
		onClick: () => setIsCreateOrgOpen(true)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseOrganizationSwitcher, {
			organizations,
			currentOrganization,
			onOrganizationSwitch,
			loading: isLoading,
			error,
			menuItems: props.menuItems ? [...defaultMenuItems, ...props.menuItems] : defaultMenuItems,
			onManageProfile: handleManageOrganization,
			...props
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateOrganization, {
			mode: "popup",
			open: isCreateOrgOpen,
			onOpenChange: setIsCreateOrgOpen,
			onSuccess: (org) => {
				if (org && onOrganizationSwitch) onOrganizationSwitch(org);
				setIsCreateOrgOpen(false);
			}
		}),
		currentOrganization && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationProfile_default, {
			organizationId: currentOrganization.id,
			mode: "popup",
			open: isProfileOpen,
			onOpenChange: setIsProfileOpen,
			cardLayout: true,
			loadingFallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("organization.profile.loading") }),
			errorFallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("organization.profile.error") })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationList_default, {
			mode: "popup",
			open: isOrganizationListOpen,
			onOpenChange: setIsOrganizationListOpen,
			title: t("organization.switcher.manage.organizations"),
			onOrganizationSelect: (organization) => {
				if (onOrganizationSwitch) onOrganizationSwitch(organization);
				setIsOrganizationListOpen(false);
			}
		})
	] });
};
var OrganizationSwitcher_default = OrganizationSwitcher;

//#endregion
//#region src/client/components/control/SignedIn/SignedIn.tsx
/**
* A component that only renders its children when the user is signed in.
*
* @example
* ```tsx
* import { SignedIn } from '@thunderid/auth-next';
*
* const App = () => {
*   return (
*     <SignedIn fallback={<p>Please sign in to continue</p>}>
*       <p>Welcome! You are signed in.</p>
*     </SignedIn>
*   );
* }
* ```
*/
const SignedIn = ({ children, fallback = null }) => {
	const { isSignedIn } = useThunderID_default();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: isSignedIn ? children : fallback });
};
var SignedIn_default = SignedIn;

//#endregion
//#region src/client/components/control/SignedOut/SignedOut.tsx
/**
* A component that only renders its children when the user is signed out.
*
* @example
* ```tsx
* import { SignedOut } from '@thunderid/auth-next';
*
* const App = () => {
*   return (
*     <SignedOut fallback={<p>Please sign out to continue</p>}>
*       <p>Welcome! You are signed out.</p>
*     </SignedOut>
*   );
* }
* ```
*/
const SignedOut = ({ children, fallback = null }) => {
	const { isSignedIn } = useThunderID_default();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !isSignedIn ? children : fallback });
};
var SignedOut_default = SignedOut;

//#endregion
//#region src/client/components/actions/SignInButton/SignInButton.tsx
var import_navigation$1 = /* @__PURE__ */ require_dynamic_rendering.__toESM(require_server.require_navigation());
/**
* SignInButton component that uses server actions for authentication in Next.js.
*
* @example Using render props
* ```tsx
* <SignInButton>
*   {({isLoading}) => (
*     <button type="submit" disabled={isLoading}>
*       {isLoading ? 'Signing in...' : 'Sign In'}
*     </button>
*   )}
* </SignInButton>
* ```
*
* @example Using traditional props
* ```tsx
* <SignInButton className="custom-button">Sign In</SignInButton>
* ```
*
* @remarks
* In Next.js with server actions, the sign-in is handled via the server action.
* When using render props, the custom button should use `type="submit"` instead of `onClick={signIn}`.
* The `signIn` function in render props is provided for API consistency but should not be used directly.
*/
const SignInButton = (0, react.forwardRef)(({ className, style, children, preferences, onClick, signInOptions = {},...rest }, ref) => {
	const { signIn, signInUrl } = useThunderID_default();
	const router = (0, import_navigation$1.useRouter)();
	const { t } = (0, __thunderid_react.useTranslation)(preferences?.i18n);
	const handleOnClick = async (e) => {
		try {
			if (signInUrl) router.push(signInUrl);
			else if (signIn) await signIn(signInOptions);
			if (onClick) onClick(e);
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Sign in failed: ${error instanceof Error ? error.message : String(error)}`, "SignInButton-handleSignIn-RuntimeError-001", "nextjs", "Something went wrong while trying to sign in. Please try again later.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseSignInButton, {
		className,
		style,
		ref,
		preferences,
		onClick: handleOnClick,
		...rest,
		children: children ?? t("elements.buttons.signin.text")
	});
});
SignInButton.displayName = "SignInButton";
var SignInButton_default = SignInButton;

//#endregion
//#region src/client/components/actions/SignUpButton/SignUpButton.tsx
var import_navigation = /* @__PURE__ */ require_dynamic_rendering.__toESM(require_server.require_navigation());
/**
* SignUpButton component that supports both render props and traditional props patterns.
* It redirects the user to the ThunderID sign-up page configured for the application.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example Using render props pattern
* ```tsx
* <SignUpButton>
*   {({ signUp, isLoading }) => (
*     <button onClick={signUp} disabled={isLoading}>
*       {isLoading ? 'Creating Account...' : 'Create Account'}
*     </button>
*   )}
* </SignUpButton>
* ```
*
* @example Using traditional props pattern
* ```tsx
* <SignUpButton className="custom-button">Create Account</SignUpButton>
* ```
*
* @example Using component-level preferences
* ```tsx
* <SignUpButton
*   preferences={{
*     i18n: {
*       bundles: {
*         'en-US': {
*           translations: {
*             'buttons.signUp': 'Custom Sign Up Text'
*           }
*         }
*       }
*     }
*   }}
* >
*   Custom Sign Up
* </SignUpButton>
* ```
*/
const SignUpButton = (0, react.forwardRef)(({ children, onClick, preferences,...rest }, ref) => {
	const { signUp, signUpUrl } = useThunderID_default();
	const router = (0, import_navigation.useRouter)();
	const { t } = (0, __thunderid_react.useTranslation)(preferences?.i18n);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const handleSignUp = async (e) => {
		try {
			setIsLoading(true);
			if (signUpUrl) router.push(signUpUrl);
			else if (signUp) await signUp();
			if (onClick) onClick(e);
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Sign up failed: ${error instanceof Error ? error.message : String(error)}`, "SignUpButton-handleSignUp-RuntimeError-001", "nextjs", "Something went wrong while trying to sign up. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseSignUpButton, {
		ref,
		onClick: handleSignUp,
		isLoading,
		signUp: handleSignUp,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signup.text")
	});
});
SignUpButton.displayName = "SignUpButton";
var SignUpButton_default = SignUpButton;

//#endregion
//#region src/client/components/presentation/SignIn/SignIn.tsx
/**
* A SignIn component for Next.js that provides native authentication flow.
* This component delegates to the BaseSignIn from @thunderid/react and requires
* the API functions to be provided as props.
*
* @remarks This component requires the authentication API functions to be provided
* as props. For a complete working example, you'll need to implement the server-side
* authentication endpoints or use the traditional OAuth flow with SignInButton.
*
* @example
* ```tsx
* import { SignIn } from '@thunderid/nextjs';
* import { executeEmbeddedSignInFlow } from '@thunderid/browser';
*
* const LoginPage = () => {
*   const handleInitialize = async () => {
*     return await executeEmbeddedSignInFlow({
*       response_mode: 'direct',
*     });
*   };
*
*   const handleSubmit = async (flow) => {
*     return await executeEmbeddedSignInFlow({ flow });
*   };
*
*   return (
*     <SignIn
*       onInitialize={handleInitialize}
*       onSubmit={handleSubmit}
*       onSuccess={(authData) => {
*         console.log('Authentication successful:', authData);
*       }}
*       onError={(error) => {
*         console.error('Authentication failed:', error);
*       }}
*       size="medium"
*       variant="outlined"
*       afterSignInUrl="/dashboard"
*     />
*   );
* };
* ```
*/
const SignIn = ({ size = "medium", variant = "outlined",...rest }) => {
	const { signIn, afterSignInUrl } = useThunderID_default();
	const handleInitialize = async () => signIn && await signIn({
		flowId: "",
		selectedAuthenticator: {
			authenticatorId: "",
			params: {}
		}
	});
	const handleOnSubmit = async (payload, request) => {
		if (!signIn) throw new __thunderid_node.ThunderIDRuntimeError("`signIn` function is not available.", "SignIn-handleOnSubmit-RuntimeError-001", "nextjs");
		return await signIn(payload, request);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseSignIn, {
		afterSignInUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		size,
		variant,
		...rest
	});
};
SignIn.displayName = "SignIn";
var SignIn_default = SignIn;

//#endregion
//#region src/client/components/actions/SignOutButton/SignOutButton.tsx
/**
* SignInButton component. This button initiates the sign-in process when clicked.
*
* @example
* ```tsx
* import { SignInButton } from '@thunderid/auth-react';
*
* const App = () => {
*   const buttonRef = useRef<HTMLButtonElement>(null);
*   return (
*     <SignInButton ref={buttonRef} className="custom-class" style={{ backgroundColor: 'blue' }}>
*       Sign In
*     </SignInButton>
*   );
* }
* ```
*/
const SignOutButton = (0, react.forwardRef)(({ className, style, preferences, onClick, children,...rest }, ref) => {
	const { signOut } = useThunderID_default();
	const { t } = (0, __thunderid_react.useTranslation)(preferences?.i18n);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const handleOnClick = async (e) => {
		try {
			setIsLoading(true);
			require_server.logger_default.debug("[SignOutButton] Initiating a sign-out from a button click");
			await signOut();
			if (onClick) onClick(e);
		} catch (error) {
			require_server.logger_default.error("[SignOutButton] Error occurred initiating sign-out from a button click:", error);
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseSignOutButton, {
		ref,
		onClick: handleOnClick,
		isLoading,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signout.text")
	});
});
var SignOutButton_default = SignOutButton;

//#endregion
//#region src/client/components/presentation/User/User.tsx
/**
* A component that uses render props to expose the authenticated user object.
* This component automatically retrieves the user from ThunderID context.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { User } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <User fallback={<p>Please sign in</p>}>
*       {(user) => (
*         <div>
*           <h1>Welcome, {user.displayName}!</h1>
*           <p>Email: {user.email}</p>
*         </div>
*       )}
*     </User>
*   );
* }
* ```
*/
const User = ({ children, fallback = null }) => {
	const { user } = useThunderID_default();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseUser, {
		user,
		fallback,
		children
	});
};
User.displayName = "User";
var User_default = User;

//#endregion
//#region src/client/components/presentation/SignUp/SignUp.tsx
/**
* A styled SignUp component that provides embedded sign-up flow with pre-built styling.
* This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
*
* @example
* ```tsx
* import { SignUp } from '@thunderid/react';
*
* const App = () => {
*   return (
*     <SignUp
*       onSuccess={(response) => {
*         console.log('Sign-up successful:', response);
*         // Handle successful sign-up (e.g., redirect, show confirmation)
*       }}
*       onError={(error) => {
*         console.error('Sign-up failed:', error);
*       }}
*       onComplete={(redirectUrl) => {
*         // Platform-specific redirect handling (e.g., Next.js router.push)
*         router.push(redirectUrl); // or window.location.href = redirectUrl
*       }}
*       size="medium"
*       variant="outlined"
*       afterSignUpUrl="/welcome"
*     />
*   );
* };
* ```
*/
const SignUp = ({ className, size = "medium", variant = "outlined", afterSignUpUrl, onError }) => {
	const { signUp } = useThunderID_default();
	/**
	* Initialize the sign-up flow.
	*/
	const handleInitialize = async (payload) => {
		if (!signUp) throw new __thunderid_node.ThunderIDRuntimeError("`signUp` function is not available.", "SignUp-handleInitialize-RuntimeError-001", "nextjs");
		return await signUp(payload || { flowType: __thunderid_node.EmbeddedFlowType.Registration });
	};
	/**
	* Handle sign-up steps.
	*/
	const handleOnSubmit = async (payload) => {
		if (!signUp) throw new __thunderid_node.ThunderIDRuntimeError("`signUp` function is not available.", "SignUp-handleOnSubmit-RuntimeError-001", "nextjs");
		return await signUp(payload);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseSignUp, {
		afterSignUpUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onError,
		className,
		size,
		variant,
		isInitialized: true
	});
};
var SignUp_default = SignUp;

//#endregion
//#region src/client/components/presentation/UserProfile/UserProfile.tsx
/**
* UserProfile component displays the authenticated user's profile information in a
* structured and styled format. It shows user details such as display name, email,
* username, and other available profile information from ThunderID.
*
* This component is the React-specific implementation that uses the BaseUserProfile
* and automatically retrieves the user data from ThunderID context if not provided.
*
* @example
* ```tsx
* // Basic usage - will use user from ThunderID context
* <UserProfile />
*
* // With explicit user data
* <UserProfile user={specificUser} />
*
* // With card layout and custom fallback
* <UserProfile
*   cardLayout={true}
*   fallback={<div>Please sign in to view your profile</div>}
* />
* ```
*/
const UserProfile = ({ ...rest }) => {
	const { profile, flattenedProfile, schemas, onUpdateProfile, updateProfile } = (0, __thunderid_react.useUser)();
	const handleProfileUpdate = async (payload) => {
		onUpdateProfile((await updateProfile(payload, await require_getSessionId.getSessionId_default()))?.data?.user);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseUserProfile, {
		profile,
		flattenedProfile,
		schemas,
		onUpdate: handleProfileUpdate,
		...rest
	});
};
var UserProfile_default = UserProfile;

//#endregion
//#region src/client/components/presentation/UserDropdown/UserDropdown.tsx
/**
* UserDropdown component displays a user avatar with a dropdown menu.
* When clicked, it shows a popover with customizable menu items.
* This component is the React-specific implementation that uses the BaseUserDropdown
* and automatically retrieves the user data from ThunderID context.
*
* Supports render props for complete customization of the dropdown appearance and behavior.
*
* @example
* ```tsx
* // Basic usage - will use user from ThunderID context
* <UserDropdown menuItems={[
*   { label: 'Profile', onClick: () => {} },
*   { label: 'Settings', href: '/settings' },
*   { label: 'Sign Out', onClick: () => {} }
* ]} />
*
* // With custom configuration
* <UserDropdown
*   showTriggerLabel={true}
*   avatarSize={40}
*   fallback={<div>Please sign in</div>}
* />
*
* // Using render props for complete customization
* <UserDropdown>
*   {({ user, isLoading, openProfile, signOut }) => (
*     <div>
*       <button onClick={openProfile}>
*         {user?.name || 'Loading...'}
*       </button>
*       <button onClick={signOut}>Logout</button>
*     </div>
*   )}
* </UserDropdown>
*
* // Using partial render props
* <UserDropdown
*   renderTrigger={({ user, openProfile }) => (
*     <button onClick={openProfile} className="custom-trigger">
*       Welcome, {user?.name}!
*     </button>
*   )}
* />
* ```
*/
const UserDropdown = ({ children, renderTrigger, renderDropdown, onSignOut,...rest }) => {
	const { user, isLoading, signOut } = useThunderID_default();
	const [isProfileOpen, setIsProfileOpen] = (0, react.useState)(false);
	const handleManageProfile = () => {
		setIsProfileOpen(true);
	};
	const handleSignOut = () => {
		signOut();
		if (onSignOut) onSignOut();
	};
	const closeProfile = () => {
		setIsProfileOpen(false);
	};
	const renderProps = {
		closeProfile,
		isLoading,
		isProfileOpen,
		openProfile: handleManageProfile,
		signOut: handleSignOut,
		user
	};
	if (children) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [children(renderProps), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
	if (renderTrigger || renderDropdown) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [renderTrigger ? renderTrigger(renderProps) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseUserDropdown, {
		user,
		isLoading,
		onManageProfile: handleManageProfile,
		onSignOut: handleSignOut,
		...rest
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BaseUserDropdown, {
		user,
		isLoading,
		onManageProfile: handleManageProfile,
		onSignOut: handleSignOut,
		...rest
	}), isProfileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
};
var UserDropdown_default = UserDropdown;

//#endregion
exports.CreateOrganization = CreateOrganization_default;
Object.defineProperty(exports, 'CreateOrganizationProps', {
  enumerable: true,
  get: function () {
    return CreateOrganizationProps;
  }
});
exports.Organization = Organization_default;
exports.OrganizationProfile = OrganizationProfile_default;
Object.defineProperty(exports, 'OrganizationProfileProps', {
  enumerable: true,
  get: function () {
    return OrganizationProfileProps;
  }
});
Object.defineProperty(exports, 'OrganizationProps', {
  enumerable: true,
  get: function () {
    return OrganizationProps;
  }
});
exports.OrganizationSwitcher = OrganizationSwitcher_default;
Object.defineProperty(exports, 'OrganizationSwitcherProps', {
  enumerable: true,
  get: function () {
    return OrganizationSwitcherProps;
  }
});
exports.SignIn = SignIn_default;
exports.SignInButton = SignInButton_default;
exports.SignOutButton = SignOutButton_default;
exports.SignUp = SignUp_default;
exports.SignUpButton = SignUpButton_default;
exports.SignedIn = SignedIn_default;
Object.defineProperty(exports, 'SignedInProps', {
  enumerable: true,
  get: function () {
    return SignedInProps;
  }
});
exports.SignedOut = SignedOut_default;
Object.defineProperty(exports, 'SignedOutProps', {
  enumerable: true,
  get: function () {
    return SignedOutProps;
  }
});
exports.ThunderIDNext = require_server.ThunderIDNextClient_default;
exports.ThunderIDProvider = require_server.ThunderIDProvider_default;
exports.User = User_default;
exports.UserDropdown = UserDropdown_default;
exports.UserProfile = UserProfile_default;
exports.thunderid = require_server.thunderid_default;
exports.useThunderID = useThunderID_default;