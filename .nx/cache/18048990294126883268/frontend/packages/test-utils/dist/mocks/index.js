import { vi } from "vitest";

//#region src/mocks/i18n.ts
/**
* Mock implementation of useTranslation hook for testing
*/
const mockUseTranslation = () => ({
	t: (key) => key,
	i18n: {
		changeLanguage: vi.fn(),
		language: "en"
	}
});
/**
* Mock implementation of useLanguage hook for testing
*/
const mockUseLanguage = () => ({
	currentLanguage: "en",
	setLanguage: vi.fn(),
	availableLanguages: ["en", "si"]
});
/**
* Mock implementation of useDataGridLocaleText hook for testing
*/
const mockUseDataGridLocaleText = () => ({
	noRowsLabel: "No rows",
	noResultsOverlayLabel: "No results found.",
	paginationRowsPerPage: "Rows per page:"
});

//#endregion
export { mockUseDataGridLocaleText, mockUseLanguage, mockUseTranslation };