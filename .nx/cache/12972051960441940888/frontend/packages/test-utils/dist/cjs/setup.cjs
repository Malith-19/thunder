const require_chunk = require('./chunk-nOFOJqeH.js');
let __testing_library_react = require("@testing-library/react");
__testing_library_react = require_chunk.__toESM(__testing_library_react);
require("@testing-library/jest-dom/vitest");
let __thunderid_i18n_locales_en_US = require("@thunderid/i18n/locales/en-US");
__thunderid_i18n_locales_en_US = require_chunk.__toESM(__thunderid_i18n_locales_en_US);
let i18next = require("i18next");
i18next = require_chunk.__toESM(i18next);
let react_i18next = require("react-i18next");
react_i18next = require_chunk.__toESM(react_i18next);
let vitest = require("vitest");
vitest = require_chunk.__toESM(vitest);

//#region src/setup.ts
(0, vitest.beforeAll)(async () => {
	await i18next.default.use(react_i18next.initReactI18next).init({
		resources: { "en-US": {
			common: __thunderid_i18n_locales_en_US.default.common,
			navigation: __thunderid_i18n_locales_en_US.default.navigation,
			users: __thunderid_i18n_locales_en_US.default.users,
			userTypes: __thunderid_i18n_locales_en_US.default.userTypes,
			integrations: __thunderid_i18n_locales_en_US.default.integrations,
			applications: __thunderid_i18n_locales_en_US.default.applications,
			groups: __thunderid_i18n_locales_en_US.default.groups,
			auth: __thunderid_i18n_locales_en_US.default.auth,
			mfa: __thunderid_i18n_locales_en_US.default.mfa,
			social: __thunderid_i18n_locales_en_US.default.social,
			consent: __thunderid_i18n_locales_en_US.default.consent,
			errors: __thunderid_i18n_locales_en_US.default.errors
		} },
		lng: "en-US",
		fallbackLng: "en-US",
		defaultNS: "common",
		interpolation: { escapeValue: false },
		react: { useSuspense: false }
	});
});
(0, vitest.afterEach)(() => {
	(0, __testing_library_react.cleanup)();
});
const originalSetProperty = window.CSSStyleDeclaration.prototype.setProperty;
window.CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
	try {
		originalSetProperty.call(this, property, value, priority ?? "");
	} catch {}
};
Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
	configurable: true,
	value: () => Promise.resolve()
});
Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
	configurable: true,
	value: () => {}
});
Object.defineProperty(window.HTMLMediaElement.prototype, "load", {
	configurable: true,
	value: () => {}
});
globalThis.IntersectionObserver = class IntersectionObserver {
	root = null;
	rootMargin = "";
	thresholds = [];
	observe() {
		return this;
	}
	disconnect() {
		return this;
	}
	unobserve() {
		return this;
	}
	takeRecords() {
		return [];
	}
};
globalThis.ResizeObserver = class ResizeObserver {
	observe() {
		return this;
	}
	disconnect() {
		return this;
	}
	unobserve() {
		return this;
	}
};
if (typeof window !== "undefined") window.global = window;
vitest.vi.mock("@thunderid/react", async (importOriginal) => {
	return {
		...await importOriginal(),
		useThunderID: vitest.vi.fn(() => ({
			http: { request: vitest.vi.fn() },
			signIn: vitest.vi.fn(),
			signOut: vitest.vi.fn(),
			getAccessToken: vitest.vi.fn(),
			getIDToken: vitest.vi.fn(),
			getDecodedIDToken: vitest.vi.fn(),
			isAuthenticated: false,
			isLoading: false
		})),
		ThunderIDProvider: ({ children }) => children
	};
});
vitest.vi.mock("@mui/material/Fade", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vitest.vi.mock("@mui/material/Grow", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vitest.vi.mock("@mui/material/Collapse", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vitest.vi.mock("@mui/material/Slide", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vitest.vi.mock("@mui/material/Zoom", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));

//#endregion