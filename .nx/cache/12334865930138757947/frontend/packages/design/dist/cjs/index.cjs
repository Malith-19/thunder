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
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = __toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = __toESM(__thunderid_contexts);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = __toESM(__wso2_oxygen_ui);
let react = require("react");
react = __toESM(react);
let __thunderid_utils = require("@thunderid/utils");
__thunderid_utils = __toESM(__thunderid_utils);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);
let __thunderid_logger = require("@thunderid/logger");
__thunderid_logger = __toESM(__thunderid_logger);
let react_i18next = require("react-i18next");
react_i18next = __toESM(react_i18next);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = __toESM(__wso2_oxygen_ui_icons_react);
let dompurify = require("dompurify");
dompurify = __toESM(dompurify);

//#region src/constants/design-query-keys.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* Query key constants for design feature cache management.
*/
const DesignQueryKeys = {
	THEMES: "themes",
	THEME: "theme",
	LAYOUTS: "layouts",
	LAYOUT: "layout",
	DESIGN_RESOLVE: "design-resolve"
};
var design_query_keys_default = DesignQueryKeys;

//#endregion
//#region src/api/useGetThemes.ts
/**
* Custom hook to fetch the list of theme configurations from the server.
*
* @param params - Optional query parameters
* @param params.limit - Maximum number of records to return (default: 30)
* @param params.offset - Number of records to skip for pagination (default: 0)
* @returns TanStack Query result object with theme list data
*/
function useGetThemes(params) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit = 30, offset = 0 } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [design_query_keys_default.THEMES, {
			limit,
			offset
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const queryParams = new URLSearchParams({
				limit: limit.toString(),
				offset: offset.toString()
			});
			return (await http.request({
				url: `${serverUrl}/design/themes?${queryParams.toString()}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
//#region src/api/useGetTheme.ts
/**
* Custom hook to fetch a single theme configuration by ID from the server.
*
* @param themeId - The unique identifier of the theme configuration
* @returns TanStack Query result object with theme data
*/
function useGetTheme(themeId) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [design_query_keys_default.THEME, themeId],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/design/themes/${themeId}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(themeId)
	});
}

//#endregion
//#region src/api/useCreateTheme.ts
/**
* Custom hook to create a new theme configuration in the server.
*
* @returns TanStack Query mutation object for creating theme configurations
*/
function useCreateTheme() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (themeData) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/design/themes`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data: themeData
			})).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.THEMES] }).catch(() => {});
		}
	});
}

//#endregion
//#region src/api/useUpdateTheme.ts
/**
* Custom hook to update an existing theme configuration in the server.
*
* @returns TanStack Query mutation object for updating theme configurations
*/
function useUpdateTheme() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async ({ themeId, data }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/design/themes/${themeId}`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				data
			})).data;
		},
		onSuccess: (_, { themeId }) => {
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.THEME, themeId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.THEMES] }).catch(() => {});
		}
	});
}

//#endregion
//#region src/api/useDeleteTheme.ts
/**
* Custom hook to delete a theme configuration from the server.
*
* @returns TanStack Query mutation object for deleting theme configurations
*/
function useDeleteTheme() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (themeId) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/design/themes/${themeId}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_, themeId) => {
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.THEME, themeId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.THEMES] }).catch(() => {});
		}
	});
}

//#endregion
//#region src/themes/DefaultTheme.ts
/**
* DefaultTheme - The default theme for Thunder ID applications
* Features: Electric blue primary, indigo secondary, deep purple dark backgrounds with ambient glow
* Evokes intelligence, creativity, and cutting-edge AI aesthetics
*/
const DefaultThemeConfig = {
	colorSchemes: {
		light: { palette: {
			primary: {
				main: "#3688FF",
				dark: "#2d78e0",
				light: "#6ba8f5",
				contrastText: "#ffffff"
			},
			secondary: {
				main: "#5498b4",
				dark: "#2d8eac",
				light: "#85cde3",
				contrastText: "#ffffff"
			},
			warning: {
				main: "#f59e0b",
				contrastText: "#ffffff"
			},
			error: {
				main: "#ef4444",
				contrastText: "#ffffff"
			},
			info: {
				main: "#8bf9fa",
				contrastText: "#0a1628"
			},
			success: {
				main: "#10b981",
				contrastText: "#ffffff"
			},
			background: {
				default: "#ffffff",
				paper: "#bfc6cf33",
				acrylic: "#c8d1dc1f"
			},
			text: {
				primary: "#181818",
				secondary: "rgba(24, 24, 24, 0.6)"
			}
		} },
		dark: { palette: {
			primary: {
				main: "#3688FF",
				dark: "#2d78e0",
				light: "#6ba8f5",
				contrastText: "#ffffff"
			},
			secondary: {
				main: "#5498b4",
				dark: "#2d8eac",
				light: "#85cde3",
				contrastText: "#0a2230"
			},
			warning: {
				main: "#f59e0b",
				contrastText: "#ffffff"
			},
			error: {
				main: "#ef4444",
				contrastText: "#ffffff"
			},
			info: {
				main: "#8bf9fa",
				contrastText: "#0a1628"
			},
			success: {
				main: "#10b981",
				contrastText: "#ffffff"
			},
			background: {
				default: "#060d1a",
				paper: "#0a162875",
				acrylic: "#0a162875"
			},
			text: {
				primary: "#FFFFFF",
				secondary: "rgba(255, 255, 255, 0.7)"
			}
		} }
	},
	shape: { borderRadius: 8 },
	blur: {
		none: "none",
		light: "blur(5px)",
		medium: "blur(10px)",
		heavy: "blur(15px)"
	},
	gradient: {
		primary: "linear-gradient(90deg, #3688FF 0%, #1d5eb4 100%)",
		secondary: "linear-gradient(90deg, #3688FF 0%, #1d5eb4 100%)"
	},
	components: {
		MuiCssBaseline: { styleOverrides: {
			"html[data-color-scheme='dark'] body": {
				backgroundAttachment: "fixed",
				backgroundImage: "radial-gradient(circle at 15% 50%, rgb(0 136 255 / 13%) 0%, rgb(6 13 26 / 0%) 40% 70%), radial-gradient(circle at 65% 30%, rgb(0 127 242 / 22%) 10%, rgba(6, 13, 26, 0%) 60% 40%), radial-gradient(circle at center, rgba(0, 0, 0, 0.6) 0%, var(--oxygen-palette-background-default) 100%)",
				backgroundBlendMode: "screen"
			},
			"html[data-color-scheme='light'] body": {
				backgroundAttachment: "fixed",
				backgroundImage: "radial-gradient(circle at 65% 30%, rgb(0 127 242 / 8%) 10%, rgba(0, 0, 0, 0) 60% 40%), radial-gradient(circle at 15% 50%, rgb(0 213 255 / 12%) 1%, rgb(0 0 0 / 0%) 40% 70%), radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, var(--oxygen-palette-background-default) 100%)"
			}
		} },
		MuiPaper: { styleOverrides: { root: ({ theme }) => ({
			backgroundColor: theme.vars.palette.background.paper,
			WebkitBackdropFilter: theme.blur.medium,
			backdropFilter: theme.blur.medium,
			backgroundImage: "none"
		}) } },
		MuiButton: { styleOverrides: {
			root: { transition: "all 0.3s ease-in-out" },
			contained: ({ ownerState }) => {
				if (ownerState.color && ownerState.color !== "primary") return {};
				return {
					color: "#ffffff",
					background: "inherit",
					"&:hover": { background: "inherit" }
				};
			},
			containedSecondary: ({ theme }) => ({ "&:hover": { backgroundColor: theme.palette.secondary.dark } }),
			outlined: ({ theme, ownerState }) => {
				if (ownerState.color && ownerState.color !== "primary") return {};
				return {
					color: theme.palette.primary.main,
					borderColor: theme.palette.primary.main,
					"&:hover": {
						backgroundColor: `${theme.palette.primary.main}10`,
						borderColor: theme.palette.primary.main,
						color: theme.palette.primary.main
					}
				};
			},
			outlinedSecondary: ({ theme }) => ({
				color: theme.palette.secondary.main,
				borderColor: theme.palette.secondary.main,
				"&:hover": {
					backgroundColor: `${theme.palette.secondary.main}10`,
					borderColor: theme.palette.secondary.main
				}
			}),
			text: ({ theme }) => ({
				color: theme.vars.palette.text.primary,
				"&:hover": {
					backgroundColor: `${theme.palette.primary.main}10`,
					color: theme.vars.palette.text.primary
				}
			}),
			textSecondary: ({ theme }) => ({
				color: theme.palette.secondary.main,
				"&:hover": { backgroundColor: `${theme.palette.secondary.main}10` }
			})
		} },
		MuiChip: { styleOverrides: { outlined: { borderColor: "currentColor" } } },
		MuiLinearProgress: {
			defaultProps: { color: "primary" },
			styleOverrides: {
				root: ({ theme }) => ({ "&.MuiLinearProgress-colorPrimary": { backgroundColor: `${theme.palette.primary.main}33` } }),
				bar: ({ theme }) => ({ "&.MuiLinearProgress-barColorPrimary": { backgroundColor: theme.palette.primary.main } })
			}
		},
		MuiLink: { styleOverrides: { root: ({ theme }) => ({
			color: theme.palette.primary.main,
			textDecoration: "underline"
		}) } },
		MuiTextField: { defaultProps: { size: "small" } },
		MuiSelect: { defaultProps: { size: "small" } },
		MuiAutocomplete: { defaultProps: { size: "small" } },
		MuiDataGrid: { styleOverrides: { panelContent: {
			"html[data-color-scheme='dark'] &": { "--DataGrid-t-color-background-overlay": "#091522f0" },
			"html[data-color-scheme='light'] &": { "--DataGrid-t-color-background-overlay": "#d6dce3eb" }
		} } },
		MuiPopover: { styleOverrides: { paper: ({ theme }) => ({
			backgroundColor: theme.vars.palette.background.paper,
			WebkitBackdropFilter: theme.blur.medium,
			backdropFilter: theme.blur.medium,
			backgroundImage: "none"
		}) } },
		MuiDialog: { styleOverrides: {
			root: ({ theme }) => ({ "& .MuiBackdrop-root": {
				WebkitBackdropFilter: theme.blur.light,
				backdropFilter: theme.blur.light
			} }),
			paper: ({ theme }) => ({
				backgroundColor: theme.vars.palette.background.default,
				WebkitBackdropFilter: "none",
				backdropFilter: "none"
			})
		} }
	}
};
const DefaultTheme = (0, __wso2_oxygen_ui.createOxygenTheme)(DefaultThemeConfig, __wso2_oxygen_ui.OxygenTheme);
var DefaultTheme_default = DefaultTheme;

//#endregion
//#region src/api/useGetLayouts.ts
/**
* Custom hook to fetch the list of layout configurations from the server.
*
* @param params - Optional query parameters
* @param params.limit - Maximum number of records to return (default: 30)
* @param params.offset - Number of records to skip for pagination (default: 0)
* @returns TanStack Query result object with layout list data
*/
function useGetLayouts(params) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit = 30, offset = 0 } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [design_query_keys_default.LAYOUTS, {
			limit,
			offset
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const queryParams = new URLSearchParams({
				limit: limit.toString(),
				offset: offset.toString()
			});
			return (await http.request({
				url: `${serverUrl}/design/layouts?${queryParams.toString()}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
//#region src/api/useGetLayout.ts
/**
* Custom hook to fetch a single layout configuration by ID from the server.
*
* @param layoutId - The unique identifier of the layout configuration
* @returns TanStack Query result object with layout data
*/
function useGetLayout(layoutId) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [design_query_keys_default.LAYOUT, layoutId],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/design/layouts/${layoutId}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(layoutId)
	});
}

//#endregion
//#region src/api/useCreateLayout.ts
/**
* Custom hook to create a new layout configuration in the server.
*
* @returns TanStack Query mutation object for creating layout configurations
*/
function useCreateLayout() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (layoutData) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/design/layouts`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data: layoutData
			})).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.LAYOUTS] }).catch(() => {});
		}
	});
}

//#endregion
//#region src/api/useUpdateLayout.ts
/**
* Custom hook to update an existing layout configuration in the server.
*
* @returns TanStack Query mutation object for updating layout configurations
*/
function useUpdateLayout() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async ({ layoutId, data }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/design/layouts/${layoutId}`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				data
			})).data;
		},
		onSuccess: (_, { layoutId }) => {
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.LAYOUT, layoutId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.LAYOUTS] }).catch(() => {});
		}
	});
}

//#endregion
//#region src/api/useDeleteLayout.ts
/**
* Custom hook to delete a layout configuration from the server.
*
* @returns TanStack Query mutation object for deleting layout configurations
*/
function useDeleteLayout() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (layoutId) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/design/layouts/${layoutId}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_, layoutId) => {
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.LAYOUT, layoutId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [design_query_keys_default.LAYOUTS] }).catch(() => {});
		}
	});
}

//#endregion
//#region src/api/useGetDesignResolve.ts
/**
* Custom hook to resolve design configuration by type and ID from the server.
* Uses the /design/resolve endpoint to fetch the merged theme and layout
* based on application or organizational unit.
*
* @param params - Object containing type ('APP' or 'OU') and id of the entity
* @param options - Optional React Query configuration options
* @returns TanStack Query result object with resolved design data
*/
function useGetDesignResolve(params, options) {
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const isEnabled = options?.enabled ?? Boolean(params?.type && params?.id && params.id.trim().length > 0);
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [
			design_query_keys_default.DESIGN_RESOLVE,
			params.type,
			params.id
		],
		queryFn: async () => {
			const requestUrl = `${getServerUrl()}/design/resolve?${new URLSearchParams({
				type: params.type,
				id: params.id
			}).toString()}`;
			const response = await fetch(requestUrl, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			return response.json();
		},
		enabled: isEnabled,
		retry: false
	});
}

//#endregion
//#region src/constants/fonts.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* Common browser-safe / system fonts that do not require loading from Google Fonts.
* Used by GoogleFontLoader to skip loading and by the theme builder as autocomplete suggestions.
*/
const BROWSER_SAFE_FONTS = [
	"Arial",
	"Arial Black",
	"Brush Script MT",
	"Comic Sans MS",
	"Courier New",
	"Georgia",
	"Helvetica",
	"Impact",
	"Lucida Console",
	"Lucida Sans Unicode",
	"Palatino Linotype",
	"system-ui",
	"Tahoma",
	"Times New Roman",
	"Trebuchet MS",
	"Verdana"
];
/** Lowercase set derived from BROWSER_SAFE_FONTS plus generic CSS font families. */
const SYSTEM_FONTS = new Set([
	...BROWSER_SAFE_FONTS.map((f) => f.toLowerCase()),
	"sans-serif",
	"serif",
	"monospace",
	"cursive",
	"fantasy"
]);

//#endregion
//#region src/contexts/Design/DesignContext.tsx
/**
* React context for accessing design configuration throughout the application.
*
* This context provides access to the design data loaded from the server, resolved theme,
* and layout configuration. It should be used within a `DesignProvider` component.
*
* @public
*/
const DesignContext = (0, react.createContext)(void 0);
var DesignContext_default = DesignContext;

//#endregion
//#region src/models/design.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* Enumeration of supported design resolution types.
* Used to specify the type of entity for which design configuration should be resolved.
*/
const DesignResolveType = {
	APP: "APP",
	OU: "OU"
};

//#endregion
//#region src/contexts/Design/DesignProvider.tsx
/**
* React context provider component that provides design configuration
* to all child components.
*
* This component loads design data from the server using the client UUID
* and provides it through React context. Theme transformation is handled
* at the hook level via useDesign().
*
* @param props - The component props
* @param props.children - React children to be wrapped with the design context
*
* @returns JSX element that provides design context to children
*
* @public
*/
function DesignProvider({ children = null, design: externalDesign = void 0, shouldResolveDesignInternally = true, isLoading: isExternalLoading = false }) {
	const { getClientUuid } = (0, __thunderid_contexts.useConfig)();
	const clientUuid = getClientUuid();
	const shouldLoadDesign = shouldResolveDesignInternally && !externalDesign && Boolean(clientUuid && clientUuid.trim().length > 0);
	const { data: resolvedDesign, isLoading, error } = useGetDesignResolve({
		id: clientUuid ?? "",
		type: DesignResolveType.APP
	}, { enabled: shouldLoadDesign });
	const design = externalDesign ?? resolvedDesign;
	const contextValue = (0, react.useMemo)(() => ({
		design,
		isDesignEnabled: Boolean(design) && (!(0, __thunderid_utils.isEmpty)(design?.theme) || !(0, __thunderid_utils.isEmpty)(design?.layout)),
		isLoading: isExternalLoading || (externalDesign ? false : isLoading),
		error: externalDesign ? null : error,
		theme: void 0,
		layout: (0, __thunderid_utils.isEmpty)(design?.layout) ? void 0 : design?.layout
	}), [
		design,
		externalDesign,
		isLoading,
		error,
		isExternalLoading
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DesignContext_default.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
//#region src/contexts/Design/useDesign.tsx
/**
* React hook for accessing design configuration throughout the application.
*
* This hook provides access to the design data loaded from the server, resolved theme,
* and layout configuration. It must be used within a component tree wrapped by
* `DesignProvider`, otherwise it will throw an error.
*
* @param baseTheme - Optional base theme to extend from. If provided, overrides the provider's baseTheme
* @returns The design context containing design data and resolved theme/layout
*
* @throws {Error} Throws an error if used outside of DesignProvider
*
* @public
*/
function useDesign(baseTheme) {
	const context = (0, react.useContext)(DesignContext_default);
	if (context === void 0) throw new Error("useDesign must be used within a DesignProvider");
	const transformedTheme = (0, react.useMemo)(() => {
		if (baseTheme && !(0, __thunderid_utils.isEmpty)(context.design?.theme)) {
			const themeOptions = (0, __thunderid_utils.merge)({ ...context.design?.theme }, { colorSchemeSelector: "data-color-scheme" });
			if (themeOptions["defaultColorScheme"] === "system") delete themeOptions["defaultColorScheme"];
			return (0, __wso2_oxygen_ui.extendTheme)(themeOptions);
		}
		return baseTheme;
	}, [baseTheme, context.design?.theme]);
	return (0, react.useMemo)(() => ({
		...context,
		theme: transformedTheme
	}), [context, transformedTheme]);
}

//#endregion
//#region src/components/GoogleFontLoader.tsx
/** CSS variable set by the ThunderID SDK when design data includes a custom font. */
const THUNDERID_FONT_CSS_VAR = "--thunderid-typography-fontFamily";
/** MUI class selectors that set their own font-family via CSS-in-JS. */
const MUI_FONT_SELECTORS = [
	"body",
	".MuiTypography-root",
	".MuiInputBase-root",
	".MuiInputBase-input",
	".MuiButton-root",
	".MuiFormLabel-root",
	".MuiMenuItem-root",
	".MuiSelect-select",
	".MuiChip-label"
].join(", ");
/**
* Component that ensures the correct font is loaded and applied when the design
* theme specifies a custom font family.
*
* It performs two tasks:
* 1. Injects a CSS override referencing `var(--thunderid-typography-fontFamily)`
*    so MUI components use the design font instead of the theme default.
*    By using the CSS variable directly (rather than reading its value in JS),
*    there are no timing issues with the ThunderID SDK setting it.
* 2. Watches for the CSS variable to be set, then loads the Google Font if needed.
*/
function GoogleFontLoader({ fontFamily: fontFamilyProp = void 0, targetDocument = void 0 }) {
	const { config } = (0, __thunderid_contexts.useConfig)();
	const idPrefix = config.brand.product_name.toLowerCase().replace(/\s+/g, "-");
	const fontLinkId = `${idPrefix}-google-font`;
	const fontOverrideId = `${idPrefix}-font-override`;
	(0, react.useEffect)(() => {
		const doc = targetDocument ?? document;
		const style = doc.createElement("style");
		style.id = fontOverrideId;
		if (fontFamilyProp) style.textContent = `${MUI_FONT_SELECTORS} { font-family: ${fontFamilyProp}, sans-serif !important; }`;
		else style.textContent = `${MUI_FONT_SELECTORS} { font-family: var(${THUNDERID_FONT_CSS_VAR}), sans-serif !important; }`;
		doc.getElementById(fontOverrideId)?.remove();
		doc.head.appendChild(style);
		return () => {
			doc.getElementById(fontOverrideId)?.remove();
		};
	}, [
		fontFamilyProp,
		fontOverrideId,
		targetDocument
	]);
	(0, react.useEffect)(() => {
		if (fontFamilyProp) return loadGoogleFont(fontLinkId, fontFamilyProp, targetDocument);
		const doc = targetDocument ?? document;
		let cancelled = false;
		let cleanup;
		const tryLoad = () => {
			const value = getComputedStyle(doc.documentElement).getPropertyValue(THUNDERID_FONT_CSS_VAR).trim();
			if (value) {
				cleanup = loadGoogleFont(fontLinkId, value, targetDocument);
				return true;
			}
			return false;
		};
		if (!tryLoad()) {
			const observer = new MutationObserver(() => {
				if (!cancelled && tryLoad()) observer.disconnect();
			});
			observer.observe(doc.documentElement, {
				attributes: true,
				attributeFilter: ["style"]
			});
			const timer = setTimeout(() => {
				observer.disconnect();
			}, 1e4);
			return () => {
				cancelled = true;
				observer.disconnect();
				clearTimeout(timer);
				cleanup?.();
			};
		}
		return cleanup;
	}, [
		fontFamilyProp,
		fontLinkId,
		targetDocument
	]);
	return null;
}
/**
* Injects a Google Font `<link>` for the given font family if it isn't a system font.
* Returns a cleanup function that removes the link.
*/
function loadGoogleFont(fontLinkId, fontFamily, targetDocument) {
	const primaryFont = fontFamily.split(",")[0].trim().replace(/['"]/g, "");
	if (!primaryFont || SYSTEM_FONTS.has(primaryFont.toLowerCase())) return;
	const doc = targetDocument ?? document;
	doc.getElementById(fontLinkId)?.remove();
	const link = doc.createElement("link");
	link.id = fontLinkId;
	link.rel = "stylesheet";
	link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(primaryFont)}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
	doc.head.appendChild(link);
	return () => {
		doc.getElementById(fontLinkId)?.remove();
	};
}

//#endregion
//#region src/utils/cssSanitizer.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function normalizeForSanitization(css) {
	let normalized = css.replace(/\/\*[\s\S]*?\*\//g, "");
	normalized = normalized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
	normalized = normalized.replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_match, hex) => {
		const codePoint = parseInt(hex, 16);
		if (codePoint > 1114111) return "";
		return String.fromCodePoint(codePoint);
	});
	return normalized;
}
/**
* Sanitizes inline CSS content by removing potentially dangerous constructs.
* First normalizes the CSS to defeat obfuscation (comments, unicode escapes, null bytes),
* then strips known dangerous patterns.
*
* @param css - The raw CSS string to sanitize
* @returns The sanitized CSS string
*/
function sanitizeCss(css) {
	let sanitized = normalizeForSanitization(css);
	sanitized = sanitized.replace(/expression\s*\([^)]*\)/gi, "");
	sanitized = sanitized.replace(/javascript\s*:/gi, "");
	sanitized = sanitized.replace(/url\s*\(\s*['"]?\s*(data|javascript)\s*:/gi, "url(about:");
	sanitized = sanitized.replace(/@import\s+[^;]+;/gi, "");
	sanitized = sanitized.replace(/@charset\s+[^;]+;/gi, "");
	sanitized = sanitized.replace(/(^|[{;]\s*)-moz-binding\s*:[^;]+;?/gi, "$1");
	sanitized = sanitized.replace(/(^|[{;]\s*)behavior\s*:[^;]+;?/gi, "$1");
	return sanitized;
}
/**
* Validates that a stylesheet URL uses the https or http protocol.
*
* @param href - The URL to validate
* @returns True if the URL is valid for stylesheet loading
*/
function isValidStylesheetUrl(href) {
	try {
		const url = new URL(href);
		return url.protocol === "https:" || url.protocol === "http:";
	} catch {
		return false;
	}
}
/**
* Checks whether a stylesheet URL uses insecure http instead of https.
*
* @param href - The URL to check
* @returns True if the URL uses http://
*/
function isInsecureStylesheetUrl(href) {
	try {
		return new URL(href).protocol === "http:";
	} catch {
		return false;
	}
}

//#endregion
//#region src/components/StylesheetInjector.tsx
const logger = (0, __thunderid_logger.createLogger)({ component: "StylesheetInjector" });
/**
* Component that injects stylesheets from the layout head configuration into the document head.
*
* Supports two stylesheet types:
* - inline: Injects a style element with sanitized CSS content
* - url: Injects a link rel="stylesheet" element (https only)
*
* Stylesheets are identified by their id field, prefixed with "<PRODUCT_NAME>-stylesheet-"
* to avoid DOM ID collisions. Elements are cleaned up on unmount or when the stylesheet
* list changes.
*/
function StylesheetInjector({ stylesheets = void 0 }) {
	const { config } = (0, __thunderid_contexts.useConfig)();
	const { layout } = useDesign();
	const resolvedStylesheets = stylesheets ?? layout?.head?.stylesheets ?? [];
	const idPrefix = config.brand.product_name.toLowerCase().replace(/\s+/g, "-");
	const elementIdPrefix = `${idPrefix}-stylesheet-`;
	const dataAttr = `data-${idPrefix}-custom`;
	const serialized = JSON.stringify(resolvedStylesheets);
	(0, react.useEffect)(() => {
		const parsed = JSON.parse(serialized);
		const injectedIds = [];
		parsed.forEach((stylesheet) => {
			const elementId = `${elementIdPrefix}${stylesheet.id}`;
			document.getElementById(elementId)?.remove();
			if (stylesheet.type === "inline") {
				const style = document.createElement("style");
				style.id = elementId;
				style.setAttribute(dataAttr, "true");
				style.textContent = sanitizeCss(stylesheet.content);
				document.head.appendChild(style);
				injectedIds.push(elementId);
			} else if (stylesheet.type === "url") if (isValidStylesheetUrl(stylesheet.href)) {
				const link = document.createElement("link");
				link.id = elementId;
				link.rel = "stylesheet";
				link.href = stylesheet.href;
				link.setAttribute(dataAttr, "true");
				document.head.appendChild(link);
				injectedIds.push(elementId);
			} else logger.warn(`[StylesheetInjector] Skipping stylesheet "${stylesheet.id}": URL must use https protocol`);
		});
		return () => {
			injectedIds.forEach((id) => document.getElementById(id)?.remove());
		};
	}, [
		dataAttr,
		elementIdPrefix,
		serialized
	]);
	return null;
}

//#endregion
//#region src/components/flow/AuthCardLayout.tsx
const StyledPaper = (0, __wso2_oxygen_ui.styled)(__wso2_oxygen_ui.Paper)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	[theme.breakpoints.up("sm")]: { width: "450px" }
}));
function AuthCardLayout({ variant = void 0, logo = void 0, showLogo = true, logoDisplay = {
	xs: "flex",
	md: "none"
}, children }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		gap: 2,
		className: variant ? (0, __thunderid_utils.cn)(`${variant}--root`) : void 0,
		children: [showLogo && logo && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ColorSchemeImage, {
			className: variant ? (0, __thunderid_utils.cn)(`${variant}--logo`) : void 0,
			src: logo.src,
			alt: logo.alt ?? {
				light: "Logo (Light)",
				dark: "Logo (Dark)"
			},
			height: 40,
			width: "auto",
			sx: { display: logoDisplay }
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StyledPaper, {
			variant: "outlined",
			className: variant ? (0, __thunderid_utils.cn)(`${variant}--paper`) : void 0,
			children
		})]
	});
}

//#endregion
//#region src/components/flow/AuthPageLayout.tsx
/**
* Shared page-level layout for authentication screens (sign-in, sign-up, accept-invite).
*
* Provides the full-page centering structure used by the Gate app. Both the Gate and
* Console preview render this component so they are visually identical.
*/
function AuthPageLayout({ isLoading, variant = void 0, background = void 0, children }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		component: "main",
		className: variant ? (0, __thunderid_utils.cn)(`${variant}--root`) : void 0,
		sx: [{
			justifyContent: "center",
			height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
			minHeight: "100%",
			...background ? { backgroundColor: background } : {}
		}],
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
			direction: {
				xs: "row-reverse",
				md: "row"
			},
			sx: {
				justifyContent: "center",
				gap: {
					xs: 6,
					sm: 12
				},
				p: 2,
				mx: "auto"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
				direction: {
					xs: "column",
					md: "row"
				},
				sx: {
					justifyContent: "center",
					gap: {
						xs: 4,
						sm: 16
					},
					p: {
						xs: 2,
						sm: 4
					},
					m: "auto"
				},
				children: isLoading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, {}) : children
			})
		})
	});
}

//#endregion
//#region src/components/flow/adapters/DividerAdapter.tsx
function DividerAdapter({ component, resolve }) {
	const { t } = (0, react_i18next.useTranslation)();
	const label = resolve(component.label);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {
		className: (0, __thunderid_utils.cn)("Flow--divider", "Divider--root"),
		orientation: component.variant === "VERTICAL" ? "vertical" : "horizontal",
		sx: { my: 2 },
		children: label ? t(label) : void 0
	});
}

//#endregion
//#region src/components/flow/adapters/OtpInputAdapter.tsx
const OTP_LENGTH = 6;
function OtpInputAdapter({ component, values, touched, fieldErrors, isLoading, resolve, onInputChange }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { ref } = component;
	if (!ref || typeof ref !== "string") return null;
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const otpDigits = (values[ref] ?? "").padEnd(OTP_LENGTH, " ").split("").slice(0, OTP_LENGTH);
	const focusDigit = (idx) => {
		document.querySelector(`input[aria-label="OTP digit ${idx + 1}"]`)?.focus();
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
		required: component.required,
		className: (0, __thunderid_utils.cn)("Flow--otpInput", "FormControl--root"),
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: ref,
				className: (0, __thunderid_utils.cn)("Label--root"),
				children: t(resolve(component.label))
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					gap: 1,
					justifyContent: "center",
					mt: 1
				},
				children: otpDigits.map((digit, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					className: (0, __thunderid_utils.cn)("TextField--root"),
					slotProps: { htmlInput: {
						maxLength: 1,
						style: {
							textAlign: "center",
							fontSize: "1.5rem"
						},
						"aria-label": `OTP digit ${idx + 1}`
					} },
					value: digit.trim(),
					onChange: (e) => {
						const { value } = e.target;
						if (!/^\d*$/.test(value)) return;
						onInputChange(ref, otpDigits.map((d, i) => i === idx ? value : d).join(""));
						if (value && idx < OTP_LENGTH - 1) focusDigit(idx + 1);
					},
					onKeyDown: (e) => {
						if (e.key === "Backspace" && !otpDigits[idx].trim() && idx > 0) focusDigit(idx - 1);
					},
					onPaste: (e) => {
						e.preventDefault();
						const digits = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, OTP_LENGTH);
						onInputChange(ref, digits);
						focusDigit(Math.min(digits.length, OTP_LENGTH - 1));
					},
					error: hasError,
					disabled: isLoading,
					variant: "outlined",
					sx: {
						width: 48,
						"& input": { padding: "12px 8px" }
					}
				}, `${ref}-otp-${idx}`))
			}),
			hasError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "error",
				sx: {
					mt: .5,
					ml: 1.75
				},
				children: fieldErrors?.[ref]
			})
		]
	});
}

//#endregion
//#region src/components/flow/adapters/PasswordInputAdapter.tsx
function PasswordInputAdapter({ component, values, touched, fieldErrors, isLoading, resolve, onInputChange, passwordAutoComplete = "current-password" }) {
	const { t } = (0, react_i18next.useTranslation)();
	const [showPassword, setShowPassword] = (0, react.useState)(false);
	const { ref } = component;
	if (!ref || typeof ref !== "string") return null;
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const value = values[ref] ?? "";
	const autoComplete = ref === "password" ? passwordAutoComplete ?? "current-password" : "off";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
		required: component.required,
		className: (0, __thunderid_utils.cn)("Flow--passwordInput", "FormControl--root"),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
			htmlFor: ref,
			className: (0, __thunderid_utils.cn)("Label--root"),
			children: t(resolve(component.label))
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
			fullWidth: true,
			className: (0, __thunderid_utils.cn)("TextField--root"),
			id: ref,
			name: ref,
			type: showPassword ? "text" : "password",
			placeholder: t(resolve(component.placeholder) ?? component.placeholder ?? ""),
			autoComplete,
			required: component.required,
			variant: "outlined",
			disabled: isLoading,
			error: hasError,
			helperText: hasError ? fieldErrors?.[ref] : void 0,
			color: hasError ? "error" : "primary",
			value,
			onChange: (e) => onInputChange(ref, e.target.value),
			slotProps: { input: { endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
				position: "end",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					className: (0, __thunderid_utils.cn)("IconButton--root", "PasswordInput--toggle"),
					"aria-label": "toggle password visibility",
					onClick: () => setShowPassword((prev) => !prev),
					edge: "end",
					disabled: isLoading,
					children: showPassword ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Eye, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.EyeClosed, {})
				})
			}) } }
		})]
	});
}

//#endregion
//#region src/components/flow/adapters/RichTextAdapter.tsx
/** The meta key used by the server to embed the application's sign-up URL. */
const SIGN_UP_URL_META_KEY = "application.sign_up_url";
/** The meta key used by the server to embed the application's sign-in URL. */
const SIGN_IN_URL_META_KEY = "application.sign_in_url";
/** The meta key used by the server to embed the application's forgot-password URL. */
const FORGOT_PASSWORD_URL_META_KEY = "application.forgot_password_url";
/** The meta key used by the server to embed the application's access URL. */
const APPLICATION_URL_META_KEY = "application.url";
const REGISTRATION_ENABLED_META_KEY = "isRegistrationFlowEnabled";
const RECOVERY_ENABLED_META_KEY = "isRecoveryFlowEnabled";
function RichTextAdapter({ component, resolve, signUpFallbackUrl = void 0, signInFallbackUrl = void 0, forgotPasswordFallbackUrl = void 0 }) {
	const { isDesignEnabled } = useDesign();
	const rawLabel = typeof component.label === "string" ? component.label : void 0;
	if (rawLabel && (0, __thunderid_utils.containsMetaTemplate)(rawLabel, SIGN_UP_URL_META_KEY)) {
		if (!(resolve(`{{meta(${REGISTRATION_ENABLED_META_KEY})}}`) === "true")) return null;
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if ((0, __thunderid_utils.containsMetaTemplate)(resolvedLabel$1, SIGN_UP_URL_META_KEY) && signUpFallbackUrl) resolvedLabel$1 = (0, __thunderid_utils.replaceMetaTemplate)(resolvedLabel$1, SIGN_UP_URL_META_KEY, signUpFallbackUrl);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			className: (0, __thunderid_utils.cn)("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: dompurify.default.sanitize(resolvedLabel$1) }
		});
	}
	if (rawLabel && (0, __thunderid_utils.containsMetaTemplate)(rawLabel, FORGOT_PASSWORD_URL_META_KEY)) {
		if (!(resolve(`{{meta(${RECOVERY_ENABLED_META_KEY})}}`) === "true")) return null;
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if ((0, __thunderid_utils.containsMetaTemplate)(resolvedLabel$1, FORGOT_PASSWORD_URL_META_KEY) && forgotPasswordFallbackUrl) resolvedLabel$1 = (0, __thunderid_utils.replaceMetaTemplate)(resolvedLabel$1, FORGOT_PASSWORD_URL_META_KEY, forgotPasswordFallbackUrl);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			className: (0, __thunderid_utils.cn)("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: dompurify.default.sanitize(resolvedLabel$1) }
		});
	}
	if (rawLabel && (0, __thunderid_utils.containsMetaTemplate)(rawLabel, SIGN_IN_URL_META_KEY)) {
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if ((0, __thunderid_utils.containsMetaTemplate)(resolvedLabel$1, SIGN_IN_URL_META_KEY) && signInFallbackUrl) resolvedLabel$1 = (0, __thunderid_utils.replaceMetaTemplate)(resolvedLabel$1, SIGN_IN_URL_META_KEY, signInFallbackUrl);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			className: (0, __thunderid_utils.cn)("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: dompurify.default.sanitize(resolvedLabel$1) }
		});
	}
	if (rawLabel && (0, __thunderid_utils.containsMetaTemplate)(rawLabel, APPLICATION_URL_META_KEY)) {
		const resolvedUrl = resolve(`{{meta(${APPLICATION_URL_META_KEY})}}`);
		if (!resolvedUrl || (0, __thunderid_utils.containsMetaTemplate)(resolvedUrl, APPLICATION_URL_META_KEY)) return null;
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if ((0, __thunderid_utils.containsMetaTemplate)(resolvedLabel$1, APPLICATION_URL_META_KEY)) resolvedLabel$1 = (0, __thunderid_utils.replaceMetaTemplate)(resolvedLabel$1, APPLICATION_URL_META_KEY, resolvedUrl);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			className: (0, __thunderid_utils.cn)("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: dompurify.default.sanitize(resolvedLabel$1) }
		});
	}
	const resolvedLabel = resolve(rawLabel);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		className: (0, __thunderid_utils.cn)("Flow--richText"),
		sx: {
			mb: 1,
			textAlign: isDesignEnabled ? "center" : "left"
		},
		dangerouslySetInnerHTML: { __html: dompurify.default.sanitize(resolvedLabel ?? rawLabel ?? "") }
	});
}

//#endregion
//#region src/components/flow/adapters/SelectAdapter.tsx
function getOptionValue(option) {
	if (typeof option === "string") return option;
	if (typeof option === "object" && option !== null && "value" in option) {
		const { value } = option;
		if (typeof value === "string") return value;
		return JSON.stringify(value ?? option);
	}
	return JSON.stringify(option);
}
function getOptionLabel(option) {
	if (typeof option === "string") return option;
	if (typeof option === "object" && option !== null && "label" in option) {
		const { label } = option;
		if (typeof label === "string") return label;
		return JSON.stringify(label ?? option);
	}
	return JSON.stringify(option);
}
function SelectAdapter({ component, values, touched, fieldErrors, isLoading, resolve, onInputChange }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { ref, options, hint } = component;
	if (!ref || typeof ref !== "string" || !options) return null;
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const value = values[ref] ?? "";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
		fullWidth: true,
		className: (0, __thunderid_utils.cn)("Flow--select", "FormControl--root"),
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: ref,
				className: (0, __thunderid_utils.cn)("Label--root"),
				children: t(resolve(component.label))
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
				displayEmpty: true,
				size: "small",
				className: (0, __thunderid_utils.cn)("Select--root"),
				id: ref,
				name: ref,
				required: component.required,
				fullWidth: true,
				disabled: isLoading,
				error: hasError,
				value,
				onChange: (e) => onInputChange(ref, e.target.value),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
					value: "",
					disabled: true,
					children: t(resolve(component.placeholder) ?? "Select an option")
				}), options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
					value: getOptionValue(option),
					children: getOptionLabel(option)
				}, getOptionValue(option)))]
			}),
			hasError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "error.main",
				sx: { mt: .5 },
				children: fieldErrors?.[ref]
			}),
			hint && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "text.secondary",
				children: hint
			})
		]
	});
}

//#endregion
//#region src/components/flow/adapters/TextInputAdapter.tsx
const HTML_INPUT_TYPE = {
	TEXT_INPUT: "text",
	EMAIL_INPUT: "email",
	PHONE_INPUT: "tel"
};
const AUTO_COMPLETE_MAP = {
	TEXT_INPUT: (ref) => {
		if (ref === "username") return "username";
		if (ref === "email") return "email";
		return "off";
	},
	EMAIL_INPUT: () => "email",
	PHONE_INPUT: () => "tel"
};
function resolveTextVariant(type) {
	if (type === "EMAIL_INPUT") return "EMAIL_INPUT";
	if (type === "PHONE_INPUT") return "PHONE_INPUT";
	return "TEXT_INPUT";
}
function TextInputAdapter({ component, values, touched, fieldErrors, isLoading, resolve, onInputChange }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { ref } = component;
	if (!ref || typeof ref !== "string") return null;
	const variant = resolveTextVariant(String(component.type));
	const htmlType = HTML_INPUT_TYPE[variant];
	const autoComplete = AUTO_COMPLETE_MAP[variant](ref);
	const autoFocus = ref === "username";
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const value = values[ref] ?? "";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
		required: component.required,
		className: (0, __thunderid_utils.cn)("Flow--textInput", "FormControl--root"),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
			htmlFor: ref,
			className: (0, __thunderid_utils.cn)("Label--root"),
			children: t(resolve(component.label))
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
			fullWidth: true,
			className: (0, __thunderid_utils.cn)("TextField--root"),
			id: ref,
			name: ref,
			type: htmlType,
			placeholder: t(resolve(component.placeholder) ?? component.placeholder ?? ""),
			autoComplete,
			autoFocus,
			required: component.required,
			variant: "outlined",
			disabled: isLoading,
			error: hasError,
			helperText: hasError ? fieldErrors?.[ref] : void 0,
			color: hasError ? "error" : "primary",
			value,
			onChange: (e) => onInputChange(ref, e.target.value)
		})]
	});
}

//#endregion
//#region src/utils/getIntegrationIcon.tsx
/**
* Get the identity provider icon component based on the label or image URL/path.
*
* Returns the appropriate icon component by analyzing either the label text or image path/URL.
* Supports common social login providers like Google and GitHub.
*
* @param label - The label text that identifies the identity provider (e.g., 'Continue with Google', 'Google')
* @param image - The image URL or path that identifies the identity provider (e.g., 'assets/images/icons/google.svg')
* @returns The corresponding JSX icon component, or `null` if the provider cannot be identified
*/
const getIntegrationIcon = (label, image) => {
	if (label.includes("google") || image.includes("google")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Google, {});
	if (label.includes("github") || image.includes("github")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.GitHub, {});
	return null;
};
var getIntegrationIcon_default = getIntegrationIcon;

//#endregion
//#region src/components/flow/adapters/BlockAdapter.tsx
function SubmitButtonAdapter({ component, isLoading, resolve, onClick = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		type: onClick ? "button" : "submit",
		fullWidth: true,
		className: (0, __thunderid_utils.cn)("Flow--submitButton", "Button--root", component.variant === "PRIMARY" ? "Button--primary" : "Button--outlined"),
		variant: component.variant === "PRIMARY" ? "contained" : "outlined",
		disabled: isLoading,
		onClick,
		sx: { mt: 2 },
		children: t(resolve(component.label))
	});
}
function ResendButtonAdapter({ component, isLoading, resolve }) {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		type: "submit",
		fullWidth: true,
		className: (0, __thunderid_utils.cn)("Flow--resendButton", "Button--root"),
		variant: "text",
		disabled: isLoading,
		sx: { mt: 1 },
		children: t(resolve(component.label))
	});
}
function TriggerButtonAdapter({ component, isLoading, resolve, onSubmit, values, blockComponents = void 0, onValidate = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const resolvedStartIcon = resolve(component.startIcon ?? component.image ?? "");
	const iconElement = resolvedStartIcon && /^https?:\/\//i.test(resolvedStartIcon) ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		component: "img",
		src: resolvedStartIcon,
		sx: {
			width: 20,
			height: 20,
			objectFit: "contain"
		}
	}) : getIntegrationIcon_default(String(component.label ?? ""), resolvedStartIcon ?? "");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		fullWidth: true,
		className: (0, __thunderid_utils.cn)("Flow--triggerButton", "Button--root", component.variant === "PRIMARY" ? "Button--primary" : "Button--secondary"),
		variant: component.variant === "PRIMARY" ? "contained" : "outlined",
		disabled: isLoading,
		startIcon: iconElement,
		onClick: () => {
			if (onValidate && blockComponents && !onValidate(blockComponents)) return;
			onSubmit(component, values);
		},
		children: t(resolve(component.label))
	});
}
function renderFormSubComponent(subComponent, compIndex, ctx) {
	const sub = subComponent;
	const fieldProps = {
		component: sub,
		values: ctx.values,
		touched: ctx.touched,
		fieldErrors: ctx.fieldErrors,
		isLoading: ctx.isLoading,
		resolve: ctx.resolve,
		onInputChange: ctx.onInputChange
	};
	if (sub.type === __thunderid_react.EmbeddedFlowComponentType.TextInput || sub.type === "TEXT_INPUT" || sub.type === "EMAIL_INPUT" || sub.type === "PHONE_INPUT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextInputAdapter, { ...fieldProps }, sub.id ?? compIndex);
	if (sub.type === __thunderid_react.EmbeddedFlowComponentType.PasswordInput || sub.type === "PASSWORD_INPUT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PasswordInputAdapter, {
		...fieldProps,
		passwordAutoComplete: ctx.passwordAutoComplete ?? "current-password"
	}, sub.id ?? compIndex);
	if (sub.type === "OTP_INPUT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OtpInputAdapter, { ...fieldProps }, sub.id ?? compIndex);
	if (sub.type === "SELECT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SelectAdapter, { ...fieldProps }, sub.id ?? compIndex);
	if (sub.type === "RICH_TEXT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RichTextAdapter, {
		component: sub,
		resolve: ctx.resolve,
		signUpFallbackUrl: ctx.signUpFallbackUrl,
		signInFallbackUrl: ctx.signInFallbackUrl,
		forgotPasswordFallbackUrl: ctx.forgotPasswordFallbackUrl
	}, sub.id ?? compIndex);
	if (sub.type === __thunderid_react.EmbeddedFlowComponentType.Action && sub.eventType === __thunderid_react.EmbeddedFlowEventType.Submit) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SubmitButtonAdapter, {
		component: sub,
		isLoading: ctx.isLoading,
		resolve: ctx.resolve,
		onClick: ctx.hasMultipleSubmits && sub.id !== ctx.primarySubmitId ? () => {
			if (ctx.onValidate && ctx.blockComponents && !ctx.onValidate(ctx.blockComponents)) return;
			ctx.onSubmit(sub, ctx.values);
		} : void 0
	}, sub.id ?? compIndex);
	if (sub.type === "RESEND" && sub.eventType === __thunderid_react.EmbeddedFlowEventType.Submit) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ResendButtonAdapter, {
		component: sub,
		isLoading: ctx.isLoading,
		resolve: ctx.resolve
	}, sub.id ?? compIndex);
	if (sub.type === __thunderid_react.EmbeddedFlowComponentType.Action && sub.eventType === __thunderid_react.EmbeddedFlowEventType.Trigger) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TriggerButtonAdapter, {
		component: sub,
		isLoading: ctx.isLoading,
		resolve: ctx.resolve,
		onSubmit: ctx.onSubmit,
		values: ctx.values,
		blockComponents: ctx.blockComponents,
		onValidate: ctx.onValidate
	}, sub.id ?? compIndex);
	if (sub.type === "DIVIDER") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DividerAdapter, {
		component: sub,
		resolve: ctx.resolve
	}, sub.id ?? compIndex);
	return null;
}
function FormBlockAdapter({ component, index,...ctx }) {
	const blockComponents = component.components ?? [];
	const submitActions = blockComponents.filter((c) => c.type === __thunderid_react.EmbeddedFlowComponentType.Action && c.eventType === __thunderid_react.EmbeddedFlowEventType.Submit);
	const hasMultipleSubmits = submitActions.length > 1;
	const primarySubmit = submitActions.find((c) => c.variant === "PRIMARY") ?? submitActions[0];
	const handleSubmit = (event) => {
		event.preventDefault();
		if (ctx.onValidate && !ctx.onValidate(blockComponents)) return;
		if (primarySubmit) ctx.onSubmit(primarySubmit, ctx.values);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		component: "form",
		className: (0, __thunderid_utils.cn)("Flow--form"),
		onSubmit: handleSubmit,
		noValidate: true,
		sx: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			gap: 2
		},
		children: blockComponents.map((subComponent, compIndex) => renderFormSubComponent(subComponent, compIndex, {
			...ctx,
			blockComponents,
			hasMultipleSubmits,
			primarySubmitId: primarySubmit?.id
		}))
	}, component.id ?? index);
}
function TriggerBlockAdapter({ component, index,...ctx }) {
	const blockComponents = component.components ?? [];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		className: (0, __thunderid_utils.cn)("Flow--triggerBlock"),
		sx: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			gap: 2,
			mt: 2
		},
		children: blockComponents.map((actionComponent, actionIndex) => {
			const sub = actionComponent;
			if (sub.type === __thunderid_react.EmbeddedFlowComponentType.Action && sub.eventType === __thunderid_react.EmbeddedFlowEventType.Trigger) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TriggerButtonAdapter, {
				component: sub,
				isLoading: ctx.isLoading,
				resolve: ctx.resolve,
				onSubmit: ctx.onSubmit,
				values: ctx.values
			}, sub.id ?? actionIndex);
			if (sub.type === "DIVIDER") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DividerAdapter, {
				component: sub,
				resolve: ctx.resolve
			}, sub.id ?? actionIndex);
			return null;
		})
	}, component.id ?? index);
}
function BlockAdapter({ component, index, blockComponents: outerBlockComponents = void 0, onValidate = void 0,...ctx }) {
	const blockComponents = component.components ?? [];
	const hasSubmit = blockComponents.some((c) => c.type === __thunderid_react.EmbeddedFlowComponentType.Action && c.eventType === __thunderid_react.EmbeddedFlowEventType.Submit || c.type === "RESEND" && c.eventType === __thunderid_react.EmbeddedFlowEventType.Submit);
	const hasTrigger = blockComponents.some((c) => c.type === __thunderid_react.EmbeddedFlowComponentType.Action && c.eventType === __thunderid_react.EmbeddedFlowEventType.Trigger);
	if (hasSubmit) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FormBlockAdapter, {
		component,
		index,
		blockComponents: outerBlockComponents,
		onValidate,
		...ctx
	});
	if (hasTrigger) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TriggerBlockAdapter, {
		component,
		index,
		blockComponents: outerBlockComponents,
		onValidate,
		...ctx
	});
	return null;
}

//#endregion
//#region src/components/flow/adapters/ConsentAdapter.tsx
function isPermissionPurpose(purpose) {
	return purpose.type === "permissions";
}
function groupPermissionsByParent(permissions) {
	const names = new Set(permissions.map((p) => p.name));
	const childrenOf = {};
	const topLevel = [];
	permissions.forEach((p) => {
		if (p.parent && names.has(p.parent)) {
			if (!childrenOf[p.parent]) childrenOf[p.parent] = [];
			childrenOf[p.parent].push(p.name);
		} else topLevel.push(p.name);
	});
	return {
		topLevel,
		childrenOf
	};
}
function isPermissionChecked(formValues, purposeId, name) {
	return formValues[(0, __thunderid_react.getConsentOptionalKey)(purposeId, name)] !== "false";
}
function collectDescendants(name, childrenOf) {
	const out = [];
	(childrenOf[name] ?? []).forEach((child) => {
		out.push(child);
		out.push(...collectDescendants(child, childrenOf));
	});
	return out;
}
function PermissionRow({ purposeId, name, formValues, onInputChange, descendants, depth }) {
	const selfChecked = isPermissionChecked(formValues, purposeId, name);
	const descendantsChecked = descendants.map((c) => isPermissionChecked(formValues, purposeId, c));
	const someDescendantsChecked = descendantsChecked.some(Boolean);
	const allDescendantsChecked = descendants.length > 0 && descendantsChecked.every(Boolean);
	const indeterminate = descendants.length > 0 && someDescendantsChecked && !allDescendantsChecked;
	const displayChecked = descendants.length > 0 ? allDescendantsChecked || selfChecked : selfChecked;
	const handleToggle = (checked) => {
		onInputChange((0, __thunderid_react.getConsentOptionalKey)(purposeId, name), checked ? "true" : "false");
		descendants.forEach((c) => {
			onInputChange((0, __thunderid_react.getConsentOptionalKey)(purposeId, c), checked ? "true" : "false");
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			px: 1,
			pl: 1 + depth * 3
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
			className: (0, __thunderid_utils.cn)("FormControlLabel--root"),
			control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Switch, {
				className: (0, __thunderid_utils.cn)("Switch--root"),
				checked: displayChecked,
				inputProps: { "aria-checked": indeterminate ? "mixed" : displayChecked },
				onChange: (e) => handleToggle(e.target.checked),
				size: "small"
			}),
			label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1.5
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, { sx: {
					width: 6,
					height: 6,
					borderRadius: "50%",
					backgroundColor: "text.disabled",
					flexShrink: 0
				} }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					className: (0, __thunderid_utils.cn)("Text--body2"),
					variant: "body2",
					sx: { fontWeight: 500 },
					children: name
				})]
			}),
			labelPlacement: "start",
			sx: {
				m: 0,
				width: "100%",
				justifyContent: "space-between",
				py: .5
			}
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {
			className: (0, __thunderid_utils.cn)("Divider--root"),
			sx: { opacity: .5 }
		})]
	});
}
function ConsentAdapter({ consentData = void 0, formValues, onInputChange }) {
	if (!consentData) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_react.Consent, {
		consentData,
		formValues,
		onInputChange,
		children: ({ purposes }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			className: (0, __thunderid_utils.cn)("Flow--consent"),
			sx: {
				display: "flex",
				flexDirection: "column",
				gap: 2,
				mt: 1
			},
			children: purposes.map((purpose, idx) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [
				isPermissionPurpose(purpose) && purpose.optional && purpose.optional.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						className: (0, __thunderid_utils.cn)("Text--subtitle2"),
						variant: "subtitle2",
						fontWeight: "bold",
						sx: { mb: .5 },
						children: "Permissions"
					}), (() => {
						const grouped = groupPermissionsByParent(purpose.optional);
						const renderNode = (name, depth) => {
							const direct = grouped.childrenOf[name] ?? [];
							const descendants = collectDescendants(name, grouped.childrenOf);
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PermissionRow, {
								purposeId: purpose.purposeId,
								name,
								formValues,
								onInputChange,
								descendants,
								depth
							}), direct.map((childName) => renderNode(childName, depth + 1))] }, name);
						};
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
							sx: {
								display: "flex",
								flexDirection: "column"
							},
							children: grouped.topLevel.map((name) => renderNode(name, 0))
						});
					})()]
				}),
				!isPermissionPurpose(purpose) && purpose.essential && purpose.essential.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						className: (0, __thunderid_utils.cn)("Text--subtitle2"),
						variant: "subtitle2",
						fontWeight: "bold",
						sx: { mb: .5 },
						children: "Essential Attributes"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_react.ConsentCheckboxList, {
						variant: "ESSENTIAL",
						purpose,
						formValues,
						onInputChange,
						children: ({ attributes, isChecked }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
							sx: {
								display: "flex",
								flexDirection: "column"
							},
							children: attributes.map((attr) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
								sx: { px: 1 },
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
									className: (0, __thunderid_utils.cn)("FormControlLabel--root"),
									control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Switch, {
										className: (0, __thunderid_utils.cn)("Switch--root"),
										checked: isChecked(attr),
										disabled: true,
										size: "small"
									}),
									label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
										sx: {
											display: "flex",
											alignItems: "center",
											gap: 1.5
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, { sx: {
											width: 6,
											height: 6,
											borderRadius: "50%",
											backgroundColor: "text.disabled",
											flexShrink: 0
										} }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
											className: (0, __thunderid_utils.cn)("Text--body2"),
											variant: "body2",
											sx: { fontWeight: 500 },
											children: attr
										})]
									}),
									labelPlacement: "start",
									sx: {
										m: 0,
										width: "100%",
										justifyContent: "space-between",
										py: .5
									}
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {
									className: (0, __thunderid_utils.cn)("Divider--root"),
									sx: { opacity: .5 }
								})]
							}, attr))
						})
					})]
				}),
				!isPermissionPurpose(purpose) && purpose.optional && purpose.optional.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						className: (0, __thunderid_utils.cn)("Text--subtitle2"),
						variant: "subtitle2",
						fontWeight: "bold",
						sx: { mb: .5 },
						children: "Optional Attributes"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_react.ConsentCheckboxList, {
						variant: "OPTIONAL",
						purpose,
						formValues,
						onInputChange,
						children: ({ attributes, isChecked, handleChange }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
							sx: {
								display: "flex",
								flexDirection: "column"
							},
							children: attributes.map((attr) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
								sx: { px: 1 },
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
									className: (0, __thunderid_utils.cn)("FormControlLabel--root"),
									control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Switch, {
										className: (0, __thunderid_utils.cn)("Switch--root"),
										checked: isChecked(attr),
										onChange: (e) => handleChange(attr, e.target.checked),
										size: "small"
									}),
									label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
										sx: {
											display: "flex",
											alignItems: "center",
											gap: 1.5
										},
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, { sx: {
											width: 6,
											height: 6,
											borderRadius: "50%",
											backgroundColor: "text.disabled",
											flexShrink: 0
										} }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
											className: (0, __thunderid_utils.cn)("Text--body2"),
											variant: "body2",
											sx: { fontWeight: 500 },
											children: attr
										})]
									}),
									labelPlacement: "start",
									sx: {
										m: 0,
										width: "100%",
										justifyContent: "space-between",
										py: .5
									}
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {
									className: (0, __thunderid_utils.cn)("Divider--root"),
									sx: { opacity: .5 }
								})]
							}, attr))
						})
					})]
				}),
				idx < purposes.length - 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {
					className: (0, __thunderid_utils.cn)("Divider--root"),
					sx: { mt: 2 }
				})
			] }, purpose.purposeId ?? idx))
		})
	});
}

//#endregion
//#region src/components/flow/adapters/CopyableTextAdapter.tsx
/**
* Adapter component to render a copyable text field within a flow. It displays a label (if provided) and a value
* with a copy-to-clipboard button. The value is sourced from the `additionalData` using the `source` key defined
* in the component configuration. When the copy button is clicked, it attempts to copy the value to the clipboard
* and provides feedback to the user.
*
* @param {CopyableTextAdapterProps} props - The properties for the adapter, including the flow component
* configuration, the resolve function for template strings, and any additional data needed to source the value.
* @returns {JSX.Element} The rendered copyable text field with label and copy button.
*/
function CopyableTextAdapter({ component, resolve, additionalData = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const [copied, setCopied] = (0, react.useState)(false);
	const copyTimeoutRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => () => {
		if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current);
	}, []);
	const sourceKey = component.source;
	const rawValue = sourceKey && additionalData ? additionalData[sourceKey] : void 0;
	const value = typeof rawValue === "string" || typeof rawValue === "number" || typeof rawValue === "boolean" ? String(rawValue) : "";
	const label = component.label ? t(resolve(component.label) ?? component.label) : void 0;
	const handleCopy = (0, react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(value);
		} catch {
			const textArea = document.createElement("textarea");
			textArea.value = value;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
		}
		setCopied(true);
		if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current);
		copyTimeoutRef.current = setTimeout(() => setCopied(false), 3e3);
	}, [value]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: .5,
			width: "100%"
		},
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
			variant: "body2",
			color: "text.secondary",
			sx: { fontWeight: 500 },
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				alignItems: "center",
				backgroundColor: "background.default",
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 1,
				display: "flex",
				gap: 1,
				p: 1.5
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				sx: {
					flex: 1,
					fontFamily: "monospace",
					fontSize: "0.85rem",
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				},
				children: value
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: copied ? "text" : "outlined",
				size: "small",
				color: copied ? "success" : "primary",
				startIcon: copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 16 }),
				onClick: () => {
					handleCopy();
				},
				"aria-label": copied ? t("common:actions.copied", "Copied!") : t("common:actions.copy", "Copy"),
				children: copied ? t("common:actions.copied", "Copied!") : t("common:actions.copy", "Copy")
			})]
		})]
	});
}

//#endregion
//#region src/components/flow/adapters/IconAdapter.tsx
function IconAdapter({ component }) {
	const iconName = component.name ?? "ArrowLeftRight";
	const icons = __wso2_oxygen_ui_icons_react;
	if (!Object.keys(icons).includes(iconName)) return null;
	const IconComponent = icons[iconName];
	if (!IconComponent) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		className: (0, __thunderid_utils.cn)("Flow--icon"),
		sx: {
			display: "flex",
			alignItems: "center"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconComponent, {
			fontSize: component.size ?? 24,
			sx: { color: component.color ?? "currentColor" }
		})
	});
}

//#endregion
//#region src/components/flow/adapters/ImageAdapter.tsx
const DEFAULT_EMOJI_CONTAINER_HEIGHT = "4em";
function ImageAdapter({ component, resolve, maxWidth = "100%", maxHeight = "100%" }) {
	const resolvedSrc = resolve(component.src ?? "") ?? component.src ?? "";
	const resolvedAlt = resolve(component.alt ?? "") ?? component.alt ?? "";
	if (!resolvedSrc) return null;
	if ((0, __thunderid_react.isEmojiUri)(resolvedSrc)) {
		const cssWidth = component.width ? `${component.width}px` : "100%";
		const cssHeight = component.height ? `${component.height}px` : "auto";
		const isConcrete = (v) => v !== "auto" && !v.endsWith("%");
		let containerHeight;
		if (isConcrete(cssHeight)) containerHeight = cssHeight;
		else if (isConcrete(cssWidth)) containerHeight = cssWidth;
		else containerHeight = DEFAULT_EMOJI_CONTAINER_HEIGHT;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, __thunderid_utils.cn)("Flow--image"),
			style: {
				containerType: "size",
				display: "inline-grid",
				height: containerHeight,
				placeItems: "center",
				width: cssWidth
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				"aria-label": resolvedAlt,
				role: "img",
				style: {
					fontSize: "100cqmin",
					lineHeight: 1
				},
				children: (0, __thunderid_react.extractEmojiFromUri)(resolvedSrc)
			})
		});
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		component: "img",
		className: (0, __thunderid_utils.cn)("Flow--image"),
		src: resolvedSrc,
		alt: resolvedAlt,
		sx: {
			width: component.width ? `${component.width}px` : "auto",
			height: component.height ? `${component.height}px` : "auto",
			maxWidth,
			maxHeight,
			objectFit: "contain"
		}
	});
}

//#endregion
//#region src/components/flow/adapters/StackAdapter.tsx
const STACK_IMAGE_MAX_SIZE = 80;
function StackAdapter({ component, resolve, values = {}, touched = void 0, fieldErrors = void 0, isLoading = false, onInputChange = () => null, onSubmit = () => null, onValidate = void 0, signUpFallbackUrl = void 0, signInFallbackUrl = void 0, forgotPasswordFallbackUrl = void 0 }) {
	const nestedComponents = component.components ?? [];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
		className: (0, __thunderid_utils.cn)("Flow--stack"),
		direction: component.direction ?? "column",
		spacing: component.gap ?? 2,
		alignItems: component.align ?? "center",
		justifyContent: component.justify ?? "flex-start",
		children: nestedComponents.map((nested, nestedIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FlowComponentRenderer, {
			component: nested,
			index: nestedIndex,
			values,
			touched,
			fieldErrors,
			isLoading,
			resolve,
			onInputChange,
			onSubmit,
			onValidate,
			maxImageSize: STACK_IMAGE_MAX_SIZE,
			signUpFallbackUrl,
			signInFallbackUrl,
			forgotPasswordFallbackUrl
		}, nested.id ?? nestedIndex))
	});
}

//#endregion
//#region src/components/flow/adapters/StandaloneTriggerAdapter.tsx
function StandaloneTriggerAdapter({ component, index, isLoading, resolve, onSubmit, values }) {
	const { t } = (0, react_i18next.useTranslation)();
	const resolvedStartIcon = resolve(component.startIcon ?? component.image ?? "");
	const iconElement = resolvedStartIcon && /^https?:\/\//i.test(resolvedStartIcon) ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		component: "img",
		src: resolvedStartIcon,
		sx: {
			width: 20,
			height: 20,
			objectFit: "contain"
		}
	}) : getIntegrationIcon_default(String(component.label ?? ""), resolvedStartIcon ?? "");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		fullWidth: true,
		className: (0, __thunderid_utils.cn)("Flow--standaloneTrigger", "Button--root", component.variant === "OUTLINED" ? "Button--outlined" : "Button--secondary"),
		variant: component.variant === "OUTLINED" ? "outlined" : "contained",
		disabled: isLoading,
		startIcon: iconElement,
		onClick: () => onSubmit(component, values),
		sx: { mt: 1 },
		children: t(resolve(component.label))
	}, component.id ?? index);
}

//#endregion
//#region src/utils/mapEmbeddedFlowTextVariant.ts
/**
* Maps EmbeddedFlowTextVariant enum values to corresponding MUI Typography variants
* for consistent text styling across embedded flow components.
*
* @param variant - The EmbeddedFlowTextVariant to map
* @returns The corresponding MUI TypographyVariant
*
* @example
* ```tsx
* import {mapEmbeddedFlowTextVariant} from '@thunderid/design';
*
* const variant = mapEmbeddedFlowTextVariant(EmbeddedFlowTextVariant.Heading1);
* // Returns 'h2'
*
* <Typography variant={variant}>
*   My Heading
* </Typography>
* ```
*/
function mapEmbeddedFlowTextVariant(variant) {
	switch (variant) {
		case __thunderid_react.EmbeddedFlowTextVariant.Heading1: return "h1";
		case __thunderid_react.EmbeddedFlowTextVariant.Heading2: return "h2";
		case __thunderid_react.EmbeddedFlowTextVariant.Heading3: return "h3";
		case __thunderid_react.EmbeddedFlowTextVariant.Heading4: return "h4";
		case __thunderid_react.EmbeddedFlowTextVariant.Heading5: return "h5";
		case __thunderid_react.EmbeddedFlowTextVariant.Heading6: return "h6";
		case __thunderid_react.EmbeddedFlowTextVariant.Subtitle1: return "subtitle1";
		case __thunderid_react.EmbeddedFlowTextVariant.Subtitle2: return "subtitle2";
		case __thunderid_react.EmbeddedFlowTextVariant.Body1: return "body1";
		case __thunderid_react.EmbeddedFlowTextVariant.Body2: return "body2";
		case __thunderid_react.EmbeddedFlowTextVariant.Caption: return "caption";
		case __thunderid_react.EmbeddedFlowTextVariant.Overline: return "overline";
		default: return "body1";
	}
}
var mapEmbeddedFlowTextVariant_default = mapEmbeddedFlowTextVariant;

//#endregion
//#region src/components/flow/adapters/TextAdapter.tsx
function TextAdapter({ component, resolve }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { isDesignEnabled } = useDesign();
	const typographyVariant = mapEmbeddedFlowTextVariant(component.variant);
	const textAlign = component.align ?? (isDesignEnabled ? "center" : "left");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
		className: (0, __thunderid_utils.cn)("Flow--text", `Text--${typographyVariant}`),
		variant: typographyVariant,
		sx: {
			mb: 1,
			textAlign
		},
		children: t(resolve(component.label))
	});
}

//#endregion
//#region src/components/flow/adapters/TimerAdapter.tsx
/**
* Oxygen-UI styled timer adapter.
*
* Uses the SDK's `FlowTimer` render-prop component to manage
* the countdown, then renders oxygen-ui styled text.
*/
function TimerAdapter({ expiresIn, textTemplate = "Time remaining: {time}" }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_react.FlowTimer, {
		expiresIn,
		children: ({ isExpired, formattedTime }) => isExpired ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
			className: (0, __thunderid_utils.cn)("Flow--timer", "Alert--root"),
			severity: "warning",
			sx: { mt: 1 },
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				className: (0, __thunderid_utils.cn)("Text--body2"),
				variant: "body2",
				children: formattedTime
			})
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
			className: (0, __thunderid_utils.cn)("Flow--timer", "Text--body2"),
			variant: "body2",
			color: "warning.main",
			sx: { mt: 1 },
			children: textTemplate.replace("{time}", formattedTime)
		})
	});
}

//#endregion
//#region src/components/flow/FlowComponentRenderer.tsx
/**
* Factory component that maps an embedded flow component to the appropriate adapter.
*
* Supported top-level types:
* - `TEXT` → {@link TextAdapter}
* - `RICH_TEXT` → {@link RichTextAdapter}
* - `IMAGE` → {@link ImageAdapter}
* - `ICON` → {@link IconAdapter}
* - `STACK` → {@link StackAdapter}
* - `DIVIDER` → {@link DividerAdapter}
* - `BLOCK` (form or trigger) → {@link BlockAdapter}
* - `ACTION / TRIGGER` (standalone) → {@link StandaloneTriggerAdapter}
*
* Consumers must wrap their submit/trigger handlers into the normalised
* `onSubmit(action, inputs)` callback.  Setting a `key` on the rendered
* `<FlowComponentRenderer>` is the caller's responsibility.
*/
function FlowComponentRenderer({ component, index, values, touched, fieldErrors, isLoading, resolve, onInputChange, onSubmit, onValidate, maxImageSize, additionalData, signUpFallbackUrl, signInFallbackUrl, forgotPasswordFallbackUrl }) {
	const comp = component;
	if (comp.type === __thunderid_react.EmbeddedFlowComponentType.Text || comp.type === "TEXT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextAdapter, {
		component: comp,
		resolve
	});
	if (comp.type === "RICH_TEXT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RichTextAdapter, {
		component: comp,
		resolve,
		signUpFallbackUrl,
		signInFallbackUrl,
		forgotPasswordFallbackUrl
	});
	if (comp.type === "IMAGE") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ImageAdapter, {
		component: comp,
		resolve,
		maxWidth: maxImageSize,
		maxHeight: maxImageSize
	});
	if (comp.type === "ICON") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconAdapter, { component: comp });
	if (comp.type === "STACK") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StackAdapter, {
		component: comp,
		resolve,
		values,
		touched,
		fieldErrors,
		isLoading,
		onInputChange,
		onSubmit,
		onValidate,
		signUpFallbackUrl,
		signInFallbackUrl,
		forgotPasswordFallbackUrl
	});
	if (comp.type === "TIMER") {
		const stepTimeout = additionalData?.["stepTimeout"];
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TimerAdapter, {
			expiresIn: stepTimeout != null ? Math.max(0, Math.floor((Number(stepTimeout) - Date.now()) / 1e3)) : 0,
			textTemplate: resolve(comp.label) ?? "Time remaining: {time}"
		});
	}
	if (comp.type === "DIVIDER") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DividerAdapter, {
		component: comp,
		resolve
	});
	if (comp.type === __thunderid_react.EmbeddedFlowComponentType.Block || comp.type === "BLOCK") {
		const hasConsent = additionalData?.["consentPrompt"] != null;
		const hasTimer = additionalData?.["stepTimeout"] != null;
		const stepTimeout = additionalData?.["stepTimeout"];
		const expiresIn = stepTimeout != null ? Math.max(0, Math.floor((Number(stepTimeout) - Date.now()) / 1e3)) : 0;
		const isExpiredOnMount = hasTimer && expiresIn <= 0;
		if (hasConsent) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConsentAdapter, {
			consentData: additionalData?.["consentPrompt"],
			formValues: values,
			onInputChange
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BlockAdapter, {
			component,
			index,
			values,
			touched,
			fieldErrors,
			isLoading: isLoading || isExpiredOnMount,
			resolve,
			onInputChange,
			onSubmit,
			onValidate,
			signUpFallbackUrl,
			signInFallbackUrl,
			forgotPasswordFallbackUrl
		})] });
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BlockAdapter, {
			component,
			index,
			values,
			touched,
			fieldErrors,
			isLoading: isLoading || isExpiredOnMount,
			resolve,
			onInputChange,
			onSubmit,
			onValidate,
			signUpFallbackUrl,
			signInFallbackUrl,
			forgotPasswordFallbackUrl
		});
	}
	if (comp.type === "COPYABLE_TEXT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CopyableTextAdapter, {
		component: comp,
		resolve,
		additionalData
	});
	if (comp.type === __thunderid_react.EmbeddedFlowComponentType.Action && comp.eventType === __thunderid_react.EmbeddedFlowEventType.Trigger) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StandaloneTriggerAdapter, {
		component: comp,
		index,
		isLoading,
		resolve,
		onSubmit,
		values
	});
	return null;
}

//#endregion
//#region src/utils/extractLayoutFromDesign.ts
/**
* Extracts layout configuration from design resolve data.
*
* @param design - The resolved design configuration
* @returns The LayoutConfig object if found, or `undefined`
*
* @public
*/
function extractLayoutFromDesign(design) {
	return design?.layout;
}

//#endregion
exports.AuthCardLayout = AuthCardLayout;
exports.AuthPageLayout = AuthPageLayout;
exports.BROWSER_SAFE_FONTS = BROWSER_SAFE_FONTS;
exports.BlockAdapter = BlockAdapter;
exports.ConsentAdapter = ConsentAdapter;
exports.CopyableTextAdapter = CopyableTextAdapter;
exports.DefaultTheme = DefaultTheme_default;
exports.DesignContext = DesignContext_default;
exports.DesignProvider = DesignProvider;
exports.DesignQueryKeys = design_query_keys_default;
exports.DesignResolveType = DesignResolveType;
exports.DividerAdapter = DividerAdapter;
exports.FlowComponentRenderer = FlowComponentRenderer;
exports.GoogleFontLoader = GoogleFontLoader;
exports.IconAdapter = IconAdapter;
exports.ImageAdapter = ImageAdapter;
exports.OtpInputAdapter = OtpInputAdapter;
exports.PasswordInputAdapter = PasswordInputAdapter;
exports.RichTextAdapter = RichTextAdapter;
exports.SelectAdapter = SelectAdapter;
exports.StackAdapter = StackAdapter;
exports.StandaloneTriggerAdapter = StandaloneTriggerAdapter;
exports.StylesheetInjector = StylesheetInjector;
exports.TextAdapter = TextAdapter;
exports.TextInputAdapter = TextInputAdapter;
exports.TimerAdapter = TimerAdapter;
exports.extractLayoutFromDesign = extractLayoutFromDesign;
exports.getIntegrationIcon = getIntegrationIcon_default;
exports.isInsecureStylesheetUrl = isInsecureStylesheetUrl;
exports.isValidStylesheetUrl = isValidStylesheetUrl;
exports.mapEmbeddedFlowTextVariant = mapEmbeddedFlowTextVariant_default;
exports.sanitizeCss = sanitizeCss;
exports.useCreateLayout = useCreateLayout;
exports.useCreateTheme = useCreateTheme;
exports.useDeleteLayout = useDeleteLayout;
exports.useDeleteTheme = useDeleteTheme;
exports.useDesign = useDesign;
exports.useGetDesignResolve = useGetDesignResolve;
exports.useGetLayout = useGetLayout;
exports.useGetLayouts = useGetLayouts;
exports.useGetTheme = useGetTheme;
exports.useGetThemes = useGetThemes;
exports.useUpdateLayout = useUpdateLayout;
exports.useUpdateTheme = useUpdateTheme;