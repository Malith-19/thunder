import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { Consent, ConsentCheckboxList, EmbeddedFlowComponentType, EmbeddedFlowEventType, EmbeddedFlowTextVariant, FlowTimer, extractEmojiFromUri, getConsentOptionalKey, isEmojiUri, useThunderID } from "@thunderid/react";
import { Alert, Box, Button, CircularProgress, ColorSchemeImage, Divider, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, MenuItem, OxygenTheme, Paper, Select, Stack, Switch, TextField, Typography, createOxygenTheme, extendTheme, styled } from "@wso2/oxygen-ui";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { cn, containsMetaTemplate, isEmpty, merge, replaceMetaTemplate } from "@thunderid/utils";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createLogger } from "@thunderid/logger";
import { useTranslation } from "react-i18next";
import * as OxygenIcons from "@wso2/oxygen-ui-icons-react";
import { Check, Copy, Eye, EyeClosed, GitHub, Google } from "@wso2/oxygen-ui-icons-react";
import DOMPurify from "dompurify";
import { QRCodeSVG } from "qrcode.react";

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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit = 30, offset = 0 } = params ?? {};
	return useQuery({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
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
		MuiAutocomplete: {
			defaultProps: { size: "small" },
			styleOverrides: { option: {
				"&.Mui-focused, &[data-focus=\"true\"]": { backgroundColor: "var(--oxygen-palette-action-hover) !important" },
				"&[aria-selected=\"true\"]": { backgroundColor: "var(--oxygen-palette-action-selected) !important" },
				"&[aria-selected=\"true\"].Mui-focused, &[aria-selected=\"true\"][data-focus=\"true\"]": { backgroundColor: "var(--oxygen-palette-action-selected) !important" }
			} }
		},
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
const DefaultTheme = createOxygenTheme(DefaultThemeConfig, OxygenTheme);
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit = 30, offset = 0 } = params ?? {};
	return useQuery({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
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
	const { getServerUrl } = useConfig();
	const isEnabled = options?.enabled ?? Boolean(params?.type && params?.id && params.id.trim().length > 0);
	return useQuery({
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
const DesignContext = createContext(void 0);
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
	const { getClientUuid } = useConfig();
	const clientUuid = getClientUuid();
	const shouldLoadDesign = shouldResolveDesignInternally && !externalDesign && Boolean(clientUuid && clientUuid.trim().length > 0);
	const { data: resolvedDesign, isLoading, error } = useGetDesignResolve({
		id: clientUuid ?? "",
		type: DesignResolveType.APP
	}, { enabled: shouldLoadDesign });
	const design = externalDesign ?? resolvedDesign;
	const contextValue = useMemo(() => ({
		design,
		isDesignEnabled: Boolean(design) && (!isEmpty(design?.theme) || !isEmpty(design?.layout)),
		isLoading: isExternalLoading || (externalDesign ? false : isLoading),
		error: externalDesign ? null : error,
		theme: void 0,
		layout: isEmpty(design?.layout) ? void 0 : design?.layout
	}), [
		design,
		externalDesign,
		isLoading,
		error,
		isExternalLoading
	]);
	return /* @__PURE__ */ jsx(DesignContext_default.Provider, {
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
	const context = useContext(DesignContext_default);
	if (context === void 0) throw new Error("useDesign must be used within a DesignProvider");
	const transformedTheme = useMemo(() => {
		if (baseTheme && !isEmpty(context.design?.theme)) {
			const themeOptions = merge({ ...context.design?.theme }, { colorSchemeSelector: "data-color-scheme" });
			if (themeOptions["defaultColorScheme"] === "system") delete themeOptions["defaultColorScheme"];
			return extendTheme(themeOptions);
		}
		return baseTheme;
	}, [baseTheme, context.design?.theme]);
	return useMemo(() => ({
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
	const { config } = useConfig();
	const idPrefix = config.brand.product_name.toLowerCase().replace(/\s+/g, "-");
	const fontLinkId = `${idPrefix}-google-font`;
	const fontOverrideId = `${idPrefix}-font-override`;
	useEffect(() => {
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
	useEffect(() => {
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
const logger = createLogger({ component: "StylesheetInjector" });
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
	const { config } = useConfig();
	const { layout } = useDesign();
	const resolvedStylesheets = stylesheets ?? layout?.head?.stylesheets ?? [];
	const idPrefix = config.brand.product_name.toLowerCase().replace(/\s+/g, "-");
	const elementIdPrefix = `${idPrefix}-stylesheet-`;
	const dataAttr = `data-${idPrefix}-custom`;
	const serialized = JSON.stringify(resolvedStylesheets);
	useEffect(() => {
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
const StyledPaper = styled(Paper)(({ theme }) => ({
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
	return /* @__PURE__ */ jsxs(Stack, {
		gap: 2,
		className: variant ? cn(`${variant}--root`) : void 0,
		children: [showLogo && logo && /* @__PURE__ */ jsx(ColorSchemeImage, {
			className: variant ? cn(`${variant}--logo`) : void 0,
			src: logo.src,
			alt: logo.alt ?? {
				light: "Logo (Light)",
				dark: "Logo (Dark)"
			},
			height: 40,
			width: "auto",
			sx: { display: logoDisplay }
		}), /* @__PURE__ */ jsx(StyledPaper, {
			variant: "outlined",
			className: variant ? cn(`${variant}--paper`) : void 0,
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
	return /* @__PURE__ */ jsx(Stack, {
		direction: "column",
		component: "main",
		className: variant ? cn(`${variant}--root`) : void 0,
		sx: [{
			justifyContent: "center",
			height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
			minHeight: "100%",
			...background ? { backgroundColor: background } : {}
		}],
		children: /* @__PURE__ */ jsx(Stack, {
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
			children: /* @__PURE__ */ jsx(Stack, {
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
				children: isLoading ? /* @__PURE__ */ jsx(CircularProgress, {}) : children
			})
		})
	});
}

//#endregion
//#region src/components/flow/adapters/DividerAdapter.tsx
function DividerAdapter({ component, resolve }) {
	const { t } = useTranslation();
	const label = resolve(component.label);
	return /* @__PURE__ */ jsx(Divider, {
		className: cn("Flow--divider", "Divider--root"),
		orientation: component.variant === "VERTICAL" ? "vertical" : "horizontal",
		sx: { my: 2 },
		children: label ? t(label) : void 0
	});
}

//#endregion
//#region src/components/flow/adapters/OtpInputAdapter.tsx
const OTP_LENGTH = 6;
function OtpInputAdapter({ component, values, touched, fieldErrors, isLoading, resolve, onInputChange }) {
	const { t } = useTranslation();
	const { ref } = component;
	if (!ref || typeof ref !== "string") return null;
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const otpDigits = (values[ref] ?? "").padEnd(OTP_LENGTH, " ").split("").slice(0, OTP_LENGTH);
	const focusDigit = (idx) => {
		document.querySelector(`input[aria-label="OTP digit ${idx + 1}"]`)?.focus();
	};
	return /* @__PURE__ */ jsxs(FormControl, {
		required: component.required,
		className: cn("Flow--otpInput", "FormControl--root"),
		children: [
			/* @__PURE__ */ jsx(FormLabel, {
				htmlFor: ref,
				className: cn("Label--root"),
				children: t(resolve(component.label))
			}),
			/* @__PURE__ */ jsx(Box, {
				sx: {
					display: "flex",
					gap: 1,
					justifyContent: "center",
					mt: 1
				},
				children: otpDigits.map((digit, idx) => /* @__PURE__ */ jsx(TextField, {
					className: cn("TextField--root"),
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
			hasError && /* @__PURE__ */ jsx(Typography, {
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
	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState(false);
	const { ref } = component;
	if (!ref || typeof ref !== "string") return null;
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const value = values[ref] ?? "";
	const autoComplete = ref === "password" ? passwordAutoComplete ?? "current-password" : "off";
	return /* @__PURE__ */ jsxs(FormControl, {
		required: component.required,
		className: cn("Flow--passwordInput", "FormControl--root"),
		children: [/* @__PURE__ */ jsx(FormLabel, {
			htmlFor: ref,
			className: cn("Label--root"),
			children: t(resolve(component.label))
		}), /* @__PURE__ */ jsx(TextField, {
			fullWidth: true,
			className: cn("TextField--root"),
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
			slotProps: { input: { endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
				position: "end",
				children: /* @__PURE__ */ jsx(IconButton, {
					className: cn("IconButton--root", "PasswordInput--toggle"),
					"aria-label": "toggle password visibility",
					onClick: () => setShowPassword((prev) => !prev),
					edge: "end",
					disabled: isLoading,
					children: showPassword ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeClosed, {})
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
if (typeof window !== "undefined") {
	DOMPurify.removeHooks("afterSanitizeAttributes");
	DOMPurify.addHook("afterSanitizeAttributes", (node) => {
		if (node.tagName === "A" && node.getAttribute("target") === "_blank") node.setAttribute("rel", "noopener noreferrer");
	});
}
const RECOVERY_ENABLED_META_KEY = "isRecoveryFlowEnabled";
function RichTextAdapter({ component, resolve, signUpFallbackUrl = void 0, signInFallbackUrl = void 0, forgotPasswordFallbackUrl = void 0 }) {
	const { isDesignEnabled } = useDesign();
	const rawLabel = typeof component.label === "string" ? component.label : void 0;
	if (rawLabel && containsMetaTemplate(rawLabel, SIGN_UP_URL_META_KEY)) {
		if (!(resolve(`{{meta(${REGISTRATION_ENABLED_META_KEY})}}`) === "true")) return null;
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if (containsMetaTemplate(resolvedLabel$1, SIGN_UP_URL_META_KEY) && signUpFallbackUrl) resolvedLabel$1 = replaceMetaTemplate(resolvedLabel$1, SIGN_UP_URL_META_KEY, signUpFallbackUrl);
		return /* @__PURE__ */ jsx(Box, {
			className: cn("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(resolvedLabel$1, { ADD_ATTR: ["target"] }) }
		});
	}
	if (rawLabel && containsMetaTemplate(rawLabel, FORGOT_PASSWORD_URL_META_KEY)) {
		if (!(resolve(`{{meta(${RECOVERY_ENABLED_META_KEY})}}`) === "true")) return null;
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if (containsMetaTemplate(resolvedLabel$1, FORGOT_PASSWORD_URL_META_KEY) && forgotPasswordFallbackUrl) resolvedLabel$1 = replaceMetaTemplate(resolvedLabel$1, FORGOT_PASSWORD_URL_META_KEY, forgotPasswordFallbackUrl);
		return /* @__PURE__ */ jsx(Box, {
			className: cn("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(resolvedLabel$1) }
		});
	}
	if (rawLabel && containsMetaTemplate(rawLabel, SIGN_IN_URL_META_KEY)) {
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if (containsMetaTemplate(resolvedLabel$1, SIGN_IN_URL_META_KEY) && signInFallbackUrl) resolvedLabel$1 = replaceMetaTemplate(resolvedLabel$1, SIGN_IN_URL_META_KEY, signInFallbackUrl);
		return /* @__PURE__ */ jsx(Box, {
			className: cn("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(resolvedLabel$1) }
		});
	}
	if (rawLabel && containsMetaTemplate(rawLabel, APPLICATION_URL_META_KEY)) {
		const resolvedUrl = resolve(`{{meta(${APPLICATION_URL_META_KEY})}}`);
		if (!resolvedUrl || containsMetaTemplate(resolvedUrl, APPLICATION_URL_META_KEY)) return null;
		let resolvedLabel$1 = resolve(rawLabel) ?? rawLabel;
		if (containsMetaTemplate(resolvedLabel$1, APPLICATION_URL_META_KEY)) resolvedLabel$1 = replaceMetaTemplate(resolvedLabel$1, APPLICATION_URL_META_KEY, resolvedUrl);
		return /* @__PURE__ */ jsx(Box, {
			className: cn("Flow--richText"),
			sx: {
				mb: 1,
				textAlign: isDesignEnabled ? "center" : "left"
			},
			dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(resolvedLabel$1) }
		});
	}
	const resolvedLabel = resolve(rawLabel);
	return /* @__PURE__ */ jsx(Box, {
		className: cn("Flow--richText"),
		sx: {
			mb: 1,
			textAlign: isDesignEnabled ? "center" : "left"
		},
		dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(resolvedLabel ?? rawLabel ?? "", { ADD_ATTR: ["target"] }) }
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
	const { t } = useTranslation();
	const { ref, options, hint } = component;
	if (!ref || typeof ref !== "string" || !options) return null;
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const value = values[ref] ?? "";
	return /* @__PURE__ */ jsxs(FormControl, {
		fullWidth: true,
		className: cn("Flow--select", "FormControl--root"),
		children: [
			/* @__PURE__ */ jsx(FormLabel, {
				htmlFor: ref,
				className: cn("Label--root"),
				children: t(resolve(component.label))
			}),
			/* @__PURE__ */ jsxs(Select, {
				displayEmpty: true,
				size: "small",
				className: cn("Select--root"),
				id: ref,
				name: ref,
				required: component.required,
				fullWidth: true,
				disabled: isLoading,
				error: hasError,
				value,
				onChange: (e) => onInputChange(ref, e.target.value),
				children: [/* @__PURE__ */ jsx(MenuItem, {
					value: "",
					disabled: true,
					children: t(resolve(component.placeholder) ?? "Select an option")
				}), options.map((option) => /* @__PURE__ */ jsx(MenuItem, {
					value: getOptionValue(option),
					children: getOptionLabel(option)
				}, getOptionValue(option)))]
			}),
			hasError && /* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				color: "error.main",
				sx: { mt: .5 },
				children: fieldErrors?.[ref]
			}),
			hint && /* @__PURE__ */ jsx(Typography, {
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
	const { t } = useTranslation();
	const { ref } = component;
	if (!ref || typeof ref !== "string") return null;
	const variant = resolveTextVariant(String(component.type));
	const htmlType = HTML_INPUT_TYPE[variant];
	const autoComplete = AUTO_COMPLETE_MAP[variant](ref);
	const autoFocus = ref === "username";
	const hasError = !!(touched?.[ref] && fieldErrors?.[ref]);
	const value = values[ref] ?? "";
	return /* @__PURE__ */ jsxs(FormControl, {
		required: component.required,
		className: cn("Flow--textInput", "FormControl--root"),
		children: [/* @__PURE__ */ jsx(FormLabel, {
			htmlFor: ref,
			className: cn("Label--root"),
			children: t(resolve(component.label))
		}), /* @__PURE__ */ jsx(TextField, {
			fullWidth: true,
			className: cn("TextField--root"),
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
	if (label.includes("google") || image.includes("google")) return /* @__PURE__ */ jsx(Google, {});
	if (label.includes("github") || image.includes("github")) return /* @__PURE__ */ jsx(GitHub, {});
	return null;
};
var getIntegrationIcon_default = getIntegrationIcon;

//#endregion
//#region src/components/flow/adapters/BlockAdapter.tsx
function SubmitButtonAdapter({ component, isLoading, resolve, onClick = void 0 }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx(Button, {
		type: onClick ? "button" : "submit",
		fullWidth: true,
		className: cn("Flow--submitButton", "Button--root", component.variant === "PRIMARY" ? "Button--primary" : "Button--outlined"),
		variant: component.variant === "PRIMARY" ? "contained" : "outlined",
		disabled: isLoading,
		onClick,
		sx: { mt: 2 },
		children: t(resolve(component.label))
	});
}
function ResendButtonAdapter({ component, isLoading, resolve }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx(Button, {
		type: "submit",
		fullWidth: true,
		className: cn("Flow--resendButton", "Button--root"),
		variant: "text",
		disabled: isLoading,
		sx: { mt: 1 },
		children: t(resolve(component.label))
	});
}
function TriggerButtonAdapter({ component, isLoading, resolve, onSubmit, values, blockComponents = void 0, onValidate = void 0 }) {
	const { t } = useTranslation();
	const resolvedStartIcon = resolve(component.startIcon ?? component.image ?? "");
	const iconElement = resolvedStartIcon && /^https?:\/\//i.test(resolvedStartIcon) ? /* @__PURE__ */ jsx(Box, {
		component: "img",
		src: resolvedStartIcon,
		sx: {
			width: 20,
			height: 20,
			objectFit: "contain"
		}
	}) : getIntegrationIcon_default(String(component.label ?? ""), resolvedStartIcon ?? "");
	return /* @__PURE__ */ jsx(Button, {
		fullWidth: true,
		className: cn("Flow--triggerButton", "Button--root", component.variant === "PRIMARY" ? "Button--primary" : "Button--secondary"),
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
	if (sub.type === EmbeddedFlowComponentType.TextInput || sub.type === "TEXT_INPUT" || sub.type === "EMAIL_INPUT" || sub.type === "PHONE_INPUT") return /* @__PURE__ */ jsx(TextInputAdapter, { ...fieldProps }, sub.id ?? compIndex);
	if (sub.type === EmbeddedFlowComponentType.PasswordInput || sub.type === "PASSWORD_INPUT") return /* @__PURE__ */ jsx(PasswordInputAdapter, {
		...fieldProps,
		passwordAutoComplete: ctx.passwordAutoComplete ?? "current-password"
	}, sub.id ?? compIndex);
	if (sub.type === "OTP_INPUT") return /* @__PURE__ */ jsx(OtpInputAdapter, { ...fieldProps }, sub.id ?? compIndex);
	if (sub.type === "SELECT") return /* @__PURE__ */ jsx(SelectAdapter, { ...fieldProps }, sub.id ?? compIndex);
	if (sub.type === "RICH_TEXT") return /* @__PURE__ */ jsx(RichTextAdapter, {
		component: sub,
		resolve: ctx.resolve,
		signUpFallbackUrl: ctx.signUpFallbackUrl,
		signInFallbackUrl: ctx.signInFallbackUrl,
		forgotPasswordFallbackUrl: ctx.forgotPasswordFallbackUrl
	}, sub.id ?? compIndex);
	if (sub.type === EmbeddedFlowComponentType.Action && sub.eventType === EmbeddedFlowEventType.Submit) return /* @__PURE__ */ jsx(SubmitButtonAdapter, {
		component: sub,
		isLoading: ctx.isLoading,
		resolve: ctx.resolve,
		onClick: ctx.hasMultipleSubmits && sub.id !== ctx.primarySubmitId ? () => {
			if (ctx.onValidate && ctx.blockComponents && !ctx.onValidate(ctx.blockComponents)) return;
			ctx.onSubmit(sub, ctx.values);
		} : void 0
	}, sub.id ?? compIndex);
	if (sub.type === "RESEND" && sub.eventType === EmbeddedFlowEventType.Submit) return /* @__PURE__ */ jsx(ResendButtonAdapter, {
		component: sub,
		isLoading: ctx.isLoading,
		resolve: ctx.resolve
	}, sub.id ?? compIndex);
	if (sub.type === EmbeddedFlowComponentType.Action && sub.eventType === EmbeddedFlowEventType.Trigger) return /* @__PURE__ */ jsx(TriggerButtonAdapter, {
		component: sub,
		isLoading: ctx.isLoading,
		resolve: ctx.resolve,
		onSubmit: ctx.onSubmit,
		values: ctx.values,
		blockComponents: ctx.blockComponents,
		onValidate: ctx.onValidate
	}, sub.id ?? compIndex);
	if (sub.type === "DIVIDER") return /* @__PURE__ */ jsx(DividerAdapter, {
		component: sub,
		resolve: ctx.resolve
	}, sub.id ?? compIndex);
	return null;
}
function FormBlockAdapter({ component, index,...ctx }) {
	const blockComponents = component.components ?? [];
	const submitActions = blockComponents.filter((c) => c.type === EmbeddedFlowComponentType.Action && c.eventType === EmbeddedFlowEventType.Submit);
	const hasMultipleSubmits = submitActions.length > 1;
	const primarySubmit = submitActions.find((c) => c.variant === "PRIMARY") ?? submitActions[0];
	const handleSubmit = (event) => {
		event.preventDefault();
		if (ctx.onValidate && !ctx.onValidate(blockComponents)) return;
		if (primarySubmit) ctx.onSubmit(primarySubmit, ctx.values);
	};
	return /* @__PURE__ */ jsx(Box, {
		component: "form",
		className: cn("Flow--form"),
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
	return /* @__PURE__ */ jsx(Box, {
		className: cn("Flow--triggerBlock"),
		sx: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			gap: 2,
			mt: 2
		},
		children: blockComponents.map((actionComponent, actionIndex) => {
			const sub = actionComponent;
			if (sub.type === EmbeddedFlowComponentType.Action && sub.eventType === EmbeddedFlowEventType.Trigger) return /* @__PURE__ */ jsx(TriggerButtonAdapter, {
				component: sub,
				isLoading: ctx.isLoading,
				resolve: ctx.resolve,
				onSubmit: ctx.onSubmit,
				values: ctx.values
			}, sub.id ?? actionIndex);
			if (sub.type === "DIVIDER") return /* @__PURE__ */ jsx(DividerAdapter, {
				component: sub,
				resolve: ctx.resolve
			}, sub.id ?? actionIndex);
			return null;
		})
	}, component.id ?? index);
}
function BlockAdapter({ component, index, blockComponents: outerBlockComponents = void 0, onValidate = void 0,...ctx }) {
	const blockComponents = component.components ?? [];
	const hasSubmit = blockComponents.some((c) => c.type === EmbeddedFlowComponentType.Action && c.eventType === EmbeddedFlowEventType.Submit || c.type === "RESEND" && c.eventType === EmbeddedFlowEventType.Submit);
	const hasTrigger = blockComponents.some((c) => c.type === EmbeddedFlowComponentType.Action && c.eventType === EmbeddedFlowEventType.Trigger);
	if (hasSubmit) return /* @__PURE__ */ jsx(FormBlockAdapter, {
		component,
		index,
		blockComponents: outerBlockComponents,
		onValidate,
		...ctx
	});
	if (hasTrigger) return /* @__PURE__ */ jsx(TriggerBlockAdapter, {
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
	return formValues[getConsentOptionalKey(purposeId, name)] !== "false";
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
		onInputChange(getConsentOptionalKey(purposeId, name), checked ? "true" : "false");
		descendants.forEach((c) => {
			onInputChange(getConsentOptionalKey(purposeId, c), checked ? "true" : "false");
		});
	};
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			px: 1,
			pl: 1 + depth * 3
		},
		children: [/* @__PURE__ */ jsx(FormControlLabel, {
			className: cn("FormControlLabel--root"),
			control: /* @__PURE__ */ jsx(Switch, {
				className: cn("Switch--root"),
				checked: displayChecked,
				inputProps: { "aria-checked": indeterminate ? "mixed" : displayChecked },
				onChange: (e) => handleToggle(e.target.checked),
				size: "small"
			}),
			label: /* @__PURE__ */ jsxs(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1.5
				},
				children: [/* @__PURE__ */ jsx(Box, { sx: {
					width: 6,
					height: 6,
					borderRadius: "50%",
					backgroundColor: "text.disabled",
					flexShrink: 0
				} }), /* @__PURE__ */ jsx(Typography, {
					className: cn("Text--body2"),
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
		}), /* @__PURE__ */ jsx(Divider, {
			className: cn("Divider--root"),
			sx: { opacity: .5 }
		})]
	});
}
function ConsentAdapter({ consentData = void 0, formValues, onInputChange }) {
	if (!consentData) return null;
	return /* @__PURE__ */ jsx(Consent, {
		consentData,
		formValues,
		onInputChange,
		children: ({ purposes }) => /* @__PURE__ */ jsx(Box, {
			className: cn("Flow--consent"),
			sx: {
				display: "flex",
				flexDirection: "column",
				gap: 2,
				mt: 1
			},
			children: purposes.map((purpose, idx) => /* @__PURE__ */ jsxs(Box, { children: [
				isPermissionPurpose(purpose) && purpose.optional && purpose.optional.length > 0 && /* @__PURE__ */ jsxs(Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ jsx(Typography, {
						className: cn("Text--subtitle2"),
						variant: "subtitle2",
						fontWeight: "bold",
						sx: { mb: .5 },
						children: "Permissions"
					}), (() => {
						const grouped = groupPermissionsByParent(purpose.optional);
						const renderNode = (name, depth) => {
							const direct = grouped.childrenOf[name] ?? [];
							const descendants = collectDescendants(name, grouped.childrenOf);
							return /* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(PermissionRow, {
								purposeId: purpose.purposeId,
								name,
								formValues,
								onInputChange,
								descendants,
								depth
							}), direct.map((childName) => renderNode(childName, depth + 1))] }, name);
						};
						return /* @__PURE__ */ jsx(Box, {
							sx: {
								display: "flex",
								flexDirection: "column"
							},
							children: grouped.topLevel.map((name) => renderNode(name, 0))
						});
					})()]
				}),
				!isPermissionPurpose(purpose) && purpose.essential && purpose.essential.length > 0 && /* @__PURE__ */ jsxs(Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ jsx(Typography, {
						className: cn("Text--subtitle2"),
						variant: "subtitle2",
						fontWeight: "bold",
						sx: { mb: .5 },
						children: "Essential Attributes"
					}), /* @__PURE__ */ jsx(ConsentCheckboxList, {
						variant: "ESSENTIAL",
						purpose,
						formValues,
						onInputChange,
						children: ({ attributes, isChecked }) => /* @__PURE__ */ jsx(Box, {
							sx: {
								display: "flex",
								flexDirection: "column"
							},
							children: attributes.map((attr) => /* @__PURE__ */ jsxs(Box, {
								sx: { px: 1 },
								children: [/* @__PURE__ */ jsx(FormControlLabel, {
									className: cn("FormControlLabel--root"),
									control: /* @__PURE__ */ jsx(Switch, {
										className: cn("Switch--root"),
										checked: isChecked(attr),
										disabled: true,
										size: "small"
									}),
									label: /* @__PURE__ */ jsxs(Box, {
										sx: {
											display: "flex",
											alignItems: "center",
											gap: 1.5
										},
										children: [/* @__PURE__ */ jsx(Box, { sx: {
											width: 6,
											height: 6,
											borderRadius: "50%",
											backgroundColor: "text.disabled",
											flexShrink: 0
										} }), /* @__PURE__ */ jsx(Typography, {
											className: cn("Text--body2"),
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
								}), /* @__PURE__ */ jsx(Divider, {
									className: cn("Divider--root"),
									sx: { opacity: .5 }
								})]
							}, attr))
						})
					})]
				}),
				!isPermissionPurpose(purpose) && purpose.optional && purpose.optional.length > 0 && /* @__PURE__ */ jsxs(Box, {
					sx: { mt: 1 },
					children: [/* @__PURE__ */ jsx(Typography, {
						className: cn("Text--subtitle2"),
						variant: "subtitle2",
						fontWeight: "bold",
						sx: { mb: .5 },
						children: "Optional Attributes"
					}), /* @__PURE__ */ jsx(ConsentCheckboxList, {
						variant: "OPTIONAL",
						purpose,
						formValues,
						onInputChange,
						children: ({ attributes, isChecked, handleChange }) => /* @__PURE__ */ jsx(Box, {
							sx: {
								display: "flex",
								flexDirection: "column"
							},
							children: attributes.map((attr) => /* @__PURE__ */ jsxs(Box, {
								sx: { px: 1 },
								children: [/* @__PURE__ */ jsx(FormControlLabel, {
									className: cn("FormControlLabel--root"),
									control: /* @__PURE__ */ jsx(Switch, {
										className: cn("Switch--root"),
										checked: isChecked(attr),
										onChange: (e) => handleChange(attr, e.target.checked),
										size: "small"
									}),
									label: /* @__PURE__ */ jsxs(Box, {
										sx: {
											display: "flex",
											alignItems: "center",
											gap: 1.5
										},
										children: [/* @__PURE__ */ jsx(Box, { sx: {
											width: 6,
											height: 6,
											borderRadius: "50%",
											backgroundColor: "text.disabled",
											flexShrink: 0
										} }), /* @__PURE__ */ jsx(Typography, {
											className: cn("Text--body2"),
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
								}), /* @__PURE__ */ jsx(Divider, {
									className: cn("Divider--root"),
									sx: { opacity: .5 }
								})]
							}, attr))
						})
					})]
				}),
				idx < purposes.length - 1 && /* @__PURE__ */ jsx(Divider, {
					className: cn("Divider--root"),
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
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);
	const copyTimeoutRef = useRef(null);
	useEffect(() => () => {
		if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current);
	}, []);
	const sourceKey = component.source;
	const rawValue = sourceKey && additionalData ? additionalData[sourceKey] : void 0;
	const value = typeof rawValue === "string" || typeof rawValue === "number" || typeof rawValue === "boolean" ? String(rawValue) : "";
	const label = component.label ? t(resolve(component.label) ?? component.label) : void 0;
	const handleCopy = useCallback(async () => {
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
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: .5,
			width: "100%"
		},
		children: [label && /* @__PURE__ */ jsx(Typography, {
			variant: "body2",
			color: "text.secondary",
			sx: { fontWeight: 500 },
			children: label
		}), /* @__PURE__ */ jsxs(Box, {
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
			children: [/* @__PURE__ */ jsx(Typography, {
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
			}), /* @__PURE__ */ jsx(Button, {
				variant: copied ? "text" : "outlined",
				size: "small",
				color: copied ? "success" : "primary",
				startIcon: copied ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 }),
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
	const icons = OxygenIcons;
	if (!Object.keys(icons).includes(iconName)) return null;
	const IconComponent = icons[iconName];
	if (!IconComponent) return null;
	return /* @__PURE__ */ jsx(Box, {
		className: cn("Flow--icon"),
		sx: {
			display: "flex",
			alignItems: "center"
		},
		children: /* @__PURE__ */ jsx(IconComponent, {
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
	if (isEmojiUri(resolvedSrc)) {
		const cssWidth = component.width ? `${component.width}px` : "100%";
		const cssHeight = component.height ? `${component.height}px` : "auto";
		const isConcrete = (v) => v !== "auto" && !v.endsWith("%");
		let containerHeight;
		if (isConcrete(cssHeight)) containerHeight = cssHeight;
		else if (isConcrete(cssWidth)) containerHeight = cssWidth;
		else containerHeight = DEFAULT_EMOJI_CONTAINER_HEIGHT;
		return /* @__PURE__ */ jsx("span", {
			className: cn("Flow--image"),
			style: {
				containerType: "size",
				display: "inline-grid",
				height: containerHeight,
				placeItems: "center",
				width: cssWidth
			},
			children: /* @__PURE__ */ jsx("span", {
				"aria-label": resolvedAlt,
				role: "img",
				style: {
					fontSize: "100cqmin",
					lineHeight: 1
				},
				children: extractEmojiFromUri(resolvedSrc)
			})
		});
	}
	return /* @__PURE__ */ jsx(Box, {
		component: "img",
		className: cn("Flow--image"),
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
//#region src/components/flow/adapters/QrCodeAdapter.tsx
function QrCodeAdapter({ component, additionalData = {} }) {
	const sourceKey = component.source;
	const rawValue = sourceKey && additionalData ? additionalData[sourceKey] : void 0;
	const uri = typeof rawValue === "string" ? rawValue : "";
	if (!uri) return null;
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			alignItems: "center",
			display: "flex",
			flexDirection: "column",
			gap: 2,
			width: "100%"
		},
		children: [/* @__PURE__ */ jsx(QRCodeSVG, {
			value: uri,
			size: 220
		}), /* @__PURE__ */ jsx(Button, {
			fullWidth: true,
			variant: "outlined",
			href: uri,
			children: "Open wallet on this device"
		})]
	});
}

//#endregion
//#region src/components/flow/adapters/StackAdapter.tsx
const STACK_IMAGE_MAX_SIZE = 80;
function StackAdapter({ component, resolve, values = {}, touched = void 0, fieldErrors = void 0, isLoading = false, onInputChange = () => null, onSubmit = () => null, onValidate = void 0, signUpFallbackUrl = void 0, signInFallbackUrl = void 0, forgotPasswordFallbackUrl = void 0 }) {
	const nestedComponents = component.components ?? [];
	return /* @__PURE__ */ jsx(Stack, {
		className: cn("Flow--stack"),
		direction: component.direction ?? "column",
		spacing: component.gap ?? 2,
		alignItems: component.align ?? "center",
		justifyContent: component.justify ?? "flex-start",
		children: nestedComponents.map((nested, nestedIndex) => /* @__PURE__ */ jsx(FlowComponentRenderer, {
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
	const { t } = useTranslation();
	const resolvedStartIcon = resolve(component.startIcon ?? component.image ?? "");
	const iconElement = resolvedStartIcon && /^https?:\/\//i.test(resolvedStartIcon) ? /* @__PURE__ */ jsx(Box, {
		component: "img",
		src: resolvedStartIcon,
		sx: {
			width: 20,
			height: 20,
			objectFit: "contain"
		}
	}) : getIntegrationIcon_default(String(component.label ?? ""), resolvedStartIcon ?? "");
	return /* @__PURE__ */ jsx(Button, {
		fullWidth: true,
		className: cn("Flow--standaloneTrigger", "Button--root", component.variant === "OUTLINED" ? "Button--outlined" : "Button--secondary"),
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
		case EmbeddedFlowTextVariant.Heading1: return "h1";
		case EmbeddedFlowTextVariant.Heading2: return "h2";
		case EmbeddedFlowTextVariant.Heading3: return "h3";
		case EmbeddedFlowTextVariant.Heading4: return "h4";
		case EmbeddedFlowTextVariant.Heading5: return "h5";
		case EmbeddedFlowTextVariant.Heading6: return "h6";
		case EmbeddedFlowTextVariant.Subtitle1: return "subtitle1";
		case EmbeddedFlowTextVariant.Subtitle2: return "subtitle2";
		case EmbeddedFlowTextVariant.Body1: return "body1";
		case EmbeddedFlowTextVariant.Body2: return "body2";
		case EmbeddedFlowTextVariant.Caption: return "caption";
		case EmbeddedFlowTextVariant.Overline: return "overline";
		default: return "body1";
	}
}
var mapEmbeddedFlowTextVariant_default = mapEmbeddedFlowTextVariant;

//#endregion
//#region src/components/flow/adapters/TextAdapter.tsx
function TextAdapter({ component, resolve }) {
	const { t } = useTranslation();
	const { isDesignEnabled } = useDesign();
	const typographyVariant = mapEmbeddedFlowTextVariant(component.variant);
	const textAlign = component.align ?? (isDesignEnabled ? "center" : "left");
	return /* @__PURE__ */ jsx(Typography, {
		className: cn("Flow--text", `Text--${typographyVariant}`),
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
	return /* @__PURE__ */ jsx(FlowTimer, {
		expiresIn,
		children: ({ isExpired, formattedTime }) => isExpired ? /* @__PURE__ */ jsx(Alert, {
			className: cn("Flow--timer", "Alert--root"),
			severity: "warning",
			sx: { mt: 1 },
			children: /* @__PURE__ */ jsx(Typography, {
				className: cn("Text--body2"),
				variant: "body2",
				children: formattedTime
			})
		}) : /* @__PURE__ */ jsx(Typography, {
			className: cn("Flow--timer", "Text--body2"),
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
	if (comp.type === EmbeddedFlowComponentType.Text || comp.type === "TEXT") return /* @__PURE__ */ jsx(TextAdapter, {
		component: comp,
		resolve
	});
	if (comp.type === "RICH_TEXT") return /* @__PURE__ */ jsx(RichTextAdapter, {
		component: comp,
		resolve,
		signUpFallbackUrl,
		signInFallbackUrl,
		forgotPasswordFallbackUrl
	});
	if (comp.type === "IMAGE") return /* @__PURE__ */ jsx(ImageAdapter, {
		component: comp,
		resolve,
		maxWidth: maxImageSize,
		maxHeight: maxImageSize
	});
	if (comp.type === "ICON") return /* @__PURE__ */ jsx(IconAdapter, { component: comp });
	if (comp.type === "STACK") return /* @__PURE__ */ jsx(StackAdapter, {
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
		return /* @__PURE__ */ jsx(TimerAdapter, {
			expiresIn: stepTimeout != null ? Math.max(0, Math.floor((Number(stepTimeout) - Date.now()) / 1e3)) : 0,
			textTemplate: resolve(comp.label) ?? "Time remaining: {time}"
		});
	}
	if (comp.type === "DIVIDER") return /* @__PURE__ */ jsx(DividerAdapter, {
		component: comp,
		resolve
	});
	if (comp.type === EmbeddedFlowComponentType.Block || comp.type === "BLOCK") {
		const hasConsent = additionalData?.["consentPrompt"] != null;
		const hasTimer = additionalData?.["stepTimeout"] != null;
		const stepTimeout = additionalData?.["stepTimeout"];
		const expiresIn = stepTimeout != null ? Math.max(0, Math.floor((Number(stepTimeout) - Date.now()) / 1e3)) : 0;
		const isExpiredOnMount = hasTimer && expiresIn <= 0;
		if (hasConsent) return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ConsentAdapter, {
			consentData: additionalData?.["consentPrompt"],
			formValues: values,
			onInputChange
		}), /* @__PURE__ */ jsx(BlockAdapter, {
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
		return /* @__PURE__ */ jsx(BlockAdapter, {
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
	if (comp.type === "COPYABLE_TEXT") return /* @__PURE__ */ jsx(CopyableTextAdapter, {
		component: comp,
		resolve,
		additionalData
	});
	if (comp.type === "QR_CODE") return /* @__PURE__ */ jsx(QrCodeAdapter, {
		component: comp,
		additionalData
	});
	if (comp.type === EmbeddedFlowComponentType.Action && comp.eventType === EmbeddedFlowEventType.Trigger) return /* @__PURE__ */ jsx(StandaloneTriggerAdapter, {
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
export { AuthCardLayout, AuthPageLayout, BROWSER_SAFE_FONTS, BlockAdapter, ConsentAdapter, CopyableTextAdapter, DefaultTheme_default as DefaultTheme, DesignContext_default as DesignContext, DesignProvider, design_query_keys_default as DesignQueryKeys, DesignResolveType, DividerAdapter, FlowComponentRenderer, GoogleFontLoader, IconAdapter, ImageAdapter, OtpInputAdapter, PasswordInputAdapter, RichTextAdapter, SelectAdapter, StackAdapter, StandaloneTriggerAdapter, StylesheetInjector, TextAdapter, TextInputAdapter, TimerAdapter, extractLayoutFromDesign, getIntegrationIcon_default as getIntegrationIcon, isInsecureStylesheetUrl, isValidStylesheetUrl, mapEmbeddedFlowTextVariant_default as mapEmbeddedFlowTextVariant, sanitizeCss, useCreateLayout, useCreateTheme, useDeleteLayout, useDeleteTheme, useDesign, useGetDesignResolve, useGetLayout, useGetLayouts, useGetTheme, useGetThemes, useUpdateLayout, useUpdateTheme };