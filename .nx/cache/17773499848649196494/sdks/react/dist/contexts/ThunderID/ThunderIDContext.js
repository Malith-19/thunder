import { createContext } from "react";

//#region src/contexts/ThunderID/ThunderIDContext.ts
/**
* Context object for managing the Authentication flow builder core context.
*/
const ThunderIDContext = createContext({
	afterSignInUrl: void 0,
	applicationId: void 0,
	baseUrl: void 0,
	clearSession: () => {},
	clientId: void 0,
	scopes: void 0,
	discovery: { wellKnown: null },
	exchangeToken: null,
	getAccessToken: null,
	getDecodedIdToken: null,
	getIdToken: null,
	getStorageManager: () => Promise.resolve(null),
	http: {
		request: () => null,
		requestAll: () => null
	},
	instanceId: 0,
	isInitialized: false,
	isLoading: true,
	isMetaLoading: false,
	isSignedIn: false,
	meta: null,
	organization: null,
	organizationHandle: void 0,
	platform: void 0,
	reInitialize: null,
	recover: () => Promise.resolve({}),
	resolveFlowTemplateLiterals: (text) => text ?? "",
	signIn: () => Promise.resolve({}),
	signInSilently: () => Promise.resolve({}),
	signInUrl: void 0,
	signOut: () => Promise.resolve({}),
	signUp: () => Promise.resolve({}),
	signUpUrl: void 0,
	switchOrganization: null,
	user: null
});
ThunderIDContext.displayName = "ThunderIDContext";
var ThunderIDContext_default = ThunderIDContext;

//#endregion
export { ThunderIDContext_default as default };
//# sourceMappingURL=ThunderIDContext.js.map