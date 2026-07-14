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
let react = require("react");
react = __toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = __toESM(__wso2_oxygen_ui);

//#region src/Config/ConfigContext.tsx
/**
* React context for accessing runtime configuration throughout the application.
*
* This context provides access to the configuration loaded from window object.
* or falls back to default values. It should be used within a `ConfigProvider` component.
*
* @example
* ```tsx
* import ConfigContext from './ConfigContext';
* import { useContext } from 'react';
*
* const MyComponent = () => {
*   const context = useContext(ConfigContext);
*   if (!context) {
*     throw new Error('Component must be used within ConfigProvider');
*   }
*
*   const { config, getServerUrl } = context;
*   return <div>Server: {getServerUrl()}</div>;
* };
* ```
*
* @public
*/
const ConfigContext = (0, react.createContext)(void 0);
var ConfigContext_default = ConfigContext;

//#endregion
//#region src/Config/ConfigProvider.tsx
/**
* Loads configuration from window object or uses default values.
*
* This function safely accesses the global window object and merges any runtime
* configuration with the default configuration values. It performs a deep merge
* to ensure all configuration properties are properly set.
*
* @returns The merged configuration object
*
* @internal
*/
function loadConfig() {
	if (typeof window !== "undefined" && window.__THUNDERID_RUNTIME_CONFIG__) return window.__THUNDERID_RUNTIME_CONFIG__;
	throw new Error("ThunderID runtime configuration is not available on window.__THUNDERID_RUNTIME_CONFIG__");
}
/**
* React context provider component that provides runtime configuration
* to all child components.
*
* This component loads configuration from window object at
* initialization time and provides it through React context. If the global
* configuration is not available, it falls back to default values.
*
* The provider creates utility methods for common configuration operations
* such as getting the server URL, hostname, port, and checking HTTP-only mode.
*
* @param props - The component props
* @param props.children - React children to be wrapped with the configuration context
*
* @returns JSX element that provides configuration context to children
*
* @example
* ```tsx
* import ConfigProvider from './ConfigProvider';
* import App from './App';
*
* function Root() {
*   return (
*     <ConfigProvider>
*       <App />
*     </ConfigProvider>
*   );
* }
* ```
*
* @public
*/
function ConfigProvider({ children }) {
	const config = (0, react.useMemo)(() => loadConfig(), []);
	const contextValue = (0, react.useMemo)(() => ({
		config,
		getServerUrl: () => {
			if (config.server.public_url) return config.server.public_url;
			const { hostname, port, http_only: httpOnly } = config.server;
			return `${httpOnly ? "http" : "https"}://${hostname}:${port}`;
		},
		getServerHostname: () => config.server.hostname,
		getServerPort: () => config.server.port,
		isHttpOnly: () => config.server.http_only,
		getClientId: () => config.client.client_id,
		getScopes: () => config.client.scopes ?? [],
		getClientUrl: () => {
			const { hostname, port, http_only: httpOnly, base } = config.client;
			if (hostname && port !== void 0 && httpOnly !== void 0) {
				const baseUrl = `${httpOnly ? "http" : "https"}://${hostname}:${port}`;
				return base ? `${baseUrl}${base}` : baseUrl;
			}
			const origin = typeof window !== "undefined" ? window.location.origin : "";
			return base ? `${origin}${base}` : origin;
		},
		getClientUuid: () => {
			if (config.client.uuid) return config.client.uuid;
			if (typeof window !== "undefined") {
				const applicationId = new URLSearchParams(window.location.search).get("applicationId");
				if (applicationId) return applicationId;
			}
		},
		getTrustedIssuerUrl: () => {
			if (config.trusted_issuer) {
				if (config.trusted_issuer.public_url) return config.trusted_issuer.public_url;
				const { hostname: hostname$1, port: port$1, http_only: httpOnly$1 } = config.trusted_issuer;
				return `${httpOnly$1 ? "http" : "https"}://${hostname$1}:${port$1}`;
			}
			if (config.server.public_url) return config.server.public_url;
			const { hostname, port, http_only: httpOnly } = config.server;
			return `${httpOnly ? "http" : "https"}://${hostname}:${port}`;
		},
		getTrustedIssuerClientId: () => {
			if (config.trusted_issuer?.client_id) return config.trusted_issuer.client_id;
			return config.client.client_id;
		},
		getTrustedIssuerScopes: () => {
			if (config.trusted_issuer?.scopes) return config.trusted_issuer.scopes;
			return config.client.scopes ?? [];
		},
		isTrustedIssuerGenericOidc: () => config.trusted_issuer?.type === "generic"
	}), [config]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConfigContext_default.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
//#region src/Config/useConfig.tsx
/**
* React hook for accessing runtime configuration throughout the application.
*
* This hook provides access to the configuration loaded from window object
* or falls back to default values. It must be used within a component tree wrapped by
* `ConfigProvider`, otherwise it will throw an error.
*
* The hook returns a context object containing the complete configuration and utility
* methods for common operations like getting server URLs, hostnames, ports, and
* checking HTTP-only mode.
*
* @returns The configuration context containing config data and utility methods
*
* @throws {Error} Throws an error if used outside of ConfigProvider
*
* @example
* Basic usage:
* ```tsx
* import useConfig from './useConfig';
*
* function MyComponent() {
*   const { config, getServerUrl, isHttpOnly, getClientUuid } = useConfig();
*
*   return (
*     <div>
*       <p>Server: {getServerUrl()}</p>
*       <p>Protocol: {isHttpOnly() ? 'HTTP' : 'HTTPS'}</p>
*       <p>Port: {config.server.port}</p>
*       <p>Client UUID: {getClientUuid() || 'Not available'}</p>
*     </div>
*   );
* }
* ```
*
* @example
* Getting client UUID for design resolution:
* ```tsx
* import useConfig from './useConfig';
* import useGetDesignResolve from './useGetDesignResolve';
*
* function DesignedComponent() {
*   const { getClientUuid } = useConfig();
*   const clientUuid = getClientUuid();
*
*   const { data: design } = useGetDesignResolve({
*     type: 'APP',
*     id: clientUuid || ''
*   });
*
*   return <div>Component with design...</div>;
* }
* ```
*
* @example
* Using with error boundary:
* ```tsx
* import useConfig from './useConfig';
*
* function ServerStatus() {
*   try {
*     const { getServerHostname, getServerPort } = useConfig();
*     return <span>{getServerHostname()}:{getServerPort()}</span>;
*   } catch (error) {
*     return <span>Configuration not available</span>;
*   }
* }
* ```
*
* @public
*/
function useConfig() {
	const context = (0, react.useContext)(ConfigContext_default);
	if (context === void 0) throw new Error("useConfig must be used within a ConfigProvider");
	return context;
}

//#endregion
//#region src/Toast/ToastContext.tsx
/**
* React context for triggering toast notifications from anywhere in the component tree.
*
* This context provides a `showToast` function that renders a temporary snackbar message
* at the bottom-right of the screen. It should be consumed via the `useToast` hook
* inside a component tree wrapped by `ToastProvider`.
*
* @example
* ```tsx
* import ToastContext from './ToastContext';
* import { useContext } from 'react';
*
* const MyComponent = () => {
*   const context = useContext(ToastContext);
*   if (!context) {
*     throw new Error('Component must be used within ToastProvider');
*   }
*
*   return <button onClick={() => context.showToast('Done!', 'success')}>Save</button>;
* };
* ```
*
* @public
*/
const ToastContext = (0, react.createContext)(void 0);
var ToastContext_default = ToastContext;

//#endregion
//#region src/Toast/ToastProvider.tsx
/**
* React context provider component that enables toast notifications throughout the application.
*
* This component manages the lifecycle of a single snackbar notification rendered at the
* bottom-right of the viewport. It exposes a `showToast` function via `ToastContext` so
* that any descendant component or hook can trigger a notification without needing to manage
* local state.
*
* Wrap your application (or a subtree) with this provider and consume notifications using
* the `useToast` hook.
*
* @example
* Basic setup in the application root:
* ```tsx
* import ToastProvider from './ToastProvider';
*
* function App() {
*   return (
*     <ToastProvider>
*       <Routes />
*     </ToastProvider>
*   );
* }
* ```
*
* @example
* Triggering a toast from a mutation hook:
* ```ts
* import useToast from './useToast';
*
* function useCreateItem() {
*   const { showToast } = useToast();
*
*   return useMutation({
*     mutationFn: createItem,
*     onSuccess: () => showToast('Item created successfully.', 'success'),
*     onError: () => showToast('Failed to create item.', 'error'),
*   });
* }
* ```
*
* @public
*/
function ToastProvider({ children }) {
	const [toast, setToast] = (0, react.useState)({
		open: false,
		message: "",
		severity: "success"
	});
	const showToast = (0, react.useCallback)((message, severity = "success") => {
		setToast({
			open: true,
			message,
			severity
		});
	}, []);
	const handleClose = (0, react.useCallback)((_event, reason) => {
		if (reason === "clickaway") return;
		setToast((prev) => ({
			...prev,
			open: false
		}));
	}, []);
	const contextValue = (0, react.useMemo)(() => ({ showToast }), [showToast]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ToastContext_default.Provider, {
		value: contextValue,
		children: [children, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Snackbar, {
			open: toast.open,
			autoHideDuration: 6e3,
			onClose: handleClose,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				onClose: handleClose,
				severity: toast.severity,
				sx: { width: "100%" },
				children: toast.message
			})
		})]
	});
}

//#endregion
//#region src/Toast/useToast.ts
/**
* React hook for triggering toast notifications from any component within a `ToastProvider`.
*
* This hook provides access to the `showToast` function exposed by `ToastContext`.
* It must be called inside a component tree that is wrapped by `ToastProvider`,
* otherwise it will throw an error.
*
* @returns The toast context containing the `showToast` function
*
* @throws {Error} Throws if called outside of a `ToastProvider`
*
* @example
* Basic usage in a component:
* ```tsx
* import useToast from './useToast';
*
* function SaveButton() {
*   const { showToast } = useToast();
*
*   return (
*     <button onClick={() => showToast('Saved successfully!', 'success')}>
*       Save
*     </button>
*   );
* }
* ```
*
* @example
* Usage in a TanStack Query mutation hook:
* ```ts
* import useToast from './useToast';
* import { useMutation } from '@tanstack/react-query';
*
* function useDeleteItem() {
*   const { showToast } = useToast();
*
*   return useMutation({
*     mutationFn: deleteItem,
*     onSuccess: () => showToast('Item deleted.', 'success'),
*     onError: () => showToast('Failed to delete item.', 'error'),
*   });
* }
* ```
*
* @public
*/
function useToast() {
	const context = (0, react.useContext)(ToastContext_default);
	if (context === void 0) throw new Error("useToast must be used within a ToastProvider");
	return context;
}

//#endregion
exports.ConfigContext = ConfigContext_default;
exports.ConfigProvider = ConfigProvider;
exports.ToastContext = ToastContext_default;
exports.ToastProvider = ToastProvider;
exports.useConfig = useConfig;
exports.useToast = useToast;