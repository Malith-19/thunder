const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/TranslationCreate/TranslationCreateContext.tsx
/**
* React context for accessing translation creation state throughout the wizard.
*
* This context provides access to all the state needed for the multi-step
* language creation flow. It should be used within a `TranslationCreateProvider`
* component.
*
* @example
* ```tsx
* import TranslationCreateContext from './TranslationCreateContext';
* import { useContext } from 'react';
*
* const MyComponent = () => {
*   const context = useContext(TranslationCreateContext);
*   if (!context) {
*     throw new Error('Component must be used within TranslationCreateProvider');
*   }
*
*   const { selectedCountry, currentStep } = context;
*   return <div>Current step: {currentStep}</div>;
* };
* ```
*
* @public
*/
const TranslationCreateContext = (0, react.createContext)(void 0);
var TranslationCreateContext_default = TranslationCreateContext;

//#endregion
exports.default = TranslationCreateContext_default;