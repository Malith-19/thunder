const require_chunk = require('../chunk-nOFOJqeH.js');
let vitest = require("vitest");
vitest = require_chunk.__toESM(vitest);

//#region src/mocks/i18n.ts
/**
* Mock implementation of useTranslation hook for testing
*/
const mockUseTranslation = () => ({
	t: (key) => key,
	i18n: {
		changeLanguage: vitest.vi.fn(),
		language: "en"
	}
});
/**
* Mock implementation of useLanguage hook for testing
*/
const mockUseLanguage = () => ({
	currentLanguage: "en",
	setLanguage: vitest.vi.fn(),
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
exports.mockUseDataGridLocaleText = mockUseDataGridLocaleText;
exports.mockUseLanguage = mockUseLanguage;
exports.mockUseTranslation = mockUseTranslation;