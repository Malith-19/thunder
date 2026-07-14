const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_TranslationCreateContext = require('./TranslationCreateContext.cjs');
const require_translation_create_flow = require('../../models/translation-create-flow.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/TranslationCreate/TranslationCreateProvider.tsx
/**
* Initial state values for translation creation.
*
* @internal
*/
const INITIAL_STATE = {
	currentStep: require_translation_create_flow.TranslationCreateFlowStep.COUNTRY,
	selectedCountry: null,
	selectedLocale: null,
	localeCodeOverride: "",
	populateFromEnglish: true,
	isCreating: false,
	progress: 0,
	error: null
};
/**
* React context provider component that provides translation creation state
* to all child components.
*
* This component manages all the state needed across the multi-step wizard
* for creating a new translation language. It provides state variables,
* setter functions, and a `reset` utility method.
*
* @param props - The component props
* @param props.children - React children to be wrapped with the translation create context
*
* @returns JSX element that provides translation creation context to children
*
* @example
* ```tsx
* import TranslationCreateProvider from './TranslationCreateProvider';
* import TranslationCreatePage from './TranslationCreatePage';
*
* function App() {
*   return (
*     <TranslationCreateProvider>
*       <TranslationCreatePage />
*     </TranslationCreateProvider>
*   );
* }
* ```
*
* @public
*/
function TranslationCreateProvider({ children }) {
	const [currentStep, setCurrentStep] = (0, react.useState)(INITIAL_STATE.currentStep);
	const [selectedCountry, setSelectedCountry] = (0, react.useState)(INITIAL_STATE.selectedCountry);
	const [selectedLocale, setSelectedLocale] = (0, react.useState)(INITIAL_STATE.selectedLocale);
	const [localeCodeOverride, setLocaleCodeOverride] = (0, react.useState)(INITIAL_STATE.localeCodeOverride);
	const [populateFromEnglish, setPopulateFromEnglish] = (0, react.useState)(INITIAL_STATE.populateFromEnglish);
	const [isCreating, setIsCreating] = (0, react.useState)(INITIAL_STATE.isCreating);
	const [progress, setProgress] = (0, react.useState)(INITIAL_STATE.progress);
	const [error, setError] = (0, react.useState)(INITIAL_STATE.error);
	const localeCode = (localeCodeOverride.trim() || (selectedLocale?.code ?? "")).trim();
	const reset = (0, react.useCallback)(() => {
		setCurrentStep(INITIAL_STATE.currentStep);
		setSelectedCountry(INITIAL_STATE.selectedCountry);
		setSelectedLocale(INITIAL_STATE.selectedLocale);
		setLocaleCodeOverride(INITIAL_STATE.localeCodeOverride);
		setPopulateFromEnglish(INITIAL_STATE.populateFromEnglish);
		setIsCreating(INITIAL_STATE.isCreating);
		setProgress(INITIAL_STATE.progress);
		setError(INITIAL_STATE.error);
	}, []);
	const contextValue = (0, react.useMemo)(() => ({
		currentStep,
		setCurrentStep,
		selectedCountry,
		setSelectedCountry,
		selectedLocale,
		setSelectedLocale,
		localeCodeOverride,
		setLocaleCodeOverride,
		localeCode,
		populateFromEnglish,
		setPopulateFromEnglish,
		isCreating,
		setIsCreating,
		progress,
		setProgress,
		error,
		setError,
		reset
	}), [
		currentStep,
		selectedCountry,
		selectedLocale,
		localeCodeOverride,
		localeCode,
		populateFromEnglish,
		isCreating,
		progress,
		error,
		reset
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TranslationCreateContext.default.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
exports.default = TranslationCreateProvider;