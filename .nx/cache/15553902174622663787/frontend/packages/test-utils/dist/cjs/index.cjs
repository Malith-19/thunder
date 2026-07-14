const require_chunk = require('./chunk-nOFOJqeH.js');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_chunk.__toESM(__tanstack_react_query);
let __testing_library_react = require("@testing-library/react");
__testing_library_react = require_chunk.__toESM(__testing_library_react);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_chunk.__toESM(__thunderid_contexts);
let __thunderid_logger = require("@thunderid/logger");
__thunderid_logger = require_chunk.__toESM(__thunderid_logger);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_chunk.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_chunk.__toESM(react);
let react_router = require("react-router");
react_router = require_chunk.__toESM(react_router);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_chunk.__toESM(react_jsx_runtime);
let __testing_library_user_event = require("@testing-library/user-event");
__testing_library_user_event = require_chunk.__toESM(__testing_library_user_event);

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
	return new __tanstack_react_query.QueryClient({ defaultOptions: {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.MemoryRouter, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__tanstack_react_query.QueryClientProvider, {
		client: (0, react.useMemo)(() => queryClient ?? createTestQueryClient(), [queryClient]),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_contexts.ConfigProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_logger.LoggerProvider, {
			logger: {
				level: __thunderid_logger.LogLevel.ERROR,
				transports: []
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_contexts.ToastProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.OxygenUIThemeProvider, { children }) })
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
	const wrapper = ({ children }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Providers, {
		config: currentConfig,
		children
	});
	return (0, __testing_library_react.render)(ui, {
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
	const wrapper = ({ children }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Providers, {
		config: currentConfig,
		queryClient,
		children
	});
	return {
		...(0, __testing_library_react.renderHook)(hook, {
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
exports.TEST_CN_PREFIX = TEST_CN_PREFIX;
exports.configureTestUtils = configureTestUtils;
exports.getByTranslationKey = getByTranslationKey;
exports.render = test_utils_default;
exports.renderHook = renderHook;
exports.renderWithProviders = renderWithProviders;
Object.defineProperty(exports, 'userEvent', {
  enumerable: true,
  get: function () {
    return __testing_library_user_event.default;
  }
});
Object.keys(__testing_library_react).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return __testing_library_react[k]; }
  });
});
