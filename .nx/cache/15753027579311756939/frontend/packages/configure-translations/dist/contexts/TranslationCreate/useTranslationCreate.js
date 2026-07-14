import TranslationCreateContext_default from "./TranslationCreateContext.js";
import { useContext } from "react";

//#region src/contexts/TranslationCreate/useTranslationCreate.tsx
/**
* React hook for accessing translation creation state throughout the wizard.
*
* This hook provides access to all the state needed for the multi-step language
* creation flow. It must be used within a component tree wrapped by
* `TranslationCreateProvider`, otherwise it will throw an error.
*
* @returns The translation creation context containing state data and utility methods
*
* @throws {Error} Throws an error if used outside of TranslationCreateProvider
*
* @example
* ```tsx
* import useTranslationCreate from './useTranslationCreate';
*
* function MyComponent() {
*   const { selectedCountry, currentStep, localeCode } = useTranslationCreate();
*
*   return (
*     <div>
*       <p>Current step: {currentStep}</p>
*       <p>Locale: {localeCode}</p>
*     </div>
*   );
* }
* ```
*
* @public
*/
function useTranslationCreate() {
	const context = useContext(TranslationCreateContext_default);
	if (context === void 0) throw new Error("useTranslationCreate must be used within TranslationCreateProvider");
	return context;
}

//#endregion
export { useTranslationCreate as default };