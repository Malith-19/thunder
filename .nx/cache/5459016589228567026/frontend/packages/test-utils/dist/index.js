import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook as renderHook$1 } from "@testing-library/react";
import { ConfigProvider, ToastProvider } from "@thunderid/contexts";
import { LogLevel, LoggerProvider } from "@thunderid/logger";
import { OxygenUIThemeProvider } from "@wso2/oxygen-ui";
import { useMemo } from "react";
import { MemoryRouter } from "react-router";
import { jsx } from "react/jsx-runtime";
import userEvent from "@testing-library/user-event";

export * from "@testing-library/react"

//#region src/test-utils.tsx
const defaultConfig = {
	base: "/console",
	clientId: "CONSOLE"
};
/**
* The CSS class name prefix used by cn() during tests.
* Import this instead of hardcoding the product name in test assertions.
*/
const TEST_CN_PREFIX = "ThunderID";
let currentConfig = defaultConfig;
function createTestQueryClient() {
	return new QueryClient({ defaultOptions: {
		queries: { retry: false },
		mutations: { retry: false }
	} });
}
function Providers({ children, queryClient = void 0, config = void 0 }) {
	const testConfig = config ?? currentConfig;
	if (typeof window !== "undefined" && !window.__THUNDERID_RUNTIME_CONFIG__) window.__THUNDERID_RUNTIME_CONFIG__ = {
		brand: {
			product_name: "ThunderID",
			favicon: {
				light: "assets/images/favicon.ico",
				dark: "assets/images/favicon-inverted.ico"
			}
		},
		client: {
			base: testConfig.base,
			client_id: testConfig.clientId
		},
		server: {
			hostname: testConfig.hostname ?? "localhost",
			port: testConfig.port ?? 8090,
			http_only: testConfig.httpOnly ?? false
		}
	};
	return /* @__PURE__ */ jsx(MemoryRouter, { children: /* @__PURE__ */ jsx(QueryClientProvider, {
		client: useMemo(() => queryClient ?? createTestQueryClient(), [queryClient]),
		children: /* @__PURE__ */ jsx(ConfigProvider, { children: /* @__PURE__ */ jsx(LoggerProvider, {
			logger: {
				level: LogLevel.ERROR,
				transports: []
			},
			children: /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx(OxygenUIThemeProvider, { children }) })
		}) })
	}) });
}
/**
* Configure the test utilities with app-specific settings
* Call this in your test setup file before running tests
*/
function configureTestUtils(config) {
	currentConfig = config;
}
function customRender(ui, options) {
	const wrapper = ({ children }) => /* @__PURE__ */ jsx(Providers, {
		config: currentConfig,
		children
	});
	return render(ui, {
		wrapper,
		...options
	});
}
/**
* Alternative render function with providers
* Alias for customRender to support different naming conventions
*/
function renderWithProviders(ui, options) {
	return customRender(ui, options ?? {});
}
/**
* Custom renderHook function that includes providers
* Wraps hooks with necessary context providers for testing
* Optionally accepts a queryClient for tests that need direct access to manipulate cache or spy on methods
* Returns the queryClient instance for convenience
*/
function renderHook(hook, options) {
	const { queryClient: providedQueryClient,...restOptions } = options ?? {};
	const queryClient = providedQueryClient ?? createTestQueryClient();
	const wrapper = ({ children }) => /* @__PURE__ */ jsx(Providers, {
		config: currentConfig,
		queryClient,
		children
	});
	return {
		...renderHook$1(hook, {
			wrapper,
			...restOptions
		}),
		queryClient
	};
}
/**
* Helper to get element by translation key
* Useful when using mocked translations that return keys
*/
function getByTranslationKey(container, key) {
	return container.querySelector(`[data-testid="${key}"]`) ?? Array.from(container.querySelectorAll("*")).find((el) => el.textContent === key);
}
var test_utils_default = customRender;

//#endregion
export { TEST_CN_PREFIX, configureTestUtils, getByTranslationKey, test_utils_default as render, renderHook, renderWithProviders, userEvent };