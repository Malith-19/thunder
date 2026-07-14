const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_BaseLanguageSwitcher = require('./BaseLanguageSwitcher.cjs');
const require_useFlowMeta = require('../../../contexts/FlowMeta/useFlowMeta.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/LanguageSwitcher/LanguageSwitcher.tsx
/**
* A v2 LanguageSwitcher component that reads available languages from `FlowMetaContext`
* and switches both the UI language (via `I18nContext`) and the flow metadata translations
* (by re-fetching `GET /flow/meta` with the new language).
*
* Must be rendered inside a `FlowMetaProvider`.
*
* @example
* ```tsx
* // Default dropdown UI
* <LanguageSwitcher />
*
* // Custom UI with render props
* <LanguageSwitcher>
*   {({languages, currentLanguage, onLanguageChange}) => (
*     <div>
*       {languages.map(lang => (
*         <button
*           key={lang.code}
*           onClick={() => onLanguageChange(lang.code)}
*           style={{fontWeight: lang.code === currentLanguage ? 'bold' : 'normal'}}
*         >
*           {lang.emoji} {lang.displayName}
*         </button>
*       ))}
*     </div>
*   )}
* </LanguageSwitcher>
* ```
*/
const LanguageSwitcher = ({ children, className }) => {
	const { meta, switchLanguage, isLoading } = require_useFlowMeta.default();
	const { currentLanguage } = require_useTranslation.default();
	const availableLanguageCodes = meta?.i18n?.languages ?? [];
	const effectiveLanguageCodes = (0, react.useMemo)(() => availableLanguageCodes.length > 0 ? availableLanguageCodes : [currentLanguage], [availableLanguageCodes, currentLanguage]);
	const languages = (0, react.useMemo)(() => effectiveLanguageCodes.map((code) => ({
		code,
		displayName: (0, __thunderid_browser.resolveLocaleDisplayName)(code, code) || code,
		emoji: (0, __thunderid_browser.resolveLocaleEmoji)(code)
	})), [effectiveLanguageCodes]);
	(0, react.useEffect)(() => {
		if (availableLanguageCodes.length > 0 && !availableLanguageCodes.includes(currentLanguage)) switchLanguage(availableLanguageCodes[0]);
	}, [
		availableLanguageCodes,
		currentLanguage,
		switchLanguage
	]);
	const handleLanguageChange = (language) => {
		if (language !== currentLanguage) switchLanguage(language);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseLanguageSwitcher.default, {
		currentLanguage,
		isLoading,
		languages,
		onLanguageChange: handleLanguageChange,
		className,
		children
	});
};
var LanguageSwitcher_default = LanguageSwitcher;

//#endregion
exports.default = LanguageSwitcher_default;
//# sourceMappingURL=LanguageSwitcher.cjs.map