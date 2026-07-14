import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import enUS from "@thunderid/i18n/locales/en-US";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { afterEach, beforeAll, vi } from "vitest";

//#region src/setup.ts
beforeAll(async () => {
	await i18n.use(initReactI18next).init({
		resources: { "en-US": {
			common: enUS.common,
			navigation: enUS.navigation,
			users: enUS.users,
			userTypes: enUS.userTypes,
			integrations: enUS.integrations,
			applications: enUS.applications,
			groups: enUS.groups,
			auth: enUS.auth,
			mfa: enUS.mfa,
			social: enUS.social,
			consent: enUS.consent,
			errors: enUS.errors
		} },
		lng: "en-US",
		fallbackLng: "en-US",
		defaultNS: "common",
		interpolation: { escapeValue: false },
		react: { useSuspense: false }
	});
});
afterEach(() => {
	cleanup();
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
vi.mock("@thunderid/react", async (importOriginal) => {
	return {
		...await importOriginal(),
		useThunderID: vi.fn(() => ({
			http: { request: vi.fn() },
			signIn: vi.fn(),
			signOut: vi.fn(),
			getAccessToken: vi.fn(),
			getIDToken: vi.fn(),
			getDecodedIDToken: vi.fn(),
			isAuthenticated: false,
			isLoading: false
		})),
		ThunderIDProvider: ({ children }) => children
	};
});
vi.mock("@mui/material/Fade", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vi.mock("@mui/material/Grow", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vi.mock("@mui/material/Collapse", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vi.mock("@mui/material/Slide", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));
vi.mock("@mui/material/Zoom", () => ({ default: ({ children, in: inProp }) => inProp !== false ? children : null }));

//#endregion